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
  },
  {
    id: 'data-evidence',
    labels: { FR: 'Données, relations & preuves', EN: 'Data, relationships & evidence', DE: 'Daten, Beziehungen & Nachweise' },
    termIds: ['FIN-ECRITURE-FINANCIERE', 'FIN-AGREGAT-GLOBAL', 'FIN-EXTRAIT-CHARGE', 'DATA-RELATION-REFERENTIELLE', 'FIN-JUSTIFICATIF-FINANCIER']
  }
]);

export const FINANCE_GLOSSARY_COPY = Object.freeze({
  FR: {
    eyebrow: 'GLOSSAIRE LOCAL · DÉFINITIONS VALIDÉES & CANDIDATES',
    title: 'Glossaire Finances',
    intro: 'Cette vue réunit cinq termes validés sur les transferts et cinq notions candidates issues de l’architecture Finance. Le Glossaire central 2SG reste la source maîtresse versionnée.',
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
    governance: 'Les cinq définitions de transfert sont adoptées. Les cinq notions d’architecture restent candidates : elles doivent être relues et validées avant tout usage institutionnel. Aucune définition ne remplace le reçu du prestataire ni le rapprochement des preuves.'
  },
  EN: {
    eyebrow: 'LOCAL GLOSSARY · VALIDATED & CANDIDATE DEFINITIONS',
    title: 'Finance Glossary',
    intro: 'This view brings together five validated transfer terms and five candidate concepts derived from the Finance architecture. The 2SG Central Glossary remains the versioned master source.',
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
    governance: 'The five transfer definitions are adopted. The five architecture concepts remain candidates and require review and validation before institutional use. No definition replaces the provider receipt or reconciliation of supporting evidence.'
  },
  DE: {
    eyebrow: 'LOKALES GLOSSAR · VALIDIERTE DEFINITIONEN & KANDIDATEN',
    title: 'Glossar Finanzen',
    intro: 'Diese Ansicht vereint fünf validierte Überweisungsbegriffe und fünf Begriffskandidaten aus der Finanzarchitektur. Das zentrale 2SG-Glossar bleibt die versionierte maßgebliche Quelle.',
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
    governance: 'Die fünf Überweisungsdefinitionen sind angenommen. Die fünf Architekturbegriffe bleiben Kandidaten und müssen vor einer institutionellen Nutzung geprüft und validiert werden. Keine Definition ersetzt den Dienstleisterbeleg oder den Abgleich der Nachweise.'
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
