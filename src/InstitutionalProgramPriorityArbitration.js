import React from 'react';
import { ArrowRight, CirclePause, ClipboardCheck, Inbox, LockKeyhole, Route, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'ARBITRAGE GLOBAL CANDIDAT · PGM-PRI-001 · V0.1 · 01-09-2026',
    title: 'Un seul prochain lot, sans rouvrir les travaux déjà cadrés',
    intro: 'La priorité proposée repose sur la dépendance institutionnelle, la disponibilité du cadrage, la taille du lot et l’absence d’activation sensible. Elle n’établit ni taux de réalisation ni décision définitive.',
    recommendation: 'Priorité candidate n° 1',
    recommendationTitle: 'Conception · revue groupée des 6 composantes',
    recommendationBody: 'Faire remonter, dans une seule matrice, le périmètre cible, les résultats attendus, les tâches, les preuves et les points ouverts des six composantes déjà cadrées. La validation porte ensuite sur le lot complet, avec exceptions explicites seulement.',
    reasons: ['Étape amont des trois autres étapes', 'Six composantes déjà cadrées', 'Lot borné et contrôlable', 'Aucune ouverture opérationnelle nécessaire'],
    lanes: [
      ['1', 'Conception', 'Préparer la revue groupée', 'Candidat actif'],
      ['2', 'Mise en place', 'Conserver les 7/7 publications', 'Ne pas rouvrir'],
      ['3', 'Consolidation', 'Conserver les 8/8 cadres confirmés', 'REF-01 sous veille'],
      ['4', 'Dynamisation', 'Attendre les dépendances amont', 'Lot ultérieur']
    ],
    currentFlow: 'Activité courante',
    currentFlowBody: 'La boîte d’entrée M3S reste le flux continu de capture et de triage. Elle protège le Programme de la dette quotidienne sans devenir une cinquième étape institutionnelle.',
    refWatch: 'REF-01 reste en attente probatoire',
    refWatchBody: 'Aucune reprise sans nouvelle preuve de production recevable ou contradiction documentée. Aucun REF-02 n’est ouvert automatiquement.',
    boundary: 'Candidat seulement : préparer la matrice ne vaut ni validation des six composantes, ni exécution, ni calcul de progression.',
    next: 'Prochain arbitrage groupé',
    confirmation: 'Confirmer PGM-PRI-001 V0.1 comme priorité candidate et autoriser la préparation d’une matrice unique de revue des six composantes de Conception, sans ouvrir leur exécution.'
  },
  EN: {
    eyebrow: 'CANDIDATE GLOBAL PRIORITISATION · PGM-PRI-001 · V0.1 · 1 SEP 2026',
    title: 'One next package, without reopening already framed work',
    intro: 'The proposed priority is based on institutional dependency, framing availability, package size and the absence of sensitive activation. It establishes neither a completion rate nor a final decision.',
    recommendation: 'Candidate priority no. 1',
    recommendationTitle: 'Design · grouped review of the 6 components',
    recommendationBody: 'Surface, in one matrix, the target scope, expected outcomes, tasks, evidence and open points of the six components already framed. The subsequent validation covers the complete package, with explicit exceptions only.',
    reasons: ['Upstream stage for the other three stages', 'Six components already framed', 'Bounded and controllable package', 'No operational activation required'],
    lanes: [
      ['1', 'Design', 'Prepare the grouped review', 'Active candidate'],
      ['2', 'Implementation', 'Preserve the 7/7 publications', 'Do not reopen'],
      ['3', 'Consolidation', 'Preserve the 8/8 confirmed frameworks', 'REF-01 on watch'],
      ['4', 'Dynamisation', 'Wait for upstream dependencies', 'Later package']
    ],
    currentFlow: 'Current activity',
    currentFlowBody: 'The M3S inbox remains the continuous capture and triage flow. It protects the Programme from daily backlog without becoming a fifth institutional stage.',
    refWatch: 'REF-01 remains in evidentiary waiting',
    refWatchBody: 'No resumption without new admissible production evidence or a documented contradiction. No REF-02 is opened automatically.',
    boundary: 'Candidate only: preparing the matrix is neither validation of the six components, execution nor progress calculation.',
    next: 'Next grouped decision',
    confirmation: 'Confirm PGM-PRI-001 V0.1 as the candidate priority and authorise preparation of one review matrix for the six Design components, without opening their execution.'
  },
  DE: {
    eyebrow: 'KANDIDAT FÜR DIE GESAMTPRIORISIERUNG · PGM-PRI-001 · V0.1 · 01.09.2026',
    title: 'Ein nächstes Paket, ohne bereits strukturierte Arbeiten neu zu öffnen',
    intro: 'Die vorgeschlagene Priorität beruht auf institutioneller Abhängigkeit, vorhandenem Rahmen, Paketgrösse und dem Fehlen einer sensiblen Aktivierung. Sie legt weder einen Fertigstellungsgrad noch einen endgültigen Entscheid fest.',
    recommendation: 'Prioritätskandidat Nr. 1',
    recommendationTitle: 'Konzeption · gebündelte Prüfung der 6 Komponenten',
    recommendationBody: 'Zielumfang, erwartete Ergebnisse, Aufgaben, Nachweise und offene Punkte der sechs bereits strukturierten Komponenten werden in einer einzigen Matrix sichtbar gemacht. Die anschliessende Validierung betrifft das Gesamtpaket; nur Ausnahmen werden einzeln ausgewiesen.',
    reasons: ['Vorgelagerte Stufe für die drei anderen Stufen', 'Sechs bereits strukturierte Komponenten', 'Begrenztes und kontrollierbares Paket', 'Keine operative Aktivierung erforderlich'],
    lanes: [
      ['1', 'Konzeption', 'Gebündelte Prüfung vorbereiten', 'Aktiver Kandidat'],
      ['2', 'Umsetzung', 'Die 7/7 Veröffentlichungen bewahren', 'Nicht neu öffnen'],
      ['3', 'Konsolidierung', 'Die 8/8 bestätigten Rahmen bewahren', 'REF-01 unter Beobachtung'],
      ['4', 'Dynamisierung', 'Vorgelagerte Abhängigkeiten abwarten', 'Späteres Paket']
    ],
    currentFlow: 'Laufende Aktivität',
    currentFlowBody: 'Der M3S-Posteingang bleibt der kontinuierliche Erfassungs- und Triagefluss. Er schützt das Programm vor täglichem Rückstau, ohne eine fünfte institutionelle Stufe zu werden.',
    refWatch: 'REF-01 bleibt in beweisbezogenem Warten',
    refWatchBody: 'Keine Wiederaufnahme ohne neuen zulässigen Produktionsnachweis oder dokumentierten Widerspruch. REF-02 wird nicht automatisch eröffnet.',
    boundary: 'Nur Kandidat: Die Vorbereitung der Matrix ist weder Validierung der sechs Komponenten noch Ausführung oder Fortschrittsberechnung.',
    next: 'Nächster gebündelter Entscheid',
    confirmation: 'PGM-PRI-001 V0.1 als Prioritätskandidat bestätigen und die Vorbereitung einer einzigen Prüfmatrix für die sechs Konzeptionskomponenten erlauben, ohne ihre Ausführung zu eröffnen.'
  }
};

