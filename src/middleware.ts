import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { NextRequestWithAuth } from "next-auth/middleware"
import { NextRequest } from "next/server"

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // Skip password check for the password page itself and API routes
  if (path === '/password' || path.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  // Check if the user has entered the correct password
  const siteAccess = req.cookies.get('site_access');
  
  if (!siteAccess || siteAccess.value !== 'granted') {
    // Redirect to password page
    const url = req.nextUrl.clone();
    url.pathname = '/password';
    return NextResponse.redirect(url);
  }
  
  // If we have a valid password cookie, continue to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
