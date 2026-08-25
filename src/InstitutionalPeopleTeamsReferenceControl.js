import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Network,
  ShieldCheck,
  UserRoundCheck,
  UsersRound
} from 'lucide-react';

const STATUS_STYLES = {
  observed: 'border-emerald-700/70 bg-emerald-950/25 text-emerald-200',
  candidate: 'border-amber-700/70 bg-amber-950/25 text-amber-100',
  open: 'border-rose-700/70 bg-rose-950/20 text-rose-100'
};

const COPY = {
  FR: {
    eyebrow: 'CONTROLE DETAILLE 1/11 · REF-01 · V0.1 · 25-08-2026',
    title: 'REF-01 · Personnes et équipes',
    body: 'Ce contrôle rapproche l’annuaire RH-001, les sélecteurs Team/Agent et les règles déjà publiées pour les responsabilités collectives. Il prépare un modèle commun sans recopier l’annuaire, désigner une source maîtresse ou confondre personne, appartenance, équipe, rôle et accès M3S.',
    counters: [
      ['Axes contrôlés', '5', 'Identité, structure, cycle, responsabilité et preuve'],
      ['Données personnelles publiées', '0', 'Aucun nom, contact ou identifiant réel'],
      ['Sources maîtresses retenues dans REF-01', '0', 'Décision humaine encore requise']
    ],
    modelTitle: 'Modèle logique candidat à quatre objets',
    modelIntro: 'Cette séparation reprend les distinctions déjà observées. Elle reste un cadrage fonctionnel et ne crée ni table, ni compte, ni droit.',
    model: [
      ['Personne', 'Identité institutionnelle distincte de ses fonctions, équipes et accès.'],
      ['Appartenance', 'Lien daté entre une personne, un statut institutionnel et une équipe.'],
      ['Équipe', 'Regroupement opérationnel territorial ou fonctionnel, par exemple TZH ou TSN.'],
      ['Responsabilité collective', 'Affectation à toute l’équipe, distincte d’une affectation individuelle.']
    ],
    columns: { axis: 'Axe', observed: 'Constat observé', rule: 'Règle candidate ou contrôle', status: 'État' },
    statuses: { observed: 'Contrat observé', candidate: 'Règle candidate', open: 'Décision ouverte' },
    rows: [
      ['Identité stable', 'RH-001 porte un identifiant technique stable et des libellés d’affichage assainis.', 'Conserver un identifiant non réutilisable ; confirmer séparément identité civile, alias et preuve dans l’espace autorisé.', 'observed'],
      ['Séparation des objets', 'Annuaire, comptes, droits et sélecteurs opérationnels sont déjà traités comme des objets distincts.', 'Retenir Personne, Appartenance, Équipe et Responsabilité collective ; laisser comptes et droits à REF-02.', 'candidate'],
      ['Cycle de vie', 'Un état actif/inactif est visible, mais l’entrée, la suspension, le transfert et la sortie ne sont pas versionnés ici.', 'Définir événements, dates d’effet, responsable, motif contrôlé et preuve avant toute mesure.', 'open'],
      ['Collectifs TZH/TSN', 'Les formulaires distinguent une personne du collectif de son équipe et refusent les couples Team-Agent impossibles.', 'Interdire qu’un collectif soit résolu comme personne ; conserver la provenance des anciennes valeurs sans correction silencieuse.', 'observed'],
      ['Propriété et preuve', 'RH-001 est une source documentaire C2 en lecture seule ; les mandats et preuves restent séparés.', 'Confirmer Organisation & RH comme propriétaire métier candidat, IT comme gestionnaire technique et la GED comme conservateur de preuve.', 'open']
    ],
    boundary: 'Limite : ce lot ne valide ni identité civile, ni appartenance actuelle, ni mandat, ni contrat, ni rôle applicatif. Il n’ouvre aucun accès et ne publie aucun enregistrement RH-001.',
    source: 'Supports observés : contrat documentaire RH-001 en lecture seule, annuaire C2 protégé, sélecteurs Team/Agent partagés et décisions de gouvernance des 31-07 et 22-08-2026.',
    openDirectory: 'Ouvrir l’annuaire sécurisé',
    openArchitecture: 'Examiner l’architecture RH de REF-01'
  },
  EN: {
    eyebrow: 'DETAILED CONTROL 1/11 · REF-01 · V0.1 · 25 AUG 2026',
    title: 'REF-01 · People and teams',
    body: 'This control reconciles the RH-001 directory, Team/Agent selectors and the published rules for collective responsibilities. It prepares a shared model without copying the directory, designating a master source or confusing a person, membership, team, role and M3S access.',
    counters: [
      ['Controlled axes', '5', 'Identity, structure, lifecycle, responsibility and evidence'],
      ['Personal records published', '0', 'No name, contact detail or real identifier'],
      ['Master sources retained for REF-01', '0', 'Human decision still required']
    ],
    modelTitle: 'Candidate four-object logical model',
    modelIntro: 'This separation reuses distinctions already observed. It remains functional framing and creates no table, account or right.',
    model: [
      ['Person', 'Institutional identity distinct from positions, teams and access.'],
      ['Membership', 'Dated link between a person, an institutional status and a team.'],
      ['Team', 'Territorial or functional operational group, such as TZH or TSN.'],
      ['Collective responsibility', 'Assignment to the whole team, distinct from an individual assignment.']
    ],
    columns: { axis: 'Axis', observed: 'Observed finding', rule: 'Candidate rule or control', status: 'State' },
    statuses: { observed: 'Observed contract', candidate: 'Candidate rule', open: 'Open decision' },
    rows: [
      ['Stable identity', 'RH-001 carries a stable technical identifier and sanitised display labels.', 'Keep a non-reusable identifier; confirm civil identity, aliases and evidence separately in the authorised space.', 'observed'],
      ['Object separation', 'Directory, accounts, rights and operational selectors are already handled as separate objects.', 'Retain Person, Membership, Team and Collective responsibility; leave accounts and rights to REF-02.', 'candidate'],
      ['Lifecycle', 'An active/inactive state is visible, but entry, suspension, transfer and exit are not versioned here.', 'Define events, effective dates, owner, controlled reason and evidence before any measurement.', 'open'],
      ['TZH/TSN collectives', 'Forms distinguish a person from the team collective and reject impossible Team-Agent pairs.', 'Prevent a collective from resolving as a person; retain historical provenance without silent correction.', 'observed'],
      ['Ownership and evidence', 'RH-001 is a read-only C2 documentary source; mandates and evidence remain separate.', 'Confirm Organisation & HR as candidate business owner, IT as technical steward and the DMS as evidence custodian.', 'open']
    ],
    boundary: 'Boundary: this lot validates no civil identity, current membership, mandate, contract or application role. It opens no access and publishes no RH-001 record.',
    source: 'Observed supports: read-only RH-001 documentary contract, protected C2 directory, shared Team/Agent selectors and governance decisions dated 31 Jul and 22 Aug 2026.',
    openDirectory: 'Open the secure directory',
    openArchitecture: 'Review the REF-01 HR architecture'
  },
  DE: {
    eyebrow: 'DETAILKONTROLLE 1/11 · REF-01 · V0.1 · 25.08.2026',
    title: 'REF-01 · Personen und Teams',
    body: 'Diese Kontrolle gleicht das RH-001-Verzeichnis, die Team-/Agent-Auswahl und die veröffentlichten Regeln für kollektive Verantwortungen ab. Sie bereitet ein gemeinsames Modell vor, ohne das Verzeichnis zu kopieren, eine Masterquelle zu bestimmen oder Person, Mitgliedschaft, Team, Rolle und M3S-Zugriff zu vermischen.',
    counters: [
      ['Geprüfte Achsen', '5', 'Identität, Struktur, Lebenszyklus, Verantwortung und Nachweis'],
      ['Veröffentlichte Personendaten', '0', 'Kein Name, Kontakt oder reale Kennung'],
      ['Für REF-01 festgelegte Masterquellen', '0', 'Menschlicher Entscheid weiterhin erforderlich']
    ],
    modelTitle: 'Vorgeschlagenes logisches Vier-Objekt-Modell',
    modelIntro: 'Diese Trennung übernimmt bereits beobachtete Unterscheidungen. Sie bleibt ein funktionaler Rahmen und erstellt weder Tabelle, Konto noch Recht.',
    model: [
      ['Person', 'Institutionelle Identität, getrennt von Funktionen, Teams und Zugriffen.'],
      ['Mitgliedschaft', 'Datierte Verbindung zwischen Person, institutionellem Status und Team.'],
      ['Team', 'Territoriale oder funktionale operative Gruppe wie TZH oder TSN.'],
      ['Kollektive Verantwortung', 'Zuweisung an das ganze Team, getrennt von einer individuellen Zuweisung.']
    ],
    columns: { axis: 'Achse', observed: 'Beobachteter Befund', rule: 'Vorgeschlagene Regel oder Kontrolle', status: 'Stand' },
    statuses: { observed: 'Vertrag beobachtet', candidate: 'Regel vorgeschlagen', open: 'Entscheid offen' },
    rows: [
      ['Stabile Identität', 'RH-001 führt eine stabile technische Kennung und bereinigte Anzeigebezeichnungen.', 'Eine nicht wiederverwendbare Kennung beibehalten; Zivilidentität, Aliase und Nachweis getrennt im autorisierten Raum bestätigen.', 'observed'],
      ['Objekttrennung', 'Verzeichnis, Konten, Rechte und operative Auswahl werden bereits als getrennte Objekte behandelt.', 'Person, Mitgliedschaft, Team und kollektive Verantwortung übernehmen; Konten und Rechte REF-02 zuordnen.', 'candidate'],
      ['Lebenszyklus', 'Ein Aktiv-/Inaktiv-Stand ist sichtbar; Eintritt, Suspendierung, Wechsel und Austritt sind hier nicht versioniert.', 'Ereignisse, Wirksamkeitsdaten, Verantwortung, kontrollierten Grund und Nachweis vor jeder Messung definieren.', 'open'],
      ['Kollektive TZH/TSN', 'Formulare unterscheiden Person und Teamkollektiv und weisen unmögliche Team-Agent-Kombinationen ab.', 'Verhindern, dass ein Kollektiv als Person aufgelöst wird; historische Herkunft ohne stille Korrektur bewahren.', 'observed'],
      ['Verantwortung und Nachweis', 'RH-001 ist eine schreibgeschützte C2-Dokumentationsquelle; Mandate und Nachweise bleiben getrennt.', 'Organisation & Personal als Fachverantwortung, IT als technische Datenpflege und GED als Nachweisverwahrung bestätigen.', 'open']
    ],
    boundary: 'Grenze: Dieses Los validiert weder Zivilidentität, aktuelle Mitgliedschaft, Mandat, Vertrag noch Anwendungsrolle. Es öffnet keinen Zugriff und veröffentlicht keinen RH-001-Datensatz.',
    source: 'Beobachtete Träger: schreibgeschützter RH-001-Dokumentationsvertrag, geschütztes C2-Verzeichnis, gemeinsame Team-/Agent-Auswahl und Governance-Entscheide vom 31.07. und 22.08.2026.',
    openDirectory: 'Sicheres Verzeichnis öffnen',
    openArchitecture: 'REF-01-Personalarchitektur prüfen'
  }
};

