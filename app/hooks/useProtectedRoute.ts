'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from './useAuth';

interface UseProtectedRouteOptions {
  redirectTo?: string;
  adminOnly?: boolean;
}

export const useProtectedRoute = (options: UseProtectedRouteOptions = {}) => {
  const { redirectTo = '/login', adminOnly = false } = options;
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Пропускаем редирект во время загрузки
    if (isLoading) return;

    if (!isAuthenticated) {
      // Перенаправляем на страницу логина с указанием страницы возврата
      router.push(`${redirectTo}?from=${encodeURIComponent(pathname)}`);
      return;
    }

    // Проверка прав администратора, если требуется
    if (adminOnly && user?.role !== 'admin') {
      router.push('/access-denied');
    }
  }, [isAuthenticated, isLoading, user, router, pathname, redirectTo, adminOnly]);

  return { isAuthenticated, isLoading, user };
}; 