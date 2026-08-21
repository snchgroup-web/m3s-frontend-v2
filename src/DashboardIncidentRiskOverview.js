import React from 'react';
import { AlertTriangle, ArrowRight, Landmark, Scale, ShieldAlert, Waves } from 'lucide-react';
import {
  ADMINISTRATION_PORTFOLIO_AS_OF,
  getAdministrationPortfolioRecords
} from './AdministrationPortfolioOverview';

const COPY = {
  FR: {
    eyebrow: 'REGISTRE TRANSVERSAL · CADRAGE PILOTE',
    title: 'Incidents & Risques',
    body: 'Cette vue relie les événements observés, les risques traités et les actions résiduelles aux dossiers qui les gouvernent. Elle ne remplace ni les registres métier ni les pièces conservées dans la GED.',
    scopeNotice: 'Cas de référence affichés · aucun total global publié',
    asOf: 'Dernier point consolidé',
    classification: 'Qualification',
    status: 'Dernier état documenté',
    next: 'Action résiduelle ou prochaine étape',
    source: 'Provenance',
    owner: 'Responsable du suivi',
    ownerPending: 'À confirmer dans le registre gouverné',
    open: 'Ouvrir le dossier source',
    restricted: 'Accès restreint',
    protectedBody: 'Un contentieux juridique lié à Villa LR1 est signalé. Le nom des parties, les griefs, les références judiciaires, les échéances et les pièces ne sont pas reproduits dans cette vue transversale.',
    protectedStatus: 'Dossier signalé · détails protégés',
    protectedNext: 'Consulter le registre juridique depuis un accès autorisé et y confirmer responsable, juridiction, références, échéances et prochaines actions.',
    protectedSource: 'Administration · Conformité · source autorisée requise',
    classifications: {
      windows: 'Risque traité · travaux correctifs',
      water: 'Incident observé · continuité de service',
      legal: 'Contentieux juridique · dossier protégé'
    },
    ruleTitle: 'Règle avant indicateur',
    ruleBody: 'Un KPI global ne pourra compter les incidents et risques qu’après raccordement d’une source autorisée et validation d’une règle commune de qualification, de responsabilité, de statut, de clôture et de dédoublonnage.',
    ruleItems: ['Identifiant unique', 'Source et date', 'Nature distincte', 'Responsable confirmé', 'Statut et clôture vérifiables']
  },
  EN: {
    eyebrow: 'CROSS-FUNCTIONAL REGISTER · PILOT FRAMEWORK',
    title: 'Incidents & Risks',
    body: 'This view links observed events, treated risks and residual actions to their governed files. It replaces neither business registers nor evidence retained in the DMS.',
    scopeNotice: 'Reference cases shown · no global total published',
    asOf: 'Latest consolidated checkpoint',
    classification: 'Classification',
    status: 'Latest documented state',
    next: 'Residual action or next step',
    source: 'Provenance',
    owner: 'Follow-up owner',
    ownerPending: 'To be confirmed in the governed register',
    open: 'Open source file',
    restricted: 'Restricted access',
    protectedBody: 'A legal dispute related to Villa LR1 has been reported. Party names, allegations, court references, deadlines and records are not reproduced in this cross-functional view.',
    protectedStatus: 'File reported · details protected',
    protectedNext: 'Consult the legal register through authorised access and confirm its owner, jurisdiction, references, deadlines and next actions there.',
    protectedSource: 'Administration · Compliance · authorised source required',
    classifications: {
      windows: 'Treated risk · corrective work',
      water: 'Observed incident · service continuity',
      legal: 'Legal dispute · protected file'
    },
    ruleTitle: 'Rule before indicator',
    ruleBody: 'A global KPI may count incidents and risks only after an authorised source is connected and common rules for classification, ownership, status, closure and deduplication are approved.',
    ruleItems: ['Unique identifier', 'Source and date', 'Distinct nature', 'Confirmed owner', 'Verifiable status and closure']
  },
  DE: {
    eyebrow: 'FUNKTIONSÜBERGREIFENDES REGISTER · PILOTRAHMEN',
    title: 'Vorfälle & Risiken',
    body: 'Diese Ansicht verbindet beobachtete Ereignisse, behandelte Risiken und Restmaßnahmen mit den gesteuerten Akten. Sie ersetzt weder Fachregister noch die in der GED aufbewahrten Nachweise.',
    scopeNotice: 'Referenzfälle angezeigt · keine globale Summe veröffentlicht',
    asOf: 'Letzter konsolidierter Stand',
    classification: 'Einordnung',
    status: 'Letzter dokumentierter Stand',
    next: 'Restmaßnahme oder nächster Schritt',
    source: 'Herkunft',
    owner: 'Verantwortung für die Nachverfolgung',
    ownerPending: 'Im gesteuerten Register zu bestätigen',
    open: 'Quellakte öffnen',
    restricted: 'Eingeschränkter Zugriff',
    protectedBody: 'Ein Rechtsstreit im Zusammenhang mit Villa LR1 wurde gemeldet. Namen der Parteien, Vorwürfe, Gerichtsaktenzeichen, Fristen und Unterlagen werden in dieser funktionsübergreifenden Ansicht nicht wiedergegeben.',
    protectedStatus: 'Akte gemeldet · Einzelheiten geschützt',
    protectedNext: 'Das Rechtsregister mit autorisiertem Zugriff öffnen und dort Verantwortung, Gericht, Aktenzeichen, Fristen und nächste Schritte bestätigen.',
    protectedSource: 'Verwaltung · Compliance · autorisierte Quelle erforderlich',
    classifications: {
      windows: 'Behandeltes Risiko · Korrekturarbeiten',
      water: 'Beobachteter Vorfall · Betriebskontinuität',
      legal: 'Rechtsstreit · geschützte Akte'
    },
    ruleTitle: 'Regel vor Kennzahl',
    ruleBody: 'Eine globale Kennzahl darf Vorfälle und Risiken erst zählen, wenn eine autorisierte Quelle angebunden und gemeinsame Regeln für Einordnung, Verantwortung, Status, Abschluss und Dublettenprüfung freigegeben sind.',
    ruleItems: ['Eindeutige Kennung', 'Quelle und Datum', 'Getrennte Art', 'Bestätigte Verantwortung', 'Prüfbarer Status und Abschluss']
  }
};

