'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import MainLayout from '../components/layout/MainLayout';
import RealEstateHero from '../components/real-estate/RealEstateHero';
import FeaturedProperties from '../components/real-estate/FeaturedProperties';
import PropertySearchSection from '../components/real-estate/PropertySearchSection';
import PopularLocations from '../components/real-estate/PopularLocations';
import PropertyTypeSection from '../components/real-estate/PropertyTypeSection';
import TestimonialsSection from '../components/real-estate/TestimonialsSection';
import FaqSection from '../components/real-estate/FaqSection';

export default function RealEstatePage() {
  const [hasAnimated, setHasAnimated] = useState(false);

  // Эффект анимации при загрузке страницы
  useEffect(() => {
    setHasAnimated(true);
  }, []);

  return (
    <MainLayout>
      <main className="min-h-screen">
        <RealEstateHero hasAnimated={hasAnimated} />
        <PropertySearchSection />
        <FeaturedProperties />
        <PropertyTypeSection />
        <PopularLocations />
        <TestimonialsSection />
        <FaqSection />
      </main>
    </MainLayout>
  );
} 