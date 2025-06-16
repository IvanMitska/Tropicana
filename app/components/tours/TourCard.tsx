import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tour } from '../../models/Tour';

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  // Форматирование цены
  const formatPrice = () => {
    const { basePrice, currency, priceType } = tour.pricing;
    const currencySymbol = currency === 'THB' ? '฿' : currency;
    
    return `${basePrice.toLocaleString()} ${currencySymbol}${priceType === 'perPerson' ? '/чел.' : '/группа'}`;
  };

  return (
    <Link href={`/tours/${tour.id}`}>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full hover:shadow-md transition duration-300">
        {/* Изображение */}
        <div className="relative h-48">
          {tour.images && tour.images.length > 0 ? (
            <Image 
              src={tour.images[0]} 
              alt={tour.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Нет изображения</span>
            </div>
          )}
          
          {/* Рейтинг */}
          {tour.rating > 0 && (
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md shadow-sm flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-4 h-4 text-yellow-500 mr-1"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span className="text-sm font-medium">{tour.rating.toFixed(1)}</span>
            </div>
          )}
          
          {/* Категория */}
          <div className="absolute bottom-2 left-2">
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
              {tour.category}
            </span>
          </div>
        </div>
        
        {/* Контент */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{tour.title}</h3>
          
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-4 h-4 mr-1"
            >
              <path 
                fillRule="evenodd" 
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" 
                clipRule="evenodd" 
              />
            </svg>
            <span>{tour.location.city}</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.description}</p>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600 text-sm">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-4 h-4 mr-1"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <span>{tour.duration} ч.</span>
              </div>
              
              <div className="flex items-center text-gray-600 text-sm">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-4 h-4 mr-1"
                >
                  <path 
                    d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" 
                  />
                </svg>
                <span>до {tour.pricing.maxParticipants}</span>
              </div>
            </div>
            
            <div className="text-blue-600 font-semibold">
              {formatPrice()}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourCard; 