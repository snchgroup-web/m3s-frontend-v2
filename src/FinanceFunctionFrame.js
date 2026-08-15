import React from 'react';
import { Database, Network, ShieldCheck, WalletCards } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'Finances · cadrage fonctionnel V1',
    title: 'Tracer les ressources, les engagements et les preuves financières',
    subtitle: 'Ce cadre relie les mouvements financiers, les taux appliqués, les responsabilités et les justificatifs sans transformer le module en comptabilité certifiée.',
    cards: [
      ['Finalité', 'Enregistrer, rapprocher et expliquer les recettes, dépenses, financements, remboursements et flux sociaux de 2SG.'],
      ['Sources opérationnelles', 'BigQuery via les API Finance porte les écritures ; /finance/dashboard fournit les agrégats globaux ; la GED conserve les justificatifs.'],
      ['Responsabilités', 'Finances vérifie les montants, affectations et rapprochements ; les fonctions métier fournissent le fait et la preuve ; la Gouvernance autorise les engagements.'],
      ['Frontières', 'Cette vue ne remplace ni la comptabilité certifiée, ni un relevé bancaire, ni une déclaration fiscale, ni une validation juridique.']
    ],
    readingTitle: 'Règles de lecture déjà appliquées',
    readingRules: [
      'Les agrégats globaux et les extraits de registres restent distingués.',
      'Un zéro réel reste zéro ; une source vide, invalide ou indisponible reste indisponible.',
      'Une opération historique conserve son taux réellement appliqué, sa date et sa source ; le taux courant ne le remplace pas.'
    ],
    sourceNote: 'Sources de cadrage : Document Directeur Global 2SG V4, briefing Administration pilote et contrats API Finance observés. Statut : cadrage fonctionnel en lecture seule.'
  },
  EN: {
    eyebrow: 'Finance · functional framing V1',
    title: 'Trace resources, commitments and financial evidence',
    subtitle: 'This frame connects financial movements, applied rates, responsibilities and supporting evidence without presenting the module as certified accounting.',
    cards: [
      ['Purpose', 'Record, reconcile and explain 2SG revenue, expenses, funding, reimbursements and social flows.'],
      ['Operational sources', 'BigQuery through the Finance APIs carries entries; /finance/dashboard provides global aggregates; the DMS retains supporting evidence.'],
      ['Responsibilities', 'Finance checks amounts, allocations and reconciliations; business functions provide the fact and evidence; Governance authorizes commitments.'],
      ['Boundaries', 'This view replaces neither certified accounting, a bank statement, a tax return nor legal validation.']
    ],
    readingTitle: 'Reading rules already applied',
    readingRules: [
      'Global aggregates and register extracts remain distinct.',
      'A real zero remains zero; an empty, invalid or unavailable source remains unavailable.',
      'A historical operation retains its actual applied rate, date and source; the current rate does not replace it.'
    ],
    sourceNote: 'Framing sources: 2SG Global Director Document V4, Administration pilot briefing and observed Finance API contracts. Status: read-only functional framing.'
  },
  DE: {
    eyebrow: 'Finanzen · funktionaler Rahmen V1',
    title: 'Ressourcen, Verpflichtungen und Finanznachweise nachvollziehen',
    subtitle: 'Dieser Rahmen verbindet Finanzbewegungen, angewandte Kurse, Verantwortungen und Belege, ohne das Modul als zertifizierte Buchhaltung darzustellen.',
    cards: [
      ['Zweck', 'Einnahmen, Ausgaben, Finanzierungen, Rückzahlungen und soziale Flüsse von 2SG erfassen, abstimmen und erklären.'],
      ['Operative Quellen', 'BigQuery führt die Buchungen über die Finanz-APIs; /finance/dashboard liefert globale Aggregate; das DMS bewahrt Belege auf.'],
      ['Verantwortungen', 'Finanzen prüft Beträge, Zuordnungen und Abstimmungen; Fachfunktionen liefern Sachverhalt und Nachweis; Governance genehmigt Verpflichtungen.'],
      ['Abgrenzung', 'Diese Ansicht ersetzt weder zertifizierte Buchhaltung noch Kontoauszug, Steuererklärung oder rechtliche Prüfung.']
    ],
    readingTitle: 'Bereits angewandte Leseregeln',
    readingRules: [
      'Globale Aggregate und Registerauszüge bleiben getrennt.',
      'Eine echte Null bleibt null; eine leere, ungültige oder nicht verfügbare Quelle bleibt nicht verfügbar.',
      'Ein historischer Vorgang behält den tatsächlich angewandten Kurs, sein Datum und seine Quelle; der aktuelle Kurs ersetzt ihn nicht.'
    ],
    sourceNote: 'Rahmenquellen: Globales 2SG-Leitdokument V4, Briefing zum Verwaltungspiloten und beobachtete Finanz-API-Verträge. Status: funktionaler Rahmen im Lesemodus.'
  }
};

const CARD_ICONS = [WalletCards, Database, Network, ShieldCheck];

const FinanceFunctionFrame = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section aria-labelledby="finance-function-frame-title" className="m3s-design-scope mb-6">
      <div className="max-w-5xl">
        <p className="text-xs font-semibold uppercase" style={{ color: 'var(--m3s-row-accent)' }}>{t.eyebrow}</p>
        <h3 id="finance-function-frame-title" className="m3s-section-title mt-2">{t.title}</h3>
        <p className="mt-2 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{t.subtitle}</p>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {t.cards.map(([label, body], index) => {
          const Icon = CARD_ICONS[index];
          return (
            <article key={label} className="m3s-panel p-4 transition hover:-translate-y-0.5 hover:border-emerald-500/60">
              <div className="flex items-center gap-3">
                <span className="rounded-md p-2" style={{ background: 'color-mix(in srgb, var(--m3s-row-accent) 12%, transparent)', color: 'var(--m3s-row-accent)' }}>
                  <Icon size={18} aria-hidden="true" />
                </span>
                <h4 className="m3s-panel-title">{label}</h4>
              </div>
              <p className="mt-3 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{body}</p>
            </article>
          );
        })}
      </div>

      <div className="m3s-panel mt-4 p-4">
        <h4 className="m3s-panel-title">{t.readingTitle}</h4>
        <ol className="mt-3 grid gap-3 lg:grid-cols-3">
          {t.readingRules.map((rule, index) => (
            <li key={rule} className="flex gap-3 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-semibold" style={{ background: 'color-mix(in srgb, var(--m3s-row-accent) 12%, transparent)', color: 'var(--m3s-row-accent)' }}>
                {index + 1}
              </span>
              <span>{rule}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-3 border-l-2 pl-3 text-xs leading-5" style={{ borderColor: 'var(--m3s-row-accent)', color: 'var(--m3s-text-secondary)' }}>{t.sourceNote}</p>
    </section>
  );
};

export default FinanceFunctionFrame;
