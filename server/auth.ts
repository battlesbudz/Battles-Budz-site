import type { Express, RequestHandler } from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";

function getSessionSecret() {
  if (process.env.SESSION_SECRET) {
    return process.env.SESSION_SECRET;
  }

  if (process.env.NODE_ENV === "production") {
    console.warn(
      "SESSION_SECRET is not set; using a temporary fallback. Set SESSION_SECRET in Railway for stable sessions.",
    );
  }

  return "battles-budz-session-fallback";
}

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000;
  const PgStore = connectPg(session);

  return session({
    secret: getSessionSecret(),
    store: process.env.DATABASE_URL
      ? new PgStore({
          conString: process.env.DATABASE_URL,
          createTableIfMissing: true,
          ttl: sessionTtl,
          tableName: "sessions",
        })
      : undefined,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: sessionTtl,
    },
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());

  app.get("/api/login", (_req, res) => {
    res.status(501).json({
      message: "Authentication is not configured for this deployment.",
    });
  });

  app.post("/api/auth/login", (_req, res) => {
    res.status(501).json({
      message: "Authentication is not configured for this deployment.",
    });
  });

  app.get("/api/logout", (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  const user = (req.session as typeof req.session & {
    user?: { claims?: { sub?: string }; expires_at?: number };
  }).user;

  if (!user?.claims?.sub) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (user.expires_at && Math.floor(Date.now() / 1000) > user.expires_at) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  (req as typeof req & { user?: typeof user }).user = user;
  return next();
};
