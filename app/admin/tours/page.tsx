'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DataTable from '@/app/components/admin/DataTable';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';

interface Tour {
  _id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  status: string;
  featured: boolean;
  location: {
    city: string;
    region?: string;
  };
  price: {
    base: number;
    currency: string;
  };
  capacity: {
    min: number;
    max: number;
  };
  categories: string[];
  createdAt: string;
}

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, [search, statusFilter, currentPage]);

  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter })
      });

      const response = await fetch(`/api/admin/tours?${params}`);
      if (response.ok) {
        const data = await response.json();
        setTours(data.tours || []);
        setTotalPages(data.pagination?.pages || 1);
      } else {
        // Временные данные для демонстрации
        setTours([
          {
            _id: '1',
            title: 'Phi Phi Islands Day Trip',
            description: 'Explore the stunning Phi Phi Islands with snorkeling and beach time',
            duration: '8 hours',
            difficulty: 'easy',
            status: 'available',
            featured: true,
            location: { city: 'Phuket', region: 'Andaman Sea' },
            price: { base: 1200, currency: 'THB' },
            capacity: { min: 4, max: 20 },
            categories: ['Island Hopping', 'Snorkeling'],
            createdAt: '2024-01-15T10:30:00Z'
          },
          {
            _id: '2',
            title: 'Elephant Sanctuary Visit',
            description: 'Ethical elephant sanctuary experience with feeding and bathing',
            duration: '6 hours',
            difficulty: 'easy',
            status: 'available',
            featured: false,
            location: { city: 'Phuket', region: 'Khao Phra Thaeo' },
            price: { base: 1800, currency: 'THB' },
            capacity: { min: 2, max: 12 },
            categories: ['Wildlife', 'Cultural'],
            createdAt: '2024-01-20T14:15:00Z'
          },
          {
            _id: '3',
            title: 'James Bond Island Adventure',
            description: 'Visit the famous James Bond Island with kayaking through caves',
            duration: '10 hours',
            difficulty: 'moderate',
            status: 'available',
            featured: true,
            location: { city: 'Phang Nga', region: 'Phang Nga Bay' },
            price: { base: 1500, currency: 'THB' },
            capacity: { min: 6, max: 25 },
            categories: ['Adventure', 'Sightseeing', 'Kayaking'],
            createdAt: '2024-01-25T09:00:00Z'
          }
        ]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error fetching tours:', error);
      setTours([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (tour: Tour) => {
    if (confirm(`Вы уверены, что хотите удалить "${tour.title}"?`)) {
      try {
        const response = await fetch(`/api/admin/tours/${tour._id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          fetchTours();
        } else {
          alert('Ошибка при удалении');
        }
      } catch (error) {
        console.error('Error deleting tour:', error);
        alert('Ошибка при удалении');
      }
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Легкий';
      case 'moderate': return 'Средний';
      case 'hard': return 'Сложный';
      default: return difficulty;
    }
  };

  const columns = [
    {
      key: 'title' as keyof Tour,
      header: 'Название',
      render: (tour: Tour) => (
        <div className="flex items-center space-x-3">
          <div>
            <p className="font-medium text-gray-900">{tour.title}</p>
            <p className="text-sm text-gray-500">{tour.duration}</p>
          </div>
        </div>
      )
    },
    {
      key: 'location' as keyof Tour,
      header: 'Местоположение',
      render: (tour: Tour) => (
        <div>
          <p className="text-sm text-gray-900">{tour.location.city}</p>
          {tour.location.region && (
            <p className="text-xs text-gray-500">{tour.location.region}</p>
          )}
        </div>
      )
    },
    {
      key: 'capacity' as keyof Tour,
      header: 'Участники',
      render: (tour: Tour) => (
        <div className="text-sm">
          <p>{tour.capacity.min} - {tour.capacity.max} чел.</p>
        </div>
      )
    },
    {
      key: 'difficulty' as keyof Tour,
      header: 'Сложность',
      render: (tour: Tour) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(tour.difficulty)}`}>
          {getDifficultyText(tour.difficulty)}
        </span>
      )
    },
    {
      key: 'price' as keyof Tour,
      header: 'Цена',
      render: (tour: Tour) => (
        <div className="text-sm font-medium">
          {tour.price.base.toLocaleString()} {tour.price.currency}
        </div>
      )
    },
    {
      key: 'status' as keyof Tour,
      header: 'Статус',
      render: (tour: Tour) => (
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            tour.status === 'available' 
              ? 'bg-green-100 text-green-800' 
              : tour.status === 'booked'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {tour.status === 'available' ? 'Доступен' : tour.status === 'booked' ? 'Забронирован' : 'Недоступен'}
          </span>
          {tour.featured && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Рекомендуемый
            </span>
          )}
        </div>
      )
    },
    {
      key: 'actions' as keyof Tour,
      header: 'Действия',
      render: (tour: Tour) => (
        <div className="flex space-x-2">
          <Link href={`/admin/tours/${tour._id}/edit`}>
            <Button size="sm" variant="outline">
              Редактировать
            </Button>
          </Link>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDelete(tour)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Удалить
          </Button>
        </div>
      )
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-white to-light/50">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="text-white hover:text-gray-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Управление экскурсиями
                </h1>
                <p className="text-white/90 text-sm">Добро пожаловать, Admin</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-red-500/20 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Controls */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Input
                  type="text"
                  placeholder="Поиск экскурсий..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Все статусы</option>
                <option value="available">Доступен</option>
                <option value="booked">Забронирован</option>
                <option value="unavailable">Недоступен</option>
              </select>
            </div>
            <Link href="/admin/tours/new">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white">
                + Добавить экскурсию
              </Button>
            </Link>
          </div>

          {/* Table */}
          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden border border-gray-200">
            <DataTable
              columns={columns}
              data={tours}
              loading={isLoading}
              emptyMessage="Экскурсии не найдены"
            />
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Предыдущая
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  {currentPage} из {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Следующая
                </button>
              </nav>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}