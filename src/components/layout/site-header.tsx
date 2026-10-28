"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { personal } from "@/config/personal";
import { LanguageSwitcher } from "@/components/navigation/language-switcher";
import type { Dictionary, Locale } from "@/i18n/types";

type SiteHeaderProps = { locale: Locale; dictionary: Dictionary };

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <header className="site-header">
      <div className="header-identity"><Link href={`/${locale}`} className="wordmark" aria-label={dictionary.navigation.home}>{personal.name}<span>®</span></Link><LanguageSwitcher locale={locale} labels={dictionary.language} /></div>
      <nav aria-label={dictionary.navigation.home}>
        <button onClick={() => scrollTo("about")}>{dictionary.navigation.about}</button>
        <button onClick={() => scrollTo("projects")}>{dictionary.navigation.projects}</button>
        <button onClick={() => scrollTo("contact")}>{dictionary.navigation.contact}</button>
      </nav>
      <motion.div className="header-rule" layoutId="header-rule" />
    </header>
  );
}
