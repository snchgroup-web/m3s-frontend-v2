import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Database,
  GitMerge,
  ListChecks
} from 'lucide-react';

const STATUS_STYLES = {
  observed: 'border-emerald-700/70 bg-emerald-950/25 text-emerald-200',
  partial: 'border-amber-700/70 bg-amber-950/25 text-amber-100',
  distributed: 'border-rose-700/70 bg-rose-950/20 text-rose-100'
};

const COPY = {
  FR: {
    eyebrow: 'INVENTAIRE INITIAL · V0.1 · 25-08-2026',
    title: 'Onze familles de référentiels à consolider',
    body: 'Ce relevé transforme le périmètre CNS-03 validé en liste de contrôle exploitable. Il décrit uniquement les supports visibles dans M3S et leur état de raccordement ; il ne désigne aucune source maîtresse et ne conclut ni à la qualité, ni à la complétude des données.',
    counters: [
      ['Familles cadrées', '11', 'Périmètre CNS-03 validé'],
      ['Sources maîtresses désignées', '0', 'Arbitrage distinct requis'],
      ['Contrôles ouverts', '11', 'Un contrôle suivant par famille']
    ],
    columns: {
      id: 'ID',
      family: 'Famille de référentiel',
      support: 'Support observé ou candidat',
      status: 'État du raccordement',
      next: 'Contrôle suivant'
    },
    statuses: {
      observed: 'Support observé',
      partial: 'Raccordement partiel',
      distributed: 'Sources dispersées'
    },
    rows: [
      ['REF-01', 'Personnes et équipes', 'RH-001 · annuaire actif et sélecteurs Team/Agent observés', 'partial', 'Confirmer identifiant stable, propriétaire RH, cycle de vie et règles de collectif.'],
      ['REF-02', 'Rôles et droits', 'M3S · comptes authentifiés et contrôles de route observés', 'partial', 'Inventorier rôles, permissions, délégations, exceptions et validateur de chaque droit.'],
      ['REF-03', 'Parties prenantes', 'CRM, Fournisseurs, Donateurs et Bénéficiaires · registres séparés', 'distributed', 'Définir l’identité commune, les rôles cumulables, le dédoublonnage et la sensibilité.'],
      ['REF-04', 'Portefeuilles', 'Administration · Portefeuille des grands dossiers', 'observed', 'Versionner identifiant, propriétaire, cycle de vie, critères d’entrée et de clôture.'],
      ['REF-05', 'Dossiers', 'Administration · portefeuille et dossiers métier', 'partial', 'Arbitrer typologie, lien obligatoire au portefeuille, responsable et preuve de clôture.'],
      ['REF-06', 'Projets', 'Administration · Planification & Projets et registre des tâches', 'partial', 'Confirmer les liens Dossier–Projet–Phase–Tâche, identifiants et cardinalités.'],
      ['REF-07', 'Produits et services', 'Production et Stock & Actifs · registres distincts', 'distributed', 'Séparer produit, service, commande, fournisseur et mouvement sans fusion automatique.'],
      ['REF-08', 'Catégories financières', 'Finances · Recettes, Dépenses, Social et Fin Immo', 'distributed', 'Établir dictionnaire contrôlé, règle d’affectation, propriétaire et historique.'],
      ['REF-09', 'Devises et taux', 'Finances · écritures CHF/CFA et Historique FX', 'observed', 'Distinguer taux de référence, taux appliqué, date, source et règle de conversion.'],
      ['REF-10', 'Documents et preuves', 'IT & Support · GED, dossiers et archives', 'observed', 'Confirmer identifiant GED, version, autorité, sensibilité, conservation et liens prouvés.'],
      ['REF-11', 'Lieux et actifs', 'Stock & Actifs · Inventaire, Immobilisations et Risques', 'partial', 'Définir identifiants de lieu et d’actif, propriété, localisation, état et qualification.']
    ],
    legend: 'Lecture des statuts',
    legendItems: [
      ['observed', 'Support observé : une vue ou un registre existe, sans présumer son autorité.'],
      ['partial', 'Raccordement partiel : une partie des objets ou relations est visible.'],
      ['distributed', 'Sources dispersées : plusieurs registres portent des fragments à rapprocher.']
    ],
    boundary: 'Limite de ce lot : aucun export complet, schéma sensible, donnée personnelle réelle ou modification de base n’est publié. Les propriétaires, identifiants, cardinalités et règles restent à valider famille par famille.'
  },
  EN: {
    eyebrow: 'INITIAL INVENTORY · V0.1 · 25 AUG 2026',
    title: 'Eleven reference-system families to consolidate',
    body: 'This register turns the validated CNS-03 scope into an actionable checklist. It only describes the supports visible in M3S and their connection state; it designates no master source and draws no conclusion about data quality or completeness.',
    counters: [
      ['Framed families', '11', 'Validated CNS-03 scope'],
      ['Designated master sources', '0', 'Separate decision required'],
      ['Open controls', '11', 'One next control per family']
    ],
    columns: {
      id: 'ID',
      family: 'Reference-system family',
      support: 'Observed or candidate support',
      status: 'Connection state',
      next: 'Next control'
    },
    statuses: {
      observed: 'Observed support',
      partial: 'Partial connection',
      distributed: 'Distributed sources'
    },
    rows: [
      ['REF-01', 'People and teams', 'RH-001 · active directory and observed Team/Agent selectors', 'partial', 'Confirm stable identifier, HR owner, lifecycle and collective rules.'],
      ['REF-02', 'Roles and rights', 'M3S · authenticated accounts and observed route controls', 'partial', 'Inventory roles, permissions, delegations, exceptions and validator for each right.'],
      ['REF-03', 'Stakeholders', 'CRM, Suppliers, Donors and Beneficiaries · separate registers', 'distributed', 'Define shared identity, cumulative roles, deduplication and sensitivity.'],
      ['REF-04', 'Portfolios', 'Administration · Major-file portfolio', 'observed', 'Version the identifier, owner, lifecycle, entry criteria and closure criteria.'],
      ['REF-05', 'Files', 'Administration · portfolio and business files', 'partial', 'Decide typology, mandatory portfolio link, responsible party and closure evidence.'],
      ['REF-06', 'Projects', 'Administration · Planning & Projects and task register', 'partial', 'Confirm File–Project–Phase–Task links, identifiers and cardinalities.'],
      ['REF-07', 'Products and services', 'Production and Stock & Assets · separate registers', 'distributed', 'Separate product, service, order, supplier and movement without automatic merging.'],
      ['REF-08', 'Financial categories', 'Finance · Income, Expenses, Social and Real-estate finance', 'distributed', 'Establish controlled dictionary, assignment rule, owner and history.'],
      ['REF-09', 'Currencies and rates', 'Finance · CHF/CFA entries and FX History', 'observed', 'Distinguish reference rate, applied rate, date, source and conversion rule.'],
      ['REF-10', 'Documents and evidence', 'IT & Support · DMS, folders and archives', 'observed', 'Confirm DMS identifier, version, authority, sensitivity, retention and evidenced links.'],
      ['REF-11', 'Locations and assets', 'Stock & Assets · Inventory, Fixed assets and Risks', 'partial', 'Define location and asset identifiers, ownership, location, condition and classification.']
    ],
    legend: 'Status guide',
    legendItems: [
      ['observed', 'Observed support: a view or register exists without presuming its authority.'],
      ['partial', 'Partial connection: some objects or relationships are visible.'],
      ['distributed', 'Distributed sources: several registers hold fragments that need reconciliation.']
    ],
    boundary: 'This lot publishes no full export, sensitive schema, real personal data or database change. Owners, identifiers, cardinalities and rules remain to be validated family by family.'
  },
  DE: {
    eyebrow: 'ERSTINVENTAR · V0.1 · 25.08.2026',
    title: 'Elf zu konsolidierende Referenzsystem-Familien',
    body: 'Dieses Register überführt den validierten CNS-03-Umfang in eine nutzbare Prüfliste. Es beschreibt nur die in M3S sichtbaren Träger und ihren Verknüpfungsstand; es bezeichnet keine Masterquelle und trifft keine Aussage über Datenqualität oder Vollständigkeit.',
    counters: [
      ['Strukturierte Familien', '11', 'Validierter CNS-03-Umfang'],
      ['Bezeichnete Masterquellen', '0', 'Getrennter Entscheid erforderlich'],
      ['Offene Kontrollen', '11', 'Eine nächste Kontrolle je Familie']
    ],
    columns: {
      id: 'ID',
      family: 'Referenzsystem-Familie',
      support: 'Beobachteter oder vorgeschlagener Träger',
      status: 'Verknüpfungsstand',
      next: 'Nächste Kontrolle'
    },
    statuses: {
      observed: 'Träger beobachtet',
      partial: 'Teilweise verknüpft',
      distributed: 'Verteilte Quellen'
    },
    rows: [
      ['REF-01', 'Personen und Teams', 'RH-001 · aktives Verzeichnis und beobachtete Team-/Agent-Auswahl', 'partial', 'Stabile Kennung, HR-Verantwortung, Lebenszyklus und Kollektivregeln bestätigen.'],
      ['REF-02', 'Rollen und Rechte', 'M3S · authentifizierte Konten und beobachtete Routenkontrollen', 'partial', 'Rollen, Berechtigungen, Delegationen, Ausnahmen und Validator je Recht inventarisieren.'],
      ['REF-03', 'Beteiligte', 'CRM, Lieferanten, Spender und Begünstigte · getrennte Register', 'distributed', 'Gemeinsame Identität, kumulierbare Rollen, Dublettenprüfung und Sensibilität definieren.'],
      ['REF-04', 'Portfolios', 'Administration · Portfolio der wichtigen Dossiers', 'observed', 'Kennung, Verantwortung, Lebenszyklus sowie Aufnahme- und Abschlusskriterien versionieren.'],
      ['REF-05', 'Dossiers', 'Administration · Portfolio und Fachdossiers', 'partial', 'Typologie, Pflichtbezug zum Portfolio, Verantwortung und Abschlussnachweis entscheiden.'],
      ['REF-06', 'Projekte', 'Administration · Planung & Projekte und Aufgabenregister', 'partial', 'Beziehungen Dossier–Projekt–Phase–Aufgabe, Kennungen und Kardinalitäten bestätigen.'],
      ['REF-07', 'Produkte und Leistungen', 'Produktion und Bestand & Anlagen · getrennte Register', 'distributed', 'Produkt, Leistung, Bestellung, Lieferant und Bewegung ohne automatische Fusion trennen.'],
      ['REF-08', 'Finanzkategorien', 'Finanzen · Einnahmen, Ausgaben, Soziales und Immobilienfinanzierung', 'distributed', 'Kontrolliertes Wörterbuch, Zuordnungsregel, Verantwortung und Historie festlegen.'],
      ['REF-09', 'Währungen und Kurse', 'Finanzen · CHF/CFA-Buchungen und FX-Historie', 'observed', 'Referenzkurs, angewandten Kurs, Datum, Quelle und Umrechnungsregel unterscheiden.'],
      ['REF-10', 'Dokumente und Nachweise', 'IT & Support · GED, Ordner und Archive', 'observed', 'GED-Kennung, Version, Autorität, Sensibilität, Aufbewahrung und belegte Links bestätigen.'],
      ['REF-11', 'Orte und Anlagen', 'Bestand & Anlagen · Inventar, Anlagevermögen und Risiken', 'partial', 'Orts- und Anlagenkennungen, Eigentum, Standort, Zustand und Klassifikation definieren.']
    ],
    legend: 'Statuslesung',
    legendItems: [
      ['observed', 'Träger beobachtet: Eine Ansicht oder ein Register besteht, ohne Autorität vorauszusetzen.'],
      ['partial', 'Teilweise verknüpft: Ein Teil der Objekte oder Beziehungen ist sichtbar.'],
      ['distributed', 'Verteilte Quellen: Mehrere Register enthalten abzugleichende Fragmente.']
    ],
    boundary: 'Dieses Los veröffentlicht weder vollständige Exporte noch sensible Schemata, reale Personendaten oder Datenbankänderungen. Verantwortungen, Kennungen, Kardinalitäten und Regeln bleiben je Familie zu validieren.'
  }
};

