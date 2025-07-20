'use client';

import { useState } from 'react';

export default function QuickAdminSetup() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const createAdmin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ setupKey: 'setup-admin-2024' }),
      });
      
      const data = await response.json();
      setResult(data);
      setStep(3);
    } catch (error) {
      console.error(error);
      setStep(2);
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">🔧</div>
            <h1 className="text-2xl font-bold mb-4">Быстрая настройка</h1>
            <p className="text-gray-600 mb-6">
              Создайте администратора для управления сайтом
            </p>
            <button
              onClick={createAdmin}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Создаем...' : 'Создать администратора'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold mb-4">Ошибка подключения</h1>
            <p className="text-gray-600 mb-6">
              Не удается подключиться к базе данных. Нужно настроить MongoDB.
            </p>
            <div className="text-left space-y-3 text-sm">
              <p><strong>Решения:</strong></p>
              <p>1. Установить MongoDB локально</p>
              <p>2. Создать бесплатную базу на MongoDB Atlas</p>
              <p>3. Обновить MONGODB_URI в .env файле</p>
            </div>
            <button
              onClick={() => setStep(1)}
              className="mt-6 w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold mb-4">Готово!</h1>
          {result && (
            <div className="bg-green-50 p-4 rounded-lg mb-6 text-left">
              <p className="font-medium">{result.message}</p>
              <div className="mt-2 text-sm space-y-1">
                <p><strong>Email:</strong> {result.credentials?.email}</p>
                <p><strong>Пароль:</strong> {result.credentials?.password}</p>
              </div>
            </div>
          )}
          <a
            href="/admin/login"
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors inline-block"
          >
            Войти в админ-панель
          </a>
        </div>
      </div>
    </div>
  );
}