'use client';

import React, { useState, useEffect } from 'react';
import { format, addDays, differenceInDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import { 
  Calendar as CalendarIcon, 
  Clock as ClockIcon,
  CreditCard as CreditCardIcon,
  Plus as PlusIcon,
  Minus as MinusIcon,
  ShieldCheck as ShieldIcon,
  ArrowRight as ArrowRightIcon
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Vehicle, VehicleAvailability } from '@/app/models/Vehicle';
import VehicleAvailabilityCalendar from './VehicleAvailabilityCalendar';

interface VehicleBookingFormProps {
  vehicle: Vehicle;
  onCheckAvailability: (startDate: string, endDate: string) => Promise<VehicleAvailability[]>;
  onBookNow: (bookingData: BookingData) => void;
  className?: string;
}

// Тип для данных бронирования
export interface BookingData {
  vehicleId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  options: {
    [key: string]: boolean;
  };
  totalPrice: number;
}

// Компонент вывода цены и информации о ней
const PriceDisplay = ({ 
  label, 
  value, 
  info 
}: { 
  label: string; 
  value: string; 
  info?: string; 
}) => (
  <div className="flex justify-between items-center">
    <div>
      <span className="text-gray-700">{label}</span>
      {info && <p className="text-xs text-gray-500">{info}</p>}
    </div>
    <div className="font-medium">{value}</div>
  </div>
);

// Компонент для выбора опций
const OptionCheckbox = ({ 
  id, 
  label, 
  price, 
  checked, 
  onChange 
}: { 
  id: string; 
  label: string; 
  price: number; 
  checked: boolean; 
  onChange: () => void; 
}) => (
  <div className="flex items-center justify-between">
    <label htmlFor={id} className="flex items-center cursor-pointer">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mr-2 h-4 w-4"
      />
      <span>{label}</span>
    </label>
    <span className="text-gray-700">
      +{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 }).format(price)}
    </span>
  </div>
);

