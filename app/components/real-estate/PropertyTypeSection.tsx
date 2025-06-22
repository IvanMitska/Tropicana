'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Building, Home, Warehouse, Castle, ArrowRight } from 'lucide-react';

const PropertyTypeSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const propertyTypes = [
    {
      id: 'villas',
      title: 'Виллы',
      description: 'Роскошные виллы с бассейнами и территорией',
      icon: <Castle className="w-10 h-10 text-primary" />,
      count: 125,
      backgroundImage: '/images/placeholder-category.jpg',
      color: 'from-primary/80 to-primary/40',
    },
    {
      id: 'apartments',
      title: 'Апартаменты',
      description: 'Современные апартаменты в жилых комплексах',
      icon: <Building className="w-10 h-10 text-secondary" />,
      count: 234,
      backgroundImage: '/images/placeholder-category.jpg',
      color: 'from-secondary/80 to-secondary/40',
    },
    {
      id: 'houses',
      title: 'Дома',
      description: 'Уютные дома для комфортного проживания',
      icon: <Home className="w-10 h-10 text-accent" />,
      count: 86,
      backgroundImage: '/images/placeholder-category.jpg',
      color: 'from-accent/80 to-accent/40',
    },
    {
      id: 'bungalows',
      title: 'Бунгало',
      description: 'Стильные бунгало рядом с пляжами',
      icon: <Warehouse className="w-10 h-10 text-primary" />,
      count: 54,
      backgroundImage: '/images/placeholder-category.jpg',
      color: 'from-primary/80 to-primary/40',
    },
  ];

  return (
    <section 
      ref={ref}
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Декоративные элементы */}
      <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] bg-repeat opacity-5 z-0"></div>
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Найдите <span className="text-primary">идеальный тип жилья</span>
          </h2>
          <p className="text-gray-600">
            Мы предлагаем различные виды недвижимости для любых потребностей и бюджета
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {propertyTypes.map((type, index) => (
            <Link 
              key={type.id}
              href={`/real-estate/${type.id}`}
              className={`rounded-xl overflow-hidden group relative h-80 shadow-lg transition-all duration-700 delay-${index * 100} ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Фоновое изображение */}
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
                style={{ backgroundImage: `url('${type.backgroundImage}')` }}
              ></div>
              
              {/* Градиент */}
              <div className={`absolute inset-0 bg-gradient-to-b ${type.color} opacity-70`}></div>
              
              {/* Содержимое */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    {type.icon}
                  </div>
                  <div className="bg-white/30 backdrop-blur-sm text-white py-1 px-3 rounded-full font-medium">
                    {type.count} объектов
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {type.title}
                  </h3>
                  <p className="text-white/80 mb-4">
                    {type.description}
                  </p>
                  <div className="flex items-center text-white group-hover:underline">
                    <span className="text-sm font-medium">Подробнее</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyTypeSection; 