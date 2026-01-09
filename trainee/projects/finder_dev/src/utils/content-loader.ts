// Utility functions for loading JSON content files

import type { SplashData } from './types';
import type { SiteData } from './types';
import type { HomeData } from './types';
import splashData from '../data/splash.json';
import siteData from '../config/site-data.json';
import homeData from '../data/home.json';

export function loadSplashData(): SplashData {
  return splashData as SplashData;
}

export function loadSiteData(): SiteData {
  return siteData as SiteData;
}

export function loadHomeData(): HomeData {
  return homeData as HomeData;
}
