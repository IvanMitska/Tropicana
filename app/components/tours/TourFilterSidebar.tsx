import React, { useState } from 'react';
import { TourFilters } from '../../models/Tour';

interface TourFilterSidebarProps {
  filters: Partial<TourFilters>;
  onFilterChange: (filters: Partial<TourFilters>) => void;
}

const TOUR_CATEGORIES = [
  { id: 'city', name: 'Обзорные' },
  { id: 'nature', name: 'Природа' },
  { id: 'museum', name: 'Музеи' },
  { id: 'historical', name: 'Исторические' },
  { id: 'food', name: 'Гастрономические' },
  { id: 'adventure', name: 'Приключения' },
  { id: 'religious', name: 'Религиозные' },
  { id: 'private', name: 'Частные' },
  { id: 'group', name: 'Групповые' },
  { id: 'other', name: 'Другие' },
];

const LANGUAGES = [
  { id: 'русский', name: 'Русский' },
  { id: 'английский', name: 'Английский' },
  { id: 'немецкий', name: 'Немецкий' },
  { id: 'французский', name: 'Французский' },
  { id: 'испанский', name: 'Испанский' },
  { id: 'китайский', name: 'Китайский' },
  { id: 'японский', name: 'Японский' },
  { id: 'арабский', name: 'Арабский' },
  { id: 'другой', name: 'Другой' },
];

const POPULAR_CITIES = [
  'Москва',
  'Санкт-Петербург',
  'Казань',
  'Сочи',
  'Калининград',
  'Владивосток',
  'Нижний Новгород',
  'Екатеринбург',
];

const TourFilterSidebar: React.FC<TourFilterSidebarProps> = ({ filters, onFilterChange }) => {
  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice || '',
    max: filters.maxPrice || ''
  });
  
  const [durationRange, setDurationRange] = useState({
    min: filters.minDuration || '',
    max: filters.maxDuration || ''
  });
  
  // Обработчик изменения категории
  const handleCategoryChange = (categoryId: string) => {
    onFilterChange({ category: filters.category === categoryId ? undefined : categoryId });
  };
  
  // Обработчик изменения языка
  const handleLanguageChange = (language: string) => {
    onFilterChange({ language: filters.language === language ? undefined : language });
  };
  
  // Обработчик изменения города
  const handleCityChange = (city: string) => {
    onFilterChange({ city: filters.city === city ? undefined : city });
  };
  
  // Обработчик изменения ценового диапазона
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const newValue = e.target.value;
    setPriceRange({ ...priceRange, [type]: newValue });
  };
  
  // Применение фильтра цены
  const applyPriceFilter = () => {
    const minPrice = priceRange.min !== '' ? Number(priceRange.min) : undefined;
    const maxPrice = priceRange.max !== '' ? Number(priceRange.max) : undefined;
    onFilterChange({ minPrice, maxPrice });
  };
  
  // Обработчик изменения диапазона длительности
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const newValue = e.target.value;
    setDurationRange({ ...durationRange, [type]: newValue });
  };
  
  // Применение фильтра длительности
  const applyDurationFilter = () => {
    const minDuration = durationRange.min !== '' ? Number(durationRange.min) : undefined;
    const maxDuration = durationRange.max !== '' ? Number(durationRange.max) : undefined;
    onFilterChange({ minDuration, maxDuration });
  };
  
  // Сброс всех фильтров
  const resetAllFilters = () => {
    setPriceRange({ min: '', max: '' });
    setDurationRange({ min: '', max: '' });
    
    onFilterChange({
      category: undefined,
      city: undefined,
      language: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      minDuration: undefined,
      maxDuration: undefined,
      tags: undefined
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Фильтры</h2>
        <button 
          className="text-blue-500 text-sm hover:underline"
          onClick={resetAllFilters}
        >
          Сбросить все
        </button>
      </div>
      
      {/* Категории экскурсий */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Тип экскурсии</h3>
        <div className="space-y-2">
          {TOUR_CATEGORIES.map(category => (
            <div key={category.id} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category.id}`}
                checked={filters.category === category.id}
                onChange={() => handleCategoryChange(category.id)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={`category-${category.id}`} className="ml-2 text-gray-700">
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Города */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Город</h3>
        <div className="space-y-2">
          {POPULAR_CITIES.map(city => (
            <div key={city} className="flex items-center">
              <input
                type="checkbox"
                id={`city-${city}`}
                checked={filters.city === city}
                onChange={() => handleCityChange(city)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={`city-${city}`} className="ml-2 text-gray-700">
                {city}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Ценовой диапазон */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Стоимость (₽)</h3>
        <div className="flex space-x-2 mb-3">
          <input
            type="number"
            placeholder="От"
            value={priceRange.min}
            onChange={(e) => handlePriceChange(e, 'min')}
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
          <input
            type="number"
            placeholder="До"
            value={priceRange.max}
            onChange={(e) => handlePriceChange(e, 'max')}
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>
        <button
          onClick={applyPriceFilter}
          className="w-full bg-blue-500 text-white rounded-md py-2 text-sm hover:bg-blue-600 transition"
        >
          Применить
        </button>
      </div>
      
      {/* Длительность */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Длительность (часы)</h3>
        <div className="flex space-x-2 mb-3">
          <input
            type="number"
            placeholder="От"
            value={durationRange.min}
            onChange={(e) => handleDurationChange(e, 'min')}
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
          <input
            type="number"
            placeholder="До"
            value={durationRange.max}
            onChange={(e) => handleDurationChange(e, 'max')}
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>
        <button
          onClick={applyDurationFilter}
          className="w-full bg-blue-500 text-white rounded-md py-2 text-sm hover:bg-blue-600 transition"
        >
          Применить
        </button>
      </div>
      
      {/* Языки проведения */}
      <div>
        <h3 className="font-medium mb-3">Язык проведения</h3>
        <div className="space-y-2">
          {LANGUAGES.map(language => (
            <div key={language.id} className="flex items-center">
              <input
                type="checkbox"
                id={`language-${language.id}`}
                checked={filters.language === language.id}
                onChange={() => handleLanguageChange(language.id)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={`language-${language.id}`} className="ml-2 text-gray-700">
                {language.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourFilterSidebar; 