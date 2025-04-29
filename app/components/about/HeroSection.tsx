'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const HeroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative h-[80vh] min-h-[600px] w-full">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about/hero-bg.jpg"
          alt="О компании"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div 
        ref={ref}
        className={`relative z-10 h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start text-white transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          О нашей компании
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Мы создаем уникальные возможности для путешествий и отдыха, делая аренду простой и доступной для каждого.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 w-full max-w-3xl">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <p className="text-3xl font-bold">2016</p>
            <p className="text-sm">Год основания</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <p className="text-3xl font-bold">50,000+</p>
            <p className="text-sm">Довольных клиентов</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <p className="text-3xl font-bold">1,000+</p>
            <p className="text-sm">Объектов в каталоге</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 