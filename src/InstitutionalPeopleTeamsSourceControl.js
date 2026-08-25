import React from 'react';
import {
  AlertTriangle,
  Database,
  Eye,
  FileArchive,
  ListChecks,
  SlidersHorizontal
} from 'lucide-react';

const STATUS_STYLES = {
  connected: 'border-emerald-700/70 bg-emerald-950/25 text-emerald-200',
  derived: 'border-sky-700/70 bg-sky-950/25 text-sky-100',
  evidence: 'border-violet-700/70 bg-violet-950/25 text-violet-100'
};

const COPY = {
  FR: {
    eyebrow: 'CONTROLE DES SUPPORTS CANDIDATS · REF-01 · V0.5 · 25-08-2026',
    title: 'Comparer les supports sans les promouvoir',
    body: 'Ce comparatif distingue le contrat backend RH-001, ses vues de lecture, ses projections opérationnelles et les preuves GED. Un support raccordé ou utile ne devient pas automatiquement une source maîtresse.',
    counters: [
      ['Supports contrôlés', '4', 'Un contrat, deux consommations dérivées et un dépôt de preuves'],
      ['Contrats backend observés', '1', 'Endpoint RH-001 protégé et en lecture seule'],
      ['Consommations dérivées', '2', 'Annuaire sécurisé et sélecteurs Team/Agent'],
      ['Sources maîtresses désignées', '0', 'Décision humaine distincte requise']
    ],
    columns: {
      support: 'Support observé',
      classification: 'Nature',
      role: 'Rôle réellement observé',
      responsibility: 'Responsabilité retenue',
      gap: 'Écart avant décision',
      status: 'État'
    },
    statuses: {
      connected: 'Support raccordé',
      derived: 'Consommation dérivée',
      evidence: 'Preuve séparée'
    },
    rows: [
      {
        support: 'API RH-001 · /members-directory',
        classification: 'Contrat documentaire C2',
        role: 'Expose, après autorisation, un annuaire assaini en lecture seule avec identifiant technique, libellés, équipe, type et état ; aucune coordonnée personnelle.',
        responsibility: 'Organisation & RH porte le sens métier ; IT protège et maintient le contrat technique.',
        gap: 'Unicité, couverture, version du contenu, événements de cycle et circuit de correction restent à prouver sur la durée.',
        status: 'connected'
      },
      {
        support: 'Annuaire interne sécurisé',
        classification: 'Vue de lecture de RH-001',
        role: 'Affiche la réponse RH-001 selon les droits, avec recherche, filtres et traductions locales ; ne conserve pas un second annuaire.',
        responsibility: 'Organisation & RH valide le contenu ; IT maintient l’interface et les états d’accès.',
        gap: 'La date et la version de l’extrait doivent rester visibles ; cette vue ne peut pas être promue comme source indépendante.',
        status: 'derived'
      },
      {
        support: 'Sélecteurs partagés Team/Agent',
        classification: 'Projection opérationnelle dérivée',
        role: 'Construit des options à partir des membres actifs RH-001, normalise TZH/TSN et ajoute un collectif distinct pour chaque équipe.',
        responsibility: 'La fonction consommatrice valide l’affectation métier ; IT maintient les règles de projection.',
        gap: 'Alias et libellés ne valent pas identifiant maître ; les anciennes valeurs et changements d’équipe doivent garder leur provenance.',
        status: 'derived'
      },
      {
        support: 'GED · preuves RH autorisées',
        classification: 'Dépôt de preuves séparé',
        role: 'Conserve mandats, contrats, décisions et justificatifs autorisés sans devenir l’annuaire opérationnel des personnes et équipes.',
        responsibility: 'GED conserve versions et preuves ; Organisation & RH contrôle le classement et les droits métier.',
        gap: 'Les liens entre preuve, objet REF-01 et événement de cycle restent à versionner et contrôler.',
        status: 'evidence'
      }
    ],
    criteriaTitle: 'Sept critères avant toute désignation de source maîtresse',
    criteriaIntro: 'Ces contrôles préparent une décision ultérieure. Ils ne constituent ni un score, ni un taux d’avancement.',
    criteria: [
      ['Identifiant stable', 'Unicité, non-réutilisation et règle de correction prouvées.'],
      ['Périmètre et couverture', 'Objets inclus, exclusions, territoires et cas collectifs explicités.'],
      ['Cycle versionné', 'Entrée, affectation, transfert, suspension et clôture conservés dans l’historique.'],
      ['Propriété et validation', 'Responsable métier, garde technique et autorité de décision nommés.'],
      ['Accès et sensibilité', 'Classification C2, moindre privilège, journalisation et absence de repli non autorisé.'],
      ['Preuve et conservation', 'Références GED, durée de conservation et relations avec les événements définies.'],
      ['Qualité et propagation', 'Contrôles de cohérence, écarts, corrections et effets sur les consommateurs maîtrisés.']
    ],
    decisionStatus: 'Arbitrage distinct requis',
    boundary: 'Statut : comparatif préparatoire V0.5. Aucune source maîtresse, qualité, complétude, identité civile, donnée personnelle, modification de schéma, automatisation ou progression n’est validée par ce lot.',
    source: 'Supports contrôlés dans le code publié : contrat API RH-001, composant Annuaire interne, utilitaire partagé Team/Agent, cadrage GED et décisions REF-01-DEC-001 et REF-01-DEC-002.'
  },
  EN: {
    eyebrow: 'CANDIDATE-SUPPORT CONTROL · REF-01 · V0.5 · 25 AUG 2026',
    title: 'Compare supports without promoting them',
    body: 'This comparison separates the RH-001 backend contract, its read views, its operational projections and DMS evidence. A connected or useful support does not automatically become a master source.',
    counters: [
      ['Controlled supports', '4', 'One contract, two derived consumers and one evidence repository'],
      ['Observed backend contracts', '1', 'Protected read-only RH-001 endpoint'],
      ['Derived consumers', '2', 'Secure directory and Team/Agent selectors'],
      ['Designated master sources', '0', 'Separate human decision required']
    ],
    columns: {
      support: 'Observed support',
      classification: 'Nature',
      role: 'Actually observed role',
      responsibility: 'Retained responsibility',
      gap: 'Gap before decision',
      status: 'State'
    },
    statuses: {
      connected: 'Connected support',
      derived: 'Derived consumer',
      evidence: 'Separate evidence'
    },
    rows: [
      {
        support: 'RH-001 API · /members-directory',
        classification: 'C2 documentary contract',
        role: 'After authorisation, exposes a sanitised read-only directory with technical identifier, labels, team, type and state; no personal contact details.',
        responsibility: 'Organisation & HR owns business meaning; IT protects and maintains the technical contract.',
        gap: 'Uniqueness, coverage, content version, lifecycle events and the correction workflow still require durable evidence.',
        status: 'connected'
      },
      {
        support: 'Secure internal directory',
        classification: 'RH-001 read view',
        role: 'Displays the RH-001 response according to rights, with search, filters and local translations; it retains no second directory.',
        responsibility: 'Organisation & HR validates content; IT maintains the interface and access states.',
        gap: 'Extract date and version must remain visible; this view cannot be promoted as an independent source.',
        status: 'derived'
      },
      {
        support: 'Shared Team/Agent selectors',
        classification: 'Derived operational projection',
        role: 'Builds options from active RH-001 members, normalises TZH/TSN and adds a separate collective for each team.',
        responsibility: 'The consuming function validates the business assignment; IT maintains projection rules.',
        gap: 'Aliases and labels are not master identifiers; former values and team changes must retain provenance.',
        status: 'derived'
      },
      {
        support: 'DMS · authorised HR evidence',
        classification: 'Separate evidence repository',
        role: 'Retains authorised mandates, contracts, decisions and evidence without becoming the operational people-and-teams directory.',
        responsibility: 'The DMS retains versions and evidence; Organisation & HR controls classification and business rights.',
        gap: 'Links between evidence, REF-01 object and lifecycle event still need versioning and control.',
        status: 'evidence'
      }
    ],
    criteriaTitle: 'Seven criteria before any master-source designation',
    criteriaIntro: 'These controls prepare a later decision. They are neither a score nor a progress rate.',
    criteria: [
      ['Stable identifier', 'Uniqueness, non-reuse and correction rule evidenced.'],
      ['Scope and coverage', 'Included objects, exclusions, territories and collective cases explicit.'],
      ['Versioned lifecycle', 'Entry, assignment, transfer, suspension and closure retained in history.'],
      ['Ownership and validation', 'Business owner, technical steward and decision authority named.'],
      ['Access and sensitivity', 'C2 classification, least privilege, logging and no unauthorised fallback.'],
      ['Evidence and retention', 'DMS references, retention period and event relationships defined.'],
      ['Quality and propagation', 'Consistency controls, gaps, corrections and consumer effects governed.']
    ],
    decisionStatus: 'Separate review required',
    boundary: 'Status: V0.5 preparatory comparison. This lot validates no master source, quality, completeness, civil identity, personal data, schema change, automation or progress.',
    source: 'Supports controlled in published code: RH-001 API contract, Internal Directory component, shared Team/Agent utility, DMS framing and decisions REF-01-DEC-001 and REF-01-DEC-002.'
  },
  DE: {
    eyebrow: 'KONTROLLE DER QUELLKANDIDATEN · REF-01 · V0.5 · 25.08.2026',
    title: 'Träger vergleichen, ohne sie zu fördern',
    body: 'Dieser Vergleich trennt den RH-001-Backendvertrag, seine Leseansichten, operativen Projektionen und DMS-Nachweise. Ein verbundener oder nützlicher Träger wird nicht automatisch zur Masterquelle.',
    counters: [
      ['Geprüfte Träger', '4', 'Ein Vertrag, zwei abgeleitete Verbraucher und ein Nachweisdepot'],
      ['Beobachtete Backendverträge', '1', 'Geschützter schreibgeschützter RH-001-Endpunkt'],
      ['Abgeleitete Verbraucher', '2', 'Sicheres Verzeichnis und Team-/Agent-Auswahl'],
      ['Bestimmte Masterquellen', '0', 'Getrennter menschlicher Entscheid erforderlich']
    ],
    columns: {
      support: 'Beobachteter Träger',
      classification: 'Art',
      role: 'Tatsächlich beobachtete Rolle',
      responsibility: 'Festgehaltene Verantwortung',
      gap: 'Abweichung vor Entscheid',
      status: 'Stand'
    },
    statuses: {
      connected: 'Verbundener Träger',
      derived: 'Abgeleiteter Verbraucher',
      evidence: 'Getrennter Nachweis'
    },
    rows: [
      {
        support: 'RH-001-API · /members-directory',
        classification: 'C2-Dokumentationsvertrag',
        role: 'Stellt nach Autorisierung ein bereinigtes schreibgeschütztes Verzeichnis mit technischer Kennung, Bezeichnungen, Team, Typ und Stand bereit; keine privaten Kontaktdaten.',
        responsibility: 'Organisation & Personal trägt die Fachbedeutung; IT schützt und pflegt den technischen Vertrag.',
        gap: 'Eindeutigkeit, Abdeckung, Inhaltsversion, Lebenszyklusereignisse und Korrekturablauf benötigen noch dauerhafte Nachweise.',
        status: 'connected'
      },
      {
        support: 'Sicheres internes Verzeichnis',
        classification: 'RH-001-Leseansicht',
        role: 'Zeigt die RH-001-Antwort gemäss Rechten mit Suche, Filtern und lokalen Übersetzungen; es speichert kein zweites Verzeichnis.',
        responsibility: 'Organisation & Personal validiert den Inhalt; IT pflegt Oberfläche und Zugriffszustände.',
        gap: 'Datum und Version des Auszugs müssen sichtbar bleiben; diese Ansicht kann nicht als unabhängige Quelle gefördert werden.',
        status: 'derived'
      },
      {
        support: 'Gemeinsame Team-/Agent-Auswahl',
        classification: 'Abgeleitete operative Projektion',
        role: 'Erstellt Optionen aus aktiven RH-001-Mitgliedern, normalisiert TZH/TSN und ergänzt je Team ein getrenntes Kollektiv.',
        responsibility: 'Die verbrauchende Funktion validiert die fachliche Zuweisung; IT pflegt die Projektionsregeln.',
        gap: 'Aliase und Bezeichnungen sind keine Masterkennungen; frühere Werte und Teamwechsel müssen ihre Herkunft bewahren.',
        status: 'derived'
      },
      {
        support: 'DMS · autorisierte Personalnachweise',
        classification: 'Getrenntes Nachweisdepot',
        role: 'Bewahrt autorisierte Mandate, Verträge, Entscheide und Nachweise, ohne zum operativen Personen- und Teamverzeichnis zu werden.',
        responsibility: 'DMS bewahrt Versionen und Nachweise; Organisation & Personal kontrolliert Klassifizierung und Fachrechte.',
        gap: 'Verbindungen zwischen Nachweis, REF-01-Objekt und Lebenszyklusereignis müssen noch versioniert und kontrolliert werden.',
        status: 'evidence'
      }
    ],
    criteriaTitle: 'Sieben Kriterien vor jeder Bestimmung einer Masterquelle',
    criteriaIntro: 'Diese Kontrollen bereiten einen späteren Entscheid vor. Sie sind weder Punktzahl noch Fortschrittsquote.',
    criteria: [
      ['Stabile Kennung', 'Eindeutigkeit, Nichtwiederverwendung und Korrekturregel belegt.'],
      ['Umfang und Abdeckung', 'Enthaltene Objekte, Ausschlüsse, Gebiete und Kollektivfälle ausdrücklich.'],
      ['Versionierter Lebenszyklus', 'Eintritt, Zuweisung, Wechsel, Suspendierung und Abschluss in der Historie bewahrt.'],
      ['Verantwortung und Validierung', 'Fachverantwortung, technische Pflege und Entscheidungsautorität benannt.'],
      ['Zugriff und Sensibilität', 'C2-Klassifizierung, geringste Berechtigung, Protokollierung und kein unautorisierter Ersatz.'],
      ['Nachweis und Aufbewahrung', 'DMS-Referenzen, Aufbewahrungsdauer und Ereignisbeziehungen definiert.'],
      ['Qualität und Weitergabe', 'Konsistenzkontrollen, Abweichungen, Korrekturen und Verbraucherwirkungen gesteuert.']
    ],
    decisionStatus: 'Getrennter Entscheid erforderlich',
    boundary: 'Status: vorbereitender Vergleich V0.5. Dieses Los validiert keine Masterquelle, Qualität, Vollständigkeit, Zivilidentität, Personendaten, Schemaänderung, Automatisierung oder Fortschritt.',
    source: 'Im veröffentlichten Code kontrollierte Träger: RH-001-API-Vertrag, Komponente Internes Verzeichnis, gemeinsames Team-/Agent-Werkzeug, DMS-Rahmen sowie REF-01-DEC-001 und REF-01-DEC-002.'
  }
};

