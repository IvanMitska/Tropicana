'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { SafeUser } from '../models/User';

// Типы для контекста авторизации
interface AuthContextType {
  user: SafeUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; message?: string }>;
  setNewPassword: (token: string, password: string) => Promise<{ success: boolean; message?: string }>;
}

// Тип для данных регистрации
interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

// Создаем контекст с дефолтными значениями
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: async () => {},
  resetPassword: async () => ({ success: false }),
  setNewPassword: async () => ({ success: false }),
});

// Провайдер контекста авторизации
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Проверка авторизации при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify-token');
        const data = await response.json();

        if (data.success && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Ошибка проверки аутентификации:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Функция для авторизации
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.user) {
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Неверный email или пароль' };
      }
    } catch (error) {
      console.error('Ошибка аутентификации:', error);
      return { success: false, message: 'Произошла ошибка при входе' };
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для регистрации
  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success && data.user) {
        setUser(data.user);
        return { success: true };
      } else {
        return { 
          success: false, 
          message: data.message || 'Ошибка при регистрации' 
        };
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      return { success: false, message: 'Произошла ошибка при регистрации' };
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для выхода
  const logout = async () => {
    try {
      setIsLoading(true);
      await fetch('/api/auth/logout', {
        method: 'POST',
      });

      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для запроса сброса пароля
  const resetPassword = async (email: string) => {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      return { 
        success: data.success, 
        message: data.message 
      };
    } catch (error) {
      console.error('Ошибка при запросе сброса пароля:', error);
      return { 
        success: false, 
        message: 'Произошла ошибка при запросе сброса пароля' 
      };
    }
  };

  // Функция для установки нового пароля
  const setNewPassword = async (token: string, password: string) => {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();
      return { 
        success: data.success, 
        message: data.message 
      };
    } catch (error) {
      console.error('Ошибка при установке нового пароля:', error);
      return { 
        success: false, 
        message: 'Произошла ошибка при установке нового пароля' 
      };
    }
  };

  // Передаем контекст
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        resetPassword,
        setNewPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 