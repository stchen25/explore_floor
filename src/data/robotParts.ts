import type { RobotPart } from './types';

// The robot parts library — the interface between data and visuals (DATA_MODEL §7).
// Items reference these by `partId`; the build logic resolves them to SVG components.
// Phase 0/1: placeholder entries (the `svgComponent` strings are authored as real
// stylized SVG in /src/scene/robot/parts/ during Phase 2). The *references* must resolve.

export const robotParts: RobotPart[] = [
  // ---- Defaults (seeded by assembleRobot before any decision) ----
  { id: 'base-default', slot: 'base', name: 'Default base', svgComponent: 'BaseDefault' },
  { id: 'body-default', slot: 'body', name: 'Default body', svgComponent: 'BodyDefault' },

  // ---- Arms ----
  { id: 'wrench-arm', slot: 'rightArm', name: 'Wrench-tool arm', svgComponent: 'WrenchArm' },
  {
    id: 'soldered-arm',
    slot: 'leftArm',
    name: 'Soldered/repaired arm',
    svgComponent: 'SolderedArm',
  },

  // ---- Heads ----
  {
    id: 'magnifier-head',
    slot: 'head',
    name: 'Magnifier sensor head',
    svgComponent: 'MagnifierHead',
  },
  {
    id: 'warning-light-head',
    slot: 'head',
    name: 'Warning-light head',
    svgComponent: 'WarningLightHead',
  },
  { id: 'antenna-head', slot: 'head', name: 'Antenna/scanner head', svgComponent: 'AntennaHead' },

  // ---- Decals ----
  {
    id: 'open-panel-decal',
    slot: 'decal',
    name: 'Opened-panel wires decal',
    svgComponent: 'OpenPanelDecal',
  },
  { id: 'binary-decal', slot: 'decal', name: 'Binary spray', svgComponent: 'BinaryDecal' },
  { id: 'graph-decal', slot: 'decal', name: 'Graph decal', svgComponent: 'GraphDecal' },
  {
    id: 'calendar-decal',
    slot: 'decal',
    name: 'Calendar/timeline decal',
    svgComponent: 'CalendarDecal',
  },
  { id: 'checklist-decal', slot: 'decal', name: 'Checklist decal', svgComponent: 'ChecklistDecal' },
  { id: 'flowchart-decal', slot: 'decal', name: 'Flowchart decal', svgComponent: 'FlowchartDecal' },
  {
    id: 'network-decal',
    slot: 'decal',
    name: 'Network/web pattern decal',
    svgComponent: 'NetworkDecal',
  },

  // ---- Accessories ----
  { id: 'puzzle-piece', slot: 'accessory', name: 'Puzzle-piece', svgComponent: 'PuzzlePiece' },
  { id: 'clipboard', slot: 'accessory', name: 'Clipboard', svgComponent: 'Clipboard' },
  {
    id: 'blueprint-roll',
    slot: 'accessory',
    name: 'Blueprint roll',
    svgComponent: 'BlueprintRoll',
  },
  { id: 'mini-robot-arm', slot: 'accessory', name: 'Mini robot arm', svgComponent: 'MiniRobotArm' },
  { id: 'beaker', slot: 'accessory', name: 'Beaker', svgComponent: 'Beaker' },
  { id: 'chip-pin', slot: 'accessory', name: 'Chip pin', svgComponent: 'ChipPin' },
  { id: 'headset', slot: 'accessory', name: 'Headset', svgComponent: 'Headset' },
  {
    id: 'reference-book',
    slot: 'accessory',
    name: 'Reference book',
    svgComponent: 'ReferenceBook',
  },
  { id: 'pencil', slot: 'accessory', name: 'Tucked pencil', svgComponent: 'Pencil' },
  {
    id: 'tool-belt',
    slot: 'accessory',
    name: 'Wrench-and-screwdriver tool belt',
    svgComponent: 'ToolBelt',
  },
  { id: 'question-pin', slot: 'accessory', name: 'Question-mark pin', svgComponent: 'QuestionPin' },
  {
    id: 'lightning-bolt',
    slot: 'accessory',
    name: 'Lightning-bolt accent',
    svgComponent: 'LightningBolt',
  },
];
