import { portfolioProjectAssets, portfolioAchievementAssets } from "./assets";

export type ProjectEntry = {
  title: string;
  category: string;
  description: string;
  techStack: string[];
  role: string;
  result: string;
  previewBadge: string;
  previewTitle: string;
  previewastra: string;
  palette: {
    shell: string;
    glow: string;
    panel: string;
    accent: string;
  };
  image?: string;
};

export type AchievementEntry = {
  title: string;
  label: string;
  description: string;
  astra: string;
  palette?: {
    shell: string;
    glow: string;
  };
  image?: string;
};

export type CertificationEntry = {
  title: string;
  issuer: string;
  year: string;
  focus: string;
};

export const portfolioProjects: ProjectEntry[] = [
  {
    title: "IFL Chapter Malang",
    category: "AI Engineering + Web Development",
    description:
      "An AI assistant integrated into a personal portfolio to help visitors explore profile, skills, projects, and contact information.",
    techStack: ["React", "Tailwind CSS", "LLM API", "Interactive UI"],
    role: "Product design, frontend implementation, AI workflow integration.",
    result: "Turns a static portfolio into an intelligent, guided discovery experience.",
    previewBadge: "Conversational UI",
    previewTitle: "Visitor guidance with an AI-first interface.",
    previewastra: "Live intent-based exploration flow",
    palette: {
      shell: "from-[#10131d] via-[#121b2b] to-[#090b12]",
      glow: "from-cyan-400/30 via-sky-500/10 to-transparent",
      panel: "bg-white/8",
      accent: "bg-cyan-300",
    },
    image: portfolioProjectAssets.aiPortfolioAssistant,
  },
  {
    title: "Arteri Learning",
    category: "Web Development",
    description:
      "A responsive company profile website with modern UI, optimized layout, and clean component structure.",
    techStack: ["Next.js", "Tailwind CSS", "Component Architecture"],
    role: "Interface design, frontend engineering, responsive implementation.",
    result: "Premium presentation with performance-focused delivery across devices.",
    previewBadge: "Brand Website",
    previewTitle: "Structured pages with premium editorial rhythm.",
    previewastra: "Responsive presentation across every breakpoint",
    palette: {
      shell: "from-[#201816] via-[#3e281d] to-[#120f12]",
      glow: "from-amber-200/35 via-orange-400/10 to-transparent",
      panel: "bg-black/20",
      accent: "bg-amber-200",
    },
    image: portfolioProjectAssets.companyProfileWebsite,
  },
  {
    title: "Akademi Competition",
    category: "Dashboard Design + Frontend Engineering",
    description:
      "A astras-driven dashboard concept focused on operational clarity, data hierarchy, and smooth interactions across desktop layouts.",
    techStack: ["Next.js", "Dashboard UI", "Charts", "Tailwind CSS"],
    role: "Information hierarchy, interaction design, component implementation.",
    result: "Turns complex reporting into a cleaner monitoring experience for day-to-day decision making.",
    previewBadge: "Dashboard System",
    previewTitle: "A cleaner command center for operational visibility.",
    previewastra: "Structured monitoring with stronger visual hierarchy",
    palette: {
      shell: "from-[#101726] via-[#172239] to-[#0a0f18]",
      glow: "from-blue-300/30 via-cyan-400/10 to-transparent",
      panel: "bg-white/8",
      accent: "bg-blue-300",
    },
    image: portfolioProjectAssets.analyticsDashboard,
  },
 
];

export const portfolioAchievements: AchievementEntry[] = [
  {
    title: "2nd Place in Hackathon 2026",
    label: "Project",
    description:
      "Achievement related to Astra project or organization.",
    astra: "Completed milestone",
    palette: {
      shell: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
      glow: "from-blue-400/30 via-indigo-500/10 to-transparent",
    },
    image: portfolioAchievementAssets.astra,
  },
  {
    title: "Top 7 Finalist in Hology Data Mining",
    label: "Workflow Design",
    description:
      "Transforms static interfaces into guided, interactive product journeys with AI-assisted discovery and clear user intent mapping.",
    astra: "From passive browsing to assisted exploration",
    palette: {
      shell: "from-[#10131d] via-[#121b2b] to-[#090b12]",
      glow: "from-cyan-400/30 via-sky-500/10 to-transparent",
    },
    image: portfolioAchievementAssets.hology,
  },
];

export const portfolioCertifications: CertificationEntry[] = [
  {
    title: "Frontend Engineering Track",
    issuer: "React, Next.js, Tailwind CSS",
    year: "Current Focus",
    focus: "Component systems, responsive execution, and premium interface implementation.",
  },
  {
    title: "AI and Automation Track",
    issuer: "LLM Workflow Exploration",
    year: "Current Focus",
    focus: "Prompt-driven product flows, assistant orchestration, and intelligent UX patterns.",
  },
  {
    title: "Quality and Testing Track",
    issuer: "QA and Structured Validation",
    year: "Current Focus",
    focus: "Reliable product delivery through validation thinking, test awareness, and detail-oriented iteration.",
  },
];
