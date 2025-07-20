'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import MainLayout from '../components/layout/MainLayout';
import ToursHero from '../components/tours/ToursHero';
import AllToursSection from '../components/tours/AllToursSection';
import UniversalFaqSection from '../components/ui/UniversalFaqSection';

export default function ToursPage() {
  const [hasAnimated, setHasAnimated] = useState(false);

  // Эффект анимации при загрузке страницы
  useEffect(() => {
    setHasAnimated(true);
  }, []);

  return (
    <MainLayout>
      <main className="min-h-screen">
        <ToursHero hasAnimated={hasAnimated} />
        <AllToursSection hasAnimated={hasAnimated} />
        <UniversalFaqSection 
          title="Часто задаваемые вопросы о турах"
          subtitle="ТУРЫ И ЭКСКУРСИИ"
          description="Ответы на популярные вопросы о турах и экскурсиях на Пхукете"
          faqItems={[
            {
              id: 1,
              question: 'Как забронировать тур?',
              answer: 'Выберите интересующий тур, укажите дату и количество участников, заполните контактные данные. Подтвердите бронирование онлайн-оплатой или внесите предоплату.',
              isPopular: true,
              color: 'primary'
            },
            {
              id: 2,
              question: 'Что включено в стоимость тура?',
              answer: 'В стоимость обычно включены: трансфер от отеля и обратно, услуги гида, входные билеты по программе, обед (если указано). Дополнительные расходы оговариваются отдельно.',
              color: 'primary'
            },
            {
              id: 3,
              question: 'Можно ли отменить бронирование тура?',
              answer: 'Отмена возможна не позднее чем за 24 часа до начала тура с возвратом 50% стоимости. При отмене в день тура возврат не производится.',
              color: 'primary'
            },
            {
              id: 4,
              question: 'Есть ли русскоговорящие гиды?',
              answer: 'Да, большинство наших туров проводятся с русскоговорящими гидами. Если русский гид недоступен, предоставляется переводчик.',
              color: 'primary'
            },
            {
              id: 5,
              question: 'Подходят ли туры для детей?',
              answer: 'Многие туры подходят для семей с детьми. Возрастные ограничения указаны в описании каждого тура. Для детей часто действуют скидки.',
              isNew: true,
              color: 'primary'
            },
            {
              id: 6,
              question: 'Что взять с собой в тур?',
              answer: 'Рекомендуем взять: удобную обувь, головной убор, солнцезащитный крем, воду, купальник (для водных экскурсий), фотоаппарат. Подробный список предоставляется при бронировании.',
              color: 'primary'
            }
          ]}
          ctaText="Забронировать тур"
          ctaLink="/tours"
        />
      </main>
    </MainLayout>
  );
} 