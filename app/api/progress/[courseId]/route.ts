export const runtime = 'nodejs';
import { NextResponse } from 'next/server';export async function GET(){return NextResponse.json({pct:0,completed:0,total:0});}
