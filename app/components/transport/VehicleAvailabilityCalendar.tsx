import React, { useState, useMemo } from 'react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, isBefore, isAfter, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { 
  ChevronLeft, 
  ChevronRight,
  Check as CheckIcon,
  X as XIcon
} from 'lucide-react';
import { VehicleAvailability } from '@/app/models/Vehicle';

interface VehicleAvailabilityCalendarProps {
  availability: VehicleAvailability[];
  onSelectDates?: (startDate: string, endDate: string) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export default function VehicleAvailabilityCalendar({
  availability,
  onSelectDates,
  minDate = new Date(),
  maxDate = addMonths(new Date(), 6),
  className = '',
}: VehicleAvailabilityCalendarProps) {
  // Текущий месяц для отображения
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  // Выбранные даты
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  
  // Обработчики навигации по календарю
  const handlePreviousMonth = () => {
    setCurrentMonth(prev => {
      const newDate = addMonths(prev, -1);
      // Проверяем, что не вышли за минимальную дату
      return isBefore(newDate, minDate) ? minDate : newDate;
    });
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      const newDate = addMonths(prev, 1);
      // Проверяем, что не вышли за максимальную дату
      return isAfter(newDate, maxDate) ? maxDate : newDate;
    });
  };
  
  // Преобразование массива доступности в карту для быстрого доступа
  const availabilityMap = useMemo(() => {
    const map = new Map<string, boolean>();
    
    availability.forEach(item => {
      // Формат даты в ISO
      map.set(item.date, item.available);
      
      // Если есть забронированные слоты, нужно отметить дату как недоступную
      if (item.bookedTimeSlots && item.bookedTimeSlots.length > 0) {
        map.set(item.date, false);
      }
    });
    
    return map;
  }, [availability]);
  
  // Проверка, доступна ли дата для бронирования
  const isDateAvailable = (date: Date): boolean => {
    // Дата должна быть не ранее сегодняшнего дня
    if (isBefore(date, minDate) || isAfter(date, maxDate)) {
      return false;
    }
    
    const dateStr = format(date, 'yyyy-MM-dd');
    // Проверяем доступность даты в карте
    // Если даты нет в карте, считаем её доступной по умолчанию
    return availabilityMap.get(dateStr) !== false;
  };
  
  // Получение дней месяца для текущего отображения
  const monthDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    
    return eachDayOfInterval({ start: monthStart, end: monthEnd });
  }, [currentMonth]);
  
  // Обработчик клика по дате
  const handleDateClick = (date: Date) => {
    // Если дата недоступна, ничего не делаем
    if (!isDateAvailable(date)) return;
    
    // Если нет начальной даты или есть обе даты, начинаем выбор заново
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } 
    // Если есть только начальная дата
    else {
      // Если новая дата раньше начальной, меняем их местами
      if (isBefore(date, startDate)) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
      
      // Если есть обработчик выбора дат, вызываем его
      if (onSelectDates && startDate) {
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(date, 'yyyy-MM-dd');
        onSelectDates(formattedStartDate, formattedEndDate);
      }
    }
  };
  
  // Обработчик наведения на дату для предварительного отображения диапазона
  const handleDateHover = (date: Date) => {
    setHoverDate(date);
  };
  
  // Проверка, находится ли дата в выбранном диапазоне
  const isInSelectedRange = (date: Date): boolean => {
    if (!startDate) return false;
    
    // Если есть конечная дата, проверяем, что текущая дата находится между начальной и конечной
    if (endDate) {
      return isAfter(date, startDate) && isBefore(date, endDate);
    }
    
    // Если есть только начальная дата и наведенная дата, проверяем, что текущая дата
    // находится между начальной и наведенной
    if (hoverDate) {
      return (
        (isAfter(date, startDate) && isBefore(date, hoverDate)) ||
        (isAfter(date, hoverDate) && isBefore(date, startDate))
      );
    }
    
    return false;
  };
  
  // Проверка, является ли дата начальной или конечной выбранного диапазона
  const isSelectedStartOrEnd = (date: Date): boolean => {
    if (!startDate) return false;
    
    // Проверяем, совпадает ли дата с начальной
    const isStart = startDate.getTime() === date.getTime();
    
    // Проверяем, совпадает ли дата с конечной
    const isEnd = endDate ? endDate.getTime() === date.getTime() : false;
    
    return isStart || isEnd;
  };
  
  // Функция для очистки выбранных дат
  const clearSelection = () => {
    setStartDate(null);
    setEndDate(null);
  };
  
  // Возвращение выбранного диапазона в виде строки
  const getSelectedRangeText = (): string => {
    if (!startDate) return 'Выберите даты';
    
    const formattedStart = format(startDate, 'd MMMM', { locale: ru });
    
    if (!endDate) return `${formattedStart} - ...`;
    
    const formattedEnd = format(endDate, 'd MMMM', { locale: ru });
    return `${formattedStart} - ${formattedEnd}`;
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      {/* Заголовок и выбранные даты */}
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center">
          <CheckIcon className="h-5 w-5 mr-2 text-gray-500" />
          <h3 className="font-medium">Календарь доступности</h3>
        </div>
        
        <div className="flex items-center">
          {startDate && (
            <button
              onClick={clearSelection}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center mr-2"
            >
              <XIcon className="h-4 w-4 mr-1" />
              Очистить
            </button>
          )}
          
          <span className="text-sm font-medium">
            {getSelectedRangeText()}
          </span>
        </div>
      </div>
      
      {/* Навигация по месяцам */}
      <div className="p-4 border-b flex justify-between items-center">
        <button
          onClick={handlePreviousMonth}
          className="p-1 rounded-full hover:bg-gray-100"
          disabled={isBefore(addMonths(currentMonth, -1), minDate)}
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        
        <h4 className="font-medium">
          {format(currentMonth, 'LLLL yyyy', { locale: ru })}
        </h4>
        
        <button
          onClick={handleNextMonth}
          className="p-1 rounded-full hover:bg-gray-100"
          disabled={isAfter(addMonths(currentMonth, 1), maxDate)}
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      
      {/* Календарь */}
      <div className="p-4">
        {/* Дни недели */}
        <div className="grid grid-cols-7 mb-2">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(dayName => (
            <div key={dayName} className="text-center text-xs font-medium text-gray-500 py-2">
              {dayName}
            </div>
          ))}
        </div>
        
        {/* Сетка дней */}
        <div className="grid grid-cols-7 gap-1">
          {/* Пустые ячейки до начала месяца */}
          {Array.from({ length: (monthDays[0].getDay() || 7) - 1 }).map((_, index) => (
            <div key={`empty-start-${index}`} className="h-10" />
          ))}
          
          {/* Дни месяца */}
          {monthDays.map(day => {
            const isAvailable = isDateAvailable(day);
            const isSelected = isSelectedStartOrEnd(day);
            const isInRange = isInSelectedRange(day);
            
            return (
              <button
                key={day.toString()}
                className={`h-10 rounded-md flex items-center justify-center text-sm relative
                  ${!isSameMonth(day, currentMonth) ? 'text-gray-300' : ''}
                  ${isToday(day) ? 'font-bold' : ''}
                  ${isAvailable ? 'hover:bg-blue-50' : 'cursor-not-allowed opacity-50'}
                  ${isSelected ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                  ${isInRange ? 'bg-blue-100 hover:bg-blue-200' : ''}
                `}
                disabled={!isAvailable}
                onClick={() => handleDateClick(day)}
                onMouseEnter={() => handleDateHover(day)}
              >
                {day.getDate()}
              </button>
            );
          })}
          
          {/* Пустые ячейки после конца месяца */}
          {Array.from({ length: 7 - ((monthDays[monthDays.length - 1].getDay() || 7) - 1) - 1 }).map((_, index) => (
            <div key={`empty-end-${index}`} className="h-10" />
          ))}
        </div>
      </div>
      
      {/* Легенда */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-white border border-gray-300 rounded-sm mr-2" />
            <span className="text-gray-600">Доступно</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-600 rounded-sm mr-2" />
            <span className="text-gray-600">Выбрано</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 rounded-sm mr-2" />
            <span className="text-gray-600">Недоступно</span>
          </div>
        </div>
      </div>
    </div>
  );
} 