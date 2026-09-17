'use client';
import { createContext, useContext } from 'react';

const SiteSettingsContext = createContext(null);

export function SiteSettingsProvider({ settings, socialLinks, children }) {
  return (
    <SiteSettingsContext.Provider value={{ settings, socialLinks }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
