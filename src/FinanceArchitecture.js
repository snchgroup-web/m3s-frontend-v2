import React from 'react';
import { ArrowRight, Boxes, CircleAlert, Database, FileCheck2, Link2, Network } from 'lucide-react';
import GlossaryHelp from './GlossaryHelp';

const OBJECT_TERM_IDS = [
  'FIN-ECRITURE-FINANCIERE',
  'FIN-TAUX-CHANGE-APPLIQUE',
  null,
  null
];

const RELATION_TERM_IDS = [
  'FIN-AGREGAT-GLOBAL',
  'FIN-EXTRAIT-CHARGE',
  null,
  null,
  null
];

const COPY = {
  FR: {
    eyebrow: 'FINANCES · ARCHITECTURE OBSERVÉE V1',
    title: 'Voir les objets, les sources et leurs réutilisations',
    intro: 'Cette vue décrit uniquement les contrats API, champs et consommations visibles dans M3S. Elle ne transforme pas les libellés actuels en relations de base de données.',
    observed: 'Observé',
    candidate: 'À confirmer',
    chainTitle: 'Chaîne de données observée',
    chain: [
      ['Sources', 'BigQuery et sources métier'],
      ['Services', 'API /finance/* et /fx-rates'],
      ['Lecture', 'Normalisation dans le module Finances'],
      ['Réutilisation', 'Vues Finance et modules consommateurs']
    ],
    objectsTitle: 'Objets et champs actuellement visibles',
    objects: [
      ['Écriture financière', 'Recette ou dépense', 'Identifiant, référence, description, date, montant et devise d’origine, montants CHF/CFA, taux appliqué, catégorie, agent, équipe, département, phase projet, pays, fournisseur et commentaire.'],
      ['Taux de change', 'Historique FX', 'Date, devise de base, devise cible, taux et source. Le taux courant sert à la lecture présente ; il ne remplace pas le taux historique d’une opération.'],
      ['Flux social', 'Vue spécialisée', 'Écriture financière reclassée avec nature sociale et bénéficiaire, consommée par Finances et par le CRM.'],
      ['Finance immobilière', 'Vue spécialisée', 'Opération rattachée à un périmètre, un projet, un statut et une référence documentaire, également lue par Stock & Actifs.']
    ],
    relationsTitle: 'Relations transversales déjà utilisées',
    relationHeaders: ['Source', 'Lecture locale', 'Réutilisation', 'État'],
    relations: [
      ['/finance/dashboard', 'Indicateurs globaux Finances', 'Tableau de bord global', 'Agrégat'],
      ['/finance/income · /finance/expenses', 'Registres Recettes et Dépenses', 'Tableau de bord ; Dépenses vers Fournisseurs Production', 'Extrait chargé'],
      ['/finance/social', 'Finance · Social', 'Commercial & CRM', 'Extrait spécialisé'],
      ['/finance/real-estate', 'Financement immobilier', 'Stock & Actifs', 'Extrait spécialisé'],
      ['/fx-rates', 'Historique et convertisseur FX', 'En-tête et tableau de bord', 'Série datée']
    ],
    gapsTitle: 'Relations encore non prouvées',
    gapsIntro: 'Ces écarts sont des candidats pour le futur modèle de données. Ils ne sont pas des anomalies corrigées dans ce lot.',
    gaps: [
      '`phase_projet` est aujourd’hui un libellé, sans relation observée vers un projet ou une phase gouvernée.',
      '`agent`, `team` et `fournisseur` sont des valeurs textuelles ; aucune clé référentielle commune n’est prouvée.',
      'Les écritures génériques ne portent pas encore de référence GED homogène, contrairement à certains objets immobiliers.',
      'Aucun lien `task_id`, `project_id`, `asset_id` ou `ged_document_id` n’est observé dans le payload courant.'
    ],
    evidenceTitle: 'Règle de preuve',
    evidence: 'La GED conserve les justificatifs et versions. Une future relation technique devra pointer vers un identifiant documentaire gouverné ; un simple nom de fichier ne suffira pas.',
    source: 'Sources : contrats frontend API Finance, payloads d’écriture observés et consommations M3S de Tableau de bord, Production, CRM et Stock & Actifs. Lecture seule ; aucune migration de données.'
  },
  EN: {
    eyebrow: 'FINANCE · OBSERVED ARCHITECTURE V1',
    title: 'See objects, sources and their reuse',
    intro: 'This view describes only API contracts, fields and consumptions visible in M3S. It does not turn current labels into database relationships.',
    observed: 'Observed',
    candidate: 'To confirm',
    chainTitle: 'Observed data chain',
    chain: [
      ['Sources', 'BigQuery and business sources'],
      ['Services', '/finance/* and /fx-rates APIs'],
      ['Reading', 'Normalization in the Finance module'],
      ['Reuse', 'Finance views and consuming modules']
    ],
    objectsTitle: 'Objects and fields currently visible',
    objects: [
      ['Financial entry', 'Revenue or expense', 'Identifier, reference, description, date, original amount and currency, CHF/CFA amounts, applied rate, category, agent, team, department, project phase, country, supplier and comment.'],
      ['Exchange rate', 'FX history', 'Date, base currency, target currency, rate and source. The current rate supports present reading; it does not replace an operation’s historical rate.'],
      ['Social flow', 'Specialized view', 'Reclassified financial entry with social nature and beneficiary, consumed by Finance and CRM.'],
      ['Real-estate finance', 'Specialized view', 'Operation linked to a scope, project, status and document reference, also read by Stock & Assets.']
    ],
    relationsTitle: 'Cross-functional relations already used',
    relationHeaders: ['Source', 'Local reading', 'Reuse', 'State'],
    relations: [
      ['/finance/dashboard', 'Global Finance indicators', 'Global dashboard', 'Aggregate'],
      ['/finance/income · /finance/expenses', 'Revenue and Expense registers', 'Dashboard; Expenses feed Production Suppliers', 'Loaded extract'],
      ['/finance/social', 'Finance · Social', 'Commercial & CRM', 'Specialized extract'],
      ['/finance/real-estate', 'Real-estate finance', 'Stock & Assets', 'Specialized extract'],
      ['/fx-rates', 'FX history and converter', 'Header and dashboard', 'Dated series']
    ],
    gapsTitle: 'Relationships not yet proven',
    gapsIntro: 'These gaps are candidates for the future data model. They are not defects fixed in this lot.',
    gaps: [
      '`phase_projet` is currently a label, with no observed relationship to a governed project or phase.',
      '`agent`, `team` and `fournisseur` are text values; no shared referential key is proven.',
      'Generic entries do not yet carry a consistent DMS reference, unlike some real-estate objects.',
      'No `task_id`, `project_id`, `asset_id` or `ged_document_id` link is observed in the current payload.'
    ],
    evidenceTitle: 'Evidence rule',
    evidence: 'The DMS retains evidence and versions. A future technical relationship must point to a governed document identifier; a file name alone will not be sufficient.',
    source: 'Sources: Finance frontend API contracts, observed entry payloads and M3S consumptions by Dashboard, Production, CRM and Stock & Assets. Read-only; no data migration.'
  },
  DE: {
    eyebrow: 'FINANZEN · BEOBACHTETE ARCHITEKTUR V1',
    title: 'Objekte, Quellen und ihre Wiederverwendung sichtbar machen',
    intro: 'Diese Ansicht beschreibt nur API-Verträge, Felder und Nutzungen, die in M3S sichtbar sind. Aktuelle Bezeichnungen werden dadurch nicht zu Datenbankbeziehungen.',
    observed: 'Beobachtet',
    candidate: 'Zu bestätigen',
    chainTitle: 'Beobachtete Datenkette',
    chain: [
      ['Quellen', 'BigQuery und Fachquellen'],
      ['Dienste', 'APIs /finance/* und /fx-rates'],
      ['Lesung', 'Normalisierung im Finanzmodul'],
      ['Wiederverwendung', 'Finanzansichten und nutzende Module']
    ],
    objectsTitle: 'Derzeit sichtbare Objekte und Felder',
    objects: [
      ['Finanzbuchung', 'Einnahme oder Ausgabe', 'Kennung, Referenz, Beschreibung, Datum, Ursprungsbetrag und -währung, CHF-/CFA-Beträge, angewandter Kurs, Kategorie, Agent, Team, Abteilung, Projektphase, Land, Lieferant und Kommentar.'],
      ['Wechselkurs', 'FX-Historie', 'Datum, Basiswährung, Zielwährung, Kurs und Quelle. Der aktuelle Kurs dient der heutigen Lesung; er ersetzt nicht den historischen Kurs eines Vorgangs.'],
      ['Sozialer Fluss', 'Spezialisierte Ansicht', 'Neu klassifizierte Finanzbuchung mit sozialer Art und begünstigter Person, genutzt von Finanzen und CRM.'],
      ['Immobilienfinanzen', 'Spezialisierte Ansicht', 'Vorgang mit Umfang, Projekt, Status und Dokumentreferenz, der auch von Anlagen & Vermögenswerte gelesen wird.']
    ],
    relationsTitle: 'Bereits genutzte funktionsübergreifende Beziehungen',
    relationHeaders: ['Quelle', 'Lokale Lesung', 'Wiederverwendung', 'Status'],
    relations: [
      ['/finance/dashboard', 'Globale Finanzindikatoren', 'Globales Dashboard', 'Aggregat'],
      ['/finance/income · /finance/expenses', 'Register Einnahmen und Ausgaben', 'Dashboard; Ausgaben versorgen Lieferanten in Produktion', 'Geladener Auszug'],
      ['/finance/social', 'Finanzen · Sozial', 'Vertrieb & CRM', 'Spezialauszug'],
      ['/finance/real-estate', 'Immobilienfinanzen', 'Anlagen & Vermögenswerte', 'Spezialauszug'],
      ['/fx-rates', 'FX-Historie und Umrechner', 'Kopfzeile und Dashboard', 'Datierte Reihe']
    ],
    gapsTitle: 'Noch nicht nachgewiesene Beziehungen',
    gapsIntro: 'Diese Lücken sind Kandidaten für das zukünftige Datenmodell. Sie sind keine in diesem Los behobenen Fehler.',
    gaps: [
      '`phase_projet` ist derzeit eine Bezeichnung ohne beobachtete Beziehung zu einem geregelten Projekt oder einer Phase.',
      '`agent`, `team` und `fournisseur` sind Textwerte; kein gemeinsamer Referenzschlüssel ist nachgewiesen.',
      'Allgemeine Buchungen tragen noch keine einheitliche DMS-Referenz, anders als einige Immobilienobjekte.',
      'Im aktuellen Payload ist keine Verknüpfung `task_id`, `project_id`, `asset_id` oder `ged_document_id` beobachtet.'
    ],
    evidenceTitle: 'Nachweisregel',
    evidence: 'Das DMS bewahrt Nachweise und Versionen auf. Eine zukünftige technische Beziehung muss auf eine geregelte Dokumentkennung verweisen; ein Dateiname allein reicht nicht aus.',
    source: 'Quellen: Frontend-API-Verträge Finanzen, beobachtete Buchungspayloads und M3S-Nutzungen durch Dashboard, Produktion, CRM und Anlagen & Vermögenswerte. Nur Lesen; keine Datenmigration.'
  }
};

