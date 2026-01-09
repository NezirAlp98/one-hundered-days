// Type definitions for JSON data files

export interface SplashData {
  title: string;
  tagline: string;
  description: string;
  loading: {
    text: string;
    subtext: string;
  };
  animation: {
    duration: number;
    fadeOutDuration: number;
  };
}

export interface SiteData {
  siteName: string;
  siteDescription: string;
  defaultTheme: "light" | "dark";
  meta: {
    ogTitle: string;
    ogDescription: string;
    twitterCard: string;
  };
}

export interface HomeData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  splash: {
    showOnLoad: boolean;
    minDisplayTime: number;
  };
}
