import React from 'react';
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  FileCheck2,
  Landmark,
  LockKeyhole,
  ReceiptText,
  Split,
  WalletCards
} from 'lucide-react';
import InstitutionalMeasurementReadiness from './InstitutionalMeasurementReadiness';

const FUNDING_STAGES = [
  'scope',
  'contributions',
  'allocations',
  'currencies',
  'evidence',
  'validation'
];

const CURRENT_STAGE_INDEX = 0;

const COPY = {
  FR: {
    eyebrow: 'PILOTE DE PROGRESSION · MISE EN PLACE',
    title: 'MEP-05 · Ressources & financement initial',
    status: 'Flux existants · périmètre initial à rapprocher',
    body: 'Rendre traçables les ressources mobilisées pour lancer 2SG, en distinguant apports, financements, dépenses, remboursements et affectations sans exposer les pièces financières privées.',
    noMeasure: 'Progression non calculable · périmètre, catégories, rapprochements, preuves et responsabilités à valider',
    currentStage: 'Point de travail actuel',
    currentStageName: 'Périmètre, apports et affectations à rapprocher',
    stages: ['Périmètre initial', 'Apports des fondateurs', 'Catégories & affectations', 'CHF/CFA & taux appliqués', 'Preuves & rapprochements', 'Validation & revue'],
    tasksTitle: 'Tâches de pilotage',
    tasks: [
      'Définir ce qui appartient au financement initial et le séparer des opérations courantes, dons, dettes et remboursements.',
      'Inventorier les apports des fondateurs par référence gouvernée, nature, date et destination, sans afficher leurs comptes privés.',
      'Relier chaque transfert ou écriture à sa catégorie, son affectation, son objet métier, son autorisation et sa preuve.',
      'Fixer les responsabilités de saisie, rapprochement, validation, revue périodique et conservation documentaire.'
    ],
    evidenceTitle: 'Preuves attendues',
    evidence: [
      'Registre maître versionné des ressources initiales avec identifiants stables et statuts contrôlables.',
      'Références GED restreintes vers reçus, factures, confirmations et décisions, sans fichier sensible dans le frontend.',
      'Rapprochement entre transfert, frais, taux appliqué, ventilation, dépense ou acquisition et objet métier concerné.',
      'Décision humaine confirmant catégories, périmètre, responsabilités, règles CHF/CFA et traitement des écarts.'
    ],
    controlsTitle: 'Contrôles minimaux',
    controls: 'Le taux du jour ne remplace jamais le taux appliqué à une opération historique. Un apport déclaré n’est pas automatiquement un don, un prêt, du capital, une dépense ou une créance remboursable. Un agrégat financier ne prouve ni exhaustivité comptable, ni conformité fiscale ou juridique.',
    privacyTitle: 'Données conservées hors de cette vue',
    privacy: 'Montants détaillés, références de transaction, comptes, bénéficiaires, moyens de paiement, reçus et affectations nominatives restent dans les registres autorisés et la GED restreinte.',
    responsibilitiesTitle: 'Responsabilités',
    responsibilities: 'Finances tient le registre et les rapprochements ; les fondateurs fournissent et contrôlent les preuves de leurs apports ; la fonction métier valide la destination ; la Gouvernance autorise catégories, règles et accès sensibles ; Administration suit les écarts ; la GED conserve les pièces selon leur classification.',
    source: 'Sources de pilotage : module M3S Finances, modèle CHF/CFA validé, suivi financier restreint Villa LR1 utilisé uniquement comme exemple de structure et rapprochement Finance sociale du 22.06.2026. Les pièces et montants privés restent hors de cette vue.',
    open: 'Ouvrir Finances'
  },
  EN: {
    eyebrow: 'PROGRESS PILOT · IMPLEMENTATION',
    title: 'MEP-05 · Initial resources & funding',
    status: 'Existing flows · initial scope to reconcile',
    body: 'Make the resources used to launch 2SG traceable by separating contributions, funding, expenses, reimbursements and allocations without exposing private financial evidence.',
    noMeasure: 'Progress cannot be calculated · scope, categories, reconciliations, evidence and responsibilities require validation',
    currentStage: 'Current work point',
    currentStageName: 'Scope, contributions and allocations to reconcile',
    stages: ['Initial scope', 'Founder contributions', 'Categories & allocations', 'CHF/CFA & applied rates', 'Evidence & reconciliation', 'Validation & review'],
    tasksTitle: 'Steering tasks',
    tasks: [
      'Define what belongs to initial funding and separate it from current operations, donations, liabilities and reimbursements.',
      'Inventory founder contributions by governed reference, nature, date and destination without displaying private accounts.',
      'Link each transfer or entry to its category, allocation, business object, authorisation and evidence.',
      'Set responsibilities for entry, reconciliation, validation, periodic review and document retention.'
    ],
    evidenceTitle: 'Expected evidence',
    evidence: [
      'Versioned master register of initial resources with stable identifiers and verifiable statuses.',
      'Restricted DMS references to receipts, invoices, confirmations and decisions, with no sensitive file in the frontend.',
      'Reconciliation between transfer, fee, applied rate, allocation, expense or acquisition and the related business object.',
      'Human decision confirming categories, scope, responsibilities, CHF/CFA rules and treatment of variances.'
    ],
    controlsTitle: 'Minimum controls',
    controls: 'The current rate never replaces the rate applied to a historical operation. A declared contribution is not automatically a donation, loan, capital contribution, expense or reimbursable claim. A financial aggregate proves neither accounting completeness nor tax or legal compliance.',
    privacyTitle: 'Data retained outside this view',
    privacy: 'Detailed amounts, transaction references, accounts, beneficiaries, payment instruments, receipts and named allocations remain in authorised registers and the restricted DMS.',
    responsibilitiesTitle: 'Responsibilities',
    responsibilities: 'Finance maintains the register and reconciliations; founders provide and review evidence of their contributions; the business owner validates purpose; Governance authorises categories, rules and sensitive access; Administration tracks gaps; the DMS retains evidence according to classification.',
    source: 'Steering sources: M3S Finance module, validated CHF/CFA model, restricted Villa LR1 financial follow-up used only as a structural example, and the 22 Jun 2026 Social Finance reconciliation. Private evidence and amounts remain outside this view.',
    open: 'Open Finance'
  },
  DE: {
    eyebrow: 'FORTSCHRITTSPILOT · UMSETZUNG',
    title: 'MEP-05 · Anfangsressourcen & Finanzierung',
    status: 'Vorhandene Flüsse · Anfangsumfang abzustimmen',
    body: 'Die für den Start von 2SG mobilisierten Ressourcen nachvollziehbar machen und dabei Beiträge, Finanzierungen, Ausgaben, Rückzahlungen und Zuordnungen trennen, ohne private Finanzbelege offenzulegen.',
    noMeasure: 'Fortschritt nicht berechenbar · Umfang, Kategorien, Abstimmungen, Nachweise und Verantwortlichkeiten sind zu validieren',
    currentStage: 'Aktueller Arbeitspunkt',
    currentStageName: 'Umfang, Beiträge und Zuordnungen abzustimmen',
    stages: ['Anfangsumfang', 'Beiträge der Gründer', 'Kategorien & Zuordnungen', 'CHF/CFA & angewandte Kurse', 'Nachweise & Abstimmung', 'Validierung & Prüfung'],
    tasksTitle: 'Steuerungsaufgaben',
    tasks: [
      'Den Umfang der Anfangsfinanzierung definieren und von laufenden Vorgängen, Spenden, Verbindlichkeiten und Rückzahlungen trennen.',
      'Beiträge der Gründer nach gesteuerter Referenz, Art, Datum und Ziel inventarisieren, ohne private Konten anzuzeigen.',
      'Jeden Transfer oder Eintrag mit Kategorie, Zuordnung, Fachobjekt, Autorisierung und Nachweis verknüpfen.',
      'Verantwortlichkeiten für Erfassung, Abstimmung, Validierung, regelmäßige Prüfung und Dokumentaufbewahrung festlegen.'
    ],
    evidenceTitle: 'Erwartete Nachweise',
    evidence: [
      'Versioniertes Hauptregister der Anfangsressourcen mit stabilen Kennungen und prüfbaren Status.',
      'Eingeschränkte DMS-Referenzen auf Belege, Rechnungen, Bestätigungen und Entscheide ohne sensible Datei im Frontend.',
      'Abstimmung von Transfer, Gebühr, angewandtem Kurs, Zuordnung, Ausgabe oder Erwerb und betroffenem Fachobjekt.',
      'Menschlicher Entscheid zu Kategorien, Umfang, Verantwortlichkeiten, CHF/CFA-Regeln und Behandlung von Abweichungen.'
    ],
    controlsTitle: 'Mindestkontrollen',
    controls: 'Der Tageskurs ersetzt nie den bei einem historischen Vorgang angewandten Kurs. Ein deklarierter Beitrag ist nicht automatisch Spende, Darlehen, Kapital, Ausgabe oder rückzahlbare Forderung. Ein Finanzaggregat belegt weder buchhalterische Vollständigkeit noch steuerliche oder rechtliche Konformität.',
    privacyTitle: 'Außerhalb dieser Ansicht aufbewahrte Daten',
    privacy: 'Detaillierte Beträge, Transaktionsreferenzen, Konten, Begünstigte, Zahlungsmittel, Belege und namentliche Zuordnungen bleiben in autorisierten Registern und im eingeschränkten DMS.',
    responsibilitiesTitle: 'Verantwortlichkeiten',
    responsibilities: 'Finanzen führt Register und Abstimmungen; die Gründer liefern und prüfen Nachweise ihrer Beiträge; die Fachfunktion validiert den Zweck; Governance autorisiert Kategorien, Regeln und sensible Zugriffe; Administration verfolgt Lücken; das DMS bewahrt Nachweise gemäß Klassifizierung.',
    source: 'Steuerungsquellen: M3S-Finanzmodul, validiertes CHF/CFA-Modell, eingeschränkte Villa-LR1-Finanzverfolgung nur als Strukturbeispiel und Abstimmung Sozialfinanzen vom 22.06.2026. Private Belege und Beträge bleiben außerhalb dieser Ansicht.',
    open: 'Finanzen öffnen'
  }
};

