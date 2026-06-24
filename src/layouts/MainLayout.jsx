import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

export default function MainLayout({ onLogout, user }) {
  const location = useLocation();

  // Daftar menu yang disesuaikan dengan kebutuhan routing dan visual target
  const menuItems = [
    { path: '/dashboard', name: 'Dashboard Utama', icon: 'fa-solid fa-border-all' },
    { path: '/apply-cuti', name: 'Apply Cuti', icon: 'fa-regular fa-file-lines' },
    { path: '/history-cuti', name: 'History Cuti', icon: 'fa-regular fa-clock' },
  ];

  // Mengambil 2 huruf pertama dari nama user untuk inisial Avatar bulat
  const getInitials = (name) => {
    if (!name) return 'AS';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // Mengubah teks sub-header di bawah judul utama secara dinamis sesuai gambar 3, 4, dan 5
  const getSubHeaderTitle = () => {
    switch (location.pathname) {
      case '/':
      case '/dashboard':
        return 'Dashboard Utama';
      case '/apply-cuti':
        return 'Formulir Pengajuan Cuti Baru';
      case '/history-cuti':
        return 'Riwayat & Pelacakan Alur Cuti';
      case '/absensi':
        return 'Pencatatan Absensi Karyawan';
      case '/karyawan':
        return 'Manajemen Data Karyawan';
      default:
        return 'Management System';
    }
  };

  return (
    <div className="bg-[#F4F7F6] h-screen flex overflow-hidden font-sans">
      
      {/* ========================================================================= */}
      {/* 1. SIDEBAR PANEL (Kiri)                                                   */}
      {/* ========================================================================= */}
      {/* hidden md:flex membuat sidebar responsif (sembunyi di mobile, muncul di desktop) */}
      <aside className="w-64 bg-[#2A6B4F] text-white flex flex-col hidden md:flex transition-all duration-300 shrink-0">
        
        {/* Area Informasi Profil */}
        <div className="flex flex-col items-center py-8 border-b border-white/10">
          {/* Avatar Lingkaran Putih */}
          <div className="w-20 h-20 bg-white text-[#2A6B4F] rounded-full flex items-center justify-center text-2xl font-bold mb-3 shadow-md">
            {getInitials(user?.name)}
          </div>
          {/* Nama User */}
          <h2 className="font-semibold tracking-wide px-4 text-center truncate w-full">
            {user?.name || 'Andi Santoso'}
          </h2>
          {/* Role Badge */}
          <span className="text-[11px] bg-white/20 px-4 py-0.5 rounded-full mt-1.5 capitalize tracking-wider font-medium opacity-90">
            {user?.role || 'Member'}
          </span>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-xl text-sm transition-all group ${
                  isActive 
                    ? 'bg-white/10 text-white font-semibold' 
                    : 'text-gray-200/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                {/* Ikon Menu */}
                <i className={`${item.icon} w-6 text-center mr-3 text-base opacity-90 group-hover:scale-105 transition-transform`}></i>
                {/* Nama Menu */}
                <span className="flex-1">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        {/* Tombol Logout Bagian Bawah Sidebar */}
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-red-800/30 hover:text-red-200 py-3 rounded-xl text-sm font-medium transition-colors text-white/90 border border-white/10"
          >
            <i className="fa-solid fa-arrow-right-from-bracket rotate-180"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. AREA KONTEN UTAMA & HEADER (Kanan)                                     */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Navbar Atas / Header */}
        <header className="h-20 bg-white flex items-center justify-between px-8 shrink-0 z-10 border-b border-gray-100">
          <div>
            {/* Judul Aplikasi Sistem */}
            <h1 className="text-lg md:text-xl font-bold text-[#2A6B4F] tracking-wide">
              SYS Indonesia Management System
            </h1>
            {/* Sub-judul Dinamis (Berubah Sesuai Halaman) */}
            <p className="text-xs md:text-sm text-gray-400 mt-0.5 font-medium">
              {getSubHeaderTitle()}
            </p>
          </div>
          
          {/* Tombol Logout Kanan Atas */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={onLogout}
              className="text-sm font-bold text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1.5"
            >
              <span>Logout</span>
              <i className="fa-solid fa-power-off text-xs"></i>
            </button>
          </div>
        </header>

        {/* Wadah Konten Halaman (Scrollable Area) */}
        {/* overflow-y-auto memastikan konten di dalam `Outlet` bisa di-scroll secara independen */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-[#F4F7F6]">
          <Outlet />
        </div>
        
      </main>
    </div>
  );
}