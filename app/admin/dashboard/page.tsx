'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Stats {
  vehicles: number;
  realEstate: number;
  tours: number;
  totalBookings: number;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>({ email: 'admin@admin.com' }); // Временно захардкодим
  const [stats, setStats] = useState<Stats>({
    vehicles: 0,
    realEstate: 0,
    tours: 0,
    totalBookings: 0
  });
  const [isLoading, setIsLoading] = useState(false); // Изменили на false

  useEffect(() => {
    // Сразу загружаем статистику без проверки авторизации
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Временно устанавливаем фиктивные данные
      setStats({
        vehicles: 15,
        realEstate: 8,
        tours: 12,
        totalBookings: 45
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-white to-light/50">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Phuket Dream - Панель администратора
              </h1>
              <p className="text-white/90">Добро пожаловать, {user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-red-500/20 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm overflow-hidden shadow-lg rounded-xl border border-primary/10">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-light rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg">🚗</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-600 truncate">
                      Транспорт
                    </dt>
                    <dd className="text-2xl font-bold text-dark">
                      {stats.vehicles}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm overflow-hidden shadow-lg rounded-xl border border-secondary/10">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary to-secondary-light rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg">🏠</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-600 truncate">
                      Недвижимость
                    </dt>
                    <dd className="text-2xl font-bold text-dark">
                      {stats.realEstate}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm overflow-hidden shadow-lg rounded-xl border border-primary/10">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg">🗺️</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-600 truncate">
                      Экскурсии
                    </dt>
                    <dd className="text-2xl font-bold text-dark">
                      {stats.tours}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm overflow-hidden shadow-lg rounded-xl border border-secondary/10">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary to-primary rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg">📊</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-600 truncate">
                      Бронирования
                    </dt>
                    <dd className="text-2xl font-bold text-dark">
                      {stats.totalBookings}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/vehicles" className="block group">
            <div className="bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl rounded-xl p-6 border border-primary/10 hover:border-primary/30 hover:scale-105">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-2xl">🚗</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors duration-300">
                    Управление транспортом
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Добавление, редактирование и удаление транспортных средств
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/admin/real-estate" className="block group">
            <div className="bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl rounded-xl p-6 border border-secondary/10 hover:border-secondary/30 hover:scale-105">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary to-secondary-light rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-2xl">🏠</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-dark group-hover:text-secondary transition-colors duration-300">
                    Управление недвижимостью
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Добавление, редактирование и удаление объектов недвижимости
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/admin/tours" className="block group">
            <div className="bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl rounded-xl p-6 border border-secondary/10 hover:border-secondary/30 hover:scale-105">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-2xl">🗺️</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-dark group-hover:text-secondary transition-colors duration-300">
                    Управление экскурсиями
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Добавление, редактирование и удаление экскурсий
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Additional Admin Tools */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-dark mb-4">Дополнительные инструменты</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/media" className="block group">
              <div className="bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 overflow-hidden shadow-md hover:shadow-lg rounded-lg p-4 border border-gray-200 hover:border-primary/30">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">📷</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-md font-semibold text-dark">
                      Управление изображениями
                    </h3>
                    <p className="text-gray-600 text-xs mt-1">
                      Загрузка и удаление изображений
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/admin/site-content" className="block group">
              <div className="bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 overflow-hidden shadow-md hover:shadow-lg rounded-lg p-4 border border-gray-200 hover:border-secondary/30">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary to-primary rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🎨</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-md font-semibold text-dark">
                      Контент сайта
                    </h3>
                    <p className="text-gray-600 text-xs mt-1">
                      Тексты и логотип
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/admin/quick-images" className="block group">
              <div className="bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 overflow-hidden shadow-md hover:shadow-lg rounded-lg p-4 border border-gray-200 hover:border-primary/30">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">⚡</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-md font-semibold text-dark">
                      Быстрая замена фото
                    </h3>
                    <p className="text-gray-600 text-xs mt-1">
                      Замена основных изображений
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}