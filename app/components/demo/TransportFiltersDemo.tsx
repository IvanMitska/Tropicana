import React, { useState } from 'react';
import TransportationMethodFilter from '../filters/TransportationMethodFilter';
import CategoryFilters from '../filters/CategoryFilters';
import { 
  WalkingIcon, 
  CarIcon, 
  BusIcon, 
  BoatIcon, 
  MotorcycleIcon, 
  YachtIcon 
} from '../icons';

const TransportFiltersDemo = () => {
  // Данные для компонента TransportationMethodFilter
  const transportMethods = [
    { id: 'walking', name: 'Пешком', icon: <WalkingIcon size={20} /> },
    { id: 'car', name: 'Автомобиль', icon: <CarIcon size={20} /> },
    { id: 'bus', name: 'Автобус', icon: <BusIcon size={20} /> },
    { id: 'boat', name: 'Лодка', icon: <BoatIcon size={20} /> },
    { id: 'motorcycle', name: 'Мотоцикл', icon: <MotorcycleIcon size={20} /> },
    { id: 'yacht', name: 'Яхта', icon: <YachtIcon size={20} /> },
  ];

  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
  const [resultsCount, setResultsCount] = useState(156); // Начальное количество результатов

  // Данные для компонента CategoryFilters
  const categories = [
    { id: 'economy', name: 'Эконом', count: 45 },
    { id: 'comfort', name: 'Комфорт', count: 32 },
    { id: 'business', name: 'Бизнес', count: 18 },
    { id: 'premium', name: 'Премиум', count: 12 },
    { id: 'suv', name: 'Внедорожники', count: 28 },
    { id: 'minivan', name: 'Минивэны', count: 15 },
    { id: 'convertible', name: 'Кабриолеты', count: 6 },
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Обработчики изменений
  const handleMethodsChange = (newSelectedMethods: string[]) => {
    setSelectedMethods(newSelectedMethods);
    // Обновляем количество результатов (в реальном приложении тут был бы API запрос)
    setResultsCount(Math.max(50, 156 - newSelectedMethods.length * 20));
  };

  const handleCategoriesChange = (newSelectedCategories: string[]) => {
    setSelectedCategories(newSelectedCategories);
  };

  const handleReset = () => {
    setSelectedMethods([]);
    setResultsCount(156);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Демонстрация компонентов фильтрации</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3">Горизонтальная фильтрация по категориям:</h3>
        <CategoryFilters 
          availableCategories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoriesChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-3">Фильтр по способу передвижения:</h3>
          <TransportationMethodFilter 
            availableMethods={transportMethods}
            selectedMethods={selectedMethods}
            onSelectionChange={handleMethodsChange}
            onReset={handleReset}
            resultsCount={resultsCount}
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Активные фильтры:</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="mb-2"><strong>Способы передвижения:</strong> {selectedMethods.length ? selectedMethods.join(', ') : 'Не выбрано'}</p>
            <p className="mb-2"><strong>Категории:</strong> {selectedCategories.length ? selectedCategories.join(', ') : 'Не выбрано'}</p>
            <p><strong>Найдено результатов:</strong> {resultsCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportFiltersDemo; 