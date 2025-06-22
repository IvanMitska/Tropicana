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
      className="relative h-[600px] md:h-[700px] w-full overflow-hidden bg-dark"
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
        <div 
          className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: 'rgb(var(--color-secondary) / 10%)',
            opacity: heroInView ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out'
          }}
        ></div>
        
        {/* Геометрические элементы */}
        <div className="absolute top-[15%] right-[15%] w-32 h-32 border border-white/10 rounded-full"></div>
        <div className="absolute bottom-[20%] left-[10%] w-48 h-48 border border-white/5 rounded-full"></div>
        <div className="absolute top-[30%] left-[5%] w-16 h-16 border border-white/10 rounded-full"></div>
      </div>
      
      {/* Основной контент */}
      <div className="container mx-auto px-4 relative z-10 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 h-full items-center py-20">
          {/* Левая колонка - текст и информация */}
          <div className="lg:col-span-6 lg:col-start-1 flex flex-col justify-center">
            <h1 className={`text-4xl lg:text-6xl font-bold text-white leading-tight mb-6 transition-all duration-700 ease-out ${hasAnimated ? 'opacity-100' : 'opacity-0'}`}>
              <span className={`text-primary inline-block relative transition-all duration-700 delay-300 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Недвижимость
              </span>
              <br/>
              <span className={`inline-block relative transition-all duration-700 delay-[600ms] ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                на Пхукете
              </span>
              <span className="absolute -bottom-3 left-0 w-32 h-1 bg-primary/60 rounded-full"></span>
            </h1>
            
            <p className={`text-xl text-light/90 max-w-xl mb-10 transition-all duration-700 delay-[800ms] ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              Виллы, апартаменты и дома для краткосрочной и долгосрочной аренды — комфортное размещение с полным сервисом
            </p>
            
            {/* Статистика */}
            <div className={`grid grid-cols-3 gap-4 mb-10 transition-all duration-700 delay-[1000ms] ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl transition-all duration-300 hover:bg-white/15">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-white/70">объектов</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl transition-all duration-300 hover:bg-white/15">
                <div className="text-2xl font-bold text-primary">от 800฿</div>
                <div className="text-sm text-white/70">в сутки</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl transition-all duration-300 hover:bg-white/15">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-white/70">поддержка</div>
              </div>
            </div>
            
            {/* Кнопки действий */}
            <div className={`flex flex-wrap gap-4 transition-all duration-700 delay-[1200ms] ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <a 
                href="#property-search"
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
          </div>
          
          {/* Правая колонка - карточки преимуществ */}
          <div className="lg:col-span-5 lg:col-start-8">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 transition-all duration-700 delay-[1000ms] ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Карточка 1 */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg transform transition-transform hover:translate-y-[-5px] hover:shadow-xl">
                <div className="flex items-center justify-center mb-4">
                  <span className="bg-primary/20 w-14 h-14 rounded-full flex items-center justify-center">
                    <Building className="w-7 h-7 text-primary" />
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-center text-white mb-2">Лучшие объекты</h3>
                <p className="text-center text-white/80 text-sm">Тщательно проверенные объекты недвижимости высокого качества</p>
              </div>
              
              {/* Карточка 2 */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg transform transition-transform hover:translate-y-[-5px] hover:shadow-xl">
                <div className="flex items-center justify-center mb-4">
                  <span className="bg-primary/20 w-14 h-14 rounded-full flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-primary" />
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-center text-white mb-2">Удобное расположение</h3>
                <p className="text-center text-white/80 text-sm">Выбор локаций в популярных и удобных районах острова</p>
              </div>
              
              {/* Карточка 3 */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg transform transition-transform hover:translate-y-[-5px] hover:shadow-xl">
                <div className="flex items-center justify-center mb-4">
                  <span className="bg-primary/20 w-14 h-14 rounded-full flex items-center justify-center">
                    <BedDouble className="w-7 h-7 text-primary" />
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-center text-white mb-2">Полное оснащение</h3>
                <p className="text-center text-white/80 text-sm">Комфортные условия проживания со всем необходимым</p>
              </div>
              
              {/* Карточка 4 */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg transform transition-transform hover:translate-y-[-5px] hover:shadow-xl">
                <div className="flex items-center justify-center mb-4">
                  <span className="bg-primary/20 w-14 h-14 rounded-full flex items-center justify-center">
                    <Shield className="w-7 h-7 text-primary" />
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-center text-white mb-2">Безопасная аренда</h3>
                <p className="text-center text-white/80 text-sm">Проверенные владельцы и прозрачные условия аренды</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealEstateHero; 