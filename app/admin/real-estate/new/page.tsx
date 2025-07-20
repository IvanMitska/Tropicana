'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import ImageUpload from '@/app/components/admin/ImageUpload';

interface RealEstateForm {
  title: string;
  description: string;
  type: string;
  status: string;
  featured: boolean;
  location: {
    city: string;
    district: string;
    address: string;
  };
  price: {
    base: number;
    currency: string;
  };
  specs: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    floor?: number;
    totalFloors?: number;
  };
  amenities: string[];
  images: string[];
}

export default function NewRealEstatePage() {
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
  } = useForm<RealEstateForm>({
    defaultValues: {
      currency: 'THB',
      status: 'available',
      type: 'apartment',
      featured: false,
      amenities: [],
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

  const onSubmit = async (data: RealEstateForm) => {
    setIsLoading(true);
    setError('');

    try {
      const formData = {
        ...data,
        images,
        amenities: data.amenities.filter(Boolean)
      };

      const response = await fetch('/api/admin/real-estate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/real-estate');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Ошибка при создании недвижимости');
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

  const amenitiesList = [
    'Wi-Fi', 'Кондиционер', 'Бассейн', 'Парковка', 'Спортзал', 'Лифт',
    'Охрана', 'Балкон', 'Терраса', 'Кухня', 'Мебель', 'Прачечная'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-white to-light/50">
      {/* Header */}
      <header className="bg-gradient-to-r from-secondary to-primary shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/admin/real-estate" className="text-white hover:text-gray-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Добавить недвижимость
                </h1>
                <p className="text-white/90 text-sm">Создание нового объекта недвижимости</p>
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
                    placeholder="Luxury Villa in Patong"
                    className={errors.title ? 'border-red-300' : ''}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Тип недвижимости *
                  </label>
                  <select
                    {...register('type', { required: 'Тип обязателен' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    <option value="apartment">Квартира</option>
                    <option value="villa">Вилла</option>
                    <option value="house">Дом</option>
                    <option value="condo">Кондоминиум</option>
                    <option value="studio">Студия</option>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="Подробное описание недвижимости..."
                />
              </div>

              {/* Местоположение */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Город *
                  </label>
                  <Input
                    {...register('location.city', { required: 'Город обязателен' })}
                    placeholder="Patong"
                    className={errors.location?.city ? 'border-red-300' : ''}
                  />
                  {errors.location?.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.location.city.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Район
                  </label>
                  <Input
                    {...register('location.district')}
                    placeholder="Kathu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Адрес
                  </label>
                  <Input
                    {...register('location.address')}
                    placeholder="123 Beach Road"
                  />
                </div>
              </div>

              {/* Характеристики */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Спальни
                  </label>
                  <Input
                    type="number"
                    {...register('specs.bedrooms', { valueAsNumber: true })}
                    placeholder="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ванные
                  </label>
                  <Input
                    type="number"
                    {...register('specs.bathrooms', { valueAsNumber: true })}
                    placeholder="2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Площадь (м²)
                  </label>
                  <Input
                    type="number"
                    {...register('specs.area', { valueAsNumber: true })}
                    placeholder="150"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Этаж
                  </label>
                  <Input
                    type="number"
                    {...register('specs.floor', { valueAsNumber: true })}
                    placeholder="5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Всего этажей
                  </label>
                  <Input
                    type="number"
                    {...register('specs.totalFloors', { valueAsNumber: true })}
                    placeholder="10"
                  />
                </div>
              </div>

              {/* Цена */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Цена *
                  </label>
                  <Input
                    type="number"
                    {...register('price.base', { 
                      required: 'Цена обязательна',
                      valueAsNumber: true 
                    })}
                    placeholder="15000"
                    className={errors.price?.base ? 'border-red-300' : ''}
                  />
                  {errors.price?.base && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.base.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Валюта
                  </label>
                  <select
                    {...register('price.currency')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    <option value="THB">THB</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Статус
                  </label>
                  <select
                    {...register('status')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    <option value="available">Доступно</option>
                    <option value="rented">Арендовано</option>
                    <option value="unavailable">Недоступно</option>
                  </select>
                </div>
              </div>

              {/* Удобства */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Удобства
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {amenitiesList.map((amenity) => (
                    <label key={amenity} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={amenity}
                        {...register('amenities')}
                        className="rounded border-gray-300 text-secondary focus:ring-secondary"
                      />
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Рекомендуемое */}
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('featured')}
                    className="rounded border-gray-300 text-secondary focus:ring-secondary"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Рекомендуемое (показывать на главной странице)
                  </span>
                </label>
              </div>

              {/* Изображения */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Изображения
                </label>
                <ImageUpload
                  onImageUpload={handleImageUpload}
                  currentImages={images}
                  maxImages={10}
                />
              </div>

              {/* Кнопки */}
              <div className="flex justify-end space-x-4">
                <Link href="/admin/real-estate">
                  <Button type="button" variant="outline">
                    Отмена
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-secondary to-primary hover:from-secondary-dark hover:to-primary-dark text-white"
                >
                  {isLoading ? 'Создание...' : 'Создать недвижимость'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}