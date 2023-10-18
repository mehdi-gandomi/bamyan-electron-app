import { NextResponse } from 'next/server'

export function middleware(request) {
  const userToken = request.cookies.get('access_token');
  console.log(userToken)
  if(!userToken) {
     return NextResponse.redirect(new URL('/auth/login',request.url))
  }

  else {
   return NextResponse.next()
  }
}
export const config = {
    matcher: ['/'],
  }
