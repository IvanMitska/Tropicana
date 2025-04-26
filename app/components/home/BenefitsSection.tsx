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

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Быстрое бронирование',
      description: 'Забронируйте жилье, транспорт или экскурсию всего за несколько минут',
      delay: 100,
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Безопасные сделки',
      description: 'Гарантия безопасности платежей и проверенные арендодатели',
      delay: 200,
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: 'Гибкая оплата',
      description: 'Различные способы оплаты и возможность отмены бронирования',
      delay: 300,
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: 'Проверенные объекты',
      description: 'Все объекты и услуги проходят строгую проверку качества',
      delay: 400,
    },
    {
      icon: <Gift className="h-6 w-6" />,
      title: 'Бонусная программа',
      description: 'Накапливайте баллы за бронирования и получайте скидки',
      delay: 500,
    },
    {
      icon: <BadgeCheck className="h-6 w-6" />,
      title: 'Поддержка 24/7',
      description: 'Наша служба поддержки всегда готова помочь вам в любое время',
      delay: 600,
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Наши преимущества</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Мы создали удобный сервис для аренды недвижимости, транспорта и организации экскурсий.
            Вот почему тысячи клиентов выбирают именно нас:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
} 