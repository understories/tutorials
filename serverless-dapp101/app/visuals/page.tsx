'use client';

import { VisualAid } from '../../components/VisualAid';

const visuals = [
  {
    id: 'architecture-comparison',
    title: 'Architecture Comparison',
    description: 'Side-by-side comparison of traditional app vs serverless dapp architecture',
    src: '/visuals/architecture-comparison.svg',
    alt: 'Side-by-side comparison of a traditional app where data is stored in a company database versus a serverless dapp where data is stored on the Arkiv network and owned by the user.',
    phase: 'Phase 1 - Core Visuals',
  },
  {
    id: 'stack-comparison',
    title: 'Development Stack Comparison',
    description: 'Shows how Arkiv fits into the familiar development stack',
    src: '/visuals/stack-comparison.svg',
    alt: 'Comparison of the Vibes to App development stack with the Serverless DApp stack, highlighting Arkiv as the new decentralized data layer.',
    phase: 'Phase 1 - Core Visuals',
  },
  {
    id: 'path-toggle',
    title: 'Path Toggle',
    description: 'Clarifies the two development paths (AI-assisted vs manual)',
    src: '/visuals/path-toggle.svg',
    alt: 'Two parallel development paths: an AI-assisted path and a manual tutorial path, both leading to a working application.',
    phase: 'Phase 1 - Core Visuals',
  },
  {
    id: 'concept-bridges',
    title: 'Concept Bridges',
    description: 'Connects Vibes to App concepts to new serverless concepts',
    src: '/visuals/concept-bridges.svg',
    alt: 'Conceptual progression showing how ideas from the Vibes to App workshop extend into serverless and decentralized application concepts.',
    phase: 'Phase 1 - Core Visuals',
  },
  {
    id: 'data-flow-write',
    title: 'Data Flow - Write',
    description: 'Shows how data moves when writing to Arkiv',
    src: '/visuals/data-flow-write.svg',
    alt: 'Write flow showing how a user action becomes a signed Arkiv transaction recorded on the blockchain and visible in the explorer.',
    phase: 'Phase 2 - Hands-On Visuals',
  },
  {
    id: 'data-flow-read',
    title: 'Data Flow - Read',
    description: 'Shows how data is queried from Arkiv',
    src: '/visuals/data-flow-read.svg',
    alt: 'Read flow showing how application data is queried from Arkiv and displayed in the user interface.',
    phase: 'Phase 2 - Hands-On Visuals',
  },
  {
    id: 'entity-structure',
    title: 'Arkiv Entity Structure',
    description: 'Shows how data is structured in Arkiv',
    src: '/visuals/entity-structure.svg',
    alt: 'Diagram of an Arkiv entity showing its unique ID, queryable attributes, content payload, and transaction hash used for verification.',
    phase: 'Phase 2 - Hands-On Visuals',
  },
  {
    id: 'walkaway-test',
    title: 'Walkaway Test',
    description: 'Demonstrates data independence visually',
    src: '/visuals/walkaway-test.svg',
    alt: 'Comparison showing that data stored in a traditional app is lost when the app shuts down, while data stored on Arkiv remains accessible to new applications.',
    phase: 'Phase 2 - Hands-On Visuals',
  },
  {
    id: 'verification-flow',
    title: 'Verification Flow',
    description: 'Shows how blockchain verification works',
    src: '/visuals/verification-flow.svg',
    alt: 'Step-by-step flow showing how a transaction hash is used to verify data on the blockchain using the Arkiv explorer.',
    phase: 'Phase 2 - Hands-On Visuals',
  },
];

export default function VisualsPage() {
  const phase1Visuals = visuals.filter(v => v.phase === 'Phase 1 - Core Visuals');
  const phase2Visuals = visuals.filter(v => v.phase === 'Phase 2 - Hands-On Visuals');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Serverless DApp 101 Visual Aids
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Visual aids to help you understand serverless and decentralized application concepts.
            These diagrams work in conversation with the tutorial steps.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Phase 1 - Core Visuals</h2>
          <div className="space-y-16">
            {phase1Visuals.map((visual) => (
              <div key={visual.id} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{visual.title}</h3>
                <p className="text-gray-600 mb-6">{visual.description}</p>
                <VisualAid
                  src={visual.src}
                  alt={visual.alt}
                  className="mb-0"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Phase 2 - Hands-On Visuals</h2>
          <div className="space-y-16">
            {phase2Visuals.map((visual) => (
              <div key={visual.id} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{visual.title}</h3>
                <p className="text-gray-600 mb-6">{visual.description}</p>
                <VisualAid
                  src={visual.src}
                  alt={visual.alt}
                  className="mb-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
