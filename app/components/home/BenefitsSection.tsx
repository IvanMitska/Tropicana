'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { ArrowRight, Shield, Clock, CheckCircle, Users, CreditCard, Sparkles } from 'lucide-react';

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  color: string;
  onHover: (id: number | null) => void;
  isHovered: boolean;
}

const BenefitCard = ({ icon, title, description, index, color, onHover, isHovered }: BenefitProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Динамический цвет для карточек
  const getColorClass = (colorName: string, opacity = 100) => {
    const baseColors: { [key: string]: string } = {
      primary: `rgb(var(--color-primary) / ${opacity}%)`,
      secondary: `rgb(var(--color-primary) / ${opacity}%)`,
      accent: `rgb(var(--color-primary) / ${opacity}%)`
    };
    
    return baseColors[colorName] || baseColors.primary;
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-xl transition-all duration-700 ease-out
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                ${index % 3 === 0 ? 'delay-[100ms]' : index % 3 === 1 ? 'delay-[300ms]' : 'delay-[500ms]'}`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden h-full group">
        {/* Анимированный фоновый эффект */}
        <div 
          className="absolute inset-0 transition-all duration-500 ease-in-out"
          style={{
            background: `radial-gradient(circle at 20% 20%, ${getColorClass(color, isHovered ? 20 : 10)}, transparent 70%)`,
            opacity: isHovered ? 1 : 0.5,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        ></div>
        
        {/* Плавающие частицы внутри карточки */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, idx) => (
              <div 
                key={`particle-${index}-${idx}`}
                className="absolute rounded-full"
                style={{
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                  background: getColorClass(color, 40 + idx * 10),
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `floatParticle ${Math.random() * 3 + 2}s infinite alternate ease-in-out`,
                  animationDelay: `${idx * 0.2}s`,
                }}
              ></div>
            ))}
          </div>
        )}
        
        {/* Верхняя декоративная полоса с анимацией */}
        <div 
          className="absolute top-0 left-0 h-1 transition-all duration-500 group-hover:h-2"
          style={{ 
            background: `linear-gradient(to right, ${getColorClass(color, 100)}, ${getColorClass(color, 70)})`,
            width: isHovered ? '100%' : '30%',
            left: isHovered ? '0%' : '35%',
          }}
        ></div>
        
        <div className="p-8 relative z-10 flex flex-col h-full">
          <div className="flex items-start mb-6">
            <div 
              className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-500 mr-4 overflow-hidden"
              style={{ 
                background: isHovered ? getColorClass(color, 15) : 'rgba(243, 244, 246, 0.8)',
                color: isHovered ? getColorClass(color, 100) : '#6B7280',
                transform: isHovered ? 'rotate(5deg) scale(1.1)' : 'rotate(0) scale(1)'
              }}
            >
              {/* Анимированное свечение для иконки */}
              <div 
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${getColorClass(color, 30)} 0%, transparent 70%)`,
                  opacity: isHovered ? 1 : 0,
                  animation: isHovered ? 'pulse 2s infinite ease-in-out' : 'none'
                }}
              ></div>
              <div 
                className="transition-all duration-300"
                style={{
                  transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                }}
              >
        {icon}
              </div>
            </div>
            <h3 
              className="text-xl font-bold transition-all duration-300"
              style={{ 
                color: isHovered ? getColorClass(color, 100) : '#1A1A1A',
                transform: isHovered ? 'translateX(5px)' : 'translateX(0)'
              }}
            >
              {title}
            </h3>
          </div>
          <p className="text-gray-600 flex-grow transition-all duration-300"
             style={{
               transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
             }}
          >{description}</p>
          
          {/* Анимированный декоративный элемент в углу */}
          <div 
            className="absolute bottom-3 right-3 opacity-10 text-gray-300 transition-all duration-700"
            style={{
              opacity: isHovered ? 0.2 : 0.1,
              transform: isHovered ? 'rotate(45deg) scale(1.2)' : 'rotate(0) scale(1)',
            }}
          >
            <div className="w-16 h-16 rounded-full border-4 border-dashed"
              style={{ 
                borderColor: getColorClass(color, 40),
                animation: isHovered ? 'spin-slow 10s linear infinite' : 'none'
              }}
            ></div>
          </div>
          
          {/* Эффект блеска при наведении */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
              transition: 'transform 0.8s ease-in-out, opacity 0.3s ease-in-out',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const BenefitsSection = () => {
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);
  const [animateBackground, setAnimateBackground] = useState(false);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  // Эффект для анимации фоновых элементов при появлении секции
  useEffect(() => {
    if (inView) {
      setAnimateBackground(true);
    }
  }, [inView]);

  const benefits = [
    {
      id: 1,
      title: 'Поддержка 24/7',
      description: 'Наши русскоговорящие менеджеры доступны круглосуточно и помогут с любым вопросом',
      icon: <Clock className="w-6 h-6" />,
      color: 'primary'
    },
    {
      id: 2,
      title: 'Гарантия лучшей цены',
      description: 'Мы предлагаем самые выгодные цены на аренду и экскурсии. Нашли дешевле? Мы вернем разницу!',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'primary'
    },
    {
      id: 3,
      title: 'Проверенные партнеры',
      description: 'Мы тщательно отбираем партнеров и проверяем все предложения, чтобы вы получили лучший сервис',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'primary'
    },
    {
      id: 4,
      title: 'Местные эксперты',
      description: 'Наши гиды и консультанты - местные жители, которые знают Пхукет как свои пять пальцев',
      icon: <Users className="w-6 h-6" />,
      color: 'primary'
    },
    {
      id: 5,
      title: 'Безопасные платежи',
      description: 'Защищенная система оплаты и прозрачные условия бронирования без скрытых платежей',
      icon: <Shield className="w-6 h-6" />,
      color: 'primary'
    },
    {
      id: 6,
      title: 'Индивидуальный подход',
      description: 'Мы учтем все ваши пожелания и подберем варианты, идеально подходящие именно вам',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'primary'
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-light">
      {/* Анимированные декоративные элементы */}
      <div 
        className={`absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl transition-all duration-[2000ms] ease-in-out ${
          animateBackground ? '-translate-y-1/2 translate-x-1/2 opacity-100' : 'translate-y-0 translate-x-0 opacity-0'
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
          animateBackground ? 'translate-y-1/2 -translate-x-1/2 opacity-100' : 'translate-y-0 translate-x-0 opacity-0'
        }`}
        style={{
          animationName: 'floatingBubble',
          animationDuration: '12s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'ease-in-out',
        }}
      ></div>
      
      {/* Анимированные плавающие круги */}
      <div 
        className={`absolute top-40 right-1/4 w-24 h-24 border border-primary/10 rounded-full transition-all duration-[1500ms] ${
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
        className={`absolute bottom-60 left-1/3 w-16 h-16 border border-primary/10 rounded-full transition-all duration-[1500ms] ${
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
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ease-out
                    ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="inline-block text-primary font-semibold mb-2 animate-pulse">НАШИ ПРЕИМУЩЕСТВА</span>
          <h2 className="text-3xl md:text-5xl font-bold text-dark mb-6 relative overflow-hidden">
            <span className={`inline-block transition-all duration-700 delay-150 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Почему клиенты 
            </span>
            <span className={`text-primary inline-block transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              &nbsp;выбирают нас
            </span>
            <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full transition-all duration-700 delay-500 ${inView ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}></span>
          </h2>
          <p className={`text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Более 5000 туристов уже воспользовались нашими услугами за последний год
          </p>
          <div className={`flex items-center justify-center gap-2 mt-4 transition-all duration-700 delay-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <Sparkles className="text-primary w-5 h-5" style={{
              animation: 'spin-slow 6s linear infinite'
            }} />
            <span className="text-gray-500 text-sm">Проверенное качество</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={benefit.id} 
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              index={index}
              color={benefit.color}
              onHover={setHoveredBenefit}
              isHovered={hoveredBenefit === index}
            />
          ))}
        </div>
        
        <div className={`mt-16 text-center transition-all duration-700 ease-out
                    ${inView ? 'opacity-100 translate-y-0 delay-700' : 'opacity-0 translate-y-10'}`}>
          <Link 
                            href="tel:+66994892917" 
            className="group inline-flex items-center bg-primary hover:bg-primary/90 text-white hover:text-white font-medium py-4 px-8 rounded-md shadow-lg transition-all hover:shadow-primary/20 hover:shadow-xl relative overflow-hidden"
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
            
                            <span className="relative z-10">Связаться с нами</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-all duration-300 relative z-10" />
          </Link>
        </div>
        
        {/* Анимированные декоративные элементы */}
        <div 
          className={`absolute top-1/4 right-0 w-32 h-32 opacity-5 pointer-events-none transition-all duration-1000 ${
            animateBackground ? 'opacity-5 rotate-0' : 'opacity-0 rotate-45'
          }`}
          style={{
            animation: animateBackground ? 'float-rotate 15s infinite linear' : 'none'
          }}
        >
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 0L120 80H200L135 130L155 200L100 155L45 200L65 130L0 80H80L100 0Z" fill="currentColor" className="text-primary" />
          </svg>
          </div>
        <div 
          className={`absolute bottom-1/4 left-0 w-32 h-32 opacity-5 pointer-events-none transition-all duration-1000 ${
            animateBackground ? 'opacity-5 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
          style={{
            animation: animateBackground ? 'float-circle 12s infinite ease-in-out' : 'none'
          }}
        >
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="10" className="text-primary" />
            <circle cx="100" cy="100" r="40" fill="currentColor" className="text-primary" />
          </svg>
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
        
        @keyframes float-rotate {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, 10px) rotate(90deg); }
          50% { transform: translate(0, 20px) rotate(180deg); }
          75% { transform: translate(-10px, 10px) rotate(270deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        @keyframes float-circle {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, 10px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
      `}</style>
    </section>
  );
};

export default BenefitsSection; 