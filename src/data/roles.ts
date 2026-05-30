import type { Role } from './types';

// The three ARM role families (DATA_MODEL §4). Never add, rename, or remove one.
// competencyIds reference competencies.ts; copy is starter draft (final copy is open in PRD).

export const roles: Role[] = [
  {
    id: 'technician',
    archetypeId: 'builder',
    name: 'Robotics Technician',
    archetypeName: 'Builder',
    shortDescription:
      'Technicians install, maintain, and repair the robots and equipment that keep factories running. Hands-on, learn-by-doing, real machines.',
    pathFraming:
      'Often starts with an apprenticeship or a technical certificate. Many technicians grow into senior tech and shift-supervisor roles, learning on the job.',
    competencyIds: [
      'tech-electrical',
      'tech-electronics',
      'tech-fluid',
      'tech-maintenance',
      'tech-mechanical',
      'tech-plc',
      'tech-robot-programming',
      'tech-system-controls',
    ],
    skillIds: ['attention-to-detail', 'problem-solving', 'technical-learning-ability', 'work-ethic'],
    jobs: [
      {
        title: 'Robotics Technician',
        description: 'Installs and repairs the robots on a factory floor.',
      },
      {
        title: 'Manufacturing Maintenance Technician',
        description: 'Keeps all the machines and equipment running smoothly.',
      },
      {
        title: 'Automation Equipment Operator',
        description: 'Runs and monitors automated machinery day to day.',
      },
      {
        title: 'Robot Repair Specialist',
        description: 'Diagnoses and fixes robots when something goes wrong.',
      },
      {
        title: 'Assembly Line Technician',
        description: 'Maintains the tools and equipment used in production lines.',
      },
    ],
  },
  {
    id: 'specialist',
    archetypeId: 'innovator',
    name: 'Robotics Specialist',
    archetypeName: 'Innovator',
    shortDescription:
      'Specialists program robots and design the automated systems that make manufacturing faster and smarter. If you love figuring out how things work, this is the path.',
    pathFraming:
      'Often a degree in engineering, computer science, or robotics. Specialists often become senior engineers, team leads, or R&D experts.',
    competencyIds: [
      'spec-advanced-programming',
      'spec-application',
      'spec-inspection',
      'spec-installation',
      'spec-project-management',
      'spec-troubleshooting',
      'spec-safety',
      'spec-sensors',
      'spec-vision',
    ],
    skillIds: ['critical-thinking', 'problem-solving', 'technology-aptitude', 'adaptability'],
    jobs: [
      {
        title: 'Robotics Specialist',
        description: 'Programs robots and proposes upgrades to improve how they work.',
      },
      {
        title: 'Robot Programmer',
        description: 'Writes the code that tells robots what to do.',
      },
      {
        title: 'Automation Engineer',
        description: 'Designs automated systems that make manufacturing faster.',
      },
      {
        title: 'Controls Engineer',
        description: 'Builds the systems that control how machines behave.',
      },
      {
        title: 'Manufacturing Systems Developer',
        description: 'Creates software and systems that keep factories running efficiently.',
      },
    ],
  },
  {
    id: 'integrator',
    archetypeId: 'architect',
    name: 'Robotics Integrator',
    archetypeName: 'Architect',
    shortDescription:
      'Integrators look at a whole factory, plan how robotic systems should fit in, and make sure all the pieces work together. Big-picture, coordination, strategy.',
    pathFraming:
      'Often engineering or project management. Many grow up from specialist roles into project managers, system architects, or robotics consulting.',
    competencyIds: [
      'int-arvr',
      'int-big-data',
      'int-programming',
      'int-interop',
      'int-offline-programming',
      'int-simulation',
      'int-process-design',
      'int-modeling',
      'int-visualization',
    ],
    skillIds: ['communication', 'leadership', 'teaming', 'time-management'],
    jobs: [
      {
        title: 'Robotics Integrator',
        description: 'Evaluates factories and designs plans to introduce robotic systems.',
      },
      {
        title: 'Automation Project Manager',
        description: 'Leads teams to plan and deliver automation projects.',
      },
      {
        title: 'Systems Integration Engineer',
        description: 'Makes sure all the different parts of a robotic system work together.',
      },
      {
        title: 'Manufacturing Operations Manager',
        description: 'Oversees how an entire factory or production line runs.',
      },
      {
        title: 'Robotics Consultant',
        description: 'Advises companies on how to use robotics to improve their operations.',
      },
    ],
  },
];
