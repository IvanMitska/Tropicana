'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';

interface ResetPasswordFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  onLoginClick?: () => void;
  isModal?: boolean;
}

export default function ResetPasswordForm({
  onSuccess,
  onCancel,
  onLoginClick,
  isModal = false
}: ResetPasswordFormProps) {
  const router = useRouter();
  const { resetPassword } = useAuth();
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Проверка валидности формы
  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Пожалуйста, введите корректный email');
      return false;
    }
    return true;
  };
  
  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (!isFormValid()) return;
    
    setIsLoading(true);
    
    try {
      await resetPassword(email);
      setSuccess('Инструкции по сбросу пароля отправлены на ваш email');
      
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 3000);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Произошла ошибка при отправке запроса. Попробуйте позже.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Сброс пароля</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">
            {success}
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
        
        <p className="text-sm text-gray-500">
          Мы отправим вам ссылку для сброса пароля на указанный email.
        </p>
        
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="mr-2 animate-spin" />
              Отправка...
            </>
          ) : (
            'Сбросить пароль'
          )}
        </Button>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Вспомнили пароль?{' '}
            {onLoginClick ? (
              <button
                type="button"
                onClick={onLoginClick}
                className="text-blue-600 hover:underline font-medium"
              >
                Войти
              </button>
            ) : (
              <Link href="/login" className="text-blue-600 hover:underline font-medium">
                Войти
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