import React, { useState, useContext } from 'react';
import { Menu } from 'lucide-react';
import { AuthProvider, AuthContext } from './control/AuthContext';
import Sidebar from './components/Sidebar';
import LogoSIMS from './assets/LogoSIMS';

// Import Pages
import PageDashboard from './pages/Dashboard';
import PageLogin from './pages/Login';
import PageAbsensi from './pages/Absensi';
import PageCuti from './pages/Cuti';

const AppLayout = () => {
  const { user } = useContext(AuthContext);
  const [currentRoute, setCurrentRoute] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentRoute) {
      case 'dashboard': return <PageDashboard />;
      case 'login': return <PageLogin setRoute={setCurrentRoute} />;
      case 'absensi': return user ? <PageAbsensi /> : <PageLogin setRoute={setCurrentRoute} />;
      case 'cuti': return user ? <PageCuti /> : <PageLogin setRoute={setCurrentRoute} />;
      default: return <PageDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
      <Sidebar 
        currentRoute={currentRoute} 
        setRoute={setCurrentRoute} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-700">
            <LogoSIMS />
            <span className="font-bold text-lg">SIMS</span>
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600 p-2 focus:outline-none">
            <Menu size={24} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto pb-20">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}
