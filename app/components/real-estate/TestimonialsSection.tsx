'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const testimonials = [
    {
      id: 1,
      name: 'Алексей Смирнов',
      role: 'Арендатор виллы, Патонг',
      stars: 5,
      comment: 'Отличный сервис! Арендовали виллу на месяц, все соответствовало описанию. Менеджер всегда был на связи и быстро решал все вопросы. Обязательно будем обращаться снова.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 2,
      name: 'Елена Петрова',
      role: 'Семейный отдых, Ката',
      stars: 5,
      comment: 'Прекрасный выбор жилья по доступным ценам. Забронировали апартаменты рядом с пляжем, все было чисто и комфортно. Очень удобно, что можно было оплатить онлайн и получить быстрое подтверждение.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 3,
      name: 'Дмитрий Иванов',
      role: 'Долгосрочная аренда, Камала',
      stars: 4,
      comment: 'Уже второй раз пользуюсь услугами этой платформы. Особенно ценю прозрачность условий и отсутствие скрытых платежей. Рекомендую для тех, кто ищет жилье на длительный срок.',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
    {
      id: 4,
      name: 'Ольга Кузнецова',
      role: 'Аренда апартаментов, Равай',
      stars: 5,
      comment: 'Спасибо за помощь в поиске идеальных апартаментов! Сервис превзошел все мои ожидания. Фотографии полностью соответствовали реальности, а расположение было даже лучше, чем я ожидала.',
      avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
    },
  ];

  // Автоматическое переключение отзывов
  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [inView, testimonials.length]);

  // Переход к следующему отзыву
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % testimonials.length);
  };

  // Переход к предыдущему отзыву
  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Эффект прокрутки при смене слайда
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${activeSlide * 100}%)`;
    }
  }, [activeSlide]);

  return (
    <section 
      ref={ref}
      className="py-20 bg-gradient-to-br from-primary/5 to-light relative overflow-hidden"
    >
      {/* Декоративные элементы */}
      <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] bg-repeat opacity-5 z-0"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Что говорят <span className="text-primary">наши клиенты</span>
          </h2>
          <p className="text-gray-600">
            Отзывы реальных арендаторов о нашем сервисе и качестве объектов
          </p>
        </div>
        
        <div className={`relative max-w-5xl mx-auto transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Большие кавычки в фоне */}
          <div className="absolute -top-10 -left-10 opacity-5">
            <Quote className="w-32 h-32 text-primary" />
          </div>
          
          {/* Слайдер с отзывами */}
          <div className="overflow-hidden relative">
            <div 
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ width: `${testimonials.length * 100}%` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full px-4"
                  style={{ width: `${100 / testimonials.length}%` }}
                >
                  <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 relative">
                    {/* Маленькие кавычки */}
                    <div className="absolute top-6 right-8 text-primary opacity-20">
                      <Quote className="w-10 h-10" />
                    </div>
                    
                    {/* Рейтинг */}
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-5 h-5 ${i < testimonial.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    
                    {/* Текст отзыва */}
                    <blockquote className="text-lg md:text-xl text-gray-700 mb-8">
                      "{testimonial.comment}"
                    </blockquote>
                    
                    {/* Информация о клиенте */}
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Кнопки управления слайдером */}
          <div className="flex justify-center mt-10 gap-4">
            <button 
              onClick={prevSlide}
              className="bg-white text-primary hover:bg-primary hover:text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeSlide === index 
                      ? 'bg-primary scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Перейти к отзыву ${index + 1}`}
                ></button>
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className="bg-white text-primary hover:bg-primary hover:text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 