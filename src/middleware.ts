import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/panel-administracion", req.url));
  }

  if (!session && pathname.startsWith("/panel-administracion")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  } else if (session && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/panel-administracion", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
