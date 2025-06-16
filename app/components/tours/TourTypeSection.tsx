'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Compass, Sailboat, Mountain, Users, Utensils, Landmark } from 'lucide-react';
import Link from 'next/link';

const TourTypeSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const tourTypes = [
    {
      id: 'sea',
      title: 'Морские экскурсии',
      description: 'Путешествия на острова и морские приключения',
      icon: <Sailboat className="w-10 h-10 text-primary" />,
      count: 12,
      backgroundImage: 'https://images.pexels.com/photos/1770310/pexels-photo-1770310.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      color: 'from-blue-500/80 to-blue-400/40',
    },
    {
      id: 'culture',
      title: 'Культурные места',
      description: 'Храмы, музеи и исторические достопримечательности',
      icon: <Landmark className="w-10 h-10 text-primary" />,
      count: 8,
      backgroundImage: 'https://images.pexels.com/photos/5458388/pexels-photo-5458388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      color: 'from-orange-500/80 to-orange-400/40',
    },
    {
      id: 'active',
      title: 'Активный отдых',
      description: 'Рафтинг, зиплайн, квадроциклы и приключения',
      icon: <Users className="w-10 h-10 text-primary" />,
      count: 10,
      backgroundImage: 'https://images.pexels.com/photos/1732278/pexels-photo-1732278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      color: 'from-red-500/80 to-red-400/40',
    },
    {
      id: 'nature',
      title: 'Природные красоты',
      description: 'Национальные парки, джунгли и водопады',
      icon: <Mountain className="w-10 h-10 text-primary" />,
      count: 7,
      backgroundImage: 'https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      color: 'from-green-500/80 to-green-400/40',
    },
    {
      id: 'gastro',
      title: 'Гастрономические туры',
      description: 'Кулинарные мастер-классы и гастрономические впечатления',
      icon: <Utensils className="w-10 h-10 text-primary" />,
      count: 5,
      backgroundImage: 'https://images.pexels.com/photos/5907911/pexels-photo-5907911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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
            Выберите <span className="text-primary">тип экскурсии</span>
          </h2>
          <p className="text-gray-600">
            У нас вы найдете разнообразные варианты экскурсий для любых интересов и предпочтений
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
          {tourTypes.map((type, index) => (
            <div 
              key={type.id}
              className="group relative rounded-xl overflow-hidden h-80 transition-all duration-500"
              style={{ 
                transitionDelay: `${index * 100}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)' 
              }}
            >
              {/* Фоновое изображение */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${type.backgroundImage}')` }}
              ></div>
              
              {/* Градиентный оверлей */}
              <div className={`absolute inset-0 bg-gradient-to-t ${type.color} opacity-80 transition-opacity duration-300 group-hover:opacity-90`}></div>
              
              {/* Контент */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div>
                  <div className="mb-4 bg-white/20 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                  <p className="text-white/80 text-sm">{type.description}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white/90 font-medium">{type.count} экскурсий</span>
                  <Link 
                    href={`/tours?category=${type.id}`}
                    className="bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white text-sm py-2 px-4 rounded-lg transition-colors"
                  >
                    Смотреть
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

export default TourTypeSection; 