import { auth } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

export async function proxy(request) {
  const session = await auth();

  const pathname = new URL(request.url).pathname;

  if (!session && pathname.startsWith("/users")) {
    return NextResponse.redirect(new URL("/unAuthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
