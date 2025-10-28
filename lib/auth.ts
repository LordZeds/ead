import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
const COOKIE='session';const ALG='HS256';
export async function createSession(user:{ id:string; role:string; email:string }){const secret=new TextEncoder().encode(process.env.JWT_SECRET||'dev-secret');const token=await new SignJWT({ sub:user.id, role:user.role, email:user.email }).setProtectedHeader({alg:ALG}).setIssuedAt().setExpirationTime('15d').sign(secret);cookies().set(COOKIE, token, { httpOnly:true, sameSite:'lax', secure:true, path:'/' });}
export async function clearSession(){cookies().set(COOKIE,'',{ httpOnly:true, maxAge:0, path:'/' });}
export async function readSession():Promise<{ sub:string; role:string; email:string }|null>{const token=cookies().get(COOKIE)?.value;if(!token)return null;try{const secret=new TextEncoder().encode(process.env.JWT_SECRET||'dev-secret');const { payload }=await jwtVerify(token,secret,{algorithms:[ALG]});return { sub:String(payload.sub), role:String(payload.role), email:String(payload.email) };}catch{return null;}}
export async function getCurrentUser(){return await readSession();}
