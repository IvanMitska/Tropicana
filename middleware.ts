import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthTokenFromRequest, verifyJwtToken } from './app/lib/jwt';
import jwt from 'jsonwebtoken';

// Пути, для которых middleware будет применяться
export const config = {
  matcher: [
    // Защищенные API-маршруты
    '/api/protected/:path*',
    // Защищенные страницы (личный кабинет, настройки и т.д.)
    '/profile/:path*',
    '/dashboard/:path*',
    '/account/:path*',
    '/bookings/:path*',
    '/favorites/:path*',
    '/documents/:path*',
    '/payments/:path*',
    '/reviews/:path*',
    '/security/:path*',
    '/admin/:path*',
  ],
};

export function middleware(request: NextRequest) {
  // Исключаем страницы логина админа из проверки
  if (request.nextUrl.pathname === '/admin/login' || 
      request.nextUrl.pathname === '/admin/setup' ||
      request.nextUrl.pathname === '/admin/direct-login' ||
      request.nextUrl.pathname === '/admin/test-auth' ||
      request.nextUrl.pathname === '/admin/working-dashboard' ||
      request.nextUrl.pathname === '/admin/login-v2' ||
      request.nextUrl.pathname === '/quick-admin-setup') {
    return NextResponse.next();
  }
  
  // Для админ маршрутов временно отключаем проверку
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }
  
  // Для обычных пользовательских маршрутов
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
    const redirectUrl = new URL('/auth/login', request.url);
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
    
    const redirectUrl = new URL('/auth/login', request.url);
    redirectUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
  
  // Все проверки пройдены, разрешаем доступ
  return NextResponse.next();
} 