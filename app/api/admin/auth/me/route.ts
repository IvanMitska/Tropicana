import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    // Получаем токен из cookie
    const token = request.cookies.get('admin-token')?.value;
    console.log('Admin token check:', !!token);
    console.log('All cookies:', Object.fromEntries(request.cookies.getAll().map(c => [c.name, c.value])));
    
    if (!token) {
      return NextResponse.json(
        { error: 'Не авторизован' },
        { status: 401 }
      );
    }

    // Верифицируем токен
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    console.log('Token decoded:', { userId: decoded.userId, email: decoded.email, role: decoded.role });
    
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Недействительный токен' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role
      }
    });
    
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Ошибка проверки авторизации' },
      { status: 500 }
    );
  }
}