import { NextRequest, NextResponse } from 'next/server';
import { verifyJwtToken } from '@/app/lib/jwt';
import connectDB from '@/app/lib/mongodb';
import User from '@/app/models/User';

// Указываем, что этот маршрут должен рендериться динамически
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Получаем токен из куки
    const token = req.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { message: 'Не авторизован' },
        { status: 401 }
      );
    }

    // Проверяем токен
    const payload = await verifyJwtToken(token);
    
    if (!payload || !payload.userId) {
      return NextResponse.json(
        { message: 'Неверный токен' },
        { status: 401 }
      );
    }

    // Подключаемся к БД
    await connectDB();

    // Получаем пользователя из БД
    const user = await User.findById(payload.userId).select('-password');
    
    if (!user) {
      return NextResponse.json(
        { message: 'Пользователь не найден' },
        { status: 404 }
      );
    }

    // Возвращаем данные пользователя
    return NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error);
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 