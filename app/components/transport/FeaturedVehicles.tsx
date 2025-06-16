'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Star, Users, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface VehicleProps {
  id: string;
  title: string;
  type: string;
  price: number;
  priceUnit: string;
  rating: string;
  location: string;
  features: {
    passengers: number;
    transmission: string;
  };
  image: string;
}

const vehicles: VehicleProps[] = [
  {
    id: 'vehicle-1',
    title: 'Honda Scoopy 2023',
    type: 'Скутер',
    price: 300,
    priceUnit: 'день',
    rating: '4.8',
    location: 'Район Патонг',
    features: {
      passengers: 2,
      transmission: 'Автомат',
    },
    image: '/images/transport/scooter1.jpg'
  },
  {
    id: 'vehicle-2',
    title: 'Toyota Fortuner',
    type: 'Внедорожник',
    price: 2500,
    priceUnit: 'день',
    rating: '4.9',
    location: 'Район Карон',
    features: {
      passengers: 7,
      transmission: 'Автомат',
    },
    image: '/images/transport/car1.jpg'
  },
  {
    id: 'vehicle-3',
    title: 'Yamaha NVX 155',
    type: 'Скутер',
    price: 450,
    priceUnit: 'день',
    rating: '4.7',
    location: 'Район Ката',
    features: {
      passengers: 2,
      transmission: 'Автомат',
    },
    image: '/images/transport/scooter2.jpg'
  },
  {
    id: 'vehicle-4',
    title: 'Suzuki Swift',
    type: 'Седан',
    price: 1200,
    priceUnit: 'день',
    rating: '4.5',
    location: 'Район Чалонг',
    features: {
      passengers: 5,
      transmission: 'Автомат',
    },
    image: '/images/transport/car2.jpg'
  },
];

