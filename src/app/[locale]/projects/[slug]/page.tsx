import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { getProject, getProjects } from "@/config/projects";
import { getDictionary, hasLocale, locales, type Locale } from "@/i18n";

type ProjectPageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() { return locales.flatMap((locale) => getProjects(getDictionary(locale)).map((project) => ({ locale, slug: project.slug }))); }

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale: localeValue, slug } = await params;
  if (!hasLocale(localeValue)) return {};
  const project = getProject(getDictionary(localeValue), slug);
  if (!project) return {};
  return { title: `${project.name} — Your Name`, description: project.description, alternates: { canonical: `/${localeValue}/projects/${slug}`, languages: { en: `/en/projects/${slug}`, fr: `/fr/projects/${slug}`, "x-default": `/en/projects/${slug}` } } };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale: localeValue, slug } = await params;
  if (!hasLocale(localeValue)) notFound();
  const locale = localeValue as Locale;
  const dictionary = getDictionary(locale);
  const project = getProject(dictionary, slug);
  if (!project) notFound();
  const projects = getProjects(dictionary);
  const index = projects.findIndex((item) => item.id === project.id);
  const next = projects[(index + 1) % projects.length];
  const Preview = project.preview;
  const previewLabels = project.id === "zindi" ? dictionary.previews.zindi : project.id === "nepsit" ? dictionary.previews.nepsit : project.id === "lol-matchups" ? dictionary.previews.matchups : dictionary.previews.agent;
  return <main className="project-page" style={{ "--accent": project.theme.accent, "--accent-rgb": project.theme.accentRgb, "--atmosphere": project.theme.atmosphere } as React.CSSProperties}>
    <div className={`detail-ambient ${project.theme.texture}`} />
    <header className="detail-header"><Link href={`/${locale}`} className="back-link"><ArrowLeft size={16} /> {dictionary.detail.backToIndex}</Link><span>{project.number} / {String(projects.length).padStart(2, "0")}</span></header>
    <section className="detail-hero"><div className="detail-heading"><p className="eyebrow">{project.category}</p><h1>{project.name}</h1><p>{project.tagline}</p></div><div className="detail-preview"><Preview labels={previewLabels as never} /></div></section>
    <section className="detail-body"><div className="detail-summary"><span>{dictionary.detail.overview}</span><p>{project.longDescription}</p><div className="detail-buttons"><MagneticLink href={`/${locale}`} className="detail-button">{dictionary.detail.allProjects}</MagneticLink>{project.websiteUrl ? <MagneticLink href={project.websiteUrl} external className="detail-button">{dictionary.home.visitWebsite}</MagneticLink> : <span className="unavailable-link">{dictionary.detail.externalTbc}</span>}</div></div><div className="detail-information"><article><span>{dictionary.detail.problem}</span><p>{project.problem}</p></article><article><span>{dictionary.detail.solution}</span><p>{project.solution}</p></article><article><span>{dictionary.detail.status}</span><p>{project.status}</p></article><article><span>{dictionary.detail.technology}</span><ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul></article></div></section>
    <Link className="next-project" href={`/${locale}/projects/${next.slug}`}><span>{dictionary.detail.nextProject}</span><strong>{next.name}</strong><ArrowRight size={22} /></Link>
  </main>;
}
