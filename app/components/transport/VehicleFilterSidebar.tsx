import React, { useState, useEffect } from 'react';
import { VehicleType } from '@/app/models/Vehicle';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';
import { VehicleFilters } from '@/app/hooks/useVehicles';
import { 
  Car as CarIcon, 
  Filter as FilterIcon, 
  Bike, 
  Ship, 
  Settings as CogIcon,
  DollarSign,
  Users,
  Calendar,
  X
} from 'lucide-react';

interface Props {
  filters: VehicleFilters;
  onUpdateFilters: (filters: Partial<VehicleFilters>) => void;
  onClearFilters: () => void;
  isLoading?: boolean;
}

export default function VehicleFilterSidebar({ 
  filters, 
  onUpdateFilters, 
  onClearFilters,
  isLoading = false 
}: Props) {
  // Локальное состояние для управления фильтрами
  const [localFilters, setLocalFilters] = useState<VehicleFilters>(filters);
  
  // Синхронизация локального состояния с пропсами
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);
  
  // Обработчик изменения типа транспорта
  const handleTypeChange = (type: VehicleType) => {
    if (localFilters.type === type) {
      // Если тип уже выбран, снимаем выбор
      setLocalFilters(prev => ({ ...prev, type: undefined }));
    } else {
      // Иначе выбираем новый тип
      setLocalFilters(prev => ({ ...prev, type }));
    }
  };
  
  // Обработчик изменения полей ввода
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'number') {
      setLocalFilters(prev => ({ 
        ...prev, 
        [name]: value ? Number(value) : undefined 
      }));
    } else {
      setLocalFilters(prev => ({ 
        ...prev, 
        [name]: value || undefined 
      }));
    }
  };
  
  // Обработчик применения фильтров
  const handleApplyFilters = () => {
    onUpdateFilters(localFilters);
  };
  
  // Обработчик сброса фильтров
  const handleClearFilters = () => {
    onClearFilters();
  };
  
  // Типы транспортных средств с иконками
  const vehicleTypes: { type: VehicleType; label: string; icon: React.ReactNode }[] = [
    { type: 'car', label: 'Автомобили', icon: <CarIcon className="h-5 w-5" /> },
    { type: 'motorcycle', label: 'Мотоциклы', icon: <Bike className="h-5 w-5" /> },
    { type: 'boat', label: 'Лодки', icon: <Ship className="h-5 w-5" /> },
    { type: 'yacht', label: 'Яхты', icon: <Ship className="h-5 w-5" /> },
    { type: 'bicycle', label: 'Велосипеды', icon: <Bike className="h-5 w-5" /> },
    { type: 'scooter', label: 'Скутеры', icon: <Bike className="h-5 w-5" /> },
    { type: 'rv', label: 'Автодома', icon: <CarIcon className="h-5 w-5" /> },
    { type: 'other', label: 'Другое', icon: <CogIcon className="h-5 w-5" /> },
  ];
  
  // Популярные марки для автомобилей
  const popularCarMakes = [
    'BMW', 'Mercedes-Benz', 'Audi', 'Toyota', 'Volkswagen', 
    'Porsche', 'Lexus', 'Range Rover', 'Honda', 'Ford'
  ];
  
  // Варианты коробок передач
  const transmissionOptions = [
    { value: 'automatic', label: 'Автоматическая' },
    { value: 'manual', label: 'Механическая' },
    { value: 'semiautomatic', label: 'Полуавтоматическая' },
  ];
  
  // Варианты топлива
  const fuelTypeOptions = [
    { value: 'gasoline', label: 'Бензин' },
    { value: 'diesel', label: 'Дизель' },
    { value: 'electric', label: 'Электро' },
    { value: 'hybrid', label: 'Гибрид' },
    { value: 'other', label: 'Другое' },
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <FilterIcon className="h-5 w-5 mr-2" />
          Фильтры
        </h3>
        <button
          onClick={handleClearFilters}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
          disabled={isLoading}
        >
          <X className="h-4 w-4 mr-1" />
          Сбросить
        </button>
      </div>
      
      {/* Тип транспорта */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Тип транспорта</h4>
        <div className="grid grid-cols-2 gap-2">
          {vehicleTypes.map(({ type, label, icon }) => (
            <button
              key={type}
              className={`flex items-center justify-start p-2 rounded-md border text-sm ${
                localFilters.type === type
                  ? 'bg-blue-50 border-blue-300 text-blue-600'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => handleTypeChange(type)}
              disabled={isLoading}
            >
              <span className="mr-2">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Марка и модель */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Марка и модель</h4>
        <div className="space-y-3">
          <div>
            <label htmlFor="make" className="block text-xs text-gray-500 mb-1">
              Марка
            </label>
            <select
              id="make"
              name="make"
              value={localFilters.make || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              disabled={isLoading}
            >
              <option value="">Все марки</option>
              {popularCarMakes.map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="model" className="block text-xs text-gray-500 mb-1">
              Модель
            </label>
            <input
              id="model"
              name="model"
              placeholder="Любая модель"
              value={localFilters.model || ''}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>
      </div>
      
      {/* Цена */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <DollarSign className="h-4 w-4 mr-1" />
          Цена (₽ в сутки)
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="minPrice" className="block text-xs text-gray-500 mb-1">
              От
            </label>
            <input
              id="minPrice"
              name="minPrice"
              type="number"
              placeholder="0"
              value={localFilters.minPrice || ''}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div>
            <label htmlFor="maxPrice" className="block text-xs text-gray-500 mb-1">
              До
            </label>
            <input
              id="maxPrice"
              name="maxPrice"
              type="number"
              placeholder="100000"
              value={localFilters.maxPrice || ''}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>
      </div>
      
      {/* Год выпуска */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          Год выпуска
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="minYear" className="block text-xs text-gray-500 mb-1">
              От
            </label>
            <input
              id="minYear"
              name="minYear"
              type="number"
              placeholder="2010"
              value={localFilters.minYear || ''}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div>
            <label htmlFor="maxYear" className="block text-xs text-gray-500 mb-1">
              До
            </label>
            <input
              id="maxYear"
              name="maxYear"
              type="number"
              placeholder={new Date().getFullYear().toString()}
              value={localFilters.maxYear || ''}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>
      </div>
      
      {/* Вместимость */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <Users className="h-4 w-4 mr-1" />
          Вместимость (чел.)
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="minCapacity" className="block text-xs text-gray-500 mb-1">
              От
            </label>
            <input
              id="minCapacity"
              name="minCapacity"
              type="number"
              placeholder="1"
              value={localFilters.minCapacity || ''}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div>
            <label htmlFor="maxCapacity" className="block text-xs text-gray-500 mb-1">
              До
            </label>
            <input
              id="maxCapacity"
              name="maxCapacity"
              type="number"
              placeholder="10+"
              value={localFilters.maxCapacity || ''}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>
      </div>
      
      {/* Дополнительные фильтры */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <CogIcon className="h-4 w-4 mr-1" />
          Дополнительные фильтры
        </h4>
        
        {/* Коробка передач */}
        <div className="mb-3">
          <label htmlFor="transmission" className="block text-xs text-gray-500 mb-1">
            Коробка передач
          </label>
          <select
            id="transmission"
            name="transmission"
            value={localFilters.transmission || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            disabled={isLoading}
          >
            <option value="">Любая</option>
            {transmissionOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Тип топлива */}
        <div>
          <label htmlFor="fuelType" className="block text-xs text-gray-500 mb-1">
            Тип топлива
          </label>
          <select
            id="fuelType"
            name="fuelType"
            value={localFilters.fuelType || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            disabled={isLoading}
          >
            <option value="">Любой</option>
            {fuelTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Местоположение */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Местоположение</h4>
        <input
          id="location"
          name="location"
          placeholder="Город или район"
          value={localFilters.location || ''}
          onChange={handleInputChange}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
        />
      </div>
      
      {/* Даты аренды */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Даты аренды</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="availableFrom" className="block text-xs text-gray-500 mb-1">
              С
            </label>
            <input
              id="availableFrom"
              name="availableFrom"
              type="date"
              value={localFilters.availableFrom || ''}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div>
            <label htmlFor="availableTo" className="block text-xs text-gray-500 mb-1">
              По
            </label>
            <input
              id="availableTo"
              name="availableTo"
              type="date"
              value={localFilters.availableTo || ''}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>
      </div>
      
      {/* Кнопки применения фильтров */}
      <div className="flex flex-col gap-2">
        <button
          onClick={handleApplyFilters}
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Применение...' : 'Применить фильтры'}
        </button>
        <button
          onClick={handleClearFilters}
          disabled={isLoading}
          className="border border-gray-300 bg-white text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 disabled:opacity-50"
        >
          Сбросить фильтры
        </button>
      </div>
    </div>
  );
} 