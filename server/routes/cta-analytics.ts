import type { Express, Request } from "express";
import { z } from "zod";
import { isAdmin } from "../auth";
import { pool } from "../db";

const clickSchema = z.object({
  eventType: z.enum(["instagram_order", "wholesale_email"]),
  placement: z.enum(["hero", "wholesale_section", "closing"]),
  pagePath: z.string().startsWith("/").max(200),
  referrer: z.string().max(500).optional().nullable(),
  utmSource: z.string().max(100).optional().nullable(),
  utmMedium: z.string().max(100).optional().nullable(),
  utmCampaign: z.string().max(100).optional().nullable(),
});

const clickWindows = new Map<string, { count: number; resetAt: number }>();
const CLICK_LIMIT = 60;
const CLICK_WINDOW_MS = 60_000;

function isSameOrigin(req: Request) {
  const origin = req.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).host === req.get("host");
  } catch {
    return false;
  }
}

function withinClickLimit(req: Request) {
  const now = Date.now();
  const key = req.ip || req.socket.remoteAddress || "unknown";

  if (clickWindows.size > 5_000) {
    for (const [storedKey, window] of clickWindows) {
      if (window.resetAt <= now) clickWindows.delete(storedKey);
    }
  }

  const current = clickWindows.get(key);

  if (!current || current.resetAt <= now) {
    clickWindows.set(key, { count: 1, resetAt: now + CLICK_WINDOW_MS });
    return true;
  }

  current.count += 1;
  return current.count <= CLICK_LIMIT;
}

export function registerCtaAnalyticsRoutes(app: Express) {
  app.post("/api/analytics/cta-click", async (req, res) => {
    if (!isSameOrigin(req)) return res.status(403).json({ message: "Invalid request origin" });
    if (!withinClickLimit(req)) return res.status(429).json({ message: "Too many events" });

    const parsed = clickSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid analytics event" });

    const event = parsed.data;
    try {
      await pool.query(
        `INSERT INTO cta_click_events
          (event_type, placement, page_path, referrer, utm_source, utm_medium, utm_campaign)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          event.eventType,
          event.placement,
          event.pagePath,
          event.referrer || null,
          event.utmSource || null,
          event.utmMedium || null,
          event.utmCampaign || null,
        ],
      );
      return res.status(204).end();
    } catch (error) {
      console.error("CTA analytics insert failed:", error);
      return res.status(500).json({ message: "Unable to record event" });
    }
  });

  app.get("/api/admin/cta-analytics", isAdmin, async (_req, res) => {
    res.setHeader("Cache-Control", "no-store");
    try {
      const [summaryResult, placementResult, recentResult] = await Promise.all([
        pool.query(`
          SELECT
            COUNT(*)::int AS "totalClicks",
            COUNT(*) FILTER (WHERE event_type = 'instagram_order')::int AS "instagramClicks",
            COUNT(*) FILTER (WHERE event_type = 'wholesale_email')::int AS "wholesaleClicks",
            COUNT(*) FILTER (WHERE created_at >= now() - interval '7 days')::int AS "last7Days"
          FROM cta_click_events
        `),
        pool.query(`
          SELECT event_type AS "eventType", placement, COUNT(*)::int AS clicks
          FROM cta_click_events
          GROUP BY event_type, placement
          ORDER BY clicks DESC, event_type, placement
        `),
        pool.query(`
          SELECT
            id,
            event_type AS "eventType",
            placement,
            page_path AS "pagePath",
            referrer,
            utm_source AS "utmSource",
            utm_medium AS "utmMedium",
            utm_campaign AS "utmCampaign",
            created_at AS "createdAt"
          FROM cta_click_events
          ORDER BY created_at DESC
          LIMIT 100
        `),
      ]);

      return res.json({
        summary: summaryResult.rows[0],
        byPlacement: placementResult.rows,
        recentEvents: recentResult.rows,
      });
    } catch (error) {
      console.error("CTA analytics query failed:", error);
      return res.status(500).json({ message: "Unable to load CTA analytics" });
    }
  });
}
