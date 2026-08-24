import React from 'react';
import { ArrowRight, Ban, ClipboardCheck, Scale } from 'lucide-react';

const DOMAINS = [
  ['CNS-01', 'institutional-governance-compliance-consolidation-pilot'],
  ['CNS-02', 'institutional-processes-procedures-consolidation-pilot'],
  ['CNS-03', 'institutional-data-reference-systems-consolidation-pilot'],
  ['CNS-04', 'institutional-finance-controls-consolidation-pilot'],
  ['CNS-05', 'institutional-human-resources-capabilities-consolidation-pilot'],
  ['CNS-06', 'institutional-m3s-security-continuity-consolidation-pilot'],
  ['CNS-07', 'institutional-quality-lessons-consolidation-pilot'],
  ['CNS-08', 'institutional-reporting-consolidation-pilot']
];

const COPY = {
  FR: {
    title: 'Matrice des cadres validés',
    body: 'Une ligne de décision commune est désormais consignée pour chaque domaine. La validation porte sur les cadres de travail ; les inventaires détaillés, preuves réelles et règles de calcul restent à établir séparément.',
    domains: [
      'Gouvernance & conformité',
      'Processus & procédures',
      'Données & référentiels',
      'Finances & contrôles',
      'Ressources humaines & capacités',
      'M3S, sécurité & continuité',
      'Qualité & retours d’expérience',
      'Reporting institutionnel'
    ],
    published: 'Cadre validé',
    fields: ['Périmètre cible', 'Preuves recevables', 'Responsabilités', 'Règle de calcul'],
    values: ['Retenu', 'Retenues', 'Répartition retenue', 'Indisponible'],
    reserve: 'Réserve active : aucune mesure globale avant inventaires détaillés et règle de calcul distincte.',
    open: 'Ouvrir le cadrage'
  },
  EN: {
    title: 'Validated-framework matrix',
    body: 'A common decision line is now recorded for each domain. Validation applies to the working frameworks; detailed inventories, real evidence and calculation rules must still be established separately.',
    domains: [
      'Governance & compliance',
      'Processes & procedures',
      'Data & reference systems',
      'Finance & controls',
      'Human resources & capabilities',
      'M3S, security & continuity',
      'Quality & lessons learned',
      'Institutional reporting'
    ],
    published: 'Framework validated',
    fields: ['Target scope', 'Acceptable evidence', 'Responsibilities', 'Calculation rule'],
    values: ['Retained', 'Retained', 'Allocation retained', 'Unavailable'],
    reserve: 'Active reservation: no global measurement before detailed inventories and a separate calculation rule.',
    open: 'Open framework'
  },
  DE: {
    title: 'Matrix der validierten Arbeitsrahmen',
    body: 'Für jede Domäne ist nun eine gemeinsame Entscheidungszeile dokumentiert. Die Validierung betrifft die Arbeitsrahmen; Detailinventare, reale Nachweise und Berechnungsregeln sind weiterhin getrennt zu erstellen.',
    domains: [
      'Governance & Compliance',
      'Prozesse & Verfahren',
      'Daten & Referenzsysteme',
      'Finanzen & Kontrollen',
      'Personal & Kapazitäten',
      'M3S, Sicherheit & Kontinuität',
      'Qualität & Erfahrungsrückfluss',
      'Institutionelles Reporting'
    ],
    published: 'Arbeitsrahmen validiert',
    fields: ['Zielumfang', 'Zulässige Nachweise', 'Verantwortungen', 'Berechnungsregel'],
    values: ['Festgehalten', 'Festgehalten', 'Zuordnung festgehalten', 'Nicht verfügbar'],
    reserve: 'Aktiver Vorbehalt: keine Gesamtmessung vor Detailinventaren und einer getrennten Berechnungsregel.',
    open: 'Strukturierung öffnen'
  }
};

const InstitutionalConsolidationDecisionMatrix = ({ language = 'FR', onOpen }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section className="mt-5 border-t border-slate-700 pt-4" aria-labelledby="institutional-consolidation-decision-matrix-title">
      <div className="flex items-center gap-2">
        <Scale className="text-sky-300" size={18} aria-hidden="true" />
        <h5 id="institutional-consolidation-decision-matrix-title" className="text-sm font-semibold text-slate-100">{t.title}</h5>
      </div>
      <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-300">{t.body}</p>

      <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-2">
        {DOMAINS.map(([code, targetId], index) => (
          <article key={code} className="m3s-raised p-4" data-cns-code={code}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold text-sky-300">{code}</p>
                <h6 className="mt-1 text-sm font-semibold text-slate-100">{t.domains[index]}</h6>
              </div>
              <span className="inline-flex min-h-7 shrink-0 items-center self-start rounded-md border border-emerald-800/70 bg-emerald-950/25 px-2.5 py-1 text-xs font-semibold text-emerald-200">
                <ClipboardCheck className="mr-1.5" size={14} aria-hidden="true" />{t.published}
              </span>
            </div>

            <dl className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {t.fields.map((field, fieldIndex) => (
                <div key={field} className="rounded-md border border-slate-700 bg-slate-950/15 px-3 py-2">
                  <dt className="text-xs leading-4 text-slate-400">{field}</dt>
                  <dd className={`mt-1 text-sm font-semibold ${fieldIndex === 3 ? 'text-amber-200' : 'text-slate-100'}`}>{t.values[fieldIndex]}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-3 flex flex-col gap-3 border-t border-slate-700 pt-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex gap-2 text-xs leading-5 text-slate-400"><Ban className="mt-0.5 shrink-0 text-amber-300" size={14} aria-hidden="true" /><span>{t.reserve}</span></p>
              <button type="button" aria-label={`${t.open} ${code} · ${t.domains[index]}`} onClick={() => onOpen(targetId)} className="m3s-secondary-button min-h-11 shrink-0 px-3">
                {t.open}<ArrowRight className="ml-2" size={16} aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default InstitutionalConsolidationDecisionMatrix;
