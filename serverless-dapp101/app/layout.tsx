'use client';

import { ProgressProvider } from '../components/ProgressProvider';
import { GitHubLink } from '../components/GitHubLink';
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
          <GitHubLink />
          {children}
        </ProgressProvider>
      </body>
    </html>
  );
}

