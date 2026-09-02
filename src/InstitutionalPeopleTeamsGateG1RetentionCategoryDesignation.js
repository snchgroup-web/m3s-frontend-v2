import React from 'react';
import InstitutionalPeopleTeamsHistoricalFollowUp from './InstitutionalPeopleTeamsHistoricalFollowUp';
import { AlertTriangle, CheckCircle2, Link2, LockKeyhole, Tags } from 'lucide-react';

const STATUS_STYLES = {
  direct: 'border-emerald-700/70 bg-emerald-950/25 text-emerald-100',
  connected: 'border-sky-700/70 bg-sky-950/25 text-sky-100',
  conditional: 'border-amber-700/70 bg-amber-950/25 text-amber-100'
};

const COPY = {
  FR: {
    eyebrow: 'DÉSIGNATION DES CATÉGORIES · CONFIRMÉE V1.0 · 28-08-2026',
    title: 'Désigner les catégories réellement utilisées par REF-01',
    intro: 'Le cadre LEGAL V1.0 est validé en interne. Cette fiche confirmée rattache les catégories observées à leur fonction responsable sans copier de pièce personnelle, RH ou financière dans REF-01.',
    counters: [['Catégories examinées', '5', 'Périmètre du cadre LEGAL'], ['Directes REF-01', '2', 'Annuaire et preuves de gouvernance'], ['Reliées sans copie', '2', 'RH et Finance restent propriétaires'], ['Conditionnelles', '1', 'Seulement si la relation est établie']],
    labels: { category: 'Catégorie', designation: 'Désignation confirmée', owner: 'Fonction responsable', trigger: 'Contrôle avant application' },
    badge: 'CONFIRMÉ · V1.0',
    statuses: { direct: 'DIRECTE · OBSERVÉE', connected: 'RELIÉE · SANS COPIE', conditional: 'CONDITIONNELLE' },
    rows: [
      ['Annuaire C2 · personnes et équipes', 'Utilisée directement par REF-01 pour la finalité active de l annuaire assaini. La fin de finalité doit produire une décision tracée de maintien, anonymisation ou suppression.', 'Organisation & RH · IT pour la garde technique', 'Identifier l événement de départ, la date d effet et la référence de décision avant tout sort final.', 'direct'],
      ['Dossier de candidature', 'Catégorie observée dans le travail RH restreint. REF-01 ne conserve ni le CV, ni son contenu ; il peut seulement porter une référence opaque autorisée.', 'Organisation & RH · GED restreinte', 'Confirmer refus, consentement ou litige documenté et ne jamais exposer la pièce dans le bundle public.', 'connected'],
      ['Données salariales et certificat de travail', 'Catégorie applicable uniquement lorsqu une relation de travail ou une créance salariale est établie. Aucun statut uniforme n est déduit pour toutes les personnes de REF-01.', 'Organisation & RH · Finances · LEGAL', 'Qualifier la relation, la sous-catégorie et le point de départ avant de retenir cinq ou dix ans.', 'conditional'],
      ['Pièces comptables et justificatifs', 'Catégorie reliée à REF-01 lorsqu une opération concerne une personne, sans déplacer le justificatif hors de Finance ou de la GED autorisée.', 'Finances · GED · LEGAL', 'Confirmer l entité concernée, l exercice, le référentiel applicable et la référence opaque avant conservation.', 'connected'],
      ['Mandats, délégations, décisions et journaux d accès', 'Utilisée directement comme preuve de gouvernance et de contrôle de REF-01. Aucune durée forfaitaire commune n est retenue.', 'Gouvernance · Administration · IT · GED', 'Séparer mandat, décision et journal technique ; fixer durée et sort final par sous-catégorie.', 'direct']
    ],
    status: 'DÉSIGNATION CONFIRMÉE · Cinq catégories retenues en V1.0. Zéro règle automatisée, suppression, archive ou opération GED.',
    next: 'REF-01-G1-AUT-02-03-005 V1.0 est confirmé par REF-01-DEC-045 : fonctions responsables et déclencheurs documentaires retenus, sans mandat nominatif ni exécution.',
    boundary: 'Cette fiche ne contient aucune identité, pièce, référence C3/C4 réelle ni donnée salariale. Elle ne lance aucune durée et ne remplace pas la vérification d un cas particulier.'
  },
  EN: {
    eyebrow: 'CATEGORY DESIGNATION · V1.0 CONFIRMED · 28 AUG 2026',
    title: 'Designate the categories actually used by REF-01',
    intro: 'The V1.0 LEGAL framework is internally validated. This confirmed file maps observed categories to their responsible function without copying personal, HR or financial records into REF-01.',
    counters: [['Categories reviewed', '5', 'LEGAL framework scope'], ['Direct in REF-01', '2', 'Directory and governance evidence'], ['Linked without copying', '2', 'HR and Finance retain ownership'], ['Conditional', '1', 'Only where the relationship is established']],
    labels: { category: 'Category', designation: 'Confirmed designation', owner: 'Responsible function', trigger: 'Control before application' },
    badge: 'CONFIRMED · V1.0',
    statuses: { direct: 'DIRECT · OBSERVED', connected: 'LINKED · NO COPY', conditional: 'CONDITIONAL' },
    rows: [
      ['C2 directory · people and teams', 'Used directly by REF-01 for the active purpose of the sanitised directory. End of purpose must produce a traced retain, anonymise or delete decision.', 'Organisation & HR · IT for technical stewardship', 'Identify the departure event, effective date and decision reference before final treatment.', 'direct'],
      ['Application file', 'Category observed in restricted HR work. REF-01 retains neither the CV nor its contents; it may carry only an authorised opaque reference.', 'Organisation & HR · restricted DMS', 'Confirm rejection, consent or documented dispute and never expose the record in the public bundle.', 'connected'],
      ['Salary and employment-reference data', 'Applicable only where an employment relationship or salary claim is established. No uniform status is inferred for every person in REF-01.', 'Organisation & HR · Finance · LEGAL', 'Qualify the relationship, subcategory and starting event before retaining five or ten years.', 'conditional'],
      ['Accounting records and evidence', 'Linked to REF-01 when a transaction concerns a person, without moving the evidence out of Finance or the authorised DMS.', 'Finance · DMS · LEGAL', 'Confirm the entity, financial year, applicable framework and opaque reference before retention.', 'connected'],
      ['Mandates, delegations, decisions and access logs', 'Used directly as REF-01 governance and control evidence. No shared blanket period is retained.', 'Governance · Administration · IT · DMS', 'Separate mandates, decisions and technical logs; set period and final treatment by subcategory.', 'direct']
    ],
    status: 'DESIGNATION CONFIRMED · Five categories retained in V1.0. Zero automated rule, deletion, archive or DMS operation.',
    next: 'REF-01-G1-AUT-02-03-005 V1.0 is confirmed by REF-01-DEC-045: responsible functions and documentary triggers retained, without a named mandate or execution.',
    boundary: 'This file contains no identity, record, real C3/C4 reference or salary data. It starts no period and does not replace review of an individual case.'
  },
  DE: {
    eyebrow: 'KATEGORIENZUORDNUNG · BESTÄTIGT V1.0 · 28.08.2026',
    title: 'Die von REF-01 tatsächlich genutzten Kategorien bestimmen',
    intro: 'Der LEGAL-Rahmen V1.0 ist intern validiert. Diese bestätigte Akte ordnet beobachtete Kategorien ihrer verantwortlichen Funktion zu, ohne persönliche, Personal- oder Finanzunterlagen in REF-01 zu kopieren.',
    counters: [['Geprüfte Kategorien', '5', 'Umfang des LEGAL-Rahmens'], ['Direkt in REF-01', '2', 'Verzeichnis und Governance-Nachweise'], ['Verknüpft ohne Kopie', '2', 'Personal und Finanzen bleiben verantwortlich'], ['Bedingt', '1', 'Nur bei belegtem Verhältnis']],
    labels: { category: 'Kategorie', designation: 'Bestätigte Zuordnung', owner: 'Verantwortliche Funktion', trigger: 'Kontrolle vor Anwendung' },
    badge: 'BESTÄTIGT · V1.0',
    statuses: { direct: 'DIREKT · BEOBACHTET', connected: 'VERKNÜPFT · OHNE KOPIE', conditional: 'BEDINGT' },
    rows: [
      ['C2-Verzeichnis · Personen und Teams', 'Direkt von REF-01 für den aktiven Zweck des bereinigten Verzeichnisses genutzt. Zweckfortfall muss zu einem protokollierten Entscheid über Beibehaltung, Anonymisierung oder Löschung führen.', 'Organisation & Personal · IT für technische Betreuung', 'Austrittsereignis, Wirksamkeitsdatum und Entscheidreferenz vor der Endbehandlung bestimmen.', 'direct'],
      ['Bewerbungsdossier', 'Kategorie in der eingeschränkten Personalarbeit beobachtet. REF-01 bewahrt weder Lebenslauf noch Inhalt auf; nur eine autorisierte opake Referenz ist möglich.', 'Organisation & Personal · eingeschränktes DMS', 'Absage, Einwilligung oder dokumentierten Streit bestätigen und die Unterlage nie im öffentlichen Bundle zeigen.', 'connected'],
      ['Lohn- und Arbeitszeugnisdaten', 'Nur bei belegtem Arbeitsverhältnis oder Lohnanspruch anwendbar. Für alle Personen in REF-01 wird kein einheitlicher Status abgeleitet.', 'Organisation & Personal · Finanzen · LEGAL', 'Verhältnis, Unterkategorie und Startereignis vor einer Frist von fünf oder zehn Jahren qualifizieren.', 'conditional'],
      ['Buchhaltungsunterlagen und Belege', 'Mit REF-01 verknüpft, wenn ein Vorgang eine Person betrifft, ohne den Beleg aus Finanzen oder dem autorisierten DMS zu verschieben.', 'Finanzen · DMS · LEGAL', 'Einheit, Geschäftsjahr, anwendbaren Rahmen und opake Referenz vor der Aufbewahrung bestätigen.', 'connected'],
      ['Mandate, Delegationen, Entscheide und Zugriffsprotokolle', 'Direkt als Governance- und Kontrollnachweis von REF-01 genutzt. Keine gemeinsame Pauschalfrist wird festgehalten.', 'Governance · Verwaltung · IT · DMS', 'Mandat, Entscheid und technisches Protokoll trennen; Frist und Endbehandlung je Unterkategorie festlegen.', 'direct']
    ],
    status: 'ZUORDNUNG BESTÄTIGT · Fünf Kategorien in V1.0 festgehalten. Null automatisierte Regel, Löschung, Archivierung oder DMS-Operation.',
    next: 'REF-01-G1-AUT-02-03-005 V1.0 ist durch REF-01-DEC-045 bestätigt: verantwortliche Funktionen und dokumentarische Auslöser festgehalten, ohne namentliches Mandat oder Ausführung.',
    boundary: 'Diese Akte enthält keine Identität, Unterlage, reale C3/C4-Referenz oder Lohndaten. Sie startet keine Frist und ersetzt keine Prüfung des Einzelfalls.'
  }
};

