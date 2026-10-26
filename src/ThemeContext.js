import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();
const systemColorScheme = '(prefers-color-scheme: dark)';

const normalizeTheme = value => ['auto', 'light', 'deep'].includes(value) ? value : 'standard';

const readSystemTheme = () => {
  if (typeof window.matchMedia !== 'function') return 'standard';
  return window.matchMedia(systemColorScheme).matches ? 'standard' : 'light';
};

export const ThemeProvider = ({ children }) => {
  const [themePreference, setThemeState] = useState(() => {
    try {
      return normalizeTheme(localStorage.getItem('theme'));
    } catch {
      return 'standard';
    }
  });
  const [systemTheme, setSystemTheme] = useState(readSystemTheme);
  // Existing consumers keep receiving a concrete theme, never the Auto preference.
  const theme = themePreference === 'auto' ? systemTheme : themePreference;

  useEffect(() => {
    if (themePreference !== 'auto' || typeof window.matchMedia !== 'function') return undefined;
    const media = window.matchMedia(systemColorScheme);
    const update = () => setSystemTheme(media.matches ? 'standard' : 'light');
    update();
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }
    if (typeof media.addListener === 'function') {
      media.addListener(update);
      return () => media.removeListener(update);
    }
    return undefined;
  }, [themePreference]);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme !== 'light') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
    htmlElement.classList.toggle('deep-theme', theme === 'deep');
    htmlElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('theme', themePreference);
    } catch {
      // A storage restriction must not prevent an in-memory appearance choice.
    }
  }, [themePreference]);

  const toggleTheme = () => {
    setThemeState(current => (current === 'auto' ? systemTheme : current) === 'light' ? 'standard' : 'light');
  };

  const setTheme = (nextTheme) => {
    setThemeState(normalizeTheme(nextTheme));
  };

  const isDarkMode = theme !== 'light';

  return (
    <ThemeContext.Provider value={{ theme, themePreference, isDarkMode, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
