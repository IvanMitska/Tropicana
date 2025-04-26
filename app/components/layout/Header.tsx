'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, User, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import { Button } from '../ui/Button';
import { Dropdown } from '../ui/Dropdown';

const navItems = [
  { label: 'Главная', href: '/' },
  { label: 'Недвижимость', href: '/real-estate' },
  { label: 'Транспорт', href: '/transport' },
  { label: 'Экскурсии', href: '/excursions' },
  { label: 'О нас', href: '/about' },
  { label: 'Контакты', href: '/contacts' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Обработка скролла для изменения стиля хедера
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const userMenuItems = [
    {
      label: 'Профиль',
      icon: <User className="h-4 w-4 mr-2" />,
      href: '/profile',
    },
    {
      label: 'Мои бронирования',
      href: '/profile/bookings',
    },
    {
      label: 'Выйти',
      icon: <LogOut className="h-4 w-4 mr-2" />,
      onClick: () => logout(),
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-32">
              <Image
                src="/images/logo.png"
                alt="RentWeb Logo"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </Link>

          {/* Десктопная навигация */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors 
                  ${pathname === item.href 
                    ? 'text-primary' 
                    : scrolled ? 'text-gray-800 hover:text-primary' : 'text-gray-800 hover:text-primary'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Кнопки авторизации или профиль пользователя */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <Dropdown 
                items={userMenuItems}
                align="right"
                trigger={
                  <Button variant="outline" size="small">
                    <User className="h-4 w-4 mr-2" />
                    {user.name || user.email}
                  </Button>
                }
              />
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="small">
                    Войти
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="small">
                    Регистрация
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Мобильное меню */}
          <button 
            className="md:hidden text-gray-800"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Выпадающее мобильное меню */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-base py-2 border-b border-gray-100 
                    ${pathname === item.href 
                      ? 'text-primary font-medium' 
                      : 'text-gray-800'
                    }`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Мобильные кнопки авторизации */}
              {user ? (
                <>
                  <Link 
                    href="/profile"
                    className="flex items-center text-base py-2 border-b border-gray-100"
                    onClick={closeMenu}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Профиль
                  </Link>
                  <Link 
                    href="/profile/bookings"
                    className="text-base py-2 border-b border-gray-100"
                    onClick={closeMenu}
                  >
                    Мои бронирования
                  </Link>
                  <button 
                    className="flex items-center text-base py-2 text-red-600"
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Выйти
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3 pt-3">
                  <Link href="/login" onClick={closeMenu}>
                    <Button variant="outline" className="w-full">
                      Войти
                    </Button>
                  </Link>
                  <Link href="/register" onClick={closeMenu}>
                    <Button variant="primary" className="w-full">
                      Регистрация
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}; 