'use client';

import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import TransportFiltersDemo from '../components/demo/TransportFiltersDemo';
import SearchInterface from '../components/search/SearchInterface';

export default function DemoPage() {
  // Демо-данные для SearchInterface
  const serviceTypes = [
    { id: 'all', name: 'Все услуги' },
    { id: 'real-estate', name: 'Недвижимость' },
    { id: 'transport', name: 'Транспорт' },
    { id: 'tours', name: 'Экскурсии' },
  ];

  const handleSearch = (params: { serviceType: string; location: string; dateRange: [Date | null, Date | null] }) => {
    console.log('Поисковый запрос:', params);
    alert(
      `Поиск выполнен с параметрами:
      - Тип: ${params.serviceType}
      - Локация: ${params.location}
      - Даты: ${params.dateRange[0]?.toLocaleDateString() || 'не выбрано'} - ${params.dateRange[1]?.toLocaleDateString() || 'не выбрано'}`
    );
  };

  return (
    <MainLayout>
      <main className="min-h-screen bg-light py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">Демонстрация компонентов</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Страница демонстрирует работу новых компонентов для "Tropicana"
            </p>
          </div>
          
          {/* Демонстрация SearchInterface */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6">Поисковый интерфейс</h2>
            <div className="mb-4">
              <p className="text-gray-600 mb-6">
                Новый унифицированный поисковый интерфейс с выпадающим меню сервисов, полем ввода локации и календарем.
              </p>
            </div>
            <SearchInterface 
              serviceTypes={serviceTypes}
              onSearch={handleSearch}
            />
          </section>
          
          {/* Демонстрация компонентов фильтрации */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6">Компоненты фильтрации</h2>
            <div className="mb-4">
              <p className="text-gray-600 mb-6">
                Фильтры категорий и способов передвижения с возможностью множественного выбора.
              </p>
            </div>
            <TransportFiltersDemo />
          </section>
        </div>
      </main>
    </MainLayout>
  );
} 