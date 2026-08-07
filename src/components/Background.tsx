/**
 * Ambient "game world" backdrop: drifting colour blobs (green/mint/gold —
 * green + mint echo Oxcy's two reference colourways) + a faint HUD grid +
 * film-grain noise + a vignette to keep text readable + a cursor-following
 * glow (position set by Cursor.tsx via the --cursor-x/--cursor-y CSS vars
 * on <html>) + a fixed "ground" strip along the viewport bottom so the
 * whole page reads as standing on level ground — a cheap platformer
 * horizon, and a real anchor point for Oxcy to walk along later.
 *
 * Pure CSS/SVG, no client JS needed here — keeps it cheap and lets it
 * render on the server.
 */
export function Background() {
  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden bg-background" aria-hidden="true">
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />
        <div className="bg-blob bg-blob-3" />
        <div className="bg-grid" />
        <div className="bg-noise" />
        <div className="bg-glow" />
        <div className="bg-vignette" />
      </div>
      <div className="bg-ground" aria-hidden="true" />
    </>
  );
}
