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

  const dateFormatted = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const CHF_TO_CFA = '656 CFA';

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 px-6 py-4">
      {/* Titre et utilisateur */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <div className="text-right text-sm text-slate-300">
          <p className="font-medium">Utilisateur M3S</p>
          <p className="text-xs text-slate-400">Manager</p>
        </div>
      </div>

      {/* Séparateur */}
      <div className="border-t border-slate-600 my-3"></div>

      {/* Infos Senegal - Suisse */}
      <div className="flex justify-between items-center">
        {/* SENEGAL - Gauche */}
        <div className="flex items-center space-x-4">
          {/* Drapeau Senegal */}
          <div className="flex items-center space-x-2 bg-slate-700/50 rounded px-3 py-2">
            <span className="text-lg">🇸🇳</span>
            <div className="text-xs">
              <p className="text-slate-300 font-medium">Dakar</p>
              <p className="text-slate-400">{dakarTime}</p>
            </div>
          </div>

          {/* Météo Dakar */}
          <div className="flex items-center space-x-2 bg-slate-700/50 rounded px-3 py-2">
            <Sun size={18} className="text-yellow-400" />
            <div className="text-xs">
              <p className="text-slate-300">28°C</p>
              <p className="text-slate-400">Ensoleillé</p>
            </div>
          </div>
        </div>

        {/* Centre - Date et Taux de Change */}
        <div className="flex flex-col items-center space-y-2 text-xs">
          <p className="text-slate-300 font-medium capitalize">{dateFormatted}</p>
          <div className="bg-blue-600/30 rounded px-4 py-1 border border-blue-500/50">
            <p className="text-blue-300 font-bold text-xs">1 CHF = {CHF_TO_CFA}</p>
          </div>
        </div>

        {/* SUISSE - Droite */}
        <div className="flex items-center space-x-4">
          {/* Météo Zurich */}
          <div className="flex items-center space-x-2 bg-slate-700/50 rounded px-3 py-2">
            <Cloud size={18} className="text-slate-400" />
            <div className="text-xs">
              <p className="text-slate-300">18°C</p>
              <p className="text-slate-400">Nuageux</p>
            </div>
          </div>

          {/* Drapeau Suisse */}
          <div className="flex items-center space-x-2 bg-slate-700/50 rounded px-3 py-2">
            <span className="text-lg">🇨🇭</span>
            <div className="text-xs">
              <p className="text-slate-300 font-medium">Zurich</p>
              <p className="text-slate-400">{zurichTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
