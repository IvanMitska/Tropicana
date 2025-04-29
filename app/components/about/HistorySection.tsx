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
  const contentClass = isLeft 
    ? 'md:mr-auto md:ml-0 md:text-right' 
    : 'md:ml-auto md:mr-0 md:text-left';
  
  const animationClass = isLeft
    ? inView ? 'md:translate-x-0 opacity-100' : 'md:-translate-x-10 opacity-0'
    : inView ? 'md:translate-x-0 opacity-100' : 'md:translate-x-10 opacity-0';

  return (
    <div className={`flex flex-col md:flex-row items-center mb-12 transition-all duration-1000 ${animationClass}`}>
      <div className={`w-full md:w-5/12 ${contentClass}`}>
        <span className="inline-block text-sm font-semibold bg-blue-600 text-white px-3 py-1 rounded-full mb-2">
          {year}
        </span>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
      </div>
      
      <div className="w-full md:w-2/12 flex justify-center items-center">
        <div className="h-full w-1 bg-blue-600 hidden md:block" />
        <div className="w-8 h-8 rounded-full bg-blue-600 border-4 border-white shadow" />
      </div>
      
      <div className="w-full md:w-5/12 mt-4 md:mt-0">
        <div className="relative h-60 w-full rounded-lg overflow-hidden shadow-md">
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
    triggerOnce: false,
    threshold: 0.1,
  });

  const timelineData = [
    {
      year: '2016',
      title: 'Основание компании',
      description: 'Наша компания начала свой путь с небольшого офиса и команды из 5 человек, предлагая аренду квартир в центре города.',
      image: '/images/about/history-2016.jpg',
    },
    {
      year: '2018',
      title: 'Расширение на рынке недвижимости',
      description: 'Мы вышли на новый уровень, добавив в каталог элитную недвижимость и загородные дома для отдыха.',
      image: '/images/about/history-2018.jpg',
    },
    {
      year: '2020',
      title: 'Запуск направления транспорта',
      description: 'В условиях пандемии мы адаптировались к новым реалиям и запустили сервис аренды автомобилей для путешествий по стране.',
      image: '/images/about/history-2020.jpg',
    },
    {
      year: '2022',
      title: 'Туристическое направление',
      description: 'Мы начали предлагать уникальные туры и экскурсии, создавая комплексные решения для путешественников.',
      image: '/images/about/history-2022.jpg',
    },
    {
      year: '2024',
      title: 'Международная экспансия',
      description: 'Сегодня мы выходим на международный рынок, предлагая сервис аренды по всему миру.',
      image: '/images/about/history-2024.jpg',
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">История нашего развития</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            С момента основания мы прошли долгий путь, постоянно развиваясь и совершенствуя наши услуги для клиентов.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200" />
          
          {timelineData.map((item, index) => (
            <TimelineItem 
              key={item.year}
              year={item.year}
              title={item.title}
              description={item.description}
              image={item.image}
              isLeft={index % 2 === 0}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistorySection; 