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
    <header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 shadow-md py-2 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <Link href="/" className="flex items-center">
            <div className="relative w-36 sm:w-48 h-12 sm:h-16">
              <Image 
                src="/images/logo.png" 
                alt="Пхукет" 
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Навигация для десктопа */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
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
            <Link 
              href="/blog" 
              className={`relative group py-2 transition-colors ${
                isScrolled ? 'text-dark' : 'text-white'
              }`}
            >
              <span>Блог</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/about" 
              className={`relative group py-2 transition-colors ${
                isScrolled ? 'text-dark' : 'text-white'
              }`}
            >
              <span>О нас</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Иконки и кнопки */}
          <div className="hidden md:flex items-center space-x-6">
            <button className={`hover:text-primary transition-colors ${
              isScrolled ? 'text-dark' : 'text-white'
            }`}>
              <Search size={20} />
            </button>
            
            <Link href="/favorites" className={`hover:text-primary transition-colors ${
              isScrolled ? 'text-dark' : 'text-white'
            }`}>
              <Heart size={20} />
            </Link>
            
            <div className="relative">
              <Link href="/account/bookings" className={`hover:text-primary transition-colors ${
                isScrolled ? 'text-dark' : 'text-white'
              }`}>
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-secondary text-dark text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </Link>
            </div>
            
            {!isLoading && (
              user ? (
                <Link 
                  href="/account" 
                  className={`flex items-center hover:text-primary transition-colors ${
                    isScrolled ? 'text-dark' : 'text-white'
                  }`}
                >
                  <User size={20} className="mr-1" />
                  <span className="hidden lg:inline-block">{user.name}</span>
                </Link>
              ) : (
                <Link 
                  href="/auth/login" 
                  className={`${
                    isScrolled 
                      ? 'bg-primary text-white hover:bg-primary-dark' 
                      : 'bg-white/10 text-white backdrop-blur-sm hover:bg-white/20'
                  } py-2 px-4 rounded-lg transition-all border border-transparent`}
                >
                  Войти
                </Link>
              )
            )}
          </div>

          {/* Мобильное меню */}
          <button
            className={`md:hidden hover:text-primary ${
              isScrolled ? 'text-dark' : 'text-white'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Меню"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Мобильная навигация */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg mt-2 fixed top-[60px] left-0 right-0 max-h-[85vh] overflow-y-auto z-50 pb-safe">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {/* Мобильные ссылки меню */}
              <Link href="/real-estate" className="text-dark hover:text-primary py-3 border-b border-gray-100 flex items-center" onClick={() => setIsMenuOpen(false)}>
                <Building className="mr-3 w-5 h-5 text-primary" />
                <span>Недвижимость</span>
              </Link>
              <Link href="/transport" className="text-dark hover:text-primary py-3 border-b border-gray-100 flex items-center" onClick={() => setIsMenuOpen(false)}>
                <Car className="mr-3 w-5 h-5 text-primary" />
                <span>Транспорт</span>
              </Link>
              <Link href="/tours" className="text-dark hover:text-primary py-3 border-b border-gray-100 flex items-center" onClick={() => setIsMenuOpen(false)}>
                <Compass className="mr-3 w-5 h-5 text-primary" />
                <span>Экскурсии</span>
              </Link>
              <Link href="/blog" className="text-dark hover:text-primary py-3 border-b border-gray-100 flex items-center" onClick={() => setIsMenuOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 w-5 h-5 text-primary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                <span>Блог</span>
              </Link>
              <Link href="/about" className="text-dark hover:text-primary py-3 border-b border-gray-100 flex items-center" onClick={() => setIsMenuOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 w-5 h-5 text-primary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                <span>О нас</span>
              </Link>
              
              <div className="flex flex-wrap items-center gap-4 pt-4 mt-2 border-t border-gray-100">
                <Link href="/favorites" className="flex items-center text-dark hover:text-primary transition-colors">
                  <Heart size={22} className="mr-2" />
                  <span>Избранное</span>
                </Link>
                
                <Link href="/account/bookings" className="flex items-center text-dark hover:text-primary transition-colors">
                  <ShoppingCart size={22} className="mr-2" />
                  <span>Бронирования</span>
                </Link>
                
                {!isLoading && (
                  user ? (
                    <Link 
                      href="/account" 
                      className="w-full mt-3 bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition-all text-center flex items-center justify-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={18} className="mr-2" />
                      Личный кабинет
                    </Link>
                  ) : (
                    <Link 
                      href="/auth/login" 
                      className="w-full mt-3 bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition-all text-center flex items-center justify-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-5 h-5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                      Войти
                    </Link>
                  )
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default MainHeader; 