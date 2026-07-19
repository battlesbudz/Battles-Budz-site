import express, { type Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { ensureAdminAuthTables, ensureCtaClickEventsTable, ensureNewsletterSubscribersTable, ensureProductUpdateSubscribersTable } from "./db";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      log(`${req.method} ${path} ${res.statusCode} in ${duration}ms`);
    }
  });

  next();
});

(async () => {
  await ensureNewsletterSubscribersTable();
  await ensureProductUpdateSubscribersTable();
  await ensureAdminAuthTables();
  await ensureCtaClickEventsTable();

  const server = await registerRoutes(app);

  app.use(["/admin", "/admin/*"], (_req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
    next();
  });

  const publicRedirects = [
    { pattern: /^\/(batteries|dual-cart-battery)\/?$/, destination: "/battery" },
    { pattern: /^\/products\/dual-cart-battery\/?$/, destination: "/battery" },
    { pattern: /^\/justin-battles-cannabis\/?$/, destination: "/" },
    { pattern: /^\/location(?:\/.*)?$/, destination: "/" },
    { pattern: /^\/community(?:\/.*)?$/, destination: "/" },
    { pattern: /^\/enhanced-community\/?$/, destination: "/" },
    { pattern: /^\/(investors|investor-portal)\/?$/, destination: "/" },
    { pattern: /^\/login\/?$/, destination: "/admin/login" },
    { pattern: /^\/dashboard\/?$/, destination: "/admin" },
  ];

  app.use((req, res, next) => {
    if (["GET", "HEAD"].includes(req.method)) {
      const redirect = publicRedirects.find(({ pattern }) => pattern.test(req.path));

      if (redirect) {
        return res.redirect(301, redirect.destination);
      }
    }

    next();
  });

  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next(err);
    const status = err.status || err.statusCode || 500;
    const message = status >= 500 ? "Internal Server Error" : err.message || "Request failed";

    console.error("Request failed:", err);
    res.status(status).json({ message });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
