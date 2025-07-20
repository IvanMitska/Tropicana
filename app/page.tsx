'use client';

import React from 'react';
import MainLayout from './components/layout/MainLayout';
import HeroSection from './components/home/HeroSection';
import ServicesSection from './components/home/ServicesSection';
import BenefitsSection from './components/home/BenefitsSection';
import TestimonialsSection from './components/home/TestimonialsSection';
import FaqSection from './components/home/FaqSection';

export default function HomePage() {
  return (
    <MainLayout>
      <main className="min-h-screen">
        <HeroSection />
        <div className="pt-0">
          <ServicesSection />
          <BenefitsSection />
          <TestimonialsSection />
          <FaqSection />
        </div>
      </main>
    </MainLayout>
  );
} 