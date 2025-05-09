import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { Tour } from '../../models/Tour';

interface TourMapProps {
  tours: Tour[];
}

// Центр карты по умолчанию (Москва)
const DEFAULT_CENTER: [number, number] = [55.7558, 37.6173];
const DEFAULT_ZOOM = 10;

// Компонент для управления перемещением карты
const MapController: React.FC<{
  center?: [number, number];
  zoom?: number;
}> = ({ center = DEFAULT_CENTER, zoom = DEFAULT_ZOOM }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null;
};

const TourMap: React.FC<TourMapProps> = ({ tours }) => {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState<number>(DEFAULT_ZOOM);
  const popupRef = useRef<L.Popup>(null);

  // Функция для получения центра карты на основе списка экскурсий
  useEffect(() => {
    if (tours.length > 0) {
      // Если выбрана экскурсия, центрируем на ней
      if (selectedTour) {
        const { lat, lng } = selectedTour.location.meetingPoint.coordinates;
        setMapCenter([lat, lng]);
        setMapZoom(15); // Более близкий зум для детального просмотра
      } else {
        // Если экскурсий много, вычисляем центр всех координат
        if (tours.length > 1) {
          const allCoords = tours.map(tour => tour.location.meetingPoint.coordinates);
          const latSum = allCoords.reduce((sum, coord) => sum + coord.lat, 0);
          const lngSum = allCoords.reduce((sum, coord) => sum + coord.lng, 0);
          
          setMapCenter([latSum / tours.length, lngSum / tours.length]);
          setMapZoom(10); // Более широкий зум для общего обзора
        } else if (tours.length === 1) {
          // Если одна экскурсия, центрируем на ней
          const { lat, lng } = tours[0].location.meetingPoint.coordinates;
          setMapCenter([lat, lng]);
          setMapZoom(13);
        }
      }
    }
  }, [tours, selectedTour]);

  // Функции для форматирования
  const formatPrice = (tour: Tour) => {
    const { basePrice, currency, priceType } = tour.pricing;
    const currencySymbol = currency === 'RUB' ? '₽' : currency;
    
    return `${basePrice.toLocaleString()} ${currencySymbol}${priceType === 'perPerson' ? '/чел.' : '/группа'}`;
  };

  const formatDuration = (duration: number) => {
    if (duration < 1) {
      return `${Math.round(duration * 60)} минут`;
    }
    
    if (duration === 1) {
      return '1 час';
    }
    
    if (duration > 1 && duration < 5) {
      return `${duration} часа`;
    }
    
    return `${duration} часов`;
  };

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      style={{ height: '100%', width: '100%' }}
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Контроллер для управления картой */}
      <MapController center={mapCenter} zoom={mapZoom} />
      
      {/* Маркеры экскурсий */}
      {tours.map(tour => {
        const { lat, lng } = tour.location.meetingPoint.coordinates;
        
        return (
          <Marker
            key={tour.id}
            position={[lat, lng]}
            eventHandlers={{
              click: () => {
                setSelectedTour(tour);
              },
              mouseover: (e) => {
                const popup = L.popup()
                  .setLatLng([lat, lng])
                  .setContent(`
                    <div style="min-width: 200px;">
                      <h3 style="font-weight: bold; margin-bottom: 5px;">${tour.title}</h3>
                      <p style="margin: 0; margin-bottom: 3px;">Цена: ${formatPrice(tour)}</p>
                      <p style="margin: 0; margin-bottom: 3px;">Длительность: ${formatDuration(tour.duration)}</p>
                      <p style="margin: 0; color: gray;">Нажмите для деталей</p>
                    </div>
                  `)
                  .openOn(e.target._map);
                
                // Сохраняем ссылку на созданный popup
                popupRef.current = popup;
              },
              mouseout: (e) => {
                // Закрываем popup при уходе мыши
                if (popupRef.current) {
                  e.target._map.closePopup(popupRef.current);
                  popupRef.current = null;
                }
              },
            }}
          >
            <Popup minWidth={300}>
              <div className="tour-popup">
                <h3 className="font-bold text-lg mb-2">{tour.title}</h3>
                <p className="text-gray-700 mb-2">{tour.description.substring(0, 100)}...</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <div>{formatDuration(tour.duration)}</div>
                    <div>Рейтинг: {tour.rating.toFixed(1)}</div>
                  </div>
                  <div className="font-bold text-blue-600">{formatPrice(tour)}</div>
                </div>
                <a 
                  href={`/tours/${tour.id}`} 
                  className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm text-center w-full"
                >
                  Подробнее
                </a>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default TourMap; 