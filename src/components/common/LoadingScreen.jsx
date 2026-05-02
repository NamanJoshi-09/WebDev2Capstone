// src/components/common/LoadingScreen.jsx
export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-dark-850 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-teal-500 animate-pulse shadow-glow-lg" />
        <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">Loading…</p>
      </div>
    </div>
  );
}