export const runtime = 'nodejs';
import { NextResponse } from 'next/server';import { readSession } from '@/lib/auth';export async function GET(){const s=await readSession();if(!s)return NextResponse.json({message:'Unauthorized'},{status:401});return NextResponse.json({id:s.sub,email:s.email,role:s.role,name:null});}
