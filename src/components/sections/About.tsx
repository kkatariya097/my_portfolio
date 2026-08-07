import { about, profile } from "@/lib/data";
import { Section } from "@/components/Section";
import { GameProp } from "@/components/GameProp";
import { PawIcon } from "@/components/icons";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="Get to know me"
      title="About Me"
      decorations={
        <GameProp
          id="prop-paw"
          icon={<PawIcon size={30} />}
          className="right-8 top-10 hidden sm:block"
        />
      }
    >
      <div className="grid gap-10 sm:grid-cols-[220px_1fr] sm:items-start">
        {/* TODO(content): swap this initials placeholder for a real <Image> photo served from S3 (Day 2) */}
        <div className="mx-auto flex h-[220px] w-[220px] items-center justify-center rounded-2xl border border-border bg-background-elevated text-4xl font-bold text-foreground-muted sm:mx-0">
          {profile.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "??"}
        </div>

        <div>
          {about.bio.map((paragraph, i) => (
            <p key={i} className="mb-4 leading-relaxed text-foreground-muted">
              {paragraph}
            </p>
          ))}

          <h3 className="mb-3 mt-6 font-mono text-xs uppercase tracking-[0.2em] text-accent-2">
            What I enjoy
          </h3>
          <ul className="flex flex-wrap gap-2">
            {about.enjoys.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border px-3 py-1 text-sm text-foreground-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
