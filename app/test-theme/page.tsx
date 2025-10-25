"use client";

import { ThemeProvider } from '@/components/theme-provider';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default function TestPage() {
  return (
    <ThemeProvider>
      <div className="p-8 bg-background">
        <h1 className="text-3xl font-bold mb-4">Theme Test</h1>
        <ThemeSwitcher />
      </div>
    </ThemeProvider>
  );
}