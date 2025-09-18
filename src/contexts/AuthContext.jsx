import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(null);

  // Load username from storage on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('username');
        if (storedUser) {
          setUsername(storedUser);
        }
      } catch (err) {
        console.error('Failed to load username', err);
      }
    };
    loadUser();
  }, []);

  const login = async (name) => {
    try {
      await AsyncStorage.setItem('username', name);
      setUsername(name);
    } catch (err) {
      console.error('Failed to save username', err);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('username');
      setUsername(null);
    } catch (err) {
      console.error('Failed to clear username', err);
    }
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
