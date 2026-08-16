import React from 'react';
import {
  ArrowRight,
  BriefcaseBusiness,
  FileCheck2,
  FileOutput,
  Inbox,
  Link2,
  ShieldCheck,
  UserRoundCheck
} from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'CAS PILOTE RELATIONNEL 3/3 · ADMINISTRATION',
    title: 'Mission externe bornée et contrôlée',
    body: 'Ce cas applique le contrat transversal à une mission documentaire réelle sans afficher son contenu, ses pièces ou une donnée personnelle. Il sépare la circulation du travail, le verdict documentaire et la décision humaine.',
    status: 'Cadrage validé',
    steps: [
      ['Signal qualifié', 'Besoin, provenance, urgence et sensibilité.', Inbox],
      ['Dossier de mission', 'Périmètre, service, garde-fous et références.', BriefcaseBusiness],
      ['Affectation', 'Responsable interne et service exécutant avec rôles distincts.', UserRoundCheck],
      ['Livrable', 'Résultat reçu et référencé sans être validé automatiquement.', FileOutput],
      ['Contrôle', 'Fidélité, provenance, omissions et extrapolations.', FileCheck2],
      ['Décision humaine', 'Intégrer, corriger ou archiver avec une trace explicite.', ShieldCheck]
    ],
    rulesTitle: 'Relations confirmées',
    rules: [
      'L’état de circulation et le verdict documentaire restent deux champs distincts.',
      'Un service externe exécute une mission ; il ne devient ni responsable métier ni validateur final.',
      'Un même dossier peut recevoir plusieurs livrables, contrôles et preuves GED.',
      'Aucune mission restreinte ne conserve son contenu ou son chemin sensible dans le navigateur.'
    ],
    cardinality: '1 dossier de mission → 1+ affectations, 0+ livrables, 0+ contrôles, puis 1 décision humaine finale.',
    note: 'Validation limitée au cadrage et à l’interface. Aucun schéma de production, droit d’accès ou automatisme d’exécution n’est créé par cette vue.'
  },
  EN: {
    eyebrow: 'RELATIONAL PILOT 3/3 · ADMINISTRATION',
    title: 'Bounded and controlled external mission',
    body: 'This case applies the shared contract to a real documentary mission without displaying its content, attachments or personal data. It separates work circulation, documentary verdict and human decision.',
    status: 'Framing validated',
    steps: [
      ['Qualified signal', 'Need, provenance, urgency and sensitivity.', Inbox],
      ['Mission file', 'Scope, service, guardrails and references.', BriefcaseBusiness],
      ['Assignment', 'Internal owner and executing service with distinct roles.', UserRoundCheck],
      ['Deliverable', 'Received and referenced result without automatic approval.', FileOutput],
      ['Review', 'Fidelity, provenance, omissions and extrapolations.', FileCheck2],
      ['Human decision', 'Integrate, correct or archive with an explicit trace.', ShieldCheck]
    ],
    rulesTitle: 'Confirmed relationships',
    rules: [
      'Circulation state and documentary verdict remain separate fields.',
      'An external service performs a mission; it becomes neither business owner nor final approver.',
      'One file may receive several deliverables, reviews and DMS evidence items.',
      'No restricted mission stores its content or sensitive path in the browser.'
    ],
    cardinality: '1 mission file → 1+ assignments, 0+ deliverables, 0+ reviews, then 1 final human decision.',
    note: 'Validation is limited to framing and the interface. This view creates no production schema, access right or execution automation.'
  },
  DE: {
    eyebrow: 'RELATIONALER PILOTFALL 3/3 · VERWALTUNG',
    title: 'Begrenzte und kontrollierte externe Aufgabe',
    body: 'Dieser Fall wendet den gemeinsamen Vertrag auf eine reale Dokumentenaufgabe an, ohne Inhalt, Anlagen oder personenbezogene Daten anzuzeigen. Arbeitsumlauf, Dokumentenurteil und menschlicher Entscheid bleiben getrennt.',
    status: 'Rahmen validiert',
    steps: [
      ['Qualifiziertes Signal', 'Bedarf, Herkunft, Dringlichkeit und Vertraulichkeit.', Inbox],
      ['Aufgabenakte', 'Umfang, Dienst, Leitplanken und Referenzen.', BriefcaseBusiness],
      ['Zuordnung', 'Interne Verantwortung und ausführender Dienst mit getrennten Rollen.', UserRoundCheck],
      ['Ergebnis', 'Empfangen und referenziert, ohne automatische Freigabe.', FileOutput],
      ['Kontrolle', 'Treue, Herkunft, Auslassungen und Ableitungen.', FileCheck2],
      ['Menschlicher Entscheid', 'Integrieren, korrigieren oder mit klarer Spur archivieren.', ShieldCheck]
    ],
    rulesTitle: 'Bestätigte Beziehungen',
    rules: [
      'Umlaufstatus und Dokumentenurteil bleiben getrennte Felder.',
      'Ein externer Dienst führt eine Aufgabe aus; er wird weder fachlich verantwortlich noch endgültig freigabeberechtigt.',
      'Eine Akte kann mehrere Ergebnisse, Kontrollen und DMS-Nachweise erhalten.',
      'Bei eingeschränkten Aufgaben werden weder Inhalt noch sensibler Pfad im Browser gespeichert.'
    ],
    cardinality: '1 Aufgabenakte → 1+ Zuordnungen, 0+ Ergebnisse, 0+ Kontrollen, danach 1 endgültiger menschlicher Entscheid.',
    note: 'Die Validierung beschränkt sich auf Rahmen und Oberfläche. Diese Ansicht erzeugt weder Produktionsschema noch Zugriffsrecht oder Ausführungsautomatik.'
  }
};

