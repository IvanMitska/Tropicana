import React from 'react';
import Image from 'next/image';

interface Category {
  _id: string;
  count: number;
}

interface TourCategoriesProps {
  categories: Category[];
  selectedCategory?: string;
  onCategorySelect: (category: string | undefined) => void;
}

// Отображаемые названия и иконки для категорий
const CATEGORY_INFO: Record<string, { name: string; icon: string }> = {
  'city': { name: 'Обзорные', icon: '/images/categories/city.svg' },
  'nature': { name: 'Природа', icon: '/images/categories/nature.svg' },
  'museum': { name: 'Музеи', icon: '/images/categories/museum.svg' },
  'historical': { name: 'Исторические', icon: '/images/categories/historical.svg' },
  'food': { name: 'Гастрономия', icon: '/images/categories/food.svg' },
  'adventure': { name: 'Приключения', icon: '/images/categories/adventure.svg' },
  'religious': { name: 'Религиозные', icon: '/images/categories/religious.svg' },
  'private': { name: 'Частные', icon: '/images/categories/private.svg' },
  'group': { name: 'Групповые', icon: '/images/categories/group.svg' },
  'other': { name: 'Другие', icon: '/images/categories/other.svg' },
};

// Запасные иконки для категорий без изображений
const DEFAULT_ICON = '/images/categories/default.svg';

const TourCategories: React.FC<TourCategoriesProps> = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect 
}) => {
  // Если нет категорий, отображаем заглушки
  if (!categories || categories.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="bg-white rounded-lg p-4 flex flex-col items-center justify-center h-24 animate-pulse"
          >
            <div className="w-12 h-12 bg-gray-200 rounded-full mb-2"></div>
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {categories.map(category => {
        const categoryInfo = CATEGORY_INFO[category._id] || { 
          name: category._id.charAt(0).toUpperCase() + category._id.slice(1), 
          icon: DEFAULT_ICON 
        };
        
        const isSelected = selectedCategory === category._id;
        
        return (
          <button
            key={category._id}
            className={`bg-white rounded-lg p-4 flex flex-col items-center justify-center h-24 shadow-sm border-2 transition-all
              ${isSelected 
                ? 'border-blue-500 shadow-md' 
                : 'border-transparent hover:border-gray-200 hover:shadow'
              }`}
            onClick={() => onCategorySelect(isSelected ? undefined : category._id)}
          >
            <div className="relative w-10 h-10 mb-2">
              <Image
                src={categoryInfo.icon}
                alt={categoryInfo.name}
                fill
                className="object-contain"
                onError={(e) => {
                  // Если изображение не загружается, используем запасное
                  (e.target as HTMLImageElement).src = DEFAULT_ICON;
                }}
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-center">{categoryInfo.name}</span>
              <span className="text-xs text-gray-500">{category.count}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default TourCategories; 