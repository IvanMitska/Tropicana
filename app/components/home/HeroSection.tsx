'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Calendar, ChevronDown, Car, Building, Map, Sailboat, ArrowRight, Compass, Plane } from 'lucide-react';
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
      image: 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      accentColor: 'primary',
      ctaText: 'Подобрать жильё',
      ctaLink: '/real-estate',
      icon: <Building className="w-6 h-6" />,
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
      image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      accentColor: 'primary',
      ctaText: 'Забронировать',
      ctaLink: '/transport',
      icon: <Car className="w-6 h-6" />,
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
      image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      accentColor: 'primary',
      ctaText: 'Исследовать',
      ctaLink: '/tours',
      icon: <Compass className="w-6 h-6" />,
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
  
  // Динамический цвет для текущего слайда
  const getColorClass = (colorName, opacity = 100) => {
    const baseColors = {
      primary: `rgb(var(--color-primary) / ${opacity}%)`,
      secondary: `rgb(var(--color-secondary) / ${opacity}%)`,
      accent: `rgb(var(--color-accent) / ${opacity}%)`
    };
    
    return baseColors[colorName] || baseColors.primary;
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[600px] sm:min-h-[700px] lg:min-h-[800px] w-full overflow-hidden bg-dark min-h-adjust"
    >
      {/* Динамический фон с улучшенными эффектами */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 z-0 transition-opacity duration-1500 ${
            index === activeSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Фоновое изображение с улучшенными эффектами */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-65"
            style={{
              backgroundImage: `url('${slide.image}')`,
              opacity: 0.65,
              filter: 'saturate(1.3) contrast(1.1)',
              transform: index === activeSlide && heroInView ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 8s ease-out, opacity 1.5s ease-in-out',
            }}
          ></div>
          
          {/* Современные градиенты и эффекты */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/80 to-dark/40"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark to-transparent"></div>
          
          {/* Декоративные элементы с динамическим цветом */}
          <div 
            className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl"
            style={{ 
              background: getColorClass(slide.accentColor, 15),
              opacity: index === activeSlide ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out'
            }}
          ></div>
          <div 
            className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full blur-3xl"
          style={{
              background: getColorClass(slide.accentColor, 20),
              opacity: index === activeSlide ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out'
            }}
          ></div>
          
          {/* Геометрические элементы для современного вида */}
          <div className="absolute top-[15%] right-[15%] w-32 h-32 border border-white/10 rounded-full"></div>
          <div className="absolute bottom-[20%] left-[10%] w-48 h-48 border border-white/5 rounded-full"></div>
          <div className="absolute top-[30%] left-[5%] w-16 h-16 border border-white/10 rounded-full"></div>
        </div>
      ))}
      
      {/* Основной контент с асимметричной компоновкой */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-10 h-full items-center py-16 sm:py-10 md:py-20">
          {/* Левая колонка - текст и информация */}
          <div className="lg:col-span-6 lg:col-start-1 flex flex-col justify-center text-center sm:text-left">
            <h1 className={`text-3xl sm:text-4xl lg:text-7xl font-bold text-white leading-tight mb-4 md:mb-6 transition-all duration-700 ease-out ${hasAnimated ? 'opacity-100' : 'opacity-0'}`}>
              {/* Wrapper for "Phuket Dream" and its underline, for animation and block layout */}
              <span className={`block relative transition-all duration-700 delay-300 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <span className="text-white">Phuket Dream</span>
                {/* Underline for "Phuket Dream", relative to the span above */}
                <span className="absolute -bottom-3 left-1/2 sm:left-0 transform -translate-x-1/2 sm:translate-x-0 w-24 md:w-32 h-1 bg-primary/60 rounded-full"></span>
              </span>


            </h1>
            
            <p className={`text-base sm:text-xl text-light/90 max-w-xl mx-auto sm:mx-0 mb-5 sm:mb-8 transition-all duration-700 delay-[800ms] ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              Аренда недвижимости, транспорта и экскурсии в одном месте для комфортного отдыха на острове
            </p>
            
            {/* Слайдер переключения услуг в карточках */}
            <div className={`flex flex-col xs:flex-row sm:flex-row sm:flex-wrap gap-2 sm:gap-2 mb-5 sm:mb-8 transition-all duration-700 delay-[1000ms] ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlide(index)}
                  className={`relative px-4 sm:px-5 py-3 sm:py-3 rounded-lg text-sm sm:text-sm font-medium transition-all ${
                    index === activeSlide 
                      ? 'bg-white/10 backdrop-blur-sm text-white' 
                      : 'bg-transparent text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-2">
                    <span className={`w-8 h-8 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                      index === activeSlide
                        ? 'bg-primary/20'
                        : 'bg-white/10'
                    }`}>
                      {slide.icon}
                    </span>
                    {slide.title}
                  </div>
                  {index === activeSlide && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Динамическая статистика */}
            <div className={`grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4 mb-5 sm:mb-8 transition-all duration-700 delay-[1200ms] ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              {currentSlide.stats.map((stat, idx) => (
              <div 
                key={idx} 
                  className={`bg-white/10 backdrop-blur-sm p-3 xs:p-4 sm:p-4 rounded-lg xs:rounded-xl transition-all duration-300 hover:bg-white/15 text-center`}
                >
                  <div 
                    className="text-lg xs:text-xl sm:text-2xl font-bold text-white" 
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs xs:text-sm sm:text-sm text-white font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Кнопки действий */}
            <div className={`flex flex-col xs:flex-row sm:flex-row sm:flex-wrap gap-3 sm:gap-4 transition-all duration-700 delay-[1400ms] ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <Link 
                href={currentSlide.ctaLink}
                className="group inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white hover:text-white font-medium py-3 sm:py-3 px-8 sm:px-8 text-base sm:text-base rounded-md shadow-lg transition-all hover:shadow-primary/20 hover:shadow-xl"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight className="w-5 h-5 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          {/* Правая колонка - интерактивные карточки услуг */}
          <div className="lg:col-span-6 lg:col-start-7 min-h-[300px] sm:min-h-[400px] relative hidden sm:block">
            {/* Плавающие карточки услуг */}
            {slides.map((slide, index) => {
              // Рассчитываем позицию для карточки
              const offset = (index - activeSlide + slides.length) % slides.length;
              
              // Стиль для карточки в зависимости от текущего слайда
              const cardStyle = {
                zIndex: slides.length - offset,
                opacity: offset === 0 ? 1 : offset === 1 ? 0.7 : offset === 2 ? 0.4 : 0,
                transform: `translateX(${offset === 0 ? '0' : offset === 1 ? '15%' : offset === 2 ? '30%' : '45%'}) 
                           translateY(${offset === 0 ? '0' : offset === 1 ? '10%' : offset === 2 ? '20%' : '30%'}) 
                           scale(${offset === 0 ? 1 : offset === 1 ? 0.9 : offset === 2 ? 0.8 : 0.7})`,
              };
              
              return (
                <div 
                  key={slide.id}
                  className={`absolute top-0 right-0 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-xl overflow-hidden transition-all duration-700 shadow-xl hover:shadow-2xl`}
                  style={cardStyle}
                >
                  <div className="relative h-56 overflow-hidden">
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${slide.image}')` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-primary/80 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {slide.stats[1].value}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                        {slide.icon}
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{slide.title}</h3>
                        <p className="text-white/70 text-sm">{slide.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-white/80 mb-6">{slide.description}</p>
                    <Link 
                      href={slide.ctaLink}
                      className="flex items-center text-primary hover:underline"
                    >
                      <span>{slide.ctaText}</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Индикаторы слайдов */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeSlide 
                  ? 'bg-primary scale-110'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Перейти к слайду ${slide.title}`}
            />
          ))}
        </div>
      </div>
      
      {/* Современный индикатор скролла */}
      <div className="absolute bottom-6 right-10 z-10 hidden lg:block">
        <a 
          href="#services" 
          className="flex flex-col items-center text-white/70 hover:text-white transition-colors"
        >
          <span className="text-xs mb-2 rotate-90 origin-center">Scroll</span>
          <div className="w-6 h-10 rounded-full border border-white/30 flex items-center justify-center p-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;