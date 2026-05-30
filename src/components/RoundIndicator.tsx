interface RoundIndicatorProps {
  round: number;
  total: number;
}

// "ROUND 2 OF 4" in the Label/Overline style (DESIGN_SYSTEM §4.4). Archetype-neutral chrome.
export function RoundIndicator({ round, total }: RoundIndicatorProps) {
  return (
    <p className="text-overline uppercase text-text-faint" data-testid="round-indicator">
      Round {round} of {total}
    </p>
  );
}
