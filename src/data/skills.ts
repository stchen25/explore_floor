import type { EssentialSkill } from './types';

// The shared soft-skill list from ARM's framework (DATA_MODEL §6). Names are already
// plain — no translation needed. Used in results to surface cross-cutting strengths.

export const essentialSkills: EssentialSkill[] = [
  { id: 'active-listening', name: 'Active Listening' },
  { id: 'adaptability', name: 'Adaptability' },
  { id: 'attention-to-detail', name: 'Attention to Detail' },
  { id: 'communication', name: 'Communication' },
  { id: 'conflict-resolution', name: 'Conflict Resolution' },
  { id: 'critical-thinking', name: 'Critical Thinking' },
  { id: 'interpersonal-skills', name: 'Interpersonal Skills' },
  { id: 'leadership', name: 'Leadership' },
  { id: 'problem-solving', name: 'Problem Solving' },
  { id: 'teaming', name: 'Teaming' },
  { id: 'technical-learning-ability', name: 'Technical Learning Ability' },
  { id: 'technology-aptitude', name: 'Technology Aptitude' },
  { id: 'time-management', name: 'Time Management' },
  { id: 'work-ethic', name: 'Work Ethic' },
];
