'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  image: string;
  isLeft?: boolean;
  inView: boolean;
}

const TimelineItem = ({ year, title, description, image, isLeft = true, inView }: TimelineItemProps) => {
  const itemAlignment = isLeft ? 'md:flex-row' : 'md:flex-row-reverse';
  const textAlign = isLeft ? 'md:text-left' : 'md:text-right';
  const contentOrder = isLeft ? 'md:order-1' : 'md:order-2';
  const imageOrder = isLeft ? 'md:order-2' : 'md:order-1';

  const animationClass = inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';

  return (
    <div className={`flex flex-col ${itemAlignment} items-center mb-16 transition-all duration-700 ease-out ${animationClass}`}>
      {/* Content Block */}
      <div className={`w-full md:w-5/12 px-4 ${contentOrder} ${textAlign}`}>
        <span className="inline-block text-sm font-semibold bg-[#e5916e] text-white px-3 py-1 rounded-md mb-3 shadow-sm">
          {year}
        </span>
        <h3 className="text-2xl font-bold text-[#1e3c3c] mb-3">{title}</h3>
        <p className="text-gray-700 text-base leading-relaxed">{description}</p>
      </div>
      
      {/* Timeline Separator */}
      <div className="w-full md:w-2/12 flex justify-center items-center my-4 md:my-0">
        <div className="w-10 h-10 rounded-full bg-[#1e3c3c] border-4 border-white shadow-md flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
      </div>
      
      {/* Image Block */}
      <div className={`w-full md:w-5/12 px-4 ${imageOrder}`}>
        <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-105">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const HistorySection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Анимация сработает один раз
    threshold: 0.2,   // Сработает, когда 20% секции видно
  });

  const timelineData = [
    {
      year: '2023',
      title: 'Основание компании',
      description: 'Мы создали "Пхукет", чтобы сделать аренду и отдых на острове максимально простыми и прозрачными для каждого.',
      image: '/images/about/history.jpg',
    },
    {
      year: '2024',
      title: 'Запуск сервиса и первые клиенты',
      description: 'В первый же год работы мы помогли десяткам клиентов найти идеальное жилье, транспорт и экскурсии на Пхукете.',
      image: '/images/about/history-launch.jpg',
    },
    {
      year: '2025',
      title: 'Планы на будущее',
      description: 'Мы активно развиваем сервис, расширяем каталог и внедряем новые технологии для вашего удобства.',
      image: '/images/about/history-future.jpg',
    }
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#f5f5f5]">
      <div className="container mx-auto px-4">
        <div 
          className={`text-center mb-12 md:mb-20 transition-all duration-700 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3c3c] mb-4">Наша история успеха</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            От небольшой команды энтузиастов до ведущего сервиса аренды и организации отдыха на Пхукете.
          </p>
        </div>

        <div className="relative">
          {/* Вертикальная линия таймлайна (для десктопов) */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 rounded-full"></div>
          
          {timelineData.map((item, index) => (
            <TimelineItem 
              key={item.year}
              year={item.year}
              title={item.title}
              description={item.description}
              image={item.image}
              isLeft={index % 2 === 0}
              inView={inView} // Передаем состояние видимости в каждый элемент
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistorySection; 