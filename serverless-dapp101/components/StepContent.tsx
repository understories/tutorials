'use client';

import { useState, useEffect, useMemo } from 'react';
import { PathToggle } from './PathToggle';
import { CodeBlock } from './CodeBlock';
import { Checkpoint } from './Checkpoint';
import { useProgress } from './ProgressProvider';
import ReactMarkdown from 'react-markdown';

export function StepContent({ 
  content, 
  stepId,
  path 
}: { 
  content: string; 
  stepId: string;
  path: 'vibe' | 'manual' | 'both';
}) {
  const [currentPath, setCurrentPath] = useState<'vibe' | 'manual'>(path === 'both' ? 'vibe' : path);
  const { setCheckpointState } = useProgress();
  
  // Parse content sections - memoized to prevent re-parsing on re-renders
  const sections = useMemo(() => {
    return parseMarkdownSections(content, currentPath);
  }, [content, currentPath]);
  
  // Check if this step has a checkpoint section - memoized
  const hasCheckpoint = useMemo(() => {
    return sections.some(s => s.type === 'checkpoint');
  }, [sections]);
  
  // Initialize checkpoint state: if no checkpoint, mark as "complete" (undefined means no requirement)
  useEffect(() => {
    if (!hasCheckpoint) {
      // Step has no checkpoint, so navigation is always allowed
      setCheckpointState(stepId, true);
    } else {
      // Step has checkpoint, start as incomplete
      setCheckpointState(stepId, false);
    }
  }, [stepId, hasCheckpoint, setCheckpointState]);

  return (
    <>
      {path === 'both' && (
        <PathToggle defaultPath={currentPath} onPathChange={setCurrentPath} />
      )}
      
      <div className="prose max-w-none">
        {sections.map((section, index) => (
          <SectionRenderer 
            key={index} 
            section={section} 
            stepId={stepId}
          />
        ))}
      </div>
    </>
  );
}

function parseMarkdownSections(content: string, currentPath: 'vibe' | 'manual'): any[] {
  const sections: any[] = [];
  const lines = content.split('\n');
  let currentSection: any = { type: 'text', content: '' };
  let inCodeBlock = false;
  let codeLanguage = '';
  let codeContent = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Handle code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End of code block
        sections.push({ type: 'code', code: codeContent.trim(), language: codeLanguage });
        codeContent = '';
        codeLanguage = '';
        inCodeBlock = false;
      } else {
        // Start of code block
        if (currentSection.content.trim()) {
          sections.push(currentSection);
        }
        codeLanguage = line.replace('```', '').trim();
        inCodeBlock = true;
        currentSection = { type: 'text', content: '' };
      }
      continue;
    }
    
    if (inCodeBlock) {
      codeContent += line + '\n';
      continue;
    }
    
    // Handle checkpoint (including "Final Checkpoint")
    if (line.startsWith('## Checkpoint') || line.startsWith('## Final Checkpoint')) {
      if (currentSection.content.trim()) {
        sections.push(currentSection);
      }
      currentSection = { type: 'checkpoint', items: [] };
      i++;
      // Skip blank lines and non-checklist lines until we find checklist items
      while (i < lines.length) {
        const nextLine = lines[i].trim();
        if (nextLine.startsWith('- [')) {
          // Found a checklist item
          const item = nextLine.replace(/^-\s*\[.*?\]\s*/, '');
          currentSection.items.push(item);
          i++;
        } else if (nextLine === '' || !nextLine.startsWith('##')) {
          // Skip blank lines and regular text (but stop at next section)
          i++;
        } else {
          // Hit next section, stop
          break;
        }
      }
      i--;
      sections.push(currentSection);
      currentSection = { type: 'text', content: '' };
      continue;
    }
    
    // Filter by path
    if (line.startsWith('## Vibe Path') || line.startsWith('## Manual Path')) {
      if (currentSection.content.trim()) {
        sections.push(currentSection);
      }
      currentSection = { type: 'text', content: '' };
      
      const isVibePath = line.includes('Vibe Path');
      if ((currentPath === 'vibe' && !isVibePath) || (currentPath === 'manual' && isVibePath)) {
        // Skip this section
        i++;
        while (i < lines.length && !lines[i].startsWith('## ')) {
          i++;
        }
        i--;
        continue;
      }
      // Include this section
      continue;
    }
    
    currentSection.content += line + '\n';
  }
  
  if (inCodeBlock && codeContent.trim()) {
    sections.push({ type: 'code', code: codeContent.trim(), language: codeLanguage });
  }
  
  if (currentSection.content.trim()) {
    sections.push(currentSection);
  }
  
  return sections;
}

function SectionRenderer({ 
  section, 
  stepId
}: { 
  section: any; 
  stepId: string;
}) {
  if (section.type === 'checkpoint') {
    return <Checkpoint stepId={stepId} items={section.items} />;
  }
  
  if (section.type === 'code') {
    return <CodeBlock code={section.code} language={section.language || 'bash'} />;
  }
  
  return (
    <div className="markdown-content">
      <ReactMarkdown>{section.content}</ReactMarkdown>
    </div>
  );
}

