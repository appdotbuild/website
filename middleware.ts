import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  
  if (pathname.startsWith('/handler')) {
    const rewriteUrl = new URL(`${pathname}${search}`, 'https://admin.app.build');
    return NextResponse.rewrite(rewriteUrl);
  }
  
  if (pathname.startsWith('/api/auth/cli')) {
    const rewriteUrl = new URL(`${pathname}${search}`, 'https://admin.app.build');
    return NextResponse.rewrite(rewriteUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/handler/:path*',
    '/api/auth/cli/:path*',
  ],
};
