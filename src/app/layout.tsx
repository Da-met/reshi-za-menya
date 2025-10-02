import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from '../components/theme/ThemeProvider';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { Header } from '@/components/layout/Header';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Реши за меня - приложение для генерации идей',
  description: 'Генерируйте идеи для рецептов, подарков, фильмов и мест для отдыха',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
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