const StatusBadge = ({ label, status }) => (
  <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}>
    {label}
  </span>
);

const SourceCard = ({ row, t }) => (
  <article className="m3s-raised p-3">
    <div className="flex flex-wrap items-start justify-between gap-2">
      <div>
        <h6 className="text-sm font-semibold text-slate-100">{row.support}</h6>
        <p className="mt-1 text-xs font-semibold text-cyan-300">{row.classification}</p>
      </div>
      <StatusBadge label={t.statuses[row.status]} status={row.status} />
    </div>
    <dl className="mt-3 space-y-3 border-t border-slate-700 pt-3">
      <div><dt className="text-xs font-semibold text-slate-400">{t.columns.role}</dt><dd className="mt-1 text-sm leading-5 text-slate-300">{row.role}</dd></div>
      <div><dt className="text-xs font-semibold text-slate-400">{t.columns.responsibility}</dt><dd className="mt-1 text-sm leading-5 text-slate-300">{row.responsibility}</dd></div>
      <div><dt className="text-xs font-semibold text-amber-300">{t.columns.gap}</dt><dd className="mt-1 text-sm leading-5 text-slate-300">{row.gap}</dd></div>
    </dl>
  </article>
);

const InstitutionalPeopleTeamsSourceControl = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const CounterIcons = [ListChecks, Database, SlidersHorizontal, FileArchive];

  return (
    <section id="institutional-ref01-source-candidate-control" className="m3s-ref01-sources mt-4 rounded-md border border-violet-800/70 bg-violet-950/10 p-4 scroll-mt-24" aria-labelledby="institutional-ref01-source-candidate-control-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl">
          <p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p>
          <h6 id="institutional-ref01-source-candidate-control-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <Eye className="shrink-0 text-violet-300" size={24} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {t.counters.map(([label, value, note], index) => {
          const Icon = CounterIcons[index];
          return (
            <article key={label} className="m3s-raised min-h-28 p-3">
              <div className="flex items-start justify-between gap-3">
                <div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>
                <Icon className={index === 3 ? 'text-amber-300' : 'text-violet-300'} size={19} aria-hidden="true" />
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-400">{note}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-4 hidden overflow-x-auto rounded-md border border-slate-700 xl:block">
        <table className="w-full min-w-[1420px] border-collapse text-left text-sm">
          <thead className="m3s-cns03-inventory-head bg-slate-900/70 text-xs uppercase text-slate-300">
            <tr>
              <th className="px-3 py-3 font-semibold">{t.columns.support}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.classification}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.role}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.responsibility}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.gap}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.status}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700 bg-slate-950/15">
            {t.rows.map(row => (
              <tr key={row.support} className="align-top">
                <th scope="row" className="px-3 py-3 font-semibold text-slate-100">{row.support}</th>
                <td className="px-3 py-3 font-semibold text-cyan-300">{row.classification}</td>
                <td className="px-3 py-3 leading-5 text-slate-300">{row.role}</td>
                <td className="px-3 py-3 leading-5 text-slate-300">{row.responsibility}</td>
                <td className="px-3 py-3 leading-5 text-amber-100">{row.gap}</td>
                <td className="px-3 py-3"><StatusBadge label={t.statuses[row.status]} status={row.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:hidden">
        {t.rows.map(row => <SourceCard key={row.support} row={row} t={t} />)}
      </div>

      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/20 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2"><ListChecks className="text-emerald-300" size={18} aria-hidden="true" /><h6 className="text-sm font-semibold text-slate-100">{t.criteriaTitle}</h6></div>
            <p className="mt-2 text-xs leading-5 text-slate-400">{t.criteriaIntro}</p>
          </div>
          <span className="inline-flex w-fit rounded-md border border-amber-700/70 bg-amber-950/25 px-2 py-1 text-xs font-semibold text-amber-100">{t.decisionStatus}</span>
        </div>
        <ol className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {t.criteria.map(([label, detail], index) => (
            <li key={label} className="rounded-md border border-slate-700 p-3">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-violet-900/70 text-xs font-semibold text-violet-100">{index + 1}</span>
                <div><p className="text-sm font-semibold text-slate-100">{label}</p><p className="mt-1 text-xs leading-5 text-slate-400">{detail}</p></div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-4 flex items-start gap-2 border-t border-slate-700 pt-4 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
      <p className="mt-3 text-xs leading-5 text-slate-400">{t.source}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsSourceControl;
