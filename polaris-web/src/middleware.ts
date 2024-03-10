import { NextResponse } from 'next/server'

export function middleware (request: Request) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('ps-url', request.url)

  const ip = request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for') ||
    request.headers.get('remote_addr') ||
    request.headers.get('client_ip') ||
    request.headers.get('host') ||
    request.headers.get('referer') ||
    request.headers.get('origin') ||
    request.headers.get('x-forwarded-host') ||
    request.headers.get('x-forwarded-server') ||
    request.headers.get('via') ||
    request.headers.get('x-cluster-client-ip') ||
    request.headers.get('x-forwarded') ||
    request.headers.get('forwarded-for') ||
    request.headers.get('forwarded') ||
    request.headers.get('user-agent') ||
    request.headers.get('x-request-id') ||
    request.headers.get('x-envoy-external-address') ||
    request.headers.get('x-original-forwarded-for') ||
    request.headers.get('x-original-url') ||
    request.headers.get('x-forwarded-host') ||
    request.headers.get('x-forwarded-server')

  requestHeaders.set('ps-ip', ip || 'unknown')

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
}
