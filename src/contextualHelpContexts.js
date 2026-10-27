import { getGlossaryContextEntry } from './glossaryContext';

// References only: definitions remain owned by glossaryContext and the existing local glossaries.
export const HELP_CONTEXTS = Object.freeze({
  '/': { default: ['GOUV-GOUVERNANCE', 'STRAT-STRATEGIE', 'OPS-PLAN-ACTION'],
    program: ['STRAT-BLUEPRINT', 'STRAT-FEUILLE-ROUTE'],
    architecture: ['ADM-ARCHITECTURE-FONCTIONNELLE', 'DATA-RELATION-REFERENTIELLE'],
    processes: ['ADM-PROCESSUS', 'ADM-CONTROLE'],
    intelligence: ['KM-BASE-CONNAISSANCES', 'PROJ-REVUE'] },
  '/administration': { default: ['ADM-DOSSIER', 'ADM-PROCESSUS', 'ADM-CONTROLE'],
    institution: ['INST-VISION', 'INST-MISSION', 'INST-BUT', 'INST-VALEURS'],
    architecture: ['ADM-ARCHITECTURE-FONCTIONNELLE', 'DATA-RELATION-REFERENTIELLE'],
    processes: ['ADM-PROCESSUS', 'ADM-PROCEDURE', 'ADM-MANUEL-PROCEDURES'],
    compliance: ['ADM-CONFORMITE', 'ADM-CONTROLE'],
    communication: ['ADM-CORRESPONDANCE', 'KM-GED', 'ADM-ARCHIVE'],
    planning: ['OPS-PLAN-ACTION', 'PROJ-JALON', 'PROJ-REVUE'] },
  '/finance': { default: ['FIN-ECRITURE-FINANCIERE', 'FIN-EXTRAIT-CHARGE', 'FIN-JUSTIFICATIF-FINANCIER'],
    fx: ['FIN-TAUX-CHANGE-APPLIQUE', 'FIN-MONTANT-ENVOYE', 'FIN-MONTANT-RECU'] },
  '/rh': { default: ['RH-FONCTION-ENTREPRISE', 'RH-ROLE', 'RH-RESPONSABILITE-FONCTIONNELLE'],
    resources: ['RH-PERSONNEL-APPUI', 'RH-COMPETENCE', 'KM-GED'] },
  '/crm': { default: ['CRM-PROSPECT', 'CRM-OPPORTUNITE', 'CRM-PROCHAINE-ACTION'] },
  '/production': { default: ['PROD-FABRICATION', 'PROD-LOT-PRODUCTION', 'PROD-CONTROLE-QUALITE'],
    services: ['PROD-LIVRAISON', 'ADM-CONTROLE', 'KM-GED'],
    tools: ['PROD-FABRICATION', 'KM-KNOWLEDGE-MANAGEMENT'] },
  '/actifs': { default: ['STOCK-STOCK', 'STOCK-INVENTAIRE', 'ACTIF-ACTIF'] },
  '/ged': { default: ['KM-GED', 'KM-KNOWLEDGE-MANAGEMENT', 'KM-BASE-CONNAISSANCES'] },
  '/account': { default: ['RH-FONCTION-ENTREPRISE', 'RH-ROLE', 'RH-DELEGATION'],
    tasks: ['OPS-PLAN-ACTION', 'PROJ-JALON', 'PROJ-REVUE'],
    hours: ['RH-RESPONSABILITE-FONCTIONNELLE', 'OPS-PLAN-ACTION'] }
});

export function getContextualHelp(pathname, search = '', language = 'FR') {
  const route = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
  if (!Object.hasOwn(HELP_CONTEXTS, route)) return null;
  const params = new URLSearchParams(search);
  const section = params.get(route === '/' || route === '/account' ? 'view' : 'tab');
  const contexts = HELP_CONTEXTS[route];
  const termIds = Object.hasOwn(contexts, section) ? contexts[section] : contexts.default;
  return {
    id: `${route}:${section || 'default'}`,
    planning: route === '/administration' && section === 'planning',
    entries: termIds.map(id => getGlossaryContextEntry(id, language)).filter(Boolean)
  };
}
