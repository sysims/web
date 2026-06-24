// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute'; 
import Login from './pages/Login/Login';
import MainLayout from './layouts/MainLayout'; // <-- Tambahan: Import Layout Utama Hijau

function App() {
  // State untuk Modal Konfirmasi Logout
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  // State untuk Toast Notifikasi
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // --- FUNGSI TOAST NOTIFIKASI ---
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  // --- FUNGSI LOGIN / LOGOUT ---
  const handleLoginSuccess = (userData) => {
    // Poin 2 Task: Simpan token/data ke localStorage agar Auth Guard bisa mendeteksi
    localStorage.setItem('token', 'dummy-token-12345');
    localStorage.setItem('user_name', userData.name);
    localStorage.setItem('user_role', userData.role);

    showToast(`Selamat datang kembali, ${userData.name}`, 'success');
    
    // Redirect otomatis ke dashboard setelah login sukses
    window.location.href = '/dashboard';
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    // Hapus token saat logout
    localStorage.clear();
    setIsLogoutModalOpen(false);
    showToast('Anda berhasil keluar dari sistem.', 'success');
    
    // Balikkan ke login
    window.location.href = '/login';
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  // Mengambil data user dari localStorage
  const savedName = localStorage.getItem('user_name') || 'User';
  const savedRole = localStorage.getItem('user_role') || 'Guest';

  // Menyusun objek user untuk dikirimkan sebagai props ke MainLayout
  const currentUser = {
    name: savedName,
    role: savedRole
  };

  return (
    <BrowserRouter>
      <div className="relative min-h-screen font-sans">
        
        {/* 1. KOMPONEN TOAST NOTIFICATION */}
        {toast.show && (
          <div className={`fixed top-6 right-6 z-[100] px-5 py-3 rounded-lg shadow-xl text-[13px] font-semibold text-white flex items-center gap-2 transition-all animate-bounce ${toast.type === 'success' ? 'bg-[#009A66]' : 'bg-gray-800'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
            </svg>
            {toast.message}
          </div>
        )}

        {/* 2. KOMPONEN MODAL KONFIRMASI LOGOUT */}
        {isLogoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[360px] overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Keluar Sistem</h3>
                </div>
                <p className="text-gray-500 text-[13.5px] mb-6 ml-[52px] leading-relaxed">
                  Apakah Anda yakin ingin keluar dari aplikasi SIMS?
                </p>
                <div className="flex justify-end gap-3 mt-2">
                  <button onClick={handleCancelLogout} className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 text-sm">Batal</button>
                  <button onClick={handleConfirmLogout} className="px-4 py-2.5 bg-[#009A66] text-white font-semibold rounded-lg hover:bg-[#008256] text-sm shadow-sm">Konfirmasi</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. SISTEM ROUTING BERBASIS AUTH GUARD & BUNGKUS LAYOUT UTAMA */}
        <Routes>
          {/* Halaman utama otomatis lempar ke login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* RUTE PUBLIC: User yang sudah punya token tidak bisa masuk kesini */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          </Route>

          {/* RUTE PROTECTED: Harus punya token baru bisa masuk kesini */}
          <Route element={<ProtectedRoute />}>
            {/* Bersarang di dalam MainLayout agar Header & Sidebar otomatis muncul */}
            <Route element={<MainLayout onLogout={handleLogoutClick} user={currentUser} />}>
              
              <Route path="/dashboard" element={
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[200px]">
                  <h3 className="text-base font-bold text-gray-800 mb-2">Selamat Datang, {savedName}!</h3>
                  <p className="text-sm text-gray-500">Ini adalah area Dashboard Utama. Komponen isi visual Anda (Pengumuman & Kalender) akan tampil di dalam kotak ini.</p>
                </div>
              } />
              
              <Route path="/apply-cuti" element={
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[200px]">
                  <h3 className="text-base font-bold text-gray-800 mb-2">Formulir Pengajuan Cuti Baru</h3>
                  <p className="text-sm text-gray-500">Wadah halaman ini sudah siap. Di sinilah tempat meletakkan form input tanggal dan jenis cuti.</p>
                </div>
              } />
              
              <Route path="/history-cuti" element={
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[200px]">
                  <h3 className="text-base font-bold text-gray-800 mb-2">Riwayat & Pelacakan Alur Cuti</h3>
                  <p className="text-sm text-gray-500">Wadah halaman riwayat sudah siap. Di sinilah list kartu status approval (Leader, SPV, Manager) akan berjejer.</p>
                </div>
              } />

              <Route path="/absensi" element={
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[200px]">
                  <h3 className="text-base font-bold text-gray-800 mb-2">Pencatatan Absensi Karyawan</h3>
                  <p className="text-sm text-gray-500">Wadah halaman pencatatan kehadiran karyawan.</p>
                </div>
              } />

              <Route path="/karyawan" element={
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[200px]">
                  <h3 className="text-base font-bold text-gray-800 mb-2">Manajemen Data Karyawan</h3>
                  <p className="text-sm text-gray-500">Wadah halaman pengelolaan profil dan database karyawan.</p>
                </div>
              } />

            </Route>
          </Route>

          {/* Catch-all route jika user mengetik alamat asal-asalan */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;