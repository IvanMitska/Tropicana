'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/Button';

export default function AdminSetupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const setupAdmin = async () => {
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ setupKey: 'setup-admin-2024' }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Ошибка при создании админа');
      }
    } catch (error) {
      setError('Ошибка сети');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Настройка администратора
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Создание учетной записи администратора
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {result && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              <h3 className="font-medium">{result.message}</h3>
              <div className="mt-2 text-sm">
                <p><strong>Email:</strong> {result.credentials.email}</p>
                <p><strong>Пароль:</strong> {result.credentials.password}</p>
              </div>
              <div className="mt-4">
                <a
                  href="/admin/login"
                  className="text-green-600 hover:text-green-800 underline"
                >
                  Перейти к входу →
                </a>
              </div>
            </div>
          )}

          <div>
            <Button
              onClick={setupAdmin}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Создаем админа...' : 'Создать администратора'}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Эта страница создает учетную запись администратора для управления сайтом
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}