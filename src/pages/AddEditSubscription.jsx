// src/pages/AddEditSubscription.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSubscriptions } from '../context/SubscriptionContext';
import { CATEGORIES, BILLING_CYCLES, PAYMENT_METHODS } from '../data/mockData';
import { calcNextRenewal, formatCurrency, getMonthlyPrice, getYearlyPrice } from '../utils/helpers';
import { RiArrowLeftLine, RiSaveLine } from 'react-icons/ri';

const EMPTY = {
  name: '', category: 'Entertainment', price: '',
  billingCycle: 'Monthly', nextRenewal: '', paymentMethod: 'Credit Card',
  status: 'active', notes: '', currency: 'INR',
};

// ✅ Field is defined OUTSIDE — never recreated on re-render
const Field = ({ label, error, req, children }) => (
  <div>
    <label className="label">
      {label}{req && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    {children}
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

export default function AddEditSubscription() {
  const { id }                              = useParams();
  const { subscriptions, addSub, editSub } = useSubscriptions();
  const navigate                            = useNavigate();
  const isEdit                              = Boolean(id);

  const [form, setForm]       = useState(EMPTY);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const sub = subscriptions.find(s => s.id === id);
      if (sub) setForm(sub);
      else navigate('/subscriptions');
    }
  }, [id]);

  const handle = (e) => {
    const { name, value } = e.target;
    setForm(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'billingCycle' && !isEdit) {
        updated.nextRenewal = calcNextRenewal(new Date().toISOString(), value);
      }
      return updated;
    });
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Service name is required';
    if (!form.price || isNaN(form.price) || +form.price <= 0) e.price = 'Enter a valid price';
    if (!form.nextRenewal) e.nextRenewal = 'Renewal date is required';
    return e;
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 300));
    const payload = { ...form, price: +form.price };
    isEdit ? editSub(payload) : addSub(payload);
    setLoading(false);
    navigate('/subscriptions');
  };

  const monthly = form.price ? getMonthlyPrice(+form.price, form.billingCycle) : 0;
  const yearly  = form.price ? getYearlyPrice(+form.price, form.billingCycle)  : 0;

  return (
    <div className="max-w-2xl mx-auto animate-slide-up">
      <button onClick={() => navigate('/subscriptions')}
        className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
        <RiArrowLeftLine /> Back to Subscriptions
      </button>

      <div className="card p-6 md:p-8">
        <h1 className="font-display text-2xl font-bold text-white mb-6">
          {isEdit ? 'Edit Subscription' : 'Add Subscription'}
        </h1>

        <form onSubmit={submit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Service Name" error={errors.name} req>
              <input
                name="name"
                value={form.name}
                onChange={handle}
                className={`input ${errors.name ? 'border-red-500' : ''}`}
                placeholder="e.g. Netflix, Spotify…"
              />
            </Field>

            <Field label="Category">
              <select name="category" value={form.category} onChange={handle} className="input">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Price (₹)" error={errors.price} req>
              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handle}
                className={`input ${errors.price ? 'border-red-500' : ''}`}
                placeholder="0.00"
              />
            </Field>

            <Field label="Billing Cycle">
              <select name="billingCycle" value={form.billingCycle} onChange={handle} className="input">
                {BILLING_CYCLES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>
          </div>

          {/* Price preview */}
          {+form.price > 0 && (
            <div className="p-4 rounded-xl bg-brand-500/5 border border-brand-500/20 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Monthly Equivalent</p>
                <p className="font-semibold text-brand-400">{formatCurrency(monthly)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Yearly Cost</p>
                <p className="font-semibold text-blue-400">{formatCurrency(yearly)}</p>
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Next Renewal Date" error={errors.nextRenewal} req>
              <input
                name="nextRenewal"
                type="date"
                value={form.nextRenewal}
                onChange={handle}
                className={`input ${errors.nextRenewal ? 'border-red-500' : ''}`}
              />
            </Field>

            <Field label="Payment Method">
              <select name="paymentMethod" value={form.paymentMethod} onChange={handle} className="input">
                {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Status">
            <div className="flex gap-3">
              {['active', 'inactive'].map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, status: s }))}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    form.status === s
                      ? s === 'active'
                        ? 'bg-brand-500/20 border-brand-500/50 text-brand-400'
                        : 'bg-gray-500/20 border-gray-500/50 text-gray-400'
                      : 'bg-dark-700 border-dark-500 text-gray-500 hover:border-dark-400'
                  }`}
                >
                  {s === 'active' ? '● Active' : '○ Paused'}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Notes (optional)">
            <textarea
              name="notes"
              value={form.notes}
              onChange={handle}
              rows={3}
              className="input resize-none"
              placeholder="Any notes about this subscription…"
            />
          </Field>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => navigate('/subscriptions')} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2">
              <RiSaveLine />
              {loading ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Subscription'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}