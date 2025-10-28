export const runtime = 'nodejs';
import { NextResponse } from 'next/server';export async function GET(_:Request,{params}:{params:{code:string}}){const html=`<h1>Certificado</h1><p>Código: ${params.code}</p>`;return new NextResponse(html,{headers:{'Content-Type':'text/html; charset=utf-8'}});}
