'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Award {
  id: number;
  name: string;
  year: string;
  description: string;
  logo: string;
  images: string[];
}

const AchievementsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedAward, setSelectedAward] = useState<Award | null>(null);

  const awards: Award[] = [
    {
      id: 1,
      name: 'Лучший сервис аренды',
      year: '2023',
      description: 'Награда за создание лучшего пользовательского опыта в сфере аренды недвижимости и транспорта. Отмечен высокий уровень удовлетворенности клиентов.',
      logo: '/images/about/award-1.png',
      images: [
        '/images/about/award-1-ceremony-1.jpg',
        '/images/about/award-1-ceremony-2.jpg',
        '/images/about/award-1-ceremony-3.jpg',
      ]
    },
    {
      id: 2,
      name: 'Инновации года',
      year: '2022',
      description: 'Награда за внедрение инновационных технологий в сфере аренды. Отмечено создание уникальной платформы для бронирования и управления арендой.',
      logo: '/images/about/award-2.png',
      images: [
        '/images/about/award-2-ceremony-1.jpg',
        '/images/about/award-2-ceremony-2.jpg',
        '/images/about/award-2-ceremony-3.jpg',
      ]
    },
    {
      id: 3,
      name: 'Лучший стартап',
      year: '2020',
      description: 'Признание компании как самого перспективного стартапа в сфере аренды. Отмечен быстрый рост и инновационный подход к решению проблем клиентов.',
      logo: '/images/about/award-3.png',
      images: [
        '/images/about/award-3-ceremony-1.jpg',
        '/images/about/award-3-ceremony-2.jpg',
        '/images/about/award-3-ceremony-3.jpg',
      ]
    },
    {
      id: 4,
      name: 'Выбор пользователей',
      year: '2021',
      description: 'Награда, присуждаемая на основе отзывов и голосования пользователей. Отмечен высокий уровень доверия и удовлетворенности клиентов.',
      logo: '/images/about/award-4.png',
      images: [
        '/images/about/award-4-ceremony-1.jpg',
        '/images/about/award-4-ceremony-2.jpg',
        '/images/about/award-4-ceremony-3.jpg',
      ]
    },
    {
      id: 5,
      name: 'Сервис года',
      year: '2019',
      description: 'Признание компании за высокое качество обслуживания клиентов и инновационный подход к предоставлению услуг аренды.',
      logo: '/images/about/award-5.png',
      images: [
        '/images/about/award-5-ceremony-1.jpg',
        '/images/about/award-5-ceremony-2.jpg',
        '/images/about/award-5-ceremony-3.jpg',
      ]
    }
  ];

  const openModal = (award: Award) => {
    setSelectedAward(award);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedAward(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Наши достижения и награды</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            За годы работы мы получили признание в индустрии и множество наград, подтверждающих качество наших услуг.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <div 
              key={award.id}
              className={`bg-white rounded-lg overflow-hidden shadow-md transition-all duration-500 hover:shadow-xl cursor-pointer ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => openModal(award)}
            >
              <div className="p-6 flex flex-col items-center">
                <div className="relative h-32 w-32 mb-6">
                  <Image
                    src={award.logo}
                    alt={award.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-center">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-2">
                    {award.year}
                  </span>
                  <h3 className="text-xl font-bold mb-3">{award.name}</h3>
                  <p className="text-gray-600">{award.description}</p>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">Нажмите для просмотра галереи</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Модальное окно для галереи */}
        {selectedAward && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold">{selectedAward.name}</h3>
                    <p className="text-blue-600">{selectedAward.year}</p>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <p className="text-gray-600 mb-6">{selectedAward.description}</p>
                
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={30}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  className="mb-6"
                >
                  {selectedAward.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative h-96 w-full">
                        <Image
                          src={image}
                          alt={`${selectedAward.name} - фото ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AchievementsSection; 