'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialProps {
  id: number;
  name: string;
  avatar: string;
  role: string;
  rating: number;
  text: string;
  date: string;
  vehicle: string;
}

const testimonials: TestimonialProps[] = [
  {
    id: 1,
    name: 'Алексей Смирнов',
    avatar: '/images/transport/avatar1.jpg',
    role: 'Турист из Москвы',
    rating: 5,
    text: 'Отличный сервис! Арендовали Honda PCX на 10 дней, скутер был в идеальном состоянии. Процесс аренды занял меньше 15 минут. Обязательно воспользуюсь услугами снова!',
    date: '15 мая 2023',
    vehicle: 'Honda PCX'
  },
  {
    id: 2,
    name: 'Елена Котова',
    avatar: '/images/transport/avatar2.jpg',
    role: 'Путешественница',
    rating: 5,
    text: 'Брали в аренду Toyota Fortuner на неделю для поездок по острову. Машина чистая, в отличном состоянии. Менеджер помог со всеми документами и дал полезные советы по маршрутам.',
    date: '3 июня 2023',
    vehicle: 'Toyota Fortuner'
  },
  {
    id: 3,
    name: 'Дмитрий Петров',
    avatar: '/images/transport/avatar3.jpg',
    role: 'Бизнесмен',
    rating: 5,
    text: 'Арендовал яхту для однодневной морской прогулки. Команда была очень профессиональной, всё прошло отлично. Рекомендую этот сервис всем, кто хочет получить незабываемые впечатления!',
    date: '22 июля 2023',
    vehicle: 'Моторная яхта'
  },
  {
    id: 4,
    name: 'Мария Иванова',
    avatar: '/images/transport/avatar4.jpg',
    role: 'Фрилансер',
    rating: 5,
    text: 'Уже второй раз пользуюсь услугами этой компании. В этот раз арендовала скутер на 5 дней. Всё как всегда на высоте - быстро, удобно и без проблем. Очень довольна!',
    date: '10 августа 2023',
    vehicle: 'Yamaha NVX'
  },
  {
    id: 5,
    name: 'Максим Козлов',
    avatar: '/images/avatars/user5.jpg',
    role: 'Турист',
    rating: 4,
    text: 'Арендовали скутер Honda Click. Все было отлично, скутер в хорошем состоянии. Немного задержали выдачу, пришлось подождать около 20 минут, но в целом сервис хороший.',
    date: '5 сентября 2023',
    vehicle: 'Honda Click'
  }
];

