// src/data/mockData.js
// Sample subscription data preloaded for new users

export const CATEGORIES = [
  'Entertainment', 'Productivity', 'Cloud Storage',
  'Music', 'Gaming', 'News', 'Health', 'Education',
  'Finance', 'Design', 'Development', 'Other'
];

export const BILLING_CYCLES = ['Monthly', 'Yearly', 'Weekly', 'Quarterly'];

export const PAYMENT_METHODS = [
  'Credit Card', 'Debit Card', 'PayPal',
  'UPI', 'Net Banking', 'Wallet', 'Other'
];

export const CATEGORY_COLORS = {
  Entertainment:  { bg: 'bg-purple-500/15', text: 'text-purple-400',  border: 'border-purple-500/30' },
  Productivity:   { bg: 'bg-blue-500/15',   text: 'text-blue-400',    border: 'border-blue-500/30'   },
  'Cloud Storage':{ bg: 'bg-cyan-500/15',   text: 'text-cyan-400',    border: 'border-cyan-500/30'   },
  Music:          { bg: 'bg-pink-500/15',   text: 'text-pink-400',    border: 'border-pink-500/30'   },
  Gaming:         { bg: 'bg-orange-500/15', text: 'text-orange-400',  border: 'border-orange-500/30' },
  News:           { bg: 'bg-gray-500/15',   text: 'text-gray-400',    border: 'border-gray-500/30'   },
  Health:         { bg: 'bg-green-500/15',  text: 'text-green-400',   border: 'border-green-500/30'  },
  Education:      { bg: 'bg-yellow-500/15', text: 'text-yellow-400',  border: 'border-yellow-500/30' },
  Finance:        { bg: 'bg-emerald-500/15',text: 'text-emerald-400', border: 'border-emerald-500/30'},
  Design:         { bg: 'bg-rose-500/15',   text: 'text-rose-400',    border: 'border-rose-500/30'   },
  Development:    { bg: 'bg-indigo-500/15', text: 'text-indigo-400',  border: 'border-indigo-500/30' },
  Other:          { bg: 'bg-slate-500/15',  text: 'text-slate-400',   border: 'border-slate-500/30'  },
};

export const SERVICE_LOGOS = {
  Netflix:      '🎬', Spotify:     '🎵', 'Amazon Prime': '📦',
  YouTube:      '▶️',  Disney:      '✨', 'Adobe CC':     '🎨',
  GitHub:       '💻', Notion:      '📝', Figma:          '🎯',
  Slack:        '💬', Dropbox:     '☁️', 'Google One':   '🔵',
  'Apple Music':'🍎', Xbox:        '🎮', PlayStation:    '🕹️',
  LinkedIn:     '💼', Duolingo:    '🦉', Coursera:       '📚',
  Default:      '💳',
};

// Returns an emoji icon for a service name
export const getServiceIcon = (name = '') => {
  const found = Object.keys(SERVICE_LOGOS).find(
    k => name.toLowerCase().includes(k.toLowerCase())
  );
  return found ? SERVICE_LOGOS[found] : SERVICE_LOGOS.Default;
};

export const DEMO_SUBSCRIPTIONS = [
  {
    id: 'sub_001',
    name: 'Netflix',
    category: 'Entertainment',
    price: 649,
    billingCycle: 'Monthly',
    nextRenewal: getFutureDate(5),
    paymentMethod: 'Credit Card',
    status: 'active',
    notes: 'Family plan - 4 screens',
    currency: 'INR',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sub_002',
    name: 'Spotify',
    category: 'Music',
    price: 119,
    billingCycle: 'Monthly',
    nextRenewal: getFutureDate(12),
    paymentMethod: 'UPI',
    status: 'active',
    notes: 'Individual plan',
    currency: 'INR',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sub_003',
    name: 'Adobe CC',
    category: 'Design',
    price: 4230,
    billingCycle: 'Monthly',
    nextRenewal: getFutureDate(3),
    paymentMethod: 'Credit Card',
    status: 'active',
    notes: 'All apps plan',
    currency: 'INR',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sub_004',
    name: 'GitHub',
    category: 'Development',
    price: 840,
    billingCycle: 'Monthly',
    nextRenewal: getFutureDate(20),
    paymentMethod: 'Credit Card',
    status: 'active',
    notes: 'Pro plan',
    currency: 'INR',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sub_005',
    name: 'Notion',
    category: 'Productivity',
    price: 800,
    billingCycle: 'Monthly',
    nextRenewal: getFutureDate(7),
    paymentMethod: 'Debit Card',
    status: 'active',
    notes: 'Plus plan',
    currency: 'INR',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sub_006',
    name: 'Amazon Prime',
    category: 'Entertainment',
    price: 1499,
    billingCycle: 'Yearly',
    nextRenewal: getFutureDate(180),
    paymentMethod: 'UPI',
    status: 'active',
    notes: '',
    currency: 'INR',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sub_007',
    name: 'Google One',
    category: 'Cloud Storage',
    price: 130,
    billingCycle: 'Monthly',
    nextRenewal: getFutureDate(2),
    paymentMethod: 'UPI',
    status: 'active',
    notes: '100GB storage',
    currency: 'INR',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sub_008',
    name: 'LinkedIn',
    category: 'Productivity',
    price: 1600,
    billingCycle: 'Monthly',
    nextRenewal: getFutureDate(25),
    paymentMethod: 'Credit Card',
    status: 'inactive',
    notes: 'Premium Career',
    currency: 'INR',
    createdAt: new Date().toISOString(),
  },
];

// Helper used inside this file only
function getFutureDate(daysFromNow) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split('T')[0];
}