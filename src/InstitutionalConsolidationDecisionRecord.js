import React from 'react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const META = {
  'CNS-04': { pr: 165, commit: '48d6d2b' },
  'CNS-05': { pr: 166, commit: 'fbfb031' },
  'CNS-06': { pr: 167, commit: '6f1b3a7' },
  'CNS-07': { pr: 168, commit: 'c58494c' },
  'CNS-08': { pr: 169, commit: '4ee0bc3' }
};

const COMMON = {
  FR: {
    intro: 'La validation humaine du cadre est enregistrée ci-dessous. Elle autorise son inventaire détaillé et son évolution contrôlée, sans transformer les résultats attendus en résultats déjà obtenus.',
    status: 'Cadre de travail validé',
    labels: {
      eyebrow: 'Registre de décision gouverné',
      author: 'Auteur de la décision',
      date: 'Date de décision',
      decision: 'Décision enregistrée',
      evidence: 'Preuve de traçabilité',
      limit: 'Portée et réserve'
    },
    evidence: ({ pr, commit }) => `Validation globale des huit CNS donnée par Cheikh et confirmée dans la session du 25-08-2026 ; cadrage publié par la PR frontend #${pr} ; commit de fusion ${commit}.`
  },
  EN: {
    intro: 'The human validation of the framework is recorded below. It authorises its detailed inventory and controlled evolution without turning expected outcomes into outcomes already achieved.',
    status: 'Working framework validated',
    labels: {
      eyebrow: 'Governed decision record',
      author: 'Decision author',
      date: 'Decision date',
      decision: 'Recorded decision',
      evidence: 'Traceability evidence',
      limit: 'Scope and reservation'
    },
    evidence: ({ pr, commit }) => `Cheikh validated all eight CNS frameworks and confirmed that validation in the session dated 25-08-2026; framework published through frontend PR #${pr}; merge commit ${commit}.`
  },
  DE: {
    intro: 'Die menschliche Validierung des Arbeitsrahmens wird nachstehend dokumentiert. Sie erlaubt sein Detailinventar und seine kontrollierte Weiterentwicklung, ohne erwartete Ergebnisse als bereits erreicht darzustellen.',
    status: 'Arbeitsrahmen validiert',
    labels: {
      eyebrow: 'Governance-konformer Entscheidnachweis',
      author: 'Entscheidautor',
      date: 'Entscheiddatum',
      decision: 'Dokumentierter Entscheid',
      evidence: 'Nachweis der Rückverfolgbarkeit',
      limit: 'Umfang und Vorbehalt'
    },
    evidence: ({ pr, commit }) => `Cheikh hat alle acht CNS-Arbeitsrahmen validiert und diese Validierung in der Sitzung vom 25.08.2026 bestätigt; Strukturierung mit Frontend-PR #${pr} veröffentlicht; Merge-Commit ${commit}.`
  }
};

