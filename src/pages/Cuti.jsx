import React, { useState, useContext } from 'react';
import { AuthContext } from '../control/AuthContext';
import { dummyCutiData } from '../utils/dummyData';
import Button from '../components/Button';
import { CheckCircle, RefreshCw } from 'lucide-react';

const PageCuti = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('pengajuan');
  const [cutiList, setCutiList] = useState(dummyCutiData);
  const [formData, setFormData] = useState({ start: '', end: '', reason: '' });

  const isSpvOrAdmin = user.role === 'spv' || user.role === 'admin';

  const handleAjukan = (e) => {
    e.preventDefault();
    const newCuti = {
      id: Date.now(),
      userId: user.id,
      name: user.name,
      startDate: formData.start,
      endDate: formData.end,
      reason: formData.reason,
      status: 'Pending'
    };
    setCutiList([...cutiList, newCuti]);
    setFormData({ start: '', end: '', reason: '' });
    setActiveTab('histori');
    alert('Pengajuan cuti berhasil dikirim!');
  };

  const handleApproval = (id, action) => {
    setCutiList(cutiList.map(c => 
      c.id === id ? { ...c, status: action === 'approve' ? 'Approved' : 'Returned' } : c
    ));
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      Approved: "bg-green-100 text-green-700 border-green-200",
      Returned: "bg-red-100 text-red-700 border-red-200"
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manajemen Cuti</h2>
          <p className="text-gray-500 text-sm">Kelola pengajuan dan persetujuan cuti Anda di sini.</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center min-w-[120px]">
          <p className="text-green-800 text-xs font-semibold uppercase tracking-wider mb-1">Sisa Kuota</p>
          <p className="text-3xl font-black text-green-600">{user.leaveQuota} <span className="text-base font-normal">Hari</span></p>
        </div>
      </div>

      <div className="flex space-x-2 border-b border-gray-200">
        <button onClick={() => setActiveTab('pengajuan')} className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'pengajuan' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500 hover:text-green-600'}`}>Pengajuan Cuti</button>
        <button onClick={() => setActiveTab('histori')} className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'histori' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500 hover:text-green-600'}`}>Histori & Status</button>
        {isSpvOrAdmin && (
          <button onClick={() => setActiveTab('approval')} className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'approval' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500 hover:text-green-600'} flex items-center gap-2`}>
            Persetujuan (Approval)
            {cutiList.filter(c => c.status === 'Pending').length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{cutiList.filter(c => c.status === 'Pending').length}</span>
            )}
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[400px]">
        {activeTab === 'pengajuan' && (
          <form onSubmit={handleAjukan} className="max-w-2xl space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
                <input type="date" required value={formData.start} onChange={e => setFormData({...formData, start: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Selesai</label>
                <input type="date" required value={formData.end} onChange={e => setFormData({...formData, end: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alasan Cuti</label>
              <textarea rows="4" required value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 outline-none resize-none" placeholder="Jelaskan alasan pengajuan cuti Anda..."></textarea>
            </div>
            <Button type="submit" icon={CheckCircle}>Ajukan Cuti Sekarang</Button>
          </form>
        )}

        {activeTab === 'histori' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-200">
                  <th className="py-3 px-4 font-semibold text-gray-600 text-sm">Tanggal Pengajuan</th>
                  <th className="py-3 px-4 font-semibold text-gray-600 text-sm">Alasan</th>
                  <th className="py-3 px-4 font-semibold text-gray-600 text-sm">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cutiList.filter(c => user.role === 'admin' || c.userId === user.id).map(cuti => (
                  <tr key={cuti.id} className="hover:bg-gray-50/50">
                    <td className="py-4 px-4 text-sm text-gray-800">{cuti.startDate} s/d {cuti.endDate}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{cuti.reason}</td>
                    <td className="py-4 px-4"><StatusBadge status={cuti.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'approval' && isSpvOrAdmin && (
          <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-200">
                  <th className="py-3 px-4 font-semibold text-gray-600 text-sm">Nama</th>
                  <th className="py-3 px-4 font-semibold text-gray-600 text-sm">Tanggal</th>
                  <th className="py-3 px-4 font-semibold text-gray-600 text-sm">Alasan</th>
                  <th className="py-3 px-4 font-semibold text-gray-600 text-sm">Status</th>
                  <th className="py-3 px-4 font-semibold text-gray-600 text-sm text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cutiList.map(cuti => (
                  <tr key={cuti.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4 font-medium text-gray-800">{cuti.name}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{cuti.startDate} - {cuti.endDate}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{cuti.reason}</td>
                    <td className="py-4 px-4"><StatusBadge status={cuti.status} /></td>
                    <td className="py-4 px-4">
                      {cuti.status === 'Pending' ? (
                        <div className="flex gap-2 justify-center">
                          <Button variant="primary" className="py-1.5 px-3 text-xs" onClick={() => handleApproval(cuti.id, 'approve')} icon={CheckCircle}>Approve</Button>
                          <Button variant="danger" className="py-1.5 px-3 text-xs" onClick={() => handleApproval(cuti.id, 'return')} icon={RefreshCw}>Return</Button>
                        </div>
                      ) : (
                        <div className="text-center text-xs text-gray-400">-Selesai-</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageCuti;
