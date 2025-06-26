import React, { createContext, useContext } from 'react';
import UseTheme from '../hooks/UseTheme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const theme = UseTheme();

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}; 