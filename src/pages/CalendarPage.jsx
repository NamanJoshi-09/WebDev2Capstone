// src/pages/CalendarPage.jsx
import { useState, useMemo } from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';
import { parseISO, format, startOfMonth, endOfMonth, eachDayOfInterval,
         isSameDay, isSameMonth, isToday, getDay } from 'date-fns';
import { getRenewalStatus, formatCurrency, daysUntilRenewal } from '../utils/helpers';
import { getServiceIcon } from '../data/mockData';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';

export default function CalendarPage() {
  const { subscriptions } = useSubscriptions();
  const [current, setCurrent] = useState(new Date());

  const prev = () => setCurrent(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const next = () => setCurrent(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const days = useMemo(() => {
    const start = startOfMonth(current);
    const end   = endOfMonth(current);
    return eachDayOfInterval({ start, end });
  }, [current]);

  // Map renewal date → subscriptions
  const renewalMap = useMemo(() => {
    const map = {};
    subscriptions.filter(s => s.status === 'active' && s.nextRenewal).forEach(sub => {
      const key = sub.nextRenewal.slice(0, 10);
      if (!map[key]) map[key] = [];
      map[key].push(sub);
    });
    return map;
  }, [subscriptions]);

  const subsThisMonth = useMemo(() =>
    subscriptions.filter(s => {
      if (!s.nextRenewal) return false;
      return isSameMonth(parseISO(s.nextRenewal), current);
    }).sort((a, b) => daysUntilRenewal(a.nextRenewal) - daysUntilRenewal(b.nextRenewal)),
    [subscriptions, current]
  );

  const startPad = getDay(startOfMonth(current)); // 0=Sun

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="section-title">Renewal Calendar</h1>
        <p className="text-gray-500 text-sm mt-1">View upcoming subscription renewals by date</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 card p-6">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={prev} className="p-2 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-white transition-colors">
              <RiArrowLeftLine />
            </button>
            <h2 className="font-display text-xl font-bold text-white">
              {format(current, 'MMMM yyyy')}
            </h2>
            <button onClick={next} className="p-2 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-white transition-colors">
              <RiArrowRightLine />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
              <div key={d} className="text-center text-xs font-medium text-gray-600 py-1">{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startPad }).map((_, i) => (
              <div key={`pad-${i}`} className="h-16 rounded-lg" />
            ))}
            {days.map(day => {
              const key   = format(day, 'yyyy-MM-dd');
              const subs  = renewalMap[key] || [];
              const today = isToday(day);
              return (
                <div key={key} className={`h-16 rounded-lg p-1.5 border transition-colors ${
                  today ? 'border-brand-500/50 bg-brand-500/10' : 'border-dark-600 hover:border-dark-500'
                }`}>
                  <p className={`text-xs font-medium text-right mb-1 ${today ? 'text-brand-400' : 'text-gray-500'}`}>
                    {format(day, 'd')}
                  </p>
                  <div className="space-y-0.5 overflow-hidden">
                    {subs.slice(0, 2).map(sub => {
                      const st = getRenewalStatus(sub.nextRenewal);
                      const dotColor = st === 'urgent' ? 'bg-red-400' : st === 'soon' ? 'bg-yellow-400' : 'bg-brand-400';
                      return (
                        <div key={sub.id} className="flex items-center gap-0.5 truncate" title={sub.name}>
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColor}`} />
                          <span className="text-[9px] text-gray-300 truncate">{sub.name}</span>
                        </div>
                      );
                    })}
                    {subs.length > 2 && (
                      <p className="text-[9px] text-gray-500">+{subs.length - 2} more</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* This month sidebar */}
        <div className="card p-6">
          <h3 className="font-semibold text-white mb-1">
            {format(current, 'MMMM')} Renewals
          </h3>
          <p className="text-xs text-gray-500 mb-4">{subsThisMonth.length} subscription{subsThisMonth.length !== 1 ? 's' : ''}</p>

          {subsThisMonth.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-3xl mb-2">📅</p>
              <p className="text-gray-500 text-sm">No renewals this month</p>
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto max-h-[500px] scrollbar-hide">
              {subsThisMonth.map(sub => {
                const status = getRenewalStatus(sub.nextRenewal);
                const border = status === 'urgent' ? 'border-red-500' : status === 'soon' ? 'border-yellow-500' : 'border-brand-500';
                return (
                  <div key={sub.id} className={`p-3 rounded-xl border-l-2 ${border} bg-dark-700`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{getServiceIcon(sub.name)}</span>
                      <span className="text-sm font-medium text-white">{sub.name}</span>
                    </div>
                    <p className="text-xs text-gray-500">{format(parseISO(sub.nextRenewal), 'dd MMM yyyy')}</p>
                    <p className="text-xs font-semibold text-brand-400 mt-0.5">{formatCurrency(sub.price)}/{sub.billingCycle.slice(0,2).toLowerCase()}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}