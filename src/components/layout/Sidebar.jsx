// src/components/layout/Sidebar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUI }   from '../../context/UIContext';
import {
  RiDashboardLine, RiAppsLine, RiCalendarLine,
  RiSettingsLine, RiLogoutBoxLine, RiStackLine
} from 'react-icons/ri';
import { APP_NAME } from '../../utils/constants';

const NAV = [
  { to: '/dashboard',     icon: RiDashboardLine, label: 'Dashboard'     },
  { to: '/subscriptions', icon: RiAppsLine,      label: 'Subscriptions' },
  { to: '/calendar',      icon: RiCalendarLine,  label: 'Calendar'      },
  { to: '/settings',      icon: RiSettingsLine,  label: 'Settings'      },
];

export default function Sidebar() {
  const { currentUser, logout } = useAuth();
  const { sidebarOpen }         = useUI();
  const navigate                = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <aside className={`
      fixed lg:static inset-y-0 left-0 z-30
      w-64 bg-dark-800 border-r border-dark-600
      flex flex-col transition-transform duration-300
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Logo */}
      <div className="p-6 border-b border-dark-600">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center shadow-glow">
            <RiStackLine className="text-white text-lg" />
          </div>
          <span className="font-display text-xl font-bold text-white">{APP_NAME}</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <Icon className="text-lg flex-shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="p-4 border-t border-dark-600">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-dark-700 mb-2">
          <div className="w-8 h-8 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-400 font-bold text-sm flex-shrink-0">
            {currentUser?.avatar || '?'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">{currentUser?.name}</p>
            <p className="text-xs text-gray-500 truncate">{currentUser?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="sidebar-link w-full text-red-400 hover:text-red-300 hover:bg-red-500/10">
          <RiLogoutBoxLine className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}