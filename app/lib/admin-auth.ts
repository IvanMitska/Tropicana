import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/app/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AdminUser {
  userId: string;
  email: string;
  role: string;
}

export async function verifyAdminToken(request: NextRequest): Promise<AdminUser | null> {
  try {
    // Получаем токен из cookie
    const token = request.cookies.get('admin-token')?.value;
    
    if (!token) {
      return null;
    }

    // Верифицируем токен
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    if (!decoded || decoded.role !== 'admin') {
      return null;
    }

    // Дополнительная проверка в базе данных
    await connectToDatabase();
    const user = await User.findById(decoded.userId);
    
    if (!user || user.role !== 'admin') {
      return null;
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };
    
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

export function requireAdmin(handler: Function) {
  return async (request: NextRequest, ...args: any[]) => {
    const adminUser = await verifyAdminToken(request);
    
    if (!adminUser) {
      return new Response(
        JSON.stringify({ error: 'Требуется авторизация администратора' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Добавляем пользователя в контекст запроса
    (request as any).adminUser = adminUser;
    
    return handler(request, ...args);
  };
}