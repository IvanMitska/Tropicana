'use client';

import { useState, useEffect } from 'react';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { PropertyLocation, NearbyPlace } from '@/app/models/Property';

interface PropertyMapProps {
  location: PropertyLocation;
  title: string;
  address: string;
}

export default function PropertyMap({ location, title, address }: PropertyMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Функция для получения цвета маркера в зависимости от типа
  const getMarkerColor = (type: string): string => {
    switch (type) {
      case 'restaurant':
        return '#FF5722'; // Оранжевый
      case 'shop':
        return '#4CAF50'; // Зеленый
      case 'attraction':
        return '#2196F3'; // Синий
      case 'transport':
        return '#9C27B0'; // Фиолетовый
      default:
        return '#757575'; // Серый
    }
  };

  // Фильтрация мест поблизости по типу
  const filteredPlaces = selectedType
    ? location.nearby.filter((place) => place.type === selectedType)
    : location.nearby;

  // Инициализация и загрузка карты
  useEffect(() => {
    // Имитация загрузки карты
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
    
    // В реальном приложении здесь была бы инициализация карты с API (Google Maps, Yandex Maps, и т.д.)
    // Например:
    // const loadGoogleMaps = () => { ... };
    // loadGoogleMaps().then(() => setMapLoaded(true));
  }, []);

  // Типы окружения для фильтрации
  const nearbyTypes = Array.from(new Set(location.nearby.map((place) => place.type)));
  
  return (
    <div id="map">
      <h2 className="text-xl font-semibold mb-4">Расположение</h2>
      
      {/* Фильтры типов мест */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedType(null)}
          className={`px-3 py-1.5 text-sm rounded-full ${
            selectedType === null
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Все
        </button>
        {nearbyTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3 py-1.5 text-sm rounded-full ${
              selectedType === type
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type === 'restaurant' && 'Рестораны'}
            {type === 'shop' && 'Магазины'}
            {type === 'attraction' && 'Достопримечательности'}
            {type === 'transport' && 'Транспорт'}
            {!['restaurant', 'shop', 'attraction', 'transport'].includes(type) && type}
          </button>
        ))}
      </div>

      {/* Карта */}
      <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
        {!mapLoaded ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="h-full w-full">
            {/* Здесь была бы реальная карта, сейчас используем заглушку */}
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPinIcon className="h-12 w-12 mx-auto text-red-500" />
                <p className="mt-2 font-semibold">{title}</p>
                <p className="text-sm">{address}</p>
              </div>
            </div>

            {/* Маркеры мест поблизости */}
            {filteredPlaces.map((place, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  // Рандомное размещение на карте для демонстрации
                  left: `${30 + Math.random() * 40}%`,
                  top: `${30 + Math.random() * 40}%`,
                }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getMarkerColor(place.type) }}
                ></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Список мест поблизости */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPlaces.map((place, index) => (
          <NearbyPlaceItem key={index} place={place} />
        ))}
      </div>
    </div>
  );
}

// Компонент для отображения места поблизости
function NearbyPlaceItem({ place }: { place: NearbyPlace }) {
  return (
    <div className="flex items-start p-3 border border-gray-200 rounded-lg">
      <div
        className="w-3 h-3 rounded-full mt-1.5 mr-3 flex-shrink-0"
        style={{ backgroundColor: getMarkerColor(place.type) }}
      ></div>
      <div>
        <h3 className="font-medium">{place.name}</h3>
        <p className="text-sm text-gray-500">
          {place.distance} км от объекта • {getPlaceTypeName(place.type)}
        </p>
      </div>
    </div>
  );
}

// Получение цвета маркера в зависимости от типа
function getMarkerColor(type: string): string {
  switch (type) {
    case 'restaurant':
      return '#FF5722'; // Оранжевый
    case 'shop':
      return '#4CAF50'; // Зеленый
    case 'attraction':
      return '#2196F3'; // Синий
    case 'transport':
      return '#9C27B0'; // Фиолетовый
    default:
      return '#757575'; // Серый
  }
}

// Получение названия типа места
function getPlaceTypeName(type: string): string {
  switch (type) {
    case 'restaurant':
      return 'Ресторан';
    case 'shop':
      return 'Магазин';
    case 'attraction':
      return 'Достопримечательность';
    case 'transport':
      return 'Транспорт';
    default:
      return type;
  }
} 