import React from 'react';
import { IconButton } from './IconButton.jsx';

export function SendButton({ onPress, disabled }) {
  return <IconButton name="send" onPress={onPress} disabled={disabled} variant="primary" />;
}