export default function VehicleBookingForm({ 
  vehicle, 
  onCheckAvailability,
  onBookNow,
  className = ''
}: VehicleBookingFormProps) {
  // Состояние формы
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('12:00');
  const [endTime, setEndTime] = useState<string>('12:00');
  const [totalDays, setTotalDays] = useState<number>(0);
  const [options, setOptions] = useState<{[key: string]: boolean}>({
    childSeat: false,
    insurance: false,
    gps: false,
    delivery: false,
    extraDriver: false
  });
  
  // Состояние доступности и цены
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  
  // Проверка доступности при выборе дат
  const handleDateSelection = async (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    
    // Рассчитываем количество дней
    const days = differenceInDays(new Date(end), new Date(start)) + 1;
    setTotalDays(days);
    
    // Проверяем доступность
    await checkAvailability(start, end);
  };
  
  // Проверка доступности транспорта
  const checkAvailability = async (start: string, end: string) => {
    setIsCheckingAvailability(true);
    try {
      const availability = await onCheckAvailability(start, end);
      
      // Проверяем, все ли даты доступны
      const allDatesAvailable = availability?.every(item => item.available) || false;
      setIsAvailable(allDatesAvailable);
      
      return availability;
    } catch (error) {
      console.error('Error checking availability:', error);
      setIsAvailable(false);
      return [];
    } finally {
      setIsCheckingAvailability(false);
      calculateTotalPrice();
    }
  };
  
  // Расчет общей стоимости
  const calculateTotalPrice = () => {
    if (!vehicle || !startDate || !endDate) return;
    
    // Рассчитываем основную стоимость за дни
    let price = vehicle.pricing.daily * totalDays;
    
    // Добавляем стоимость дополнительных опций
    if (options.childSeat && vehicle.pricing.additionalFees?.childSeat) {
      price += vehicle.pricing.additionalFees.childSeat;
    }
    if (options.insurance && vehicle.pricing.additionalFees?.insurance) {
      price += vehicle.pricing.additionalFees.insurance;
    }
    if (options.gps && vehicle.pricing.additionalFees?.gps) {
      price += vehicle.pricing.additionalFees.gps;
    }
    if (options.delivery && vehicle.pricing.additionalFees?.delivery) {
      price += vehicle.pricing.additionalFees.delivery;
    }
    if (options.extraDriver && vehicle.pricing.additionalFees?.extraDriver) {
      price += vehicle.pricing.additionalFees.extraDriver;
    }
    
    setTotalPrice(price);
  };
  
  // Пересчет цены при изменении опций или дат
  useEffect(() => {
    calculateTotalPrice();
  }, [options, totalDays]);
  
  // Обработчик изменения опций
  const handleOptionChange = (option: string) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };
  
  // Форматирование цены
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'THB',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  // Обработчик кнопки бронирования
  const handleBookNow = () => {
    if (!startDate || !endDate || !isAvailable) return;
    
    const bookingData: BookingData = {
      vehicleId: vehicle.id,
      startDate,
      endDate,
      startTime,
      endTime,
      options,
      totalPrice
    };
    
    onBookNow(bookingData);
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Забронировать</h2>
      
      {/* Блок с ценами */}
      <div className="mb-6 space-y-2">
        <PriceDisplay 
          label="Стоимость аренды:" 
          value={`${formatPrice(vehicle.pricing.daily)} / сутки`} 
        />
        
        {vehicle.pricing.hourly && (
          <PriceDisplay 
            label="Почасовая аренда:" 
            value={`${formatPrice(vehicle.pricing.hourly)} / час`} 
          />
        )}
        
        <PriceDisplay 
          label="Залог:" 
          value={formatPrice(vehicle.pricing.deposit)}
          info="Возвращается после аренды при отсутствии повреждений" 
        />
        
        {vehicle.pricing.minimumRental > 1 && (
          <div className="text-sm text-gray-600 mt-2">
            Минимальный срок аренды: {vehicle.pricing.minimumRental} {
              vehicle.pricing.minimumRental < 24 ? 'часов' : 'суток'
            }
          </div>
        )}
      </div>
      
      {/* Календарь */}
      <div className="mb-6">
        <VehicleAvailabilityCalendar 
          availability={vehicle.availability}
          onSelectDates={handleDateSelection}
          className="border rounded-lg"
        />
      </div>
      
      {/* Время начала и окончания аренды */}
      {startDate && endDate && (
        <div className="mb-6">
          <h3 className="font-medium text-gray-800 mb-3">Время</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startTime" className="block text-sm text-gray-600 mb-1">
                Время получения
              </label>
              <div className="relative">
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="pl-8"
                />
                <ClockIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label htmlFor="endTime" className="block text-sm text-gray-600 mb-1">
                Время возврата
              </label>
              <div className="relative">
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="pl-8"
                />
                <ClockIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Дополнительные опции */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-800 mb-3">Дополнительные опции</h3>
        
        <div className="space-y-3">
          {vehicle.pricing.additionalFees?.childSeat && (
            <OptionCheckbox
              id="childSeat"
              label="Детское кресло"
              price={vehicle.pricing.additionalFees.childSeat}
              checked={options.childSeat}
              onChange={() => handleOptionChange('childSeat')}
            />
          )}
          
          {vehicle.pricing.additionalFees?.insurance && (
            <OptionCheckbox
              id="insurance"
              label="Дополнительная страховка"
              price={vehicle.pricing.additionalFees.insurance}
              checked={options.insurance}
              onChange={() => handleOptionChange('insurance')}
            />
          )}
          
          {vehicle.pricing.additionalFees?.gps && (
            <OptionCheckbox
              id="gps"
              label="GPS-навигатор"
              price={vehicle.pricing.additionalFees.gps}
              checked={options.gps}
              onChange={() => handleOptionChange('gps')}
            />
          )}
          
          {vehicle.pricing.additionalFees?.delivery && (
            <OptionCheckbox
              id="delivery"
              label="Доставка транспорта"
              price={vehicle.pricing.additionalFees.delivery}
              checked={options.delivery}
              onChange={() => handleOptionChange('delivery')}
            />
          )}
          
          {vehicle.pricing.additionalFees?.extraDriver && (
            <OptionCheckbox
              id="extraDriver"
              label="Дополнительный водитель"
              price={vehicle.pricing.additionalFees.extraDriver}
              checked={options.extraDriver}
              onChange={() => handleOptionChange('extraDriver')}
            />
          )}
        </div>
      </div>
      
      {/* Итоговая сумма */}
      {startDate && endDate && (
        <div className="mb-6 border-t border-b py-4">
          <div className="flex justify-between font-medium mb-2">
            <div>Период аренды:</div>
            <div>
              {format(new Date(startDate), 'd MMMM', { locale: ru })} - {format(new Date(endDate), 'd MMMM', { locale: ru })}
            </div>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <div>Итого:</div>
            <div>{formatPrice(totalPrice)}</div>
          </div>
          <div className="text-xs text-gray-500 mt-1 text-right">Включая все сборы и налоги</div>
        </div>
      )}
      
      {/* Кнопка бронирования */}
      <Button
        className="w-full"
        disabled={!startDate || !endDate || !isAvailable || isCheckingAvailability}
        isLoading={isCheckingAvailability}
        onClick={handleBookNow}
      >
        {isCheckingAvailability ? 'Проверка доступности...' :
          !startDate || !endDate ? 'Выберите даты аренды' :
          isAvailable === false ? 'Недоступно на выбранные даты' :
          'Забронировать сейчас'}
      </Button>
      
      {isAvailable === false && (
        <div className="text-red-500 text-sm mt-2 text-center">
          Транспортное средство недоступно на выбранные даты
        </div>
      )}
      
      {/* Информация о безопасности */}
      <div className="mt-6 flex items-start">
        <ShieldIcon className="h-5 w-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
        <div className="text-sm text-gray-600">
          <p className="font-medium mb-1">Безопасное бронирование</p>
          <p>Оплата производится только после подтверждения бронирования. Все поездки застрахованы.</p>
        </div>
      </div>
    </div>
  );
} 