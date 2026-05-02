// src/components/layout/Topbar.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { RiMenuLine, RiBellLine, RiAddLine } from 'react-icons/ri';
import { useUI }            from '../../context/UIContext';
import { useSubscriptions } from '../../context/SubscriptionContext';

const PAGE_TITLES = {
  '/dashboard':     'Dashboard',
  '/subscriptions': 'Subscriptions',
  '/calendar':      'Calendar',
  '/settings':      'Settings',
};

export default function Topbar() {
  const { toggleSidebar } = useUI();
  const { stats }         = useSubscriptions();
  const location          = useLocation();
  const navigate          = useNavigate();
  const urgentCount       = stats?.upcomingRenewals?.length || 0;

  const title = PAGE_TITLES[location.pathname] ||
    (location.pathname.includes('add')  ? 'Add Subscription'  :
     location.pathname.includes('edit') ? 'Edit Subscription' : 'Trackify');

  return (
    <header className="h-16 bg-dark-800 border-b border-dark-600 flex items-center justify-between px-4 md:px-6 flex-shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-white transition-colors"
        >
          <RiMenuLine className="text-xl" />
        </button>
        <h1 className="font-display text-xl font-bold text-white">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/subscriptions')}
          className="relative p-2 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-white transition-colors"
          title="Upcoming renewals"
        >
          <RiBellLine className="text-xl" />
          {urgentCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
              {urgentCount}
            </span>
          )}
        </button>

        <button
          onClick={() => navigate('/subscriptions/add')}
          className="btn-primary flex items-center gap-2 text-sm py-2 px-4"
        >
          <RiAddLine className="text-base" />
          <span className="hidden sm:inline">Add New</span>
        </button>
      </div>
    </header>
  );
}