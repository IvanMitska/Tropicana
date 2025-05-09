'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '../components/layout/MainLayout';

export default function RealEstatePage() {
  // Проверка режима разработки/демо
  const [isDemoMode] = useState(true);
  
  // Заглушка для демонстрации
  const properties = [
    {
      id: 1,
      title: 'Вилла с бассейном на Пхукете',
      description: 'Просторная вилла с бассейном и тропическим садом',
      price: 12000,
      priceUnit: '₽/сутки',
      location: 'Пхукет, район Патонг',
      bedrooms: 3,
      bathrooms: 2,
      area: 150,
      imageSrc: '/images/placeholder-villa.jpg',
      type: 'villa',
    },
    {
      id: 2,
      title: 'Апартаменты с видом на море',
      description: 'Современные апартаменты с панорамным видом на Андаманское море',
      price: 6000,
      priceUnit: '₽/сутки',
      location: 'Пхукет, Ката Бич',
      bedrooms: 2,
      bathrooms: 1,
      area: 80,
      imageSrc: '/images/placeholder-apartment.jpg',
      type: 'apartment',
    },
    {
      id: 3,
      title: 'Бунгало на берегу',
      description: 'Уютное бунгало в нескольких шагах от пляжа',
      price: 5000,
      priceUnit: '₽/сутки',
      location: 'Пхукет, район Карон',
      bedrooms: 1,
      bathrooms: 1,
      area: 60,
      imageSrc: '/images/placeholder-bungalow.jpg',
      type: 'bungalow',
    },
    {
      id: 4,
      title: 'Пентхаус с джакузи',
      description: 'Роскошный пентхаус с джакузи на террасе и видом на город',
      price: 15000,
      priceUnit: '₽/сутки',
      location: 'Пхукет, район Пхукет Таун',
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      imageSrc: '/images/placeholder-penthouse.jpg',
      type: 'apartment',
    },
  ];

  return (
    <MainLayout>
      {isDemoMode ? (
        // Режим разработки - показываем заглушку
        <main className="min-h-screen bg-light py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">Аренда недвижимости на Пхукете</h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Виллы, апартаменты и дома для краткосрочной и долгосрочной аренды
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8 mb-16">
              <div className="text-center p-12">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 mx-auto text-primary mb-6 opacity-50">
                  <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
                  <path fillRule="evenodd" d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z" clipRule="evenodd" />
                </svg>
                <h2 className="text-2xl font-medium text-dark mb-4">Раздел в разработке</h2>
                <p className="text-gray-600 mb-8">
                  Мы сейчас активно работаем над наполнением этого раздела. Скоро здесь появится полный каталог объектов недвижимости для аренды на Пхукете.
                </p>
                <a href="/" className="inline-block bg-primary text-white py-3 px-8 rounded-full font-medium text-lg shadow-md hover:bg-primary-dark transition-colors duration-300">
                  Вернуться на главную
                </a>
              </div>
            </div>
          </div>
        </main>
      ) : (
        // Основной контент с новыми стилями
        <main className="min-h-screen bg-light">
          <section className="py-12 bg-gradient-to-br from-dark to-dark-light text-secondary">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold mb-4">Аренда недвижимости на Пхукете</h1>
              <p className="text-xl mb-8">
                Найдите идеальное место для проживания, работы или отдыха
              </p>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label htmlFor="location" className="block text-dark mb-2">
                      Местоположение
                    </label>
                    <select
                      id="location"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Все районы</option>
                      <option value="patong">Патонг</option>
                      <option value="kata">Ката</option>
                      <option value="karon">Карон</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="type" className="block text-dark mb-2">
                      Тип недвижимости
                    </label>
                    <select
                      id="type"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Все типы</option>
                      <option value="villa">Виллы</option>
                      <option value="apartment">Апартаменты</option>
                      <option value="bungalow">Бунгало</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-dark mb-2">
                      Цена до (₽/сутки)
                    </label>
                    <input
                      type="number"
                      id="price"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Максимальная цена"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors"
                    >
                      Найти
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-dark">Доступные объекты</h2>
                <div>
                  <label htmlFor="sort" className="text-gray-700 mr-2">
                    Сортировать:
                  </label>
                  <select
                    id="sort"
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="price-asc">По цене (возр.)</option>
                    <option value="price-desc">По цене (убыв.)</option>
                    <option value="newest">Сначала новые</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property) => (
                  <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02] duration-300">
                    <div className="relative h-48 bg-gradient-to-br from-dark-light to-dark overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        {/* Placeholder image text when no actual images */}
                        <span className="text-lg opacity-80">[Изображение {property.title}]</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-dark">{property.title}</h3>
                        <div className="font-bold text-lg text-primary">
                          {property.price.toLocaleString()} <span className="text-sm">{property.priceUnit}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{property.description}</p>
                      <div className="text-gray-500 mb-4">{property.location}</div>
                      <div className="flex justify-between text-gray-600 mb-4">
                        <div>
                          <span className="font-medium">{property.bedrooms}</span> спален
                        </div>
                        <div>
                          <span className="font-medium">{property.bathrooms}</span> ванных
                        </div>
                        <div>
                          <span className="font-medium">{property.area}</span> м²
                        </div>
                      </div>
                      <Link 
                        href={`/real-estate/${property.id}`}
                        className="block w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md text-center transition-colors"
                      >
                        Подробнее
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}
    </MainLayout>
  );
} 