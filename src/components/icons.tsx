// lucide-react dropped brand/social icons a while back, so GitHub and
// LinkedIn are hand-rolled here as simple line-art marks matching the
// stroke style (24x24, strokeWidth 2) of the rest of the lucide icon set.

type IconProps = { size?: number; className?: string };

export function GithubIcon({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}

export function LinkedinIcon({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v1.5A5 5 0 0 1 16 8Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Decorative "game prop" icons for GameProp.tsx — flat two-tone marks that
// echo objects from Oxcy's pose sheet (yarn ball, box, laptop, food bowl),
// scattered near sections as a foundation for Oxcy to later walk to.
// ---------------------------------------------------------------------------

export function YarnBallIcon({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="13" fill="var(--yarn)" />
      <g stroke="#be185d" strokeWidth="1.4" fill="none" opacity="0.65">
        <path d="M3 16c6-6 20-6 26 0" />
        <path d="M3 16c6 6 20 6 26 0" />
        <path d="M16 3c-6 6-6 20 0 26" />
      </g>
    </svg>
  );
}

export function BoxIcon({ size = 28, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 8.5 12 4l9 4.5-9 4.5-9-4.5Z" />
      <path d="M3 8.5V17l9 4.5 9-4.5V8.5" />
      <path d="M12 13v8.5" />
    </svg>
  );
}

export function LaptopIcon({ size = 28, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="4.5" width="16" height="10.5" rx="1.2" />
      <path d="M2 19.5h20l-1.6-3.4a1.2 1.2 0 0 0-1.1-.7H4.7a1.2 1.2 0 0 0-1.1.7L2 19.5Z" />
    </svg>
  );
}

export function PawIcon({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g fill="currentColor">
        <ellipse cx="12" cy="16" rx="5" ry="4.2" />
        <ellipse cx="4.5" cy="10.5" rx="2.2" ry="2.8" transform="rotate(-20 4.5 10.5)" />
        <ellipse cx="9.5" cy="6.5" rx="2.2" ry="2.8" transform="rotate(-8 9.5 6.5)" />
        <ellipse cx="14.5" cy="6.5" rx="2.2" ry="2.8" transform="rotate(8 14.5 6.5)" />
        <ellipse cx="19.5" cy="10.5" rx="2.2" ry="2.8" transform="rotate(20 19.5 10.5)" />
      </g>
    </svg>
  );
}
