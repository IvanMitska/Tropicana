import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday, isSameDay, addMonths, subMonths, isAfter } from 'date-fns';
import { ru } from 'date-fns/locale';
import { TourScheduleSlot } from '../../models/Tour';

interface TourCalendarProps {
  schedule: TourScheduleSlot[];
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const TourCalendar: React.FC<TourCalendarProps> = ({ schedule, selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Получаем первый и последний день месяца
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  
  // Получаем первый день первой недели и последний день последней недели
  const startDate = startOfWeek(monthStart, { locale: ru });
  const endDate = endOfWeek(monthEnd, { locale: ru });
  
  // Получаем все дни, которые должны быть отображены в календаре
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  
  // Дни недели для заголовков
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  
  // Переход к предыдущему месяцу
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  // Переход к следующему месяцу
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  // Проверка доступности даты в расписании
  const isDateAvailable = (date: Date) => {
    const today = new Date();
    if (!isAfter(date, today)) return false;
    
    return schedule.some(slot => {
      const slotDate = new Date(slot.date);
      return isSameDay(date, slotDate) && 
             slot.status === 'available' && 
             slot.availableSpots > slot.bookedSpots;
    });
  };
  
  // Получение количества доступных слотов для даты
  const getAvailableSlotsCount = (date: Date) => {
    return schedule.filter(slot => {
      const slotDate = new Date(slot.date);
      return isSameDay(date, slotDate) && 
             slot.status === 'available' && 
             slot.availableSpots > slot.bookedSpots;
    }).length;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Заголовок календаря */}
      <div className="flex justify-between items-center p-3 border-b">
        <button 
          onClick={prevMonth}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-5 h-5 text-gray-600"
          >
            <path 
              fillRule="evenodd" 
              d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
        
        <h2 className="text-base font-medium text-gray-800">
          {format(currentMonth, 'LLLL yyyy', { locale: ru })}
        </h2>
        
        <button 
          onClick={nextMonth}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-5 h-5 text-gray-600"
          >
            <path 
              fillRule="evenodd" 
              d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      </div>
      
      {/* Дни недели */}
      <div className="grid grid-cols-7 gap-0 border-b">
        {weekDays.map(day => (
          <div key={day} className="py-2 text-xs font-medium text-center text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      {/* Дни месяца */}
      <div className="grid grid-cols-7 gap-0">
        {days.map(day => {
          const isAvailable = isDateAvailable(day);
          const availableSlotsCount = getAvailableSlotsCount(day);
          const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
          const dayClasses = `
            relative h-10 p-1 text-center text-sm
            ${!isSameMonth(day, monthStart) ? 'text-gray-300' : isToday(day) ? 'text-blue-600 font-semibold' : 'text-gray-700'}
            ${isSelected ? 'bg-blue-100' : ''}
            ${isAvailable && !isSelected ? 'hover:bg-gray-100' : ''}
            ${!isAvailable || !isSameMonth(day, monthStart) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `;
          
          return (
            <div
              key={day.toString()}
              className={dayClasses}
              onClick={() => {
                if (isAvailable && isSameMonth(day, monthStart)) {
                  onDateSelect(day);
                }
              }}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <span>{format(day, 'd')}</span>
                {isAvailable && availableSlotsCount > 0 && (
                  <span className="text-xs text-green-600">
                    {availableSlotsCount} {availableSlotsCount === 1 ? 'слот' : availableSlotsCount < 5 ? 'слота' : 'слотов'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TourCalendar; 