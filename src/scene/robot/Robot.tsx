import type { ArchetypeId, RobotState } from '@/data/types';

import { SolderedArm } from './arms/SolderedArm';
import { WrenchArm } from './arms/WrenchArm';
import { BaseDefault } from './BaseDefault';
import { BodyDefault } from './BodyDefault';
import { DefaultLeftArm, DefaultRightArm } from './DefaultArms';
import { AntennaHead } from './heads/AntennaHead';
import { MagnifierHead } from './heads/MagnifierHead';
import { WarningLightHead } from './heads/WarningLightHead';
import { RobotAccessories } from './RobotAccessories';
import { RobotDecals } from './RobotDecals';

// Eye colors per archetype (SVG fill values, not Tailwind — used inside <svg>).
const EYE_COLOR: Record<ArchetypeId | 'default', string> = {
  builder: '#F56A00',
  innovator: '#38A5EE',
  architect: '#117289',
  default: '#5c6975',
};

interface HeadProps { colorClass?: string }
const HEAD_MAP: Record<string, React.ComponentType<HeadProps>> = {
  'antenna-head': AntennaHead,
  'magnifier-head': MagnifierHead,
  'warning-light-head': WarningLightHead,
};

interface RobotProps {
  robotState: RobotState | null;
  /** Active archetype tints the eyes and accessories. */
  archetype?: ArchetypeId | null;
  size?: number;
}

export function Robot({ robotState, archetype, size = 120 }: RobotProps) {
  const scheme = archetype ?? 'default';
  const eyeColor = EYE_COLOR[scheme];
  const slots = robotState?.slots ?? { base: 'base-default', body: 'body-default', colorScheme: 'default' };

  const headId = typeof slots.head === 'string' ? slots.head : null;
  const HeadComponent = headId ? (HEAD_MAP[headId] ?? AntennaHead) : AntennaHead;
  const hasWrenchArm = slots.rightArm === 'wrench-arm';
  const hasSolderedArm = slots.leftArm === 'soldered-arm';
  const decalIds = Array.isArray(slots.decal) ? slots.decal : (slots.decal ? [slots.decal] : []);
  const accessoryIds = Array.isArray(slots.accessory) ? slots.accessory : (slots.accessory ? [slots.accessory] : []);

  const height = (size / 120) * 180;

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 120 180"
      style={{ color: eyeColor }}
      role="img"
      aria-label="Your robot"
    >
      {/* Render order: base → legs/feet → arms → torso → panel → decals → head → accessories */}
      <BaseDefault />
      {hasSolderedArm ? <SolderedArm /> : <DefaultLeftArm />}
      {hasWrenchArm ? <WrenchArm /> : <DefaultRightArm />}
      <BodyDefault />
      <RobotDecals partIds={decalIds} />
      <HeadComponent />
      <RobotAccessories partIds={accessoryIds} />
    </svg>
  );
}
