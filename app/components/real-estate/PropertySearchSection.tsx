'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Search, MapPin, BedDouble, Bath, Wallet, Home, Grid, Grid2X2, Calendar } from 'lucide-react';

interface PropertySearchSectionProps {
  hasAnimated: boolean;
}

const PropertySearchSection: React.FC<PropertySearchSectionProps> = ({ hasAnimated }) => {
  const [activeTab, setActiveTab] = useState<'rent' | 'buy'>('rent');
  const [numBedrooms, setNumBedrooms] = useState<string>('any');
  const [priceRange, setPriceRange] = useState<[number, number]>([15000, 100000]);
  const [location, setLocation] = useState<string>('');
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sectionInView = inView && hasAnimated;

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
    <section id="property-search" className="py-20 relative overflow-hidden bg-gray-50">
      
      <div className="container mx-auto px-4 relative z-10">
        <div ref={ref} className={`transition-all duration-700 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Найдите идеальный вариант <span className="text-primary">для проживания</span>
            </h2>
            <p className="text-dark/70 text-lg">
              Используйте наш удобный фильтр для поиска недвижимости, соответствующей вашим требованиям
            </p>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-3 sm:gap-4 mb-6">
              <button
                onClick={() => setActiveTab('rent')}
                className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                  activeTab === 'rent' ? 'bg-primary text-white font-medium' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Home className={`w-5 h-5 ${activeTab === 'rent' ? 'animate-bounce' : ''}`} style={{animationDuration: '2s'}} />
                <span>Аренда</span>
              </button>
              
              <button
                onClick={() => setActiveTab('buy')}
                className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                  activeTab === 'buy' ? 'bg-primary text-white font-medium' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Wallet className={`w-5 h-5 ${activeTab === 'buy' ? 'animate-bounce' : ''}`} style={{animationDuration: '2s'}} />
                <span>Покупка</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <label className="block text-gray-700 text-sm mb-1">Район</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-300 group-hover:text-primary" />
                  <select 
                    className="w-full bg-white border border-gray-300 text-gray-700 py-2 pl-10 pr-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 group"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">Любой район</option>
                    {locationOptions.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <label className="block text-gray-700 text-sm mb-1">Спальни</label>
                <div className="grid grid-cols-5 gap-1">
                  {bedroomOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setNumBedrooms(option.value)}
                      className={`py-1 px-2 rounded text-xs transition-all duration-300 ${
                        numBedrooms === option.value
                          ? 'bg-primary text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <label className="block text-gray-700 text-sm mb-1">Бюджет (฿)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    name="min"
                    value={priceRange[0]}
                    onChange={handlePriceChange}
                    placeholder="Мин."
                    className="w-full bg-white border border-gray-300 text-gray-700 py-1 px-2 rounded text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                  />
                  <input
                    type="number"
                    name="max"
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    placeholder="Макс."
                    className="w-full bg-white border border-gray-300 text-gray-700 py-1 px-2 rounded text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <label className="block text-gray-700 text-sm mb-1">Дополнительно</label>
                <div className="relative">
                  <Grid2X2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-300 group-hover:text-primary" />
                  <select 
                    className="w-full bg-white border border-gray-300 text-gray-700 py-2 pl-10 pr-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 group"
                  >
                    <option value="">Все опции</option>
                    <option value="pool">Бассейн</option>
                    <option value="gym">Спортзал</option>
                    <option value="parking">Парковка</option>
                    <option value="security">Охрана</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button 
                onClick={handleSearch}
                className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-all flex items-center group hover:scale-105 duration-300 shadow-lg relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <Search className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12 duration-300" />
                  <span>Найти недвижимость</span>
                </span>
                <span className="absolute top-0 left-0 w-full h-0 bg-white/20 transition-height duration-300 group-hover:h-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Плавающие декоративные элементы */}
      <div className="absolute -bottom-10 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" 
           style={{ animation: 'pulse 8s infinite ease-in-out' }}></div>
      <div className="absolute -top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
           style={{ animation: 'pulse 6s infinite ease-in-out' }}></div>
           
      {/* CSS для анимаций */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        .transition-height {
          transition-property: height;
        }
      `}</style>
    </section>
  );
};

export default PropertySearchSection; 