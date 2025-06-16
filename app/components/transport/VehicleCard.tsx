'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Users, Calendar, Zap, ChevronRight, Gauge, Award, Shield, Check, MapPin, CircleCheck } from 'lucide-react';
import { Vehicle } from '@/types/vehicle';
import { motion, AnimatePresence } from 'framer-motion';

// Интерфейс для данных о транспорте
interface VehicleCardProps {
  vehicle: Vehicle;
  priority?: boolean;
  inView?: boolean;
  index?: number;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ 
  vehicle, 
  priority = false,
  inView = true,
  index = 0
}) => {
  // Состояния для интерактивности
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Ограничиваем названия и описания
  const truncatedTitle = vehicle.name.length > 30 
    ? `${vehicle.name.substring(0, 30)}...` 
    : vehicle.name;
  
  const truncatedDescription = vehicle.description && vehicle.description.length > 100
    ? `${vehicle.description.substring(0, 100)}...`
    : vehicle.description;

  // Вычисляем угол наклона на основе позиции мыши (3D эффект)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 8; // Максимальный угол поворота 8 градусов
    const rotateX = ((centerY - y) / centerY) * 8;
    
    setMousePosition({ x: rotateY, y: rotateX });
  };

  const resetMousePosition = () => {
    setMousePosition({ x: 0, y: 0 });
  };
  
  // Анимационные варианты
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
    },
    visible: (i: number) => ({ 
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * (i + 1),
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }),
    hover: { 
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  // Эффект переворота карточки
  const flipVariants = {
    front: {
      rotateY: 0,
      transition: {
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1]
      }
    },
    back: {
      rotateY: 180,
      transition: {
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };
  
  // Рендеринг звезд рейтинга
  const renderStars = (rating: number) => {
    const stars = [];
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <motion.span 
          key={i} 
          className={`text-${i < rating ? 'primary' : 'gray-400'}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: {
              delay: 0.2 + (i * 0.1),
              duration: 0.3,
            }
          }}
          whileHover={{ 
            scale: 1.2,
            rotate: [0, 5, -5, 0],
            transition: { duration: 0.3 } 
          }}
        >
          <Star className="w-4 h-4 fill-current" />
        </motion.span>
      );
    }
    
    return stars;
  };
  
  // Получаем характеристики транспорта для отображения
  const features = [
    { icon: <Users className="h-4 w-4" />, text: `${vehicle.seats} мест` },
    { icon: <Gauge className="h-4 w-4" />, text: vehicle.automatic ? 'Автомат' : 'Механика' },
    { icon: <Zap className="h-4 w-4" />, text: `${vehicle.power} л.с.` },
  ];
  
  // Список преимуществ для обратной стороны карточки
  const benefits = [
    'Страховка включена',
    'Неограниченный пробег',
    'Техподдержка 24/7',
    'Бесплатная отмена за 24ч',
    'Доставка по Пхукету'
  ];

  return (
    <motion.div
      ref={cardRef}
      className="h-full perspective-1000 group relative cursor-pointer"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      custom={index}
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetMousePosition();
      }}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: "1000px" }}
    >
      <motion.div 
        className="relative w-full h-full preserve-3d"
        animate={isFlipped ? "back" : "front"}
        variants={flipVariants}
        style={{ 
          transformStyle: "preserve-3d",
          transform: `
            perspective(1000px)
            rotateY(${isFlipped ? 180 : mousePosition.x}deg)
            rotateX(${isFlipped ? 0 : mousePosition.y}deg)
          `
        }}
      >
        {/* Передняя сторона карточки */}
        <motion.div 
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden flex flex-col h-full bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl"
          style={{ 
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          {/* Изображение с градиентом и эффектом */}
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <Image
              src={vehicle.image}
              alt={vehicle.name}
              width={500}
              height={300}
              priority={priority}
              className="object-cover w-full h-full transform duration-700 ease-in-out group-hover:scale-110"
            />
            
            {/* Градиентный оверлей */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-70"></div>
            
            {/* Тип транспорта с 3D эффектом */}
            <motion.div 
              className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              style={{ 
                transformStyle: "preserve-3d",
                transform: "translateZ(20px)"
              }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(var(--color-primary), 1)"
              }}
            >
              {vehicle.type}
            </motion.div>
            
            {/* Цена с 3D эффектом */}
            <motion.div 
              className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-dark px-3 py-2 rounded-lg text-sm font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              style={{ 
                transformStyle: "preserve-3d",
                transform: "translateZ(30px)"
              }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-primary">{vehicle.price}</span> ฿/день
            </motion.div>
            
            {/* Декоративный элемент */}
            {isHovered && (
              <motion.div 
                className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-primary/30 blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
          
          {/* Контент карточки */}
          <div className="flex flex-col flex-grow p-5 relative">
            {/* Название и рейтинг */}
            <div className="mb-3">
              <motion.h3 
                className="text-lg font-bold text-white mb-1 tracking-tight"
                style={{ 
                  transformStyle: "preserve-3d",
                  transform: "translateZ(10px)"
                }}
                whileHover={{ 
                  color: "rgb(var(--color-primary))",
                  x: 5,
                  transition: { duration: 0.2 }
                }}
              >
                {truncatedTitle}
              </motion.h3>
              
              <div className="flex items-center space-x-1 mb-2">
                {renderStars(vehicle.rating)}
                <motion.span 
                  className="text-white/60 text-xs ml-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  ({vehicle.reviewCount})
                </motion.span>
              </div>
              
              <motion.div 
                className="text-white/70 text-sm flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ 
                  transformStyle: "preserve-3d",
                  transform: "translateZ(5px)"
                }}
              >
                <MapPin className="w-3 h-3 mr-1 text-primary inline" /> 
                <span>{vehicle.location || 'Пхукет'}</span>
              </motion.div>
            </div>
            
            {/* Характеристики */}
            <motion.div 
              className="flex items-center gap-3 mb-3 text-white/80 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              {features.map((feature, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-center gap-1"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  style={{ 
                    transformStyle: "preserve-3d",
                    transform: "translateZ(15px)"
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    color: "rgb(var(--color-primary))"
                  }}
                >
                  <span className="text-primary">{feature.icon}</span>
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Дополнительная информация */}
            {truncatedDescription && (
              <motion.p 
                className="text-white/60 text-sm mb-4 flex-grow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {truncatedDescription}
              </motion.p>
            )}
            
            {/* Кнопка действия */}
            <motion.div 
              className="flex justify-between items-center mt-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{ 
                transformStyle: "preserve-3d",
                transform: "translateZ(20px)"
              }}
            >
              <span className="text-white/50 text-xs flex items-center">
                <Calendar className="h-3 w-3 mr-1 text-primary" /> 
                {vehicle.availability || 'Доступно сейчас'}
              </span>
              
              <motion.button
                className="flex items-center gap-1 text-primary font-medium text-sm"
                whileHover={{ 
                  x: 5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Подробнее</span>
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
            
            {/* Обратная часть подсказки */}
            <motion.div 
              className="absolute bottom-2 right-2 text-white/30 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Нажмите для информации
            </motion.div>
          </div>
          
          {/* Индикатор 3D эффекта */}
          {isHovered && !isFlipped && (
            <motion.div 
              className="absolute inset-0 border border-primary/20 rounded-2xl pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </motion.div>
        
        {/* Задняя сторона карточки */}
        <motion.div 
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden flex flex-col h-full bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl"
          style={{ 
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="p-6 flex flex-col h-full relative">
            {/* Заголовок задней стороны */}
            <motion.div 
              className="text-center mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ 
                transformStyle: "preserve-3d",
                transform: "translateZ(20px)"
              }}
            >
              <h3 className="text-xl font-bold text-white mb-2">{vehicle.name}</h3>
              <div className="flex justify-center">
                {renderStars(vehicle.rating)}
              </div>
              <div className="mt-2 inline-block bg-primary/80 text-white rounded-full px-4 py-1 text-sm">
                {vehicle.price} ฿/день
              </div>
            </motion.div>
            
            {/* Преимущества */}
            <motion.div 
              className="mb-6 flex-grow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ 
                transformStyle: "preserve-3d",
                transform: "translateZ(10px)"
              }}
            >
              <h4 className="text-white font-medium mb-3 flex items-center">
                <Award className="w-4 h-4 mr-2 text-primary" />
                Преимущества аренды
              </h4>
              
              <ul className="space-y-3">
                {benefits.map((benefit, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    whileHover={{ x: 5 }}
                  >
                    <CircleCheck className="w-4 h-4 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Кнопки действий */}
            <div className="space-y-3">
              <Link href={`/transport/${vehicle.id}`}>
                <motion.button 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ 
                    transformStyle: "preserve-3d",
                    transform: "translateZ(30px)"
                  }}
                >
                  Забронировать сейчас
                </motion.button>
              </Link>
              
              <motion.button 
                className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2 rounded-lg transition-all duration-300 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ 
                  transformStyle: "preserve-3d",
                  transform: "translateZ(20px)"
                }}
              >
                Вернуться к информации
              </motion.button>
            </div>
            
            {/* Паттерн на заднем плане */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-primary/5 blur-2xl"></div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* 3D тень */}
      <motion.div 
        className="absolute -inset-0.5 rounded-2xl bg-dark z-[-1] translate-y-4"
        style={{ 
          opacity: isHovered ? 0.3 : 0.1,
          filter: "blur(16px)",
          transform: `
            translateY(20px)
            rotateX(${-mousePosition.y}deg)
            rotateY(${-mousePosition.x}deg)
            scale(0.95)
          `,
          transition: "opacity 0.3s ease"
        }}
      />
    </motion.div>
  );
};

export default VehicleCard; 