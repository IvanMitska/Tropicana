'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

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
      name: 'Лучший Туристический Сервис Пхукета',
      year: '2023',
      description: 'Признание за выдающийся вклад в развитие туризма на Пхукете и высочайший уровень клиентского сервиса.',
      logo: '/images/about/award-logo-1.png', // Замените на реальные логотипы
      images: [
        '/images/about/award-ceremony-1.jpg', // Замените на реальные фото
        '/images/about/award-ceremony-2.jpg',
        '/images/about/award-ceremony-3.jpg',
      ]
    },
    {
      id: 2,
      name: 'Инновации в Путешествиях',
      year: '2022',
      description: 'Награда за внедрение передовых технологий и инновационных решений, упрощающих планирование и бронирование отдыха.',
      logo: '/images/about/award-logo-2.png',
      images: [
        '/images/about/award-ceremony-4.jpg',
        '/images/about/award-ceremony-5.jpg',
      ]
    },
    {
      id: 3,
      name: 'Выбор Путешественников TripAdvisor',
      year: '2021',
      description: 'Почетная награда, основанная на высоких оценках и положительных отзывах наших клиентов на платформе TripAdvisor.',
      logo: '/images/about/award-logo-3.png',
      images: [
        '/images/about/award-ceremony-6.jpg',
      ]
    },
    {
      id: 4,
      name: 'Лидер Гостеприимства Пхукета',
      year: '2020',
      description: 'Отмечены за исключительное гостеприимство и создание незабываемых впечатлений для гостей острова.',
      logo: '/images/about/award-logo-4.png',
      images: [
        '/images/about/award-ceremony-7.jpg',
        '/images/about/award-ceremony-8.jpg',
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
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`text-center mb-12 md:mb-20 transition-all duration-700 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3c3c] mb-4">Наши Достижения</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Мы гордимся признанием нашей работы и стремимся к новым высотам, чтобы делать ваш отдых еще лучше.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((award, index) => (
            <div 
              key={award.id}
              className={`bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-500 ease-out hover:shadow-2xl transform hover:scale-105 cursor-pointer flex flex-col ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => openModal(award)}
            >
              <div className="p-6 flex flex-col items-center text-center flex-grow">
                <div className="relative h-28 w-28 mb-5">
                  <Image
                    src={award.logo}
                    alt={award.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="inline-block px-3 py-1 bg-[#e5916e]/10 text-[#e5916e] rounded-full text-xs font-semibold mb-3">
                  {award.year}
                </span>
                <h3 className="text-lg font-semibold text-[#1e3c3c] mb-2 leading-tight">{award.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed flex-grow">{award.description}</p>
              </div>
              <div className="bg-gray-50 px-6 py-3 mt-auto border-t border-gray-100">
                <span className="text-xs text-gray-500 group-hover:text-[#e5916e] transition-colors duration-300 flex items-center justify-center">
                  Подробнее
                  <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </span>
              </div>
            </div>
          ))}
        </div>

        {selectedAward && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeModal}>
            <div 
              className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col relative animate-fadeIn" 
              onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие модалки при клике внутри
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-[#1e3c3c]">{selectedAward.name}</h3>
                  <p className="text-[#e5916e] font-semibold">{selectedAward.year}</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 -mr-2 rounded-full hover:bg-gray-100"
                  aria-label="Закрыть модальное окно"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-grow">
                <p className="text-gray-700 text-base mb-6 leading-relaxed">{selectedAward.description}</p>
                
                {selectedAward.images && selectedAward.images.length > 0 ? (
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop={selectedAward.images.length > 1}
                    className="rounded-lg overflow-hidden shadow-md"
                  >
                    {selectedAward.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className="relative h-72 md:h-96 w-full bg-gray-100">
                          <Image
                            src={image}
                            alt={`${selectedAward.name} - фото ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <p className="text-center text-gray-500 italic">Фотографии с церемонии награждения отсутствуют.</p>
                )}
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-200 text-right">
                <button
                  onClick={closeModal}
                  className="bg-[#e5916e] text-white px-5 py-2 rounded-md font-semibold hover:bg-[#c97b5e] transition-colors shadow-sm hover:shadow-md"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AchievementsSection; 