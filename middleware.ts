import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  
  if (pathname.startsWith('/handler/')) {
    const targetHost = 'app-build-admin-git-extract-github-fns-neondatabase.vercel.app';
    
    const targetUrl = new URL(`https://${targetHost}${pathname}${search}`);
    
    console.log(`Rewriting to: ${targetUrl.toString()}`);
    
    return NextResponse.rewrite(targetUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/handler/:path*'],
};
