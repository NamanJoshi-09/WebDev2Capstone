// src/services/currencyService.js
// Fetches live exchange rates from ExchangeRate-API (free tier, no key needed)

import axios from 'axios';
import { EXCHANGE_API_BASE, BASE_CURRENCY } from '../utils/constants';

const CACHE_KEY   = 'trackify_exchange_rates';
const CACHE_TTL   = 1000 * 60 * 60; // 1 hour

// Returns cached rates or fetches fresh ones
export const getExchangeRates = async (base = BASE_CURRENCY) => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { rates, timestamp, cachedBase } = JSON.parse(cached);
      const age = Date.now() - timestamp;
      if (age < CACHE_TTL && cachedBase === base) return rates;
    }

    const { data } = await axios.get(`${EXCHANGE_API_BASE}/${base}`);
    const rates = data.rates;

    localStorage.setItem(CACHE_KEY, JSON.stringify({
      rates, timestamp: Date.now(), cachedBase: base
    }));

    return rates;
  } catch (err) {
    console.error('Exchange rate fetch failed:', err.message);
    // Return fallback rates so the app doesn't break
    return { INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.0095 };
  }
};

// Converts an amount from one currency to another
export const convertCurrency = async (amount, from, to) => {
  if (from === to) return amount;
  const rates = await getExchangeRates(from);
  const rate  = rates[to];
  return rate ? +(amount * rate).toFixed(2) : amount;
};

// Returns a list of popular currencies for the settings dropdown
export const POPULAR_CURRENCIES = [
  { code: 'INR', label: '₹ Indian Rupee'    },
  { code: 'USD', label: '$ US Dollar'       },
  { code: 'EUR', label: '€ Euro'            },
  { code: 'GBP', label: '£ British Pound'   },
  { code: 'AED', label: 'AED UAE Dirham'    },
  { code: 'SGD', label: 'S$ Singapore Dollar'},
  { code: 'JPY', label: '¥ Japanese Yen'    },
  { code: 'CAD', label: 'C$ Canadian Dollar'},
];