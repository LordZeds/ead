import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL || '';
export const pool = new Pool({ connectionString, ssl: connectionString.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined });
export const db = drizzle(pool);
