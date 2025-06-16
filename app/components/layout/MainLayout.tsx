'use client';

import React from 'react';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';

interface MainLayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, hideFooter = false }) => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden overflow-fix">
      <MainHeader />
      
      {/* Основное содержимое с минимальным отступом для header */}
      <main className="flex-grow pt-16 w-full">{children}</main>
      
      {!hideFooter && <MainFooter />}
    </div>
  );
};

export default MainLayout; 