const InstitutionalProgramPriorityArbitration = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section id="institutional-program-priority-arbitration" data-testid="institutional-program-priority-arbitration" className="scroll-mt-24 m3s-panel p-4 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl">
          <p className="text-xs font-semibold uppercase text-cyan-300">{t.eyebrow}</p>
          <h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p>
        </div>
        <Route className="shrink-0 text-cyan-300" size={28} aria-hidden="true" />
      </div>

      <article className="mt-4 rounded-md border border-cyan-700/70 bg-cyan-950/20 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase text-cyan-200">{t.recommendation}</p>
            <h5 className="mt-1 text-base font-semibold text-slate-100">{t.recommendationTitle}</h5>
            <p className="mt-2 text-sm leading-6 text-slate-300">{t.recommendationBody}</p>
          </div>
          <ClipboardCheck className="shrink-0 text-cyan-300" size={25} aria-hidden="true" />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {t.reasons.map((reason) => (
            <p key={reason} className="flex min-h-12 items-center gap-2 rounded-md border border-slate-700 bg-slate-950/25 px-3 py-2 text-xs font-semibold leading-5 text-slate-200">
              <ShieldCheck size={16} className="shrink-0 text-emerald-300" aria-hidden="true" />{reason}
            </p>
          ))}
        </div>
      </article>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {t.lanes.map(([number, title, action, status], index) => (
          <article key={title} className={`m3s-raised min-h-36 border-l-2 p-3 ${index === 0 ? 'border-l-cyan-400' : 'border-l-slate-600'}`}>
            <div className="flex items-center justify-between gap-3">
              <span className={`inline-flex h-7 w-7 items-center justify-center rounded-md text-xs font-semibold ${index === 0 ? 'bg-cyan-950/60 text-cyan-200' : 'bg-slate-800 text-slate-300'}`}>{number}</span>
              <span className={`text-xs font-semibold ${index === 0 ? 'text-cyan-300' : 'text-slate-400'}`}>{status}</span>
            </div>
            <h5 className="mt-3 text-sm font-semibold text-slate-100">{title}</h5>
            <p className="mt-2 text-xs leading-5 text-slate-300">{action}</p>
          </article>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
        <article className="flex items-start gap-3 rounded-md border border-blue-800/70 bg-blue-950/15 p-3">
          <Inbox className="mt-0.5 shrink-0 text-blue-300" size={19} aria-hidden="true" />
          <div><h5 className="text-sm font-semibold text-blue-100">{t.currentFlow}</h5><p className="mt-1 text-xs leading-5 text-slate-300">{t.currentFlowBody}</p></div>
        </article>
        <article className="flex items-start gap-3 rounded-md border border-amber-800/70 bg-amber-950/15 p-3">
          <CirclePause className="mt-0.5 shrink-0 text-amber-300" size={19} aria-hidden="true" />
          <div><h5 className="text-sm font-semibold text-amber-100">{t.refWatch}</h5><p className="mt-1 text-xs leading-5 text-slate-300">{t.refWatchBody}</p></div>
        </article>
      </div>

      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/25 p-3">
        <p className="flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><LockKeyhole className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
        <div className="mt-3 border-t border-slate-700 pt-3">
          <p className="text-xs font-semibold uppercase text-slate-400">{t.next}</p>
          <p className="mt-1 flex items-start gap-2 text-sm font-semibold leading-6 text-slate-100"><ArrowRight className="mt-1 shrink-0 text-cyan-300" size={17} aria-hidden="true" />{t.confirmation}</p>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalProgramPriorityArbitration;
