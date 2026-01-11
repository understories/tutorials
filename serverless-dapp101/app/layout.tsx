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
          <footer className="w-full py-6 text-center text-gray-600 text-sm">
            Grown with <span className="text-red-500">♥</span> by{' '}
            <a 
              href="https://understories.github.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Understories
            </a>
          </footer>
        </ProgressProvider>
      </body>
    </html>
  );
}

