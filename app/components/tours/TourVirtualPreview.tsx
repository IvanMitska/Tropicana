import React, { useState, useEffect, useRef } from 'react';
import { TourRoute, RoutePoint } from '../../models/Tour';

interface TourVirtualPreviewProps {
  route: TourRoute;
  meetingPoint: {
    lat: number;
    lng: number;
  };
}

const TourVirtualPreview: React.FC<TourVirtualPreviewProps> = ({ route, meetingPoint }) => {
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Преобразование данных маршрута
  const routePoints = [...route.points].sort((a, b) => a.order - b.order);
  const allPoints = [
    { 
      name: 'Место встречи', 
      description: 'Начало экскурсии', 
      coordinates: meetingPoint, 
      duration: 0, 
      order: 0 
    } as RoutePoint,
    ...routePoints
  ];
  
  // Генерация ссылки для просмотра на Google Street View
  const generateStreetViewUrl = (point: RoutePoint) => {
    const { lat, lng } = point.coordinates;
    return `https://www.google.com/maps/embed?pb=!4v1&center=${lat},${lng}&heading=0&pitch=0&fov=90&h=450&t=m&outdoor=1`;
  };
  
  // Запуск анимации
  const startVirtualTour = () => {
    setIsPlaying(true);
    setCurrentPointIndex(0);
    setProgress(0);
  };
  
  // Остановка анимации
  const stopVirtualTour = () => {
    setIsPlaying(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  
  // Перейти к следующей точке
  const nextPoint = () => {
    if (currentPointIndex < allPoints.length - 1) {
      setCurrentPointIndex(currentPointIndex + 1);
      setProgress(0);
    } else {
      stopVirtualTour();
    }
  };
  
  // Перейти к предыдущей точке
  const prevPoint = () => {
    if (currentPointIndex > 0) {
      setCurrentPointIndex(currentPointIndex - 1);
      setProgress(0);
    }
  };
  
  // Эффект для управления анимацией перехода между точками
  useEffect(() => {
    if (!isPlaying) return;
    
    const currentPoint = allPoints[currentPointIndex];
    const duration = currentPoint.duration * 1000; // в миллисекундах
    
    if (duration <= 0) {
      // Если точка не требует времени, сразу переходим к следующей
      if (currentPointIndex < allPoints.length - 1) {
        timeoutRef.current = setTimeout(() => {
          nextPoint();
        }, 2000); // Просто показываем на 2 секунды
      } else {
        stopVirtualTour();
      }
      return;
    }
    
    const interval = 100; // Обновляем прогресс каждые 100мс
    const steps = duration / interval;
    let currentStep = 0;
    
    const progressInterval = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / steps) * 100;
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        clearInterval(progressInterval);
        
        if (currentPointIndex < allPoints.length - 1) {
          timeoutRef.current = setTimeout(() => {
            nextPoint();
          }, 500);
        } else {
          stopVirtualTour();
        }
      }
    }, interval);
    
    return () => {
      clearInterval(progressInterval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentPointIndex, isPlaying, allPoints]);
  
  // Очистка таймаутов при размонтировании компонента
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  const currentPoint = allPoints[currentPointIndex];
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-xl font-semibold mb-1">Виртуальная экскурсия</h3>
        <p className="text-gray-600 text-sm">
          Пройдите по маршруту экскурсии в виртуальном режиме
        </p>
      </div>
      
      {/* Интерфейс предпросмотра */}
      <div className="relative">
        {/* Street View */}
        <div className="relative h-[400px] w-full bg-gray-200">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}
          <iframe
            ref={iframeRef}
            src={generateStreetViewUrl(currentPoint)}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setIframeLoaded(true)}
            className={iframeLoaded ? 'opacity-100' : 'opacity-0'}
          />
          
          {/* Прогресс */}
          {isPlaying && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
              <div 
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
        
        {/* Информация о точке */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
          <h4 className="font-semibold text-lg">{currentPoint.name}</h4>
          {currentPoint.description && (
            <p className="text-sm text-gray-200">{currentPoint.description}</p>
          )}
        </div>
        
        {/* Индикатор прогресса маршрута */}
        <div className="absolute top-4 left-4 right-4 bg-white bg-opacity-70 rounded-lg p-2">
          <div className="flex items-center">
            <span className="text-sm font-medium">{currentPointIndex + 1} / {allPoints.length}</span>
            <div className="flex-1 h-1 bg-gray-200 mx-3 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500"
                style={{ width: `${(currentPointIndex / (allPoints.length - 1)) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm">{allPoints[allPoints.length - 1].name}</span>
          </div>
        </div>
        
        {/* Элементы управления */}
        <div className="absolute bottom-20 left-4 right-4 flex justify-center">
          <div className="flex space-x-2 bg-black bg-opacity-70 rounded-full px-4 py-2">
            <button 
              className="text-white p-2 rounded-full hover:bg-gray-700 transition"
              onClick={prevPoint}
              disabled={currentPointIndex === 0}
              title="Предыдущая точка"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
              </svg>
            </button>
            
            {isPlaying ? (
              <button 
                className="text-white p-2 rounded-full hover:bg-gray-700 transition"
                onClick={stopVirtualTour}
                title="Пауза"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
                </svg>
              </button>
            ) : (
              <button 
                className="text-white p-2 rounded-full hover:bg-gray-700 transition"
                onClick={startVirtualTour}
                title="Запустить тур"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
              </button>
            )}
            
            <button 
              className="text-white p-2 rounded-full hover:bg-gray-700 transition"
              onClick={nextPoint}
              disabled={currentPointIndex === allPoints.length - 1}
              title="Следующая точка"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Точки маршрута */}
      <div className="p-4">
        <h4 className="font-semibold mb-3">Маршрут экскурсии</h4>
        <div className="space-y-4">
          {allPoints.map((point, index) => (
            <div 
              key={index} 
              className={`flex items-start cursor-pointer p-2 rounded-md transition ${
                index === currentPointIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => {
                setCurrentPointIndex(index);
                setProgress(0);
                setIsPlaying(false);
              }}
            >
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
                {index + 1}
              </div>
              <div>
                <h5 className="font-medium">{point.name}</h5>
                {point.description && (
                  <p className="text-sm text-gray-600">{point.description}</p>
                )}
                {point.duration > 0 && (
                  <p className="text-xs text-gray-500 mt-1">Примерное время: {point.duration} мин.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourVirtualPreview; 