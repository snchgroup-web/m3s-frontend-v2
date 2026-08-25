import React from 'react';
import { AlertTriangle, CheckCircle2, CircleDashed, SearchCheck } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const STATUS_STYLES = {
  observed: 'border-emerald-700/70 bg-emerald-950/25 text-emerald-200',
  partial: 'border-amber-700/70 bg-amber-950/25 text-amber-200',
  missing: 'border-slate-600 bg-slate-900/40 text-slate-300'
};

const COPY = {
  FR: {
    eyebrow: 'RESULTATS DE RECHERCHE AUTORISEE · REF-01 · V1.1 · 25-08-2026',
    title: 'Distinguer les preuves observées, partielles et non observées',
    intro: 'Ce registre restitue la recherche autorisée par REF-01-DEC-004. Il décrit uniquement ce qui est vérifiable dans les contrats, le code et les contrôles existants, sans ouvrir les pièces RH ni conclure à la conformité.',
    counters: [['Demandes contrôlées', '12', 'Lot A validé'], ['Preuve observée', '1', 'Comportement et écart établis'], ['Preuves partielles', '5', 'Un ou plusieurs éléments manquent'], ['Non observées', '6', 'Preuve applicable absente du périmètre contrôlé']],
    columns: { id: 'Réf.', support: 'Support et contrôle', result: 'Résultat vérifiable', source: 'Source contrôlée', gap: 'Écart restant', status: 'État' },
    statuses: { observed: 'Observée', partial: 'Partielle', missing: 'Non observée' },
    rows: [
      ['A-01', 'API RH-001 · Identifiant stable', 'Le backend impose le format PER-2SG-0000 et refuse les doublons dans l’édition chargée.', 'rh001Directory.js ; contrat RH-001', 'La non-réutilisation dans le temps et le circuit de correction ne sont pas implémentés.', 'partial'],
      ['A-02', 'API RH-001 · Cycle versionné', 'Aucun journal d’événements Personne, Appartenance, Équipe ou Responsabilité collective n’est observé.', 'Contrat RH-001 ; backend main', 'Créer une trace versionnée des entrées, transferts, suspensions et clôtures sans réécriture.', 'missing'],
      ['A-03', 'API RH-001 · Accès et sensibilité', 'Classification C2, activation contrôlée, rôles autorisés et réponses 401/403 sont implémentés et testés.', '.env.example ; rh001Directory.js ; tests RH-001', 'Les traces de consultation et la fréquence de revue des droits ne sont pas établies.', 'partial'],
      ['A-04', 'API RH-001 · Preuve et conservation', 'La vue interdit les références de preuve sensibles et ne porte aucun lien événement-preuve.', 'rh001Directory.js ; contrat RH-001', 'Définir les références GED autorisées, les relations et les durées applicables hors de la vue C2.', 'missing'],
      ['A-05', 'Annuaire sécurisé · Accès et sensibilité', 'La vue consomme uniquement RH-001, reste en lecture seule et ne retombe pas sur un annuaire fictif.', 'MembersDirectory.js ; api.js ; tests Annuaire', 'La preuve de revue de l’annuaire et les traces nominatives de consultation ne sont pas observées.', 'partial'],
      ['A-06', 'Sélecteurs Team/Agent · Identifiant stable', 'La valeur enregistrée reste le prénom unique ou le nom affiché ; person_id n’est conservé que comme métadonnée et alias.', 'teamDirectory.js ; Finance.js ; Production.js', 'Faire évoluer le contrat de stockage vers person_id sans réécrire les valeurs historiques.', 'observed'],
      ['A-07', 'Sélecteurs Team/Agent · Cycle versionné', 'Les anciennes valeurs restent proposées comme historiques et une valeur inconnue n’est pas corrigée silencieusement.', 'Finance.js ; teamAgentContract.js', 'La provenance, les dates et la succession des anciennes affectations ne sont pas conservées.', 'partial'],
      ['A-08', 'Sélecteurs Team/Agent · Accès et sensibilité', 'Les écritures Finance exigent un droit d’écriture et les couples Team-Agent incohérents sont refusés.', 'server.js ; teamAgentContract.js ; tests Finance', 'Aucun journal dédié aux affectations individuelles ou collectives n’est observé.', 'partial'],
      ['A-09', 'Sélecteurs Team/Agent · Preuve et conservation', 'Aucun lien entre affectation, événement REF-01 et référence de preuve autorisée n’est observé.', 'teamDirectory.js ; schémas Finance observés', 'Définir le contrat de référence avant toute automatisation ou migration.', 'missing'],
      ['A-10', 'GED · Identifiant stable', 'Un modèle documentaire candidat existe, mais aucune liaison active pièce–objet REF-01–événement n’est observée.', 'Contrat RH-001 ; GED pilote', 'Valider puis implémenter un identifiant documentaire gouverné et une relation versionnée.', 'missing'],
      ['A-11', 'GED · Accès et sensibilité', 'Le pilote GED annonce que les droits détaillés relèvent d’un cadrage ultérieur ; aucun contrôle spécifique aux preuves RH n’est observé.', 'GED.js ; cadrage documentaire', 'Définir classification, droits, journalisation et revue d’accès applicables aux preuves RH.', 'missing'],
      ['A-12', 'GED · Preuve et conservation', 'Le pilote GED qualifie ses durées d’indicatives et ne porte aucune politique officielle de conservation.', 'GED.js · vue Archives', 'Valider durées, sort final, intégrité et référence obligatoire par type de preuve.', 'missing']
    ],
    readingTitle: 'Lecture gouvernée du résultat',
    reading: ['Une preuve observée peut établir un comportement ou un écart sans rendre le support conforme.', 'Une preuve partielle doit être complétée avant toute qualification.', 'Non observée signifie absente du périmètre contrôlé, et non inexistante dans toute l’organisation.', 'Les contenus RH, identités civiles et pièces restent dans leurs espaces autorisés.'],
    recordLabels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-005', version: 'V1.0', status: 'Qualifications descriptives confirmées', author: 'Cheikh Ndiaye', date: '25-08-2026',
      decision: 'Les douze qualifications descriptives REF-01 sont confirmées : une preuve observée, cinq preuves partielles et six preuves non observées dans le périmètre contrôlé. Elles deviennent la lecture gouvernée courante pour prioriser les écarts.',
      evidence: 'Validation explicite de Cheikh dans la session du 25-08-2026 ; registre REF-01 V1.0 publié par la PR frontend nº 189 au commit 350d77fa ; sources et contrôles référencés dans les douze résultats.',
      limit: 'Cette confirmation ne déclare aucune conformité, qualité globale ou complétude. Elle ne désigne aucune source maîtresse, n’ouvre aucun accès, n’expose aucune donnée personnelle, ne modifie aucun schéma, ne déclenche aucune automatisation ou migration et ne calcule aucune progression.'
    },
    status: 'Position confirmée : 12 demandes contrôlées ; 1 preuve observée ; 5 partielles ; 6 non observées ; 0 source maîtresse ; aucune progression calculée.',
    next: 'Prochain contrôle : prioriser les écarts à traiter et préparer un premier micro-lot sans promouvoir de source ni modifier de schéma.'
  },
  EN: {
    eyebrow: 'AUTHORISED SEARCH RESULTS · REF-01 · V1.1 · 25 AUG 2026',
    title: 'Separate observed, partial and unobserved evidence',
    intro: 'This register reports the search authorised by REF-01-DEC-004. It describes only what can be verified in existing contracts, code and controls, without opening HR records or concluding on compliance.',
    counters: [['Requests reviewed', '12', 'Validated package A'], ['Observed evidence', '1', 'Behaviour and gap established'], ['Partial evidence', '5', 'One or more elements are missing'], ['Unobserved', '6', 'Applicable evidence absent from the controlled scope']],
    columns: { id: 'Ref.', support: 'Support and control', result: 'Verifiable result', source: 'Controlled source', gap: 'Remaining gap', status: 'State' },
    statuses: { observed: 'Observed', partial: 'Partial', missing: 'Unobserved' },
    rows: [
      ['A-01', 'RH-001 API · Stable identifier', 'The backend enforces the PER-2SG-0000 format and rejects duplicates in the loaded edition.', 'rh001Directory.js; RH-001 contract', 'Non-reuse over time and the correction workflow are not implemented.', 'partial'],
      ['A-02', 'RH-001 API · Versioned lifecycle', 'No event log for Person, Membership, Team or Collective responsibility is observed.', 'RH-001 contract; backend main', 'Create a versioned trace of entry, transfer, suspension and closure without rewriting.', 'missing'],
      ['A-03', 'RH-001 API · Access and sensitivity', 'C2 classification, controlled enablement, allowed roles and 401/403 responses are implemented and tested.', '.env.example; rh001Directory.js; RH-001 tests', 'Consultation traces and the rights-review frequency are not established.', 'partial'],
      ['A-04', 'RH-001 API · Evidence and retention', 'The view forbids sensitive evidence references and carries no event-evidence link.', 'rh001Directory.js; RH-001 contract', 'Define authorised DMS references, relationships and applicable periods outside the C2 view.', 'missing'],
      ['A-05', 'Secure directory · Access and sensitivity', 'The view consumes only RH-001, remains read-only and never falls back to a fictitious directory.', 'MembersDirectory.js; api.js; Directory tests', 'Directory review evidence and named consultation traces are not observed.', 'partial'],
      ['A-06', 'Team/Agent selectors · Stable identifier', 'The stored value remains the unique preferred name or display name; person_id is retained only as metadata and alias.', 'teamDirectory.js; Finance.js; Production.js', 'Move the storage contract to person_id without rewriting historical values.', 'observed'],
      ['A-07', 'Team/Agent selectors · Versioned lifecycle', 'Former values remain offered as historical and an unknown value is not silently corrected.', 'Finance.js; teamAgentContract.js', 'Provenance, dates and succession of former assignments are not retained.', 'partial'],
      ['A-08', 'Team/Agent selectors · Access and sensitivity', 'Finance entries require write permission and inconsistent Team-Agent pairs are rejected.', 'server.js; teamAgentContract.js; Finance tests', 'No dedicated log for individual or collective assignments is observed.', 'partial'],
      ['A-09', 'Team/Agent selectors · Evidence and retention', 'No link between assignment, REF-01 event and authorised evidence reference is observed.', 'teamDirectory.js; observed Finance schemas', 'Define the reference contract before any automation or migration.', 'missing'],
      ['A-10', 'DMS · Stable identifier', 'A candidate documentary model exists, but no active document–REF-01 object–event link is observed.', 'RH-001 contract; DMS pilot', 'Validate and implement a governed document identifier and versioned relationship.', 'missing'],
      ['A-11', 'DMS · Access and sensitivity', 'The DMS pilot states that detailed rights require later framing; no HR-evidence-specific control is observed.', 'GED.js; documentary framing', 'Define classification, rights, logging and access review for HR evidence.', 'missing'],
      ['A-12', 'DMS · Evidence and retention', 'The DMS pilot labels its periods indicative and carries no official retention policy.', 'GED.js · Archives view', 'Validate periods, disposal, integrity and mandatory reference by evidence type.', 'missing']
    ],
    readingTitle: 'Governed reading of the result',
    reading: ['Observed evidence may establish behaviour or a gap without making a support compliant.', 'Partial evidence must be completed before any qualification.', 'Unobserved means absent from the controlled scope, not nonexistent across the organisation.', 'HR content, civil identities and records remain in authorised spaces.'],
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-005', version: 'V1.0', status: 'Descriptive qualifications confirmed', author: 'Cheikh Ndiaye', date: '25 Aug 2026',
      decision: 'The twelve REF-01 descriptive qualifications are confirmed: one observed, five partial and six unobserved evidence items within the controlled scope. They become the current governed reading for prioritising gaps.',
      evidence: 'Explicit validation by Cheikh during the 25 Aug 2026 session; REF-01 V1.0 register published through frontend PR 189 at commit 350d77fa; sources and controls referenced in the twelve results.',
      limit: 'This confirmation declares no compliance, overall quality or completeness. It designates no master source, opens no access, exposes no personal data, changes no schema, triggers no automation or migration and calculates no progress.'
    },
    status: 'Confirmed position: 12 requests reviewed; 1 observed; 5 partial; 6 unobserved; 0 master sources; no calculated progress.',
    next: 'Next control: prioritise the gaps and prepare an initial micro-package without promoting a source or changing a schema.'
  },
  DE: {
    eyebrow: 'ERGEBNISSE DER AUTORISIERTEN SUCHE · REF-01 · V1.1 · 25.08.2026',
    title: 'Beobachtete, teilweise und nicht beobachtete Nachweise trennen',
    intro: 'Dieses Register gibt die mit REF-01-DEC-004 autorisierte Suche wieder. Es beschreibt nur, was in bestehenden Verträgen, Code und Kontrollen prüfbar ist, ohne Personalunterlagen zu öffnen oder Konformität festzustellen.',
    counters: [['Geprüfte Anfragen', '12', 'Validiertes Paket A'], ['Beobachteter Nachweis', '1', 'Verhalten und Lücke festgestellt'], ['Teilnachweise', '5', 'Ein oder mehrere Elemente fehlen'], ['Nicht beobachtet', '6', 'Anwendbarer Nachweis im kontrollierten Umfang nicht vorhanden']],
    columns: { id: 'Ref.', support: 'Träger und Kontrolle', result: 'Prüfbares Ergebnis', source: 'Kontrollierte Quelle', gap: 'Verbleibende Lücke', status: 'Stand' },
    statuses: { observed: 'Beobachtet', partial: 'Teilweise', missing: 'Nicht beobachtet' },
    rows: [
      ['A-01', 'RH-001-API · Stabile Kennung', 'Das Backend erzwingt das Format PER-2SG-0000 und lehnt Duplikate in der geladenen Ausgabe ab.', 'rh001Directory.js; RH-001-Vertrag', 'Nichtwiederverwendung über die Zeit und Korrekturablauf sind nicht implementiert.', 'partial'],
      ['A-02', 'RH-001-API · Versionierter Lebenszyklus', 'Kein Ereignisprotokoll für Person, Mitgliedschaft, Team oder kollektive Verantwortung ist beobachtet.', 'RH-001-Vertrag; Backend main', 'Versionierte Spur für Eintritt, Wechsel, Suspendierung und Abschluss ohne Umschreibung erstellen.', 'missing'],
      ['A-03', 'RH-001-API · Zugriff und Sensibilität', 'C2-Klassifizierung, kontrollierte Aktivierung, erlaubte Rollen und 401/403-Antworten sind implementiert und getestet.', '.env.example; rh001Directory.js; RH-001-Tests', 'Konsultationsspuren und Rhythmus der Rechteprüfung sind nicht festgelegt.', 'partial'],
      ['A-04', 'RH-001-API · Nachweis und Aufbewahrung', 'Die Ansicht verbietet sensible Nachweisreferenzen und enthält keine Ereignis-Nachweis-Verbindung.', 'rh001Directory.js; RH-001-Vertrag', 'Autorisierte DMS-Referenzen, Beziehungen und Fristen ausserhalb der C2-Ansicht definieren.', 'missing'],
      ['A-05', 'Sicheres Verzeichnis · Zugriff und Sensibilität', 'Die Ansicht nutzt nur RH-001, bleibt schreibgeschützt und fällt nie auf ein fiktives Verzeichnis zurück.', 'MembersDirectory.js; api.js; Verzeichnistests', 'Nachweis der Verzeichnisprüfung und benannte Konsultationsspuren sind nicht beobachtet.', 'partial'],
      ['A-06', 'Team-/Agent-Auswahl · Stabile Kennung', 'Gespeichert bleibt der eindeutige Ruf- oder Anzeigename; person_id wird nur als Metadatum und Alias gehalten.', 'teamDirectory.js; Finance.js; Production.js', 'Speichervertrag auf person_id umstellen, ohne historische Werte umzuschreiben.', 'observed'],
      ['A-07', 'Team-/Agent-Auswahl · Versionierter Lebenszyklus', 'Frühere Werte bleiben als historisch angeboten und unbekannte Werte werden nicht still korrigiert.', 'Finance.js; teamAgentContract.js', 'Herkunft, Daten und Abfolge früherer Zuweisungen werden nicht erhalten.', 'partial'],
      ['A-08', 'Team-/Agent-Auswahl · Zugriff und Sensibilität', 'Finanzbuchungen verlangen Schreibrecht und inkonsistente Team-Agent-Paare werden abgelehnt.', 'server.js; teamAgentContract.js; Finanztests', 'Kein eigenes Protokoll für individuelle oder kollektive Zuweisungen ist beobachtet.', 'partial'],
      ['A-09', 'Team-/Agent-Auswahl · Nachweis und Aufbewahrung', 'Keine Verbindung zwischen Zuweisung, REF-01-Ereignis und autorisierter Nachweisreferenz ist beobachtet.', 'teamDirectory.js; beobachtete Finanzschemata', 'Referenzvertrag vor jeder Automatisierung oder Migration definieren.', 'missing'],
      ['A-10', 'DMS · Stabile Kennung', 'Ein dokumentarisches Kandidatenmodell besteht, aber keine aktive Dokument–REF-01-Objekt–Ereignis-Verbindung ist beobachtet.', 'RH-001-Vertrag; DMS-Pilot', 'Gesteuerte Dokumentkennung und versionierte Beziehung validieren und implementieren.', 'missing'],
      ['A-11', 'DMS · Zugriff und Sensibilität', 'Der DMS-Pilot verweist Detailrechte auf eine spätere Regelung; keine personalnachweisspezifische Kontrolle ist beobachtet.', 'GED.js; Dokumentenrahmen', 'Klassifizierung, Rechte, Protokollierung und Zugriffsprüfung für Personalnachweise definieren.', 'missing'],
      ['A-12', 'DMS · Nachweis und Aufbewahrung', 'Der DMS-Pilot bezeichnet Fristen als indikativ und enthält keine offizielle Aufbewahrungspolitik.', 'GED.js · Archivansicht', 'Fristen, Aussonderung, Integrität und Pflichtreferenz je Nachweistyp validieren.', 'missing']
    ],
    readingTitle: 'Gesteuerte Lesart des Ergebnisses',
    reading: ['Ein beobachteter Nachweis kann Verhalten oder Lücke belegen, ohne einen Träger konform zu machen.', 'Ein Teilnachweis muss vor jeder Qualifizierung ergänzt werden.', 'Nicht beobachtet bedeutet im kontrollierten Umfang nicht vorhanden, nicht organisationsweit inexistent.', 'Personalinhalte, Zivilidentitäten und Unterlagen bleiben in autorisierten Räumen.'],
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Dokumentierter Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-005', version: 'V1.0', status: 'Beschreibende Qualifizierungen bestätigt', author: 'Cheikh Ndiaye', date: '25.08.2026',
      decision: 'Die zwölf beschreibenden REF-01-Qualifizierungen werden bestätigt: ein beobachteter, fünf teilweise und sechs nicht beobachtete Nachweise im kontrollierten Umfang. Sie bilden die aktuelle gesteuerte Lesart zur Priorisierung der Lücken.',
      evidence: 'Ausdrückliche Validierung durch Cheikh in der Sitzung vom 25.08.2026; REF-01-V1.0-Register mit Frontend-PR Nr. 189 am Commit 350d77fa veröffentlicht; Quellen und Kontrollen in den zwölf Ergebnissen referenziert.',
      limit: 'Diese Bestätigung erklärt weder Konformität noch Gesamtqualität oder Vollständigkeit. Sie bestimmt keine Masterquelle, öffnet keinen Zugriff, legt keine Personendaten offen, ändert kein Schema, löst keine Automatisierung oder Migration aus und berechnet keinen Fortschritt.'
    },
    status: 'Bestätigte Position: 12 Anfragen geprüft; 1 beobachtet; 5 teilweise; 6 nicht beobachtet; 0 Masterquellen; kein berechneter Fortschritt.',
    next: 'Nächste Kontrolle: Lücken priorisieren und ein erstes Mikrolos vorbereiten, ohne eine Quelle zu fördern oder ein Schema zu ändern.'
  }
};

