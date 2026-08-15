import React from 'react';
import {
  Archive,
  CalendarRange,
  CheckCircle2,
  FileCheck2,
  FileClock,
  Files,
  Landmark,
  ShieldCheck
} from 'lucide-react';
import AdministrationWeeklyReview from './AdministrationWeeklyReview';

const COPY = {
  FR: {
    eyebrow: 'CYCLE CADRÉ · REVUE PILOTE DISPONIBLE',
    title: 'Cycle gouverné des rapports d’activité',
    intro: 'Les journaux existants restent les traces quotidiennes. Les rapports consolident ces sources par période sans les remplacer, les réécrire ni inventer de résultats.',
    stages: [
      ['Journal quotidien', 'Consigner les faits, actions, décisions, preuves et points ouverts de la journée.', 'Source primaire'],
      ['Revue hebdomadaire', 'Consolider les journaux, retirer les doublons et comparer prévu, réalisé, blocages et suites.', 'Synthèse de travail'],
      ['Rapport mensuel', 'Présenter résultats, indicateurs sourcés, finances, dossiers majeurs, risques et priorités suivantes.', 'Version à valider'],
      ['Rapport d’activité', 'Produire la synthèse institutionnelle de la période, puis soumettre son adoption et son archivage.', 'Version institutionnelle']
    ],
    fieldsTitle: 'Fiche minimale d’un rapport',
    fieldsBody: 'Une même structure rend la consolidation reproductible et permet de remonter jusqu’aux journaux sources.',
    fields: [
      'Identifiant, type et période de référence',
      'Fonction ou périmètre couvert',
      'Journaux et documents sources',
      'Auteur et fonction responsable',
      'Résultats et indicateurs sourcés',
      'Décisions, risques et points bloquants',
      'Actions suivantes et responsables',
      'Version, statut, confidentialité et URI GED'
    ],
    rolesTitle: 'Qui fait quoi ?',
    roles: [
      ['Administration', 'Compile, contrôle la complétude, suit les échéances et prépare la version consolidée.', FileCheck2],
      ['Fonction responsable', 'Valide les faits, résultats, indicateurs et explications relevant de son métier.', ShieldCheck],
      ['Gouvernance', 'Approuve le rapport institutionnel et autorise sa diffusion selon le public visé.', Landmark],
      ['GED', 'Conserve sources, versions, preuves d’approbation, rapport adopté et règles d’accès.', Archive]
    ],
    rulesTitle: 'Règles de consolidation',
    rules: [
      'Conserver les identifiants des journaux et documents utilisés.',
      'Séparer faits documentés, interprétations, décisions et informations absentes.',
      'Ne jamais fabriquer un indicateur, un taux d’avancement ou une conclusion.',
      'Ne pas écraser les journaux sources lors de la consolidation.',
      'Employer « signé » ou « adopté » uniquement avec une preuve vérifiable.',
      'Le Daily Intelligence Dashboard aide au pilotage ; il ne devient une source institutionnelle qu’après validation.'
    ],
    stateTitle: 'État du dispositif',
    stateBody: 'Le journal quotidien existe et une première revue hebdomadaire pilote à couverture partielle est disponible. Elle reste une synthèse de travail ; les rapports mensuels et institutionnels demeurent un modèle cible.',
    source: 'Sources de cadrage : journaux de bord 2SG/M3S, règles de statut documentaire, Processus & Procédures Administration et gouvernance GED.'
  },
  EN: {
    eyebrow: 'FRAMED CYCLE · PILOT REVIEW AVAILABLE',
    title: 'Governed activity reporting cycle',
    intro: 'Existing journals remain the daily records. Reports consolidate these sources by period without replacing them, rewriting them or inventing results.',
    stages: [
      ['Daily journal', 'Record the day’s facts, actions, decisions, evidence and open items.', 'Primary source'],
      ['Weekly review', 'Consolidate journals, remove duplicates and compare planned work, actual work, blockers and next steps.', 'Working synthesis'],
      ['Monthly report', 'Present results, sourced indicators, finances, major files, risks and next priorities.', 'Version for validation'],
      ['Activity report', 'Produce the institutional synthesis for the period, then submit it for adoption and archiving.', 'Institutional version']
    ],
    fieldsTitle: 'Minimum report record',
    fieldsBody: 'A shared structure makes consolidation repeatable and keeps a trace back to source journals.',
    fields: [
      'Identifier, report type and reference period',
      'Function or scope covered',
      'Source journals and documents',
      'Author and owning function',
      'Results and sourced indicators',
      'Decisions, risks and blockers',
      'Next actions and owners',
      'Version, status, confidentiality and DMS URI'
    ],
    rolesTitle: 'Who does what?',
    roles: [
      ['Administration', 'Compiles, checks completeness, tracks deadlines and prepares the consolidated version.', FileCheck2],
      ['Owning function', 'Validates the facts, results, indicators and explanations within its remit.', ShieldCheck],
      ['Governance', 'Approves the institutional report and authorises distribution for the intended audience.', Landmark],
      ['DMS', 'Retains sources, versions, approval evidence, the adopted report and access rules.', Archive]
    ],
    rulesTitle: 'Consolidation rules',
    rules: [
      'Retain identifiers for every journal and document used.',
      'Separate documented facts, interpretations, decisions and missing information.',
      'Never fabricate an indicator, completion rate or conclusion.',
      'Do not overwrite source journals during consolidation.',
      'Use “signed” or “adopted” only when verifiable evidence exists.',
      'The Daily Intelligence Dashboard supports steering; it becomes an institutional source only after validation.'
    ],
    stateTitle: 'Current maturity',
    stateBody: 'The daily journal exists and a first weekly pilot review with partial coverage is available. It remains a working synthesis; monthly and institutional reports remain a target model.',
    source: 'Framing sources: 2SG/M3S work journals, documentary status rules, Administration Processes & Procedures, and DMS governance.'
  },
  DE: {
    eyebrow: 'GERAHMTER ZYKLUS · PILOTRÜCKBLICK VERFÜGBAR',
    title: 'Gesteuerter Tätigkeitsberichtszyklus',
    intro: 'Bestehende Journale bleiben die täglichen Nachweise. Berichte konsolidieren diese Quellen nach Zeitraum, ohne sie zu ersetzen, umzuschreiben oder Ergebnisse zu erfinden.',
    stages: [
      ['Tagesjournal', 'Fakten, Maßnahmen, Entscheidungen, Nachweise und offene Punkte des Tages erfassen.', 'Primärquelle'],
      ['Wochenrückblick', 'Journale konsolidieren, Dubletten entfernen und Plan, Ist-Stand, Hindernisse und Folgeschritte vergleichen.', 'Arbeitsübersicht'],
      ['Monatsbericht', 'Ergebnisse, belegte Kennzahlen, Finanzen, wichtige Akten, Risiken und nächste Prioritäten darstellen.', 'Zu validierende Version'],
      ['Tätigkeitsbericht', 'Institutionelle Synthese des Zeitraums erstellen und anschließend zur Annahme und Archivierung vorlegen.', 'Institutionelle Version']
    ],
    fieldsTitle: 'Mindestangaben eines Berichts',
    fieldsBody: 'Eine gemeinsame Struktur macht die Konsolidierung wiederholbar und erhält den Rückverweis auf die Quelljournale.',
    fields: [
      'Kennung, Berichtstyp und Bezugszeitraum',
      'Abgedeckte Funktion oder Umfang',
      'Quelljournale und Quelldokumente',
      'Autor und verantwortliche Funktion',
      'Ergebnisse und belegte Kennzahlen',
      'Entscheidungen, Risiken und Hindernisse',
      'Nächste Maßnahmen und Verantwortliche',
      'Version, Status, Vertraulichkeit und DMS-URI'
    ],
    rolesTitle: 'Wer macht was?',
    roles: [
      ['Verwaltung', 'Kompiliert, prüft Vollständigkeit, verfolgt Fristen und bereitet die konsolidierte Version vor.', FileCheck2],
      ['Verantwortliche Funktion', 'Validiert Fakten, Ergebnisse, Kennzahlen und fachliche Erläuterungen ihres Bereichs.', ShieldCheck],
      ['Governance', 'Genehmigt den institutionellen Bericht und autorisiert seine Verteilung an den vorgesehenen Empfängerkreis.', Landmark],
      ['DMS', 'Bewahrt Quellen, Versionen, Genehmigungsnachweise, den angenommenen Bericht und Zugriffsregeln auf.', Archive]
    ],
    rulesTitle: 'Regeln der Konsolidierung',
    rules: [
      'Kennungen aller verwendeten Journale und Dokumente beibehalten.',
      'Dokumentierte Fakten, Interpretationen, Entscheidungen und fehlende Informationen trennen.',
      'Keine Kennzahl, keinen Fortschrittsgrad und keine Schlussfolgerung erfinden.',
      'Quelljournale bei der Konsolidierung nicht überschreiben.',
      '„Unterzeichnet“ oder „angenommen“ nur mit überprüfbarem Nachweis verwenden.',
      'Das Daily Intelligence Dashboard unterstützt die Steuerung; es wird erst nach Validierung zur institutionellen Quelle.'
    ],
    stateTitle: 'Stand des Verfahrens',
    stateBody: 'Das Tagesjournal besteht und ein erster Pilot-Wochenrückblick mit teilweiser Abdeckung ist verfügbar. Er bleibt eine Arbeitsübersicht; Monats- und institutionelle Berichte bleiben ein Zielmodell.',
    source: 'Rahmenquellen: 2SG-/M3S-Arbeitsjournale, Regeln für Dokumentenstatus, Prozesse & Verfahren der Verwaltung und DMS-Governance.'
  }
};

