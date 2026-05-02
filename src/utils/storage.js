// src/utils/storage.js
// Centralised localStorage helpers — all reads/writes go through here

const KEYS = {
  USERS:         'trackify_users',
  CURRENT_USER:  'trackify_current_user',
  SUBSCRIPTIONS: 'trackify_subscriptions',
  PREFERENCES:   'trackify_preferences',
  THEME:         'trackify_theme',
};

// ── Generic helpers ──────────────────────────────────────────────

const get = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const set = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

const remove = (key) => localStorage.removeItem(key);

// ── Auth ──────────────────────────────────────────────────────────

export const getUsers = () => get(KEYS.USERS, []);

export const saveUsers = (users) => set(KEYS.USERS, users);

export const getCurrentUser = () => get(KEYS.CURRENT_USER, null);

export const saveCurrentUser = (user) => set(KEYS.CURRENT_USER, user);

export const clearCurrentUser = () => remove(KEYS.CURRENT_USER);

// ── Subscriptions (scoped per user) ──────────────────────────────

const subKey = (userId) => `${KEYS.SUBSCRIPTIONS}_${userId}`;

export const getSubscriptions = (userId) => get(subKey(userId), []);

export const saveSubscriptions = (userId, subs) => set(subKey(userId), subs);

export const addSubscription = (userId, sub) => {
  const current = getSubscriptions(userId);
  const updated  = [sub, ...current];
  saveSubscriptions(userId, updated);
  return updated;
};

export const updateSubscription = (userId, updatedSub) => {
  const current = getSubscriptions(userId);
  const updated  = current.map(s => s.id === updatedSub.id ? updatedSub : s);
  saveSubscriptions(userId, updated);
  return updated;
};

export const deleteSubscription = (userId, subId) => {
  const current = getSubscriptions(userId);
  const updated  = current.filter(s => s.id !== subId);
  saveSubscriptions(userId, updated);
  return updated;
};

// ── Preferences ──────────────────────────────────────────────────

export const getPreferences = (userId) =>
  get(`${KEYS.PREFERENCES}_${userId}`, { currency: 'INR', theme: 'dark', notifications: true });

export const savePreferences = (userId, prefs) =>
  set(`${KEYS.PREFERENCES}_${userId}`, prefs);

// ── Theme ─────────────────────────────────────────────────────────

export const getTheme = () => get(KEYS.THEME, 'dark');

export const saveTheme = (theme) => set(KEYS.THEME, theme);