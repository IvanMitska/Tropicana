import Link from 'next/link';
import Image from 'next/image';
import { StarIcon, MapPinIcon, HomeIcon, UsersIcon, BedIcon, BathIcon } from 'lucide-react';
import { Host } from '@/app/models/Property';

interface PropertyInfoProps {
  title: string;
  category: string;
  address: string;
  price: number;
  priceUnit: 'night' | 'month' | 'week';
  rating: number;
  reviewCount: number;
  area: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  host: Host;
}

export default function PropertyInfo({
  title,
  category,
  address,
  price,
  priceUnit,
  rating,
  reviewCount,
  area,
  rooms,
  bedrooms,
  bathrooms,
  maxGuests,
  host,
}: PropertyInfoProps) {
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

  // Функция для склонения "отзыв" в зависимости от количества
  const getReviewsText = (count: number): string => {
    if (count === 0) return 'отзывов';
    if (count === 1) return 'отзыв';
    if (count >= 2 && count <= 4) return 'отзыва';
    return 'отзывов';
  };

  return (
    <div>
      {/* Заголовок и категория */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <div className="text-sm text-gray-500 capitalize">{category}</div>
      </div>

      {/* Адрес и рейтинг */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="flex items-center text-gray-600">
          <MapPinIcon className="h-4 w-4 mr-1" />
          <span>{address}</span>
          <Link href="#map" className="ml-2 text-blue-600 text-sm">
            На карте
          </Link>
        </div>
        <div className="flex items-center">
          <div className="flex items-center">
            <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
            <span className="font-semibold">{rating.toFixed(1)}</span>
          </div>
          <Link href="#reviews" className="ml-2 text-gray-600 text-sm">
            {reviewCount} {getReviewsText(reviewCount)}
          </Link>
        </div>
      </div>

      {/* Характеристики с иконками */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-gray-700">
        <div className="flex items-center">
          <HomeIcon className="h-5 w-5 mr-2 text-gray-500" />
          <span>{area} м²</span>
        </div>
        <div className="flex items-center">
          <div className="h-5 w-5 mr-2 relative">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-500"
            >
              <path d="M3 9h18v10H3z"></path>
              <path d="M9 3v6M15 3v6M21 9H3"></path>
            </svg>
          </div>
          <span>{rooms} комн.</span>
        </div>
        <div className="flex items-center">
          <BedIcon className="h-5 w-5 mr-2 text-gray-500" />
          <span>{bedrooms} спален</span>
        </div>
        <div className="flex items-center">
          <BathIcon className="h-5 w-5 mr-2 text-gray-500" />
          <span>{bathrooms} ванных</span>
        </div>
        <div className="flex items-center">
          <UsersIcon className="h-5 w-5 mr-2 text-gray-500" />
          <span>До {maxGuests} гостей</span>
        </div>
      </div>

      {/* Цена */}
      <div className="mb-6">
        <div className="text-2xl font-bold text-gray-900">
          {formatPrice(price)}
          <span className="text-lg font-normal text-gray-600">
            {' '}
            / {getPriceUnit(priceUnit)}
          </span>
        </div>
      </div>

      {/* Информация о хозяине */}
      <div className="flex items-center">
        <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
          <Image
            src={host.avatar || '/placeholder.jpg'}
            alt={host.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <div className="font-medium">Хозяин: {host.name}</div>
          <div className="text-sm text-gray-500">
            {host.isSuperhost && (
              <span className="text-rose-500 font-medium mr-2">★ Суперхост</span>
            )}
            Отвечает {host.responseTime}
          </div>
        </div>
      </div>
    </div>
  );
} 