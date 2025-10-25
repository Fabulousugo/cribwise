"use client";

import React from 'react';
import { useAppTheme, type ColorTheme } from '../components/app-theme-provider';
import { Sun, Moon, Droplet, Sunset, Trees, Sparkles } from 'lucide-react';

// Map themes to icons and labels
const themeConfig: Record<ColorTheme, { icon: React.ReactNode; label: string; description: string }> = {
  light: {
    icon: <Sun className="h-4 w-4" />,
    label: 'Light',
    description: 'Clean and bright'
  },
  dark: {
    icon: <Moon className="h-4 w-4" />,
    label: 'Dark',
    description: 'Easy on the eyes'
  },
  ocean: {
    icon: <Droplet className="h-4 w-4" />,
    label: 'Ocean',
    description: 'Deep blue vibes'
  },
  sunset: {
    icon: <Sunset className="h-4 w-4" />,
    label: 'Sunset',
    description: 'Warm oranges'
  },
  forest: {
    icon: <Trees className="h-4 w-4" />,
    label: 'Forest',
    description: 'Natural greens'
  },
  purple: {
    icon: <Sparkles className="h-4 w-4" />,
    label: 'Purple',
    description: 'Royal vibes'
  },
};

export function AppThemeSwitcher() {
  const { theme, setTheme, availableThemes } = useAppTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card hover:bg-accent transition-colors border border-border"
        aria-label="Change theme"
      >
        {themeConfig[theme].icon}
        <span className="text-sm font-medium">{themeConfig[theme].label}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute top-full mt-2 right-0 z-50 w-64 bg-popover border border-border rounded-lg shadow-lg overflow-hidden">
            <div className="p-2">
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Choose Theme
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {availableThemes.map((themeName) => (
                  <button
                    key={themeName}
                    onClick={() => {
                      setTheme(themeName);
                      setIsOpen(false);
                    }}
                    className={`
                      flex flex-col items-center gap-2 p-3 rounded-md transition-all
                      ${theme === themeName 
                        ? 'bg-primary text-primary-foreground shadow-md' 
                        : 'bg-card hover:bg-accent text-card-foreground'
                      }
                    `}
                  >
                    <div className={theme === themeName ? 'scale-110' : ''}>
                      {themeConfig[themeName].icon}
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium">
                        {themeConfig[themeName].label}
                      </div>
                      <div className="text-xs opacity-75">
                        {themeConfig[themeName].description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Compact version for mobile/header
export function AppThemeSwitcherCompact() {
  const { theme, setTheme, availableThemes } = useAppTheme();
  
  const cycleTheme = () => {
    const currentIndex = availableThemes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    setTheme(availableThemes[nextIndex]);
  };

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-lg bg-card hover:bg-accent transition-colors border border-border"
      aria-label={`Current theme: ${themeConfig[theme].label}. Click to cycle themes.`}
      title={`Theme: ${themeConfig[theme].label}`}
    >
      {themeConfig[theme].icon}
    </button>
  );
}