// src/components/common/EmptyState.jsx
export default function EmptyState({ icon = '📭', title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 mb-6 max-w-xs">{subtitle}</p>}
      {action}
    </div>
  );
}