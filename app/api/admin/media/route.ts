import { NextRequest, NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { requireAdmin } from '@/app/lib/admin-auth';

async function handleGET(request: NextRequest) {
  try {
    const uploadDir = join(process.cwd(), 'public/uploads');
    
    // Проверяем существует ли папка uploads
    let files: string[] = [];
    try {
      files = await readdir(uploadDir);
    } catch (error) {
      // Папка не существует, возвращаем пустой список
      return NextResponse.json({ files: [] });
    }

    // Получаем информацию о каждом файле
    const mediaFiles = await Promise.all(
      files
        .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
        .map(async (file) => {
          const filePath = join(uploadDir, file);
          const stats = await stat(filePath);
          
          return {
            url: `/uploads/${file}`,
            filename: file,
            size: stats.size,
            uploadDate: stats.birthtime.toISOString(),
            usedIn: [] // TODO: Реализовать отслеживание использования
          };
        })
    );

    // Сортируем по дате загрузки (новые первыми)
    mediaFiles.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());

    return NextResponse.json({ files: mediaFiles });
  } catch (error) {
    console.error('Error fetching media files:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении файлов' },
      { status: 500 }
    );
  }
}

export const GET = requireAdmin(handleGET); 