'use client';

import React, { useState } from 'react';
import { 
  Info as InfoIcon, 
  Truck as TruckIcon, 
  Shield as ShieldIcon, 
  MapPin as MapPinIcon, 
  Star as StarIcon
} from 'lucide-react';
import { Vehicle } from '@/app/models/Vehicle';
import VehicleReviews from './VehicleReviews';
import VehicleMap from './VehicleMap';

interface VehicleDetailTabsProps {
  vehicle: Vehicle;
  className?: string;
}

type TabType = 'details' | 'reviews' | 'map' | 'terms' | 'delivery';

interface TabItem {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

export default function VehicleDetailTabs({ vehicle, className = '' }: VehicleDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('details');
  
  // Список доступных вкладок
  const tabs: TabItem[] = [
    {
      id: 'details',
      label: 'Характеристики',
      icon: <InfoIcon className="h-4 w-4" />
    },
    {
      id: 'reviews',
      label: 'Отзывы',
      icon: <StarIcon className="h-4 w-4" />
    },
    {
      id: 'map',
      label: 'Расположение',
      icon: <MapPinIcon className="h-4 w-4" />
    },
    {
      id: 'terms',
      label: 'Условия',
      icon: <ShieldIcon className="h-4 w-4" />
    },
    {
      id: 'delivery',
      label: 'Доставка',
      icon: <TruckIcon className="h-4 w-4" />
    }
  ];
  
  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      {/* Вкладки */}
      <div className="border-b">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`px-4 py-3 flex items-center whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 font-medium'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
              {tab.id === 'reviews' && (
                <span className="ml-1 text-sm">({vehicle.reviews.length})</span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Содержимое активной вкладки */}
      <div className="p-6">
        {activeTab === 'details' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Технические характеристики</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {/* Основная информация */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Основная информация</h4>
                <dl className="space-y-2">
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <dt className="text-gray-600">Марка</dt>
                    <dd className="font-medium">{vehicle.make}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <dt className="text-gray-600">Модель</dt>
                    <dd className="font-medium">{vehicle.model}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <dt className="text-gray-600">Год выпуска</dt>
                    <dd className="font-medium">{vehicle.year}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <dt className="text-gray-600">Тип транспорта</dt>
                    <dd className="font-medium">{vehicle.type}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <dt className="text-gray-600">Цвет</dt>
                    <dd className="font-medium">{vehicle.color}</dd>
                  </div>
                </dl>
              </div>
              
              {/* Технические характеристики */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Технические характеристики</h4>
                <dl className="space-y-2">
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <dt className="text-gray-600">Мощность</dt>
                    <dd className="font-medium">{vehicle.specifications.power} л.с.</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <dt className="text-gray-600">Тип топлива</dt>
                    <dd className="font-medium">
                      {vehicle.specifications.fuelType === 'gasoline' && 'Бензин'}
                      {vehicle.specifications.fuelType === 'diesel' && 'Дизель'}
                      {vehicle.specifications.fuelType === 'electric' && 'Электро'}
                      {vehicle.specifications.fuelType === 'hybrid' && 'Гибрид'}
                      {vehicle.specifications.fuelType === 'other' && 'Другое'}
                    </dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <dt className="text-gray-600">Расход топлива</dt>
                    <dd className="font-medium">
                      {vehicle.specifications.fuelType === 'electric'
                        ? `${vehicle.specifications.fuelConsumption} кВт·ч/100км`
                        : `${vehicle.specifications.fuelConsumption} л/100км`}
                    </dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <dt className="text-gray-600">Трансмиссия</dt>
                    <dd className="font-medium">
                      {vehicle.specifications.transmission === 'automatic' && 'Автоматическая'}
                      {vehicle.specifications.transmission === 'manual' && 'Механическая'}
                      {vehicle.specifications.transmission === 'semiautomatic' && 'Полуавтоматическая'}
                    </dd>
                  </div>
                  {vehicle.specifications.driveType && (
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <dt className="text-gray-600">Привод</dt>
                      <dd className="font-medium">
                        {vehicle.specifications.driveType === 'fwd' && 'Передний'}
                        {vehicle.specifications.driveType === 'rwd' && 'Задний'}
                        {vehicle.specifications.driveType === 'awd' && 'Полный'}
                        {vehicle.specifications.driveType === '4wd' && '4х4'}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
              
              {/* Размеры и прочее */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Размеры и вместимость</h4>
                <dl className="space-y-2">
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <dt className="text-gray-600">Вместимость</dt>
                    <dd className="font-medium">{vehicle.specifications.capacity} чел.</dd>
                  </div>
                  {vehicle.specifications.doors && (
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <dt className="text-gray-600">Количество дверей</dt>
                      <dd className="font-medium">{vehicle.specifications.doors}</dd>
                    </div>
                  )}
                  {vehicle.specifications.length && (
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <dt className="text-gray-600">Длина</dt>
                      <dd className="font-medium">{vehicle.specifications.length} м</dd>
                    </div>
                  )}
                  {vehicle.specifications.width && (
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <dt className="text-gray-600">Ширина</dt>
                      <dd className="font-medium">{vehicle.specifications.width} м</dd>
                    </div>
                  )}
                  {vehicle.specifications.height && (
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <dt className="text-gray-600">Высота</dt>
                      <dd className="font-medium">{vehicle.specifications.height} м</dd>
                    </div>
                  )}
                  {vehicle.specifications.weight && (
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <dt className="text-gray-600">Вес</dt>
                      <dd className="font-medium">{vehicle.specifications.weight} кг</dd>
                    </div>
                  )}
                  {vehicle.specifications.luggage && (
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <dt className="text-gray-600">Багажник</dt>
                      <dd className="font-medium">{vehicle.specifications.luggage} л</dd>
                    </div>
                  )}
                </dl>
              </div>
              
              {/* Дополнительная информация */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Динамические характеристики</h4>
                <dl className="space-y-2">
                  {vehicle.specifications.maxSpeed && (
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <dt className="text-gray-600">Максимальная скорость</dt>
                      <dd className="font-medium">{vehicle.specifications.maxSpeed} км/ч</dd>
                    </div>
                  )}
                  {vehicle.specifications.acceleration && (
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <dt className="text-gray-600">Разгон до 100 км/ч</dt>
                      <dd className="font-medium">{vehicle.specifications.acceleration} сек.</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
            
            {/* Дополнительные функции */}
            <div className="mt-8">
              <h4 className="font-medium text-gray-700 mb-3">Дополнительные функции и особенности</h4>
              <div className="flex flex-wrap gap-2">
                {vehicle.features.map((feature, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <VehicleReviews 
            reviews={vehicle.reviews} 
            rating={vehicle.rating} 
            canAddReview={true}
            onAddReview={() => console.log('Add review clicked')} 
          />
        )}
        
        {activeTab === 'map' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Местоположение</h3>
            <p className="mb-4">{vehicle.location.address}, {vehicle.location.city}</p>
            <div className="h-[400px] w-full rounded-lg overflow-hidden">
              <VehicleMap 
                lat={vehicle.location.lat} 
                lng={vehicle.location.lng} 
                title={vehicle.title}
              />
            </div>
            
            {vehicle.location.deliveryAvailable && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-blue-800">
                  Доступна доставка в пределах {vehicle.location.serviceRadius || 30} км
                  {vehicle.location.deliveryFee ? ` за ${vehicle.location.deliveryFee} руб.` : ' (бесплатно)'}
                </p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'terms' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Условия аренды</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Требования */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Требования к арендатору</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Минимальный возраст: {vehicle.rentalTerms.minimumAge} лет</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>
                      Водительское удостоверение: {vehicle.rentalTerms.licenseRequired ? 'Требуется' : 'Не требуется'}
                      {vehicle.rentalTerms.licenseType && ` (${vehicle.rentalTerms.licenseType})`}
                    </span>
                  </li>
                  {vehicle.rentalTerms.drivingExperience && (
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Стаж вождения: от {vehicle.rentalTerms.drivingExperience} лет</span>
                    </li>
                  )}
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Страховой депозит: {new Intl.NumberFormat('ru-RU', {
                      style: 'currency',
                      currency: 'RUB',
                      maximumFractionDigits: 0,
                    }).format(vehicle.rentalTerms.securityDeposit)}</span>
                  </li>
                </ul>
              </div>
              
              {/* Правила */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Правила и ограничения</h4>
                <ul className="space-y-2 text-gray-600">
                  {vehicle.rentalTerms.prohibitedUsage.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                  
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>
                      Политика по топливу: {
                        vehicle.rentalTerms.fuelPolicy === 'full-to-full' ? 'Полный бак - полный бак' :
                        vehicle.rentalTerms.fuelPolicy === 'full-to-empty' ? 'Полный бак - любой остаток' :
                        vehicle.rentalTerms.fuelPolicy === 'as-received' ? 'Как получено' :
                        vehicle.rentalTerms.fuelPolicy === 'pre-purchase' ? 'Предоплата за топливо' : 
                        vehicle.rentalTerms.fuelPolicy
                      }
                    </span>
                  </li>
                  
                  {vehicle.rentalTerms.mileageLimit && (
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Ограничение пробега: {vehicle.rentalTerms.mileageLimit} км</span>
                    </li>
                  )}
                  
                  {vehicle.rentalTerms.overtimeFee && (
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Штраф за опоздание: {new Intl.NumberFormat('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                        maximumFractionDigits: 0,
                      }).format(vehicle.rentalTerms.overtimeFee)} в час</span>
                    </li>
                  )}
                  
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>
                      Страховка: {vehicle.rentalTerms.includesInsurance ? 'Включена в стоимость' : 'Оплачивается дополнительно'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Зоны для поездок */}
            {vehicle.rentalTerms.allowedAreas && vehicle.rentalTerms.allowedAreas.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-700 mb-3">Разрешенные зоны для поездок</h4>
                <ul className="flex flex-wrap gap-2">
                  {vehicle.rentalTerms.allowedAreas.map((area, index) => (
                    <li 
                      key={index} 
                      className="px-3 py-1 bg-green-50 text-green-800 text-sm rounded-full"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'delivery' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Доставка и получение</h3>
            
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">Основное местоположение</h4>
              <p className="mb-3">{vehicle.location.address}, {vehicle.location.city}</p>
              <div className="h-[300px] w-full rounded-lg overflow-hidden mb-4">
                <VehicleMap 
                  lat={vehicle.location.lat} 
                  lng={vehicle.location.lng} 
                  title={vehicle.title}
                />
              </div>
            </div>
            
            {/* Доставка */}
            <div className="p-4 bg-gray-50 rounded-lg mb-6">
              <h4 className="font-medium text-gray-700 mb-3">Доставка</h4>
              
              {vehicle.location.deliveryAvailable ? (
                <div>
                  <p className="mb-2">
                    Владелец может доставить транспортное средство в пределах {vehicle.location.serviceRadius || 30} км от указанного местоположения.
                  </p>
                  
                  {vehicle.location.deliveryFee ? (
                    <p className="font-medium">
                      Стоимость доставки: {new Intl.NumberFormat('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                        maximumFractionDigits: 0,
                      }).format(vehicle.location.deliveryFee)}
                    </p>
                  ) : (
                    <p className="font-medium text-green-600">Доставка бесплатная</p>
                  )}
                </div>
              ) : (
                <p>Доставка недоступна. Получение возможно только в указанном месте.</p>
              )}
            </div>
            
            {/* Дополнительные места получения */}
            {vehicle.location.pickupLocations && vehicle.location.pickupLocations.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Дополнительные места получения</h4>
                <ul className="space-y-3">
                  {vehicle.location.pickupLocations.map((location, index) => (
                    <li key={index} className="p-3 border rounded-lg">
                      <p className="font-medium">{location.address}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 