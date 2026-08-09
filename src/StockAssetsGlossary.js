import React from 'react';
import FunctionGlossary, { buildFunctionGlossaryTerms } from './FunctionGlossary';

export const STOCK_ASSETS_GLOSSARY_GROUPS = Object.freeze([
  {
    id: 'stock-control',
    labels: { FR: 'Stock & inventaire', EN: 'Stock & inventory', DE: 'Bestand & Inventar' },
    termIds: ['STOCK-STOCK', 'STOCK-INVENTAIRE', 'STOCK-LOCALISATION', 'STOCK-ETAT-BIEN']
  },
  {
    id: 'asset-control',
    labels: { FR: 'Actifs & valeurs', EN: 'Assets & values', DE: 'Vermögenswerte & Werte' },
    termIds: ['ACTIF-ACTIF', 'ACTIF-IMMOBILISATION', 'ACTIF-COUT-ACQUISITION', 'ACTIF-VALEUR-ESTIMEE']
  },
  {
    id: 'real-estate',
    labels: { FR: 'Immobilier', EN: 'Real estate', DE: 'Immobilien' },
    termIds: ['ACTIF-REGISTRE-FONCIER']
  }
]);

export const STOCK_ASSETS_GLOSSARY_COPY = Object.freeze({
  FR: {
    eyebrow: 'GLOSSAIRE LOCAL · DÉFINITIONS CANDIDATES',
    title: 'Glossaire Stock & Actifs',
    intro: 'Cette première vague clarifie neuf termes utilisés par le module sans confondre suivi opérationnel, comptabilité et preuve juridique. Le Glossaire central 2SG reste la source maîtresse versionnée.',
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
    governance: 'Ces définitions sont candidates. Elles structurent le pilote Stock & Actifs, mais leur validation humaine reste nécessaire avant promotion dans le référentiel central.'
  },
  EN: {
    eyebrow: 'LOCAL GLOSSARY · CANDIDATE DEFINITIONS',
    title: 'Stock & Assets Glossary',
    intro: 'This first wave clarifies nine terms used by the module without confusing operational monitoring, accounting and legal evidence. The versioned 2SG Central Glossary remains the master source.',
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
    governance: 'These definitions are candidates. They structure the Stock & Assets pilot, but still require human validation before promotion to the central reference.'
  },
  DE: {
    eyebrow: 'LOKALES GLOSSAR · BEGRIFFSDEFINITIONEN ZUR VALIDIERUNG',
    title: 'Glossar Anlagen & Vermögenswerte',
    intro: 'Diese erste Welle erläutert neun Begriffe des Moduls, ohne operative Nachverfolgung, Rechnungslegung und rechtliche Nachweise zu vermischen. Das versionierte zentrale 2SG-Glossar bleibt die maßgebliche Quelle.',
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
    governance: 'Diese Definitionen sind Kandidaten. Sie strukturieren den Piloten Anlagen & Vermögenswerte, müssen jedoch vor der Übernahme in die zentrale Referenz menschlich validiert werden.'
  }
});

export const getStockAssetsGlossaryTerms = (language = 'FR') => (
  buildFunctionGlossaryTerms(STOCK_ASSETS_GLOSSARY_GROUPS, language)
);

const StockAssetsGlossary = ({ language = 'FR' }) => (
  <FunctionGlossary
    language={language}
    groups={STOCK_ASSETS_GLOSSARY_GROUPS}
    copy={STOCK_ASSETS_GLOSSARY_COPY}
    glossaryId="stock-assets-glossary"
    centralReturnTo="stock-assets-glossary"
  />
);

export default StockAssetsGlossary;
