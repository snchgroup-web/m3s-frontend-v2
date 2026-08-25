import React from 'react';
import {
  AlertTriangle,
  ClipboardList,
  FileSearch,
  PauseCircle,
  ShieldAlert
} from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'ARBITRAGE CONSIGNE · REF-01 · V0.9 · 25-08-2026',
    title: 'Ouvrir un premier lot de preuves sans promouvoir de source',
    intro: 'Cette décision autorise la recherche contrôlée des preuves qui conditionnent l’identifiant, le cycle, les accès et la liaison aux justificatifs. Elle ne qualifie aucun support et ne valide aucune donnée personnelle.',
    counters: [
      ['Constats disponibles', '28', 'Matrice REF-01 V0.7'],
      ['Preuves autorisées maintenant', '12', 'Lot A, sans score'],
      ['Constats différés', '16', 'Deuxième lecture après collecte'],
      ['Décisions enregistrées', '1', 'REF-01-DEC-004']
    ],
    lotTitle: 'Lot candidat A · Preuves structurantes',
    lotIntro: 'Ces douze demandes sont proposées en premier parce qu’elles conditionnent l’identification stable, l’historique, le moindre privilège et la relation entre objet et preuve.',
    columns: { support: 'Support', control: 'Contrôle concerné', expected: 'Preuve à rechercher', owner: 'Responsable proposé' },
    supports: {
      api: 'API RH-001', directory: 'Annuaire sécurisé', selectors: 'Sélecteurs Team/Agent', dms: 'GED · preuves RH'
    },
    rows: [
      ['api', 'Identifiant stable', 'Règle versionnée d’unicité, de non-réutilisation et de correction de person_id.', 'Organisation & RH + IT'],
      ['api', 'Cycle versionné', 'Extrait ou journal prouvant entrée, transfert, suspension et clôture sans réécriture.', 'Organisation & RH + IT'],
      ['api', 'Accès et sensibilité', 'Matrice de droits C2, règle du moindre privilège, journaux et fréquence de revue.', 'Organisation & RH + IT'],
      ['api', 'Preuve et conservation', 'Spécification des références GED, relations événement-preuve et durées applicables.', 'Organisation & RH + GED'],
      ['directory', 'Accès et sensibilité', 'Rôles autorisés, traces d’accès et preuve de revue de l’annuaire en lecture seule.', 'Organisation & RH + IT'],
      ['selectors', 'Identifiant stable', 'Contrat de la valeur réellement enregistrée et analyse du passage du libellé vers person_id.', 'Organisation & RH + IT'],
      ['selectors', 'Cycle versionné', 'Règle de conservation de la provenance des anciennes affectations et changements d’équipe.', 'Organisation & RH + fonctions consommatrices'],
      ['selectors', 'Accès et sensibilité', 'Droits et journaux des formulaires qui enregistrent une affectation individuelle ou collective.', 'Fonctions consommatrices + IT'],
      ['selectors', 'Preuve et conservation', 'Lien attendu entre affectation, événement REF-01 et référence de preuve autorisée.', 'Organisation & RH + GED'],
      ['dms', 'Identifiant stable', 'Modèle de liaison stable entre pièce, objet REF-01 et événement, sans exposer la pièce.', 'GED + Organisation & RH'],
      ['dms', 'Accès et sensibilité', 'Classification, matrice de droits, journalisation et revue des accès aux preuves RH.', 'Organisation & RH + GED + IT'],
      ['dms', 'Preuve et conservation', 'Durées, sort final, contrôle d’intégrité et référence obligatoire par type de preuve.', 'GED + Organisation & RH']
    ],
    deferredTitle: 'Seize constats maintenus pour une deuxième lecture',
    deferred: [
      ['API RH-001', 'Périmètre, propriété et validation, qualité et propagation'],
      ['Annuaire sécurisé', 'Identifiant, périmètre, cycle, propriété, preuve, qualité et propagation'],
      ['Sélecteurs Team/Agent', 'Périmètre, propriété et validation, qualité et propagation'],
      ['GED · preuves RH', 'Périmètre, cycle, propriété et validation, qualité et propagation']
    ],
    decisionsTitle: 'Résultat de l’arbitrage humain',
    decisions: [
      ['Lot candidat A validé', 'La recherche contrôlée des douze preuves listées est autorisée.'],
      ['Portée autorisée', 'Collecter, référencer et rapprocher les preuves sans exposer leur contenu sensible.'],
      ['Réserves maintenues', 'Aucun support n’est qualifié ou promu ; les seize autres constats restent différés.']
    ],
    recordLabels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-004', version: 'V1.0', status: 'Lot de preuves validé', author: 'Cheikh Ndiaye', date: '25-08-2026',
      decision: 'Le lot candidat A est validé. La recherche contrôlée des douze preuves structurantes listées est autorisée ; les seize autres constats sont maintenus pour une deuxième lecture.',
      evidence: 'Validation explicite de Cheikh dans la session du 25-08-2026, après présentation du périmètre et de ses réserves par Codex.',
      limit: 'Cette décision ne désigne aucune source maîtresse, ne valide aucune identité civile, donnée personnelle, qualité ou complétude, n’ouvre aucun accès sensible, ne modifie aucun schéma et ne calcule aucune progression.'
    },
    status: 'Statut : lot A validé. Décisions enregistrées : 1 ; recherches autorisées : 12 ; sources maîtresses : 0 ; progression calculée : aucune.',
    next: 'Prochain contrôle : rechercher et référencer les douze preuves autorisées, puis présenter les résultats et écarts à Cheikh avant toute qualification d’un support.'
  },
  EN: {
    eyebrow: 'RECORDED ARBITRATION · REF-01 · V0.9 · 25 AUG 2026',
    title: 'Open an initial evidence package without promoting a source',
    intro: 'This decision authorises controlled evidence search for identifier, lifecycle, access and supporting-record links. It qualifies no support and validates no personal data.',
    counters: [['Available findings', '28', 'REF-01 V0.7 matrix'], ['Evidence authorised now', '12', 'Package A, no scoring'], ['Deferred findings', '16', 'Second review after collection'], ['Recorded decisions', '1', 'REF-01-DEC-004']],
    lotTitle: 'Candidate package A · Foundational evidence',
    lotIntro: 'These twelve requests are proposed first because they condition stable identification, history, least privilege and the relationship between objects and evidence.',
    columns: { support: 'Support', control: 'Related control', expected: 'Evidence to seek', owner: 'Proposed owner' },
    supports: { api: 'RH-001 API', directory: 'Secure directory', selectors: 'Team/Agent selectors', dms: 'DMS · HR evidence' },
    rows: [
      ['api', 'Stable identifier', 'Versioned rule for uniqueness, non-reuse and correction of person_id.', 'Organisation & HR + IT'],
      ['api', 'Versioned lifecycle', 'Extract or log evidencing entry, transfer, suspension and closure without rewriting.', 'Organisation & HR + IT'],
      ['api', 'Access and sensitivity', 'C2 rights matrix, least-privilege rule, logs and review frequency.', 'Organisation & HR + IT'],
      ['api', 'Evidence and retention', 'Specification for DMS references, event-evidence links and applicable periods.', 'Organisation & HR + DMS'],
      ['directory', 'Access and sensitivity', 'Authorised roles, access traces and evidence of read-only directory review.', 'Organisation & HR + IT'],
      ['selectors', 'Stable identifier', 'Contract for the actually stored value and analysis of moving from label to person_id.', 'Organisation & HR + IT'],
      ['selectors', 'Versioned lifecycle', 'Rule retaining provenance of former assignments and team changes.', 'Organisation & HR + consuming functions'],
      ['selectors', 'Access and sensitivity', 'Rights and logs for forms recording individual or collective assignment.', 'Consuming functions + IT'],
      ['selectors', 'Evidence and retention', 'Expected link between assignment, REF-01 event and authorised evidence reference.', 'Organisation & HR + DMS'],
      ['dms', 'Stable identifier', 'Stable link model between document, REF-01 object and event without exposing the document.', 'DMS + Organisation & HR'],
      ['dms', 'Access and sensitivity', 'Classification, rights matrix, logging and access review for HR evidence.', 'Organisation & HR + DMS + IT'],
      ['dms', 'Evidence and retention', 'Periods, disposal, integrity control and mandatory reference by evidence type.', 'DMS + Organisation & HR']
    ],
    deferredTitle: 'Sixteen findings retained for a second review',
    deferred: [
      ['RH-001 API', 'Scope, ownership and validation, quality and propagation'],
      ['Secure directory', 'Identifier, scope, lifecycle, ownership, evidence, quality and propagation'],
      ['Team/Agent selectors', 'Scope, ownership and validation, quality and propagation'],
      ['DMS · HR evidence', 'Scope, lifecycle, ownership and validation, quality and propagation']
    ],
    decisionsTitle: 'Human arbitration outcome',
    decisions: [
      ['Candidate package A validated', 'Controlled search for the twelve listed evidence items is authorised.'],
      ['Authorised scope', 'Collect, reference and reconcile evidence without exposing sensitive content.'],
      ['Restrictions retained', 'No support is qualified or promoted; the other sixteen findings remain deferred.']
    ],
    recordLabels: { eyebrow: 'Governed decision register', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-004', version: 'V1.0', status: 'Evidence package validated', author: 'Cheikh Ndiaye', date: '25-08-2026',
      decision: 'Candidate package A is validated. Controlled search for the twelve listed foundational evidence items is authorised; the other sixteen findings remain scheduled for a second review.',
      evidence: 'Explicit validation by Cheikh in the session dated 25 Aug 2026, after Codex presented the scope and reservations.',
      limit: 'This decision designates no master source, validates no civil identity, personal data, quality or completeness, opens no sensitive access, changes no schema and calculates no progress.'
    },
    status: 'Status: package A validated. Recorded decisions: 1; authorised searches: 12; master sources: 0; calculated progress: none.',
    next: 'Next control: seek and reference the twelve authorised evidence items, then present results and gaps to Cheikh before qualifying any support.'
  },
  DE: {
    eyebrow: 'ERFASSTER ENTSCHEID · REF-01 · V0.9 · 25.08.2026',
    title: 'Ein erstes Nachweispaket öffnen, ohne eine Quelle zu fördern',
    intro: 'Dieser Entscheid erlaubt die kontrollierte Nachweissuche zu Kennung, Lebenszyklus, Zugriff und Belegverknüpfung. Er qualifiziert keinen Träger und validiert keine Personendaten.',
    counters: [['Verfügbare Feststellungen', '28', 'REF-01-Matrix V0.7'], ['Jetzt autorisierte Nachweise', '12', 'Paket A ohne Punktzahl'], ['Zurückgestellte Feststellungen', '16', 'Zweite Prüfung nach Sammlung'], ['Erfasste Entscheide', '1', 'REF-01-DEC-004']],
    lotTitle: 'Kandidatenpaket A · Strukturierende Nachweise',
    lotIntro: 'Diese zwölf Anfragen werden zuerst vorgeschlagen, da sie stabile Identifikation, Historie, geringste Berechtigung und die Beziehung zwischen Objekt und Nachweis bedingen.',
    columns: { support: 'Träger', control: 'Betroffene Kontrolle', expected: 'Zu suchender Nachweis', owner: 'Vorgeschlagene Verantwortung' },
    supports: { api: 'RH-001-API', directory: 'Sicheres Verzeichnis', selectors: 'Team-/Agent-Auswahl', dms: 'DMS · Personalnachweise' },
    rows: [
      ['api', 'Stabile Kennung', 'Versionierte Regel für Eindeutigkeit, Nichtwiederverwendung und Korrektur von person_id.', 'Organisation & Personal + IT'],
      ['api', 'Versionierter Lebenszyklus', 'Auszug oder Protokoll für Eintritt, Wechsel, Suspendierung und Abschluss ohne Umschreibung.', 'Organisation & Personal + IT'],
      ['api', 'Zugriff und Sensibilität', 'C2-Rechtematrix, geringste Berechtigung, Protokolle und Prüfungsrhythmus.', 'Organisation & Personal + IT'],
      ['api', 'Nachweis und Aufbewahrung', 'Spezifikation für DMS-Referenzen, Ereignis-Nachweis-Beziehungen und geltende Fristen.', 'Organisation & Personal + DMS'],
      ['directory', 'Zugriff und Sensibilität', 'Autorisierte Rollen, Zugriffsspuren und Nachweis der Prüfung des schreibgeschützten Verzeichnisses.', 'Organisation & Personal + IT'],
      ['selectors', 'Stabile Kennung', 'Vertrag des tatsächlich gespeicherten Werts und Analyse des Wechsels von Bezeichnung zu person_id.', 'Organisation & Personal + IT'],
      ['selectors', 'Versionierter Lebenszyklus', 'Regel zur Herkunft früherer Zuweisungen und Teamwechsel.', 'Organisation & Personal + verbrauchende Funktionen'],
      ['selectors', 'Zugriff und Sensibilität', 'Rechte und Protokolle der Formulare für individuelle oder kollektive Zuweisungen.', 'Verbrauchende Funktionen + IT'],
      ['selectors', 'Nachweis und Aufbewahrung', 'Erwartete Verbindung zwischen Zuweisung, REF-01-Ereignis und autorisierter Nachweisreferenz.', 'Organisation & Personal + DMS'],
      ['dms', 'Stabile Kennung', 'Stabiles Verbindungsmodell zwischen Unterlage, REF-01-Objekt und Ereignis ohne Offenlegung.', 'DMS + Organisation & Personal'],
      ['dms', 'Zugriff und Sensibilität', 'Klassifizierung, Rechtematrix, Protokollierung und Zugriffsprüfung für Personalnachweise.', 'Organisation & Personal + DMS + IT'],
      ['dms', 'Nachweis und Aufbewahrung', 'Fristen, Aussonderung, Integritätskontrolle und Pflichtreferenz je Nachweistyp.', 'DMS + Organisation & Personal']
    ],
    deferredTitle: 'Sechzehn Feststellungen für eine zweite Prüfung beibehalten',
    deferred: [
      ['RH-001-API', 'Umfang, Verantwortung und Validierung, Qualität und Weitergabe'],
      ['Sicheres Verzeichnis', 'Kennung, Umfang, Lebenszyklus, Verantwortung, Nachweis, Qualität und Weitergabe'],
      ['Team-/Agent-Auswahl', 'Umfang, Verantwortung und Validierung, Qualität und Weitergabe'],
      ['DMS · Personalnachweise', 'Umfang, Lebenszyklus, Verantwortung und Validierung, Qualität und Weitergabe']
    ],
    decisionsTitle: 'Ergebnis des menschlichen Entscheids',
    decisions: [
      ['Kandidatenpaket A validiert', 'Die kontrollierte Suche nach den zwölf aufgeführten Nachweisen ist autorisiert.'],
      ['Autorisierter Umfang', 'Nachweise sammeln, referenzieren und abgleichen, ohne sensible Inhalte offenzulegen.'],
      ['Vorbehalte beibehalten', 'Kein Träger wird qualifiziert oder gefördert; die übrigen sechzehn Feststellungen bleiben zurückgestellt.']
    ],
    recordLabels: { eyebrow: 'Governed-Entscheidregister', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Rückverfolgbarkeitsnachweis', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-004', version: 'V1.0', status: 'Nachweispaket validiert', author: 'Cheikh Ndiaye', date: '25.08.2026',
      decision: 'Kandidatenpaket A ist validiert. Die kontrollierte Suche nach den zwölf aufgeführten strukturierenden Nachweisen ist autorisiert; die übrigen sechzehn Feststellungen bleiben für eine zweite Prüfung erhalten.',
      evidence: 'Ausdrückliche Validierung durch Cheikh in der Sitzung vom 25.08.2026, nachdem Codex Umfang und Vorbehalte vorgestellt hatte.',
      limit: 'Dieser Entscheid bestimmt keine Masterquelle, validiert weder Zivilidentität, Personendaten, Qualität noch Vollständigkeit, öffnet keinen sensiblen Zugriff, ändert kein Schema und berechnet keinen Fortschritt.'
    },
    status: 'Stand: Paket A validiert. Erfasste Entscheide: 1; autorisierte Suchen: 12; Masterquellen: 0; berechneter Fortschritt: keiner.',
    next: 'Nächste Kontrolle: die zwölf autorisierten Nachweise suchen und referenzieren, danach Ergebnisse und Lücken Cheikh vor jeder Qualifizierung eines Trägers vorlegen.'
  }
};

