import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { TourRoute } from '../../models/Tour';

interface TourRouteMapProps {
  route: TourRoute;
  meetingPoint: {
    lat: number;
    lng: number;
  };
}

// Компонент для центрирования карты
const MapController: React.FC<{
  center: [number, number];
  zoom: number;
}> = ({ center, zoom }) => {
  const map = useMap();
  // Центрируем карту при изменении центра или масштаба
  React.useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
};

const TourRouteMap: React.FC<TourRouteMapProps> = ({ route, meetingPoint }) => {
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);
  
  // Преобразуем точки маршрута в координаты для полилинии
  const routePoints = useMemo(() => {
    if (!route.points || route.points.length === 0) {
      return [];
    }
    
    // Сортируем точки по порядку
    const sortedPoints = [...route.points].sort((a, b) => a.order - b.order);
    
    // Преобразуем в формат для полилинии
    return sortedPoints.map(point => [
      point.coordinates.lat,
      point.coordinates.lng
    ] as [number, number]);
  }, [route.points]);
  
  // Определяем центр карты
  const mapCenter = useMemo(() => {
    if (routePoints.length === 0) {
      return [meetingPoint.lat, meetingPoint.lng] as [number, number];
    }
    
    // Вычисляем центр как среднее всех точек маршрута
    const lats = routePoints.map(point => point[0]);
    const lngs = routePoints.map(point => point[1]);
    
    const centerLat = lats.reduce((sum, lat) => sum + lat, 0) / lats.length;
    const centerLng = lngs.reduce((sum, lng) => sum + lng, 0) / lngs.length;
    
    return [centerLat, centerLng] as [number, number];
  }, [routePoints, meetingPoint]);
  
  // Определяем зум карты
  const mapZoom = useMemo(() => {
    if (routePoints.length <= 1) {
      return 15;
    }
    
    // Логика определения оптимального зума на основе расстояния между точками
    return 13;
  }, [routePoints]);
  
  // Цвета полилинии в зависимости от типа маршрута
  const routeColor = useMemo(() => {
    switch(route.type) {
      case 'walking':
        return '#3B82F6'; // blue-500
      case 'transport':
        return '#10B981'; // emerald-500
      case 'mixed':
        return '#8B5CF6'; // violet-500
      default:
        return '#3B82F6';
    }
  }, [route.type]);
  
  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      style={{ height: '100%', width: '100%' }}
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Контроллер для центрирования карты */}
      <MapController center={mapCenter} zoom={mapZoom} />
      
      {/* Точка встречи (выделяем отдельно) */}
      <Marker 
        position={[meetingPoint.lat, meetingPoint.lng]}
      >
        <Popup>
          <div>
            <h3 className="font-bold">Место встречи</h3>
          </div>
        </Popup>
      </Marker>
      
      {/* Маршрут экскурсии */}
      {routePoints.length > 1 && (
        <Polyline
          positions={routePoints}
          pathOptions={{ color: routeColor, weight: 4 }}
        />
      )}
      
      {/* Точки маршрута */}
      {route.points && route.points.length > 0 && route.points
        .sort((a, b) => a.order - b.order)
        .map((point, index) => {
          const isActive = activePointIndex === index;
          
          return (
            <React.Fragment key={`point-${index}`}>
              {/* Круг вокруг активной точки */}
              {isActive && (
                <Circle
                  center={[point.coordinates.lat, point.coordinates.lng]}
                  radius={50}
                  pathOptions={{ color: routeColor, fillColor: routeColor, fillOpacity: 0.2 }}
                />
              )}
              
              {/* Маркер точки маршрута */}
              <Marker
                position={[point.coordinates.lat, point.coordinates.lng]}
                eventHandlers={{
                  click: () => setActivePointIndex(index),
                  mouseover: () => setActivePointIndex(index),
                  mouseout: () => setActivePointIndex(null)
                }}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold">{point.name}</h3>
                    {point.description && (
                      <p className="text-sm">{point.description}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Примерное время: {point.duration} мин.</p>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })
      }
    </MapContainer>
  );
};

export default TourRouteMap; 