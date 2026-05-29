import type { Competency } from './types';

// Real ARM-framework competencies (DATA_MODEL §5). `name` is the official ARM term;
// `plainName` is the teen-friendly translation used in results copy (starter drafts).

export const competencies: Competency[] = [
  // ---- Technician (Builder) ----
  {
    id: 'tech-electrical',
    roleId: 'technician',
    name: 'Electrical Systems',
    plainName: 'Working with the wiring and electrical guts of a machine',
  },
  {
    id: 'tech-electronics',
    roleId: 'technician',
    name: 'Electronics & Controls',
    plainName: 'Setting up and tuning the controls that make machines behave',
  },
  {
    id: 'tech-fluid',
    roleId: 'technician',
    name: 'Fluid Power',
    plainName: 'Working with the hydraulics and pneumatics that move heavy parts',
  },
  {
    id: 'tech-maintenance',
    roleId: 'technician',
    name: 'Maintenance & Troubleshooting',
    plainName: "Figuring out what's wrong and fixing it",
  },
  {
    id: 'tech-mechanical',
    roleId: 'technician',
    name: 'Mechanical Systems',
    plainName: 'Working with the moving parts of machines',
  },
  {
    id: 'tech-plc',
    roleId: 'technician',
    name: 'PLC (Programmable Logic Controller)',
    plainName: 'Programming the brains of industrial machines',
  },
  {
    id: 'tech-robot-programming',
    roleId: 'technician',
    name: 'Robot Programming',
    plainName: 'Telling robots what to do in their own language',
  },
  {
    id: 'tech-system-controls',
    roleId: 'technician',
    name: 'System Controls',
    plainName: 'Keeping a whole system running the way it should',
  },

  // ---- Specialist (Innovator) ----
  {
    id: 'spec-advanced-programming',
    roleId: 'specialist',
    name: 'Advanced Robot Programming',
    plainName: 'Writing more complex code that makes robots do smarter things',
  },
  {
    id: 'spec-application',
    roleId: 'specialist',
    name: 'Application Emphasis',
    plainName: 'Picking the right robot for the right job',
  },
  {
    id: 'spec-inspection',
    roleId: 'specialist',
    name: 'Inspection/QA',
    plainName: 'Making sure everything robots make meets quality standards',
  },
  {
    id: 'spec-installation',
    roleId: 'specialist',
    name: 'Installation Concepts',
    plainName: 'Setting up new robots so they work the first time',
  },
  {
    id: 'spec-project-management',
    roleId: 'specialist',
    name: 'Project Management',
    plainName: 'Keeping a robotics project on time and on track',
  },
  {
    id: 'spec-troubleshooting',
    roleId: 'specialist',
    name: 'Robot and System Troubleshooting',
    plainName: 'Debugging the whole system when something breaks',
  },
  {
    id: 'spec-safety',
    roleId: 'specialist',
    name: 'Safety/Risk Assessment',
    plainName: 'Making sure no one and nothing gets hurt around robots',
  },
  {
    id: 'spec-sensors',
    roleId: 'specialist',
    name: 'Sensors',
    plainName: 'Working with the eyes, ears, and feel of a robot',
  },
  {
    id: 'spec-vision',
    roleId: 'specialist',
    name: 'Vision',
    plainName: 'Teaching robots to "see" with cameras',
  },

  // ---- Integrator (Architect) ----
  {
    id: 'int-arvr',
    roleId: 'integrator',
    name: 'Augmented Reality/Virtual Reality',
    plainName: 'Designing and testing factories in virtual space',
  },
  {
    id: 'int-big-data',
    roleId: 'integrator',
    name: 'Big Data',
    plainName: 'Pulling insight from huge piles of factory data',
  },
  {
    id: 'int-programming',
    roleId: 'integrator',
    name: 'Computer Programming',
    plainName: 'Writing code at the system level',
  },
  {
    id: 'int-interop',
    roleId: 'integrator',
    name: 'Interoperability',
    plainName: 'Making sure machines from different makers talk to each other',
  },
  {
    id: 'int-offline-programming',
    roleId: 'integrator',
    name: 'Offline Programming',
    plainName: 'Designing what a robot will do before it ever runs',
  },
  {
    id: 'int-simulation',
    roleId: 'integrator',
    name: 'Simulation',
    plainName: 'Modeling factories on a computer before building anything',
  },
  {
    id: 'int-process-design',
    roleId: 'integrator',
    name: 'System and Process Design',
    plainName: 'Designing how the whole factory should work',
  },
  {
    id: 'int-modeling',
    roleId: 'integrator',
    name: 'Systems Simulation/Modeling',
    plainName: 'Building digital twins of real systems',
  },
  {
    id: 'int-visualization',
    roleId: 'integrator',
    name: 'Visualization',
    plainName: 'Showing complex data and systems in ways people can understand',
  },
];
