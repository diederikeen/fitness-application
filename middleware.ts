import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./pages/_app";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // if user is not logged in return to login page
  if (auth.currentUser === null) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path",
};
