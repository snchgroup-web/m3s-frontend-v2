import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  ClipboardList,
  Layers3,
  Route,
  ShieldCheck
} from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const WAVE_STYLES = {
  foundation: 'border-rose-700/70 bg-rose-950/25 text-rose-100',
  identity: 'border-sky-700/70 bg-sky-950/25 text-sky-100',
  access: 'border-violet-700/70 bg-violet-950/25 text-violet-100',
  evidence: 'border-amber-700/70 bg-amber-950/25 text-amber-100'
};

const COPY = {
  FR: {
    eyebrow: 'PRIORISATION DES ECARTS · REF-01 · V1.0 · 26-08-2026',
    title: 'Traiter les dépendances avant les raccordements',
    intro: 'Cette version ordonne les douze écarts confirmés sans leur attribuer de score. L’ordre validé repose sur leurs dépendances : le cycle versionné précède l’historique des affectations, les contrôles d’accès et les liens de preuve.',
    counters: [
      ['Écarts ordonnés', '12', 'Tous les résultats A-01 à A-12 sont couverts'],
      ['Vagues validées', '4', 'Fondation, identité, accès puis preuves'],
      ['Premier micro-lot', 'A-02', 'Cycle versionné RH-001'],
      ['Sources maîtresses', '0', 'Aucune promotion dans ce lot']
    ],
    columns: { wave: 'Vague', gaps: 'Écarts couverts', objective: 'Résultat attendu', dependency: 'Dépendance et ordre', state: 'Statut' },
    labels: { gaps: 'Écarts couverts', objective: 'Résultat attendu', dependency: 'Dépendance et ordre' },
    status: 'Ordre validé',
    waves: [
      {
        key: 'foundation', wave: '1 · Fondation du cycle', gaps: 'A-02',
        objective: 'Définir un contrat fonctionnel d’événement versionné pour Personne, Appartenance, Équipe et Responsabilité collective.',
        dependency: 'Point de départ : les autres historiques et références doivent pouvoir citer un événement stable.'
      },
      {
        key: 'identity', wave: '2 · Identité et provenance', gaps: 'A-01 · A-06 · A-07',
        objective: 'Prouver non-réutilisation, correction contrôlée et provenance des valeurs Team/Agent historiques.',
        dependency: 'S’appuie sur le contrat d’événement A-02 ; aucune migration de valeur n’est incluse.'
      },
      {
        key: 'access', wave: '3 · Accès et traçabilité', gaps: 'A-03 · A-05 · A-08 · A-11',
        objective: 'Cadrer moindre privilège, journaux de consultation ou d’affectation et fréquence de revue des droits.',
        dependency: 'Intervient après identification claire des objets et événements à journaliser.'
      },
      {
        key: 'evidence', wave: '4 · Preuves et conservation', gaps: 'A-04 · A-09 · A-10 · A-12',
        objective: 'Définir les références GED, les liens objet–événement–preuve, l’intégrité, les durées et le sort final.',
        dependency: 'Réutilise les identifiants et événements stabilisés ; aucune pièce RH n’est ouverte ici.'
      }
    ],
    lotEyebrow: 'PREMIER MICRO-LOT PROPOSE · REF-01-ML-001',
    lotTitle: 'Spécifier la trace d’événement RH-001',
    lotIntro: 'Le cadre du cycle est déjà validé par REF-01-DEC-002. Ce micro-lot prépare son contrat fonctionnel vérifiable avant toute décision d’implémentation.',
    lotSections: [
      ['Entrées autorisées', 'Les six familles d’événements, les quatre objets, les douze métadonnées et les six familles de motifs déjà validées.'],
      ['Livrables attendus', 'Catalogue des événements, règles de transition, responsabilités, références de preuve et critères d’acceptation testables.'],
      ['Contrôles de sortie', 'Chaque événement possède un identifiant, une date d’effet, un état résultant, une autorité métier et une référence de preuve autorisée ou un motif d’absence.'],
      ['Hors périmètre', 'Schéma de base, endpoint d’écriture, migration, événement réel, donnée personnelle, accès M3S, automatisation et calcul de progression.']
    ],
    recordLabels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-006', version: 'V1.0', status: 'Ordre des quatre vagues validé', author: 'Cheikh Ndiaye', date: '26-08-2026',
      decision: 'Les douze écarts REF-01 sont ordonnés selon les quatre vagues publiées. A-02 est retenu comme premier micro-lot et la préparation documentaire de REF-01-ML-001 peut commencer, sans implémentation.',
      evidence: 'Validation explicite de Cheikh dans la session du 26-08-2026 ; priorisation REF-01 V0.1 publiée par la PR frontend nº 191 au commit 470b1bc5.',
      limit: 'La décision ne qualifie aucune urgence juridique, conformité ou progression. Elle ne désigne aucune source maîtresse, n’ouvre aucun accès, n’expose aucune donnée personnelle, ne modifie aucun schéma et n’autorise ni migration ni automatisation.'
    },
    arbitration: 'Décision enregistrée : l’ordre des quatre vagues est validé et la préparation documentaire de REF-01-ML-001 est autorisée. Son implémentation reste soumise à une décision distincte.',
    boundary: 'Limite : une priorité exprime un ordre de dépendance, pas une urgence juridique, une conformité, un score ou un taux d’avancement.'
  },
  EN: {
    eyebrow: 'GAP PRIORITISATION · REF-01 · V1.0 · 26 AUG 2026',
    title: 'Address dependencies before connections',
    intro: 'This version orders the twelve confirmed gaps without scoring them. The validated order follows their dependencies: a versioned lifecycle precedes assignment history, access controls and evidence links.',
    counters: [
      ['Ordered gaps', '12', 'All A-01 to A-12 results are covered'],
      ['Validated waves', '4', 'Foundation, identity, access, then evidence'],
      ['Initial micro-package', 'A-02', 'RH-001 versioned lifecycle'],
      ['Master sources', '0', 'No promotion in this package']
    ],
    columns: { wave: 'Wave', gaps: 'Covered gaps', objective: 'Expected outcome', dependency: 'Dependency and order', state: 'Status' },
    labels: { gaps: 'Covered gaps', objective: 'Expected outcome', dependency: 'Dependency and order' },
    status: 'Order validated',
    waves: [
      {
        key: 'foundation', wave: '1 · Lifecycle foundation', gaps: 'A-02',
        objective: 'Define a functional versioned-event contract for Person, Membership, Team and Collective responsibility.',
        dependency: 'Starting point: all other histories and references must be able to cite a stable event.'
      },
      {
        key: 'identity', wave: '2 · Identity and provenance', gaps: 'A-01 · A-06 · A-07',
        objective: 'Evidence non-reuse, controlled correction and provenance of historical Team/Agent values.',
        dependency: 'Builds on the A-02 event contract; no value migration is included.'
      },
      {
        key: 'access', wave: '3 · Access and traceability', gaps: 'A-03 · A-05 · A-08 · A-11',
        objective: 'Frame least privilege, consultation or assignment logs and rights-review frequency.',
        dependency: 'Follows clear identification of the objects and events to be logged.'
      },
      {
        key: 'evidence', wave: '4 · Evidence and retention', gaps: 'A-04 · A-09 · A-10 · A-12',
        objective: 'Define DMS references, object–event–evidence links, integrity, periods and disposal.',
        dependency: 'Reuses stabilised identifiers and events; no HR document is opened here.'
      }
    ],
    lotEyebrow: 'PROPOSED INITIAL MICRO-PACKAGE · REF-01-ML-001',
    lotTitle: 'Specify the RH-001 event trace',
    lotIntro: 'The lifecycle framework is already validated by REF-01-DEC-002. This micro-package prepares its verifiable functional contract before any implementation decision.',
    lotSections: [
      ['Authorised inputs', 'The six event families, four objects, twelve metadata fields and six reason families already validated.'],
      ['Expected deliverables', 'Event catalogue, transition rules, responsibilities, evidence references and testable acceptance criteria.'],
      ['Exit controls', 'Each event has an identifier, effective date, resulting state, business authority and authorised evidence reference or reason for absence.'],
      ['Out of scope', 'Database schema, write endpoint, migration, real event, personal data, M3S access, automation and progress calculation.']
    ],
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-006', version: 'V1.0', status: 'Four-wave order validated', author: 'Cheikh Ndiaye', date: '26 Aug 2026',
      decision: 'The twelve REF-01 gaps are ordered under the four published waves. A-02 is retained as the first micro-package and documentary preparation of REF-01-ML-001 may begin, without implementation.',
      evidence: 'Explicit validation by Cheikh during the 26 Aug 2026 session; REF-01 V0.1 prioritisation published through frontend PR 191 at commit 470b1bc5.',
      limit: 'The decision qualifies no legal urgency, compliance or progress. It designates no master source, opens no access, exposes no personal data, changes no schema and authorises no migration or automation.'
    },
    arbitration: 'Recorded decision: the four-wave order is validated and documentary preparation of REF-01-ML-001 is authorised. Implementation still requires a separate decision.',
    boundary: 'Boundary: priority expresses dependency order, not legal urgency, compliance, a score or a progress rate.'
  },
  DE: {
    eyebrow: 'PRIORISIERUNG DER LÜCKEN · REF-01 · V1.0 · 26.08.2026',
    title: 'Abhängigkeiten vor Verbindungen behandeln',
    intro: 'Diese Version ordnet die zwölf bestätigten Lücken ohne Bewertung. Die validierte Reihenfolge folgt ihren Abhängigkeiten: Ein versionierter Lebenszyklus geht Zuweisungshistorie, Zugriffskontrollen und Nachweisverknüpfungen voraus.',
    counters: [
      ['Geordnete Lücken', '12', 'Alle Ergebnisse A-01 bis A-12 sind abgedeckt'],
      ['Validierte Wellen', '4', 'Grundlage, Identität, Zugriff, danach Nachweise'],
      ['Erstes Mikrolos', 'A-02', 'Versionierter RH-001-Lebenszyklus'],
      ['Masterquellen', '0', 'Keine Förderung in diesem Los']
    ],
    columns: { wave: 'Welle', gaps: 'Abgedeckte Lücken', objective: 'Erwartetes Ergebnis', dependency: 'Abhängigkeit und Reihenfolge', state: 'Stand' },
    labels: { gaps: 'Abgedeckte Lücken', objective: 'Erwartetes Ergebnis', dependency: 'Abhängigkeit und Reihenfolge' },
    status: 'Reihenfolge validiert',
    waves: [
      {
        key: 'foundation', wave: '1 · Lebenszyklus-Grundlage', gaps: 'A-02',
        objective: 'Funktionalen versionierten Ereignisvertrag für Person, Mitgliedschaft, Team und kollektive Verantwortung definieren.',
        dependency: 'Ausgangspunkt: Alle weiteren Historien und Referenzen müssen ein stabiles Ereignis zitieren können.'
      },
      {
        key: 'identity', wave: '2 · Identität und Herkunft', gaps: 'A-01 · A-06 · A-07',
        objective: 'Nichtwiederverwendung, kontrollierte Korrektur und Herkunft historischer Team-/Agent-Werte belegen.',
        dependency: 'Baut auf dem A-02-Ereignisvertrag auf; keine Wertmigration enthalten.'
      },
      {
        key: 'access', wave: '3 · Zugriff und Rückverfolgbarkeit', gaps: 'A-03 · A-05 · A-08 · A-11',
        objective: 'Geringste Berechtigung, Konsultations- oder Zuweisungsprotokolle und Häufigkeit der Rechteprüfung festlegen.',
        dependency: 'Folgt auf die klare Identifizierung der zu protokollierenden Objekte und Ereignisse.'
      },
      {
        key: 'evidence', wave: '4 · Nachweise und Aufbewahrung', gaps: 'A-04 · A-09 · A-10 · A-12',
        objective: 'DMS-Referenzen, Objekt–Ereignis–Nachweis-Beziehungen, Integrität, Fristen und endgültigen Verbleib definieren.',
        dependency: 'Verwendet stabilisierte Kennungen und Ereignisse; hier wird kein Personaldokument geöffnet.'
      }
    ],
    lotEyebrow: 'VORGESCHLAGENES ERSTES MIKROLOS · REF-01-ML-001',
    lotTitle: 'RH-001-Ereignisspur spezifizieren',
    lotIntro: 'Der Lebenszyklusrahmen ist bereits durch REF-01-DEC-002 validiert. Dieses Mikrolos bereitet vor jedem Umsetzungsentscheid seinen prüfbaren funktionalen Vertrag vor.',
    lotSections: [
      ['Autorisierte Eingaben', 'Die sechs Ereignisfamilien, vier Objekte, zwölf Metadatenfelder und sechs bereits validierten Grundfamilien.'],
      ['Erwartete Liefergegenstände', 'Ereigniskatalog, Übergangsregeln, Verantwortungen, Nachweisreferenzen und prüfbare Abnahmekriterien.'],
      ['Ausgangskontrollen', 'Jedes Ereignis besitzt Kennung, Wirksamkeitsdatum, resultierenden Stand, Fachautorität und autorisierte Nachweisreferenz oder Abwesenheitsgrund.'],
      ['Ausserhalb des Umfangs', 'Datenbankschema, Schreibendpoint, Migration, reales Ereignis, Personendaten, M3S-Zugriff, Automatisierung und Fortschrittsberechnung.']
    ],
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Dokumentierter Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-006', version: 'V1.0', status: 'Reihenfolge der vier Wellen validiert', author: 'Cheikh Ndiaye', date: '26.08.2026',
      decision: 'Die zwölf REF-01-Lücken werden nach den vier veröffentlichten Wellen geordnet. A-02 wird als erstes Mikrolos festgehalten und die dokumentarische Vorbereitung von REF-01-ML-001 darf ohne Umsetzung beginnen.',
      evidence: 'Ausdrückliche Validierung durch Cheikh in der Sitzung vom 26.08.2026; REF-01-Priorisierung V0.1 mit Frontend-PR Nr. 191 am Commit 470b1bc5 veröffentlicht.',
      limit: 'Der Entscheid qualifiziert weder rechtliche Dringlichkeit noch Konformität oder Fortschritt. Er bestimmt keine Masterquelle, öffnet keinen Zugriff, legt keine Personendaten offen, ändert kein Schema und autorisiert weder Migration noch Automatisierung.'
    },
    arbitration: 'Dokumentierter Entscheid: Die Reihenfolge der vier Wellen ist validiert und die dokumentarische Vorbereitung von REF-01-ML-001 autorisiert. Die Umsetzung benötigt weiterhin einen getrennten Entscheid.',
    boundary: 'Grenze: Priorität bezeichnet eine Abhängigkeitsreihenfolge, keine rechtliche Dringlichkeit, Konformität, Punktzahl oder Fortschrittsquote.'
  }
};

