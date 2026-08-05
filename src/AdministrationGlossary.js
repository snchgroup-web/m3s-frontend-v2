import React from 'react';
import FunctionGlossary, { buildFunctionGlossaryTerms } from './FunctionGlossary';

export const ADMINISTRATION_GLOSSARY_GROUPS = Object.freeze([
  {
    id: 'institution',
    labels: { FR: 'Institution', EN: 'Institution', DE: 'Institution' },
    termIds: ['INST-VISION', 'INST-MISSION', 'INST-BUT', 'INST-VALEURS']
  },
  {
    id: 'governance',
    labels: { FR: 'Gouvernance', EN: 'Governance', DE: 'Governance' },
    termIds: ['GOUV-REGLES-OR', 'GOUV-GOUVERNANCE']
  },
  {
    id: 'strategy',
    labels: { FR: 'Stratégie', EN: 'Strategy', DE: 'Strategie' },
    termIds: [
      'STRAT-STRATEGIE',
      'STRAT-BUSINESS-MODEL',
      'STRAT-BUSINESS-PLAN',
      'STRAT-BLUEPRINT',
      'STRAT-FEUILLE-ROUTE',
      'OPS-PLAN-ACTION'
    ]
  },
  {
    id: 'planning',
    labels: { FR: 'Planification & Projets', EN: 'Planning & Projects', DE: 'Planung & Projekte' },
    termIds: ['PROJ-JALON', 'PROJ-REVUE']
  }
]);

export const ADMINISTRATION_GLOSSARY_COPY = Object.freeze({
  FR: {
    eyebrow: 'VUE MÉTIER LOCALE · LECTURE SEULE',
    title: 'Glossaire métier Administration',
    intro: 'Les termes utiles à la fonction Administration sont réunis ici sans dupliquer leurs définitions. Le Glossaire central 2SG reste la source maîtresse versionnée.',
    search: 'Rechercher un terme ou une définition…',
    all: 'Tous les domaines',
    terms: 'termes',
    empty: 'Aucun terme ne correspond à ces critères.',
    validated: 'Définition validée',
    stableId: 'Identifiant stable',
    version: 'Version',
    localDomain: 'Contexte métier',
    source: 'Source maîtresse',
    central: 'Glossaire central 2SG',
    openCentral: 'Consulter dans le Glossaire central',
    governance: 'Toute modification ou nouvelle entrée est proposée au Glossaire central, puis réutilisée dans cette vue locale après validation.'
  },
  EN: {
    eyebrow: 'LOCAL BUSINESS VIEW · READ ONLY',
    title: 'Administration business glossary',
    intro: 'Terms useful to the Administration function are gathered here without duplicating their definitions. The versioned 2SG Central Glossary remains the master source.',
    search: 'Search a term or definition…',
    all: 'All domains',
    terms: 'terms',
    empty: 'No term matches these criteria.',
    validated: 'Validated definition',
    stableId: 'Stable identifier',
    version: 'Version',
    localDomain: 'Business context',
    source: 'Master source',
    central: '2SG Central Glossary',
    openCentral: 'Open in the Central Glossary',
    governance: 'Any change or new entry is proposed to the Central Glossary, then reused in this local view after validation.'
  },
  DE: {
    eyebrow: 'LOKALE FACHSICHT · NUR LESEN',
    title: 'Fachglossar Administration',
    intro: 'Die für die Verwaltungsfunktion relevanten Begriffe werden hier zusammengeführt, ohne Definitionen zu duplizieren. Das versionierte zentrale 2SG-Glossar bleibt die maßgebliche Quelle.',
    search: 'Begriff oder Definition suchen…',
    all: 'Alle Bereiche',
    terms: 'Begriffe',
    empty: 'Kein Begriff entspricht diesen Kriterien.',
    validated: 'Validierte Definition',
    stableId: 'Stabile Kennung',
    version: 'Version',
    localDomain: 'Fachlicher Kontext',
    source: 'Maßgebliche Quelle',
    central: 'Zentrales 2SG-Glossar',
    openCentral: 'Im zentralen Glossar öffnen',
    governance: 'Änderungen oder neue Einträge werden dem zentralen Glossar vorgeschlagen und nach Validierung in dieser lokalen Sicht wiederverwendet.'
  }
});

export const getAdministrationGlossaryTerms = (language = 'FR') => (
  buildFunctionGlossaryTerms(ADMINISTRATION_GLOSSARY_GROUPS, language)
);

const AdministrationGlossary = ({ language = 'FR' }) => (
  <FunctionGlossary
    language={language}
    groups={ADMINISTRATION_GLOSSARY_GROUPS}
    copy={ADMINISTRATION_GLOSSARY_COPY}
    glossaryId="administration-glossary"
    centralReturnTo="administration-glossary"
  />
);

export default AdministrationGlossary;
