import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  /** Extra content positioned absolutely within the section — GameProp icons etc. */
  decorations?: ReactNode;
};

/**
 * Consistent section shell used by every section on the page.
 * The `id` doubles as the scroll-target for the nav AND the
 * future "walk Oxcy to this section" target (Day 3).
 *
 * `relative` + `overflow-hidden` so absolutely-positioned GameProp icons
 * (passed via `decorations`) stay contained within the section.
 */
export function Section({ id, title, eyebrow, children, className, decorations }: SectionProps) {
  return (
    <section
      id={id}
      data-section={id}
      className={cn(
        "relative scroll-mt-24 overflow-hidden py-20 sm:py-28 px-6 sm:px-10",
        className
      )}
    >
      {decorations}

      <div className="relative mx-auto w-full max-w-5xl">
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

      <div className="section-floor absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}
