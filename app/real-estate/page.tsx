'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '../components/layout/MainLayout';

export default function RealEstatePage() {
  // Убираем демо-режим, отображаем основной контент
  const [isDemoMode] = useState(false);
  
  // Данные объектов недвижимости
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
    {
      id: 5,
      title: 'Вилла с 4 спальнями и видом на залив',
      description: 'Роскошная вилла с личным бассейном и панорамным видом на залив',
      price: 18000,
      priceUnit: '₽/сутки',
      location: 'Пхукет, мыс Панва',
      bedrooms: 4,
      bathrooms: 3,
      area: 200,
      imageSrc: '/images/placeholder-villa-2.jpg',
      type: 'villa',
    },
    {
      id: 6,
      title: 'Студия в центре Патонга',
      description: 'Современная студия в центре туристического района, близко к пляжу',
      price: 3500,
      priceUnit: '₽/сутки',
      location: 'Пхукет, центр Патонга',
      bedrooms: 1,
      bathrooms: 1,
      area: 40,
      imageSrc: '/images/placeholder-studio.jpg',
      type: 'apartment',
    },
  ];

  // Популярные районы для фильтрации
  const popularLocations = ['Патонг', 'Ката', 'Карон', 'Равай', 'Камала', 'Найхарн'];

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
        <main className="min-h-screen bg-light pt-24 pb-16">
          <section className="bg-gradient-to-br from-dark to-dark-light text-white py-16 mb-12 rounded-b-[40px] shadow-md">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Аренда недвижимости на Пхукете</h1>
              <p className="text-xl text-gray-100 mb-8 max-w-3xl">
                Виллы, апартаменты и дома для краткосрочной и долгосрочной аренды
              </p>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label htmlFor="location" className="block text-dark mb-2 font-medium">
                      Район
                    </label>
                    <select
                      id="location"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Все районы</option>
                      {popularLocations.map((location, index) => (
                        <option key={index} value={location.toLowerCase()}>{location}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="type" className="block text-dark mb-2 font-medium">
                      Тип недвижимости
                    </label>
                    <select
                      id="type"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Все типы</option>
                      <option value="villa">Виллы</option>
                      <option value="apartment">Апартаменты</option>
                      <option value="bungalow">Бунгало</option>
                      <option value="house">Дома</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-dark mb-2 font-medium">
                      Цена до (₽/сутки)
                    </label>
                    <input
                      type="number"
                      id="price"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Максимальная цена"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-light text-white py-3 px-4 rounded-lg transition-colors font-medium shadow-md"
                    >
                      Найти
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="text-dark font-medium mr-2">Популярные фильтры:</span>
                  <button className="bg-gray-100 hover:bg-gray-200 text-dark px-3 py-1 rounded-full text-sm">С бассейном</button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-dark px-3 py-1 rounded-full text-sm">У моря</button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-dark px-3 py-1 rounded-full text-sm">2+ спальни</button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-dark px-3 py-1 rounded-full text-sm">Долгосрочная аренда</button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-dark px-3 py-1 rounded-full text-sm">Wi-Fi</button>
                </div>
              </div>
            </div>
          </section>

          <section className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4 md:mb-0">Доступные объекты</h2>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Найдено: {properties.length}</span>
                <div className="flex items-center">
                  <label htmlFor="sort" className="text-gray-600 mr-2 whitespace-nowrap">
                    Сортировать:
                  </label>
                  <select
                    id="sort"
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                  >
                    <option value="price-asc">По цене (возр.)</option>
                    <option value="price-desc">По цене (убыв.)</option>
                    <option value="newest">Сначала новые</option>
                  </select>
                </div>
                
                <div className="flex border rounded-lg overflow-hidden">
                  <button className="px-3 py-2 bg-primary text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <button className="px-3 py-2 bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative h-52 bg-gradient-to-br from-dark-light to-dark overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      {/* Placeholder image text when no actual images */}
                      <span className="text-lg opacity-80">[Изображение объекта]</span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium uppercase">
                        {property.type === 'villa' ? 'Вилла' : 
                         property.type === 'apartment' ? 'Апартаменты' : 'Бунгало'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-dark">{property.title}</h3>
                      <div className="font-bold text-lg text-primary">
                        {property.price.toLocaleString()} <span className="text-sm">{property.priceUnit}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">{property.description}</p>
                    
                    <div className="flex items-center text-gray-500 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm">{property.location}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600 mb-4 border-t border-gray-100 pt-4">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="text-sm font-medium">{property.bedrooms} спал.</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium">{property.bathrooms} ван.</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                        </svg>
                        <span className="text-sm font-medium">{property.area} м²</span>
                      </div>
                    </div>
                    
                    <Link 
                      href={`/real-estate/${property.id}`}
                      className="block w-full bg-primary hover:bg-primary-light text-white py-2 px-4 rounded-lg text-center transition-colors"
                    >
                      Подробнее
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 flex justify-center">
              <div className="flex space-x-2">
                <button className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">
                  Назад
                </button>
                <button className="px-4 py-2 bg-primary text-white rounded-md">
                  1
                </button>
                <button className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">
                  2
                </button>
                <button className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">
                  3
                </button>
                <button className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">
                  Вперёд
                </button>
              </div>
            </div>
          </section>
        </main>
      )}
    </MainLayout>
  );
} 