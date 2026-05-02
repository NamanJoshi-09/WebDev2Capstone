// src/pages/Subscriptions.jsx
import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscriptions } from '../context/SubscriptionContext';
import { useDebounce }      from '../hooks/useDebounce';
import { usePagination }    from '../hooks/usePagination';
import { filterSubscriptions, formatCurrency, formatDate } from '../utils/helpers';
import { CATEGORIES } from '../data/mockData';
import { SORT_OPTIONS, STATUS_OPTIONS } from '../utils/constants';
import { CategoryBadge, StatusBadge, RenewalBadge } from '../components/common/Badge';
import { getServiceIcon } from '../data/mockData';
import EmptyState   from '../components/common/EmptyState';
import Pagination   from '../components/common/Pagination';
import ConfirmModal from '../components/common/ConfirmModal';
import {
  RiSearchLine, RiAddLine, RiEditLine,
  RiDeleteBinLine, RiFilter3Line, RiPauseLine, RiPlayLine
} from 'react-icons/ri';

export default function Subscriptions() {
  const { subscriptions, removeSub, toggleStatus } = useSubscriptions();
  const navigate = useNavigate();

  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('All');
  const [status,   setStatus]   = useState('All');
  const [sortBy,   setSortBy]   = useState('recent');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(
    () => filterSubscriptions(subscriptions, { search: debouncedSearch, category, status, sortBy }),
    [subscriptions, debouncedSearch, category, status, sortBy]
  );

  const { page, totalPages, paginated, goTo, next, prev, reset } = usePagination(filtered);

  const handleSearch = useCallback((e) => { setSearch(e.target.value); reset(); }, [reset]);

  const confirmDelete = () => {
    if (deleteTarget) {
      removeSub(deleteTarget.id, deleteTarget.name);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="section-title">Subscriptions</h1>
          <p className="text-gray-500 text-sm mt-1">{subscriptions.length} total · {subscriptions.filter(s => s.status === 'active').length} active</p>
        </div>
        <button onClick={() => navigate('/subscriptions/add')} className="btn-primary flex items-center gap-2 self-start sm:self-auto">
          <RiAddLine /> Add New
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text" value={search} onChange={handleSearch}
            placeholder="Search subscriptions…"
            className="input pl-9"
          />
        </div>

        {/* Category */}
        <select value={category} onChange={e => { setCategory(e.target.value); reset(); }} className="input sm:w-44">
          <option value="All">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Status */}
        <select value={status} onChange={e => { setStatus(e.target.value); reset(); }} className="input sm:w-36">
          {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        {/* Sort */}
        <select value={sortBy} onChange={e => { setSortBy(e.target.value); reset(); }} className="input sm:w-44">
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* List */}
      {paginated.length === 0 ? (
        <EmptyState
          icon={search ? '🔍' : '📭'}
          title={search ? 'No results found' : 'No subscriptions yet'}
          subtitle={search ? `No match for "${search}"` : 'Add your first subscription to start tracking.'}
          action={!search && (
            <button onClick={() => navigate('/subscriptions/add')} className="btn-primary text-sm">
              Add Subscription
            </button>
          )}
        />
      ) : (
        <div className="space-y-3">
          {paginated.map(sub => (
            <div key={sub.id} className="card-hover p-4 flex items-center gap-4 group">
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                sub.status === 'inactive' ? 'bg-dark-700 opacity-50' : 'bg-dark-600'
              }`}>
                {getServiceIcon(sub.name)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className={`font-semibold text-sm ${sub.status === 'inactive' ? 'text-gray-500' : 'text-white'}`}>
                    {sub.name}
                  </p>
                  <StatusBadge status={sub.status} />
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <CategoryBadge category={sub.category} />
                  <span className="text-xs text-gray-600">{sub.billingCycle}</span>
                  {sub.paymentMethod && (
                    <span className="text-xs text-gray-600">· {sub.paymentMethod}</span>
                  )}
                </div>
              </div>

              {/* Renewal */}
              <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0">
                <p className="text-xs text-gray-500">{formatDate(sub.nextRenewal)}</p>
                <RenewalBadge dateStr={sub.nextRenewal} />
              </div>

              {/* Price */}
              <div className="text-right flex-shrink-0">
                <p className="font-semibold text-white">{formatCurrency(sub.price)}</p>
                <p className="text-xs text-gray-500">/{sub.billingCycle.slice(0, 2).toLowerCase()}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <button
                  onClick={() => toggleStatus(sub.id)}
                  className="p-2 rounded-lg hover:bg-dark-600 text-gray-400 hover:text-yellow-400 transition-colors"
                  title={sub.status === 'active' ? 'Pause' : 'Activate'}
                >
                  {sub.status === 'active' ? <RiPauseLine /> : <RiPlayLine />}
                </button>
                <button
                  onClick={() => navigate(`/subscriptions/edit/${sub.id}`)}
                  className="p-2 rounded-lg hover:bg-dark-600 text-gray-400 hover:text-blue-400 transition-colors"
                  title="Edit"
                >
                  <RiEditLine />
                </button>
                <button
                  onClick={() => setDeleteTarget(sub)}
                  className="p-2 rounded-lg hover:bg-dark-600 text-gray-400 hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <RiDeleteBinLine />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} goTo={goTo} next={next} prev={prev} />

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Subscription"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}