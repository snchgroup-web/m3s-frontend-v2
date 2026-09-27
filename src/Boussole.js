import React, { useEffect, useState } from 'react';
import { ArrowLeft, Compass, LoaderCircle, RefreshCw } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { api } from './api';

const translations = {
  FR: {
    title: 'Boussole globale 2SG / M3S',
    version: 'Référentiel pédagogique · V3.3 · 27.09.2026',
    back: 'Revenir au tableau de bord',
    loading: 'Chargement sécurisé de la Boussole',
    error: 'La Boussole sécurisée est momentanément indisponible.',
    retry: 'Réessayer'
  },
  DE: {
    title: 'Globaler Kompass 2SG / M3S',
    version: 'Pädagogische Referenz · V3.3 · 27.09.2026',
    back: 'Zurück zum Dashboard',
    loading: 'Der Kompass wird sicher geladen',
    error: 'Der geschützte Kompass ist vorübergehend nicht verfügbar.',
    retry: 'Erneut versuchen'
  },
  EN: {
    title: '2SG / M3S Global Compass',
    version: 'Learning reference · V3.3 · 27.09.2026',
    back: 'Return to dashboard',
    loading: 'Securely loading the Compass',
    error: 'The secure Compass is temporarily unavailable.',
    retry: 'Try again'
  }
};

const Boussole = () => {
  const navigate = useNavigate();
  const { hash } = useLocation();
  const requestedSection = /^#(?:fr|de|en)\/([a-z0-9-]+)$/i.exec(hash || '')?.[1];
  const section = ['overview', 'access-20260924', 'strategy', 'functions', 'system', 'status', 'evolution', 'glossary', 'sources'].includes(requestedSection) ? requestedSection : 'overview';
  const { language } = useLanguage();
  const [artifactUrl, setArtifactUrl] = useState('');
  const [status, setStatus] = useState('loading');
  const [reloadKey, setReloadKey] = useState(0);
  const t = translations[language] || translations.FR;

  useEffect(() => {
    let current = true;
    let objectUrl = '';
    setStatus('loading');

    api.getBoussoleArtifact()
      .then((blob) => {
        if (!current) return;
        objectUrl = URL.createObjectURL(blob);
        setArtifactUrl(objectUrl);
        setStatus('ready');
      })
      .catch(() => {
        if (current) setStatus('error');
      });

    return () => {
      current = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [reloadKey]);

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
      {status === 'ready' ? (
        <iframe
          src={`${artifactUrl}#${language.toLowerCase()}/${section}`}
          title={t.title}
          className="min-h-0 w-full flex-1 border-0 bg-white"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-forms allow-modals allow-popups allow-downloads"
        />
      ) : (
        <section className="flex min-h-0 flex-1 items-center justify-center bg-slate-100 px-5 text-slate-800">
          {status === 'loading' ? (
            <p className="flex items-center gap-3 text-sm font-medium" role="status">
              <LoaderCircle className="animate-spin text-blue-600" size={20} aria-hidden="true" />
              {t.loading}
            </p>
          ) : (
            <div className="max-w-md text-center">
              <p className="text-sm font-medium">{t.error}</p>
              <button
                type="button"
                onClick={() => setReloadKey((value) => value + 1)}
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <RefreshCw size={17} aria-hidden="true" />
                {t.retry}
              </button>
            </div>
          )}
        </section>
      )}
    </main>
  );
};

export default Boussole;
