'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X as XIcon, ChevronLeft, ChevronRight, Maximize2 as MaximizeIcon } from 'lucide-react';
import { VehicleImage } from '@/app/models/Vehicle';

interface VehicleGalleryProps {
  images: VehicleImage[];
  className?: string;
}

export default function VehicleGallery({ images, className = '' }: VehicleGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Получение главного изображения
  const featuredImage = images.find(img => img.isFeatured) || images[0];
  const initialImageIndex = featuredImage ? images.findIndex(img => img.id === featuredImage.id) : 0;
  
  // Переключение на следующее изображение
  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };
  
  // Переключение на предыдущее изображение
  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  // Включение/выключение полноэкранного режима
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // При выходе из полноэкранного режима отключаем зум
    if (isFullscreen) {
      setIsZoomed(false);
    }
  };
  
  // Включение/выключение зума
  const toggleZoom = () => {
    if (isFullscreen) {
      setIsZoomed(!isZoomed);
    }
  };
  
  // Обработчик клавиш для навигации
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (isZoomed) {
        setIsZoomed(false);
      } else if (isFullscreen) {
        setIsFullscreen(false);
      }
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    }
  };
  
  // Обычный режим просмотра
  const normalView = (
    <div className={`relative ${className}`}>
      <div className="relative aspect-video rounded-lg overflow-hidden mb-2 group">
        <Image
          src={images[activeImageIndex]?.url || '/images/placeholder.jpg'}
          alt={images[activeImageIndex]?.alt || 'Изображение транспортного средства'}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button 
          className="absolute top-4 right-4 bg-white bg-opacity-80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={toggleFullscreen}
          aria-label="Полноэкранный режим"
        >
          <MaximizeIcon className="h-5 w-5" />
        </button>
        
        {/* Навигационные кнопки */}
        <button 
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-90 transition-opacity duration-300"
          onClick={prevImage}
          aria-label="Предыдущее изображение"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-90 transition-opacity duration-300"
          onClick={nextImage}
          aria-label="Следующее изображение"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      
      {/* Миниатюры */}
      <div className="grid grid-cols-5 gap-2">
        {images.slice(0, 5).map((image, index) => (
          <button
            key={image.id}
            className={`relative aspect-[4/3] rounded-md overflow-hidden border-2 transition-all duration-300 ${
              index === activeImageIndex ? 'border-primary scale-[1.02]' : 'border-transparent hover:border-gray-300'
            }`}
            onClick={() => setActiveImageIndex(index)}
            aria-label={`Выбрать изображение ${index + 1}`}
          >
            <Image
              src={image.url}
              alt={image.alt || `Миниатюра ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
      
      {/* Счетчик изображений */}
      {images.length > 5 && (
        <div className="text-right mt-1 text-sm text-gray-500">
          {activeImageIndex + 1} из {images.length} фотографий
        </div>
      )}
    </div>
  );
  
  // Полноэкранный режим
  const fullscreenView = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-black flex flex-col"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Верхняя панель */}
      <div className="flex justify-between items-center p-4 text-white">
        <span className="text-lg font-medium">
          {activeImageIndex + 1} / {images.length}
        </span>
        <button
          onClick={toggleFullscreen}
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Закрыть"
        >
          <XIcon className="h-6 w-6" />
        </button>
      </div>
      
      {/* Основное изображение */}
      <div className="flex-1 flex items-center justify-center overflow-hidden relative">
        <motion.div
          className={`relative w-full h-full ${isZoomed ? 'cursor-move overflow-hidden' : 'cursor-zoom-in'}`}
          onClick={toggleZoom}
          initial={false}
          animate={isZoomed ? { scale: 2 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
          drag={isZoomed}
          dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
        >
          <Image
            src={images[activeImageIndex]?.url || '/images/placeholder.jpg'}
            alt={images[activeImageIndex]?.alt || 'Изображение транспортного средства'}
            fill
            className={`object-contain transition-transform duration-300 ${isZoomed ? 'scale-100' : 'scale-90'}`}
            priority
          />
        </motion.div>
        
        {/* Навигационные кнопки */}
        {!isZoomed && (
          <>
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-3 transition-opacity duration-300"
              onClick={prevImage}
              aria-label="Предыдущее изображение"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-3 transition-opacity duration-300"
              onClick={nextImage}
              aria-label="Следующее изображение"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>
      
      {/* Миниатюры внизу */}
      <div className="p-4 bg-black/90">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              className={`relative h-16 w-24 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                index === activeImageIndex ? 'border-primary' : 'border-transparent hover:border-gray-300'
              }`}
              onClick={() => setActiveImageIndex(index)}
              aria-label={`Выбрать изображение ${index + 1}`}
            >
              <Image
                src={image.url}
                alt={image.alt || `Миниатюра ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
  
  return (
    <>
      {normalView}
      <AnimatePresence>
        {isFullscreen && fullscreenView}
      </AnimatePresence>
    </>
  );
} 