import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  const isAuthRoute = pathname.startsWith('/login')
  const isDashboardRoute =
    pathname.startsWith('/overview') ||
    pathname.startsWith('/personal') ||
    pathname.startsWith('/business') ||
    pathname.startsWith('/income-tax') ||
    pathname.startsWith('/gamification') ||
    pathname.startsWith('/profile') ||
    pathname.startsWith('/settings')

  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/overview', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/overview/:path*',
    '/personal/:path*',
    '/business/:path*',
    '/income-tax/:path*',
    '/gamification/:path*',
    '/profile/:path*',
    '/settings/:path*',
  ],
}
