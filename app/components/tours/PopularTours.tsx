'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Users, Star, ArrowRight, Heart } from 'lucide-react';

const PopularTours: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Примеры экскурсий
  const tours = [
    {
      id: 1,
      title: 'Морская экскурсия на острова',
      description: 'Увлекательное путешествие на живописные острова с кристально чистой водой и белоснежными пляжами.',
      price: 3500,
      priceUnit: '฿/чел',
      location: 'Пхукет, отправление из Чалонг Пирс',
      duration: '8 часов',
      groupSize: '10-15 человек',
      imageSrc: '/images/placeholder-tour.jpg',
      type: 'Морские экскурсии',
      isPopular: true,
      rating: 4.9,
    },
    {
      id: 2,
      title: 'Обзорная экскурсия по острову',
      description: 'Посещение знаковых культурных и религиозных достопримечательностей острова с панорамными видами.',
      price: 2200,
      priceUnit: '฿/чел',
      location: 'Пхукет, самые интересные локации',
      duration: '6 часов',
      groupSize: '6-10 человек',
      imageSrc: '/images/placeholder-tour.jpg',
      type: 'Культурные места',
      isPopular: true,
      rating: 4.8,
    },
    {
      id: 3,
      title: 'Природная экскурсия в джунгли',
      description: 'Экскурсия в национальный парк с посещением живописных водопадов и прогулкой по джунглям.',
      price: 2800,
      priceUnit: '฿/чел',
      location: 'Национальный парк Кхао Пра Тео',
      duration: '7 часов',
      groupSize: '8-12 человек',
      imageSrc: '/images/placeholder-tour.jpg',
      type: 'Природные красоты',
      isPopular: true,
      rating: 4.7,
    },
    {
      id: 4,
      title: 'Активная экскурсия с приключениями',
      description: 'Активный отдых с рафтингом по горной реке и полетом между деревьями на зиплайне.',
      price: 3200,
      priceUnit: '฿/чел',
      location: 'Провинция Пханг-Нга',
      duration: '9 часов',
      groupSize: '6-12 человек',
      imageSrc: '/images/placeholder-tour.jpg',
      type: 'Активный отдых',
      isPopular: false,
      rating: 4.9,
    },
    {
      id: 5,
      title: 'Экскурсия на удаленные острова',
      description: 'Однодневная экскурсия на знаменитые удаленные острова с невероятным снорклингом.',
      price: 4500,
      priceUnit: '฿/чел',
      location: 'Пхукет, отправление из Тап-Ламу',
      duration: '10 часов',
      groupSize: '15-20 человек',
      imageSrc: '/images/placeholder-tour.jpg',
      type: 'Морские экскурсии',
      isPopular: true,
      rating: 4.8,
    },
    {
      id: 6,
      title: 'Кулинарный мастер-класс',
      description: 'Погрузитесь в мир местной кухни и научитесь готовить традиционные блюда под руководством шеф-повара.',
      price: 1800,
      priceUnit: '฿/чел',
      location: 'Пхукет, Патонг',
      duration: '4 часа',
      groupSize: '4-8 человек',
      imageSrc: '/images/placeholder-tour.jpg',
      type: 'Гастрономические туры',
      isPopular: false,
      rating: 4.9,
    }
  ];

  return (
    <section
      ref={ref}
      className="py-20 bg-light relative overflow-hidden"
      id="tours-catalog"
    >
      {/* Декоративные элементы */}
      <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] bg-repeat opacity-5 z-0"></div>
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Популярные <span className="text-primary">экскурсии</span>
          </h2>
          <p className="text-gray-600">
            Самые востребованные экскурсии на Пхукете и окрестностях с высоким рейтингом от наших клиентов
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour, index) => (
            <div 
              key={tour.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500"
              style={{ 
                transitionDelay: `${index * 100}ms`,
                opacity: inView ? 1 : 0,
                transform: inView 
                  ? hoveredIndex === index 
                    ? 'translateY(-10px)' 
                    : 'translateY(0)' 
                  : 'translateY(30px)',
                boxShadow: hoveredIndex === index 
                  ? '0 15px 30px rgba(var(--color-primary), 0.15)' 
                  : '0 5px 15px rgba(0, 0, 0, 0.05)'
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Изображение с меткой популярной экскурсии */}
              <div className="relative h-56">
                <Image 
                  src={tour.imageSrc} 
                  alt={tour.title}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent"></div>
                
                {tour.isPopular && (
                  <div className="absolute top-3 left-3 bg-primary/80 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                    Популярный выбор
                  </div>
                )}
                
                <button className="absolute top-3 right-3 bg-white/30 hover:bg-white/50 p-2 rounded-full backdrop-blur-sm transition-colors">
                  <Heart className="w-4 h-4 text-white hover:text-primary" />
                </button>
                
                <div className="absolute bottom-3 left-3 flex items-center bg-white/30 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-white text-sm font-medium">{tour.rating}</span>
                </div>
                
                <div className="absolute bottom-3 right-3 bg-white/30 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-white text-sm font-medium">{tour.type}</span>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-bold text-dark mb-2 hover:text-primary transition-colors">
                  <Link href={`/tours/${tour.id}`}>{tour.title}</Link>
                </h3>
                
                <div className="mb-2 flex items-start">
                  <MapPin className="w-4 h-4 text-primary mt-1 mr-1 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{tour.location}</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-primary mr-1" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 text-primary mr-1" />
                    {tour.groupSize}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-primary font-bold text-xl">{tour.price} ฿</span>
                    <span className="text-gray-500 text-sm"> / чел</span>
                  </div>
                  
                  <Link 
                    href={`/tours/${tour.id}`} 
                    className="group inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark"
                  >
                    Подробнее
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/tours" 
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-md shadow-lg transition-all hover:shadow-primary/20 hover:shadow-xl"
          >
            <span>Смотреть все экскурсии</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularTours; 