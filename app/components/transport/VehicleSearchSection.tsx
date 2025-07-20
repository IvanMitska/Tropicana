'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Search, MapPin, Calendar, Car, Bike, Sailboat, Wallet, Settings } from 'lucide-react';

interface VehicleSearchSectionProps {
  hasAnimated: boolean;
}

export const VehicleSearchSection: React.FC<VehicleSearchSectionProps> = ({ hasAnimated }) => {
  const [activeVehicleType, setActiveVehicleType] = useState<string>('car');
  const [priceRange, setPriceRange] = useState<number[]>([500, 5000]);
  const [location, setLocation] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('');
  const [option, setOption] = useState<string>('');
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sectionInView = inView && hasAnimated;

  const locationOptions = [
    'Аэропорт Пхукет',
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
      activeVehicleType,
      priceRange,
      location,
      dateRange,
    });
  };

  return (
    <section id="vehicle-search" className="py-20 relative overflow-hidden bg-gray-50">
      
      <div className="container mx-auto px-4 relative z-10">
        <div ref={ref} className={`transition-all duration-700 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Найдите идеальный <span className="text-primary">транспорт</span>
            </h2>
            <p className="text-dark/70 text-lg">
              Используйте наш удобный фильтр для поиска транспорта, соответствующего вашим требованиям
            </p>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-3 sm:gap-4 mb-6">
              <button
                onClick={() => setActiveVehicleType('car')}
                className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                  activeVehicleType === 'car' ? 'bg-primary text-white font-medium' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Car className={`w-5 h-5 ${activeVehicleType === 'car' ? 'animate-bounce' : ''}`} style={{animationDuration: '2s'}} />
                <span>Автомобили</span>
              </button>
              
              <button
                onClick={() => setActiveVehicleType('bike')}
                className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                  activeVehicleType === 'bike' ? 'bg-primary text-white font-medium' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Bike className={`w-5 h-5 ${activeVehicleType === 'bike' ? 'animate-bounce' : ''}`} style={{animationDuration: '2s'}} />
                <span>Мотоциклы</span>
              </button>
              
              <button
                onClick={() => setActiveVehicleType('boat')}
                className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                  activeVehicleType === 'boat' ? 'bg-primary text-white font-medium' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Sailboat className={`w-5 h-5 ${activeVehicleType === 'boat' ? 'animate-bounce' : ''}`} style={{animationDuration: '2s'}} />
                <span>Морской транспорт</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <label className="block text-gray-700 text-sm mb-1">Локация</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-300 group-hover:text-primary" />
                  <select 
                    className="w-full bg-white border border-gray-300 text-gray-700 py-2 pl-10 pr-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 group"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">Любая локация</option>
                    <option value="phuket-town">Пхукет Таун</option>
                    <option value="patong">Патонг</option>
                    <option value="kata">Ката</option>
                    <option value="karon">Карон</option>
                    <option value="rawai">Раваи</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <label className="block text-gray-700 text-sm mb-1">Даты аренды</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-300 group-hover:text-primary" />
                  <input 
                    type="text"
                    placeholder="Выберите даты"
                    className="w-full bg-white border border-gray-300 text-gray-700 py-2 pl-10 pr-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 group"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <label className="block text-gray-700 text-sm mb-1">Бюджет (฿)</label>
                <div className="relative">
                  <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-300 group-hover:text-primary" />
                  <div className="pl-10 pr-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500">฿{priceRange[0]}</span>
                      <span className="text-xs text-gray-500">฿{priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="10000"
                      step="100"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full accent-primary h-1 bg-gray-300 rounded appearance-none focus:outline-none"
                    />
                    <input
                      type="range"
                      min="100"
                      max="10000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-primary h-1 bg-gray-300 rounded appearance-none focus:outline-none mt-1"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <label className="block text-gray-700 text-sm mb-1">Доп. опции</label>
                <div className="relative">
                  <Settings className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-300 group-hover:text-primary" />
                  <select 
                    className="w-full bg-white border border-gray-300 text-gray-700 py-2 pl-10 pr-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 group"
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                  >
                    <option value="">Все опции</option>
                    <option value="insurance">Страховка</option>
                    <option value="delivery">Доставка</option>
                    <option value="driver">С водителем</option>
                    <option value="child-seat">Детское кресло</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-all flex items-center group hover:scale-105 duration-300 shadow-lg relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  <Search className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12 duration-300" />
                  <span>Найти транспорт</span>
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