const DECISIONS = {
  FR: {
    'CNS-04': {
      decision: 'Le cadre CNS-04 est retenu pour inventorier et gouverner flux, budgets, pièces, taux CHF/CFA, rapprochements, contrôles et responsabilités financières.',
      limit: 'Ne certifie aucune comptabilité, fiscalité ou conformité juridique ; ne valide aucun solde, budget, taux appliqué ou rapprochement réel et ne déclare aucune progression.'
    },
    'CNS-05': {
      decision: 'Le cadre CNS-05 est retenu pour inventorier personnes, équipes, rôles, mandats, dossiers RH, contrats, compétences, capacités et besoins de formation.',
      limit: 'Ne crée aucune relation de travail, ne valide aucun contrat, droit d’accès ou dossier personnel, ne publie aucune donnée personnelle et ne déclare aucune progression.'
    },
    'CNS-06': {
      decision: 'Le cadre CNS-06 est retenu pour inventorier composants M3S, accès, incidents, sauvegardes, continuité, reprise, contrôles et preuves techniques.',
      limit: 'Ne certifie ni sécurité, ni stabilité, ni résilience ; ne prouve aucune restauration, clôture d’incident ou efficacité de sauvegarde et ne déclare aucune progression.'
    },
    'CNS-07': {
      decision: 'Le cadre CNS-07 est retenu pour organiser revues, critères d’acceptation, écarts, réserves, actions correctives, retours d’expérience et capitalisation.',
      limit: 'Ne prononce aucune conformité, qualité, réception ou clôture ; ne lève aucune réserve, ne requalifie aucune preuve et ne déclare aucune maturité ou progression.'
    },
    'CNS-08': {
      decision: 'Le cadre CNS-08 est retenu pour gouverner calendrier, sources, contrôles, indicateurs, décisions, validations, diffusion et archivage du reporting institutionnel.',
      limit: 'N’approuve aucun rapport, ne transforme aucune synthèse en source maîtresse, ne comble aucune période absente et ne déclare aucun indicateur ou progrès non prouvé.'
    }
  },
  EN: {
    'CNS-04': {
      decision: 'The CNS-04 framework is retained to inventory and govern flows, budgets, records, CHF/CFA rates, reconciliations, controls and financial responsibilities.',
      limit: 'It certifies no accounting, tax or legal compliance; validates no real balance, budget, applied rate or reconciliation; and declares no progress.'
    },
    'CNS-05': {
      decision: 'The CNS-05 framework is retained to inventory people, teams, roles, mandates, HR files, contracts, skills, capacity and training needs.',
      limit: 'It creates no employment relationship, validates no contract, access right or personal file, publishes no personal data and declares no progress.'
    },
    'CNS-06': {
      decision: 'The CNS-06 framework is retained to inventory M3S components, access, incidents, backups, continuity, recovery, controls and technical evidence.',
      limit: 'It certifies no security, stability or resilience; proves no restoration, incident closure or backup effectiveness; and declares no progress.'
    },
    'CNS-07': {
      decision: 'The CNS-07 framework is retained to organise reviews, acceptance criteria, deviations, reservations, corrective actions, lessons learned and knowledge retention.',
      limit: 'It declares no compliance, quality, acceptance or closure; clears no reservation, reclassifies no evidence and declares no maturity or progress.'
    },
    'CNS-08': {
      decision: 'The CNS-08 framework is retained to govern the calendar, sources, controls, indicators, decisions, validation, distribution and retention of institutional reporting.',
      limit: 'It approves no report, turns no synthesis into a master source, fills no missing period and declares no unproven indicator or progress.'
    }
  },
  DE: {
    'CNS-04': {
      decision: 'Der Arbeitsrahmen CNS-04 wird für das Inventar und die Steuerung von Flüssen, Budgets, Belegen, CHF/CFA-Kursen, Abstimmungen, Kontrollen und Finanzverantwortungen festgehalten.',
      limit: 'Er zertifiziert weder Buchhaltung noch Steuern oder Rechtskonformität, validiert keinen realen Saldo, kein Budget, keinen angewandten Kurs oder Abgleich und erklärt keinen Fortschritt.'
    },
    'CNS-05': {
      decision: 'Der Arbeitsrahmen CNS-05 wird für das Inventar von Personen, Teams, Rollen, Mandaten, Personaldossiers, Verträgen, Kompetenzen, Kapazitäten und Schulungsbedarf festgehalten.',
      limit: 'Er begründet kein Arbeitsverhältnis, validiert keinen Vertrag, kein Zugriffsrecht oder Personaldossier, veröffentlicht keine Personendaten und erklärt keinen Fortschritt.'
    },
    'CNS-06': {
      decision: 'Der Arbeitsrahmen CNS-06 wird für das Inventar von M3S-Komponenten, Zugriffen, Störungen, Sicherungen, Kontinuität, Wiederanlauf, Kontrollen und technischen Nachweisen festgehalten.',
      limit: 'Er zertifiziert weder Sicherheit noch Stabilität oder Resilienz, beweist keine Wiederherstellung, Störungsschließung oder Wirksamkeit von Sicherungen und erklärt keinen Fortschritt.'
    },
    'CNS-07': {
      decision: 'Der Arbeitsrahmen CNS-07 wird für Prüfungen, Annahmekriterien, Abweichungen, Vorbehalte, Korrekturmaßnahmen, Erfahrungsrückfluss und Wissenssicherung festgehalten.',
      limit: 'Er erklärt weder Konformität noch Qualität, Abnahme oder Abschluss, hebt keinen Vorbehalt auf, qualifiziert keinen Nachweis neu und erklärt keine Reife oder Fortschritt.'
    },
    'CNS-08': {
      decision: 'Der Arbeitsrahmen CNS-08 wird für Kalender, Quellen, Kontrollen, Kennzahlen, Entscheidungen, Validierung, Verteilung und Ablage des institutionellen Reportings festgehalten.',
      limit: 'Er genehmigt keinen Bericht, macht keine Synthese zur Masterquelle, füllt keinen fehlenden Zeitraum und erklärt keine unbelegte Kennzahl oder Fortschritt.'
    }
  }
};

const InstitutionalConsolidationDecisionRecord = ({ cnsId, language = 'FR' }) => {
  const lang = COMMON[language] ? language : 'FR';
  const common = COMMON[lang];
  const decision = DECISIONS[lang][cnsId];
  const meta = META[cnsId];

  if (!decision || !meta) return null;

  return (
    <div className="mt-4 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-4">
      <p className="text-sm leading-6 text-slate-200">{common.intro}</p>
      <GovernedDecisionRecord
        labels={common.labels}
        record={{
          id: `${cnsId}-DEC-001`,
          version: 'V1.0',
          status: common.status,
          author: 'Cheikh Ndiaye',
          date: '25-08-2026',
          decision: decision.decision,
          evidence: common.evidence(meta),
          limit: `${decision.limit} ${lang === 'FR' ? 'Toute évolution crée une nouvelle version sans écraser cette trace.' : lang === 'DE' ? 'Jede Änderung erzeugt eine neue Version, ohne diesen Nachweis zu überschreiben.' : 'Any change creates a new version without overwriting this record.'}`
        }}
      />
    </div>
  );
};

export default InstitutionalConsolidationDecisionRecord;
