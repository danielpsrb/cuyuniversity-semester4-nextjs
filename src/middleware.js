import { NextResponse, NextRequest } from "next/server";
import NextAuth from "next-auth";
import authConfig from "../auth.config";

const { auth } = NextAuth(authConfig);

export async function middleware(request) {

  const session = await auth()

  const { pathname } = request.nextUrl;

  if (!session && pathname.startsWith('/users')) {
    // Redirect to the unauthorized page
    return NextResponse.redirect(new URL("/unAuthorized", request.url));
  }
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}