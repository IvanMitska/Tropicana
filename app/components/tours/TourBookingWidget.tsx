import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tour, TourScheduleSlot } from '../../models/Tour';
import TourCalendar from './TourCalendar';
import { tourAPI } from '../../lib/api';
import { format } from 'date-fns';

interface TourBookingWidgetProps {
  tour: Tour;
}

interface BookingOptions {
  participants: number;
  childrenCount: number;
  additionalOptions: {
    id: string;
    name: string;
    price: number;
    selected: boolean;
  }[];
}

const TourBookingWidget: React.FC<TourBookingWidgetProps> = ({ tour }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TourScheduleSlot | null>(null);
  const [bookingOptions, setBookingOptions] = useState<BookingOptions>({
    participants: tour.pricing.minParticipants,
    childrenCount: 0,
    additionalOptions: [
      { id: 'transport', name: 'Транспорт от/до отеля', price: 1000, selected: false },
      { id: 'food', name: 'Обед', price: 800, selected: false },
      { id: 'photo', name: 'Профессиональные фото', price: 1500, selected: false },
      { id: 'souvenir', name: 'Сувенир на память', price: 500, selected: false },
    ]
  });
  
  // Проверка доступности слотов при выборе даты
  const { data: availabilityData, refetch: refetchAvailability } = useQuery(
    ['tourAvailability', tour.id, selectedDate],
    async () => {
      if (!selectedDate) return { data: [] };
      
      const startDate = format(selectedDate, 'yyyy-MM-dd');
      const endDate = format(selectedDate, 'yyyy-MM-dd');
      
      return tourAPI.checkAvailability(tour.id, startDate, endDate);
    },
    {
      enabled: !!tour.id && !!selectedDate,
    }
  );
  
  // Сбрасываем выбранный слот при изменении даты
  useEffect(() => {
    setSelectedSlot(null);
  }, [selectedDate]);
  
  // Обработчик выбора даты
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  
  // Обработчик выбора временного слота
  const handleSlotSelect = (slot: TourScheduleSlot) => {
    setSelectedSlot(slot);
  };
  
  // Обработчик изменения количества участников
  const handleParticipantsChange = (value: number) => {
    if (value >= tour.pricing.minParticipants && value <= tour.pricing.maxParticipants) {
      setBookingOptions(prev => ({ ...prev, participants: value }));
    }
  };
  
  // Обработчик изменения количества детей
  const handleChildrenChange = (value: number) => {
    const maxChildren = bookingOptions.participants - 1;
    if (value >= 0 && value <= maxChildren) {
      setBookingOptions(prev => ({ ...prev, childrenCount: value }));
    }
  };
  
  // Обработчик выбора дополнительных опций
  const handleOptionToggle = (optionId: string) => {
    setBookingOptions(prev => ({
      ...prev,
      additionalOptions: prev.additionalOptions.map(option => 
        option.id === optionId ? { ...option, selected: !option.selected } : option
      )
    }));
  };
  
  // Расчет итоговой стоимости
  const calculateTotalPrice = () => {
    if (!tour) return 0;
    
    let total = 0;
    const { basePrice, priceType, discounts } = tour.pricing;
    
    // Базовая стоимость в зависимости от типа цены
    if (priceType === 'perPerson') {
      // Стоимость для взрослых
      const adultsCount = bookingOptions.participants - bookingOptions.childrenCount;
      total += basePrice * adultsCount;
      
      // Стоимость для детей с учетом скидки
      if (bookingOptions.childrenCount > 0 && discounts.children > 0) {
        const childrenPrice = basePrice * (1 - discounts.children / 100);
        total += childrenPrice * bookingOptions.childrenCount;
      } else {
        total += basePrice * bookingOptions.childrenCount;
      }
    } else {
      // Фиксированная стоимость за группу
      total = basePrice;
    }
    
    // Добавляем стоимость дополнительных опций
    bookingOptions.additionalOptions.forEach(option => {
      if (option.selected) {
        if (priceType === 'perPerson') {
          total += option.price * bookingOptions.participants;
        } else {
          total += option.price;
        }
      }
    });
    
    // Учитываем модификатор цены для выбранного слота
    if (selectedSlot && selectedSlot.priceModifier) {
      total += selectedSlot.priceModifier;
    }
    
    return total;
  };
  
  // Форматирование цены
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} ${tour.pricing.currency === 'RUB' ? '₽' : tour.pricing.currency}`;
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm sticky top-20">
      <div className="mb-4">
        <div className="text-2xl font-bold text-blue-600 mb-1">
          {formatPrice(tour.pricing.basePrice)}
          <span className="text-sm font-normal text-gray-500 ml-1">
            {tour.pricing.priceType === 'perPerson' ? '/чел.' : '/группа'}
          </span>
        </div>
        <p className="text-gray-500 text-sm">
          {tour.pricing.priceType === 'perPerson' 
            ? `от ${tour.pricing.minParticipants} до ${tour.pricing.maxParticipants} человек`
            : `до ${tour.pricing.maxParticipants} человек`}
        </p>
      </div>
      
      {/* Календарь доступности */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Выберите дату</h3>
        <TourCalendar 
          schedule={tour.schedule}
          onDateSelect={handleDateSelect}
          selectedDate={selectedDate}
        />
      </div>
      
      {/* Доступные временные слоты */}
      {selectedDate && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Доступное время</h3>
          {availabilityData?.data?.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {availabilityData.data.map((slot: TourScheduleSlot) => (
                <button
                  key={slot.id}
                  className={`px-3 py-2 border rounded-md text-center text-sm ${
                    selectedSlot?.id === slot.id
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleSlotSelect(slot)}
                >
                  {slot.startTime}
                  {slot.priceModifier > 0 && (
                    <span className="block text-xs">
                      +{formatPrice(slot.priceModifier)}
                    </span>
                  )}
                  {slot.priceModifier < 0 && (
                    <span className="block text-xs text-green-600">
                      {formatPrice(slot.priceModifier)}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Нет доступных слотов на выбранную дату</p>
          )}
        </div>
      )}
      
      {/* Выбор количества участников */}
      {selectedSlot && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Количество участников</h3>
          
          <div className="flex items-center justify-between mb-3 bg-gray-50 p-3 rounded-md">
            <span>Взрослые</span>
            <div className="flex items-center">
              <button
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white"
                onClick={() => handleParticipantsChange(bookingOptions.participants - 1)}
                disabled={bookingOptions.participants <= tour.pricing.minParticipants || 
                          bookingOptions.participants <= bookingOptions.childrenCount + 1}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="mx-3 min-w-[24px] text-center">
                {bookingOptions.participants - bookingOptions.childrenCount}
              </span>
              <button
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white"
                onClick={() => handleParticipantsChange(bookingOptions.participants + 1)}
                disabled={bookingOptions.participants >= tour.pricing.maxParticipants}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          {tour.pricing.discounts.children > 0 && (
            <div className="flex items-center justify-between mb-3 bg-gray-50 p-3 rounded-md">
              <div>
                <span>Дети</span>
                <span className="block text-xs text-green-600">
                  Скидка {tour.pricing.discounts.children}%
                </span>
              </div>
              <div className="flex items-center">
                <button
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white"
                  onClick={() => handleChildrenChange(bookingOptions.childrenCount - 1)}
                  disabled={bookingOptions.childrenCount <= 0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                  </svg>
                </button>
                <span className="mx-3 min-w-[24px] text-center">
                  {bookingOptions.childrenCount}
                </span>
                <button
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white"
                  onClick={() => handleChildrenChange(bookingOptions.childrenCount + 1)}
                  disabled={bookingOptions.childrenCount >= bookingOptions.participants - 1}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}
          
          {/* Дополнительные опции */}
          <div className="mb-3">
            <h3 className="font-semibold mb-2">Дополнительные опции</h3>
            
            <div className="space-y-2">
              {bookingOptions.additionalOptions.map(option => (
                <div key={option.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                  <div>
                    <span>{option.name}</span>
                    <span className="block text-xs text-gray-500">
                      +{formatPrice(option.price)}
                      {tour.pricing.priceType === 'perPerson' ? '/чел.' : ''}
                    </span>
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={option.selected}
                        onChange={() => handleOptionToggle(option.id)}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Итоговая стоимость */}
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Стоимость экскурсии</span>
              <span>
                {formatPrice(tour.pricing.basePrice)}
                {tour.pricing.priceType === 'perPerson' ? ' × ' + bookingOptions.participants : ''}
              </span>
            </div>
            
            {/* Скидки для детей */}
            {bookingOptions.childrenCount > 0 && tour.pricing.discounts.children > 0 && (
              <div className="flex justify-between items-center mb-2 text-green-600">
                <span>Скидка на детей ({bookingOptions.childrenCount})</span>
                <span>
                  -{formatPrice((tour.pricing.basePrice * tour.pricing.discounts.children / 100) * bookingOptions.childrenCount)}
                </span>
              </div>
            )}
            
            {/* Дополнительные опции */}
            {bookingOptions.additionalOptions.some(option => option.selected) && (
              <>
                {bookingOptions.additionalOptions
                  .filter(option => option.selected)
                  .map(option => (
                    <div key={option.id} className="flex justify-between items-center mb-2">
                      <span>{option.name}</span>
                      <span>
                        {formatPrice(tour.pricing.priceType === 'perPerson' ? option.price * bookingOptions.participants : option.price)}
                      </span>
                    </div>
                  ))
                }
              </>
            )}
            
            {/* Модификатор цены для выбранного слота */}
            {selectedSlot && selectedSlot.priceModifier !== 0 && (
              <div className={`flex justify-between items-center mb-2 ${selectedSlot.priceModifier < 0 ? 'text-green-600' : ''}`}>
                <span>
                  {selectedSlot.priceModifier < 0 ? 'Скидка на выбранное время' : 'Надбавка на выбранное время'}
                </span>
                <span>{formatPrice(selectedSlot.priceModifier)}</span>
              </div>
            )}
            
            <div className="border-t border-gray-300 my-2 pt-2"></div>
            
            <div className="flex justify-between items-center font-semibold text-lg">
              <span>Итого</span>
              <span>{formatPrice(calculateTotalPrice())}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Кнопка бронирования */}
      <button
        className={`w-full py-3 rounded-md text-white font-semibold ${
          selectedSlot ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
        disabled={!selectedSlot}
      >
        Забронировать
      </button>
      
      {/* Место встречи */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Место встречи</h3>
        <p className="text-gray-700">{tour.location.address}</p>
        {tour.location.meetingPoint.description && (
          <p className="text-gray-600 mt-1 text-sm">{tour.location.meetingPoint.description}</p>
        )}
      </div>
      
      {/* Кнопки социальных сетей */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Поделиться</h3>
        <div className="flex space-x-2">
          <button className="p-2 bg-[#3b5998] text-white rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
          </button>
          <button className="p-2 bg-[#1DA1F2] text-white rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </button>
          <button className="p-2 bg-[#25D366] text-white rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </button>
          <button className="p-2 bg-[#C13584] text-white rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </button>
          <button className="p-2 bg-[#0077B5] text-white rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourBookingWidget; 