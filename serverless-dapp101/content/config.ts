export interface Step {
  id: string;
  title: string;
  duration: number; // minutes
  path: 'vibe' | 'manual' | 'both';
  order: number;
  file: string;
}

export const steps: Step[] = [
  {
    id: '01-quick-start',
    title: 'Quick Start',
    duration: 3,
    path: 'both',
    order: 1,
    file: '01-quick-start.md',
  },
  {
    id: '02-fork-setup',
    title: 'Fork Template & Generate Wallet',
    duration: 5,
    path: 'both',
    order: 2,
    file: '02-fork-setup.md',
  },
  {
    id: '03-environment',
    title: 'Set Environment Variables',
    duration: 2,
    path: 'both',
    order: 3,
    file: '03-environment.md',
  },
  {
    id: '04-run-locally',
    title: 'Run Locally',
    duration: 1,
    path: 'both',
    order: 4,
    file: '04-run-locally.md',
  },
  {
    id: '05-first-record',
    title: 'Create Your First Record',
    duration: 5,
    path: 'both',
    order: 5,
    file: '05-first-record.md',
  },
  {
    id: '06-verify-explorer',
    title: 'Verify on Explorer',
    duration: 3,
    path: 'both',
    order: 6,
    file: '06-verify-explorer.md',
  },
  {
    id: '07-walkaway-test',
    title: 'Walkaway Test',
    duration: 5,
    path: 'both',
    order: 7,
    file: '07-walkaway-test.md',
  },
  {
    id: '08-concepts',
    title: 'Understanding Arkiv (Optional)',
    duration: 10,
    path: 'both',
    order: 8,
    file: '08-concepts.md',
  },
  {
    id: '09-customization',
    title: 'Customize Your App',
    duration: 10,
    path: 'both',
    order: 9,
    file: '09-customization.md',
  },
  {
    id: '10-deploy-vercel',
    title: 'Optional: Deploy to Vercel',
    duration: 5,
    path: 'both',
    order: 10,
    file: '10-deploy-vercel.md',
  },
  {
    id: '11-next-steps',
    title: 'Next Steps & Resources',
    duration: 10,
    path: 'both',
    order: 11,
    file: '11-next-steps.md',
  },
];

