import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-[#1e345e] mb-4">Selamat Datang di Perusahaan Kami</h1>
      <p className="text-gray-600 max-w-2xl text-center mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <Link to="/karyawan" className="bg-[#1e345e] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-900 transition">
        Masuk ke Dashboard (Simulasi Login)
      </Link>
    </div>
  );
}