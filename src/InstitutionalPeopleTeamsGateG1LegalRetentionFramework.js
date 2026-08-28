import React from 'react';
import { ExternalLink, Globe2, LockKeyhole, Scale } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'CADRE LEGAL SOURCÉ · VALIDÉ V1.0 · 28-08-2026',
    title: 'Appliquer le cadre validé par catégorie',
    intro: 'Cheikh valide en interne le cadre fondé sur les sources officielles. Il exclut une durée unique pour toutes les pièces et distingue finalité, catégorie, juridiction, point de départ et sort final avant toute future règle opérationnelle.',
    badge: 'SOURCÉ · VALIDÉ EN INTERNE',
    labels: { category: 'Catégorie', rule: 'Règle candidate', trigger: 'Point de départ et sort final', jurisdiction: 'Juridiction', source: 'Source officielle' },
    categories: [
      ['Annuaire C2 · personnes et équipes', 'Conserver pendant la finalité active. Supprimer ou anonymiser lorsque les données ne sont plus nécessaires, sauf obligation documentée, intérêt prépondérant ou gel lié à un litige.', 'Revue au départ, à la fin du mandat ou à la disparition de la finalité ; décision de fin à tracer.', 'CH + SN', 0],
      ['Dossier de candidature', 'Suisse : le dossier d une candidature non retenue peut être conservé jusqu à trois mois après le refus pour la défense contre une allégation de discrimination ; au-delà, un fondement distinct est requis.', 'Refus de candidature ; suppression ou anonymisation à l échéance, sauf consentement ou litige documenté.', 'CH', 1],
      ['Données salariales et certificat de travail', 'Suisse : cinq ans pour les données liées au salaire ; dix ans pour les données nécessaires à un certificat de travail. Ces durées ne s appliquent que si une relation de travail existe.', 'Fin de la relation ou naissance de la créance, selon la catégorie ; vérification LEGAL/RH requise.', 'CH', 1],
      ['Pièces comptables et justificatifs', 'Suisse : dix ans à compter de la fin de l exercice. Sénégal/OHADA : dix ans pour les livres et pièces justificatives des entités soumises au référentiel applicable.', 'Fin de l exercice concerné ; archivage ou destruction contrôlée après vérification des autres obligations.', 'CH + SN/OHADA', 2],
      ['Mandats, délégations, décisions et journaux d accès', 'Aucune durée forfaitaire n est promue. La conservation reste liée à la finalité, aux obligations applicables, à la défense de droits et, si pertinent, à l intérêt archivistique.', 'Fin du mandat, expiration du droit ou clôture de la décision ; durée précise à arbitrer par sous-catégorie.', 'CH + SN', 0]
    ],
    jurisdictions: [
      ['Suisse', 'La LPD impose finalité, proportionnalité et transparence. La personne doit être informée de la durée ou des critères utilisés ; les associations doivent effacer ou anonymiser les données devenues inutiles.', 0],
      ['Sénégal', 'La loi n° 2008-12 limite la conservation à la durée nécessaire aux finalités. Une prolongation n est admise que dans les cas prévus ; la CDP exige d informer sur la durée et de détruire ou archiver à l échéance légale.', 3],
      ['Articulation territoriale', 'Le siège suisse de 2SG rend le cadre suisse central. Le droit sénégalais, OHADA et les règles de transfert s ajoutent lorsque le responsable, le traitement, le territoire ou la structure concernés le commandent ; tout changement de rattachement impose une nouvelle revue.', 4]
    ],
    sources: [
      ['PFPDT · Associations et protection des données', 'https://www.edoeb.admin.ch/en/data-protection-in-clubs-and-associations'],
      ['PFPDT · FAQ conservation et relation de travail', 'https://www.edoeb.admin.ch/en/faq-data-protection'],
      ['OHADA · Acte uniforme comptable et information financière', 'https://www.ohada.org/publication-du-nouvel-acte-uniforme-relatif-au-droit-comptable-et-a-l-information-financiere-audcif/4/'],
      ['CDP Sénégal · Obligations des entreprises', 'https://www.cdp.sn/obligations-entreprises'],
      ['CDP Sénégal · Textes législatifs et loi n° 2008-12', 'https://www.cdp.sn/legislation/textes-legislatifs']
    ],
    stop: 'Le cadre est validé, mais aucune durée n est appliquée automatiquement. Avant exécution, la catégorie, le déclencheur, le sort final et l autorité doivent être désignés ; tout nouveau territoire, transfert ou conflit impose une revue LEGAL.'
  },
  EN: {
    eyebrow: 'SOURCED LEGAL FRAMEWORK · V1.0 VALIDATED · 28 AUG 2026',
    title: 'Apply the validated framework by category',
    intro: 'Cheikh internally validates the framework grounded in official sources. It rules out one period for every record and separates purpose, category, jurisdiction, starting event and final treatment before any future operational rule.',
    badge: 'SOURCED · INTERNALLY VALIDATED',
    labels: { category: 'Category', rule: 'Candidate rule', trigger: 'Starting event and final treatment', jurisdiction: 'Jurisdiction', source: 'Official source' },
    categories: [
      ['C2 directory · people and teams', 'Retain for the active purpose. Delete or anonymise when no longer needed, unless a documented obligation, overriding interest or litigation hold applies.', 'Review on departure, end of mandate or end of purpose; trace the final decision.', 'CH + SN', 0],
      ['Application file', 'Switzerland: an unsuccessful application may be retained for up to three months after rejection to defend a discrimination claim; longer retention needs a separate basis.', 'Application rejection; delete or anonymise at expiry unless consent or a documented dispute applies.', 'CH', 1],
      ['Salary and employment-reference data', 'Switzerland: five years for salary-related data and ten years for data needed to issue an employment reference. These periods apply only where an employment relationship exists.', 'End of relationship or claim accrual depending on category; LEGAL/HR verification required.', 'CH', 1],
      ['Accounting records and evidence', 'Switzerland: ten years from the end of the financial year. Senegal/OHADA: ten years for books and supporting records of entities subject to the applicable framework.', 'End of the relevant financial year; controlled archive or deletion after checking other obligations.', 'CH + SN/OHADA', 2],
      ['Mandates, delegations, decisions and access logs', 'No blanket period is promoted. Retention remains tied to purpose, applicable obligations, defence of rights and, where relevant, archival interest.', 'End of mandate, right expiry or decision closure; precise period to decide by subcategory.', 'CH + SN', 0]
    ],
    jurisdictions: [
      ['Switzerland', 'The FADP requires purpose limitation, proportionality and transparency. People must be told the period or criteria used; associations must delete or anonymise data that is no longer needed.', 0],
      ['Senegal', 'Law No. 2008-12 limits retention to what is necessary for the purposes. Extension is allowed only in provided cases; the CDP requires notice of the period and destruction or archiving at legal expiry.', 3],
      ['Territorial articulation', '2SG s Swiss seat makes the Swiss framework central. Senegalese law, OHADA and transfer rules are added when the controller, processing, territory or concerned structure requires them; any connection change requires a new review.', 4]
    ],
    sources: [
      ['FDPIC · Data protection in clubs and associations', 'https://www.edoeb.admin.ch/en/data-protection-in-clubs-and-associations'],
      ['FDPIC · Retention and employment FAQ', 'https://www.edoeb.admin.ch/en/faq-data-protection'],
      ['OHADA · Uniform Act on accounting and financial information', 'https://www.ohada.org/en/uniform-act-relating-to-accounting-law-and-financial-information-audcif/'],
      ['Senegal CDP · Business obligations', 'https://www.cdp.sn/obligations-entreprises'],
      ['Senegal CDP · Legislation and Law No. 2008-12', 'https://www.cdp.sn/legislation/textes-legislatifs']
    ],
    stop: 'The framework is validated, but no period is applied automatically. Before execution, the category, trigger, final treatment and authority must be designated; any new territory, transfer or conflict requires LEGAL review.'
  },
  DE: {
    eyebrow: 'BELEGTER RECHTSRAHMEN · V1.0 VALIDIERT · 28.08.2026',
    title: 'Den validierten Rahmen nach Kategorie anwenden',
    intro: 'Cheikh validiert den auf amtlichen Quellen beruhenden Rahmen intern. Er schliesst eine Einheitsfrist fuer alle Unterlagen aus und trennt Zweck, Kategorie, Rechtsraum, Startereignis und Endbehandlung vor jeder kuenftigen operativen Regel.',
    badge: 'BELEGT · INTERN VALIDIERT',
    labels: { category: 'Kategorie', rule: 'Kandidatenregel', trigger: 'Startereignis und Endbehandlung', jurisdiction: 'Rechtsraum', source: 'Amtliche Quelle' },
    categories: [
      ['C2-Verzeichnis · Personen und Teams', 'Fuer den aktiven Zweck aufbewahren. Loeschen oder anonymisieren, sobald die Daten nicht mehr noetig sind, ausser bei dokumentierter Pflicht, ueberwiegendem Interesse oder Verfahrenssperre.', 'Pruefung bei Austritt, Mandatsende oder Zweckfortfall; Endentscheid protokollieren.', 'CH + SN', 0],
      ['Bewerbungsdossier', 'Schweiz: Eine erfolglose Bewerbung kann bis zu drei Monate nach der Absage zur Abwehr eines Diskriminierungsvorwurfs aufbewahrt werden; danach braucht es eine eigene Grundlage.', 'Absage; bei Fristende loeschen oder anonymisieren, ausser bei Einwilligung oder dokumentiertem Streit.', 'CH', 1],
      ['Lohn- und Arbeitszeugnisdaten', 'Schweiz: fuenf Jahre fuer lohnbezogene Daten, zehn Jahre fuer Daten zum Arbeitszeugnis. Diese Fristen gelten nur bei einem Arbeitsverhaeltnis.', 'Ende des Verhaeltnisses oder Entstehung des Anspruchs je Kategorie; LEGAL-/HR-Pruefung erforderlich.', 'CH', 1],
      ['Buchhaltungsunterlagen und Belege', 'Schweiz: zehn Jahre ab Ende des Geschaeftsjahres. Senegal/OHADA: zehn Jahre fuer Buecher und Belege von Einheiten im anwendbaren Regelwerk.', 'Ende des betreffenden Geschaeftsjahres; kontrollierte Archivierung oder Loeschung nach Pruefung weiterer Pflichten.', 'CH + SN/OHADA', 2],
      ['Mandate, Delegationen, Entscheide und Zugriffsprotokolle', 'Keine Pauschalfrist wird festgelegt. Die Aufbewahrung bleibt an Zweck, anwendbare Pflichten, Rechtsverteidigung und gegebenenfalls Archivinteresse gebunden.', 'Mandatsende, Ablauf eines Rechts oder Entscheidabschluss; genaue Frist je Unterkategorie festzulegen.', 'CH + SN', 0]
    ],
    jurisdictions: [
      ['Schweiz', 'Das DSG verlangt Zweckbindung, Verhaeltnismaessigkeit und Transparenz. Betroffene muessen Frist oder Kriterien kennen; Vereine muessen nicht mehr noetige Daten loeschen oder anonymisieren.', 0],
      ['Senegal', 'Gesetz Nr. 2008-12 begrenzt die Aufbewahrung auf den fuer die Zwecke noetigen Zeitraum. Eine Verlaengerung gilt nur in vorgesehenen Faellen; die CDP verlangt Fristinformation und Loeschung oder Archivierung bei gesetzlichem Ablauf.', 3],
      ['Territoriale Zuordnung', 'Der Schweizer Sitz von 2SG macht den Schweizer Rahmen zentral. Senegal-Recht, OHADA und Transferregeln kommen hinzu, wenn Verantwortlicher, Verarbeitung, Gebiet oder betroffene Struktur dies verlangen; jede Aenderung der Zuordnung erfordert eine neue Pruefung.', 4]
    ],
    sources: [
      ['EDOEB · Datenschutz in Vereinen', 'https://www.edoeb.admin.ch/en/data-protection-in-clubs-and-associations'],
      ['EDOEB · FAQ Aufbewahrung und Arbeitsverhaeltnis', 'https://www.edoeb.admin.ch/en/faq-data-protection'],
      ['OHADA · Einheitlicher Rechnungslegungsakt', 'https://www.ohada.org/en/uniform-act-relating-to-accounting-law-and-financial-information-audcif/'],
      ['CDP Senegal · Pflichten der Unternehmen', 'https://www.cdp.sn/obligations-entreprises'],
      ['CDP Senegal · Gesetzgebung und Gesetz Nr. 2008-12', 'https://www.cdp.sn/legislation/textes-legislatifs']
    ],
    stop: 'Der Rahmen ist validiert, aber keine Frist wird automatisch angewandt. Vor einer Ausfuehrung muessen Kategorie, Ausloeser, Endbehandlung und Autoritaet bestimmt sein; jedes neue Gebiet, jeder Transfer oder Konflikt erfordert eine LEGAL-Pruefung.'
  }
};

