"use client";

import { motion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Dictionary, Locale } from "@/i18n/types";

type LanguageSwitcherProps = { locale: Locale; labels: Dictionary["language"] };

export function LanguageSwitcher({ locale, labels }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    const query = new URLSearchParams(searchParams.toString());
    const activeProject = window.localStorage.getItem("portfolio-active-project");
    if (segments.length === 2 && activeProject && !query.has("project")) query.set("project", activeProject);
    window.localStorage.setItem("portfolio-locale", nextLocale);
    router.push(`${segments.join("/")}${query.size ? `?${query}` : ""}`);
  };

  return <div className="language-switcher" role="group" aria-label={labels.label}>
    {(["fr", "en"] as const).map((item) => <button key={item} onClick={() => switchLocale(item)} aria-pressed={locale === item} aria-label={item === "fr" ? labels.french : labels.english}>
      {locale === item && <motion.i layoutId="active-language" transition={{ type: "spring", stiffness: 420, damping: 30 }} />}
      <span>{item.toUpperCase()}</span>
    </button>)}
  </div>;
}
