'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { HomeIcon, HeartIcon, ShieldCheckIcon, BuildingOffice2Icon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  inView: boolean;
}

const ValueCard = ({ icon, title, description, delay, inView }: ValueCardProps) => {
  return (
    <div 
      className={`bg-white p-6 rounded-lg shadow-lg transition-all duration-500 ease-out hover:shadow-xl transform hover:-translate-y-1 delay-${delay} ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="bg-[#e5916e]/10 text-[#e5916e] p-3 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-[#1e3c3c] mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const MissionSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const [quoteRef, quoteInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const values = [
    {
      icon: <HomeIcon className="w-6 h-6" />,
      title: 'Комфорт и Уют',
      description: 'Создаем домашнюю атмосферу, где бы вы ни находились, предлагая проверенные и комфортабельные варианты жилья.',
      delay: 100
    },
    {
      icon: <HeartIcon className="w-6 h-6" />,
      title: 'Забота о Клиенте',
      description: 'Ваше спокойствие – наш приоритет. Предоставляем круглосуточную поддержку и персональный подход к каждому.',
      delay: 200
    },
    {
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      title: 'Надежность и Безопасность',
      description: 'Гарантируем прозрачность сделок и безопасность ваших данных. Только проверенные партнеры и объекты.',
      delay: 300
    },
    {
      icon: <BuildingOffice2Icon className="w-6 h-6" />,
      title: 'Широкий Выбор',
      description: 'От уютных студий до роскошных вилл и уникальных экскурсий – у нас есть все для вашего идеального отдыха.',
      delay: 400
    },
    {
      icon: <UserGroupIcon className="w-6 h-6" />,
      title: 'Местное Сообщество',
      description: 'Мы поддерживаем местных предпринимателей и помогаем туристам глубже познакомиться с культурой Пхукета.',
      delay: 500
    },
    {
      icon: <SparklesIcon className="w-6 h-6" />,
      title: 'Инновации и Удобство',
      description: 'Постоянно совершенствуем нашу платформу, чтобы поиск и бронирование были максимально простыми и быстрыми.',
      delay: 600
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div ref={ref} className="container mx-auto px-4">
        <div className={`text-center mb-12 md:mb-20 transition-all duration-700 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3c3c] mb-4">Наша миссия и ценности</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Мы стремимся сделать ваш отдых на Пхукете незабываемым, предоставляя качественные услуги и заботясь о каждой детали вашего путешествия.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16 md:mb-24">
          <div className={`w-full lg:w-1/2 transition-all duration-700 ease-out delay-200 ${
              inView ? 'opacity-100 lg:translate-x-0' : 'opacity-0 lg:-translate-x-10'
            }`}>
            <div className="relative h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/about/mission.jpg"
                alt="Наша миссия - команда Пхукет"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className={`w-full lg:w-1/2 transition-all duration-700 ease-out delay-300 ${
              inView ? 'opacity-100 lg:translate-x-0' : 'opacity-0 lg:translate-x-10'
            }`}>
            <h3 className="text-2xl md:text-3xl font-bold text-[#1e3c3c] mb-6">Наше видение будущего</h3>
            <p className="text-gray-700 text-base leading-relaxed mb-4">
              Мы видим "Пхукет" как вашего надежного партнера и проводника в мир удивительных открытий на острове. Наша цель — не просто предлагать услуги, а создавать целостные впечатления, которые останутся с вами надолго.
            </p>
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              Мы стремимся к тому, чтобы каждый путешественник чувствовал себя уверенно и комфортно, зная, что все организационные моменты мы берем на себя. От идеального жилья до захватывающих приключений – мы здесь, чтобы ваш отдых превзошел все ожидания.
            </p>
            <a 
              href="/contacts"
              className="inline-block bg-[#e5916e] text-white py-3 px-6 rounded-md font-semibold hover:bg-[#c97b5e] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Связаться с нами
            </a>
          </div>
        </div>

        <div 
          ref={quoteRef}
          className={`bg-gradient-to-br from-[#1e3c3c] to-[#0A2A2A] text-white p-8 md:p-12 rounded-lg shadow-2xl mb-16 md:mb-24 transition-all duration-1000 ease-out ${
            quoteInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="max-w-3xl mx-auto text-center">
            <svg className="w-12 h-12 text-[#e5916e]/70 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>
            <blockquote className="text-xl md:text-2xl font-medium italic mb-6 text-gray-200">
              "Мы верим, что каждое путешествие – это возможность открыть что-то новое в себе и в мире. Наша миссия – сделать эти открытия максимально яркими и беззаботными."
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="relative h-14 w-14 rounded-full overflow-hidden mr-4 border-2 border-[#e5916e]/50 shadow-md">
                <Image
                  src="/images/about/ceo.jpg" // Убедитесь, что изображение существует
                  alt="Иван Осколков, CEO Пхукет"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-bold text-lg">Иван Осколков</p>
                <p className="text-[#e5916e] text-sm">CEO и Основатель "Пхукет"</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ValueCard 
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
              delay={value.delay}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection; 