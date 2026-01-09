'use client';

import { useState, useEffect } from 'react';
import { SplashScreen } from '@/app/splash';
import { loadHomeData } from '@/utils/content-loader';
import type { HomeData } from '@/utils/types';

export function SplashProvider({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const [homeData, setHomeData] = useState<HomeData | null>(null);

  useEffect(() => {
    // Load home data to check splash settings
    try {
      const data = loadHomeData();
      setHomeData(data);
      setShowSplash(data.splash.showOnLoad);
    } catch (error) {
      console.error('Failed to load home data:', error);
      setShowSplash(false);
    }
  }, []);

  return (
    <>
      {showSplash && homeData && (
        <SplashScreen 
          onComplete={() => setShowSplash(false)} 
          minDisplayTime={homeData.splash.minDisplayTime}
        />
      )}
      {children}
    </>
  );
}
