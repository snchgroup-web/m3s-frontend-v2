import React from 'react';
import FunctionGlossary, { buildFunctionGlossaryTerms } from './FunctionGlossary';

export const FINANCE_GLOSSARY_GROUPS = Object.freeze([
  {
    id: 'payment',
    labels: { FR: 'Paiement & transfert', EN: 'Payment & transfer', DE: 'Zahlung & Überweisung' },
    termIds: ['FIN-MONTANT-ENVOYE', 'FIN-FRAIS-TRANSACTION', 'FIN-MONTANT-TOTAL-DEBITE', 'FIN-MONTANT-RECU']
  },
  {
    id: 'foreign-exchange',
    labels: { FR: 'Change', EN: 'Foreign exchange', DE: 'Devisen' },
    termIds: ['FIN-TAUX-CHANGE-APPLIQUE']
  }
]);

export const FINANCE_GLOSSARY_COPY = Object.freeze({
  FR: {
    eyebrow: 'GLOSSAIRE LOCAL · DÉFINITIONS EN LECTURE SEULE',
    title: 'Glossaire Finances',
    intro: 'Cette première vague réunit cinq termes validés pour décomposer un transfert financier sans confondre principal, frais, débit, réception et change. Le Glossaire central 2SG reste la source maîtresse versionnée.',
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
    governance: 'Ces cinq définitions sont adoptées. Toute évolution ou nouvelle entrée sera proposée au Glossaire central, puis réutilisée ici après validation humaine. Leur usage ne remplace ni le reçu du prestataire ni le rapprochement des preuves.'
  },
  EN: {
    eyebrow: 'LOCAL GLOSSARY · READ-ONLY DEFINITIONS',
    title: 'Finance Glossary',
    intro: 'This first wave gathers five validated terms to break down a financial transfer without confusing principal, fees, debit, receipt and foreign exchange. The 2SG Central Glossary remains the versioned master source.',
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
    governance: 'These five definitions are adopted. Any change or new entry will be proposed to the Central Glossary and reused here after human validation. Their use does not replace the provider receipt or reconciliation of supporting evidence.'
  },
  DE: {
    eyebrow: 'LOKALES GLOSSAR · DEFINITIONEN NUR LESEN',
    title: 'Glossar Finanzen',
    intro: 'Diese erste Welle umfasst fünf validierte Begriffe, um eine Finanzüberweisung in Hauptbetrag, Gebühren, Belastung, Empfang und Wechselkurs zu gliedern. Das zentrale 2SG-Glossar bleibt die versionierte maßgebliche Quelle.',
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
    governance: 'Diese fünf Definitionen sind angenommen. Änderungen oder neue Einträge werden dem zentralen Glossar vorgeschlagen und nach menschlicher Validierung hier wiederverwendet. Ihre Verwendung ersetzt weder den Dienstleisterbeleg noch den Abgleich der Nachweise.'
  }
});

export const getFinanceGlossaryTerms = (language = 'FR') => (
  buildFunctionGlossaryTerms(FINANCE_GLOSSARY_GROUPS, language)
);

const FinanceGlossary = ({ language = 'FR' }) => (
  <FunctionGlossary
    language={language}
    groups={FINANCE_GLOSSARY_GROUPS}
    copy={FINANCE_GLOSSARY_COPY}
    glossaryId="finance-glossary"
    centralReturnTo="finance-glossary"
  />
);

export default FinanceGlossary;
