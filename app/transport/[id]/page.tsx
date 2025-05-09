'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { format, addDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import MainLayout from '@/app/components/layout/MainLayout';
import { Vehicle, VehicleAvailability } from '@/app/models/Vehicle';
import VehicleAvailabilityCalendar from '@/app/components/transport/VehicleAvailabilityCalendar';
import { Button } from '@/app/components/ui/Button';
import { Modal } from '@/app/components/ui/Modal';
import { Input } from '@/app/components/ui/Input';
import { 
  Star as StarIcon, 
  User as UserIcon, 
  CarFront as CarFrontIcon, 
  Calendar as CalendarIcon, 
  Fuel, 
  Gauge as GaugeIcon, 
  Settings as CogIcon, 
  Clock as ClockIcon, 
  MapPin as MapPinIcon,
  MessageSquare as MessageIcon,
  Plus as PlusIcon,
  Minus as MinusIcon,
  CreditCard as CreditCardIcon,
  ShieldCheck as ShieldIcon,
  Maximize2 as MaximizeIcon
} from 'lucide-react';
import Link from 'next/link';

export default function VehicleDetailPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  
  // Состояние для формы бронирования
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [additionalOptions, setAdditionalOptions] = useState<{[key: string]: boolean}>({
    childSeat: false,
    insurance: false,
    gps: false,
    delivery: false
  });
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [availability, setAvailability] = useState<VehicleAvailability[]>([]);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  
  // Получение данных о транспортном средстве
  useEffect(() => {
    async function fetchVehicleData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/vehicles/${id}`);
        
        if (!response.ok) {
          throw new Error('Не удалось загрузить данные о транспортном средстве');
        }
        
        const data = await response.json();
        setVehicle(data);
      } catch (error) {
        console.error('Error fetching vehicle:', error);
        setError('Произошла ошибка при загрузке данных о транспортном средстве');
      } finally {
        setLoading(false);
      }
    }
    
    if (id) {
      fetchVehicleData();
    }
  }, [id]);
  
  // Проверка доступности транспортного средства на выбранные даты
  const checkAvailability = async (startDate: string, endDate: string) => {
    setIsCheckingAvailability(true);
    try {
      const response = await fetch(`/api/vehicles/availability/${id}?startDate=${startDate}&endDate=${endDate}`);
      
      if (!response.ok) {
        throw new Error('Не удалось проверить доступность');
      }
      
      const data = await response.json();
      setAvailability(data.availability || []);
      
      // Проверяем, все ли даты доступны
      const allDatesAvailable = data.availability?.every((item: VehicleAvailability) => item.available) || false;
      setIsAvailable(allDatesAvailable);
      
      return data.availability;
    } catch (error) {
      console.error('Error checking availability:', error);
      setIsAvailable(false);
      return [];
    } finally {
      setIsCheckingAvailability(false);
    }
  };
  
  // Обработчик выбора дат в календаре
  const handleDateSelection = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    checkAvailability(start, end);
    calculateTotalPrice(start, end);
  };
  
  // Расчет общей стоимости
  const calculateTotalPrice = (start: string, end: string) => {
    if (!vehicle) return;
    
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const daysDiff = Math.ceil((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    let price = vehicle.pricing.daily * daysDiff;
    
    // Добавляем стоимость дополнительных опций
    if (additionalOptions.childSeat && vehicle.pricing.additionalFees?.childSeat) {
      price += vehicle.pricing.additionalFees.childSeat;
    }
    if (additionalOptions.insurance && vehicle.pricing.additionalFees?.insurance) {
      price += vehicle.pricing.additionalFees.insurance;
    }
    if (additionalOptions.gps && vehicle.pricing.additionalFees?.gps) {
      price += vehicle.pricing.additionalFees.gps;
    }
    if (additionalOptions.delivery && vehicle.pricing.additionalFees?.delivery) {
      price += vehicle.pricing.additionalFees.delivery;
    }
    
    setTotalPrice(price);
  };
  
  // Обработчик изменения дополнительных опций
  const handleOptionChange = (option: string) => {
    setAdditionalOptions(prev => {
      const newOptions = { ...prev, [option]: !prev[option] };
      calculateTotalPrice(startDate, endDate);
      return newOptions;
    });
  };
  
  // Переход на страницу бронирования
  const handleBooking = () => {
    if (!startDate || !endDate || !isAvailable) return;
    
    const bookingData = {
      vehicleId: id,
      startDate,
      endDate,
      options: additionalOptions,
      totalPrice
    };
    
    // Сохраняем данные в localStorage для использования на странице бронирования
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    
    router.push(`/transport/${id}/book`);
  };
  
  // Функции форматирования данных
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  const formatDate = (dateString: string): string => {
    return format(new Date(dateString), 'd MMMM yyyy', { locale: ru });
  };
  
  // Если данные загружаются, показываем индикатор загрузки
  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 px-4">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded-md w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded-md w-1/2 mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded-md w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded-md w-full"></div>
                <div className="h-6 bg-gray-200 rounded-md w-full"></div>
                <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
                <div className="h-12 bg-gray-200 rounded-md w-1/3 mt-6"></div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Если произошла ошибка, показываем сообщение об ошибке
  if (error || !vehicle) {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 px-4">
          <div className="text-center py-12">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              {error || 'Транспортное средство не найдено'}
            </h1>
            <p className="text-gray-600 mb-8">
              Не удалось загрузить информацию о транспортном средстве
            </p>
            <Button onClick={() => router.push('/transport')}>
              Вернуться к каталогу
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Компонент для полноэкранной галереи
  const GalleryModal = () => (
    <Modal 
      isOpen={showGalleryModal} 
      onClose={() => setShowGalleryModal(false)}
      size="xl"
      title="Галерея изображений"
    >
      <div className="flex flex-col items-center">
        <div className="relative w-full h-[60vh] mb-4">
          <Image
            src={vehicle.images[activeImageIndex]?.url || '/images/car1.jpg'}
            alt={vehicle.images[activeImageIndex]?.alt || vehicle.title}
            fill
            className="object-contain"
          />
        </div>
        <div className="grid grid-cols-6 gap-2 w-full">
          {vehicle.images.map((image, index) => (
            <button
              key={image.id}
              className={`relative aspect-[4/3] rounded-md overflow-hidden border-2 ${
                index === activeImageIndex ? 'border-blue-500' : 'border-transparent'
              }`}
              onClick={() => setActiveImageIndex(index)}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        {/* Заголовок и основная информация */}
        <header className="mb-8">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{vehicle.title}</h1>
              <p className="text-gray-600 flex items-center mt-1">
                <MapPinIcon className="h-4 w-4 mr-1" />
                {vehicle.location.address}, {vehicle.location.city}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">
                {formatPrice(vehicle.pricing.daily)}
              </div>
              <p className="text-gray-600">за сутки</p>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex items-center mr-4">
              <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
              <span className="font-medium">{vehicle.rating.toFixed(1)}</span>
              <span className="text-gray-600 ml-1">({vehicle.reviews.length} отзывов)</span>
            </div>
            <div className="text-gray-600">
              <span className="mr-2">•</span>
              {vehicle.viewCount} просмотров
            </div>
          </div>
        </header>
        
        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Галерея изображений и информация */}
          <div className="lg:col-span-2">
            {/* Галерея */}
            <div className="mb-8">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-2 group">
                <Image
                  src={vehicle.images[activeImageIndex]?.url || '/images/car1.jpg'}
                  alt={vehicle.images[activeImageIndex]?.alt || vehicle.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button 
                  className="absolute top-4 right-4 bg-white bg-opacity-80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={() => setShowGalleryModal(true)}
                >
                  <MaximizeIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {vehicle.images.slice(0, 5).map((image, index) => (
                  <button
                    key={image.id}
                    className={`relative aspect-[4/3] rounded-md overflow-hidden border-2 transition-all duration-300 ${
                      index === activeImageIndex ? 'border-blue-500 scale-[1.02]' : 'border-transparent hover:border-gray-300'
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Описание */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Описание</h2>
              <p className="text-gray-700 leading-relaxed">{vehicle.description}</p>
            </div>
            
            {/* Характеристики */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Характеристики</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6">
                <div className="flex items-start">
                  <CarFrontIcon className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Марка и модель</div>
                    <div className="font-medium">{vehicle.make} {vehicle.model}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CalendarIcon className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Год выпуска</div>
                    <div className="font-medium">{vehicle.year}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CogIcon className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Мощность</div>
                    <div className="font-medium">{vehicle.specifications.power} л.с.</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <UserIcon className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Вместимость</div>
                    <div className="font-medium">{vehicle.specifications.capacity} чел.</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Fuel className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Расход топлива</div>
                    <div className="font-medium">{vehicle.specifications.fuelConsumption} л/100км</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <GaugeIcon className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Макс. скорость</div>
                    <div className="font-medium">{vehicle.specifications.maxSpeed} км/ч</div>
                  </div>
                </div>
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
            
            {/* Дополнительные функции */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Дополнительные функции</h2>
              <div className="flex flex-wrap gap-2">
                {vehicle.features.map((feature, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Информация о владельце */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">О владельце</h2>
              <div className="flex items-start">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                  <Image
                    src={vehicle.owner.avatar || '/images/default-avatar.jpg'}
                    alt={vehicle.owner.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{vehicle.owner.name}</h3>
                  <div className="flex items-center mt-1 mb-2">
                    <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">Рейтинг: {vehicle.owner.responseRate.toFixed(1)}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-600">С нами с {format(new Date(vehicle.owner.since), 'MMMM yyyy', { locale: ru })}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Время ответа: {vehicle.owner.responseTime}</p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      <MessageIcon className="h-4 w-4 mr-2" />
                      Связаться
                    </Button>
                    <Button variant="outline" size="sm">
                      Другие предложения
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Правила и условия */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Правила и условия</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Требования</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Минимальный возраст: {vehicle.rentalTerms.minimumAge} лет</li>
                    <li>• Водительское удостоверение: {vehicle.rentalTerms.licenseRequired ? 'Требуется' : 'Не требуется'}</li>
                    {vehicle.rentalTerms.drivingExperience && (
                      <li>• Стаж вождения: от {vehicle.rentalTerms.drivingExperience} лет</li>
                    )}
                    <li>• Залог: {formatPrice(vehicle.rentalTerms.securityDeposit)}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Запрещено</h3>
                  <ul className="space-y-2 text-gray-600">
                    {vehicle.rentalTerms.prohibitedUsage.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Отзывы */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Отзывы</h2>
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="font-medium">{vehicle.rating.toFixed(1)}</span>
                  <span className="text-gray-600 ml-1">({vehicle.reviews.length} отзывов)</span>
                </div>
              </div>
              
              {vehicle.reviews.length > 0 ? (
                <div className="space-y-4">
                  {vehicle.reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                            <Image
                              src={review.userAvatar || '/images/default-avatar.jpg'}
                              alt={review.userName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{review.userName}</h4>
                            <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="font-medium">{review.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <p className="mt-3 text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                  
                  {vehicle.reviews.length > 3 && (
                    <Button variant="outline" className="w-full">
                      Показать все отзывы ({vehicle.reviews.length})
                    </Button>
                  )}
                </div>
              ) : (
                <p className="text-gray-600">Пока нет отзывов об этом транспортном средстве.</p>
              )}
            </div>
          </div>
          
          {/* Боковая панель с бронированием */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Забронировать</h2>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-700">Стоимость аренды:</div>
                    <div className="font-medium">{formatPrice(vehicle.pricing.daily)} / сутки</div>
                  </div>
                  
                  {vehicle.pricing.hourly && (
                    <div className="flex items-center justify-between mt-1">
                      <div className="text-gray-700">Почасовая аренда:</div>
                      <div className="font-medium">{formatPrice(vehicle.pricing.hourly)} / час</div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-gray-700">Залог:</div>
                    <div className="font-medium">{formatPrice(vehicle.pricing.deposit)}</div>
                  </div>
                </div>
                
                {/* Календарь */}
                <div className="mb-6">
                  <VehicleAvailabilityCalendar 
                    availability={vehicle.availability}
                    onSelectDates={handleDateSelection}
                    className="border rounded-lg"
                  />
                </div>
                
                {/* Дополнительные опции */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-3">Дополнительные опции</h3>
                  
                  <div className="space-y-2">
                    {vehicle.pricing.additionalFees?.childSeat && (
                      <div className="flex items-center justify-between">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={additionalOptions.childSeat}
                            onChange={() => handleOptionChange('childSeat')}
                            className="mr-2"
                          />
                          <span>Детское кресло</span>
                        </label>
                        <span className="text-gray-700">+{formatPrice(vehicle.pricing.additionalFees.childSeat)}</span>
                      </div>
                    )}
                    
                    {vehicle.pricing.additionalFees?.insurance && (
                      <div className="flex items-center justify-between">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={additionalOptions.insurance}
                            onChange={() => handleOptionChange('insurance')}
                            className="mr-2"
                          />
                          <span>Дополнительная страховка</span>
                        </label>
                        <span className="text-gray-700">+{formatPrice(vehicle.pricing.additionalFees.insurance)}</span>
                      </div>
                    )}
                    
                    {vehicle.pricing.additionalFees?.gps && (
                      <div className="flex items-center justify-between">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={additionalOptions.gps}
                            onChange={() => handleOptionChange('gps')}
                            className="mr-2"
                          />
                          <span>GPS-навигатор</span>
                        </label>
                        <span className="text-gray-700">+{formatPrice(vehicle.pricing.additionalFees.gps)}</span>
                      </div>
                    )}
                    
                    {vehicle.pricing.additionalFees?.delivery && (
                      <div className="flex items-center justify-between">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={additionalOptions.delivery}
                            onChange={() => handleOptionChange('delivery')}
                            className="mr-2"
                          />
                          <span>Доставка</span>
                        </label>
                        <span className="text-gray-700">+{formatPrice(vehicle.pricing.additionalFees.delivery)}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Итоговая сумма */}
                {startDate && endDate && (
                  <div className="mb-6 border-t border-b py-4">
                    <div className="flex justify-between font-medium mb-2">
                      <div>Период аренды:</div>
                      <div>{formatDate(startDate)} - {formatDate(endDate)}</div>
                    </div>
                    <div className="flex justify-between text-lg font-semibold">
                      <div>Итого:</div>
                      <div>{formatPrice(totalPrice)}</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-right">Включая все сборы и налоги</div>
                  </div>
                )}
                
                <Button
                  className="w-full"
                  disabled={!startDate || !endDate || !isAvailable || isCheckingAvailability}
                  isLoading={isCheckingAvailability}
                  onClick={handleBooking}
                >
                  {isCheckingAvailability ? 'Проверка доступности...' :
                    !startDate || !endDate ? 'Выберите даты аренды' :
                    isAvailable === false ? 'Недоступно на выбранные даты' :
                    'Забронировать'}
                </Button>
                
                {isAvailable === false && (
                  <div className="text-red-500 text-sm mt-2 text-center">
                    Транспортное средство недоступно на выбранные даты
                  </div>
                )}
              </div>
              
              {/* Информация о безопасности */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-medium text-gray-800 flex items-center mb-3">
                  <ShieldIcon className="h-5 w-5 mr-2 text-green-500" />
                  Безопасная аренда
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Проверенные владельцы</li>
                  <li>• Безопасные платежи</li>
                  <li>• Страхование включено</li>
                  <li>• Поддержка 24/7</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Похожие транспортные средства */}
        {vehicle.similar && vehicle.similar.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Похожие предложения</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Здесь будут карточки похожих транспортных средств */}
            </div>
          </div>
        )}
      </div>
      
      {/* Модальное окно с галереей */}
      <GalleryModal />
    </MainLayout>
  );
} 