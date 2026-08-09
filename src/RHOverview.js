import React from 'react';
import {
  BookUser,
  BriefcaseBusiness,
  Database,
  FileCheck2,
  Network,
  ShieldCheck,
  UsersRound
} from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'Ressources Humaines · cadrage pilote',
    title: 'Savoir qui contribue à 2SG, dans quel cadre et avec quelles responsabilités',
    subtitle: "Cette vue relie personnes, statuts, fonctions, rôles et preuves sans confondre appartenance, relation de travail, hiérarchie et droits d'accès.",
    cards: [
      ['Finalité', 'Identifier et accompagner les membres et personnels, puis relier statuts, fonctions, responsabilités, compétences et cadres d’engagement.'],
      ['Sources', 'RH-001 porte l’annuaire assaini des membres ; la GED conserve mandats, contrats et justificatifs ; les autres registres RH ne sont pas encore raccordés.'],
      ['Responsabilités', 'La fonction RH tient les dossiers et obligations ; les fonctions métier valident leurs besoins ; Administration coordonne ; la gouvernance arbitre.'],
      ['Frontières', "Cette vue ne vaut ni contrat, ni paie, ni décision d'accès, ni qualification juridique ou sociale automatique."]
    ],
    sourceNote: "Statut : cadrage pilote · Seul l'annuaire RH-001 est raccordé au backend ; aucune valeur de démonstration ne doit servir au pilotage.",
    sourceTitle: 'État réel des sources RH',
    sourceIntro: 'Une valeur n’est affichée que si sa provenance et sa disponibilité sont connues.',
    directoryTitle: 'Annuaire des membres',
    directorySource: 'Source backend RH-001 · lecture seule',
    directoryLoading: 'Chargement de la source',
    directoryAvailable: count => `${count} membre${count > 1 ? 's' : ''} confirmé${count > 1 ? 's' : ''} par la source`,
    directoryUnavailable: 'Source indisponible',
    localTitle: 'Employés & bénévoles',
    localState: count => `${count} brouillon${count > 1 ? 's' : ''} dans cette session`,
    localBody: 'Saisie locale non persistée : ce nombre ne représente pas le total réel du personnel.',
    historyTitle: 'Historique & compétences',
    historyState: 'Source non raccordée',
    historyBody: 'Les graphiques mensuels fictifs ont été retirés. Ils reviendront seulement avec une source, une définition et une date de mise à jour.'
  },
  EN: {
    eyebrow: 'Human Resources · pilot framing',
    title: 'Know who contributes to 2SG, under which framework and with which responsibilities',
    subtitle: 'This view connects people, statuses, functions, roles and evidence without confusing membership, employment, hierarchy and access rights.',
    cards: [
      ['Purpose', 'Identify and support members and staff, then connect statuses, functions, responsibilities, competencies and engagement frameworks.'],
      ['Sources', 'RH-001 carries the sanitised member directory; the DMS retains mandates, contracts and evidence; other HR registers are not connected yet.'],
      ['Responsibilities', 'HR maintains records and obligations; business functions validate their needs; Administration coordinates; Governance arbitrates.'],
      ['Boundaries', 'This view is not a contract, payroll record, access decision, or automatic legal or social classification.']
    ],
    sourceNote: 'Status: pilot framing · Only the RH-001 directory is connected to the backend; no demonstration value may be used for steering.',
    sourceTitle: 'Actual status of HR sources',
    sourceIntro: 'A value is displayed only when its provenance and availability are known.',
    directoryTitle: 'Member directory',
    directorySource: 'RH-001 backend source · read-only',
    directoryLoading: 'Loading source',
    directoryAvailable: count => `${count} member${count === 1 ? '' : 's'} confirmed by the source`,
    directoryUnavailable: 'Source unavailable',
    localTitle: 'Employees & volunteers',
    localState: count => `${count} local draft${count === 1 ? '' : 's'} in this session`,
    localBody: 'Local, non-persistent input: this number is not the actual staff total.',
    historyTitle: 'History & competencies',
    historyState: 'Source not connected',
    historyBody: 'Fictitious monthly charts were removed. They will return only with a source, definition and update date.'
  },
  DE: {
    eyebrow: 'Personalwesen · Pilotrahmen',
    title: 'Erkennen, wer zu 2SG beiträgt, in welchem Rahmen und mit welchen Verantwortungen',
    subtitle: 'Diese Ansicht verbindet Personen, Status, Funktionen, Rollen und Nachweise, ohne Mitgliedschaft, Arbeitsverhältnis, Hierarchie und Zugriffsrechte zu vermischen.',
    cards: [
      ['Zweck', 'Mitglieder und Personal identifizieren und begleiten sowie Status, Funktionen, Verantwortungen, Kompetenzen und Einsatzrahmen verknüpfen.'],
      ['Quellen', 'RH-001 führt das bereinigte Mitgliederverzeichnis; das DMS bewahrt Mandate, Verträge und Nachweise; weitere Personalregister sind noch nicht angebunden.'],
      ['Verantwortungen', 'Das Personalwesen führt Akten und Pflichten; Fachfunktionen bestätigen ihren Bedarf; Verwaltung koordiniert; Governance entscheidet.'],
      ['Abgrenzung', 'Diese Ansicht ist weder Vertrag noch Lohnabrechnung, Zugriffsentscheidung oder automatische rechtliche beziehungsweise soziale Einstufung.']
    ],
    sourceNote: 'Status: Pilotrahmen · Nur das Verzeichnis RH-001 ist mit dem Backend verbunden; Demonstrationswerte dürfen nicht zur Steuerung dienen.',
    sourceTitle: 'Tatsächlicher Stand der Personalquellen',
    sourceIntro: 'Ein Wert wird nur angezeigt, wenn Herkunft und Verfügbarkeit bekannt sind.',
    directoryTitle: 'Mitgliederverzeichnis',
    directorySource: 'Backend-Quelle RH-001 · nur Lesen',
    directoryLoading: 'Quelle wird geladen',
    directoryAvailable: count => `${count} Mitglied${count === 1 ? '' : 'er'} durch die Quelle bestätigt`,
    directoryUnavailable: 'Quelle nicht verfügbar',
    localTitle: 'Beschäftigte & Freiwillige',
    localState: count => `${count} lokale${count === 1 ? 'r Entwurf' : ' Entwürfe'} in dieser Sitzung`,
    localBody: 'Lokale, nicht persistente Eingabe: Diese Zahl ist nicht der tatsächliche Personalbestand.',
    historyTitle: 'Historie & Kompetenzen',
    historyState: 'Quelle nicht angebunden',
    historyBody: 'Fiktive Monatsdiagramme wurden entfernt. Sie kehren erst mit Quelle, Definition und Aktualisierungsdatum zurück.'
  }
};

