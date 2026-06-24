// src/pages/Login/Login.jsx
import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { loginUser } from '../../services/authService';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Username dan password wajib diisi.');
      return;
    }

    setIsLoading(true);
    try {
      // Panggil API simulasi yang sudah kita buat di authService
      const userData = await loginUser(username, password);
      onLoginSuccess(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A4D44] flex items-center justify-center p-4 font-sans">
      <div className="bg-[#f8f9fa] rounded-[20px] w-full max-w-[400px] p-8 shadow-2xl relative">
        
        {/* Logo area */}
        <div className="w-16 h-16 bg-[#e1f5ec] rounded-2xl mx-auto flex items-center justify-center mb-5 shadow-sm">
          <span className="text-[#009A66] font-black text-2xl tracking-tighter">SIMS</span>
        </div>

        <h1 className="text-[22px] font-bold text-gray-900 text-center mb-1">
          SYS Indonesia Management
        </h1>
        <p className="text-[13px] text-gray-500 text-center mb-8">
          Sistem Informasi Manajemen Cuti Karyawan
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-lg mb-5 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="USERNAME"
            id="username"
            placeholder="Masukkan username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            label="PASSWORD"
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mt-7">
            <Button type="submit" isLoading={isLoading}>
              Masuk ke Sistem
            </Button>
          </div>
        </form>

        <div className="text-center mt-10">
          <p className="text-[11px] text-gray-400 font-medium">
            © 2026 SYS Indonesia. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
