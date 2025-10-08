import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from '../components/theme/ThemeProvider';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { Header } from '@/components/layout/Header';
import { Jura, Stalinist_One } from 'next/font/google';


// ЗАМЕНИТЕ Inter на ваши шрифты
const hachiMaruPop = Jura({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-primary',
});

const stalinistOne = Stalinist_One({
  weight: '400',
  subsets: ['cyrillic', 'latin'],
  variable: '--font-accent',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning className={`${hachiMaruPop.variable} ${stalinistOne.variable}`}>
      <body>
        <Providers>
          <Header />
          {children}
          <ThemeProvider />
          <ThemeToggle />
        </Providers>
      </body>
    </html>
  );
}