const AdministrativeMissionRelationPilot = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section className="m3s-panel p-5 sm:p-6" aria-labelledby="administrative-mission-relation-title">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase text-cyan-300">{t.eyebrow}</p>
          <h3 id="administrative-mission-relation-title" className="m3s-section-title mt-2 flex items-center gap-2">
            <Link2 size={21} className="shrink-0 text-cyan-300" aria-hidden="true" />
            {t.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <span className="inline-flex min-h-8 items-center rounded-full border border-emerald-700 bg-emerald-950/25 px-3 py-1 text-xs font-semibold text-emerald-200">
          {t.status}
        </span>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {t.steps.map(([title, body, Icon], index) => (
          <article key={title} className="relative rounded-lg border border-slate-700 bg-slate-950/25 p-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-cyan-800 bg-cyan-950/35 text-xs font-semibold text-cyan-200">{index + 1}</span>
              <Icon size={19} className="shrink-0 text-cyan-300" aria-hidden="true" />
              <h4 className="font-semibold text-slate-100">{title}</h4>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{body}</p>
            {index < t.steps.length - 1 && <ArrowRight size={17} className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-slate-500 xl:block" aria-hidden="true" />}
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-lg border border-slate-700 bg-slate-950/25 p-4">
          <h4 className="font-semibold text-slate-100">{t.rulesTitle}</h4>
          <ul className="mt-3 space-y-2">
            {t.rules.map(rule => <li key={rule} className="flex gap-2 text-sm leading-6 text-slate-300"><ShieldCheck size={17} className="mt-1 shrink-0 text-emerald-300" aria-hidden="true" />{rule}</li>)}
          </ul>
        </div>
        <div className="rounded-lg border border-cyan-800/80 bg-cyan-950/20 p-4">
          <p className="text-sm font-semibold leading-6 text-cyan-100">{t.cardinality}</p>
          <p className="mt-3 border-t border-cyan-900 pt-3 text-xs leading-5 text-slate-400">{t.note}</p>
        </div>
      </div>
    </section>
  );
};

export default AdministrativeMissionRelationPilot;
