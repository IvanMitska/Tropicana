'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import ImageUpload from '@/app/components/admin/ImageUpload';

interface VehicleForm {
  title: string;
  description: string;
  make: string;
  model: string;
  year: number;
  type: string;
  specifications: {
    power: number;
    fuelType: string;
    fuelConsumption: number;
    transmission: string;
    capacity: number;
    doors: number;
  };
  pricing: {
    daily: number;
    deposit: number;
    minimumRental: number;
  };
  location: {
    city: string;
  };
  features: string[];
  status: string;
  images: string[];
}

export default function NewVehiclePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<VehicleForm>({
    defaultValues: {
      type: 'car',
      status: 'available',
      specifications: {
        fuelType: 'gasoline',
        transmission: 'automatic',
        capacity: 4,
        doors: 4
      },
      pricing: {
        minimumRental: 24
      },
      location: {
        city: 'Phuket'
      },
      features: [],
      images: []
    }
  });

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const onSubmit = async (data: VehicleForm) => {
    setIsLoading(true);
    setError('');

    try {
      const formData = {
        ...data,
        images,
        features: data.features.filter(Boolean)
      };

      const response = await fetch('/api/admin/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/vehicles');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Ошибка при создании транспорта');
      }
    } catch (error) {
      setError('Ошибка сети');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (imageUrls: string[]) => {
    setImages(imageUrls);
    setValue('images', imageUrls);
  };

  const featuresList = [
    'Кондиционер', 'GPS навигация', 'Bluetooth', 'USB порты', 'Детские кресла',
    'Багажник на крыше', 'Тонировка', 'Автозапуск', 'Парковочные датчики', 'Камера заднего вида'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-white to-light/50">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/admin/vehicles" className="text-white hover:text-gray-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Добавить транспорт
                </h1>
                <p className="text-white/90 text-sm">Создание нового транспортного средства</p>
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

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-gray-200">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}

              {/* Основная информация */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название *
                  </label>
                  <Input
                    {...register('title', { required: 'Название обязательно' })}
                    placeholder="Toyota Camry 2023"
                    className={errors.title ? 'border-red-300' : ''}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Тип транспорта *
                  </label>
                  <select
                    {...register('type', { required: 'Тип обязателен' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="car">Автомобиль</option>
                    <option value="motorcycle">Мотоцикл</option>
                    <option value="scooter">Скутер</option>
                    <option value="bicycle">Велосипед</option>
                    <option value="boat">Лодка</option>
                    <option value="yacht">Яхта</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание
                </label>
                <textarea
                  {...register('description')}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Подробное описание транспортного средства..."
                />
              </div>

              {/* Характеристики */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Марка *
                  </label>
                  <Input
                    {...register('make', { required: 'Марка обязательна' })}
                    placeholder="Toyota"
                    className={errors.make ? 'border-red-300' : ''}
                  />
                  {errors.make && (
                    <p className="mt-1 text-sm text-red-600">{errors.make.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Модель *
                  </label>
                  <Input
                    {...register('model', { required: 'Модель обязательна' })}
                    placeholder="Camry"
                    className={errors.model ? 'border-red-300' : ''}
                  />
                  {errors.model && (
                    <p className="mt-1 text-sm text-red-600">{errors.model.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Год
                  </label>
                  <Input
                    type="number"
                    {...register('year', { valueAsNumber: true })}
                    placeholder="2023"
                    min="1990"
                    max="2030"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Мощность (л.с.)
                  </label>
                  <Input
                    type="number"
                    {...register('specifications.power', { valueAsNumber: true })}
                    placeholder="150"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Мест
                  </label>
                  <Input
                    type="number"
                    {...register('specifications.capacity', { valueAsNumber: true })}
                    placeholder="4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дверей
                  </label>
                  <Input
                    type="number"
                    {...register('specifications.doors', { valueAsNumber: true })}
                    placeholder="4"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Топливо
                  </label>
                  <select
                    {...register('specifications.fuelType')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="gasoline">Бензин</option>
                    <option value="diesel">Дизель</option>
                    <option value="electric">Электро</option>
                    <option value="hybrid">Гибрид</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Трансмиссия
                  </label>
                  <select
                    {...register('specifications.transmission')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="automatic">Автомат</option>
                    <option value="manual">Механика</option>
                  </select>
                </div>
              </div>

              {/* Цены */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Цена за день (THB) *
                  </label>
                  <Input
                    type="number"
                    {...register('pricing.daily', { 
                      required: 'Цена обязательна',
                      valueAsNumber: true 
                    })}
                    placeholder="1200"
                    className={errors.pricing?.daily ? 'border-red-300' : ''}
                  />
                  {errors.pricing?.daily && (
                    <p className="mt-1 text-sm text-red-600">{errors.pricing.daily.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Залог (THB)
                  </label>
                  <Input
                    type="number"
                    {...register('pricing.deposit', { valueAsNumber: true })}
                    placeholder="5000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Мин. аренда (часов)
                  </label>
                  <Input
                    type="number"
                    {...register('pricing.minimumRental', { valueAsNumber: true })}
                    placeholder="24"
                  />
                </div>
              </div>

              {/* Местоположение */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Город
                </label>
                <Input
                  {...register('location.city')}
                  placeholder="Phuket"
                />
              </div>

              {/* Особенности */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Особенности
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {featuresList.map((feature) => (
                    <label key={feature} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={feature}
                        {...register('features')}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Статус */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Статус
                </label>
                <select
                  {...register('status')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="available">Доступен</option>
                  <option value="rented">Арендован</option>
                  <option value="maintenance">На обслуживании</option>
                </select>
              </div>

              {/* Изображения */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Изображения
                </label>
                <ImageUpload
                  onUpload={handleImageUpload}
                  existingImages={images}
                  multiple={true}
                />
              </div>

              {/* Кнопки */}
              <div className="flex justify-end space-x-4">
                <Link href="/admin/vehicles">
                  <Button type="button" variant="outline">
                    Отмена
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white"
                >
                  {isLoading ? 'Создание...' : 'Создать транспорт'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}