import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tour } from '../../models/Tour';
import TourCard from './TourCard';
import { tourAPI } from '../../lib/api';

interface SimilarToursProps {
  currentTourId: string;
  category: string;
  city: string;
  tags?: string[];
}

const SimilarTours: React.FC<SimilarToursProps> = ({
  currentTourId,
  category,
  city,
  tags
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Получаем похожие экскурсии
  const { data: toursData, isLoading } = useQuery(
    ['similarTours', currentTourId, category, city, activeCategory],
    async () => {
      // Формируем фильтры для поиска похожих экскурсий
      const filters: any = {
        limit: 6
      };
      
      // Используем активную категорию или категорию текущей экскурсии
      if (activeCategory) {
        filters.category = activeCategory;
      } else if (category) {
        filters.category = category;
      }
      
      // Добавляем город для более релевантных результатов
      if (city) {
        filters.city = city;
      }
      
      // Добавляем теги, если они есть
      if (tags && tags.length > 0 && !activeCategory) {
        filters.tags = tags;
      }
      
      const response = await tourAPI.getAll(filters);
      
      // Фильтруем текущую экскурсию из результатов
      return {
        ...response,
        data: response.data.filter(tour => tour.id !== currentTourId)
      };
    },
    {
      staleTime: 300000, // 5 минут
    }
  );
  
  // Получаем категории для фильтрации
  const { data: categoriesData } = useQuery(
    'tourCategories',
    () => tourAPI.getCategories(),
    {
      staleTime: 300000, // 5 минут
    }
  );
  
  // Если нет похожих экскурсий или они загружаются, показываем заглушки
  if (isLoading) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Похожие экскурсии</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-64 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }
  
  // Если нет похожих экскурсий, не показываем компонент
  if (!toursData?.data || toursData.data.length === 0) {
    return null;
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Похожие экскурсии</h2>
        
        {/* Фильтры по категориям */}
        {categoriesData?.data && categoriesData.data.length > 0 && (
          <div className="flex space-x-2 overflow-x-auto pb-2 max-w-[calc(100%-200px)]">
            <button
              className={`px-3 py-1 text-sm whitespace-nowrap rounded-md border ${
                activeCategory === null
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setActiveCategory(null)}
            >
              Все
            </button>
            {categoriesData.data.slice(0, 5).map(cat => (
              <button
                key={cat._id}
                className={`px-3 py-1 text-sm whitespace-nowrap rounded-md border ${
                  activeCategory === cat._id
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setActiveCategory(activeCategory === cat._id ? null : cat._id)}
              >
                {getCategoryName(cat._id)}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Карусель с экскурсиями */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toursData.data.slice(0, 3).map(tour => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
        
        {/* Стрелки для навигации (декоративные в этой версии) */}
        {toursData.data.length > 3 && (
          <div className="hidden md:flex items-center justify-between absolute top-1/2 -translate-y-1/2 w-full px-4 pointer-events-none">
            <button className="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center pointer-events-auto hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-600">
                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center pointer-events-auto hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-600">
                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Функция для получения читаемого названия категории
function getCategoryName(categoryId: string): string {
  const categoryMap: Record<string, string> = {
    'city': 'Обзорные',
    'nature': 'Природа',
    'museum': 'Музеи',
    'historical': 'Исторические',
    'food': 'Гастрономические',
    'adventure': 'Приключения',
    'religious': 'Религиозные',
    'private': 'Частные',
    'group': 'Групповые',
    'other': 'Другие'
  };
  
  return categoryMap[categoryId] || categoryId;
}

export default SimilarTours; 