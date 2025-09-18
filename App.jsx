import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeProvider } from './src/contexts/ThemeContext.jsx';
import { LoginScreen } from './src/components/LoginScreen.jsx';
import { ChatRoom } from './src/components/ChatRoom.jsx';
import { AuthProvider, useAuth } from './src/contexts/AuthContext.jsx';

function AppContent() {
  const { username } = useAuth(); // get username from context

  console.log('Current user:', username);
  
    return (
    <View style={styles.app}>
      {username ? <ChatRoom /> : <LoginScreen onEnterChat={() => {}} />}
      {/* onEnterChat is no-op since context handles login now */}
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,            // fills the screen
    overflow: 'hidden', // clip children if needed
  },
});
