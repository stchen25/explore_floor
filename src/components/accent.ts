import type { ArchetypeId } from '@/data/types';

// Static Tailwind class map per archetype accent (DESIGN_SYSTEM §3.3: Builder→orange,
// Innovator→blue, Architect→teal). These MUST be full literal class names — a dynamic
// `text-${token}` would not be seen by Tailwind v4's scanner and the utility wouldn't exist.
// Mirrors colorSchemes.ts; never invent a new color for an archetype.

export interface AccentClasses {
  /** Text color — used for the match % and accent headings. */
  text: string;
  /** Border color — used for the active role card. */
  border: string;
  /** Solid fill — used for the per-card primary CTA. */
  bg: string;
  /** 10% tint — used for soft accent backgrounds (pedestal glow, active strip). */
  soft: string;
}

export const ACCENT_CLASSES: Record<ArchetypeId, AccentClasses> = {
  builder: { text: 'text-arm-orange', border: 'border-arm-orange', bg: 'bg-arm-orange', soft: 'bg-arm-orange/10' },
  innovator: { text: 'text-arm-blue', border: 'border-arm-blue', bg: 'bg-arm-blue', soft: 'bg-arm-blue/10' },
  architect: { text: 'text-arm-teal', border: 'border-arm-teal', bg: 'bg-arm-teal', soft: 'bg-arm-teal/10' },
};
