import React from 'react';
import Card from '../components/Card';
import { FileText } from 'lucide-react';

const PageDashboard = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="bg-gradient-to-r from-green-700 to-green-500 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-2">Selamat Datang di SIMS</h1>
        <p className="text-green-100 max-w-lg leading-relaxed">
          Sys Indonesia Management System. Portal resmi untuk informasi perusahaan, manajemen absensi, dan pengajuan cuti karyawan.
        </p>
      </div>
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
    </div>

    <Card title="Pengumuman Perusahaan">
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-green-50/50 transition-colors">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 text-green-600">
              <FileText size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Update Kebijakan WFH Q3 2026</h4>
              <p className="text-sm text-gray-500 mt-1">Diberitahukan kepada seluruh karyawan mengenai penyesuaian jadwal WFH...</p>
              <span className="text-xs text-green-600 font-medium mt-2 inline-block">23 Juni 2026</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

export default PageDashboard;