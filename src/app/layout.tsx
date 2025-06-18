import './globals.css';
import type { Metadata } from 'next';
import { Orbitron, Space_Grotesk, Rajdhani } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-orbitron' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-spacegrotesk' });
const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-rajdhani' });

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
      className={`${orbitron.variable} ${spaceGrotesk.variable} ${rajdhani.variable}`}
      suppressHydrationWarning // Add this prop
    >
      <body className="bg-black text-light font-spacegrotesk">
        {children}
      </body>
    </html>
  );
}
