
import type { Express } from "express";
import { desc } from "drizzle-orm";
import { batteryInquiries } from "@shared/schema";
import { isAuthenticated } from "../auth";
import { db } from "../db";
import { storage } from "../storage";

function getBatteryInquiriesForAdmin() {
  return db
    .select({
      id: batteryInquiries.id,
      inquiryType: batteryInquiries.inquiryType,
      productSlug: batteryInquiries.productSlug,
      name: batteryInquiries.name,
      email: batteryInquiries.email,
      phone: batteryInquiries.phone,
      location: batteryInquiries.location,
      quantity: batteryInquiries.quantity,
      businessName: batteryInquiries.businessName,
      notes: batteryInquiries.notes,
      sourcePath: batteryInquiries.sourcePath,
      ctaPlacement: batteryInquiries.ctaPlacement,
      utmSource: batteryInquiries.utmSource,
      utmMedium: batteryInquiries.utmMedium,
      utmCampaign: batteryInquiries.utmCampaign,
      utmContent: batteryInquiries.utmContent,
      referrer: batteryInquiries.referrer,
      status: batteryInquiries.status,
      notificationStatus: batteryInquiries.notificationStatus,
      notificationAttempts: batteryInquiries.notificationAttempts,
      notificationLastAttemptAt: batteryInquiries.notificationLastAttemptAt,
      ownerNotifiedAt: batteryInquiries.ownerNotifiedAt,
      createdAt: batteryInquiries.createdAt,
    })
    .from(batteryInquiries)
    .orderBy(desc(batteryInquiries.createdAt));
}

function toCsvCell(value: unknown) {
  const rawValue = value ?? "";
  const stringValue = rawValue instanceof Date ? rawValue.toISOString() : String(rawValue);
  const spreadsheetSafeValue = /^[\t\r\n ]*[=+\-@]/.test(stringValue)
    ? `'${stringValue}`
    : stringValue;

  return `"${spreadsheetSafeValue.replace(/"/g, '""')}"`;
}

export function registerAdminRoutes(app: Express) {
  app.get("/api/admin/battery-inquiries", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);

      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }

      const inquiries = await getBatteryInquiriesForAdmin();
      res.setHeader("Cache-Control", "private, no-store");
      return res.json(inquiries);
    } catch (error) {
      console.error("Error fetching battery inquiries:", error);
      return res.status(500).json({ message: "Failed to fetch battery inquiries" });
    }
  });

  // Download CSV endpoint (admin only)
  app.get("/api/admin/download/:type", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const { type } = req.params;
      let data: any[] = [];
      let filename = '';

      switch (type) {
        case 'subscribers':
          data = await storage.getAllNewsletterSubscribers();
          filename = 'newsletter-subscribers';
          break;
        case 'applications':
          data = await storage.getAllJobApplications();
          filename = 'job-applications';
          // Remove resume data from CSV export
          data = data.map(({ resumeFileData, ...rest }) => rest);
          break;
        case 'events':
          data = await storage.getAllEventBookings();
          filename = 'event-bookings';
          break;
        case 'contacts':
          data = await storage.getAllContactSubmissions();
          filename = 'contact-submissions';
          break;
        case 'battery-inquiries':
          data = await getBatteryInquiriesForAdmin();
          filename = 'battery-inquiries';
          break;
        default:
          return res.status(400).json({ message: "Invalid download type" });
      }

      if (!data || data.length === 0) {
        return res.status(404).json({ message: "No data to export" });
      }

      // Generate CSV content
      const headers = Object.keys(data[0]);
      const csvContent = [
        headers.map(toCsvCell).join(','),
        ...data.map(row => headers.map(header => toCsvCell(row[header])).join(','))
      ].join('\n');

      // Set headers for file download
      const dateStr = new Date().toISOString().split('T')[0];
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}-${dateStr}.csv"`);
      res.setHeader('Cache-Control', 'private, no-store');
      res.send(csvContent);

    } catch (error) {
      console.error("Error generating CSV:", error);
      res.status(500).json({ message: "Failed to generate CSV" });
    }
  });

  // Download resume endpoint (admin only)
  app.get("/api/admin/resume/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const applications = await storage.getAllJobApplications();
      const application = applications.find(app => app.id === parseInt(req.params.id));

      if (!application || !application.resumeFileData) {
        return res.status(404).json({ message: "Resume not found" });
      }

      // Parse data URL to extract MIME type and base64 data
      const [mimeInfo, base64Data] = application.resumeFileData.split(',');
      const mimeType = mimeInfo.split(':')[1].split(';')[0];

      // Convert base64 to buffer
      const buffer = Buffer.from(base64Data, 'base64');

      // Set headers for file download
      res.setHeader('Content-Type', mimeType);
      res.setHeader('Content-Disposition', `attachment; filename="${application.resumeFileName}"`);
      res.send(buffer);

    } catch (error) {
      console.error("Error downloading resume:", error);
      res.status(500).json({ message: "Failed to download resume" });
    }
  });
}
