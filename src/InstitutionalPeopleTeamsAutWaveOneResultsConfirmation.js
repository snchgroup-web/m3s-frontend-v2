import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DES RÉSULTATS · REF-01-DEC-024 · V1.0 · 27-08-2026',
    title: 'Accepter les preuves préparatoires et rétablir le sens des autorisations',
    intro: 'Cheikh confirme RES-001 V0.1, les résultats préparatoires AUT-A/AUT-B et la correction de correspondance AUT-C/AUT-D. RES-001 est promue en V1.0 sans transformer ces éléments préparatoires en preuve de fonctionnement réel.',
    counters: [['Support confirmé', '1/1', 'RES-001 V1.0'], ['Résultats acceptés', '2/2', 'AUT-A et AUT-B'], ['Correspondances corrigées', '2/2', 'AUT-C et AUT-D'], ['Actions réelles', '0', 'G1 ouverte · L2 fermé']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-024', version: 'V1.0', status: 'RES-001 confirmée et correspondance AUT-C/AUT-D rétablie', author: 'Cheikh Ndiaye', date: '27-08-2026',
      decision: 'REF-01-G1-RES-001 V0.1 est confirmée et promue en V1.0. Les dix sources officielles AUT-A et les sept contrôles synthétiques AUT-B sont acceptés comme résultats préparatoires. La chaîne source REQ-001 est restaurée : AUT-C signifie « Coûts et capacité » et AUT-D « Gouvernance interne ». La relecture indépendante et la revue croisée restent des contrôles de processus sans code AUT distinct.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 27-08-2026 : « je confirme tout et merci de corriger, et de continuer ».',
      limit: 'L’acceptation ne prouve aucune sauvegarde réelle, restauration pg_restore/PITR, supervision, capacité, RPO, RTO, conformité, source maîtresse ou aptitude à la production. Elle n’autorise aucun fournisseur, prix contractuel, compte, accès réel, donnée réelle, contact, envoi, fermeture de G1 ou ouverture de L2.'
    },
    status: 'CONFIRMÉ ET CORRIGÉ · RES-001 V1.0 devient la trace gouvernée des résultats A/B et de la restauration C/D.',
    next: 'Étape préparée : CD-001 V0.1 cadre séparément AUT-C « Coûts et capacité » et AUT-D « Gouvernance interne ». Sa confirmation sera requise avant leur exécution documentaire.',
    boundary: 'Aucun montant, fournisseur, capacité réelle, droit d’accès ou décision de production n’est déduit de cette confirmation.'
  },
  EN: {
    eyebrow: 'HUMAN RESULTS CONFIRMATION · REF-01-DEC-024 · V1.0 · 27 AUG 2026',
    title: 'Accept preparatory evidence and restore the meaning of the authorisations',
    intro: 'Cheikh confirms RES-001 V0.1, the preparatory AUT-A/AUT-B results and the AUT-C/AUT-D mapping correction. RES-001 is promoted to V1.0 without turning preparatory items into evidence of real operation.',
    counters: [['Confirmed record', '1/1', 'RES-001 V1.0'], ['Accepted results', '2/2', 'AUT-A and AUT-B'], ['Corrected mappings', '2/2', 'AUT-C and AUT-D'], ['Real actions', '0', 'G1 open · L2 closed']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-024', version: 'V1.0', status: 'RES-001 confirmed and AUT-C/AUT-D mapping restored', author: 'Cheikh Ndiaye', date: '27 Aug 2026',
      decision: 'REF-01-G1-RES-001 V0.1 is confirmed and promoted to V1.0. The ten AUT-A official sources and seven AUT-B synthetic checks are accepted as preparatory results. The REQ-001 source chain is restored: AUT-C means “Costs and capacity” and AUT-D “Internal governance”. Independent and cross-review remain process controls without a separate AUT code.',
      evidence: 'Explicit confirmation by Cheikh during the 27 Aug 2026 session: “je confirme tout et merci de corriger, et de continuer”.',
      limit: 'Acceptance proves no real backup, pg_restore/PITR restoration, monitoring, capacity, RPO, RTO, compliance, master source or production readiness. It authorises no provider, contractual price, account, real access, real data, contact, send, G1 closure or L2 opening.'
    },
    status: 'CONFIRMED AND CORRECTED · RES-001 V1.0 becomes the governed trace for A/B results and the C/D restoration.',
    next: 'Prepared step: CD-001 V0.1 frames AUT-C “Costs and capacity” and AUT-D “Internal governance” separately. Confirmation is required before their documentary execution.',
    boundary: 'No amount, provider, real capacity, access right or production decision is inferred from this confirmation.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE ERGEBNISBESTÄTIGUNG · REF-01-DEC-024 · V1.0 · 27.08.2026',
    title: 'Vorbereitende Nachweise annehmen und die Bedeutung der Autorisierungen wiederherstellen',
    intro: 'Cheikh bestätigt RES-001 V0.1, die vorbereitenden AUT-A-/AUT-B-Ergebnisse und die Korrektur der AUT-C-/AUT-D-Zuordnung. RES-001 wird zu V1.0, ohne vorbereitende Elemente als Nachweis eines realen Betriebs darzustellen.',
    counters: [['Bestätigter Nachweis', '1/1', 'RES-001 V1.0'], ['Angenommene Ergebnisse', '2/2', 'AUT-A und AUT-B'], ['Korrigierte Zuordnungen', '2/2', 'AUT-C und AUT-D'], ['Reale Aktionen', '0', 'G1 offen · L2 geschlossen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-024', version: 'V1.0', status: 'RES-001 bestätigt und AUT-C-/AUT-D-Zuordnung wiederhergestellt', author: 'Cheikh Ndiaye', date: '27.08.2026',
      decision: 'REF-01-G1-RES-001 V0.1 ist bestätigt und wird zu V1.0. Die zehn offiziellen AUT-A-Quellen und sieben synthetischen AUT-B-Kontrollen werden als vorbereitende Ergebnisse angenommen. Die REQ-001-Quellenkette wird wiederhergestellt: AUT-C bedeutet „Kosten und Kapazität“ und AUT-D „Interne Governance“. Unabhängige Prüfung und Gegenprüfung bleiben Prozesskontrollen ohne eigenen AUT-Code.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 27.08.2026: « je confirme tout et merci de corriger, et de continuer ».',
      limit: 'Die Annahme belegt keine reale Sicherung, pg_restore-/PITR-Wiederherstellung, Überwachung, Kapazität, RPO, RTO, Compliance, Masterquelle oder Produktionsreife. Sie erlaubt keinen Anbieter, Vertragspreis, Konto, Realzugriff, Echtdaten, Kontakt, Versand, G1-Abschluss oder L2-Öffnung.'
    },
    status: 'BESTÄTIGT UND KORRIGIERT · RES-001 V1.0 wird zur gesteuerten Spur der A/B-Ergebnisse und der C/D-Wiederherstellung.',
    next: 'Vorbereiteter Schritt: CD-001 V0.1 strukturiert AUT-C „Kosten und Kapazität“ und AUT-D „Interne Governance“ getrennt. Vor ihrer Dokumentausführung ist eine Bestätigung erforderlich.',
    boundary: 'Aus dieser Bestätigung werden kein Betrag, Anbieter, reale Kapazität, Zugriffsrecht oder Produktionsentscheid abgeleitet.'
  }
};

const InstitutionalPeopleTeamsAutWaveOneResultsConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-aut-results-confirmation" className="mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-aut-results-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-aut-results-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 3 ? <BadgeCheck className="text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsAutWaveOneResultsConfirmation;
