import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, UserRound, CheckCircle2, Wallet, FolderOpen, Clock3, ListChecks, ArrowUpRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useAuth } from './AuthContext';
import api from './api';
import PrivateGedDocuments from './PrivateGedDocuments';
import PersonalBudget from './PersonalBudget';
import { centerTabHorizontally } from './moduleTabs';

const VIEWS = ['dossier', 'hours', 'tasks', 'finances'];
const ICONS = [FolderOpen, Clock3, ListChecks, Wallet];
const ACCOUNT_COPY = {
  FR: { tabs: ['Mon dossier perso', 'Mes heures', 'Mes tâches', 'Mes finances perso'], pending: 'À raccorder',
    hours: 'Aucune source d’heures personnelles n’est encore raccordée à ce compte.',
    tasks: 'La vue de mes seules affectations reste à raccorder. Le registre partagé est disponible dans Planification & Projets.',
    openHours: 'Consulter les outils RH', openTasks: 'Ouvrir le registre partagé des tâches' },
  DE: { tabs: ['Mein persönliches Dossier', 'Meine Stunden', 'Meine Aufgaben', 'Meine persönlichen Finanzen'], pending: 'Noch anzubinden',
    hours: 'Für dieses Konto ist noch keine persönliche Stundenquelle angebunden.',
    tasks: 'Die Ansicht meiner eigenen Zuweisungen ist noch anzubinden. Das gemeinsame Register ist unter Planung & Projekte verfügbar.',
    openHours: 'HR-Werkzeuge ansehen', openTasks: 'Gemeinsames Aufgabenregister öffnen' },
  EN: { tabs: ['My personal dossier', 'My hours', 'My tasks', 'My personal finances'], pending: 'Connection pending',
    hours: 'No personal hours source is connected to this account yet.',
    tasks: 'The view of my own assignments is still to be connected. The shared register is available under Planning & Projects.',
    openHours: 'View HR tools', openTasks: 'Open shared task register' }
};

const messages = {
  FR: { title: 'Mon compte', back: 'Retour au tableau de bord', refresh: 'Actualiser', loading: 'Chargement du profil…',
    linked: 'Profil raccordé', access: 'Connexion M3S', email: 'Adresse professionnelle', role: 'Rôle de connexion',
    profile: 'Profil institutionnel', name: 'Nom', id: 'Référence du profil', team: 'Équipe', type: 'Type de membre',
    position: 'Fonction', source: 'Source', approved: 'Validation documentaire',
    notLinked: 'Le profil institutionnel de ce compte n’est pas encore raccordé.',
    unavailable: 'Le profil est momentanément indisponible.', denied: 'Ce compte ne dispose pas de cette liaison.',
    founder: 'Fondateur', associate: 'Associé', missing: 'Non renseigné' },
  EN: { title: 'My account', back: 'Back to dashboard', refresh: 'Refresh', loading: 'Loading profile…',
    linked: 'Profile linked', access: 'M3S sign-in', email: 'Professional email', role: 'Sign-in role',
    profile: 'Institutional profile', name: 'Name', id: 'Profile reference', team: 'Team', type: 'Membership type',
    position: 'Position', source: 'Source', approved: 'Documentary approval',
    notLinked: 'The institutional profile for this account has not been linked yet.',
    unavailable: 'The profile is temporarily unavailable.', denied: 'This account does not have this profile link.',
    founder: 'Founder', associate: 'Associate', missing: 'Not provided' },
  DE: { title: 'Mein Konto', back: 'Zurück zum Dashboard', refresh: 'Aktualisieren', loading: 'Profil wird geladen…',
    linked: 'Profil verknüpft', access: 'M3S-Anmeldung', email: 'Geschäftliche E-Mail-Adresse', role: 'Anmelderolle',
    profile: 'Institutionelles Profil', name: 'Name', id: 'Profilreferenz', team: 'Team', type: 'Mitgliedstyp',
    position: 'Funktion', source: 'Quelle', approved: 'Dokumentarische Freigabe',
    notLinked: 'Das institutionelle Profil dieses Kontos ist noch nicht verknüpft.',
    unavailable: 'Das Profil ist vorübergehend nicht verfügbar.', denied: 'Dieses Konto hat keine solche Profilverknüpfung.',
    founder: 'Gründungsmitglied', associate: 'Assoziiertes Mitglied', missing: 'Nicht angegeben' }
};

