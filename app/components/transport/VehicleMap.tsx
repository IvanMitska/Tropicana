'use client';

import React from 'react';
import { MapPin } from 'lucide-react';

interface VehicleMapProps {
  lat: number;
  lng: number;
  title: string;
  zoom?: number;
}

export default function VehicleMap({ lat, lng, title, zoom = 14 }: VehicleMapProps) {
  // Заглушка для карты
  // В реальном проекте вы бы использовали Google Maps, Mapbox, Yandex Maps или другую карту
  return (
    <div className="relative h-full w-full bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <MapPin className="h-8 w-8 text-red-500 mx-auto mb-2" />
        <p className="font-medium mb-1">{title}</p>
        <p className="text-sm text-gray-500">
          {lat.toFixed(6)}, {lng.toFixed(6)}
        </p>
        <p className="text-xs text-gray-400 mt-4">
          Карта не отображается в данной версии приложения
        </p>
        <a 
          href={`https://www.google.com/maps?q=${lat},${lng}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm text-blue-500 hover:text-blue-700"
        >
          Открыть в Google Maps
        </a>
      </div>
    </div>
  );
} 