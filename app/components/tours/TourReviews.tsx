import React, { useState } from 'react';
import Image from 'next/image';
import { TourReview } from '../../models/Tour';

interface TourReviewsProps {
  reviews: TourReview[];
  avgRating: number;
  reviewCount: number;
  categoryRatings?: {
    organization: number;
    interestingness: number; 
    knowledge: number;
    friendliness: number;
    [key: string]: number;
  };
}

const TourReviews: React.FC<TourReviewsProps> = ({ 
  reviews, 
  avgRating, 
  reviewCount, 
  categoryRatings 
}) => {
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Фильтрация отзывов
  const filteredReviews = reviews.filter(review => {
    // Фильтр по рейтингу
    if (ratingFilter !== null && review.rating !== ratingFilter) {
      return false;
    }
    
    // Фильтр по поиску
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return review.comment.toLowerCase().includes(query) || 
             review.userName.toLowerCase().includes(query);
    }
    
    return true;
  });
  
  // Формирование счетчиков по рейтингам
  const ratingCounts = reviews.reduce((counts, review) => {
    counts[review.rating] = (counts[review.rating] || 0) + 1;
    return counts;
  }, {} as Record<number, number>);
  
  // Процент каждого рейтинга
  const getRatingPercentage = (rating: number) => {
    const count = ratingCounts[rating] || 0;
    return reviewCount > 0 ? Math.round((count / reviewCount) * 100) : 0;
  };
  
  return (
    <div>
      {/* Суммарный рейтинг */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Отзывы клиентов</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Общий рейтинг */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-yellow-500 mr-2">{avgRating.toFixed(1)}</span>
              <div className="flex text-yellow-500">
                {[1, 2, 3, 4, 5].map(star => (
                  <svg 
                    key={star}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill={star <= Math.round(avgRating) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-500">({reviewCount} отзывов)</span>
            </div>
            
            {/* Гистограмма рейтингов */}
            <div className="space-y-2 mt-4">
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center">
                  <span className="w-6 text-sm text-gray-600">{rating}</span>
                  <div className="flex-1 h-2 mx-2 bg-gray-200 rounded">
                    <div 
                      className="h-2 bg-yellow-500 rounded"
                      style={{ width: `${getRatingPercentage(rating)}%` }}
                    ></div>
                  </div>
                  <span className="w-8 text-xs text-gray-500 text-right">
                    {getRatingPercentage(rating)}%
                  </span>
                </div>
              ))}
            </div>
            
            {/* Кнопка оставить отзыв */}
            <button 
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              onClick={() => setIsModalOpen(true)}
            >
              Оставить отзыв
            </button>
          </div>
          
          {/* Рейтинги по категориям */}
          {categoryRatings && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-medium mb-4">Оценка по категориям</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Организация</span>
                  <div className="flex items-center">
                    <span className="mr-2 font-medium">{categoryRatings.organization.toFixed(1)}</span>
                    <div className="w-24 h-2 bg-gray-200 rounded">
                      <div 
                        className="h-2 bg-blue-500 rounded"
                        style={{ width: `${(categoryRatings.organization / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Интересность</span>
                  <div className="flex items-center">
                    <span className="mr-2 font-medium">{categoryRatings.interestingness.toFixed(1)}</span>
                    <div className="w-24 h-2 bg-gray-200 rounded">
                      <div 
                        className="h-2 bg-blue-500 rounded"
                        style={{ width: `${(categoryRatings.interestingness / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Знания гида</span>
                  <div className="flex items-center">
                    <span className="mr-2 font-medium">{categoryRatings.knowledge.toFixed(1)}</span>
                    <div className="w-24 h-2 bg-gray-200 rounded">
                      <div 
                        className="h-2 bg-blue-500 rounded"
                        style={{ width: `${(categoryRatings.knowledge / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Дружелюбность</span>
                  <div className="flex items-center">
                    <span className="mr-2 font-medium">{categoryRatings.friendliness.toFixed(1)}</span>
                    <div className="w-24 h-2 bg-gray-200 rounded">
                      <div 
                        className="h-2 bg-blue-500 rounded"
                        style={{ width: `${(categoryRatings.friendliness / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                {/* Другие категории рейтингов */}
                {Object.entries(categoryRatings)
                  .filter(([key]) => !['organization', 'interestingness', 'knowledge', 'friendliness'].includes(key))
                  .map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      <div className="flex items-center">
                        <span className="mr-2 font-medium">{value.toFixed(1)}</span>
                        <div className="w-24 h-2 bg-gray-200 rounded">
                          <div 
                            className="h-2 bg-blue-500 rounded"
                            style={{ width: `${(value / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Поиск и фильтры */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[300px]">
          <input
            type="text"
            placeholder="Поиск по отзывам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="flex space-x-2">
          {[5, 4, 3, 2, 1].map(rating => (
            <button
              key={rating}
              className={`px-3 py-1 rounded-md border ${
                ratingFilter === rating 
                  ? 'bg-blue-500 text-white border-blue-500' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setRatingFilter(ratingFilter === rating ? null : rating)}
            >
              {rating}
            </button>
          ))}
          {ratingFilter !== null && (
            <button
              className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              onClick={() => setRatingFilter(null)}
            >
              Сбросить
            </button>
          )}
        </div>
      </div>
      
      {/* Список отзывов */}
      <div className="space-y-6">
        {filteredReviews.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">Нет отзывов, соответствующих вашим критериям</p>
          </div>
        ) : (
          filteredReviews.map(review => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                {/* Аватар пользователя */}
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    {review.userAvatar ? (
                      <Image 
                        src={review.userAvatar} 
                        alt={review.userName}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500">
                        {review.userName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Содержимое отзыва */}
                <div className="flex-1">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{review.userName}</h4>
                      <p className="text-gray-500 text-sm">{new Date(review.date).toLocaleDateString('ru-RU')}</p>
                    </div>
                    <div className="flex text-yellow-500">
                      {[1, 2, 3, 4, 5].map(star => (
                        <svg 
                          key={star}
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill={star <= review.rating ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  {/* Текст отзыва */}
                  <p className="text-gray-700 mb-4">{review.comment}</p>
                  
                  {/* Рейтинги по категориям (если есть) */}
                  {review.categories && Object.keys(review.categories).length > 0 && (
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
                      {Object.entries(review.categories).map(([category, rating]) => (
                        <div key={category} className="flex items-center text-xs">
                          <span className="text-gray-600 mr-1">
                            {category.charAt(0).toUpperCase() + category.slice(1)}:
                          </span>
                          <span className="font-medium">{rating}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Модальное окно для отправки отзыва */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Оставить отзыв</h3>
              <button onClick={() => setIsModalOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Общий рейтинг */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Общая оценка</label>
                <div className="flex text-yellow-500">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} className="w-10 h-10">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                        className="w-full h-full"
                      >
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Оценки по категориям */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Организация</label>
                  <select className="w-full border rounded-md px-3 py-2">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <option key={rating} value={rating}>{rating}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Интересность</label>
                  <select className="w-full border rounded-md px-3 py-2">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <option key={rating} value={rating}>{rating}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Знания гида</label>
                  <select className="w-full border rounded-md px-3 py-2">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <option key={rating} value={rating}>{rating}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Дружелюбность</label>
                  <select className="w-full border rounded-md px-3 py-2">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <option key={rating} value={rating}>{rating}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Текст отзыва */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ваш отзыв</label>
                <textarea 
                  rows={5}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Поделитесь своими впечатлениями от экскурсии..."
                />
              </div>
              
              {/* Загрузка фото */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Добавить фото (необязательно)</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="pt-1 text-sm text-gray-500">
                        Перетащите изображения сюда или нажмите, чтобы выбрать
                      </p>
                    </div>
                    <input type="file" className="hidden" multiple accept="image/*" />
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <button 
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400 transition"
                  onClick={() => setIsModalOpen(false)}
                >
                  Отмена
                </button>
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  onClick={() => {
                    // Здесь будет логика отправки отзыва
                    setIsModalOpen(false);
                  }}
                >
                  Отправить отзыв
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourReviews; 