const StatusBadge = ({ status, label }) => (
  <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}>
    {label}
  </span>
);

const InstitutionalPeopleTeamsReferenceControl = ({ language = 'FR', onNavigate }) => {
  const t = COPY[language] || COPY.FR;
  const returnContext = 'returnTo=dashboard&dashboardView=program&dashboardSection=institutional-ref01-people-teams-control';

  return (
    <section id="institutional-ref01-people-teams-control" className="mt-4 rounded-md border border-cyan-800/70 bg-cyan-950/10 p-4 scroll-mt-24" aria-labelledby="institutional-ref01-people-teams-control-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl">
          <p className="text-xs font-semibold uppercase text-cyan-300">{t.eyebrow}</p>
          <h5 id="institutional-ref01-people-teams-control-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h5>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <ShieldCheck className="shrink-0 text-cyan-300" size={24} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {t.counters.map(([label, value, note], index) => {
          const Icon = [BadgeCheck, ShieldCheck, UserRoundCheck][index];
          return (
            <article key={label} className="m3s-raised min-h-28 p-3">
              <div className="flex items-start justify-between gap-3">
                <div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>
                <Icon className={index === 0 ? 'text-cyan-300' : 'text-amber-300'} size={19} aria-hidden="true" />
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-400">{note}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/20 p-3">
        <div className="flex items-center gap-2"><Network className="text-cyan-300" size={18} aria-hidden="true" /><h6 className="text-sm font-semibold text-slate-100">{t.modelTitle}</h6></div>
        <p className="mt-2 text-xs leading-5 text-slate-400">{t.modelIntro}</p>
        <ol className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {t.model.map(([label, description], index) => (
            <li key={label} className="rounded-md border border-slate-700 p-3">
              <p className="text-xs font-semibold text-cyan-300">{index + 1}</p>
              <h6 className="mt-1 text-sm font-semibold text-slate-100">{label}</h6>
              <p className="mt-2 text-xs leading-5 text-slate-400">{description}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-4 hidden overflow-x-auto rounded-md border border-slate-700 md:block">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead className="m3s-cns03-inventory-head bg-slate-900/70 text-xs uppercase text-slate-300">
            <tr>
              <th className="px-3 py-3 font-semibold">{t.columns.axis}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.observed}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.rule}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.status}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700 bg-slate-950/15">
            {t.rows.map(([axis, observed, rule, status]) => (
              <tr key={axis} className="align-top">
                <th scope="row" className="px-3 py-3 font-semibold text-slate-100">{axis}</th>
                <td className="px-3 py-3 leading-5 text-slate-300">{observed}</td>
                <td className="px-3 py-3 leading-5 text-slate-300">{rule}</td>
                <td className="px-3 py-3"><StatusBadge status={status} label={t.statuses[status]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:hidden">
        {t.rows.map(([axis, observed, rule, status]) => (
          <article key={axis} className="m3s-raised p-3">
            <div className="flex flex-wrap items-start justify-between gap-2"><h6 className="text-sm font-semibold text-slate-100">{axis}</h6><StatusBadge status={status} label={t.statuses[status]} /></div>
            <p className="mt-3 text-sm leading-5 text-slate-300">{observed}</p>
            <p className="mt-3 border-t border-slate-700 pt-3 text-xs leading-5 text-slate-400">{rule}</p>
          </article>
        ))}
      </div>

      <p className="mt-4 flex items-start gap-2 border-t border-slate-700 pt-4 text-xs leading-5 text-slate-400"><AlertTriangle className="mt-0.5 shrink-0 text-amber-300" size={16} aria-hidden="true" />{t.boundary}</p>

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-700 pt-4 xl:flex-row xl:items-end xl:justify-between">
        <p className="max-w-3xl text-xs leading-5 text-slate-400">{t.source}</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button type="button" onClick={() => onNavigate(`/rh?tab=directory&${returnContext}#members-directory-title`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"><UsersRound size={16} aria-hidden="true" />{t.openDirectory}<ArrowRight size={16} aria-hidden="true" /></button>
          <button type="button" onClick={() => onNavigate(`/rh?tab=architecture&${returnContext}#rh-architecture-title`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"><Network size={16} aria-hidden="true" />{t.openArchitecture}</button>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalPeopleTeamsReferenceControl;
