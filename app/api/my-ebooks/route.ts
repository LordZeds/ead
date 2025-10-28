export const runtime = 'nodejs';
import { NextResponse } from 'next/server';import { db } from '@/db/client';export async function GET(){const rows=await db.execute(`select * from ebooks limit 50`);return NextResponse.json(rows.rows);}
