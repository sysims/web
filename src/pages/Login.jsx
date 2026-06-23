import React, { useState, useContext } from 'react';
import { AuthContext } from '../control/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';

const PageLogin = ({ setRoute }) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username)) {
      setRoute('dashboard');
    } else {
      setError('Username tidak ditemukan! (Coba: staff1, spv1, admin1)');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 animate-in fade-in duration-300">
      <Card title="Login ke Sistem">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              placeholder="Masukkan username Anda..."
              required
            />
            <p className="text-xs text-gray-400 mt-2">Demo akun: staff1, spv1, admin1</p>
          </div>

          <Button type="submit" className="w-full">Masuk</Button>
        </form>
      </Card>
    </div>
  );
};

export default PageLogin;
