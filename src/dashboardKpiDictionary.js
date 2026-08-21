const dictionary = {
  FR: [
    {
      id: 'active-major-files',
      label: 'Grands dossiers actifs',
      definition: 'Nombre de dossiers du portefeuille de pilotage dont le statut est actif.',
      scope: 'Dossiers transversaux suivis par Management & Gouvernance, sans déduire leur avancement ni leur criticité.',
      source: 'API Management · résumé du portefeuille · champ active_dossiers.',
      freshness: 'Actualisé au chargement du Tableau de bord ; la date de vérification du résumé reste celle fournie par la source.',
      action: 'Ouvre le portefeuille des grands dossiers dans Administration.'
    },
    {
      id: 'users',
      label: 'Utilisateurs M3S',
      definition: 'Nombre de comptes authentifiés retournés par le service de comptage M3S.',
      scope: 'Comptes applicatifs ; cet indicateur ne représente ni les personnes, ni les membres associés, ni l’effectif RH.',
      source: 'API M3S · comptes authentifiés · total.',
      freshness: 'Actualisé au chargement du Tableau de bord ; aucune date métier distincte n’est inventée.',
      action: 'Ouvre le registre des utilisateurs et de leurs droits dans Administration.'
    },
    {
      id: 'documents',
      label: 'Documents',
      definition: 'Nombre total de documents retourné par le service de comptage GED.',
      scope: 'Documents enregistrés dans la GED connectée ; ce total ne mesure ni leur qualité, ni leur validation, ni leur exhaustivité.',
      source: 'API GED · compteur des documents · total.',
      freshness: 'Actualisé au chargement du Tableau de bord ; la disponibilité de la source est affichée séparément.',
      action: 'Ouvre le registre des documents dans GED & Knowledge Management.'
    },
    {
      id: 'tasks',
      label: 'Tâches suivies',
      definition: 'Nombre total de tâches retourné par le registre Administration, avec ventilation ouverte et terminée lorsque disponible.',
      scope: 'Tâches enregistrées dans la source connectée ; ce total n’est ni un taux d’avancement, ni un nombre de projets.',
      source: 'API Administration · registre des tâches · total, open et completed.',
      freshness: 'Actualisé au chargement du Tableau de bord ; les statuts absents restent indisponibles.',
      action: 'Ouvre le registre des tâches dans Planification & Projets.'
    }
  ],
  EN: [
    {
      id: 'active-major-files', label: 'Active major files', definition: 'Number of files in the steering portfolio whose status is active.',
      scope: 'Cross-functional files monitored by Management & Governance, without inferring progress or criticality.',
      source: 'Management API · portfolio summary · active_dossiers field.',
      freshness: 'Refreshed when the Dashboard loads; the summary verification date remains the one supplied by the source.',
      action: 'Opens the major-file portfolio in Administration.'
    },
    {
      id: 'users', label: 'M3S users', definition: 'Number of authenticated accounts returned by the M3S count service.',
      scope: 'Application accounts; this indicator represents neither people, associated members nor HR headcount.',
      source: 'M3S API · authenticated accounts · total.',
      freshness: 'Refreshed when the Dashboard loads; no separate business date is invented.',
      action: 'Opens the user and permissions register in Administration.'
    },
    {
      id: 'documents', label: 'Documents', definition: 'Total document count returned by the GED count service.',
      scope: 'Documents recorded in the connected GED; the total measures neither quality, approval nor completeness.',
      source: 'GED API · document count · total.',
      freshness: 'Refreshed when the Dashboard loads; source availability is displayed separately.',
      action: 'Opens the document register in GED & Knowledge Management.'
    },
    {
      id: 'tasks', label: 'Tracked tasks', definition: 'Total tasks returned by the Administration register, with open and completed breakdowns when available.',
      scope: 'Tasks recorded in the connected source; this total is neither a progress rate nor a project count.',
      source: 'Administration API · task register · total, open and completed.',
      freshness: 'Refreshed when the Dashboard loads; missing statuses remain unavailable.',
      action: 'Opens the task register in Planning & Projects.'
    }
  ],
  DE: [
    {
      id: 'active-major-files', label: 'Aktive wichtige Akten', definition: 'Anzahl der Akten im Steuerungsportfolio mit aktivem Status.',
      scope: 'Funktionsübergreifende Akten von Management & Governance, ohne Fortschritt oder Kritikalität abzuleiten.',
      source: 'Management-API · Portfolioübersicht · Feld active_dossiers.',
      freshness: 'Beim Laden des Dashboards aktualisiert; das Prüfdatum der Übersicht bleibt das von der Quelle gelieferte Datum.',
      action: 'Öffnet das Portfolio der wichtigen Akten in der Verwaltung.'
    },
    {
      id: 'users', label: 'M3S-Benutzer', definition: 'Anzahl der authentifizierten Konten aus dem M3S-Zähldienst.',
      scope: 'Anwendungskonten; die Kennzahl steht weder für Personen, assoziierte Mitglieder noch den Personalbestand.',
      source: 'M3S-API · authentifizierte Konten · Gesamtwert.',
      freshness: 'Beim Laden des Dashboards aktualisiert; es wird kein eigenes Fachdaten-Datum erfunden.',
      action: 'Öffnet das Benutzer- und Rechteregister in der Verwaltung.'
    },
    {
      id: 'documents', label: 'Dokumente', definition: 'Gesamtzahl der Dokumente aus dem Zähldienst der Dokumentenverwaltung.',
      scope: 'In der verbundenen GED erfasste Dokumente; die Zahl misst weder Qualität, Freigabe noch Vollständigkeit.',
      source: 'GED-API · Dokumentenzähler · Gesamtwert.',
      freshness: 'Beim Laden des Dashboards aktualisiert; die Quellenverfügbarkeit wird getrennt angezeigt.',
      action: 'Öffnet das Dokumentenregister in GED & Knowledge Management.'
    },
    {
      id: 'tasks', label: 'Verfolgte Aufgaben', definition: 'Gesamtzahl der Aufgaben aus dem Verwaltungsregister, sofern verfügbar mit offenen und erledigten Aufgaben.',
      scope: 'In der verbundenen Quelle erfasste Aufgaben; die Zahl ist weder Fortschrittsquote noch Projektanzahl.',
      source: 'Verwaltungs-API · Aufgabenregister · total, open und completed.',
      freshness: 'Beim Laden des Dashboards aktualisiert; fehlende Statuswerte bleiben nicht verfügbar.',
      action: 'Öffnet das Aufgabenregister in Planung & Projekte.'
    }
  ]
};

export const getManagementKpiDefinitions = (language = 'FR') => dictionary[language] || dictionary.FR;

export const getManagementKpiDefinition = (id, language = 'FR') => (
  getManagementKpiDefinitions(language).find((item) => item.id === id) || null
);