interface TestimonialsSectionProps {
  hasAnimated: boolean;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ hasAnimated }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [direction, setDirection] = useState(0); // 1 для вправо, -1 для влево
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Переменная для определения видимости и анимации
  const sectionInView = inView && hasAnimated;

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Автоматическая смена отзывов
  useEffect(() => {
    if (!sectionInView) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      nextTestimonial();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [sectionInView]);

  // Обработка свайпов для мобильных устройств
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextTestimonial();
    }
    
    if (isRightSwipe) {
      prevTestimonial();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
      />
    ));
  };

  // Варианты анимации для слайдов
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  // Варианты анимации для плавающих элементов
  const floatingElement = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 0.7,
      y: 0,
      transition: {
        delay: delay,
        duration: 0.8,
      }
    })
  };

  return (
    <section 
      ref={ref}
      id="testimonials"
      className="py-20 relative overflow-hidden bg-dark"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 bg-[url('/images/transport/testimonials-bg.jpg')] bg-cover bg-center opacity-20"></div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/80 to-dark/40"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/90"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark to-transparent"></div>
      
      {/* Улучшенные декоративные элементы */}
      {sectionInView && 
        [...Array(20)].map((_, i) => (
          <motion.div 
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            initial={{
              opacity: 0,
              scale: 0
            }}
            animate={{
              opacity: Math.random() * 0.5 + 0.1,
              scale: Math.random() * 0.7 + 0.3,
              y: [0, Math.random() * -30, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              filter: 'blur(0.5px)'
            }}
          />
        ))
      }
      
      {/* Большие декоративные кавычки с продвинутой анимацией */}
      <motion.div 
        className="absolute top-40 left-10 text-primary"
        initial={{ opacity: 0, x: -100, rotate: -20 }}
        animate={sectionInView ? { 
          opacity: 0.04, 
          x: 0, 
          rotate: 0,
          y: [0, -20, 0]
        } : { opacity: 0, x: -100, rotate: -20 }}
        transition={{ 
          duration: 1, 
          delay: 0.2,
          y: {
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      >
        <Quote className="w-48 h-48" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-40 right-10 text-primary transform rotate-180"
        initial={{ opacity: 0, x: 100, rotate: 200 }}
        animate={sectionInView ? { 
          opacity: 0.04, 
          x: 0, 
          rotate: 180,
          y: [0, 20, 0]
        } : { opacity: 0, x: 100, rotate: 200 }}
        transition={{ 
          duration: 1, 
          delay: 0.4,
          y: {
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      >
        <Quote className="w-48 h-48" />
      </motion.div>
      
      {/* Светящиеся сферы */}
      <motion.div 
        className="absolute top-1/4 right-1/4 rounded-full"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={sectionInView ? { 
          opacity: 0.15, 
          scale: 1,
          x: [0, 30, 0],
          y: [0, -30, 0],
        } : { opacity: 0, scale: 0.5 }}
        transition={{ 
          duration: 1, 
          delay: 0.5,
          x: {
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          },
          y: {
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
        style={{
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(var(--color-primary), 0.5) 0%, rgba(var(--color-primary), 0) 70%)',
          filter: 'blur(40px)'
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 left-1/3 rounded-full"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={sectionInView ? { 
          opacity: 0.1, 
          scale: 1,
          x: [0, -40, 0],
          y: [0, 40, 0],
        } : { opacity: 0, scale: 0.5 }}
        transition={{ 
          duration: 1, 
          delay: 0.7,
          x: {
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          },
          y: {
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(var(--color-primary), 0.3) 0%, rgba(var(--color-primary), 0) 70%)',
          filter: 'blur(50px)'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          ref={headerRef}
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.2, 0.65, 0.3, 0.9] 
          }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4 relative inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Отзывы наших <span className="text-primary">клиентов</span>
            <motion.span 
              className="absolute -top-1 -right-6"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <span className="absolute w-3 h-3 bg-primary/30 rounded-full animate-ping"></span>
              <span className="absolute w-3 h-3 bg-primary rounded-full"></span>
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-light/70 text-lg"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Узнайте, что говорят клиенты о нашем сервисе аренды транспорта на Пхукете
          </motion.p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto relative" style={{ perspective: "1500px" }}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div 
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                rotateY: { type: "spring", stiffness: 200, damping: 30 }
              }}
              className="relative bg-white/5 backdrop-blur-md rounded-xl overflow-hidden shadow-xl"
              style={{ 
                transformStyle: "preserve-3d"
              }}
            >
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  {/* Аватар и информация о клиенте в 3D */}
                  <div className="flex flex-col items-center md:items-start">
                    <motion.div 
                      className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary/20"
                      initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.3,
                        type: "spring", 
                        stiffness: 200 
                      }}
                      style={{ 
                        transformStyle: "preserve-3d",
                        transform: `translateZ(40px)`
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 0 20px rgba(var(--color-primary), 0.3)",
                        transition: { duration: 0.3 }
                      }}
                    >
                      <Image
                        src={testimonials[currentIndex].avatar}
                        alt={testimonials[currentIndex].name}
                        width={96}
                        height={96}
                        className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      style={{ 
                        transformStyle: "preserve-3d",
                        transform: `translateZ(30px)`
                      }}
                    >
                      <h3 className="text-xl font-bold text-white mb-1 text-center md:text-left">
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className="text-white/70 mb-3 text-center md:text-left">
                        {testimonials[currentIndex].role}
                      </p>
                      <div className="flex mb-2">
                        {renderStars(testimonials[currentIndex].rating)}
                      </div>
                      <motion.p 
                        className="text-sm text-white/50 mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                      >
                        Арендовал: {testimonials[currentIndex].vehicle}
                      </motion.p>
                      <motion.p 
                        className="text-sm text-white/50"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 }}
                      >
                        {testimonials[currentIndex].date}
                      </motion.p>
                    </motion.div>
                  </div>
                  
                  {/* Отзыв с продвинутой анимацией */}
                  <div className="flex-1">
                    <div className="relative">
                      <motion.svg 
                        className="text-primary/10 w-16 h-16 absolute -top-8 -left-4" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                        initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: 0.4,
                          type: "spring", 
                          stiffness: 200 
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: -5,
                          transition: { duration: 0.3 }
                        }}
                        style={{ 
                          transformStyle: "preserve-3d",
                          transform: `translateZ(20px)`
                        }}
                      >
                        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                      </motion.svg>
                      
                      <motion.div 
                        className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-4 relative overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.7, 
                          delay: 0.6,
                          type: "spring", 
                          stiffness: 100 
                        }}
                        style={{ 
                          transformStyle: "preserve-3d",
                          transform: `translateZ(10px)`
                        }}
                        whileHover={{ 
                          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                          transition: { duration: 0.3 }
                        }}
                      >
                        <motion.p 
                          className="text-white/80 text-lg italic leading-relaxed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                        >
                          "{testimonials[currentIndex].text}"
                        </motion.p>
                        
                        {/* Декоративный элемент текста */}
                        <motion.div 
                          className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-primary/5"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.5 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                          style={{ filter: 'blur(30px)' }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Декоративная рамка */}
              <motion.div 
                className="absolute inset-0 rounded-xl border border-primary/10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                style={{ 
                  transformStyle: "preserve-3d",
                  transform: `translateZ(5px)`,
                }}
              />
            </motion.div>
          </AnimatePresence>
            
          {/* Улучшенные навигационные кнопки */}
          <motion.button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors z-20"
            aria-label="Предыдущий отзыв"
            initial={{ opacity: 0, x: -20 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 0 15px rgba(var(--color-primary), 0.5)"
            }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          
          <motion.button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors z-20"
            aria-label="Следующий отзыв"
            initial={{ opacity: 0, x: 20 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 0 15px rgba(var(--color-primary), 0.5)"
            }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
          
          {/* Улучшенные индикаторы */}
          <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-3 z-20">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`rounded-full transition-all overflow-hidden ${
                  index === currentIndex ? 'w-16 h-4' : 'w-4 h-4'
                }`}
                aria-label={`Перейти к отзыву ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={sectionInView ? { 
                  opacity: 1, 
                  y: 0, 
                  transition: { delay: 0.9 + index * 0.1 } 
                } : { opacity: 0, y: 20 }}
              >
                <motion.div 
                  className="w-full h-full"
                  animate={{ 
                    backgroundColor: index === currentIndex 
                      ? ['rgb(var(--color-primary))', 'rgb(var(--color-primary-dark))', 'rgb(var(--color-primary))'] 
                      : 'rgba(255, 255, 255, 0.3)'
                  }}
                  transition={{
                    duration: 2,
                    repeat: index === currentIndex ? Infinity : 0
                  }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
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