'use client';

import { useState, useEffect } from 'react';
import { CalendarIcon, UsersIcon } from 'lucide-react';
import { format, addDays, differenceInDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import { checkAvailability } from '@/app/lib/api/properties';

interface PropertyBookingProps {
  propertyId: string;
  price: number;
  priceUnit: 'night' | 'month' | 'week';
  maxGuests: number;
}

export default function PropertyBooking({
  propertyId,
  price,
  priceUnit,
  maxGuests,
}: PropertyBookingProps) {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [serviceFee, setServiceFee] = useState(0);
  const [cleaningFee, setCleaningFee] = useState(1000); // Фиксированная стоимость уборки
  const [total, setTotal] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);

  // Расчет стоимости при изменении дат
  useEffect(() => {
    if (checkIn && checkOut) {
      const days = differenceInDays(checkOut, checkIn);
      
      if (days <= 0) {
        setTotal(0);
        return;
      }

      // Расчет стоимости в зависимости от периода
      let basePrice = 0;
      
      if (priceUnit === 'night') {
        basePrice = price * days;
      } else if (priceUnit === 'week') {
        const weeks = Math.ceil(days / 7);
        basePrice = price * weeks;
      } else if (priceUnit === 'month') {
        const months = Math.ceil(days / 30);
        basePrice = price * months;
      }

      // Расчет сервисного сбора (10% от базовой стоимости)
      const fee = Math.round(basePrice * 0.1);
      setServiceFee(fee);
      
      // Общая стоимость
      setTotal(basePrice + fee + cleaningFee);
      
      // Проверка доступности
      checkDateAvailability();
    } else {
      setTotal(0);
      setIsAvailable(null);
    }
  }, [checkIn, checkOut, price, priceUnit, cleaningFee]);

  // Проверка доступности выбранных дат
  const checkDateAvailability = async () => {
    if (!checkIn || !checkOut) return;

    setIsChecking(true);
    try {
      const result = await checkAvailability(
        propertyId,
        format(checkIn, 'yyyy-MM-dd'),
        format(checkOut, 'yyyy-MM-dd')
      );
      
      setIsAvailable(result.available);
      setBlockedDates(result.blockedDates || []);
    } catch (error) {
      console.error('Ошибка при проверке доступности:', error);
      setIsAvailable(false);
    } finally {
      setIsChecking(false);
    }
  };

  // Выбор даты в календаре
  const handleDateSelect = (date: Date) => {
    if (!checkIn || (checkIn && checkOut)) {
      // Начинаем новый выбор
      setCheckIn(date);
      setCheckOut(null);
    } else {
      // Завершаем выбор
      if (date < checkIn) {
        setCheckIn(date);
        setCheckOut(null);
      } else {
        setCheckOut(date);
        setShowCalendar(false);
      }
    }
  };

  // Функция для форматирования цены
  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'THB',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Получение названия периода
  const getPriceUnitName = (unit: 'night' | 'month' | 'week'): string => {
    const units = {
      night: 'ночь',
      week: 'неделю',
      month: 'месяц',
    };
    return units[unit];
  };

  // Генерация дней календаря
  const generateCalendarDays = () => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    const days: (Date | null)[] = [];
    
    // Добавляем пустые ячейки для выравнивания
    const firstDayIndex = firstDay === 0 ? 6 : firstDay - 1; // Неделя начинается с понедельника
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    
    // Добавляем дни месяца
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  // Проверка, выбран ли день
  const isDaySelected = (day: Date | null): boolean => {
    if (!day || !checkIn) return false;
    
    if (!checkOut) {
      return day.getDate() === checkIn.getDate() && 
             day.getMonth() === checkIn.getMonth() && 
             day.getFullYear() === checkIn.getFullYear();
    }
    
    return (
      (day >= checkIn && day <= checkOut) ||
      (day <= checkIn && day >= checkOut)
    );
  };

  // Проверка, заблокирован ли день
  const isDayBlocked = (day: Date | null): boolean => {
    if (!day) return false;
    const dateString = format(day, 'yyyy-MM-dd');
    return blockedDates.includes(dateString);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
      {/* Заголовок с ценой */}
      <div className="mb-4">
        <span className="text-2xl font-semibold">{formatPrice(price)}</span>
        <span className="text-gray-600">
          {' '}
          / {getPriceUnitName(priceUnit)}
        </span>
      </div>

      {/* Форма бронирования */}
      <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
        {/* Даты заезда/выезда */}
        <div className="grid grid-cols-2 divide-x divide-gray-300">
          <div 
            className="p-3 cursor-pointer hover:bg-gray-50"
            onClick={() => setShowCalendar(true)}
          >
            <div className="text-xs text-gray-500">Заезд</div>
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
              {checkIn ? (
                <span>{format(checkIn, 'd MMM', { locale: ru })}</span>
              ) : (
                <span className="text-gray-500">Выберите</span>
              )}
            </div>
          </div>
          <div 
            className="p-3 cursor-pointer hover:bg-gray-50"
            onClick={() => setShowCalendar(true)}
          >
            <div className="text-xs text-gray-500">Выезд</div>
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
              {checkOut ? (
                <span>{format(checkOut, 'd MMM', { locale: ru })}</span>
              ) : (
                <span className="text-gray-500">Выберите</span>
              )}
            </div>
          </div>
        </div>

        {/* Количество гостей */}
        <div className="border-t border-gray-300 p-3">
          <div className="text-xs text-gray-500 mb-1">Гости</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <UsersIcon className="h-4 w-4 text-gray-400 mr-2" />
              <span>{guests} гостей</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
                disabled={guests <= 1}
              >
                -
              </button>
              <button
                onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
                className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
                disabled={guests >= maxGuests}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Календарь */}
      {showCalendar && (
        <div className="border border-gray-300 rounded-lg bg-white p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1))}
              className="p-1 hover:bg-gray-100 rounded"
            >
              &lt;
            </button>
            <h3>{format(calendarMonth, 'LLLL yyyy', { locale: ru })}</h3>
            <button
              onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1))}
              className="p-1 hover:bg-gray-100 rounded"
            >
              &gt;
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
              <div key={day} className="text-center text-sm text-gray-500">{day}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays().map((day, index) => (
              <div
                key={index}
                className={`
                  h-8 w-full flex items-center justify-center text-sm rounded-full
                  ${!day ? 'text-gray-300' : ''}
                  ${day && isDayBlocked(day) ? 'text-gray-400 line-through cursor-not-allowed' : ''}
                  ${day && !isDayBlocked(day) ? 'cursor-pointer hover:bg-blue-100' : ''}
                  ${isDaySelected(day) ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
                `}
                onClick={() => day && !isDayBlocked(day) ? handleDateSelect(day) : null}
              >
                {day ? day.getDate() : ''}
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setShowCalendar(false)}
              className="text-blue-500 hover:underline"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      {/* Расчет стоимости */}
      {checkIn && checkOut && (
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <div>
              {formatPrice(price)} × {differenceInDays(checkOut, checkIn)} {
                differenceInDays(checkOut, checkIn) === 1 ? 'ночь' : 
                differenceInDays(checkOut, checkIn) >= 2 && differenceInDays(checkOut, checkIn) <= 4 ? 'ночи' : 'ночей'
              }
            </div>
            <div>{formatPrice(price * differenceInDays(checkOut, checkIn))}</div>
          </div>
          <div className="flex justify-between mb-2">
            <div>Плата за уборку</div>
            <div>{formatPrice(cleaningFee)}</div>
          </div>
          <div className="flex justify-between mb-2">
            <div>Сервисный сбор</div>
            <div>{formatPrice(serviceFee)}</div>
          </div>
          <div className="border-t border-gray-300 pt-3 mt-3 flex justify-between font-semibold">
            <div>Итого</div>
            <div>{formatPrice(total)}</div>
          </div>
        </div>
      )}

      {/* Статус доступности */}
      {isChecking && (
        <div className="mb-4 text-center text-gray-500">
          <div className="animate-spin inline-block h-4 w-4 border-t-2 border-b-2 border-blue-500 rounded-full mr-2"></div>
          Проверка доступности...
        </div>
      )}
      
      {isAvailable === false && !isChecking && (
        <div className="mb-4 text-red-500 text-sm">
          Выбранные даты недоступны для бронирования. Пожалуйста, выберите другие даты.
        </div>
      )}

      {/* Кнопка бронирования */}
      <button
        className={`w-full py-3 px-4 rounded-lg font-medium ${
          checkIn && checkOut && isAvailable
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
        disabled={!checkIn || !checkOut || isAvailable === false || isChecking}
        onClick={() => {
          // Здесь будет логика перехода к оформлению бронирования
          alert('Переход к оформлению бронирования');
        }}
      >
        Забронировать
      </button>

      <p className="text-center text-xs text-gray-500 mt-2">
        Оплата при бронировании не снимается
      </p>
    </div>
  );
} 