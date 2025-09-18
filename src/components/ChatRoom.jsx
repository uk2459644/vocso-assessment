import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { Message } from './Message.jsx';
import { Input } from './ui/Input.jsx';
import { SendButton } from './ui/SendButton.jsx';
import { ThemeToggle } from './ui/ThemeToggle.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

import { database } from '../firebase.js';
import { ref, push, onValue, off } from 'firebase/database';

export function ChatRoom() {
  const { colors } = useTheme();
  const { username, logout } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);

  useEffect(() => {
    const messagesRef = ref(database, 'chat/messages');

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const parsed = Object.values(data).sort((a, b) => a.timestamp - b.timestamp);
        setMessages(parsed);
      } else {
        setMessages([]);
      }
    });

    return () => off(messagesRef, 'value', unsubscribe);
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messagesRef = ref(database, 'chat/messages');
      await push(messagesRef, {
        text: newMessage.trim(),
        user: username,
        timestamp: Date.now(),
      });
      setNewMessage('');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>Chat-Room</Text>
        <View style={styles.headerRight}>
          <ThemeToggle />
          <TouchableOpacity
            onPress={logout}
            style={[styles.logoutButton, { borderColor: colors.border }]}
          >
            <Text style={{ color: colors.foreground }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Message
            message={{
              ...item,
              isOwnMessage: item.user === username,
            }}
          />
        )}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={[styles.inputArea, { backgroundColor: colors.background }]}>
          <Input
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type your message..."
            maxLength={500}
          />
          <SendButton onPress={handleSendMessage} disabled={!newMessage.trim()} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    borderBottomWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 18, fontWeight: '600' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logoutButton: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, borderWidth: 1 },
  messagesList: { paddingVertical: 20, paddingHorizontal: 16 },
  inputArea: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
});
