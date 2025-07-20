import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/app/models/User';

export async function POST(request: NextRequest) {
  try {
    const { setupKey } = await request.json();
    
    // Простая защита от массового создания админов
    if (setupKey !== 'setup-admin-2024') {
      return NextResponse.json(
        { error: 'Неверный ключ настройки' },
        { status: 403 }
      );
    }

    await connectToDatabase();

    // Проверяем, существует ли уже админ
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    
    if (existingAdmin) {
      // Обновляем пароль существующего админа
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash('rXguQLQz1124', saltRounds);
      
      await User.findByIdAndUpdate(existingAdmin._id, {
        password: hashedPassword,
        role: 'admin'
      });
      
      return NextResponse.json({
        success: true,
        message: 'Пароль админа обновлен',
        credentials: {
          email: 'admin@example.com',
          password: 'rXguQLQz1124'
        }
      });
    } else {
      // Создаем нового админа
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash('rXguQLQz1124', saltRounds);

      const admin = new User({
        name: 'Администратор',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      });

      await admin.save();
      
      return NextResponse.json({
        success: true,
        message: 'Админ успешно создан',
        credentials: {
          email: 'admin@example.com',
          password: 'rXguQLQz1124'
        }
      });
    }

  } catch (error) {
    console.error('Setup admin error:', error);
    return NextResponse.json(
      { error: 'Ошибка при создании админа: ' + (error as Error).message },
      { status: 500 }
    );
  }
}