import React from 'react';
import { Boxes, Database, Network, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'Stock & Actifs · cadrage pilote',
    title: 'Savoir ce que 2SG possède, où cela se trouve et quel contrôle appliquer',
    subtitle: "Ce cadre métier relie l'inventaire, les actifs immobiliers, les responsabilités et les preuves sans inventer de qualification comptable ou juridique.",
    cards: [
      ['Finalité', "Inventorier, localiser et suivre l'état, la quantité, le coût et la valeur déclarée des biens utilisés ou détenus par 2SG."],
      ['Sources', 'stocks_actifs_propres porte l’inventaire ; les flux immobiliers validés alimentent le registre foncier ; la GED conserve les justificatifs.'],
      ['Responsabilités', "Opérations saisit et contrôle le terrain ; Finances confirme les montants ; Administration coordonne ; la GED conserve la preuve ; la gouvernance décide."],
      ['Frontières', "Cette vue ne remplace ni la comptabilité, ni un titre juridique, ni une expertise immobilière, ni la planification des travaux."]
    ],
    sourceNote: 'Statut : cadrage pilote · Les données existantes restent la source opérationnelle.'
  },
  EN: {
    eyebrow: 'Stock & Assets · pilot framing',
    title: 'Know what 2SG owns, where it is and which control applies',
    subtitle: 'This business frame connects inventory, real-estate assets, responsibilities and evidence without inventing an accounting or legal qualification.',
    cards: [
      ['Purpose', 'Inventory, locate and monitor the condition, quantity, cost and declared value of goods used or held by 2SG.'],
      ['Sources', 'stocks_actifs_propres carries the inventory; validated real-estate flows feed the land register; the DMS retains evidence.'],
      ['Responsibilities', 'Operations records and checks the field; Finance confirms amounts; Administration coordinates; the DMS retains evidence; Governance decides.'],
      ['Boundaries', 'This view does not replace accounting, legal title, a real-estate valuation or work planning.']
    ],
    sourceNote: 'Status: pilot framing · Existing data remains the operational source.'
  },
  DE: {
    eyebrow: 'Bestand & Aktiven · Pilotrahmen',
    title: 'Erkennen, was 2SG besitzt, wo es sich befindet und welche Kontrolle gilt',
    subtitle: 'Dieser Fachrahmen verbindet Inventar, Immobilienwerte, Verantwortungen und Nachweise, ohne eine buchhalterische oder rechtliche Einstufung zu erfinden.',
    cards: [
      ['Zweck', 'Güter, die 2SG nutzt oder hält, inventarisieren, lokalisieren und nach Zustand, Menge, Kosten und angegebenem Wert verfolgen.'],
      ['Quellen', 'stocks_actifs_propres führt das Inventar; validierte Immobilienflüsse speisen das Grundstücksregister; das DMS bewahrt Nachweise auf.'],
      ['Verantwortungen', 'Operations erfasst und prüft vor Ort; Finanzen bestätigt Beträge; Verwaltung koordiniert; das DMS bewahrt Nachweise; Governance entscheidet.'],
      ['Abgrenzung', 'Diese Ansicht ersetzt weder Buchhaltung noch Rechtstitel, Immobilienbewertung oder Arbeitsplanung.']
    ],
    sourceNote: 'Status: Pilotrahmen · Bestehende Daten bleiben die operative Quelle.'
  }
};

const ICONS = [Boxes, Database, Network, ShieldCheck];

const StockAssetsFrame = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section aria-labelledby="stock-assets-frame-title" className="m3s-design-scope mb-6">
      <div className="max-w-5xl">
        <p className="text-xs font-semibold uppercase" style={{ color: 'var(--m3s-row-accent)' }}>{t.eyebrow}</p>
        <h3 id="stock-assets-frame-title" className="m3s-section-title mt-2">{t.title}</h3>
        <p className="mt-2 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{t.subtitle}</p>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {t.cards.map(([label, body], index) => {
          const Icon = ICONS[index];
          return (
            <article key={label} className="m3s-panel p-4 transition hover:-translate-y-0.5 hover:border-sky-500/60">
              <div className="flex items-center gap-3">
                <span className="rounded-md p-2" style={{ background: 'color-mix(in srgb, var(--m3s-row-accent) 12%, transparent)', color: 'var(--m3s-row-accent)' }}><Icon size={18} aria-hidden="true" /></span>
                <h4 className="m3s-panel-title">{label}</h4>
              </div>
              <p className="mt-3 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{body}</p>
            </article>
          );
        })}
      </div>

      <p className="mt-3 border-l-2 pl-3 text-xs leading-5" style={{ borderColor: 'var(--m3s-row-accent)', color: 'var(--m3s-text-secondary)' }}>{t.sourceNote}</p>
    </section>
  );
};

export default StockAssetsFrame;
