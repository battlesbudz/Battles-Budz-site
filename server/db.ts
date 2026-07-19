import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });

export async function ensureNewsletterSubscribersTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id serial PRIMARY KEY,
      email text NOT NULL UNIQUE,
      created_at timestamp NOT NULL DEFAULT now()
    )
  `);
}

export async function ensureProductUpdateSubscribersTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS product_update_subscribers (
      id serial PRIMARY KEY,
      email text NOT NULL,
      product_slug text NOT NULL,
      product_name text NOT NULL,
      created_at timestamp NOT NULL DEFAULT now(),
      CONSTRAINT product_update_subscribers_email_product_slug_unique UNIQUE (email, product_slug)
    )
  `);
}

export async function ensureBatteryInquiriesTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS battery_inquiries (
      id serial PRIMARY KEY,
      inquiry_type text NOT NULL,
      product_slug text NOT NULL DEFAULT 'dual-cart-battery',
      name text NOT NULL,
      email text NOT NULL,
      phone text,
      location text NOT NULL,
      quantity integer NOT NULL,
      business_name text,
      notes text,
      source_path text NOT NULL DEFAULT '/battery',
      cta_placement text NOT NULL,
      utm_source text,
      utm_medium text,
      utm_campaign text,
      utm_content text,
      referrer text,
      idempotency_key varchar(64) NOT NULL UNIQUE,
      request_fingerprint varchar(64) NOT NULL,
      status text NOT NULL DEFAULT 'new',
      notification_status text NOT NULL DEFAULT 'pending',
      notification_attempts integer NOT NULL DEFAULT 0,
      notification_last_attempt_at timestamp,
      owner_notified_at timestamp,
      created_at timestamp NOT NULL DEFAULT now(),
      CONSTRAINT battery_inquiries_type_check CHECK (inquiry_type IN ('consumer', 'wholesale')),
      CONSTRAINT battery_inquiries_quantity_check CHECK (quantity BETWEEN 1 AND 10000),
      CONSTRAINT battery_inquiries_notification_status_check
        CHECK (notification_status IN ('pending', 'sending', 'sent', 'failed', 'not_configured'))
    )
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS battery_inquiries_email_created_at_idx
      ON battery_inquiries (email, created_at)
  `);
}
