import "server-only";
import { en } from "@/i18n/dictionaries/en";
import { fr } from "@/i18n/dictionaries/fr";
import type { Dictionary, Locale } from "@/i18n/types";
import { defaultLocale, hasLocale, locales } from "@/i18n/locales";

export { defaultLocale, hasLocale, locales };
export type { Dictionary, Locale };

const dictionaries: Record<Locale, Dictionary> = { en, fr };

export const getDictionary = (locale: Locale) => dictionaries[locale];
export const localizePath = (locale: Locale, path = "") => `/${locale}${path === "/" ? "" : path}`;
