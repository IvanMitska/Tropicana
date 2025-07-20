'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DataTable from '@/app/components/admin/DataTable';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';

interface RealEstate {
  _id: string;
  title: string;
  type: string;
  status: string;
  featured: boolean;
  location: {
    city: string;
    district?: string;
  };
  price: {
    base: number;
    currency: string;
  };
  specs: {
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
  };
  createdAt: string;
}

export default function RealEstatePage() {
  const [realEstate, setRealEstate] = useState<RealEstate[]>([]);
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
    fetchRealEstate();
  }, [search, statusFilter, currentPage]);

  const fetchRealEstate = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter })
      });

      const response = await fetch(`/api/admin/real-estate?${params}`);
      if (response.ok) {
        const data = await response.json();
        setRealEstate(data.realEstate || []);
        setTotalPages(data.pagination?.pages || 1);
      } else {
        // Временные данные для демонстрации
        setRealEstate([
          {
            _id: '1',
            title: 'Luxury Villa in Patong',
            type: 'villa',
            status: 'available',
            featured: true,
            location: { city: 'Patong', district: 'Kathu' },
            price: { base: 15000, currency: 'THB' },
            specs: { bedrooms: 3, bathrooms: 2, area: 200 },
            createdAt: '2024-01-15T10:30:00Z'
          },
          {
            _id: '2', 
            title: 'Modern Apartment in Kata',
            type: 'apartment',
            status: 'available',
            featured: false,
            location: { city: 'Kata', district: 'Muang' },
            price: { base: 8000, currency: 'THB' },
            specs: { bedrooms: 2, bathrooms: 1, area: 80 },
            createdAt: '2024-01-20T14:15:00Z'
          }
        ]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error fetching real estate:', error);
      // Фиктивные данные в случае ошибки
      setRealEstate([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (property: RealEstate) => {
    if (confirm(`Вы уверены, что хотите удалить "${property.title}"?`)) {
      try {
        const response = await fetch(`/api/admin/real-estate/${property._id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          fetchRealEstate();
        } else {
          alert('Ошибка при удалении');
        }
      } catch (error) {
        console.error('Error deleting real estate:', error);
        alert('Ошибка при удалении');
      }
    }
  };

  const columns = [
    {
      key: 'title' as keyof RealEstate,
      header: 'Название',
      render: (property: RealEstate) => (
        <div className="flex items-center space-x-3">
          <div>
            <p className="font-medium text-gray-900">{property.title}</p>
            <p className="text-sm text-gray-500">{property.type}</p>
          </div>
        </div>
      )
    },
    {
      key: 'location' as keyof RealEstate,
      header: 'Местоположение',
      render: (property: RealEstate) => (
        <div>
          <p className="text-sm text-gray-900">{property.location.city}</p>
          {property.location.district && (
            <p className="text-xs text-gray-500">{property.location.district}</p>
          )}
        </div>
      )
    },
    {
      key: 'specs' as keyof RealEstate,
      header: 'Характеристики',
      render: (property: RealEstate) => (
        <div className="text-sm">
          <p>{property.specs.bedrooms || 0} спален</p>
          <p>{property.specs.bathrooms || 0} ванных</p>
          <p>{property.specs.area || 0} м²</p>
        </div>
      )
    },
    {
      key: 'price' as keyof RealEstate,
      header: 'Цена',
      render: (property: RealEstate) => (
        <div className="text-sm font-medium">
          {property.price.base.toLocaleString()} {property.price.currency}
        </div>
      )
    },
    {
      key: 'status' as keyof RealEstate,
      header: 'Статус',
      render: (property: RealEstate) => (
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            property.status === 'available' 
              ? 'bg-green-100 text-green-800' 
              : property.status === 'rented'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {property.status === 'available' ? 'Доступно' : property.status === 'rented' ? 'Арендовано' : 'Недоступно'}
          </span>
          {property.featured && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Рекомендуемое
            </span>
          )}
        </div>
      )
    },
    {
      key: 'actions' as keyof RealEstate,
      header: 'Действия',
      render: (property: RealEstate) => (
        <div className="flex space-x-2">
          <Link href={`/admin/real-estate/${property._id}/edit`}>
            <Button size="sm" variant="outline">
              Редактировать
            </Button>
          </Link>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDelete(property)}
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
      <header className="bg-gradient-to-r from-secondary to-primary shadow-xl">
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
                  Управление недвижимостью
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
                  placeholder="Поиск недвижимости..."
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
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option value="">Все статусы</option>
                <option value="available">Доступно</option>
                <option value="rented">Арендовано</option>
                <option value="unavailable">Недоступно</option>
              </select>
            </div>
            <Link href="/admin/real-estate/new">
              <Button className="bg-gradient-to-r from-secondary to-primary hover:from-secondary-dark hover:to-primary-dark text-white">
                + Добавить недвижимость
              </Button>
            </Link>
          </div>

          {/* Table */}
          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden border border-gray-200">
            <DataTable
              columns={columns}
              data={realEstate}
              loading={isLoading}
              emptyMessage="Недвижимость не найдена"
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