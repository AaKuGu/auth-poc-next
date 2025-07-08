import { NextRequest, NextResponse } from "next/server";
import { updateSession, getSession } from "./lib";

export async function middleware(request: NextRequest) {
  // Protect /dashboard route
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const session = await getSession();
    if (!session) {
      // Redirect unauthenticated users to home
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  // Refresh session for all requests
  return await updateSession(request);
}
