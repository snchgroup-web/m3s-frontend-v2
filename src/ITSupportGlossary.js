import React from 'react';
import FunctionGlossary, { buildFunctionGlossaryTerms } from './FunctionGlossary';

export const IT_SUPPORT_GLOSSARY_GROUPS = Object.freeze([
  {
    id: 'documents',
    labels: { FR: 'Documents & traçabilité', EN: 'Documents & traceability', DE: 'Dokumente & Nachvollziehbarkeit' },
    termIds: ['KM-GED']
  },
  {
    id: 'knowledge',
    labels: { FR: 'Connaissances', EN: 'Knowledge', DE: 'Wissen' },
    termIds: ['KM-KNOWLEDGE-MANAGEMENT', 'KM-BASE-CONNAISSANCES']
  }
]);

export const IT_SUPPORT_GLOSSARY_COPY = Object.freeze({
  FR: {
    eyebrow: 'VUE MÉTIER LOCALE · LECTURE SEULE',
    title: 'Glossaire métier IT & Support',
    intro: 'Cette première vague rassemble trois termes candidats utiles à la GED et au Knowledge Management. Les définitions restent proposées jusqu’à validation humaine dans le Glossaire central 2SG.',
    search: 'Rechercher un terme ou une définition…',
    all: 'Tous les domaines',
    terms: 'termes',
    empty: 'Aucun terme ne correspond à ces critères.',
    validated: 'Définition validée',
    candidate: 'Définition proposée',
    stableId: 'Identifiant stable',
    version: 'Version',
    localDomain: 'Contexte métier',
    source: 'Source maîtresse',
    central: 'Glossaire central 2SG',
    openCentral: 'Examiner dans le Glossaire central',
    governance: 'La validation humaine porte sur le terme, les définitions FR/DE/EN et son rattachement métier. Aucune proposition n’est présentée comme validée avant cette décision.'
  },
  EN: {
    eyebrow: 'LOCAL BUSINESS VIEW · READ ONLY',
    title: 'IT & Support business glossary',
    intro: 'This first wave gathers three candidate terms for document and knowledge management. Definitions remain proposed until human validation in the 2SG Central Glossary.',
    search: 'Search a term or definition…',
    all: 'All domains',
    terms: 'terms',
    empty: 'No term matches these criteria.',
    validated: 'Validated definition',
    candidate: 'Proposed definition',
    stableId: 'Stable identifier',
    version: 'Version',
    localDomain: 'Business context',
    source: 'Master source',
    central: '2SG Central Glossary',
    openCentral: 'Review in the Central Glossary',
    governance: 'Human validation covers the term, its FR/DE/EN definitions and business relationship. No proposal is presented as validated before that decision.'
  },
  DE: {
    eyebrow: 'LOKALE FACHSICHT · NUR LESEN',
    title: 'Fachglossar IT & Support',
    intro: 'Diese erste Welle umfasst drei Begriffsvorschläge für Dokumenten- und Wissensmanagement. Die Definitionen bleiben bis zur menschlichen Validierung im zentralen 2SG-Glossar vorgeschlagen.',
    search: 'Begriff oder Definition suchen…',
    all: 'Alle Bereiche',
    terms: 'Begriffe',
    empty: 'Kein Begriff entspricht diesen Kriterien.',
    validated: 'Validierte Definition',
    candidate: 'Vorgeschlagene Definition',
    stableId: 'Stabile Kennung',
    version: 'Version',
    localDomain: 'Fachlicher Kontext',
    source: 'Maßgebliche Quelle',
    central: 'Zentrales 2SG-Glossar',
    openCentral: 'Im zentralen Glossar prüfen',
    governance: 'Die menschliche Validierung umfasst Begriff, Definitionen in FR/DE/EN und fachliche Zuordnung. Vor dieser Entscheidung wird kein Vorschlag als validiert dargestellt.'
  }
});

export const getITSupportGlossaryTerms = (language = 'FR') => (
  buildFunctionGlossaryTerms(IT_SUPPORT_GLOSSARY_GROUPS, language)
);

const ITSupportGlossary = ({ language = 'FR' }) => (
  <FunctionGlossary
    language={language}
    groups={IT_SUPPORT_GLOSSARY_GROUPS}
    copy={IT_SUPPORT_GLOSSARY_COPY}
    glossaryId="it-support-glossary"
    centralReturnTo="it-support-glossary"
  />
);

export default ITSupportGlossary;
