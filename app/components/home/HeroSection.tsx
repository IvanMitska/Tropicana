'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Building, Car, Compass, Users, Waves } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
  const [hasAnimated, setHasAnimated] = useState(false);

  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Эффект для анимации при загрузке страницы
  useEffect(() => {
    setHasAnimated(true);
  }, []);

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
            backgroundImage: 'url("https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
            transform: heroInView ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 8s ease-out',
            filter: 'saturate(1.2) contrast(1.1)',
          }}
        ></div>
        
        {/* Градиенты и эффекты */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
        
        {/* Декоративные элементы */}
        <div 
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ 
            background: 'rgba(255, 255, 255, 0.05)',
            opacity: heroInView ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out'
          }}
        ></div>
      </div>
      
      {/* Основной контент */}
      <div className="container mx-auto px-4 relative z-10 h-full">
        <div className="flex flex-col justify-center items-center min-h-screen py-20 text-center">
          {/* Заголовок и описание */}
          <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 transition-all duration-700 ease-out ${hasAnimated ? 'opacity-100' : 'opacity-0'}`}>
            <span className={`inline-block relative transition-all duration-700 delay-300 text-primary text-shadow-tropical ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Tropicana
            </span>
          </h1>
          
          <p className={`text-xl sm:text-2xl md:text-2xl text-white/90 max-w-3xl mb-10 transition-all duration-700 delay-[800ms] ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Морская рыбалка, аренда катамаранов, транспорта и экскурсии для незабываемого отдыха на острове
          </p>
          
          {/* Кнопки сервисов */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 w-full max-w-4xl transition-all duration-700 delay-[1000ms] ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <Link
              href="/fishing"
              className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-primary hover:border-primary/50 hover:text-white py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center gap-3 group-hover:text-white">
                <Waves className="w-6 h-6" />
                <span className="font-medium">Морская рыбалка</span>
              </div>
            </Link>
            
            <Link
              href="/catamarans"
              className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-primary hover:border-primary/50 hover:text-white py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center gap-3 group-hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                <span className="font-medium">Аренда катамаранов</span>
              </div>
            </Link>
            
            <Link
              href="/transport"
              className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-primary hover:border-primary/50 hover:text-white py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center gap-3 group-hover:text-white">
                <Car className="w-6 h-6" />
                <span className="font-medium">Аренда транспорта</span>
              </div>
            </Link>
          </div>
          
          {/* Главная кнопка */}
          <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-[1200ms] ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <a 
              href="#services"
              className="group inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white hover:text-white font-medium py-3 px-8 rounded-md shadow-lg transition-all hover:shadow-primary/20 hover:shadow-xl"
            >
              <span className="group-hover:text-white">Все услуги</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform text-white group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <Waves className="w-8 h-8 text-primary mb-2" />
              <span className="text-white/80 text-sm text-center">Рыбалка</span>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-8 h-8 text-primary mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              <span className="text-white/80 text-sm text-center">Катамараны</span>
            </div>
            <div className="flex flex-col items-center">
              <Compass className="w-8 h-8 text-primary mb-2" />
              <span className="text-white/80 text-sm text-center">Экскурсии</span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-8 h-8 text-primary mb-2" />
              <span className="text-white/80 text-sm text-center">Поддержка</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;