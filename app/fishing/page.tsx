'use client';

import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Fish, Clock, Users, MapPin, Check, Shield, Waves, Anchor, Camera, Award, Sun } from 'lucide-react';
import Link from 'next/link';

export default function FishingPage() {
  const fishingBoats = [
    {
      id: 1,
      title: 'ГРУППОВАЯ РЫБАЛКА',
      price: '2.600',
      description: 'Маршрут до острова Рача на небольшие группы',
      includes: ['Все включено + Трансфер'],
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'РЫБАЛКА И ДАЙВИНГ "BIG TUNA" ДО 10 ЧЕЛ.',
      price: '19.000',
      description: 'Новая и самая комфортная лодка в своем ценовом сегменте на борту надувные игрушки, Sap-board, маски и ласты',
      image: 'https://images.unsplash.com/photo-1535231540604-72e8fbaf8cdb?w=600&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'ПРИВАТНАЯ РЫБАЛКА "MALINDA" ДО 8 ЧЕЛ.',
      price: '17.000',
      description: 'Небольшая, бюджетная и уютная лодка. На боту есть все необходимое для профессиональной рыбалки',
      image: 'https://images.unsplash.com/photo-1544043347-952e0539c2f4?w=600&auto=format&fit=crop'
    },
    {
      id: 4,
      title: 'ПРИВАТНАЯ РЫБАЛКА "SINRAY" ДО 15 ЧЕЛ.',
      price: '18.000',
      description: 'Оснащена профснастями для рыбалки -троллинг, джиггинг и донная (спининг)',
      image: 'https://images.unsplash.com/photo-1569949318610-1e4c0e7ca926?w=600&auto=format&fit=crop'
    },
    {
      id: 5,
      title: 'ПРИВАТНАЯ РЫБАЛКА "NONGDA3" ДО 20 ЧЕЛ.',
      price: '21.000',
      description: 'Большая и безопасная лодка. На боту есть все необходимое для профессиональной рыбалки. Свыше 10чел. +700THB/чел',
      image: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=600&auto=format&fit=crop'
    },
    {
      id: 6,
      title: 'СКОРОСТНОЙ КАТЕР "SEA RAY" ДО 6 ЧЕЛ.',
      price: '22.000',
      description: 'Приватные туры на Phi-Phi, Khai Nok и Maiton. Пирс Boat Lagoon',
      image: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&auto=format&fit=crop'
    },
    {
      id: 7,
      title: 'ПРИВАТНАЯ РЫБАЛКА "HEAD FISH" ДО 20 ЧЕЛ.',
      price: '31.000',
      description: 'Большая лодка с кондиционером. Стоимость указана за 10чел свыше +700THB/чел.',
      image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62c6?w=600&auto=format&fit=crop'
    }
  ];

  const fishTypes = [
    { 
      name: 'Барракуда', 
      season: 'Круглый год', 
      size: 'до 15 кг',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&auto=format&fit=crop'
    },
    { 
      name: 'Тунец', 
      season: 'Октябрь - Март', 
      size: 'до 30 кг',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&auto=format&fit=crop'
    },
    { 
      name: 'Дорадо', 
      season: 'Круглый год', 
      size: 'до 10 кг',
      image: 'https://images.unsplash.com/photo-1504474298956-b1812fe43d92?w=400&auto=format&fit=crop'
    },
    { 
      name: 'Марлин', 
      season: 'Ноябрь - Апрель', 
      size: 'до 100 кг',
      image: 'https://images.unsplash.com/photo-1611590027211-b954fd027b51?w=400&auto=format&fit=crop'
    },
    { 
      name: 'Групер', 
      season: 'Круглый год', 
      size: 'до 20 кг',
      image: 'https://images.unsplash.com/photo-1518606375759-94d4c3558b00?w=400&auto=format&fit=crop'
    },
    { 
      name: 'Снэппер', 
      season: 'Круглый год', 
      size: 'до 5 кг',
      image: 'https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?w=400&auto=format&fit=crop'
    }
  ];

  const fishingTypes = [
    {
      title: 'Троллинг',
      description: 'Ловля на движущуюся приманку с медленно идущей лодки',
      icon: '🎣',
      image: 'https://images.unsplash.com/photo-1532508641786-e18cd9b92ce3?w=400&auto=format&fit=crop'
    },
    {
      title: 'Джиггинг',
      description: 'Вертикальная ловля на джиг в толще воды',
      icon: '🎯',
      image: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=400&auto=format&fit=crop'
    },
    {
      title: 'Донная рыбалка',
      description: 'Ловля со дна моря на глубине 20-60 метров',
      icon: '⚓',
      image: 'https://images.unsplash.com/photo-1544043544-4c3a1bef2b91?w=400&auto=format&fit=crop'
    },
    {
      title: 'Спиннинг',
      description: 'Классическая спиннинговая ловля с берега или лодки',
      icon: '🌊',
      image: 'https://images.unsplash.com/photo-1564227503787-ad186f508e6f?w=400&auto=format&fit=crop'
    }
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1544043588-1c2dd5654429?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1553570739-330b8db8a925?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1532517891316-72b6c7dfd11e?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516370873344-fb7c61054fa9?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1553949345-eb786bb3f7ba?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534367990512-edbdca781b00?w=600&auto=format&fit=crop'
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1544043497-f1b5a3f9e2c7?w=1600&auto=format&fit=crop")'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4">
                Морская рыбалка на Пхукете
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6">
                Незабываемые впечатления от рыбалки в Андаманском море. 
                Профессиональное оборудование и опытные капитаны!
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="#boats" className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg text-center transition-all duration-300 font-medium inline-flex items-center justify-center gap-2 text-sm sm:text-base">
                  <Anchor className="w-4 h-4 sm:w-5 sm:h-5" />
                  Выбрать лодку
                </Link>
                <a href="https://wa.me/66994892917" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-6 py-3 rounded-lg text-center transition-all duration-300 font-medium text-sm sm:text-base">
                  Забронировать сейчас
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Почему выбирают нас</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Более 10 лет опыта в организации морской рыбалки на Пхукете
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <Fish className="w-8 h-8 sm:w-10 sm:h-10 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Богатый улов</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">Знаем все рыбные места</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Безопасность</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">Все лодки застрахованы</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <Award className="w-8 h-8 sm:w-10 sm:h-10 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Профи</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">Опыт 15+ лет</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Фото</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">Ваши трофеи</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fishing Boats */}
      <section id="boats" className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">Наши рыболовные туры</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {fishingBoats.map((boat) => (
              <div key={boat.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={boat.image} 
                    alt={boat.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-primary font-bold text-sm">от {boat.price} THB</span>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-primary font-semibold text-sm uppercase mb-2">{boat.title}</h3>
                  
                  {boat.description && (
                    <p className="text-xs text-gray-600 mb-4 line-clamp-3">{boat.description}</p>
                  )}
                  
                  {boat.includes && (
                    <div className="text-xs mb-4">
                      <span className="font-semibold">Включено:</span>
                      <ul className="text-gray-600 mt-1">
                        {boat.includes.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <Link 
                    href={`https://wa.me/66994892917?text=Здравствуйте! Интересует ${boat.title}`}
                    className="block w-full bg-primary hover:bg-primary-dark text-white text-center py-2.5 rounded-lg transition-all duration-300 font-medium text-sm"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fishing Types with Images */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Виды рыбалки</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Мы предлагаем различные техники ловли для любого уровня подготовки
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {fishingTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img 
                    src={type.image} 
                    alt={type.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                    <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{type.icon}</div>
                    <h3 className="font-bold text-lg sm:text-xl">{type.title}</h3>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <p className="text-xs sm:text-sm md:text-base text-gray-600">{type.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fish Types with Images */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Трофейная рыба Андаманского моря</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              В наших водах обитает более 30 видов промысловой рыбы
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {fishTypes.map((fish, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img 
                    src={fish.image} 
                    alt={fish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                    <h3 className="font-bold text-xl sm:text-2xl mb-1">{fish.name}</h3>
                    <p className="text-xs sm:text-sm opacity-90">Вес: {fish.size}</p>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      <span className="text-xs sm:text-sm md:text-base text-gray-600">Сезон:</span>
                    </div>
                    <span className="font-semibold text-primary text-xs sm:text-sm md:text-base">{fish.season}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Галерея наших рыбалок</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Счастливые моменты и впечатляющие трофеи наших клиентов
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative group overflow-hidden rounded-xl shadow-lg">
                <img 
                  src={image} 
                  alt={`Рыбалка на Пхукете ${index + 1}`}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">Что включено в стоимость</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-primary">Оборудование и снасти</h3>
                <ul className="space-y-3">
                  {[
                    'Профессиональные удочки и катушки',
                    'Приманки и наживка',
                    'Эхолот и GPS навигация',
                    'Холодильники для хранения улова',
                    'Инструменты для разделки рыбы'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-primary">Сервис и безопасность</h3>
                <ul className="space-y-3">
                  {[
                    'Опытный капитан и команда',
                    'Спасательные жилеты',
                    'Страховка пассажиров',
                    'Прохладительные напитки и лед',
                    'Приготовление улова (по желанию)'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Готовы к незабываемой рыбалке?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами прямо сейчас и забронируйте свой рыболовный тур. 
            Гарантируем незабываемые впечатления!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/66994892917" 
              className="bg-white text-primary hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 font-medium inline-flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Написать в WhatsApp
            </a>
            <Link 
              href="#boats" 
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 font-medium text-sm sm:text-base"
            >
              Посмотреть все лодки
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}