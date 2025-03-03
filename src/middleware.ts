import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { NextRequestWithAuth } from "next-auth/middleware"

export default async function middleware(req: NextRequestWithAuth) {
  // Bypass authentication for testing
  return NextResponse.next()

  // Original authentication logic commented out for testing
  /*
  const token = await getToken({ req })
  const isAuthenticated = !!token
  
  // Get the pathname from the URL
  const path = req.nextUrl.pathname

  // Define protected routes and their required roles
  const protectedPatientRoutes = path.startsWith('/dashboard/patient')
  const protectedDoctorRoutes = path.startsWith('/dashboard/doctor')
  const protectedAdminRoutes = path.startsWith('/dashboard/admin')

  // Redirect logic based on authentication and roles
  if (!isAuthenticated && (protectedPatientRoutes || protectedDoctorRoutes || protectedAdminRoutes)) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  if (isAuthenticated) {
    const userRole = token.role as string

    if (protectedDoctorRoutes && userRole !== 'DOCTOR' && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard/patient', req.url))
    }

    if (protectedAdminRoutes && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard/patient', req.url))
    }
  }

  return NextResponse.next()
  */
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/scan/:path*',
  ],
}
