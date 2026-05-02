// src/hooks/useExchangeRate.js
import { useState, useEffect } from 'react';
import { getExchangeRates } from '../services/currencyService';
import { BASE_CURRENCY } from '../utils/constants';

export const useExchangeRate = (targetCurrency = BASE_CURRENCY) => {
  const [rate, setRate]       = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (targetCurrency === BASE_CURRENCY) { setRate(1); return; }
    setLoading(true);
    getExchangeRates(BASE_CURRENCY)
      .then(rates => {
        setRate(rates[targetCurrency] || 1);
        setError(null);
      })
      .catch(() => setError('Rate fetch failed'))
      .finally(() => setLoading(false));
  }, [targetCurrency]);

  const convert = (amount) => +(amount * rate).toFixed(2);

  return { rate, loading, error, convert };
};