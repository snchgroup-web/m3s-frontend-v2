import React from 'react';
import FunctionGlossary, { buildFunctionGlossaryTerms } from './FunctionGlossary';

export const PRODUCTION_GLOSSARY_GROUPS = Object.freeze([
  {
    id: 'planning',
    labels: { FR: 'Planification de production', EN: 'Production planning', DE: 'Produktionsplanung' },
    termIds: ['PROD-COMMANDE-CLIENT', 'PROD-ORDRE-FABRICATION', 'PROD-LOT-PRODUCTION']
  },
  {
    id: 'execution',
    labels: { FR: 'Fabrication & qualité', EN: 'Manufacturing & quality', DE: 'Fertigung & Qualität' },
    termIds: ['PROD-FABRICATION', 'PROD-NOMENCLATURE', 'PROD-GAMME-OPERATOIRE', 'PROD-CONTROLE-QUALITE']
  },
  {
    id: 'flows',
    labels: { FR: 'Fournisseurs & livraison', EN: 'Suppliers & delivery', DE: 'Lieferanten & Lieferung' },
    termIds: ['PROD-FOURNISSEUR', 'PROD-LIVRAISON']
  }
]);

export const PRODUCTION_GLOSSARY_COPY = Object.freeze({
  FR: {
    eyebrow: 'GLOSSAIRE LOCAL · DÉFINITIONS CANDIDATES',
    title: 'Glossaire Production',
    intro: 'Cette première vague clarifie la planification, la fabrication, la qualité et les flux suivis dans Production. Le Glossaire central 2SG reste la source maîtresse versionnée.',
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
    governance: 'Ces neuf définitions sont candidates. Elles doivent être relues par la fonction compétente avant tout usage institutionnel.'
  },
  EN: {
    eyebrow: 'LOCAL GLOSSARY · CANDIDATE DEFINITIONS',
    title: 'Production Glossary',
    intro: 'This first wave clarifies the planning, manufacturing, quality and flows tracked in Production. The versioned 2SG Central Glossary remains the master source.',
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
    governance: 'These nine definitions are candidates. They require review by the competent function before institutional use.'
  },
  DE: {
    eyebrow: 'LOKALES GLOSSAR · BEGRIFFSDEFINITIONEN ZUR VALIDIERUNG',
    title: 'Glossar Produktion',
    intro: 'Diese erste Welle klärt Planung, Fertigung, Qualität und Abläufe im Produktionsmodul. Das versionierte zentrale 2SG-Glossar bleibt die maßgebliche Quelle.',
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
    governance: 'Diese neun Definitionen sind Kandidaten. Vor einer institutionellen Nutzung müssen sie durch die zuständige Funktion geprüft werden.'
  }
});

export const getProductionGlossaryTerms = (language = 'FR') => (
  buildFunctionGlossaryTerms(PRODUCTION_GLOSSARY_GROUPS, language)
);

const ProductionGlossary = ({ language = 'FR' }) => (
  <FunctionGlossary
    language={language}
    groups={PRODUCTION_GLOSSARY_GROUPS}
    copy={PRODUCTION_GLOSSARY_COPY}
    glossaryId="production-glossary"
    centralReturnTo="production-glossary"
  />
);

export default ProductionGlossary;
