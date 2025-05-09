import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  
  if (pathname.startsWith('/handler/')) {
    console.log(`[Middleware] processing: ${pathname}${search}`);
    
    const targetUrl = new URL(`https://admin.app.build${pathname}${search}`);
    console.log(`[Middleware] redirecting to: ${targetUrl.toString()}`);
    
    return NextResponse.rewrite(targetUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/handler/:path*'],
};
