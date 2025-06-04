import type { Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

import { ReactNode } from 'react';

import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';

import '@/styles/globals.css';

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetBrainsMono = JetBrains_Mono({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <body
      className={`page-background flex min-h-svh min-w-[340px] flex-col font-sans antialiased ${inter.variable} ${jetBrainsMono.variable}`}
    >
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </body>
  );
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#f5f5f4',
};
