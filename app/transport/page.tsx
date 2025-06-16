'use client';

import React, { useEffect, useState } from 'react';
import MainLayout from '@/app/components/layout/MainLayout';
import { TransportHero } from '@/app/components/transport/TransportHero';
import { VehicleSearchSection } from '@/app/components/transport/VehicleSearchSection';
import { FeaturedVehicles } from '@/app/components/transport/FeaturedVehicles';
import { VehicleTypeSection } from '@/app/components/transport/VehicleTypeSection';
import { RentalBenefits } from '@/app/components/transport/RentalBenefits';
import { TestimonialsSection } from '@/app/components/transport/TestimonialsSection';
import { FaqSection } from '@/app/components/transport/FaqSection';

export default function TransportPage() {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setHasAnimated(true);
  }, []);

  return (
    <MainLayout>
      <main>
        <TransportHero hasAnimated={hasAnimated} />
        <VehicleSearchSection hasAnimated={hasAnimated} />
        <FeaturedVehicles hasAnimated={hasAnimated} />
        <VehicleTypeSection hasAnimated={hasAnimated} />
        <RentalBenefits hasAnimated={hasAnimated} />
        <TestimonialsSection hasAnimated={hasAnimated} />
        <FaqSection hasAnimated={hasAnimated} />
      </main>
    </MainLayout>
  );
} 