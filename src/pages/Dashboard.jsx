// src/pages/Dashboard.jsx
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscriptions } from '../context/SubscriptionContext';
import { useAuth }          from '../context/AuthContext';
import {
  RiArrowRightLine, RiAddLine,
  RiWalletLine, RiCalendarCheckLine,
  RiAppsLine, RiBellLine
} from 'react-icons/ri';
import { formatCurrency, formatDate, daysUntilRenewal, getRenewalStatus } from '../utils/helpers';
import { CategoryBadge, StatusBadge, RenewalBadge } from '../components/common/Badge';
import { getServiceIcon } from '../data/mockData';
import EmptyState from '../components/common/EmptyState';

const StatCard = ({ icon: Icon, label, value, sub, color = 'brand' }) => {
  const colorMap = {
    brand:  { bg: 'bg-brand-500/10',  icon: 'text-brand-400',  border: 'border-brand-500/20'  },
    blue:   { bg: 'bg-blue-500/10',   icon: 'text-blue-400',   border: 'border-blue-500/20'   },
    purple: { bg: 'bg-purple-500/10', icon: 'text-purple-400', border: 'border-purple-500/20' },
    yellow: { bg: 'bg-yellow-500/10', icon: 'text-yellow-400', border: 'border-yellow-500/20' },
  };
  const c = colorMap[color] || colorMap.brand;
  return (
    <div className="stat-card">
      <div className={`w-11 h-11 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center mb-3`}>
        <Icon className={`text-xl ${c.icon}`} />
      </div>
      <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{label}</p>
      <p className="font-display text-2xl font-bold text-white mt-0.5">{value}</p>
      {sub && <p className="text-xs text-gray-500">{sub}</p>}
    </div>
  );
};

export default function Dashboard() {
  const { subscriptions, stats } = useSubscriptions();
  const { currentUser }          = useAuth();
  const navigate                 = useNavigate();

  const recentSubs = useMemo(
    () => [...subscriptions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5),
    [subscriptions]
  );

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{greeting},</p>
          <h1 className="font-display text-3xl font-bold text-white">{currentUser?.name?.split(' ')[0]} 👋</h1>
        </div>
        <button onClick={() => navigate('/subscriptions/add')} className="btn-primary flex items-center gap-2">
          <RiAddLine /> Add Subscription
        </button>
      </div>

      {/* Renewal alert banner */}
      {stats.upcomingRenewals?.length > 0 && (
        <div className="p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-between gap-4 animate-slide-up">
          <div className="flex items-center gap-3">
            <RiBellLine className="text-yellow-400 text-xl flex-shrink-0" />
            <div>
              <p className="text-yellow-300 font-semibold text-sm">
                {stats.upcomingRenewals.length} subscription{stats.upcomingRenewals.length > 1 ? 's' : ''} renewing within 7 days
              </p>
              <p className="text-yellow-500/70 text-xs mt-0.5">
                {stats.upcomingRenewals.map(s => s.name).join(', ')}
              </p>
            </div>
          </div>
          <button onClick={() => navigate('/subscriptions')} className="text-yellow-400 hover:text-yellow-300 text-sm flex items-center gap-1 flex-shrink-0">
            View <RiArrowRightLine />
          </button>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={RiWalletLine}        label="Monthly Spend"     value={formatCurrency(stats.totalMonthly || 0)}  sub={`${stats.activeCount || 0} active plans`}    color="brand"  />
        <StatCard icon={RiCalendarCheckLine} label="Yearly Projected"  value={formatCurrency(stats.totalYearly  || 0)}  sub="Based on active subs"                         color="blue"   />
        <StatCard icon={RiAppsLine}          label="Active Subs"       value={stats.activeCount   || 0}                 sub={`${stats.inactiveCount || 0} paused`}          color="purple" />
        <StatCard icon={RiBellLine}          label="Renewing Soon"     value={stats.upcomingRenewals?.length || 0}      sub="Within next 7 days"                           color="yellow" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent subscriptions */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-white">Recent Subscriptions</h2>
            <button onClick={() => navigate('/subscriptions')} className="text-brand-400 hover:text-brand-300 text-sm flex items-center gap-1">
              View all <RiArrowRightLine />
            </button>
          </div>

          {recentSubs.length === 0 ? (
            <EmptyState icon="📭" title="No subscriptions yet"
              subtitle="Add your first subscription to get started."
              action={<button onClick={() => navigate('/subscriptions/add')} className="btn-primary text-sm">Add Subscription</button>}
            />
          ) : (
            <div className="space-y-3">
              {recentSubs.map(sub => (
                <div key={sub.id} onClick={() => navigate(`/subscriptions/edit/${sub.id}`)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-dark-700 cursor-pointer transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-dark-600 flex items-center justify-center text-xl flex-shrink-0">
                    {getServiceIcon(sub.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm truncate">{sub.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <CategoryBadge category={sub.category} />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-white text-sm">{formatCurrency(sub.price)}</p>
                    <p className="text-xs text-gray-500">/{sub.billingCycle.toLowerCase()}</p>
                  </div>
                  <StatusBadge status={sub.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming renewals sidebar */}
        <div className="card p-6">
          <h2 className="font-semibold text-white mb-5">Upcoming Renewals</h2>
          {!stats.upcomingRenewals?.length ? (
            <div className="text-center py-8">
              <p className="text-4xl mb-3">🎉</p>
              <p className="text-gray-500 text-sm">No renewals in the next 7 days</p>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.upcomingRenewals.map(sub => {
                const days    = daysUntilRenewal(sub.nextRenewal);
                const status  = getRenewalStatus(sub.nextRenewal);
                const barColor = status === 'urgent' ? 'border-red-500' : 'border-yellow-500';
                return (
                  <div key={sub.id} className={`p-3 rounded-xl border-l-2 ${barColor} bg-dark-700`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getServiceIcon(sub.name)}</span>
                        <div>
                          <p className="text-sm font-medium text-white">{sub.name}</p>
                          <p className="text-xs text-gray-500">{formatDate(sub.nextRenewal)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-white">{formatCurrency(sub.price)}</p>
                        <RenewalBadge dateStr={sub.nextRenewal} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Top spending */}
      {stats.topBySpend?.length > 0 && (
        <div className="card p-6">
          <h2 className="font-semibold text-white mb-5">Top Spending Subscriptions</h2>
          <div className="space-y-3">
            {stats.topBySpend.map((sub, i) => {
              const pct = stats.totalMonthly
                ? Math.round((sub.price / stats.totalMonthly) * 100)
                : 0;
              return (
                <div key={sub.id} className="flex items-center gap-4">
                  <span className="text-gray-600 text-sm font-mono w-4 flex-shrink-0">#{i + 1}</span>
                  <span className="text-lg w-8 text-center flex-shrink-0">{getServiceIcon(sub.name)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white truncate">{sub.name}</span>
                      <span className="text-sm font-semibold text-white ml-2">{formatCurrency(sub.price)}<span className="text-gray-500 font-normal text-xs">/{sub.billingCycle.slice(0,2).toLowerCase()}</span></span>
                    </div>
                    <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-brand-500 to-teal-500 rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right flex-shrink-0">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}