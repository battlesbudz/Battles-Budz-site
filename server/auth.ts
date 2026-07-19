import { randomBytes, randomUUID, timingSafeEqual } from "crypto";
import type { Express, NextFunction, Request, RequestHandler, Response } from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { compare, hash } from "bcryptjs";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { adminAuditLogs, adminCredentials, users, type User } from "@shared/schema";
import { db, pool } from "./db";

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "battlesbudz@gmail.com").trim().toLowerCase();
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 5;
const transientSessionSecret = randomBytes(32).toString("hex");
const dummyPasswordHash = hash(randomUUID(), 12);

type AdminSession = session.Session & Partial<session.SessionData> & {
  adminUserId?: string;
};

type AuthenticatedRequest = Request & {
  user?: { claims: { sub: string } };
};

type LoginAttempt = { count: number; resetAt: number };
const loginAttempts = new Map<string, LoginAttempt>();

const passwordSchema = z
  .string()
  .min(12, "Password must be at least 12 characters")
  .max(128, "Password must be no more than 128 characters");

const loginSchema = z.object({
  email: z.string().email().transform((value) => value.trim().toLowerCase()),
  password: z.string().min(1).max(128),
});

const setupSchema = loginSchema.extend({
  password: passwordSchema,
  setupToken: z.string().min(16).max(512),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1).max(128),
  newPassword: passwordSchema,
});

const recoverySchema = z.object({
  email: z.string().email().transform((value) => value.trim().toLowerCase()),
  newPassword: passwordSchema,
  recoveryToken: z.string().min(16).max(512),
});

function getSessionSecret() {
  if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET;

  console.warn(
    "SESSION_SECRET is not set; using a secure temporary secret. Set SESSION_SECRET in Railway so admin sessions survive restarts.",
  );
  return transientSessionSecret;
}

function getAdminSession(req: Request) {
  return req.session as AdminSession;
}

function getAdminUserId(req: Request) {
  return getAdminSession(req).adminUserId;
}

function publicAdminUser(user: User) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function isSameOrigin(req: Request) {
  const origin = req.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).host === req.get("host");
  } catch {
    return false;
  }
}

function tokensMatch(received: string, expected: string | undefined) {
  if (!expected) return false;
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);
  return receivedBuffer.length === expectedBuffer.length && timingSafeEqual(receivedBuffer, expectedBuffer);
}

function loginKey(req: Request, email: string) {
  return `${req.ip || "unknown"}:${email === ADMIN_EMAIL ? ADMIN_EMAIL : "other"}`;
}

function asyncHandler(
  handler: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<unknown>,
): RequestHandler {
  return (req, res, next) => {
    void handler(req, res, next).catch(next);
  };
}

function isLoginBlocked(key: string) {
  const attempt = loginAttempts.get(key);
  if (!attempt) return false;
  if (attempt.resetAt <= Date.now()) {
    loginAttempts.delete(key);
    return false;
  }
  return attempt.count >= MAX_LOGIN_ATTEMPTS;
}

