'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import MainLayout from '../components/layout/MainLayout';
import RealEstateHero from '../components/real-estate/RealEstateHero';
import FeaturedProperties from '../components/real-estate/FeaturedProperties';
import PropertySearchSection from '../components/real-estate/PropertySearchSection';
import PopularLocations from '../components/real-estate/PopularLocations';
import PropertyTypeSection from '../components/real-estate/PropertyTypeSection';
import TestimonialsSection from '../components/real-estate/TestimonialsSection';
import UniversalFaqSection from '../components/ui/UniversalFaqSection';

export default function RealEstatePage() {
  const [hasAnimated, setHasAnimated] = useState(false);

  // Эффект анимации при загрузке страницы
  useEffect(() => {
    setHasAnimated(true);
  }, []);

  return (
    <MainLayout>
      <main className="min-h-screen">
        <RealEstateHero hasAnimated={hasAnimated} />
        <PropertySearchSection />
        <FeaturedProperties />
        <PropertyTypeSection />
        <PopularLocations />
        <TestimonialsSection />
        <UniversalFaqSection 
          title="Часто задаваемые вопросы о недвижимости"
          subtitle="НЕДВИЖИМОСТЬ ПХУКЕТА"
          description="Ответы на популярные вопросы об аренде и покупке недвижимости на Пхукете"
          faqItems={[
            {
              id: 1,
              question: 'Как арендовать жилье на длительный срок?',
              answer: 'Для аренды на длительный срок (от 3 месяцев) требуется заключение договора аренды, внесение залога (обычно 1-2 месячные платы) и предоплата за первый месяц. Мы поможем вам оформить все документы.',
              isPopular: true,
              color: 'primary'
            },
            {
              id: 2,
              question: 'Можно ли купить недвижимость иностранцу?',
              answer: 'Иностранцы могут владеть квартирами в кондоминиумах (до 49% от общей площади здания). Для покупки дома с землей используются различные легальные схемы через компании или долгосрочную аренду земли.',
              color: 'primary'
            },
            {
              id: 3,
              question: 'Какие документы нужны для аренды?',
              answer: 'Для аренды потребуется копия паспорта, контактная информация в Таиланде. Для долгосрочной аренды может потребоваться справка о доходах или поручительство.',
              color: 'primary'
            },
            {
              id: 4,
              question: 'Есть ли дополнительные расходы при аренде?',
              answer: 'Помимо ежемесячной платы за аренду обычно оплачиваются: электричество, вода, интернет, кабельное ТВ. В некоторых кондоминиумах есть management fee (обслуживание общих зон).',
              color: 'primary'
            },
            {
              id: 5,
              question: 'Как происходит показ объектов?',
              answer: 'Мы организуем индивидуальные показы в удобное для вас время. Можем провести виртуальный тур онлайн или встретиться лично для осмотра выбранных объектов.',
              isNew: true,
              color: 'primary'
            },
            {
              id: 6,
              question: 'Предоставляете ли вы услуги управления недвижимостью?',
              answer: 'Да, мы предлагаем полный комплекс услуг по управлению недвижимостью: поиск арендаторов, ведение документооборота, контроль состояния объекта, решение текущих вопросов.',
              color: 'primary'
            }
          ]}
          ctaText="Получить консультацию"
          ctaLink="/contacts"
        />
      </main>
    </MainLayout>
  );
} 