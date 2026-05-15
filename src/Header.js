import React, { useState, useEffect } from 'react';
import { Cloud, Sun } from 'lucide-react';

const Header = ({ title, language }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Traductions
  const translations = {
    FR: {
      dakar: 'Dakar',
      sunny: 'Ensoleillé',
      zurich: 'Zurich',
      cloudy: 'Nuageux',
      exchangeRate: '1 CHF = 656 CFA'
    },
    EN: {
      dakar: 'Dakar',
      sunny: 'Sunny',
      zurich: 'Zurich',
      cloudy: 'Cloudy',
      exchangeRate: '1 CHF = 656 CFA'
    },
    DE: {
      dakar: 'Dakar',
      sunny: 'Sonnig',
      zurich: 'Zurich',
      cloudy: 'Bewölkt',
      exchangeRate: '1 CHF = 656 CFA'
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
    <div className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 px-6 py-3">
      {/* Header sur une seule ligne */}
      <div className="flex justify-between items-center">
        {/* Titre à gauche */}
        <h1 className="text-xl font-bold text-white">{title}</h1>

        {/* Centre - Infos Dakar et Zurich */}
        <div className="flex items-center space-x-3 text-xs">
          {/* Dakar */}
          <div className="flex items-center space-x-1 bg-slate-700/50 rounded px-2 py-1">
            <span>🇸🇳</span>
            <span className="text-slate-300 font-medium">{t.dakar}</span>
            <span className="text-slate-400">{dakarTime}</span>
          </div>

          {/* Météo Dakar */}
          <div className="flex items-center space-x-1 bg-slate-700/50 rounded px-2 py-1">
            <Sun size={14} className="text-yellow-400" />
            <span className="text-slate-300">28°C</span>
            <span className="text-slate-400">{t.sunny}</span>
          </div>

          {/* Séparateur */}
          <div className="w-px h-4 bg-slate-600"></div>

          {/* Date & Taux */}
          <div className="flex items-center space-x-1 bg-blue-600/30 rounded px-2 py-1 border border-blue-500/50">
            <span className="text-blue-300 font-bold">{t.exchangeRate}</span>
          </div>

          {/* Séparateur */}
          <div className="w-px h-4 bg-slate-600"></div>

          {/* Méteo Zurich */}
          <div className="flex items-center space-x-1 bg-slate-700/50 rounded px-2 py-1">
            <Cloud size={14} className="text-slate-400" />
            <span className="text-slate-300">18°C</span>
            <span className="text-slate-400">{t.cloudy}</span>
          </div>

          {/* Zurich */}
          <div className="flex items-center space-x-1 bg-slate-700/50 rounded px-2 py-1">
            <span>🇨🇭</span>
            <span className="text-slate-300 font-medium">{t.zurich}</span>
            <span className="text-slate-400">{zurichTime}</span>
          </div>
        </div>

        {/* Date à droite */}
        <div className="text-xs text-slate-300 text-right">
          <p className="font-medium capitalize">{dateFormatted}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
