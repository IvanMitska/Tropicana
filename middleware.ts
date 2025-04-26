import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthTokenFromRequest, verifyJwtToken } from './app/lib/jwt';

// Пути, для которых middleware будет применяться
export const config = {
  matcher: [
    // Защищенные API-маршруты
    '/api/protected/:path*',
    // Защищенные страницы (личный кабинет, настройки и т.д.)
    '/profile/:path*',
    '/dashboard/:path*',
    '/admin/:path*',
  ],
};

export function middleware(request: NextRequest) {
  const token = getAuthTokenFromRequest(request);
  
  // Проверка наличия токена
  if (!token) {
    if (request.nextUrl.pathname.startsWith('/api/')) {
      // Для API-маршрутов возвращаем JSON с ошибкой
      return NextResponse.json(
        { success: false, message: 'Требуется авторизация' },
        { status: 401 }
      );
    }
    
    // Для страниц перенаправляем на страницу входа с указанием страницы возврата
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
  
  // Проверка валидности токена
  const payload = verifyJwtToken(token);
  
  if (!payload) {
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json(
        { success: false, message: 'Недействительный токен' },
        { status: 401 }
      );
    }
    
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
  
  // Дополнительная проверка прав для административных маршрутов
  if (request.nextUrl.pathname.startsWith('/admin') && payload.role !== 'admin') {
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json(
        { success: false, message: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
    // Перенаправляем на страницу с сообщением о недостаточных правах
    return NextResponse.redirect(new URL('/access-denied', request.url));
  }
  
  // Все проверки пройдены, разрешаем доступ
  return NextResponse.next();
} 