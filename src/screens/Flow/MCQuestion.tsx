import { useState } from 'react';

import type { MCStep } from '@/data/types';

interface MCQuestionProps {
  step: MCStep;
  onChoose: (choiceId: string) => void;
}

// A single-select multiple-choice step (the pink stickies on the team's board):
// optional lead-in prompt, the question, and a tappable column of choices. Native
// buttons — tap or Tab/Enter. Deliberately quiet styling: the study wants attention
// on the question structure, not the chrome.
//
// Locks after the first pick. The runner transitions with AnimatePresence mode="wait",
// so this question's card lingers in the DOM (fading) for the exit window; an opacity
// fade keeps the buttons hit-testable, so a fast click meant for the NEXT question could
// otherwise land here and overwrite this answer (and skip the next step). The lock resets
// per question because the runner keys the card by step id, remounting this component.
export function MCQuestion({ step, onChoose }: MCQuestionProps) {
  const [chosen, setChosen] = useState(false);

  const choose = (choiceId: string) => {
    if (chosen) return;
    setChosen(true);
    onChoose(choiceId);
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-space-4 text-center">
      {step.prompt && <p className="text-body text-text-muted">{step.prompt}</p>}
      <h2 className="font-heading text-h3 text-text-strong">{step.question}</h2>
      <div className="flex flex-col gap-space-2" data-testid="mc-choices">
        {step.choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            disabled={chosen}
            onClick={() => choose(choice.id)}
            className="rounded-md border border-border-default bg-bg px-space-4 py-space-3 font-body text-body text-text-default transition-colors hover:bg-bg-section disabled:pointer-events-none"
          >
            {choice.label}
          </button>
        ))}
      </div>
    </div>
  );
}
