// src/App.jsx
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import DashboardLayout from './layouts/DashboardLayout';
import LoadingScreen from './components/common/LoadingScreen';

// Lazy-loaded pages
const Landing      = lazy(() => import('./pages/Landing'));
const Login        = lazy(() => import('./pages/Login'));
const Signup       = lazy(() => import('./pages/Signup'));
const Dashboard    = lazy(() => import('./pages/Dashboard'));
const Subscriptions= lazy(() => import('./pages/Subscriptions'));
const AddEdit      = lazy(() => import('./pages/AddEditSubscription'));
const Calendar     = lazy(() => import('./pages/CalendarPage'));
const Settings     = lazy(() => import('./pages/Settings'));
const NotFound     = lazy(() => import('./pages/NotFound'));

// Guard: redirect logged-in users away from auth pages
const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return currentUser ? <Navigate to="/dashboard" replace /> : children;
};

// Guard: redirect guests to login
const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return currentUser
    ? <SubscriptionProvider>{children}</SubscriptionProvider>
    : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public */}
        <Route path="/"       element={<PublicRoute><Landing /></PublicRoute>} />
        <Route path="/login"  element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

        {/* Protected — wrapped in DashboardLayout */}
        <Route element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
          <Route path="/dashboard"           element={<Dashboard />} />
          <Route path="/subscriptions"       element={<Subscriptions />} />
          <Route path="/subscriptions/add"   element={<AddEdit />} />
          <Route path="/subscriptions/edit/:id" element={<AddEdit />} />
          <Route path="/calendar"            element={<Calendar />} />
          <Route path="/settings"            element={<Settings />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}