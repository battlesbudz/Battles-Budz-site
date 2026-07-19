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

export async function ensureAdminAuthTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_credentials (
      user_id varchar PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      password_hash text NOT NULL,
      password_set_at timestamp NOT NULL DEFAULT now(),
      last_login_at timestamp
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_audit_logs (
      id serial PRIMARY KEY,
      user_id varchar REFERENCES users(id) ON DELETE SET NULL,
      action varchar(80) NOT NULL,
      metadata jsonb,
      created_at timestamp NOT NULL DEFAULT now()
    )
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS admin_audit_logs_created_at_idx
      ON admin_audit_logs (created_at)
  `);
}
