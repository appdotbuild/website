import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  
  if (pathname.startsWith('/api/auth')) {
    const rewriteUrl = new URL(`${pathname}${search}`, 'https://admin.app.build');
    return NextResponse.rewrite(rewriteUrl);
  }
  
  if (pathname.startsWith('/api/')) {
    const rewriteUrl = new URL(`${pathname}${search}`, 'https://admin.app.build');
    return NextResponse.rewrite(rewriteUrl);
  }
  
  if (pathname.startsWith('/_next/')) {
    const rewriteUrl = new URL(`${pathname}${search}`, 'https://admin.app.build');
    return NextResponse.rewrite(rewriteUrl);
  }
  
  if (pathname.startsWith('/handler')) {
    const rewriteUrl = new URL(`${pathname}${search}`, 'https://admin.app.build');
    const response = NextResponse.rewrite(rewriteUrl);
    
    return response;
  }
}

export const config = {
  matcher: [
    '/handler/:path*',
    '/api/:path*',
    '/api/auth/:path*',
    '/_next/static/:path*',
    '/_next/image/:path*',
    '/_next/data/:path*'
  ],
};
