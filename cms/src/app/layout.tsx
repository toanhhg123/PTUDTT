import * as React from 'react';
import type { Viewport } from 'next';

import '@/styles/global.css';

import ReactQueryContext from '@/context/react-query';
import { Toaster } from 'sonner';

import { UserProvider } from '@/contexts/user-context';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';

export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <ReactQueryContext>
          <Toaster richColors position="top-right" />
          <LocalizationProvider>
            <UserProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </UserProvider>
          </LocalizationProvider>
        </ReactQueryContext>

        <script async src="https://upload-widget.cloudinary.com/latest/global/all.js" type="text/javascript" />
      </body>
    </html>
  );
}
