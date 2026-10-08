import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected =
    pathname.startsWith('/product/') ||
    pathname.startsWith('/products/') ||
    pathname === '/profile' ||
    pathname.startsWith('/profile/');

  if (isProtected) {
    const sessionCookie =
      request.cookies.get('better-auth.session_token')?.value ||
      request.cookies.get('__Secure-better-auth.session_token')?.value ||
      getSessionCookie(request);
    if (!sessionCookie) {
      const redirectUrl = new URL('/signin', request.url);
      redirectUrl.searchParams.set('callbackURL', pathname);
      redirectUrl.searchParams.set('auth_redirect', '1');
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/product/:path*', '/products/:path*', '/profile', '/profile/:path*'],
};
