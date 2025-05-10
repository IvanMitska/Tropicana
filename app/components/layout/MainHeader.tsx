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
        isScrolled ? 'bg-[#1e3c3c] shadow-lg py-2' : 'bg-[#1e3c3c]/90 py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <Link href="/" className="flex items-center">
            <div className="relative w-48 h-16">
              <Image 
                src="/images/logo.png" 
                alt="Пхукет на ладони" 
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Навигация для десктопа */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/real-estate" 
              className="text-white hover:text-secondary relative group py-2"
            >
              <span>Недвижимость</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e5916e] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/transport" 
              className="text-white hover:text-secondary relative group py-2"
            >
              <span>Транспорт</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e5916e] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/tours" 
              className="text-white hover:text-secondary relative group py-2"
            >
              <span>Экскурсии</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e5916e] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/blog" 
              className="text-white hover:text-secondary relative group py-2"
            >
              <span>Блог</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e5916e] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/about" 
              className="text-white hover:text-secondary relative group py-2"
            >
              <span>О нас</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e5916e] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Иконки и кнопки */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-white hover:text-[#e5916e] transition-colors">
              <Search size={22} />
            </button>
            
            <Link href="/favorites" className="text-white hover:text-[#e5916e] transition-colors">
              <Heart size={22} />
            </Link>
            
            <div className="relative">
              <Link href="/account/bookings" className="text-white hover:text-[#e5916e] transition-colors">
                <ShoppingCart size={22} />
                <span className="absolute -top-1 -right-1 bg-[#e5916e] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </Link>
            </div>
            
            {!isLoading && (
              user ? (
                <Link 
                  href="/account" 
                  className="flex items-center text-white hover:text-[#e5916e] transition-colors"
                >
                  <User size={22} className="mr-1" />
                  <span className="hidden lg:inline-block">{user.name}</span>
                </Link>
              ) : (
                <Link 
                  href="/auth/login" 
                  className="bg-transparent border-2 border-[#e5916e] text-white hover:bg-[#e5916e] py-2 px-4 rounded-md transition-colors text-sm"
                >
                  Войти
                </Link>
              )
            )}
          </div>

          {/* Мобильное меню */}
          <button
            className="md:hidden text-white hover:text-secondary-light"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Мобильная навигация */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1e3c3c] border-t border-[#2a5050] mt-2">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/real-estate" className="text-white hover:text-secondary py-2">
                Недвижимость
              </Link>
              <Link href="/transport" className="text-white hover:text-secondary py-2">
                Транспорт
              </Link>
              <Link href="/tours" className="text-white hover:text-secondary py-2">
                Экскурсии
              </Link>
              <Link href="/blog" className="text-white hover:text-secondary py-2">
                Блог
              </Link>
              <Link href="/about" className="text-white hover:text-secondary py-2">
                О нас
              </Link>
              
              <div className="flex items-center space-x-4 py-2">
                <button className="text-white hover:text-[#e5916e] transition-colors">
                  <Search size={22} />
                </button>
                
                <Link href="/favorites" className="text-white hover:text-[#e5916e] transition-colors">
                  <Heart size={22} />
                </Link>
                
                <Link href="/account/bookings" className="text-white hover:text-[#e5916e] transition-colors">
                  <ShoppingCart size={22} />
                </Link>
                
                {!isLoading && (
                  user ? (
                    <Link 
                      href="/account" 
                      className="bg-[#e5916e] text-white py-2 px-4 rounded-md hover:bg-[#e5916e]/90 transition-colors text-sm ml-auto"
                    >
                      Личный кабинет
                    </Link>
                  ) : (
                    <Link 
                      href="/auth/login" 
                      className="bg-transparent border-2 border-[#e5916e] text-white hover:bg-[#e5916e] py-1.5 px-4 rounded-md transition-colors text-sm ml-auto"
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