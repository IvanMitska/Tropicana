'use client';

import React, { useState } from 'react';
import { DatePicker } from '@/app/components/ui/DatePicker';
import CalendarInterface from '@/app/components/calendar/CalendarInterface';
import { addDays, subDays } from 'date-fns';

// Демонстрационная страница для тестирования календарей
export default function CalendarDemoPage() {
  // Состояние для DatePicker
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  // Состояние для CalendarInterface
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [participants, setParticipants] = useState<number>(2);
  
  // Обработчик изменения дат для DatePicker
  const handleDateChange = (dates: { startDate?: Date; endDate?: Date }) => {
    setStartDate(dates.startDate);
    setEndDate(dates.endDate);
  };
  
  // Обработчик изменения дат для CalendarInterface
  const handleCalendarInterfaceChange = (range: [Date | null, Date | null]) => {
    setDateRange(range);
  };
  
  // Обработчик сброса для CalendarInterface
  const handleReset = () => {
    setDateRange([null, null]);
  };

  // Создаем некоторые недоступные даты для демонстрации
  const disabledDates = [
    addDays(new Date(), 2),
    addDays(new Date(), 5),
    addDays(new Date(), 8),
    addDays(new Date(), 12),
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Демонстрация компонентов календаря</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">1. Компонент DatePicker</h2>
          <p className="text-gray-600 mb-6">
            Обновленный компонент DatePicker с поддержкой выбора диапазона дат,
            адаптированным дизайном и улучшенным UX.
          </p>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Выбор диапазона дат:</h3>
            <div className="max-w-sm">
              <DatePicker
                startDate={startDate}
                endDate={endDate}
                onDateChange={handleDateChange}
                disabledDates={disabledDates}
                placeholder="Выберите даты поездки"
                className="border-gray-300 focus:border-orange-400 transition-colors"
              />
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Выбранный диапазон:</h3>
            {startDate ? (
              <div>
                <p>
                  <span className="font-medium">Начало:</span> {startDate.toLocaleDateString('ru-RU')}
                </p>
                {endDate && (
                  <p>
                    <span className="font-medium">Конец:</span> {endDate.toLocaleDateString('ru-RU')}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 italic">Даты не выбраны</p>
            )}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">2. Компонент CalendarInterface</h2>
          <p className="text-gray-600 mb-6">
            Обновленный компонент CalendarInterface с поддержкой выбора диапазона дат
            и выбора количества человек.
          </p>
          
          <div className="max-w-sm mb-6">
            <CalendarInterface
              initialStartDate={dateRange[0]}
              initialEndDate={dateRange[1]}
              onDateChange={handleCalendarInterfaceChange}
              onReset={handleReset}
              participantCount={participants}
              onParticipantChange={setParticipants}
              resultsForSelection={dateRange[0] && dateRange[1] ? 24 : 0}
            />
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Выбранные параметры:</h3>
            <div>
              <p>
                <span className="font-medium">Начало:</span> {dateRange[0] ? dateRange[0].toLocaleDateString('ru-RU') : 'Не выбрано'}
              </p>
              <p>
                <span className="font-medium">Конец:</span> {dateRange[1] ? dateRange[1].toLocaleDateString('ru-RU') : 'Не выбрано'}
              </p>
              <p>
                <span className="font-medium">Количество человек:</span> {participants}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 