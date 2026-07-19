import { index, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const ctaClickEvents = pgTable(
  "cta_click_events",
  {
    id: serial("id").primaryKey(),
    eventType: varchar("event_type", { length: 40 }).notNull(),
    placement: varchar("placement", { length: 40 }).notNull(),
    pagePath: varchar("page_path", { length: 200 }).notNull(),
    referrer: varchar("referrer", { length: 500 }),
    utmSource: varchar("utm_source", { length: 100 }),
    utmMedium: varchar("utm_medium", { length: 100 }),
    utmCampaign: varchar("utm_campaign", { length: 100 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("cta_click_events_created_at_idx").on(table.createdAt)],
);

export type CtaClickEvent = typeof ctaClickEvents.$inferSelect;
