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
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50
        dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900
        transition-opacity duration-500 ease-in-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <div className="flex flex-col items-center justify-center space-y-8">
        {/* Logo/Icon Animation */}
        <div className="relative">
          {/* Animated background circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-blue-500/20 dark:bg-blue-400/20 rounded-full animate-pulse" />
          </div>
          
          {/* Main logo container */}
          <div className="relative flex items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-2xl shadow-2xl flex items-center justify-center transform transition-transform duration-300 hover:scale-105">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Title and Tagline */}
        <div className="text-center space-y-3 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            {splashData?.title || 'FinderDev'}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium">
            {splashData?.tagline || 'Connect. Collaborate. Create.'}
          </p>
          {splashData?.description && (
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-md">
              {splashData.description}
            </p>
          )}
        </div>

        {/* Loading Indicator */}
        <div className="flex flex-col items-center space-y-3">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" />
          </div>
          {splashData?.loading.text && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {splashData.loading.text}
            </p>
          )}
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-200/30 dark:bg-indigo-800/20 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>
    </div>
  );
}
