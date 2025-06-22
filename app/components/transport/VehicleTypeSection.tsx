'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Car, Bike, Ship, PlaneTakeoff } from 'lucide-react';

const vehicleTypes = [
  {
    title: 'Автомобили',
    description: 'Широкий выбор автомобилей для любых целей',
    icon: <Car className="w-10 h-10 text-primary" />,
    image: '/images/placeholder-category.jpg',
    count: 120,
    link: '/transport/category/cars'
  },
  {
    title: 'Мотоциклы и скутеры',
    description: 'Идеально для быстрого передвижения по острову',
    icon: <Bike className="w-10 h-10 text-primary" />,
    image: '/images/placeholder-category.jpg',
    count: 85,
    link: '/transport/category/bikes'
  },
  {
    title: 'Водный транспорт',
    description: 'Яхты, катера и гидроциклы для водных развлечений',
    icon: <Ship className="w-10 h-10 text-primary" />,
    image: '/images/placeholder-category.jpg',
    count: 40,
    link: '/transport/category/boats'
  },
  {
    title: 'Авиа транспорт',
    description: 'Вертолеты и самолеты для экскурсий и перелетов',
    icon: <PlaneTakeoff className="w-10 h-10 text-primary" />,
    image: '/images/placeholder-category.jpg',
    count: 15,
    link: '/transport/category/air'
  }
];

interface VehicleTypeSectionProps {
  hasAnimated: boolean;
}

export const VehicleTypeSection: React.FC<VehicleTypeSectionProps> = ({ hasAnimated }) => {
  const [selectedType, setSelectedType] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const activateNextType = () => {
    const interval = setInterval(() => {
      setSelectedType((prev) => (prev + 1) % vehicleTypes.length);
    }, 4000);
    
    return () => clearInterval(interval);
  };
  
  useEffect(() => {
    const cleanup = activateNextType();
    return cleanup;
  }, []);

  // Анимации для карточек
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      }
    })
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-xl opacity-70"
           style={{animation: 'float 20s infinite ease-in-out'}}></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-xl opacity-70"
           style={{animation: 'float 15s infinite ease-in-out reverse'}}></div>
      
      {/* Анимированные частицы */}
      {[...Array(6)].map((_, i) => (
        <div 
          key={`particle-${i}`}
          className="absolute rounded-full bg-primary opacity-10"
          style={{
            width: Math.random() * 10 + 5 + 'px',
            height: Math.random() * 10 + 5 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animation: `floatParticle ${Math.random() * 20 + 10}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 5}s`
          }}
        ></div>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-gray-900 transition-all duration-700 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Категории транспорта
            <span className="inline-block ml-2 relative">
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto text-gray-600 transition-all duration-700 delay-100 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Выберите подходящий тип транспортного средства для вашего путешествия по Пхукету
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 transform hover:shadow-2xl">
            {vehicleTypes.map((type, idx) => (
              <div 
                key={idx}
                className={`relative h-96 ${selectedType === idx ? 'block' : 'hidden'}`}
              >
                <div 
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    selectedType === idx ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image 
                    src={type.image} 
                    alt={type.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transform transition-transform duration-10000 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className={`transition-all duration-700 transform ${
                    selectedType === idx && inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}>
                    <div className="mb-4 p-3 bg-white/10 backdrop-blur-md rounded-full inline-block">
                      {type.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{type.title}</h3>
                    <p className="mb-4 text-white/90">{type.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-primary/80 rounded-full text-sm">
                        {type.count}+ транспортных средств
                      </span>
                      <Link 
                        href={type.link}
                        className="inline-flex items-center text-white hover:text-primary transition-colors group"
                      >
                        Подробнее
                        <ChevronRight className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {vehicleTypes.map((type, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                animate={inView && hasAnimated ? "visible" : "hidden"}
                variants={cardVariants}
                className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  selectedType === idx ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedType(idx)}
              >
                <div className="mb-4 relative z-10">
                  <div className={`transition-all duration-300 transform ${selectedType === idx ? 'scale-110' : 'scale-100'}`}>
                    {type.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 relative z-10">{type.title}</h3>
                <p className="text-sm text-gray-600 mb-3 relative z-10">{type.description}</p>
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-sm font-semibold text-primary">
                    {type.count}+ вариантов
                  </span>
                </div>
                
                {/* Анимированный фон при выборе */}
                <div 
                  className={`absolute inset-0 bg-primary/5 transition-transform duration-500 origin-bottom-left ${
                    selectedType === idx ? 'scale-100' : 'scale-0'
                  }`}
                  style={{
                    borderRadius: 'inherit',
                  }}
                ></div>
                
                {/* Пульсирующий индикатор */}
                {selectedType === idx && (
                  <div className="absolute top-3 right-3">
                    <span className="absolute w-3 h-3 bg-primary/30 rounded-full animate-ping"></span>
                    <span className="absolute w-3 h-3 bg-primary rounded-full"></span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
        }
        
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-50px) translateX(20px); }
          50% { transform: translateY(-20px) translateX(-20px); }
          75% { transform: translateY(50px) translateX(30px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
    </section>
  );
}; 