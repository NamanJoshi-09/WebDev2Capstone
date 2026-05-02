// src/components/common/Badge.jsx
import { CATEGORY_COLORS } from '../../data/mockData';
import { getRenewalStatus, getRenewalLabel } from '../../utils/helpers';

export const CategoryBadge = ({ category }) => {
  const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;
  return (
    <span className={`badge ${colors.bg} ${colors.text} border ${colors.border}`}>
      {category}
    </span>
  );
};

export const StatusBadge = ({ status }) => (
  <span className={`badge ${
    status === 'active'
      ? 'bg-brand-500/15 text-brand-400 border border-brand-500/30'
      : 'bg-gray-500/15 text-gray-400 border border-gray-500/30'
  }`}>
    <span className={`w-1.5 h-1.5 rounded-full inline-block mr-1 ${status === 'active' ? 'bg-brand-400' : 'bg-gray-500'}`} />
    {status === 'active' ? 'Active' : 'Paused'}
  </span>
);

export const RenewalBadge = ({ dateStr }) => {
  const status = getRenewalStatus(dateStr);
  const label  = getRenewalLabel(dateStr);
  const styles = {
    urgent:  'bg-red-500/15 text-red-400 border-red-500/30',
    soon:    'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    overdue: 'bg-red-700/15 text-red-500 border-red-700/30',
    normal:  'bg-brand-500/15 text-brand-400 border-brand-500/30',
    unknown: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
  };
  return (
    <span className={`badge border ${styles[status] || styles.normal}`}>
      {label}
    </span>
  );
};