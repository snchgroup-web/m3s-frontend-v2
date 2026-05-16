import React, { useState, useEffect } from 'react';
import { Cloud, Sun, Globe, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

const Header = ({ title, language, setLanguage }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState('Utilisateur M3S');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get user name from localStorage
  useEffect(() => {
    try {
      // Try to get user from localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        // Check for 'name' property
        if (user.name && user.name !== 'Utilisateur M3S') {
          setUserName(user.name);
        }
      }

      // Also check for token to see if user is logged in
      const token = localStorage.getItem('token');
      if (!token) {
        // User not logged in, use default
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
    <div className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 px-6 py-6">
      {/* Header sur une seule ligne - Plus grand */}
      <div className="flex justify-between items-center gap-6">
        {/* Titre à gauche */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-lg">📊</span>
          </div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
        </div>

        {/* Centre - Dakar, Date + Taux, Zurich */}
        <div className="flex items-center space-x-4 text-xs">
          {/* SENEGAL - Dakar */}
          <div className="flex items-center space-x-2 bg-slate-700/50 rounded px-3 py-2">
            <span className="text-2xl">🇸🇳</span>
            <div>
              <p className="text-slate-300 font-semibold">{t.dakar}</p>
              <p className="text-slate-400">{dakarTime}</p>
            </div>
          </div>

          {/* Météo Dakar */}
          <div className="flex items-center space-x-1 bg-slate-700/50 rounded px-3 py-2">
            <Sun size={16} className="text-yellow-400" />
            <div>
              <p className="text-slate-300 font-semibold">28°C</p>
              <p className="text-slate-400">{t.sunny}</p>
            </div>
          </div>

          {/* Séparateur */}
          <div className="w-px h-8 bg-slate-600"></div>

          {/* Date et Taux de Change - Centre */}
          <div className="flex flex-col items-center space-y-1">
            <div className="text-slate-300 font-semibold">{dateFormatted}</div>
            <div className="bg-blue-600/30 rounded px-3 py-1 border border-blue-500/50">
              <p className="text-blue-300 font-bold text-xs">{t.exchangeRate}</p>
            </div>
          </div>

          {/* Séparateur */}
          <div className="w-px h-8 bg-slate-600"></div>

          {/* Météo Zurich */}
          <div className="flex items-center space-x-1 bg-slate-700/50 rounded px-3 py-2">
            <Cloud size={16} className="text-slate-300" />
            <div>
              <p className="text-slate-300 font-semibold">18°C</p>
              <p className="text-slate-400">{t.cloudy}</p>
            </div>
          </div>

          {/* SUISSE - Zurich */}
          <div className="flex items-center space-x-2 bg-slate-700/50 rounded px-3 py-2">
            <span className="text-2xl">🇨🇭</span>
            <div>
              <p className="text-slate-300 font-semibold">{t.zurich}</p>
              <p className="text-slate-400">{zurichTime}</p>
            </div>
          </div>
        </div>

        {/* Utilisateur et Langue à droite */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-slate-600 rounded transition"
            title={isDarkMode ? "Mode Clair" : "Mode Sombre"}
          >
            {isDarkMode ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-slate-300" />
            )}
          </button>

          {/* Sélecteur de Langue */}
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-slate-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs text-slate-300 hover:bg-slate-600 focus:outline-none focus:border-blue-500"
            >
              <option value="FR">FR</option>
              <option value="EN">EN</option>
              <option value="DE">DE</option>
            </select>
          </div>

          {/* Utilisateur */}
          <div className="text-right text-sm">
            <p className="text-white font-semibold">{userName}</p>
            <p className="text-slate-400">{t.manager}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
