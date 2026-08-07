import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Consistent section shell used by every section on the page.
 * The `id` doubles as the scroll-target for the nav AND the
 * future "walk Oxcy to this section" target (Day 3).
 */
export function Section({ id, title, eyebrow, children, className }: SectionProps) {
  return (
    <section
      id={id}
      data-section={id}
      className={cn("scroll-mt-24 py-20 sm:py-28 px-6 sm:px-10", className)}
    >
      <div className="mx-auto w-full max-w-5xl">
        {eyebrow && (
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent-2">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="mb-10 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
