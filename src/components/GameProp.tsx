import { cn } from "@/lib/utils";

type GamePropProps = {
  id: string;
  icon: React.ReactNode;
  className?: string;
};

/**
 * A small floating decorative icon anchored inside a section (yarn ball,
 * box, laptop, paw print — objects Oxcy interacts with on the pose sheet).
 * Purely decorative for now; `data-prop-id` is there so the future
 * OxcyGuide component (Day 3) can look these up by id and treat them as
 * waypoints/interaction targets instead of just scenery.
 */
export function GameProp({ id, icon, className }: GamePropProps) {
  return (
    <div
      data-prop-id={id}
      className={cn(
        "game-prop pointer-events-auto absolute text-foreground-muted hover:text-accent-2",
        className
      )}
    >
      {icon}
    </div>
  );
}
