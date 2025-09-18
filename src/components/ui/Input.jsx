import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext.jsx';

export function Input({ 
  style,
  onFocus,
  onBlur,
  placeholder = "Type your prompt...",
  ...props 
}) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={colors.muted}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={[
        styles.input,
        {
          backgroundColor: colors.inputBackground,
          borderColor: isFocused ? colors.borderFocus : colors.border,
          color: colors.foreground,
        },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 20,
    fontSize: 16,
  },
});
