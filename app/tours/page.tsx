'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import MainLayout from '../components/layout/MainLayout';
import ToursHero from '../components/tours/ToursHero';
import TourSearch from '../components/tours/TourSearch';
import PopularTours from '../components/tours/PopularTours';
import TourTypeSection from '../components/tours/TourTypeSection';
import TestimonialsSection from '../components/tours/TestimonialsSection';
import FaqSection from '../components/tours/FaqSection';

export default function ToursPage() {
  const [hasAnimated, setHasAnimated] = useState(false);

  // Эффект анимации при загрузке страницы
  useEffect(() => {
    setHasAnimated(true);
  }, []);

  return (
    <MainLayout>
      <main className="min-h-screen">
        <ToursHero hasAnimated={hasAnimated} />
        <TourSearch />
        <PopularTours />
        <TourTypeSection />
        <TestimonialsSection hasAnimated={hasAnimated} />
        <FaqSection hasAnimated={hasAnimated} />
      </main>
    </MainLayout>
  );
} 