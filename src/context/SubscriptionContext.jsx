// src/context/SubscriptionContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import {
  getSubscriptions, addSubscription,
  updateSubscription, deleteSubscription
} from '../utils/storage';
import { generateId, computeStats } from '../utils/helpers';
import { useAuth } from './AuthContext';

const SubscriptionContext = createContext(null);

export const SubscriptionProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [stats, setStats]                 = useState({});
  const [loading, setLoading]             = useState(true);

  // Load subscriptions whenever user changes
  useEffect(() => {
    if (currentUser) {
      const subs = getSubscriptions(currentUser.id);
      setSubscriptions(subs);
      setStats(computeStats(subs));
    } else {
      setSubscriptions([]);
      setStats({});
    }
    setLoading(false);
  }, [currentUser]);

  const sync = (updated) => {
    setSubscriptions(updated);
    setStats(computeStats(updated));
  };

  const addSub = useCallback((data) => {
    if (!currentUser) return;
    const newSub = {
      ...data,
      id:        generateId('sub'),
      status:    data.status || 'active',
      createdAt: new Date().toISOString(),
    };
    const updated = addSubscription(currentUser.id, newSub);
    sync(updated);
    toast.success(`"${newSub.name}" added successfully!`);
    return newSub;
  }, [currentUser]);

  const editSub = useCallback((data) => {
    if (!currentUser) return;
    const updated = updateSubscription(currentUser.id, data);
    sync(updated);
    toast.success(`"${data.name}" updated.`);
  }, [currentUser]);

  const removeSub = useCallback((id, name) => {
    if (!currentUser) return;
    const updated = deleteSubscription(currentUser.id, id);
    sync(updated);
    toast.error(`"${name}" deleted.`);
  }, [currentUser]);

  const toggleStatus = useCallback((id) => {
    if (!currentUser) return;
    const sub     = subscriptions.find(s => s.id === id);
    if (!sub) return;
    const updated = updateSubscription(currentUser.id, {
      ...sub,
      status: sub.status === 'active' ? 'inactive' : 'active',
    });
    sync(updated);
    toast.info(`Subscription ${sub.status === 'active' ? 'paused' : 'activated'}.`);
  }, [currentUser, subscriptions]);

  return (
    <SubscriptionContext.Provider value={{
      subscriptions, stats, loading,
      addSub, editSub, removeSub, toggleStatus,
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptions = () => {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error('useSubscriptions must be used inside SubscriptionProvider');
  return ctx;
};