import { skills } from "@/lib/data";
import { Section } from "@/components/Section";

export function Skills() {
  return (
    <Section id="skills" eyebrow="Level up" title="Skills">
      {/* TODO(day3): this grid becomes the backdrop for the orb-collecting
          mini-game — Oxcy runs around here and "unlocks" each category. */}
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((group) => (
          <div
            key={group.category}
            className="rounded-2xl border border-border bg-background-elevated p-6"
          >
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent-2">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border px-3 py-1 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
