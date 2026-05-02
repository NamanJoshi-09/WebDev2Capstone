// src/pages/Signup.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RiStackLine, RiEyeLine, RiEyeOffLine, RiArrowLeftLine } from 'react-icons/ri';
import { toast } from 'react-toastify';


const Field = ({ name, label, type = 'text', placeholder, value, onChange, error, showToggle, showPw, onToggle }) => (
  <div>
    <label className="label">{label}</label>
    <div className="relative">
      <input
        name={name}
        type={showToggle ? (showPw ? 'text' : 'password') : type}
        value={value}
        onChange={onChange}
        className={`input ${showToggle ? 'pr-10' : ''} ${error ? 'border-red-500' : ''}`}
        placeholder={placeholder}
      />
      {showToggle && (
        <button type="button" onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
          {showPw ? <RiEyeOffLine /> : <RiEyeLine />}
        </button>
      )}
    </div>
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

export default function Signup() {
  const { signup }            = useAuth();
  const navigate              = useNavigate();
  const [form, setForm]       = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors]   = useState({});
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);


  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const res = signup(form.name.trim(), form.email, form.password);
    setLoading(false);
    if (res.success) {
      toast.success('Account created! Welcome to Trackify 🎉');
      navigate('/dashboard');
    } else {
      setErrors({ general: res.message });
    }
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
          <h2 className="font-display text-2xl font-bold text-white mb-1">Create account</h2>
          <p className="text-gray-500 text-sm mb-6">Start tracking your subscriptions</p>

          {errors.general && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <Field name="name"     label="Full Name" placeholder="John Doe"
              value={form.name} onChange={handle} error={errors.name} />
            <Field name="email"    label="Email" type="email" placeholder="you@example.com"
              value={form.email} onChange={handle} error={errors.email} />
            <Field name="password" label="Password" placeholder="Min 6 characters"
              value={form.password} onChange={handle} error={errors.password}
              showToggle showPw={showPw} onToggle={() => setShowPw(p => !p)} />
            <Field name="confirm"  label="Confirm Password" placeholder="Repeat password"
              value={form.confirm} onChange={handle} error={errors.confirm}
              showToggle showPw={showPw} onToggle={() => setShowPw(p => !p)} />

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base mt-2">
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-400 hover:text-brand-300 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}