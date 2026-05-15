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
      exchangeRate: '1 CHF = 656 CFA',
      user: 'Utilisateur M3S',
      manager: 'Manager'
    },
    EN: {
      dakar: 'Dakar',
      sunny: 'Sunny',
      zurich: 'Zurich',
      cloudy: 'Cloudy',
      exchangeRate: '1 CHF = 656 CFA',
      user: 'M3S User',
      manager: 'Manager'
    },
    DE: {
      dakar: 'Dakar',
      sunny: 'Sonnig',
      zurich: 'Zurich',
      cloudy: 'Bewölkt',
      exchangeRate: '1 CHF = 656 CFA',
      user: 'M3S Benutzer',
      manager: 'Manager'
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
    <div className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 px-6 py-4">
      {/* Header sur une seule ligne - Plus grand */}
      <div className="flex justify-between items-center">
        {/* Titre à gauche */}
        <h1 className="text-2xl font-bold text-white">{title}</h1>

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

        {/* Utilisateur à droite */}
        <div className="text-right text-sm">
          <p className="text-white font-semibold">{t.user}</p>
          <p className="text-slate-400">{t.manager}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
