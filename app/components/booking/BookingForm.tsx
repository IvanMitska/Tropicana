'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DatePicker } from '@/app/components/ui/DatePicker';
import { Button } from '@/app/components/ui/Button';
import { ChevronLeft, ChevronRight, Calendar, Users, CreditCard, Check, Info } from 'lucide-react';
import { useAuth } from '@/app/hooks/useAuth';

// Типы данных для формы бронирования
interface BookingFormData {
  itemType: 'real-estate' | 'transport' | 'tour';
  itemId: string;
  startDate?: Date;
  endDate?: Date;
  guestCount: number;
  selectedOptions: string[];
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  notes: string;
}

interface PriceDetails {
  basePrice: number;
  optionsPrice: number;
  taxAmount: number;
  totalPrice: number;
  currency: string;
  daysCount: number;
}

interface BookingOption {
  id: string;
  name: string;
  price: number;
  description?: string;
}

interface BookingFormProps {
  itemType: 'real-estate' | 'transport' | 'tour';
  itemId: string;
  itemTitle: string;
  itemImage: string;
  basePrice: number;
  currency: string;
  options?: BookingOption[];
  maxGuests?: number;
}

export const BookingForm = ({
  itemType,
  itemId,
  itemTitle,
  itemImage,
  basePrice,
  currency,
  options = [],
  maxGuests = 10
}: BookingFormProps) => {
  // Состояния
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [priceDetails, setPriceDetails] = useState<PriceDetails | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [sessionUrl, setSessionUrl] = useState<string | null>(null);
  
  // Начальное состояние формы
  const [formData, setFormData] = useState<BookingFormData>({
    itemType,
    itemId,
    startDate: undefined,
    endDate: undefined,
    guestCount: 1,
    selectedOptions: [],
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    },
    notes: ''
  });
  
  const router = useRouter();
  const { user } = useAuth();
  
  // Получение недоступных дат при загрузке компонента
  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const response = await fetch('/api/bookings/check-availability', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            itemType, 
            itemId, 
            startDate: new Date(), 
            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) 
          })
        });
        
        const data = await response.json();
        
        if (data.success && !data.isAvailable) {
          // Преобразуем строки дат в объекты Date
          const dates = data.overlappingDates.flatMap((range: any) => {
            const start = new Date(range.startDate);
            const end = new Date(range.endDate);
            const dateArray: Date[] = [];
            let currentDate = new Date(start);
            
            while (currentDate <= end) {
              dateArray.push(new Date(currentDate));
              currentDate.setDate(currentDate.getDate() + 1);
            }
            
            return dateArray;
          });
          
          setUnavailableDates(dates);
        }
      } catch (error) {
        console.error('Ошибка при получении недоступных дат:', error);
        toast.error('Не удалось загрузить информацию о доступности');
      }
    };
    
    fetchUnavailableDates();
  }, [itemType, itemId]);
  
  // Предзаполняем данные пользователя, если он авторизован
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        contactInfo: {
          name: user.name || prev.contactInfo.name,
          email: user.email || prev.contactInfo.email,
          phone: user.phone || prev.contactInfo.phone
        }
      }));
    }
  }, [user]);
  
  // Расчет стоимости при изменении дат или опций
  useEffect(() => {
    const calculatePrice = async () => {
      if (formData.startDate && formData.endDate) {
        setIsLoading(true);
        try {
          const response = await fetch('/api/bookings/calculate-price', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              itemType,
              itemId,
              startDate: formData.startDate,
              endDate: formData.endDate,
              options: formData.selectedOptions,
              guestCount: formData.guestCount
            })
          });
          
          const data = await response.json();
          
          if (data.success) {
            setPriceDetails(data.price);
          } else {
            toast.error(data.message || 'Ошибка при расчете стоимости');
          }
        } catch (error) {
          console.error('Ошибка при расчете стоимости:', error);
          toast.error('Не удалось рассчитать стоимость');
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    calculatePrice();
  }, [
    formData.startDate, 
    formData.endDate, 
    formData.selectedOptions, 
    formData.guestCount,
    itemType,
    itemId
  ]);
  
  // Обработчики изменения полей формы
  const handleDateChange = (dates: { startDate?: Date; endDate?: Date }) => {
    setFormData(prev => ({ ...prev, ...dates }));
  };
  
  const handleGuestCountChange = (count: number) => {
    if (count >= 1 && count <= maxGuests) {
      setFormData(prev => ({ ...prev, guestCount: count }));
    }
  };
  
  const handleOptionToggle = (optionId: string) => {
    setFormData(prev => {
      const isSelected = prev.selectedOptions.includes(optionId);
      
      return {
        ...prev,
        selectedOptions: isSelected
          ? prev.selectedOptions.filter(id => id !== optionId)
          : [...prev.selectedOptions, optionId]
      };
    });
  };
  
  const handleContactInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'notes') {
      setFormData(prev => ({ ...prev, notes: value }));
    } else {
      setFormData(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [name]: value
        }
      }));
    }
  };
  
  // Функция для перехода к следующему шагу
  const goToNextStep = () => {
    if (currentStep === 1 && (!formData.startDate || !formData.endDate)) {
      toast.error('Пожалуйста, выберите даты бронирования');
      return;
    }
    
    if (currentStep === 2 && !user) {
      if (!formData.contactInfo.name || !formData.contactInfo.email || !formData.contactInfo.phone) {
        toast.error('Пожалуйста, заполните все контактные данные');
        return;
      }
      
      // Простая валидация email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.contactInfo.email)) {
        toast.error('Пожалуйста, введите корректный email');
        return;
      }
    }
    
    if (currentStep === 3) {
      createBooking();
      return;
    }
    
    if (currentStep === 4) {
      handlePayment();
      return;
    }
    
    setCurrentStep(prev => prev + 1);
  };
  
  // Функция для перехода к предыдущему шагу
  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  // Создание бронирования
  const createBooking = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setBookingId(data.booking._id);
        toast.success('Бронирование успешно создано');
        setCurrentStep(prev => prev + 1);
      } else {
        toast.error(data.message || 'Ошибка при создании бронирования');
      }
    } catch (error) {
      console.error('Ошибка при создании бронирования:', error);
      toast.error('Не удалось создать бронирование');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Обработка платежа
  const handlePayment = async () => {
    if (!bookingId) {
      toast.error('Отсутствует ID бронирования');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/bookings/${bookingId}/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethod: 'card' })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Если есть URL для оплаты, перенаправляем на него
        if (data.url) {
          setSessionUrl(data.url);
          window.location.href = data.url;
        } else {
          setCurrentStep(prev => prev + 1);
        }
      } else {
        toast.error(data.message || 'Ошибка при создании платежа');
      }
    } catch (error) {
      console.error('Ошибка при создании платежа:', error);
      toast.error('Не удалось создать платежную сессию');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Шаги формы
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Выберите даты
            </h3>
            
            <div className="mb-4">
              <DatePicker
                startDate={formData.startDate}
                endDate={formData.endDate}
                onDateChange={handleDateChange}
                disabledDates={unavailableDates}
                className="w-full"
              />
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Количество гостей
              </h4>
              <div className="flex items-center">
                <button
                  type="button"
                  className="p-2 border rounded-l-md hover:bg-gray-100"
                  onClick={() => handleGuestCountChange(formData.guestCount - 1)}
                  disabled={formData.guestCount <= 1}
                >
                  -
                </button>
                <span className="px-4 py-2 border-t border-b">
                  {formData.guestCount}
                </span>
                <button
                  type="button"
                  className="p-2 border rounded-r-md hover:bg-gray-100"
                  onClick={() => handleGuestCountChange(formData.guestCount + 1)}
                  disabled={formData.guestCount >= maxGuests}
                >
                  +
                </button>
              </div>
            </div>
            
            {options.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Дополнительные опции</h4>
                <div className="space-y-2">
                  {options.map(option => (
                    <div key={option.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`option-${option.id}`}
                        checked={formData.selectedOptions.includes(option.id)}
                        onChange={() => handleOptionToggle(option.id)}
                        className="rounded text-primary focus:ring-primary"
                      />
                      <label htmlFor={`option-${option.id}`} className="text-sm">
                        {option.name} (+{option.price} {currency})
                        {option.description && (
                          <p className="text-xs text-gray-500">{option.description}</p>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Контактная информация</h3>
            
            {!user && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm">
                <p className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-yellow-500" />
                  Рекомендуем <a href="/login" className="text-primary hover:underline">войти</a> или <a href="/register" className="text-primary hover:underline">зарегистрироваться</a> для упрощения процесса бронирования.
                </p>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Имя
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.contactInfo.name}
                  onChange={handleContactInfoChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  disabled={!!user}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.contactInfo.email}
                  onChange={handleContactInfoChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  disabled={!!user}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium">
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.contactInfo.phone}
                  onChange={handleContactInfoChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium">
                  Комментарии к бронированию (опционально)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleContactInfoChange}
                  rows={3}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Info className="h-5 w-5" />
              Проверьте детали бронирования
            </h3>
            
            <div className="border rounded-md overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h4 className="font-medium">{itemTitle}</h4>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Даты</span>
                  <span>
                    {formData.startDate?.toLocaleDateString()} - {formData.endDate?.toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Количество гостей</span>
                  <span>{formData.guestCount}</span>
                </div>
                
                {formData.selectedOptions.length > 0 && (
                  <div>
                    <span className="text-gray-600 block mb-1">Дополнительные опции</span>
                    <ul className="text-sm">
                      {formData.selectedOptions.map(optionId => {
                        const option = options.find(o => o.id === optionId);
                        return option ? (
                          <li key={optionId} className="flex justify-between">
                            <span>{option.name}</span>
                            <span>{option.price} {currency}</span>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  </div>
                )}
                
                {priceDetails && (
                  <div className="border-t pt-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Базовая стоимость</span>
                        <span>{priceDetails.basePrice} {priceDetails.currency}</span>
                      </div>
                      
                      {priceDetails.optionsPrice > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Дополнительные опции</span>
                          <span>{priceDetails.optionsPrice} {priceDetails.currency}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Налоги и сборы</span>
                        <span>{priceDetails.taxAmount} {priceDetails.currency}</span>
                      </div>
                      
                      <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                        <span>Итого</span>
                        <span>{priceDetails.totalPrice} {priceDetails.currency}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Контактные данные</h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-600">Имя:</span> {formData.contactInfo.name}</p>
                <p><span className="text-gray-600">Email:</span> {formData.contactInfo.email}</p>
                <p><span className="text-gray-600">Телефон:</span> {formData.contactInfo.phone}</p>
                {formData.notes && (
                  <p><span className="text-gray-600">Комментарий:</span> {formData.notes}</p>
                )}
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Оплата
            </h3>
            
            {priceDetails && (
              <div className="border rounded-md p-4">
                <div className="flex justify-between font-semibold mb-4">
                  <span>Итоговая сумма</span>
                  <span>{priceDetails.totalPrice} {priceDetails.currency}</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  Для оплаты вы будете перенаправлены на страницу платежной системы Stripe.
                </p>
                
                <div className="flex justify-center">
                  <Button
                    className="w-full"
                    isLoading={isLoading}
                    onClick={handlePayment}
                  >
                    Перейти к оплате
                  </Button>
                </div>
              </div>
            )}
            
            <div className="text-sm text-gray-500">
              <p className="flex items-center gap-1 mb-2">
                <Check className="h-4 w-4 text-green-500" />
                Безопасная оплата через Stripe
              </p>
              <p className="flex items-center gap-1">
                <Check className="h-4 w-4 text-green-500" />
                Мгновенное подтверждение бронирования
              </p>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Check className="h-8 w-8 text-green-500" />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold">Спасибо за бронирование!</h3>
            
            <p>
              {sessionUrl
                ? 'После успешной оплаты вы получите подтверждение на указанный email.'
                : 'Ваше бронирование подтверждено. Детали отправлены на указанный email.'}
            </p>
            
            <div className="flex flex-col gap-3 mt-6">
              {bookingId && (
                <Button
                  onClick={() => router.push(`/bookings/${bookingId}`)}
                  variant="outline"
                >
                  Просмотреть детали бронирования
                </Button>
              )}
              
              <Button onClick={() => router.push('/')}>
                Вернуться на главную
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  // Шаги процесса бронирования
  const steps = [
    { title: 'Даты', icon: <Calendar className="h-4 w-4" /> },
    { title: 'Информация', icon: <Info className="h-4 w-4" /> },
    { title: 'Проверка', icon: <Check className="h-4 w-4" /> },
    { title: 'Оплата', icon: <CreditCard className="h-4 w-4" /> },
    { title: 'Подтверждение', icon: <Check className="h-4 w-4" /> }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Заголовок */}
      <div className="bg-primary text-white p-4">
        <h2 className="text-xl font-bold">Бронирование</h2>
      </div>
      
      {/* Прогресс бронирования */}
      <div className="px-4 py-3 border-b">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center ${
                index + 1 === currentStep 
                  ? 'text-primary' 
                  : index + 1 < currentStep 
                    ? 'text-green-500' 
                    : 'text-gray-400'
              }`}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  index + 1 === currentStep 
                    ? 'bg-primary text-white' 
                    : index + 1 < currentStep 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1 < currentStep ? <Check className="h-4 w-4" /> : step.icon}
              </div>
              <span className="text-xs hidden md:block">{step.title}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Содержимое текущего шага */}
      <div className="p-6">
        {renderStep()}
      </div>
      
      {/* Кнопки навигации */}
      {currentStep < 5 && (
        <div className="p-4 border-t flex justify-between">
          <Button
            variant="outline"
            onClick={goToPrevStep}
            disabled={currentStep === 1 || isLoading}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Назад
          </Button>
          
          <Button
            onClick={goToNextStep}
            isLoading={isLoading}
          >
            {currentStep === 3 ? 'Создать бронирование' : 
             currentStep === 4 ? 'Перейти к оплате' : 'Далее'}
            {currentStep < 3 && <ChevronRight className="h-4 w-4 ml-1" />}
          </Button>
        </div>
      )}
    </div>
  );
}; 