import React from 'react';
import { Braces, CircleCheck, CircleDashed, EyeOff, FileWarning, ShieldCheck } from 'lucide-react';

const STATUS_META = {
  direct: {
    icon: CircleCheck,
    color: 'var(--m3s-status-success)'
  },
  derived: {
    icon: CircleDashed,
    color: 'var(--m3s-status-info)'
  },
  missing: {
    icon: FileWarning,
    color: 'var(--m3s-status-warning)'
  },
  sensitive: {
    icon: EyeOff,
    color: 'var(--m3s-status-danger)'
  }
};

const statusStyle = (status, backgroundStrength = 10) => ({
  color: STATUS_META[status].color,
  borderColor: `color-mix(in srgb, ${STATUS_META[status].color} 55%, transparent)`,
  background: `color-mix(in srgb, ${STATUS_META[status].color} ${backgroundStrength}%, var(--m3s-surface-panel))`
});

const MAPPING_ROWS = [
  {
    endpoint: '/finance/dashboard',
    observed: 'total_income_count · total_income · total_expense_count · total_expenses',
    target: 'Indicateurs agrégés, hors table transactionnelle',
    status: 'direct',
    owner: 'Finances',
    noteKey: 'aggregate'
  },
  {
    endpoint: '/finance/income · /finance/expenses',
    observed: 'id | source_id',
    target: 'id',
    status: 'direct',
    owner: 'IT & Support',
    noteKey: 'aliases'
  },
  {
    endpoint: '/finance/income · /finance/expenses',
    observed: 'ref | reference | numero_ref | source_ref | source_id',
    target: 'ref · source_ref',
    status: 'derived',
    owner: 'Finances + IT',
    noteKey: 'splitReference'
  },
  {
    endpoint: '/finance/income · /finance/expenses',
    observed: 'date_document | date_created | created_at | date',
    target: 'date_operation',
    status: 'derived',
    owner: 'Finances',
    noteKey: 'datePriority'
  },
  {
    endpoint: '/finance/income · /finance/expenses',
    observed: 'montant_origine | amount_original | montant | amount',
    target: 'montant_origine',
    status: 'derived',
    owner: 'Finances',
    noteKey: 'amountPriority'
  },
  {
    endpoint: '/finance/income · /finance/expenses',
    observed: 'devise_origine | devise | currency',
    target: 'devise_origine',
    status: 'derived',
    owner: 'Finances',
    noteKey: 'canonicalCurrency'
  },
  {
    endpoint: '/finance/income · /finance/expenses',
    observed: 'montant_chf · montant_cfa',
    target: 'montant_chf · montant_cfa',
    status: 'direct',
    owner: 'Finances',
    noteKey: 'storedAmounts'
  },
  {
    endpoint: '/finance/income · /finance/expenses',
    observed: 'taux_fx | taux | fx_rate',
    target: 'taux_applique',
    status: 'derived',
    owner: 'Finances',
    noteKey: 'legacyRate'
  },
  {
    endpoint: '/finance/income · /finance/expenses',
    observed: 'date_taux_fx | date_taux | date_updated | created_at',
    target: 'date_taux_applique',
    status: 'derived',
    owner: 'Finances',
    noteKey: 'rateDate'
  },
  {
    endpoint: '/finance/income · /finance/expenses',
    observed: 'source_taux_fx | source_taux | source',
    target: 'source_taux_applique',
    status: 'derived',
    owner: 'Finances',
    noteKey: 'rateSource'
  },
  {
    endpoint: '/finance/income · /finance/expenses',
    observed: 'categorie · agent · team · departement · phase_projet · fournisseur',
    target: 'categorie_id · agent_id · team_id · fonction_id · phase_id · fournisseur_id',
    status: 'missing',
    owner: 'Fonctions métier',
    noteKey: 'referentials'
  },
  {
    endpoint: '/fx-rates',
    observed: 'source_id | id · date_taux | date · devise_base | devise_from · devise_cible | devise_to · taux | rate · source_taux | source',
    target: 'fx_rate_id · date_taux · devise_base · devise_cible · taux · source',
    status: 'derived',
    owner: 'Finances + IT',
    noteKey: 'fxAliases'
  },
  {
    endpoint: '/finance/real-estate',
    observed: 'source_id · date_operation · designation · montants · taux_fx · statut',
    target: 'id · date_operation · description · montants · taux_applique · statut',
    status: 'derived',
    owner: 'Finances / Actifs',
    noteKey: 'realEstateCore'
  },
  {
    endpoint: '/finance/real-estate',
    observed: 'perimetre · projet · document_ref · agent · team · departement · phase_projet',
    target: 'dossier_id · projet_id · document_id · agent_id · team_id · fonction_id · phase_id',
    status: 'missing',
    owner: 'Finances + GED',
    noteKey: 'realEstateRelations'
  },
  {
    endpoint: '/finance/social · /finance/real-estate',
    observed: 'Champs bénéficiaires ou de répartition individuelle',
    target: 'Identifiants gouvernés, accès restreint',
    status: 'sensitive',
    owner: 'Gouvernance + métier',
    noteKey: 'sensitive'
  }
];

