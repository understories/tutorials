'use client';

import { ProgressProvider } from '../components/ProgressProvider';
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
          {children}
        </ProgressProvider>
      </body>
    </html>
  );
}

