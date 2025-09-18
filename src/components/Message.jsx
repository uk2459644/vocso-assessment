import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext.jsx';

export function Message({ message }) {
  const { colors } = useTheme();

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getMessageStyle = () => {
    if (message.isOwnMessage) {
      return {
        alignSelf: 'flex-end',
        backgroundColor: colors.primary,
        borderBottomRightRadius: 8,
      };
    } else {
      return {
        alignSelf: 'flex-start',
        backgroundColor: colors.muted,
        borderBottomLeftRadius: 8,
      };
    }
  };

  const textColor = message.isOwnMessage
    ? colors.primaryForeground
    : colors.mutedForeground;

  return (
    <View style={styles.messageWrapper}>
      {/* Show username above bubble for others */}
      {!message.isOwnMessage && (
        <Text style={[styles.usernameText, { color: colors.mutedForeground }]}>
          {message.user}
        </Text>
      )}

      <View style={[styles.messageContainer, getMessageStyle()]}>
        <Text style={[styles.messageText, { color: textColor }]}>
          {message.text}
        </Text>
      </View>

      {/* Timestamp */}
      <View
        style={[
          styles.messageInfo,
          { justifyContent: message.isOwnMessage ? 'flex-end' : 'flex-start' },
        ]}
      >
        <Text style={[styles.timestamp, { color: colors.mutedForeground }]}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageWrapper: {
    marginBottom: 16,
    width: '100%',
    flexDirection: 'column',
  },
  messageContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    maxWidth: '80%',
    minWidth: 60,
  },
  usernameText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4, // space between username and bubble
    marginLeft: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  messageInfo: {
    marginTop: 4,
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.6,
  },
});
