'use client';

import React, { useEffect, useRef } from 'react';
import { Clock, Shield, CreditCard, UserCheck, Gift, BadgeCheck } from 'lucide-react';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const BenefitCard = ({ icon, title, description, delay }: BenefitCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Простая анимация при прокрутке
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('translate-y-0', 'opacity-100');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform translate-y-8 opacity-0"
    >
      <div className="bg-primary/10 text-primary p-3 rounded-full inline-block mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const BenefitsSection = () => {
  const benefits = [
    {
      id: 1,
      title: 'Поддержка 24/7',
      description: 'Наши русскоговорящие менеджеры доступны круглосуточно и помогут с любым вопросом',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
          <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Гарантия лучшей цены',
      description: 'Мы предлагаем самые выгодные цены на аренду и экскурсии. Нашли дешевле? Мы вернем разницу!',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
          <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991-.257.193-.574.336-.921.421z" />
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a3.833 3.833 0 001.719-.756c.712-.566 1.112-1.35 1.112-2.178 0-.829-.4-1.612-1.113-2.178-.502-.4-1.102-.647-1.719-.756V6z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Проверенные партнеры',
      description: 'Мы тщательно отбираем партнеров и проверяем все предложения, чтобы вы получили лучший сервис',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
          <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Местные эксперты',
      description: 'Наши гиды и консультанты - местные жители, которые знают Пхукет как свои пять пальцев',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
          <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
          <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
        </svg>
      ),
    },
    {
      id: 5,
      title: 'Безопасные платежи',
      description: 'Защищенная система оплаты и прозрачные условия бронирования без скрытых платежей',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
          <path d="M18.75 8.25h1.875c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875H18.75V8.25z" />
          <path d="M12 8.25h4.875v7.5H12v-7.5z" />
          <path fillRule="evenodd" d="M7.5 6.75C7.5 5.64 8.34 4.5 9.75 4.5h.75v3.75c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75V4.5h.75c1.41 0 2.25 1.14 2.25 2.25v12c0 1.11-.84 2.25-2.25 2.25h-8.5c-1.41 0-2.25-1.14-2.25-2.25v-12z" clipRule="evenodd" />
          <path d="M3.75 6.75h1.875v7.5H3.75v-7.5z" />
        </svg>
      ),
    },
    {
      id: 6,
      title: 'Индивидуальный подход',
      description: 'Мы учтем все ваши пожелания и подберем варианты, идеально подходящие именно вам',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
          <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Почему выбирают нас</h2>
          <p className="text-lg text-secondary-light max-w-3xl mx-auto">
            Более 5000 туристов уже воспользовались нашими услугами за последний год
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div 
              key={benefit.id} 
              className="bg-gradient-to-b from-dark-light to-dark p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-secondary/10 relative overflow-hidden"
            >
              <div className="flex items-start mb-4">
                <div className="bg-primary-light p-3 rounded-lg text-primary mr-4 relative z-10">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-secondary mt-3">{benefit.title}</h3>
              </div>
              <p className="text-secondary-light pl-20">{benefit.description}</p>
              
              {/* Декоративный элемент */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-primary opacity-5"></div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-primary to-primary-light text-white py-3 px-8 rounded-full font-medium text-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            Узнать больше о нас
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection; 