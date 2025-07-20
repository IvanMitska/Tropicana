import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { requireAdmin } from '@/app/lib/admin-auth';

async function handlePOST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'Файлы не найдены' },
        { status: 400 }
      );
    }

    const uploadedFiles: string[] = [];
    const uploadDir = join(process.cwd(), 'public/uploads');
    
    // Создаем директорию если не существует
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Директория уже существует
    }

    for (const file of files) {
      if (file.size === 0) continue;
      
      // Проверяем тип файла
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: `Неподдерживаемый тип файла: ${file.type}` },
          { status: 400 }
        );
      }

      // Проверяем размер файла (максимум 10MB)
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'Файл слишком большой (максимум 10MB)' },
          { status: 400 }
        );
      }

      // Генерируем уникальное имя файла
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2);
      const extension = file.name.split('.').pop();
      const filename = `${timestamp}-${randomString}.${extension}`;
      
      // Сохраняем файл
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = join(uploadDir, filename);
      
      await writeFile(filePath, buffer);
      
      // Добавляем относительный путь к файлу
      uploadedFiles.push(`/uploads/${filename}`);
    }

    return NextResponse.json({
      success: true,
      files: uploadedFiles
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Ошибка при загрузке файлов' },
      { status: 500 }
    );
  }
}

export const POST = requireAdmin(handlePOST);