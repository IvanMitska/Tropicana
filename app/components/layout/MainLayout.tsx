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
      
      {/* Основное содержимое */}
      <main className="flex-grow w-full">{children}</main>
      
      {!hideFooter && <MainFooter />}
    </div>
  );
};

export default MainLayout; 