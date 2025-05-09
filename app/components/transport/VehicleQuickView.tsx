import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Vehicle, VehicleAvailability } from '@/app/models/Vehicle';
import { Modal } from '@/app/components/ui/Modal';
import { Button } from '@/app/components/ui/Button';
import { 
  Star as StarIcon, 
  User as UserIcon, 
  Car, 
  Calendar as CalendarIcon, 
  Fuel, 
  Gauge as GaugeIcon, 
  Sliders as SlidersIcon, 
  X as XIcon,
  Settings as CogIcon,
  Clock as ClockIcon,
  BatteryMedium as BatteryMediumIcon,
  Ruler as RulerIcon,
  Scale as ScaleIcon,
  Package as BoxIcon
} from 'lucide-react';
import VehicleAvailabilityCalendar from './VehicleAvailabilityCalendar';

interface VehicleQuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle | null;
  onCheckAvailability: (startDate: string, endDate: string) => Promise<VehicleAvailability[]>;
}

export default function VehicleQuickView({ 
  isOpen,
  onClose,
  vehicle,
  onCheckAvailability
}: VehicleQuickViewProps) {
  const [loading, setLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'overview' | 'specifications' | 'terms'>('overview');
  
  if (!vehicle) {
    return null;
  }

  // Функции форматирования данных
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price);
  };

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

  const getFuelTypeLabel = (type: string): string => {
    const types: Record<string, string> = {
      gasoline: 'Бензин',
      diesel: 'Дизель',
      electric: 'Электричество',
      hybrid: 'Гибрид',
      other: 'Другое',
    };
    return types[type] || 'Не указано';
  };

  const getTransmissionLabel = (type: string): string => {
    const types: Record<string, string> = {
      automatic: 'Автоматическая',
      manual: 'Механическая',
      semiautomatic: 'Полуавтоматическая',
    };
    return types[type] || 'Не указано';
  };

  const getDriveTypeLabel = (type?: string): string => {
    if (!type) return 'Не указано';
    
    const types: Record<string, string> = {
      fwd: 'Передний',
      rwd: 'Задний',
      awd: 'Полный',
      '4wd': '4×4',
    };
    return types[type] || 'Не указано';
  };

  // Находим главное изображение
  const mainImage = vehicle.images.find(img => img.isFeatured) || vehicle.images[0];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-auto">
        {/* Заголовок */}
        <div className="p-4 md:p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                {getVehicleTypeLabel(vehicle.type)}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{vehicle.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Табы */}
        <div className="border-b">
          <div className="flex">
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Обзор
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'specifications'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('specifications')}
            >
              Характеристики
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'terms'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('terms')}
            >
              Условия аренды
            </button>
          </div>
        </div>

        {/* Контент табов */}
        <div className="p-4 md:p-6">
          {/* Вкладка обзора */}
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Изображение */}
              <div className="relative h-56 md:h-64 rounded-lg overflow-hidden">
                <Image
                  src={mainImage?.url || '/images/car1.jpg'}
                  alt={mainImage?.alt || vehicle.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Краткое описание и основные характеристики */}
              <div>
                <p className="text-gray-600 mb-4">{vehicle.description}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center">
                    <Car className="h-5 w-5 mr-2 text-gray-500" />
                    <div>
                      <div className="text-xs text-gray-500">Марка и модель</div>
                      <div className="font-medium">{vehicle.make} {vehicle.model}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-gray-500" />
                    <div>
                      <div className="text-xs text-gray-500">Год выпуска</div>
                      <div className="font-medium">{vehicle.year}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <UserIcon className="h-5 w-5 mr-2 text-gray-500" />
                    <div>
                      <div className="text-xs text-gray-500">Вместимость</div>
                      <div className="font-medium">{vehicle.specifications.capacity} чел.</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Fuel className="h-5 w-5 mr-2 text-gray-500" />
                    <div>
                      <div className="text-xs text-gray-500">Тип топлива</div>
                      <div className="font-medium">{getFuelTypeLabel(vehicle.specifications.fuelType)}</div>
                    </div>
                  </div>
                </div>

                {/* Рейтинг и цена */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
                    <span className="font-medium">{vehicle.rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500 ml-1">({vehicle.reviews.length} отзывов)</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatPrice(vehicle.pricing.daily)}
                    </div>
                    <div className="text-sm text-gray-500">за сутки</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Вкладка характеристик */}
          {activeTab === 'specifications' && (
            <div className="space-y-6">
              {/* Основные характеристики */}
              <div>
                <h4 className="text-lg font-medium mb-3">Основные характеристики</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="flex items-start">
                    <CogIcon className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Мощность</div>
                      <div className="font-medium">{vehicle.specifications.power} л.с.</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <SlidersIcon className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Трансмиссия</div>
                      <div className="font-medium">{getTransmissionLabel(vehicle.specifications.transmission)}</div>
                    </div>
                  </div>
                  {vehicle.specifications.driveType && (
                    <div className="flex items-start">
                      <Car className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Тип привода</div>
                        <div className="font-medium">{getDriveTypeLabel(vehicle.specifications.driveType)}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start">
                    <Fuel className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Расход топлива</div>
                      <div className="font-medium">{vehicle.specifications.fuelConsumption} л/100км</div>
                    </div>
                  </div>
                  {vehicle.specifications.maxSpeed && (
                    <div className="flex items-start">
                      <GaugeIcon className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Макс. скорость</div>
                        <div className="font-medium">{vehicle.specifications.maxSpeed} км/ч</div>
                      </div>
                    </div>
                  )}
                  {vehicle.specifications.acceleration && (
                    <div className="flex items-start">
                      <ClockIcon className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Разгон до 100 км/ч</div>
                        <div className="font-medium">{vehicle.specifications.acceleration} сек.</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Размеры и вместимость */}
              <div>
                <h4 className="text-lg font-medium mb-3">Размеры и вместимость</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="flex items-start">
                    <UserIcon className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Вместимость</div>
                      <div className="font-medium">{vehicle.specifications.capacity} чел.</div>
                    </div>
                  </div>
                  {vehicle.specifications.doors && (
                    <div className="flex items-start">
                      <Car className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Кол-во дверей</div>
                        <div className="font-medium">{vehicle.specifications.doors}</div>
                      </div>
                    </div>
                  )}
                  {vehicle.specifications.weight && (
                    <div className="flex items-start">
                      <ScaleIcon className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Вес</div>
                        <div className="font-medium">{vehicle.specifications.weight} кг</div>
                      </div>
                    </div>
                  )}
                  {vehicle.specifications.length && (
                    <div className="flex items-start">
                      <RulerIcon className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Длина</div>
                        <div className="font-medium">{vehicle.specifications.length} м</div>
                      </div>
                    </div>
                  )}
                  {vehicle.specifications.luggage && (
                    <div className="flex items-start">
                      <BoxIcon className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Объем багажника</div>
                        <div className="font-medium">{vehicle.specifications.luggage} л</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Дополнительные функции */}
              <div>
                <h4 className="text-lg font-medium mb-3">Дополнительные функции</h4>
                <div className="flex flex-wrap gap-2">
                  {vehicle.features.map((feature, index) => (
                    <span key={index} className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Вкладка условий аренды */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              {/* Цены */}
              <div>
                <h4 className="text-lg font-medium mb-3">Стоимость аренды</h4>
                <div className="flex flex-wrap gap-5 mb-4">
                  {vehicle.pricing.hourly && (
                    <div className="text-center">
                      <div className="text-lg font-bold">{formatPrice(vehicle.pricing.hourly)}</div>
                      <div className="text-sm text-gray-500">в час</div>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-lg font-bold">{formatPrice(vehicle.pricing.daily)}</div>
                    <div className="text-sm text-gray-500">в сутки</div>
                  </div>
                  {vehicle.pricing.weekly && (
                    <div className="text-center">
                      <div className="text-lg font-bold">{formatPrice(vehicle.pricing.weekly)}</div>
                      <div className="text-sm text-gray-500">в неделю</div>
                    </div>
                  )}
                  {vehicle.pricing.monthly && (
                    <div className="text-center">
                      <div className="text-lg font-bold">{formatPrice(vehicle.pricing.monthly)}</div>
                      <div className="text-sm text-gray-500">в месяц</div>
                    </div>
                  )}
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Залог</span>
                    <span className="font-medium">{formatPrice(vehicle.pricing.deposit)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Минимальный срок аренды</span>
                    <span className="font-medium">{vehicle.pricing.minimumRental} ч.</span>
                  </div>
                  {vehicle.pricing.discounts && Object.keys(vehicle.pricing.discounts).length > 0 && (
                    <>
                      <div className="font-medium text-sm mt-2">Скидки:</div>
                      {vehicle.pricing.discounts.weekly && (
                        <div className="flex justify-between text-sm ml-4">
                          <span className="text-gray-600">При аренде на неделю</span>
                          <span className="font-medium">{vehicle.pricing.discounts.weekly}%</span>
                        </div>
                      )}
                      {vehicle.pricing.discounts.monthly && (
                        <div className="flex justify-between text-sm ml-4">
                          <span className="text-gray-600">При аренде на месяц</span>
                          <span className="font-medium">{vehicle.pricing.discounts.monthly}%</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Требования */}
              <div>
                <h4 className="text-lg font-medium mb-3">Требования</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Минимальный возраст</span>
                    <span className="font-medium">{vehicle.rentalTerms.minimumAge} лет</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Требуется водительское удостоверение</span>
                    <span className="font-medium">{vehicle.rentalTerms.licenseRequired ? 'Да' : 'Нет'}</span>
                  </div>
                  {vehicle.rentalTerms.drivingExperience && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Опыт вождения</span>
                      <span className="font-medium">от {vehicle.rentalTerms.drivingExperience} лет</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Страховой депозит</span>
                    <span className="font-medium">{formatPrice(vehicle.rentalTerms.securityDeposit)}</span>
                  </div>
                </div>
              </div>

              {/* Дополнительные условия */}
              <div>
                <h4 className="text-lg font-medium mb-3">Дополнительно</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Страховка включена</span>
                    <span className="font-medium">{vehicle.rentalTerms.includesInsurance ? 'Да' : 'Нет'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Политика по топливу</span>
                    <span className="font-medium">
                      {vehicle.rentalTerms.fuelPolicy === 'full-to-full' && 'Полный-Полный'}
                      {vehicle.rentalTerms.fuelPolicy === 'full-to-empty' && 'Полный-Пустой'}
                      {vehicle.rentalTerms.fuelPolicy === 'as-received' && 'Как при получении'}
                      {vehicle.rentalTerms.fuelPolicy === 'pre-purchase' && 'Предоплата за топливо'}
                    </span>
                  </div>
                  {vehicle.rentalTerms.mileageLimit && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Ограничение пробега</span>
                      <span className="font-medium">{vehicle.rentalTerms.mileageLimit} км</span>
                    </div>
                  )}
                  {vehicle.location.deliveryAvailable && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Доставка</span>
                      <span className="font-medium">
                        Доступна {vehicle.location.deliveryFee ? `(${formatPrice(vehicle.location.deliveryFee)})` : '(бесплатно)'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Подвал с кнопками */}
        <div className="p-4 md:p-6 border-t bg-gray-50 rounded-b-lg">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <Link href={`/transport/${vehicle.id}`} className="text-blue-600 hover:underline text-sm">
              Смотреть полную информацию
            </Link>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
              >
                Закрыть
              </Button>
              <Link href={`/transport/${vehicle.id}/book`}>
                <Button>
                  Забронировать
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
} 