function recordFailedLogin(key: string) {
  const now = Date.now();
  const current = loginAttempts.get(key);
  if (!current || current.resetAt <= now) {
    loginAttempts.set(key, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return;
  }
  current.count += 1;
}

async function regenerateSession(req: Request) {
  await new Promise<void>((resolve, reject) => {
    req.session.regenerate((error) => (error ? reject(error) : resolve()));
  });
}

async function saveSession(req: Request) {
  await new Promise<void>((resolve, reject) => {
    req.session.save((error) => (error ? reject(error) : resolve()));
  });
}

async function establishAdminSession(req: Request, userId: string) {
  await regenerateSession(req);
  getAdminSession(req).adminUserId = userId;
  await saveSession(req);
}

async function recordAudit(userId: string | null, action: string, metadata?: Record<string, unknown>) {
  try {
    await db.insert(adminAuditLogs).values({ userId, action, metadata });
  } catch (error) {
    console.error("Failed to record admin audit event:", error);
  }
}

async function getConfiguredAdmin() {
  const [result] = await db
    .select({ user: users, credential: adminCredentials })
    .from(users)
    .leftJoin(adminCredentials, eq(adminCredentials.userId, users.id))
    .where(eq(users.email, ADMIN_EMAIL))
    .limit(1);
  return result;
}

export function getSession() {
  const PgStore = connectPg(session);

  return session({
    name: "battlesbudz.admin.sid",
    secret: getSessionSecret(),
    store: process.env.DATABASE_URL
      ? new PgStore({
          conString: process.env.DATABASE_URL,
          createTableIfMissing: true,
          ttl: Math.floor(SESSION_TTL_MS / 1000),
          tableName: "sessions",
        })
      : undefined,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_TTL_MS,
    },
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());

  app.get("/api/admin/auth/status", asyncHandler(async (_req, res) => {
    const admin = await getConfiguredAdmin();
    res.setHeader("Cache-Control", "no-store");
    res.json({
      adminEmail: ADMIN_EMAIL,
      setupRequired: !admin?.credential,
      setupAvailable: Boolean(process.env.ADMIN_SETUP_TOKEN),
    });
  }));

  app.post("/api/admin/auth/setup", asyncHandler(async (req, res) => {
    if (!isSameOrigin(req)) return res.status(403).json({ message: "Invalid request origin" });

    const parsed = setupSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0]?.message || "Invalid setup details" });

    const { email, password, setupToken } = parsed.data;
    const key = loginKey(req, email);
    if (isLoginBlocked(key)) return res.status(429).json({ message: "Too many attempts. Please try again later." });
    if (email !== ADMIN_EMAIL || !tokensMatch(setupToken, process.env.ADMIN_SETUP_TOKEN)) {
      recordFailedLogin(key);
      return res.status(403).json({ message: "Invalid setup credentials" });
    }

    const existing = await getConfiguredAdmin();
    if (existing?.credential) {
      return res.status(409).json({ message: "Admin setup has already been completed" });
    }

    const passwordHash = await hash(password, 12);
    const now = new Date();
    let user: User;

    if (existing?.user) {
      [user] = await db
        .update(users)
        .set({ role: "admin", updatedAt: now })
        .where(eq(users.id, existing.user.id))
        .returning();
    } else {
      [user] = await db
        .insert(users)
        .values({
          id: `admin-${randomUUID()}`,
          email: ADMIN_EMAIL,
          role: "admin",
        })
        .returning();
    }

    await db.insert(adminCredentials).values({ userId: user.id, passwordHash, passwordSetAt: now, lastLoginAt: now });

    await establishAdminSession(req, user.id);
    await recordAudit(user.id, "admin.setup_completed");
    loginAttempts.delete(key);
    res.status(201).json({ user: publicAdminUser(user) });
  }));

  const loginHandler = asyncHandler(async (req, res) => {
    if (!isSameOrigin(req)) return res.status(403).json({ message: "Invalid request origin" });

    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Enter a valid email and password" });

    const { email, password } = parsed.data;
    const key = loginKey(req, email);
    if (isLoginBlocked(key)) {
      res.setHeader("Retry-After", String(Math.ceil(LOGIN_WINDOW_MS / 1000)));
      return res.status(429).json({ message: "Too many login attempts. Please try again in 15 minutes." });
    }

    const admin = email === ADMIN_EMAIL ? await getConfiguredAdmin() : undefined;
    const validPassword = await compare(password, admin?.credential?.passwordHash || (await dummyPasswordHash));

    if (!admin?.credential || admin.user.role !== "admin" || !validPassword) {
      recordFailedLogin(key);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    loginAttempts.delete(key);
    const now = new Date();
    const [updatedAdmin] = await db.update(users).set({ updatedAt: now }).where(eq(users.id, admin.user.id))
      .returning();
    await db.update(adminCredentials).set({ lastLoginAt: now }).where(eq(adminCredentials.userId, admin.user.id));

    await establishAdminSession(req, admin.user.id);
    await recordAudit(admin.user.id, "admin.login");
    return res.json({ user: publicAdminUser(updatedAdmin) });
  });

  app.post("/api/admin/auth/login", loginHandler);
  app.post("/api/auth/login", loginHandler);

  app.post("/api/admin/auth/logout", isAuthenticated, asyncHandler(async (req: AuthenticatedRequest, res) => {
    if (!isSameOrigin(req)) return res.status(403).json({ message: "Invalid request origin" });
    const userId = req.user?.claims.sub || null;
    await recordAudit(userId, "admin.logout");
    req.session.destroy((error) => {
      if (error) return res.status(500).json({ message: "Unable to log out" });
      res.clearCookie("battlesbudz.admin.sid");
      return res.status(204).end();
    });
  }));

  app.post("/api/admin/auth/change-password", isAdmin, asyncHandler(async (req: AuthenticatedRequest, res) => {
    if (!isSameOrigin(req)) return res.status(403).json({ message: "Invalid request origin" });
    const parsed = changePasswordSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0]?.message || "Invalid password" });

    const userId = req.user!.claims.sub;
    const [credential] = await db.select().from(adminCredentials).where(eq(adminCredentials.userId, userId)).limit(1);
    if (!credential || !(await compare(parsed.data.currentPassword, credential.passwordHash))) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const now = new Date();
    const passwordHash = await hash(parsed.data.newPassword, 12);
    await db.update(adminCredentials).set({ passwordHash, passwordSetAt: now }).where(eq(adminCredentials.userId, userId));
    await db.update(users).set({ updatedAt: now }).where(eq(users.id, userId));
    await pool.query("DELETE FROM sessions");
    await establishAdminSession(req, userId);
    await recordAudit(userId, "admin.password_changed");
    return res.status(204).end();
  }));

  app.post("/api/admin/auth/recover", asyncHandler(async (req, res) => {
    if (!isSameOrigin(req)) return res.status(403).json({ message: "Invalid request origin" });
    const parsed = recoverySchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0]?.message || "Invalid recovery details" });

    const { email, newPassword, recoveryToken } = parsed.data;
    const key = loginKey(req, email);
    if (isLoginBlocked(key)) return res.status(429).json({ message: "Too many attempts. Please try again later." });

    const admin = await getConfiguredAdmin();
    if (email !== ADMIN_EMAIL || !admin?.credential || !tokensMatch(recoveryToken, process.env.ADMIN_SETUP_TOKEN)) {
      recordFailedLogin(key);
      return res.status(403).json({ message: "Invalid recovery credentials" });
    }

    const now = new Date();
    const passwordHash = await hash(newPassword, 12);
    await db.update(adminCredentials).set({ passwordHash, passwordSetAt: now }).where(eq(adminCredentials.userId, admin.user.id));
    await db.update(users).set({ updatedAt: now }).where(eq(users.id, admin.user.id));
    await pool.query("DELETE FROM sessions");
    await recordAudit(admin.user.id, "admin.password_recovered");
    loginAttempts.delete(key);
    return res.status(204).end();
  }));

}

export const isAuthenticated: RequestHandler = (req: AuthenticatedRequest, res, next) => {
  const userId = getAdminUserId(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  req.user = { claims: { sub: userId } };
  return next();
};

export const isAdmin: RequestHandler = asyncHandler(async (req: AuthenticatedRequest, res, next) => {
  const userId = getAdminUserId(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const [result] = await db
    .select({ user: users, credential: adminCredentials })
    .from(users)
    .innerJoin(adminCredentials, eq(adminCredentials.userId, users.id))
    .where(eq(users.id, userId))
    .limit(1);
  if (!result || result.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }

  req.user = { claims: { sub: result.user.id } };
  return next();
});

export async function getRecentAdminAuditLogs(limit = 50) {
  return db.select().from(adminAuditLogs).orderBy(desc(adminAuditLogs.createdAt)).limit(Math.min(limit, 100));
}

export { ADMIN_EMAIL, publicAdminUser };
