'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/app/hooks/useAuth';
import { MapPin, Menu, X, User, Search, ShoppingCart, Heart } from 'lucide-react';

const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isLoading } = useAuth();

  // Отслеживание скролла для изменения стиля шапки
  useEffect(() => {
    // Устанавливаем начальное состояние в зависимости от позиции скролла
    setIsScrolled(window.scrollY > 0);
    
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark shadow-lg py-2' : 'bg-dark/90 py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <Link href="/" className="flex items-center">
            <div className="relative w-48 h-16">
              <Image 
                src="/images/logo-phuket-na-ladoni.png" 
                alt="Пхукет на ладони" 
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Навигация для десктопа */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/real-estate" className="text-secondary hover:text-secondary-light">
              Недвижимость
            </Link>
            <Link href="/transport" className="text-secondary hover:text-secondary-light">
              Транспорт
            </Link>
            <Link href="/tours" className="text-secondary hover:text-secondary-light">
              Экскурсии
            </Link>
            <Link href="/blog" className="text-secondary hover:text-secondary-light">
              Блог
            </Link>
            <Link href="/about" className="text-secondary hover:text-secondary-light">
              О нас
            </Link>
          </nav>

          {/* Иконки и кнопки */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-secondary hover:text-primary">
              <Search size={22} />
            </button>
            
            <Link href="/favorites" className="text-secondary hover:text-primary">
              <Heart size={22} />
            </Link>
            
            <div className="relative">
              <Link href="/account/bookings" className="text-secondary hover:text-primary">
                <ShoppingCart size={22} />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </Link>
            </div>
            
            {!isLoading && (
              user ? (
                <Link 
                  href="/account" 
                  className="flex items-center text-secondary hover:text-primary"
                >
                  <User size={22} className="mr-1" />
                  <span className="hidden lg:inline-block">{user.name}</span>
                </Link>
              ) : (
                <Link 
                  href="/auth/login" 
                  className="btn-outline text-sm px-4 py-1.5"
                >
                  Войти
                </Link>
              )
            )}
          </div>

          {/* Мобильное меню */}
          <button
            className="md:hidden text-secondary hover:text-secondary-light"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Мобильная навигация */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark border-t border-gray-800 mt-2">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/real-estate" className="text-secondary hover:text-secondary-light py-2">
                Недвижимость
              </Link>
              <Link href="/transport" className="text-secondary hover:text-secondary-light py-2">
                Транспорт
              </Link>
              <Link href="/tours" className="text-secondary hover:text-secondary-light py-2">
                Экскурсии
              </Link>
              <Link href="/blog" className="text-secondary hover:text-secondary-light py-2">
                Блог
              </Link>
              <Link href="/about" className="text-secondary hover:text-secondary-light py-2">
                О нас
              </Link>
              
              <div className="flex items-center space-x-4 py-2">
                <button className="text-secondary hover:text-primary">
                  <Search size={22} />
                </button>
                
                <Link href="/favorites" className="text-secondary hover:text-primary">
                  <Heart size={22} />
                </Link>
                
                <Link href="/account/bookings" className="text-secondary hover:text-primary">
                  <ShoppingCart size={22} />
                </Link>
                
                {!isLoading && (
                  user ? (
                    <Link 
                      href="/account" 
                      className="btn-primary text-sm ml-auto"
                    >
                      Личный кабинет
                    </Link>
                  ) : (
                    <Link 
                      href="/auth/login" 
                      className="btn-outline text-sm ml-auto"
                    >
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