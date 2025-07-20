import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/app/models/User';

export const dynamic = 'force-dynamic';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    console.log('Admin login attempt started...');
    
    const { email, password } = await request.json();
    console.log('Login attempt for email:', email);

    // Валидация
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email и пароль обязательны' },
        { status: 400 }
      );
    }

    // Временная захардкоженная авторизация
    const ADMIN_EMAIL = 'admin@admin.com';
    const ADMIN_PASSWORD = 'rXguQLQz12345';

    if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase() || password !== ADMIN_PASSWORD) {
      console.log('Invalid credentials for admin login');
      return NextResponse.json(
        { error: 'Неверные учетные данные' },
        { status: 401 }
      );
    }

    console.log('Admin credentials validated successfully');

    // Создание JWT токена
    const token = jwt.sign(
      { 
        userId: 'admin',
        email: ADMIN_EMAIL,
        role: 'admin' 
      },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    // Создание response с cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: 'admin',
        name: 'Администратор',
        email: ADMIN_EMAIL,
        role: 'admin'
      }
    });

    // Установка cookie с правильными настройками
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 8 * 60 * 60 // 8 часов
    });

    console.log('Admin login successful, cookie set');
    console.log('JWT_SECRET exists:', !!JWT_SECRET);
    console.log('Token generated:', token.substring(0, 50) + '...');
    return response;
    
  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const response = NextResponse.json({ success: true });
    
    // Удаление cookie
    response.cookies.delete('admin-token');
    
    return response;
  } catch (error) {
    console.error('Admin logout error:', error);
    return NextResponse.json(
      { error: 'Ошибка при выходе' },
      { status: 500 }
    );
  }
}