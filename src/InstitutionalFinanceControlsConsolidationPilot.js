import React from 'react';
import {
  ArrowRight,
  Archive,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FolderCog,
  Landmark,
  ReceiptText,
  Scale,
  ShieldCheck,
  WalletCards
} from 'lucide-react';
import InstitutionalMeasurementReadiness from './InstitutionalMeasurementReadiness';

const STAGES = ['scope', 'flows', 'evidence', 'rates', 'reconciliation', 'review'];

const COPY = {
  FR: {
    eyebrow: 'PILOTE DE PROGRESSION · CONSOLIDATION',
    title: 'CNS-04 · Finances et contrôles',
    status: 'Périmètre cible à définir',
    body: 'Structurer les flux financiers, budgets, contrôles, preuves et taux appliqués de 2SG en CHF et CFA. Cette composante ne présume ni qu’un flux est rapproché, ni qu’un budget est validé, ni qu’une écriture constitue une comptabilité certifiée.',
    noMeasure: 'Progression non calculable · flux, budgets, contrôles, périodicité, pièces, taux CHF/CFA et règle de revue à définir puis valider',
    currentStage: 'Point de travail actuel',
    currentStageName: 'Définir contrôles, périodicité, pièces attendues et traitement CHF/CFA',
    stages: ['Périmètre & règles', 'Flux & budgets', 'Pièces & preuves', 'Taux & devises', 'Rapprochement & écarts', 'Revue & clôture'],
    tasksTitle: 'Tâches de consolidation',
    tasks: [
      'Inventorier les flux, registres et budgets par nature, fonction, dossier, projet, territoire, responsable et niveau de validation.',
      'Définir pour chaque contrôle son objet, propriétaire, fréquence, seuil, action en cas d’écart et preuve attendue.',
      'Distinguer le taux de référence du taux réellement appliqué à l’opération, avec date, source, frais et écart de change conservés.',
      'Prévenir les doubles comptes entre recettes, financements, dons, flux sociaux, dépenses, remboursements et mouvements immobiliers.'
    ],
    evidenceTitle: 'Preuves attendues',
    evidence: [
      'Matrice versionnée des contrôles avec fréquence, responsabilité, pièce, résultat, anomalie et décision.',
      'Écriture ou registre conservant montants CHF/CFA, devise source, taux appliqué, date, fournisseur du taux et justificatif.',
      'Rapprochement documenté entre engagement, paiement, réception, budget et preuve, avec écarts non résolus visibles.',
      'Historique des revues, corrections, validations humaines, clôtures et pièces classées dans la GED.'
    ],
    controlsTitle: 'Contrôles minimaux',
    controls: 'Une valeur absente ou invalide ne devient pas zéro. Le taux courant ne remplace jamais le taux historique appliqué. Un total global ne se déduit pas d’une page chargée et un même flux ne doit pas alimenter plusieurs agrégats sans règle explicite. Toute correction conserve l’écriture d’origine, la provenance et la décision.',
    articulationTitle: 'Articulation avec CNS-01 à CNS-03',
    articulation: 'CNS-01 autorise les engagements et les décisions ; CNS-02 décrit les chaînes de traitement et leurs contrôles ; CNS-03 fournit les objets, identifiants et sources gouvernés. CNS-04 applique ces fondations aux flux, budgets, pièces, taux et rapprochements sans certifier la comptabilité.',
    responsibilitiesTitle: 'Responsabilités',
    responsibilities: 'Finances prépare les écritures, rapprochements et contrôles ; la fonction métier atteste le fait et la réception ; Gouvernance autorise les engagements et accepte les risques résiduels ; Administration suit les échéances ; la GED conserve les pièces ; un professionnel compétent valide ce qui relève de la comptabilité, de la fiscalité ou du droit.',
    privacyTitle: 'Données conservées hors de cette vue',
    privacy: 'Coordonnées bancaires, reçus, preuves de transfert, identités, contrats, soldes détaillés et pièces fiscales restent dans les espaces autorisés. Cette vue ne publie que la méthode et ne contient aucun montant privé.',
    source: 'Sources de cadrage : Modèle du Programme institutionnel global V0.2 et Matrice de cadrage V0.1 du 23.08.2026. Résultat cible : flux rapprochés, budgets suivis, preuves et taux appliqués conservés. Le périmètre détaillé reste à valider.',
    openControls: 'Ouvrir les contrôles Finance',
    openFx: 'Ouvrir l’historique FX',
    openResources: 'Ouvrir les ressources Finance'
  },
  EN: {
    eyebrow: 'PROGRESS PILOT · CONSOLIDATION',
    title: 'CNS-04 · Finance and controls',
    status: 'Target scope to define',
    body: 'Structure 2SG financial flows, budgets, controls, evidence and applied rates in CHF and CFA. This component assumes neither that a flow is reconciled, nor that a budget is approved, nor that a record constitutes certified accounting.',
    noMeasure: 'Progress cannot be calculated · flows, budgets, controls, frequency, evidence, CHF/CFA rates and review rule must be defined and validated',
    currentStage: 'Current work point',
    currentStageName: 'Define controls, frequency, expected evidence and CHF/CFA treatment',
    stages: ['Scope & rules', 'Flows & budgets', 'Records & evidence', 'Rates & currencies', 'Reconciliation & gaps', 'Review & closure'],
    tasksTitle: 'Consolidation tasks',
    tasks: [
      'Inventory flows, registers and budgets by nature, function, file, project, territory, owner and validation level.',
      'Define each control’s purpose, owner, frequency, threshold, exception action and expected evidence.',
      'Distinguish the reference rate from the rate actually applied to a transaction, retaining date, source, fees and exchange difference.',
      'Prevent double counting across income, financing, donations, social flows, expenses, reimbursements and real-estate movements.'
    ],
    evidenceTitle: 'Expected evidence',
    evidence: [
      'Versioned control matrix with frequency, responsibility, record, result, anomaly and decision.',
      'Entry or register retaining CHF/CFA amounts, source currency, applied rate, date, rate provider and supporting record.',
      'Documented reconciliation between commitment, payment, acceptance, budget and evidence, with unresolved gaps visible.',
      'DMS history of reviews, corrections, human validations, closures and classified records.'
    ],
    controlsTitle: 'Minimum controls',
    controls: 'A missing or invalid value never becomes zero. The current rate never replaces the historical applied rate. A global total cannot be inferred from a loaded page, and the same flow must not feed several aggregates without an explicit rule. Every correction retains the original entry, provenance and decision.',
    articulationTitle: 'Connection with CNS-01 through CNS-03',
    articulation: 'CNS-01 authorises commitments and decisions; CNS-02 describes processing chains and controls; CNS-03 supplies governed objects, identifiers and sources. CNS-04 applies these foundations to flows, budgets, records, rates and reconciliations without certifying the accounts.',
    responsibilitiesTitle: 'Responsibilities',
    responsibilities: 'Finance prepares entries, reconciliations and controls; the business function attests the event and acceptance; Governance authorises commitments and accepts residual risks; Administration tracks deadlines; the DMS retains records; a competent professional validates accounting, tax or legal matters.',
    privacyTitle: 'Data retained outside this view',
    privacy: 'Bank details, receipts, transfer evidence, identities, contracts, detailed balances and tax records remain in authorised spaces. This view publishes only the method and contains no private amount.',
    source: 'Framing sources: Global Institutional Programme Model V0.2 and Framing Matrix V0.1 dated 23 Aug 2026. Target result: reconciled flows, monitored budgets, retained evidence and applied rates. The detailed scope remains to be validated.',
    openControls: 'Open Finance controls',
    openFx: 'Open FX history',
    openResources: 'Open Finance resources'
  },
  DE: {
    eyebrow: 'FORTSCHRITTSPILOT · KONSOLIDIERUNG',
    title: 'CNS-04 · Finanzen und Kontrollen',
    status: 'Zielumfang zu definieren',
    body: 'Finanzflüsse, Budgets, Kontrollen, Nachweise und angewandte Kurse von 2SG in CHF und CFA strukturieren. Diese Komponente setzt weder abgestimmte Flüsse noch genehmigte Budgets oder eine zertifizierte Buchhaltung voraus.',
    noMeasure: 'Fortschritt nicht berechenbar · Flüsse, Budgets, Kontrollen, Frequenz, Belege, CHF/CFA-Kurse und Prüfregel sind zu definieren und zu validieren',
    currentStage: 'Aktueller Arbeitspunkt',
    currentStageName: 'Kontrollen, Periodizität, erwartete Belege und CHF/CFA-Behandlung festlegen',
    stages: ['Umfang & Regeln', 'Flüsse & Budgets', 'Belege & Nachweise', 'Kurse & Währungen', 'Abstimmung & Abweichungen', 'Prüfung & Abschluss'],
    tasksTitle: 'Konsolidierungsaufgaben',
    tasks: [
      'Flüsse, Register und Budgets nach Art, Funktion, Dossier, Projekt, Gebiet, Verantwortung und Validierungsniveau inventarisieren.',
      'Für jede Kontrolle Zweck, Verantwortung, Frequenz, Schwelle, Abweichungsmaßnahme und erwarteten Nachweis festlegen.',
      'Referenzkurs und tatsächlich angewandten Transaktionskurs unterscheiden und Datum, Quelle, Gebühren sowie Kursabweichung sichern.',
      'Doppelzählungen zwischen Einnahmen, Finanzierungen, Spenden, Sozialflüssen, Ausgaben, Rückzahlungen und Immobilienbewegungen verhindern.'
    ],
    evidenceTitle: 'Erwartete Nachweise',
    evidence: [
      'Versionierte Kontrollmatrix mit Frequenz, Verantwortung, Beleg, Ergebnis, Abweichung und Entscheidung.',
      'Buchung oder Register mit CHF/CFA-Beträgen, Ausgangswährung, angewandtem Kurs, Datum, Kursanbieter und Beleg.',
      'Dokumentierte Abstimmung zwischen Verpflichtung, Zahlung, Abnahme, Budget und Nachweis mit sichtbaren offenen Abweichungen.',
      'GED-Historie der Prüfungen, Korrekturen, menschlichen Validierungen, Abschlüsse und klassifizierten Belege.'
    ],
    controlsTitle: 'Mindestkontrollen',
    controls: 'Ein fehlender oder ungültiger Wert wird niemals zu null. Der aktuelle Kurs ersetzt nie den historisch angewandten Kurs. Eine Gesamtsumme darf nicht aus einer geladenen Seite abgeleitet werden, und derselbe Fluss darf ohne klare Regel nicht mehrere Aggregate speisen. Jede Korrektur bewahrt Ursprungsbuchung, Herkunft und Entscheidung.',
    articulationTitle: 'Verbindung mit CNS-01 bis CNS-03',
    articulation: 'CNS-01 autorisiert Verpflichtungen und Entscheidungen; CNS-02 beschreibt Bearbeitungsketten und Kontrollen; CNS-03 liefert gesteuerte Objekte, Kennungen und Quellen. CNS-04 wendet diese Grundlagen auf Flüsse, Budgets, Belege, Kurse und Abstimmungen an, ohne die Buchhaltung zu zertifizieren.',
    responsibilitiesTitle: 'Verantwortlichkeiten',
    responsibilities: 'Finanzen bereitet Buchungen, Abstimmungen und Kontrollen vor; die Fachfunktion bestätigt Vorgang und Abnahme; Governance autorisiert Verpflichtungen und akzeptiert Restrisiken; Administration verfolgt Fristen; die GED sichert Belege; Fachpersonen validieren Buchhaltungs-, Steuer- oder Rechtsfragen.',
    privacyTitle: 'Daten außerhalb dieser Ansicht',
    privacy: 'Bankdaten, Quittungen, Transfernachweise, Identitäten, Verträge, detaillierte Salden und Steuerunterlagen bleiben in autorisierten Bereichen. Diese Ansicht veröffentlicht nur die Methode und enthält keine privaten Beträge.',
    source: 'Strukturierungsquellen: Modell des globalen institutionellen Programms V0.2 und Strukturierungsmatrix V0.1 vom 23.08.2026. Zielergebnis: abgestimmte Flüsse, überwachte Budgets, gesicherte Nachweise und angewandte Kurse. Der Detailumfang bleibt zu validieren.',
    openControls: 'Finanzkontrollen öffnen',
    openFx: 'FX-Historie öffnen',
    openResources: 'Finanzressourcen öffnen'
  }
};

