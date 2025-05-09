'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

// Пример данных с отзывами
const testimonials = [
  {
    id: 1,
    name: 'Алексей',
    location: 'Москва',
    text: 'Арендовали виллу на неделю через сервис. Отличное соотношение цены и качества! Менеджеры оперативно отвечали на все вопросы и помогли организовать трансфер из аэропорта.',
    rating: 5,
    service: 'Аренда виллы',
    avatar: 'A',
  },
  {
    id: 2,
    name: 'Екатерина',
    location: 'Санкт-Петербург',
    text: 'Брали в аренду скутер на весь отпуск. Доставили прямо к отелю, все было в идеальном состоянии. Очень удобно, что можно оплатить онлайн и не беспокоиться о залоге.',
    rating: 5,
    service: 'Аренда скутера',
    avatar: 'Е',
  },
  {
    id: 3,
    name: 'Дмитрий',
    location: 'Казань',
    text: 'Заказывали экскурсию на острова Пхи-Пхи. Гид говорил по-русски, все было организовано на высшем уровне. Обязательно воспользуемся сервисом еще раз!',
    rating: 5,
    service: 'Экскурсия',
    avatar: 'Д',
  },
  {
    id: 4,
    name: 'Мария',
    location: 'Новосибирск',
    text: 'Отличный сервис! Забронировали апартаменты с видом на море. Фотографии полностью соответствовали реальности. Будем рекомендовать друзьям!',
    rating: 4,
    service: 'Аренда апартаментов',
    avatar: 'М',
  },
  {
    id: 5,
    name: 'Сергей',
    location: 'Екатеринбург',
    text: 'Заказал трансфер из аэропорта. Водитель встретил вовремя с табличкой, помог с багажом. Машина комфортная и чистая. Все на высшем уровне!',
    rating: 5,
    service: 'Трансфер',
    avatar: 'С',
  },
  {
    id: 6,
    name: 'Ольга',
    location: 'Краснодар',
    text: 'Бронировали экскурсию на Большой Будда. Русскоговорящий гид рассказал много интересного. Ответили на все вопросы и помогли с выбором даты. Спасибо!',
    rating: 5,
    service: 'Экскурсия',
    avatar: 'О',
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1));
  };

  // Обработка свайпов на мобильных устройствах
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 70) {
      // свайп влево
      goToNext();
    }

    if (touchStart - touchEnd < -70) {
      // свайп вправо
      goToPrevious();
    }
  };

  // Анимация при прокрутке
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'scale-100');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    return () => {
      if (testimonialsRef.current) {
        observer.unobserve(testimonialsRef.current);
      }
    };
  }, []);

  // Автопрокрутка отзывов
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  // Расчет общего рейтинга
  const averageRating =
    testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0) / testimonials.length;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg 
        key={index} 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill={index < rating ? 'currentColor' : 'none'} 
        stroke={index < rating ? 'none' : 'currentColor'}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Что говорят наши клиенты</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Более 1000 положительных отзывов от клиентов, которые уже воспользовались нашими услугами
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow relative"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark">{testimonial.name}</h3>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
                <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded">
                  {testimonial.service}
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 relative">
                {/* Декоративные кавычки */}
                <span className="absolute -top-2 -left-1 text-4xl text-primary opacity-20">"</span>
                {testimonial.text}
                <span className="absolute -bottom-6 -right-1 text-4xl text-primary opacity-20">"</span>
              </p>
              
              <div className="flex items-center mt-8">
                <div className="flex mr-2">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="text-dark font-medium">{testimonial.rating}.0</span>
              </div>
              
              {/* Декоративные элементы */}
              <div className="absolute top-3 right-3 opacity-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <a 
            href="/reviews" 
            className="inline-flex items-center justify-center bg-primary text-white py-3 px-8 rounded-full font-medium text-lg shadow-md hover:bg-primary-dark transition-colors duration-300"
          >
            Все отзывы
          </a>
        </div>
      </div>
    </section>
  );
} 