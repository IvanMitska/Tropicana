'use client';

import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Clock, Users, MapPin, Check, Shield, Sun } from 'lucide-react';
import Link from 'next/link';

export default function CatamaransPage() {
  const catamarans = [
    {
      id: 1,
      title: 'ГРУППОВОЙ ТУР',
      price: '3.300',
      image: 'https://images.pexels.com/photos/813011/pexels-photo-813011.jpeg?auto=compress&cs=tinysrgb&w=600',
      includes: [
        'напитки, фрукты, маски и ласты',
        'полотенца',
        'трансфер и обед'
      ],
      group: 'Небольшие группы',
      locations: 'Трансфер: Ката, Карон, Патонг включен в стоимость'
    },
    {
      id: 2,
      title: '"HERMIONE" ДО 15 ЧЕЛ.',
      price: '16.000',
      image: 'https://images.pexels.com/photos/1430676/pexels-photo-1430676.jpeg?auto=compress&cs=tinysrgb&w=600',
      includes: [
        'напитки, фрукты',
        'маски и ласты',
        'каное, удочки',
        'Sap-board',
        'страховка'
      ],
      additional: 'трансфер, обед - 350 ТНВ с чел.'
    },
    {
      id: 3,
      title: '"AMALIA" ДО 35 ЧЕЛ.',
      price: '17.000',
      image: 'https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?auto=compress&cs=tinysrgb&w=600',
      includes: [
        'напитки, фрукты',
        'маски для снорклинга',
        'удочки и Sap-board',
        'страховка'
      ],
      additional: 'трансфер, горка - 2500THB, обед - 250 THB с чел.'
    },
    {
      id: 4,
      title: '"BLUE METIS" ДО 20 ЧЕЛ.',
      price: '21.000',
      image: 'https://images.pexels.com/photos/1575939/pexels-photo-1575939.jpeg?auto=compress&cs=tinysrgb&w=600',
      includes: [
        'напитки, фрукты',
        'маски для снорклинга',
        'удочки и Sap-board',
        'страховка'
      ],
      additional: 'трансфер, обед - 350 ТНВ с чел.'
    },
    {
      id: 5,
      title: 'LEOPARD 40 - 2024 NEW 15ЧЕЛ.',
      price: '95.000',
      image: 'https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Моторный катамаран класса Lux',
      includes: [
        'напитки, фрукты',
        'страховка и экипаж',
        'доп. вода 1 ящик + 1000 THB'
      ],
      features: ['3 каюты', '2 ванные комнаты']
    },
    {
      id: 6,
      title: 'АРЕНДА SPEED BOAT ДО 25 ЧЕЛ.',
      price: '18.000',
      image: 'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Приватная прогулка по островам - 5 программ на выбор',
      includes: [
        'программа на выбор',
        'страховка',
        'маски и ласты'
      ]
    }
  ];

  const fishingBoats = [
    {
      id: 7,
      title: 'РЫБАЛКА И ДАЙВИНГ "BIG TUNA" ДО 10 ЧЕЛ.',
      price: '19.000',
      image: 'https://images.pexels.com/photos/1630039/pexels-photo-1630039.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Новая и самая комфортная лодка в своем ценовом сегменте на борту надувные игрушки, Sap-board, маски и ласты'
    },
    {
      id: 8,
      title: 'ПРИВАТНАЯ РЫБАЛКА "MALINDA" ДО 8 ЧЕЛ.',
      price: '17.000',
      image: 'https://images.pexels.com/photos/1291762/pexels-photo-1291762.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Небольшая, бюджетная и уютная лодка. На боту есть все необходимое для профессиональной рыбалки'
    },
    {
      id: 9,
      title: 'ПРИВАТНАЯ РЫБАЛКА "HEAD FISH" ДО 20 ЧЕЛ.',
      price: '31.000',
      image: 'https://images.pexels.com/photos/1289120/pexels-photo-1289120.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Большая лодка с кондиционером. Стоимость указана за 10чел свыше +700THB/чел.'
    },
    {
      id: 10,
      title: 'ПРИВАТНАЯ РЫБАЛКА "NONGDA3" ДО 20 ЧЕЛ.',
      price: '21.000',
      image: 'https://images.pexels.com/photos/2476154/pexels-photo-2476154.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Большая и безопасная лодка. На боту есть все необходимое для профессиональной рыбалки. Свыше 10чел. +700THB/чел'
    },
    {
      id: 11,
      title: 'ПРИВАТНАЯ РЫБАЛКА "SINRAY" ДО 15 ЧЕЛ.',
      price: '18.000',
      image: 'https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Оснащена профснастями для рыбалки -троллинг, джиггинг и донная (спининг)'
    },
    {
      id: 12,
      title: 'СКОРОСТНОЙ КАТЕР "SEA RAY" ДО 6 ЧЕЛ.',
      price: '22.000',
      image: 'https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Приватные туры на Phi-Phi, Khai Nok и Maiton. Пирс Boat Lagoon'
    },
    {
      id: 13,
      title: 'ГРУППОВАЯ РЫБАЛКА',
      price: '2.600',
      description: 'Маршрут до острова Рача на небольшие группы',
      includes: ['Все включено + Трансфер']
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/1575939/pexels-photo-1575939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Аренда катамаранов и яхт
              </h1>
              <p className="text-lg text-white/90">
                Откройте для себя красоту Андаманского моря на комфортабельных судах
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-1">Безопасность</h3>
              <p className="text-sm text-gray-600">Все суда застрахованы и оборудованы</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-1">Опытный экипаж</h3>
              <p className="text-sm text-gray-600">Профессиональные капитаны</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-1">Лучшие маршруты</h3>
              <p className="text-sm text-gray-600">Секретные места и острова</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sun className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-1">Идеальная погода</h3>
              <p className="text-sm text-gray-600">300+ солнечных дней в году</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catamarans Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Катамараны и яхты</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {catamarans.map((boat) => (
              <div key={boat.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={boat.image} 
                    alt={boat.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-5">
                  <div className="mb-3">
                    <h3 className="font-bold text-base mb-1">{boat.price} THB</h3>
                    <h4 className="text-primary font-semibold text-sm uppercase">{boat.title}</h4>
                  </div>
                  
                  {boat.description && (
                    <p className="text-xs text-gray-600 mb-3">{boat.description}</p>
                  )}
                  
                  <div className="space-y-2 mb-4">
                    {boat.includes && (
                      <div className="text-xs">
                        <span className="font-semibold">Включено:</span>
                        <span className="text-gray-600"> {boat.includes.join(', ')}</span>
                      </div>
                    )}
                    
                    {boat.additional && (
                      <div className="text-xs">
                        <span className="font-semibold">Дополнительно оплачивается:</span>
                        <span className="text-gray-600"> {boat.additional}</span>
                      </div>
                    )}
                    
                    {boat.group && (
                      <div className="text-xs text-gray-600">{boat.group}</div>
                    )}
                    
                    {boat.locations && (
                      <div className="text-xs text-gray-600">{boat.locations}</div>
                    )}
                    
                    {boat.features && (
                      <div className="text-xs text-gray-600">
                        {boat.features.join(' • ')}
                      </div>
                    )}
                  </div>
                  
                  <div 
                    className="block w-full bg-primary/50 text-white/60 text-center py-2.5 rounded-lg transition-all duration-300 font-medium text-sm opacity-50 cursor-not-allowed"
                    title="Подробности - скоро будет доступно"
                  >
                    Подробнее
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fishing Boats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Рыбалка</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {fishingBoats.map((boat) => (
              <div key={boat.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                {boat.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={boat.image} 
                      alt={boat.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-5">
                  <div className="mb-3">
                    <h3 className="font-bold text-base mb-1">{boat.price} THB</h3>
                    <h4 className="text-primary font-semibold text-sm uppercase">{boat.title}</h4>
                  </div>
                  
                  {boat.description && (
                    <p className="text-xs text-gray-600 mb-3">{boat.description}</p>
                  )}
                  
                  {boat.includes && (
                    <div className="text-xs mb-3">
                      <span className="font-semibold">Включено:</span>
                      <ul className="text-gray-600 mt-1">
                        {boat.includes.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div 
                    className="block w-full bg-primary/50 text-white/60 text-center py-2.5 rounded-lg transition-all duration-300 font-medium text-sm opacity-50 cursor-not-allowed"
                    title="Подробности - скоро будет доступно"
                  >
                    Подробнее
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Популярные направления</h2>
            <p className="text-gray-600">Лучшие места для морских путешествий</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Острова Пхи-Пхи', time: '45 минут', highlights: 'Майя Бэй, снорклинг' },
              { name: 'Остров Джеймса Бонда', time: '1.5 часа', highlights: 'Залив Панг-Нга' },
              { name: 'Симиланские острова', time: '2 часа', highlights: 'Дайвинг, пляжи' },
              { name: 'Остров Рача', time: '30 минут', highlights: 'Прозрачная вода' },
              { name: 'Остров Корал', time: '20 минут', highlights: 'Коралловые рифы' },
              { name: 'Острова Сурин', time: '2.5 часа', highlights: 'Нетронутая природа' }
            ].map((dest, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{dest.name}</h3>
                    <p className="text-sm text-gray-600">Время в пути: {dest.time}</p>
                    <p className="text-sm text-primary font-medium">{dest.highlights}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Готовы к морскому приключению?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Забронируйте катамаран уже сегодня и откройте для себя красоту Андаманского моря
          </p>
          <div className="flex justify-center">
            <div 
              className="bg-white/50 text-primary/60 px-8 py-3 rounded-lg transition-all duration-300 font-medium inline-flex items-center gap-2 opacity-50 cursor-not-allowed"
              title="Контакты - скоро будет доступно"
            >
              Связаться с нами
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}