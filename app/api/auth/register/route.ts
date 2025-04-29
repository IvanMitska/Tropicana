import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/app/lib/mongodb';
import User from '@/app/models/User';
import { signJwtToken } from '@/app/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Проверка наличия всех полей
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Все поля обязательны для заполнения' },
        { status: 400 }
      );
    }

    // Подключение к БД
    await connectDB();

    // Проверка, существует ли пользователь с таким email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Пользователь с таким email уже существует' },
        { status: 409 }
      );
    }

    // Хэширование пароля
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Создание нового пользователя
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user', // По умолчанию обычный пользователь
    });

    // Сохранение пользователя в БД
    await newUser.save();

    // Создание JWT токена
    const token = await signJwtToken({ userId: newUser._id.toString() });

    // Настройка ответа
    const response = NextResponse.json({
      message: 'Регистрация успешна',
      user: {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      }
    });

    // Устанавливаем безопасную куки с токеном
    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 дней
    });

    return response;
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 