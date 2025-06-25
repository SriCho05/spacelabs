import './globals.css';
import type { Metadata } from 'next';
import ClientLayout from '@/components/ClientLayout';
import AppLoader from '@/components/AppLoader';
import CustomCursor from '@/components/CustomCursor';

export const metadata: Metadata = {
  title: 'SpaceLabs',
  description: 'Where Innovation Meets Orbit',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className="bg-black text-light font-sf-pro">
        <CustomCursor />
        <AppLoader>{children}</AppLoader>
      </body>
    </html>
  );
}
