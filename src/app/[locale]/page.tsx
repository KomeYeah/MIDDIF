import { AboutSection } from "@/components/about/about-section";
import { ContactSection } from "@/components/contact/contact-section";
import { ProjectDressing } from "@/components/dressing/project-dressing";
import { SiteHeader } from "@/components/layout/site-header";
import { getDictionary, hasLocale, type Locale } from "@/i18n";

type HomePageProps = { params: Promise<{ locale: string }>; searchParams: Promise<{ project?: string }> };

export default async function HomePage({ params, searchParams }: HomePageProps) {
  const localeValue = (await params).locale;
  if (!hasLocale(localeValue)) return null;
  const locale = localeValue as Locale;
  const dictionary = getDictionary(locale);
  const { project } = await searchParams;
  return <main><SiteHeader locale={locale} dictionary={dictionary} /><ProjectDressing locale={locale} dictionary={dictionary} initialProjectId={project} /><AboutSection dictionary={dictionary} /><ContactSection dictionary={dictionary} /></main>;
}
