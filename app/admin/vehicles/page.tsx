'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// import { useAdmin } from '@/app/hooks/useAdmin';
import DataTable from '@/app/components/admin/DataTable';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';

interface Vehicle {
  _id: string;
  title: string;
  specs: {
    make: string;
    model: string;
    year: number;
    type: string;
  };
  status: string;
  featured: boolean;
  location: {
    city: string;
  };
  price: {
    base: number;
    currency: string;
  };
  createdAt: string;
}

export default function VehiclesPage() {
  // const { user, logout } = useAdmin();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
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
    fetchVehicles();
  }, [search, statusFilter, currentPage]);

  const fetchVehicles = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter })
      });

      const response = await fetch(`/api/admin/vehicles?${params}`);
      if (response.ok) {
        const data = await response.json();
        setVehicles(data.vehicles || []);
        setTotalPages(data.pagination?.pages || 1);
      } else {
        console.error('Failed to fetch vehicles:', response.status);
        setVehicles([]);
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setVehicles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (vehicle: Vehicle) => {
    if (confirm(`Вы уверены, что хотите удалить "${vehicle.title}"?`)) {
      try {
        const response = await fetch(`/api/admin/vehicles/${vehicle._id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          fetchVehicles();
        } else {
          alert('Ошибка при удалении');
        }
      } catch (error) {
        console.error('Error deleting vehicle:', error);
        alert('Ошибка при удалении');
      }
    }
  };

  const columns = [
    {
      key: 'title' as keyof Vehicle,
      header: 'Название',
      render: (value: string) => (
        <div className="font-medium">{value}</div>
      ),
    },
    {
      key: 'specs' as keyof Vehicle,
      header: 'Модель',
      render: (specs: Vehicle['specs']) => (
        <div>{specs.make} {specs.model} ({specs.year})</div>
      ),
    },
    {
      key: 'specs' as keyof Vehicle,
      header: 'Тип',
      render: (specs: Vehicle['specs']) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {specs.type}
        </span>
      ),
    },
    {
      key: 'status' as keyof Vehicle,
      header: 'Статус',
      render: (status: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          status === 'active' ? 'bg-green-100 text-green-800' :
          status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {status === 'active' ? 'Активно' :
           status === 'maintenance' ? 'На обслуживании' : 'Неактивно'}
        </span>
      ),
    },
    {
      key: 'location' as keyof Vehicle,
      header: 'Город',
      render: (location: Vehicle['location']) => location.city,
    },
    {
      key: 'price' as keyof Vehicle,
      header: 'Цена',
      render: (price: Vehicle['price']) => (
        <div className="font-medium">{price.base} {price.currency}</div>
      ),
    },
    {
      key: 'featured' as keyof Vehicle,
      header: 'Рекомендуемое',
      render: (featured: boolean) => (
        featured ? <span className="text-yellow-500">⭐</span> : '-'
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-white to-light/50">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="text-white hover:text-white/80 transition-colors">
                <span className="text-2xl">←</span>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Управление транспортом
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
        {/* Filters and Actions */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-primary/10">
          <div className="flex gap-4">
            <Input
              placeholder="Поиск по названию или модели..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-primary/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white/50 backdrop-blur-sm"
            >
              <option value="">Все статусы</option>
              <option value="active">Активно</option>
              <option value="maintenance">На обслуживании</option>
              <option value="inactive">Неактивно</option>
            </select>
          </div>
          
          <Link href="/admin/vehicles/new">
            <Button
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <span className="mr-2">+</span>
              Добавить транспорт
            </Button>
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-primary/10">
          <DataTable
            data={vehicles}
            columns={columns}
            onEdit={(vehicle) => window.location.href = `/admin/vehicles/${vehicle._id}`}
            onDelete={handleDelete}
            isLoading={isLoading}
            emptyMessage="Транспорт не найден"
          />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-primary/10">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                variant="outline"
                className="border-primary/20 text-primary hover:bg-primary/10"
              >
                Предыдущая
              </Button>
              
              <span className="flex items-center px-4 py-2 text-sm text-gray-700 font-medium">
                Страница {currentPage} из {totalPages}
              </span>
              
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                variant="outline"
                className="border-primary/20 text-primary hover:bg-primary/10"
              >
                Следующая
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}