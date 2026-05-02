// src/context/UIContext.jsx
import { createContext, useContext, useState } from 'react';

const UIContext = createContext(null);

export const UIProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currency, setCurrency]       = useState('INR');

  const toggleSidebar = () => setSidebarOpen(o => !o);
  const closeSidebar  = () => setSidebarOpen(false);

  return (
    <UIContext.Provider value={{
      sidebarOpen, toggleSidebar, closeSidebar,
      currency, setCurrency,
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used inside UIProvider');
  return ctx;
};