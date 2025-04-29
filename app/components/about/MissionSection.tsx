'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { HomeIcon, HeartIcon, TrophyIcon, BuildingOfficeIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';

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
      className={`bg-white p-6 rounded-lg shadow-md transition-all duration-1000 delay-${delay} ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="bg-blue-100 text-blue-600 p-3 w-12 h-12 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const MissionSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [quoteRef, quoteInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const values = [
    {
      icon: <HomeIcon className="w-6 h-6" />,
      title: 'Комфорт',
      description: 'Мы стремимся сделать каждый арендованный объект максимально комфортным для клиентов.',
      delay: 100
    },
    {
      icon: <HeartIcon className="w-6 h-6" />,
      title: 'Забота',
      description: 'Постоянная поддержка и внимание к деталям для лучшего обслуживания наших клиентов.',
      delay: 200
    },
    {
      icon: <TrophyIcon className="w-6 h-6" />,
      title: 'Качество',
      description: 'Мы тщательно отбираем все объекты, чтобы обеспечить высокое качество услуг.',
      delay: 300
    },
    {
      icon: <BuildingOfficeIcon className="w-6 h-6" />,
      title: 'Надежность',
      description: 'Гарантированные условия и полное соответствие описанию для каждого объекта.',
      delay: 400
    },
    {
      icon: <UserGroupIcon className="w-6 h-6" />,
      title: 'Клиентоцентричность',
      description: 'Интересы клиента всегда на первом месте, мы строим длительные отношения.',
      delay: 500
    },
    {
      icon: <SparklesIcon className="w-6 h-6" />,
      title: 'Инновации',
      description: 'Внедрение новых технологий для улучшения качества обслуживания.',
      delay: 600
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="mb-16">
          <div className={`text-center transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Наша миссия и ценности</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              Мы стремимся сделать путешествия и отдых доступными для каждого, предоставляя качественные услуги аренды.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center mb-16">
            <div className={`w-full md:w-1/2 mb-8 md:mb-0 transition-all duration-1000 delay-200 ${
              inView ? 'opacity-100 md:translate-x-0' : 'opacity-0 md:-translate-x-10'
            }`}>
              <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/about/mission.jpg"
                  alt="Наша миссия"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className={`w-full md:w-1/2 md:pl-12 transition-all duration-1000 delay-400 ${
              inView ? 'opacity-100 md:translate-x-0' : 'opacity-0 md:translate-x-10'
            }`}>
              <h3 className="text-2xl font-bold mb-4">Наше видение</h3>
              <p className="text-gray-600 mb-6">
                Мы стремимся стать лидером в области аренды, создавая экосистему сервисов, 
                которая покрывает все потребности клиентов в путешествиях и повседневной жизни. 
                Наша цель — сделать процесс аренды максимально простым, удобным и безопасным.
              </p>
              <p className="text-gray-600">
                Мы верим, что современные технологии и внимательный подход к деталям могут 
                преобразить индустрию аренды, сделав ее более прозрачной и дружелюбной к пользователю.
              </p>
            </div>
          </div>

          <div 
            ref={quoteRef}
            className={`bg-blue-600 text-white p-8 md:p-12 rounded-lg mb-16 transition-all duration-1000 ${
              quoteInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="max-w-4xl mx-auto text-center">
              <svg className="w-10 h-10 text-blue-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
              <blockquote className="text-xl md:text-2xl font-medium italic mb-4">
                Наша главная задача — помогать людям находить идеальное место для жизни, 
                отдыха и новых впечатлений, делая мир более открытым и доступным для каждого.
              </blockquote>
              <div className="flex items-center justify-center">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/images/about/ceo.jpg"
                    alt="CEO"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-bold">Иван Петров</p>
                  <p className="text-blue-300 text-sm">CEO и основатель</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </section>
  );
};

export default MissionSection; 