'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Calendar, ChevronDown, Car, Building, Map, Sailboat } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

const HeroSection = () => {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Слайды с информацией о различных услугах
  const slides = [
    {
      id: 'real-estate',
      title: 'Аренда жилья',
      subtitle: 'на Пхукете',
      description: 'Комфортное размещение в виллах и апартаментах с полным сервисом',
      image: '/images/hero-real-estate.jpg',
      ctaText: 'Подобрать жильё',
      ctaLink: '/real-estate',
      stats: [
        { value: '500+', label: 'объектов' },
        { value: 'от 800฿', label: 'в сутки' },
        { value: '24/7', label: 'поддержка' },
      ]
    },
    {
      id: 'transport',
      title: 'Аренда транспорта',
      subtitle: 'на Пхукете',
      description: 'Автомобили, мотоциклы и другой транспорт для комфортного перемещения',
      image: '/images/hero-transport.jpg',
      ctaText: 'Забронировать',
      ctaLink: '/transport',
      stats: [
        { value: '50+', label: 'моделей' },
        { value: 'от 400฿', label: 'в сутки' },
        { value: 'Доставка', label: 'до отеля' },
      ]
    },
    {
      id: 'tours',
      title: 'Экскурсии',
      subtitle: 'на Пхукете',
      description: 'Увлекательные экскурсии по острову и прилегающим территориям',
      image: '/images/hero-bg-3.jpg',
      ctaText: 'Исследовать',
      ctaLink: '/tours',
      stats: [
        { value: '30+', label: 'направлений' },
        { value: 'от 1500฿', label: 'за тур' },
        { value: 'Русский', label: 'язык' },
      ]
    }
  ];

  // Эффект для управления слайдером
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  // Эффект для анимации при загрузке страницы
  useEffect(() => {
    setHasAnimated(true);
  }, []);

  // Получаем текущий слайд для отображения
  const currentSlide = slides[activeSlide];
  
  // Иконки для разных типов услуг
  const getIconForService = (id: string) => {
    switch(id) {
      case 'real-estate': return <Building className="w-6 h-6" />;
      case 'transport': return <Car className="w-6 h-6" />;
      case 'tours': return <Map className="w-6 h-6" />;
      default: return <Sailboat className="w-6 h-6" />;
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[700px] w-full overflow-hidden bg-dark"
    >
      {/* Динамический фон с эффектами */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 z-0 transition-opacity duration-1500 ${
            index === activeSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Фоновое изображение с эффектами */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${slide.image}')`,
              opacity: 0.7,
              filter: 'saturate(1.2) contrast(1.1)',
              transform: index === activeSlide && heroInView ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 8s ease-out, opacity 1.5s ease-in-out',
            }}
          ></div>
          
          {/* Градиенты и эффекты */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-dark to-transparent"></div>
          
          {/* Декоративные элементы */}
          <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-secondary/20 blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-primary/20 blur-3xl"></div>
        </div>
      ))}
      
      {/* Основной контент с асимметричной компоновкой */}
      <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-16 md:py-20">
          {/* Левая колонка - текст и информация */}
          <div className={`lg:col-span-6 transition-all duration-700 ease-out ${hasAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h1 className="text-4xl lg:text-7xl font-bold text-white leading-tight mb-4">
              <span className={`text-secondary inline-block transition-transform duration-700 ease-out delay-300 ${hasAnimated ? 'translate-y-0' : 'translate-y-8'}`}>
                Пхукет
              </span>{' '}
              <span className={`inline-block transition-transform duration-700 ease-out delay-[400ms] ${hasAnimated ? 'translate-y-0' : 'translate-y-8'}`}>
                на ладони
              </span>
              <span className="absolute -bottom-2 left-0 w-24 h-1 bg-secondary/60 rounded-full"></span>
            </h1>
            
            <p className={`text-xl text-light/90 max-w-xl mb-10 transition-all duration-700 delay-[600ms] ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              Аренда недвижимости, транспорта и экскурсии в одном месте для комфортного отдыха на острове Пхукет
            </p>
            
            {/* Карточки с преимуществами */}
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 transition-all duration-700 delay-[800ms] ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center hover:bg-white/15 transition-all">
                <div className="flex items-center justify-center mb-2">
                  <span className="bg-secondary/20 w-10 h-10 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-secondary">
                      <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white">Лучшие локации</h3>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center hover:bg-white/15 transition-all">
                <div className="flex items-center justify-center mb-2">
                  <span className="bg-secondary/20 w-10 h-10 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-secondary">
                      <path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.75 6.75 0 1113.5 0v4.661c0 .326.277.585.6.544.364-.047.722-.112 1.074-.195a.75.75 0 00.577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75z" />
                      <path fillRule="evenodd" d="M9.75 15.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V16.5a.75.75 0 01.75-.75zm4.5 0a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white">Мгновенное бронирование</h3>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center hover:bg-white/15 transition-all">
                <div className="flex items-center justify-center mb-2">
                  <span className="bg-secondary/20 w-10 h-10 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-secondary">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white">24/7 поддержка</h3>
              </div>
            </div>
            
            {/* Статистика текущего слайда */}
            <div className={`flex flex-wrap gap-8 mb-10 transition-all duration-700 delay-[1000ms] ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              {currentSlide.stats.map((stat, idx) => (
                <div key={idx} className="text-white">
                  <div className="text-2xl font-bold text-secondary">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Кнопки действий */}
            <div className={`flex flex-wrap gap-4 transition-all duration-700 delay-[1200ms] ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <Link 
                href={currentSlide.ctaLink}
                className="group inline-flex items-center bg-secondary hover:bg-secondary/90 text-dark font-medium py-3 px-8 rounded-md shadow-lg transition-all hover:shadow-secondary/20 hover:shadow-xl"
              >
                <span>{currentSlide.ctaText}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
                  <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
                </svg>
              </Link>
              
              <Link 
                href="/about"
                className="inline-flex items-center bg-transparent border border-white/30 text-white hover:bg-white/10 font-medium py-3 px-8 rounded-md transition-all"
              >
                О компании
              </Link>
            </div>
          </div>
          
          {/* Правая колонка - интерактивные карточки услуг */}
          <div className="relative lg:col-span-6 min-h-[400px]">
            {/* Большая карточка текущего слайда */}
            <div 
              className={`absolute top-0 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-secondary/20 hover:shadow-2xl ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{zIndex: 5}}
            >
              <div className="relative h-56 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${currentSlide.image}')`,
                    transform: heroInView ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 8s ease-out',
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-secondary/80 text-dark text-xs font-bold px-3 py-1 rounded-full">
                    {currentSlide.stats[1].value} {currentSlide.stats[1].label}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    {getIconForService(currentSlide.id)}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{currentSlide.title}</h3>
                    <p className="text-white/70 text-sm">{currentSlide.subtitle}</p>
                  </div>
                </div>
                <p className="text-white/80 mb-4">{currentSlide.description}</p>
                <Link 
                  href={currentSlide.ctaLink}
                  className="inline-block text-secondary hover:text-white transition-colors"
                >
                  Узнать больше →
                </Link>
              </div>
            </div>
            
            {/* Маленькие карточки для других услуг */}
            {slides
              .filter((_, idx) => idx !== activeSlide)
              .map((slide, idx) => (
                <div 
                  key={slide.id}
                  className={`absolute top-64 ${idx === 0 ? 'left-5 lg:left-24' : 'right-5 lg:right-0'} w-full max-w-xs bg-white/10 backdrop-blur-md rounded-xl overflow-hidden cursor-pointer shadow-lg transition-all duration-700 hover:shadow-xl ${hasAnimated ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-10'}`}
                  style={{zIndex: 4 - idx}}
                  onClick={() => setActiveSlide(slides.findIndex(s => s.id === slide.id))}
                >
                  <div className="relative h-32 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${slide.image}')`,
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center">
                      <span className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        {getIconForService(slide.id)}
                      </span>
                      <h3 className="text-lg font-semibold text-white">{slide.title}</h3>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      
      {/* Индикаторы слайдера */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`h-2.5 rounded-full transition-all ${
              index === activeSlide ? 'bg-secondary w-10' : 'bg-white/50 w-2.5'
            }`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
      
      {/* Скролл вниз */}
      <div className="absolute bottom-6 left-6 transform z-10">
        <a 
          href="#services" 
          className="flex flex-col items-center text-white/70 hover:text-white transition-colors"
        >
          <span className="text-xs mb-2">Открыть сервисы</span>
          <div className="w-6 h-10 rounded-full border border-white/30 flex items-center justify-center p-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default HeroSection; 