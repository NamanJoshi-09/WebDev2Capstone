// src/hooks/usePagination.js
import { useState, useMemo } from 'react';
import { ITEMS_PER_PAGE } from '../utils/constants';

export const usePagination = (items, pageSize = ITEMS_PER_PAGE) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const paginated  = useMemo(
    () => items.slice((page - 1) * pageSize, page * pageSize),
    [items, page, pageSize]
  );

  const goTo   = (p) => setPage(Math.min(Math.max(1, p), totalPages));
  const next   = () => goTo(page + 1);
  const prev   = () => goTo(page - 1);
  const reset  = () => setPage(1);

  return { page, totalPages, paginated, goTo, next, prev, reset };
};