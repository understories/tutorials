'use client';

import { ProgressProvider } from '../components/ProgressProvider';
import { GitHubLink } from '../components/GitHubLink';
import { LearnLink } from '../components/LearnLink';
import './globals.css';

export default function WorkshopTutorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProgressProvider>
          <LearnLink />
          <GitHubLink />
          {children}
        </ProgressProvider>
      </body>
    </html>
  );
}

