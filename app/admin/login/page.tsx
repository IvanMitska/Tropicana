'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import Link from 'next/link';
import { User, Lock, ArrowLeft, Shield } from 'lucide-react';

interface LoginForm {
  email: string;
  password: string;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError('');

    try {
      console.log('Starting login with:', data);
      
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        const result = await response.json();
        console.log('Login successful:', result);
        
        // Используем тот же подход что работает в других версиях
        window.location.href = '/admin/dashboard';
      } else {
        const result = await response.json();
        console.log('Login failed:', result);
        setError(result.error || 'Ошибка авторизации');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Ошибка сети');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      {/* Кнопка назад */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors duration-300">
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">На главную</span>
        </Link>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Карточка входа */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-primary/10">
            {/* Логотип и заголовок */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-lg mb-4">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Админ панель
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Phuket Dream - Управление контентом
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm animate-shake">
                  {error}
                </div>
              )}
              
              <div className="space-y-5">
                {/* Email поле */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="admin@phuketdream.com"
                      {...register('email', {
                        required: 'Email обязателен',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Некорректный email'
                        }
                      })}
                      className={`pl-10 ${errors.email ? 'border-red-300 focus:ring-red-500' : 'focus:ring-primary'}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Password поле */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Пароль
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      {...register('password', {
                        required: 'Пароль обязателен',
                        minLength: {
                          value: 6,
                          message: 'Пароль должен содержать минимум 6 символов'
                        }
                      })}
                      className={`pl-10 ${errors.password ? 'border-red-300 focus:ring-red-500' : 'focus:ring-primary'}`}
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>
              </div>

              {/* Кнопка входа */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Входим...
                  </span>
                ) : (
                  'Войти в систему'
                )}
              </Button>
            </form>

            {/* Дополнительная информация */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Защищенный вход для администраторов
              </p>
            </div>
          </div>

          {/* Нижний текст */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Phuket Dream. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}