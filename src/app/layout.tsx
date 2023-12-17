import type { Metadata } from 'next';
import { inter } from '@/config';

import './globals.css';
import { HydrationOverlay } from '@builder.io/react-hydration-overlay';
import { Providers } from '@/components';

export const metadata: Metadata = {
  title: {
    template: '%s | My E-shop',
    default: 'Home',
  },
  description: 'My E-shop with innovative products',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HydrationOverlay>
          <Providers>{children}</Providers>
        </HydrationOverlay>
      </body>
    </html>
  );
}
