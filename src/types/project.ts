import type { ComponentType } from "react";
import type { Dictionary } from "@/i18n/types";

export type ProjectTheme = {
  accent: string;
  accentRgb: string;
  atmosphere: string;
  texture: "halo" | "grid" | "signal" | "paper";
};

export type Project = {
  id: string;
  number: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  theme: ProjectTheme;
  stack: string[];
  status: string;
  websiteUrl: string | null;
  githubUrl: string | null;
  preview: ComponentType<{ labels: never }>;
};