const AdministrationReportingCycle = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section id="process-reports" className="scroll-mt-20 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby="process-reports-title">
      <div className="flex items-start gap-3">
        <CalendarRange className="mt-0.5 shrink-0 text-cyan-300" size={22} aria-hidden="true" />
        <div>
          <p className="text-xs font-bold uppercase text-cyan-300">{t.eyebrow}</p>
          <h3 id="process-reports-title" className="mt-1 text-xl font-semibold text-slate-100">{t.title}</h3>
          <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-400">{t.intro}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {t.stages.map(([title, body, status], index) => (
          <article key={title} className="group min-h-44 rounded-lg border border-cyan-800/60 bg-cyan-950/20 p-4 transition-colors hover:border-cyan-600 hover:bg-cyan-950/35">
            <div className="flex items-center justify-between gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-cyan-950 text-xs font-bold text-cyan-100">{index + 1}</span>
              <span className="rounded-full border border-slate-600 px-2.5 py-1 text-xs font-semibold text-slate-300">{status}</span>
            </div>
            <h4 className="mt-4 font-semibold text-slate-100">{title}</h4>
            <p className="mt-2 text-sm leading-5 text-slate-300">{body}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1.25fr_1fr]">
        <article className="rounded-lg border border-slate-700 bg-slate-900/40 p-4">
          <div className="flex items-start gap-3">
            <Files className="mt-0.5 shrink-0 text-blue-300" size={20} aria-hidden="true" />
            <div>
              <h4 className="font-semibold text-slate-100">{t.fieldsTitle}</h4>
              <p className="mt-1 text-sm leading-5 text-slate-400">{t.fieldsBody}</p>
            </div>
          </div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {t.fields.map(field => (
              <li key={field} className="flex items-start gap-2 rounded-md border border-slate-700 bg-slate-950/30 p-3 text-sm leading-5 text-slate-300">
                <CheckCircle2 className="mt-0.5 shrink-0 text-blue-300" size={15} aria-hidden="true" />
                <span>{field}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-lg border border-slate-700 bg-slate-900/40 p-4">
          <h4 className="font-semibold text-slate-100">{t.rolesTitle}</h4>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {t.roles.map(([title, body, Icon]) => (
              <div key={title} className="flex items-start gap-3 rounded-md border border-slate-700 bg-slate-950/30 p-3">
                <Icon className="mt-0.5 shrink-0 text-emerald-300" size={18} aria-hidden="true" />
                <div>
                  <h5 className="text-sm font-semibold text-slate-100">{title}</h5>
                  <p className="mt-1 text-sm leading-5 text-slate-300">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-lg border border-amber-800/60 bg-amber-950/15 p-4">
          <div className="flex items-center gap-2">
            <FileClock className="text-amber-300" size={20} aria-hidden="true" />
            <h4 className="font-semibold text-slate-100">{t.rulesTitle}</h4>
          </div>
          <ul className="mt-3 grid gap-2 text-sm leading-5 text-slate-300 sm:grid-cols-2">
            {t.rules.map(rule => (
              <li key={rule} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 shrink-0 text-amber-300" size={15} aria-hidden="true" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </article>

        <aside className="rounded-lg border border-emerald-800/60 bg-emerald-950/15 p-4">
          <div className="flex items-center gap-2">
            <FileCheck2 className="text-emerald-300" size={20} aria-hidden="true" />
            <h4 className="font-semibold text-slate-100">{t.stateTitle}</h4>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-300">{t.stateBody}</p>
        </aside>
      </div>

      <AdministrationWeeklyReview language={language} />

      <p className="mt-5 border-t border-slate-700 pt-4 text-xs leading-5 text-slate-400">{t.source}</p>
    </section>
  );
};

export default AdministrationReportingCycle;
