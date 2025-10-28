export const runtime = 'nodejs';
import { NextResponse } from 'next/server';import { db } from '@/db/client';export async function GET(){return NextResponse.json((await db.execute(`select c.* from courses c limit 50`)).rows);}
