import React, { useState, useContext } from 'react';
import { AuthContext } from '../control/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { Clock, CheckCircle } from 'lucide-react';

const PageAbsensi = () => {
  const { user } = useContext(AuthContext);
  const [status, setStatus] = useState(null);

  const handleAbsen = (type) => {
    setStatus(`Berhasil melakukan absen ${type} pada ${new Date().toLocaleTimeString()}`);
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Sistem Absensi Harian</h2>
      
      {status && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 border border-green-200">
          <CheckCircle size={20} /> {status}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Form Absensi">
          <div className="flex flex-col items-center justify-center py-8 space-y-6 text-center">
            <Clock size={64} className="text-green-200" />
            <div>
              <p className="text-gray-500">Waktu Saat Ini</p>
              <h3 className="text-3xl font-bold text-gray-800">{new Date().toLocaleTimeString()}</h3>
            </div>
            
            <div className="flex gap-4 w-full">
              <Button onClick={() => handleAbsen('Masuk')} className="flex-1 py-3 text-lg shadow-md">
                Absen Masuk
              </Button>
              <Button onClick={() => handleAbsen('Pulang')} variant="secondary" className="flex-1 py-3 text-lg">
                Absen Pulang
              </Button>
            </div>
          </div>
        </Card>

        <Card title="Histori Absensi Terakhir">
          <ul className="space-y-3">
            {[1, 2, 3].map((i) => (
              <li key={i} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-800">2{i} Juni 2026</p>
                  <p className="text-sm text-gray-500">Masuk: 08:00 WIB - Pulang: 17:00 WIB</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Tepat Waktu</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default PageAbsensi;
