import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Layout
import MainLayout from './layouts/MainLayout';

// Import Pages
import LandingPage from './pages/Profile/profile';
import Karyawan from './pages/Karyawan/Karyawan';
import Absensi from './pages/Absensi/absensi';
import Cuti from './pages/Cuti/cuti';
import RiwayatCuti from './pages/cuti/RiwayatCuti';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Tanpa Layout (Sebelum Login) */}
        <Route path="/" element={<LandingPage />} />

        {/* Rute Dengan Layout Sidebar (Setelah Login) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<div className="p-8">Halaman Dashboard (Segera Hadir)</div>} />
          <Route path="/karyawan" element={<Karyawan />} />
          <Route path="/absensi" element={<Absensi />} />
          <Route path="/cuti" element={<Cuti />} />
          <Route path="/cuti/riwayat" element={<RiwayatCuti />} />
        </Route>
      </Routes>
    </Router>
  );
}