import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, DarkColors } from '../constants/colors.js';

const ThemeContext = createContext({
  theme: 'light',
  colors: Colors,
  toggleTheme: () => {},
  isDark: false,
});

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Load theme from storage on mount
  useEffect(() => {
    (async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('chatroom-theme');
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
          setTheme(savedTheme);
        }
      } catch (e) {
        console.error('Failed to load theme:', e);
      }
    })();
  }, []);

  // Save theme when it changes
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('chatroom-theme', theme);
      } catch (e) {
        console.error('Failed to save theme:', e);
      }
    })();
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'dark' ? DarkColors : Colors;
  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
