'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

// Пример данных с отзывами
const testimonials = [
  {
    id: 1,
    name: 'Алексей Петров',
    avatar: '/images/avatars/user1.jpg',
    role: 'Бизнесмен',
    rating: 5,
    text: 'Отличный сервис! Снял квартиру на время командировки — всё чисто, уютно, соответствует фотографиям. В следующий раз только через вас!',
  },
  {
    id: 2,
    name: 'Елена Смирнова',
    avatar: '/images/avatars/user2.jpg',
    role: 'Фотограф',
    rating: 5,
    text: 'Арендовала автомобиль для фотосессии. Машина была в идеальном состоянии, процесс бронирования занял буквально пару минут. Рекомендую!',
  },
  {
    id: 3,
    name: 'Дмитрий Иванов',
    avatar: '/images/avatars/user3.jpg',
    role: 'Путешественник',
    rating: 4,
    text: 'Забронировал экскурсию по Санкт-Петербургу. Гид был очень знающий, показал нам много интересных мест, которых нет в обычных туристических маршрутах.',
  },
  {
    id: 4,
    name: 'Ольга Кузнецова',
    avatar: '/images/avatars/user4.jpg',
    role: 'Журналист',
    rating: 5,
    text: 'Уже второй раз пользуюсь услугами сервиса. Очень удобно, что всё можно забронировать в одном месте: и жильё, и транспорт, и развлечения.',
  },
  {
    id: 5,
    name: 'Сергей Новиков',
    avatar: '/images/avatars/user5.jpg',
    role: 'ИТ-специалист',
    rating: 4,
    text: 'Удобный интерфейс и быстрое подтверждение бронирования. Единственное, хотелось бы больше вариантов в небольших городах.',
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

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Отзывы наших клиентов</h2>
          <div className="flex items-center justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-6 w-6 ${
                  star <= Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 font-bold">{averageRating.toFixed(1)}</span>
            <span className="ml-1 text-gray-600">из 5</span>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Более 5000 довольных клиентов уже воспользовались нашим сервисом. Вот что они говорят:
          </p>
        </div>

        <div
          ref={testimonialsRef}
          className="max-w-4xl mx-auto opacity-0 scale-95 transform transition-all duration-700"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative bg-gray-50 rounded-lg p-8 shadow-md">
            {/* Кнопки навигации */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Следующий отзыв"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>

            {/* Карусель отзывов */}
            <div className="min-h-[280px] flex items-center justify-center">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-opacity duration-500 ${
                    index === activeIndex ? 'opacity-100' : 'opacity-0 absolute'
                  }`}
                  style={{ display: index === activeIndex ? 'block' : 'none' }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 relative w-20 h-20 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <h3 className="text-xl font-bold">{testimonial.name}</h3>
                    <p className="text-gray-500 mb-4">{testimonial.role}</p>
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 italic">"{testimonial.text}"</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Индикаторы */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === activeIndex ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  aria-label={`Перейти к отзыву ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Button variant="outline">Оставить отзыв</Button>
        </div>
      </div>
    </section>
  );
} 