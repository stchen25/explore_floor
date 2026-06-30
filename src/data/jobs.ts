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
        "You're the person who keeps the robots running on the floor all shift. You power up the cells, load the parts they need, and watch the screens for trouble. When something stalls, you're the first one in to clear it, and a smooth run is on you.",
      responsibilities: [
        "Power up robotic work cells at the start of a shift and confirm they're running right.",
        'Load parts, fixtures, and materials so the robots never sit waiting.',
        'Watch the cell through the run and clear small jams and faults as they pop up.',
        'Run quick quality checks on finished parts and pull anything that looks off.',
        'Log faults, downtime, and part counts so the team can spot patterns.',
        'Hand bigger issues to maintenance with a clear note on what happened.',
      ],
      skills: [
        'Machine operation',
        'Cell startup',
        'Part loading',
        'Quality checks',
        'Fault logging',
        'Shop safety',
      ],
      roleNoun: 'robot operator',
    },
    {
      id: 'technician-entry-level-robotics',
      categoryId: 'technician',
      title: 'Entry Level Robotics',
      summary:
        "This is your way into robotics work, with no experience needed on day one. You shadow a lead operator, learn how each cell runs, and pick up the safety habits that keep everyone in one piece. Every shift you get a little more hands-on.",
      responsibilities: [
        'Learn each robotic cell on the line and how it connects to the next one.',
        'Help set up and tend the robots while a lead operator shows you the ropes.',
        'Follow the safety rules and lockout steps every single time.',
        'Read work instructions and match your setup to what the job calls for.',
        'Keep the work area clean, stocked, and ready for the next run.',
        'Ask questions and write down what you learn so it sticks.',
      ],
      skills: [
        'Shop safety',
        'Reading work orders',
        'Hand tools',
        'Following setups',
        'Teamwork',
        'Quick learning',
      ],
      roleNoun: 'robotics operator',
    },
    {
      id: 'technician-assembly-operator',
      categoryId: 'technician',
      title: 'Assembly Operator',
      summary:
        "You work right next to the robots, putting parts together and checking that each one fits and looks right. The robot handles the heavy, repeating moves, and you make the calls a machine can't. Nothing leaves your station unless it's built the way it should be.",
      responsibilities: [
        'Assemble parts as they come off the robotic cell, following the build sheet.',
        'Check fit, finish, and torque so each piece meets spec.',
        'Spot defects early and pull any part that misses the mark.',
        'Restock components and fixtures so the station keeps moving.',
        'Count output and record it at the end of each run.',
        'Flag repeat defects to the lead so the root cause gets fixed.',
      ],
      skills: [
        'Hand assembly',
        'Visual inspection',
        'Attention to detail',
        'Reading build sheets',
        'Recordkeeping',
        'Steady pace',
      ],
      roleNoun: 'assembly operator',
    },
  ],
  specialist: [
    {
      id: 'specialist-robotics-specialist',
      categoryId: 'specialist',
      // Distinct from the "Specialist" role center so the constellation doesn't read role == job.
      title: 'Robotics Programmer',
      summary:
        "You're the one who makes a robotic cell actually work the way it should. You set it up, program the moves, and fine-tune it until it hits cycle time without dropping quality. When the floor team hits a problem they can't crack, they come to you.",
      responsibilities: [
        'Set up and program robotic cells for each new job on the line.',
        'Tune motion paths and timing to hit cycle-time and quality targets.',
        'Run trials, read the data, and adjust until the cell holds steady.',
        "Troubleshoot faults the floor operators can't clear on their own.",
        'Train operators on how to run and watch the system safely.',
        'Document the setup so the next run starts from a known-good baseline.',
      ],
      skills: [
        'Robot programming',
        'Cell setup',
        'Cycle-time tuning',
        'Troubleshooting',
        'QA and inspection',
        'Operator training',
      ],
      roleNoun: 'robotics programmer',
    },
    {
      id: 'specialist-robotics-engineer',
      categoryId: 'specialist',
      title: 'Robotics Engineer',
      summary:
        "You design robotic systems from a blank page, deciding how a robot reaches, grips, and gets the job done. You sketch the mechanics, pick the parts, and write the control code that brings it to life. Then you build a prototype and prove it works before it ever hits the floor.",
      responsibilities: [
        'Design robotic systems and the end-of-arm tooling that does the real work.',
        'Choose the motors, grippers, and sensors that fit the job and the budget.',
        'Write the control software that drives each application.',
        'Build and test prototypes, then fix what the testing turns up.',
        'Run the numbers on reach, payload, and cycle time to confirm the design holds.',
        'Hand off drawings and code the build team can actually follow.',
      ],
      skills: [
        'Mechanical design',
        'CAD modeling',
        'Control coding',
        'Prototyping',
        'End-of-arm tooling',
        'Design testing',
      ],
      roleNoun: 'robotics engineer',
    },
    {
      id: 'specialist-mechatronics-engineer',
      categoryId: 'specialist',
      title: 'Mechatronics Engineer',
      summary:
        "You live where the machine, the wiring, and the code all meet. Your job is to blend the mechanical parts, the electronics, and the software so a robotic system runs like one machine instead of three. When something breaks across that line, you're the one who can trace it.",
      responsibilities: [
        'Pull the mechanical, electrical, and software pieces into one working system.',
        'Spec the sensors, motors, and controls a build needs.',
        'Wire and test control circuits, then confirm they talk to the software.',
        'Debug problems that cross hardware and code, not just one side.',
        'Tune sensor feedback so the system reacts the way it should.',
        'Document the wiring and logic so others can service it later.',
      ],
      skills: [
        'Electronics and controls',
        'Sensor integration',
        'Mechanical systems',
        'Embedded coding',
        'System wiring',
        'Cross-system debugging',
      ],
      roleNoun: 'mechatronics engineer',
    },
    {
      id: 'specialist-automation-engineer',
      categoryId: 'specialist',
      title: 'Automation Engineer',
      summary:
        "You take steps people used to do by hand and turn them into systems that run on their own. You plan the process, program the controllers, and wire up the equipment so the line keeps moving without someone babysitting it. Then you measure the results and push the throughput higher.",
      responsibilities: [
        'Map out an automated process for a production line, step by step.',
        'Program PLCs and set the logic that coordinates the equipment.',
        'Wire and configure the sensors, drives, and safety devices.',
        'Run the line, measure throughput, and chase down bottlenecks.',
        "Build in safety stops and error handling so faults don't cascade.",
        'Track results against the goal and tune the process to do better.',
      ],
      skills: [
        'PLC programming',
        'Process design',
        'Throughput analysis',
        'Project planning',
        'Safety logic',
        'Data analysis',
      ],
      roleNoun: 'automation engineer',
    },
    {
      id: 'specialist-robotic-systems-engineer',
      categoryId: 'specialist',
      title: 'Robotic Systems Engineer',
      summary:
        "You take the wide view of a robotic system and make sure every part plays nice with the next. You define how the cells, controls, and software fit together, then test the whole thing as one unit instead of piece by piece. When performance drops somewhere, you find which link is the weak one.",
      responsibilities: [
        'Define how the cells, controls, and software of a system fit together.',
        'Set the requirements each part has to meet to play its role.',
        'Run tests across the full system, not just one cell at a time.',
        "Track performance gaps down to the part that's actually causing them.",
        'Work with the other engineers to close those gaps and retest.',
        'Keep the system documentation current as the build changes.',
      ],
      skills: [
        'Systems integration',
        'Requirements setting',
        'Full-system testing',
        'Robot programming',
        'Performance tuning',
        'Team collaboration',
      ],
      roleNoun: 'robotic systems engineer',
    },
  ],
  integrator: [
    {
      id: 'integrator-robotics-integrator',
      categoryId: 'integrator',
      title: 'Robotics Integrator',
      summary:
        "You bring a whole automation project together from a pile of separate parts. Robots, conveyors, controls, and software all have to act as one system, and you're the person who plans that and makes it real. You own it from the first layout to the day it hits the numbers the plant needs.",
      responsibilities: [
        'Plan how a full automation cell will come together before the build starts.',
        'Coordinate the robots, conveyors, and controls so they run as one unit.',
        'Sequence the install so each piece goes in the right order.',
        'Oversee testing and tuning until the cell hits its targets.',
        'Work with vendors and the floor team to clear roadblocks fast.',
        'Sign off on the system once it proves out and hand over the docs.',
      ],
      skills: [
        'Systems integration',
        'Project planning',
        'Process design',
        'Simulation',
        'Install oversight',
        'Vendor coordination',
      ],
      roleNoun: 'robotics integrator',
    },
    {
      id: 'integrator-robotic-integration-design-engineer',
      categoryId: 'integrator',
      title: 'Robotic Integration Design Engineer',
      summary:
        "You draw the plan for an automated work center before anyone picks up a tool. You lay out where every robot and conveyor sits, check the reach and the timing, and model it in simulation so the pieces line up the first time. Get this right and the build goes smooth; miss it and the floor pays for it.",
      responsibilities: [
        'Lay out the work cell with reach, coverage, and cycle time in mind.',
        'Model the full design in simulation before the build begins.',
        'Check that the robots can reach every point without crashing into each other.',
        'Program the robots offline so the floor build starts ahead.',
        'Adjust the layout when the simulation turns up a clash or a slow spot.',
        'Hand the build team a clear, buildable plan with the details locked in.',
      ],
      skills: [
        'System and process design',
        'Simulation',
        'CAD and layout',
        'Offline programming',
        'Reach studies',
        'Cycle-time analysis',
      ],
      roleNoun: 'robotic integration design engineer',
    },
    {
      id: 'integrator-robotics-software-integrator',
      categoryId: 'integrator',
      title: 'Robotics Software Integrator',
      summary:
        "You write and connect the software that lets every machine in an automated system work as a team. Each robot and controller speaks its own language, and your job is to get them sharing data and staying in sync. When the whole line has to move as one, the code making that happen is yours.",
      responsibilities: [
        'Connect the control software across the robots, machines, and controllers.',
        'Build the links that let separate systems share data in real time.',
        'Make sure every machine stays in sync through a full cycle.',
        'Test and debug the integrated software end to end.',
        'Set up logging so problems are easy to trace later.',
        'Update the integration as machines get added or swapped out.',
      ],
      skills: [
        'Computer programming',
        'System interoperability',
        'Data integration',
        'Real-time sync',
        'Debugging',
        'Logging and tracing',
      ],
      roleNoun: 'robotics software integrator',
    },
    {
      id: 'integrator-robotics-application-development-engineer',
      categoryId: 'integrator',
      title: 'Robotics Application Development Engineer',
      summary:
        "You build the software that tells an automated system exactly what to do for one specific job. You take a plan and a customer's process and turn them into a working application the robots can run. Every plant is a little different, so a lot of the work is making the software fit theirs.",
      responsibilities: [
        'Develop applications that run new automation jobs from end to end.',
        "Tailor the software to each customer's process and parts.",
        'Work from the integration plan to keep the app in line with the system.',
        "Test the application against the plan and fix what doesn't match.",
        "Walk the customer's team through how the application runs.",
        'Refine the app after launch as real-world use turns up edge cases.',
      ],
      skills: [
        'Application development',
        'Programming',
        'Process knowledge',
        'Software testing',
        'Customer fit',
        'Post-launch support',
      ],
      roleNoun: 'robotics application developer',
    },
    {
      id: 'integrator-advanced-industrial-integrator',
      categoryId: 'integrator',
      title: 'Advanced Industrial Integrator',
      summary:
        "You take on the biggest, hardest automation builds, the kind that change how a whole plant runs. You study whether a project even makes sense, plan the system at full plant scale, and lead the rollout once it's a go. These are the projects where a lot is on the line and the planning has to be airtight.",
      responsibilities: [
        'Run feasibility studies and crunch the data on big automation projects.',
        'Plan advanced, plant-scale systems that tie many cells together.',
        'Model the whole system to prove it works before the spend is approved.',
        'Lead the rollout across teams, vendors, and shifts.',
        'Track the results and prove the improvement actually landed.',
        'Mentor the engineers working the pieces underneath the plan.',
      ],
      skills: [
        'Feasibility analysis',
        'Systems simulation',
        'Plant-scale planning',
        'Data analysis',
        'Rollout leadership',
        'Visualization',
      ],
      roleNoun: 'advanced industrial integrator',
    },
  ],
};
