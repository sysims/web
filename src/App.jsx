// src/App.jsx
import React, { useState } from 'react';
import Login from './pages/Login/Login';

function App() {
  const [user, setUser] = useState(null);
  
  // State untuk Modal Konfirmasi Logout
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  // State untuk Toast Notifikasi
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // --- FUNGSI TOAST NOTIFIKASI ---
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    // Hilangkan toast secara otomatis setelah 3 detik
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  // --- FUNGSI LOGIN / LOGOUT ---
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    showToast(`Selamat datang kembali, ${userData.name}`, 'success');
  };

  const handleLogoutClick = () => {
    // Tampilkan modal terlebih dahulu, jangan langsung logout
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setUser(null);
    setIsLogoutModalOpen(false);
    showToast('Anda berhasil keluar dari sistem.', 'success');
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="relative min-h-screen font-sans">
      
      {/* 1. KOMPONEN TOAST NOTIFICATION (Muncul di Kanan Atas) */}
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
                <button
                  onClick={handleCancelLogout}
                  className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmLogout}
                  className="px-4 py-2.5 bg-[#009A66] text-white font-semibold rounded-lg hover:bg-[#008256] transition-colors text-sm shadow-sm"
                >
                  Konfirmasi
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 3. KONTEN UTAMA APLIKASI (Routing Sederhana) */}
      {user ? (
        <div className="p-10 text-center flex flex-col items-center justify-center min-h-screen bg-gray-50">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Dashboard Sementara</h1>
            <p className="text-gray-600 mb-6">Halo, <strong>{user.name}</strong></p>
            
            <div className="bg-green-50 rounded-lg p-4 mb-8 border border-green-100">
              <p className="text-xs text-green-800 uppercase font-bold tracking-wider mb-1">Level Akses</p>
              <strong className="text-[#009A66] uppercase text-xl">{user.role}</strong>
            </div>

            <button 
              onClick={handleLogoutClick}
              className="w-full bg-white border-2 border-red-100 hover:bg-red-50 text-red-600 font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Keluar Sistem
            </button>
          </div>
        </div>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}

    </div>
  );
}

export default App;
