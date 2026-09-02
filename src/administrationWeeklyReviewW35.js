export const W35_SOURCES = [
  { date: '2026-08-24', sections: ['Decision humaine et trace gouvernee CNS-02'] },
  { date: '2026-08-25', sections: ['Rectification de gouvernance - Validation globale des huit CNS', 'Resultats - Traces gouvernees CNS-04 a CNS-08'] },
  { date: '2026-08-26', sections: ["Confirmation de l'ADR, fermeture de G0 et fondations L1"] },
  { date: '2026-08-27', sections: ['Confirmation de REV-003 et matrice candidate des preuves de sortie G1'] },
  { date: '2026-08-28', sections: ['Incident Telegram et cloture de session', 'Confirmation de la fiche GO/NO-GO et reprise du moindre privilege'] },
  { date: '2026-08-29', sections: ['Confirmation WAV-003 et premiere autorisation technique unitaire candidate'] },
  { date: '2026-08-30', sections: ['Lot REF-01 - Industrialisation Fast Track et qualification groupée', "Lot REF-01 - Confirmation NAM-002 et dossiers d'autorisation vides"] }
].map(source => ({ ...source, file: 'M3S_JOURNAL_DE_BORD_' + source.date + '.md' }));

const resultReferences = [
  '24–25/08 · CNS-02-DEC-001 ; CNS-03..CNS-08 · PR 176, 178, 179',
  '26–27/08 · REF-01-DEC-012 ; REF-01-G1-REV-003 · PR 198, 225 ; backend 46',
  '28–29/08 · REF-01-DEC-051 ; REF-01-DEC-061 · PR 242, 256',
  '30/08 · REF-01-DEC-066 ; FTK-001 ; QLF-001 · PR 261',
  '30/08 · PGM-CPK-001 ; M3S-INB-001 ; AUT-003 V0.1 · PR 261, 267, 268',
  '28/08 · Incident Telegram · ai:refresh:v4 / --publish-only'
];

const common = {
  sources: W35_SOURCES.map(source => source.file),
  sourceSections: Object.fromEntries(W35_SOURCES.map(source => [source.file, source.sections])),
  resultReferences,
  gedPath: 'GED/Administration/Rapports_activite/2026/Hebdomadaires/2SG-ADM-RH-2026-W35-PILOTE'
};