const ListBlock = ({ icon: Icon, title, items, accent }) => (
  <article className="m3s-raised p-4">
    <div className="flex items-center gap-2">
      <Icon className={accent} size={18} aria-hidden="true" />
      <h5 className="text-sm font-semibold text-slate-100">{title}</h5>
    </div>
    <ul className="mt-3 space-y-2">
      {items.map(item => (
        <li key={item} className="flex gap-2 text-sm leading-5 text-slate-300">
          <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={15} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </article>
);

const InstitutionalInitialFundingPilot = ({ language = 'FR', onNavigate }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section id="institutional-initial-funding-pilot" className="m3s-panel scroll-mt-24 p-4 sm:p-5" aria-labelledby="institutional-initial-funding-pilot-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p>
          <h4 id="institutional-initial-funding-pilot-title" className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-emerald-700/70 bg-emerald-950/30 px-3 py-2 text-xs font-semibold text-emerald-200">
          <WalletCards size={16} aria-hidden="true" />{t.status}
        </span>
      </div>

      <InstitutionalMeasurementReadiness language={language} headline={t.noMeasure} accent="emerald" />

      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/25 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-semibold text-slate-200">{t.currentStage}</span>
          <span className="rounded-md border border-emerald-700/70 bg-emerald-950/35 px-2.5 py-1 font-semibold text-emerald-200">{t.currentStageName}</span>
        </div>
        <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
          {FUNDING_STAGES.map((stage, index) => {
            const current = index === CURRENT_STAGE_INDEX;
            return (
              <li key={stage} className={`min-h-16 rounded-md border p-2 text-xs font-semibold ${current ? 'border-emerald-500 bg-emerald-950/40 text-emerald-100' : 'border-slate-600 bg-slate-950/10 text-slate-200'}`}>
                <span className="mb-1 block">{index + 1}</span>{t.stages[index]}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <ListBlock icon={Split} title={t.tasksTitle} items={t.tasks} accent="text-emerald-300" />
        <ListBlock icon={FileCheck2} title={t.evidenceTitle} items={t.evidence} accent="text-cyan-300" />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-3">
        <article className="m3s-raised p-4">
          <div className="flex items-center gap-2"><BadgeDollarSign className="text-amber-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.controlsTitle}</h5></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.controls}</p>
        </article>
        <article className="m3s-raised p-4">
          <div className="flex items-center gap-2"><LockKeyhole className="text-rose-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.privacyTitle}</h5></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.privacy}</p>
        </article>
        <article className="m3s-raised p-4">
          <div className="flex items-center gap-2"><Landmark className="text-blue-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.responsibilitiesTitle}</h5></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.responsibilities}</p>
        </article>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-700 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-xs leading-5 text-slate-400">{t.source}</p>
        <button type="button" onClick={() => onNavigate('/finance?tab=architecture&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-initial-funding-pilot#finance-architecture-title')} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <ReceiptText size={16} aria-hidden="true" />{t.open}<ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default InstitutionalInitialFundingPilot;
