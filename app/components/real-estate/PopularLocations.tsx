'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

const PopularLocations: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const locations = [
    {
      id: 'patong',
      name: 'Патонг',
      description: 'Центр ночной жизни с множеством ресторанов, баров и торговых центров',
      count: 245,
      averagePrice: '₽25,000',
      image: '/images/placeholder-location.jpg',
      highlights: ['Пляж Патонг', 'Бангла Роуд', 'Торговые центры', 'Рестораны'],
    },
    {
      id: 'kata',
      name: 'Ката',
      description: 'Спокойный район с красивыми пляжами и семейными отелями',
      count: 156,
      averagePrice: '₽30,000',
      image: '/images/placeholder-location.jpg',
      highlights: ['Пляж Ката', 'Серфинг', 'Семейный отдых', 'Рестораны'],
    },
    {
      id: 'karon',
      name: 'Карон',
      description: 'Длинный песчаный пляж и развитая инфраструктура',
      count: 189,
      averagePrice: '₽28,000',
      image: '/images/placeholder-location.jpg',
      highlights: ['Пляж Карон', 'Дайнозавр Маркет', 'Спа-центры', 'Гольф'],
    },
    {
      id: 'kamala',
      name: 'Камала',
      description: 'Тихий район для спокойного отдыха вдали от толп туристов',
      count: 98,
      averagePrice: '₽35,000',
      image: '/images/placeholder-location.jpg',
      highlights: ['Пляж Камала', 'Фантазия шоу', 'Уединенность', 'Виллы'],
    },
    {
      id: 'chalong',
      name: 'Чалонг',
      description: 'Район с множеством вилл и близостью к достопримечательностям',
      count: 167,
      averagePrice: '₽22,000',
      image: '/images/placeholder-location.jpg',
      highlights: ['Большой Будда', 'Ват Чалонг', 'Виллы', 'Яхт-клубы'],
    },
    {
      id: 'rawai',
      name: 'Раваи',
      description: 'Рыбацкая деревня с аутентичной атмосферой и морепродуктами',
      count: 134,
      averagePrice: '₽20,000',
      image: '/images/placeholder-location.jpg',
      highlights: ['Рыбный рынок', 'Морепродукты', 'Лодки', 'Мыс Промтеп'],
    },
  ];

  return (
    <section 
      ref={ref}
      className="py-20 bg-light relative overflow-hidden"
    >
      {/* Декоративные элементы */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute top-0 left-1/4 w-1/4 h-1/4 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Популярные <span className="text-primary">районы Пхукета</span>
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Исследуйте самые популярные и удобные для проживания локации на острове
            </p>
          </div>
          
          <Link 
            href="/real-estate/locations"
            className="inline-flex items-center bg-transparent text-primary hover:text-primary/80 font-medium py-2 px-4 rounded-md transition-all mt-4 md:mt-0 group"
          >
            <span>Все районы</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {/* Равномерная сетка локаций */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <Link
              key={location.id}
              href={`/real-estate/locations/${location.id}`}
              className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 h-80 bg-white ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {/* Фоновое изображение */}
              <div className="relative h-52 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  style={{ backgroundImage: `url('${location.image}')` }}
                ></div>
                
                {/* Градиент */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent"></div>
                
                {/* Количество объектов - бейдж */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm text-dark py-2 px-3 rounded-full text-sm font-semibold shadow-lg">
                    {location.count} объектов
                  </div>
                </div>
                
                {/* Название района на изображении */}
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                    {location.name}
                  </h3>
                </div>
              </div>
              
              {/* Содержимое карточки */}
              <div className="p-6 h-28 flex flex-col justify-between">
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {location.description}
                </p>
                
                <div className="flex items-center text-primary group-hover:text-primary/80 transition-colors pt-2">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm font-medium group-hover:underline">Посмотреть на карте</span>
                  <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              
              {/* Эффект при наведении */}
              <div className="absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-primary/20 rounded-2xl transition-all duration-300"></div>
            </Link>
          ))}
        </div>
        
        {/* Дополнительная информация */}
        <div className={`mt-12 text-center transition-all duration-700 delay-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <p className="text-gray-500 text-sm">
            Не нашли подходящий район? 
            <Link href="/real-estate/locations" className="text-primary hover:underline ml-1">
              Посмотрите все доступные локации
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PopularLocations; 