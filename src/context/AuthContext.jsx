// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import {
  getUsers, saveUsers, getCurrentUser,
  saveCurrentUser, clearCurrentUser,
} from '../utils/storage';
import { generateId } from '../utils/helpers';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) setCurrentUser(user);
    setLoading(false);
  }, []);

  const login = useCallback((email, password) => {
    const users = getUsers();
    const user  = users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, message: 'Invalid email or password.' };
    saveCurrentUser(user);
    setCurrentUser(user);
    return { success: true };
  }, []);

  const signup = useCallback((name, email, password) => {
    const users = getUsers();
    if (users.find(u => u.email === email))
      return { success: false, message: 'Email already registered.' };

    const newUser = {
      id:        generateId('usr'),
      name,
      email,
      password,
      avatar:    name.charAt(0).toUpperCase(),
      createdAt: new Date().toISOString(),
    };

    saveUsers([...users, newUser]);
    saveCurrentUser(newUser);
    setCurrentUser(newUser);
    // ✅ No demo data seeded — new users start with empty subscriptions

    return { success: true };
  }, []);

  const logout = useCallback(() => {
    clearCurrentUser();
    setCurrentUser(null);
    toast.info('Logged out successfully.');
  }, []);

  const updateProfile = useCallback((updates) => {
    const updated = { ...currentUser, ...updates };
    const users   = getUsers().map(u => u.id === updated.id ? updated : u);
    saveUsers(users);
    saveCurrentUser(updated);
    setCurrentUser(updated);
    toast.success('Profile updated.');
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};