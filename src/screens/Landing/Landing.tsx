import { motion, useReducedMotion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import { Button, SegmentedControl } from '@/components';
import { flowList, roleSelectLanding } from '@/data';
import type { LandingConditionId } from '@/data/types';
import { durations, easings } from '@/lib';
import { useFlow, useSessionStore } from '@/state';

// Landing: a type-led dark hero (D-029, Phase A — the line-art scene hint was retired with the
// conveyor concept). Motion owns the content entrance; there's no scene engine here anymore.
// The flow switcher is a researcher control for the study (DATA_MODEL §17): flipped here before the
// laptop is handed over; the choice survives "Start over". The CTA routes by condition — the
// narrative flow enters the step runner, 'select' goes to the /select comparator without a session.
export function Landing() {
  const navigate = useNavigate();
  const startSession = useSessionStore((s) => s.startSession);
  const flowId = useSessionStore((s) => s.flowId);
  const selectFlow = useSessionStore((s) => s.selectFlow);
  const flow = useFlow();
  const landingCopy = flowId === 'select' ? roleSelectLanding : flow.landingCopy;
  const reduce = !!useReducedMotion();

  const begin = () => {
    if (flowId === 'select') {
      navigate('/select');
      return;
    }
    startSession();
    navigate('/flow');
  };

  return (
    <main className="mx-auto flex min-h-full max-w-lg flex-col items-center justify-center gap-space-6 px-space-4 py-space-7 text-center">
      <motion.div
        className="flex flex-col items-center gap-space-4"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: durations.glide, ease: easings.soft }}
      >
        <p className="text-overline text-text-on-dark-faint">{landingCopy.overline}</p>
        <h1 className="font-heading text-h1 text-text-on-dark">{landingCopy.heading}</h1>
        <p className="max-w-md text-body text-text-on-dark-muted">{landingCopy.description}</p>
        <Button onClick={begin} data-testid="start-cta">
          {landingCopy.cta}
        </Button>

        {/* The condition switcher: the narrative flow plus the role-select comparator, which arms
            like the flow does (tap, then start with the CTA) — but the CTA routes to /select
            instead of starting a session. */}
        <SegmentedControl<LandingConditionId>
          label="Quiz flow"
          options={[
            ...flowList.map((f) => ({ id: f.id, label: f.name })),
            { id: 'select', label: roleSelectLanding.switcherLabel },
          ]}
          value={flowId}
          onChange={selectFlow}
          data-testid="flow"
        />
      </motion.div>
    </main>
  );
}
