


import micromatch from 'micromatch';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add routes that don't require authentication
const unAuthenticatedRoutes = [
  '/',
  '/api/auth/**',
  '/api/oauth/**',
  '/api/scim/v2.0/**',
  '/auth/**',
  '/login',
  '/signup',
  '/((?!_next/static|favicon.ico).*)'
];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Bypass routes that don't require authentication
  if (micromatch.isMatch(pathname, unAuthenticatedRoutes)) {
    return NextResponse.next();
  }
  const token = await getToken({
    req,
  });
  
  // No token, redirect to login page
  if (!token) {
    const url = new URL('/login', req.url);
    url.searchParams.set('callbackUrl ', encodeURI(req.url)) 
    
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('user', JSON.stringify(token))
  // All good, next and add user to header
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

 