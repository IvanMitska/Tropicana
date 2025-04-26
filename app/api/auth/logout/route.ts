import { NextResponse } from 'next/server';
import { removeAuthCookie } from '@/app/lib/jwt';

export async function POST() {
  const response = NextResponse.json({ 
    success: true, 
    message: 'Вы успешно вышли из системы' 
  });
  
  // Удаляем куки с токеном
  removeAuthCookie(response);
  
  return response;
} 