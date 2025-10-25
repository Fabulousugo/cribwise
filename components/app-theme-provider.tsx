"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

// Available themes
export type ColorTheme = 'light' | 'dark' | 'ocean' | 'sunset' | 'forest' | 'purple';
export type ColorMode = 'light' | 'dark';

interface ColorThemeContextType {
  theme: ColorTheme;
  setTheme: (theme: ColorTheme) => void;
  mode: ColorMode;
  availableThemes: ColorTheme[];
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

// Theme definitions with HSL values
const colorThemes = {
  light: {
    mode: 'light' as ColorMode,
    colors: {
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      popover: '0 0% 100%',
      popoverForeground: '222.2 84% 4.9%',
      primary: '221.2 83.2% 53.3%',
      primaryForeground: '210 40% 98%',
      secondary: '210 40% 96.1%',
      secondaryForeground: '222.2 47.4% 11.2%',
      muted: '210 40% 96.1%',
      mutedForeground: '215.4 16.3% 46.9%',
      accent: '210 40% 96.1%',
      accentForeground: '222.2 47.4% 11.2%',
      destructive: '0 84.2% 60.2%',
      destructiveForeground: '210 40% 98%',
      border: '214.3 31.8% 91.4%',
      input: '214.3 31.8% 91.4%',
      ring: '221.2 83.2% 53.3%',
      success: '142 71% 45%',
      successForeground: '144 100% 98%',
      warning: '38 92% 50%',
      warningForeground: '48 100% 12%',
      info: '199 89% 48%',
      infoForeground: '210 40% 98%',
      heroFrom: '240 10% 6%',
      heroVia: '221 83% 9%',
      heroTo: '240 10% 6%',
    }
  },
  dark: {
    mode: 'dark' as ColorMode,
    colors: {
      background: '222.2 47% 11%',
      foreground: '210 40% 98%',
      card: '222.2 47% 14%',
      cardForeground: '210 40% 98%',
      popover: '222.2 47% 14%',
      popoverForeground: '210 40% 98%',
      primary: '217.2 91.2% 65%',
      primaryForeground: '222.2 47.4% 11.2%',
      secondary: '220 14% 25%',
      secondaryForeground: '210 40% 98%',
      muted: '220 14% 25%',
      mutedForeground: '217 12% 70%',
      accent: '220 14% 28%',
      accentForeground: '210 40% 98%',
      destructive: '0 62.8% 50%',
      destructiveForeground: '210 40% 98%',
      border: '220 14% 30%',
      input: '220 14% 30%',
      ring: '224.3 76.3% 55%',
      success: '142 71% 45%',
      successForeground: '144 100% 98%',
      warning: '38 92% 55%',
      warningForeground: '48 100% 10%',
      info: '199 89% 56%',
      infoForeground: '210 40% 98%',
      heroFrom: '240 10% 5%',
      heroVia: '221 60% 11%',
      heroTo: '240 10% 5%',
    }
  },
  ocean: {
    mode: 'dark' as ColorMode,
    colors: {
      background: '200 30% 12%',
      foreground: '180 20% 96%',
      card: '200 25% 16%',
      cardForeground: '180 20% 96%',
      popover: '200 25% 16%',
      popoverForeground: '180 20% 96%',
      primary: '190 85% 55%',
      primaryForeground: '200 30% 10%',
      secondary: '195 20% 22%',
      secondaryForeground: '180 20% 96%',
      muted: '195 20% 22%',
      mutedForeground: '185 15% 68%',
      accent: '185 30% 28%',
      accentForeground: '180 20% 96%',
      destructive: '0 65% 52%',
      destructiveForeground: '0 0% 100%',
      border: '195 20% 26%',
      input: '195 20% 26%',
      ring: '190 85% 55%',
      success: '160 75% 48%',
      successForeground: '160 100% 98%',
      warning: '42 90% 55%',
      warningForeground: '42 100% 10%',
      info: '195 88% 58%',
      infoForeground: '200 30% 10%',
      heroFrom: '200 40% 8%',
      heroVia: '190 50% 15%',
      heroTo: '200 40% 8%',
    }
  },
  sunset: {
    mode: 'dark' as ColorMode,
    colors: {
      background: '20 30% 12%',
      foreground: '30 20% 96%',
      card: '20 25% 16%',
      cardForeground: '30 20% 96%',
      popover: '20 25% 16%',
      popoverForeground: '30 20% 96%',
      primary: '25 90% 60%',
      primaryForeground: '20 30% 10%',
      secondary: '15 25% 22%',
      secondaryForeground: '30 20% 96%',
      muted: '15 25% 22%',
      mutedForeground: '25 15% 68%',
      accent: '30 35% 28%',
      accentForeground: '30 20% 96%',
      destructive: '0 70% 55%',
      destructiveForeground: '0 0% 100%',
      border: '15 20% 26%',
      input: '15 20% 26%',
      ring: '25 90% 60%',
      success: '142 70% 48%',
      successForeground: '144 100% 98%',
      warning: '38 95% 58%',
      warningForeground: '38 100% 10%',
      info: '200 85% 58%',
      infoForeground: '200 30% 10%',
      heroFrom: '15 35% 8%',
      heroVia: '25 60% 15%',
      heroTo: '15 35% 8%',
    }
  },
  forest: {
    mode: 'dark' as ColorMode,
    colors: {
      background: '140 25% 12%',
      foreground: '120 15% 96%',
      card: '140 20% 16%',
      cardForeground: '120 15% 96%',
      popover: '140 20% 16%',
      popoverForeground: '120 15% 96%',
      primary: '145 65% 52%',
      primaryForeground: '140 30% 10%',
      secondary: '135 18% 22%',
      secondaryForeground: '120 15% 96%',
      muted: '135 18% 22%',
      mutedForeground: '130 12% 68%',
      accent: '138 25% 28%',
      accentForeground: '120 15% 96%',
      destructive: '0 68% 52%',
      destructiveForeground: '0 0% 100%',
      border: '135 18% 26%',
      input: '135 18% 26%',
      ring: '145 65% 52%',
      success: '145 72% 50%',
      successForeground: '145 100% 98%',
      warning: '42 92% 56%',
      warningForeground: '42 100% 10%',
      info: '195 85% 56%',
      infoForeground: '195 30% 10%',
      heroFrom: '140 30% 8%',
      heroVia: '145 45% 15%',
      heroTo: '140 30% 8%',
    }
  },
  purple: {
    mode: 'dark' as ColorMode,
    colors: {
      background: '270 30% 12%',
      foreground: '280 15% 96%',
      card: '270 25% 16%',
      cardForeground: '280 15% 96%',
      popover: '270 25% 16%',
      popoverForeground: '280 15% 96%',
      primary: '275 75% 60%',
      primaryForeground: '270 30% 10%',
      secondary: '265 20% 22%',
      secondaryForeground: '280 15% 96%',
      muted: '265 20% 22%',
      mutedForeground: '270 12% 68%',
      accent: '268 28% 28%',
      accentForeground: '280 15% 96%',
      destructive: '0 68% 54%',
      destructiveForeground: '0 0% 100%',
      border: '265 20% 26%',
      input: '265 20% 26%',
      ring: '275 75% 60%',
      success: '145 70% 48%',
      successForeground: '145 100% 98%',
      warning: '42 92% 56%',
      warningForeground: '42 100% 10%',
      info: '210 85% 58%',
      infoForeground: '210 30% 10%',
      heroFrom: '270 35% 8%',
      heroVia: '275 55% 15%',
      heroTo: '270 35% 8%',
    }
  },
};

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ColorTheme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log('🎨 AppThemeProvider mounted!');
    setMounted(true);
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('app-theme') as ColorTheme;
    if (savedTheme && colorThemes[savedTheme]) {
      console.log('📦 Loading saved theme:', savedTheme);
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      console.log('🌓 Using system preference:', initialTheme);
      setThemeState(initialTheme);
      applyTheme(initialTheme);
    }
  }, []);

  const applyTheme = (themeName: ColorTheme) => {
    console.log('🎨 Applying theme:', themeName);
    const root = document.documentElement;
    const themeConfig = colorThemes[themeName];
    
    // Remove all theme classes first
    root.classList.remove('light', 'dark', 'ocean', 'sunset', 'forest', 'purple');
    
    // Add the mode class (light/dark) for compatibility
    root.classList.add(themeConfig.mode);
    
    // Add the specific theme class
    root.classList.add(themeName);
    
    // Apply all CSS custom properties
    Object.entries(themeConfig.colors).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });
  };

  const setTheme = (newTheme: ColorTheme) => {
    console.log('🔄 Changing theme to:', newTheme);
    setThemeState(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  const mode = colorThemes[theme].mode;
  const availableThemes: ColorTheme[] = ['light', 'dark', 'ocean', 'sunset', 'forest', 'purple'];

  console.log('🎨 Current theme:', theme, 'Mounted:', mounted);

  // Prevent flash of wrong theme
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ColorThemeContext.Provider value={{ theme, setTheme, mode, availableThemes }}>
      {children}
    </ColorThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ColorThemeContext);
  if (context === undefined) {
    throw new Error('useAppTheme must be used within an AppThemeProvider');
  }
  return context;
}