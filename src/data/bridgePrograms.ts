import type { BridgeProgram, CategoryId } from './types';

// Bridge-training programs for the results card's "How to bridge the gap" list (DATA_MODEL
// §17). Each role shows a few training programs that build the competencies and credentials
// for that path.
//
// ⚠️ PLACEHOLDER CONTENT. These program names/schools are plausible stand-ins, NOT a vetted
// ARM list. Real per-role bridge programs are requested from ARM in
// docs/reference/Job_Program_Data_Request.md (the "Bridge-training programs" block per role).
// Swap these for the sourced set when it lands; the shape stays the same.

export const bridgePrograms: Record<CategoryId, BridgeProgram[]> = {
  technician: [
    {
      title: 'Mechatronics Technology A.S. and Certificate',
      school: 'Community College of Allegheny County',
      icon: 'mechatronics',
    },
    {
      title: 'NC3 Festo Mechatronics Fundamentals',
      school: 'NC3 — National Coalition of Certification Centers',
      icon: 'certification',
    },
    {
      title: 'Industrial Maintenance and Automation Certificate',
      school: 'Lorain County Community College',
      icon: 'controls',
    },
  ],
  specialist: [
    {
      title: 'Automation Engineering Technologies Systems Specialist',
      school: 'Lorain County Community College',
      icon: 'systems',
    },
    {
      title: 'Robotics and Automation Engineering Technology B.S.',
      school: 'Pennsylvania College of Technology',
      icon: 'mechatronics',
    },
    {
      title: 'FANUC Certified Robot Operator and Programmer',
      school: 'NC3 — National Coalition of Certification Centers',
      icon: 'certification',
    },
  ],
  integrator: [
    {
      title: 'Robotics Systems Integration Certificate',
      school: 'Community College of Allegheny County',
      icon: 'systems',
    },
    {
      title: 'Advanced Manufacturing and Automation B.S.',
      school: 'Pennsylvania College of Technology',
      icon: 'mechatronics',
    },
    {
      title: 'Industrial Simulation and Digital Twin Workshop',
      school: 'ARM Institute training network',
      icon: 'controls',
    },
  ],
};
