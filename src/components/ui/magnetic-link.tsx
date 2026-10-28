"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

type MagneticLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "light" | "line";
  external?: boolean;
  className?: string;
};

export function MagneticLink({ href, children, variant = "line", external, className = "" }: MagneticLinkProps) {
  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();
    element.style.setProperty("--mx", `${(event.clientX - bounds.left - bounds.width / 2) * 0.16}px`);
    element.style.setProperty("--my", `${(event.clientY - bounds.top - bounds.height / 2) * 0.16}px`);
  };
  const content = <>{children}<ArrowUpRight size={15} strokeWidth={1.6} /></>;
  const classes = `magnetic-link ${variant} ${className}`;
  if (external) return <a className={classes} href={href} target="_blank" rel="noreferrer" onMouseMove={onMove} onMouseLeave={(event) => { event.currentTarget.style.setProperty("--mx", "0px"); event.currentTarget.style.setProperty("--my", "0px"); }}>{content}</a>;
  return <Link className={classes} href={href} onMouseMove={onMove} onMouseLeave={(event) => { event.currentTarget.style.setProperty("--mx", "0px"); event.currentTarget.style.setProperty("--my", "0px"); }}>{content}</Link>;
}
