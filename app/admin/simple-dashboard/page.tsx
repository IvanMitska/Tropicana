'use client';

import { useEffect, useState } from 'react';

export default function SimpleDashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      console.log('Checking auth...');
      const response = await fetch('/api/admin/auth/me');
      console.log('Auth response:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Auth data:', data);
        setUser(data.user);
      } else {
        const errorData = await response.json();
        console.log('Auth error:', errorData);
        setError(errorData.error || 'Не авторизован');
        // Перенаправляем на логин
        window.location.href = '/admin/login';
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setError('Ошибка проверки авторизации');
      window.location.href = '/admin/login';
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Ошибка</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.href = '/admin/login'}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Перейти к входу
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Проверка авторизации...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Простая админ панель
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
            >
              Выйти
            </button>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-green-800 mb-2">
              ✅ Авторизация успешна!
            </h2>
            <p className="text-green-700">
              Добро пожаловать, {user.email}
            </p>
            <p className="text-sm text-green-600 mt-1">
              Роль: {user.role}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Информация о пользователе
              </h3>
              <pre className="text-sm text-blue-700 bg-blue-100 p-2 rounded">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Статус
              </h3>
              <p className="text-green-600 font-medium">🟢 Подключен к системе</p>
              <p className="text-sm text-gray-600 mt-1">
                Cookie установлен и работает
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}