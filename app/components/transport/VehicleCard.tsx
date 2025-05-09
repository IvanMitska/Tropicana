import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star as StarIcon, User as UserIcon, Settings as CogIcon, Calendar as CalendarIcon, Fuel, Car } from 'lucide-react';
import { Vehicle } from '@/app/models/Vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
  onQuickView: (vehicle: Vehicle) => void;
  viewMode?: 'grid' | 'list';
}

export default function VehicleCard({ vehicle, onQuickView, viewMode = 'grid' }: VehicleCardProps) {
  // Находим главное изображение
  const mainImage = vehicle.images.find(img => img.isFeatured) || vehicle.images[0];
  
  // Форматирование цены
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Получение описания типа транспорта
  const getVehicleTypeLabel = (type: string): string => {
    const types: Record<string, string> = {
      car: 'Автомобиль',
      motorcycle: 'Мотоцикл',
      boat: 'Лодка',
      yacht: 'Яхта',
      bicycle: 'Велосипед',
      scooter: 'Скутер',
      rv: 'Автодом',
      other: 'Другой',
    };
    return types[type] || 'Транспорт';
  };

  // Функция для открытия быстрого просмотра
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    onQuickView(vehicle);
  };

  // Компонент карточки в режиме сетки
  if (viewMode === 'grid') {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative">
          {/* Изображение */}
          <div className="relative h-48 w-full">
            <Image
              src={mainImage?.url || '/images/car1.jpg'}
              alt={mainImage?.alt || vehicle.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          {/* Бейдж избранного */}
          {vehicle.featured && (
            <div className="absolute top-2 left-2 bg-rose-600 text-white text-xs px-2 py-1 rounded">
              Популярное
            </div>
          )}
          
          {/* Кнопка быстрого просмотра */}
          <button
            onClick={handleQuickView}
            className="absolute bottom-2 right-2 bg-white/90 text-gray-800 text-sm px-3 py-1 rounded-full shadow-sm hover:bg-white"
          >
            Быстрый просмотр
          </button>
        </div>
        
        <div className="p-4">
          {/* Заголовок и тип */}
          <div className="mb-2">
            <div className="text-xs font-medium text-gray-500 uppercase">
              {getVehicleTypeLabel(vehicle.type)}
            </div>
            <Link href={`/transport/${vehicle.id}`} className="block">
              <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                {vehicle.title}
              </h3>
            </Link>
          </div>
          
          {/* Основные характеристики */}
          <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
            <div className="flex items-center">
              <Car className="h-4 w-4 mr-1 text-gray-400" />
              <span>{vehicle.make} {vehicle.model}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
              <span>{vehicle.year} г.</span>
            </div>
            <div className="flex items-center">
              <UserIcon className="h-4 w-4 mr-1 text-gray-400" />
              <span>{vehicle.specifications.capacity} мест</span>
            </div>
            <div className="flex items-center">
              <Fuel className="h-4 w-4 mr-1 text-gray-400" />
              <span>
                {vehicle.specifications.fuelType === 'electric' ? 'Электро' : vehicle.specifications.fuelConsumption + ' л/100км'}
              </span>
            </div>
          </div>
          
          {/* Рейтинг и цена */}
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center">
              <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="font-medium">{vehicle.rating.toFixed(1)}</span>
              <span className="text-xs text-gray-500 ml-1">({vehicle.reviews.length})</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                {formatPrice(vehicle.pricing.daily)}
              </div>
              <div className="text-xs text-gray-500">за сутки</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Компонент карточки в режиме списка
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        {/* Изображение */}
        <div className="relative md:w-1/3">
          <div className="relative h-48 md:h-full w-full">
            <Image
              src={mainImage?.url || '/images/car1.jpg'}
              alt={mainImage?.alt || vehicle.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          {/* Бейдж избранного */}
          {vehicle.featured && (
            <div className="absolute top-2 left-2 bg-rose-600 text-white text-xs px-2 py-1 rounded">
              Популярное
            </div>
          )}
        </div>
        
        <div className="p-4 md:w-2/3">
          <div className="flex flex-col h-full">
            {/* Заголовок и тип */}
            <div className="mb-2">
              <div className="text-xs font-medium text-gray-500 uppercase">
                {getVehicleTypeLabel(vehicle.type)}
              </div>
              <Link href={`/transport/${vehicle.id}`} className="block">
                <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                  {vehicle.title}
                </h3>
              </Link>
            </div>
            
            {/* Краткое описание */}
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {vehicle.description}
            </p>
            
            {/* Основные характеристики */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 text-sm text-gray-600">
              <div className="flex items-center">
                <Car className="h-4 w-4 mr-1 text-gray-400" />
                <span>{vehicle.make} {vehicle.model}</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                <span>{vehicle.year} г.</span>
              </div>
              <div className="flex items-center">
                <UserIcon className="h-4 w-4 mr-1 text-gray-400" />
                <span>{vehicle.specifications.capacity} мест</span>
              </div>
              <div className="flex items-center">
                <Fuel className="h-4 w-4 mr-1 text-gray-400" />
                <span>
                  {vehicle.specifications.fuelType === 'electric' ? 'Электро' : vehicle.specifications.fuelConsumption + ' л/100км'}
                </span>
              </div>
            </div>
            
            <div className="mt-auto">
              {/* Дополнительные функции */}
              <div className="flex flex-wrap gap-1 mb-2">
                {vehicle.features.slice(0, 3).map((feature, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
                {vehicle.features.length > 3 && (
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    +{vehicle.features.length - 3}
                  </span>
                )}
              </div>
              
              {/* Рейтинг, цена и кнопки */}
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center">
                  <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{vehicle.rating.toFixed(1)}</span>
                  <span className="text-xs text-gray-500 ml-1">({vehicle.reviews.length})</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {formatPrice(vehicle.pricing.daily)}
                    </div>
                    <div className="text-xs text-gray-500">за сутки</div>
                  </div>
                  
                  <button
                    onClick={handleQuickView}
                    className="px-3 py-1.5 bg-gray-100 text-gray-800 text-sm rounded-md hover:bg-gray-200"
                  >
                    Быстрый просмотр
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 