'use client';

import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, addDays, isAfter, isBefore, isEqual } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'react-day-picker/dist/style.css';

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
    if (!startDate || (startDate && endDate) || isAfter(day, endDate as Date)) {
      onDateChange({ startDate: day, endDate: undefined });
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

  return (
    <div className="relative">
      <div 
        className={`p-3 border rounded-md cursor-pointer ${className}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        {displayValue}
      </div>
      
      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white border rounded-md shadow-lg">
          <DayPicker
            mode={singleDate ? "single" : "range"}
            selected={
              singleDate 
                ? startDate 
                : { from: startDate, to: endDate }
            }
            onDayClick={handleDayClick}
            disabled={isDateDisabled}
            locale={ru}
            numberOfMonths={numberOfMonths}
            captionLayout="dropdown-buttons"
            fromYear={new Date().getFullYear()}
            toYear={new Date().getFullYear() + 2}
            defaultMonth={startDate || new Date()}
            components={{
              IconLeft: () => <ChevronLeft className="h-4 w-4" />,
              IconRight: () => <ChevronRight className="h-4 w-4" />,
            }}
            styles={{
              caption: { color: '#4A6FFF' },
              day_selected: { backgroundColor: '#4A6FFF' },
              day_today: { color: '#4A6FFF' },
            }}
            modifiersClassNames={{
              selected: 'bg-primary text-white',
              today: 'text-primary',
              disabled: 'text-gray-300',
            }}
            footer={
              <div className="p-2 text-center border-t text-sm">
                {singleDate ? (
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark"
                  >
                    Закрыть
                  </button>
                ) : (
                  <div className="text-sm text-gray-500">
                    {startDate && !endDate && 'Выберите дату окончания'}
                  </div>
                )}
              </div>
            }
          />
        </div>
      )}
    </div>
  );
}; 