'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { PropertyCard } from '../ui/Card';

type Category = 'all' | 'real-estate' | 'transport' | 'excursions';

// Примеры данных для популярных предложений
const popularOffers = [
  {
    id: 1,
    title: 'Современная квартира в центре',
    description: 'Светлая квартира с панорамным видом на город',
    price: 5000,
    priceUnit: '₽/сутки',
    location: 'Москва, Центральный район',
    imageSrc: '/images/apartment1.jpg',
    features: {
      bedrooms: 2,
      bathrooms: 1,
      area: 65,
    },
    category: 'real-estate',
    href: '/real-estate/1',
  },
  {
    id: 2,
    title: 'Уютный домик у озера',
    description: 'Идеальное место для отдыха от городской суеты',
    price: 8000,
    priceUnit: '₽/сутки',
    location: 'Ленинградская область, Выборг',
    imageSrc: '/images/house1.jpg',
    features: {
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
    },
    category: 'real-estate',
    href: '/real-estate/2',
  },
  {
    id: 3,
    title: 'Volkswagen Golf',
    description: 'Экономичный автомобиль для городских поездок',
    price: 2500,
    priceUnit: '₽/сутки',
    location: 'Москва, Аэропорт Шереметьево',
    imageSrc: '/images/car1.jpg',
    features: {
      year: 2020,
      transmission: 'АКПП',
      fuelType: 'Бензин',
    },
    category: 'transport',
    href: '/transport/3',
  },
  {
    id: 4,
    title: 'Моторная яхта "Афина"',
    description: 'Роскошная яхта для морских прогулок',
    price: 25000,
    priceUnit: '₽/час',
    location: 'Сочи, Морской порт',
    imageSrc: '/images/yacht1.jpg',
    features: {
      length: 15,
      capacity: 8,
      year: 2019,
    },
    category: 'transport',
    href: '/transport/4',
  },
  {
    id: 5,
    title: 'Обзорная экскурсия по Санкт-Петербургу',
    description: 'Увлекательное путешествие по историческому центру',
    price: 1500,
    priceUnit: '₽/чел',
    location: 'Санкт-Петербург',
    imageSrc: '/images/excursion1.jpg',
    features: {
      duration: 3,
      language: 'Русский',
      groupSize: 10,
    },
    category: 'excursions',
    href: '/excursions/5',
  },
  {
    id: 6,
    title: 'Тур по Золотому кольцу',
    description: 'Двухдневное путешествие по древним городам России',
    price: 7500,
    priceUnit: '₽/чел',
    location: 'Москва, отправление от Красной площади',
    imageSrc: '/images/excursion2.jpg',
    features: {
      duration: 48,
      language: 'Русский',
      groupSize: 12,
    },
    category: 'excursions',
    href: '/excursions/6',
  },
];

export default function PopularOffersSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const filteredOffers = activeCategory === 'all'
    ? popularOffers
    : popularOffers.filter(offer => offer.category === activeCategory);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons();
      return () => carousel.removeEventListener('scroll', checkScrollButtons);
    }
  }, [activeCategory]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Популярные предложения</h2>
            <p className="text-gray-600">Выберите из лучших предложений этого месяца</p>
          </div>
          <Link href="/catalog">
            <div className="flex items-center text-primary hover:text-primary-dark mt-4 md:mt-0">
              <span className="mr-1">Смотреть все</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </Link>
        </div>

        {/* Фильтры категорий */}
        <div className="flex mb-8 border-b overflow-x-auto pb-2">
          <button
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeCategory === 'all'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveCategory('all')}
          >
            Все предложения
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeCategory === 'real-estate'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveCategory('real-estate')}
          >
            Недвижимость
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeCategory === 'transport'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveCategory('transport')}
          >
            Транспорт
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeCategory === 'excursions'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveCategory('excursions')}
          >
            Экскурсии
          </button>
        </div>

        <div className="relative">
          {/* Кнопки прокрутки карусели */}
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10">
            <Button
              variant="secondary"
              size="icon"
              className={`rounded-full shadow-md ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={scrollLeft}
              disabled={!canScrollLeft}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
            <Button
              variant="secondary"
              size="icon"
              className={`rounded-full shadow-md ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={scrollRight}
              disabled={!canScrollRight}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Карусель с предложениями */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto py-4 px-2 -mx-2 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredOffers.map((offer) => (
              <div key={offer.id} className="min-w-[300px] md:min-w-[350px] px-2 flex-shrink-0">
                <PropertyCard
                  id={offer.id}
                  title={offer.title}
                  description={offer.description}
                  price={offer.price}
                  priceUnit={offer.priceUnit}
                  location={offer.location}
                  imageSrc={offer.imageSrc}
                  features={offer.features}
                  href={offer.href}
                />
              </div>
            ))}
            {filteredOffers.length === 0 && (
              <div className="w-full text-center py-10">
                <p className="text-gray-500">Нет предложений в данной категории</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 