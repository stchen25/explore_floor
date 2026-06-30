// One-line chip fitting for the results "why you matched" answer chips. Pure and
// dependency-free: a greedy character/count budget that keeps the collapsed chip row on a
// single line, then reports how many labels were left off as a "+N more" tail. The chip row
// uses `flex` (not `flex-wrap`), so without this a long label would push the row to two lines.

export interface ChipFit {
  shown: string[];
  more: number;
}

/** Pick the chips that fit one line: greedily include labels while the cumulative character
 *  count stays within `maxChars` and the count stays within `maxCount`, but ALWAYS show at least
 *  one (a single long chip beats an empty row). `more` is how many were left off. */
export function fitChips(
  labels: string[],
  opts?: { maxChars?: number; maxCount?: number },
): ChipFit {
  const maxChars = opts?.maxChars ?? 34;
  const maxCount = opts?.maxCount ?? 3;

  const shown: string[] = [];
  let chars = 0;

  for (const label of labels) {
    const next = chars + label.length;
    if (shown.length > 0 && (next > maxChars || shown.length >= maxCount)) break;
    shown.push(label);
    chars = next;
  }

  return { shown, more: labels.length - shown.length };
}
