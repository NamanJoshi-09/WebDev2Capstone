// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RiStackLine, RiEyeLine, RiEyeOffLine, RiArrowLeftLine } from 'react-icons/ri';
import { toast } from 'react-toastify';



export default function Login() {
  const { login }             = useAuth();
  const navigate              = useNavigate();
  const [form, setForm]       = useState({ email: '', password: '' });
  const [errors, setErrors]   = useState({});
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);


  const validate = () => {
    const e = {};
    if (!form.email)    e.email    = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password is required';
    return e;
  };

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const res = login(form.email, form.password);
    setLoading(false);
    if (res.success) {
      toast.success('Welcome back!');
      navigate('/dashboard');
    } else {
      setErrors({ general: res.message });
    }
  };

  const demoLogin = () => {
    setForm({ email: 'demo@trackify.app', password: 'demo1234' });
    toast.info('Demo credentials filled. Click Sign In.');
  };

  return (
    
    <div className="min-h-screen bg-dark-850 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">

        {/* ← Back to Home */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-500 hover:text-white text-sm mb-6 transition-colors mx-auto w-fit"
        >
          <RiArrowLeftLine /> Back to Home
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center shadow-glow">
            <RiStackLine className="text-white text-xl" />
          </div>
          <span className="font-display text-2xl font-bold text-white">Trackify</span>
        </div>

        <div className="card p-8">
          <h2 className="font-display text-2xl font-bold text-white mb-1">Welcome back</h2>
          <p className="text-gray-500 text-sm mb-6">Sign in to your account</p>

          {errors.general && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input name="email" type="email" value={form.email} onChange={handle}
                className={`input ${errors.email ? 'border-red-500' : ''}`}
                placeholder="you@example.com" />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input name="password" type={showPw ? 'text' : 'password'}
                  value={form.password} onChange={handle}
                  className={`input pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="••••••••" />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPw ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base mt-2">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="divider" />

          <button onClick={demoLogin} className="btn-secondary w-full text-sm">
            Use Demo Account
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            No account?{' '}
            <Link to="/signup" className="text-brand-400 hover:text-brand-300 font-medium">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}