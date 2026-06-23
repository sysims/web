import React, { useContext } from 'react';
import { Menu, X, Home, Calendar, Clock, LogOut, LogIn, User } from 'lucide-react';
import { AuthContext } from '../control/AuthContext';
import LogoSIMS from '../assets/LogoSIMS';

const Sidebar = ({ currentRoute, setRoute, isOpen, setIsOpen }) => {
  const { user, logout } = useContext(AuthContext);

  const navItems = [
    { id: 'dashboard', label: 'Info Perusahaan', icon: Home, public: true },
    { id: 'absensi', label: 'Absensi', icon: Clock, public: false },
    { id: 'cuti', label: 'Manajemen Cuti', icon: Calendar, public: false },
  ];

  const handleNav = (routeId) => {
    setRoute(routeId);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsOpen(false)} />}
      
      <div className={`fixed md:static inset-y-0 left-0 w-64 bg-green-800 text-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} flex flex-col h-screen shadow-xl`}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoSIMS />
            <div>
              <h1 className="text-xl font-bold tracking-wider">SIMS</h1>
              <p className="text-green-200 text-xs">Sys Indonesia</p>
            </div>
          </div>
          <button className="md:hidden text-white" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="px-6 py-4 mb-4 border-b border-green-700">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center border-2 border-green-400">
                <User size={20} />
              </div>
              <div>
                <p className="font-medium text-sm">{user.name}</p>
                <p className="text-green-300 text-xs capitalize">{user.role}</p>
              </div>
            </div>
          ) : (
            <p className="text-green-200 text-sm italic">Silahkan Login</p>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            if (!item.public && !user) return null;
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-green-700 text-white shadow-inner' : 'text-green-100 hover:bg-green-700/50'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-green-300' : 'text-green-400'} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-green-700">
          {user ? (
            <button onClick={() => { logout(); setRoute('dashboard'); setIsOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-200 hover:bg-red-500/20 hover:text-red-100 transition-colors">
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          ) : (
            <button onClick={() => handleNav('login')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white text-green-800 hover:bg-green-50 transition-colors">
              <LogIn size={20} />
              <span className="font-medium">Login</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;