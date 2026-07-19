import { sql } from "drizzle-orm";
import { check, index, pgTable, text, varchar, serial, timestamp, decimal, integer, boolean, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(), // "cannabis", "apparel", "accessories"
  imageUrl: text("image_url"),
  inStock: boolean("in_stock").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"), // "pending", "confirmed", "shipped", "delivered"
  customerEmail: text("customer_email"),
  customerName: text("customer_name"),
  shippingAddress: text("shipping_address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id).notNull(),
  productId: integer("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const productUpdateSubscribers = pgTable("product_update_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  productSlug: text("product_slug").notNull(),
  productName: text("product_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  emailProductUnique: unique("product_update_subscribers_email_product_slug_unique").on(table.email, table.productSlug),
}));

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const batteryInquiries = pgTable("battery_inquiries", {
  id: serial("id").primaryKey(),
  inquiryType: text("inquiry_type").notNull(),
  productSlug: text("product_slug").notNull().default("dual-cart-battery"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  location: text("location").notNull(),
  quantity: integer("quantity").notNull(),
  businessName: text("business_name"),
  notes: text("notes"),
  sourcePath: text("source_path").notNull().default("/battery"),
  ctaPlacement: text("cta_placement").notNull(),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmContent: text("utm_content"),
  referrer: text("referrer"),
  idempotencyKey: varchar("idempotency_key", { length: 64 }).notNull().unique(),
  requestFingerprint: varchar("request_fingerprint", { length: 64 }).notNull(),
  status: text("status").notNull().default("new"),
  notificationStatus: text("notification_status").notNull().default("pending"),
  notificationAttempts: integer("notification_attempts").notNull().default(0),
  notificationLastAttemptAt: timestamp("notification_last_attempt_at"),
  ownerNotifiedAt: timestamp("owner_notified_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  emailCreatedAtIndex: index("battery_inquiries_email_created_at_idx").on(table.email, table.createdAt),
  inquiryTypeCheck: check(
    "battery_inquiries_type_check",
    sql`${table.inquiryType} IN ('consumer', 'wholesale')`,
  ),
  quantityCheck: check(
    "battery_inquiries_quantity_check",
    sql`${table.quantity} BETWEEN 1 AND 10000`,
  ),
  notificationStatusCheck: check(
    "battery_inquiries_notification_status_check",
    sql`${table.notificationStatus} IN ('pending', 'sending', 'sent', 'failed', 'not_configured')`,
  ),
}));

// Insert schemas
export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  price: true,
  category: true,
  imageUrl: true,
  inStock: true,
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  userId: true,
  total: true,
  customerEmail: true,
  customerName: true,
  shippingAddress: true,
});

export const insertOrderItemSchema = createInsertSchema(orderItems).pick({
  orderId: true,
  productId: true,
  quantity: true,
  price: true,
});

export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers).pick({
  email: true,
});

export const insertProductUpdateSubscriberSchema = createInsertSchema(productUpdateSubscribers).pick({
  email: true,
  productSlug: true,
  productName: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  message: true,
});

// Types
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;
export type InsertNewsletterSubscriber = z.infer<typeof insertNewsletterSubscriberSchema>;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertProductUpdateSubscriber = z.infer<typeof insertProductUpdateSubscriberSchema>;
export type ProductUpdateSubscriber = typeof productUpdateSubscribers.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type BatteryInquiry = typeof batteryInquiries.$inferSelect;