const CASES = [
  { id: 'windows', icon: Landmark, tone: 'border-blue-800 bg-blue-950/20 text-blue-300' },
  { id: 'water', icon: Waves, tone: 'border-cyan-800 bg-cyan-950/20 text-cyan-300' },
  { id: 'legal', icon: Scale, tone: 'border-amber-800 bg-amber-950/20 text-amber-300', restricted: true }
];

const formatDate = (value, language) => new Intl.DateTimeFormat(
  language === 'DE' ? 'de-CH' : language === 'EN' ? 'en-GB' : 'fr-CH',
  { day: '2-digit', month: '2-digit', year: 'numeric' }
).format(new Date(`${value}T12:00:00`));

const DashboardIncidentRiskOverview = ({ language = 'FR', onNavigate }) => {
  const t = COPY[language] || COPY.FR;
  const records = getAdministrationPortfolioRecords(language);
  const recordById = Object.fromEntries(records.map(record => [record.id, record]));

  return (
    <div className="mt-5">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-blue-300">{t.eyebrow}</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-100">{t.title}</h3>
          <p className="mt-1 max-w-5xl text-sm leading-6 text-slate-400">{t.body}</p>
        </div>
        <div className="shrink-0 text-left lg:text-right">
          <p className="text-xs font-semibold text-amber-300">{t.scopeNotice}</p>
          <p className="mt-1 text-xs text-slate-500">{t.asOf} · {formatDate(ADMINISTRATION_PORTFOLIO_AS_OF, language)}</p>
        </div>
      </header>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-3">
        {CASES.map(({ id, icon: Icon, tone, restricted }) => {
          const record = recordById[id];
          const title = restricted ? (language === 'DE' ? 'Rechtsakte Villa LR1' : language === 'EN' ? 'Villa LR1 legal file' : 'Dossier juridique Villa LR1') : record.title;
          const body = restricted ? t.protectedBody : record.summary;
          const status = restricted ? t.protectedStatus : record.status;
          const next = restricted ? t.protectedNext : record.next;
          const source = restricted ? t.protectedSource : record.source;
          const destination = restricted
            ? '/administration?tab=compliance&returnTo=dashboard&dashboardView=incidents#compliance-register'
            : '/administration?tab=overview&returnTo=dashboard&dashboardView=incidents#administration-portfolio';

          return (
            <article key={id} className="flex min-h-[29rem] flex-col rounded-md border border-slate-700 bg-slate-900/35 p-4">
              <div className="flex items-start justify-between gap-3">
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-md border ${tone}`}><Icon size={20} aria-hidden="true" /></span>
                {restricted && <span className="inline-flex items-center gap-1 rounded-full border border-amber-800 bg-amber-950/30 px-2.5 py-1 text-xs font-semibold text-amber-200"><ShieldAlert size={14} aria-hidden="true" />{t.restricted}</span>}
              </div>
              <p className="mt-4 text-xs font-semibold uppercase text-blue-300">{t.classification}</p>
              <p className="mt-1 text-sm font-semibold text-slate-200">{t.classifications[id]}</p>
              <h4 className="mt-4 text-base font-semibold text-slate-100">{title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
              <dl className="mt-4 space-y-3 border-t border-slate-700 pt-4 text-sm">
                <div><dt className="text-xs font-semibold uppercase text-slate-500">{t.status}</dt><dd className="mt-1 font-medium text-slate-200">{status}</dd></div>
                <div><dt className="text-xs font-semibold uppercase text-slate-500">{t.next}</dt><dd className="mt-1 leading-5 text-slate-300">{next}</dd></div>
                <div><dt className="text-xs font-semibold uppercase text-slate-500">{t.owner}</dt><dd className="mt-1 text-amber-200">{t.ownerPending}</dd></div>
                <div><dt className="text-xs font-semibold uppercase text-slate-500">{t.source}</dt><dd className="mt-1 break-words text-xs leading-5 text-slate-400">{source}</dd></div>
              </dl>
              <button type="button" onClick={() => onNavigate(destination)} className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600">
                {t.open}<ArrowRight size={16} aria-hidden="true" />
              </button>
            </article>
          );
        })}
      </div>

      <aside className="mt-4 rounded-md border border-amber-800/70 bg-amber-950/15 p-4" aria-labelledby="incident-kpi-rule">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 shrink-0 text-amber-300" size={20} aria-hidden="true" />
          <div>
            <h4 id="incident-kpi-rule" className="text-sm font-semibold text-slate-100">{t.ruleTitle}</h4>
            <p className="mt-1 text-sm leading-6 text-slate-400">{t.ruleBody}</p>
            <div className="mt-3 flex flex-wrap gap-2">{t.ruleItems.map(item => <span key={item} className="rounded-full border border-slate-700 bg-slate-900/60 px-2.5 py-1 text-xs font-medium text-slate-300">{item}</span>)}</div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default DashboardIncidentRiskOverview;
