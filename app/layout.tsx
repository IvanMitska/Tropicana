import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/app/providers';

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Phuket Dream | Аренда, экскурсии и транспорт на Пхукете',
  description: 'Phuket Dream - ваш надежный партнер на Пхукете. Аренда недвижимости, транспорта, организация экскурсий и туров. Лучшие предложения и качественный сервис.',
  keywords: 'Пхукет, аренда, недвижимость, транспорт, экскурсии, туры, Таиланд, Phuket Dream',
  authors: [{ name: 'Phuket Dream' }],
  creator: 'Phuket Dream',
  publisher: 'Phuket Dream',
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
    title: 'Phuket Dream | Аренда, экскурсии и транспорт на Пхукете',
    description: 'Phuket Dream - ваш надежный партнер на Пхукете. Аренда недвижимости, транспорта, организация экскурсий и туров.',
    url: 'https://phuketdream.com',
    siteName: 'Phuket Dream',
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