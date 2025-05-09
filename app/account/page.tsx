'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/hooks/useAuth';
import AccountLayout from '@/app/components/layout/AccountLayout';
import { 
  CalendarIcon, 
  BellIcon, 
  MagnifyingGlassIcon, 
  ArrowPathIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

interface Booking {
  _id: string;
  title: string;
  type: 'property' | 'vehicle' | 'tour' | 'excursion';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  price: number;
  image: string;
}

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  date: string;
  isRead: boolean;
}

// Демо-данные для отображения
const demoBookings: Booking[] = [
  {
    _id: '1',
    title: 'Апартаменты у моря',
    type: 'property',
    status: 'confirmed',
    startDate: '2023-07-15',
    endDate: '2023-07-20',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
  },
  {
    _id: '2',
    title: 'Экскурсия в горы',
    type: 'excursion',
    status: 'pending',
    startDate: '2023-08-10',
    endDate: '2023-08-10',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop',
  },
  {
    _id: '3',
    title: 'Аренда автомобиля BMW X5',
    type: 'vehicle',
    status: 'confirmed',
    startDate: '2023-07-25',
    endDate: '2023-07-30',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
  },
];

const demoNotifications: Notification[] = [
  {
    _id: '1',
    title: 'Бронирование подтверждено',
    message: 'Ваше бронирование апартаментов у моря успешно подтверждено',
    type: 'success',
    date: '2023-07-10T10:30:00',
    isRead: false,
  },
  {
    _id: '2',
    title: 'Напоминание о поездке',
    message: 'Через 3 дня начинается ваша аренда апартаментов у моря',
    type: 'info',
    date: '2023-07-12T09:15:00',
    isRead: false,
  },
  {
    _id: '3',
    title: 'Оставьте отзыв',
    message: 'Как прошла ваша поездка? Пожалуйста, оставьте отзыв',
    type: 'info',
    date: '2023-07-21T14:20:00',
    isRead: true,
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // В реальном приложении здесь будет запрос к API
    setTimeout(() => {
      setActiveBookings(demoBookings);
      setNotifications(demoNotifications);
      setIsLoading(false);
    }, 500);
  }, []);

  const getStatusClass = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'Подтверждено';
      case 'pending':
        return 'Ожидает подтверждения';
      case 'completed':
        return 'Завершено';
      case 'cancelled':
        return 'Отменено';
      default:
        return status;
    }
  };

  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getTypeText = (type: Booking['type']) => {
    switch (type) {
      case 'property':
        return 'Жилье';
      case 'vehicle':
        return 'Транспорт';
      case 'tour':
        return 'Тур';
      case 'excursion':
        return 'Экскурсия';
      default:
        return type;
    }
  };

  return (
    <AccountLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">Добро пожаловать, {user?.name}!</h1>
        <p className="text-gray-600">Ваш личный кабинет на платформе аренды</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 mb-1">Активные бронирования</p>
              <h3 className="text-2xl font-semibold mb-1">{activeBookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length}</h3>
              <p className="text-blue-100 text-sm">Ближайшее через 3 дня</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <CalendarIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <Link href="/account/bookings" className="inline-flex items-center text-sm text-white hover:underline">
              Управление бронированиями
              <ChevronRightIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-100 mb-1">Непрочитанные уведомления</p>
              <h3 className="text-2xl font-semibold mb-1">{notifications.filter(n => !n.isRead).length}</h3>
              <p className="text-purple-100 text-sm">Последнее получено: {notifications.length > 0 ? 'сегодня' : 'нет уведомлений'}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <BellIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <button className="inline-flex items-center text-sm text-white hover:underline">
              Отметить все как прочитанные
              <ChevronRightIcon className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <div className="border rounded-lg">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-medium">Активные бронирования</h2>
              <Link href="/account/bookings" className="text-blue-600 text-sm hover:underline flex items-center">
                Все бронирования 
                <ChevronRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="overflow-hidden">
              {isLoading ? (
                <div className="flex justify-center items-center p-8">
                  <ArrowPathIcon className="w-6 h-6 text-gray-400 animate-spin" />
                </div>
              ) : activeBookings.length > 0 ? (
                <div className="divide-y">
                  {activeBookings.map((booking) => (
                    <div key={booking._id} className="p-4 hover:bg-gray-50">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-24 h-20 overflow-hidden rounded-md flex-shrink-0">
                          <img
                            src={booking.image}
                            alt={booking.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                            <div>
                              <h3 className="font-medium">{booking.title}</h3>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <span className="mr-2">{getTypeText(booking.type)}</span>
                                <span className="text-gray-300 mx-1">•</span>
                                <span>{getFormattedDate(booking.startDate)}</span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(booking.status)}`}>
                                {getStatusText(booking.status)}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="text-sm">
                              <span className="font-medium">{booking.price.toLocaleString('ru-RU')} ₽</span>
                              {booking.type === 'property' || booking.type === 'vehicle' ? (
                                <span className="text-gray-500"> / за весь период</span>
                              ) : null}
                            </div>
                            <Link href={`/account/bookings/${booking._id}`} className="text-blue-600 text-sm hover:underline flex items-center">
                              Подробнее
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">У вас нет активных бронирований</p>
                  <Link href="/account/bookings" className="text-blue-600 hover:underline mt-2 inline-block">
                    Просмотр истории бронирований
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="border rounded-lg">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-medium">Уведомления</h2>
              <button className="text-blue-600 text-sm hover:underline">Все уведомления</button>
            </div>
            <div className="overflow-hidden">
              {isLoading ? (
                <div className="flex justify-center items-center p-8">
                  <ArrowPathIcon className="w-6 h-6 text-gray-400 animate-spin" />
                </div>
              ) : notifications.length > 0 ? (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification._id}
                      className={`p-4 hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 rounded-full p-1.5 ${
                          notification.type === 'success' ? 'bg-green-100 text-green-600' :
                          notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                          notification.type === 'error' ? 'bg-red-100 text-red-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <BellIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <span className="text-xs text-gray-500">
                              {new Date(notification.date).toLocaleDateString('ru-RU')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">У вас нет уведомлений</p>
                </div>
              )}
            </div>
          </div>

          <div className="border rounded-lg mt-6">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Быстрые действия</h2>
            </div>
            <div className="p-4 space-y-3">
              <Link
                href="/real-estate"
                className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="bg-blue-100 text-blue-600 p-2 rounded-md mr-3">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </div>
                <span>Найти жилье</span>
              </Link>
              <Link
                href="/transport"
                className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="bg-green-100 text-green-600 p-2 rounded-md mr-3">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </div>
                <span>Найти транспорт</span>
              </Link>
              <Link
                href="/excursions"
                className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="bg-purple-100 text-purple-600 p-2 rounded-md mr-3">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </div>
                <span>Найти экскурсию</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
} 