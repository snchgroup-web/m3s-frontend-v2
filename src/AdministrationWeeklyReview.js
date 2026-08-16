import React, { useState } from 'react';
import {
  AlertTriangle,
  Archive,
  CalendarRange,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileClock,
  FileText,
  ListChecks,
  ShieldCheck,
  UsersRound
} from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'REVUE PILOTE · COUVERTURE PARTIELLE',
    title: 'Revue hebdomadaire du 10 au 15 août 2026',
    intro: 'Première consolidation réelle du cycle Administration. Elle reprend uniquement les faits présents dans les journaux disponibles et signale explicitement les journées sans journal.',
    metadata: [
      ['Identifiant', '2SG-ADM-RH-2026-W33-PILOTE'],
      ['Période de référence', '10–15 août 2026'],
      ['Périmètre', 'Administration et socle M3S'],
      ['Statut', 'Synthèse de travail provisoire']
    ],
    coverageLabel: 'Couverture des sources',
    coverageValue: '3 journaux disponibles · 3 journées sans journal',
    resultsTitle: 'Résultats documentés',
    results: [
      'Le modèle relationnel transversal V1 a été fusionné, puis raccordé aux tables et endpoints réellement observés.',
      'La base documentaire LEGAL a été consolidée et rendue visible sans conclure à la conformité juridique.',
      'Les registres Ressources et Courrier disposent d’une persistance sécurisée, de permissions explicites et d’une traçabilité d’audit.',
      'Les diagnostics de production ont été durcis et l’échantillonnage générique a été désactivé en production.',
      'Les profils de démonstration frontend sont devenus génériques et limités au développement local.',
      'Le cycle de reporting et le portefeuille des grands dossiers ont été intégrés à Administration.'
    ],
    indicatorsTitle: 'Indicateurs sourcés',
    indicators: [
      ['Journaux utilisés', '3', '10, 14 et 15 août'],
      ['Journaux absents', '3', '11, 12 et 13 août'],
      ['PR frontend documentées', '10', 'nº 76 à 85'],
      ['PR backend documentées', '5', 'nº 27 à 31']
    ],
    watchTitle: 'Limites et points de vigilance',
    watch: [
      'Aucune activité n’est déduite pour les 11, 12 et 13 août : l’absence de journal n’est pas assimilée à une absence de travail.',
      'Le parcours d’un utilisateur ordinaire réel reste différé jusqu’à l’existence d’un compte légitime et autorisé.',
      'L’avancement documentaire LEGAL mesure des pièces et preuves ; il ne certifie pas la conformité juridique.',
      'Le Daily Intelligence Dashboard doit encore partager une source éditoriale maîtresse pleinement stabilisée.'
    ],
    nextTitle: 'Prochaines actions',
    next: [
      'Faire valider la période, la fonction responsable et l’emplacement GED avant toute promotion de cette revue.',
      'Stabiliser la source maîtresse du Daily Intelligence Dashboard.',
      'Compléter le contrôle RBAC avec un utilisateur ordinaire lors d’un onboarding légitime.',
      'Poursuivre la qualification des pièces LEGAL sans rédaction ou conclusion prématurée.'
    ],
    sourcesTitle: 'Journaux sources',
    showSources: 'Afficher les journaux sources',
    hideSources: 'Masquer les journaux sources',
    sources: [
      'M3S_JOURNAL_DE_BORD_2026-08-10.md',
      'M3S_JOURNAL_DE_BORD_2026-08-14.md',
      'M3S_JOURNAL_DE_BORD_2026-08-15.md'
    ],
    governanceTitle: 'Circuit documentaire proposé',
    governanceIntro: 'Ce circuit sépare la consolidation administrative, la validation du fond, la décision de gouvernance et la conservation des preuves.',
    governanceSteps: [
      ['Administration', 'Consolide les journaux, nomme la version et prépare la revue.', 'Responsable proposé'],
      ['Fonctions concernées', 'Vérifient les faits et résultats qui relèvent de leur périmètre.', 'Validation du fond'],
      ['Gouvernance', 'Approuve ou refuse la promotion en rapport institutionnel.', 'Décision humaine'],
      ['GED', 'Conserve le corpus source, la version, les validations et le rapport approuvé.', 'Après approbation']
    ],
    gedTitle: 'Emplacement GED candidat',
    gedPath: 'GED/Administration/Rapports_activite/2026/Hebdomadaires/2SG-ADM-RH-2026-W33-PILOTE',
    gedStatus: 'À confirmer par Cheikh',
    promotionRule: 'Tant que le propriétaire, le circuit et l’emplacement GED ne sont pas confirmés, cette revue reste une synthèse de travail provisoire.',
    caution: 'Cette revue est une synthèse de travail à contrôler par Cheikh et la fonction responsable. Elle n’est ni signée, ni adoptée, ni archivée comme rapport institutionnel.'
  },
  EN: {
    eyebrow: 'PILOT REVIEW · PARTIAL COVERAGE',
    title: 'Weekly review from 10 to 15 August 2026',
    intro: 'First real consolidation of the Administration cycle. It uses only facts found in available journals and explicitly identifies days without a journal.',
    metadata: [
      ['Identifier', '2SG-ADM-RH-2026-W33-PILOTE'],
      ['Reference period', '10–15 August 2026'],
      ['Scope', 'Administration and M3S foundation'],
      ['Status', 'Provisional working synthesis']
    ],
    coverageLabel: 'Source coverage',
    coverageValue: '3 journals available · 3 days without a journal',
    resultsTitle: 'Documented results',
    results: [
      'The transversal relational model V1 was merged and then mapped to the tables and endpoints actually observed.',
      'The LEGAL documentary baseline was consolidated and made visible without asserting legal compliance.',
      'The Resources and Correspondence registers now have secured persistence, explicit permissions and an audit trail.',
      'Production diagnostics were hardened and generic sampling was disabled in production.',
      'Frontend demonstration profiles were made generic and restricted to local development.',
      'The reporting cycle and the major-file portfolio were integrated into Administration.'
    ],
    indicatorsTitle: 'Sourced indicators',
    indicators: [
      ['Journals used', '3', '10, 14 and 15 August'],
      ['Missing journals', '3', '11, 12 and 13 August'],
      ['Documented frontend PRs', '10', 'nos. 76 to 85'],
      ['Documented backend PRs', '5', 'nos. 27 to 31']
    ],
    watchTitle: 'Limits and watchpoints',
    watch: [
      'No activity is inferred for 11, 12 and 13 August: a missing journal is not treated as an absence of work.',
      'The real ordinary-user journey remains deferred until a legitimate authorised account exists.',
      'LEGAL documentary progress measures records and evidence; it does not certify legal compliance.',
      'The Daily Intelligence Dashboard still needs a fully stabilised shared editorial master source.'
    ],
    nextTitle: 'Next actions',
    next: [
      'Validate the period, owning function and DMS location before promoting this review.',
      'Stabilise the Daily Intelligence Dashboard master source.',
      'Complete the RBAC check with an ordinary user during a legitimate onboarding.',
      'Continue qualifying LEGAL records without premature drafting or conclusions.'
    ],
    sourcesTitle: 'Source journals',
    showSources: 'Show source journals',
    hideSources: 'Hide source journals',
    sources: [
      'M3S_JOURNAL_DE_BORD_2026-08-10.md',
      'M3S_JOURNAL_DE_BORD_2026-08-14.md',
      'M3S_JOURNAL_DE_BORD_2026-08-15.md'
    ],
    governanceTitle: 'Proposed document workflow',
    governanceIntro: 'This workflow separates administrative consolidation, content validation, governance decision and evidence retention.',
    governanceSteps: [
      ['Administration', 'Consolidates journals, names the version and prepares the review.', 'Proposed owner'],
      ['Relevant functions', 'Check the facts and results within their scope.', 'Content validation'],
      ['Governance', 'Approves or refuses promotion to an institutional report.', 'Human decision'],
      ['DMS', 'Retains the source corpus, version, validations and approved report.', 'After approval']
    ],
    gedTitle: 'Candidate DMS location',
    gedPath: 'GED/Administration/Rapports_activite/2026/Hebdomadaires/2SG-ADM-RH-2026-W33-PILOTE',
    gedStatus: 'To be confirmed by Cheikh',
    promotionRule: 'Until the owner, workflow and DMS location are confirmed, this review remains a provisional working synthesis.',
    caution: 'This review is a working synthesis to be checked by Cheikh and the owning function. It is neither signed, adopted nor archived as an institutional report.'
  },
  DE: {
    eyebrow: 'PILOTRÜCKBLICK · TEILWEISE QUELLENABDECKUNG',
    title: 'Wochenrückblick vom 10. bis 15. August 2026',
    intro: 'Erste reale Konsolidierung des Verwaltungszyklus. Sie übernimmt ausschließlich Fakten aus den verfügbaren Journalen und weist Tage ohne Journal ausdrücklich aus.',
    metadata: [
      ['Kennung', '2SG-ADM-RH-2026-W33-PILOTE'],
      ['Bezugszeitraum', '10.–15. August 2026'],
      ['Umfang', 'Verwaltung und M3S-Grundlage'],
      ['Status', 'Vorläufige Arbeitsübersicht']
    ],
    coverageLabel: 'Quellenabdeckung',
    coverageValue: '3 Journale verfügbar · 3 Tage ohne Journal',
    resultsTitle: 'Dokumentierte Ergebnisse',
    results: [
      'Das bereichsübergreifende relationale Modell V1 wurde zusammengeführt und anschließend den tatsächlich beobachteten Tabellen und Endpoints zugeordnet.',
      'Die LEGAL-Dokumentationsbasis wurde konsolidiert und sichtbar gemacht, ohne eine rechtliche Konformität zu behaupten.',
      'Die Register Ressourcen und Korrespondenz verfügen über gesicherte Persistenz, ausdrückliche Berechtigungen und eine Auditspur.',
      'Die Produktionsdiagnostik wurde gehärtet und die generische Stichprobenfunktion in Produktion deaktiviert.',
      'Frontend-Demoprofile wurden neutral gestaltet und auf die lokale Entwicklung beschränkt.',
      'Berichtszyklus und Portfolio der wichtigen Akten wurden in die Verwaltung integriert.'
    ],
    indicatorsTitle: 'Belegte Kennzahlen',
    indicators: [
      ['Verwendete Journale', '3', '10., 14. und 15. August'],
      ['Fehlende Journale', '3', '11., 12. und 13. August'],
      ['Dokumentierte Frontend-PRs', '10', 'Nr. 76 bis 85'],
      ['Dokumentierte Backend-PRs', '5', 'Nr. 27 bis 31']
    ],
    watchTitle: 'Grenzen und Prüfpunkte',
    watch: [
      'Für den 11., 12. und 13. August wird keine Aktivität abgeleitet: Ein fehlendes Journal gilt nicht als fehlende Arbeit.',
      'Der reale Ablauf für gewöhnliche Benutzer bleibt vertagt, bis ein legitimes autorisiertes Konto besteht.',
      'Der LEGAL-Dokumentationsfortschritt misst Unterlagen und Nachweise; er bestätigt keine rechtliche Konformität.',
      'Das Daily Intelligence Dashboard benötigt weiterhin eine vollständig stabilisierte gemeinsame redaktionelle Hauptquelle.'
    ],
    nextTitle: 'Nächste Maßnahmen',
    next: [
      'Zeitraum, verantwortliche Funktion und DMS-Ablage vor einer Hochstufung dieses Rückblicks validieren.',
      'Die Hauptquelle des Daily Intelligence Dashboards stabilisieren.',
      'Die RBAC-Prüfung bei einem legitimen Onboarding mit einem gewöhnlichen Benutzer vervollständigen.',
      'LEGAL-Unterlagen weiter qualifizieren, ohne vorzeitige Texte oder Schlussfolgerungen.'
    ],
    sourcesTitle: 'Quelljournale',
    showSources: 'Quelljournale anzeigen',
    hideSources: 'Quelljournale ausblenden',
    sources: [
      'M3S_JOURNAL_DE_BORD_2026-08-10.md',
      'M3S_JOURNAL_DE_BORD_2026-08-14.md',
      'M3S_JOURNAL_DE_BORD_2026-08-15.md'
    ],
    governanceTitle: 'Vorgeschlagener Dokumentenprozess',
    governanceIntro: 'Dieser Prozess trennt administrative Konsolidierung, fachliche Prüfung, Governance-Entscheidung und Nachweisaufbewahrung.',
    governanceSteps: [
      ['Verwaltung', 'Konsolidiert die Journale, benennt die Version und bereitet den Rückblick vor.', 'Vorgeschlagene Verantwortung'],
      ['Betroffene Funktionen', 'Prüfen die Fakten und Ergebnisse in ihrem Zuständigkeitsbereich.', 'Fachliche Prüfung'],
      ['Governance', 'Genehmigt oder verweigert die Hochstufung zum institutionellen Bericht.', 'Menschliche Entscheidung'],
      ['DMS', 'Bewahrt Quellkorpus, Version, Prüfungen und genehmigten Bericht auf.', 'Nach Genehmigung']
    ],
    gedTitle: 'Vorgeschlagener DMS-Ablageort',
    gedPath: 'GED/Administration/Rapports_activite/2026/Hebdomadaires/2SG-ADM-RH-2026-W33-PILOTE',
    gedStatus: 'Von Cheikh zu bestätigen',
    promotionRule: 'Bis Verantwortung, Prozess und DMS-Ablage bestätigt sind, bleibt dieser Rückblick eine vorläufige Arbeitsübersicht.',
    caution: 'Dieser Rückblick ist eine Arbeitsübersicht, die von Cheikh und der verantwortlichen Funktion zu prüfen ist. Er ist weder unterzeichnet noch angenommen oder als institutioneller Bericht archiviert.'
  }
};

