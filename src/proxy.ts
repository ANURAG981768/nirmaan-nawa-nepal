import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/org";

const PUBLIC_FILE = /\.(.*)$/;

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  // Nepali speakers arriving from a Nepali browser get the Nepali site
  // without having to find the toggle. Everyone else gets English.
  const accept = request.headers.get("accept-language") ?? "";
  const prefersNepali = /\bne\b/i.test(accept.split(",")[0] ?? "");
  const locale = prefersNepali ? "ne" : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
