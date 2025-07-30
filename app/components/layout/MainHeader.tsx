'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Menu, X, User, Search, ShoppingCart, Heart, Building, Car, Compass } from 'lucide-react';

const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(80);

  // Блокировка скролла при открытом меню только на мобильных устройствах
  useEffect(() => {
    if (isMenuOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    // Очистка при размонтировании компонента
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMenuOpen]);

  // Отслеживание скролла для изменения стиля шапки
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Проверяем начальное состояние
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Получение реальной высоты хедера и закрытие меню при ресайзе
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
      // Закрываем меню при переходе на десктоп
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, [isMenuOpen]);

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-[9998] transition-all duration-300 bg-white/95 py-3 backdrop-blur-sm shadow-sm"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Логотип */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <div className="relative w-36 sm:w-44 md:w-48 h-12 sm:h-14 md:h-16">
                <Image 
                  src="/favicon.png" 
                  alt="Tropicana" 
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
                className="relative group py-2 transition-colors text-secondary hover:text-primary"
              >
                <span>Главная</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/fishing" 
                className="relative group py-2 transition-colors text-secondary hover:text-primary"
              >
                <span>Рыбалка</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/catamarans" 
                className="relative group py-2 transition-colors text-secondary hover:text-primary"
              >
                <span>Катамараны</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/transport" 
                className="relative group py-2 transition-colors text-secondary hover:text-primary"
              >
                <span>Транспорт</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/tours" 
                className="relative group py-2 transition-colors text-secondary hover:text-primary"
              >
                <span>Экскурсии</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Контактная кнопка для десктопа */}
            <div className="hidden md:flex items-center justify-end w-36 sm:w-44 md:w-48">
              <a 
                href="https://wa.me/66994892917" 
                className="group p-2 rounded-lg hover:bg-light-dark/50 transition-all duration-300"
                title="WhatsApp"
              >
                <svg className="w-5 h-5 text-accent hover:text-primary transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>

            {/* Анимированная кнопка бургера */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-light-dark transition-all duration-300 text-secondary"
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
        className={`md:hidden fixed left-0 right-0 bottom-0 z-[9997] transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ top: `${headerHeight}px` }}
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
          className={`absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >

          
          {/* Навигационные ссылки - обновлено */}
          <nav className="pt-6 px-4 pb-4 flex-1">
            <div className="space-y-0">
              {[
                { 
                  href: '/', 
                  label: 'Главная', 
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
                },
                { 
                  href: '/fishing', 
                  label: 'Рыбалка', 
                  icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7l6 6-6 6M21 7l-6 6 6 6M12 3v18" /></svg>
                },
                { 
                  href: '/catamarans', 
                  label: 'Катамараны', 
                  icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
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
                    className="group flex items-center p-4 hover:bg-primary/10 transition-all duration-200 relative"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200 mr-3">
                      {item.icon}
                    </div>
                    <span className="text-base font-medium text-dark group-hover:text-primary transition-colors duration-200 flex-1">
                      {item.label}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <svg className="w-4 h-4 text-accent/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                  {index < 4 && (
                    <div className="border-b border-accent/20 mx-4"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </nav>
          
          {/* Контактная информация внизу - улучшенная */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-accent/20 bg-gradient-to-r from-light to-light-dark/50">
            <div className="text-center">
              <div className="text-sm font-semibold text-secondary mb-3">Связаться с нами</div>
              <div className="space-y-2">
                <div className="flex items-center justify-center text-xs text-accent">
                  <svg className="w-3 h-3 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@tropicana.com
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