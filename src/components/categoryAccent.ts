import type { CategoryId } from '@/data/types';

// Role accent classes/values for the narrative results (DATA_MODEL §17, dark system D-029).
// Kit-only palette: technician→gold, specialist→teal, integrator→orange (retires arm-blue).
// Class names MUST be full literals — Tailwind v4's scanner can't see a dynamic `text-${id}`.
// Tokens live in src/styles/globals.css (--color-role-*); `glow` is a raw value for inline
// styles / SVG (results bubbles + constellation nodes) where a utility class can't reach.

export interface RoleAccent {
  /** Saturated brand accent as a text color (small text, icons). */
  text: string;
  /** Legible soft tint for large role names on the dark canvas. */
  textSoft: string;
  /** Accent as a fill (chips, signal bars, CTAs). */
  bg: string;
  /** Text color drawn on top of the accent fill. */
  onAccent: string;
  /** Raw glow color for bubbles / nodes (inline style / SVG). */
  glow: string;
}

export const ROLE_ACCENT: Record<CategoryId, RoleAccent> = {
  technician: {
    text: 'text-role-technician',
    textSoft: 'text-role-technician-soft',
    bg: 'bg-role-technician',
    onAccent: 'text-role-technician-on',
    glow: 'var(--color-role-technician-glow)',
  },
  specialist: {
    text: 'text-role-specialist',
    textSoft: 'text-role-specialist-soft',
    bg: 'bg-role-specialist',
    onAccent: 'text-role-specialist-on',
    glow: 'var(--color-role-specialist-glow)',
  },
  integrator: {
    text: 'text-role-integrator',
    textSoft: 'text-role-integrator-soft',
    bg: 'bg-role-integrator',
    onAccent: 'text-role-integrator-on',
    glow: 'var(--color-role-integrator-glow)',
  },
};
