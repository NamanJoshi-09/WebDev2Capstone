// src/pages/Landing.jsx
import { useNavigate } from 'react-router-dom';
import { RiStackLine, RiArrowRightLine, RiShieldCheckLine, RiLineChartLine, RiBellLine, RiCalendarLine } from 'react-icons/ri';
import { APP_NAME } from '../utils/constants';

const FEATURES = [
  { icon: RiLineChartLine, title: 'Spending Analytics', desc: 'Visualise your monthly and yearly subscription costs with beautiful charts and insights.' },
  { icon: RiBellLine,      title: 'Renewal Reminders', desc: 'Never miss a renewal. Get alerted 7 days before any subscription charges your account.' },
  { icon: RiCalendarLine,  title: 'Calendar View',     desc: 'See all upcoming renewals laid out on a monthly calendar for full visibility.' },
  { icon: RiShieldCheckLine,title:'Secure & Private',  desc: 'All data stays on your device. No account needed. No servers. Pure privacy.' },
];

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-dark-850 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-5 border-b border-dark-600/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center shadow-glow">
            <RiStackLine className="text-white text-lg" />
          </div>
          <span className="font-display text-xl font-bold">{APP_NAME}</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/login')}  className="btn-secondary text-sm py-2">Login</button>
          <button onClick={() => navigate('/signup')} className="btn-primary text-sm py-2">Get Started</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 md:px-16 pt-24 pb-32 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/5 blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse-slow" />
            Smart Subscription Management
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Take Control of<br />
            <span className="gradient-text">Every Subscription</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            {APP_NAME} helps you track, manage, and optimise all your recurring subscriptions in one beautiful dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/signup')}
              className="btn-primary text-base py-3 px-8 flex items-center justify-center gap-2"
            >
              Start for Free <RiArrowRightLine />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="btn-secondary text-base py-3 px-8"
            >
              Sign In
            </button>
          </div>

          <p className="mt-4 text-xs text-gray-600">No credit card required · 100% free · Local storage only</p>
        </div>

        {/* Mock dashboard preview */}
        <div className="relative max-w-4xl mx-auto mt-20 animate-fade-in">
          <div className="card p-4 md:p-6 shadow-card-hover border-dark-500/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {[
                { label: 'Monthly Spend', value: '₹6,378', color: 'text-brand-400' },
                { label: 'Yearly Projected', value: '₹76,536', color: 'text-blue-400' },
                { label: 'Active Subs', value: '7', color: 'text-purple-400' },
                { label: 'Renewing Soon', value: '3', color: 'text-yellow-400' },
              ].map(s => (
                <div key={s.label} className="bg-dark-700 rounded-xl p-3 text-left">
                  <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                  <p className={`font-display text-xl font-bold ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {['Netflix · ₹649/mo', 'Adobe CC · ₹4,230/mo', 'Spotify · ₹119/mo'].map(s => (
                <div key={s} className="flex items-center justify-between bg-dark-700 rounded-lg px-3 py-2">
                  <span className="text-sm text-gray-300">{s}</span>
                  <span className="badge bg-brand-500/15 text-brand-400 border border-brand-500/30">Active</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-16 py-24 bg-dark-800/40">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
            Everything you need to <span className="gradient-text">stay in control</span>
          </h2>
          <p className="text-gray-500 text-center mb-14 max-w-xl mx-auto">
            Built for individuals and small teams who want clarity over their recurring expenses.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-hover p-6">
                <div className="w-11 h-11 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-4">
                  <Icon className="text-brand-400 text-xl" />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Ready to stop overpaying?
          </h2>
          <button
            onClick={() => navigate('/signup')}
            className="btn-primary text-base py-3 px-10 inline-flex items-center gap-2"
          >
            Get Started Free <RiArrowRightLine />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-600 px-6 md:px-16 py-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} {APP_NAME} · Built as a university capstone project
      </footer>
    </div>
  );
}