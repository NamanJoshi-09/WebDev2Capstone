// src/components/common/Pagination.jsx
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';

export default function Pagination({ page, totalPages, goTo, next, prev }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={prev}
        disabled={page === 1}
        className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 disabled:opacity-30 disabled:cursor-not-allowed text-gray-300 transition-colors"
      >
        <RiArrowLeftLine />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          onClick={() => goTo(p)}
          className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
            p === page
              ? 'bg-brand-500 text-white shadow-glow'
              : 'bg-dark-700 hover:bg-dark-600 text-gray-400'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={next}
        disabled={page === totalPages}
        className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 disabled:opacity-30 disabled:cursor-not-allowed text-gray-300 transition-colors"
      >
        <RiArrowRightLine />
      </button>
    </div>
  );
}