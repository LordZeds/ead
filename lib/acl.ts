import { readSession } from '@/lib/auth';export async function requireAdmin(){const s=await readSession();return s&&s.role==='admin'?s:null;}