export default function OwnProfile({ embedded = false }) {
  const { user } = useAuth();
  return <AccountProfile key={JSON.stringify([user?.id, user?.tenantId, user?.email])} embedded={embedded}/>;
}

function AccountProfile({ embedded }) {
  const { language } = useLanguage();
  const t = messages[language] || messages.FR;
  const a = ACCOUNT_COPY[language] || ACCOUNT_COPY.FR;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const requestedView = new URLSearchParams(location.search).get(embedded ? 'accountView' : 'view');
  const activeView = VIEWS.includes(requestedView) ? requestedView : 'dossier';
  const [financeVisited, setFinanceVisited] = useState(activeView === 'finances');
  const tabList = useRef(null);
  useEffect(() => {
    if (activeView === 'finances') setFinanceVisited(true);
    centerTabHorizontally(tabList.current, tabList.current?.querySelector('[aria-selected="true"]'));
  }, [activeView, language]);
  const selectView = view => {
    if (view === activeView) return;
    const params = new URLSearchParams(location.search);
    params.set(embedded ? 'accountView' : 'view', view);
    if (embedded) params.set('tab', 'myaccount');
    navigate(`${embedded ? '/rh' : '/account'}?${params}#own-account-panel`);
  };
  const productionReturn = !embedded && new URLSearchParams(location.search).get('returnTo') === 'production';
  const backLabel = productionReturn ? ({ FR: 'Retour aux outils Production', DE: 'Zurück zu den Produktionswerkzeugen', EN: 'Back to Production tools' }[language] || 'Retour aux outils Production') : t.back;
  const hrLink = { FR: 'Mon compte RH', EN: 'My HR account', DE: 'Mein HR-Konto' }[language] || 'Mon compte RH';
  const [revision, setRevision] = useState(0);
  const [state, setState] = useState({ status: 'loading', data: null });
  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading', data: null });
    api.getOwnProfile({ signal: controller.signal }).then(data => {
      if (controller.signal.aborted) return;
      if (data?.success !== true || data.scope !== 'current-account' || !data.profile?.personId || !data.account?.email) {
        setState({ status: 'unavailable', data: null });
      } else setState({ status: 'ready', data });
    }).catch(error => {
      if (controller.signal.aborted) return;
      setState({ status: error.code === 'PROFILE_NOT_LINKED' ? 'notLinked' :
        error.code === 'PROFILE_ACCESS_DENIED' ? 'denied' : 'unavailable', data: null });
    });
    return () => controller.abort();
  }, [revision, user?.email]);
  const field = (label, value) => <div className="own-profile-field" key={label}><dt>{label}</dt><dd>{value || t.missing}</dd></div>;
  const data = state.data;
  // Compact display only; the approved institutional source stays unchanged.
  const position = data?.profile.position;
  const positionLabel = position === 'Manager et coordinateur général de 2SG - architecte fonctionnel M3S' ? 'Manager' : position;
  return <article className="own-profile">
    <div className="own-profile-actions">
      <button className="m3s-secondary-button" onClick={() => navigate(productionReturn ? '/production?tab=manufacturing#production-tools' : '/')}><ArrowLeft size={17} aria-hidden="true"/>{backLabel}</button>
      <button className="m3s-secondary-button" title={t.refresh} aria-label={t.refresh} disabled={state.status === 'loading'} onClick={() => setRevision(value => value + 1)}><RefreshCw size={18}/></button>
    </div>
    <header className="own-profile-title">{data?.profile.photo ? <img className="own-profile-photo" src={data.profile.photo} alt={data.profile.displayName}/> : <UserRound size={25} aria-hidden="true"/>}<h2>{t.title}</h2></header>
    <div ref={tabList} className="own-account-tabs" role="tablist" aria-label={t.title} onKeyDown={event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const index = VIEWS.indexOf(activeView);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? VIEWS.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + VIEWS.length) % VIEWS.length;
      tabList.current?.querySelectorAll('[role="tab"]')[next]?.focus(); selectView(VIEWS[next]);
    }}>
      {VIEWS.map((view, index) => {
        const Icon = ICONS[index];
        return <button key={view} type="button" role="tab" id={`own-account-tab-${view}`} aria-controls={`own-account-panel-${view}`} aria-selected={activeView === view} tabIndex={activeView === view ? 0 : -1} onClick={() => selectView(view)}>
          <Icon size={18} aria-hidden="true"/>{a.tabs[index]}
        </button>;
      })}
    </div>
    {state.status === 'loading' && <p role="status">{t.loading}</p>}
    {!['loading', 'ready'].includes(state.status) && <p role="alert">{t[state.status]}</p>}
    {data && <>
      <div id="own-account-panel" className="own-account-panels">
      <div role="tabpanel" id="own-account-panel-dossier" aria-labelledby="own-account-tab-dossier" hidden={activeView !== 'dossier'} className="own-account-panel">
      <p className="own-profile-linked"><CheckCircle2 size={17} aria-hidden="true"/>{t.linked}</p>
      <section aria-labelledby="own-profile-access"><h3 id="own-profile-access">{t.access}</h3><dl>
        {field(t.email, data.account.email)}{field(t.role, data.account.role)}
      </dl></section>
      <section aria-labelledby="own-profile-person"><h3 id="own-profile-person">{t.profile}</h3><dl>
        {field(t.name, data.profile.displayName)}{field(t.id, data.profile.personId)}
        {field(t.team, data.profile.team)}{field(t.type, data.profile.memberType === 'Fondateur' ? t.founder : data.profile.memberType === 'Associe' ? t.associate : data.profile.memberType)}
        {field(t.position, positionLabel === 'Manager' ? <span translate="no">Manager</span> : positionLabel)}
      </dl></section>
      {!embedded && <nav className="own-profile-links" aria-label={t.title}>
        <button className="m3s-secondary-button" onClick={() => navigate('/rh?tab=myaccount')}><UserRound size={18} aria-hidden="true"/>{hrLink}</button>
      </nav>}
      <PrivateGedDocuments key={user?.email || 'no-account'} scope="personal"/>
      <footer>{t.source} : {data.source.id} · {t.approved} : <time dateTime={data.source.approvedOn}>{new Intl.DateTimeFormat({ FR: 'fr-CH', EN: 'en-GB', DE: 'de-CH' }[language] || 'fr-CH', { timeZone: 'UTC' }).format(new Date(`${data.source.approvedOn}T00:00:00Z`))}</time></footer>
      </div>
      {['hours', 'tasks'].map(view => <div role="tabpanel" id={`own-account-panel-${view}`} aria-labelledby={`own-account-tab-${view}`} hidden={activeView !== view} key={view} className="own-account-panel own-account-pending">
        <h3>{a.tabs[VIEWS.indexOf(view)]}</h3>
        <p className="own-account-pending-state">{a.pending}</p><p>{a[view]}</p>
        <button type="button" className="m3s-secondary-button" onClick={() => navigate(view === 'hours' ? '/rh?tab=resources#rh-proximity-tools' : '/administration?tab=planning#planning-register')}>
          <ArrowUpRight size={18} aria-hidden="true"/>{view === 'hours' ? a.openHours : a.openTasks}
        </button>
      </div>)}
      <div role="tabpanel" id="own-account-panel-finances" aria-labelledby="own-account-tab-finances" hidden={activeView !== 'finances'} className="own-account-panel">
        {(financeVisited || activeView === 'finances') && <PersonalBudget principal={user} language={language}/>}
      </div>
      </div>
    </>}
  </article>;
}
