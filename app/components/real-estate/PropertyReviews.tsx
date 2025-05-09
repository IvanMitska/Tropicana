'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Review } from '@/app/models/Property';
import { StarIcon, FilterIcon } from 'lucide-react';
import { getPropertyReviews } from '@/app/lib/api/properties';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface PropertyReviewsProps {
  propertyId: string;
  initialReviews: Review[];
  totalReviews: number;
  rating: number;
}

export default function PropertyReviews({
  propertyId,
  initialReviews,
  totalReviews,
  rating,
}: PropertyReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalReviews / 5));
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Загрузка отзывов с учетом пагинации и фильтрации
  const loadReviews = async (page: number, filterValue: string = '') => {
    setIsLoading(true);
    try {
      const result = await getPropertyReviews(propertyId, page, 5, filterValue);
      setReviews(result.reviews);
      setTotalPages(Math.ceil(result.total / 5));
    } catch (error) {
      console.error('Ошибка при загрузке отзывов:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage > 1 || filter) {
      loadReviews(currentPage, filter);
    }
  }, [currentPage, filter, propertyId]);

  // Обработчик изменения страницы
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Обработчик применения фильтра
  const applyFilter = (filterValue: string) => {
    setFilter(filterValue);
    setCurrentPage(1);
    setShowFilterModal(false);
  };

  // Форматирование даты
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return format(date, 'LLLL yyyy', { locale: ru });
    } catch (error) {
      return dateString;
    }
  };

  // Получение среднего рейтинга по категориям
  const averageRatingsByCategory = () => {
    if (!reviews.length) return {};

    const categories = Object.keys(reviews[0].categories);
    const result: Record<string, number> = {};

    categories.forEach((category) => {
      const sum = reviews.reduce(
        (acc, review) => acc + (review.categories[category] || 0),
        0
      );
      result[category] = parseFloat((sum / reviews.length).toFixed(1));
    });

    return result;
  };

  const categoryNames: Record<string, string> = {
    cleanliness: 'Чистота',
    communication: 'Общение',
    location: 'Расположение',
    value: 'Соотношение цена/качество',
  };

  const avgRatings = averageRatingsByCategory();

  return (
    <div id="reviews">
      <h2 className="text-xl font-semibold mb-4">
        Отзывы ({totalReviews}) • {rating.toFixed(1)}{' '}
        <StarIcon className="inline-block h-5 w-5 text-yellow-500" />
      </h2>

      {/* Рейтинги по категориям */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {Object.entries(avgRatings).map(([category, value]) => (
          <div key={category} className="flex items-center">
            <div className="w-32">{categoryNames[category] || category}</div>
            <div className="flex-grow">
              <div className="bg-gray-200 h-2 rounded-full w-full">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(value / 5) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="ml-2 font-medium">{value}</div>
          </div>
        ))}
      </div>

      {/* Кнопка фильтрации */}
      <div className="mb-4">
        <button
          onClick={() => setShowFilterModal(true)}
          className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <FilterIcon className="h-4 w-4 mr-2" />
          Фильтровать отзывы
        </button>
      </div>

      {/* Модальное окно фильтра */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Фильтр отзывов</h3>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Поиск по содержанию отзыва"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowFilterModal(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                onClick={() => applyFilter(filter)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Применить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Список отзывов */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-500">Загрузка отзывов...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Нет отзывов, соответствующих критериям фильтрации
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6">
              <div className="flex items-start mb-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={review.userAvatar || '/placeholder.jpg'}
                    alt={review.userName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{review.userName}</h3>
                  <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
                </div>
                <div className="ml-auto flex items-center">
                  <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{review.rating}</span>
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))
        )}
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="flex items-center space-x-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              &gt;
            </button>
          </nav>
        </div>
      )}
    </div>
  );
} 