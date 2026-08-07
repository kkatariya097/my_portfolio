import { ArrowDown, Download } from "lucide-react";
import { profile } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="home"
      data-section="home"
      className="flex min-h-[calc(100vh-65px)] scroll-mt-24 flex-col items-center justify-center px-6 text-center"
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent-2">
        {/* TODO(day3): Oxcy will "stand" near this greeting and point down at the CTAs */}
        Welcome to my world
      </p>

      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
        Hi, I&apos;m {profile.name}. {/* TODO(content) */}
      </h1>

      <p className="mt-4 max-w-xl text-balance text-foreground-muted sm:text-lg">
        {profile.tagline}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#projects"
          className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105"
        >
          View Projects
        </a>
        <a
          href={profile.resumeUrl}
          download
          className="flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm text-foreground transition-colors hover:border-accent-2 hover:text-accent-2"
        >
          <Download size={16} />
          Download Resume
        </a>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="mt-16 animate-bounce text-foreground-muted hover:text-foreground"
      >
        <ArrowDown size={22} />
      </a>
    </section>
  );
}