const FinanceArchitecture = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section className="m3s-design-scope space-y-5" aria-labelledby="finance-architecture-title">
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold uppercase" style={{ color: 'var(--m3s-row-accent)' }}>{t.eyebrow}</p>
          <span className="inline-flex rounded-full border px-3 py-1 text-xs font-semibold" style={{ borderColor: 'var(--m3s-row-accent)', color: 'var(--m3s-row-accent)' }}>{t.observed}</span>
        </div>
        <h3 id="finance-architecture-title" className="m3s-section-title mt-2">{t.title}</h3>
        <p className="mt-2 max-w-5xl text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{t.intro}</p>
      </header>

      <section className="m3s-panel p-4" aria-labelledby="finance-data-chain-title">
        <h4 id="finance-data-chain-title" className="m3s-panel-title flex items-center gap-2"><Network size={18} aria-hidden="true" />{t.chainTitle}</h4>
        <div className="mt-4 grid gap-2 md:grid-cols-4">
          {t.chain.map(([label, body], index) => (
              <div key={label} className="relative border p-3" style={{ borderColor: 'var(--m3s-border)', background: 'var(--m3s-surface-raised)' }}>
                <p className="text-xs font-semibold uppercase" style={{ color: 'var(--m3s-row-accent)' }}>{label}</p>
                <p className="mt-2 text-sm font-medium" style={{ color: 'var(--m3s-text-primary)' }}>{body}</p>
                {index < t.chain.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-blue-400 md:block" size={18} aria-hidden="true" />}
              </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="finance-objects-title">
        <h4 id="finance-objects-title" className="m3s-panel-title flex items-center gap-2"><Boxes size={18} aria-hidden="true" />{t.objectsTitle}</h4>
        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {t.objects.map(([name, type, body], index) => (
            <article key={name} className="m3s-panel p-4 transition hover:-translate-y-0.5 hover:border-emerald-500/60">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex min-w-0 items-start gap-2">
                  <h5 className="m3s-panel-title min-w-0">{name}</h5>
                  {OBJECT_TERM_IDS[index] && <GlossaryHelp termId={OBJECT_TERM_IDS[index]} language={language} />}
                </div>
                <span className="inline-flex rounded-full border px-3 py-1 text-xs font-semibold" style={{ borderColor: 'var(--m3s-border-strong)', color: 'var(--m3s-text-secondary)' }}>{type}</span>
              </div>
              <p className="mt-3 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="m3s-panel overflow-hidden" aria-labelledby="finance-relations-title">
        <div className="p-4">
          <h4 id="finance-relations-title" className="m3s-panel-title flex items-center gap-2"><Link2 size={18} aria-hidden="true" />{t.relationsTitle}</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead style={{ background: 'var(--m3s-surface-raised)', color: 'var(--m3s-text-secondary)' }}><tr>{t.relationHeaders.map(header => <th key={header} className="px-4 py-3 text-xs uppercase">{header}</th>)}</tr></thead>
            <tbody>{t.relations.map((row, rowIndex) => <tr key={row[0]} className="border-t transition hover:bg-blue-500/5" style={{ borderColor: 'var(--m3s-border)' }}>{row.map((cell, cellIndex) => <td key={`${row[0]}-${cellIndex}`} className={`px-4 py-3 ${cellIndex === 0 ? 'font-mono text-xs' : ''}`} style={{ color: cellIndex === 0 ? 'var(--m3s-row-accent)' : 'var(--m3s-text-secondary)' }}>{cellIndex === 3 && RELATION_TERM_IDS[rowIndex] ? <span className="flex items-center gap-2"><span>{cell}</span><GlossaryHelp termId={RELATION_TERM_IDS[rowIndex]} language={language} /></span> : cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="m3s-panel p-4" aria-labelledby="finance-gaps-title">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h4 id="finance-gaps-title" className="m3s-panel-title flex items-center gap-2"><CircleAlert size={18} aria-hidden="true" />{t.gapsTitle}</h4>
            <GlossaryHelp termId="DATA-RELATION-REFERENTIELLE" language={language} />
          </div>
          <span className="inline-flex rounded-full border border-amber-500 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-300">{t.candidate}</span>
        </div>
        <p className="mt-2 text-sm" style={{ color: 'var(--m3s-text-secondary)' }}>{t.gapsIntro}</p>
        <ul className="mt-3 grid gap-2 md:grid-cols-2">
          {t.gaps.map(gap => <li key={gap} className="border-l-2 border-amber-500 pl-3 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{gap}</li>)}
        </ul>
      </section>

      <aside className="m3s-panel p-4" aria-label={t.evidenceTitle}>
        <div className="flex items-center gap-2">
          <h4 className="m3s-panel-title flex items-center gap-2"><FileCheck2 size={18} aria-hidden="true" />{t.evidenceTitle}</h4>
          <GlossaryHelp termId="FIN-JUSTIFICATIF-FINANCIER" language={language} />
        </div>
        <p className="mt-2 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{t.evidence}</p>
      </aside>

      <p className="border-l-2 pl-3 text-xs leading-5" style={{ borderColor: 'var(--m3s-row-accent)', color: 'var(--m3s-text-secondary)' }}><Database className="mr-2 inline" size={14} aria-hidden="true" />{t.source}</p>
    </section>
  );
};

export default FinanceArchitecture;
