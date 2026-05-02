// src/utils/seedDemo.js
// Run once at app startup to ensure demo account exists
import { getUsers, saveUsers, getSubscriptions, saveSubscriptions } from './storage';
import { DEMO_SUBSCRIPTIONS } from '../data/mockData';

export const seedDemoAccount = () => {
  const DEMO = {
    id:        'usr_demo',
    name:      'Demo User',
    email:     'demo@trackify.app',
    password:  'demo1234',
    avatar:    'D',
    createdAt: new Date().toISOString(),
  };

  const users = getUsers();
  if (!users.find(u => u.email === DEMO.email)) {
    saveUsers([...users, DEMO]);
  }

  const subs = getSubscriptions(DEMO.id);
  if (!subs.length) {
    saveSubscriptions(DEMO.id, DEMO_SUBSCRIPTIONS);
  }
};