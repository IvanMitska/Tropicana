'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

interface LocationProps {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number];
  carCount: number;
  bikeCount: number;
  boatCount: number;
}

const locations: LocationProps[] = [
  {
    id: 'patong',
    name: 'Патонг',
    description: 'Главный туристический район Пхукета с наибольшим выбором транспорта',
    coordinates: [7.9, 98.3],
    carCount: 58,
    bikeCount: 42,
    boatCount: 12,
  },
  {
    id: 'phuket-town',
    name: 'Пхукет Таун',
    description: 'Административный центр острова с удобной транспортной доступностью',
    coordinates: [7.95, 98.4],
    carCount: 35,
    bikeCount: 28,
    boatCount: 0,
  },
  {
    id: 'kata',
    name: 'Ката Бич',
    description: 'Популярный пляж с развитой инфраструктурой и множеством вариантов аренды',
    coordinates: [7.85, 98.3],
    carCount: 22,
    bikeCount: 31,
    boatCount: 8,
  },
  {
    id: 'chalong',
    name: 'Чалонг',
    description: 'Морской порт с большим выбором яхт и катеров для аренды',
    coordinates: [7.8, 98.35],
    carCount: 15,
    bikeCount: 19,
    boatCount: 25,
  },
];

const VehicleMap: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 relative overflow-hidden bg-dark">
      <div className="absolute inset-0 bg-[url('/images/placeholder.svg')] bg-cover bg-center opacity-20"></div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/80 to-dark/40"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/90"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Пункты проката <span className="text-primary">на Пхукете</span>
          </h2>
          <p className="text-light/70 text-lg">
            Выбирайте наиболее удобную локацию для получения и возврата транспорта
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1">
            <div className="space-y-6">
              {locations.map((location, index) => (
                <div 
                  key={location.id}
                  className={`bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-primary/30 transition-all duration-500 cursor-pointer ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${150 * index}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/20 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{location.name}</h3>
                      <p className="text-white/70 text-sm mb-3">{location.description}</p>
                      
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-white/10 rounded-lg p-2">
                          <div className="text-primary font-bold">{location.carCount}</div>
                          <div className="text-white/50 text-xs">Авто</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2">
                          <div className="text-primary font-bold">{location.bikeCount}</div>
                          <div className="text-white/50 text-xs">Байки</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2">
                          <div className="text-primary font-bold">{location.boatCount}</div>
                          <div className="text-white/50 text-xs">Лодки</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="col-span-2">
            <div 
              className={`relative h-[500px] rounded-xl overflow-hidden border border-white/10 transition-all duration-1000 ${
                inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <Image
                src="/images/placeholder.svg"
                alt="Карта пунктов проката на Пхукете"
                fill
                className="object-cover"
              />
              
              <div className="absolute inset-0 bg-dark/20"></div>
              
              {/* Маркеры на карте */}
              {locations.map((location, index) => (
                <div 
                  key={location.id}
                  className="absolute z-10"
                  style={{ 
                    left: `${(location.coordinates[1] - 98.2) * 300}%`, 
                    top: `${(8.0 - location.coordinates[0]) * 500}%`,
                    transitionDelay: `${500 + 150 * index}ms`
                  }}
                >
                  <div 
                    className={`bg-primary text-dark font-bold rounded-full w-8 h-8 flex items-center justify-center border-2 border-white transition-all duration-700 hover:scale-125 ${
                      inView ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`}
                  >
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleMap; 