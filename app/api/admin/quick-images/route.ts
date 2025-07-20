import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { requireAdmin } from '@/app/lib/admin-auth';

const QUICK_IMAGES_FILE = join(process.cwd(), 'data', 'quick-images.json');

const defaultQuickImages = [
  {
    id: 'hero-bg-1',
    title: 'Главный фон 1',
    currentUrl: '/images/hero-bg-1.jpg',
    description: 'Основное фоновое изображение в главной секции',
    category: 'hero'
  },
  {
    id: 'hero-bg-2',
    title: 'Главный фон 2',
    currentUrl: '/images/hero-bg-2.jpg',
    description: 'Дополнительное фоновое изображение в главной секции',
    category: 'hero'
  },
  {
    id: 'hero-bg-3',
    title: 'Главный фон 3',
    currentUrl: '/images/hero-bg-3.jpg',
    description: 'Фоновое изображение в главной секции',
    category: 'hero'
  },
  {
    id: 'logo-header',
    title: 'Логотип в шапке',
    currentUrl: '/images/logo.png',
    description: 'Логотип, отображаемый в шапке сайта',
    category: 'other'
  },
  {
    id: 'transport-hero',
    title: 'Транспорт - главное фото',
    currentUrl: '/images/transport/hero-bg-car.jpg',
    description: 'Главное изображение на странице транспорта',
    category: 'services'
  },
  {
    id: 'real-estate-hero',
    title: 'Недвижимость - главное фото',
    currentUrl: '/images/real-estate.jpg',
    description: 'Главное изображение на странице недвижимости',
    category: 'services'
  },
  {
    id: 'tours-hero',
    title: 'Экскурсии - главное фото',
    currentUrl: '/images/history.jpg',
    description: 'Главное изображение на странице экскурсий',
    category: 'services'
  },
  {
    id: 'about-image-1',
    title: 'О нас - изображение 1',
    currentUrl: '/images/apartment1.jpg',
    description: 'Изображение в секции "О нас"',
    category: 'about'
  },
  {
    id: 'about-image-2',
    title: 'О нас - изображение 2',
    currentUrl: '/images/car1.jpg',
    description: 'Изображение в секции "О нас"',
    category: 'about'
  },
  {
    id: 'testimonial-1',
    title: 'Отзыв - клиент 1',
    currentUrl: '/images/user-1.jpg',
    description: 'Фотография клиента для отзыва',
    category: 'about'
  },
  {
    id: 'testimonial-2',
    title: 'Отзыв - клиент 2',
    currentUrl: '/images/user-2.jpg',
    description: 'Фотография клиента для отзыва',
    category: 'about'
  },
  {
    id: 'gallery-1',
    title: 'Галерея - фото 1',
    currentUrl: '/images/property-1-1.jpg',
    description: 'Изображение в галерее',
    category: 'gallery'
  },
  {
    id: 'gallery-2',
    title: 'Галерея - фото 2',
    currentUrl: '/images/property-1-2.jpg',
    description: 'Изображение в галерее',
    category: 'gallery'
  }
];

async function ensureDataDirectory() {
  const { mkdir } = await import('fs/promises');
  const dataDir = join(process.cwd(), 'data');
  try {
    await mkdir(dataDir, { recursive: true });
  } catch (error) {
    // Директория уже существует
  }
}

async function readQuickImages() {
  try {
    const content = await readFile(QUICK_IMAGES_FILE, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    // Файл не существует, возвращаем дефолтные изображения
    return defaultQuickImages;
  }
}

async function saveQuickImages(images: any[]) {
  await ensureDataDirectory();
  await writeFile(QUICK_IMAGES_FILE, JSON.stringify(images, null, 2));
}

async function handleGET(request: NextRequest) {
  try {
    const images = await readQuickImages();
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading quick images:', error);
    return NextResponse.json(
      { error: 'Ошибка при чтении изображений' },
      { status: 500 }
    );
  }
}

export const GET = requireAdmin(handleGET); 