import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, ChevronRight, CloudSun, Globe2, LogOut, Menu, Moon, Settings, Sun, SunMedium } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';
import { useAuth } from './AuthContext';
import api from './api';
import menuData from './menuStructure.json';
import { ModuleIcon, moduleIdFromPath, modulePresentation } from './modulePresentation';
import { resolveActiveMenuLocation } from './sidebarMenu';

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

const Header = ({ onOpenMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentRate, setCurrentRate] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [languageLoading, setLanguageLoading] = useState(false);
  const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false);
  const [profileImageFailed, setProfileImageFailed] = useState(false);
  const settingsRef = useRef(null);
  const settingsButtonRef = useRef(null);
  const logoutButtonRef = useRef(null);
  const cancelLogoutButtonRef = useRef(null);
  const languageTimerRef = useRef(null);
  const moduleId = moduleIdFromPath(location.pathname);
  const moduleItem = menuData.menu.find((item) => item.id === moduleId) || menuData.menu[0];
  const activeMenu = resolveActiveMenuLocation(menuData, location.pathname, location.search);
  const diagnosticTitle = {
    FR: 'Diagnostics',
    EN: 'Diagnostics',
    DE: 'Diagnostik'
  };
  const title = moduleId === 'diagnostics'
    ? diagnosticTitle[language] || diagnosticTitle.FR
    : moduleItem.label?.[language] || moduleItem.label?.FR;
  const childTitle = activeMenu.child?.label?.[language] || activeMenu.child?.label?.FR || '';
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

  useEffect(() => {
    if (!settingsOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!settingsRef.current?.contains(event.target)) setSettingsOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setSettingsOpen(false);
      settingsButtonRef.current?.focus();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [settingsOpen]);

  useEffect(() => () => window.clearTimeout(languageTimerRef.current), []);

  useEffect(() => {
    if (!logoutConfirmationOpen) return undefined;

    cancelLogoutButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setLogoutConfirmationOpen(false);
      logoutButtonRef.current?.focus();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [logoutConfirmationOpen]);

  const profileImage = user?.avatar_url || user?.photo_url || user?.picture || null;

  useEffect(() => {
    setProfileImageFailed(false);
  }, [profileImage]);

  const closeSettings = () => {
    setSettingsOpen(false);
    settingsButtonRef.current?.focus();
  };

  const handleThemeChange = (theme) => {
    setTheme(theme);
    closeSettings();
  };

  const handleLanguageChange = (nextLanguage) => {
    const languageChanged = nextLanguage !== language;
    window.clearTimeout(languageTimerRef.current);
    if (languageChanged) setLanguageLoading(true);
    setLanguage(nextLanguage);
    closeSettings();
    if (languageChanged) {
      languageTimerRef.current = window.setTimeout(() => {
        setLanguageLoading(false);
        settingsButtonRef.current?.focus();
      }, 450);
    }
  };

  const translations = {
    FR: {
      sunny: 'Ensoleillé', cloudy: 'Nuageux', logout: 'Déconnexion', settings: 'Paramètres d’affichage', appearance: 'Apparence', language: 'Langue', light: 'Clair', standard: 'Standard', deep: 'Sombre profond', active: 'Actif',
      languageLoading: 'Chargement de la langue en cours…', logoutConfirmTitle: 'Confirmer la déconnexion', logoutConfirmBody: 'Voulez-vous vraiment vous déconnecter de M3S ?', cancel: 'Annuler', confirmLogout: 'Se déconnecter', profilePhoto: 'Photo de profil'
    },
    EN: {
      sunny: 'Sunny', cloudy: 'Cloudy', logout: 'Logout', settings: 'Display settings', appearance: 'Appearance', language: 'Language', light: 'Light', standard: 'Standard', deep: 'Deep dark', active: 'Active',
      languageLoading: 'Applying language…', logoutConfirmTitle: 'Confirm logout', logoutConfirmBody: 'Do you really want to log out of M3S?', cancel: 'Cancel', confirmLogout: 'Log out', profilePhoto: 'Profile photo'
    },
    DE: {
      sunny: 'Sonnig', cloudy: 'Bewölkt', logout: 'Abmelden', settings: 'Anzeigeeinstellungen', appearance: 'Darstellung', language: 'Sprache', light: 'Hell', standard: 'Standard', deep: 'Tiefdunkel', active: 'Aktiv',
      languageLoading: 'Sprache wird geladen…', logoutConfirmTitle: 'Abmeldung bestätigen', logoutConfirmBody: 'Möchten Sie sich wirklich von M3S abmelden?', cancel: 'Abbrechen', confirmLogout: 'Abmelden', profilePhoto: 'Profilfoto'
    }
  };
  const t = translations[language] || translations.FR;
  const locale = language === 'DE' ? 'de-CH' : language === 'EN' ? 'en-GB' : 'fr-CH';
  const dakarTime = currentTime.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Dakar' });
  const zurichTime = currentTime.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Zurich' });
  const dateFormatted = currentTime.toLocaleDateString(locale, { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });

  const requestLogout = () => {
    setSettingsOpen(false);
    setLogoutConfirmationOpen(true);
  };

  const cancelLogout = () => {
    setLogoutConfirmationOpen(false);
    logoutButtonRef.current?.focus();
  };

  const confirmLogout = () => {
    setLogoutConfirmationOpen(false);
    sessionStorage.setItem('logout_success', 'true');
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="app-header sticky top-0 z-30 border-b border-slate-700 bg-slate-800 h-20 px-3 sm:px-4 lg:px-6">
      <div className="h-full flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button type="button" onClick={onOpenMenu} className="icon-button lg:hidden" aria-label="Afficher le menu" title="Afficher le menu">
            <Menu size={21} />
          </button>
          <div className={`w-9 h-9 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center rounded-lg border ${presentation.bg} ${presentation.border}`}>
            <ModuleIcon moduleId={moduleId} size={23} />
          </div>
          <div className="min-w-0">
            <h1 className="flex min-w-0 items-center gap-1 text-base font-semibold text-slate-100 sm:gap-1.5 sm:text-xl" aria-label={childTitle ? `${title} - ${childTitle}` : title}>
              <span className="truncate">{title}</span>
              {childTitle && (
                <>
                  <ChevronRight size={16} className="shrink-0 text-slate-500" aria-hidden="true" />
                  <span className="truncate text-sm font-medium text-slate-300 sm:text-base">{childTitle}</span>
                </>
              )}
            </h1>
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
          <div ref={settingsRef} className="relative">
            <button
              ref={settingsButtonRef}
              type="button"
              className="icon-button"
              title={t.settings}
              aria-label={t.settings}
              aria-haspopup="dialog"
              aria-expanded={settingsOpen}
              onClick={() => setSettingsOpen(current => !current)}
            >
              <Settings size={19} className="text-sky-400" />
            </button>
            {settingsOpen && (
              <div className="header-settings-panel absolute right-0 top-11 z-50 w-72 max-w-[calc(100vw-1rem)] rounded-md border border-slate-600 bg-slate-800 p-3 text-slate-100 shadow-xl" role="dialog" aria-label={t.settings}>
                <h2 className="text-sm font-semibold text-slate-100">{t.settings}</h2>
                <div className="mt-3">
                  <p className="text-xs font-semibold uppercase text-slate-400">{t.appearance}</p>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {[
                      { id: 'light', label: t.light, icon: Sun },
                      { id: 'standard', label: t.standard, icon: SunMedium },
                      { id: 'deep', label: t.deep, icon: Moon }
                    ].map(({ id, label, icon: ThemeIcon }) => {
                      const selected = theme === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          className={`header-settings-choice flex min-h-11 items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition ${selected ? 'header-settings-choice--active border-blue-500 bg-blue-700 text-white' : 'border-slate-600 bg-slate-700 text-slate-200 hover:border-blue-400 hover:bg-slate-600'}`}
                          aria-pressed={selected}
                          onClick={() => handleThemeChange(id)}
                        >
                          <span className="flex items-center gap-2"><ThemeIcon size={17} aria-hidden="true" />{label}</span>
                          {selected && <Check size={16} aria-label={t.active} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-4 border-t border-slate-700 pt-3">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-400"><Globe2 size={15} aria-hidden="true" />{t.language}</p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {['FR', 'EN', 'DE'].map(option => (
                      <button
                        key={option}
                        type="button"
                        className={`header-settings-choice min-h-10 rounded-md border px-2 py-2 text-sm font-semibold transition ${language === option ? 'header-settings-choice--active border-blue-500 bg-blue-700 text-white' : 'border-slate-600 bg-slate-700 text-slate-200 hover:border-blue-400 hover:bg-slate-600'}`}
                        aria-pressed={language === option}
                        onClick={() => handleLanguageChange(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <button ref={logoutButtonRef} type="button" onClick={requestLogout} className="icon-button text-red-400" title={t.logout} aria-label={t.logout}>
            <LogOut size={19} />
          </button>
          <div className="hidden md:flex items-center gap-2 border-l border-slate-700 pl-3 ml-1">
            <div className="w-9 h-9 overflow-hidden rounded-full bg-sky-600 flex items-center justify-center text-white text-sm font-bold">
              {profileImage && !profileImageFailed ? (
                <img src={profileImage} alt={`${t.profilePhoto} - ${user?.name || 'M3S'}`} className="h-full w-full object-cover" onError={() => setProfileImageFailed(true)} />
              ) : (
                (user?.name || 'M3S').slice(0, 2).toUpperCase()
              )}
            </div>
            <div className="max-w-32"><p className="text-sm text-white font-semibold truncate">{user?.name || 'Utilisateur M3S'}</p><p className="text-xs text-slate-400 truncate">{user?.role || 'Manager'}</p></div>
          </div>
        </div>
      </div>

      {languageLoading && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-[1px]" role="status" aria-live="polite" aria-label={t.languageLoading}>
          <div className="m3s-panel flex min-w-56 flex-col items-center gap-3 px-6 py-5 text-center shadow-2xl">
            <img src="/assets/logo-2sg.png" alt="" aria-hidden="true" className="h-12 w-12 rounded-full object-cover shadow-md motion-safe:animate-pulse" />
            <p className="text-sm font-semibold" style={{ color: 'var(--m3s-text-primary)' }}>{t.languageLoading}</p>
          </div>
        </div>
      )}

      {logoutConfirmationOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/70 p-4" role="presentation">
          <section className="m3s-panel w-full max-w-md p-5 shadow-2xl sm:p-6" role="dialog" aria-modal="true" aria-labelledby="logout-confirmation-title">
            <h2 id="logout-confirmation-title" className="m3s-section-title">{t.logoutConfirmTitle}</h2>
            <p className="mt-3 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{t.logoutConfirmBody}</p>
            <div className="mt-5 flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:justify-end" style={{ borderColor: 'var(--m3s-border)' }}>
              <button ref={cancelLogoutButtonRef} type="button" className="m3s-secondary-button min-h-11 px-4" onClick={cancelLogout}>{t.cancel}</button>
              <button type="button" className="m3s-danger-button min-h-11 px-4" onClick={confirmLogout}>{t.confirmLogout}</button>
            </div>
          </section>
        </div>
      )}
    </header>
  );
};

export default Header;
