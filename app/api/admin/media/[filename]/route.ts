import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { requireAdmin } from '@/app/lib/admin-auth';

export const dynamic = 'force-dynamic';

async function handleDELETE(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const { filename } = params;
    
    // Проверяем что filename содержит только разрешенные символы
    if (!/^[a-zA-Z0-9._-]+$/.test(filename)) {
      return NextResponse.json(
        { error: 'Некорректное имя файла' },
        { status: 400 }
      );
    }

    const filePath = join(process.cwd(), 'public/uploads', filename);
    
    try {
      await unlink(filePath);
      return NextResponse.json({ 
        success: true, 
        message: 'Файл успешно удален' 
      });
    } catch (error) {
      if ((error as any).code === 'ENOENT') {
        return NextResponse.json(
          { error: 'Файл не найден' },
          { status: 404 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { error: 'Ошибка при удалении файла' },
      { status: 500 }
    );
  }
}

export const DELETE = requireAdmin(handleDELETE); 