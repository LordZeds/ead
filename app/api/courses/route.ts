export const runtime = 'nodejs';
import { NextResponse } from 'next/server';import { db } from '@/db/client';import { courses } from '@/db/schema';export async function GET(){const list=await db.select().from(courses);return NextResponse.json(list);}
