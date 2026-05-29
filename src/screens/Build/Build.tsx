import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { durationsMs } from '@/lib';

// Phase 0 stub: a transient pass-through that auto-advances to results. Phase 2 turns this
// into the cinematic build beat.

export function Build() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/results'), durationsMs.reveal);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-space-3 p-space-6 text-center">
      <h2 className="font-heading text-h2 text-text-strong">Building your robot…</h2>
      <p className="text-body text-text-muted">Putting your pieces together.</p>
    </main>
  );
}
