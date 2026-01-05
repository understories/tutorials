import { notFound } from 'next/navigation';
import { steps } from '../../content/config';
import { ProgressBar } from '../../components/ProgressBar';
import { StepNav } from '../../components/StepNav';
import { StepContent } from '../../components/StepContent';
import fs from 'fs';
import path from 'path';

// Load markdown content
function loadStepContent(stepId: string): string {
  try {
    // Content is in the content/ directory at repo root
    // Content is in the content/ directory at repo root
    const filePath = path.join(process.cwd(), 'content', 'steps', `${stepId}.md`);
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return `# Step Content\n\nContent for ${stepId} coming soon...`;
  }
}

export default async function StepPage({ params }: { params: Promise<{ step: string }> }) {
  const { step: stepId } = await params;
  const step = steps.find(s => s.id === stepId);
  
  if (!step) {
    notFound();
  }

  const content = loadStepContent(step.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <ProgressBar currentStepId={stepId} />
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{step.title}</h1>
          <p className="text-gray-600 mb-6">Estimated time: {step.duration} minutes</p>
          
          <StepContent 
            content={content} 
            stepId={step.id}
            path={step.path}
          />

          <StepNav currentStepId={stepId} />
        </div>
      </div>
    </div>
  );
}

