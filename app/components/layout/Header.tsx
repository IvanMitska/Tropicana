'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, User, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/Button';
import { Dropdown, DropdownItem } from '../ui/Dropdown';

const navigation = [
  { name: 'Главная', href: '/' },
  { name: 'Недвижимость', href: '/real-estate' },
  { name: 'Транспорт', href: '/transport' },
  { name: 'Туры', href: '/tours' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
            <div className="relative h-16 w-52">
              <Image
                src="/favicon.png"
                alt="Tropicana логотип"
                fill
                sizes="(max-width: 768px) 100vw, 256px"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </Link>

          {/* Десктопная навигация */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors 
                  ${pathname === item.href 
                    ? 'text-primary' 
                    : scrolled ? 'text-gray-800 hover:text-primary' : 'text-gray-800 hover:text-primary'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>


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
              {navigation.map((item) => (
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
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}; 