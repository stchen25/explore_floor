import { useState } from 'react';

import type { MCStep } from '@/data/types';

interface MCQuestionProps {
  step: MCStep;
  /** 1-based position among the flow's MC steps, for the "Question N of M" cue. */
  questionNumber: number;
  questionTotal: number;
  onChoose: (choiceId: string) => void;
}

// A single-select multiple-choice step, re-skinned dark for step 8 (D-029 Phase B): a glass
// question card (muted "Question N of M" → hairline divider → optional prompt → the question)
// over a stack of full-width, left-aligned answer rows. Native buttons — tap or Tab/Enter.
// Rows invert to brand gold (dark ink) on hover; picking one fills it gold and auto-advances
// (no submit), per the mockup's intro screeners.
//
// Locks after the first pick. The runner transitions with AnimatePresence mode="wait", so this
// card lingers in the DOM (fading) for the exit window; an opacity fade keeps the buttons
// hit-testable, so a fast click meant for the NEXT question could otherwise land here and
// overwrite this answer (and skip a step). The lock resets per question because the runner keys
// the card by step id, remounting this component. Tracking the picked id also lets the chosen
// row hold its gold fill through the fade.
export function MCQuestion({ step, questionNumber, questionTotal, onChoose }: MCQuestionProps) {
  const [picked, setPicked] = useState<string | null>(null);

  const choose = (choiceId: string) => {
    if (picked !== null) return;
    setPicked(choiceId);
    onChoose(choiceId);
  };

  return (
    <div className="flex w-full flex-col gap-space-4">
      <div className="flex flex-col gap-space-3 rounded-lg border border-glass-border bg-glass-fill p-space-5">
        <p className="text-small text-text-on-dark-faint">
          Question {questionNumber} of {questionTotal}
        </p>
        <div className="border-t border-glass-border-soft" />
        {step.prompt && <p className="text-body text-text-on-dark-muted">{step.prompt}</p>}
        <h2 className="font-heading text-h3 text-text-on-dark">{step.question}</h2>
      </div>

      <div className="flex flex-col gap-space-2" data-testid="mc-choices">
        {step.choices.map((choice) => {
          const isPicked = picked === choice.id;
          return (
            <button
              key={choice.id}
              type="button"
              disabled={picked !== null}
              onClick={() => choose(choice.id)}
              className={`w-full rounded-md border px-space-4 py-space-3 text-left font-body text-body transition-colors disabled:pointer-events-none ${
                isPicked
                  ? 'border-arm-gold bg-arm-gold text-near-black'
                  : 'border-glass-border bg-glass-fill text-text-on-dark hover:border-arm-gold hover:bg-arm-gold hover:text-near-black'
              }`}
            >
              {choice.label}
            </button>
          );
        })}
      </div>

      <p className="text-small text-text-on-dark-faint">Select an answer to continue.</p>
    </div>
  );
}
