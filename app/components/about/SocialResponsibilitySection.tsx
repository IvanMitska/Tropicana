'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Initiative {
  id: number;
  title: string;
  category: 'charity' | 'environment' | 'education';
  description: string;
  impact: string;
  image: string;
  gallery?: string[];
}

const SocialResponsibilitySection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const initiatives: Initiative[] = [
    {
      id: 1,
      title: 'Помощь детским домам',
      category: 'charity',
      description: 'Наша компания регулярно организует мероприятия, направленные на поддержку детей из детских домов. Мы предоставляем образовательные материалы, организуем экскурсии и мастер-классы для детей.',
      impact: 'За последний год мы помогли более 200 детям из 5 детских домов, организовав 15 образовательных мероприятий и экскурсий.',
      image: '/images/about/charity-1.jpg',
      gallery: [
        '/images/about/charity-1-gallery-1.jpg',
        '/images/about/charity-1-gallery-2.jpg',
        '/images/about/charity-1-gallery-3.jpg'
      ]
    },
    {
      id: 2,
      title: 'Экологическая инициатива "Зеленый офис"',
      category: 'environment',
      description: 'Мы активно внедряем принципы устойчивого развития в нашей компании. Программа "Зеленый офис" включает раздельный сбор отходов, энергосбережение и сокращение использования пластика.',
      impact: 'В результате внедрения программы, мы сократили потребление электроэнергии на 30% и полностью отказались от одноразового пластика в офисе.',
      image: '/images/about/environment-1.jpg',
      gallery: [
        '/images/about/environment-1-gallery-1.jpg',
        '/images/about/environment-1-gallery-2.jpg',
        '/images/about/environment-1-gallery-3.jpg'
      ]
    },
    {
      id: 3,
      title: 'Поддержка местных сообществ',
      category: 'charity',
      description: 'Мы сотрудничаем с местными сообществами в регионах, где представлены наши услуги аренды, помогая решать социальные проблемы и поддерживая местные инициативы.',
      impact: 'За последний год мы реализовали 8 проектов в различных регионах, направленных на благоустройство территорий и поддержку местных культурных мероприятий.',
      image: '/images/about/charity-2.jpg'
    },
    {
      id: 4,
      title: 'Образовательная программа для студентов',
      category: 'education',
      description: 'Мы разработали программу стажировок и мастер-классов для студентов, обучающихся в сферах IT, маркетинга и туризма, давая им возможность получить практический опыт и знания.',
      impact: 'Более 50 студентов прошли стажировку в нашей компании, многие из которых в дальнейшем стали нашими сотрудниками.',
      image: '/images/about/education-1.jpg',
      gallery: [
        '/images/about/education-1-gallery-1.jpg',
        '/images/about/education-1-gallery-2.jpg',
        '/images/about/education-1-gallery-3.jpg'
      ]
    },
    {
      id: 5,
      title: 'Программа по сохранению лесов',
      category: 'environment',
      description: 'Для компенсации углеродного следа нашей деятельности, мы участвуем в программе по посадке деревьев и восстановлению лесных массивов в различных регионах страны.',
      impact: 'Благодаря нашему участию в программе, уже высажено более 5000 деревьев и восстановлено 2 гектара леса.',
      image: '/images/about/environment-2.jpg'
    },
    {
      id: 6,
      title: 'Стипендиальная программа',
      category: 'education',
      description: 'Мы предоставляем стипендии и гранты талантливым студентам, изучающим сферы, связанные с нашей деятельностью, помогая им получить качественное образование.',
      impact: 'В этом году 10 студентов из разных регионов получили нашу стипендию для обучения в ведущих вузах страны.',
      image: '/images/about/education-2.jpg'
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Социальная ответственность</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Мы стремимся внести положительный вклад в общество и окружающую среду, реализуя различные социальные и экологические инициативы.
          </p>
        </div>

        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className={`bg-white p-8 rounded-lg shadow-md text-center transition-all duration-1000 delay-100 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Благотворительность</h3>
              <p className="text-gray-600">
                Мы поддерживаем различные благотворительные организации и инициативы, помогая улучшить жизнь людей в местных сообществах.
              </p>
            </div>
            <div className={`bg-white p-8 rounded-lg shadow-md text-center transition-all duration-1000 delay-300 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Экологические инициативы</h3>
              <p className="text-gray-600">
                Мы заботимся о нашей планете, внедряя экологически устойчивые практики в нашу деятельность и поддерживая проекты по охране окружающей среды.
              </p>
            </div>
            <div className={`bg-white p-8 rounded-lg shadow-md text-center transition-all duration-1000 delay-500 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Образование</h3>
              <p className="text-gray-600">
                Мы инвестируем в образование и развитие молодого поколения, предоставляя стипендии, стажировки и программы обучения.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-16">
          {initiatives.map((initiative, index) => (
            <div 
              key={initiative.id}
              className={`flex flex-col lg:flex-row gap-8 transition-all duration-1000 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={initiative.image}
                    alt={initiative.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      initiative.category === 'charity' ? 'bg-blue-100 text-blue-800' :
                      initiative.category === 'environment' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {initiative.category === 'charity' ? 'Благотворительность' :
                      initiative.category === 'environment' ? 'Экология' :
                      'Образование'}
                    </span>
                  </div>
                </div>

                {initiative.gallery && (
                  <div className="mt-4">
                    <Swiper
                      modules={[Pagination, Navigation]}
                      spaceBetween={10}
                      slidesPerView={3}
                      pagination={{ clickable: true }}
                      navigation
                    >
                      {initiative.gallery.map((image, i) => (
                        <SwiperSlide key={i}>
                          <div className="relative h-24 rounded-lg overflow-hidden">
                            <Image
                              src={image}
                              alt={`${initiative.title} - ${i + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}
              </div>
              
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl font-bold mb-4">{initiative.title}</h3>
                <p className="text-gray-600 mb-6">{initiative.description}</p>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Достигнутые результаты</h4>
                  <p className="text-gray-700">{initiative.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-16 text-center transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-2xl font-bold mb-4">Присоединяйтесь к нашим инициативам</h3>
          <p className="text-gray-600 max-w-3xl mx-auto mb-6">
            Мы всегда рады видеть новых партнеров и волонтеров, готовых принять участие в наших социальных и экологических проектах.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Свяжитесь с нами
          </button>
        </div>
      </div>
    </section>
  );
};

export default SocialResponsibilitySection; 