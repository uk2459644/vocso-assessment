import React, { useState } from 'react';
import { Pressable, Animated } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '../../contexts/ThemeContext.jsx';

export function IconButton({
  onPress,
  disabled = false,
  size = 44,
  name = 'circle', // Feather icon name
  variant = 'primary',
  accessibilityLabel = 'button',
}) {
  const { colors } = useTheme();
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    if (!disabled) {
      Animated.spring(scale, { toValue: 0.9, useNativeDriver: true }).start();
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      Animated.spring(scale, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start();
    }
  };

  const getBackgroundColor = (pressed) => {
    if (disabled) return colors.muted;
    if (variant === 'primary') return pressed ? colors.primaryFocus : colors.primary;
    if (variant === 'secondary') return pressed ? colors.secondaryFocus : colors.secondary;
    if (variant === 'danger') return pressed ? colors.destructive : colors.destructive;
    return colors.primary;
  };

  return (
    <Pressable
      onPress={disabled ? null : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => ({
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: getBackgroundColor(pressed),
        opacity: disabled ? 0.5 : 1,
      })}
      accessibilityLabel={accessibilityLabel}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <FeatherIcon name={name} size={size * 0.6} color={colors.primaryForeground} />
      </Animated.View>
    </Pressable>
  );
}
