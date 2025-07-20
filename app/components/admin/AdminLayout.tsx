'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdmin } from '@/app/hooks/useAdmin';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const pathname = usePathname();
  const { user, logout } = useAdmin();

  const navigation = [
    { name: 'Главная', href: '/admin/dashboard', icon: '🏠' },
    { name: 'Транспорт', href: '/admin/vehicles', icon: '🚗' },
    { name: 'Недвижимость', href: '/admin/real-estate', icon: '🏡' },
    { name: 'Экскурсии', href: '/admin/tours', icon: '🗺️' },
  ];

  const handleLogout = async () => {
    await logout();
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-white to-light/50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-dark to-dark-light shadow-2xl">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-primary/20 bg-primary/10 backdrop-blur-sm">
            <h1 className="text-xl font-bold text-white">
              Phuket Dream
            </h1>
            <div className="ml-2 px-2 py-1 bg-primary/20 rounded-lg">
              <span className="text-xs text-primary font-medium">АДМИН</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'text-gray-300 hover:bg-primary/20 hover:text-white'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 ${
                    isActive
                      ? 'bg-white/20'
                      : 'bg-white/10 group-hover:bg-white/20'
                  }`}>
                    <span className="text-lg">{item.icon}</span>
                  </div>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-primary/20">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                <span className="text-primary font-bold">👤</span>
              </div>
              <div className="flex-1 ml-3">
                <p className="text-sm font-medium text-white truncate">{user?.email}</p>
                <p className="text-xs text-gray-400">Администратор</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-3 py-2 text-sm text-gray-300 hover:bg-red-500/20 hover:text-red-300 rounded-xl transition-all duration-300 group"
            >
              <span className="mr-2">🚪</span>
              Выйти
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-primary/10">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{title}</h1>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}