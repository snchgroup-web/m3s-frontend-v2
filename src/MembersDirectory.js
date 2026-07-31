import React, { useEffect, useMemo, useState } from 'react';
import {
  CircleAlert,
  ContactRound,
  LockKeyhole,
  RefreshCw,
  Search,
  ShieldCheck,
  X
} from 'lucide-react';
import { api } from './api';
import { useLanguage } from './LanguageContext';

const copy = {
  FR: {
    title: 'Annuaire interne 2SG',
    subtitle: 'Membres et fonctions validés, sans coordonnées personnelles.',
    readOnly: 'Lecture seule', validated: 'Source documentaire validée',
    search: 'Rechercher un nom, une fonction ou une équipe', clear: 'Effacer la recherche',
    allTeams: 'Toutes les équipes', allTypes: 'Tous les types',
    founder: 'Membre fondateur', associate: 'Membre associé',
    name: 'Membre', position: 'Fonction', team: 'Équipe', type: 'Type', status: 'Statut',
    active: 'Actif', inactive: 'Inactif', reference: 'Réf.', noSubgroup: 'Aucun sous-groupe',
    results: 'membres affichés', empty: 'Aucun membre ne correspond aux filtres.',
    loading: 'Chargement de l’annuaire sécurisé…', retry: 'Réessayer',
    forbiddenTitle: 'Accès restreint',
    forbiddenBody: 'Cet annuaire C2 est réservé aux rôles autorisés pendant le pilote.',
    unavailableTitle: 'Pilote indisponible',
    unavailableBody: 'L’annuaire RH-001 n’est pas activé sur cet environnement.',
    errorTitle: 'Annuaire non disponible',
    errorBody: 'Les données n’ont pas pu être chargées. Aucun ancien annuaire n’est utilisé en remplacement.'
  },
  EN: {
    title: '2SG internal directory',
    subtitle: 'Validated members and positions, without personal contact details.',
    readOnly: 'Read only', validated: 'Validated documentary source',
    search: 'Search by name, position or team', clear: 'Clear search',
    allTeams: 'All teams', allTypes: 'All types',
    founder: 'Founding member', associate: 'Associate member',
    name: 'Member', position: 'Position', team: 'Team', type: 'Type', status: 'Status',
    active: 'Active', inactive: 'Inactive', reference: 'Ref.', noSubgroup: 'No subgroup',
    results: 'members shown', empty: 'No member matches the filters.',
    loading: 'Loading the secure directory…', retry: 'Try again',
    forbiddenTitle: 'Restricted access',
    forbiddenBody: 'This C2 directory is limited to authorized roles during the pilot.',
    unavailableTitle: 'Pilot unavailable',
    unavailableBody: 'The RH-001 directory is not enabled in this environment.',
    errorTitle: 'Directory unavailable',
    errorBody: 'The data could not be loaded. No legacy directory is used as a fallback.'
  },
  DE: {
    title: 'Internes 2SG-Verzeichnis',
    subtitle: 'Validierte Mitglieder und Funktionen ohne private Kontaktdaten.',
    readOnly: 'Nur lesen', validated: 'Validierte Dokumentationsquelle',
    search: 'Nach Name, Funktion oder Team suchen', clear: 'Suche löschen',
    allTeams: 'Alle Teams', allTypes: 'Alle Typen',
    founder: 'Gründungsmitglied', associate: 'Assoziiertes Mitglied',
    name: 'Mitglied', position: 'Funktion', team: 'Team', type: 'Typ', status: 'Status',
    active: 'Aktiv', inactive: 'Inaktiv', reference: 'Ref.', noSubgroup: 'Keine Untergruppe',
    results: 'Mitglieder angezeigt', empty: 'Kein Mitglied entspricht den Filtern.',
    loading: 'Sicheres Verzeichnis wird geladen…', retry: 'Erneut versuchen',
    forbiddenTitle: 'Eingeschränkter Zugriff',
    forbiddenBody: 'Dieses C2-Verzeichnis ist während des Pilotbetriebs autorisierten Rollen vorbehalten.',
    unavailableTitle: 'Pilot nicht verfügbar',
    unavailableBody: 'Das RH-001-Verzeichnis ist in dieser Umgebung nicht aktiviert.',
    errorTitle: 'Verzeichnis nicht verfügbar',
    errorBody: 'Die Daten konnten nicht geladen werden. Es wird kein altes Verzeichnis als Ersatz verwendet.'
  }
};

