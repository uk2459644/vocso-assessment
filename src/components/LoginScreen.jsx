import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { Input } from './ui/Input.jsx';
import { SendButton } from './ui/SendButton.jsx';
import { ThemeToggle } from './ui/ThemeToggle.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { database as db } from '../firebase.js';
import { ref, get, set, update } from 'firebase/database';

// 🔹 Notification utils
import {  getFcmToken, requestNotificationPermission } from '../utils/notifications.js';

export function LoginScreen() {
  const { colors } = useTheme();
  const { login } = useAuth();
  const [inputName, setInputName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const name = inputName.trim();
    if (!name) return;

    try {
      setLoading(true);

      // 🔹 Request notification permission & get FCM token
      const hasPermission = await requestNotificationPermission();
      let fcmToken = null;
      if (hasPermission) {
        fcmToken = await getFcmToken();
        // fcmToken = 'dummy';
      }

      // 🔹 Check if username exists in Firebase
      const userRef = ref(db, `users/${name}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        // If not, create new user in Firebase
        await set(userRef, {
          username: name,
          fcmToken,
          createdAt: Date.now(),
        });
      } else {
        // If user exists, just update token
        await update(userRef, {
          fcmToken,
          lastLogin: Date.now(),
        });
      }

      // 🔹 Save username in AuthContext (AsyncStorage)
      await login(name);

    } catch (err) {
      console.error('Login failed:', err);
      Alert.alert('Error', 'Something went wrong while logging in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.themeToggleContainer}>
        <ThemeToggle />
      </View>

      <View style={styles.loginCard}>
        <Text style={[styles.title, { color: colors.foreground }]}>
          Welcome to Chat-Room
        </Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          Enter your username to start chatting
        </Text>

        <View style={styles.inputContainer}>
          <Input
            value={inputName}
            onChangeText={setInputName}
            placeholder="Enter your username"
            maxLength={20}
          />
          <SendButton
            onPress={handleSubmit}
            disabled={!inputName.trim() || loading}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  themeToggleContainer: { position: 'absolute', top: 24, right: 24, zIndex: 1 },
  loginCard: { width: '100%', maxWidth: 400, alignItems: 'center', gap: 32 },
  title: { fontSize: 32, fontWeight: '600', textAlign: 'center' },
  subtitle: { fontSize: 16, textAlign: 'center' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', gap: 12, width: '100%' },
});
