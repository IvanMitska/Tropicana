'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

interface Partner {
  id: number;
  name: string;
  logo: string;
  description: string;
  testimonial?: {
    text: string;
    author: string;
    position: string;
  };
}

const PartnersSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const partners: Partner[] = [
    {
      id: 1,
      name: 'Alpha Hotels',
      logo: '/images/about/partner-1.png',
      description: 'Сеть отелей премиум-класса с представительством в 15 странах мира.',
      testimonial: {
        text: 'Наше сотрудничество с компанией позволило нам увеличить заполняемость отелей и улучшить качество обслуживания гостей. Мы ценим профессионализм команды и инновационный подход к решению задач.',
        author: 'Алексей Иванов',
        position: 'Генеральный директор Alpha Hotels'
      }
    },
    {
      id: 2,
      name: 'Beta Cars',
      logo: '/images/about/partner-2.png',
      description: 'Лидер в области аренды премиальных автомобилей в Европе и Азии.',
      testimonial: {
        text: 'Благодаря партнерству с компанией мы смогли выйти на новый сегмент клиентов и значительно расширить географию нашего присутствия. Надежный и инновационный партнер.',
        author: 'Мария Петрова',
        position: 'Коммерческий директор Beta Cars'
      }
    },
    {
      id: 3,
      name: 'Gamma Tours',
      logo: '/images/about/partner-3.png',
      description: 'Туроператор, специализирующийся на уникальных экскурсионных маршрутах.',
      testimonial: {
        text: 'Совместная работа помогла нам создать уникальное предложение для клиентов и увеличить продажи туров на 30%. Прекрасная техническая интеграция и маркетинговая поддержка.',
        author: 'Дмитрий Сидоров',
        position: 'Основатель Gamma Tours'
      }
    },
    {
      id: 4,
      name: 'Delta Estates',
      logo: '/images/about/partner-4.png',
      description: 'Агентство элитной недвижимости с объектами в самых престижных локациях.',
    },
    {
      id: 5,
      name: 'Epsilon Tech',
      logo: '/images/about/partner-5.png',
      description: 'Инновационная IT-компания, разрабатывающая решения для туристической отрасли.',
    },
    {
      id: 6,
      name: 'Zeta Travel',
      logo: '/images/about/partner-6.png',
      description: 'Международная сеть туристических агентств с представительствами в 20 странах.',
    },
    {
      id: 7,
      name: 'Eta Airlines',
      logo: '/images/about/partner-7.png',
      description: 'Авиакомпания, предлагающая перелеты по всему миру с высоким уровнем сервиса.',
    },
    {
      id: 8,
      name: 'Theta Luxury',
      logo: '/images/about/partner-8.png',
      description: 'Компания, специализирующаяся на аренде яхт и частных самолетов.',
    }
  ];

  const partnersWithTestimonials = partners.filter(partner => partner.testimonial);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Наши партнеры</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Мы гордимся сотрудничеством с ведущими компаниями в индустрии аренды, туризма и гостеприимства.
          </p>
        </div>

        <div className={`mb-20 transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
            className="py-8"
          >
            {partners.map(partner => (
              <SwiperSlide key={partner.id} className="flex items-center justify-center">
                <div className="w-32 h-32 p-4 bg-white rounded-lg shadow-md flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {partners.map((partner, index) => (
            <div 
              key={partner.id}
              className={`bg-white p-6 rounded-lg shadow-md transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-12 mb-4">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain object-left"
                />
              </div>
              <h3 className="text-lg font-bold mb-2">{partner.name}</h3>
              <p className="text-gray-600 text-sm">{partner.description}</p>
            </div>
          ))}
        </div>

        <div 
          ref={testimonialsRef}
          className={`transition-all duration-1000 ${
            testimonialsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Отзывы наших партнеров</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnersWithTestimonials.map((partner, index) => (
              <div 
                key={partner.id}
                className="bg-white p-8 rounded-lg shadow-md relative"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <svg className="w-12 h-12 text-blue-100 absolute top-6 left-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
                <div className="relative z-10">
                  <p className="italic text-gray-600 mb-6">"{partner.testimonial?.text}"</p>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold">{partner.testimonial?.author}</p>
                      <p className="text-sm text-gray-500">{partner.testimonial?.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection; 