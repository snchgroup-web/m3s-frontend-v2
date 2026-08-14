import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'deep') return storedTheme;
    return 'standard';
  });

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme !== 'light') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
    htmlElement.classList.toggle('deep-theme', theme === 'deep');
    htmlElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(current => current === 'light' ? 'standard' : 'light');
  };

  const setTheme = (nextTheme) => {
    if (nextTheme === 'dark') {
      setThemeState('standard');
      return;
    }
    setThemeState(['light', 'standard', 'deep'].includes(nextTheme) ? nextTheme : 'standard');
  };

  const isDarkMode = theme !== 'light';

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, setTheme, toggleTheme }}>
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
