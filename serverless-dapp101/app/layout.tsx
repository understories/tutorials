'use client';

import { ProgressProvider } from '../components/ProgressProvider';
import { GitHubLink } from '../components/GitHubLink';
import { LearnLink } from '../components/LearnLink';
import { HomeLink } from '../components/HomeLink';
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
          <HomeLink />
          <LearnLink />
          <GitHubLink />
          {children}
        </ProgressProvider>
      </body>
    </html>
  );
}

