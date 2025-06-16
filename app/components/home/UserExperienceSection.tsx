'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { 
  Home, 
  MapPin, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  Star,
  CheckCircle2,
  ArrowRight,
  Zap,
  HeartHandshake,
  Shield,
  Clock,
  Sparkles
} from 'lucide-react';

export default function UserExperienceSection() {
  const [animateBackground, setAnimateBackground] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const { ref: stepsRef, inView: stepsInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  // Эффект для анимации фоновых элементов при появлении секции
  useEffect(() => {
    if (inView) {
      setAnimateBackground(true);
    }
  }, [inView]);

  const experienceCards = [
    {
      id: 1,
      title: 'Удобный поиск',
      description: 'Благодаря интуитивно понятному интерфейсу и продвинутым фильтрам, вы быстро найдете именно то, что ищете',
      icon: <Home className="w-6 h-6" />,
      color: 'primary',
      delay: 100
    },
    {
      id: 2,
      title: 'Точная локация',
      description: 'Все объекты имеют точную геолокацию и подробное описание района и инфраструктуры',
      icon: <MapPin className="w-6 h-6" />,
      color: 'primary',
      delay: 200
    },
    {
      id: 3,
      title: 'Мгновенное бронирование',
      description: 'Бронируйте онлайн без ожидания подтверждения наличия и долгой переписки',
      icon: <Calendar className="w-6 h-6" />,
      color: 'primary',
      delay: 300
    },
    {
      id: 4,
      title: 'Безопасная оплата',
      description: 'Оплачивайте удобным для вас способом с полной защитой от мошенничества',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'primary',
      delay: 400
    },
    {
      id: 5,
      title: 'Поддержка 24/7',
      description: 'Наша команда поддержки всегда готова помочь вам с любыми вопросами в любое время суток',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'primary',
      delay: 500
    },
    {
      id: 6,
      title: 'Проверенные отзывы',
      description: 'Читайте честные отзывы от реальных клиентов, чтобы сделать правильный выбор',
      icon: <Star className="w-6 h-6" />,
      color: 'primary',
      delay: 600
    },
  ];

  // Шаги бронирования
  const bookingSteps = [
    {
      id: 1,
      title: 'Выберите объект',
      description: 'Найдите идеальное жилье или транспорт с помощью наших фильтров',
      icon: <Home className="w-5 h-5" />,
      color: 'primary',
      image: '/images/booking-step-1.jpg'
    },
    {
      id: 2,
      title: 'Укажите даты',
      description: 'Выберите даты аренды и количество гостей',
      icon: <Calendar className="w-5 h-5" />,
      color: 'primary',
      image: '/images/booking-step-2.jpg'
    },
    {
      id: 3,
      title: 'Подтвердите заказ',
      description: 'Проверьте детали и оплатите бронирование',
      icon: <CreditCard className="w-5 h-5" />,
      color: 'primary',
      image: '/images/booking-step-3.jpg'
    },
    {
      id: 4,
      title: 'Наслаждайтесь отдыхом',
      description: 'Получите подтверждение и наслаждайтесь вашим пребыванием',
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: 'primary',
      image: '/images/booking-step-4.jpg'
    }
  ];

  // Преимущества
  const benefits = [
    {
      id: 1,
      title: 'Быстрые ответы',
      description: 'Наши менеджеры отвечают на запросы в течение 15 минут',
      icon: <Zap />
    },
    {
      id: 2,
      title: 'Гарантия соответствия',
      description: 'Все объекты проверены нашими специалистами',
      icon: <Shield />
    },
    {
      id: 3,
      title: 'Персональный подход',
      description: 'Индивидуальный подбор объектов под ваши требования',
      icon: <HeartHandshake />
    },
    {
      id: 4,
      title: 'Круглосуточная поддержка',
      description: 'Мы на связи 24/7 для решения любых вопросов',
      icon: <Clock />
    }
  ];

  // Получение цвета для карточки
  const getColor = (colorName: string, opacity = 10) => {
    switch (colorName) {
      case 'primary':
        return `bg-primary/${opacity} border-primary/20 text-primary`;
      case 'secondary':
        return `bg-primary/${opacity} border-primary/20 text-primary`;
      case 'accent':
        return `bg-primary/${opacity} border-primary/20 text-primary`;
      default:
        return `bg-gray-100 border-gray-200 text-gray-700`;
    }
  };
  
  // Динамический цвет для элементов
  const getColorClass = (colorName: string, opacity = 100) => {
    return `rgb(var(--color-primary) / ${opacity}%)`;
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Анимированные декоративные элементы фона */}
      <div 
        className={`absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl transition-all duration-[2000ms] ease-in-out ${
          animateBackground ? '-translate-y-1/3 translate-x-1/3 opacity-100' : 'translate-y-0 translate-x-0 opacity-0'
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
        className={`absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl transition-all duration-[2000ms] ease-in-out ${
          animateBackground ? 'translate-y-1/3 -translate-x-1/3 opacity-100' : 'translate-y-0 translate-x-0 opacity-0'
        }`}
        style={{
          animationName: 'floatingBubble',
          animationDuration: '12s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'ease-in-out',
        }}
      ></div>
      
      {/* Анимированные плавающие элементы */}
      <div 
        className={`absolute top-40 left-1/4 w-12 h-12 border border-primary/10 rounded-full transition-all duration-[1500ms] ${
          animateBackground ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{
          animationName: 'floating',
          animationDuration: '10s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'ease-in-out',
        }}
      ></div>
      <div 
        className={`absolute bottom-40 right-1/4 w-20 h-20 border border-primary/10 rounded-full transition-all duration-[1500ms] ${
          animateBackground ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{
          animationName: 'floating',
          animationDuration: '8s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'ease-in-out',
          animationDelay: '0.5s',
        }}
      ></div>
      <div 
        className={`absolute top-1/3 right-1/3 w-6 h-6 bg-primary/20 rounded-full transition-all duration-[1500ms] ${
          animateBackground ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{
          animationName: 'pulse',
          animationDuration: '5s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'ease-in-out',
          animationDelay: '1s',
        }}
      ></div>
      
      {/* Плавающие частицы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, idx) => (
          <div 
            key={`particle-${idx}`}
            className="absolute bg-primary rounded-full opacity-20"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationName: 'floatParticle',
              animationDuration: `${Math.random() * 15 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
              animationDirection: idx % 2 === 0 ? 'alternate' : 'alternate-reverse',
            }}
          ></div>
        ))}
      </div>
      
      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block text-primary font-semibold tracking-wide uppercase mb-2 animate-pulse">Удобный сервис для вас</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-dark relative overflow-hidden">
            <span className={`inline-block transition-all duration-700 delay-150 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Создаем 
            </span>
            <span className={`text-primary inline-block transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              &nbsp;идеальный опыт
            </span>
            <span className={`inline-block transition-all duration-700 delay-450 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              &nbsp;для наших клиентов
            </span>
            <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full transition-all duration-700 delay-500 ${inView ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}></span>
          </h2>
          <p className={`text-gray-600 text-lg max-w-2xl mx-auto transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Мы упростили процесс аренды на Пхукете, чтобы сделать ваш отдых максимально комфортным и беззаботным. Вот что отличает наш сервис:
          </p>
          <div className={`flex items-center justify-center gap-2 mt-4 transition-all duration-700 delay-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <Sparkles className="text-primary w-5 h-5" style={{
              animation: 'spin-slow 6s linear infinite'
            }} />
            <span className="text-gray-500 text-sm">Простой и понятный сервис</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {experienceCards.map((card) => (
            <div 
              key={card.id}
              className="rounded-xl p-6 border bg-white shadow-sm transition-all duration-500 relative overflow-hidden group"
              style={{ 
                transitionDelay: `${card.delay}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                boxShadow: hoveredCard === card.id ? `0 10px 30px rgba(var(--color-primary), 0.15)` : '',
                transform: hoveredCard === card.id ? 'translateY(-5px)' : 'translateY(0)'
              }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Анимированная рамка при наведении */}
              <div 
                className="absolute inset-0 rounded-xl transition-all duration-700 ease-out pointer-events-none"
                style={{
                  borderWidth: hoveredCard === card.id ? '2px' : '0px',
                  borderStyle: 'solid',
                  borderColor: getColorClass(card.color, 50),
                  opacity: hoveredCard === card.id ? 1 : 0,
                }}
              ></div>
              
              <div className={`relative flex items-center justify-center w-14 h-14 rounded-xl mb-6 transition-all duration-500 ${getColor(card.color, 15)}`}
                style={{
                  transform: hoveredCard === card.id ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0)',
                }}
              >
                {/* Анимированное свечение для иконки */}
                <div 
                  className="absolute inset-0 transition-all duration-500 rounded-xl"
                  style={{
                    background: `radial-gradient(circle at center, ${getColorClass(card.color, 30)} 0%, transparent 70%)`,
                    opacity: hoveredCard === card.id ? 1 : 0,
                    animation: hoveredCard === card.id ? 'pulse 2s infinite ease-in-out' : 'none'
                  }}
                ></div>
                
                {/* Иконка */}
                <div 
                  className="relative z-10 transition-all duration-300"
                  style={{
                    transform: hoveredCard === card.id ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {card.icon}
                </div>
                
                {/* Декоративный элемент под иконкой */}
                <div 
                  className={`absolute w-10 h-10 rounded-lg opacity-30 transition-all duration-500 ${getColor(card.color, 30)}`}
                  style={{ 
                    transform: hoveredCard === card.id ? 'rotate(45deg) scale(0.8)' : 'rotate(10deg) scale(1)' 
                  }}
                ></div>
              </div>
              
              <h3 
                className="text-xl font-bold text-dark mb-3 transition-all duration-300"
                style={{
                  color: hoveredCard === card.id ? 'rgb(var(--color-primary))' : '',
                  transform: hoveredCard === card.id ? 'translateX(4px)' : 'translateX(0)',
                }}
              >
                {card.title}
              </h3>
              <p 
                className="text-gray-600 transition-all duration-300"
                style={{
                  transform: hoveredCard === card.id ? 'translateY(-2px)' : 'translateY(0)'
                }}
              >
                {card.description}
              </p>
              
              {/* Эффект блеска при наведении */}
              <div 
                className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 rounded-xl transition-all duration-700"
                style={{
                  opacity: hoveredCard === card.id ? 1 : 0,
                  transform: hoveredCard === card.id ? 'translateX(100%)' : 'translateX(-100%)',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                }}
              ></div>
              
              {/* Декоративные элементы на карточке */}
              <div 
                className={`absolute -top-2 -right-2 w-16 h-16 pointer-events-none transition-all duration-700 opacity-0 ${
                  hoveredCard === card.id ? 'opacity-10' : 'group-hover:opacity-5'
                }`}
                style={{
                  clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                  background: getColorClass(card.color, 100),
                  transform: hoveredCard === card.id ? 'scale(1.2)' : 'scale(1)'
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* Процесс бронирования */}
        <div ref={stepsRef} className="mt-24">
          <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block text-primary font-semibold tracking-wide uppercase mb-2 animate-pulse">Простой процесс</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-dark relative overflow-hidden">
              <span className={`inline-block transition-all duration-700 delay-150 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Забронировать 
              </span>
              <span className={`text-primary inline-block transition-all duration-700 delay-300 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                &nbsp;всего за 4 шага
              </span>
              <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full transition-all duration-700 delay-500 ${stepsInView ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}></span>
            </h2>
            <p className={`text-gray-600 text-lg max-w-2xl mx-auto transition-all duration-700 delay-400 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              Мы сделали процесс бронирования максимально простым и быстрым
            </p>
          </div>

          <div className="relative">
            {/* Анимированная соединительная линия */}
            <div 
              className={`hidden md:block absolute top-1/2 left-0 z-0 transition-all duration-1000 ease-in-out h-0.5 bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 ${
                stepsInView ? 'right-0 opacity-100' : 'right-full opacity-0'
              }`}
              style={{
                transform: 'translateY(-50%)',
                boxShadow: '0 0 10px rgba(var(--color-primary), 0.3)',
              }}
            ></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {bookingSteps.map((step, index) => (
                <div 
                  key={step.id}
                  className="relative bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-500 group"
                  style={{ 
                    transitionDelay: `${index * 150}ms`,
                    opacity: stepsInView ? 1 : 0,
                    transform: stepsInView ? 'translateY(0)' : 'translateY(30px)',
                    boxShadow: hoveredStep === step.id ? `0 15px 30px rgba(var(--color-primary), 0.15)` : '0 4px 6px rgba(0, 0, 0, 0.05)',
                    transform: hoveredStep === step.id ? 'translateY(-5px)' : 'translateY(0)'
                  }}
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Анимированная рамка при наведении */}
                  <div 
                    className="absolute inset-0 rounded-xl transition-all duration-700 ease-out pointer-events-none"
                    style={{
                      borderWidth: hoveredStep === step.id ? '2px' : '0px',
                      borderStyle: 'solid',
                      borderColor: getColorClass(step.color, 50),
                      opacity: hoveredStep === step.id ? 1 : 0,
                    }}
                  ></div>
                  
                  {/* Верхняя анимированная полоса */}
                  <div 
                    className={`h-1 transition-all duration-500`}
                    style={{ 
                      background: getColorClass(step.color, 100),
                      width: hoveredStep === step.id ? '100%' : '50%',
                      marginLeft: hoveredStep === step.id ? '0%' : '25%',
                    }}
                  ></div>
                  
                  <div className="p-6">
                    {/* Номер шага с анимацией */}
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm mb-4 relative overflow-hidden transition-all duration-500`}
                      style={{ 
                        background: getColorClass(step.color, 100),
                        boxShadow: hoveredStep === step.id ? `0 0 15px ${getColorClass(step.color, 50)}` : 'none',
                        transform: hoveredStep === step.id ? 'scale(1.1)' : 'scale(1)'
                      }}
                    >
                      {/* Эффект свечения для номера */}
                      {hoveredStep === step.id && (
                        <div 
                          className="absolute inset-0 transition-all duration-500"
                          style={{
                            background: `radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 70%)`,
                            animation: 'pulse 2s infinite ease-in-out'
                          }}
                        ></div>
                      )}
                      <span className="relative z-10">{step.id}</span>
                    </div>
                    
                    <h3 
                      className="text-lg font-bold mb-2 transition-all duration-300"
                      style={{
                        color: hoveredStep === step.id ? 'rgb(var(--color-primary))' : 'var(--color-dark)',
                        transform: hoveredStep === step.id ? 'translateX(4px)' : 'translateX(0)',
                      }}
                    >
                      {step.title}
                    </h3>
                    <p 
                      className="text-gray-600 mb-4 transition-all duration-300"
                      style={{
                        transform: hoveredStep === step.id ? 'translateY(-2px)' : 'translateY(0)'
                      }}
                    >
                      {step.description}
                    </p>
                    
                    {/* Иконка с анимацией */}
                    <div 
                      className={`flex items-center gap-2 text-sm transition-all duration-300`}
                      style={{
                        color: hoveredStep === step.id ? 'rgb(var(--color-primary))' : '#6B7280',
                        transform: hoveredStep === step.id ? 'translateX(4px)' : 'translateX(0)',
                      }}
                    >
                      <span 
                        className="transition-all duration-300"
                        style={{
                          transform: hoveredStep === step.id ? 'scale(1.1)' : 'scale(1)',
                        }}
                      >
                      {step.icon}
                      </span>
                      <span className="font-medium">Шаг {step.id}</span>
                    </div>
                  </div>
                  
                  {/* Эффект блеска при наведении */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 transition-all duration-700"
                    style={{
                      opacity: hoveredStep === step.id ? 1 : 0,
                      transform: hoveredStep === step.id ? 'translateX(100%)' : 'translateX(-100%)',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    }}
                  ></div>
                </div>
              ))}
              </div>
        </div>

          {/* CTA кнопка */}
          <div className={`mt-16 text-center transition-all duration-700 ${stepsInView ? 'opacity-100 translate-y-0 delay-[800ms]' : 'opacity-0 translate-y-10'}`}>
            <Link 
              href="/book-now" 
              className="group inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium py-4 px-8 rounded-md shadow-lg transition-all hover:shadow-primary/20 hover:shadow-xl relative overflow-hidden"
            >
              {/* Эффект блеска на кнопке */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  left: '-100%',
                  top: '0',
                  animation: 'shine 2s infinite linear',
                }}
              ></div>
              
              <span className="relative z-10 mr-2 transition-all duration-300 group-hover:translate-x-1">Начать бронирование</span>
              <ArrowRight className="w-5 h-5 relative z-10 transition-all duration-500 group-hover:translate-x-2" />
            </Link>
          </div>
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
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
          100% { transform: scale(1); opacity: 0.5; }
        }
        
        @keyframes floatParticle {
          0% { transform: translate(0, 0); }
          50% { transform: translate(100px, 50px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
} 