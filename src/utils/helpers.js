// src/utils/helpers.js
// Pure utility functions used across the entire app

import {
  format, differenceInDays, isAfter,
  addMonths, addYears, addWeeks, addQuarters,
  parseISO, isValid
} from 'date-fns';

// ── Date helpers ─────────────────────────────────────────────────

export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
  return isValid(d) ? format(d, 'dd MMM yyyy') : '—';
};

export const formatShortDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
  return isValid(d) ? format(d, 'dd MMM') : '—';
};

export const daysUntilRenewal = (dateStr) => {
  if (!dateStr) return null;
  const d = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
  return differenceInDays(d, new Date());
};

export const getRenewalStatus = (dateStr) => {
  const days = daysUntilRenewal(dateStr);
  if (days === null) return 'unknown';
  if (days < 0)  return 'overdue';
  if (days <= 3) return 'urgent';
  if (days <= 7) return 'soon';
  return 'normal';
};

export const getRenewalLabel = (dateStr) => {
  const days = daysUntilRenewal(dateStr);
  if (days === null) return '';
  if (days < 0)    return `${Math.abs(days)}d overdue`;
  if (days === 0)  return 'Due today';
  if (days === 1)  return 'Due tomorrow';
  return `In ${days} days`;
};

// ── Price helpers ─────────────────────────────────────────────────

export const getMonthlyPrice = (price, billingCycle) => {
  switch (billingCycle) {
    case 'Yearly':    return price / 12;
    case 'Weekly':    return price * 4.33;
    case 'Quarterly': return price / 3;
    default:          return price; // Monthly
  }
};

export const getYearlyPrice = (price, billingCycle) => {
  switch (billingCycle) {
    case 'Yearly':    return price;
    case 'Weekly':    return price * 52;
    case 'Quarterly': return price * 4;
    default:          return price * 12; // Monthly
  }
};

export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

// ── Subscription stats ────────────────────────────────────────────

export const computeStats = (subscriptions) => {
  const active = subscriptions.filter(s => s.status === 'active');

  const totalMonthly = active.reduce(
    (sum, s) => sum + getMonthlyPrice(s.price, s.billingCycle), 0
  );
  const totalYearly = active.reduce(
    (sum, s) => sum + getYearlyPrice(s.price, s.billingCycle), 0
  );

  const upcomingRenewals = active
    .filter(s => {
      const days = daysUntilRenewal(s.nextRenewal);
      return days !== null && days >= 0 && days <= 7;
    })
    .sort((a, b) => daysUntilRenewal(a.nextRenewal) - daysUntilRenewal(b.nextRenewal));

  const topBySpend = [...active]
    .sort((a, b) =>
      getMonthlyPrice(b.price, b.billingCycle) -
      getMonthlyPrice(a.price, a.billingCycle)
    )
    .slice(0, 5);

  const byCategory = active.reduce((acc, s) => {
    const cat = s.category || 'Other';
    if (!acc[cat]) acc[cat] = { count: 0, monthly: 0 };
    acc[cat].count++;
    acc[cat].monthly += getMonthlyPrice(s.price, s.billingCycle);
    return acc;
  }, {});

  return {
    totalMonthly,
    totalYearly,
    activeCount: active.length,
    inactiveCount: subscriptions.length - active.length,
    upcomingRenewals,
    topBySpend,
    byCategory,
    monthlyAvg: active.length ? totalMonthly / active.length : 0,
  };
};

// ── ID generator ──────────────────────────────────────────────────

export const generateId = (prefix = 'id') =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

// ── Debounce ──────────────────────────────────────────────────────

export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// ── Search/filter/sort ────────────────────────────────────────────

export const filterSubscriptions = (subs, { search, category, status, sortBy }) => {
  let result = [...subs];

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      (s.notes || '').toLowerCase().includes(q)
    );
  }

  if (category && category !== 'All') {
    result = result.filter(s => s.category === category);
  }

  if (status && status !== 'All') {
    result = result.filter(s => s.status === status);
  }

  switch (sortBy) {
    case 'price_high':
      result.sort((a, b) =>
        getMonthlyPrice(b.price, b.billingCycle) -
        getMonthlyPrice(a.price, a.billingCycle));
      break;
    case 'price_low':
      result.sort((a, b) =>
        getMonthlyPrice(a.price, a.billingCycle) -
        getMonthlyPrice(b.price, b.billingCycle));
      break;
    case 'renewal':
      result.sort((a, b) =>
        daysUntilRenewal(a.nextRenewal) - daysUntilRenewal(b.nextRenewal));
      break;
    case 'name':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'recent':
    default:
      result.sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt));
  }

  return result;
};

// ── Next renewal date calculator ──────────────────────────────────

export const calcNextRenewal = (fromDate, billingCycle) => {
  const base = fromDate ? parseISO(fromDate) : new Date();
  let next;
  switch (billingCycle) {
    case 'Yearly':    next = addYears(base, 1);    break;
    case 'Weekly':    next = addWeeks(base, 1);    break;
    case 'Quarterly': next = addQuarters(base, 1); break;
    default:          next = addMonths(base, 1);
  }
  return format(next, 'yyyy-MM-dd');
};

// ── Truncate text ─────────────────────────────────────────────────

export const truncate = (str = '', maxLen = 40) =>
  str.length > maxLen ? str.slice(0, maxLen - 1) + '…' : str;