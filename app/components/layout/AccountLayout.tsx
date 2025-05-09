'use client';

import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { 
  UserIcon, 
  DocumentTextIcon, 
  CalendarIcon, 
  CreditCardIcon, 
  HeartIcon, 
  StarIcon,
  ShieldCheckIcon,
  BellIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';

interface AccountLayoutProps {
  children: ReactNode;
}

const menuItems = [
  {
    title: 'Дашборд',
    href: '/account',
    icon: <Cog6ToothIcon className="w-5 h-5" />,
  },
  {
    title: 'Профиль',
    href: '/account/profile',
    icon: <UserIcon className="w-5 h-5" />,
  },
  {
    title: 'Документы',
    href: '/account/documents',
    icon: <DocumentTextIcon className="w-5 h-5" />,
  },
  {
    title: 'Бронирования',
    href: '/account/bookings',
    icon: <CalendarIcon className="w-5 h-5" />,
  },
  {
    title: 'Способы оплаты',
    href: '/account/payments',
    icon: <CreditCardIcon className="w-5 h-5" />,
  },
  {
    title: 'Избранное',
    href: '/account/favorites',
    icon: <HeartIcon className="w-5 h-5" />,
  },
  {
    title: 'Отзывы',
    href: '/account/reviews',
    icon: <StarIcon className="w-5 h-5" />,
  },
  {
    title: 'Безопасность',
    href: '/account/security',
    icon: <ShieldCheckIcon className="w-5 h-5" />,
  },
];

export default function AccountLayout({ children }: AccountLayoutProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Требуется авторизация</h1>
          <p className="mb-4">Пожалуйста, войдите в свой аккаунт для доступа к личному кабинету</p>
          <Link
            href="/auth/login"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Войти
          </Link>
        </div>
      </div>
    );
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка для мобильных устройств */}
      <div className="bg-white shadow-sm lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-semibold">Личный кабинет</h1>
          <button
            onClick={toggleMobileMenu}
            className="text-gray-500 focus:outline-none"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Мобильное меню */}
        {mobileMenuOpen && (
          <div className="px-2 py-3 border-t border-gray-200">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center px-4 py-2 rounded-md mb-1 ${
                  pathname === item.href
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            ))}
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              <span className="ml-3">Выйти</span>
            </button>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Боковое меню (скрыто на мобильных) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center space-x-4 mb-6 p-2">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-xs text-gray-500 truncate max-w-[150px]">{user.email}</p>
                </div>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      pathname === item.href
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </Link>
                ))}
                <button
                  onClick={logout}
                  className="flex items-center w-full px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                  <span className="ml-3">Выйти</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Основное содержимое */}
          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 min-h-[calc(100vh-10rem)]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
} 