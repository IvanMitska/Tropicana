import React, { useState } from 'react';
import { Vehicle } from '@/app/models/Vehicle';
import VehicleCard from './VehicleCard';
import VehicleQuickView from './VehicleQuickView';
import { Pagination } from '@/app/components/ui/Pagination';
import { ViewMode, SortOption } from '@/app/hooks/useVehicles';
import { 
  LayoutGrid as GridIcon, 
  AlignJustify as ListIcon, 
  ArrowDown as ArrowDownIcon, 
  ArrowUp as ArrowUpIcon, 
  Star as StarIcon,
  BarChart as BarChartIcon,
  Clock as ClockIcon
} from 'lucide-react';

interface VehicleListProps {
  vehicles: Vehicle[];
  totalVehicles: number;
  totalPages: number;
  currentPage: number;
  viewMode: ViewMode;
  sortOption: SortOption;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
  onSortChange: (sortOption: SortOption) => void;
  onCheckAvailability: (id: string, startDate: string, endDate: string) => Promise<any>;
}

export default function VehicleList({
  vehicles,
  totalVehicles,
  totalPages,
  currentPage,
  viewMode,
  sortOption,
  isLoading,
  onPageChange,
  onViewModeChange,
  onSortChange,
  onCheckAvailability
}: VehicleListProps) {
  // Состояние для модального окна быстрого просмотра
  const [quickViewVehicle, setQuickViewVehicle] = useState<Vehicle | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  
  // Обработчик открытия быстрого просмотра
  const handleQuickView = (vehicle: Vehicle) => {
    setQuickViewVehicle(vehicle);
    setIsQuickViewOpen(true);
  };
  
  // Обработчик закрытия быстрого просмотра
  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
  };
  
  // Проверка доступности транспортного средства
  const checkVehicleAvailability = async (startDate: string, endDate: string) => {
    if (!quickViewVehicle) return [];
    
    try {
      const result = await onCheckAvailability(quickViewVehicle.id, startDate, endDate);
      return result;
    } catch (error) {
      console.error('Ошибка при проверке доступности:', error);
      return [];
    }
  };
  
  // Варианты сортировки с метками
  const sortOptions: { value: SortOption; label: string; icon: React.ReactNode }[] = [
    { value: 'price_asc', label: 'По возрастанию цены', icon: <ArrowUpIcon className="h-4 w-4" /> },
    { value: 'price_desc', label: 'По убыванию цены', icon: <ArrowDownIcon className="h-4 w-4" /> },
    { value: 'rating_desc', label: 'По рейтингу', icon: <StarIcon className="h-4 w-4" /> },
    { value: 'newest', label: 'Сначала новые', icon: <ClockIcon className="h-4 w-4" /> },
    { value: 'popularity', label: 'По популярности', icon: <BarChartIcon className="h-4 w-4" /> },
  ];
  
  return (
    <div>
      {/* Верхняя панель с фильтрами, сортировкой и переключателями вида */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="text-gray-600">
          {isLoading ? (
            <span>Загрузка транспортных средств...</span>
          ) : (
            <span>Найдено {totalVehicles} транспортных средств</span>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {/* Сортировка */}
          <div className="flex items-center">
            <label htmlFor="sort" className="text-sm text-gray-600 mr-2">
              Сортировка:
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:border-dark focus:ring-1 focus:ring-dark outline-none"
              disabled={isLoading}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Переключатели вида */}
          <div className="flex border rounded-md overflow-hidden">
            <button
              className={`p-2 ${
                viewMode === 'grid'
                  ? 'bg-dark-light/10 text-dark'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => onViewModeChange('grid')}
              disabled={isLoading}
              aria-label="Отображение сеткой"
            >
              <GridIcon className="h-5 w-5" />
            </button>
            <button
              className={`p-2 ${
                viewMode === 'list'
                  ? 'bg-dark-light/10 text-dark'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => onViewModeChange('list')}
              disabled={isLoading}
              aria-label="Отображение списком"
            >
              <ListIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Список транспортных средств */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md h-[300px] animate-pulse"
            >
              <div className="h-48 bg-gray-200 rounded-t-lg" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : vehicles.length > 0 ? (
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }
        `}>
          {vehicles.map(vehicle => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onQuickView={handleQuickView}
              viewMode={viewMode}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <div className="text-gray-500 mb-2">По вашему запросу ничего не найдено</div>
          <p className="text-gray-600">
            Попробуйте изменить параметры фильтрации или сбросить фильтры
          </p>
        </div>
      )}
      
      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            disabled={isLoading}
          />
        </div>
      )}
      
      {/* Компонент быстрого просмотра */}
      <VehicleQuickView
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
        vehicle={quickViewVehicle}
        onCheckAvailability={checkVehicleAvailability}
      />
    </div>
  );
} 