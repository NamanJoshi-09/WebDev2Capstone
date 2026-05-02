// src/pages/Settings.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUI }   from '../context/UIContext';
import { useSubscriptions } from '../context/SubscriptionContext';
import { POPULAR_CURRENCIES } from '../services/currencyService';
import { useExchangeRate }    from '../hooks/useExchangeRate';
import { formatCurrency }     from '../utils/helpers';
import { toast } from 'react-toastify';
import { RiUserLine, RiGlobalLine, RiDeleteBinLine, RiSaveLine } from 'react-icons/ri';

// ✅ Outside the component
const Section = ({ icon: Icon, title, children }) => (
  <div className="card p-6">
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
        <Icon className="text-brand-400" />
      </div>
      <h2 className="font-semibold text-white">{title}</h2>
    </div>
    {children}
  </div>
);

export default function Settings() {
  const { currentUser, updateProfile } = useAuth();
  const { currency, setCurrency }      = useUI();
  const { stats }                      = useSubscriptions();
  const { rate, loading: rateLoading } = useExchangeRate(currency);

  const [profile, setProfile]         = useState({
    name:  currentUser?.name  || '',
    email: currentUser?.email || '',
  });
  const [profileSaving, setProfileSaving] = useState(false);

  const saveProfile = async (e) => {
    e.preventDefault();
    if (!profile.name.trim()) { toast.error('Name is required'); return; }
    setProfileSaving(true);
    await new Promise(r => setTimeout(r, 400));
    updateProfile({ name: profile.name.trim(), avatar: profile.name.trim().charAt(0).toUpperCase() });
    setProfileSaving(false);
  };

  const handleCurrency = (e) => {
    setCurrency(e.target.value);
    toast.info(`Currency changed to ${e.target.value}`);
  };

  const convertedMonthly = stats.totalMonthly ? +(stats.totalMonthly * rate).toFixed(2) : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="section-title">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your profile and preferences</p>
      </div>

      <Section icon={RiUserLine} title="Profile">
        <form onSubmit={saveProfile} className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input className="input" value={profile.name}
              onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
              placeholder="Your name" />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input opacity-50 cursor-not-allowed" value={profile.email}
              disabled placeholder="Email (read-only)" />
            <p className="text-xs text-gray-600 mt-1">Email cannot be changed</p>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-700">
            <div className="w-14 h-14 rounded-full bg-brand-500/20 border-2 border-brand-500/40 flex items-center justify-center text-brand-400 font-bold text-2xl">
              {profile.name.charAt(0).toUpperCase() || '?'}
            </div>
            <div>
              <p className="text-white font-medium">{profile.name || 'Your Name'}</p>
              <p className="text-gray-500 text-sm">{profile.email}</p>
            </div>
          </div>

          <button type="submit" disabled={profileSaving} className="btn-primary flex items-center gap-2">
            <RiSaveLine /> {profileSaving ? 'Saving…' : 'Save Profile'}
          </button>
        </form>
      </Section>

      <Section icon={RiGlobalLine} title="Currency & Exchange Rate">
        <div className="space-y-4">
          <div>
            <label className="label">Display Currency</label>
            <select value={currency} onChange={handleCurrency} className="input">
              {POPULAR_CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>{c.label}</option>
              ))}
            </select>
          </div>

          {currency !== 'INR' && (
            <div className="p-4 rounded-xl bg-dark-700">
              <p className="text-xs text-gray-500 mb-2">Live Exchange Rate (ExchangeRate-API)</p>
              {rateLoading ? (
                <p className="text-gray-400 text-sm">Fetching rate…</p>
              ) : (
                <div className="space-y-2">
                  <p className="text-white font-semibold">1 INR = {rate.toFixed(6)} {currency}</p>
                  <p className="text-gray-400 text-sm">
                    Your monthly spend:{' '}
                    <span className="text-brand-400 font-semibold">
                      {formatCurrency(convertedMonthly, currency)}
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </Section>

      <Section icon={RiDeleteBinLine} title="Danger Zone">
        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
          <p className="text-sm text-gray-400 mb-3">
            Clearing your data will permanently delete all subscriptions stored in this browser.
          </p>
          <button
            onClick={() => {
              if (window.confirm('This will delete ALL your subscriptions. Are you sure?')) {
                localStorage.removeItem(`trackify_subscriptions_${currentUser?.id}`);
                toast.error('All subscription data cleared.');
                window.location.reload();
              }
            }}
            className="btn-danger text-sm"
          >
            Clear All Data
          </button>
        </div>
      </Section>
    </div>
  );
}