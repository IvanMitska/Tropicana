'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon, MessageSquare, Quote } from 'lucide-react';

type Testimonial = {
  id: number;
  name: string;
  location: string;
  avatar: string;
  text: string;
  rating: number;
  service: 'Аренда жилья' | 'Аренда транспорта' | 'Экскурсии';
  date: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Александр К.',
    location: 'Москва',
    avatar: '/avatars/avatar-1.jpg',
    text: 'Отличный сервис! Арендовали виллу на Пхукете через данный сайт, все прошло гладко. Менеджеры всегда на связи, оперативно решают любые вопросы. Рекомендую!',
    rating: 5,
    service: 'Аренда жилья',
    date: '15 апреля 2023'
  },
  {
    id: 2,
    name: 'Екатерина М.',
    location: 'Санкт-Петербург',
    avatar: '/avatars/avatar-2.jpg',
    text: 'Брали в аренду скутер на неделю. Доставили вовремя, состояние отличное. Когда возникла небольшая техническая проблема, быстро привезли замену. Все четко и без обмана.',
    rating: 5,
    service: 'Аренда транспорта',
    date: '3 мая 2023'
  },
  {
    id: 3,
    name: 'Сергей В.',
    location: 'Новосибирск',
    avatar: '/avatars/avatar-3.jpg',
    text: 'Отдыхали семьей на Пхукете, бронировали апартаменты через этот сайт. Жилье полностью соответствовало описанию и фото. Отличное расположение, рядом магазины и пляж.',
    rating: 4,
    service: 'Аренда жилья',
    date: '22 февраля 2023'
  },
  {
    id: 4,
    name: 'Марина Д.',
    location: 'Казань',
    avatar: '/avatars/avatar-4.jpg',
    text: 'Заказывали индивидуальную экскурсию по островам. Гид профессионал своего дела, показал места, о которых не пишут в путеводителях. Впечатления незабываемые!',
    rating: 5,
    service: 'Экскурсии',
    date: '7 марта 2023'
  },
  {
    id: 5,
    name: 'Дмитрий П.',
    location: 'Екатеринбург',
    avatar: '/avatars/avatar-5.jpg',
    text: 'Арендовали автомобиль на 10 дней. Машина была в идеальном состоянии, чистая, с полным баком. Оформление заняло минимум времени. Возврат также прошел быстро и без проблем.',
    rating: 5,
    service: 'Аренда транспорта',
    date: '19 января 2023'
  },
  {
    id: 6,
    name: 'Ольга С.',
    location: 'Краснодар',
    avatar: '/avatars/avatar-6.jpg',
    text: 'Большое спасибо за помощь в подборе жилья! Консультант учел все наши пожелания и подобрал идеальный вариант. Бронирование и заселение прошли без проблем.',
    rating: 5,
    service: 'Аренда жилья',
    date: '12 июня 2023'
  },
];

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [animateBackground, setAnimateBackground] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  // Эффект для анимации фоновых элементов при появлении секции
  useEffect(() => {
    if (inView) {
      setAnimateBackground(true);
    }
  }, [inView]);

  const visibleTestimonials = 3; // Количество отображаемых отзывов
  const totalTestimonials = testimonials.length;
  const maxIndex = totalTestimonials - visibleTestimonials;
  
  // Получаем текущие видимые отзывы
  const getCurrentTestimonials = () => {
    return testimonials.slice(activeIndex, activeIndex + visibleTestimonials);
  };

  const nextSlide = () => {
    setSlideDirection('right');
    setTimeout(() => {
      setActiveIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
      setSlideDirection(null);
    }, 300);
  };

  const prevSlide = () => {
    setSlideDirection('left');
    setTimeout(() => {
      setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      setSlideDirection(null);
    }, 300);
  };

  // Создаем индикаторы слайдов
  const getIndicators = () => {
    const indicators = [];
    for (let i = 0; i <= maxIndex; i++) {
      indicators.push(
        <button
          key={i}
          onClick={() => {
            setSlideDirection(i > activeIndex ? 'right' : 'left');
            setTimeout(() => {
              setActiveIndex(i);
              setSlideDirection(null);
            }, 300);
          }}
          className={`relative h-2 rounded-full transition-all duration-300 mx-1 overflow-hidden ${
            i === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'
          }`}
          aria-label={`Перейти к слайду ${i + 1}`}
        >
          {/* Пульсирующий эффект для активного индикатора */}
          {i === activeIndex && (
            <span 
              className="absolute inset-0 rounded-full" 
              style={{
                background: 'linear-gradient(90deg, rgba(var(--color-primary), 0.5), rgba(var(--color-primary), 1))',
                animation: 'pulse-indicator 2s infinite ease-in-out'
              }}
            ></span>
          )}
        </button>
      );
    }
    return indicators;
  };

  // Автопрокрутка
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex < maxIndex) {
        nextSlide();
      } else {
        setSlideDirection('right');
        setTimeout(() => {
          setActiveIndex(0);
          setSlideDirection(null);
        }, 300);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [activeIndex, maxIndex]);

  // Функция для отрисовки звездочек рейтинга
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <StarIcon
        key={index} 
        className={`w-4 h-4 transition-transform duration-300 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
        style={index < rating ? { animation: `star-pulse 1.5s infinite ease-in-out ${index * 0.2}s` } : {}}
      />
    ));
  };

  // Получаем цвет карточки в зависимости от типа услуги
  const getCardColor = (service: string) => {
    return 'from-primary/10 to-primary/5 border-primary/20';
  };
  
  // Динамический цвет для элементов
  const getColorClass = (serviceName: string, opacity = 100) => {
    return `rgb(var(--color-primary) / ${opacity}%)`;
  };

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Анимированные декоративные элементы фона */}
      <div 
        className={`absolute top-1/4 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl transition-all duration-[2000ms] ease-in-out ${
          animateBackground ? 'opacity-100 translate-x-10' : 'opacity-0 translate-x-20'
        }`}
        style={{
          animationName: 'floatingBubble',
          animationDuration: '15s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'ease-in-out',
          animationDelay: '0.5s',
        }}
      ></div>
      <div 
        className={`absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl transition-all duration-[2000ms] ease-in-out ${
          animateBackground ? 'opacity-100 -translate-x-10' : 'opacity-0 -translate-x-20'
        }`}
        style={{
          animationName: 'floatingBubble',
          animationDuration: '12s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'ease-in-out',
        }}
      ></div>
      
      {/* Градиентная сетка с анимацией */}
      <div 
        aria-hidden="true" 
        className={`absolute inset-0 grid grid-cols-2 -space-x-52 pointer-events-none transition-opacity duration-1000 ${
          animateBackground ? 'opacity-20' : 'opacity-0'
        }`}
      >
        <div 
          className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400"
          style={{
            animation: 'gradient-shift 10s ease-in-out infinite alternate'
          }}
        ></div>
        <div 
          className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-primary"
          style={{
            animation: 'gradient-shift 8s ease-in-out infinite alternate-reverse'
          }}
        ></div>
      </div>
      
      {/* Плавающие частицы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, idx) => (
          <div 
            key={`particle-${idx}`}
            className="absolute bg-primary rounded-full opacity-20"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationName: 'floatParticle',
              animationDuration: `${Math.random() * 20 + 25}s`,
              animationDelay: `${Math.random() * 10}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
              animationDirection: idx % 2 === 0 ? 'alternate' : 'alternate-reverse',
            }}
          ></div>
        ))}
      </div>
      
      {/* Декоративные кавычки */}
      <div 
        className={`absolute top-40 right-10 text-primary/10 transition-all duration-1000 ${
          animateBackground ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{
          animation: 'floating 10s infinite ease-in-out'
        }}
      >
        <Quote size={120} strokeWidth={1} />
      </div>
      <div 
        className={`absolute bottom-40 left-10 text-primary/10 transition-all duration-1000 ${
          animateBackground ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{
          animation: 'floating 8s infinite ease-in-out reverse',
          transform: 'rotate(180deg)'
        }}
      >
        <Quote size={80} strokeWidth={1} />
      </div>

      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-primary font-semibold uppercase tracking-wider animate-pulse">Отзывы наших клиентов</span>
          <h2 className="text-3xl md:text-5xl font-bold text-dark mt-3 mb-6 relative overflow-hidden">
            <span className={`inline-block transition-all duration-700 delay-150 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Что говорят 
            </span>
            <span className={`text-primary inline-block transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              &nbsp;клиенты
            </span>
            <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full transition-all duration-700 delay-500 ${inView ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}></span>
          </h2>
          <p className={`text-gray-600 md:text-lg transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Более 1000+ довольных клиентов поделились своими впечатлениями о нашем сервисе.
            Мы ценим каждый отзыв и постоянно работаем над улучшением качества услуг.
          </p>
          <div className={`flex items-center justify-center gap-2 mt-4 transition-all duration-700 delay-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <MessageSquare className="text-primary w-5 h-5" style={{
              animation: 'pulse 8s ease-in-out infinite'
            }} />
            <span className="text-gray-500 text-sm">Реальные отзывы клиентов</span>
          </div>
        </div>

        <div className="relative mt-16">
          {/* Слайдер карточек отзывов */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500 ${slideDirection === 'left' ? '-translate-x-4 opacity-0' : slideDirection === 'right' ? 'translate-x-4 opacity-0' : 'translate-x-0 opacity-100'}`}>
            {getCurrentTestimonials().map((testimonial, index) => (
            <div 
              key={testimonial.id} 
                className={`relative p-6 rounded-2xl border bg-gradient-to-b transition-all duration-500 ${getCardColor(testimonial.service)} hover:shadow-xl group`}
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(30px)',
                  boxShadow: hoveredCard === testimonial.id ? `0 10px 30px rgba(var(--color-primary), 0.15)` : '',
                  transform: hoveredCard === testimonial.id ? 'translateY(-5px)' : 'translateY(0)'
                }}
                onMouseEnter={() => setHoveredCard(testimonial.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Анимированная рамка при наведении */}
                <div 
                  className="absolute inset-0 rounded-2xl transition-all duration-700 ease-out pointer-events-none"
                  style={{
                    borderWidth: hoveredCard === testimonial.id ? '2px' : '0px',
                    borderStyle: 'solid',
                    borderColor: getColorClass(testimonial.service, 50),
                    opacity: hoveredCard === testimonial.id ? 1 : 0,
                    boxSizing: 'border-box',
                  }}
                ></div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                    hoveredCard === testimonial.id ? 'border-primary scale-110' : 'border-white scale-100'
                  }`}>
                    <Image 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      width={48} 
                      height={48} 
                      className="object-cover" 
                    />
                    {/* Эффект свечения для аватара */}
                    {hoveredCard === testimonial.id && (
                      <div 
                        className="absolute inset-0 transition-all duration-500"
                        style={{
                          background: `radial-gradient(circle at center, rgba(var(--color-primary), 0.3) 0%, transparent 70%)`,
                          animation: 'pulse 2s infinite ease-in-out'
                        }}
                      ></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 
                      className="font-semibold text-gray-900 transition-all duration-300"
                      style={{
                        transform: hoveredCard === testimonial.id ? 'translateX(4px)' : 'translateX(0)',
                        color: hoveredCard === testimonial.id ? 'rgb(var(--color-primary))' : ''
                      }}
                    >
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div 
                      className="text-xs font-medium px-2.5 py-1 rounded-lg transition-all duration-300"
                      style={{
                        backgroundColor: 'rgba(var(--color-primary), 0.1)',
                        color: 'rgb(var(--color-primary))',
                        transform: hoveredCard === testimonial.id ? 'scale(1.05)' : 'scale(1)'
                      }}
                    >
                  {testimonial.service}
                </div>
              </div>
                </div>
                <div className="flex items-center mb-3">
                  {renderStars(testimonial.rating)}
                  <span className="text-sm text-gray-500 ml-2">{testimonial.rating}.0</span>
                </div>
                <p 
                  className="text-gray-600 mb-3 transition-all duration-300 relative"
                  style={{
                    transform: hoveredCard === testimonial.id ? 'translateY(-2px)' : 'translateY(0)'
                  }}
                >
                  {/* Скрытая кавычка, появляющаяся при наведении */}
                  <span 
                    className="absolute -top-1 -left-1 text-primary/10 transition-all duration-500"
                    style={{ 
                      opacity: hoveredCard === testimonial.id ? 0.2 : 0,
                      transform: hoveredCard === testimonial.id ? 'scale(1)' : 'scale(0.5)'
                    }}
                  >
                    <Quote size={20} />
                  </span>
                  {testimonial.text}
                </p>
                <div className="text-sm text-gray-400">{testimonial.date}</div>
                
                {/* Декоративные элементы на карточке */}
                <div className={`absolute -top-2 -left-2 w-4 h-4 rounded-full bg-white transition-all duration-500 ${
                  hoveredCard === testimonial.id ? 'opacity-100 scale-125' : 'opacity-0 scale-100'
                }`}></div>
                <div className={`absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-white transition-all duration-500 ${
                  hoveredCard === testimonial.id ? 'opacity-100 scale-125' : 'opacity-0 scale-100'
                }`}></div>
                
                {/* Эффект блеска при наведении */}
                <div 
                  className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 rounded-2xl transition-all duration-700"
                  style={{
                    opacity: hoveredCard === testimonial.id ? 1 : 0,
                    transform: hoveredCard === testimonial.id ? 'translateX(100%)' : 'translateX(-100%)',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  }}
                ></div>
            </div>
          ))}
        </div>

          {/* Навигационные кнопки */}
          <div className={`flex justify-between absolute top-1/2 left-0 w-full -translate-y-1/2 transition-opacity duration-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <button 
              onClick={prevSlide} 
              disabled={activeIndex === 0}
              className={`relative -left-6 md:-left-12 w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed`}
              style={{
                opacity: activeIndex === 0 ? 0.5 : 1,
                transform: activeIndex === 0 ? 'scale(0.9)' : 'scale(1)'
              }}
            >
              <ChevronLeftIcon className="w-6 h-6 text-primary" />
              {/* Эффект пульсации для активной кнопки */}
              {activeIndex !== 0 && (
                <span 
                  className="absolute inset-0 rounded-full" 
                  style={{
                    boxShadow: '0 0 0 rgba(var(--color-primary), 0.4)',
                    animation: 'pulse-button 2s infinite'
                  }}
                ></span>
              )}
            </button>
            <button 
              onClick={nextSlide} 
              disabled={activeIndex === maxIndex}
              className={`relative -right-6 md:-right-12 w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed`}
              style={{
                opacity: activeIndex === maxIndex ? 0.5 : 1,
                transform: activeIndex === maxIndex ? 'scale(0.9)' : 'scale(1)'
              }}
            >
              <ChevronRightIcon className="w-6 h-6 text-primary" />
              {/* Эффект пульсации для активной кнопки */}
              {activeIndex !== maxIndex && (
                <span 
                  className="absolute inset-0 rounded-full" 
                  style={{
                    boxShadow: '0 0 0 rgba(var(--color-primary), 0.4)',
                    animation: 'pulse-button 2s infinite'
                  }}
                ></span>
              )}
            </button>
          </div>
          
          {/* Индикаторы слайдов с анимацией */}
          <div className={`flex justify-center mt-10 transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            {getIndicators()}
          </div>
          
          {/* Кнопка просмотра всех отзывов */}
          {/* <div className={`mt-10 text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0 delay-[800ms]' : 'opacity-0 translate-y-10'}`}>
            <a 
              href="/testimonials" 
              className="group inline-flex items-center px-8 py-3 bg-white border border-gray-200 rounded-xl text-dark font-medium shadow-sm hover:shadow-md relative overflow-hidden transition-all duration-500 hover:bg-primary hover:text-white hover:border-primary"
            >
              <div 
                className="absolute inset-0 transition-all duration-700 opacity-0 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  left: '-100%',
                  top: '0',
                  animation: 'shine 2s infinite linear',
                }}
              ></div>
              <span className="mr-2 relative z-10 transition-all duration-300 group-hover:translate-x-1">Смотреть все отзывы</span>
              <ChevronRightIcon className="w-5 h-5 transition-all duration-500 relative z-10 group-hover:translate-x-2" />
            </a>
          </div> */}
        </div>
      </div>
      
      {/* CSS-анимации */}
      <style jsx>{`
        @keyframes floating {
          0% { transform: translate(0, 0); }
          50% { transform: translate(0, 15px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes floatingBubble {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10px, 10px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 0.4; }
        }
        
        @keyframes floatParticle {
          0% { transform: translate(0, 0); }
          25% { transform: translate(30px, 20px); }
          50% { transform: translate(60px, 40px); }
          75% { transform: translate(40px, 60px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes star-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        @keyframes pulse-button {
          0% { box-shadow: 0 0 0 0 rgba(var(--color-primary), 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(var(--color-primary), 0); }
          100% { box-shadow: 0 0 0 0 rgba(var(--color-primary), 0); }
        }
        
        @keyframes pulse-indicator {
          0% { opacity: 0.7; }
          50% { opacity: 0.3; }
          100% { opacity: 0.7; }
        }
        
        @keyframes gradient-shift {
          0% { opacity: 0.15; transform: translate(0, 0); }
          50% { opacity: 0.3; transform: translate(5%, 5%); }
          100% { opacity: 0.15; transform: translate(0, 0); }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection; 