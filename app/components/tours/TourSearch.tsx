'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Search, MapPin, Calendar, Users, Compass } from 'lucide-react';

const TourSearch: React.FC = () => {
  const [category, setCategory] = useState<string>('all');
  const [location, setLocation] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [guests, setGuests] = useState<string>('');
  
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении здесь был бы код для поиска и перехода на страницу результатов
    alert(`Поиск экскурсий: категория=${category}, локация=${location}, дата=${date}, гости=${guests}`);
  };

  return (
    <section
      ref={ref}
      className="py-12 bg-white relative"
    >
      <div className="container mx-auto px-4">
        <div 
          className={`bg-white rounded-2xl shadow-xl p-8 -mt-20 relative z-20 border border-gray-100 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative">
            <h2 className="text-2xl font-bold text-center text-dark mb-8">Найдите идеальную экскурсию</h2>
            
            {/* Форма поиска */}
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {/* Категория экскурсии */}
                <div className="relative">
                  <label className="block text-xs text-gray-500 mb-1 pl-1">Категория</label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-3 pl-10 rounded-lg border border-gray-200 bg-light text-dark focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    >
                      <option value="all">Все экскурсии</option>
                      <option value="sea">Морские экскурсии</option>
                      <option value="culture">Культурные места</option>
                      <option value="active">Активный отдых</option>
                      <option value="nature">Природные красоты</option>
                      <option value="gastro">Гастрономические туры</option>
                    </select>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                      <Compass className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                {/* Локация */}
                <div className="relative">
                  <label className="block text-xs text-gray-500 mb-1 pl-1">Локация</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Любая локация"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full p-3 pl-10 rounded-lg border border-gray-200 bg-light text-dark focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                      <MapPin className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                {/* Дата */}
                <div className="relative">
                  <label className="block text-xs text-gray-500 mb-1 pl-1">Дата</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-3 pl-10 rounded-lg border border-gray-200 bg-light text-dark focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                      <Calendar className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                {/* Количество гостей */}
                <div className="relative">
                  <label className="block text-xs text-gray-500 mb-1 pl-1">Количество гостей</label>
                  <div className="relative">
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full p-3 pl-10 rounded-lg border border-gray-200 bg-light text-dark focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    >
                      <option value="">Любое количество</option>
                      <option value="1">1 человек</option>
                      <option value="2">2 человека</option>
                      <option value="3">3 человека</option>
                      <option value="4">4 человека</option>
                      <option value="5+">5 и более</option>
                    </select>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                {/* Кнопка поиска */}
                <div className="relative">
                  <label className="block text-xs text-transparent mb-1 pl-1">Поиск</label>
                  <button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium p-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Search className="w-5 h-5" />
                    <span>Найти</span>
                  </button>
                </div>
              </div>
            </form>
            
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
    </section>
  );
};

export default TourSearch; 