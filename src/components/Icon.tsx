import type { CSSProperties } from 'react';

// Icon — a thin wrapper over the repo's self-hosted Material Icons webfont (loaded in
// globals.css; D-029). Call-sites reference design-semantic names (search, user, chevron-r…)
// and this maps each to a Material ligature, so the glyph choice lives in one place and markup
// stays readable. Color + size come from the parent (e.g. text-text-on-dark, size=18). Decorative
// by default; pass `title` when the glyph carries meaning on its own. Mirrors the same primitive
// in career_dashboard. NOTE: a name with no glyph in the font renders as its ligature text, not an
// error — verify new icons render visually.

export type IconName =
  | 'search'
  | 'user'
  | 'chevron-d'
  | 'chevron-u'
  | 'chevron-l'
  | 'chevron-r'
  | 'arrow-l'
  | 'arrow-r'
  | 'arrow-up-r'
  | 'check'
  | 'x'
  | 'close'
  | 'compare'
  | 'bookmark'
  | 'split'
  | 'briefcase'
  | 'graduation'
  | 'route'
  | 'target'
  | 'sparkles'
  | 'trending'
  | 'building'
  | 'map-pin'
  | 'bolt'
  | 'star'
  | 'precision'
  | 'hub'
  | 'verified'
  | 'settings';

// Design-semantic name → Material Icons ligature.
const LIGATURE: Record<IconName, string> = {
  search: 'search',
  user: 'person',
  'chevron-d': 'expand_more',
  'chevron-u': 'expand_less',
  'chevron-l': 'chevron_left',
  'chevron-r': 'chevron_right',
  'arrow-l': 'arrow_back',
  'arrow-r': 'arrow_forward',
  'arrow-up-r': 'north_east',
  check: 'check',
  x: 'close',
  close: 'close',
  compare: 'compare_arrows',
  bookmark: 'bookmark_border',
  split: 'call_split',
  briefcase: 'work',
  graduation: 'school',
  route: 'route',
  target: 'track_changes',
  sparkles: 'auto_awesome',
  trending: 'trending_up',
  building: 'apartment',
  'map-pin': 'place',
  bolt: 'bolt',
  star: 'star',
  precision: 'precision_manufacturing',
  hub: 'hub',
  verified: 'verified',
  settings: 'settings',
};

interface IconProps {
  name: IconName;
  /** px (font-size); default 16. */
  size?: number;
  className?: string;
  style?: CSSProperties;
  /** Set when the icon conveys meaning on its own (otherwise decorative). */
  title?: string;
}

export function Icon({ name, size = 16, className, style, title }: IconProps) {
  return (
    <span
      translate="no"
      className={`material-icons leading-none ${className ?? ''}`}
      style={{ fontSize: size, ...style }}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {LIGATURE[name]}
    </span>
  );
}
