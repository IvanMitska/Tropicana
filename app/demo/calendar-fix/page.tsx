'use client';

import React, { useState } from 'react';
import CalendarInterface from '@/app/components/calendar/CalendarInterface';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function CalendarFixPage() {
  // Состояние для диапазона дат
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  // Состояние для количества участников
  const [participants, setParticipants] = useState<number>(2);
  
  // Обработчик изменения дат
  const handleDateChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };
  
  // Обработчик сброса
  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
  };

  // Форматирование даты для отображения
  const formatDate = (date: Date | null) => {
    if (!date) return 'Не выбрано';
    return format(date, 'd MMM yyyy', { locale: ru });
  };
  
  return (
    <div className="min-h-screen bg-[#546161] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Пхукет</h1>
        
        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
          <div className="bg-[#546161]/50 p-4 rounded-full flex items-center text-white">
            <div className="w-12 h-12 bg-[#546161]/70 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <span className="text-lg">Мгновенное бронирование</span>
          </div>
          
          <div className="bg-[#546161]/50 p-4 rounded-full flex items-center text-white">
            <div className="w-12 h-12 bg-[#546161]/70 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m0 16v2" />
              </svg>
            </div>
            <span className="text-lg">Лучшие цены</span>
          </div>
        </div>
        
        <div className="bg-[#546161]/30 p-6 rounded-xl backdrop-blur-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-500">Куда вы хотите поехать</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full">
                <CalendarInterface
                  startDate={startDate}
                  endDate={endDate}
                  onDateChange={handleDateChange}
                  onReset={handleReset}
                  initialParticipants={participants}
                  onParticipantChange={setParticipants}
                  minParticipants={1}
                  maxParticipants={10}
                />
              </div>
            </div>
            
            <div className="bg-[#e9a27b] p-4 rounded-lg text-white font-medium flex items-center justify-center cursor-pointer hover:bg-[#e08e63] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Найти</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Выбранный диапазон дат:</h2>
          
          <div className="mb-3">
            <p className="flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#e9a27b] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">Заезд:</span> 
              <span className="ml-2 text-gray-700">{formatDate(startDate)}</span>
            </p>
            
            <p className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#e9a27b] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">Выезд:</span>
              <span className="ml-2 text-gray-700">{formatDate(endDate)}</span>
            </p>
          </div>
          
          <p className="flex items-center text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#e9a27b] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-medium">Количество гостей:</span>
            <span className="ml-2">{participants} человек</span>
          </p>
        </div>
      </div>
    </div>
  );
} 