// Type-scale steps mirrored from the @theme block in src/styles/globals.css (DESIGN_SYSTEM §4),
// for the places Motion animates text between steps. Motion needs concrete px strings there
// (fontSize isn't in its auto-px set, and a var() endpoint doesn't interpolate), so this file
// mirrors the tokens the same way motion.ts mirrors the easing curves that also live in @theme.
// If a step changes in globals.css, change it here too.

/** Motion `animate` targets: fontSize + lineHeight per type-scale step. */
export const typeScale = {
  h4: { fontSize: '24px', lineHeight: '32px' },
  h5: { fontSize: '20px', lineHeight: '28px' },
  body: { fontSize: '16px', lineHeight: '22px' },
} as const;
