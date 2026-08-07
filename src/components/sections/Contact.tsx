import { Mail, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon, LaptopIcon } from "@/components/icons";
import { profile } from "@/lib/data";
import { Section } from "@/components/Section";
import { GameProp } from "@/components/GameProp";

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Let's connect"
      title="Get In Touch"
      decorations={
        <GameProp
          id="prop-laptop"
          icon={<LaptopIcon size={30} />}
          className="right-8 top-10 hidden sm:block"
        />
      }
    >
      <p className="max-w-lg text-foreground-muted">
        {/* TODO(content) */}
        Have a project in mind or just want to say hi? My inbox is always open.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105"
        >
          <Mail size={16} />
          Email Me
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm text-foreground hover:border-accent-2 hover:text-accent-2"
        >
          <GithubIcon size={16} />
          GitHub
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm text-foreground hover:border-accent-2 hover:text-accent-2"
        >
          <LinkedinIcon size={16} />
          LinkedIn
        </a>
        <a
          href={profile.resumeUrl}
          download
          className="flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm text-foreground hover:border-accent-2 hover:text-accent-2"
        >
          <Download size={16} />
          Resume
        </a>
      </div>

      <footer className="mt-20 border-t border-border pt-6 font-mono text-xs text-foreground-muted">
        {/* TODO(day3): expand into a small "how this site is deployed" pipeline diagram */}
        Built with Next.js · Deployed on Vercel · Assets on AWS S3 · CI/CD via GitHub Actions
      </footer>
    </Section>
  );
}
