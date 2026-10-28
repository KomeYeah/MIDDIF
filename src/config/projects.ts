import { AgentPreview } from "@/components/previews/agent-preview";
import { MatchupsPreview } from "@/components/previews/matchups-preview";
import { NepsitPreview } from "@/components/previews/nepsit-preview";
import { ZindiPreview } from "@/components/previews/zindi-preview";
import type { Dictionary } from "@/i18n/types";
import type { Project, ProjectTheme } from "@/types/project";

type ProjectDefinition = {
  id: keyof Dictionary["projects"];
  number: string;
  slug: string;
  name: string;
  status: keyof Dictionary["status"];
  theme: ProjectTheme;
  websiteUrl: string | null;
  githubUrl: string | null;
  preview: Project["preview"];
};

const definitions: ProjectDefinition[] = [
  { id: "zindi", number: "01", slug: "zindi", name: "Zindi", status: "development", theme: { accent: "#f4727e", accentRgb: "244, 114, 126", atmosphere: "#4a242c", texture: "halo" }, websiteUrl: null, githubUrl: null, preview: ZindiPreview },
  { id: "nepsit", number: "02", slug: "nepsit", name: "NEPSIT", status: "concept", theme: { accent: "#d6d1c5", accentRgb: "214, 209, 197", atmosphere: "#292824", texture: "paper" }, websiteUrl: null, githubUrl: null, preview: NepsitPreview },
  { id: "lol-matchups", number: "03", slug: "lol-matchups", name: "LoL Matchups", status: "prototype", theme: { accent: "#5b8cff", accentRgb: "91, 140, 255", atmosphere: "#162657", texture: "grid" }, websiteUrl: null, githubUrl: null, preview: MatchupsPreview },
  { id: "ai-automation-bot", number: "04", slug: "ai-automation-bot", name: "AI Automation Bot", status: "prototype", theme: { accent: "#52d49a", accentRgb: "82, 212, 154", atmosphere: "#12342a", texture: "signal" }, websiteUrl: null, githubUrl: null, preview: AgentPreview },
];

export const getProjects = (dictionary: Dictionary): Project[] => definitions.map((project) => {
  const copy = dictionary.projects[project.id];
  return { ...project, ...copy, status: dictionary.status[project.status] };
});

export const getProject = (dictionary: Dictionary, slug: string) => getProjects(dictionary).find((project) => project.slug === slug);
