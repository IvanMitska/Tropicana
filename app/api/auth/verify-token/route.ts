import { NextRequest, NextResponse } from 'next/server';
import { getAuthTokenFromRequest, verifyJwtToken } from '@/app/lib/jwt';
import { getUserById, sanitizeUser } from '@/app/models/User';

export async function GET(req: NextRequest) {
  try {
    // Получаем токен из cookies
    const token = getAuthTokenFromRequest(req);
    
    if (!token) {
      return NextResponse.json({ 
        success: false, 
        message: 'Токен аутентификации не найден' 
      }, { status: 401 });
    }
    
    // Проверяем токен
    const payload = verifyJwtToken(token);
    
    if (!payload) {
      return NextResponse.json({ 
        success: false, 
        message: 'Недействительный токен' 
      }, { status: 401 });
    }
    
    // Получаем пользователя из базы данных
    const user = await getUserById(payload.userId);
    
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: 'Пользователь не найден' 
      }, { status: 404 });
    }
    
    // Проверяем активен ли пользователь
    if (user.status !== 'active') {
      return NextResponse.json({ 
        success: false, 
        message: 'Учетная запись неактивна' 
      }, { status: 403 });
    }
    
    // Возвращаем данные пользователя без чувствительной информации
    const safeUser = sanitizeUser(user);
    
    return NextResponse.json({ 
      success: true, 
      user: safeUser 
    });
  } catch (error) {
    console.error('[VERIFY_TOKEN_ERROR]', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Ошибка при проверке токена' 
    }, { status: 500 });
  }
} 