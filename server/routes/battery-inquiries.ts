import { createHash } from "node:crypto";
import type { Express } from "express";
import { and, eq, gte, inArray, lt, or, sql } from "drizzle-orm";
import { z } from "zod";
import { batteryInquiryInputSchema, type BatteryInquiryInput } from "@shared/battery-inquiries";
import { batteryInquiries, type BatteryInquiry } from "@shared/schema";
import { db } from "../db";
import {
  isBatteryInquiryEmailConfigured,
  sendBatteryInquiryNotification,
} from "../services/emailService";

const PRODUCT_SLUG = "dual-cart-battery";
const SOURCE_PATH = "/battery";
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS_PER_EMAIL = 5;
const RATE_LIMIT_MAX_REQUESTS_PER_IP = 20;
const RATE_LIMIT_MAP_MAX_ENTRIES = 10_000;
const NOTIFICATION_MAX_ATTEMPTS = 5;
const NOTIFICATION_RETRY_INTERVAL_MS = 5 * 60 * 1000;
const NOTIFICATION_STALE_AFTER_MS = 10 * 60 * 1000;

type RateLimitEntry = { count: number; resetAt: number };

const inquiryRateLimits = new Map<string, RateLimitEntry>();
let rateLimitOperations = 0;
let notificationWorkerStarted = false;