// Extracted vehicle card component for reusability
const VehicleCard: React.FC<{ vehicle: VehicleProps; index: number; inView: boolean }> = ({ 
  vehicle, 
  index,
  inView
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Обработка движения мыши для 3D эффекта
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // От -0.5 до 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // От -0.5 до 0.5
    
    setMousePosition({ x, y });
  };
  
  const resetMousePosition = () => {
    setMousePosition({ x: 0, y: 0 });
  };
  
  return (
    <motion.div 
      ref={cardRef}
      className="relative"
      style={{ perspective: "1200px" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ 
        opacity: inView ? 1 : 0, 
        y: inView ? 0 : 30,
        transition: { 
          duration: 0.5,
          delay: index * 0.1,
          ease: [0.2, 0.65, 0.3, 0.9] 
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsHovered(false);
        resetMousePosition();
      }}
      onMouseEnter={() => setIsHovered(true)}
    >
      <motion.div 
        className="bg-white rounded-xl overflow-hidden shadow-lg h-full"
        style={{ 
          transformStyle: "preserve-3d", 
          transform: isHovered 
            ? `rotateY(${mousePosition.x * 7}deg) rotateX(${-mousePosition.y * 7}deg) translateZ(10px)` 
            : "rotateY(0deg) rotateX(0deg) translateZ(0px)",
          transition: "transform 0.4s cubic-bezier(0.2, 0.85, 0.3, 1)",
          boxShadow: isHovered ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" : "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
        }}
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={vehicle.image}
            alt={vehicle.title}
            fill
            className="object-cover transition-transform duration-700"
            style={{ 
              transform: isHovered ? 'scale(1.08)' : 'scale(1.0)',
              transformOrigin: 'center center'
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Градиентный оверлей */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-70"></div>
          
          {/* Метка типа транспорта с 3D эффектом */}
          <motion.div 
            className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold z-10"
            style={{ 
              transformStyle: "preserve-3d",
              transform: `translateZ(20px)`
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {vehicle.type}
          </motion.div>
          
          {/* Рейтинг с 3D эффектом */}
          <motion.div 
            className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs flex items-center gap-1"
            style={{ 
              transformStyle: "preserve-3d",
              transform: `translateZ(20px)`
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-gray-700 font-medium">{vehicle.rating}</span>
          </motion.div>
          
          {/* Информация поверх изображения */}
          <motion.div 
            className="absolute bottom-3 left-3 right-3 text-white z-10"
            style={{ 
              transformStyle: "preserve-3d",
              transform: `translateZ(15px)`
            }}
          >
            <div className={`text-xl font-bold mb-1 transition-all duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-1'}`}>
              {vehicle.title}
            </div>
            <div className={`flex items-center gap-3 text-sm text-white/90 transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-80'}`}>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1 text-white/80" />
                {vehicle.features.passengers} чел.
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-white/80" />
                {vehicle.features.transmission}
              </div>
            </div>
          </motion.div>
          
          {/* Эффект блика при наведении */}
          <motion.div 
            className="absolute inset-0 bg-white/20 pointer-events-none"
            initial={{ opacity: 0, x: '-100%', skewX: '-15deg' }}
            animate={isHovered ? { 
              opacity: [0, 0.2, 0], 
              x: ['100%', '0%', '-100%'], 
              skewX: '-15deg' 
            } : { opacity: 0, x: '-100%', skewX: '-15deg' }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>

        <div className="p-5 flex flex-col justify-between h-[calc(100%-192px)]">
          <div className="flex-1">
            <div className={`text-sm text-gray-500 flex items-center mb-3 transition-all duration-300 ${isHovered ? 'translate-x-1' : ''}`}>
              <div className="mr-1">
                {vehicle.location}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
            <motion.div
              style={{ 
                transformStyle: "preserve-3d",
                transform: `translateZ(10px)`
              }}
            >
              <span className={`text-primary font-bold text-xl transition-all duration-300 ${isHovered ? 'scale-110 inline-block' : ''}`}>
                ฿{vehicle.price.toLocaleString()}
              </span>
              <span className="text-gray-500 text-sm">/{vehicle.priceUnit}</span>
            </motion.div>
            
            <motion.div
              style={{ 
                transformStyle: "preserve-3d",
                transform: `translateZ(10px)`
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href={`/transport/${vehicle.id}`}
                className={`inline-flex items-center rounded-lg transition-all text-sm font-medium px-3 py-2 ${
                  isHovered 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-primary/10 text-primary'
                }`}
              >
                Подробнее
                <ChevronRight className={`w-4 h-4 ml-1 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Декоративные элементы для 3D эффекта */}
        <motion.div 
          className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/5 rounded-full blur-xl"
          animate={isHovered ? 
            { scale: 1.2, opacity: 0.7 } : 
            { scale: 1, opacity: 0.3 }
          }
          transition={{ duration: 0.5 }}
          style={{ 
            transformStyle: "preserve-3d",
            transform: `translateZ(-10px)`
          }}
        />
      </motion.div>
      
      {/* Тень карточки с подсветкой при наведении */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-primary/5 -z-10"
        initial={{ opacity: 0 }}
        animate={isHovered ? 
          { opacity: 0.7, y: 10 } : 
          { opacity: 0, y: 0 }
        }
        transition={{ duration: 0.5 }}
        style={{ filter: 'blur(20px)' }}
      />
    </motion.div>
  );
};

interface FeaturedVehiclesProps {
  hasAnimated: boolean;
}

export const FeaturedVehicles: React.FC<FeaturedVehiclesProps> = ({ hasAnimated }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="bg-white py-16 md:py-24 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"
           style={{ animation: 'pulse 15s infinite ease-in-out' }}></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"
           style={{ animation: 'pulse 12s infinite ease-in-out reverse' }}></div>
      
      {/* Плавающие частицы */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, idx) => (
          <div 
            key={`particle-${idx}`}
            className="absolute bg-primary rounded-full opacity-20"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatParticle ${Math.random() * 20 + 10}s infinite linear`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-gray-900 transition-all duration-700 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Популярный транспорт
            <span className="relative ml-2">
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto text-gray-600 transition-all duration-700 delay-100 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Выбирайте из лучших вариантов транспорта, доступных для аренды на Пхукете. Все наши транспортные средства проходят регулярное техническое обслуживание.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle, index) => (
            <VehicleCard 
              key={vehicle.id} 
              vehicle={vehicle} 
              index={index}
              inView={inView && hasAnimated}
            />
          ))}
        </div>

        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Link
            href="/transport/catalog"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-medium relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center">
              Смотреть все варианты
              <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="absolute top-0 left-0 w-full h-0 bg-white/20 transition-height duration-300 group-hover:h-full"></span>
          </Link>
        </div>
      </div>
      
      {/* CSS для анимаций */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.5; }
        }
        
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-50px) translateX(20px); }
          50% { transform: translateY(-20px) translateX(-20px); }
          75% { transform: translateY(50px) translateX(30px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        .transition-height {
          transition-property: height;
        }
      `}</style>
    </section>
  );
}; 