const COPY = {
  FR: {
    eyebrow: 'DICTIONNAIRE FINANCE · V0.1 · 16-08-2026',
    title: 'Cartographie source/API vers le standard M3S',
    intro: 'Cette cartographie part uniquement des contrats et normalisations observés dans le frontend. Elle prépare les décisions de migration sans modifier le backend, BigQuery ni les données.',
    legend: { direct: 'Direct', derived: 'À transformer', missing: 'Relation manquante', sensitive: 'Sensible' },
    summary: {
      direct: 'Champs déjà exploitables sous leur sens actuel',
      derived: 'Alias ou calcul à convertir vers un champ canonique',
      missing: 'Identifiant référentiel absent du contrat observé',
      sensitive: 'Champ à protéger et à exclure d’une exposition publique'
    },
    headers: ['Source/API', 'Champ observé', 'Champ standard cible', 'Qualification', 'Propriétaire', 'Décision V0.1'],
    notes: {
      aggregate: 'Conserver comme lecture globale ; ne pas fabriquer de lignes.',
      aliases: 'Choisir une clé source canonique avant migration.',
      splitReference: 'Séparer la référence M3S de la référence externe.',
      datePriority: 'Valider la priorité des dates avec Finances.',
      amountPriority: 'Interdire le repli ambigu entre montants et devises.',
      canonicalCurrency: 'Limiter les valeurs canoniques et contrôler les inconnues.',
      storedAmounts: 'Conserver les montants historiques sans recalcul silencieux.',
      legacyRate: 'Mapper le champ historique ; ne pas le supprimer.',
      rateDate: 'La date du taux appliqué doit devenir explicite.',
      rateSource: 'La source appliquée doit rester distincte de TFX.',
      referentials: 'Créer ou raccorder les référentiels avant remplacement des textes.',
      fxAliases: 'Conserver la série comme référence indépendante et datée.',
      realEstateCore: 'Aligner les noms sans charger de nouvelle donnée.',
      realEstateRelations: 'Remplacer les libellés par des clés après validation métier.',
      sensitive: 'Valeurs masquées dans cette vue ; droits et finalité à valider.'
    },
    governanceTitle: 'Gouvernance de la cartographie',
    governance: 'Finances valide le sens métier ; IT & Support contrôle les contrats et transformations ; la GED gouverne les preuves ; les membres fondateurs autorisent toute migration. Ce V0.1 est un relevé de correspondance, pas un schéma de production.',
    source: 'Sources contrôlées : src/api.js, src/Finance.js, DATA_MODEL_STANDARD_M3S.md. Périmètre : frontend m3s-frontend-v2, révision du 16-08-2026.'
  },
  EN: {
    eyebrow: 'FINANCE DICTIONARY · V0.1 · 2026-08-16',
    title: 'Source/API to M3S standard mapping',
    intro: 'This mapping is based only on contracts and normalizations observed in the frontend. It prepares migration decisions without changing the backend, BigQuery or data.',
    legend: { direct: 'Direct', derived: 'To transform', missing: 'Missing relationship', sensitive: 'Sensitive' },
    summary: {
      direct: 'Fields already usable with their current meaning',
      derived: 'Alias or calculation to convert to a canonical field',
      missing: 'Referential identifier absent from the observed contract',
      sensitive: 'Field to protect and exclude from public exposure'
    },
    headers: ['Source/API', 'Observed field', 'Target standard field', 'Qualification', 'Owner', 'V0.1 decision'],
    notes: {
      aggregate: 'Keep as a global reading; do not manufacture rows.',
      aliases: 'Select a canonical source key before migration.',
      splitReference: 'Separate the M3S reference from the external reference.',
      datePriority: 'Validate date precedence with Finance.',
      amountPriority: 'Disallow ambiguous fallback across amounts and currencies.',
      canonicalCurrency: 'Restrict canonical values and control unknown ones.',
      storedAmounts: 'Keep historical amounts without silent recalculation.',
      legacyRate: 'Map the legacy field; do not delete it.',
      rateDate: 'The applied-rate date must become explicit.',
      rateSource: 'The applied source must remain separate from TFX.',
      referentials: 'Create or connect referentials before replacing labels.',
      fxAliases: 'Keep the series as an independent dated reference.',
      realEstateCore: 'Align names without loading new data.',
      realEstateRelations: 'Replace labels with keys after business validation.',
      sensitive: 'Values hidden in this view; rights and purpose to validate.'
    },
    governanceTitle: 'Mapping governance',
    governance: 'Finance validates business meaning; IT & Support controls contracts and transformations; DMS governs evidence; founding members authorize any migration. This V0.1 is a correspondence register, not a production schema.',
    source: 'Controlled sources: src/api.js, src/Finance.js, DATA_MODEL_STANDARD_M3S.md. Scope: m3s-frontend-v2 frontend, revision dated 2026-08-16.'
  },
  DE: {
    eyebrow: 'FINANZ-DATENWÖRTERBUCH · V0.1 · 16.08.2026',
    title: 'Zuordnung von Quelle/API zum M3S-Standard',
    intro: 'Diese Zuordnung beruht ausschließlich auf im Frontend beobachteten Verträgen und Normalisierungen. Sie bereitet Migrationsentscheidungen vor, ohne Backend, BigQuery oder Daten zu ändern.',
    legend: { direct: 'Direkt', derived: 'Zu transformieren', missing: 'Fehlende Beziehung', sensitive: 'Sensibel' },
    summary: {
      direct: 'Felder, die mit ihrer heutigen Bedeutung nutzbar sind',
      derived: 'Alias oder Berechnung, die in ein kanonisches Feld zu überführen ist',
      missing: 'Im beobachteten Vertrag fehlende Referenzkennung',
      sensitive: 'Zu schützendes und nicht öffentlich anzuzeigendes Feld'
    },
    headers: ['Quelle/API', 'Beobachtetes Feld', 'Standard-Zielfeld', 'Qualifikation', 'Verantwortung', 'Entscheidung V0.1'],
    notes: {
      aggregate: 'Als Gesamtlesung behalten; keine Zeilen künstlich erzeugen.',
      aliases: 'Vor der Migration einen kanonischen Quellschlüssel wählen.',
      splitReference: 'M3S-Referenz und externe Referenz trennen.',
      datePriority: 'Priorität der Datumsfelder mit Finanzen validieren.',
      amountPriority: 'Mehrdeutige Rückfälle zwischen Beträgen und Währungen verhindern.',
      canonicalCurrency: 'Kanonische Werte begrenzen und unbekannte Werte prüfen.',
      storedAmounts: 'Historische Beträge ohne stille Neuberechnung bewahren.',
      legacyRate: 'Historisches Feld zuordnen, nicht löschen.',
      rateDate: 'Das Datum des angewandten Kurses muss ausdrücklich werden.',
      rateSource: 'Die angewandte Quelle muss von TFX getrennt bleiben.',
      referentials: 'Referenzen vor dem Ersetzen von Textwerten anbinden.',
      fxAliases: 'Reihe als unabhängige datierte Referenz bewahren.',
      realEstateCore: 'Namen angleichen, ohne neue Daten zu laden.',
      realEstateRelations: 'Bezeichnungen nach Fachvalidierung durch Schlüssel ersetzen.',
      sensitive: 'Werte in dieser Ansicht verborgen; Rechte und Zweck validieren.'
    },
    governanceTitle: 'Governance der Zuordnung',
    governance: 'Finanzen validiert die fachliche Bedeutung; IT & Support kontrolliert Verträge und Transformationen; das DMS verwaltet Nachweise; Gründungsmitglieder genehmigen jede Migration. V0.1 ist ein Zuordnungsregister, kein Produktionsschema.',
    source: 'Geprüfte Quellen: src/api.js, src/Finance.js, DATA_MODEL_STANDARD_M3S.md. Umfang: Frontend m3s-frontend-v2, Revision vom 16.08.2026.'
  }
};

