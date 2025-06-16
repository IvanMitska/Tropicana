'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, addDays, isAfter, isBefore, isEqual, isSameDay } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import 'react-day-picker/dist/style.css';
import { useOnClickOutside } from '@/app/hooks/useOnClickOutside';

interface DatePickerProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onDateChange: (dates: { startDate?: Date; endDate?: Date }) => void;
  disabledDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  className?: string;
  numberOfMonths?: number;
  singleDate?: boolean;
}

export const DatePicker = ({
  startDate,
  endDate,
  onDateChange,
  disabledDates = [],
  minDate = new Date(),
  maxDate,
  placeholder = 'Выберите даты',
  className = '',
  numberOfMonths = 2,
  singleDate = false,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState<string>(placeholder);
  const ref = useRef<HTMLDivElement>(null);
  
  // Закрытие календаря при клике вне его
  useOnClickOutside(ref, () => setIsOpen(false));
  
  // Форматирование отображаемого значения при изменении дат
  useEffect(() => {
    if (singleDate && startDate) {
      setDisplayValue(format(startDate, 'dd.MM.yyyy'));
    } else if (startDate && endDate) {
      setDisplayValue(`${format(startDate, 'dd.MM.yyyy')} - ${format(endDate, 'dd.MM.yyyy')}`);
    } else if (startDate) {
      setDisplayValue(`${format(startDate, 'dd.MM.yyyy')} - Выберите дату окончания`);
    } else {
      setDisplayValue(placeholder);
    }
  }, [startDate, endDate, placeholder, singleDate]);

  // Функция обработки выбора даты
  const handleDayClick = (day: Date) => {
    if (singleDate) {
      onDateChange({ startDate: day, endDate: day });
      setIsOpen(false);
      return;
    }

    // Проверяем, является ли выбранная дата недоступной
    const isDisabled = disabledDates.some(
      disabledDate => 
        isEqual(disabledDate, day) || 
        (startDate && endDate && isAfter(disabledDate, startDate) && isBefore(disabledDate, endDate))
    );
    
    if (isDisabled) return;
    
    // Логика для выбора промежутка дат
    if (!startDate || (startDate && endDate)) {
      onDateChange({ startDate: day, endDate: undefined });
    } else if (isBefore(day, startDate)) {
      // Если выбранная дата раньше начальной, меняем их местами
      onDateChange({ startDate: day, endDate: startDate });
      setIsOpen(false);
    } else if (isAfter(day, startDate)) {
      onDateChange({ startDate, endDate: day });
      setIsOpen(false);
    }
  };

  // Функция для проверки, является ли дата недоступной
  const isDateDisabled = (day: Date) => {
    // Проверка на минимальную и максимальную даты
    if (isBefore(day, minDate) || (maxDate && isAfter(day, maxDate))) {
      return true;
    }
    
    // Проверка на наличие даты в списке недоступных
    return disabledDates.some(disabledDate => isEqual(disabledDate, day));
  };

  // Определение CSS классов для выбранного дня
  const getDayClassName = (day: Date) => {
    let classes = '';
    
    // Проверяем, является ли это сегодняшним днем
    if (isSameDay(day, new Date())) {
      classes += ' today-day';
    }
    
    // Проверяем, является ли день выходным
    if (day.getDay() === 0 || day.getDay() === 6) {
      classes += ' weekend-day';
    }
    
    return classes.trim() || undefined;
  };

  return (
    <div className="relative" ref={ref}>
      <div 
        className={`p-3 border rounded-md cursor-pointer flex justify-between items-center ${className}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={startDate || endDate ? "text-gray-800" : "text-gray-500"}>
          {displayValue}
        </span>
        <Calendar className="w-5 h-5 text-orange-400" />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white border rounded-md shadow-lg right-0 max-w-[660px] calendar-popup">
          <DayPicker
            mode={singleDate ? "single" : "range"}
            selected={
              singleDate 
                ? startDate 
                : startDate && endDate 
                  ? { from: startDate, to: endDate } 
                  : startDate 
                    ? { from: startDate } 
                    : undefined
            }
            onDayClick={handleDayClick}
            disabled={isDateDisabled}
            locale={ru}
            numberOfMonths={numberOfMonths}
            captionLayout="dropdown-buttons"
            fromYear={new Date().getFullYear()}
            toYear={new Date().getFullYear() + 3}
            defaultMonth={startDate || new Date()}
            showOutsideDays={true}
            fixedWeeks={true}
            components={{
              IconLeft: () => <ChevronLeft className="h-5 w-5" />,
              IconRight: () => <ChevronRight className="h-5 w-5" />,
            }}
            modifiersClassNames={{
              selected: 'bg-orange-300 text-white',
              today: 'today-day',
              disabled: 'text-gray-300',
              range_start: 'range-start',
              range_end: 'range-end',
              range_middle: 'range-middle',
            }}
            classNames={{
              day: day => getDayClassName(day),
              caption: 'calendar-caption',
              nav: 'calendar-nav',
              head: 'calendar-head',
              table: 'calendar-table',
              tbody: 'calendar-body',
              cell: 'calendar-cell',
            }}
            styles={{
              caption: { color: '#546161', fontWeight: 'bold' },
              day_selected: { backgroundColor: '#e9a27b' },
              day_today: { color: '#e9a27b', fontWeight: 'bold' },
            }}
            footer={
              <div className="p-2 text-center border-t text-sm">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1 bg-orange-400 text-white rounded hover:bg-orange-500"
                >
                  {singleDate ? 'Выбрать дату' : startDate && !endDate ? 'Выберите конечную дату' : 'Применить'}
                </button>
              </div>
            }
          />

          <style jsx global>{`
            .calendar-popup {
              width: calc(100vw - 32px);
              max-height: 90vh;
              overflow-y: auto;
            }
            
            .calendar-caption {
              padding: 8px 0;
              display: flex;
              justify-content: center;
              font-weight: bold;
              color: #546161;
            }

            .calendar-nav {
              position: relative;
            }
            
            .calendar-head {
              color: #546161;
              font-weight: 600;
              font-size: 0.8rem;
              text-transform: uppercase;
              margin-bottom: 4px;
            }
            
            .calendar-table {
              width: 100%;
              border-spacing: 2px;
              border-collapse: separate;
            }
            
            .calendar-body {
              font-size: 0.9rem;
            }
            
            .calendar-cell {
              padding: 2px;
              text-align: center;
            }
            
            .today-day {
              border: 2px solid #e9a27b !important;
              font-weight: bold;
            }
            
            .weekend-day {
              color: #e9a27b;
            }
            
            .rdp-day_selected, 
            .rdp-day_range_start, 
            .rdp-day_range_end,
            .rdp-day_range_middle {
              background-color: #e9a27b !important;
              color: white !important;
            }
            
            .rdp-day:hover:not(.rdp-day_disabled) {
              background-color: rgba(233, 162, 123, 0.2) !important;
            }

            .range-start, .range-end {
              background-color: #e9a27b !important;
              color: white !important;
              font-weight: bold;
            }
            
            .range-middle {
              background-color: rgba(233, 162, 123, 0.2) !important;
            }
            
            @media (max-width: 640px) {
              .rdp-months {
                flex-direction: column;
              }
              
              .rdp-month {
                width: 100%;
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}; 