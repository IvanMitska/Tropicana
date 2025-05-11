'use client';

import React, { useState, useEffect } from 'react';
import { useVehicles } from '@/app/hooks/useVehicles';
import { useInView } from 'react-intersection-observer';
import { Search, MapPin, Calendar, Car, Bike, Ship, Filter, Grid, List } from 'lucide-react';
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
  
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Эффект анимации при загрузке страницы
  useEffect(() => {
    setHasAnimated(true);
  }, []);
  
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
        <main className="min-h-screen">
          {/* Героя-секция с современным дизайном */}
          <section 
            ref={heroRef}
            className="relative min-h-[600px] w-full overflow-hidden bg-dark"
          >
            {/* Фоновое изображение с новыми эффектами */}
            <div className="absolute inset-0 z-0">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-70"
                style={{
                  backgroundImage: 'url("/images/hero-transport.jpg")',
                  filter: 'saturate(1.2) contrast(1.1)',
                }}
              ></div>
              
              {/* Современный градиент и эффекты */}
              <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-transparent"></div>
              
              {/* Декоративные элементы */}
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-dark to-transparent"></div>
              <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-secondary/20 blur-3xl"></div>
              <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-primary/20 blur-3xl"></div>
            </div>
            
            {/* Контент с асимметричным расположением */}
            <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-16 md:py-20">
                {/* Левая колонка - текст */}
                <div className={`transition-all duration-700 ease-out ${hasAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                    Аренда транспорта <br/>
                    <span className="text-secondary inline-block relative">
                      на Пхукете
                      <span className="absolute -bottom-2 left-0 w-full h-1 bg-secondary/60 rounded-full"></span>
                    </span>
                  </h1>
                  
                  <p className="text-xl text-light/90 max-w-md mb-8">
                    Выбирайте из широкого ассортимента надежных транспортных средств для комфортного передвижения по острову
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mt-10">
                    <a href="#filters" className="group inline-flex items-center bg-secondary hover:bg-secondary/90 text-dark font-medium py-3 px-8 rounded-md shadow-lg transition-all hover:shadow-secondary/20 hover:shadow-xl">
                      <span>Подобрать транспорт</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
                        <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
                      </svg>
                    </a>
                    
                    <a href="#popular" className="inline-flex items-center bg-transparent border border-white/30 text-white hover:bg-white/10 font-medium py-3 px-8 rounded-md transition-all">
                      Популярные модели
                    </a>
                  </div>
                </div>
                
                {/* Правая колонка - интерактивные карточки */}
                <div className="relative">
                  {/* Карточка 1 */}
                  <div 
                    className={`absolute top-0 left-0 lg:left-10 w-full max-w-xs bg-white/10 backdrop-blur-xl rounded-xl overflow-hidden transition-all duration-700 shadow-xl hover:shadow-2xl hover:-translate-y-2 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{zIndex: 3}}
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img 
                        src="/images/car-sample.jpg" 
                        alt="Автомобили" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-secondary/80 text-dark text-xs font-bold px-3 py-1 rounded-full">
                          ОТ 1500 ฿/ДЕНЬ
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center mb-3">
                        <span className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                          <Car className="w-5 h-5 text-secondary" />
                        </span>
                        <h3 className="text-xl font-semibold text-white">Автомобили</h3>
                      </div>
                      <p className="text-white/80 text-sm">Более 30 моделей для любых целей и бюджета</p>
                    </div>
                  </div>
                  
                  {/* Карточка 2 */}
                  <div 
                    className={`absolute top-24 right-0 w-full max-w-xs bg-white/10 backdrop-blur-xl rounded-xl overflow-hidden transition-all duration-700 shadow-xl hover:shadow-2xl hover:-translate-y-2 delay-100 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{zIndex: 2}}
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img 
                        src="/images/motorcycle-sample.jpg" 
                        alt="Мотоциклы" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-secondary/80 text-dark text-xs font-bold px-3 py-1 rounded-full">
                          ОТ 400 ฿/ДЕНЬ
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center mb-3">
                        <span className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                          <Bike className="w-5 h-5 text-secondary" />
                        </span>
                        <h3 className="text-xl font-semibold text-white">Мотоциклы</h3>
                      </div>
                      <p className="text-white/80 text-sm">Более 20 моделей скутеров и мотоциклов</p>
                    </div>
                  </div>
                  
                  {/* Карточка 3 */}
                  <div 
                    className={`absolute top-48 left-10 w-full max-w-xs bg-white/10 backdrop-blur-xl rounded-xl overflow-hidden transition-all duration-700 shadow-xl hover:shadow-2xl hover:-translate-y-2 delay-200 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{zIndex: 1}}
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img 
                        src="/images/boat-sample.jpg" 
                        alt="Лодки" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-secondary/80 text-dark text-xs font-bold px-3 py-1 rounded-full">
                          ОТ 3000 ฿/ДЕНЬ
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center mb-3">
                        <span className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                          <Ship className="w-5 h-5 text-secondary" />
                        </span>
                        <h3 className="text-xl font-semibold text-white">Лодки</h3>
                      </div>
                      <p className="text-white/80 text-sm">Морской транспорт для отдыха и экскурсий</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Современный интерфейсный элемент - скролл вниз */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
              <a 
                href="#filters" 
                className="flex flex-col items-center text-white/70 hover:text-white transition-colors"
              >
                <span className="text-xs mb-2">Прокрутить вниз</span>
                <div className="w-6 h-10 rounded-full border border-white/30 flex items-center justify-center p-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
                </div>
              </a>
            </div>
          </section>

          {/* Основная секция с фильтрами и списком транспорта */}
          <section id="filters" className="py-16 bg-light">
            <div className="container mx-auto px-4">
              {/* Заголовок */}
              <div className={`mb-8 transition-all duration-700 ease-out ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <h2 className="text-2xl md:text-3xl font-bold text-dark mb-2">Доступный транспорт</h2>
                <p className="text-gray-600">Найдено транспортных средств: {totalVehicles}</p>
              </div>
            
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Боковая панель с фильтрами */}
                <aside className="w-full lg:w-1/4 flex-shrink-0">
                  <div className="bg-white p-6 rounded-xl shadow-md sticky top-24">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold text-dark flex items-center">
                        <Filter className="w-5 h-5 mr-2 text-primary" /> Фильтры
                      </h3>
                      <button 
                        onClick={clearFilters}
                        className="text-primary text-sm hover:text-primary-dark transition-colors"
                      >
                        Сбросить все
                      </button>
                    </div>
                    
                    <VehicleFilterSidebar
                      filters={filters}
                      onUpdateFilters={updateFilters}
                      onClearFilters={clearFilters}
                      isLoading={isLoading}
                    />
                  </div>
                </aside>
                
                {/* Основное содержимое - список транспортных средств */}
                <main className="w-full lg:w-3/4">
                  {/* Сортировка и переключение вида */}
                  <div className="bg-white p-4 rounded-xl shadow-md mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-2">Сортировать:</span>
                        <select 
                          className="bg-white border border-gray-200 text-dark rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                          value={sortOption}
                          onChange={(e) => updateSortOption(e.target.value)}
                        >
                          <option value="price-asc">По цене (возр.)</option>
                          <option value="price-desc">По цене (убыв.)</option>
                          <option value="newest">Сначала новые</option>
                          <option value="popular">По популярности</option>
                          <option value="rating">По рейтингу</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="text-gray-600 whitespace-nowrap">Показано: {vehicles?.length || 0} из {totalVehicles}</span>
                        <div className="flex border border-gray-200 rounded-md overflow-hidden">
                          <button 
                            className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-dark'}`}
                            onClick={() => updateViewMode('grid')}
                          >
                            <Grid size={20} />
                          </button>
                          <button 
                            className={`px-3 py-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-dark'}`}
                            onClick={() => updateViewMode('list')}
                          >
                            <List size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Список транспортных средств с анимацией */}
                  <div className={`bg-white p-6 rounded-xl shadow-md transition-all duration-500 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
          </section>
        </main>
      )}
    </MainLayout>
  );
} 