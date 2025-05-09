'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import MainLayout from '../components/layout/MainLayout';

export default function ToursPage() {
  // Проверка режима разработки/демо
  const [isDemoMode] = useState(true);
  
  // Используем динамический импорт только если не в режиме демо
  const TourMap = useMemo(() => {
    if (!isDemoMode) {
      return dynamic(
        () => import('../components/tours/TourMap'),
        { 
          loading: () => <div className="h-full w-full flex items-center justify-center">Загрузка карты...</div>,
          ssr: false 
        }
      );
    }
    return null;
  }, [isDemoMode]);

  return (
    <MainLayout>
      {isDemoMode ? (
        // Режим разработки - показываем заглушку
        <main className="min-h-screen bg-light py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">Экскурсии на Пхукете</h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Увлекательные экскурсии по Пхукету и соседним островам с русскоговорящими гидами
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8 mb-16">
              <div className="text-center p-12">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 mx-auto text-primary mb-6 opacity-50">
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <h2 className="text-2xl font-medium text-dark mb-4">Раздел в разработке</h2>
                <p className="text-gray-600 mb-8">
                  Мы сейчас активно работаем над наполнением этого раздела. Скоро здесь появится полный каталог интересных экскурсий по Пхукету и окрестностям.
                </p>
                <a href="/" className="inline-block bg-primary text-white py-3 px-8 rounded-full font-medium text-lg shadow-md hover:bg-primary-dark transition-colors duration-300">
                  Вернуться на главную
                </a>
              </div>
            </div>
          </div>
        </main>
      ) : (
        // Основной контент с новыми стилями
        <div className="bg-light py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-dark text-center mb-8">Экскурсии на Пхукете</h1>
            
            {/* Здесь будет размещен TourCategories компонент с категориями */}
            <div className="mb-8 bg-white rounded-xl shadow-md p-6">
              {/* Заглушка для категорий */}
              <div className="flex overflow-x-auto gap-4 pb-2">
                {['Морские экскурсии', 'Культурные места', 'Активный отдых', 'Природные красоты', 'Гастрономические туры'].map((cat, index) => (
                  <div 
                    key={index} 
                    className="px-4 py-2 bg-light hover:bg-primary hover:text-white rounded-lg cursor-pointer whitespace-nowrap transition-colors"
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Левая колонка с фильтрами */}
              <div className="lg:w-1/4">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-dark mb-4">Фильтры</h2>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Район</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Все районы</option>
                      <option>Патонг</option>
                      <option>Карон</option>
                      <option>Ката</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Язык экскурсии</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Любой язык</option>
                      <option>Русский</option>
                      <option>Английский</option>
                      <option>Тайский</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Цена</label>
                    <div className="flex gap-2">
                      <input type="number" placeholder="От" className="w-1/2 p-2 border rounded-md" />
                      <input type="number" placeholder="До" className="w-1/2 p-2 border rounded-md" />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Длительность</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Любая</option>
                      <option>До 3 часов</option>
                      <option>3-5 часов</option>
                      <option>5-8 часов</option>
                      <option>Полный день</option>
                    </select>
                  </div>
                  
                  <button className="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg transition-colors">
                    Применить фильтры
                  </button>
                </div>
              </div>
              
              {/* Правая колонка с результатами */}
              <div className="lg:w-3/4">
                {/* Верхняя панель с переключателем отображения и сортировкой */}
                <div className="flex justify-between items-center mb-6 bg-white rounded-xl shadow-md p-4">
                  <div>
                    <span className="text-gray-600">Найдено 15 экскурсий</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* Сортировка */}
                    <select className="py-2 px-4 border rounded-md">
                      <option value="popularity">По популярности</option>
                      <option value="price-asc">Сначала дешевле</option>
                      <option value="price-desc">Сначала дороже</option>
                      <option value="rating">По рейтингу</option>
                    </select>
                    
                    {/* Переключатель вида (список/карта) */}
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <button className="px-4 py-2 bg-primary text-white">
                        Список
                      </button>
                      <button className="px-4 py-2 bg-white text-gray-700">
                        Карта
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Плейсхолдер для списка экскурсий */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-40 bg-gradient-to-br from-dark-light to-dark flex items-center justify-center text-white text-opacity-70">
                        [Изображение экскурсии]
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between mb-2">
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Морская</span>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
                              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium ml-1">4.8</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-dark mb-2">Экскурсия на острова Пхи-Пхи</h3>
                        <p className="text-gray-600 text-sm mb-4">Увлекательное путешествие на знаменитые острова с кристально чистой водой и белоснежными пляжами...</p>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-primary font-bold text-xl">3 500 ₽</span>
                            <span className="text-gray-500 text-sm"> / чел</span>
                          </div>
                          <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors">
                            Подробнее
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Пагинация */}
                <div className="flex justify-center mt-8">
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 border rounded-md">
                      Назад
                    </button>
                    <button className="px-4 py-2 bg-primary text-white rounded-md">
                      1
                    </button>
                    <button className="px-4 py-2 border rounded-md">
                      2
                    </button>
                    <button className="px-4 py-2 border rounded-md">
                      3
                    </button>
                    <button className="px-4 py-2 border rounded-md">
                      Вперёд
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
} 