import React from 'react';
import FunctionGlossary, { buildFunctionGlossaryTerms } from './FunctionGlossary';

export const RH_GLOSSARY_GROUPS = Object.freeze([
  {
    id: 'people-statuses',
    labels: { FR: 'Personnes & statuts', EN: 'People & statuses', DE: 'Personen & Status' },
    termIds: ['RH-MEMBRE-FONDATEUR', 'RH-MEMBRE-ASSOCIE', 'RH-PERSONNEL-APPUI']
  },
  {
    id: 'organization-responsibilities',
    labels: { FR: 'Organisation & responsabilités', EN: 'Organisation & responsibilities', DE: 'Organisation & Verantwortlichkeiten' },
    termIds: ['RH-FONCTION-ENTREPRISE', 'RH-ROLE', 'RH-RESPONSABILITE-FONCTIONNELLE', 'RH-DELEGATION', 'RH-EQUIPE']
  },
  {
    id: 'skills',
    labels: { FR: 'Compétences', EN: 'Skills', DE: 'Kompetenzen' },
    termIds: ['RH-COMPETENCE']
  }
]);

export const RH_GLOSSARY_COPY = Object.freeze({
  FR: {
    eyebrow: 'GLOSSAIRE LOCAL · DÉFINITIONS CANDIDATES',
    title: 'Glossaire Ressources Humaines',
    intro: 'Cette première vague clarifie neuf termes utilisés pour structurer les personnes, rôles et responsabilités de 2SG sans confondre statut institutionnel, hiérarchie, droits système et relation de travail. Le Glossaire central 2SG reste la source maîtresse versionnée.',
    search: 'Rechercher un terme ou une définition…',
    all: 'Tous les domaines',
    terms: 'termes',
    empty: 'Aucun terme ne correspond à ces critères.',
    validated: 'Définition validée',
    candidate: 'Définition candidate',
    stableId: 'Identifiant stable',
    version: 'Version',
    localDomain: 'Contexte métier',
    source: 'Source maîtresse',
    central: 'Glossaire central 2SG',
    openCentral: 'Examiner dans le Glossaire central',
    governance: 'Ces définitions sont candidates. Elles structurent le pilote Ressources Humaines, mais leur validation humaine reste nécessaire avant promotion dans le référentiel central.'
  },
  EN: {
    eyebrow: 'LOCAL GLOSSARY · CANDIDATE DEFINITIONS',
    title: 'Human Resources Glossary',
    intro: 'This first wave clarifies nine terms used to structure 2SG people, roles and responsibilities without confusing institutional status, hierarchy, system permissions and employment relationships. The versioned 2SG Central Glossary remains the master source.',
    search: 'Search a term or definition…',
    all: 'All domains',
    terms: 'terms',
    empty: 'No term matches these criteria.',
    validated: 'Validated definition',
    candidate: 'Candidate definition',
    stableId: 'Stable identifier',
    version: 'Version',
    localDomain: 'Business context',
    source: 'Master source',
    central: '2SG Central Glossary',
    openCentral: 'Review in the Central Glossary',
    governance: 'These definitions are candidates. They structure the Human Resources pilot, but still require human validation before promotion to the central reference.'
  },
  DE: {
    eyebrow: 'LOKALES GLOSSAR · BEGRIFFSDEFINITIONEN ZUR VALIDIERUNG',
    title: 'Glossar Personalwesen',
    intro: 'Diese erste Welle erläutert neun Begriffe zur Strukturierung von Personen, Rollen und Verantwortlichkeiten bei 2SG, ohne institutionellen Status, Hierarchie, Systemrechte und Arbeitsverhältnisse zu vermischen. Das versionierte zentrale 2SG-Glossar bleibt die maßgebliche Quelle.',
    search: 'Begriff oder Definition suchen…',
    all: 'Alle Bereiche',
    terms: 'Begriffe',
    empty: 'Kein Begriff entspricht diesen Kriterien.',
    validated: 'Validierte Definition',
    candidate: 'Begriffsdefinition zur Validierung',
    stableId: 'Stabile Kennung',
    version: 'Version',
    localDomain: 'Fachlicher Kontext',
    source: 'Maßgebliche Quelle',
    central: 'Zentrales 2SG-Glossar',
    openCentral: 'Im zentralen Glossar prüfen',
    governance: 'Diese Definitionen sind Kandidaten. Sie strukturieren den Piloten Personalwesen, müssen jedoch vor der Übernahme in die zentrale Referenz menschlich validiert werden.'
  }
});

export const getRHGlossaryTerms = (language = 'FR') => (
  buildFunctionGlossaryTerms(RH_GLOSSARY_GROUPS, language)
);

const RHGlossary = ({ language = 'FR' }) => (
  <FunctionGlossary
    language={language}
    groups={RH_GLOSSARY_GROUPS}
    copy={RH_GLOSSARY_COPY}
    glossaryId="rh-glossary"
    centralReturnTo="rh-glossary"
  />
);

export default RHGlossary;
