'use client';

import React from 'react';
import MainLayout from './components/layout/MainLayout';
import HeroSection from './components/home/HeroSection';
import PopularOffersSection from './components/home/PopularOffersSection';
import BenefitsSection from './components/home/BenefitsSection';
import HowItWorksSection from './components/home/HowItWorksSection';
import TestimonialsSection from './components/home/TestimonialsSection';
import FaqSection from './components/home/FaqSection';

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <PopularOffersSection />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FaqSection />
    </MainLayout>
  );
} 