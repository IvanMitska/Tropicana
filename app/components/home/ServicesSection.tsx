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
      image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      accentColor: 'primary',
      link: '/real-estate',
      stats: '500+ объектов'
    },
    {
      id: 'transport',
      title: 'Аренда транспорта',
      description: 'Автомобили, мотоциклы, скутеры и водный транспорт для комфортного передвижения по острову',
      icon: <Car size={24} />,
      image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      accentColor: 'primary',
      link: '/transport',
      stats: '50+ моделей'
    },
    {
      id: 'tours',
      title: 'Экскурсии',
      description: 'Увлекательные экскурсии по Пхукету и соседним островам с опытными русскоговорящими гидами',
      icon: <Compass size={24} />,
      image: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      accentColor: 'primary',
      link: '/tours',
      stats: '30+ направлений'
    },
    {
      id: 'transfer',
      title: 'Трансферы',
      description: 'Комфортные трансферы из аэропорта в отель и обратно, а также между различными точками острова',
      icon: <Plane size={24} />,
      image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
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
    <section id="services" className="py-16 md:py-24 bg-light relative overflow-hidden" ref={ref}>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
                  className="relative overflow-hidden rounded-2xl h-full transition-all duration-500 bg-white border border-gray-100 shadow-lg hover:shadow-2xl cursor-pointer backdrop-blur-sm"
                  style={{
                    transform: hoveredService === service.id ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
                    boxShadow: hoveredService === service.id ? `0 20px 40px -10px ${getColorClass(service.accentColor, 25)}` : '0 4px 20px -2px rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Современный градиентный фон */}
                  <div 
                    className="absolute inset-0 transition-all duration-700 ease-out"
                    style={{
                      background: hoveredService === service.id 
                        ? `linear-gradient(135deg, ${getColorClass(service.accentColor, 8)} 0%, ${getColorClass(service.accentColor, 3)} 50%, transparent 100%)`
                        : 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, transparent 100%)',
                    }}
                  ></div>
                  
                  {/* Светящийся border эффект */}
                  <div 
                    className="absolute inset-0 rounded-2xl transition-all duration-700 ease-out pointer-events-none"
                    style={{
                      background: hoveredService === service.id 
                        ? `linear-gradient(135deg, ${getColorClass(service.accentColor, 20)}, transparent, ${getColorClass(service.accentColor, 20)})`
                        : 'transparent',
                      opacity: hoveredService === service.id ? 1 : 0,
                      padding: '1px',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'exclude',
                      maskComposite: 'exclude'
                    }}
                  ></div>
                  
                  {/* Контент карточки с улучшенной структурой */}
                  <div className="relative p-6 md:p-8 h-full flex flex-col">
                    {/* Мини фотография с иконкой */}
                    <div className="mb-6 relative">
                      {/* Фоновое изображение */}
                      <div 
                        className="w-full h-32 rounded-2xl overflow-hidden relative transition-all duration-500"
                        style={{
                          transform: hoveredService === service.id ? 'scale(1.05)' : 'scale(1)',
                        }}
                      >
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                          style={{
                            backgroundImage: `url('${service.image}')`,
                            filter: hoveredService === service.id ? 'brightness(1.1) saturate(1.2)' : 'brightness(0.9) saturate(1)',
                          }}
                        ></div>
                        
                        {/* Градиентный overlay */}
                        <div 
                          className="absolute inset-0 transition-all duration-500"
                          style={{
                            background: hoveredService === service.id 
                              ? `linear-gradient(135deg, ${getColorClass(service.accentColor, 30)} 0%, ${getColorClass(service.accentColor, 10)} 50%, transparent 100%)`
                              : 'linear-gradient(135deg, rgba(var(--color-primary), 0.4) 0%, rgba(var(--color-primary), 0.1) 50%, transparent 100%)',
                          }}
                        ></div>
                        
                        {/* Иконка поверх изображения */}
                        <div 
                          className="absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 backdrop-blur-sm z-10"
                          style={{
                            background: hoveredService === service.id 
                              ? 'rgba(var(--color-primary), 0.9)'
                              : 'rgba(255, 255, 255, 0.9)',
                            transform: hoveredService === service.id ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                            boxShadow: hoveredService === service.id ? '0 8px 25px -5px rgba(var(--color-primary), 0.4)' : '0 4px 15px rgba(0,0,0,0.1)'
                          }}
                        >
                          <div 
                            className="transition-all duration-500 z-20 relative"
                            style={{
                              color: hoveredService === service.id ? 'white' : 'rgb(var(--color-primary))',
                              transform: hoveredService === service.id ? 'scale(1.1)' : 'scale(1)'
                            }}
                          >
                            {service.icon}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Заголовок с улучшенной типографикой */}
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">
                      {service.title}
                    </h3>
                    
                    {/* Описание с лучшим контрастом */}
                    <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                      {service.description}
                    </p>
                    
                    {/* Нижняя часть с статистикой и кнопкой */}
                    <div className="flex items-center justify-between mt-auto">
                      <span 
                        className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
                        style={{
                          backgroundColor: hoveredService === service.id 
                            ? getColorClass(service.accentColor, 15)
                            : 'rgba(var(--color-primary), 0.1)',
                          color: hoveredService === service.id 
                            ? getColorClass(service.accentColor, 80)
                            : 'rgb(var(--color-primary))'
                        }}
                      >
                        {service.stats}
                      </span>
                      
                      <div 
                        className="inline-flex items-center text-sm font-semibold transition-all duration-300 group-hover:gap-2 gap-1"
                        style={{
                          color: hoveredService === service.id 
                            ? getColorClass(service.accentColor, 80)
                            : 'rgb(var(--color-primary))'
                        }}
                      >
                        Подробнее 
                        <ArrowRight 
                          className="w-4 h-4 transition-all duration-300"
                          style={{
                            transform: hoveredService === service.id ? 'translateX(4px) scale(1.1)' : 'translateX(0) scale(1)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Декоративные элементы */}
                  <div 
                    className="absolute top-0 right-0 w-20 h-20 transition-all duration-700 ease-out"
                    style={{
                      background: `radial-gradient(circle, ${getColorClass(service.accentColor, 15)} 0%, transparent 70%)`,
                      opacity: hoveredService === service.id ? 1 : 0,
                      transform: hoveredService === service.id ? 'scale(1) translate(25%, -25%)' : 'scale(0.5) translate(50%, -50%)'
                    }}
                  ></div>
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