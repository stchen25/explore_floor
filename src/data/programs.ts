import type { TrainingProgram } from './types';

// Mock training programs (DATA_MODEL §8). Accuracy isn't required; structure is.
// rolesServed + competencyIds reference real roles.ts / competencies.ts entries.
// The team can swap these wholesale without touching logic.

export const programs: TrainingProgram[] = [
  {
    id: 'smart-tech',
    name: 'SMART Robotics Technician Program',
    type: 'certificate',
    duration: '16 weeks',
    rolesServed: ['technician'],
    competencyIds: ['tech-mechanical', 'tech-electrical', 'tech-maintenance', 'tech-plc'],
    blurb: 'A hands-on certificate covering the core skills technicians use day to day.',
  },
  {
    id: 'nc3-cert',
    name: 'NC3 Robotics Certification',
    type: 'certificate',
    duration: '12 weeks',
    rolesServed: ['technician', 'specialist'],
    competencyIds: ['tech-robot-programming', 'spec-installation', 'spec-safety'],
    blurb: 'Industry-recognized certification that opens doors at hundreds of manufacturers.',
  },
  {
    id: 'mechatronics-as',
    name: 'Mechatronics Associate Degree',
    type: 'degree',
    duration: '2 years',
    rolesServed: ['technician', 'specialist'],
    competencyIds: ['tech-electronics', 'tech-system-controls', 'spec-sensors', 'spec-vision'],
    blurb: 'Two-year degree blending mechanical, electrical, and programming foundations.',
  },
  {
    id: 'robotics-engineering-bs',
    name: 'Robotics Engineering BS',
    type: 'degree',
    duration: '4 years',
    rolesServed: ['specialist', 'integrator'],
    competencyIds: ['spec-advanced-programming', 'int-simulation', 'int-modeling'],
    blurb: 'A full engineering degree for the programming and design side of robotics.',
  },
  {
    id: 'industrial-apprenticeship',
    name: 'Manufacturing Apprenticeship',
    type: 'apprenticeship',
    duration: '2-4 years',
    rolesServed: ['technician'],
    competencyIds: ['tech-mechanical', 'tech-maintenance', 'tech-electrical'],
    blurb: 'Earn while you learn: paid apprenticeship with on-the-job training.',
  },
  {
    id: 'systems-integration-bootcamp',
    name: 'Automation Integration Bootcamp',
    type: 'bootcamp',
    duration: '8 weeks',
    rolesServed: ['integrator'],
    competencyIds: ['int-process-design', 'int-interop', 'int-visualization'],
    blurb: 'Intensive bootcamp for the system-design and integration side of automation.',
  },
];
