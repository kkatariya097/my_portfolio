// ---------------------------------------------------------------------------
// PLACEHOLDER CONTENT
// Everything in this file is a stand-in. Swap it for real content on Day 2
// once resume/photo/project details are ready. Search "TODO(content)" to
// find every spot that needs a real value.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Kavya Katariya", 
  role: "Full-Stack Developer", 
  tagline:
    "I build things for the web — and apparently, portfolios that guide you around like a video game.", // TODO(content)
  email: "kavyakatariya097@gmail.com", // TODO(content)
  github: "https://github.com/kkatariya097", // TODO(content)
  linkedin: "https://www.linkedin.com/in/katariyakavya097/", // TODO(content)
  resumeUrl: "/resume-placeholder.pdf", // TODO(content): will point at S3 asset URL once wired up (Day 2)
  photoUrl: "/photo-placeholder.png", // TODO(content): will point at S3 asset URL once wired up (Day 2)
};

export const about = {
  bio: [
    "PLACEHOLDER — a couple of paragraphs about who you are, what you build, and what got you into dev.",
    "PLACEHOLDER — second paragraph: what you're focused on right now / looking for.",
  ],
  enjoys: [
    "PLACEHOLDER hobby #1",
    "PLACEHOLDER hobby #2",
    "PLACEHOLDER hobby #3",
    "PLACEHOLDER hobby #4",
  ],
};

export type SkillCategory = {
  category: string;
  skills: string[];
};

export const skills: SkillCategory[] = [
  { category: "Languages", skills: ["TypeScript", "JavaScript", "Python"] },
  { category: "Frameworks", skills: ["Next.js", "React", "Node.js"] },
  { category: "Cloud & DevOps", skills: ["AWS S3", "GitHub Actions", "Vercel", "Docker"] },
  { category: "Tools", skills: ["Git", "Figma", "VS Code"] },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    title: "PLACEHOLDER Project One",
    description: "One or two sentences describing what it does and your role.",
    tags: ["Next.js", "TypeScript"],
    githubUrl: "https://github.com/your-handle/project-one",
    liveUrl: "https://project-one.vercel.app",
  },
  {
    title: "PLACEHOLDER Project Two",
    description: "One or two sentences describing what it does and your role.",
    tags: ["React", "Node.js"],
    githubUrl: "https://github.com/your-handle/project-two",
  },
  {
    title: "PLACEHOLDER Project Three",
    description: "One or two sentences describing what it does and your role.",
    tags: ["AWS", "CI/CD"],
    githubUrl: "https://github.com/your-handle/project-three",
  },
];
