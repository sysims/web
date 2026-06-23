import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

export default function MainLayout() {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: 'fa-solid fa-border-all' },
    { path: '/absensi', name: 'Absensi', icon: 'fa-regular fa-clock' },
    { path: '/cuti', name: 'Cuti', icon: 'fa-regular fa-calendar' },
    { path: '/karyawan', name: 'Karyawan', icon: 'fa-solid fa-user-group' },
  ];

  return (
    <div className="bg-gray-50 h-screen flex overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e345e] text-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <div className="bg-blue-500 p-1.5 rounded mr-3">
            <i className="fa-solid fa-chart-line text-sm"></i>
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-wide">HRisma</h1>
            <p className="text-[10px] text-blue-200 uppercase tracking-wider">HRMS</p>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {menuItems.map((item) => {
            // Mengecek apakah URL saat ini mengandung path menu (agar sub-menu cuti tetap membuat menu Cuti aktif)
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive ? 'bg-white/10 text-white font-medium' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <i className={`${item.icon} w-6 text-center`}></i>
                <span className="flex-1">{item.name}</span>
                {isActive && <i className="fa-solid fa-chevron-right text-[10px]"></i>}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <i className="fa-solid fa-chevron-left text-gray-400 text-xs pl-2 cursor-pointer"></i>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div className="text-sm font-medium text-gray-800 capitalize">
            {location.pathname.split('/')[1] || 'Dashboard'}
          </div>
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-gray-600 relative">
              <i className="fa-regular fa-bell text-lg"></i>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold">
                SI
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-800">Sari Indah</div>
                <div className="text-[11px] text-gray-500">HR Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Dinamis (Akan diisi oleh Page) */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}