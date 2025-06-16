'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/app/models/Property';
import { StarIcon } from 'lucide-react';
import { getSimilarProperties } from '@/app/lib/api/properties';

interface PropertySimilarProps {
  propertyId: string;
}

export default function PropertySimilar({ propertyId }: PropertySimilarProps) {
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSimilarProperties = async () => {
      setIsLoading(true);
      try {
        const properties = await getSimilarProperties(propertyId);
        setSimilarProperties(properties);
      } catch (error) {
        console.error('Ошибка при загрузке похожих объектов:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSimilarProperties();
  }, [propertyId]);

  // Функция для форматирования цены
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'THB',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Функция для отображения периода цены
  const getPriceUnit = (unit: 'night' | 'month' | 'week'): string => {
    const units = {
      night: 'ночь',
      week: 'неделю',
      month: 'месяц',
    };
    return units[unit];
  };

  if (isLoading) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Похожие предложения</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-t-lg"></div>
              <div className="p-4 border border-gray-200 border-t-0 rounded-b-lg">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (similarProperties.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Похожие предложения</h2>
        <Link href="/real-estate" className="text-blue-500 hover:underline">
          Смотреть все
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarProperties.map((property) => (
          <Link key={property.id} href={`/real-estate/${property.id}`}>
            <div className="group border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-md">
              {/* Изображение */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={property.images[0]?.url || '/placeholder.jpg'}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Информация */}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{property.title}</h3>
                    <p className="text-gray-500 text-sm">{property.address}</p>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{property.rating}</span>
                  </div>
                </div>

                {/* Характеристики */}
                <div className="flex flex-wrap text-sm text-gray-500 mt-2 mb-3">
                  <span className="mr-2">{property.rooms} комн.</span>
                  <span className="mr-2">•</span>
                  <span className="mr-2">{property.area} м²</span>
                  <span className="mr-2">•</span>
                  <span>До {property.maxGuests} гостей</span>
                </div>

                {/* Цена */}
                <div className="font-semibold text-gray-900">
                  {formatPrice(property.price)}
                  <span className="text-sm font-normal text-gray-600">
                    {' '}
                    / {getPriceUnit(property.priceUnit)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 