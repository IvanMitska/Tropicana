'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';

interface TestimonialsSectionProps {
  hasAnimated?: boolean;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ hasAnimated = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const sectionInView = inView && hasAnimated;

  // Примеры отзывов
  const testimonials = [
    {
      id: 1,
      author: 'Ирина Смирнова',
      avatar: '/images/user-1.jpg',
      text: 'Экскурсия на острова Пхи-Пхи превзошла все ожидания! Прекрасная организация, внимательный гид и потрясающие виды. Вода такого цвета я ещё никогда не видела. Однозначно рекомендую всем, кто хочет увидеть настоящую жемчужину Таиланда.',
      rating: 5,
      date: '15 мая 2023',
      tourName: 'Экскурсия на острова Пхи-Пхи',
      tourType: 'Морские экскурсии'
    },
    {
      id: 2,
      author: 'Александр Петров',
      avatar: '/images/user-2.jpg',
      text: 'Отличная обзорная экскурсия по Пхукету! За один день мы увидели все главные достопримечательности острова. Большой Будда впечатлил своими масштабами, а виды с обзорных площадок заставили сердце замирать. Русскоговорящий гид отлично знает свое дело!',
      rating: 5,
      date: '3 июня 2023',
      tourName: 'Большой Будда и обзорная экскурсия',
      tourType: 'Культурные места'
    },
    {
      id: 3,
      author: 'Екатерина Иванова',
      avatar: '/images/host-1.jpg',
      text: 'Рафтинг и зиплайн в джунглях - это незабываемые впечатления! Адреналин и восторг! Инструкторы очень внимательные, все прошло безопасно. После активного отдыха нас ждал вкусный обед. Рекомендую всем, кто любит активный отдых и новые впечатления.',
      rating: 4,
      date: '22 июня 2023',
      tourName: 'Рафтинг и зиплайн в джунглях',
      tourType: 'Активный отдых'
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Функция для отображения звезд рейтинга
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section 
      ref={ref}
      className="py-20 bg-gradient-to-b from-dark-light to-dark text-white relative overflow-hidden"
    >
      {/* Декоративные элементы */}
      <div className="absolute inset-0 bg-[url('/images/pattern-dark.svg')] bg-repeat opacity-10 z-0"></div>
      
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      
      {/* Декоративные элементы */}
      <div 
        className="absolute top-40 left-10 text-primary"
        style={{
          opacity: sectionInView ? 0.04 : 0,
          transform: sectionInView ? 'translateX(0) rotate(0deg)' : 'translateX(-100px) rotate(-20deg)',
          transition: 'transform 1s ease-out, opacity 1s ease-out',
          animation: sectionInView ? 'float-y 8s infinite alternate ease-in-out' : 'none'
        }}
      >
        <Quote className="w-48 h-48" />
      </div>
      
      <div 
        className="absolute bottom-40 right-10 text-primary transform rotate-180"
        style={{
          opacity: sectionInView ? 0.04 : 0,
          transform: sectionInView ? 'translateX(0) rotate(180deg)' : 'translateX(100px) rotate(200deg)',
          transition: 'transform 1s ease-out, opacity 1s ease-out',
          animation: sectionInView ? 'float-y 10s infinite alternate-reverse ease-in-out' : 'none'
        }}
      >
        <Quote className="w-48 h-48" />
      </div>
      
      {/* Светящиеся сферы */}
      <div 
        className="absolute top-1/4 left-1/3 w-6 h-6 bg-primary/80 rounded-full"
        style={{
          opacity: sectionInView ? 0.5 : 0,
          filter: 'blur(1px)',
          transition: 'opacity 1.5s ease-out',
          animation: sectionInView ? 'float 20s infinite alternate ease-in-out' : 'none'
        }}
      ></div>
      
      <div 
        className="absolute bottom-1/3 right-1/4 w-8 h-8 bg-primary/80 rounded-full"
        style={{
          opacity: sectionInView ? 0.5 : 0,
          filter: 'blur(2px)',
          transition: 'opacity 1.5s ease-out',
          animation: sectionInView ? 'float 15s infinite alternate-reverse ease-in-out' : 'none'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Что говорят наши <span className="text-primary">клиенты</span>
          </h2>
          <p className="text-white/80">
            Отзывы тех, кто уже побывал на наших экскурсиях и открыл для себя красоту Пхукета
          </p>
        </div>
        
        <div 
          className="max-w-6xl mx-auto relative"
          style={{ 
            perspective: '1000px',
          }}
        >
          {/* Отзывы с 3D эффектом */}
          <div 
            className={`bg-white/5 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10 transition-all duration-700 ${
              sectionInView ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-10'
            }`}
            style={{ 
              transformStyle: 'preserve-3d',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            {/* Навигационные кнопки */}
            <button 
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm z-10 transition-colors"
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm z-10 transition-colors"
              aria-label="Следующий отзыв"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
              {/* Аватар и информация */}
              <div className="flex flex-col items-center md:items-start">
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 border-2 border-primary/30">
                  <Image
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].author}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <h3 className="text-xl font-bold mb-1">{testimonials[currentIndex].author}</h3>
                
                <div className="flex items-center mb-2">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
                
                <p className="text-sm text-white/60 mb-2">{testimonials[currentIndex].date}</p>
                
                <div className="bg-primary/20 text-primary text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                  {testimonials[currentIndex].tourType}
                </div>
              </div>
              
              {/* Содержание отзыва */}
              <div className="flex-1">
                <div className="text-lg font-medium mb-4 text-primary">
                  {testimonials[currentIndex].tourName}
                </div>
                
                <div 
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-4 relative overflow-hidden"
                  style={{ 
                    transformStyle: "preserve-3d",
                    transform: `translateZ(10px)`
                  }}
                >
                  <p className="text-white/80 text-lg italic leading-relaxed">
                    "{testimonials[currentIndex].text}"
                  </p>
                  
                  {/* Декоративный элемент текста */}
                  <div 
                    className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-primary/5"
                    style={{ filter: 'blur(30px)' }}
                  />
                </div>
              </div>
            </div>
            
            {/* Декоративная рамка */}
            <div 
              className="absolute inset-0 rounded-2xl border border-primary/30 z-[-1]"
              style={{ 
                transformStyle: "preserve-3d",
                transform: `translateZ(5px)` 
              }}
            ></div>
            
            {/* Индикаторы */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-primary scale-125' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Перейти к отзыву ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS для анимаций */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0); }
          100% { transform: translate(15px, -15px); }
        }
        
        @keyframes float-y {
          0% { transform: translateY(0); }
          100% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection; 