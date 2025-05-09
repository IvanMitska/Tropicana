'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PropertyImage } from '@/app/models/Property';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface PropertyGalleryProps {
  images: PropertyImage[];
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullGallery, setShowFullGallery] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleFullGallery = () => {
    setShowFullGallery(!showFullGallery);
  };

  // Для мобильной версии используем слайдер
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return (
      <div className="relative">
        {/* Мобильный слайдер */}
        <div className="relative h-64 rounded-lg overflow-hidden">
          <Image
            src={images[currentIndex]?.url || '/placeholder.jpg'}
            alt={images[currentIndex]?.alt || 'Изображение недвижимости'}
            fill
            className="object-cover"
          />
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
            onClick={handlePrev}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
            onClick={handleNext}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center">
          <div className="flex space-x-1">
            {images.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
        <button
          onClick={toggleFullGallery}
          className="absolute bottom-3 right-3 bg-white text-gray-800 text-sm px-3 py-1 rounded-md shadow-md"
        >
          Все фото
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Главное изображение */}
        <div className="lg:col-span-2 lg:row-span-2 relative rounded-lg overflow-hidden h-96">
          <Image
            src={images[currentIndex]?.url || '/placeholder.jpg'}
            alt={images[currentIndex]?.alt || 'Изображение недвижимости'}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            onClick={toggleFullGallery}
          />
        </div>

        {/* Миниатюры - только на десктопе */}
        {images.slice(0, 4).map((image, index) => {
          if (index === currentIndex) return null;
          if (index >= 4) return null;
          
          return (
            <div 
              key={image.id}
              className="relative rounded-lg overflow-hidden h-44 cursor-pointer"
              onClick={() => handleThumbnailClick(index)}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          );
        })}

        {/* Кнопка "Все фото" */}
        <button
          onClick={toggleFullGallery}
          className="lg:absolute lg:bottom-4 lg:right-4 bg-white text-gray-800 text-sm px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition-colors"
        >
          Все фото
        </button>
      </div>

      {/* Полноэкранная галерея */}
      {showFullGallery && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={toggleFullGallery}
            className="absolute top-4 right-4 text-white p-2"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>
          
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2"
            onClick={handlePrev}
          >
            <ChevronLeftIcon className="h-10 w-10" />
          </button>
          
          <div className="relative h-5/6 w-5/6">
            <Image
              src={images[currentIndex]?.url || '/placeholder.jpg'}
              alt={images[currentIndex]?.alt || 'Изображение недвижимости'}
              fill
              className="object-contain"
            />
          </div>
          
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2"
            onClick={handleNext}
          >
            <ChevronRightIcon className="h-10 w-10" />
          </button>
          
          <div className="absolute bottom-4 left-0 right-0">
            <div className="flex justify-center space-x-2 overflow-x-auto px-4">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative w-16 h-16 rounded-md overflow-hidden ${
                    index === currentIndex ? 'ring-2 ring-white' : 'opacity-70'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 