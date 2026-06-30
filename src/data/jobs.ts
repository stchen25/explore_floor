import type { CategoryId, Job } from './types';

// Featured jobs per role for the Phase F results constellation + job-overview (DATA_MODEL §17).
// The constellation rings these around the role center; tapping one opens its summary, then its
// full overview. Counts mirror ARM's published common-title counts: Technician 3, Specialist 5,
// Integrator 5 (the titles come straight from roleDetails[*].commonJobTitles / ARM's role pages).
//
// ⚠️ PLACEHOLDER per-job copy. The titles are real (ARM's common job titles), but each job's
// `summary`, `responsibilities`, `skills`, and `roleNoun` are plausible stand-ins authored in the
// project voice, NOT vetted ARM content. Salary + education stay role-level (no per-job override),
// matching the mockup. Real per-job detail is requested from ARM in
// docs/reference/Job_Program_Data_Request.md; swap it in when it lands — the shape stays the same.

export const jobs: Record<CategoryId, Job[]> = {
  technician: [
    {
      id: 'technician-robot-operator',
      categoryId: 'technician',
      title: 'Robot Operator',
      summary:
        'You run the robots on the floor day to day, starting them up, keeping them fed, and stepping in when a cell needs a hand.',
      responsibilities: [
        'Start up and watch over robotic work cells through a shift.',
        'Load the parts and materials that keep the line moving.',
        'Flag and log anything that looks off for the maintenance team.',
      ],
      skills: ['Machine operation', 'Safety procedures', 'Quality checks', 'Basic troubleshooting'],
      roleNoun: 'robot operator',
    },
    {
      id: 'technician-entry-level-robotics',
      categoryId: 'technician',
      title: 'Entry Level Robotics',
      summary:
        'This is the on-ramp into robotics work, where you learn the equipment, the safety rules, and how a cell runs while you build real floor experience.',
      responsibilities: [
        'Learn each robotic cell and how it fits into the line.',
        'Help set up and tend the robots under a lead operator.',
        'Keep the work area clean, safe, and ready to run.',
      ],
      skills: ['Shop safety', 'Reading work instructions', 'Hand tools', 'Teamwork'],
      roleNoun: 'robotics operator',
    },
    {
      id: 'technician-assembly-operator',
      categoryId: 'technician',
      title: 'Assembly Operator',
      summary:
        'You work alongside the robots to put parts together, checking fit and finish so every piece that leaves the line is built right.',
      responsibilities: [
        'Assemble and inspect parts as they come off the robotic cell.',
        'Catch defects early and pull anything that misses the mark.',
        'Track output and report counts at the end of a run.',
      ],
      skills: ['Assembly', 'Visual inspection', 'Attention to detail', 'Recordkeeping'],
      roleNoun: 'assembly operator',
    },
  ],
  specialist: [
    {
      id: 'specialist-robotics-specialist',
      categoryId: 'specialist',
      title: 'Robotics Specialist',
      summary:
        'You set up, program, and fine-tune robotic systems so a line runs faster and cleaner, owning the hands-on side of making the robots work.',
      responsibilities: [
        'Configure and test robotic cells for a new job.',
        'Tune programs to hit cycle-time and quality targets.',
        'Train the floor team on running the system.',
      ],
      skills: ['Robot programming', 'System setup', 'QA and inspection', 'Troubleshooting'],
      roleNoun: 'robotics specialist',
    },
    {
      id: 'specialist-robotics-engineer',
      categoryId: 'specialist',
      title: 'Robotics Engineer',
      summary:
        'You design and build robotic systems from the ground up, deciding how a robot moves, grips, and gets the job done.',
      responsibilities: [
        'Design robotic systems and end-of-arm tooling.',
        'Build and test prototypes before they go live.',
        'Write the control software that drives each application.',
      ],
      skills: ['Mechanical design', 'Controls', 'Programming', 'Prototyping'],
      roleNoun: 'robotics engineer',
    },
    {
      id: 'specialist-mechatronics-engineer',
      categoryId: 'specialist',
      title: 'Mechatronics Engineer',
      summary:
        'You work where machines, electronics, and code meet, blending all three so a robotic system runs as one smooth machine.',
      responsibilities: [
        'Integrate the mechanical, electrical, and software pieces into one system.',
        'Spec the sensors and controls a build needs.',
        'Debug systems that cross hardware and software.',
      ],
      skills: ['Electronics and controls', 'Sensors', 'Mechanical systems', 'Programming'],
      roleNoun: 'mechatronics engineer',
    },
    {
      id: 'specialist-automation-engineer',
      categoryId: 'specialist',
      title: 'Automation Engineer',
      summary:
        'You automate the steps people used to do by hand, planning and wiring up the systems that keep production moving on its own.',
      responsibilities: [
        'Plan automated processes for a production line.',
        'Program PLCs and coordinate the equipment.',
        'Measure the results and improve throughput.',
      ],
      skills: ['PLC programming', 'Process design', 'Project management', 'Data analysis'],
      roleNoun: 'automation engineer',
    },
    {
      id: 'specialist-robotic-systems-engineer',
      categoryId: 'specialist',
      title: 'Robotic Systems Engineer',
      summary:
        'You take the wide view of a robotic system, making sure every part talks to the next and the whole thing performs the way it should.',
      responsibilities: [
        'Define how the parts of a robotic system fit together.',
        'Run tests across the full system, not just one cell.',
        'Work with other engineers to close performance gaps.',
      ],
      skills: ['Systems integration', 'Testing', 'Robot programming', 'Collaboration'],
      roleNoun: 'robotic systems engineer',
    },
  ],
  integrator: [
    {
      id: 'integrator-robotics-integrator',
      categoryId: 'integrator',
      title: 'Robotics Integrator',
      summary:
        'You bring whole automation projects together, pulling robots, conveyors, and software into one system that does what the plant needs.',
      responsibilities: [
        'Plan how a full automation cell will come together.',
        'Coordinate the robots, conveyors, and controls as one unit.',
        'Oversee the install and testing until it hits the goals.',
      ],
      skills: ['Systems integration', 'Simulation', 'Project planning', 'Process design'],
      roleNoun: 'robotics integrator',
    },
    {
      id: 'integrator-robotic-integration-design-engineer',
      categoryId: 'integrator',
      title: 'Robotic Integration Design Engineer',
      summary:
        'You design the plan for how an automated work center fits and flows before anyone builds it, so the pieces line up the first time.',
      responsibilities: [
        'Lay out the work cell with reach, coverage, and cycle time in mind.',
        'Model the design in simulation before the build.',
        'Hand a clear plan to the build team.',
      ],
      skills: ['System and process design', 'Simulation', 'CAD and layout', 'Offline programming'],
      roleNoun: 'robotic integration design engineer',
    },
    {
      id: 'integrator-robotics-software-integrator',
      categoryId: 'integrator',
      title: 'Robotics Software Integrator',
      summary:
        'You write and connect the software that lets every machine in an automated system work together and share data.',
      responsibilities: [
        'Connect the control software across machines and robots.',
        'Make sure the systems share data and stay in sync.',
        'Test and debug the integrated software.',
      ],
      skills: ['Computer programming', 'Interoperability', 'Big data', 'Debugging'],
      roleNoun: 'robotics software integrator',
    },
    {
      id: 'integrator-robotics-application-development-engineer',
      categoryId: 'integrator',
      title: 'Robotics Application Development Engineer',
      summary:
        'You build the applications that tell an automated system what to do for a specific job, turning a plan into working software.',
      responsibilities: [
        'Develop applications for new automation jobs.',
        'Tailor the software to each customer’s process.',
        'Validate the application against the plan.',
      ],
      skills: ['Application development', 'Programming', 'Process knowledge', 'Testing'],
      roleNoun: 'robotics application developer',
    },
    {
      id: 'integrator-advanced-industrial-integrator',
      categoryId: 'integrator',
      title: 'Advanced Industrial Integrator',
      summary:
        'You take on the toughest, largest automation builds, planning advanced systems that reshape how a whole plant runs.',
      responsibilities: [
        'Run feasibility studies on big automation projects.',
        'Plan advanced, plant-scale systems.',
        'Lead the rollout and prove the improvement.',
      ],
      skills: ['Feasibility analysis', 'Systems simulation', 'Visualization', 'Leadership'],
      roleNoun: 'advanced industrial integrator',
    },
  ],
};
