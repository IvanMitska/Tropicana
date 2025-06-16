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
    <section className="relative h-[70vh] min-h-[500px] w-full bg-[#1e3c3c]">
      <div className="absolute inset-0 z-0 opacity-30">
        <Image
          src="/images/about/hero-bg.jpg"
          alt="О компании - фоновое изображение"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#1e3c3c]/80 to-transparent z-0" />
      
      <div 
        ref={ref}
        className={`relative z-10 h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center text-white transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow-md">
          О <span className="text-[#e5916e]">Пхукет</span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl text-gray-200">
          Мы создаем уникальные возможности для путешествий и отдыха на солнечном Пхукете, делая аренду недвижимости, транспорта и заказ экскурсий простыми, удобными и доступными для каждого.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg text-center">
            <p className="text-4xl font-bold text-[#e5916e]">2023</p>
            <p className="text-sm mt-1 text-gray-300">Год основания</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg text-center">
            <p className="text-4xl font-bold text-[#e5916e]">20,000+</p>
            <p className="text-sm mt-1 text-gray-300">Довольных клиентов</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg text-center">
            <p className="text-4xl font-bold text-[#e5916e]">500+</p>
            <p className="text-sm mt-1 text-gray-300">Предложений в каталоге</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 