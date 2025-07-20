import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { requireAdmin } from '@/app/lib/admin-auth';

export const dynamic = 'force-dynamic';

const QUICK_IMAGES_FILE = join(process.cwd(), 'data', 'quick-images.json');

async function readQuickImages() {
  try {
    const content = await readFile(QUICK_IMAGES_FILE, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return [];
  }
}

async function saveQuickImages(images: any[]) {
  const { mkdir } = await import('fs/promises');
  const dataDir = join(process.cwd(), 'data');
  
  try {
    await mkdir(dataDir, { recursive: true });
  } catch (error) {
    // Директория уже существует
  }
  
  await writeFile(QUICK_IMAGES_FILE, JSON.stringify(images, null, 2));
}

async function handlePUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL изображения обязателен' },
        { status: 400 }
      );
    }

    const images = await readQuickImages();
    const imageIndex = images.findIndex((img: any) => img.id === id);
    
    if (imageIndex === -1) {
      return NextResponse.json(
        { error: 'Изображение не найдено' },
        { status: 404 }
      );
    }

    // Обновляем URL изображения
    images[imageIndex].currentUrl = url;
    images[imageIndex].updatedAt = new Date().toISOString();
    
    await saveQuickImages(images);
    
    return NextResponse.json({
      success: true,
      message: 'Изображение успешно обновлено',
      image: images[imageIndex]
    });
  } catch (error) {
    console.error('Error updating quick image:', error);
    return NextResponse.json(
      { error: 'Ошибка при обновлении изображения' },
      { status: 500 }
    );
  }
}

export const PUT = requireAdmin(handlePUT); 