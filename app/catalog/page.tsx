'use client';

import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import Link from 'next/link';

export default function CatalogPage() {
  const categories = [
    {
      id: 'real-estate',
      title: 'Аренда недвижимости',
      description: 'Виллы, апартаменты и дома для краткосрочной и долгосрочной аренды',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
          <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
          <path fillRule="evenodd" d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z" clipRule="evenodd" />
        </svg>
      ),
      link: '/real-estate',
      color: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
    },
    {
      id: 'transport',
      title: 'Аренда транспорта',
      description: 'Автомобили, мотоциклы, скутеры и водный транспорт',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
          <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
          <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
          <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
        </svg>
      ),
      link: '/transport',
      color: 'bg-gradient-to-br from-blue-500 to-blue-700',
    },
    {
      id: 'tours',
      title: 'Экскурсии',
      description: 'Увлекательные экскурсии по Пхукету и соседним островам',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
          <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      ),
      link: '/tours',
      color: 'bg-gradient-to-br from-amber-500 to-amber-700',
    },
    {
      id: 'transfer',
      title: 'Трансферы',
      description: 'Комфортные трансферы из аэропорта и между локациями острова',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
        </svg>
      ),
      link: '/transfer',
      color: 'bg-gradient-to-br from-purple-500 to-purple-700',
    },
  ];

  return (
    <MainLayout>
      <main className="min-h-screen bg-light py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">Наш каталог услуг</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Все, что нужно для идеального отдыха на Пхукете в одном месте
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={category.link}
                className="block group hover:scale-[1.02] transition-transform duration-300"
              >
                <div className={`${category.color} text-white rounded-xl shadow-lg overflow-hidden`}>
                  <div className="p-8 flex items-start">
                    <div className="mr-6 bg-white/20 p-4 rounded-xl">
                      {category.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-3">{category.title}</h2>
                      <p className="text-white/90">{category.description}</p>
                    </div>
                  </div>
                  <div className="bg-black/10 p-4 text-right">
                    <span className="inline-flex items-center font-medium text-lg">
                      Перейти в раздел
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 mb-16">
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold text-dark mb-4">Разделы в разработке</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Мы сейчас активно работаем над наполнением разделов каталога. Скоро здесь появится полный перечень всех наших услуг и предложений на Пхукете.
              </p>
              <a href="/" className="inline-block bg-primary text-white py-3 px-8 rounded-full font-medium text-lg shadow-md hover:bg-primary-dark transition-colors duration-300">
                Вернуться на главную
              </a>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
} 