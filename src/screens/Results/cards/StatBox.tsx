import type { ReactNode } from 'react';

// A salary / education stat card in the role tab. Sentence-case label (no uppercase eyebrow —
// the mockup project's voice rule), then the value content. Tokens only (D-029).
export function StatBox({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex-1 rounded-lg border border-glass-border-soft bg-glass-fill p-space-4">
      <p className="font-body text-small font-medium text-text-on-dark-faint">{label}</p>
      <div className="mt-space-2">{children}</div>
    </div>
  );
}
