'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Search, MapPin, Calendar, Users, Compass, Settings } from 'lucide-react';

interface TourSearchProps {
  hasAnimated: boolean;
}

const TourSearch: React.FC<TourSearchProps> = ({ hasAnimated }) => {
  const [category, setCategory] = useState<string>('all');
  const [location, setLocation] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [guests, setGuests] = useState<string>('');
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sectionInView = inView && hasAnimated;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении здесь был бы код для поиска и перехода на страницу результатов
    alert(`Поиск экскурсий: категория=${category}, локация=${location}, дата=${date}, гости=${guests}`);
  };

  return (
    <section id="tour-search" className="py-20 relative overflow-hidden bg-gray-50">
      
      <div className="container mx-auto px-4 relative z-10">
        <div ref={ref} className={`transition-all duration-700 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Найдите идеальную <span className="text-primary">экскурсию</span>
            </h2>
            <p className="text-dark/70 text-lg">
              Используйте наш удобный фильтр для поиска экскурсий, соответствующих вашим интересам
            </p>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-3 sm:gap-4 mb-6">
              <button
                onClick={() => setCategory('all')}
                className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                  category === 'all' ? 'bg-primary text-white font-medium' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Compass className={`w-5 h-5 ${category === 'all' ? 'animate-bounce' : ''}`} style={{animationDuration: '2s'}} />
                <span>Все экскурсии</span>
              </button>
              
              <button
                onClick={() => setCategory('sea')}
                className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                  category === 'sea' ? 'bg-primary text-white font-medium' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <MapPin className={`w-5 h-5 ${category === 'sea' ? 'animate-bounce' : ''}`} style={{animationDuration: '2s'}} />
                <span>Морские</span>
              </button>
              
              <button
                onClick={() => setCategory('culture')}
                className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                  category === 'culture' ? 'bg-primary text-white font-medium' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Users className={`w-5 h-5 ${category === 'culture' ? 'animate-bounce' : ''}`} style={{animationDuration: '2s'}} />
                <span>Культурные</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <label className="block text-gray-700 text-sm mb-1">Локация</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-300 group-hover:text-primary" />
                  <input 
                    type="text" 
                    placeholder="Любая локация"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-white border border-gray-300 text-gray-700 py-2 pl-10 pr-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 group"
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <label className="block text-gray-700 text-sm mb-1">Дата</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-300 group-hover:text-primary" />
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white border border-gray-300 text-gray-700 py-2 pl-10 pr-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 group"
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <label className="block text-gray-700 text-sm mb-1">Количество гостей</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-300 group-hover:text-primary" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-white border border-gray-300 text-gray-700 py-2 pl-10 pr-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 group"
                  >
                    <option value="">Любое количество</option>
                    <option value="1">1 человек</option>
                    <option value="2">2 человека</option>
                    <option value="3">3 человека</option>
                    <option value="4">4 человека</option>
                    <option value="5+">5 и более</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <label className="block text-gray-700 text-sm mb-1">Дополнительно</label>
                <div className="relative">
                  <Settings className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-300 group-hover:text-primary" />
                  <select 
                    className="w-full bg-white border border-gray-300 text-gray-700 py-2 pl-10 pr-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 group"
                  >
                    <option value="">Все опции</option>
                    <option value="group">Групповая экскурсия</option>
                    <option value="private">Индивидуальная</option>
                    <option value="transport">С трансфером</option>
                    <option value="lunch">С обедом</option>
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
                  <span>Найти экскурсию</span>
                </span>
                <span className="absolute top-0 left-0 w-full h-0 bg-white/20 transition-height duration-300 group-hover:h-full"></span>
              </button>
            </div>
            
            {/* Популярные запросы */}
            <div className="mt-8 flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-gray-500">Популярные экскурсии:</span>
              <button 
                onClick={() => setCategory('sea')}
                className="text-sm text-primary hover:text-primary-dark hover:underline transition-colors"
              >
                Острова Пхи-Пхи
              </button>
              <span className="text-gray-300">•</span>
              <button 
                onClick={() => setCategory('nature')}
                className="text-sm text-primary hover:text-primary-dark hover:underline transition-colors"
              >
                Джеймс Бонд
              </button>
              <span className="text-gray-300">•</span>
              <button 
                onClick={() => setCategory('culture')}
                className="text-sm text-primary hover:text-primary-dark hover:underline transition-colors"
              >
                Большой Будда
              </button>
              <span className="text-gray-300">•</span>
              <button 
                onClick={() => setCategory('active')}
                className="text-sm text-primary hover:text-primary-dark hover:underline transition-colors"
              >
                Рафтинг
              </button>
              <span className="text-gray-300">•</span>
              <button 
                onClick={() => setCategory('sea')}
                className="text-sm text-primary hover:text-primary-dark hover:underline transition-colors"
              >
                Симиланские острова
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

export default TourSearch; 