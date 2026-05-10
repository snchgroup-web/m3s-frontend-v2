import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { Menu, X, LogOut, Globe, Home, DollarSign, Users, Briefcase, Package, Building2, FileText, Settings as AdminIcon } from 'lucide-react';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState('overview');

  // Traductions
  const translations = {
    FR: {
      overview: 'Aperçu',
      finance: 'Finance',
      rh: 'Ressources Humaines',
      crm: 'CRM',
      production: 'Production',
      actifs: 'Actifs',
      ged: 'GED',
      admin: 'Administration',
      logout: 'Déconnexion'
    },
    EN: {
      overview: 'Overview',
      finance: 'Finance',
      rh: 'Human Resources',
      crm: 'CRM',
      production: 'Production',
      actifs: 'Assets',
      ged: 'Document Management',
      admin: 'Administration',
      logout: 'Logout'
    },
    DE: {
      overview: 'Übersicht',
      finance: 'Finanzen',
      rh: 'Personalwesen',
      crm: 'CRM',
      production: 'Produktion',
      actifs: 'Vermögenswerte',
      ged: 'Dokumentenverwaltung',
      admin: 'Verwaltung',
      logout: 'Abmelden'
    }
  };

  const t = translations[language];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const modules = [
    { id: 'overview', icon: Home, label: t.overview, color: 'bg-blue-500', path: '/' },
    { id: 'finance', icon: DollarSign, label: t.finance, color: 'bg-green-500', path: '/finance' },
    { id: 'rh', icon: Users, label: t.rh, color: 'bg-purple-500', path: '/rh' },
    { id: 'crm', icon: Briefcase, label: t.crm, color: 'bg-orange-500', path: '/crm' },
    { id: 'production', icon: Package, label: t.production, color: 'bg-red-500', path: '/production' },
    { id: 'actifs', icon: Building2, label: t.actifs, color: 'bg-indigo-500', path: '/actifs' },
    { id: 'ged', icon: FileText, label: t.ged, color: 'bg-cyan-500', path: '/ged' },
    { id: 'admin', icon: AdminIcon, label: t.admin, color: 'bg-gray-500', path: '/administration' }
  ];

  const handleModuleClick = (module) => {
    if (module.path === '/') {
      setActiveModule('overview');
      navigate('/');
    } else {
      setActiveModule(module.id);
      navigate(module.path);
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-800 border-r border-slate-700 transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold text-blue-400">M3S v2.0</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-700 rounded">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {modules.map(mod => (
            <button
              key={mod.id}
              onClick={() => handleModuleClick(mod)}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded hover:bg-slate-700 transition ${mod.id === activeModule ? 'bg-slate-700 border-l-4 border-blue-500' : ''}`}
            >
              <mod.icon size={20} className={mod.color} />
              {sidebarOpen && <span className="text-sm">{mod.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 space-y-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm hover:bg-slate-600"
          >
            <option value="FR">Français</option>
            <option value="EN">English</option>
            <option value="DE">Deutsch</option>
          </select>
          <button onClick={handleLogout} className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-400 hover:bg-slate-700 rounded">
            <LogOut size={18} />
            {sidebarOpen && <span>{t.logout}</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
