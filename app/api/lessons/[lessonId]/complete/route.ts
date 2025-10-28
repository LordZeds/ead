export const runtime = 'nodejs';
import { NextRequest,NextResponse } from 'next/server';import { db } from '@/db/client';export async function POST(req:NextRequest,{params}:{params:{lessonId:string}}){const { progressPct }=await req.json();await db.execute(`select 1`);return NextResponse.json({ok:true});}
