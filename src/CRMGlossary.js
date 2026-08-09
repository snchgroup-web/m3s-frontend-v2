import React from 'react';
import FunctionGlossary, { buildFunctionGlossaryTerms } from './FunctionGlossary';

export const CRM_GLOSSARY_GROUPS = Object.freeze([
  {
    id: 'relationship',
    labels: { FR: 'Relation commerciale', EN: 'Commercial relationship', DE: 'Geschäftsbeziehung' },
    termIds: ['CRM-PROSPECT', 'CRM-LEAD', 'CRM-CLIENT']
  },
  {
    id: 'sales',
    labels: { FR: 'Opportunités & ventes', EN: 'Opportunities & sales', DE: 'Verkaufschancen & Verkäufe' },
    termIds: ['CRM-OPPORTUNITE', 'CRM-PIPELINE', 'CRM-VENTE', 'CRM-PROCHAINE-ACTION']
  },
  {
    id: 'social',
    labels: { FR: 'Relations sociales', EN: 'Social relationships', DE: 'Soziale Beziehungen' },
    termIds: ['SOC-DONATEUR', 'SOC-BENEFICIAIRE']
  }
]);

export const CRM_GLOSSARY_COPY = Object.freeze({
  FR: {
    eyebrow: 'GLOSSAIRE LOCAL · DÉFINITIONS CANDIDATES',
    title: 'Glossaire Commercial & CRM',
    intro: 'Cette première vague clarifie les relations commerciales et sociales suivies dans le CRM. Le Glossaire central 2SG reste la source maîtresse versionnée.',
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
    governance: 'Ces neuf définitions sont candidates. Elles doivent être relues et validées avant tout usage institutionnel.'
  },
  EN: {
    eyebrow: 'LOCAL GLOSSARY · CANDIDATE DEFINITIONS',
    title: 'Commercial & CRM Glossary',
    intro: 'This first wave clarifies the commercial and social relationships tracked in CRM. The versioned 2SG Central Glossary remains the master source.',
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
    governance: 'These nine definitions are candidates. They require review and validation before institutional use.'
  },
  DE: {
    eyebrow: 'LOKALES GLOSSAR · BEGRIFFSDEFINITIONEN ZUR VALIDIERUNG',
    title: 'Glossar Vertrieb & CRM',
    intro: 'Diese erste Welle klärt die im CRM geführten geschäftlichen und sozialen Beziehungen. Das versionierte zentrale 2SG-Glossar bleibt die maßgebliche Quelle.',
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
    governance: 'Diese neun Definitionen sind Kandidaten. Vor einer institutionellen Nutzung müssen sie geprüft und validiert werden.'
  }
});

export const getCRMGlossaryTerms = (language = 'FR') => (
  buildFunctionGlossaryTerms(CRM_GLOSSARY_GROUPS, language)
);

const CRMGlossary = ({ language = 'FR' }) => (
  <FunctionGlossary
    language={language}
    groups={CRM_GLOSSARY_GROUPS}
    copy={CRM_GLOSSARY_COPY}
    glossaryId="crm-glossary"
    centralReturnTo="crm-glossary"
  />
);

export default CRMGlossary;