const GOVERNANCE_ICONS = [ClipboardCheck, UsersRound, ShieldCheck, Archive];

const AdministrationWeeklyReview = ({ language = 'FR' }) => {
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const t = COPY[language] || COPY.FR;

  return (
    <section className="mt-6 border-t border-slate-700 pt-6" aria-labelledby="weekly-review-title">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <CalendarRange className="mt-0.5 shrink-0 text-violet-700 dark:text-violet-300" size={22} aria-hidden="true" />
          <div>
            <p className="text-xs font-bold uppercase text-violet-700 dark:text-violet-300">{t.eyebrow}</p>
            <h4 id="weekly-review-title" className="mt-1 text-lg font-semibold text-slate-100">{t.title}</h4>
            <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-300">{t.intro}</p>
          </div>
        </div>
        <span className="w-fit shrink-0 rounded-full border border-amber-700 bg-amber-950/30 px-3 py-1 text-xs font-semibold text-amber-100">
          {t.metadata[3][1]}
        </span>
      </div>

      <dl className="mt-5 grid border-y border-slate-700 sm:grid-cols-2 xl:grid-cols-4">
        {t.metadata.map(([label, value]) => (
          <div key={label} className="border-b border-slate-700 px-3 py-4 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b-0 xl:border-r xl:last:border-r-0">
            <dt className="text-xs font-semibold uppercase text-slate-400">{label}</dt>
            <dd className="mt-1 text-sm font-semibold text-slate-100">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex items-start gap-3 rounded-md border border-amber-800/70 bg-amber-950/20 p-4">
        <FileClock className="mt-0.5 shrink-0 text-amber-300" size={19} aria-hidden="true" />
        <div>
          <p className="text-xs font-semibold uppercase text-amber-200">{t.coverageLabel}</p>
          <p className="mt-1 text-sm leading-5 text-slate-200">{t.coverageValue}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-emerald-300" size={19} aria-hidden="true" />
            <h5 className="font-semibold text-slate-100">{t.resultsTitle}</h5>
          </div>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {t.results.map(result => (
              <li key={result} className="flex items-start gap-2 border-b border-slate-700/80 py-2 text-sm leading-5 text-slate-300">
                <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={15} aria-hidden="true" />
                <span>{result}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <ListChecks className="text-blue-300" size={19} aria-hidden="true" />
            <h5 className="font-semibold text-slate-100">{t.indicatorsTitle}</h5>
          </div>
          <dl className="mt-3 divide-y divide-slate-700 border-y border-slate-700">
            {t.indicators.map(([label, value, detail]) => (
              <div key={label} className="grid grid-cols-[1fr_auto] gap-3 py-3">
                <div>
                  <dt className="text-sm font-semibold text-slate-200">{label}</dt>
                  <dd className="mt-1 text-xs text-slate-400">{detail}</dd>
                </div>
                <dd className="text-xl font-semibold text-blue-200">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-amber-300" size={19} aria-hidden="true" />
            <h5 className="font-semibold text-slate-100">{t.watchTitle}</h5>
          </div>
          <ul className="mt-3 space-y-2 text-sm leading-5 text-slate-300">
            {t.watch.map(item => <li key={item} className="border-l-2 border-amber-600 pl-3">{item}</li>)}
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <ListChecks className="text-cyan-300" size={19} aria-hidden="true" />
            <h5 className="font-semibold text-slate-100">{t.nextTitle}</h5>
          </div>
          <ol className="mt-3 space-y-2 text-sm leading-5 text-slate-300">
            {t.next.map((item, index) => (
              <li key={item} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-950 text-xs font-bold text-cyan-100">{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-700 pt-5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 shrink-0 text-cyan-300" size={20} aria-hidden="true" />
          <div>
            <h5 className="font-semibold text-slate-100">{t.governanceTitle}</h5>
            <p className="mt-1 max-w-5xl text-sm leading-5 text-slate-300">{t.governanceIntro}</p>
          </div>
        </div>
        <ol className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {t.governanceSteps.map(([label, detail, status], index) => {
            const StepIcon = GOVERNANCE_ICONS[index];
            return (
              <li key={label} className="min-h-40 border border-slate-700 bg-slate-900/35 p-4 transition-colors hover:border-sky-600 hover:bg-slate-900/60">
                <div className="flex items-center justify-between gap-3">
                  <StepIcon className="shrink-0 text-cyan-300" size={19} aria-hidden="true" />
                  <span className="text-xs font-semibold text-slate-400">{index + 1}/4</span>
                </div>
                <h6 className="mt-3 text-sm font-semibold text-slate-100">{label}</h6>
                <p className="mt-2 text-sm leading-5 text-slate-300">{detail}</p>
                <p className="mt-3 text-xs font-semibold uppercase text-cyan-300">{status}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-4 grid gap-4 border border-dashed border-sky-700 bg-sky-950/15 p-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase text-cyan-300">{t.gedTitle}</p>
            <p className="mt-2 break-all font-mono text-xs leading-5 text-slate-200">{t.gedPath}</p>
          </div>
          <span className="w-fit border border-amber-700 bg-amber-950/30 px-3 py-2 text-xs font-semibold text-amber-100">
            {t.gedStatus}
          </span>
        </div>
        <p className="mt-3 border-l-2 border-sky-600 pl-3 text-xs leading-5 text-slate-400">{t.promotionRule}</p>
      </div>

      <div className="mt-5 border-t border-slate-700 pt-4">
        <button
          type="button"
          onClick={() => setSourcesOpen(open => !open)}
          aria-expanded={sourcesOpen}
          className="inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-100 transition-colors hover:border-blue-500 hover:bg-blue-950/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <FileText size={17} aria-hidden="true" />
          {sourcesOpen ? t.hideSources : t.showSources}
          <ChevronDown className={`transition-transform ${sourcesOpen ? 'rotate-180' : ''}`} size={16} aria-hidden="true" />
        </button>
        {sourcesOpen && (
          <div className="mt-3" aria-label={t.sourcesTitle}>
            <h5 className="text-sm font-semibold text-slate-100">{t.sourcesTitle}</h5>
            <ul className="mt-2 space-y-1 text-xs leading-5 text-slate-400">
              {t.sources.map(source => <li key={source} className="break-all font-mono">{source}</li>)}
            </ul>
          </div>
        )}
      </div>

      <p className="mt-4 border-l-2 border-violet-500 pl-3 text-xs leading-5 text-slate-400">{t.caution}</p>
    </section>
  );
};

export default AdministrationWeeklyReview;
