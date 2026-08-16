import React from 'react';
import {
  ArrowRight,
  BadgeCheck,
  CircleAlert,
  Database,
  FileCheck2,
  RefreshCw,
  Save,
  ShieldCheck,
  SlidersHorizontal
} from 'lucide-react';
import GlossaryHelp from './GlossaryHelp';

const COPY = {
  FR: {
    eyebrow: 'FINANCES · PROCESSUS OBSERVÉS V1',
    title: 'Comprendre les parcours et les contrôles réellement actifs',
    intro: 'Cette vue en lecture seule distingue les opérations persistées par API, le convertisseur conservé localement et les contrôles qui restent à compléter. Elle ne constitue ni une procédure comptable certifiée ni une validation juridique.',
    observed: 'Observé',
    local: 'Local',
    candidate: 'À cadrer',
    flowsTitle: 'Trois parcours actuellement distincts',
    flows: [
      {
        title: 'Recettes et dépenses',
        state: 'Persisté par API',
        body: 'Création, modification et suppression dans les registres Finance. Après succès, les extraits et agrégats sont relus.',
        source: '/finance/income · /finance/expenses'
      },
      {
        title: 'Finance immobilière',
        state: 'Persisté par API',
        body: 'Opérations immobilières avec montants CHF/CFA, taux, projet, statut et référence documentaire. La vue est rechargée après mutation.',
        source: '/finance/real-estate'
      },
      {
        title: 'Convertisseur FX',
        state: 'État local de la page',
        body: 'La saisie manuelle modifie l’historique affiché dans la session courante. Aucune persistance API n’est observée dans ce formulaire.',
        source: 'fxHistory · état React local'
      }
    ],
    chainTitle: 'Chaîne observée d’une écriture persistée',
    chain: [
      ['1', 'Saisir', 'Description ou désignation, date, montant et contexte.'],
      ['2', 'Contrôler', 'Champs requis, devise CHF/CFA et taux historique disponible.'],
      ['3', 'Calculer', 'Montants d’origine, CHF, CFA et taux appliqué sont préparés.'],
      ['4', 'Persister', 'Création ou modification par l’API Finance.'],
      ['5', 'Relire', 'Registre, agrégats ou vue spécialisée sont rechargés après succès.']
    ],
    controlsTitle: 'Contrôles présents dans le parcours',
    controls: [
      ['Champs minimaux', 'Les écritures génériques exigent description et montant ; l’immobilier exige date et désignation.'],
      ['Conversion datée', 'Une recette ou dépense exige un taux historique exact pour calculer les deux montants.'],
      ['Suppression sensible', 'Une confirmation est demandée avant suppression des recettes, dépenses et opérations immobilières.'],
      ['Erreur visible', 'Les erreurs de validation ou d’API sont signalées ; aucune valeur fictive ne remplace une donnée absente.']
    ],
    gapsTitle: 'Contrôles à compléter avant d’en faire une procédure cible',
    gapsIntro: 'Ces éléments sont des écarts observés, pas des fonctions déclarées comme déjà disponibles.',
    gapHeaders: ['Contrôle candidat', 'Constat actuel', 'Suite prudente'],
    gaps: [
      ['Confirmation d’ajout et de modification', 'Aucune confirmation préalable n’est observée avant l’envoi à l’API.', 'Ajouter une confirmation contextualisée sans doubler la validation des champs.'],
      ['Confirmation de réussite', 'Le formulaire se ferme après succès, sans message durable de création ou modification.', 'Afficher un retour de succès traduit et accessible.'],
      ['Convertisseur FX gouverné', 'Ajout, modification et suppression restent locaux ; la suppression ne demande pas confirmation.', 'Décider s’il s’agit d’un simulateur ou d’un registre avant toute persistance.'],
      ['Justificatif documentaire', 'Les écritures génériques ne portent pas encore un identifiant GED homogène.', 'Relier une preuve gouvernée sans exposer de document sensible.'],
      ['Relations et habilitations', 'Projet, tâche, actif, agent et approbation ne sont pas reliés par des clés communes dans le payload observé.', 'Valider d’abord le modèle transversal et les droits avant migration.']
    ],
    proofTitle: 'Règle de preuve et de responsabilité',
    proof: 'La fonction Finance vérifie le montant, l’affectation, le taux et le rapprochement. La fonction métier fournit le fait et son justificatif ; la gouvernance autorise l’engagement. Le code observé ne prouve pas encore un workflow technique complet d’approbation.',
    source: 'Sources observées : formulaires et gestionnaires Finance du frontend, contrats API Finance, validations backend BigQuery et règles de source déjà affichées dans M3S. Lecture seule ; aucune donnée modifiée.'
  },
  EN: {
    eyebrow: 'FINANCE · OBSERVED PROCESSES V1',
    title: 'Understand the workflows and controls that are actually active',
    intro: 'This read-only view distinguishes API-persisted operations, the locally retained converter and controls that still need completion. It is neither a certified accounting procedure nor a legal validation.',
    observed: 'Observed',
    local: 'Local',
    candidate: 'To frame',
    flowsTitle: 'Three currently distinct workflows',
    flows: [
      {
        title: 'Revenue and expenses',
        state: 'Persisted by API',
        body: 'Creation, editing and deletion in Finance registers. Extracts and aggregates are read again after success.',
        source: '/finance/income · /finance/expenses'
      },
      {
        title: 'Real-estate finance',
        state: 'Persisted by API',
        body: 'Real-estate operations with CHF/CFA amounts, rate, project, status and document reference. The view reloads after a mutation.',
        source: '/finance/real-estate'
      },
      {
        title: 'FX converter',
        state: 'Local page state',
        body: 'Manual entry changes the history displayed in the current session. No API persistence is observed in this form.',
        source: 'fxHistory · local React state'
      }
    ],
    chainTitle: 'Observed chain for a persisted entry',
    chain: [
      ['1', 'Enter', 'Description or designation, date, amount and context.'],
      ['2', 'Check', 'Required fields, CHF/CFA currency and available historical rate.'],
      ['3', 'Calculate', 'Original, CHF and CFA amounts and the applied rate are prepared.'],
      ['4', 'Persist', 'Creation or editing through the Finance API.'],
      ['5', 'Read again', 'Register, aggregates or specialized view reload after success.']
    ],
    controlsTitle: 'Controls present in the workflow',
    controls: [
      ['Minimum fields', 'Generic entries require a description and amount; real estate requires a date and designation.'],
      ['Dated conversion', 'Revenue or expense requires an exact historical rate to calculate both amounts.'],
      ['Sensitive deletion', 'Confirmation is requested before deleting revenue, expenses and real-estate operations.'],
      ['Visible error', 'Validation or API errors are reported; no fictitious value replaces missing data.']
    ],
    gapsTitle: 'Controls to complete before calling this a target procedure',
    gapsIntro: 'These items are observed gaps, not functions claimed as already available.',
    gapHeaders: ['Candidate control', 'Current finding', 'Prudent next step'],
    gaps: [
      ['Creation and editing confirmation', 'No prior confirmation is observed before sending data to the API.', 'Add contextual confirmation without duplicating field validation.'],
      ['Success confirmation', 'The form closes after success without a durable creation or editing message.', 'Show a translated and accessible success response.'],
      ['Governed FX converter', 'Creation, editing and deletion remain local; deletion asks for no confirmation.', 'Decide whether it is a simulator or a register before persisting anything.'],
      ['Document evidence', 'Generic entries do not yet carry a consistent DMS identifier.', 'Link governed evidence without exposing a sensitive document.'],
      ['Relationships and permissions', 'Project, task, asset, agent and approval are not linked by shared keys in the observed payload.', 'Validate the transversal model and rights before migration.']
    ],
    proofTitle: 'Evidence and responsibility rule',
    proof: 'Finance checks the amount, allocation, rate and reconciliation. The business function provides the fact and its evidence; governance authorizes the commitment. The observed code does not yet prove a complete technical approval workflow.',
    source: 'Observed sources: frontend Finance forms and handlers, Finance API contracts, BigQuery backend validations and source rules already displayed in M3S. Read-only; no data changed.'
  },
  DE: {
    eyebrow: 'FINANZEN · BEOBACHTETE PROZESSE V1',
    title: 'Tatsächlich aktive Abläufe und Kontrollen verstehen',
    intro: 'Diese schreibgeschützte Ansicht unterscheidet API-gespeicherte Vorgänge, den lokal gehaltenen Umrechner und noch zu ergänzende Kontrollen. Sie ist weder ein zertifiziertes Buchhaltungsverfahren noch eine rechtliche Prüfung.',
    observed: 'Beobachtet',
    local: 'Lokal',
    candidate: 'Zu gestalten',
    flowsTitle: 'Drei derzeit getrennte Abläufe',
    flows: [
      {
        title: 'Einnahmen und Ausgaben',
        state: 'Über API gespeichert',
        body: 'Erstellung, Bearbeitung und Löschung in den Finanzregistern. Nach Erfolg werden Auszüge und Aggregate neu gelesen.',
        source: '/finance/income · /finance/expenses'
      },
      {
        title: 'Immobilienfinanzen',
        state: 'Über API gespeichert',
        body: 'Immobilienvorgänge mit CHF-/CFA-Beträgen, Kurs, Projekt, Status und Dokumentreferenz. Die Ansicht wird nach einer Änderung neu geladen.',
        source: '/finance/real-estate'
      },
      {
        title: 'FX-Umrechner',
        state: 'Lokaler Seitenzustand',
        body: 'Die manuelle Eingabe ändert den in der aktuellen Sitzung angezeigten Verlauf. In diesem Formular ist keine API-Speicherung beobachtet.',
        source: 'fxHistory · lokaler React-Zustand'
      }
    ],
    chainTitle: 'Beobachtete Kette einer gespeicherten Buchung',
    chain: [
      ['1', 'Erfassen', 'Beschreibung oder Bezeichnung, Datum, Betrag und Kontext.'],
      ['2', 'Prüfen', 'Pflichtfelder, Währung CHF/CFA und verfügbarer historischer Kurs.'],
      ['3', 'Berechnen', 'Ursprungs-, CHF- und CFA-Beträge sowie angewandter Kurs werden vorbereitet.'],
      ['4', 'Speichern', 'Erstellung oder Bearbeitung über die Finanz-API.'],
      ['5', 'Neu lesen', 'Register, Aggregate oder Spezialansicht werden nach Erfolg neu geladen.']
    ],
    controlsTitle: 'Im Ablauf vorhandene Kontrollen',
    controls: [
      ['Mindestfelder', 'Allgemeine Buchungen benötigen Beschreibung und Betrag; Immobilien benötigen Datum und Bezeichnung.'],
      ['Datierte Umrechnung', 'Einnahmen oder Ausgaben benötigen einen exakten historischen Kurs für beide Beträge.'],
      ['Sensible Löschung', 'Vor dem Löschen von Einnahmen, Ausgaben und Immobilienvorgängen wird eine Bestätigung verlangt.'],
      ['Sichtbarer Fehler', 'Validierungs- oder API-Fehler werden gemeldet; fehlende Daten werden nicht durch fiktive Werte ersetzt.']
    ],
    gapsTitle: 'Kontrollen vor einem Zielverfahren ergänzen',
    gapsIntro: 'Diese Punkte sind beobachtete Lücken und keine als verfügbar behaupteten Funktionen.',
    gapHeaders: ['Kontrollkandidat', 'Aktueller Befund', 'Vorsichtige Fortsetzung'],
    gaps: [
      ['Bestätigung von Erstellung und Bearbeitung', 'Vor dem Senden an die API ist keine vorherige Bestätigung beobachtet.', 'Kontextbezogene Bestätigung ohne doppelte Feldprüfung ergänzen.'],
      ['Erfolgsbestätigung', 'Das Formular schließt nach Erfolg ohne dauerhafte Meldung zur Erstellung oder Bearbeitung.', 'Eine übersetzte und barrierearme Erfolgsmeldung anzeigen.'],
      ['Geregelter FX-Umrechner', 'Erstellung, Bearbeitung und Löschung bleiben lokal; die Löschung verlangt keine Bestätigung.', 'Vor einer Speicherung entscheiden, ob es ein Simulator oder Register ist.'],
      ['Dokumentnachweis', 'Allgemeine Buchungen tragen noch keine einheitliche DMS-Kennung.', 'Geregelten Nachweis verknüpfen, ohne sensible Dokumente offenzulegen.'],
      ['Beziehungen und Berechtigungen', 'Projekt, Aufgabe, Anlage, Person und Freigabe sind im beobachteten Payload nicht über gemeinsame Schlüssel verbunden.', 'Zuerst das übergreifende Modell und die Rechte validieren.']
    ],
    proofTitle: 'Nachweis- und Verantwortungsregel',
    proof: 'Finanzen prüft Betrag, Zuordnung, Kurs und Abstimmung. Die Fachfunktion liefert den Sachverhalt und seinen Nachweis; die Governance genehmigt die Verpflichtung. Der beobachtete Code belegt noch keinen vollständigen technischen Freigabeworkflow.',
    source: 'Beobachtete Quellen: Finanzformulare und Handler im Frontend, Finanz-API-Verträge, BigQuery-Validierungen im Backend und bereits in M3S angezeigte Quellenregeln. Nur Lesen; keine Daten geändert.'
  }
};

