'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { 
  Star as StarIcon, 
  MessageCircle as MessageIcon,
  ThumbsUp as ThumbsUpIcon,
  User as UserIcon,
  Plus as PlusIcon,
  Filter as FilterIcon,
  ChevronDown as ChevronDownIcon
} from 'lucide-react';
import { Button } from '../ui/Button';
import { VehicleReview } from '@/app/models/Vehicle';

interface VehicleReviewsProps {
  reviews: VehicleReview[];
  rating: number;
  canAddReview?: boolean;
  onAddReview?: () => void;
  className?: string;
}

// Компонент для отображения рейтинга звездами
const StarRating = ({ rating, size = 'default' }: { rating: number, size?: 'sm' | 'default' | 'lg' }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  
  const starSize = size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-6 w-6' : 'h-4 w-4';
  
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-gray-300">
          <StarIcon 
            className={`${starSize} ${i < fullStars ? 'text-yellow-500' : (i === fullStars && hasHalfStar ? 'text-yellow-500 opacity-60' : '')}`} 
            fill={i < fullStars || (i === fullStars && hasHalfStar) ? 'currentColor' : 'none'}
          />
        </span>
      ))}
    </div>
  );
};

// Компонент для отображения категорий оценок
const ReviewCategories = ({ categories }: { categories: { [key: string]: number } }) => {
  const getCategoryLabel = (key: string): string => {
    const labels: { [key: string]: string } = {
      condition: 'Состояние',
      comfort: 'Комфорт',
      performance: 'Производительность',
      value: 'Соотношение цена/качество',
      cleanliness: 'Чистота',
      accuracy: 'Соответствие описанию',
    };
    
    return labels[key] || key;
  };
  
  return (
    <div className="grid grid-cols-2 gap-2 mt-3">
      {Object.entries(categories).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{getCategoryLabel(key)}:</span>
          <div className="flex items-center">
            <span className="font-medium mr-1">{value.toFixed(1)}</span>
            <StarIcon className="h-3 w-3 text-yellow-500" fill="currentColor" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Основной компонент отзывов
export default function VehicleReviews({ 
  reviews, 
  rating, 
  canAddReview = false,
  onAddReview,
  className = '' 
}: VehicleReviewsProps) {
  const [expandedReviews, setExpandedReviews] = useState<string[]>([]);
  const [visibleReviews, setVisibleReviews] = useState<number>(3);
  const [filterBy, setFilterBy] = useState<string>('');
  
  // Функция для форматирования даты
  const formatReviewDate = (dateString: string): string => {
    return format(new Date(dateString), 'd MMMM yyyy г.', { locale: ru });
  };
  
  // Переключение развернутого/свернутого состояния отзыва
  const toggleReviewExpand = (reviewId: string) => {
    setExpandedReviews(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId) 
        : [...prev, reviewId]
    );
  };
  
  // Показать больше отзывов
  const showMoreReviews = () => {
    setVisibleReviews(prev => prev + 5);
  };
  
  // Фильтрация отзывов
  const filteredReviews = filterBy 
    ? reviews.filter(review => {
        if (filterBy === 'high') return review.rating >= 4;
        if (filterBy === 'low') return review.rating <= 2;
        if (filterBy === 'mid') return review.rating > 2 && review.rating < 4;
        return true;
      })
    : reviews;
  
  // Вычисление статистики по оценкам
  const ratingStats = reviews.reduce((acc, review) => {
    const rating = Math.floor(review.rating);
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {} as { [key: number]: number });
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Отзывы</h2>
          <div className="flex items-center mt-1">
            <StarRating rating={rating} size="lg" />
            <span className="ml-2 font-medium text-lg">{rating.toFixed(1)}</span>
            <span className="text-gray-600 ml-1">({reviews.length} {reviews.length === 1 ? 'отзыв' : 
              reviews.length >= 2 && reviews.length <= 4 ? 'отзыва' : 'отзывов'})</span>
          </div>
        </div>
        
        {canAddReview && (
          <Button onClick={onAddReview}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Оставить отзыв
          </Button>
        )}
      </div>
      
      {/* Рейтинговая статистика */}
      {reviews.length > 0 && (
        <div className="mb-6 border-b pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Гистограмма рейтингов */}
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Распределение оценок</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(star => {
                  const count = ratingStats[star] || 0;
                  const percentage = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
                  
                  return (
                    <div key={star} className="flex items-center">
                      <div className="flex items-center w-20">
                        <span className="mr-1">{star}</span>
                        <StarIcon className="h-4 w-4 text-yellow-500" fill="currentColor" />
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mx-2">
                        <div 
                          className="bg-yellow-500 h-2.5 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600 w-16 text-right">{count} ({percentage}%)</div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Средние оценки по категориям, если есть */}
            {reviews.length > 0 && reviews[0].categories && (
              <div>
                <h3 className="font-medium text-gray-800 mb-3">Оценки по категориям</h3>
                <div className="space-y-2">
                  {Object.entries(
                    reviews.reduce((acc, review) => {
                      Object.entries(review.categories).forEach(([key, value]) => {
                        if (!acc[key]) acc[key] = { sum: 0, count: 0 };
                        acc[key].sum += value;
                        acc[key].count += 1;
                      });
                      return acc;
                    }, {} as { [key: string]: { sum: number; count: number } })
                  ).map(([key, { sum, count }]) => {
                    const average = sum / count;
                    const getCategoryLabel = (key: string): string => {
                      const labels: { [key: string]: string } = {
                        condition: 'Состояние',
                        comfort: 'Комфорт',
                        performance: 'Производительность',
                        value: 'Соотношение цена/качество',
                        cleanliness: 'Чистота',
                        accuracy: 'Соответствие описанию',
                      };
                      
                      return labels[key] || key;
                    };
                    
                    return (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-gray-700">{getCategoryLabel(key)}:</span>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">{average.toFixed(1)}</span>
                          <StarRating rating={average} size="sm" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Фильтры отзывов */}
      {reviews.length > 3 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            variant={filterBy === '' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setFilterBy('')}
          >
            Все отзывы
          </Button>
          <Button 
            variant={filterBy === 'high' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setFilterBy('high')}
          >
            Высокие оценки
          </Button>
          <Button 
            variant={filterBy === 'mid' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setFilterBy('mid')}
          >
            Средние оценки
          </Button>
          <Button 
            variant={filterBy === 'low' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setFilterBy('low')}
          >
            Низкие оценки
          </Button>
        </div>
      )}
      
      {/* Список отзывов */}
      {filteredReviews.length > 0 ? (
        <div className="space-y-6">
          {filteredReviews.slice(0, visibleReviews).map((review) => {
            const isExpanded = expandedReviews.includes(review.id);
            const isLongComment = review.comment.length > 300;
            
            return (
              <div key={review.id} className="border-b pb-6 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                      {review.userAvatar ? (
                        <Image
                          src={review.userAvatar}
                          alt={review.userName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                          <UserIcon className="h-6 w-6 text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{review.userName}</h4>
                      <p className="text-sm text-gray-500">{formatReviewDate(review.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <StarRating rating={review.rating} />
                    <span className="font-medium ml-1">{review.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className={`text-gray-700 ${isLongComment && !isExpanded ? 'line-clamp-4' : ''}`}>
                    {review.comment}
                  </p>
                  
                  {isLongComment && (
                    <button
                      onClick={() => toggleReviewExpand(review.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm mt-1 font-medium"
                    >
                      {isExpanded ? 'Свернуть' : 'Читать полностью'}
                    </button>
                  )}
                </div>
                
                {/* Детальные оценки по категориям */}
                {review.categories && Object.keys(review.categories).length > 0 && (
                  <ReviewCategories categories={review.categories} />
                )}
                
                {/* Действия с отзывом */}
                <div className="flex mt-3">
                  <button className="text-gray-500 hover:text-gray-700 flex items-center text-sm mr-4">
                    <ThumbsUpIcon className="h-4 w-4 mr-1" />
                    Полезно
                  </button>
                </div>
              </div>
            );
          })}
          
          {/* Кнопка "Показать еще" */}
          {filteredReviews.length > visibleReviews && (
            <div className="text-center mt-6">
              <Button 
                variant="outline" 
                onClick={showMoreReviews}
              >
                Показать еще отзывы
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <MessageIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-800 mb-1">
            {filterBy ? 'Нет отзывов с выбранными параметрами' : 'Отзывов пока нет'}
          </h3>
          <p className="text-gray-600">
            {filterBy 
              ? 'Попробуйте изменить параметры фильтрации'
              : 'Будьте первым, кто оставит отзыв об этом транспортном средстве!'}
          </p>
          
          {canAddReview && !filterBy && (
            <Button
              className="mt-4"
              onClick={onAddReview}
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Оставить отзыв
            </Button>
          )}
        </div>
      )}
    </div>
  );
} 