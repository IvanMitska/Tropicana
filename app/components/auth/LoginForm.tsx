'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button, Input } from '@components/ui';
import { useAuth } from '@/app/hooks/useAuth';

interface LoginFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  onRegisterClick?: () => void;
  onForgotPasswordClick?: () => void;
  isModal?: boolean;
  redirectTo?: string;
}

export default function LoginForm({
  onSuccess,
  onCancel,
  onRegisterClick,
  onForgotPasswordClick,
  isModal = false,
  redirectTo = '/'
}: LoginFormProps) {
  const router = useRouter();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Проверка валидности формы
  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Пожалуйста, введите корректный email');
      return false;
    }
    if (password.length < 6) {
      setError('Пароль должен содержать не менее 6 символов');
      return false;
    }
    return true;
  };
  
  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!isFormValid()) return;
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(redirectTo);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Неверный email или пароль');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Вход в аккаунт</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            autoComplete="email"
            required
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Пароль
            </label>
            {onForgotPasswordClick ? (
              <button
                type="button"
                onClick={onForgotPasswordClick}
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                Забыли пароль?
              </button>
            ) : (
              <Link href="/reset-password" className="text-sm text-blue-600 hover:underline font-medium">
                Забыли пароль?
              </Link>
            )}
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              autoComplete="current-password"
              required
              className="w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Запомнить меня
            </label>
          </div>
        </div>
        
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="mr-2 animate-spin" />
              Вход...
            </>
          ) : (
            'Войти'
          )}
        </Button>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Нет аккаунта?{' '}
            {onRegisterClick ? (
              <button
                type="button"
                onClick={onRegisterClick}
                className="text-blue-600 hover:underline font-medium"
              >
                Регистрация
              </button>
            ) : (
              <Link href="/register" className="text-blue-600 hover:underline font-medium">
                Регистрация
              </Link>
            )}
          </p>
        </div>
        
        {isModal && onCancel && (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="w-full mt-2"
          >
            Отмена
          </Button>
        )}
      </form>
    </div>
  );
} 