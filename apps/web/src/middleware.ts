import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const url = req.nextUrl

  const path = url.pathname

  const session = await getToken({ req })

  if (session && ['/login/web3', '/login/web2', '/login'].includes(path)) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  const shouldLogin = [
    '/dashboard',
    '/cli-login',
    '/desktop-login',
    '/password',
    '/user',
  ].includes(path)

  if (shouldLogin && !session) {
    // return NextResponse.redirect(new URL('/login/web3', req.url))

    const from = encodeURIComponent(req.url)
    return NextResponse.redirect(new URL(`/login?from=${from}`, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/user',
    '/login/web3',
    '/login/web2',
    '/cli-login',
    '/desktop-login',
    '/dashboard',
    '/s/(.*)',
  ],
}
