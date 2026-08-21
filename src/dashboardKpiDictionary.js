const managementDictionary = {
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

const financeDictionary = {
  FR: [
    {
      id: 'revenue', label: 'Recettes',
      definition: 'Somme des recettes hors flux classés « Aide Sociale Ménage », exprimée dans les montants CHF et CFA enregistrés.',
      scope: 'Recettes d’exploitation et autres recettes non sociales. Les flux sociaux sont présentés séparément afin d’éviter un double comptage.',
      source: 'API Finance · /finance/dashboard · total_income et total_income_cfa, selon la règle nonSocialIncomeWhere.',
      freshness: 'Actualisé au chargement du Tableau de bord à partir de l’agrégat Finance disponible.',
      action: 'Ouvre le registre des recettes dans Finances.'
    },
    {
      id: 'expenses', label: 'Dépenses',
      definition: 'Somme de toutes les dépenses enregistrées, séparément en CHF et en CFA.',
      scope: 'Écritures présentes dans la source Dépenses ; l’indicateur ne certifie ni leur qualification comptable ni l’exhaustivité des justificatifs.',
      source: 'API Finance · /finance/dashboard · total_expenses et total_expenses_cfa.',
      freshness: 'Actualisé au chargement du Tableau de bord à partir de l’agrégat Finance disponible.',
      action: 'Ouvre le registre des dépenses dans Finances.'
    },
    {
      id: 'balance', label: 'Solde',
      definition: 'Différence entre les recettes non sociales et les dépenses, calculée séparément en CHF et en CFA.',
      scope: 'Solde de lecture du registre Finance ; il ne constitue ni un solde bancaire, ni une trésorerie certifiée, ni un résultat comptable.',
      source: 'Tableau de bord · recettes moins dépenses issues de /finance/dashboard.',
      freshness: 'Recalculé au chargement lorsque les deux agrégats Finance sont disponibles.',
      action: 'Ouvre la vue d’ensemble de Finances.'
    },
    {
      id: 'donations', label: 'Dons',
      definition: 'Somme des recettes dont la nature contient la qualification « DON », dans les montants CHF et CFA enregistrés.',
      scope: 'Sous-ensemble des recettes non sociales ; la qualification dépend du champ Nature de la source.',
      source: 'API Finance · registre Recettes · filtre de catégorie contenant DON.',
      freshness: 'Recalculé au chargement à partir des lignes de recettes accessibles.',
      action: 'Ouvre les recettes filtrées sur les dons dans Finances.'
    },
    {
      id: 'financing', label: 'Financements',
      definition: 'Somme des recettes dont la nature est exactement « FINANCEMENT », dans les montants CHF et CFA enregistrés.',
      scope: 'Sous-ensemble des recettes ; cet indicateur ne détermine ni la nature juridique du financement ni son éventuelle obligation de remboursement.',
      source: 'API Finance · registre Recettes · filtre de catégorie FINANCEMENT.',
      freshness: 'Recalculé au chargement à partir des lignes de recettes accessibles.',
      action: 'Ouvre les recettes filtrées sur les financements dans Finances.'
    },
    {
      id: 'reference-rate', label: 'Taux de référence',
      definition: 'Dernier taux CHF/CFA disponible dans l’historique FX gouverné.',
      scope: 'Taux indicatif courant. Il ne remplace jamais le taux fournisseur ou le taux effectivement appliqué à une opération historique.',
      source: 'API Finance · historique FX · taux_du_jour.CHF_CFA.',
      freshness: 'La date et la source du taux restent celles du registre FX ; aucune actualisation fictive n’est ajoutée.',
      action: 'Ouvre l’historique FX dans Finances.'
    },
    {
      id: 'real-estate-funding', label: 'Financement immobilier total',
      definition: 'Somme des investissements immobiliers réalisés, avec leurs montants CHF et CFA historiques enregistrés.',
      scope: 'Opérations non futures de type Avance ou Information. Les montants CFA proviennent des opérations et ne sont pas recalculés au taux courant.',
      source: 'API Finance immobilière · fin_immo_synthese · investissements_realises_chf et investissements_realises_cfa.',
      freshness: 'Actualisé au chargement à partir de la synthèse immobilière disponible.',
      action: 'Ouvre la vue Financement immobilier dans Finances.'
    },
    {
      id: 'real-estate-reimbursements', label: 'Remboursements immobiliers',
      definition: 'Somme CHF des remboursements immobiliers réalisés ; l’équivalent CFA affiché est une conversion au taux de référence courant.',
      scope: 'Le CFA est indicatif et ne constitue pas un total historique des montants CFA effectivement remboursés.',
      source: 'API Finance immobilière · remboursements_total_chf, converti avec taux_du_jour.CHF_CFA.',
      freshness: 'Le CHF suit la synthèse immobilière ; l’équivalent CFA varie avec le taux de référence disponible.',
      action: 'Ouvre la vue Financement immobilier dans Finances.'
    },
    {
      id: 'outstanding-balance', label: 'Solde restant ouvert',
      definition: 'Différence CHF entre la part attribuée à Cheikh et les remboursements réalisés ; l’équivalent CFA utilise le taux de référence courant.',
      scope: 'Indicateur de suivi interne. Il ne constitue ni une reconnaissance de dette, ni une créance juridiquement ou comptablement certifiée.',
      source: 'API Finance immobilière · solde_ouvert_cheikh_chf, converti avec taux_du_jour.CHF_CFA.',
      freshness: 'Le CHF suit la synthèse immobilière ; l’équivalent CFA varie avec le taux de référence disponible.',
      action: 'Ouvre la vue Financement immobilier dans Finances.'
    },
    {
      id: 'social-flows', label: 'Flux sociaux reclassés',
      definition: 'Somme des recettes classées « Aide Sociale Ménage », avec total CHF et total CFA historique enregistrés.',
      scope: 'Flux sociaux exclus des recettes d’exploitation et présentés séparément ; le classement ne constitue pas une qualification comptable ou fiscale.',
      source: 'API Finance sociale · total_chf et total_cfa_historique.',
      freshness: 'Actualisé au chargement à partir du registre social disponible.',
      action: 'Ouvre la vue Social dans Finances.'
    }
  ],
  EN: [
    {
      id: 'revenue', label: 'Revenue', definition: 'Sum of income excluding flows classified as “Household Social Aid”, using the recorded CHF and CFA amounts.',
      scope: 'Operating and other non-social income. Social flows are shown separately to prevent double counting.', source: 'Finance API · /finance/dashboard · total_income and total_income_cfa under nonSocialIncomeWhere.',
      freshness: 'Refreshed when the Dashboard loads from the available Finance aggregate.', action: 'Opens the income register in Finance.'
    },
    {
      id: 'expenses', label: 'Expenses', definition: 'Sum of all recorded expenses, separately in CHF and CFA.',
      scope: 'Entries present in the Expenses source; the indicator certifies neither accounting classification nor completeness of evidence.', source: 'Finance API · /finance/dashboard · total_expenses and total_expenses_cfa.',
      freshness: 'Refreshed when the Dashboard loads from the available Finance aggregate.', action: 'Opens the expense register in Finance.'
    },
    {
      id: 'balance', label: 'Balance', definition: 'Difference between non-social income and expenses, calculated separately in CHF and CFA.',
      scope: 'A Finance-register reading balance; it is neither a bank balance, certified cash position nor accounting result.', source: 'Dashboard · income minus expenses from /finance/dashboard.',
      freshness: 'Recalculated on load when both Finance aggregates are available.', action: 'Opens the Finance overview.'
    },
    {
      id: 'donations', label: 'Donations', definition: 'Sum of income whose nature contains “DON”, using the recorded CHF and CFA amounts.',
      scope: 'Subset of non-social income; classification depends on the source Nature field.', source: 'Finance API · Income register · category filter containing DON.',
      freshness: 'Recalculated on load from accessible income rows.', action: 'Opens income filtered to donations in Finance.'
    },
    {
      id: 'financing', label: 'Financing', definition: 'Sum of income whose nature is exactly “FINANCEMENT”, using the recorded CHF and CFA amounts.',
      scope: 'Subset of income; this indicator determines neither the legal nature of funding nor any repayment obligation.', source: 'Finance API · Income register · FINANCEMENT category filter.',
      freshness: 'Recalculated on load from accessible income rows.', action: 'Opens income filtered to financing in Finance.'
    },
    {
      id: 'reference-rate', label: 'Reference rate', definition: 'Latest available CHF/CFA rate in the governed FX history.',
      scope: 'Current indicative rate. It never replaces a provider rate or the rate actually applied to a historical transaction.', source: 'Finance API · FX history · taux_du_jour.CHF_CFA.',
      freshness: 'The rate date and source remain those of the FX register; no fictitious update is added.', action: 'Opens FX history in Finance.'
    },
    {
      id: 'real-estate-funding', label: 'Total real estate funding', definition: 'Sum of realised real estate investments, with their recorded historical CHF and CFA amounts.',
      scope: 'Non-future Advance or Information operations. CFA amounts come from transactions and are not recomputed at the current rate.', source: 'Real estate Finance API · fin_immo_synthese · investissements_realises_chf and investissements_realises_cfa.',
      freshness: 'Refreshed on load from the available real estate summary.', action: 'Opens Real estate finance in Finance.'
    },
    {
      id: 'real-estate-reimbursements', label: 'Real estate reimbursements', definition: 'Sum in CHF of realised real estate reimbursements; the displayed CFA equivalent is converted at the current reference rate.',
      scope: 'The CFA amount is indicative and is not a historical total of CFA amounts actually reimbursed.', source: 'Real estate Finance API · remboursements_total_chf, converted with taux_du_jour.CHF_CFA.',
      freshness: 'CHF follows the real estate summary; the CFA equivalent changes with the available reference rate.', action: 'Opens Real estate finance in Finance.'
    },
    {
      id: 'outstanding-balance', label: 'Outstanding balance', definition: 'CHF difference between Cheikh’s attributed share and realised reimbursements; the CFA equivalent uses the current reference rate.',
      scope: 'Internal tracking indicator. It is neither an acknowledgment of debt nor a legally or accounting-certified receivable.', source: 'Real estate Finance API · solde_ouvert_cheikh_chf, converted with taux_du_jour.CHF_CFA.',
      freshness: 'CHF follows the real estate summary; the CFA equivalent changes with the available reference rate.', action: 'Opens Real estate finance in Finance.'
    },
    {
      id: 'social-flows', label: 'Reclassified social flows', definition: 'Sum of income classified as “Household Social Aid”, with recorded CHF total and historical CFA total.',
      scope: 'Social flows excluded from operating income and shown separately; classification is not an accounting or tax qualification.', source: 'Social Finance API · total_chf and total_cfa_historique.',
      freshness: 'Refreshed on load from the available social register.', action: 'Opens the Social view in Finance.'
    }
  ],
  DE: [
    {
      id: 'revenue', label: 'Einnahmen', definition: 'Summe der Einnahmen ohne als „Sozialhilfe Haushalt“ eingestufte Flüsse, mit den erfassten CHF- und CFA-Beträgen.',
      scope: 'Betriebliche und andere nicht soziale Einnahmen. Soziale Flüsse werden getrennt ausgewiesen, um Doppelzählungen zu vermeiden.', source: 'Finanz-API · /finance/dashboard · total_income und total_income_cfa nach nonSocialIncomeWhere.',
      freshness: 'Beim Laden des Dashboards aus dem verfügbaren Finanzaggregat aktualisiert.', action: 'Öffnet das Einnahmenregister in Finanzen.'
    },
    {
      id: 'expenses', label: 'Ausgaben', definition: 'Summe aller erfassten Ausgaben, getrennt in CHF und CFA.',
      scope: 'Buchungen in der Ausgabenquelle; die Kennzahl bestätigt weder die Buchungsklassifikation noch die Vollständigkeit der Belege.', source: 'Finanz-API · /finance/dashboard · total_expenses und total_expenses_cfa.',
      freshness: 'Beim Laden des Dashboards aus dem verfügbaren Finanzaggregat aktualisiert.', action: 'Öffnet das Ausgabenregister in Finanzen.'
    },
    {
      id: 'balance', label: 'Saldo', definition: 'Differenz zwischen nicht sozialen Einnahmen und Ausgaben, getrennt in CHF und CFA berechnet.',
      scope: 'Lesesaldo des Finanzregisters; weder Bankguthaben noch bestätigte Liquidität oder Buchhaltungsergebnis.', source: 'Dashboard · Einnahmen minus Ausgaben aus /finance/dashboard.',
      freshness: 'Beim Laden neu berechnet, wenn beide Finanzaggregate verfügbar sind.', action: 'Öffnet die Finanzübersicht.'
    },
    {
      id: 'donations', label: 'Spenden', definition: 'Summe der Einnahmen, deren Art „DON“ enthält, mit den erfassten CHF- und CFA-Beträgen.',
      scope: 'Teilmenge der nicht sozialen Einnahmen; die Einstufung hängt vom Feld Art der Quelle ab.', source: 'Finanz-API · Einnahmenregister · Kategorienfilter mit DON.',
      freshness: 'Beim Laden aus den zugänglichen Einnahmenzeilen neu berechnet.', action: 'Öffnet die nach Spenden gefilterten Einnahmen.'
    },
    {
      id: 'financing', label: 'Finanzierungen', definition: 'Summe der Einnahmen mit der exakten Art „FINANCEMENT“, mit den erfassten CHF- und CFA-Beträgen.',
      scope: 'Teilmenge der Einnahmen; die Kennzahl bestimmt weder die Rechtsnatur noch eine Rückzahlungspflicht.', source: 'Finanz-API · Einnahmenregister · Kategorienfilter FINANCEMENT.',
      freshness: 'Beim Laden aus den zugänglichen Einnahmenzeilen neu berechnet.', action: 'Öffnet die nach Finanzierungen gefilterten Einnahmen.'
    },
    {
      id: 'reference-rate', label: 'Referenzkurs', definition: 'Letzter verfügbarer CHF/CFA-Kurs im geregelten FX-Verlauf.',
      scope: 'Aktueller Richtkurs. Er ersetzt niemals einen Anbieterkurs oder den tatsächlich auf eine historische Transaktion angewandten Kurs.', source: 'Finanz-API · FX-Verlauf · taux_du_jour.CHF_CFA.',
      freshness: 'Datum und Quelle bleiben die des FX-Registers; keine fiktive Aktualisierung wird ergänzt.', action: 'Öffnet den FX-Verlauf in Finanzen.'
    },
    {
      id: 'real-estate-funding', label: 'Immobilienfinanzierung gesamt', definition: 'Summe der realisierten Immobilieninvestitionen mit ihren erfassten historischen CHF- und CFA-Beträgen.',
      scope: 'Nicht zukünftige Vorgänge der Art Avance oder Information. CFA-Beträge stammen aus den Vorgängen und werden nicht zum aktuellen Kurs neu berechnet.', source: 'Immobilienfinanz-API · fin_immo_synthese · investissements_realises_chf und investissements_realises_cfa.',
      freshness: 'Beim Laden aus der verfügbaren Immobilienübersicht aktualisiert.', action: 'Öffnet die Immobilienfinanzierung in Finanzen.'
    },
    {
      id: 'real-estate-reimbursements', label: 'Immobilienrückzahlungen', definition: 'CHF-Summe der realisierten Immobilienrückzahlungen; der angezeigte CFA-Gegenwert wird zum aktuellen Referenzkurs umgerechnet.',
      scope: 'Der CFA-Betrag ist indikativ und kein historischer Gesamtbetrag der tatsächlich in CFA geleisteten Rückzahlungen.', source: 'Immobilienfinanz-API · remboursements_total_chf, umgerechnet mit taux_du_jour.CHF_CFA.',
      freshness: 'CHF folgt der Immobilienübersicht; der CFA-Gegenwert ändert sich mit dem verfügbaren Referenzkurs.', action: 'Öffnet die Immobilienfinanzierung in Finanzen.'
    },
    {
      id: 'outstanding-balance', label: 'Offener Restsaldo', definition: 'CHF-Differenz zwischen Cheikh zugeordnetem Anteil und realisierten Rückzahlungen; der CFA-Gegenwert nutzt den aktuellen Referenzkurs.',
      scope: 'Interne Steuerungskennzahl. Sie ist weder Schuldanerkenntnis noch rechtlich oder buchhalterisch bestätigte Forderung.', source: 'Immobilienfinanz-API · solde_ouvert_cheikh_chf, umgerechnet mit taux_du_jour.CHF_CFA.',
      freshness: 'CHF folgt der Immobilienübersicht; der CFA-Gegenwert ändert sich mit dem verfügbaren Referenzkurs.', action: 'Öffnet die Immobilienfinanzierung in Finanzen.'
    },
    {
      id: 'social-flows', label: 'Neu klassifizierte soziale Flüsse', definition: 'Summe der als „Sozialhilfe Haushalt“ eingestuften Einnahmen mit erfasstem CHF-Gesamtwert und historischem CFA-Gesamtwert.',
      scope: 'Von den betrieblichen Einnahmen ausgeschlossene und getrennt ausgewiesene soziale Flüsse; die Einstufung ist keine buchhalterische oder steuerliche Qualifikation.', source: 'Sozialfinanz-API · total_chf und total_cfa_historique.',
      freshness: 'Beim Laden aus dem verfügbaren Sozialregister aktualisiert.', action: 'Öffnet die Ansicht Soziales in Finanzen.'
    }
  ]
};

const operationsDictionary = {
  FR: [
    {
      id: 'stocks', label: 'Quantité en stock',
      definition: 'Somme des quantités des articles retournée par le service de comptage de l’inventaire.',
      scope: 'Quantités enregistrées dans Stock & Actifs. Cet indicateur ne mesure ni la valeur du stock, ni sa disponibilité physique, ni son état.',
      source: 'API Stock & Actifs · compteur d’inventaire · champ total.',
      freshness: 'Actualisé au chargement du Tableau de bord lorsque la source répond avec un nombre valide.',
      action: 'Ouvre le registre Inventaire dans Stock & Actifs.'
    },
    {
      id: 'clients', label: 'Clients',
      definition: 'Nombre de clients enregistrés dans le registre Commercial & CRM lorsque son compteur global sera raccordé.',
      scope: 'Le compteur n’est pas connecté au Tableau de bord. La valeur reste indisponible et ne doit pas être interprétée comme zéro client.',
      source: 'Source cible · Commercial & CRM · registre Clients ; raccordement à réaliser.',
      freshness: 'Indisponible tant qu’un compteur source gouverné n’est pas exposé.',
      action: 'Ouvre le registre Clients dans Commercial & CRM.'
    },
    {
      id: 'orders', label: 'Commandes',
      definition: 'Nombre de commandes enregistrées dans Production lorsque son compteur global sera raccordé.',
      scope: 'Le compteur n’est pas connecté au Tableau de bord. La valeur reste indisponible et ne représente ni zéro commande ni les commandes livrées.',
      source: 'Source cible · Production · registre Commandes ; raccordement à réaliser.',
      freshness: 'Indisponible tant qu’un compteur source gouverné n’est pas exposé.',
      action: 'Ouvre le registre Commandes dans Production.'
    },
    {
      id: 'beneficiaries', label: 'Bénéficiaires',
      definition: 'Nombre de bénéficiaires enregistrés dans le registre Commercial & CRM lorsque son compteur global sera raccordé.',
      scope: 'Le compteur n’est pas connecté au Tableau de bord. La valeur reste indisponible et ne doit pas être confondue avec les utilisateurs M3S ou l’effectif RH.',
      source: 'Source cible · Commercial & CRM · registre Bénéficiaires ; raccordement à réaliser.',
      freshness: 'Indisponible tant qu’un compteur source gouverné n’est pas exposé.',
      action: 'Ouvre le registre Bénéficiaires dans Commercial & CRM.'
    },
    {
      id: 'suppliers', label: 'Fournisseurs',
      definition: 'Nombre global de noms de fournisseurs distincts présents dans les dépenses Finance et le registre Stocks & Actifs.',
      scope: 'Les noms non vides sont normalisés par suppression des espaces périphériques et comparaison sans distinction de casse. Le compteur ne mesure ni les fournisseurs actifs, ni leur évaluation, ni le nombre de transactions.',
      source: 'API Fournisseurs · compteur global ; sources : dépenses Finance et stocks_actifs_propres ; champ total.',
      freshness: 'Actualisé au chargement du Tableau de bord lorsque les deux sources maîtresses répondent.',
      action: 'Ouvre le registre Fournisseurs dans Production.'
    }
  ],
  EN: [
    {
      id: 'stocks', label: 'Stock quantity', definition: 'Sum of item quantities returned by the inventory count service.',
      scope: 'Quantities recorded in Stock & Assets. This indicator measures neither stock value, physical availability nor condition.', source: 'Stock & Assets API · inventory count · total field.',
      freshness: 'Refreshed when the Dashboard loads and the source returns a valid number.', action: 'Opens the Inventory register in Stock & Assets.'
    },
    {
      id: 'clients', label: 'Clients', definition: 'Number of clients recorded in Commercial & CRM once its global counter is connected.',
      scope: 'The counter is not connected to the Dashboard. The value remains unavailable and must not be read as zero clients.', source: 'Target source · Commercial & CRM · Clients register; connection pending.',
      freshness: 'Unavailable until a governed source counter is exposed.', action: 'Opens the Clients register in Commercial & CRM.'
    },
    {
      id: 'orders', label: 'Orders', definition: 'Number of orders recorded in Production once its global counter is connected.',
      scope: 'The counter is not connected to the Dashboard. The value remains unavailable and represents neither zero orders nor delivered orders.', source: 'Target source · Production · Orders register; connection pending.',
      freshness: 'Unavailable until a governed source counter is exposed.', action: 'Opens the Orders register in Production.'
    },
    {
      id: 'beneficiaries', label: 'Beneficiaries', definition: 'Number of beneficiaries recorded in Commercial & CRM once its global counter is connected.',
      scope: 'The counter is not connected to the Dashboard. The value remains unavailable and must not be confused with M3S users or HR headcount.', source: 'Target source · Commercial & CRM · Beneficiaries register; connection pending.',
      freshness: 'Unavailable until a governed source counter is exposed.', action: 'Opens the Beneficiaries register in Commercial & CRM.'
    },
    {
      id: 'suppliers', label: 'Suppliers', definition: 'Global number of distinct supplier names present in Finance expenses and the Stock & Assets register.',
      scope: 'Non-empty names are trimmed and compared without case sensitivity. The counter measures neither active or assessed suppliers nor transaction volume.', source: 'Suppliers API · global counter; sources: Finance expenses and stocks_actifs_propres; total field.',
      freshness: 'Refreshed when the Dashboard loads and both master sources respond.', action: 'Opens the Suppliers register in Production.'
    }
  ],
  DE: [
    {
      id: 'stocks', label: 'Lagermenge', definition: 'Summe der Artikelmengen aus dem Inventarzähldienst.',
      scope: 'In Lager & Vermögenswerte erfasste Mengen. Die Kennzahl misst weder Lagerwert, physische Verfügbarkeit noch Zustand.', source: 'API Lager & Vermögenswerte · Inventarzähler · Feld total.',
      freshness: 'Beim Laden des Dashboards aktualisiert, wenn die Quelle eine gültige Zahl liefert.', action: 'Öffnet das Inventarregister in Lager & Vermögenswerte.'
    },
    {
      id: 'clients', label: 'Kunden', definition: 'Anzahl der in Vertrieb & CRM erfassten Kunden, sobald der globale Zähler verbunden ist.',
      scope: 'Der Zähler ist nicht mit dem Dashboard verbunden. Der Wert bleibt nicht verfügbar und darf nicht als null Kunden gelesen werden.', source: 'Zielquelle · Vertrieb & CRM · Kundenregister; Verbindung ausstehend.',
      freshness: 'Nicht verfügbar, bis ein geregelter Quellzähler bereitsteht.', action: 'Öffnet das Kundenregister in Vertrieb & CRM.'
    },
    {
      id: 'orders', label: 'Bestellungen', definition: 'Anzahl der in Produktion erfassten Bestellungen, sobald der globale Zähler verbunden ist.',
      scope: 'Der Zähler ist nicht mit dem Dashboard verbunden. Der Wert bleibt nicht verfügbar und steht weder für null Bestellungen noch gelieferte Bestellungen.', source: 'Zielquelle · Produktion · Bestellregister; Verbindung ausstehend.',
      freshness: 'Nicht verfügbar, bis ein geregelter Quellzähler bereitsteht.', action: 'Öffnet das Bestellregister in Produktion.'
    },
    {
      id: 'beneficiaries', label: 'Begünstigte', definition: 'Anzahl der in Vertrieb & CRM erfassten Begünstigten, sobald der globale Zähler verbunden ist.',
      scope: 'Der Zähler ist nicht mit dem Dashboard verbunden. Der Wert bleibt nicht verfügbar und ist weder M3S-Benutzerzahl noch Personalbestand.', source: 'Zielquelle · Vertrieb & CRM · Begünstigtenregister; Verbindung ausstehend.',
      freshness: 'Nicht verfügbar, bis ein geregelter Quellzähler bereitsteht.', action: 'Öffnet das Begünstigtenregister in Vertrieb & CRM.'
    },
    {
      id: 'suppliers', label: 'Lieferanten', definition: 'Globale Anzahl eindeutiger Lieferantennamen in den Finanzausgaben und im Register Bestand & Aktiven.',
      scope: 'Nicht leere Namen werden außen bereinigt und ohne Beachtung der Groß- und Kleinschreibung verglichen. Die Kennzahl misst weder aktive oder bewertete Lieferanten noch Transaktionen.', source: 'Lieferanten-API · globaler Zähler; Quellen: Finanzausgaben und stocks_actifs_propres; Feld total.',
      freshness: 'Beim Laden des Dashboards aktualisiert, wenn beide maßgeblichen Quellen antworten.', action: 'Öffnet das Lieferantenregister in Produktion.'
    }
  ]
};

export const getManagementKpiDefinitions = (language = 'FR') => managementDictionary[language] || managementDictionary.FR;

export const getManagementKpiDefinition = (id, language = 'FR') => (
  getManagementKpiDefinitions(language).find((item) => item.id === id) || null
);

export const getFinanceKpiDefinitions = (language = 'FR') => financeDictionary[language] || financeDictionary.FR;

export const getFinanceKpiDefinition = (id, language = 'FR') => (
  getFinanceKpiDefinitions(language).find((item) => item.id === id) || null
);

export const getOperationsKpiDefinitions = (language = 'FR') => operationsDictionary[language] || operationsDictionary.FR;

export const getOperationsKpiDefinition = (id, language = 'FR') => (
  getOperationsKpiDefinitions(language).find((item) => item.id === id) || null
);

export const getDashboardKpiDefinitions = (language = 'FR') => ({
  management: getManagementKpiDefinitions(language),
  finance: getFinanceKpiDefinitions(language),
  operations: getOperationsKpiDefinitions(language)
});

