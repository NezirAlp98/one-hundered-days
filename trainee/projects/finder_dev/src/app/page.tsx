'use client';

import { useEffect, useState } from 'react';
import { loadHomeData } from '@/utils/content-loader';
import type { HomeData } from '@/utils/types';

export default function HomePage() {
  const [homeData, setHomeData] = useState<HomeData | null>(null);

  useEffect(() => {
    // Load home data
    try {
      const data = loadHomeData();
      setHomeData(data);
    } catch (error) {
      console.error('Failed to load home data:', error);
    }
  }, []);

  if (!homeData) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-slate-900 dark:text-white">
          {homeData.hero.title}
        </h1>
        <p className="text-center text-slate-600 dark:text-slate-400 mt-4">
          {homeData.hero.subtitle}
        </p>
        {homeData.hero.description && (
          <p className="text-center text-slate-500 dark:text-slate-500 mt-2 max-w-2xl mx-auto">
            {homeData.hero.description}
          </p>
        )}
      </div>
    </main>
  );
}
