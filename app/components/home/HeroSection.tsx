'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

const backgroundImages = [
  '/images/hero-bg-1.jpg',
  '/images/hero-bg-2.jpg',
  '/images/hero-bg-3.jpg',
  '/images/hero-bg-4.jpg',
];

const HeroSection = () => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [destination, setDestination] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [serviceType, setServiceType] = useState('all');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);

  // Автоматическая смена фоновых изображений
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Меняем каждые 5 секунд

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика поиска
    if (destination) {
      let searchUrl = '';
      
      switch (serviceType) {
        case 'real-estate':
          searchUrl = `/real-estate?city=${destination}`;
          break;
        case 'transport':
          searchUrl = `/transport?location=${destination}`;
          break;
        case 'tours':
          searchUrl = `/tours?city=${destination}`;
          break;
        default:
          searchUrl = `/search?destination=${destination}`;
      }
      
      if (selectedDate) {
        searchUrl += `&date=${selectedDate}`;
      }
      
      router.push(searchUrl);
    }
  };

  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getServiceLabel = () => {
    switch (serviceType) {
      case 'real-estate':
        return 'Недвижимость';
      case 'transport':
        return 'Транспорт';
      case 'tours':
        return 'Экскурсии';
      default:
        return 'Все услуги';
    }
  };

  return (
    <section className="relative h-[700px] w-full overflow-hidden">
      {/* Фоновые изображения с анимацией перехода */}
      {backgroundImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url("${image}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}

      {/* Затемнение фона */}
      <div className="absolute inset-0 bg-dark/70" />

      {/* Контент */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-white">
        <div className="mb-8 text-center max-w-4xl mx-auto">
          <h1 className="mb-6 text-center text-4xl font-bold md:text-5xl lg:text-6xl animate-fadeIn">
            <span className="text-primary">Пхукет</span> на ладони
          </h1>
          <p className="mb-6 text-center text-lg md:text-xl animate-fadeIn animation-delay-200 text-secondary">
            Аренда недвижимости, транспорта и экскурсий в одном месте
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center text-secondary-light">
              <span className="w-10 h-10 flex items-center justify-center bg-primary/20 rounded-full">
                <MapPin size={18} className="text-primary" />
              </span>
              <span className="ml-2">Лучшие локации</span>
            </div>
            
            <div className="flex items-center text-secondary-light">
              <span className="w-10 h-10 flex items-center justify-center bg-primary/20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary">
                  <path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.75 6.75 0 1113.5 0v4.661c0 .326.277.585.6.544.364-.047.722-.112 1.074-.195a.75.75 0 00.577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75z" />
                  <path fillRule="evenodd" d="M9.75 15.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V16.5a.75.75 0 01.75-.75zm4.5 0a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="ml-2">Мгновенное бронирование</span>
            </div>
            
            <div className="flex items-center text-secondary-light">
              <span className="w-10 h-10 flex items-center justify-center bg-primary/20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary">
                  <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.758A6.753 6.753 0 0018.425 20a.75.75 0 10.564-1.391 5.253 5.253 0 01-4.867-4.867 5.253 5.253 0 014.867-4.867.75.75 0 10-.564-1.39A6.753 6.753 0 009.5 9.933a6.73 6.73 0 00-1.758-2.743 6.753 6.753 0 00-5.6-6.138.75.75 0 00-.859.584A49.422 49.422 0 002.5 5.252v16.998a.75.75 0 001.5 0v-9.099c1.35.236 2.73.415 4.134.534.571.054.966.56.912 1.132a.75.75 0 001.49-.173c.06-.497-.306-.917-.639-1.262a48.657 48.657 0 01-4.586-.591V6.612a48.648 48.648 0 013.423-.348c.571-.006 1.031-.48 1.026-1.051a.75.75 0 00-1.042-.733 32.525 32.525 0 00-3.106.362l-.183.022V2.621A.75.75 0 005.166 2.621z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="ml-2">Лучшие цены</span>
            </div>
          </div>
        </div>

        {/* Форма поиска */}
        <form 
          onSubmit={handleSearch}
          className="w-full max-w-4xl rounded-xl bg-white/10 p-5 backdrop-blur-sm animate-fadeIn animation-delay-400 shadow-lg"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* Выбор типа услуги */}
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
              </div>
              <div className="relative">
                <button
                  type="button"
                  className="w-full text-left rounded-lg border border-white/20 bg-white/10 pl-10 pr-10 py-3 text-secondary placeholder-secondary/70 focus:border-white/40 focus:outline-none cursor-pointer flex items-center justify-between"
                  onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                >
                  <span>{getServiceLabel()}</span>
                  <ChevronDown className="h-5 w-5" />
                </button>
                {showServiceDropdown && (
                  <div className="absolute top-full left-0 mt-2 z-20 bg-dark rounded-lg shadow-lg p-2 w-full">
                    <button
                      type="button"
                      className="text-secondary p-2 rounded w-full text-left hover:bg-dark-light"
                      onClick={() => {
                        setServiceType('all');
                        setShowServiceDropdown(false);
                      }}
                    >
                      Все услуги
                    </button>
                    <button
                      type="button"
                      className="text-secondary p-2 rounded w-full text-left hover:bg-dark-light"
                      onClick={() => {
                        setServiceType('real-estate');
                        setShowServiceDropdown(false);
                      }}
                    >
                      Недвижимость
                    </button>
                    <button
                      type="button"
                      className="text-secondary p-2 rounded w-full text-left hover:bg-dark-light"
                      onClick={() => {
                        setServiceType('transport');
                        setShowServiceDropdown(false);
                      }}
                    >
                      Транспорт
                    </button>
                    <button
                      type="button"
                      className="text-secondary p-2 rounded w-full text-left hover:bg-dark-light"
                      onClick={() => {
                        setServiceType('tours');
                        setShowServiceDropdown(false);
                      }}
                    >
                      Экскурсии
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Выбор места */}
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Куда вы хотите поехать?"
                className="w-full rounded-lg border border-white/20 bg-white/10 pl-10 pr-4 py-3 text-secondary placeholder-secondary/70 focus:border-white/40 focus:outline-none"
              />
            </div>

            {/* Выбор даты */}
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={formatDate(selectedDate)}
                  placeholder="Выберите дату"
                  className="w-full rounded-lg border border-white/20 bg-white/10 pl-10 pr-4 py-3 text-secondary placeholder-secondary/70 focus:border-white/40 focus:outline-none cursor-pointer"
                  onClick={() => setShowCalendar(!showCalendar)}
                />
                {showCalendar && (
                  <div className="absolute top-full left-0 mt-2 z-20 bg-dark rounded-lg shadow-lg p-4">
                    <input
                      type="date"
                      className="text-secondary p-2 border border-white/20 bg-dark-light rounded w-full"
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setShowCalendar(false);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Кнопка поиска */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              <Search className="h-5 w-5" />
              Найти
            </button>
          </div>
        </form>
      </div>

      {/* Индикаторы слайдера */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentImageIndex ? 'bg-primary w-6' : 'bg-white/50'
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection; 