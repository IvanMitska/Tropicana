'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Building, MapPin, BedDouble, Bath, Ruler, Shield } from 'lucide-react';
import Link from 'next/link';

interface RealEstateHeroProps {
  hasAnimated: boolean;
}

const RealEstateHero: React.FC<RealEstateHeroProps> = ({ hasAnimated }) => {
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-dark -mt-16 sm:-mt-20 md:-mt-24 pt-16 sm:pt-20 md:pt-24"
    >
      {/* Фоновое изображение с эффектами */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
            transform: heroInView ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 8s ease-out',
            filter: 'saturate(1.2) contrast(1.1)',
          }}
        ></div>
        
        {/* Градиенты и эффекты */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/50"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark to-transparent"></div>
        
        {/* Декоративные элементы */}
        <div 
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ 
            background: 'rgb(var(--color-primary) / 15%)',
            opacity: heroInView ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out'
          }}
        ></div>
      </div>
      
      {/* Основной контент */}
      <div className="container mx-auto px-4 relative z-10 h-full">
        <div className="flex flex-col justify-center items-center min-h-screen py-20 text-center">
          {/* Заголовок и описание */}
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 transition-all duration-700 ease-out ${hasAnimated ? 'opacity-100' : 'opacity-0'}`}>
            <span className={`text-primary inline-block relative transition-all duration-700 delay-300 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Недвижимость
            </span>
            <br/>
            <span className={`inline-block relative transition-all duration-700 delay-[600ms] ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              на Пхукете
            </span>
          </h1>
          
          <p className={`text-lg sm:text-xl text-light/90 max-w-2xl mb-8 transition-all duration-700 delay-[800ms] ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Виллы, апартаменты и дома для краткосрочной и долгосрочной аренды — комфортное размещение с полным сервисом
          </p>
          
          {/* Статистика */}
          <div className={`grid grid-cols-3 gap-4 mb-10 transition-all duration-700 delay-[1000ms] ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl transition-all duration-300 hover:bg-white/15">
              <div className="text-2xl sm:text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-white/70">объектов</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl transition-all duration-300 hover:bg-white/15">
              <div className="text-2xl sm:text-3xl font-bold text-primary">от 800฿</div>
              <div className="text-sm text-white/70">в сутки</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl transition-all duration-300 hover:bg-white/15">
              <div className="text-2xl sm:text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-white/70">поддержка</div>
            </div>
          </div>
          
          {/* Кнопки действий */}
          <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-[1200ms] ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <a 
              href="#all-properties"
              className="group inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-md shadow-lg transition-all hover:shadow-primary/20 hover:shadow-xl"
            >
              <span>Подобрать жильё</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            
            <a 
              href="https://t.me/phuket_dream"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-transparent border border-white/30 text-white hover:bg-white/10 font-medium py-3 px-8 rounded-md transition-all"
            >
              Написать в Telegram
            </a>
          </div>
          
          {/* Преимущества в одну строку для мобильных */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 w-full max-w-4xl transition-all duration-700 delay-[1400ms] ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col items-center">
              <Building className="w-8 h-8 text-primary mb-2" />
              <span className="text-white/80 text-sm text-center">Лучшие объекты</span>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 text-primary mb-2" />
              <span className="text-white/80 text-sm text-center">Удобные локации</span>
            </div>
            <div className="flex flex-col items-center">
              <BedDouble className="w-8 h-8 text-primary mb-2" />
              <span className="text-white/80 text-sm text-center">Полное оснащение</span>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 text-primary mb-2" />
              <span className="text-white/80 text-sm text-center">Безопасная аренда</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealEstateHero;