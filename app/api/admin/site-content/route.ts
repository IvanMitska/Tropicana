import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { requireAdmin } from '@/app/lib/admin-auth';

export const dynamic = 'force-dynamic';

const CONTENT_FILE = join(process.cwd(), 'data', 'site-content.json');

const defaultContent = {
  heroImages: [
    '/images/hero-bg-1.jpg',
    '/images/hero-bg-2.jpg',
    '/images/hero-bg-3.jpg',
    '/images/hero-bg-4.jpg'
  ],
  heroTitle: 'Лучшие предложения аренды',
  heroSubtitle: 'Найдите идеальный транспорт, жилье или экскурсию',
  logoUrl: '/images/logo.png',
  aboutImages: [
    '/images/apartment1.jpg',
    '/images/car1.jpg',
    '/images/excursion1.jpg'
  ],
  servicesImages: [
    '/images/transport/hero-bg-car.jpg',
    '/images/real-estate.jpg',
    '/images/history.jpg'
  ],
  testimonialImages: [
    '/images/user-1.jpg',
    '/images/user-2.jpg',
    '/images/transport/avatar1.jpg',
    '/images/transport/avatar2.jpg'
  ]
};

async function ensureDataDirectory() {
  const { mkdir } = await import('fs/promises');
  const dataDir = join(process.cwd(), 'data');
  try {
    await mkdir(dataDir, { recursive: true });
  } catch (error) {
    // Директория уже существует
  }
}

async function readSiteContent() {
  try {
    const content = await readFile(CONTENT_FILE, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    // Файл не существует, возвращаем дефолтный контент
    return defaultContent;
  }
}

async function saveSiteContent(content: any) {
  await ensureDataDirectory();
  await writeFile(CONTENT_FILE, JSON.stringify(content, null, 2));
}

async function handleGET(request: NextRequest) {
  try {
    const content = await readSiteContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error reading site content:', error);
    return NextResponse.json(
      { error: 'Ошибка при чтении контента' },
      { status: 500 }
    );
  }
}

async function handlePUT(request: NextRequest) {
  try {
    const content = await request.json();
    
    // Валидация данных
    if (!content || typeof content !== 'object') {
      return NextResponse.json(
        { error: 'Некорректные данные' },
        { status: 400 }
      );
    }

    await saveSiteContent(content);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Контент успешно сохранен' 
    });
  } catch (error) {
    console.error('Error saving site content:', error);
    return NextResponse.json(
      { error: 'Ошибка при сохранении контента' },
      { status: 500 }
    );
  }
}

export const GET = requireAdmin(handleGET);
export const PUT = requireAdmin(handlePUT); 