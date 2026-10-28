import type { Locale } from "@/i18n/types";

export const locales = ["en", "fr"] as const;
export const defaultLocale: Locale = "en";
export const hasLocale = (value: string): value is Locale => locales.includes(value as Locale);
