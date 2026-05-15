import React, { useState, useEffect } from 'react';
import { Cloud, Sun, Moon, LayoutDashboard, Globe } from 'lucide-react';

const Header = ({ title, icon, subtitle, language, setLanguage }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState('Utilisateur M3S');
  const [userRole, setUserRole] = useState('');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get user name from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.name) {
          setUserName(user.name);
        }
        if (user.role) {
          setUserRole(user.role);
        }
      }

      const token = localStorage.getItem('token');
      if (!token) {
        setUserName('Invité');
      }
    } catch (e) {
      console.error('Error retrieving user info:', e);
    }
  }, []);

  // Traductions
  const translations = {
    FR: {
      dakar: 'Dakar',
      sunny: 'Ensoleillé',
      zurich: 'Zurich',
      cloudy: 'Nuageux',
      exchangeRate: '1 CHF = 656 CFA',
      manager: 'Manager',
      language: 'Langue'
    },
    EN: {
      dakar: 'Dakar',
      sunny: 'Sunny',
      zurich: 'Zurich',
      cloudy: 'Cloudy',
      exchangeRate: '1 CHF = 656 CFA',
      manager: 'Manager',
      language: 'Language'
    },
    DE: {
      dakar: 'Dakar',
      sunny: 'Sonnig',
      zurich: 'Zurich',
      cloudy: 'Bewölkt',
      exchangeRate: '1 CHF = 656 CFA',
      manager: 'Manager',
      language: 'Sprache'
    }
  };

  const t = translations[language] || translations.FR;

  // Format times
  const dakarTime = currentTime.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Africa/Dakar'
  });

  const zurichTime = currentTime.toLocaleTimeString('de-CH', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Zurich'
  });

  const dateFormatted = new Date().toLocaleDateString(language === 'FR' ? 'fr-FR' : language === 'DE' ? 'de-DE' : 'en-GB', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 px-6 py-6 sticky top-0 z-20">
      {/* Header sur une seule ligne - Plus grand */}
      <div className="flex justify-between items-center gap-6">
        {/* Titre à gauche */}
        <div className="flex items-center gap-3">
          {icon ? (
            <span className="text-3xl">{icon}</span>
          ) : (
            <LayoutDashboard size={32} className="text-blue-400" />
          )}
          <div>
            <h1 className="text-4xl font-bold text-white">{title}</h1>
            {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
          </div>
        </div>

        {/* Centre - Dakar, Date + Taux, Zurich - Épuré */}
        <div className="flex items-center space-x-6 text-xs flex-shrink-0">
          {/* Logo 2SG */}
          <div className="flex items-center justify-center mr-2">
            <img src="/assets/logo-2sg.svg" alt="2SG" className="h-10 object-contain" />
          </div>
          
          {/* SENEGAL - Dakar */}
          <div className="flex items-center space-x-3">
            <img src="/assets/Drapeau_Flottant_SN.gif" alt="Sénégal" className="w-8 h-6 object-cover rounded shadow-sm" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-slate-300 font-medium tracking-wide">{t.dakar}</span>
                <span className="text-slate-400 font-light">{dakarTime}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                <Sun size={12} className="text-yellow-500" />
                <span>28°C {t.sunny}</span>
              </div>
            </div>
          </div>

          {/* Séparateur */}
          <div className="w-px h-8 bg-slate-700/50"></div>

          {/* Date et Taux de Change - Centre */}
          <div className="flex flex-col items-center">
            <span className="text-slate-300 font-medium tracking-wide mb-1">{dateFormatted}</span>
            <span className="text-blue-400/90 font-medium text-[10px] tracking-wider px-2 py-0.5 rounded-full border border-blue-500/20 bg-blue-500/5">{t.exchangeRate}</span>
          </div>

          {/* Séparateur */}
          <div className="w-px h-8 bg-slate-700/50"></div>

          {/* SUISSE - Zurich */}
          <div className="flex items-center space-x-3">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-light">{zurichTime}</span>
                <span className="text-slate-300 font-medium tracking-wide">{t.zurich}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                <span>18°C {t.cloudy}</span>
                <Cloud size={12} className="text-slate-400" />
              </div>
            </div>
            <img src="/assets/Drapeau_Flottant_CH.jpg" alt="Suisse" className="w-8 h-6 object-cover rounded shadow-sm" />
          </div>
        </div>

        {/* Utilisateur et Langue à droite */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Sélecteur de Thème */}
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 rounded-full hover:bg-slate-700/50 text-slate-400 hover:text-slate-300 transition-colors border border-transparent hover:border-slate-600"
            title="Basculer le thème"
          >
            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Sélecteur de Langue */}
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-slate-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent border border-slate-600/50 rounded px-2 py-1 text-xs text-slate-300 hover:bg-slate-800 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer appearance-none pr-4"
            >
              <option value="FR">FR</option>
              <option value="EN">EN</option>
              <option value="DE">DE</option>
            </select>
          </div>

          {/* Utilisateur */}
          <div className="text-right text-sm">
            <p className="text-white font-semibold">{userName}</p>
            <p className="text-slate-400">{userRole || t.manager}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
