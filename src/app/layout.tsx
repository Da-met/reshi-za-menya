import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from '../components/theme/ThemeProvider';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { Header } from '@/components/layout/Header';
import { jura, rubikMarkerHatch } from './fonts';
import type { Metadata, Viewport } from 'next'; // Добавляем импорт типа Viewport

// 1. Создаем отдельный экспорт для viewport (НОВЫЙ СПОСОБ)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],
};

// 2. Обновляем metadata - удаляем viewport и themeColor оттуда
export const metadata: Metadata = {
  metadataBase: new URL('https://reshizamena.ru'), // ДОБАВЛЯЕМ ЭТО
  title: {
    default: 'Реши за меня - AI помощник для бытовых решений',
    template: '%s | Реши за меня'
  },
  description: 'AI-помощник для решения бытовых задач: что приготовить, что подарить, что посмотреть, что почитать, подбор уходовых средств',
  keywords: ['AI помощник', 'бытовые решения', 'что приготовить', 'что подарить', 'подбор средств', 'рекомендации'],
  authors: [{ name: 'Реши за меня' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://reshizamena.ru',
    siteName: 'Реши за меня',
    title: 'Реши за меня - AI помощник для бытовых решений',
    description: 'Помогаем принимать решения в повседневной жизни',
    images: [
      {
        url: '/og-image.jpg', // Теперь будет https://reshizamena.ru/og-image.jpg
        width: 1200,
        height: 630,
        alt: 'Реши за меня - AI помощник',
      },
    ],
  },
  // УДАЛЕНО: viewport и themeColor - они теперь в отдельном экспорте выше
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="ru" 
      suppressHydrationWarning
      className={`${jura.variable} ${rubikMarkerHatch.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="min-h-screen bg-background">
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <ThemeProvider />
          <ThemeToggle />
        </Providers>
      </body>
    </html>
  );
}