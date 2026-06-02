import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const timestamp = new Date().toISOString();

  console.log(`[Proxy] Path: ${path} | Time: ${timestamp}`);

  const authToken = request.cookies.get("auth_token")?.value;

  if (!authToken || authToken.trim() === "") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("error", "unauthorized");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tasks/:path*", "/create/:path*"],
};
