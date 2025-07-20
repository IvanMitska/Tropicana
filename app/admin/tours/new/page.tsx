'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import ImageUpload from '@/app/components/admin/ImageUpload';

interface TourForm {
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  status: string;
  featured: boolean;
  location: {
    city: string;
    region: string;
    meetingPoint: string;
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
  inclusions: string[];
  exclusions: string[];
  images: string[];
  schedule: {
    startTime: string;
    endTime: string;
    days: string[];
  };
}

export default function NewTourPage() {
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
  } = useForm<TourForm>({
    defaultValues: {
      currency: 'THB',
      status: 'available',
      difficulty: 'easy',
      featured: false,
      categories: [],
      inclusions: [],
      exclusions: [],
      images: [],
      schedule: {
        days: []
      }
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

  const onSubmit = async (data: TourForm) => {
    setIsLoading(true);
    setError('');

    try {
      const formData = {
        ...data,
        images,
        categories: data.categories.filter(Boolean),
        inclusions: data.inclusions.filter(Boolean),
        exclusions: data.exclusions.filter(Boolean)
      };

      const response = await fetch('/api/admin/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/tours');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Ошибка при создании экскурсии');
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

  const categoriesList = [
    'Приключения', 'Культурные', 'Природа', 'Остров', 'Снорклинг', 'Дайвинг',
    'Каякинг', 'Пешие прогулки', 'Храмы', 'Рынки', 'Дикая природа', 'Фотография'
  ];

  const daysList = [
    'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-white to-light/50">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/admin/tours" className="text-white hover:text-gray-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Добавить экскурсию
                </h1>
                <p className="text-white/90 text-sm">Создание новой экскурсии</p>
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
                    Название экскурсии *
                  </label>
                  <Input
                    {...register('title', { required: 'Название обязательно' })}
                    placeholder="Phi Phi Islands Day Trip"
                    className={errors.title ? 'border-red-300' : ''}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Длительность *
                  </label>
                  <Input
                    {...register('duration', { required: 'Длительность обязательна' })}
                    placeholder="8 часов"
                    className={errors.duration ? 'border-red-300' : ''}
                  />
                  {errors.duration && (
                    <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание *
                </label>
                <textarea
                  {...register('description', { required: 'Описание обязательно' })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Подробное описание экскурсии..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              {/* Местоположение */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Город *
                  </label>
                  <Input
                    {...register('location.city', { required: 'Город обязателен' })}
                    placeholder="Phuket"
                    className={errors.location?.city ? 'border-red-300' : ''}
                  />
                  {errors.location?.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.location.city.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Регион
                  </label>
                  <Input
                    {...register('location.region')}
                    placeholder="Andaman Sea"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Место встречи
                  </label>
                  <Input
                    {...register('location.meetingPoint')}
                    placeholder="Patong Beach Pier"
                  />
                </div>
              </div>

              {/* Характеристики */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Сложность
                  </label>
                  <select
                    {...register('difficulty')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="easy">Легкая</option>
                    <option value="moderate">Средняя</option>
                    <option value="hard">Сложная</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Мин. участников
                  </label>
                  <Input
                    type="number"
                    {...register('capacity.min', { valueAsNumber: true })}
                    placeholder="4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Макс. участников
                  </label>
                  <Input
                    type="number"
                    {...register('capacity.max', { valueAsNumber: true })}
                    placeholder="20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Статус
                  </label>
                  <select
                    {...register('status')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="available">Доступен</option>
                    <option value="booked">Забронирован</option>
                    <option value="unavailable">Недоступен</option>
                  </select>
                </div>
              </div>

              {/* Расписание */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Время начала
                  </label>
                  <Input
                    type="time"
                    {...register('schedule.startTime')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Время окончания
                  </label>
                  <Input
                    type="time"
                    {...register('schedule.endTime')}
                  />
                </div>
              </div>

              {/* Дни проведения */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Дни проведения
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {daysList.map((day) => (
                    <label key={day} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={day}
                        {...register('schedule.days')}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Цена */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder="1200"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="THB">THB</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>

              {/* Категории */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Категории
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {categoriesList.map((category) => (
                    <label key={category} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={category}
                        {...register('categories')}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Включено / Исключено */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Включено в стоимость
                  </label>
                  <textarea
                    {...register('inclusions')}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Трансфер, обед, снаряжение для снорклинга..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Не включено в стоимость
                  </label>
                  <textarea
                    {...register('exclusions')}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Личные расходы, алкогольные напитки..."
                  />
                </div>
              </div>

              {/* Рекомендуемая экскурсия */}
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('featured')}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Рекомендуемая экскурсия (показывать на главной странице)
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
                  maxImages={8}
                />
              </div>

              {/* Кнопки */}
              <div className="flex justify-end space-x-4">
                <Link href="/admin/tours">
                  <Button type="button" variant="outline">
                    Отмена
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white"
                >
                  {isLoading ? 'Создание...' : 'Создать экскурсию'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}