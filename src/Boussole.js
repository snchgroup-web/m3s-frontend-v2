import React from 'react';
import { ArrowLeft, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import boussoleDocument from './artifacts/boussoleDocument.generated';

const translations = {
  FR: {
    title: 'Boussole globale 2SG / M3S',
    version: 'Référentiel pédagogique · V3.1',
    back: 'Revenir au tableau de bord'
  },
  DE: {
    title: 'Globaler Kompass 2SG / M3S',
    version: 'Pädagogische Referenz · V3.1',
    back: 'Zurück zum Dashboard'
  },
  EN: {
    title: '2SG / M3S Global Compass',
    version: 'Learning reference · V3.1',
    back: 'Return to dashboard'
  }
};

const Boussole = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language] || translations.FR;

  return (
    <main className="flex h-screen min-h-0 flex-col bg-slate-950 text-slate-100">
      <header className="flex min-h-16 shrink-0 items-center justify-between gap-3 border-b border-slate-700 bg-slate-900 px-3 py-2 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-blue-500/40 bg-blue-500/10 text-blue-300">
            <Compass size={22} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <h1 className="truncate text-sm font-semibold sm:text-base">{t.title}</h1>
            <p className="truncate text-xs text-slate-400">{t.version}</p>
          </span>
        </div>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:border-blue-400 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={t.back}
          title={t.back}
        >
          <ArrowLeft size={17} aria-hidden="true" />
          <span className="hidden sm:inline">{t.back}</span>
        </button>
      </header>
      <iframe
        srcDoc={boussoleDocument}
        title={t.title}
        className="min-h-0 w-full flex-1 border-0 bg-white"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-forms allow-modals allow-popups allow-downloads"
      />
    </main>
  );
};

export default Boussole;
