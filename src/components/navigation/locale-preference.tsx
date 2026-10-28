"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { hasLocale } from "@/i18n/locales";
import type { Locale } from "@/i18n/types";

export function LocalePreference({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("portfolio-locale");
    if (!savedLocale || !hasLocale(savedLocale) || savedLocale === locale) return;
    const segments = pathname.split("/");
    segments[1] = savedLocale;
    router.replace(segments.join("/"));
  }, [locale, pathname, router]);

  return null;
}