const normalize = (value) => String(value || '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase();

const MembersDirectory = ({ onLoaded }) => {
  const { language } = useLanguage();
  const t = copy[language] || copy.FR;
  const [members, setMembers] = useState([]);
  const [metadata, setMetadata] = useState({ classification: 'C2', sourceStatus: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [team, setTeam] = useState('');
  const [memberType, setMemberType] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.getMembersDirectory(100, 0);
        if (cancelled) return;
        const rows = Array.isArray(response?.data) ? response.data : [];
        setMembers(rows);
        setMetadata({
          classification: response?.classification || 'C2',
          sourceStatus: response?.source_status || ''
        });
        onLoaded?.(Number.isFinite(response?.total) ? response.total : rows.length);
      } catch (requestError) {
        if (cancelled) return;
        setMembers([]);
        setError(requestError);
        onLoaded?.(0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [onLoaded, reloadKey]);

  const teams = useMemo(
    () => [...new Set(members.map(member => member.team).filter(Boolean))].sort(),
    [members]
  );

  const filteredMembers = useMemo(() => {
    const normalizedQuery = normalize(query);
    return members.filter(member => {
      const searchable = normalize([
        member.display_name,
        member.preferred_name,
        member.position,
        member.team,
        member.subgroup
      ].join(' '));
      return (!normalizedQuery || searchable.includes(normalizedQuery))
        && (!team || member.team === team)
        && (!memberType || normalize(member.member_type) === memberType);
    });
  }, [members, memberType, query, team]);

  const getTypeLabel = (value) => normalize(value) === 'fondateur' ? t.founder : t.associate;

  const renderError = () => {
    const isForbidden = error?.status === 403;
    const isUnavailable = error?.status === 404;
    const title = isForbidden ? t.forbiddenTitle : isUnavailable ? t.unavailableTitle : t.errorTitle;
    const body = isForbidden ? t.forbiddenBody : isUnavailable ? t.unavailableBody : t.errorBody;

    return (
      <div className="rounded-lg border border-amber-700/60 bg-amber-950/30 px-6 py-8 text-center" role="alert">
        <CircleAlert className="mx-auto mb-3 text-amber-300" size={30} aria-hidden="true" />
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-300">{body}</p>
        {error?.status !== 401 && (
          <button
            type="button"
            onClick={() => setReloadKey(key => key + 1)}
            className="mt-5 inline-flex items-center gap-2 rounded-md border border-slate-500 bg-slate-800 px-4 py-2 font-semibold text-white hover:bg-slate-700"
          >
            <RefreshCw size={16} aria-hidden="true" /> {t.retry}
          </button>
        )}
      </div>
    );
  };

  return (
    <section className="overflow-hidden rounded-lg border border-slate-700 bg-slate-800" aria-labelledby="members-directory-title">
      <div className="border-b border-slate-700 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-950 text-blue-300">
              <ContactRound size={22} aria-hidden="true" />
            </span>
            <div>
              <h2 id="members-directory-title" className="text-xl font-bold text-white">{t.title}</h2>
              <p className="mt-1 text-sm text-slate-300">{t.subtitle}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-700 bg-blue-950/70 px-3 py-1.5 text-blue-200">
              <LockKeyhole size={14} aria-hidden="true" /> {t.readOnly}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700 bg-emerald-950/60 px-3 py-1.5 text-emerald-200">
              <ShieldCheck size={14} aria-hidden="true" /> {metadata.classification}
            </span>
            {metadata.sourceStatus === 'validated_documentary' && (
              <span className="rounded-full border border-slate-600 bg-slate-900 px-3 py-1.5 text-slate-300">{t.validated}</span>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex min-h-56 items-center justify-center gap-3 px-6 py-10 text-slate-300" role="status">
          <RefreshCw className="animate-spin text-blue-400" size={20} aria-hidden="true" /> {t.loading}
        </div>
      ) : error ? renderError() : (
        <>
          <div className="grid gap-3 border-b border-slate-700 px-5 py-4 md:grid-cols-[minmax(16rem,1fr)_11rem_12rem_auto] sm:px-6">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder={t.search}
                className="h-10 w-full rounded-md border border-slate-600 bg-slate-900 pl-10 pr-10 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} title={t.clear} className="absolute right-2 top-2 rounded p-1 text-slate-400 hover:bg-slate-700 hover:text-white">
                  <X size={17} aria-hidden="true" />
                </button>
              )}
            </div>
            <select value={team} onChange={event => setTeam(event.target.value)} className="h-10 rounded-md border border-slate-600 bg-slate-900 px-3 text-sm text-white">
              <option value="">{t.allTeams}</option>
              {teams.map(value => <option key={value} value={value}>{value}</option>)}
            </select>
            <select value={memberType} onChange={event => setMemberType(event.target.value)} className="h-10 rounded-md border border-slate-600 bg-slate-900 px-3 text-sm text-white">
              <option value="">{t.allTypes}</option>
              <option value="fondateur">{t.founder}</option>
              <option value="associe">{t.associate}</option>
            </select>
            <button type="button" onClick={() => setReloadKey(key => key + 1)} title={t.retry} className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-600 bg-slate-900 text-slate-300 hover:border-blue-500 hover:text-white">
              <RefreshCw size={17} aria-hidden="true" />
            </button>
          </div>

          <div className="px-5 py-3 text-sm text-slate-400 sm:px-6">
            <strong className="text-white">{filteredMembers.length}</strong> / {members.length} {t.results}
          </div>

          {filteredMembers.length === 0 ? (
            <div className="border-t border-slate-700 px-6 py-12 text-center text-slate-400">{t.empty}</div>
          ) : (
            <div className="divide-y divide-slate-700 border-t border-slate-700">
              <div className="hidden grid-cols-[minmax(13rem,1.05fr)_minmax(16rem,1.5fr)_11rem_12rem_7rem] gap-4 bg-slate-900/50 px-6 py-3 text-xs font-bold uppercase text-slate-400 lg:grid">
                <span>{t.name}</span><span>{t.position}</span><span>{t.team}</span><span>{t.type}</span><span>{t.status}</span>
              </div>
              <ul className="divide-y divide-slate-700">
                {filteredMembers.map(member => (
                  <li key={member.person_id} className="grid gap-4 px-5 py-5 transition-colors hover:bg-slate-700/30 sm:px-6 lg:grid-cols-[minmax(13rem,1.05fr)_minmax(16rem,1.5fr)_11rem_12rem_7rem] lg:items-center">
                    <div className="min-w-0">
                      <p className="font-bold text-white">{member.display_name}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {member.preferred_name && member.preferred_name !== member.display_name ? `${member.preferred_name} · ` : ''}{t.reference} {member.person_id}
                      </p>
                    </div>
                    <div><p className="mb-1 text-xs font-bold uppercase text-slate-500 lg:hidden">{t.position}</p><p className="text-sm text-slate-200">{member.position}</p></div>
                    <div><p className="mb-1 text-xs font-bold uppercase text-slate-500 lg:hidden">{t.team}</p><p className="font-semibold text-blue-300">{member.team}</p><p className="mt-1 text-xs text-slate-400">{member.subgroup || t.noSubgroup}</p></div>
                    <div><p className="mb-1 text-xs font-bold uppercase text-slate-500 lg:hidden">{t.type}</p><span className="inline-flex rounded-full border border-slate-600 bg-slate-900 px-2.5 py-1 text-xs font-semibold text-slate-200">{getTypeLabel(member.member_type)}</span></div>
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase text-slate-500 lg:hidden">{t.status}</p>
                      <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${member.active ? 'text-emerald-300' : 'text-slate-400'}`}>
                        <span className={`h-2 w-2 rounded-full ${member.active ? 'bg-emerald-400' : 'bg-slate-500'}`} aria-hidden="true" /> {member.active ? t.active : t.inactive}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default MembersDirectory;
