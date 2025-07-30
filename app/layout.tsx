import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/app/providers';

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Tropicana | Аренда, экскурсии и транспорт на Пхукете',
  description: 'Tropicana - ваш надежный партнер на Пхукете. Аренда недвижимости, транспорта, организация экскурсий и туров. Лучшие предложения и качественный сервис.',
  keywords: 'Пхукет, аренда, недвижимость, транспорт, экскурсии, туры, Таиланд, Tropicana',
  authors: [{ name: 'Tropicana' }],
  creator: 'Tropicana',
  publisher: 'Tropicana',
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '1024x1024', type: 'image/png' },
      { url: '/icon.png', sizes: '1024x1024', type: 'image/png' }
    ],
    apple: [
      { url: '/favicon.png', sizes: '1024x1024', type: 'image/png' }
    ],
  },
  openGraph: {
    title: 'Tropicana | Аренда, экскурсии и транспорт на Пхукете',
    description: 'Tropicana - ваш надежный партнер на Пхукете. Аренда недвижимости, транспорта, организация экскурсий и туров.',
    url: 'https://tropicana.com',
    siteName: 'Tropicana',
    locale: 'ru_RU',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} font-sans bg-white text-dark`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 