const InstitutionalPeopleTeamsEvidenceResults = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const CounterIcons = [SearchCheck, CheckCircle2, CircleDashed, AlertTriangle];

  return (
    <section id="institutional-ref01-evidence-results" className="m3s-ref01-evidence-results mt-4 rounded-md border border-sky-800/70 bg-sky-950/10 p-4 scroll-mt-24" aria-labelledby="institutional-ref01-evidence-results-title">
      <div className="max-w-5xl">
        <p className="text-xs font-semibold uppercase text-sky-300">{t.eyebrow}</p>
        <h6 id="institutional-ref01-evidence-results-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6>
        <p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {t.counters.map(([label, value, note], index) => {
          const Icon = CounterIcons[index];
          return (
            <article key={label} className="m3s-raised min-h-28 p-3">
              <div className="flex items-start justify-between gap-3">
                <div><p className="text-xs font-semibold leading-5 text-slate-300">{label}</p><p className="mt-1 text-2xl font-semibold text-slate-100">{value}</p></div>
                <Icon className={index === 1 ? 'text-emerald-300' : index === 2 ? 'text-amber-300' : 'text-sky-300'} size={18} aria-hidden="true" />
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-400">{note}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-4 hidden overflow-x-auto rounded-md border border-slate-700 xl:block">
        <table className="w-full min-w-[1380px] border-collapse text-left text-sm">
          <thead className="m3s-cns03-inventory-head bg-slate-900/70 text-xs uppercase text-slate-300"><tr>
            <th className="px-3 py-3 font-semibold">{t.columns.id}</th><th className="px-3 py-3 font-semibold">{t.columns.support}</th><th className="px-3 py-3 font-semibold">{t.columns.result}</th><th className="px-3 py-3 font-semibold">{t.columns.source}</th><th className="px-3 py-3 font-semibold">{t.columns.gap}</th><th className="px-3 py-3 font-semibold">{t.columns.status}</th>
          </tr></thead>
          <tbody className="divide-y divide-slate-700">
            {t.rows.map(([id, support, result, source, gap, status]) => (
              <tr key={id} className="align-top" data-testid="ref01-evidence-result-row">
                <th scope="row" className="px-3 py-3 font-semibold text-sky-200">{id}</th><td className="px-3 py-3 font-semibold text-slate-100">{support}</td><td className="px-3 py-3 leading-5 text-slate-300">{result}</td><td className="px-3 py-3 leading-5 text-slate-400">{source}</td><td className="px-3 py-3 leading-5 text-slate-300">{gap}</td><td className="px-3 py-3"><span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}>{t.statuses[status]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 space-y-3 xl:hidden">
        {t.rows.map(([id, support, result, source, gap, status]) => (
          <article key={id} className="rounded-md border border-slate-700 p-3" data-testid="ref01-evidence-result-card">
            <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-sky-200">{id}</p><h6 className="mt-1 text-sm font-semibold text-slate-100">{support}</h6></div><span className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}>{t.statuses[status]}</span></div>
            <p className="mt-3 text-sm leading-5 text-slate-300">{result}</p><p className="mt-3 text-xs leading-5 text-slate-400">{source}</p><p className="mt-3 border-t border-slate-700 pt-3 text-xs leading-5 text-slate-300">{gap}</p>
          </article>
        ))}
      </div>

      <section className="mt-4 rounded-md border border-slate-700 p-3" aria-labelledby="ref01-results-reading-title">
        <h6 id="ref01-results-reading-title" className="text-sm font-semibold text-slate-100">{t.readingTitle}</h6>
        <ul className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">{t.reading.map((item) => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><CircleDashed className="mt-0.5 shrink-0 text-sky-300" size={15} aria-hidden="true" />{item}</li>)}</ul>
      </section>

      <div className="m3s-ref01-decision">
        <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />
      </div>

      <p className="mt-4 flex items-start gap-2 border-t border-slate-700 pt-4 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.status}</p>
      <p className="mt-3 rounded-md border border-sky-800/70 bg-sky-950/15 p-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsEvidenceResults;
