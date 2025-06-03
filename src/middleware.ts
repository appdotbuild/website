import { type NextRequest, NextResponse } from 'next/server';

const baseUrl = process.env.ADMIN_APP_URL || 'https://admin.app.build';

export function middleware(request: NextRequest) {
  try {
    if (
      request.nextUrl.pathname.startsWith('/handler') ||
      request.nextUrl.pathname.startsWith('/api/auth')
    ) {
      const url = new URL(request.nextUrl.pathname, baseUrl);
      url.search = request.nextUrl.search;

      return NextResponse.rewrite(url);
    }

    if (request.nextUrl.pathname.startsWith('/_next')) {
      if (request.headers.get('referer')?.includes('/handler')) {
        const url = new URL(request.nextUrl.pathname, baseUrl);
        url.search = request.nextUrl.search;

        const response = NextResponse.rewrite(url);

        const isFont =
          request.nextUrl.pathname.includes('.woff') ||
          request.nextUrl.pathname.includes('.ttf') ||
          request.nextUrl.pathname.includes('.otf');
        const isCSS = request.nextUrl.pathname.includes('.css');

        if (isFont || isCSS) {
          response.headers.set('Access-Control-Allow-Origin', '*');
          response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        } else {
          response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        }

        return response;
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Middleware error:', error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/handler/:path*', '/_next/:path*', '/api/auth/:path*'],
};
