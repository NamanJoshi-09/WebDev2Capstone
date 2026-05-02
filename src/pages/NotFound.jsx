// src/pages/NotFound.jsx
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftLine } from 'react-icons/ri';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-dark-850 flex items-center justify-center p-6 text-center">
      <div className="animate-slide-up">
        <p className="font-mono text-8xl font-bold text-dark-600 mb-4">404</p>
        <h1 className="font-display text-3xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <button onClick={() => navigate('/')} className="btn-primary inline-flex items-center gap-2">
          <RiArrowLeftLine /> Go Home
        </button>
      </div>
    </div>
  );
}