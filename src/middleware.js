import { NextResponse } from "next/server";

const COOKIE_NAME = "research_entry_confirmed";

export function middleware(request) {
  const { pathname, search } = request.nextUrl;

  // Always allow access to the entry screen.
  if (pathname === "/entry") {
    return NextResponse.next();
  }

  const accepted = request.cookies.get(COOKIE_NAME)?.value === "yes";

  if (accepted) {
    return NextResponse.next();
  }

  const entryUrl = new URL("/entry", request.url);

  // Return visitors to the page they originally requested.
  entryUrl.searchParams.set("next", pathname + search);

  return NextResponse.redirect(entryUrl);
}

export const config = {
  matcher: [
    /*
     * Protect normal website pages.
     * Exclude Next.js assets and API routes.
     */
    "/((?!api/|_next/|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};