'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Search, MapPin, BedDouble, Bath, Wallet, Home, Grid, Grid2X2, Calendar } from 'lucide-react';

const PropertySearchSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rent' | 'buy'>('rent');
  const [numBedrooms, setNumBedrooms] = useState<string>('any');
  const [priceRange, setPriceRange] = useState<[number, number]>([15000, 100000]);
  const [location, setLocation] = useState<string>('');
  
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const bedroomOptions = [
    { value: 'any', label: 'Любое' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4+', label: '4+' },
  ];

  const locationOptions = [
    'Патонг',
    'Ката',
    'Карон',
    'Равай',
    'Камала',
    'Банг Тао',
    'Чалонг',
    'Найхарн',
    'Сурин',
    'Пхукет Таун',
  ];

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (e.target.name === 'min') {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Логика поиска
    console.log({
      type: activeTab,
      numBedrooms,
      priceRange,
      location,
    });
  };

  return (
    <section 
      id="property-search"
      ref={ref}
      className="py-20 bg-gradient-to-b from-dark via-dark/95 to-dark/90 relative overflow-hidden"
    >
      {/* Декоративные элементы */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Найдите идеальный вариант <span className="text-primary">для проживания</span>
          </h2>
          <p className="text-light/70 text-lg">
            Используйте наш удобный фильтр для поиска недвижимости, соответствующей вашим требованиям
          </p>
        </div>
        
        <div className={`bg-white/5 backdrop-blur-md rounded-xl shadow-xl overflow-hidden transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-6">
            {/* Переключатель типа */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 inline-flex">
                <button
                  onClick={() => setActiveTab('rent')}
                  className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                    activeTab === 'rent' 
                      ? 'bg-primary text-white shadow-md' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Аренда
                </button>
                <button
                  onClick={() => setActiveTab('buy')}
                  className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                    activeTab === 'buy' 
                      ? 'bg-primary text-white shadow-md' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Покупка
                </button>
              </div>
            </div>
            
            {/* Форма поиска */}
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Локация */}
              <div className="space-y-2">
                <label className="block text-white text-sm font-medium mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  Район
                </label>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="block w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent appearance-none"
                  >
                    <option value="">Любой район</option>
                    {locationOptions.map((loc) => (
                      <option key={loc} value={loc} className="bg-dark text-white">{loc}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Количество спален */}
              <div className="space-y-2">
                <label className="block text-white text-sm font-medium mb-2 flex items-center">
                  <BedDouble className="w-4 h-4 mr-2 text-primary" />
                  Спальни
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {bedroomOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setNumBedrooms(option.value)}
                      className={`py-2 rounded-lg text-sm transition-all ${
                        numBedrooms === option.value
                          ? 'bg-primary text-white'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Ценовой диапазон */}
              <div className="space-y-2">
                <label className="block text-white text-sm font-medium mb-2 flex items-center">
                  <Wallet className="w-4 h-4 mr-2 text-primary" />
                  Бюджет (฿ в месяц)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      name="min"
                      value={priceRange[0]}
                      onChange={handlePriceChange}
                      placeholder="Мин."
                      className="block w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      name="max"
                      value={priceRange[1]}
                      onChange={handlePriceChange}
                      placeholder="Макс."
                      className="block w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              {/* Кнопка поиска */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center group"
                >
                  <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Найти
                </button>
              </div>
            </form>
            
            {/* Дополнительные фильтры (скрытые) */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <button 
                className="text-white/70 hover:text-white text-sm flex items-center transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Grid2X2 className="w-4 h-4" />
                  <span>Дополнительные фильтры</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertySearchSection; 