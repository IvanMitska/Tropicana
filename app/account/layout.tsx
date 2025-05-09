import React from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyJwtToken } from '@/app/lib/jwt';
import AccountLayout from '@/app/components/layout/AccountLayout';

export default function AccountRootLayout({ children }: { children: React.ReactNode }) {
  // Проверяем токен на стороне сервера
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;
  
  if (!token) {
    redirect('/auth/login?from=/account');
  }
  
  const payload = verifyJwtToken(token);
  
  if (!payload) {
    redirect('/auth/login?from=/account');
  }
  
  // Маршрут защищен, отображаем содержимое
  return children;
} 