'use client';

import { useState } from 'react';
import { PathToggle } from './PathToggle';
import { CodeBlock } from './CodeBlock';
import { Checkpoint } from './Checkpoint';
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
  
  // Parse content sections
  const sections = parseMarkdownSections(content, currentPath);

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
    
    // Handle checkpoint
    if (line.startsWith('## Checkpoint')) {
      if (currentSection.content.trim()) {
        sections.push(currentSection);
      }
      currentSection = { type: 'checkpoint', items: [] };
      i++;
      while (i < lines.length && lines[i].trim().startsWith('- [')) {
        const item = lines[i].trim().replace(/^-\s*\[.*?\]\s*/, '');
        currentSection.items.push(item);
        i++;
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