const WaveBadge = ({ row, label }) => (
  <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${WAVE_STYLES[row.key]}`}>
    {label}
  </span>
);

const PriorityCard = ({ row, t }) => (
  <article className="m3s-raised p-3" data-testid="ref01-priority-card">
    <div className="flex flex-wrap items-start justify-between gap-2">
      <h6 className="text-sm font-semibold text-slate-100">{row.wave}</h6>
      <WaveBadge row={row} label={t.status} />
    </div>
    <dl className="mt-3 space-y-3 border-t border-slate-700 pt-3">
      <div><dt className="text-xs font-semibold text-slate-400">{t.labels.gaps}</dt><dd className="mt-1 text-sm font-semibold text-cyan-300">{row.gaps}</dd></div>
      <div><dt className="text-xs font-semibold text-slate-400">{t.labels.objective}</dt><dd className="mt-1 text-sm leading-5 text-slate-300">{row.objective}</dd></div>
      <div><dt className="text-xs font-semibold text-amber-300">{t.labels.dependency}</dt><dd className="mt-1 text-sm leading-5 text-slate-300">{row.dependency}</dd></div>
    </dl>
  </article>
);

const InstitutionalPeopleTeamsGapPriorities = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const CounterIcons = [ClipboardList, Layers3, Route, ShieldCheck];

  return (
    <section id="institutional-ref01-gap-priorities" className="m3s-ref01-priorities mt-4 rounded-md border border-rose-800/70 bg-rose-950/10 p-4 scroll-mt-24" aria-labelledby="institutional-ref01-gap-priorities-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl">
          <p className="text-xs font-semibold uppercase text-rose-300">{t.eyebrow}</p>
          <h6 id="institutional-ref01-gap-priorities-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p>
        </div>
        <Route className="shrink-0 text-rose-300" size={24} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {t.counters.map(([label, value, note], index) => {
          const Icon = CounterIcons[index];
          return (
            <article key={label} className="m3s-raised min-h-28 p-3">
              <div className="flex items-start justify-between gap-3">
                <div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>
                <Icon className={index === 3 ? 'text-amber-300' : 'text-rose-300'} size={19} aria-hidden="true" />
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-400">{note}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-4 hidden overflow-x-auto rounded-md border border-slate-700 xl:block">
        <table className="w-full min-w-[1320px] border-collapse text-left text-sm">
          <thead className="m3s-cns03-inventory-head bg-slate-900/70 text-xs uppercase text-slate-300">
            <tr>
              <th className="px-3 py-3 font-semibold">{t.columns.wave}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.gaps}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.objective}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.dependency}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.state}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700 bg-slate-950/15">
            {t.waves.map(row => (
              <tr key={row.key} className="align-top" data-testid="ref01-priority-row">
                <th scope="row" className="px-3 py-3 font-semibold text-slate-100">{row.wave}</th>
                <td className="px-3 py-3 font-semibold text-cyan-300">{row.gaps}</td>
                <td className="px-3 py-3 leading-5 text-slate-300">{row.objective}</td>
                <td className="px-3 py-3 leading-5 text-amber-100">{row.dependency}</td>
                <td className="px-3 py-3"><WaveBadge row={row} label={t.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:hidden">
        {t.waves.map(row => <PriorityCard key={row.key} row={row} t={t} />)}
      </div>

      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />

      <section className="mt-4 rounded-md border border-cyan-800/70 bg-cyan-950/10 p-4" aria-labelledby="ref01-first-micro-lot-title">
        <p className="text-xs font-semibold uppercase text-cyan-300">{t.lotEyebrow}</p>
        <h6 id="ref01-first-micro-lot-title" className="mt-1 text-base font-semibold text-slate-100">{t.lotTitle}</h6>
        <p className="mt-2 text-sm leading-6 text-slate-300">{t.lotIntro}</p>
        <dl className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          {t.lotSections.map(([label, detail]) => (
            <div key={label} className="m3s-raised p-3">
              <dt className="text-xs font-semibold text-cyan-300">{label}</dt>
              <dd className="mt-2 text-sm leading-5 text-slate-300">{detail}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 flex items-start gap-2 border-t border-slate-700 pt-4 text-xs font-semibold leading-5 text-sky-200"><ArrowRight className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.arbitration}</p>
      </section>

      <p className="mt-4 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGapPriorities;
