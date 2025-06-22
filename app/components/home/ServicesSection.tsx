'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Building, Car, Compass, Plane, MapPin, Sparkles } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const ServicesSection = () => {
  // Состояние для отслеживания наведения
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [animateBackground, setAnimateBackground] = useState(false);
  
  // Хук для отслеживания видимости секции
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Эффект для анимации фоновых элементов
  useEffect(() => {
    if (inView) {
      setAnimateBackground(true);
    }
  }, [inView]);
  
  const services = [
    {
      id: 'real-estate',
      title: 'Аренда недвижимости',
      description: 'Широкий выбор апартаментов, вилл и домов для краткосрочной и долгосрочной аренды на Пхукете',
      icon: <Building size={24} />,
      image: '/images/hero-real-estate.jpg',
      accentColor: 'primary',
      link: '/real-estate',
      stats: '500+ объектов'
    },
    {
      id: 'transport',
      title: 'Аренда транспорта',
      description: 'Автомобили, мотоциклы, скутеры и водный транспорт для комфортного передвижения по острову',
      icon: <Car size={24} />,
      image: '/images/hero-transport.jpg',
      accentColor: 'primary',
      link: '/transport',
      stats: '50+ моделей'
    },
    {
      id: 'tours',
      title: 'Экскурсии',
      description: 'Увлекательные экскурсии по Пхукету и соседним островам с опытными русскоговорящими гидами',
      icon: <Compass size={24} />,
      image: '/images/hero-bg-3.jpg',
      accentColor: 'primary',
      link: '/tours',
      stats: '30+ направлений'
    },
    {
      id: 'transfer',
      title: 'Трансферы',
      description: 'Комфортные трансферы из аэропорта в отель и обратно, а также между различными точками острова',
      icon: <Plane size={24} />,
      image: '/images/transfer-bg.jpg',
      accentColor: 'primary',
      link: '/transfer',
      stats: 'От 900฿'
    },
  ];

  // Динамический цвет для карточек
  const getColorClass = (colorName: string, opacity = 100) => {
    const baseColors: { [key: string]: string } = {
      primary: `rgb(var(--color-primary) / ${opacity}%)`,
      secondary: `rgb(var(--color-secondary) / ${opacity}%)`,
      accent: `rgb(var(--color-accent) / ${opacity}%)`
    };
    
    return baseColors[colorName] || baseColors.primary;
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-light relative overflow-hidden overflow-fix" ref={ref}>
      {/* Анимированные декоративные элементы */}
      <div 
        className={`absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transition-all duration-[2000ms] ease-in-out ${
          animateBackground ? '-translate-y-1/2 translate-x-1/2 opacity-100' : 'translate-y-0 translate-x-0 opacity-0'
        }`}
        style={{
          animationName: 'floatingBubble',
          animationDuration: '15s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'ease-in-out',
          animationDelay: '0.5s',
          animationFillMode: 'both'
        }}
      ></div>
      <div 
        className={`absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl transition-all duration-[2000ms] ease-in-out ${
          animateBackground ? 'translate-y-1/2 -translate-x-1/2 opacity-100' : 'translate-y-0 translate-x-0 opacity-0'
        }`}
        style={{
          animationName: 'floatingBubble',
          animationDuration: '12s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'ease-in-out',
          animationDelay: '0s',
          animationFillMode: 'both'
        }}
      ></div>
      
      {/* Дополнительные анимированные элементы */}
      <div 
        className={`absolute top-1/3 left-[10%] w-32 h-32 bg-primary/10 rounded-full blur-xl transition-all duration-[2000ms] ${
          animateBackground ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{
          animationName: 'pulse',
          animationDuration: '8s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'ease-in-out',
          animationDelay: '1s',
        }}
      ></div>
      <div 
        className={`absolute bottom-1/3 right-[10%] w-40 h-40 bg-primary/10 rounded-full blur-xl transition-all duration-[2000ms] ${
          animateBackground ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{
          animationName: 'pulse',
          animationDuration: '10s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'ease-in-out',
          animationDelay: '2s',
        }}
      ></div>
      
      {/* Плавающие частицы */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, idx) => (
          <div 
            key={`particle-${idx}`}
            className="absolute bg-primary rounded-full opacity-20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationName: 'floatParticle',
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
              animationDirection: idx % 2 === 0 ? 'alternate' : 'alternate-reverse',
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-10 md:mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block text-primary font-semibold mb-2 animate-pulse">СЕРВИСЫ</span>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-dark mb-4 md:mb-6 relative overflow-hidden">
            <span className={`inline-block transition-all duration-700 delay-150 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Все, что нужно для отдыха
            </span> 
            <br className="hidden xs:block" />
            <span className={`text-primary inline-block transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              в одном месте
            </span>
            <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 md:w-24 h-1 bg-primary rounded-full transition-all duration-700 delay-500 ${inView ? 'md:w-32 opacity-100' : 'w-0 opacity-0'}`}></span>
          </h2>
          <p className={`text-base md:text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Полный спектр услуг для комфортного отдыха на Пхукете
          </p>
          <div className={`flex items-center justify-center gap-2 mt-4 transition-all duration-700 delay-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <Sparkles className="text-primary w-4 h-4 md:w-5 md:h-5 animate-spin-slow" />
            <span className="text-gray-500 text-xs md:text-sm">Проверенное качество</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {services.map((service, index) => (
              <Link
                key={service.id}
                href={service.link}
                className={`group transition-all duration-700 ease-out block`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(50px)'
                }}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div 
                  className="relative overflow-hidden rounded-xl h-full transition-all duration-500 border border-gray-200 shadow-md hover:shadow-xl cursor-pointer"
                  style={{
                    transform: hoveredService === service.id ? 'translateY(-8px)' : 'translateY(0)',
                    boxShadow: hoveredService === service.id ? `0 8px 30px -5px ${getColorClass(service.accentColor, 20)}` : ''
                  }}
                >
                  {/* Анимированная рамка при наведении */}
                  <div 
                    className="absolute inset-0 rounded-xl transition-all duration-700 ease-out pointer-events-none"
                    style={{
                      borderWidth: hoveredService === service.id ? '2px' : '0px',
                      borderStyle: 'solid',
                      borderColor: getColorClass(service.accentColor, 50),
                      opacity: hoveredService === service.id ? 1 : 0,
                      boxSizing: 'border-box',
                    }}
                  ></div>
                  
                  {/* Фоновое изображение с улучшенной анимацией */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
                    style={{
                      backgroundImage: `url('${service.image}')`,
                      opacity: hoveredService === service.id ? 0.9 : 0.15,
                      transform: hoveredService === service.id ? 'scale(1.1) rotate(1deg)' : 'scale(1) rotate(0deg)'
                    }}
                  ></div>
                  
                  {/* Цветной градиент в зависимости от accentColor */}
                  <div 
                    className="absolute inset-0 transition-all duration-700" 
                    style={{
                      background: `linear-gradient(145deg, ${getColorClass(service.accentColor, hoveredService === service.id ? 25 : 15)}, transparent)`,
                      opacity: hoveredService === service.id ? 1 : 0.8
                    }}
                  ></div>
                  
                  {/* Контент карточки */}
                  <div className="p-5 md:p-6">
                    <div className="flex items-start mb-4">
                      <div className="mr-4 flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        {service.icon}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-dark">{service.title}</h3>
                    </div>
                    
                    <p className="text-sm md:text-base text-gray-600 mb-4">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs md:text-sm font-medium text-primary bg-primary/10 py-1 px-3 rounded-full">
                        {service.stats}
                      </span>
                      
                      <span className="text-primary hover:text-primary-dark transition-colors flex items-center text-sm md:text-base">
                        Подробнее 
                        <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
          ))}
        </div>
        
        {/* Плавающие элементы фона с анимацией */}
        <div 
          className={`absolute top-1/4 right-1/4 w-24 h-24 border border-primary/10 rounded-full transition-all duration-[2000ms] ${
            animateBackground ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          style={{
            animationName: 'floating',
            animationDuration: '10s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}
        ></div>
        <div 
          className={`absolute bottom-1/4 left-1/3 w-16 h-16 border border-primary/10 rounded-full transition-all duration-[2000ms] ${
            animateBackground ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          style={{
            animationName: 'floating',
            animationDuration: '7s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
            animationDelay: '1s',
          }}
        ></div>
        <div 
          className={`absolute top-2/3 right-1/3 w-8 h-8 bg-primary/5 rounded-full transition-all duration-[2000ms] ${
            animateBackground ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          style={{
            animationName: 'floating',
            animationDuration: '8s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
            animationDelay: '0.5s',
          }}
        ></div>
      </div>
      
      {/* CSS-анимации */}
      <style jsx>{`
        @keyframes floating {
          0% { transform: translate(0, 0); }
          50% { transform: translate(0, 15px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes floatingBubble {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10px, 10px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
          100% { transform: scale(1); opacity: 0.5; }
        }
        
        @keyframes floatParticle {
          0% { transform: translate(0, 0); }
          50% { transform: translate(100px, 50px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection; 