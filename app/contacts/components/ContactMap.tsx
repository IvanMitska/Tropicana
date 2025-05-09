'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface ContactMapProps {
  selectedOffice: string | null;
}

const offices = {
  main: {
    lat: 55.7558,
    lng: 37.6173,
    name: 'Главный офис',
    address: 'ул. Примерная, 123, Москва'
  },
  branch1: {
    lat: 55.7517,
    lng: 37.6178,
    name: 'Филиал №1',
    address: 'пр. Центральный, 45, Москва'
  }
};

export default function ContactMap({ selectedOffice }: ContactMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [infoWindows, setInfoWindows] = useState<google.maps.InfoWindow[]>([]);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        version: 'weekly',
        libraries: ['places']
      });

      try {
        const google = await loader.load();
        
        if (mapRef.current) {
          const initialMap = new google.maps.Map(mapRef.current, {
            center: { lat: 55.7558, lng: 37.6173 },
            zoom: 12,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          });

          setMap(initialMap);

          // Создаем маркеры для каждого офиса
          const newMarkers: google.maps.Marker[] = [];
          const newInfoWindows: google.maps.InfoWindow[] = [];

          Object.entries(offices).forEach(([id, office]) => {
            const marker = new google.maps.Marker({
              position: { lat: office.lat, lng: office.lng },
              map: initialMap,
              title: office.name,
              animation: google.maps.Animation.DROP
            });

            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div class="p-2">
                  <h3 class="font-semibold">${office.name}</h3>
                  <p>${office.address}</p>
                  <a href="https://www.google.com/maps/dir/?api=1&destination=${office.lat},${office.lng}" 
                     target="_blank" 
                     class="text-blue-600 hover:underline mt-2 inline-block">
                    Построить маршрут
                  </a>
                </div>
              `
            });

            marker.addListener('click', () => {
              infoWindows.forEach(iw => iw.close());
              infoWindow.open(initialMap, marker);
            });

            newMarkers.push(marker);
            newInfoWindows.push(infoWindow);
          });

          setMarkers(newMarkers);
          setInfoWindows(newInfoWindows);
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();
  }, []);

  useEffect(() => {
    if (map && selectedOffice) {
      const office = offices[selectedOffice as keyof typeof offices];
      if (office) {
        map.panTo({ lat: office.lat, lng: office.lng });
        map.setZoom(15);

        // Находим соответствующий маркер и открываем его информационное окно
        const markerIndex = Object.keys(offices).indexOf(selectedOffice);
        if (markerIndex !== -1 && infoWindows[markerIndex]) {
          infoWindows.forEach(iw => iw.close());
          infoWindows[markerIndex].open(map, markers[markerIndex]);
        }
      }
    }
  }, [selectedOffice, map, markers, infoWindows]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Карта офисов</h2>
      <div 
        ref={mapRef} 
        className="w-full h-[500px] rounded-lg"
      />
    </div>
  );
} 