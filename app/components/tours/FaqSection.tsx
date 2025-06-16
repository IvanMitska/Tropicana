'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, ChevronRight, MapPin, Calendar, CreditCard, ShieldCheck, Clipboard, Clock } from 'lucide-react';

interface FaqSectionProps {
  hasAnimated?: boolean;
}

const FaqSection: React.FC<FaqSectionProps> = ({ hasAnimated = true }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const { ref: faqRef, inView: faqInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const faqItems = [
    {
      id: 1,
      question: 'Как забронировать экскурсию?',
      answer: 'Бронирование экскурсии происходит через наш сайт или по телефону. Выберите интересующую экскурсию, дату и количество участников, затем оформите заказ.\n\nДля подтверждения бронирования необходимо внести предоплату в размере 30% от стоимости экскурсии. Остаток суммы оплачивается перед началом экскурсии.',
      icon: <Calendar />,
      color: 'blue',
    },
    {
      id: 2,
      question: 'Как происходит оплата экскурсий?',
      answer: 'Мы предлагаем несколько способов оплаты:\n\n1. Онлайн-оплата картой на сайте (Visa, MasterCard)\n2. Банковский перевод\n3. Наличные при встрече с гидом\n\nПредоплата в размере 30% вносится при бронировании для гарантии вашего места.',
      icon: <CreditCard />,
      color: 'green',
    },
    {
      id: 3,
      question: 'Что включено в стоимость экскурсии?',
      answer: 'В стоимость большинства наших экскурсий включено:\n\n• Трансфер от/до вашего отеля\n• Услуги русскоговорящего гида\n• Входные билеты в достопримечательности по программе\n• Страховка\n• Питание (зависит от конкретной экскурсии)\n• Снаряжение (для активных экскурсий)\n\nПодробная информация о включенных услугах указана в описании каждой экскурсии.',
      icon: <Clipboard />,
      color: 'amber',
    },
    {
      id: 4,
      question: 'Можно ли отменить или перенести экскурсию?',
      answer: 'Да, вы можете изменить дату или отменить экскурсию, но условия зависят от сроков:\n\n• При отмене за 48 часов и более – возврат предоплаты 100%\n• При отмене за 24-48 часов – возврат предоплаты 50%\n• При отмене менее чем за 24 часа – предоплата не возвращается\n\nВ случае плохих погодных условий мы предлагаем перенос экскурсии на другую дату без штрафов.',
      icon: <Clock />,
      color: 'red',
    },
    {
      id: 5,
      question: 'Что взять с собой на экскурсию?',
      answer: 'Рекомендуемый набор вещей зависит от типа экскурсии:\n\n• Документы и копии (паспорт, страховка)\n• Деньги (для дополнительных расходов)\n• Солнцезащитные средства (крем, очки, головной убор)\n• Удобную одежду и обувь\n• Купальные принадлежности (для морских экскурсий)\n• Воду\n• Камеру или телефон для фото\n\nДополнительные рекомендации вы получите при бронировании конкретной экскурсии.',
      icon: <ShieldCheck />,
      color: 'orange',
    },
    {
      id: 6,
      question: 'Откуда начинаются экскурсии?',
      answer: 'Для большинства экскурсий мы предлагаем трансфер с вашего места проживания (отель, вилла, апартаменты) в пределах Пхукета.\n\nНаш водитель заберет вас в указанное время и доставит в точку начала экскурсии. После завершения экскурсии вас также доставят обратно к месту проживания.\n\nВремя трансфера зависит от расположения вашего отеля и указывается при подтверждении бронирования.',
      icon: <MapPin />,
      color: 'purple',
    },
  ];
  
  // Функция для получения цвета в зависимости от указанного цвета и прозрачности
  const getColorClass = (color: string, opacity = 100) => {
    const colorMap = {
      blue: `rgba(59, 130, 246, ${opacity/100})`,
      green: `rgba(16, 185, 129, ${opacity/100})`,
      amber: `rgba(245, 158, 11, ${opacity/100})`,
      red: `rgba(239, 68, 68, ${opacity/100})`,
      orange: `rgba(249, 115, 22, ${opacity/100})`,
      purple: `rgba(139, 92, 246, ${opacity/100})`,
    };
    
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section 
      className="py-20 bg-gradient-to-b from-light to-white relative overflow-hidden"
    >
      {/* Фоновые элементы */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Волнистый фон */}
        <div className="absolute w-full h-full bg-[url('/images/pattern-light.svg')] bg-repeat opacity-5"></div>
        
        {/* Градиентные круги */}
        <div 
          className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full"
          style={{
            opacity: faqInView && hasAnimated ? 0.1 : 0,
            transform: faqInView && hasAnimated ? 'scale(1)' : 'scale(0.5)',
            background: 'radial-gradient(circle, rgba(var(--color-primary), 0.3) 0%, rgba(var(--color-primary), 0) 70%)',
            filter: 'blur(50px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
          }}
        />
        
        {/* Сетка точек */}
        <div className="absolute inset-0 opacity-5" style={{ 
          backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.3) 1px, transparent 1px)', 
          backgroundSize: '30px 30px',
          transform: 'perspective(1000px) rotateX(70deg)',
          transformOrigin: 'center top',
          overflow: 'hidden'
        }} />
        
        {/* Анимированные частицы */}
        {hasAnimated && faqInView && Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              backgroundColor: `rgba(var(--color-primary), ${Math.random() * 0.3 + 0.1})`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-particle ${Math.random() * 10 + 10}s infinite linear`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      <div 
        className="container mx-auto px-4 relative z-10"
        style={{ perspective: '1500px' }} // Для 3D эффектов
      >
        <div 
          ref={headerRef}
          className="text-center max-w-3xl mx-auto mb-16"
          style={{
            opacity: headerInView && hasAnimated ? 1 : 0,
            transform: headerInView && hasAnimated ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <h2 
            className="text-3xl md:text-4xl font-bold text-dark mb-4 relative inline-block"
            style={{
              opacity: headerInView && hasAnimated ? 1 : 0,
              transform: headerInView && hasAnimated ? 'scale(1)' : 'scale(0.9)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}
          >
            Часто задаваемые <span className="text-primary">вопросы</span>
            <span 
              className="absolute -top-1 -right-6 text-primary"
              style={{
                animation: headerInView && hasAnimated ? 'pulse 2s infinite' : 'none',
              }}
            >
              <span className="absolute w-3 h-3 bg-primary/30 rounded-full animate-ping" />
              <span className="absolute w-3 h-3 bg-primary rounded-full" />
            </span>
          </h2>
          
          <p 
            className="text-gray-600 text-lg"
            style={{
              opacity: headerInView && hasAnimated ? 1 : 0,
              transition: 'opacity 0.5s ease 0.4s',
            }}
          >
            Ответы на самые популярные вопросы об экскурсиях на Пхукете
          </p>
        </div>
        
        <div 
          ref={faqRef}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div 
                key={faq.id}
                className="group"
                style={{
                  opacity: faqInView && hasAnimated ? 1 : 0,
                  transform: faqInView && hasAnimated ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
                }}
              >
                {/* Заголовок вопроса */}
                <div 
                  className={`flex items-center justify-between p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    openIndex === index 
                      ? 'bg-dark text-white shadow-lg' 
                      : 'bg-white text-dark hover:bg-gray-50 shadow-md'
                  }`}
                  onClick={() => handleToggle(index)}
                  style={{
                    boxShadow: openIndex === index 
                      ? `0 10px 30px ${getColorClass(faq.color, 20)}` 
                      : '',
                    transform: openIndex === index ? 'translateY(-5px)' : 'translateY(0)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div className="flex items-center">
                    <div 
                      className={`mr-4 p-2 rounded-full ${
                        openIndex === index ? 'bg-white/20' : `text-${faq.color}-500 bg-${faq.color}-50`
                      }`}
                      style={{
                        color: openIndex === index ? 'white' : getColorClass(faq.color),
                        backgroundColor: openIndex === index ? 'rgba(255,255,255,0.2)' : getColorClass(faq.color, 10),
                      }}
                    >
                      {faq.icon}
                    </div>
                    <h3 className="font-semibold text-lg">{faq.question}</h3>
                  </div>
                  
                  {openIndex === index ? (
                    <ChevronDown className="w-5 h-5 transition-transform" />
                  ) : (
                    <ChevronRight className="w-5 h-5 transition-transform" />
                  )}
                </div>
                
                {/* Содержимое ответа */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 mt-1' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 pt-4 bg-white rounded-xl shadow-md border-t border-gray-100">
                    {/* Разбиваем текст на абзацы */}
                    {faq.answer.split('\n\n').map((paragraph, i) => (
                      <p 
                        key={i} 
                        className={`text-gray-600 leading-relaxed ${i > 0 ? 'mt-4' : ''}`}
                        style={{
                          opacity: openIndex === index ? 1 : 0,
                          transform: openIndex === index ? 'translateY(0)' : 'translateY(10px)',
                          transition: `opacity 0.3s ease ${0.1 + i * 0.1}s, transform 0.3s ease ${0.1 + i * 0.1}s`,
                        }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Стили для анимаций */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          25% { transform: translateY(-20px) translateX(10px) rotate(90deg); }
          50% { transform: translateY(0) translateX(20px) rotate(180deg); }
          75% { transform: translateY(20px) translateX(10px) rotate(270deg); }
          100% { transform: translateY(0) translateX(0) rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default FaqSection; 