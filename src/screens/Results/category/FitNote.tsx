import { SCREENER_COPY } from '@/data/flows/screeners';
import type { FitLine } from '@/lib';

interface FitNoteProps {
  lines: FitLine[];
}

// The screener fit line on results (DATA_MODEL §17, D-020): the education (both flows) and
// pay (narrative) read on the shown role. A green check when it lines up with what the user
// said they're after, an amber heads-up when the role asks for more school or pays a tier
// below their target. Always shown — the team wants the read even when it fits. Content is
// data (SCREENER_COPY + the role ladders); this only lays it out.
export function FitNote({ lines }: FitNoteProps) {
  if (lines.length === 0) return null;
  return (
    <section
      data-testid="fit-note"
      className="flex w-full max-w-md flex-col gap-space-2 rounded-md border border-border-default bg-bg p-space-4 text-left"
    >
      <h3 className="font-heading text-h5 text-text-strong">{SCREENER_COPY.heading}</h3>
      {lines.map((line) => (
        <p
          key={line.axis}
          data-testid={`fit-${line.axis}`}
          className={`text-small ${line.fits ? 'text-text-muted' : 'text-arm-orange'}`}
        >
          <span aria-hidden="true">{line.fits ? '✓ ' : '⚠ '}</span>
          {line.text}
        </p>
      ))}
    </section>
  );
}
