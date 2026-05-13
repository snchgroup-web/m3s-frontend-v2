import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import {
  Menu, X, LogOut, Globe, ChevronDown, ChevronRight, Maximize2, Minimize2,
  Home, Settings, Users, DollarSign, Briefcase, Package, Building2, Zap
} from 'lucide-react';
import menuData from './menuStructure.json';

// Mapping des icônes
const iconMap = {
  Home, Settings, Users, DollarSign, Briefcase, Package, Building2, Zap
};

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [expandAll, setExpandAll] = useState(false);

  // Traductions UI
  const translations = {
    FR: {
      logout: 'Déconnexion',
      expandAll: 'Déplier tout',
      collapseAll: 'Replier tout'
    },
    EN: {
      logout: 'Logout',
      expandAll: 'Expand All',
      collapseAll: 'Collapse All'
    },
    DE: {
      logout: 'Abmelden',
      expandAll: 'Alles erweitern',
      collapseAll: 'Alles einklappen'
    }
  };

  const t = translations[language];

  // Gérer l'expansion/réduction des menus
  const toggleMenu = (menuId) => {
    setExpandedMenus(prev => {
      const newState = { ...prev };

      // Fermer tous les autres menus (accordéon)
      Object.keys(newState).forEach(key => {
        if (key !== menuId) {
          newState[key] = false;
        }
      });

      // Toggle le menu actuel
      newState[menuId] = !newState[menuId];
      return newState;
    });
  };

  // Expand/Collapse All
  const toggleExpandAll = () => {
    const newExpandAll = !expandAll;
    setExpandAll(newExpandAll);

    const newState = {};
    menuData.menu.forEach(item => {
      if (item.children && item.children.length > 0) {
        newState[item.id] = newExpandAll;
      }
    });
    setExpandedMenus(newState);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
  };

  return (
    <div className="flex h-screen bg-slate-900 text-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-slate-800 border-r border-slate-700 transition-all duration-300 flex flex-col overflow-hidden`}>

        {/* Header */}
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold text-blue-400">M3S v2.0</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-700 rounded">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Expand All Button */}
        {sidebarOpen && (
          <div className="p-2 border-b border-slate-700">
            <button
              onClick={toggleExpandAll}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-xs bg-slate-700 hover:bg-slate-600 rounded transition"
              title={expandAll ? t.collapseAll : t.expandAll}
            >
              {expandAll ? (
                <>
                  <Minimize2 size={14} />
                  <span>{t.collapseAll}</span>
                </>
              ) : (
                <>
                  <Maximize2 size={14} />
                  <span>{t.expandAll}</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {menuData.menu.map(item => (
            <div key={item.id}>
              {/* Menu Item Principal */}
              <button
                onClick={() => {
                  if (item.children && item.children.length > 0) {
                    toggleMenu(item.id);
                  } else {
                    // Close all menus before navigating
                    setExpandedMenus({});
                    handleMenuItemClick(item.path);
                  }
                }}
                title={!sidebarOpen ? (item.label[language] || item.label.FR) : undefined}
                className={`flex items-center rounded hover:bg-slate-700 transition text-left text-sm ${
                  sidebarOpen
                    ? 'w-full space-x-3 px-4 py-2'
                    : 'w-full justify-center py-3'
                }`}
              >
                {/* Icône */}
                <div className="flex-shrink-0">
                  {sidebarOpen ? (
                    // Expanded: show chevron for expandable items
                    item.children && item.children.length > 0 ? (
                      expandedMenus[item.id] ? (
                        <ChevronDown size={18} className="text-blue-400" />
                      ) : (
                        <ChevronRight size={18} className="text-slate-400" />
                      )
                    ) : (
                      <div className="w-4 h-4" />
                    )
                  ) : (
                    // Collapsed: show module icon for identification
                    item.icon && iconMap[item.icon] ? (
                      React.createElement(iconMap[item.icon], {
                        size: 20,
                        className: "text-blue-400"
                      })
                    ) : (
                      <div className="w-5 h-5" />
                    )
                  )}
                </div>

                {/* Label */}
                {sidebarOpen && (
                  <span className="flex-1 font-medium">
                    {item.label[language] || item.label.FR}
                  </span>
                )}
              </button>

              {/* Sous-menus */}
              {sidebarOpen && expandedMenus[item.id] && item.children && item.children.length > 0 && (
                <div className="ml-6 space-y-1 bg-slate-700 bg-opacity-30 rounded my-1 py-1 px-2">
                  {item.children.map(child => (
                    <button
                      key={child.id}
                      onClick={() => handleMenuItemClick(child.path)}
                      className="w-full flex items-center space-x-2 px-3 py-1.5 rounded text-xs hover:bg-slate-600 transition text-left text-slate-300 hover:text-white"
                    >
                      <span className="text-blue-400">•</span>
                      <span>{child.label[language] || child.label.FR}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 space-y-2">
          <div className="flex items-center space-x-2 px-3 py-2 text-sm">
            <Globe size={18} />
            {sidebarOpen && (
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="flex-1 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm hover:bg-slate-600"
              >
                <option value="FR">Français</option>
                <option value="EN">English</option>
                <option value="DE">Deutsch</option>
              </select>
            )}
          </div>
          <button onClick={handleLogout} className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-400 hover:bg-slate-700 rounded">
            <LogOut size={18} />
            {sidebarOpen && <span>{t.logout}</span>}
          </button>

          {/* Version & Copyright */}
          {sidebarOpen && (
            <div className="text-xs text-slate-500 mt-4 pt-4 border-t border-slate-700 text-center">
              <p>M3S ERP v2.0</p>
              <p>© 2026 SENESWISS GROUP</p>
            </div>
          )}
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
