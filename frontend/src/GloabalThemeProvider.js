import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const GloabalThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load the theme mode from local storage or use the default (false for light mode)
    const savedMode = localStorage.getItem('isDarkMode');
    setIsDarkMode(savedMode === 'true');
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    // Save the new theme mode to local storage
    localStorage.setItem('isDarkMode', JSON.stringify(newMode));
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