const InstitutionalPeopleTeamsEvidenceReview = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const CounterIcons = [ClipboardList, FileSearch, PauseCircle, ShieldAlert];

  return (
    <section id="institutional-ref01-evidence-review" className="m3s-ref01-evidence-review mt-4 rounded-md border border-amber-800/70 bg-amber-950/10 p-4 scroll-mt-24" aria-labelledby="institutional-ref01-evidence-review-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl">
          <p className="text-xs font-semibold uppercase text-amber-300">{t.eyebrow}</p>
          <h6 id="institutional-ref01-evidence-review-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p>
        </div>
        <ShieldAlert className="shrink-0 text-amber-300" size={24} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {t.counters.map(([label, value, note], index) => {
          const Icon = CounterIcons[index];
          return (
            <article key={label} className="m3s-raised min-h-28 p-3">
              <div className="flex items-start justify-between gap-3">
                <div><p className="text-xs font-semibold leading-5 text-slate-300">{label}</p><p className="mt-1 text-2xl font-semibold text-slate-100">{value}</p></div>
                <Icon className={index === 3 ? 'text-rose-300' : 'text-amber-300'} size={18} aria-hidden="true" />
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-400">{note}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/15 p-3">
        <h6 className="text-sm font-semibold text-slate-100">{t.lotTitle}</h6>
        <p className="mt-2 text-xs leading-5 text-slate-400">{t.lotIntro}</p>

        <div className="mt-4 hidden overflow-x-auto rounded-md border border-slate-700 xl:block">
          <table className="w-full min-w-[1180px] border-collapse text-left text-sm">
            <thead className="m3s-cns03-inventory-head bg-slate-900/70 text-xs uppercase text-slate-300">
              <tr>
                <th className="px-3 py-3 font-semibold">{t.columns.support}</th>
                <th className="px-3 py-3 font-semibold">{t.columns.control}</th>
                <th className="px-3 py-3 font-semibold">{t.columns.expected}</th>
                <th className="px-3 py-3 font-semibold">{t.columns.owner}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {t.rows.map(([support, control, expected, owner]) => (
                <tr key={`${support}-${control}`} className="align-top" data-testid="ref01-review-row">
                  <th scope="row" className="px-3 py-3 font-semibold text-amber-200">{t.supports[support]}</th>
                  <td className="px-3 py-3 font-semibold text-slate-100">{control}</td>
                  <td className="px-3 py-3 leading-5 text-slate-300">{expected}</td>
                  <td className="px-3 py-3 leading-5 text-slate-300">{owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 space-y-3 xl:hidden">
          {t.rows.map(([support, control, expected, owner], index) => (
            <article key={`${support}-${control}`} className="rounded-md border border-slate-700 p-3">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-amber-900/60 text-xs font-semibold text-amber-100">{index + 1}</span>
                <div><p className="text-xs font-semibold text-amber-200">{t.supports[support]}</p><h6 className="mt-1 text-sm font-semibold text-slate-100">{control}</h6></div>
              </div>
              <p className="mt-3 text-sm leading-5 text-slate-300">{expected}</p>
              <p className="mt-3 border-t border-slate-700 pt-3 text-xs font-semibold leading-5 text-slate-400">{owner}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-md border border-slate-700 p-3" aria-labelledby="ref01-deferred-evidence-title">
          <h6 id="ref01-deferred-evidence-title" className="text-sm font-semibold text-slate-100">{t.deferredTitle}</h6>
          <dl className="mt-3 space-y-3">
            {t.deferred.map(([support, controls]) => (
              <div key={support} className="grid grid-cols-1 gap-1 border-t border-slate-700 pt-3 first:border-t-0 first:pt-0 sm:grid-cols-[10rem_1fr] sm:gap-3">
                <dt className="text-xs font-semibold text-sky-200">{support}</dt>
                <dd className="text-xs leading-5 text-slate-300">{controls}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-md border border-slate-700 p-3" aria-labelledby="ref01-human-arbitration-title">
          <h6 id="ref01-human-arbitration-title" className="text-sm font-semibold text-slate-100">{t.decisionsTitle}</h6>
          <ol className="mt-3 space-y-3">
            {t.decisions.map(([label, detail], index) => (
              <li key={label} className="flex items-start gap-3">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-600 text-xs font-semibold text-slate-300">{index + 1}</span>
                <div><p className="text-sm font-semibold text-slate-100">{label}</p><p className="mt-1 text-xs leading-5 text-slate-400">{detail}</p></div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />

      <p className="mt-4 flex items-start gap-2 border-t border-slate-700 pt-4 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.status}</p>
      <p className="mt-3 rounded-md border border-sky-800/70 bg-sky-950/15 p-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsEvidenceReview;
