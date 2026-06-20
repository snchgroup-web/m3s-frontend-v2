import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import {
  Menu, X, ChevronDown, ChevronRight, Maximize2, Minimize2, Circle,
  Home, Settings, Users, DollarSign, Briefcase, Package, Building2, Zap,
  Activity, Clock, User, Target, TrendingUp, Heart, Smile, ShoppingCart,
  Wrench, Truck, Box, AlertTriangle, Eye, FileText, Brain, Database, BookOpen,
  Code, HelpCircle, Book
} from 'lucide-react';
import menuData from './menuStructure.json';
import Header from './Header';
import { ModuleIcon, modulePresentation } from './modulePresentation';

// Mapping des icônes
const iconMap = {
  Home, Settings, Users, DollarSign, Briefcase, Package, Building2, Zap,
  Activity, Clock, User, Target, TrendingUp, Heart, Smile, ShoppingCart,
  Wrench, Truck, Box, AlertTriangle, Eye, FileText, Brain, Database, BookOpen,
  Code, HelpCircle, Book
};

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
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

  const handleMenuItemClick = (path) => {
    navigate(path);
  };

  return (
    <div className="app-shell flex h-screen bg-slate-900 text-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-slate-800 border-r border-slate-700 transition-all duration-300 flex flex-col overflow-hidden`}>

        {/* Header */}
        <div className="px-4 py-6 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex flex-col space-y-1 items-center text-center flex-1">
              <div className="flex items-center space-x-2 justify-center">
                {/* Logo Image */}
                <img src="/assets/logo-2sg.png" alt="Logo SeneSwiss Group" className="w-10 h-10 rounded-full object-cover flex-shrink-0 bg-white" />
                <h1 className="text-base font-bold text-blue-400 whitespace-nowrap">2SG - SeneSwiss Group</h1>
              </div>
              <p className="text-xs text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis">M3S v2.0 - Management System - SeneSwiss</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-700 rounded flex-shrink-0"
            title={sidebarOpen ? "Masquer menu" : "Afficher menu"}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Expand All Button */}
        {sidebarOpen && (
          <div className="p-4 pt-3 border-b border-slate-700">
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
                  const hasChildren = item.children && item.children.length > 0;
                  const isExpanded = Boolean(expandedMenus[item.id]);

                  handleMenuItemClick(item.path);

                  if (sidebarOpen && hasChildren) {
                    setExpandedMenus(isExpanded ? {} : { [item.id]: true });
                  } else {
                    setExpandedMenus({});
                  }
                }}
                title={!sidebarOpen ? (item.label[language] || item.label.FR) : undefined}
                className={`flex items-center rounded hover:bg-slate-700 transition text-left text-sm cursor-pointer ${
                  sidebarOpen
                    ? 'w-full space-x-3 px-4 py-2'
                    : 'w-full justify-center py-3'
                }`}
              >
                {/* Icône */}
                <div className="flex-shrink-0 flex items-center space-x-2">
                  {/* Module icon */}
                  <div className={`w-8 h-8 flex items-center justify-center rounded-md ${modulePresentation[item.id]?.bg || 'bg-slate-700'}`}>
                    <ModuleIcon moduleId={item.id} size={18} />
                  </div>

                  {/* Chevron for expandable items */}
                  {sidebarOpen && item.children && item.children.length > 0 && (
                    <div className="flex-shrink-0">
                      {expandedMenus[item.id] ? (
                        <ChevronDown size={16} className="text-blue-400" />
                      ) : (
                        <ChevronRight size={16} className="text-slate-400" />
                      )}
                    </div>
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
                      {child.icon && iconMap[child.icon]
                        ? React.createElement(iconMap[child.icon], { size: 14, className: modulePresentation[item.id]?.color || 'text-sky-400' })
                        : <Circle size={7} className={modulePresentation[item.id]?.color || 'text-sky-400'} fill="currentColor" />}
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
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
