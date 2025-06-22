'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const PopularOffersSection = () => {
  const popularOffers = [
    {
      id: 1,
      title: 'Апартаменты у моря',
      category: 'Недвижимость',
      price: '25 000 ฿',
      unit: 'месяц',
      rating: 4.8,
      reviewCount: 127,
      image: '/images/placeholder-offer.jpg',
      link: '/real-estate/apartments-sea-view',
    },
    {
      id: 2,
      title: 'Скутер эконом-класса',
      category: 'Транспорт',
      price: '300 ฿',
      unit: 'день',
      rating: 4.7,
      reviewCount: 89,
      image: '/images/placeholder-offer.jpg',
      link: '/transport/economy-scooter',
    },
    {
      id: 3,
      title: 'Морская экскурсия',
      category: 'Экскурсии',
      price: '3 200 ฿',
      unit: 'человек',
      rating: 4.9,
      reviewCount: 203,
      image: '/images/placeholder-offer.jpg',
      link: '/tours/sea-excursion',
    },
    {
      id: 4,
      title: 'Вилла с бассейном',
      category: 'Недвижимость',
      price: '45 000 ฿',
      unit: 'месяц',
      rating: 4.6,
      reviewCount: 95,
      image: '/images/placeholder-offer.jpg',
      link: '/real-estate/villa-pool',
    },
    {
      id: 5,
      title: 'Трансфер из аэропорта',
      category: 'Трансферы',
      price: '1 500 ฿',
      unit: 'поездка',
      rating: 4.9,
      reviewCount: 173,
      image: '/images/placeholder-offer.jpg',
      link: '/transfer/airport',
    },
    {
      id: 6,
      title: 'Рыбалка в открытом море',
      category: 'Экскурсии',
      price: '5 200 ฿',
      unit: 'человек',
      rating: 4.8,
      reviewCount: 64,
      image: '/images/placeholder-offer.jpg',
      link: '/tours/deep-sea-fishing',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Популярные предложения</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Самые востребованные варианты аренды и экскурсий по версии наших клиентов
            </p>
          </div>
          <Link href="/catalog" className="inline-flex items-center font-medium text-primary hover:text-primary-dark mt-4 md:mt-0">
            <span className="mr-2">Все предложения</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularOffers.map((offer, index) => {
            const { ref, inView } = useInView({
              triggerOnce: true,
              threshold: 0.1,
            });

            const delayClasses: { [key: number]: string } = {
              0: 'delay-0', // Первая строка
              1: 'delay-200',
              2: 'delay-400',
              3: 'delay-0', // Вторая строка, начинаем задержки заново или с небольшим сдвигом
              4: 'delay-200',
              5: 'delay-400',
            };
            const calculatedDelay = delayClasses[index] || `delay-[${(index % 3) * 200}ms]`; // Общий случай для последующих строк

            return (
              <div 
                key={offer.id} 
                ref={ref}
                className={`group transition-all duration-700 ease-out ${calculatedDelay} 
                            ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 relative h-full flex flex-col">
                  {/* Изображение */}
                  <div className="relative h-60 overflow-hidden">
                    <Image 
                      src={offer.image}
                      alt={offer.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    <div className="absolute top-4 left-4 bg-primary/90 text-white text-sm font-medium px-2 py-1 rounded z-10">
                      {offer.category}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-dark mb-2 group-hover:text-primary transition-colors duration-300">
                      {offer.title}
                    </h3>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex items-center text-yellow-500 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                        <span className="text-dark ml-1 font-medium">{offer.rating}</span>
                      </div>
                      <span className="text-gray-500 text-sm">({offer.reviewCount} отзывов)</span>
                    </div>
                    
                    <div className="mt-auto flex justify-between items-center"> {/* mt-auto для прижатия этого блока к низу */}
                      <div>
                        <span className="text-2xl font-bold text-dark">{offer.price}</span>
                        <span className="text-gray-500 text-sm ml-1">/ {offer.unit}</span>
                      </div>
                      <Link 
                        href={offer.link} 
                        className="bg-primary/10 hover:bg-primary/20 transition-all duration-300 text-primary font-medium px-4 py-2 rounded-lg group-hover:scale-105 group-hover:shadow-sm"
                      >
                        Подробнее
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/catalog" 
            className="inline-block bg-primary text-white py-3 px-8 rounded-full font-medium text-lg shadow-md hover:bg-primary-dark transition-colors duration-300"
          >
            Все предложения
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularOffersSection; 