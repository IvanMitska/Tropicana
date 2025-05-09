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
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      
      {/* Отступ для header */}
      <div className="h-20"></div>
      
      <main className="flex-grow">{children}</main>
      
      {!hideFooter && <MainFooter />}
    </div>
  );
};

export default MainLayout; 