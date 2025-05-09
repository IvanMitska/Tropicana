'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '../components/layout/MainLayout';
import Link from 'next/link';

export default function ExcursionsPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/tours');
  }, [router]);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-20 text-center">
        <p className="mb-4">Перенаправление на страницу экскурсий...</p>
        <div className="animate-pulse">Загрузка...</div>
        <p className="mt-4">
          Если вы не были автоматически перенаправлены, пожалуйста, 
          <Link href="/tours" className="text-blue-500 hover:underline ml-1">
            нажмите здесь
          </Link>
        </p>
      </div>
    </MainLayout>
  );
} 