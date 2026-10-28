export type Locale = "en" | "fr";

export type ProjectCopy = {
  category: string;
  tagline: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  stack: string[];
};

export type Dictionary = {
  metadata: { title: string; description: string };
  language: { label: string; english: string; french: string };
  navigation: { home: string; about: string; projects: string; contact: string };
  home: {
    selectedWork: string;
    heroTitle: string;
    heroEmphasis: string;
    heroDescription: string;
    carouselLabel: string;
    conceptPreview: string;
    exploreProject: string;
    visitWebsite: string;
    websiteTbc: string;
    previousProject: string;
    nextProject: string;
    selectProject: string;
    projectCount: string;
    of: string;
    navigationHint: string;
    scrollToProfile: string;
  };
  projects: Record<"zindi" | "nepsit" | "lol-matchups" | "ai-automation-bot", ProjectCopy>;
  status: { development: string; concept: string; prototype: string };
  about: {
    profile: string;
    location: string;
    finance: string;
    technology: string;
    entrepreneurship: string;
    copy: string;
    skills: { finance: string[]; technology: string[]; entrepreneurship: string[] };
  };
  twitch: { live: string; offline: string; unknown: string; visit: string; ariaVisit: string };
  contact: {
    section: string;
    availability: string;
    title: string;
    emphasis: string;
    email: string;
    footer: string;
  };
  detail: {
    backToIndex: string;
    overview: string;
    problem: string;
    solution: string;
    status: string;
    technology: string;
    allProjects: string;
    externalTbc: string;
    nextProject: string;
  };
  previews: {
    zindi: {
      label: string; tabs: { today: string; routine: string; match: string }; greeting: string;
      heading: string; compatibility: string; product: string; productNote: string; routineKicker: string;
      routineHeading: string; steps: string[]; ready: string; matchKicker: string; matchHeading: string; matchNote: string;
    };
    nepsit: { label: string; formation: string };
    matchups: { label: string; head: string; switch: string; earlyEdge: string; skillWindow: string; powerSpikes: string; tacticalPrefix: string; notes: string[] };
    agent: { label: string; head: string; run: string; pause: string; agents: string[]; working: string; queued: string; standby: string; simulation: string };
  };
};