export const WEEKLY_REVIEW_W35 = {
  FR: {
    ...common,
    eyebrow: 'SYNTHÈSE DE TRAVAIL · ARRÊTÉE AU 30 AOÛT 2026',
    title: 'Revue hebdomadaire du 24 au 30 août 2026',
    intro: 'Synthèse rétrospective des journaux du 24 au 30 août. Les statuts décrivent la fin de cette période, pas la situation courante. La présence des sept journaux ne garantit pas que toute l’activité a été consignée.',
    metadata: [
      ['Identifiant', '2SG-ADM-RH-2026-W35-PILOTE · V0.1'],
      ['Période proposée', '24–30 août 2026'],
      ['Périmètre', 'Programme institutionnel 2SG et système interne M3S'],
      ['Statut', 'Synthèse de travail provisoire']
    ],
    coverageValue: '7 journaux recensés · 0 journée sans fichier journal',
    results: [
      'Les huit cadres CNS sont reconnus comme cadres de travail déjà validés. Les traces distinctes ont été publiées sans demander huit nouvelles validations ni déclarer leur réalisation.',
      'Les fondations techniques L1 de REF-01 sont préparées et isolées du démarrage en production. La revue G1 et ses preuves attendues sont structurées ; cela ne ferme aucune condition technique.',
      'Conservation, GED et moindre privilège disposent de modèles documentaires. La vague technique distingue PostgreSQL/restauration, migration/retour arrière et Outbox/supervision/reprise, sans ouvrir d’opération réelle.',
      'FTK-001 confirme le traitement groupé par exceptions : 22 valeurs examinées, dont 9 qualifiées dans leur portée synthétique, 8 partielles et 5 ouvertes. Les 13 exceptions sont regroupées en cinq familles.',
      'Une vue globale candidate du Programme et le cadrage d’une future boîte d’entrée M3S ont été publiés. En fin de période, cinq dossiers d’autorisation vides sont préparés sous AUT-003 V0.1 ; ils ne valent ni autorisation ni activité courante intégrée.',
      'Le renvoi répété du Daily sur Telegram a été identifié. Le correctif sépare actualisation M3S sans envoi et livraison quotidienne protégée contre les doublons ; il ne prouve pas la réception de chaque message.'
    ],
    indicators: [
      ['Journaux recensés', '7', 'Un fichier daté pour chacun des jours du 24 au 30 août'],
      ['Journées sans fichier', '0', 'Couverture documentaire, pas exhaustivité de l’activité'],
      ['Valeurs examinées', '22', '9 synthétiques · 8 partielles · 5 ouvertes au 30 août'],
      ['Exceptions regroupées', '13', 'Cinq familles documentaires ; aucune progression calculée']
    ],
    watch: [
      'Les journaux peuvent contenir plusieurs sessions et franchir minuit. Aucun temps actif net, nombre de livraisons unique ou taux de réalisation n’est déduit de leurs volumes.',
      'Une qualification synthétique n’est pas une valeur de production. G1 reste ouverte et L2 fermé à la fin de cette période.',
      'Les dossiers d’autorisation vides ne désignent ni personne ni accès réel. Les pièces sensibles et données personnelles ne sont pas reprises dans cette revue.',
      'Les événements postérieurs au 30 août, notamment les décisions Conception de septembre, sont hors période. Cette revue ne remplace pas le cockpit courant.'
    ],
    nextTitle: 'Suivi issu de la période · à rapprocher de l’état courant',
    next: [
      'Ne pas redemander les validations CNS et documentaires déjà acquises ; vérifier uniquement les exceptions nouvelles.',
      'Rapprocher les cinq familles de preuves de leur état courant avant toute relance ; ne lancer aucune collecte ou opération depuis cette revue.',
      'Conserver l’activité courante, Villa LR1 et la qualité des données dans leurs lots distincts ; le cadrage de boîte d’entrée ne constitue pas une ouverture opérationnelle.',
      'Faire relire la synthèse et confirmer sa période ainsi que son classement uniquement avant une éventuelle promotion institutionnelle.'
    ],
    gedTitle: 'Classement GED proposé',
    gedStatus: 'Non créé · après approbation',
    promotionRule: 'Administration conserve le pilotage du processus. La période et le classement W35 sont proposés pour cette synthèse ; aucun archivage institutionnel n’est déclaré sans contrôle du fond et décision humaine de promotion.'
  },
  EN: {
    ...common,
    eyebrow: 'WORKING SYNTHESIS · AS OF 30 AUGUST 2026',
    title: 'Weekly review from 24 to 30 August 2026',
    intro: 'Retrospective synthesis of the 24–30 August journals. Statuses describe the end of that period, not the current situation. Having all seven journals does not guarantee that every activity was recorded.',
    metadata: [
      ['Identifier', '2SG-ADM-RH-2026-W35-PILOTE · V0.1'],
      ['Proposed period', '24–30 August 2026'],
      ['Scope', '2SG institutional programme and internal M3S system'],
      ['Status', 'Provisional working synthesis']
    ],
    coverageValue: '7 journals identified · 0 days without a journal file',
    results: [
      'The eight CNS frameworks are recognised as already validated working frameworks. Separate decision records were published without requesting eight new validations or claiming implementation.',
      'REF-01 L1 technical foundations are prepared and isolated from production startup. The G1 review and expected evidence are structured; this does not close any technical condition.',
      'Retention, DMS and least privilege have documentary models. The technical wave separates PostgreSQL/restoration, migration/rollback and Outbox/monitoring/recovery without opening a real operation.',
      'FTK-001 confirms grouped exception handling: 22 values examined, with 9 qualified within their synthetic scope, 8 partial and 5 open. The 13 exceptions are grouped into five families.',
      'A candidate programme overview and framing for a future M3S inbox were published. At period end, five empty authorisation files are prepared under AUT-003 V0.1; they are neither authorisations nor integrated daily operations.',
      'Repeated Daily sends on Telegram were identified. The fix separates M3S refresh without sending from duplicate-protected daily delivery; it does not prove receipt of every message.'
    ],
    indicators: [
      ['Journals identified', '7', 'One dated file for each day from 24 to 30 August'],
      ['Days without a file', '0', 'Documentary coverage, not completeness of activity'],
      ['Values examined', '22', '9 synthetic · 8 partial · 5 open as of 30 August'],
      ['Grouped exceptions', '13', 'Five documentary families; no progress calculated']
    ],
    watch: [
      'Journals may span multiple sessions and cross midnight. No net active time, unique delivery count or completion rate is inferred from their volume.',
      'Synthetic qualification is not a production value. G1 remains open and L2 closed at the end of this period.',
      'Empty authorisation files designate neither people nor real access. Sensitive records and personal data are not reproduced in this review.',
      'Events after 30 August, including September Design decisions, are outside this period. This review does not replace the current cockpit.'
    ],
    nextTitle: 'Period follow-up · reconcile with current status',
    next: [
      'Do not request already-settled CNS and documentary validations again; review only new exceptions.',
      'Reconcile the five evidence families with their current status before any follow-up; launch no collection or operation from this review.',
      'Keep daily activity, Villa LR1 and data quality in separate packages; inbox framing does not open operations.',
      'Have the synthesis reviewed and confirm its period and filing only before any institutional promotion.'
    ],
    gedTitle: 'Proposed DMS filing',
    gedStatus: 'Not created · after approval',
    promotionRule: 'Administration retains process ownership. The W35 period and filing are proposed for this synthesis; no institutional filing is claimed without content review and a human promotion decision.'
  },
  DE: {
    ...common,
    eyebrow: 'ARBEITSÜBERSICHT · STAND 30. AUGUST 2026',
    title: 'Wochenrückblick vom 24. bis 30. August 2026',
    intro: 'Rückblick auf die Journale vom 24. bis 30. August. Die Statusangaben beschreiben das Ende dieses Zeitraums, nicht die heutige Situation. Sieben vorhandene Journale garantieren keine vollständige Erfassung aller Tätigkeiten.',
    metadata: [
      ['Kennung', '2SG-ADM-RH-2026-W35-PILOTE · V0.1'],
      ['Vorgeschlagener Zeitraum', '24.–30. August 2026'],
      ['Umfang', 'Institutionelles 2SG-Programm und internes M3S-System'],
      ['Status', 'Vorläufige Arbeitsübersicht']
    ],
    coverageValue: '7 Journale erfasst · 0 Tage ohne Journaldatei',
    results: [
      'Die acht CNS-Rahmen sind als bereits validierte Arbeitsrahmen anerkannt. Einzelne Entscheidungsnachweise wurden veröffentlicht, ohne acht erneute Bestätigungen zu verlangen oder Umsetzung zu behaupten.',
      'Die technischen L1-Grundlagen von REF-01 sind vorbereitet und vom Produktionsstart getrennt. G1-Prüfung und erwartete Nachweise sind strukturiert; keine technische Bedingung wird damit geschlossen.',
      'Aufbewahrung, DMS und geringste Berechtigung verfügen über Dokumentationsmodelle. Die technische Welle trennt PostgreSQL/Wiederherstellung, Migration/Rollback und Outbox/Überwachung/Wiederanlauf ohne reale Operation.',
      'FTK-001 bestätigt die gebündelte Ausnahmebehandlung: 22 Werte geprüft, davon 9 im synthetischen Umfang qualifiziert, 8 teilweise und 5 offen. Die 13 Ausnahmen sind in fünf Gruppen gebündelt.',
      'Eine vorläufige Programmübersicht und der Rahmen für einen künftigen M3S-Eingang wurden veröffentlicht. Zum Periodenende sind fünf leere Autorisierungsakten unter AUT-003 V0.1 vorbereitet; dies sind weder Berechtigungen noch integrierter Tagesbetrieb.',
      'Wiederholte Daily-Sendungen auf Telegram wurden identifiziert. Die Korrektur trennt M3S-Aktualisierung ohne Versand von duplikatgeschützter Tageslieferung; sie belegt nicht den Empfang jeder Nachricht.'
    ],
    indicators: [
      ['Erfasste Journale', '7', 'Eine datierte Datei je Tag vom 24. bis 30. August'],
      ['Tage ohne Datei', '0', 'Dokumentationsabdeckung, keine vollständige Tätigkeitserfassung'],
      ['Geprüfte Werte', '22', '9 synthetisch · 8 teilweise · 5 offen am 30. August'],
      ['Gebündelte Ausnahmen', '13', 'Fünf Dokumentationsgruppen; kein Fortschritt berechnet']
    ],
    watch: [
      'Journale können mehrere Sitzungen und Mitternachtswechsel umfassen. Aus ihrem Umfang werden weder Nettoarbeitszeit noch eindeutige Lieferungszahlen oder Erfüllungsquoten abgeleitet.',
      'Eine synthetische Qualifizierung ist kein Produktionswert. G1 bleibt zum Periodenende offen und L2 geschlossen.',
      'Leere Autorisierungsakten benennen weder Personen noch reale Zugriffe. Vertrauliche Unterlagen und personenbezogene Daten werden hier nicht wiedergegeben.',
      'Ereignisse nach dem 30. August, einschließlich der September-Entscheide zur Konzeption, liegen außerhalb des Zeitraums. Dieser Rückblick ersetzt nicht das aktuelle Cockpit.'
    ],
    nextTitle: 'Nachverfolgung der Periode · mit aktuellem Stand abgleichen',
    next: [
      'Bestätigte CNS- und Dokumentationsentscheide nicht erneut anfordern; nur neue Ausnahmen prüfen.',
      'Die fünf Nachweisgruppen vor jeder Rückfrage mit dem aktuellen Stand abgleichen; aus diesem Rückblick keine Sammlung oder Operation starten.',
      'Tagesgeschäft, Villa LR1 und Datenqualität getrennt bearbeiten; der Eingangsrahmen eröffnet keinen operativen Betrieb.',
      'Die Übersicht prüfen lassen und Zeitraum sowie Ablage erst vor einer institutionellen Hochstufung bestätigen.'
    ],
    gedTitle: 'Vorgeschlagene DMS-Ablage',
    gedStatus: 'Nicht angelegt · nach Genehmigung',
    promotionRule: 'Die Verwaltung behält die Prozessverantwortung. Zeitraum und Ablage W35 sind für diese Übersicht vorgeschlagen; ohne fachliche Prüfung und menschliche Hochstufungsentscheidung wird keine institutionelle Ablage behauptet.'
  }
};
