'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/app/hooks/useAuth';
import { MapPin, Menu, X, User, Search, ShoppingCart, Heart, Building, Car, Compass } from 'lucide-react';

const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isLoading } = useAuth();

  // Блокировка скролла при открытом меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Очистка при размонтировании компонента
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Отслеживание скролла для изменения стиля шапки
  useEffect(() => {
    // Всегда показываем хэдер, независимо от положения скролла
    setIsScrolled(true);
    
    const handleScroll = () => {
      // Хэдер всегда виден, меняется только стиль
      setIsScrolled(true);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-[9998] transition-all duration-300 bg-white/95 shadow-md py-3 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Логотип */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <div className="relative w-36 sm:w-44 md:w-48 h-12 sm:h-14 md:h-16">
                <Image 
                  src="/images/logo-header-dream.png" 
                  alt="Phuket Dream" 
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Навигация для десктопа - по центру */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-8 flex-1 justify-center">
              <Link 
                href="/" 
                className={`relative group py-2 transition-colors ${
                  isScrolled ? 'text-dark' : 'text-white'
                }`}
              >
                <span>Главная</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/real-estate" 
                className={`relative group py-2 transition-colors ${
                  isScrolled ? 'text-dark' : 'text-white'
                }`}
              >
                <span>Недвижимость</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/transport" 
                className={`relative group py-2 transition-colors ${
                  isScrolled ? 'text-dark' : 'text-white'
                }`}
              >
                <span>Транспорт</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/tours" 
                className={`relative group py-2 transition-colors ${
                  isScrolled ? 'text-dark' : 'text-white'
                }`}
              >
                <span>Экскурсии</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Пустое место для балансировки макета */}
            <div className="hidden md:block w-36 sm:w-44 md:w-48"></div>

            {/* Анимированная кнопка бургера */}
            <button
              className={`md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 ${
                isScrolled ? 'text-dark' : 'text-white'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Меню"
            >
              <div className="relative w-6 h-6">
                {/* Анимированные линии бургера */}
                <span className={`absolute left-0 top-1 w-6 h-0.5 bg-current transition-all duration-300 transform origin-center ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : 'rotate-0 translate-y-0'
                }`}></span>
                <span className={`absolute left-0 top-3 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}></span>
                <span className={`absolute left-0 top-5 w-6 h-0.5 bg-current transition-all duration-300 transform origin-center ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : 'rotate-0 translate-y-0'
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Мобильная навигация - боковое меню */}
      <div 
        className={`md:hidden fixed inset-0 z-[99999] transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Темный overlay */}
        <div 
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Боковая панель */}
        <div 
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Заголовок меню */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
            <div className="flex items-center">
              <div className="relative w-8 h-8 mr-3">
                <Image 
                  src="/images/logo-header-dream.png" 
                  alt="Phuket Dream" 
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-dark">Phuket Dream</h3>
                <p className="text-xs text-gray-600">Ваш отдых на Пхукете</p>
              </div>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
          
          {/* Навигационные ссылки - обновлено */}
          <nav className="p-4 flex-1">
            <div className="space-y-0">
              {[
                { 
                  href: '/', 
                  label: 'Главная', 
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
                },
                { 
                  href: '/real-estate', 
                  label: 'Недвижимость', 
                  icon: <Building className="w-5 h-5" />
                },
                { 
                  href: '/transport', 
                  label: 'Транспорт', 
                  icon: <Car className="w-5 h-5" />
                },
                { 
                  href: '/tours', 
                  label: 'Экскурсии', 
                  icon: <Compass className="w-5 h-5" />
                }
              ].map((item, index) => (
                <React.Fragment key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="group flex items-center p-4 hover:bg-primary/5 transition-all duration-200 relative"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200 mr-3">
                      {item.icon}
                    </div>
                    <span className="text-base font-medium text-gray-800 group-hover:text-primary transition-colors duration-200 flex-1">
                      {item.label}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                  {index < 3 && (
                    <div className="border-b border-gray-200 mx-4"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </nav>
          
          {/* Контактная информация внизу - улучшенная */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-700 mb-3">Связаться с нами</div>
              <div className="space-y-2">
                <div className="flex items-center justify-center text-xs text-gray-600">
                  <svg className="w-3 h-3 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@phuketdream.com
                </div>
                <div className="flex items-center justify-center text-xs text-gray-600">
                  <svg className="w-3 h-3 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +66 123 456 789
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHeader; 