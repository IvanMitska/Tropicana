'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { CalendarIcon, MapPinIcon, SearchIcon } from 'lucide-react';

type CategoryTab = 'real-estate' | 'transport' | 'excursions';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<CategoryTab>('real-estate');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет обработка поиска
    console.log({ activeTab, searchQuery, location, dates });
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center">
      {/* Фоновое изображение */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Аренда недвижимости и транспорта"
          fill
          priority
          style={{ objectFit: 'cover' }}
          className="brightness-50"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fadeIn">
            Найдите идеальное жилье, транспорт и развлечения
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fadeIn animation-delay-200">
            Бронируйте лучшие предложения для аренды и организации отдыха в любой точке мира
          </p>

          {/* Поисковая форма */}
          <div className="bg-white rounded-lg shadow-lg p-4 mt-8 animate-fadeIn animation-delay-400">
            {/* Табы для переключения категорий */}
            <div className="flex mb-4 border-b">
              <button
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === 'real-estate'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('real-estate')}
              >
                Недвижимость
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === 'transport'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('transport')}
              >
                Транспорт
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === 'excursions'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('excursions')}
              >
                Экскурсии
              </button>
            </div>

            {/* Форма поиска */}
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <Input
                  placeholder={
                    activeTab === 'real-estate'
                      ? 'Квартира, дом, коттедж...'
                      : activeTab === 'transport'
                      ? 'Автомобиль, скутер, яхта...'
                      : 'Экскурсия, тур, гид...'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    className="pl-10"
                    placeholder="Местоположение"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    className="pl-10"
                    placeholder="Даты"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                  />
                </div>
              </div>
              <Button type="submit" className="flex-shrink-0 md:w-auto w-full">
                <SearchIcon className="h-4 w-4 mr-2" />
                Поиск
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 