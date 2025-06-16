import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/app/providers';

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Пхукет | Аренда, экскурсии и транспорт',
  description: 'Платформа для аренды недвижимости, транспорта и экскурсий на Пхукете',
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