const FinanceProcessControls = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section className="m3s-design-scope space-y-5" aria-labelledby="finance-process-controls-title">
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold uppercase" style={{ color: 'var(--m3s-row-accent)' }}>{t.eyebrow}</p>
          <span className="inline-flex rounded-full border px-3 py-1 text-xs font-semibold" style={{ borderColor: 'var(--m3s-row-accent)', color: 'var(--m3s-row-accent)' }}>{t.observed}</span>
        </div>
        <h3 id="finance-process-controls-title" className="m3s-section-title mt-2">{t.title}</h3>
        <p className="mt-2 max-w-5xl text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{t.intro}</p>
      </header>

      <section aria-labelledby="finance-workflows-title">
        <h4 id="finance-workflows-title" className="m3s-panel-title flex items-center gap-2"><SlidersHorizontal size={18} aria-hidden="true" />{t.flowsTitle}</h4>
        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          {t.flows.map((flow, index) => (
            <article key={flow.title} className="m3s-panel p-4 transition hover:-translate-y-0.5 hover:border-emerald-500/60">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex min-w-0 items-start gap-2">
                  {index === 0 ? <Save size={18} aria-hidden="true" /> : index === 1 ? <Database size={18} aria-hidden="true" /> : <RefreshCw size={18} aria-hidden="true" />}
                  <h5 className="m3s-panel-title min-w-0">{flow.title}</h5>
                </div>
                <span className="inline-flex rounded-full border px-3 py-1 text-xs font-semibold" style={{ borderColor: index === 2 ? 'var(--m3s-border-strong)' : 'var(--m3s-row-accent)', color: index === 2 ? 'var(--m3s-text-secondary)' : 'var(--m3s-row-accent)' }}>{index === 2 ? t.local : t.observed}</span>
              </div>
              <p className="mt-3 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{flow.body}</p>
              <p className="mt-3 font-mono text-xs" style={{ color: 'var(--m3s-row-accent)' }}>{flow.source}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="m3s-panel p-4" aria-labelledby="finance-process-chain-title">
        <div className="flex items-center gap-2">
          <h4 id="finance-process-chain-title" className="m3s-panel-title flex items-center gap-2"><ArrowRight size={18} aria-hidden="true" />{t.chainTitle}</h4>
          <GlossaryHelp termId="FIN-ECRITURE-FINANCIERE" language={language} />
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-5">
          {t.chain.map(([number, label, body], index) => (
            <div key={number} className="relative border p-3" style={{ borderColor: 'var(--m3s-border)', background: 'var(--m3s-surface-raised)' }}>
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white" style={{ background: 'var(--m3s-row-accent)' }}>{number}</span>
                <p className="text-sm font-semibold" style={{ color: 'var(--m3s-text-primary)' }}>{label}</p>
                {index === 2 && <GlossaryHelp termId="FIN-TAUX-CHANGE-APPLIQUE" language={language} />}
              </div>
              <p className="mt-2 text-sm leading-5" style={{ color: 'var(--m3s-text-secondary)' }}>{body}</p>
              {index < t.chain.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-blue-400 md:block" size={18} aria-hidden="true" />}
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="finance-active-controls-title">
        <h4 id="finance-active-controls-title" className="m3s-panel-title flex items-center gap-2"><ShieldCheck size={18} aria-hidden="true" />{t.controlsTitle}</h4>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {t.controls.map(([title, body]) => (
            <article key={title} className="m3s-panel p-4">
              <h5 className="m3s-panel-title flex items-center gap-2"><BadgeCheck size={17} className="text-emerald-500" aria-hidden="true" />{title}</h5>
              <p className="mt-2 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="m3s-panel overflow-hidden" aria-labelledby="finance-control-gaps-title">
        <div className="flex flex-wrap items-start justify-between gap-2 p-4">
          <div>
            <div className="flex items-center gap-2">
              <h4 id="finance-control-gaps-title" className="m3s-panel-title flex items-center gap-2"><CircleAlert size={18} aria-hidden="true" />{t.gapsTitle}</h4>
              <GlossaryHelp termId="DATA-RELATION-REFERENTIELLE" language={language} />
            </div>
            <p className="mt-2 text-sm" style={{ color: 'var(--m3s-text-secondary)' }}>{t.gapsIntro}</p>
          </div>
          <span className="inline-flex rounded-full border border-amber-500 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-300">{t.candidate}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead style={{ background: 'var(--m3s-surface-raised)', color: 'var(--m3s-text-secondary)' }}>
              <tr>{t.gapHeaders.map(header => <th key={header} className="px-4 py-3 text-xs uppercase">{header}</th>)}</tr>
            </thead>
            <tbody>
              {t.gaps.map(row => (
                <tr key={row[0]} className="border-t transition hover:bg-amber-500/5" style={{ borderColor: 'var(--m3s-border)' }}>
                  {row.map((cell, index) => <td key={cell} className={`px-4 py-3 align-top ${index === 0 ? 'font-semibold' : ''}`} style={{ color: index === 0 ? 'var(--m3s-text-primary)' : 'var(--m3s-text-secondary)' }}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <aside className="m3s-panel p-4" aria-label={t.proofTitle}>
        <div className="flex items-center gap-2">
          <h4 className="m3s-panel-title flex items-center gap-2"><FileCheck2 size={18} aria-hidden="true" />{t.proofTitle}</h4>
          <GlossaryHelp termId="FIN-JUSTIFICATIF-FINANCIER" language={language} />
        </div>
        <p className="mt-2 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{t.proof}</p>
      </aside>

      <p className="border-l-2 pl-3 text-xs leading-5" style={{ borderColor: 'var(--m3s-row-accent)', color: 'var(--m3s-text-secondary)' }}><Database className="mr-2 inline" size={14} aria-hidden="true" />{t.source}</p>
    </section>
  );
};

export default FinanceProcessControls;
