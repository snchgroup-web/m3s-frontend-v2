import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, UserRound, CheckCircle2, FolderOpen } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useAuth } from './AuthContext';
import api from './api';
import PrivateGedDocuments from './PrivateGedDocuments';

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
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const t = messages[language] || messages.FR;
  const links = { FR: ['Mon compte RH', 'Documents financiers 2SG'], EN: ['My HR account', '2SG financial documents'], DE: ['Mein HR-Konto', '2SG-Finanzdokumente'] }[language] || ['Mon compte RH', 'Documents financiers 2SG'];
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
      <button className="m3s-secondary-button" onClick={() => navigate('/')}><ArrowLeft size={17} aria-hidden="true"/>{t.back}</button>
      <button className="m3s-secondary-button" title={t.refresh} aria-label={t.refresh} disabled={state.status === 'loading'} onClick={() => setRevision(value => value + 1)}><RefreshCw size={18}/></button>
    </div>
    <header className="own-profile-title">{data?.profile.photo ? <img className="own-profile-photo" src={data.profile.photo} alt={data.profile.displayName}/> : <UserRound size={25} aria-hidden="true"/>}<h2>{t.title}</h2></header>
    {state.status === 'loading' && <p role="status">{t.loading}</p>}
    {!['loading', 'ready'].includes(state.status) && <p role="alert">{t[state.status]}</p>}
    {data && <>
      <p className="own-profile-linked"><CheckCircle2 size={17} aria-hidden="true"/>{t.linked}</p>
      <section aria-labelledby="own-profile-access"><h3 id="own-profile-access">{t.access}</h3><dl>
        {field(t.email, data.account.email)}{field(t.role, data.account.role)}
      </dl></section>
      <section aria-labelledby="own-profile-person"><h3 id="own-profile-person">{t.profile}</h3><dl>
        {field(t.name, data.profile.displayName)}{field(t.id, data.profile.personId)}
        {field(t.team, data.profile.team)}{field(t.type, data.profile.memberType === 'Fondateur' ? t.founder : data.profile.memberType === 'Associe' ? t.associate : data.profile.memberType)}
        {field(t.position, positionLabel === 'Manager' ? <span translate="no">Manager</span> : positionLabel)}
      </dl></section>
      <nav className="own-profile-links" aria-label={t.title}>
        {!embedded && <button className="m3s-secondary-button" onClick={() => navigate('/rh?tab=myaccount')}><UserRound size={18} aria-hidden="true"/>{links[0]}</button>}
        <button className="m3s-secondary-button" onClick={() => navigate('/finance?tab=depenses#finance-documents')}><FolderOpen size={18} aria-hidden="true"/>{links[1]}</button>
      </nav>
      <PrivateGedDocuments key={user?.email || 'no-account'} scope="personal"/>
      <footer>{t.source} : {data.source.id} · {t.approved} : <time dateTime={data.source.approvedOn}>{new Intl.DateTimeFormat({ FR: 'fr-CH', EN: 'en-GB', DE: 'de-CH' }[language] || 'fr-CH', { timeZone: 'UTC' }).format(new Date(`${data.source.approvedOn}T00:00:00Z`))}</time></footer>
    </>}
  </article>;
}
