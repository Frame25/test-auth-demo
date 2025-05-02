import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { PopupProvider } from '@/shared/ui/Popup';
import { ToastProvider } from '@/shared/ui/Toast';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Auth Demo App - Login',
  description: 'Secure login page for the Auth Demo application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Skip link for keyboard users */}
        <a
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          href="#main-content">
          Skip to main content
        </a>

        <ToastProvider>
          <PopupProvider>
            <header>{/* Add header content here */}</header>
            <nav>{/* Add navigation content here */}</nav>
            <main id="main-content">{children}</main>
            <footer>{/* Add footer content here */}</footer>
          </PopupProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