const FinanceSourceStandardMapping = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const counts = MAPPING_ROWS.reduce((accumulator, row) => ({
    ...accumulator,
    [row.status]: (accumulator[row.status] || 0) + 1
  }), {});

  return (
    <section className="m3s-panel overflow-hidden" aria-labelledby="finance-source-mapping-title">
      <header className="p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase" style={{ color: 'var(--m3s-row-accent)' }}>{t.eyebrow}</p>
        <h4 id="finance-source-mapping-title" className="m3s-section-title mt-2 flex items-center gap-2">
          <Braces size={20} aria-hidden="true" />
          {t.title}
        </h4>
        <p className="mt-2 max-w-5xl text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{t.intro}</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {Object.keys(STATUS_META).map((status) => {
            const Icon = STATUS_META[status].icon;
            return (
              <div key={status} className="border p-3" style={statusStyle(status)}>
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-sm font-semibold"><Icon size={16} aria-hidden="true" />{t.legend[status]}</span>
                  <span className="text-lg font-semibold" aria-label={`${t.legend[status]}: ${counts[status] || 0}`}>{counts[status] || 0}</span>
                </div>
                <p className="mt-2 text-xs leading-5">{t.summary[status]}</p>
              </div>
            );
          })}
        </div>
      </header>

      <div className="overflow-x-auto border-y" style={{ borderColor: 'var(--m3s-border)' }}>
        <table className="w-full min-w-[1180px] text-left text-sm">
          <thead style={{ background: 'var(--m3s-surface-raised)', color: 'var(--m3s-text-secondary)' }}>
            <tr>{t.headers.map((header) => <th key={header} className="px-4 py-3 text-xs uppercase">{header}</th>)}</tr>
          </thead>
          <tbody>
            {MAPPING_ROWS.map((row) => {
              const StatusIcon = STATUS_META[row.status].icon;
              return (
                <tr key={`${row.endpoint}-${row.observed}`} className="border-t align-top transition hover:bg-blue-500/5" style={{ borderColor: 'var(--m3s-border)' }}>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--m3s-row-accent)' }}>{row.endpoint}</td>
                  <td className="px-4 py-3 font-mono text-xs leading-5" style={{ color: 'var(--m3s-text-secondary)' }}>{row.observed}</td>
                  <td className="px-4 py-3 font-mono text-xs leading-5" style={{ color: 'var(--m3s-text-primary)' }}>{row.target}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 border px-2 py-1 text-xs font-semibold" style={statusStyle(row.status, 7)}>
                      <StatusIcon size={14} aria-hidden="true" />{t.legend[row.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold" style={{ color: 'var(--m3s-text-secondary)' }}>{row.owner}</td>
                  <td className="px-4 py-3 text-xs leading-5" style={{ color: 'var(--m3s-text-secondary)' }}>{t.notes[row.noteKey]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <aside className="p-4 sm:p-5" aria-label={t.governanceTitle}>
        <h5 className="m3s-panel-title flex items-center gap-2"><ShieldCheck size={18} aria-hidden="true" />{t.governanceTitle}</h5>
        <p className="mt-2 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{t.governance}</p>
        <p className="mt-3 border-l-2 pl-3 text-xs leading-5" style={{ borderColor: 'var(--m3s-row-accent)', color: 'var(--m3s-text-secondary)' }}>{t.source}</p>
      </aside>
    </section>
  );
};

export default FinanceSourceStandardMapping;
