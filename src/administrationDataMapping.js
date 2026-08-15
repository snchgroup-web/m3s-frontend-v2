export const ADMINISTRATION_DATA_MAPPING = {
  FR: [
    {
      domain: 'Pilotage des projets',
      target: 'portefeuilles, dossiers, projets, phases_projet, activites, actions, jalons',
      implementation: 'Aucune chaîne relationnelle dédiée observée',
      endpoints: 'Aucun endpoint transversal dédié',
      status: 'target',
      gap: 'Créer les objets progressivement sans fabriquer de niveaux vides.'
    },
    {
      domain: 'Tâches',
      target: 'taches',
      implementation: 'taches_propres ; repli historique bdd_taches',
      endpoints: 'GET /api/tasks ; GET /api/tasks/count',
      status: 'partial',
      gap: 'Normaliser les liens dossier, projet, phase, activité, fonction et agent.'
    },
    {
      domain: 'Ressources administratives',
      target: 'documents ou objet à définir',
      implementation: 'administration_resources',
      endpoints: 'GET, POST, PUT, DELETE /api/administration/resources',
      status: 'qualify',
      gap: 'Distinguer document GED, lien, autorité et ressource avant migration.'
    },
    {
      domain: 'Courrier',
      target: 'dossiers, documents et preuves',
      implementation: 'administration_correspondence',
      endpoints: 'GET, POST, PUT, DELETE /api/administration/correspondence',
      status: 'partial',
      gap: 'Remplacer les références libres par des identifiants gouvernés sans stocker les pièces.'
    },
    {
      domain: 'Audit Administration',
      target: 'journal_entrees, avec finalité distincte',
      implementation: 'administration_audit_log',
      endpoints: 'GET /api/administration/audit',
      status: 'partial',
      gap: 'Conserver la séparation entre trace technique et journal de bord métier.'
    },
    {
      domain: 'GED et documents',
      target: 'documents et preuves',
      implementation: 'documents_propres ; repli historique documents_inventory',
      endpoints: 'GET /api/documents ; GET /api/documents/count',
      status: 'partial',
      gap: 'Stabiliser version, validation, confidentialité, URI GED et rôle probant.'
    },
    {
      domain: 'Finance et taux appliqués',
      target: 'recettes, depenses et taux_fx_historiques',
      implementation: 'income, expenses, taux_fx_historiques_propres et replis historiques',
      endpoints: '/api/finance/income ; /api/finance/expenses ; GET /api/fx-rates',
      status: 'partial',
      gap: 'Normaliser les noms et séparer dépense, paiement, frais et taux réellement appliqué.'
    },
    {
      domain: 'Stocks et actifs',
      target: 'articles, mouvements_stock, actifs et interventions',
      implementation: 'stocks_actifs_propres ; repli historique inventory',
      endpoints: 'GET, POST, PUT, DELETE /api/inventory',
      status: 'qualify',
      gap: 'La table actuelle mélange des objets dont les cycles de vie doivent être séparés.'
    },
    {
      domain: 'Agents et responsabilités',
      target: 'agents, fonctions_entreprise, roles et affectations',
      implementation: 'users et annuaire des membres',
      endpoints: 'GET /api/users ; GET /api/members-directory',
      status: 'partial',
      gap: 'Distinguer compte applicatif, personne, rôle, fonction et affectation.'
    }
  ],
  EN: [
    {
      domain: 'Project steering',
      target: 'portefeuilles, dossiers, projets, phases_projet, activites, actions, jalons',
      implementation: 'No dedicated relational chain observed',
      endpoints: 'No dedicated cross-functional endpoint',
      status: 'target',
      gap: 'Create objects progressively without fabricating empty levels.'
    },
    {
      domain: 'Tasks',
      target: 'taches',
      implementation: 'taches_propres; legacy fallback bdd_taches',
      endpoints: 'GET /api/tasks; GET /api/tasks/count',
      status: 'partial',
      gap: 'Standardise links to file, project, phase, activity, function and agent.'
    },
    {
      domain: 'Administrative resources',
      target: 'documents or an object to define',
      implementation: 'administration_resources',
      endpoints: 'GET, POST, PUT, DELETE /api/administration/resources',
      status: 'qualify',
      gap: 'Distinguish DMS document, link, authority and resource before migration.'
    },
    {
      domain: 'Correspondence',
      target: 'dossiers, documents, preuves',
      implementation: 'administration_correspondence',
      endpoints: 'GET, POST, PUT, DELETE /api/administration/correspondence',
      status: 'partial',
      gap: 'Replace free references with governed identifiers without storing attachments.'
    },
    {
      domain: 'Administration audit',
      target: 'journal_entrees, with a distinct purpose',
      implementation: 'administration_audit_log',
      endpoints: 'GET /api/administration/audit',
      status: 'partial',
      gap: 'Keep technical audit separate from the business work log.'
    },
    {
      domain: 'DMS and documents',
      target: 'documents, preuves',
      implementation: 'documents_propres; legacy fallback documents_inventory',
      endpoints: 'GET /api/documents; GET /api/documents/count',
      status: 'partial',
      gap: 'Stabilise version, approval, confidentiality, DMS URI and evidential role.'
    },
    {
      domain: 'Finance and applied rates',
      target: 'recettes, depenses, taux_fx_historiques',
      implementation: 'income, expenses, taux_fx_historiques_propres and legacy fallbacks',
      endpoints: '/api/finance/income; /api/finance/expenses; GET /api/fx-rates',
      status: 'partial',
      gap: 'Standardise names and separate expense, payment, fees and the rate actually applied.'
    },
    {
      domain: 'Stocks and assets',
      target: 'articles, mouvements_stock, actifs, interventions',
      implementation: 'stocks_actifs_propres; legacy fallback inventory',
      endpoints: 'GET, POST, PUT, DELETE /api/inventory',
      status: 'qualify',
      gap: 'The current table mixes objects whose life cycles need to be separated.'
    },
    {
      domain: 'Agents and responsibilities',
      target: 'agents, fonctions_entreprise, roles, affectations',
      implementation: 'users and member directory',
      endpoints: 'GET /api/users; GET /api/members-directory',
      status: 'partial',
      gap: 'Distinguish application account, person, role, function and assignment.'
    }
  ],
  DE: [
    {
      domain: 'Projektsteuerung',
      target: 'portefeuilles, dossiers, projets, phases_projet, activites, actions, jalons',
      implementation: 'Keine eigene relationale Kette festgestellt',
      endpoints: 'Kein eigener funktionsübergreifender Endpunkt',
      status: 'target',
      gap: 'Objekte schrittweise aufbauen, ohne leere Ebenen zu erfinden.'
    },
    {
      domain: 'Aufgaben',
      target: 'taches',
      implementation: 'taches_propres; historischer Rückgriff bdd_taches',
      endpoints: 'GET /api/tasks; GET /api/tasks/count',
      status: 'partial',
      gap: 'Bezüge zu Akte, Projekt, Phase, Aktivität, Funktion und Agent standardisieren.'
    },
    {
      domain: 'Administrative Ressourcen',
      target: 'documents oder ein noch zu definierendes Objekt',
      implementation: 'administration_resources',
      endpoints: 'GET, POST, PUT, DELETE /api/administration/resources',
      status: 'qualify',
      gap: 'DMS-Dokument, Link, Behörde und Ressource vor der Migration unterscheiden.'
    },
    {
      domain: 'Korrespondenz',
      target: 'dossiers, documents, preuves',
      implementation: 'administration_correspondence',
      endpoints: 'GET, POST, PUT, DELETE /api/administration/correspondence',
      status: 'partial',
      gap: 'Freie Referenzen durch gesteuerte IDs ersetzen, ohne Anhänge zu speichern.'
    },
    {
      domain: 'Verwaltungs-Audit',
      target: 'journal_entrees mit eigenständigem Zweck',
      implementation: 'administration_audit_log',
      endpoints: 'GET /api/administration/audit',
      status: 'partial',
      gap: 'Technische Auditspur und fachliches Arbeitsjournal getrennt halten.'
    },
    {
      domain: 'DMS und Dokumente',
      target: 'documents, preuves',
      implementation: 'documents_propres; historischer Rückgriff documents_inventory',
      endpoints: 'GET /api/documents; GET /api/documents/count',
      status: 'partial',
      gap: 'Version, Freigabe, Vertraulichkeit, DMS-URI und Nachweisrolle stabilisieren.'
    },
    {
      domain: 'Finanzen und angewandte Kurse',
      target: 'recettes, depenses und taux_fx_historiques',
      implementation: 'income, expenses, taux_fx_historiques_propres und historische Rückgriffe',
      endpoints: '/api/finance/income; /api/finance/expenses; GET /api/fx-rates',
      status: 'partial',
      gap: 'Namen vereinheitlichen und Aufwand, Zahlung, Gebühren und tatsächlich angewandten Kurs trennen.'
    },
    {
      domain: 'Bestände und Anlagen',
      target: 'articles, mouvements_stock, actifs, interventions',
      implementation: 'stocks_actifs_propres; historischer Rückgriff inventory',
      endpoints: 'GET, POST, PUT, DELETE /api/inventory',
      status: 'qualify',
      gap: 'Die aktuelle Tabelle mischt Objekte mit getrennt zu steuernden Lebenszyklen.'
    },
    {
      domain: 'Agenten und Verantwortungen',
      target: 'agents, fonctions_entreprise, roles, affectations',
      implementation: 'users und Mitgliederverzeichnis',
      endpoints: 'GET /api/users; GET /api/members-directory',
      status: 'partial',
      gap: 'Anwendungskonto, Person, Rolle, Funktion und Zuordnung unterscheiden.'
    }
  ]
};
