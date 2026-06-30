/** Fill {placeholder} tokens in a results-copy template (FlowResultsCopy.cards). Unknown keys
 *  collapse to '', so optional fragments like {moreThanAny} simply disappear when not passed. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_match, key: string) =>
    key in vars ? String(vars[key]) : '',
  );
}

/** Pluralize a count + noun: 1 → "1 opener", 2 → "2 openers". */
export function countLabel(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? '' : 's'}`;
}
