
import type { Express } from "express";
import { getRecentAdminAuditLogs, isAdmin, publicAdminUser } from "../auth";
import { storage } from "../storage";

export function registerAuthRoutes(app: Express) {
  app.get('/api/auth/user', isAdmin, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user) return res.status(401).json({ message: "Unauthorized" });
      return res.json(publicAdminUser(user));
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.get('/api/admin/audit-log', isAdmin, async (_req, res) => {
    try {
      return res.json(await getRecentAdminAuditLogs());
    } catch (error) {
      console.error("Error fetching admin audit log:", error);
      return res.status(500).json({ message: "Failed to fetch audit log" });
    }
  });
}