const InstitutionalPeopleTeamsGateG1RetentionCategoryDesignation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section data-testid="ref01-g1-retention-category-designation" className="mt-4 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-3 sm:p-4" aria-labelledby="ref01-g1-retention-category-designation-title">
      <div className="flex items-start justify-between gap-3"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="ref01-g1-retention-category-designation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><Tags className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div>{index < 3 ? <CheckCircle2 className="shrink-0 text-emerald-300" size={19} aria-hidden="true" /> : <AlertTriangle className="shrink-0 text-amber-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <article className="mt-4 m3s-raised p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-2"><div className="flex items-start gap-2"><Link2 className="mt-0.5 shrink-0 text-sky-300" size={18} aria-hidden="true" /><div><h6 className="text-sm font-semibold text-slate-100">REF-01-G1-AUT-02-03-004 · V1.0</h6><p className="mt-1 text-xs font-semibold text-sky-200">{t.title}</p></div></div><span className="rounded-md border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-[10px] font-semibold text-emerald-100">{t.badge}</span></div>
        <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.rows.map(([category, designation, owner, trigger, status]) => <section key={category} data-testid="ref01-g1-retention-category-row" className="rounded-md border border-slate-700 bg-slate-950/20 p-3"><div className="flex flex-wrap items-start justify-between gap-2"><h6 className="text-xs font-semibold text-slate-100">{category}</h6><span className={`rounded-md border px-2 py-1 text-[10px] font-semibold ${STATUS_STYLES[status]}`}>{t.statuses[status]}</span></div><dl className="mt-3 space-y-2 text-xs leading-5"><div><dt className="font-semibold text-emerald-200">{t.labels.designation}</dt><dd className="mt-0.5 text-slate-300">{designation}</dd></div><div><dt className="font-semibold text-sky-200">{t.labels.owner}</dt><dd className="mt-0.5 text-slate-300">{owner}</dd></div><div><dt className="font-semibold text-violet-200">{t.labels.trigger}</dt><dd className="mt-0.5 text-slate-300">{trigger}</dd></div></dl></section>)}</div>
      </article>
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <InstitutionalPeopleTeamsHistoricalFollowUp language={language}>{t.next}</InstitutionalPeopleTeamsHistoricalFollowUp>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><LockKeyhole className="mt-0.5 shrink-0" size={15} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1RetentionCategoryDesignation;
