// A soft hint of the assembly-line scene behind the landing CTA (PRD §5.1, ROADMAP §2.1). This
// is a Phase 1 placeholder — line-art only, in scene/* tones — not the authored Goose scene
// (Phase 2). Every stroked element carries `scene-draw` so the Landing's GSAP DrawSVG reveal can
// draw them in. Stroke comes from the `scene-line` token; DrawSVG needs a visible stroke, and it
// supports rect/line/ellipse/path (not <circle>), which is why the rollers/joints are ellipses.
export function LandingSceneHint() {
  return (
    <svg viewBox="0 0 440 132" className="h-auto w-full" role="presentation">
      <g fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* conveyor belt */}
        <rect className="scene-draw stroke-scene-line" x="30" y="74" width="380" height="20" rx="10" />
        <line className="scene-draw stroke-scene-line" x1="80" y1="94" x2="80" y2="120" />
        <line className="scene-draw stroke-scene-line" x1="360" y1="94" x2="360" y2="120" />
        <ellipse className="scene-draw stroke-scene-line" cx="80" cy="122" rx="11" ry="4" />
        <ellipse className="scene-draw stroke-scene-line" cx="360" cy="122" rx="11" ry="4" />

        {/* interest parts riding the belt */}
        <rect className="scene-draw stroke-scene-line-soft" x="118" y="54" width="22" height="20" rx="3" />
        <rect className="scene-draw stroke-scene-line-soft" x="170" y="54" width="22" height="20" rx="3" />
        <rect className="scene-draw stroke-scene-line-soft" x="222" y="54" width="22" height="20" rx="3" />

        {/* robotic arm reaching toward the line */}
        <rect className="scene-draw stroke-scene-line" x="288" y="12" width="24" height="10" rx="2" />
        <line className="scene-draw stroke-scene-line" x1="300" y1="22" x2="328" y2="44" />
        <ellipse className="scene-draw stroke-scene-line" cx="328" cy="44" rx="4.5" ry="4.5" />
        <line className="scene-draw stroke-scene-line" x1="328" y1="44" x2="312" y2="64" />
      </g>
    </svg>
  );
}