const ListBlock = ({ icon: Icon, title, items, accent }) => (
  <article className="m3s-raised p-4">
    <div className="flex items-center gap-2"><Icon className={accent} size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{title}</h5></div>
    <ul className="mt-3 space-y-2">
      {items.map(item => <li key={item} className="flex gap-2 text-sm leading-5 text-slate-300"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={15} aria-hidden="true" /><span>{item}</span></li>)}
    </ul>
  </article>
);

const InstitutionalFinanceControlsConsolidationPilot = ({ language = 'FR', onNavigate }) => {
  const t = COPY[language] || COPY.FR;
  const sectionId = 'institutional-finance-controls-consolidation-pilot';
  const returnContext = `returnTo=dashboard&dashboardView=program&dashboardSection=${sectionId}`;

  return (
    <section id={sectionId} className="m3s-panel scroll-mt-24 p-4 sm:p-5" aria-labelledby={`${sectionId}-title`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p>
          <h4 id={`${sectionId}-title`} className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-emerald-700/70 bg-emerald-950/30 px-3 py-2 text-xs font-semibold text-emerald-100"><Landmark size={16} aria-hidden="true" />{t.status}</span>
      </div>

      <InstitutionalMeasurementReadiness language={language} headline={t.noMeasure} accent="emerald" />

      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/25 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-semibold text-slate-200">{t.currentStage}</span>
          <span className="rounded-md border border-emerald-700/70 bg-emerald-950/35 px-2.5 py-1 font-semibold text-emerald-100">{t.currentStageName}</span>
        </div>
        <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
          {STAGES.map((stage, index) => <li key={stage} className={`min-h-16 rounded-md border p-2 text-xs font-semibold ${index === 0 ? 'border-emerald-500 bg-emerald-950/40 text-emerald-100' : 'border-slate-600 bg-slate-950/10 text-slate-200'}`}><span className="mb-1 block">{index + 1}</span>{t.stages[index]}</li>)}
        </ol>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <ListBlock icon={WalletCards} title={t.tasksTitle} items={t.tasks} accent="text-emerald-300" />
        <ListBlock icon={ReceiptText} title={t.evidenceTitle} items={t.evidence} accent="text-blue-300" />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><ShieldCheck className="text-amber-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.controlsTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.controls}</p></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><Scale className="text-emerald-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.articulationTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.articulation}</p></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><CalendarClock className="text-blue-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.responsibilitiesTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.responsibilities}</p></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><Archive className="text-rose-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.privacyTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.privacy}</p></article>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-700 pt-4 xl:flex-row xl:items-end xl:justify-between">
        <p className="max-w-3xl text-xs leading-5 text-slate-400">{t.source}</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <button type="button" onClick={() => onNavigate(`/finance?tab=processes&${returnContext}#finance-process-controls-title`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"><ClipboardCheck size={16} aria-hidden="true" />{t.openControls}<ArrowRight size={16} aria-hidden="true" /></button>
          <button type="button" onClick={() => onNavigate(`/finance?tab=fx&${returnContext}#finance-fx`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-emerald-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"><FileCheck2 size={16} aria-hidden="true" />{t.openFx}</button>
          <button type="button" onClick={() => onNavigate(`/finance?tab=resources&${returnContext}#finances-resources-title`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-emerald-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"><FolderCog size={16} aria-hidden="true" />{t.openResources}</button>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalFinanceControlsConsolidationPilot;
