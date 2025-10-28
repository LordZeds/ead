import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SESSION_COOKIE = 'session';

function csp(_: NextRequest) {
  const self = "'self'";
  return [
    `default-src ${self}`,
    `script-src ${self} 'unsafe-inline'`,
    `style-src ${self} 'unsafe-inline' https://fonts.googleapis.com`,
    `font-src ${self} https://fonts.gstatic.com`,
    `img-src ${self} data: blob:`,
    `media-src ${self} https: data: blob:`,
    `connect-src ${self} https:`,
    `frame-ancestors 'none'`,
    `base-uri ${self}`,
    `form-action ${self}`
  ].join('; ');
}

async function readSession(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret');
    const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] });
    return { sub: String(payload.sub), role: String(payload.role), email: String(payload.email) };
  } catch { return null; }
}

const isPath = (url: URL, prefix: string) => url.pathname.startsWith(prefix);

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const res = NextResponse.next();

  res.headers.set('Content-Security-Policy', csp(req));
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  if (isPath(url, '/app')) {
    const s = await readSession(req);
    if (!s && url.pathname !== '/app/login') {
      return NextResponse.redirect(new URL('/app/login', url));
    }
    if (isPath(url, '/app/admin') && s?.role !== 'admin') {
      return NextResponse.redirect(new URL('/app/dashboard', url));
    }
  }

  if (isPath(url, '/api/admin') || isPath(url, '/api/email')) {
    const s = await readSession(req);
    if (!s || s.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/app/:path*',
    '/api/admin/:path*',
    '/api/email/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ],
};
