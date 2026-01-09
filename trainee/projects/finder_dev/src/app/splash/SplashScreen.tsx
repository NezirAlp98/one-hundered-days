'use client';

import { useEffect, useState } from 'react';
import type { SplashData } from '@/utils/types';
import { loadSplashData } from '@/utils/content-loader';

interface SplashScreenProps {
  onComplete?: () => void;
  minDisplayTime?: number;
}

export default function SplashScreen({ 
  onComplete, 
  minDisplayTime = 2000 
}: SplashScreenProps) {
  const [splashData, setSplashData] = useState<SplashData | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load splash data
    try {
      const data = loadSplashData();
      setSplashData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load splash data:', error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && splashData) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        
        // Call onComplete after fade out animation
        setTimeout(() => {
          onComplete?.();
        }, splashData.animation.fadeOutDuration);
      }, Math.max(minDisplayTime, splashData.animation.duration));

      return () => clearTimeout(timer);
    }
  }, [isLoading, splashData, minDisplayTime, onComplete]);

  if (!isVisible && !isLoading) {
    return null;
  }

  return (
    <div
      className={`splash-container ${isVisible ? 'splash-visible' : 'splash-hidden'}`}
    >
      <div className="splash-content">
        {/* Title */}
        <div className="splash-title-wrapper">
          <h1 className="splash-title">
            {splashData?.title || 'FinderDev'}
          </h1>
          {splashData?.tagline && (
            <p className="splash-tagline">
              {splashData.tagline}
            </p>
          )}
        </div>

        {/* Loading Indicator */}
        <div className="splash-loading-wrapper">
          <div className="splash-loading-dots">
            <div className="splash-dot" />
            <div className="splash-dot" />
            <div className="splash-dot" />
          </div>
          {splashData?.loading.text && (
            <p className="splash-loading-text">
              {splashData.loading.text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