const StatusBadge = ({ status, label }) => (
  <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}>
    {label}
  </span>
);

const InstitutionalDataReferenceInventory = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section className="mt-4 rounded-md border border-violet-800/70 bg-violet-950/10 p-4" aria-labelledby="institutional-data-reference-inventory-title">
      <p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p>
      <h5 id="institutional-data-reference-inventory-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h5>
      <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-300">{t.body}</p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {t.counters.map(([label, value, note], index) => {
          const Icon = [Database, CheckCircle2, ListChecks][index];
          return (
            <article key={label} className="m3s-raised min-h-28 p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-slate-300">{label}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p>
                </div>
                <Icon className={index === 1 ? 'text-amber-300' : 'text-violet-300'} size={19} aria-hidden="true" />
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-400">{note}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-4 hidden overflow-x-auto rounded-md border border-slate-700 md:block">
        <table className="w-full min-w-[960px] border-collapse text-left text-sm">
          <thead className="m3s-cns03-inventory-head bg-slate-900/70 text-xs uppercase text-slate-300">
            <tr>
              <th className="px-3 py-3 font-semibold">{t.columns.id}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.family}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.support}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.status}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.next}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700 bg-slate-950/15">
            {t.rows.map(([id, family, support, status, next]) => (
              <tr key={id} className="align-top">
                <td className="whitespace-nowrap px-3 py-3 font-semibold text-violet-200">{id}</td>
                <th scope="row" className="px-3 py-3 font-semibold text-slate-100">{family}</th>
                <td className="px-3 py-3 leading-5 text-slate-300">{support}</td>
                <td className="px-3 py-3"><StatusBadge status={status} label={t.statuses[status]} /></td>
                <td className="px-3 py-3 leading-5 text-slate-300">{next}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:hidden">
        {t.rows.map(([id, family, support, status, next]) => (
          <article key={id} className="m3s-raised p-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-xs font-semibold text-violet-300">{id}</p>
                <h6 className="mt-1 text-sm font-semibold text-slate-100">{family}</h6>
              </div>
              <StatusBadge status={status} label={t.statuses[status]} />
            </div>
            <p className="mt-3 text-sm leading-5 text-slate-300">{support}</p>
            <p className="mt-3 border-t border-slate-700 pt-3 text-xs leading-5 text-slate-400">{next}</p>
          </article>
        ))}
      </div>

      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/20 p-3">
        <div className="flex items-center gap-2"><GitMerge className="text-violet-300" size={18} aria-hidden="true" /><h6 className="text-sm font-semibold text-slate-100">{t.legend}</h6></div>
        <ul className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-3">
          {t.legendItems.map(([status, explanation]) => (
            <li key={status} className="rounded-md border border-slate-700 p-3">
              <StatusBadge status={status} label={t.statuses[status]} />
              <p className="mt-2 text-xs leading-5 text-slate-400">{explanation}</p>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 flex items-start gap-2 border-t border-slate-700 pt-4 text-xs leading-5 text-slate-400"><AlertTriangle className="mt-0.5 shrink-0 text-amber-300" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalDataReferenceInventory;
