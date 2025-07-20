'use client';

import React, { useEffect, useState } from 'react';
import MainLayout from '@/app/components/layout/MainLayout';
import { TransportHero } from '@/app/components/transport/TransportHero';
import AllVehiclesSection from '@/app/components/transport/AllVehiclesSection';
import UniversalFaqSection from '@/app/components/ui/UniversalFaqSection';

export default function TransportPage() {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setHasAnimated(true);
  }, []);

  return (
    <MainLayout>
      <main className="min-h-screen">
        <TransportHero hasAnimated={hasAnimated} />
        <AllVehiclesSection hasAnimated={hasAnimated} />
        <UniversalFaqSection 
          title="Часто задаваемые вопросы об аренде транспорта"
          subtitle="АРЕНДА ТРАНСПОРТА"
          description="Ответы на популярные вопросы об аренде автомобилей, скутеров и мотоциклов на Пхукете"
          faqItems={[
            {
              id: 1,
              question: 'Какие документы нужны для аренды?',
              answer: 'Для аренды автомобиля необходимы международные водительские права или тайские права, паспорт и залог. Для скутера до 125 куб.см достаточно обычных водительских прав.',
              isPopular: true,
              color: 'primary'
            },
            {
              id: 2,
              question: 'Включена ли страховка в стоимость аренды?',
              answer: 'Базовая страховка включена в стоимость аренды. Дополнительную комплексную страховку можно оформить за отдельную плату для максимальной защиты.',
              color: 'primary'
            },
            {
              id: 3,
              question: 'Можно ли арендовать транспорт без залога?',
              answer: 'Залог является обязательным для всех видов транспорта. Размер залога зависит от типа транспорта и может вноситься наличными или блокироваться на карте.',
              color: 'primary'
            },
            {
              id: 4,
              question: 'Есть ли ограничения по возрасту?',
              answer: 'Минимальный возраст для аренды автомобиля - 21 год, для скутера - 18 лет. Стаж вождения должен быть не менее 1 года.',
              color: 'primary'
            },
            {
              id: 5,
              question: 'Что делать в случае поломки или аварии?',
              answer: 'Немедленно свяжитесь с нами по указанному номеру. Мы предоставим техническую помощь или заменим транспорт. В случае аварии также обратитесь в туристическую полицию.',
              isNew: true,
              color: 'primary'
            },
            {
              id: 6,
              question: 'Можно ли продлить аренду?',
              answer: 'Да, аренду можно продлить. Свяжитесь с нами заранее для подтверждения доступности транспорта и оплаты дополнительного периода.',
              color: 'primary'
            }
          ]}
          ctaText="Арендовать транспорт"
          ctaLink="/transport"
        />
      </main>
    </MainLayout>
  );
} 