'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AccountLayout from '@/app/components/layout/AccountLayout';
import { 
  CalendarIcon, 
  ArrowPathIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronDownIcon,
  XMarkIcon,
  StarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathRoundedSquareIcon,
  ShieldCheckIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { Tab } from '@headlessui/react';

interface Booking {
  _id: string;
  title: string;
  type: 'property' | 'vehicle' | 'tour' | 'excursion';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'refunded';
  startDate: string;
  endDate: string;
  totalAmount: number;
  currency: string;
  image: string;
  location?: string;
  guests?: {
    adults: number;
    children: number;
  };
  canCancel: boolean;
  canReview: boolean;
  hasReview: boolean;
  paymentStatus: 'pending' | 'paid' | 'partially_paid' | 'refunded';
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
    totalAmount: 25000,
    currency: 'RUB',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
    location: 'Сочи',
    guests: {
      adults: 2,
      children: 1,
    },
    canCancel: true,
    canReview: false,
    hasReview: false,
    paymentStatus: 'paid',
  },
  {
    _id: '2',
    title: 'Экскурсия в горы',
    type: 'excursion',
    status: 'pending',
    startDate: '2023-08-10',
    endDate: '2023-08-10',
    totalAmount: 5000,
    currency: 'RUB',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop',
    location: 'Красная Поляна',
    guests: {
      adults: 3,
      children: 0,
    },
    canCancel: true,
    canReview: false,
    hasReview: false,
    paymentStatus: 'pending',
  },
  {
    _id: '3',
    title: 'Аренда автомобиля BMW X5',
    type: 'vehicle',
    status: 'confirmed',
    startDate: '2023-07-25',
    endDate: '2023-07-30',
    totalAmount: 30000,
    currency: 'RUB',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
    location: 'Москва',
    canCancel: true,
    canReview: false,
    hasReview: false,
    paymentStatus: 'paid',
  },
  {
    _id: '4',
    title: 'Тур по Золотому кольцу',
    type: 'tour',
    status: 'completed',
    startDate: '2023-05-01',
    endDate: '2023-05-07',
    totalAmount: 45000,
    currency: 'RUB',
    image: 'https://images.unsplash.com/photo-1579700476231-191ad5cbb9dc?q=80&w=2070&auto=format&fit=crop',
    location: 'Золотое кольцо',
    guests: {
      adults: 2,
      children: 0,
    },
    canCancel: false,
    canReview: true,
    hasReview: false,
    paymentStatus: 'paid',
  },
  {
    _id: '5',
    title: 'Квартира в центре',
    type: 'property',
    status: 'cancelled',
    startDate: '2023-06-10',
    endDate: '2023-06-15',
    totalAmount: 20000,
    currency: 'RUB',
    image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=2070&auto=format&fit=crop',
    location: 'Санкт-Петербург',
    guests: {
      adults: 2,
      children: 0,
    },
    canCancel: false,
    canReview: false,
    hasReview: false,
    paymentStatus: 'refunded',
  },
  {
    _id: '6',
    title: 'Аренда мотоцикла Harley Davidson',
    type: 'vehicle',
    status: 'completed',
    startDate: '2023-06-01',
    endDate: '2023-06-02',
    totalAmount: 15000,
    currency: 'RUB',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop',
    location: 'Москва',
    canCancel: false,
    canReview: true,
    hasReview: true,
    paymentStatus: 'paid',
  },
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    dateRange: 'all',
    status: 'all',
  });

  useEffect(() => {
    // В реальном приложении здесь будет запрос к API
    setTimeout(() => {
      setBookings(demoBookings);
      setFilteredBookings(demoBookings);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [activeTab, searchQuery, filters, bookings]);

  const applyFilters = () => {
    let result = [...bookings];

    // Фильтрация по вкладкам
    if (activeTab === 1) {
      result = result.filter(booking => booking.status === 'pending' || booking.status === 'confirmed');
    } else if (activeTab === 2) {
      result = result.filter(booking => booking.status === 'completed');
    } else if (activeTab === 3) {
      result = result.filter(booking => booking.status === 'cancelled' || booking.status === 'refunded');
    }

    // Фильтрация по поиску
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        booking =>
          booking.title.toLowerCase().includes(query) ||
          booking.location?.toLowerCase().includes(query)
      );
    }

    // Дополнительные фильтры
    if (filters.type !== 'all') {
      result = result.filter(booking => booking.type === filters.type);
    }

    if (filters.status !== 'all') {
      result = result.filter(booking => booking.status === filters.status);
    }

    if (filters.dateRange !== 'all') {
      const now = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(now.getDate() - 30);
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(now.getDate() - 90);
      
      if (filters.dateRange === 'upcoming') {
        result = result.filter(booking => new Date(booking.startDate) > now);
      } else if (filters.dateRange === 'past30days') {
        result = result.filter(
          booking => 
            new Date(booking.endDate) <= now && 
            new Date(booking.endDate) >= thirtyDaysAgo
        );
      } else if (filters.dateRange === 'past90days') {
        result = result.filter(
          booking => 
            new Date(booking.endDate) <= now && 
            new Date(booking.endDate) >= ninetyDaysAgo
        );
      }
    }

    setFilteredBookings(result);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const resetFilters = () => {
    setFilters({
      type: 'all',
      dateRange: 'all',
      status: 'all',
    });
    setSearchQuery('');
  };

  const cancelBooking = async (id: string) => {
    if (!confirm('Вы уверены, что хотите отменить бронирование?')) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Здесь будет запрос к API для отмены бронирования
      
      // Имитация задержки API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Обновляем статус бронирования в списке
      const updatedBookings = bookings.map(booking => 
        booking._id === id 
          ? { ...booking, status: 'cancelled' as const, canCancel: false } 
          : booking
      );
      
      setBookings(updatedBookings);
      setFilteredBookings(updatedBookings);
      
      alert('Бронирование успешно отменено');
    } catch (error) {
      alert('Ошибка при отмене бронирования');
      console.error('Error cancelling booking:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusInfo = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return {
          icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
          text: 'Подтверждено',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
        };
      case 'pending':
        return {
          icon: <ClockIcon className="w-5 h-5 text-yellow-500" />,
          text: 'Ожидает подтверждения',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
        };
      case 'completed':
        return {
          icon: <ShieldCheckIcon className="w-5 h-5 text-blue-500" />,
          text: 'Завершено',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
        };
      case 'cancelled':
        return {
          icon: <XCircleIcon className="w-5 h-5 text-red-500" />,
          text: 'Отменено',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
        };
      case 'refunded':
        return {
          icon: <BanknotesIcon className="w-5 h-5 text-purple-500" />,
          text: 'Возвращен платеж',
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-800',
        };
      default:
        return {
          icon: <CalendarIcon className="w-5 h-5 text-gray-500" />,
          text: status,
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
        };
    }
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const renderBookingCard = (booking: Booking) => {
    const statusInfo = getStatusInfo(booking.status);
    
    return (
      <div key={booking._id} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-48 h-48 sm:h-auto relative">
            <img
              src={booking.image}
              alt={booking.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-white text-gray-800">
                {getTypeText(booking.type)}
              </span>
            </div>
          </div>
          
          <div className="flex-1 p-4 flex flex-col">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900">{booking.title}</h3>
              <div className="flex items-center">
                {statusInfo.icon}
                <span className={`ml-1 text-xs font-medium rounded-full px-2 py-1 ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                  {statusInfo.text}
                </span>
              </div>
            </div>
            
            <div className="mt-1 text-sm text-gray-500">
              {booking.location && (
                <div className="mb-1">
                  <span className="font-medium">Локация:</span> {booking.location}
                </div>
              )}
              <div className="mb-1">
                <span className="font-medium">Даты:</span> {formatDate(booking.startDate)}
                {booking.startDate !== booking.endDate ? ` — ${formatDate(booking.endDate)}` : ''}
              </div>
              {booking.guests && (
                <div className="mb-1">
                  <span className="font-medium">Гости:</span> {booking.guests.adults} взр.
                  {booking.guests.children > 0 ? `, ${booking.guests.children} дет.` : ''}
                </div>
              )}
              <div>
                <span className="font-medium">Статус оплаты:</span> {
                  booking.paymentStatus === 'paid' ? 'Оплачено' :
                  booking.paymentStatus === 'pending' ? 'Ожидает оплаты' :
                  booking.paymentStatus === 'partially_paid' ? 'Частично оплачено' :
                  booking.paymentStatus === 'refunded' ? 'Возвращено' : booking.paymentStatus
                }
              </div>
            </div>
            
            <div className="mt-auto pt-4 flex flex-wrap justify-between items-center gap-2">
              <div className="text-lg font-bold">
                {booking.totalAmount.toLocaleString('ru-RU')} ₽
              </div>
              
              <div className="flex flex-wrap gap-2">
                {booking.canReview && !booking.hasReview && (
                  <Link
                    href={`/account/reviews/new?bookingId=${booking._id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-yellow-600 hover:bg-yellow-700"
                  >
                    <StarIcon className="w-4 h-4 mr-1" />
                    Оставить отзыв
                  </Link>
                )}
                
                {booking.canCancel && (
                  <button
                    onClick={() => cancelBooking(booking._id)}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                    disabled={isLoading}
                  >
                    <XMarkIcon className="w-4 h-4 mr-1" />
                    Отменить
                  </button>
                )}
                
                <Link
                  href={`/account/bookings/${booking._id}`}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700"
                >
                  Подробнее
                </Link>
                
                {booking.status === 'completed' && booking.type !== 'tour' && booking.type !== 'excursion' && (
                  <Link
                    href={`/${booking.type === 'property' ? 'real-estate' : 'transport'}/${booking.type === 'property' ? 'property' : 'vehicle'}/book?repeat=${booking._id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700"
                  >
                    <ArrowPathRoundedSquareIcon className="w-4 h-4 mr-1" />
                    Забронировать снова
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AccountLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Мои бронирования</h1>
        <p className="text-gray-600">Управление бронированиями и история аренды</p>
      </div>

      <Tab.Group
        onChange={(index) => {
          setActiveTab(index);
        }}
      >
        <div className="border-b border-gray-200 mb-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <Tab.List className="flex space-x-1 overflow-x-auto pb-2">
              <Tab 
                className={({ selected }) =>
                  `py-2 px-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                    selected
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`
                }
              >
                Все бронирования
              </Tab>
              <Tab 
                className={({ selected }) =>
                  `py-2 px-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                    selected
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`
                }
              >
                Активные
              </Tab>
              <Tab 
                className={({ selected }) =>
                  `py-2 px-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                    selected
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`
                }
              >
                Завершенные
              </Tab>
              <Tab 
                className={({ selected }) =>
                  `py-2 px-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                    selected
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`
                }
              >
                Отмененные
              </Tab>
            </Tab.List>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Поиск бронирований..."
                  className="py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <FunnelIcon className="h-5 w-5 mr-1" />
                <span className="sr-only sm:not-sr-only">Фильтры</span>
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
          
          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-md mt-2 mb-4">
              <div className="flex flex-wrap gap-4 mb-3">
                <div>
                  <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Тип
                  </label>
                  <select
                    id="type-filter"
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="border border-gray-300 rounded-md py-1.5 pl-2 pr-8 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">Все типы</option>
                    <option value="property">Жилье</option>
                    <option value="vehicle">Транспорт</option>
                    <option value="tour">Туры</option>
                    <option value="excursion">Экскурсии</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Период
                  </label>
                  <select
                    id="date-filter"
                    value={filters.dateRange}
                    onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                    className="border border-gray-300 rounded-md py-1.5 pl-2 pr-8 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">Любой период</option>
                    <option value="upcoming">Предстоящие</option>
                    <option value="past30days">Последние 30 дней</option>
                    <option value="past90days">Последние 90 дней</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Статус
                  </label>
                  <select
                    id="status-filter"
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="border border-gray-300 rounded-md py-1.5 pl-2 pr-8 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">Все статусы</option>
                    <option value="pending">Ожидает подтверждения</option>
                    <option value="confirmed">Подтверждено</option>
                    <option value="completed">Завершено</option>
                    <option value="cancelled">Отменено</option>
                    <option value="refunded">Возврат средств</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <XMarkIcon className="h-4 w-4 mr-1" />
                  Сбросить фильтры
                </button>
              </div>
            </div>
          )}
        </div>

        <Tab.Panels>
          <Tab.Panel>
            {renderBookingsList()}
          </Tab.Panel>
          <Tab.Panel>
            {renderBookingsList()}
          </Tab.Panel>
          <Tab.Panel>
            {renderBookingsList()}
          </Tab.Panel>
          <Tab.Panel>
            {renderBookingsList()}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </AccountLayout>
  );

  function renderBookingsList() {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-12">
          <ArrowPathIcon className="w-8 h-8 text-gray-400 animate-spin" />
        </div>
      );
    }

    if (filteredBookings.length === 0) {
      return (
        <div className="text-center py-12 bg-white rounded-lg border">
          <CalendarIcon className="w-12 h-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Бронирования не найдены</h3>
          <p className="mt-1 text-gray-500">
            {searchQuery || filters.type !== 'all' || filters.dateRange !== 'all' || filters.status !== 'all'
              ? 'Попробуйте изменить параметры фильтрации'
              : 'У вас пока нет бронирований в этой категории'}
          </p>
          {(searchQuery || filters.type !== 'all' || filters.dateRange !== 'all' || filters.status !== 'all') && (
            <button
              onClick={resetFilters}
              className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Сбросить фильтры
            </button>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {filteredBookings.map(booking => renderBookingCard(booking))}
      </div>
    );
  }
} 