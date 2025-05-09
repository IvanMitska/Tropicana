'use client';

import React, { useState } from 'react';
import { useVehicles } from '@/app/hooks/useVehicles';
import VehicleFilterSidebar from '@/app/components/transport/VehicleFilterSidebar';
import VehicleList from '@/app/components/transport/VehicleList';
import MainLayout from '@/app/components/layout/MainLayout';

export default function TransportCatalogPage() {
  const {
    vehicles,
    totalVehicles,
    totalPages,
    pagination,
    filters,
    sortOption,
    viewMode,
    isLoading,
    updateFilters,
    clearFilters,
    updateSortOption,
    updateViewMode,
    updatePagination,
    checkVehicleAvailability,
  } = useVehicles();
  
  // Проверка наличия данных - если их нет, показываем заглушку
  const hasNoData = !isLoading && (!vehicles || vehicles.length === 0);
   
  return (
    <MainLayout>
      {hasNoData ? (
        // Временная заглушка с новым дизайном
        <main className="min-h-screen bg-light py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">Аренда транспорта на Пхукете</h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Широкий выбор автомобилей, мотоциклов и скутеров для комфортного передвижения по острову
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8 mb-16">
              <div className="text-center p-12">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 mx-auto text-primary mb-6 opacity-50">
                  <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                  <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
                  <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                </svg>
                <h2 className="text-2xl font-medium text-dark mb-4">Раздел в разработке</h2>
                <p className="text-gray-600 mb-8">
                  Мы сейчас активно работаем над наполнением этого раздела. Скоро здесь появится полный каталог транспортных средств для аренды на Пхукете.
                </p>
                <a href="/" className="inline-block bg-primary text-white py-3 px-8 rounded-full font-medium text-lg shadow-md hover:bg-primary-dark transition-colors duration-300">
                  Вернуться на главную
                </a>
              </div>
            </div>
          </div>
        </main>
      ) : (
        // Основной контент с новыми стилями
        <div className="bg-light py-12">
          <div className="container mx-auto px-4">
            <header className="mb-12 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">Аренда транспорта на Пхукете</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Выберите транспортное средство для комфортного передвижения по острову
              </p>
            </header>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Боковая панель с фильтрами */}
              <aside className="w-full lg:w-1/4 flex-shrink-0 bg-white p-6 rounded-xl shadow-md">
                <VehicleFilterSidebar
                  filters={filters}
                  onUpdateFilters={updateFilters}
                  onClearFilters={clearFilters}
                  isLoading={isLoading}
                />
              </aside>
              
              {/* Основное содержимое - список транспортных средств */}
              <main className="w-full lg:w-3/4">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <VehicleList
                    vehicles={vehicles}
                    totalVehicles={totalVehicles}
                    totalPages={totalPages}
                    currentPage={pagination.page}
                    viewMode={viewMode}
                    sortOption={sortOption}
                    isLoading={isLoading}
                    onPageChange={(page) => updatePagination({ page })}
                    onViewModeChange={updateViewMode}
                    onSortChange={updateSortOption}
                    onCheckAvailability={checkVehicleAvailability}
                  />
                </div>
              </main>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
} 