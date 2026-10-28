import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/playfair-display";
import "../globals.css";
import { LocalePreference } from "@/components/navigation/locale-preference";
import { getDictionary, hasLocale, locales } from "@/i18n";

type LocaleLayoutProps = Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>;

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const locale = (await params).locale;
  if (!hasLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"),
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    alternates: { canonical: `/${locale}`, languages: { en: "/en", fr: "/fr", "x-default": "/en" } },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const locale = (await params).locale;
  if (!hasLocale(locale)) notFound();
  return <html lang={locale}><body><LocalePreference locale={locale} />{children}</body></html>;
}
