import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, hasLocale } from "@/i18n/locales";
import type { Locale } from "@/i18n/types";

function preferredLocale(request: NextRequest): Locale {
  const savedLocale = request.cookies.get("portfolio-locale")?.value;
  if (savedLocale && hasLocale(savedLocale)) return savedLocale;
  return request.headers.get("accept-language")?.toLowerCase().startsWith("fr") ? "fr" : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.split("/")[1] && hasLocale(pathname.split("/")[1])) return NextResponse.next();

  const locale = preferredLocale(request);
  const response = NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  if (!request.cookies.get("portfolio-locale")) {
    response.cookies.set("portfolio-locale", locale, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  }
  return response;
}

export const config = { matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"] };
