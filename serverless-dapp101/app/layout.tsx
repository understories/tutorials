'use client';

import { ProgressProvider } from '../components/ProgressProvider';
import { GitHubLink } from '../components/GitHubLink';
import { LearnLink } from '../components/LearnLink';
import { DictLink } from '../components/DictLink';
import { HomeLink } from '../components/HomeLink';
import { SecurityLink } from '../components/SecurityLink';
import { TryLink } from '../components/TryLink';
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
          <nav className="fixed top-4 right-4 z-50 flex items-center gap-3">
            <HomeLink />
            <LearnLink />
            <DictLink />
            <SecurityLink />
            <TryLink />
            <GitHubLink />
          </nav>
          {children}
        </ProgressProvider>
      </body>
    </html>
  );
}

