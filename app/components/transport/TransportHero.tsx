'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Car, Calendar, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TransportHeroProps {
  hasAnimated: boolean;
}

export const TransportHero: React.FC<TransportHeroProps> = ({ hasAnimated }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroInView = inView && hasAnimated;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Конвертируем позицию мыши в значения от -0.5 до 0.5
      const x = (clientX / windowWidth - 0.5) * 2;
      const y = (clientY / windowHeight - 0.5) * 2;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const stats = [
    { 
      value: '300+', 
      label: 'Транспортных средств', 
      icon: <Car className="w-4 h-4" /> 
    },
    { 
      value: '24/7', 
      label: 'Поддержка клиентов', 
      icon: <Clock className="w-4 h-4" /> 
    },
    { 
      value: '98%', 
      label: 'Довольных клиентов', 
      icon: <CheckCircle className="w-4 h-4" /> 
    },
  ];

  const advantages = [
    'Бесплатная доставка',
    'Страховка включена',
    'Возможна долгосрочная аренда',
    'Русскоговорящий персонал'
  ];

  // Варианты анимации для framer-motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    })
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  return (
    <section 
      ref={ref} 
      className="relative overflow-hidden bg-white"
      style={{ height: '700px' }}
    >
      {/* Background с эффектом параллакса */}
      <div 
        className="absolute inset-0 bg-[url('/images/transport/hero-bg-car.jpg')] bg-cover bg-center scale-105 opacity-75"
        style={{ 
          transform: heroInView ? 
            `scale(1.05) translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)` : 
            'scale(1.05) translate(0px, 0px)',
          transition: 'transform 5s ease-out, opacity 1.5s ease-out',
          transformOrigin: 'center center',
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/50"></div>

      {/* Интерактивные декоративные элементы */}
      {heroInView && [...Array(15)].map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute rounded-full border border-primary/20 backdrop-blur-sm"
          initial={{
            opacity: 0,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            opacity: Math.random() * 0.5 + 0.1,
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            scale: Math.random() * 0.5 + 0.5,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.3
          }}
          style={{
            width: `${Math.random() * 60 + 20}px`,
            height: `${Math.random() * 60 + 20}px`,
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
            filter: 'blur(0.5px)'
          }}
        />
      ))}
      
      {/* Пульсирующие круги */}
      <motion.div 
        className="absolute bottom-[10%] right-[15%] w-40 h-40 bg-primary/5 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={heroInView ? { 
          opacity: [0.3, 0.6, 0.3], 
          scale: [0.8, 1.2, 0.8],
        } : { opacity: 0, scale: 0.8 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute top-[20%] left-[10%] w-32 h-32 bg-primary/5 rounded-full blur-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={heroInView ? { 
          opacity: [0.2, 0.5, 0.2], 
          scale: [0.8, 1.1, 0.8],
        } : { opacity: 0, scale: 0.8 }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>

      {/* Content */}
      <div className="container mx-auto h-full px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center">
          
          {/* Left column */}
          <div>
            <motion.h1 
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={fadeInUp}
              custom={0}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
            >
              <span className="text-gray-900 inline-block relative">
                Аренда транспорта
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-1 bg-primary/30 rounded-full"
                  initial={{ width: 0 }}
                  animate={heroInView ? { width: '100%' } : { width: 0 }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                ></motion.span>
              </span> <br />
              <span className="text-primary inline-block">
                на Пхукете
                <motion.span 
                  className="absolute -z-10 left-0 top-0 w-full h-full bg-primary/5 rounded-lg"
                  initial={{ width: 0 }}
                  animate={heroInView ? { width: '100%' } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                ></motion.span>
              </span>
            </motion.h1>
            
            <motion.p 
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={fadeInUp}
              custom={1}
              className="text-lg text-gray-700 mb-8 max-w-lg"
            >
              Безопасная и выгодная аренда автомобилей, скутеров и мотоциклов для комфортного передвижения по острову
            </motion.p>
            
            <motion.div 
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={fadeInUp}
              custom={2}
              className="flex flex-wrap gap-4 mb-8 md:mb-12"
            >
              <Link 
                href="/transport/search" 
                className="group relative px-6 py-3 bg-primary text-white rounded-lg font-medium transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Найти транспорт</span>
                <span className="absolute bottom-0 left-0 w-full h-full bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <motion.span 
                  className="absolute top-0 left-0 right-0 bottom-0 border-2 border-primary rounded-lg z-0"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                ></motion.span>
              </Link>
              
              <Link 
                href="/contact" 
                className="group relative px-6 py-3 bg-transparent text-gray-800 rounded-lg font-medium border border-gray-300 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-primary transition-colors duration-300">Связаться с нами</span>
                <span className="absolute bottom-0 left-0 w-full h-0 bg-primary/10 group-hover:h-full transition-all duration-300"></span>
              </Link>
            </motion.div>
            
            <div className="flex flex-wrap gap-6">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  initial="hidden"
                  animate={heroInView ? "visible" : "hidden"}
                  variants={fadeInUp}
                  custom={3 + index * 0.3}
                  className="flex items-center transition-all duration-300 hover:translate-y-[-5px]"
                >
                  <motion.div 
                    className="bg-primary/10 p-2 rounded-lg mr-3 transition-all duration-300"
                    whileHover={{ 
                      rotate: 12,
                      scale: 1.1,
                      backgroundColor: 'rgba(var(--color-primary), 0.2)'
                    }}
                  >
                    <div className="text-primary">
                      {stat.icon}
                    </div>
                  </motion.div>
                  <div>
                    <motion.div 
                      className="text-primary font-bold text-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ delay: index * 0.2 + 0.8 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-gray-600 text-sm">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Right column - карточка с преимуществами в 3D */}
          <motion.div 
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={scaleIn}
            className="flex items-center justify-center"
            style={{ 
              perspective: "1000px",
              transformStyle: "preserve-3d"
            }}
          >
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative"
              style={{ 
                transformStyle: "preserve-3d",
                transform: heroInView ? 
                  `rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)` : 
                  'rotateY(0deg) rotateX(0deg)',
                transition: "transform 0.3s ease-out"
              }}
              whileHover={{ 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 relative">
                Наши преимущества
                <motion.span 
                  className="absolute -bottom-2 left-0 h-1 bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={heroInView ? { width: '50%' } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  whileHover={{ width: '100%' }}
                ></motion.span>
              </h3>
              
              <div className="space-y-5">
                {advantages.map((advantage, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.8 + index * 0.15,
                      ease: [0.2, 0.65, 0.3, 0.9]
                    }}
                    whileHover={{ 
                      x: 8,
                      transition: { duration: 0.2 }
                    }}
                    className="flex items-center"
                  >
                    <motion.div 
                      className="bg-primary/10 p-2 rounded-full mr-3"
                      whileHover={{ 
                        scale: 1.2,
                        backgroundColor: 'rgba(var(--color-primary), 0.2)',
                        transition: { duration: 0.2, type: "spring", stiffness: 400 }
                      }}
                      whileTap={{ scale: 0.9 }}
                      style={{ 
                        transformStyle: "preserve-3d",
                        transform: `translateZ(20px)`
                      }}
                    >
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </motion.div>
                    <span className="text-gray-700">
                      {advantage}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-8 pt-6 border-t border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 1.2,
                  ease: [0.2, 0.65, 0.3, 0.9]
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  transform: `translateZ(10px)`
                }}
              >
                <div className="flex items-center mb-2">
                  <Calendar className="w-5 h-5 text-primary mr-2" 
                  style={{ 
                    animation: heroInView ? 'bounce 2s infinite' : 'none'
                  }} />
                  <span className="text-gray-800 font-medium">Гибкое бронирование</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Бесплатная отмена за 24 часа до получения
                </p>
              </motion.div>
              
              {/* 3D эффект для карточки */}
              <motion.div 
                className="absolute inset-0 rounded-2xl border border-primary/20 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                style={{ 
                  transformStyle: "preserve-3d",
                  transform: `translateZ(5px)`,
                  boxShadow: "0 0 20px rgba(var(--color-primary), 0.1)"
                }}
              ></motion.div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
      
      {/* CSS для анимаций */}
      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          25% { transform: translateY(-50px) translateX(20px) rotate(90deg); }
          50% { transform: translateY(-20px) translateX(-20px) rotate(180deg); }
          75% { transform: translateY(50px) translateX(30px) rotate(270deg); }
          100% { transform: translateY(0) translateX(0) rotate(360deg); }
        }
      `}</style>
    </section>
  );
}; 