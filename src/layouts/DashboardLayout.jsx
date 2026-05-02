// src/layouts/DashboardLayout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Topbar  from '../components/layout/Topbar';
import { useUI } from '../context/UIContext';

export default function DashboardLayout() {
  const { sidebarOpen, closeSidebar } = useUI();

  return (
    <div className="flex h-screen overflow-hidden bg-dark-850">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}