const InstitutionalPeopleTeamsGateG1LegalRetentionFramework = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section data-testid="ref01-g1-legal-retention-framework" className="mt-4 rounded-md border border-amber-700/70 bg-amber-950/10 p-3 sm:p-4" aria-labelledby="ref01-g1-legal-retention-framework-title">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-amber-300">{t.eyebrow}</p><h6 id="ref01-g1-legal-retention-framework-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
        <span className="inline-flex items-center gap-2 rounded-md border border-amber-600/70 bg-amber-950/30 px-2 py-1 text-[10px] font-semibold text-amber-100"><Scale size={14} aria-hidden="true" />{t.badge}</span>
      </div>
      <div className="mt-4 space-y-3">{t.categories.map(([category, rule, trigger, jurisdiction, sourceIndex]) => <article key={category} data-testid="ref01-g1-legal-retention-row" className="m3s-raised p-3"><div className="flex flex-wrap items-start justify-between gap-2"><h6 className="text-sm font-semibold text-slate-100">{category}</h6><span className="rounded-md border border-sky-700/70 bg-sky-950/20 px-2 py-1 text-[10px] font-semibold text-sky-100">{jurisdiction}</span></div><dl className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2"><div><dt className="text-xs font-semibold text-amber-200">{t.labels.rule}</dt><dd className="mt-1 text-xs leading-5 text-slate-300">{rule}</dd></div><div><dt className="text-xs font-semibold text-violet-200">{t.labels.trigger}</dt><dd className="mt-1 text-xs leading-5 text-slate-300">{trigger}</dd></div></dl><a className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-sky-300 underline decoration-sky-700 underline-offset-4 hover:text-sky-200" href={t.sources[sourceIndex][1]} target="_blank" rel="noreferrer">{t.sources[sourceIndex][0]}<ExternalLink size={13} aria-hidden="true" /></a></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">{t.jurisdictions.map(([jurisdiction, rule, sourceIndex]) => <article key={jurisdiction} className="rounded-md border border-slate-700 bg-slate-950/20 p-3"><div className="flex items-center gap-2"><Globe2 className="text-sky-300" size={17} aria-hidden="true" /><h6 className="text-sm font-semibold text-slate-100">{jurisdiction}</h6></div><p className="mt-2 text-xs leading-5 text-slate-300">{rule}</p><a className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-sky-300 underline decoration-sky-700 underline-offset-4 hover:text-sky-200" href={t.sources[sourceIndex][1]} target="_blank" rel="noreferrer">{t.sources[sourceIndex][0]}<ExternalLink size={13} aria-hidden="true" /></a></article>)}</div>
      <p className="mt-4 flex items-start gap-2 rounded-md border border-rose-800/70 bg-rose-950/20 p-3 text-xs font-semibold leading-5 text-rose-100"><LockKeyhole className="mt-0.5 shrink-0" size={15} aria-hidden="true" />{t.stop}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1LegalRetentionFramework;
