'use client';

import React, { useState, useEffect } from 'react';
import AccountLayout from '@/app/components/layout/AccountLayout';
import { 
  HeartIcon, 
  ArrowPathIcon,
  HomeIcon,
  TruckIcon,
  MapIcon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';
import { Tab } from '@headlessui/react';
import Link from 'next/link';
import { toast } from 'sonner';

// Типы данных для избранного
interface FavoriteItem {
  _id: string;
  title: string;
  type: 'property' | 'vehicle' | 'tour' | 'excursion';
  image: string;
  price: number;
  currency: string;
  location?: string;
  rating?: number;
  url: string;
}

// Демо-данные
const demoFavorites: FavoriteItem[] = [
  {
    _id: '1',
    title: 'Уютные апартаменты с видом на море',
    type: 'property',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
    price: 5000,
    currency: 'THB',
    location: 'Сочи',
    rating: 4.8,
    url: '/real-estate/property/1',
  },
  {
    _id: '2',
    title: 'Экскурсия в горы с гидом',
    type: 'excursion',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop',
    price: 3000,
    currency: 'THB',
    location: 'Красная Поляна',
    rating: 4.9,
    url: '/excursions/2',
  },
  {
    _id: '3',
    title: 'BMW X5',
    type: 'vehicle',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
    price: 6000,
    currency: 'THB',
    location: 'Москва',
    rating: 4.7,
    url: '/transport/vehicle/3',
  },
  {
    _id: '4',
    title: 'Тур по Золотому кольцу',
    type: 'tour',
    image: 'https://images.unsplash.com/photo-1579700476231-191ad5cbb9dc?q=80&w=2070&auto=format&fit=crop',
    price: 15000,
    currency: 'THB',
    location: 'Центральная Россия',
    rating: 4.6,
    url: '/tours/4',
  },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // В реальном приложении здесь будет запрос к API
    setTimeout(() => {
      setFavorites(demoFavorites);
      setIsLoading(false);
    }, 500);
  }, []);

  const getFilteredFavorites = (type?: FavoriteItem['type']) => {
    if (!type) return favorites;
    return favorites.filter(item => item.type === type);
  };

  const removeFavorite = (id: string) => {
    // В реальном приложении здесь будет запрос к API
    setFavorites(favorites.filter(item => item._id !== id));
    toast.success('Удалено из избранного');
  };

  const getTypeIcon = (type: FavoriteItem['type']) => {
    switch (type) {
      case 'property':
        return <HomeIcon className="w-5 h-5" />;
      case 'vehicle':
        return <TruckIcon className="w-5 h-5" />;
      case 'tour':
      case 'excursion':
        return <MapIcon className="w-5 h-5" />;
      default:
        return <HeartIcon className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: FavoriteItem['type']) => {
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

  // Компонент карточки избранного
  const FavoriteCard = ({ item }: { item: FavoriteItem }) => (
    <div className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-white text-gray-800">
            {getTypeLabel(item.type)}
          </span>
        </div>
        <button
          onClick={() => removeFavorite(item._id)}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full text-red-500 hover:text-red-700"
          aria-label="Удалить из избранного"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 truncate">{item.title}</h3>
        {item.location && (
          <p className="text-sm text-gray-500 mb-2">{item.location}</p>
        )}
        
        <div className="flex justify-between items-center mt-2">
          <div className="font-bold text-gray-900">
            {item.price.toLocaleString('ru-RU')} ฿
            {(item.type === 'property' || item.type === 'vehicle') && 
              <span className="text-sm font-normal text-gray-500"> / день</span>
            }
          </div>
          
          <Link 
            href={item.url}
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            Подробнее
            <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
  
  // Отрисовка списка избранных элементов
  const renderFavoritesList = (type?: FavoriteItem['type']) => {
    const filteredItems = getFilteredFavorites(type);
    
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-12">
          <ArrowPathIcon className="w-8 h-8 text-gray-400 animate-spin" />
        </div>
      );
    }
    
    if (filteredItems.length === 0) {
      return (
        <div className="text-center py-12 bg-white rounded-lg border">
          <HeartIcon className="w-12 h-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Нет избранных элементов</h3>
          <p className="mt-1 text-gray-500">
            Пока здесь пусто. Добавляйте понравившиеся объекты в избранное
          </p>
          <Link
            href={type === 'property' ? '/real-estate' : 
                  type === 'vehicle' ? '/transport' :
                  type === 'excursion' ? '/excursions' : 
                  type === 'tour' ? '/tours' : '/'}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {type ? `Перейти к разделу ${getTypeLabel(type)}` : 'Начать поиск'}
          </Link>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <FavoriteCard key={item._id} item={item} />
        ))}
      </div>
    );
  };

  return (
    <AccountLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Избранное</h1>
        <p className="text-gray-600">Здесь хранятся все объекты, добавленные вами в избранное</p>
      </div>

      <Tab.Group
        onChange={setActiveTab}
      >
        <Tab.List className="flex border-b border-gray-200 mb-6">
          <Tab 
            className={({ selected }) =>
              `py-2 px-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                selected
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`
            }
          >
            Все ({favorites.length})
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
            Жилье ({getFilteredFavorites('property').length})
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
            Транспорт ({getFilteredFavorites('vehicle').length})
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
            Туры и экскурсии ({getFilteredFavorites('tour').length + getFilteredFavorites('excursion').length})
          </Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>{renderFavoritesList()}</Tab.Panel>
          <Tab.Panel>{renderFavoritesList('property')}</Tab.Panel>
          <Tab.Panel>{renderFavoritesList('vehicle')}</Tab.Panel>
          <Tab.Panel>
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <ArrowPathIcon className="w-8 h-8 text-gray-400 animate-spin" />
              </div>
            ) : (
              <div>
                {getFilteredFavorites('tour').length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">Туры</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getFilteredFavorites('tour').map(item => (
                        <FavoriteCard key={item._id} item={item} />
                      ))}
                    </div>
                  </div>
                )}
                
                {getFilteredFavorites('excursion').length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">Экскурсии</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getFilteredFavorites('excursion').map(item => (
                        <FavoriteCard key={item._id} item={item} />
                      ))}
                    </div>
                  </div>
                )}
                
                {getFilteredFavorites('tour').length === 0 && getFilteredFavorites('excursion').length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg border">
                    <MapIcon className="w-12 h-12 mx-auto text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Нет избранных туров и экскурсий</h3>
                    <p className="mt-1 text-gray-500">
                      Вы пока не добавили ни одного тура или экскурсии в избранное
                    </p>
                    <div className="mt-4 flex justify-center gap-4">
                      <Link
                        href="/tours"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Посмотреть туры
                      </Link>
                      <Link
                        href="/excursions"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Найти экскурсии
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </AccountLayout>
  );
} 