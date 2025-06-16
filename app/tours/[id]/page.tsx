'use client';

import React, { useMemo, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import MainLayout from '../../components/layout/MainLayout';
import TourImageGallery from '../../components/tours/TourImageGallery';
import TourBookingWidget from '../../components/tours/TourBookingWidget';
import TourReviews from '../../components/tours/TourReviews';
import SimilarTours from '../../components/tours/SimilarTours';
import { tourAPI } from '../../lib/api';
import { Tour, TourReview } from '../../models/Tour';
import Link from 'next/link';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const tabs = [
  { id: 'description', label: 'Описание' },
  { id: 'route', label: 'Маршрут' },
  { id: 'included', label: 'Включено в стоимость' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'virtual', label: 'Виртуальный тур' },
];

// Создаем клиент React Query для этой страницы
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Компонент-обертка с провайдером
function TourDetailPageWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <TourDetailPage />
    </QueryClientProvider>
  );
}

export default TourDetailPageWrapper;

function TourDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('description');
  const [selectedDate, setSelectedDate] = useState('');
  const [participants, setParticipants] = useState(2);
  
  // Позволяет прокручивать к разделу по хэшу из URL
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && tabs.some(tab => tab.id === hash)) {
      setActiveTab(hash);
    }
  }, []);
  
  // Запрос данных об экскурсии
  const { data: tourData, isLoading, isError } = useQuery(
    ['tour', id],
    () => tourAPI.getById(id as string),
    {
      enabled: !!id,
    }
  );
  
  const tour: Tour | undefined = tourData?.data;

  // Запрос отзывов об экскурсии
  const { data: reviewsData } = useQuery(
    ['tourReviews', id],
    () => tourAPI.getReviewsById(id as string),
    {
      enabled: !!id && activeTab === 'reviews',
    }
  );

  // Динамически импортируем компоненты карты, чтобы избежать проблем с SSR
  const TourRouteMap = useMemo(() => dynamic(
    () => import('../../components/tours/TourRouteMap'),
    { 
      loading: () => <div className="h-full w-full flex items-center justify-center">Загрузка карты...</div>,
      ssr: false 
    }
  ), []);
  
  const TourVirtualPreview = useMemo(() => dynamic(
    () => import('../../components/tours/TourVirtualPreview'),
    { 
      loading: () => <div className="h-full w-full flex items-center justify-center">Загрузка виртуального тура...</div>,
      ssr: false 
    }
  ), []);
  
  // Переключение вкладок с обновлением URL
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`${window.location.pathname}#${tabId}`, { scroll: false });
  };
  
  // Подготовка категорий рейтингов для компонента отзывов
  const getCategoryRatings = (reviews: TourReview[] = []) => {
    if (!reviews.length) return undefined;
    
    const categories = {
      organization: 0,
      interestingness: 0,
      knowledge: 0,
      friendliness: 0,
    };
    
    let countWithCategories = 0;
    
    // Собираем все возможные категории рейтингов
    reviews.forEach(review => {
      if (review.categories) {
        countWithCategories++;
        
        Object.entries(review.categories).forEach(([key, value]) => {
          if (key in categories) {
            categories[key as keyof typeof categories] += value;
          }
        });
      }
    });
    
    // Рассчитываем средние значения
    if (countWithCategories > 0) {
      Object.keys(categories).forEach(key => {
        categories[key as keyof typeof categories] /= countWithCategories;
      });
      
      return categories;
    }
    
    return undefined;
  };

  // Показываем загрузчик при загрузке данных
  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              </div>
              <div>
                <div className="h-48 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Показываем ошибку, если данные не загрузились
  if (isError || !tour) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl text-red-500 mb-4">Ошибка загрузки данных</h1>
            <p>Не удалось загрузить информацию об экскурсии. Пожалуйста, попробуйте позже.</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => router.push('/tours')}
            >
              Вернуться к списку экскурсий
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Определяем, есть ли у экскурсии видео
  const hasVideo = !!tour.video;

  const handleBooking = () => {
    if (!selectedDate) {
      alert('Пожалуйста, выберите дату');
      return;
    }
    
    // Здесь будет логика бронирования
    alert(`Тур ${tour.title} забронирован на ${selectedDate} для ${participants} человек`);
  };

  // Заглушка для изображений тура
  const PlaceholderImage = ({ text }: { text: string }) => (
    <div className="bg-gradient-to-br from-dark-light to-dark flex items-center justify-center text-white text-opacity-70 rounded-lg w-full h-full">
      {text}
    </div>
  );

  return (
    <MainLayout>
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Заголовок экскурсии */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Link href="/" className="text-gray-500 hover:text-primary">
                Главная
              </Link>
              <span>→</span>
              <Link href="/tours" className="text-gray-500 hover:text-primary">
                Экскурсии
              </Link>
              <span>→</span>
              <span className="text-dark font-medium">{tour.title}</span>
            </div>
            <h1 className="text-3xl font-bold">{tour.title}</h1>
          </div>
          
          {/* Галерея изображений */}
          <div className="mb-8">
            <TourImageGallery 
              images={tour.images} 
              videoUrl={tour.video}
              title={tour.title}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Основная информация (левая колонка) */}
            <div className="md:col-span-2">
              {/* Рейтинг и характеристики */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex text-yellow-500 mr-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <svg 
                          key={star}
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill={star <= Math.round(tour.rating) ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-yellow-500 font-bold text-lg">{tour.rating.toFixed(1)}</span>
                    <span className="text-gray-500 ml-2">({tour.reviewsCount} отзывов)</span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div>
                      <span className="block text-sm text-gray-500">Длительность</span>
                      <span className="font-semibold">{tour.duration} ч.</span>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500">Языки</span>
                      <span className="font-semibold">{tour.languages.join(', ')}</span>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500">Группа до</span>
                      <span className="font-semibold">{tour.pricing.maxParticipants} чел.</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {tour.tags.map(tag => (
                    <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Вкладки с информацией */}
              <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
                {/* Навигация по вкладкам */}
                <div className="flex overflow-x-auto border-b">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-600 hover:text-blue-600'
                      }`}
                      onClick={() => handleTabChange(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                
                {/* Содержимое вкладок */}
                <div className="p-6">
                  {/* Описание */}
                  {activeTab === 'description' && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Описание</h2>
                      <p className="text-gray-700 whitespace-pre-line">{tour.description}</p>
                    </div>
                  )}
                  
                  {/* Маршрут */}
                  {activeTab === 'route' && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Маршрут</h2>
                      {tour.route && tour.route.points.length > 0 ? (
                        <>
                          <div className="mb-4 h-[400px] relative">
                            <TourRouteMap 
                              route={tour.route}
                              meetingPoint={tour.location.meetingPoint.coordinates}
                            />
                          </div>
                          
                          <div className="space-y-4">
                            {tour.route.points.map((point, index) => (
                              <div key={index} className="flex">
                                <div className="flex-shrink-0 w-10 flex flex-col items-center">
                                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
                                    {index + 1}
                                  </div>
                                  {index < tour.route.points.length - 1 && (
                                    <div className="w-0.5 h-full bg-blue-200 ml-3"></div>
                                  )}
                                </div>
                                <div className="ml-4 pb-6">
                                  <h3 className="text-lg font-medium">{point.name}</h3>
                                  <p className="text-gray-600">{point.description}</p>
                                  <p className="text-sm text-gray-500 mt-1">Время: ~{point.duration} мин.</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-500">Детали маршрута не указаны</p>
                      )}
                    </div>
                  )}
                  
                  {/* Включено в стоимость */}
                  {activeTab === 'included' && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Что входит в стоимость</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-green-600 font-semibold mb-2">Включено</h3>
                          {tour.included && tour.included.length > 0 ? (
                            <ul className="space-y-2">
                              {tour.included.map((item, index) => (
                                <li key={index} className="flex items-start">
                                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500">Информация не указана</p>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="text-red-600 font-semibold mb-2">Не включено</h3>
                          {tour.notIncluded && tour.notIncluded.length > 0 ? (
                            <ul className="space-y-2">
                              {tour.notIncluded.map((item, index) => (
                                <li key={index} className="flex items-start">
                                  <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500">Информация не указана</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Отзывы */}
                  {activeTab === 'reviews' && (
                    <TourReviews
                      reviews={reviewsData?.data || []}
                      avgRating={tour.rating}
                      reviewCount={tour.reviewsCount}
                      categoryRatings={getCategoryRatings(reviewsData?.data || [])}
                    />
                  )}
                  
                  {/* Виртуальный тур */}
                  {activeTab === 'virtual' && tour.route && tour.route.points.length > 0 && (
                    <TourVirtualPreview
                      route={tour.route}
                      meetingPoint={tour.location.meetingPoint.coordinates}
                    />
                  )}
                </div>
              </div>
              
              {/* Информация о гиде */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-xl font-semibold mb-4">Гид</h2>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                      <Image 
                        src={tour.guide.photo || '/images/default-guide.jpg'} 
                        alt={tour.guide.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">{tour.guide.name}</h3>
                    {tour.guide.experience && (
                      <p className="text-gray-600">Опыт: {tour.guide.experience} лет</p>
                    )}
                    {tour.guide.languages && tour.guide.languages.length > 0 && (
                      <p className="text-gray-600">Языки: {tour.guide.languages.join(', ')}</p>
                    )}
                    {tour.guide.bio && (
                      <p className="text-gray-700 mt-2">{tour.guide.bio}</p>
                    )}
                    
                    {/* Контакты гида */}
                    {tour.guide.contacts && (
                      <div className="mt-3 flex space-x-3">
                        {tour.guide.contacts.phone && (
                          <a href={`tel:${tour.guide.contacts.phone}`} className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                              <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                            </svg>
                          </a>
                        )}
                        
                        {tour.guide.contacts.email && (
                          <a href={`mailto:${tour.guide.contacts.email}`} className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                            </svg>
                          </a>
                        )}
                        
                        {tour.guide.contacts.social?.telegram && (
                          <a href={tour.guide.contacts.social.telegram} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
                            </svg>
                          </a>
                        )}
                        
                        {tour.guide.contacts.social?.whatsapp && (
                          <a href={tour.guide.contacts.social.whatsapp} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Похожие экскурсии */}
              <div className="mb-6">
                <SimilarTours
                  currentTourId={tour.id}
                  category={tour.category}
                  city={tour.location.city}
                  tags={tour.tags}
                />
              </div>
            </div>
            
            {/* Боковая панель бронирования (правая колонка) */}
            <div>
              <TourBookingWidget tour={tour} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 