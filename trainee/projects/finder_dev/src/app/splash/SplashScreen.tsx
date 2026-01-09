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
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

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

  // Typewriter effect for title
  useEffect(() => {
    if (!splashData) return;
    
    const title = splashData.title || 'FinderDev';
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (currentIndex < title.length) {
        setDisplayedText(title.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [splashData]);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (!isLoading && splashData) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        
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
    <div className={`splash-terminal ${isVisible ? 'splash-visible' : 'splash-hidden'}`}>
      {/* Scanline overlay */}
      <div className="splash-scanlines" />
      
      {/* Grid background */}
      <div className="splash-grid" />
      
      {/* Main content */}
      <div className="splash-terminal-content">
        {/* Terminal header */}
        <div className="splash-terminal-header">
          <div className="splash-terminal-dots">
            <span className="splash-dot-red" />
            <span className="splash-dot-yellow" />
            <span className="splash-dot-green" />
          </div>
          <div className="splash-terminal-title">finder_dev.exe</div>
        </div>

        {/* Terminal body */}
        <div className="splash-terminal-body">
          {/* System info lines */}
          <div className="splash-terminal-lines">
            <div className="splash-line">
              <span className="splash-prompt">&gt;</span>
              <span className="splash-text"> Initializing system...</span>
            </div>
            <div className="splash-line splash-line-delay-1">
              <span className="splash-prompt">&gt;</span>
              <span className="splash-text"> Loading modules...</span>
            </div>
            <div className="splash-line splash-line-delay-2">
              <span className="splash-prompt">&gt;</span>
              <span className="splash-text"> Establishing connections...</span>
            </div>
          </div>

          {/* Main title with typewriter */}
          <div className="splash-main-title">
            <div className="splash-title-line">
              <span className="splash-prompt-large">&gt;</span>
              <span className="splash-title-text">
                {displayedText}
                <span className={`splash-cursor ${showCursor ? 'splash-cursor-visible' : ''}`}>_</span>
              </span>
            </div>
          </div>

          {/* Tagline */}
          {splashData?.tagline && (
            <div className="splash-tagline-container">
              <div className="splash-tagline-line">
                <span className="splash-prompt">&gt;</span>
                <span className="splash-tagline-text">{splashData.tagline}</span>
              </div>
            </div>
          )}

          {/* Loading indicator */}
          <div className="splash-terminal-loader">
            <div className="splash-loader-line">
              <span className="splash-prompt">&gt;</span>
              <span className="splash-loader-text">
                {splashData?.loading.text || 'Loading'}
                <span className="splash-loader-dots">
                  <span className="splash-loader-dot">.</span>
                  <span className="splash-loader-dot">.</span>
                  <span className="splash-loader-dot">.</span>
                </span>
              </span>
            </div>
            <div className="splash-progress-bar">
              <div className="splash-progress-fill" />
            </div>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="splash-corner splash-corner-tl" />
      <div className="splash-corner splash-corner-tr" />
      <div className="splash-corner splash-corner-bl" />
      <div className="splash-corner splash-corner-br" />
    </div>
  );
}
