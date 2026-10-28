"use client";

import { ArrowLeft, ArrowRight, ChevronDown, MoveHorizontal } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getProjects } from "@/config/projects";
import { MagneticLink } from "@/components/ui/magnetic-link";
import type { Dictionary, Locale } from "@/i18n/types";

type ProjectDressingProps = { locale: Locale; dictionary: Dictionary; initialProjectId?: string };

export function ProjectDressing({ locale, dictionary, initialProjectId }: ProjectDressingProps) {
  const projects = useMemo(() => getProjects(dictionary), [dictionary]);
  const initialIndex = Math.max(0, projects.findIndex((project) => project.id === initialProjectId));
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(1);
  const touchX = useRef<number | null>(null);
  const wheelLocked = useRef(false);
  const reduceMotion = useReducedMotion();
  const active = projects[activeIndex];

  useEffect(() => {
    window.localStorage.setItem("portfolio-active-project", active.id);
    const url = new URL(window.location.href);
    url.searchParams.set("project", active.id);
    window.history.replaceState(window.history.state, "", url);
  }, [active.id]);

  const move = useCallback((by: number) => {
    setDirection(by > 0 ? 1 : -1);
    setActiveIndex((index) => (index + by + projects.length) % projects.length);
  }, [projects.length]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLButtonElement) return;
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [move]);

  const positions = useMemo(() => projects.map((_, index) => {
    let diff = index - activeIndex;
    if (diff > projects.length / 2) diff -= projects.length;
    if (diff < -projects.length / 2) diff += projects.length;
    return diff;
  }), [activeIndex, projects]);

  const onWheel = (event: React.WheelEvent) => {
    if (Math.abs(event.deltaX) < Math.abs(event.deltaY) || Math.abs(event.deltaX) < 12 || wheelLocked.current) return;
    event.preventDefault();
    wheelLocked.current = true;
    move(event.deltaX > 0 ? 1 : -1);
    window.setTimeout(() => { wheelLocked.current = false; }, 420);
  };

  return (
    <section id="projects" className="dressing" style={{ "--accent": active.theme.accent, "--accent-rgb": active.theme.accentRgb, "--atmosphere": active.theme.atmosphere } as React.CSSProperties} onWheel={onWheel} onTouchStart={(event) => { touchX.current = event.changedTouches[0].clientX; }} onTouchEnd={(event) => { if (touchX.current === null) return; const distance = event.changedTouches[0].clientX - touchX.current; if (Math.abs(distance) > 40) move(distance < 0 ? 1 : -1); touchX.current = null; }}>
      <div className={`ambient-field ${active.theme.texture}`} aria-hidden="true" />
      <div className="dressing-inner">
        <div className="hero-intro"><span className="eyebrow">{dictionary.home.selectedWork}</span><h1>{dictionary.home.heroTitle}<br /><em>{dictionary.home.heroEmphasis}</em></h1><p>{dictionary.home.heroDescription}</p></div>
        <div className="project-stage" aria-roledescription="carousel" aria-label={dictionary.home.carouselLabel}>
          <div className="stage-light" aria-hidden="true" />
          {projects.map((project, index) => {
            const position = positions[index];
            const isActive = position === 0;
            const Preview = project.preview;
            const previewLabels = project.id === "zindi" ? dictionary.previews.zindi : project.id === "nepsit" ? dictionary.previews.nepsit : project.id === "lol-matchups" ? dictionary.previews.matchups : dictionary.previews.agent;
            const visible = Math.abs(position) <= 1;
            return <motion.article key={project.id} className={`project-object ${isActive ? "active" : ""}`} aria-hidden={!visible} animate={{ x: `${position * 84}%`, scale: isActive ? 1 : 0.77, rotateY: position * -18, z: isActive ? 60 : -120, opacity: Math.abs(position) > 1 ? 0 : isActive ? 1 : 0.38, filter: isActive ? "blur(0px)" : "blur(1.5px)" }} transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 170, damping: 23, mass: 0.8 }} style={{ zIndex: 4 - Math.abs(position), pointerEvents: isActive ? "auto" : "none" }}>
              <div className="project-object-frame"><div className="project-frame-top"><span>{project.number} / {project.category.split(" / ")[0]}</span><i /></div><Preview labels={previewLabels as never} /><div className="project-frame-bottom"><span>{dictionary.home.conceptPreview}</span><span>{project.status}</span></div></div>
            </motion.article>;
          })}
        </div>
        <div className="project-detail" aria-live="polite">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div key={active.id} custom={direction} initial={{ opacity: 0, y: direction * 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: direction * -12 }} transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}>
              <div className="project-line"><span>{active.number} — {String(projects.length).padStart(2, "0")}</span><span>{active.category}</span></div>
              <div className="project-copy"><div><h2>{active.name}</h2><p className="project-tagline">{active.tagline}</p></div><p className="project-description">{active.description}</p><div className="project-actions"><MagneticLink href={`/${locale}/projects/${active.slug}`} variant="light">{dictionary.home.exploreProject}</MagneticLink>{active.websiteUrl ? <MagneticLink href={active.websiteUrl} external>{dictionary.home.visitWebsite}</MagneticLink> : <span className="unavailable-link">{dictionary.home.websiteTbc}</span>}</div></div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="dressing-controls"><button onClick={() => move(-1)} aria-label={dictionary.home.previousProject}><ArrowLeft /></button><div className="progress-dots" aria-label={`${dictionary.home.projectCount} ${activeIndex + 1} ${dictionary.home.of} ${projects.length}`}>{projects.map((project, index) => <button key={project.id} aria-label={`${dictionary.home.selectProject} ${project.name}`} aria-current={index === activeIndex} onClick={() => { setDirection(index > activeIndex ? 1 : -1); setActiveIndex(index); }}><i /></button>)}</div><button onClick={() => move(1)} aria-label={dictionary.home.nextProject}><ArrowRight /></button></div>
        <div className="dressing-bottom"><span><MoveHorizontal size={14} /> {dictionary.home.navigationHint}</span><a href="#about">{dictionary.home.scrollToProfile} <ChevronDown size={14} /></a></div>
      </div>
    </section>
  );
}
