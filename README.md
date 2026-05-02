Trackify — Subscription Tracker

> A fintech-inspired subscription management dashboard built as a university capstone project.

![React](https://img.shields.io/badge/React-18-61dafb?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## 🖥️ Live Demo

> Demo credentials — Email: `demo@trackify.app` · Password: `demo1234`

---

## 📌 About

Trackify helps users track, manage, and optimise all their recurring subscriptions in one clean dashboard. Built to feel like a real fintech SaaS product — not a beginner CRUD app.

---

## ✨ Features

- 🔐 **Mock Authentication** — signup, login, logout with localStorage
- 📊 **Dashboard** — monthly spend, yearly projection, active count, renewal alerts
- ➕ **Full CRUD** — add, edit, delete, pause/activate subscriptions
- 🔔 **Renewal Reminders** — highlights subscriptions renewing within 7 days
- 🔍 **Search, Filter & Sort** — debounced search, category filter, multiple sort options
- 📄 **Pagination** — clean paginated subscription list
- 📅 **Renewal Calendar** — monthly calendar view of all upcoming renewals
- 💱 **Live Currency Conversion** — real exchange rates via ExchangeRate-API (cached)
- ⚙️ **Settings** — profile management, currency switcher, clear data
- 📱 **Fully Responsive** — works on mobile, tablet, and desktop
- 🌑 **Dark Fintech UI** — premium dark dashboard aesthetic

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router DOM v6 |
| State | Context API |
| HTTP | Axios |
| API | ExchangeRate-API (free tier) |
| Dates | date-fns |
| Icons | React Icons |
| Toasts | React Toastify |
| Storage | localStorage |

---

## 📁 Folder Structure
src/
├── assets/
├── components/
│   ├── common/          # Badge, EmptyState, Pagination, ConfirmModal, LoadingScreen
│   └── layout/          # Sidebar, Topbar
├── context/             # AuthContext, SubscriptionContext, UIContext
├── data/                # mockData.js — categories, demo subscriptions, icons
├── hooks/               # useDebounce, usePagination, useExchangeRate
├── layouts/             # DashboardLayout
├── pages/               # Landing, Login, Signup, Dashboard, Subscriptions,
│                        # AddEditSubscription, CalendarPage, Settings, NotFound
├── services/            # currencyService.js — ExchangeRate-API integration
└── utils/               # storage.js, helpers.js, constants.js, seedDemo.js

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation


# 1. Clone the repo
git clone https://github.com/yourusername/trackify.git
cd trackify

# 2. Install dependencies
npm install

# 3. Install Tailwind CSS v3 specifically
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

# 4. Start development server
npm run dev


Open `http://localhost:5173` in your browser.

---

## 🔑 Demo Account

| Field | Value |
|---|---|
| Email | `demo@trackify.app` |
| Password | `demo1234` |

The demo account comes pre-loaded with 8 sample subscriptions across multiple categories.

New accounts start with zero subscriptions.

---

## 🌐 API Integration

**ExchangeRate-API** (free tier — no API key required)
https://api.exchangerate-api.com/v4/latest/INR

- Fetches live exchange rates for currency conversion in Settings
- Results are cached in localStorage for 1 hour to minimise requests
- Falls back to static rates if the request fails

---

## ☁️ Deployment (Vercel)


# Build for production
npm run build


1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import repository
3. Leave all settings default → click **Deploy**

The included `vercel.json` handles client-side routing automatically:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 📸 Pages

| Page | Route | Description |
|---|---|---|
| Landing | `/` | Hero, features, CTA |
| Login | `/login` | Email + password auth |
| Signup | `/signup` | Create new account |
| Dashboard | `/dashboard` | Stats, renewals, top spending |
| Subscriptions | `/subscriptions` | Full list with search/filter/sort |
| Add/Edit | `/subscriptions/add` | CRUD form with price preview |
| Calendar | `/calendar` | Monthly renewal calendar |
| Settings | `/settings` | Profile + currency converter |
| 404 | `*` | Not found page |

---

## 🔮 Future Enhancements

- Export subscriptions as CSV/PDF
- Email reminders via EmailJS
- Charts with Recharts for spending trends
- Multi-currency subscription support
- Browser push notifications for renewals
- Subscription sharing between accounts
- Dark/light theme toggle

---

## 👨‍🎓 Academic Info

- **Project Type:** University Final Semester Capstone
- **Course:** Web Development / Frontend Engineering
- **Stack:** React + Vite + Tailwind CSS + Context API
- **Complexity:** Medium — production-style architecture, achievable within one semester

---

## 📄 License

MIT © 2026 Trackify
