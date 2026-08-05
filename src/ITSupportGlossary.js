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
    eyebrow: 'GLOSSAIRE LOCAL · DÉFINITIONS EN LECTURE SEULE',
    title: 'Glossaire IT & Support',
    intro: 'Cette première vague rassemble trois termes validés utiles à la GED et au Knowledge Management. Le Glossaire central 2SG reste la source maîtresse versionnée.',
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
    governance: 'Toute modification ou nouvelle entrée est proposée au Glossaire central, puis réutilisée dans cette vue locale après validation humaine.'
  },
  EN: {
    eyebrow: 'LOCAL GLOSSARY · READ-ONLY DEFINITIONS',
    title: 'IT & Support Glossary',
    intro: 'This first wave gathers three validated terms for document and knowledge management. The 2SG Central Glossary remains the versioned master source.',
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
    governance: 'Any change or new entry is proposed in the Central Glossary and reused in this local view after human validation.'
  },
  DE: {
    eyebrow: 'LOKALES GLOSSAR · DEFINITIONEN NUR LESEN',
    title: 'Glossar IT & Support',
    intro: 'Diese erste Welle umfasst drei validierte Begriffe für Dokumenten- und Wissensmanagement. Das zentrale 2SG-Glossar bleibt die versionierte maßgebliche Quelle.',
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
    governance: 'Jede Änderung oder neue Eintragung wird im zentralen Glossar vorgeschlagen und nach menschlicher Validierung in dieser lokalen Sicht wiederverwendet.'
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
