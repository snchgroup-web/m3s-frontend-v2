import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CloudSun, Globe2, LogOut, Moon, Sun, SunMedium } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';
import { useAuth } from './AuthContext';
import api from './api';
import menuData from './menuStructure.json';
import { ModuleIcon, moduleIdFromPath, modulePresentation } from './modulePresentation';

const FlagSenegal = () => (
  <span className="relative inline-grid grid-cols-3 w-8 h-5 overflow-hidden rounded-sm shadow-sm" aria-label="Sénégal">
    <span className="bg-green-600" /><span className="bg-yellow-400" /><span className="bg-red-600" />
    <span className="absolute inset-0 flex items-center justify-center text-green-700 text-[10px]">★</span>
  </span>
);

const FlagSwitzerland = () => (
  <span className="relative inline-block w-8 h-5 bg-red-600 rounded-sm shadow-sm" aria-label="Suisse">
    <span className="absolute left-[13px] top-1 w-1.5 h-3 bg-white" />
    <span className="absolute left-[9px] top-2 w-3.5 h-1.5 bg-white" />
  </span>
);

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentRate, setCurrentRate] = useState(null);
  const moduleId = moduleIdFromPath(location.pathname);
  const moduleItem = menuData.menu.find((item) => item.id === moduleId) || menuData.menu[0];
  const title = moduleItem.label?.[language] || moduleItem.label?.FR;
  const presentation = modulePresentation[moduleId] || modulePresentation.dashboard;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    api.getFxHistory()
      .then((response) => setCurrentRate(Number(response?.taux_du_jour?.CHF_CFA) || null))
      .catch(() => setCurrentRate(null));
  }, []);

  const translations = {
    FR: { sunny: 'Ensoleillé', cloudy: 'Nuageux', logout: 'Déconnexion', light: 'Mode clair', dark: 'Mode sombre' },
    EN: { sunny: 'Sunny', cloudy: 'Cloudy', logout: 'Logout', light: 'Light mode', dark: 'Dark mode' },
    DE: { sunny: 'Sonnig', cloudy: 'Bewölkt', logout: 'Abmelden', light: 'Heller Modus', dark: 'Dunkler Modus' }
  };
  const t = translations[language] || translations.FR;
  const locale = language === 'DE' ? 'de-CH' : language === 'EN' ? 'en-GB' : 'fr-CH';
  const dakarTime = currentTime.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Dakar' });
  const zurichTime = currentTime.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Zurich' });
  const dateFormatted = currentTime.toLocaleDateString(locale, { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header sticky top-0 z-30 border-b border-slate-700 bg-slate-800 h-20 px-4 lg:px-6">
      <div className="h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-lg border ${presentation.bg} ${presentation.border}`}>
            <ModuleIcon moduleId={moduleId} size={23} />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-white truncate">{title}</h1>
            <p className="text-xs text-slate-400 hidden sm:block">M3S Management System</p>
          </div>
        </div>

        <div className="hidden 2xl:flex items-center gap-2 text-xs">
          <div className="header-chip flex items-center gap-2 px-3 py-2 bg-slate-900/35">
            <FlagSenegal /><div><p className="text-white font-semibold">Dakar</p><p className="text-slate-400">{dakarTime}</p></div>
          </div>
          <div className="header-chip flex items-center gap-2 px-3 py-2 bg-slate-900/35">
            <SunMedium size={19} className="text-amber-400" /><div><p className="text-white font-semibold">28°C</p><p className="text-slate-400">{t.sunny}</p></div>
          </div>
          <div className="text-center px-3">
            <p className="text-slate-300 font-medium">{dateFormatted}</p>
            <p className="text-emerald-400 font-semibold">1 CHF = {currentRate ? currentRate.toLocaleString(locale, { maximumFractionDigits: 4 }) : '–'} CFA</p>
          </div>
          <div className="header-chip flex items-center gap-2 px-3 py-2 bg-slate-900/35">
            <CloudSun size={19} className="text-sky-400" /><div><p className="text-white font-semibold">18°C</p><p className="text-slate-400">{t.cloudy}</p></div>
          </div>
          <div className="header-chip flex items-center gap-2 px-3 py-2 bg-slate-900/35">
            <FlagSwitzerland /><div><p className="text-white font-semibold">Zürich</p><p className="text-slate-400">{zurichTime}</p></div>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button onClick={toggleTheme} className="icon-button" title={isDarkMode ? t.light : t.dark} aria-label={isDarkMode ? t.light : t.dark}>
            {isDarkMode ? <Sun size={19} className="text-amber-400" /> : <Moon size={19} className="text-indigo-500" />}
          </button>
          <div className="flex items-center gap-1 border-l border-slate-700 pl-2">
            <Globe2 size={17} className="text-sky-400 hidden sm:block" />
            <select value={language} onChange={(event) => setLanguage(event.target.value)} className="header-select" aria-label="Langue">
              <option value="FR">FR</option><option value="EN">EN</option><option value="DE">DE</option>
            </select>
          </div>
          <button onClick={handleLogout} className="icon-button text-red-400" title={t.logout} aria-label={t.logout}>
            <LogOut size={19} />
          </button>
          <div className="hidden md:flex items-center gap-2 border-l border-slate-700 pl-3 ml-1">
            <div className="w-9 h-9 rounded-full bg-sky-600 flex items-center justify-center text-white text-sm font-bold">
              {(user?.name || 'M3S').slice(0, 2).toUpperCase()}
            </div>
            <div className="max-w-32"><p className="text-sm text-white font-semibold truncate">{user?.name || 'Utilisateur M3S'}</p><p className="text-xs text-slate-400 truncate">{user?.role || 'Manager'}</p></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
