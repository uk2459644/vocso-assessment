import React from 'react';
import { IconButton } from './IconButton.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';

export function ThemeToggle() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <IconButton
      onPress={toggleTheme}
      size={36}
      variant="secondary"
      accessibilityLabel={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      name={isDark ? 'sun' : 'moon'} // Feather icons for theme
    />
  );
}