const FRAME_ICONS = [BriefcaseBusiness, Database, Network, ShieldCheck];

const SourceCard = ({ icon: Icon, title, state, body, tone = 'var(--m3s-row-accent)' }) => (
  <article className="m3s-panel p-4 transition hover:-translate-y-0.5">
    <div className="flex items-start gap-3">
      <span className="rounded-md p-2" style={{ background: `color-mix(in srgb, ${tone} 12%, transparent)`, color: tone }}>
        <Icon size={18} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h4 className="m3s-panel-title">{title}</h4>
        <p className="mt-1 text-sm font-semibold" style={{ color: tone }}>{state}</p>
        <p className="mt-2 text-xs leading-5" style={{ color: 'var(--m3s-text-secondary)' }}>{body}</p>
      </div>
    </div>
  </article>
);

const RHOverview = ({ language = 'FR', directoryCount = null, directoryStatus = 'loading', employeeDraftCount = 0, volunteerDraftCount = 0 }) => {
  const t = COPY[language] || COPY.FR;
  const localDraftCount = employeeDraftCount + volunteerDraftCount;
  const directoryState = directoryStatus === 'available'
    ? t.directoryAvailable(directoryCount)
    : directoryStatus === 'unavailable'
      ? t.directoryUnavailable
      : t.directoryLoading;

  return (
    <section className="m3s-design-scope space-y-6" aria-labelledby="rh-overview-title">
      <div className="max-w-5xl">
        <p className="text-xs font-semibold uppercase" style={{ color: 'var(--m3s-row-accent)' }}>{t.eyebrow}</p>
        <h2 id="rh-overview-title" className="m3s-page-title mt-2">{t.title}</h2>
        <p className="mt-2 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{t.subtitle}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {t.cards.map(([label, body], index) => {
          const Icon = FRAME_ICONS[index];
          return (
            <article key={label} className="m3s-panel p-4 transition hover:-translate-y-0.5 hover:border-sky-500/60">
              <div className="flex items-center gap-3">
                <span className="rounded-md p-2" style={{ background: 'color-mix(in srgb, var(--m3s-row-accent) 12%, transparent)', color: 'var(--m3s-row-accent)' }}>
                  <Icon size={18} aria-hidden="true" />
                </span>
                <h3 className="m3s-panel-title">{label}</h3>
              </div>
              <p className="mt-3 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{body}</p>
            </article>
          );
        })}
      </div>

      <p className="border-l-2 pl-3 text-xs leading-5" style={{ borderColor: 'var(--m3s-row-accent)', color: 'var(--m3s-text-secondary)' }}>{t.sourceNote}</p>

      <section className="m3s-panel p-4 sm:p-5" aria-labelledby="rh-source-state-title">
        <h3 id="rh-source-state-title" className="m3s-section-title">{t.sourceTitle}</h3>
        <p className="mt-2 text-sm" style={{ color: 'var(--m3s-text-secondary)' }}>{t.sourceIntro}</p>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          <SourceCard icon={BookUser} title={t.directoryTitle} state={directoryState} body={t.directorySource} tone={directoryStatus === 'available' ? '#10b981' : directoryStatus === 'unavailable' ? '#f59e0b' : 'var(--m3s-row-accent)'} />
          <SourceCard icon={UsersRound} title={t.localTitle} state={t.localState(localDraftCount)} body={t.localBody} tone="#38bdf8" />
          <SourceCard icon={FileCheck2} title={t.historyTitle} state={t.historyState} body={t.historyBody} tone="#f59e0b" />
        </div>
      </section>
    </section>
  );
};

export default RHOverview;
