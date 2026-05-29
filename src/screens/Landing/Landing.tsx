import { useNavigate } from 'react-router-dom';

import { Button } from '@/components';
import { useSessionStore } from '@/state';

export function Landing() {
  const navigate = useNavigate();
  const startSession = useSessionStore((s) => s.startSession);

  const begin = () => {
    startSession();
    navigate('/sort');
  };

  return (
    <main className="mx-auto flex min-h-full max-w-lg flex-col items-center justify-center gap-space-4 p-space-6 text-center">
      <p className="text-overline text-text-faint uppercase">RoboticsCareer.org</p>
      <h1 className="font-heading text-h1 text-text-strong">Explore the Floor</h1>
      <p className="max-w-sm text-body text-text-muted">
        Not sure where you&apos;d fit in robotics? Sort what you&apos;re into and we&apos;ll build
        your match.
      </p>
      <Button onClick={begin} data-testid="start-cta">
        Start sorting
      </Button>
    </main>
  );
}
