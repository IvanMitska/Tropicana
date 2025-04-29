'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import MainLayout from '../components/layout/MainLayout';
import HeroSection from '../components/about/HeroSection';
import HistorySection from '../components/about/HistorySection';
import MissionSection from '../components/about/MissionSection';
import TeamSection from '../components/about/TeamSection';
import AchievementsSection from '../components/about/AchievementsSection';
import PartnersSection from '../components/about/PartnersSection';
import CareersSection from '../components/about/CareersSection';
import SocialResponsibilitySection from '../components/about/SocialResponsibilitySection';

export default function AboutPage() {
  return (
    <MainLayout>
      <HeroSection />
      <HistorySection />
      <MissionSection />
      <TeamSection />
      <AchievementsSection />
      <PartnersSection />
      <CareersSection />
      <SocialResponsibilitySection />
    </MainLayout>
  );
}