function hashValue(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function pruneRateLimits(now: number) {
  rateLimitOperations += 1;
  if (rateLimitOperations % 100 !== 0 && inquiryRateLimits.size < RATE_LIMIT_MAP_MAX_ENTRIES) return;

  inquiryRateLimits.forEach((entry, key) => {
    if (entry.resetAt <= now) inquiryRateLimits.delete(key);
  });

  while (inquiryRateLimits.size >= RATE_LIMIT_MAP_MAX_ENTRIES) {
    const oldestKey = inquiryRateLimits.keys().next().value;
    if (!oldestKey) break;
    inquiryRateLimits.delete(oldestKey);
  }
}

function isRateLimited(key: string, maxRequests: number, now = Date.now()) {
  pruneRateLimits(now);
  const current = inquiryRateLimits.get(key);
  if (!current || current.resetAt <= now) {
    inquiryRateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= maxRequests) return true;
  current.count += 1;
  return false;
}

function cleanAttributionValue(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function cleanReferrer(value?: string) {
  if (!value) return null;

  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.origin.slice(0, 300);
  } catch {
    return null;
  }
}

function createRequestFingerprint(input: BatteryInquiryInput) {
  const normalizedPayload = {
    inquiryType: input.inquiryType,
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    location: input.location,
    quantity: input.quantity,
    businessName: input.inquiryType === "wholesale" ? input.businessName : null,
    notes: input.notes || null,
    source: {
      utmSource: cleanAttributionValue(input.source?.utmSource),
      utmMedium: cleanAttributionValue(input.source?.utmMedium),
      utmCampaign: cleanAttributionValue(input.source?.utmCampaign),
      utmContent: cleanAttributionValue(input.source?.utmContent),
      referrer: cleanReferrer(input.source?.referrer),
    },
  };

  return hashValue(JSON.stringify(normalizedPayload));
}

async function findInquiryByIdempotencyKey(idempotencyKey: string) {
  return (
    await db
      .select()
      .from(batteryInquiries)
      .where(eq(batteryInquiries.idempotencyKey, idempotencyKey))
      .limit(1)
  )[0];
}

async function hasTooManyRecentEmailInquiries(email: string, now = Date.now()) {
  const windowStart = new Date(now - RATE_LIMIT_WINDOW_MS);
  const [result] = await db
    .select({ inquiryCount: sql<number>`count(*)::int` })
    .from(batteryInquiries)
    .where(and(eq(batteryInquiries.email, email), gte(batteryInquiries.createdAt, windowStart)));

  return Number(result?.inquiryCount ?? 0) >= RATE_LIMIT_MAX_REQUESTS_PER_EMAIL;
}

async function attemptOwnerNotification(inquiry: BatteryInquiry) {
  const attemptedAt = new Date();

  try {
    const [claimedInquiry] = await db
      .update(batteryInquiries)
      .set({
        notificationStatus: "sending",
        notificationAttempts: sql`${batteryInquiries.notificationAttempts} + 1`,
        notificationLastAttemptAt: attemptedAt,
      })
      .where(and(
        eq(batteryInquiries.id, inquiry.id),
        lt(batteryInquiries.notificationAttempts, NOTIFICATION_MAX_ATTEMPTS),
        or(
          inArray(batteryInquiries.notificationStatus, ["pending", "failed", "not_configured"]),
          and(
            eq(batteryInquiries.notificationStatus, "sending"),
            lt(batteryInquiries.notificationLastAttemptAt, new Date(attemptedAt.getTime() - NOTIFICATION_STALE_AFTER_MS)),
          ),
        ),
      ))
      .returning();

    if (!claimedInquiry) return;

    const delivery = await sendBatteryInquiryNotification(claimedInquiry);
    await db
      .update(batteryInquiries)
      .set({
        notificationStatus: delivery === "sent" ? "sent" : "not_configured",
        ownerNotifiedAt: delivery === "sent" ? new Date() : null,
      })
      .where(eq(batteryInquiries.id, inquiry.id));

    if (delivery === "not_configured") {
      console.warn("Battery inquiry persisted for the admin queue; SendGrid is not configured.");
    }
  } catch {
    try {
      await db
        .update(batteryInquiries)
        .set({ notificationStatus: "failed" })
        .where(eq(batteryInquiries.id, inquiry.id));
    } catch {
      // The inquiry itself is already durable; avoid logging its PII if status tracking also fails.
    }
    console.warn("Battery inquiry persisted for the admin queue, but owner notification delivery failed.");
  }
}

async function retryPendingNotifications() {
  if (!isBatteryInquiryEmailConfigured()) return;

  const staleBefore = new Date(Date.now() - NOTIFICATION_STALE_AFTER_MS);

  const pendingInquiries = await db
    .select()
    .from(batteryInquiries)
    .where(and(
      or(
        inArray(batteryInquiries.notificationStatus, ["pending", "failed", "not_configured"]),
        and(
          eq(batteryInquiries.notificationStatus, "sending"),
          lt(batteryInquiries.notificationLastAttemptAt, staleBefore),
        ),
      ),
      lt(batteryInquiries.notificationAttempts, NOTIFICATION_MAX_ATTEMPTS),
    ))
    .orderBy(batteryInquiries.createdAt)
    .limit(10);

  for (const inquiry of pendingInquiries) {
    await attemptOwnerNotification(inquiry);
  }
}

export function startBatteryInquiryNotificationWorker() {
  if (notificationWorkerStarted) return;
  notificationWorkerStarted = true;

  const retry = () => {
    void retryPendingNotifications().catch(() => {
      console.warn("Battery inquiry notification retry could not run.");
    });
  };

  retry();
  const timer = setInterval(retry, NOTIFICATION_RETRY_INTERVAL_MS);
  timer.unref();
}

export function registerBatteryInquiryRoutes(app: Express) {
  app.post("/api/battery-inquiries", async (req, res) => {
    try {
      const input = batteryInquiryInputSchema.parse(req.body);
      const requestFingerprint = createRequestFingerprint(input);
      const existingInquiry = await findInquiryByIdempotencyKey(input.idempotencyKey);

      if (existingInquiry) {
        if (existingInquiry.requestFingerprint !== requestFingerprint) {
          return res.status(409).json({ message: "This request changed. Please submit it again." });
        }

        if (
          existingInquiry.notificationStatus !== "sent" &&
          existingInquiry.notificationAttempts < NOTIFICATION_MAX_ATTEMPTS &&
          isBatteryInquiryEmailConfigured()
        ) {
          await attemptOwnerNotification(existingInquiry);
        }

        return res.status(200).json({
          id: existingInquiry.id,
          message: "Battery inquiry already received.",
        });
      }

      const ip = req.ip || "unknown";
      if (isRateLimited(hashValue(`ip|${ip}`), RATE_LIMIT_MAX_REQUESTS_PER_IP)) {
        return res.status(429).json({ message: "Too many requests. Please try again later." });
      }

      if (await hasTooManyRecentEmailInquiries(input.email)) {
        return res.status(429).json({ message: "Too many requests. Please try again later." });
      }

      const [createdInquiry] = await db
        .insert(batteryInquiries)
        .values({
          inquiryType: input.inquiryType,
          productSlug: PRODUCT_SLUG,
          name: input.name,
          email: input.email,
          phone: input.phone || null,
          location: input.location,
          quantity: input.quantity,
          businessName: input.inquiryType === "wholesale" ? input.businessName : null,
          notes: input.notes || null,
          sourcePath: SOURCE_PATH,
          ctaPlacement: input.inquiryType === "wholesale" ? "wholesale_form" : "consumer_form",
          utmSource: cleanAttributionValue(input.source?.utmSource),
          utmMedium: cleanAttributionValue(input.source?.utmMedium),
          utmCampaign: cleanAttributionValue(input.source?.utmCampaign),
          utmContent: cleanAttributionValue(input.source?.utmContent),
          referrer: cleanReferrer(input.source?.referrer),
          idempotencyKey: input.idempotencyKey,
          requestFingerprint,
          status: "new",
          notificationStatus: "pending",
        })
        .onConflictDoNothing({ target: batteryInquiries.idempotencyKey })
        .returning();

      const inquiry = createdInquiry ?? await findInquiryByIdempotencyKey(input.idempotencyKey);
      if (!inquiry) {
        throw new Error("Battery inquiry could not be read after persistence.");
      }

      if (inquiry.requestFingerprint !== requestFingerprint) {
        return res.status(409).json({ message: "This request changed. Please submit it again." });
      }

      if (createdInquiry) {
        await attemptOwnerNotification(inquiry);
      }

      return res.status(createdInquiry ? 201 : 200).json({
        id: inquiry.id,
        message: createdInquiry ? "Battery inquiry received." : "Battery inquiry already received.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Please check the inquiry details and try again." });
      }

      console.error("Battery inquiry submission failed.", error instanceof Error ? error.name : "UnknownError");
      return res.status(500).json({ message: "We could not save the inquiry. Please try again." });
    }
  });
}
