import React, { useState } from 'react';
import Image from 'next/image';

interface TourImageGalleryProps {
  images: string[];
  videoUrl?: string;
  title: string;
}

const TourImageGallery: React.FC<TourImageGalleryProps> = ({ images, videoUrl, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  // Если нет изображений, показываем заглушку
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center rounded-lg">
        <span className="text-gray-500">Нет изображений</span>
      </div>
    );
  }

  // Открытие модального окна для полноразмерного просмотра
  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  // Обработчики навигации в модальном окне
  const nextImage = () => {
    setModalIndex((modalIndex + 1) % images.length);
  };

  const prevImage = () => {
    setModalIndex((modalIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-2">
      {/* Главное изображение */}
      <div className="relative h-[400px] rounded-lg overflow-hidden cursor-pointer" onClick={() => openModal(activeIndex)}>
        {activeIndex === 0 && videoUrl ? (
          <div className="relative w-full h-full">
            <Image 
              src={images[0]} 
              alt={`${title} - превью видео`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <div className="w-16 h-16 rounded-full bg-white bg-opacity-70 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-600 ml-1">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <Image 
            src={images[activeIndex]} 
            alt={`${title} - изображение ${activeIndex + 1}`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      {/* Миниатюры изображений */}
      <div className="grid grid-cols-6 gap-2">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`relative h-20 rounded overflow-hidden cursor-pointer border-2 ${activeIndex === index ? 'border-blue-500' : 'border-transparent'}`}
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={image}
              alt={`${title} - миниатюра ${index + 1}`}
              fill
              className="object-cover"
            />
            {index === 0 && videoUrl && (
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Модальное окно для полноразмерного просмотра */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-4xl h-[80vh]">
            <button 
              className="absolute top-4 right-4 text-white z-10"
              onClick={() => setIsModalOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Видео или изображение */}
            {modalIndex === 0 && videoUrl ? (
              <div className="w-full h-full flex items-center justify-center">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={videoUrl} 
                  title={`${title} - видео`}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative w-full h-full">
                <Image 
                  src={images[modalIndex]} 
                  alt={`${title} - изображение ${modalIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            
            {/* Кнопки навигации */}
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition"
              onClick={prevImage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition"
              onClick={nextImage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Информация о текущем изображении */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full">
              {modalIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourImageGallery; 