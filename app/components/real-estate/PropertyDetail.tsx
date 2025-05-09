'use client';

import { useState } from 'react';
import { Property } from '@/app/models/Property';
import PropertyGallery from './PropertyGallery';
import PropertyInfo from './PropertyInfo';
import PropertyTabs from './PropertyTabs';
import PropertyMap from './PropertyMap';
import PropertyReviews from './PropertyReviews';
import PropertySimilar from './PropertySimilar';
import PropertyBooking from './PropertyBooking';

interface PropertyDetailProps {
  property: Property;
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
  const [selectedTab, setSelectedTab] = useState<string>('description');

  return (
    <div className="space-y-8">
      {/* Галерея изображений */}
      <PropertyGallery images={property.images} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Основная информация и табы */}
        <div className="lg:col-span-2 space-y-8">
          {/* Основная информация */}
          <PropertyInfo 
            title={property.title}
            category={property.category}
            address={property.address}
            price={property.price}
            priceUnit={property.priceUnit}
            rating={property.rating}
            reviewCount={property.reviews.length}
            area={property.area}
            rooms={property.rooms}
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            maxGuests={property.maxGuests}
            host={property.host}
          />

          {/* Табы с детальной информацией */}
          <PropertyTabs 
            description={property.description}
            features={property.features}
            rules={property.rules}
            cancellationPolicy={property.cancellationPolicy}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />

          {/* Карта */}
          <PropertyMap 
            location={property.location} 
            title={property.title}
            address={property.address}
          />

          {/* Отзывы */}
          <PropertyReviews 
            propertyId={property.id}
            initialReviews={property.reviews}
            totalReviews={property.reviews.length}
            rating={property.rating}
          />
        </div>

        {/* Компонент бронирования */}
        <div className="sticky top-24">
          <PropertyBooking 
            propertyId={property.id}
            price={property.price}
            priceUnit={property.priceUnit}
            maxGuests={property.maxGuests}
          />
        </div>
      </div>

      {/* Похожие объекты */}
      <PropertySimilar propertyId={property.id} />
    </div>
  );
} 