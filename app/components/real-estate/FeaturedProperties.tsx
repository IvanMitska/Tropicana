'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Bed, Bath, Maximize, Heart, ArrowRight, Star } from 'lucide-react';

const FeaturedProperties: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Примеры объектов недвижимости
  const properties = [
    {
      id: 1,
      title: 'Вилла с бассейном на Пхукете',
      description: 'Просторная вилла с бассейном и тропическим садом',
      price: 45000,
      priceUnit: '฿/месяц',
      location: 'Пхукет, район Патонг',
      bedrooms: 3,
      bathrooms: 2,
      area: 150,
      imageSrc: 'https://images.pexels.com/photos/32870/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      type: 'villa',
      isPopular: true,
      rating: 4.9,
    },
    {
      id: 2,
      title: 'Апартаменты с видом на море',
      description: 'Современные апартаменты с панорамным видом на Андаманское море',
      price: 28000,
      priceUnit: '฿/месяц',
      location: 'Пхукет, Ката Бич',
      bedrooms: 2,
      bathrooms: 1,
      area: 80,
      imageSrc: 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      type: 'apartment',
      isPopular: true,
      rating: 4.7,
    },
    {
      id: 3,
      title: 'Бунгало на берегу',
      description: 'Уютное бунгало в нескольких шагах от пляжа',
      price: 18000,
      priceUnit: '฿/месяц',
      location: 'Пхукет, район Карон',
      bedrooms: 1,
      bathrooms: 1,
      area: 60,
      imageSrc: 'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      type: 'bungalow',
      isPopular: false,
      rating: 4.5,
    },
    {
      id: 4,
      title: 'Вилла с 4 спальнями',
      description: 'Роскошная вилла с личным бассейном и панорамным видом на залив',
      price: 55000,
      priceUnit: '฿/месяц',
      location: 'Пхукет, мыс Панва',
      bedrooms: 4,
      bathrooms: 3,
      area: 200,
      imageSrc: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      type: 'villa',
      isPopular: true,
      rating: 4.8,
    },
  ];

  return (
    <section 
      ref={ref}
      className="py-20 bg-light relative overflow-hidden"
    >
      {/* Декоративные элементы */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Популярные <span className="text-primary">предложения</span>
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Лучшие объекты недвижимости, отобранные нашими экспертами специально для вас
            </p>
          </div>
          
          <Link 
            href="/real-estate/catalog"
            className="inline-flex items-center bg-transparent text-primary hover:text-primary/80 font-medium py-2 px-4 rounded-md transition-all mt-4 md:mt-0 group"
          >
            <span>Смотреть все</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties.map((property, index) => (
            <div 
              key={property.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-700 delay-${index * 100} ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Изображение объекта с эффектами */}
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
                  style={{
                    backgroundImage: `url('${property.imageSrc}')`,
                    transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                  }}
                ></div>
                
                {/* Этикетка "Популярное" */}
                {property.isPopular && (
                  <div className="absolute top-3 left-3 bg-primary text-white text-xs py-1 px-3 rounded-full font-medium shadow-md">
                    Популярное
                  </div>
                )}
                
                {/* Кнопка "Избранное" */}
                <button className="absolute top-3 right-3 bg-white/70 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10">
                  <Heart className="w-5 h-5 text-primary" />
                </button>
                
                {/* Цена */}
                <div className="absolute bottom-3 left-3 bg-dark/80 backdrop-blur-sm text-white py-1.5 px-4 rounded-lg font-medium shadow-md">
                  {property.price.toLocaleString()} {property.priceUnit}
                </div>
              </div>
              
              {/* Информация об объекте */}
              <div className="p-5">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin className="w-4 h-4 mr-1 text-primary" />
                  <span>{property.location}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-dark mb-2 line-clamp-1">
                  {property.title}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                  {property.description}
                </p>
                
                {/* Характеристики объекта */}
                <div className="flex justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1 text-primary" />
                    <span>{property.bedrooms} спал.</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1 text-primary" />
                    <span>{property.bathrooms} ванн.</span>
                  </div>
                  <div className="flex items-center">
                    <Maximize className="w-4 h-4 mr-1 text-primary" />
                    <span>{property.area} м²</span>
                  </div>
                </div>
                
                {/* Рейтинг */}
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-primary text-primary" />
                    <span className="text-sm font-medium text-dark">{property.rating}</span>
                  </div>
                  
                  <Link 
                    href={`/real-estate/${property.id}`}
                    className="bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium py-1.5 px-4 rounded-lg transition-all"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties; 