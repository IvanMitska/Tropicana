'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { Search, Calendar, CreditCard, Home } from 'lucide-react';

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const Step = ({ number, title, description, icon, delay }: StepProps) => {
  const stepRef = useRef<HTMLDivElement>(null);

  // Анимация при прокрутке
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => {
      if (stepRef.current) {
        observer.unobserve(stepRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={stepRef}
      className={
        'flex flex-col items-center text-center space-y-4 opacity-0 transition-all duration-700'
      }
    >
      <div className="bg-primary text-white rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center font-bold text-lg">
        {number}
      </div>
      <div>
        <div className="text-primary mb-2 flex justify-center">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: 'Выберите категорию',
      description: 'Определитесь, что вам нужно: жилье, транспорт или экскурсия',
      icon: <Search className="h-6 w-6" />,
      delay: 100,
    },
    {
      number: 2,
      title: 'Найдите подходящий вариант',
      description: 'Используйте фильтры для поиска идеального предложения',
      icon: <Home className="h-6 w-6" />,
      delay: 300,
    },
    {
      number: 3,
      title: 'Выберите даты',
      description: 'Укажите даты аренды или проведения экскурсии',
      icon: <Calendar className="h-6 w-6" />,
      delay: 500,
    },
    {
      number: 4,
      title: 'Забронируйте и оплатите',
      description: 'Заполните необходимые данные и выберите способ оплаты',
      icon: <CreditCard className="h-6 w-6" />,
      delay: 700,
    },
  ];

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Как это работает</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Аренда с нами — это просто. Всего несколько шагов, и вы получаете именно то, что нужно.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-12 gap-x-8 mb-12 justify-items-center">
          {steps.map((step) => (
            <Step key={step.number} {...step} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="animate-pulse">
            Найти и забронировать
          </Button>
          <p className="mt-4 text-gray-600 text-sm">
            Более 10,000 клиентов уже воспользовались нашим сервисом
          </p>
        </div>
      </div>

      {/* Декоративные элементы */}
      <div className="absolute left-10 top-20 opacity-10">
        <div className="relative w-64 h-64">
          <Image
            src="/images/map-bg.png"
            alt=""
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
      <div className="absolute right-10 bottom-20 opacity-10">
        <div className="relative w-64 h-64">
          <Image
            src="/images/compass-bg.png"
            alt=""
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    </section>
  );
} 