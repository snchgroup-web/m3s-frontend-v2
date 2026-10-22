import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, HelpCircle, ListChecks } from 'lucide-react';
import { useAuth } from './AuthContext';
import ProductionLocalComparator from './ProductionLocalComparator';
import ProductionToolFacts from './ProductionToolFacts';
import { TOOL_FACTS_COPY } from './productionToolFactsData';
import { DAILY_BRIEF_URL, DAILY_PRODUCTION_PATH, LOCAL_COMPARATOR_PATH, PRODUCTION_TOOL_IDS, PRODUCTION_TOOLS_TASK_PATH, TOOL_ENTRY_PATHS, TOOL_SOURCE_REFERENCES } from './productionToolConnections';

const COPY = {
  FR: { title: 'Outils existants', scope: 'Répertoire de fabrication numérique · repères documentaires datés',
    boundary: 'Une fiche d’outil n’est ni une commande ni une nouvelle prestation. Les données personnelles restent dans leur espace privé ; les versions locales ne sont pas annoncées comme hébergées.',
    open: 'Ouvrir', source: 'Source / version', state: 'Disponibilité',
    qualification: 'Qualification et fabrication',
    task: 'Suivre la tâche de raccordement', trace: 'Référence source', connection: 'Raccordement',
    connections: { fluxconvert: 'PR 6 publiée et sauvegarde chiffrée PC/USB vérifiées le 23-10-26 ; code 55f987c récupéré hors ligne, 158 fichiers et 14 commits. Fonctions à Francfort, lien externe et retour par l’onglet M3S conservés. Configuration cloud incomplète, sans reprise SaaS complète.', 'comparator-avants-fenetres': 'Fichier original ou copie neutre exacte choisi sur l’appareil, sans téléversement ; mémoire temporaire dans le lanceur.', 'daily-brief': 'Page partagée existante reliée ; ce lien ne transforme pas la page sauvegardée en application autonome.', 'daily-dashboard': 'Source restaurée ; édition du 19-10-26 publiée le 20-10-26, sans nouvelle veille externe.' },
    fabrication: 'Fabrication et adaptation', fabricationText: 'Même suivi outils du projet Standardisation. Durée et coût non mesurés ; aucune nouvelle commande, réception ou adaptation générique déclarée achevée.',
    qualifications: {
      FluxConvert: ['SaaS 2SG créé par Cheikh, selon sa déclaration ; distinct de TFX. Filiation historique 7e1143b vérifiée le 20-10-26 ; protections et aperçus publiés le 22-10-26. PR 6 publiée au commit 55f987c le 23-10-26. Aucun traitement de document réel ou paiement déclenché pour actualiser cette fiche.', 'Base Prisma Postgres et fonctions FRA1 à Francfort vérifiées ; middleware mondial distinct. PR 6 : code 55f987c, paramètres versionnés et configuration locale sauvegardés chiffrés sur PC/USB le 23-10-26 ; récupération hors ligne de 158 fichiers suivis et 14 commits Git, empreintes vérifiées et quatre anciennes archives préservées. SQL et trois valeurs de base de données restent datés du 20-10-26. Archive 0.1.0 SQLite distincte du dépôt PostgreSQL.', 'Conservation applicative : conversions directes en mémoire sans nouvel archivage serveur ; accès temporaire de page limité à 24 h, pas effacement des copies téléchargées. Nouveaux audits marqués à échéance de 30 jours avec déclencheur quotidien protégé ; premier horaire réel non encore observé. Fichiers durables, S3 et Word vers PDF sur disque toujours bloqués. Reprise SaaS partielle : trois valeurs cloud d’origine et secret du planificateur non récupérés, fichier local non vérifié égal au cloud ; pas de reconstruction des comptes ou services externes.'],
      'Générateurs et comparateurs de devis': ['Comparateur existant retrouvé : avants de fenêtre Villa Lac Rose, outil de devis et aide à la décision, actualisé le 24-07-26. Les copies de partage Ibou et équipe sont identiques par empreinte : une seule version, pas deux outils.', 'Copie neutre V0.1 française préservée ; V0.2 « Comparaison et suivi des offres » pour biens, services et travaux, en FR/DE/EN et clair/sombre/profond, sans données ni médias du chantier. Les deux originaux et les copies exactes V0.1/V0.2 sont reconnus ; raccordement contrôlé sur données fictives. Dans le lanceur, « Enregistrer » reste temporaire : exporter le JSON avant de quitter. Mini-Forage reste distinct.'],
      'Brief quotidien': ['Source reçue : page ChatGPT sauvegardée. Son lien partagé existant est conservé ; ses scripts et fichiers voisins ne sont pas importés dans M3S.', 'Une page accessible ne prouve pas une édition du jour. Le circuit éditorial, les sources, les droits et une éventuelle version autonome restent à qualifier, sans nouvel envoi ni automatisation.'],
      'Daily Intelligence Dashboard': ['Source M3S restaurée le 20-10-26 après sauvegarde et contrôles ciblés. Les trois livrables existants du 19-10-26 ont été publiés à l’identique le 20-10-26 après accord, sans régénération.', 'Le lecteur, les téléchargements et le retour à Production sont conservés. Date de publication et fraîcheur éditoriale restent distinctes : météo, taux et nouvelles externes non réactualisés par cette récupération. Aucun nouvel envoi ni abonnement.']
    },
    rows: [
      ['Budget Perso CH', 'Fichier fourni du 14-10-26', 'Mon compte · usage privé, coffre chiffré sur l’appareil', '/account?view=finances&returnTo=production#personal-finances'],
      ['Outils RH de proximité', 'Kit V0.2 sans audio / cycle V0.1', 'Ressources RH et téléchargements GED autorisés', '/rh?tab=resources#rh-proximity-tools'],
      ['Mon Espace salarié', 'Pilote Koné / Mariam', 'Versions nominatives locales restreintes ; hébergement à raccorder', null],
      ['Convertisseur FX', 'Module Finances / historique TFX', 'Convertisseur M3S existant', '/finance?tab=fx&fxView=converter'],
      ['FluxConvert', 'SaaS 2SG / PR 6 / commit 55f987c / état du 23-10-26', 'Protections et sauvegarde PC/USB vérifiées · reprise SaaS partielle', 'https://fluxconvert-app.vercel.app/fr'],
      ['Générateurs et comparateurs de devis', 'Comparaison et suivi des offres V0.2 FR/DE/EN · originaux et V0.1 conservés · Mini-Forage distinct', 'Ouverture locale contrôlée · clair, sombre et profond', LOCAL_COMPARATOR_PATH],
      ['Brief quotidien', 'Page ChatGPT sauvegardée et lien partagé', 'Page existante ; fraîcheur éditoriale non déduite', DAILY_BRIEF_URL],
      ['Daily Intelligence Dashboard', 'Tableau de bord V4', 'Vue M3S existante ; fraîcheur éditoriale à contrôler séparément', DAILY_PRODUCTION_PATH]
    ] },
  DE: { title: 'Bestehende Werkzeuge', scope: 'Verzeichnis digitaler Herstellung · datierte Nachweise',
    boundary: 'Ein Werkzeug-Steckbrief ist weder Auftrag noch neue Leistung. Persönliche Daten bleiben privat; lokale Versionen werden nicht als gehostete Anwendungen ausgewiesen.',
    open: 'Öffnen', source: 'Quelle / Version', state: 'Verfügbarkeit',
    qualification: 'Qualifikation und Herstellung',
    task: 'Anbindungsaufgabe verfolgen', trace: 'Quellreferenz', connection: 'Anbindung',
    connections: { fluxconvert: 'PR 6 veröffentlicht und verschlüsselte PC-/USB-Sicherung am 23.10.26 geprüft; Code 55f987c offline wiederhergestellt, 158 Dateien und 14 Commits. Funktionen in Frankfurt; externer Link und Rückkehr über den M3S-Tab erhalten. Cloud-Konfiguration unvollständig, keine vollständige SaaS-Wiederherstellung.', 'comparator-avants-fenetres': 'Original oder exakte neutrale Kopie vom Gerät ohne Upload; im Startbereich nur temporärer Speicher.', 'daily-brief': 'Bestehende Freigabeseite verknüpft; gespeicherte Seite dadurch keine eigenständige Anwendung.', 'daily-dashboard': 'Quelle wiederhergestellt; Ausgabe vom 19.10.26 am 20.10.26 veröffentlicht, keine neuen externen Nachrichten.' },
    fabrication: 'Herstellung und Anpassung', fabricationText: 'Dieselbe Werkzeug-Aufgabe im Projekt Standardisierung. Dauer und Kosten nicht gemessen; kein neuer Auftrag, keine Abnahme oder abgeschlossene generische Anpassung behauptet.',
    qualifications: {
      FluxConvert: ['2SG-SaaS von Cheikh nach seiner Erklärung erstellt; getrennt von TFX. Historische Filiation 7e1143b am 20.10.26 geprüft; Schutz und Vorschauen am 22.10.26 veröffentlicht. PR 6 mit Commit 55f987c am 23.10.26 veröffentlicht. Kein echtes Dokument verarbeitet oder Zahlung für diese Aktualisierung ausgelöst.', 'Prisma-Postgres-Datenbank und FRA1-Funktionen in Frankfurt geprüft; weltweite Middleware getrennt. PR 6: Code 55f987c, versionierte Einstellungen und lokale Konfiguration am 23.10.26 verschlüsselt auf PC/USB gesichert; 158 versionierte Dateien und 14 Git-Commits offline wiederhergestellt, Prüfsummen geprüft und vier frühere Archive erhalten. SQL und drei Datenbankwerte bleiben vom 20.10.26. SQLite-Archiv 0.1.0 getrennt vom PostgreSQL-Repository.', 'Anwendungsaufbewahrung: direkte Verarbeitung im Speicher ohne neues Serverarchiv; temporärer Seitenzugriff höchstens 24 Stunden, keine Löschung heruntergeladener Kopien. Neue markierte Audits mit 30-Tage-Frist und geschütztem täglichem Auslöser; echter geplanter Erstlauf noch nicht beobachtet. Dauerhafte Dateien, S3 und Word-zu-PDF auf Datenträger bleiben gesperrt. SaaS-Wiederherstellung teilweise: drei ursprüngliche Cloud-Werte und Scheduler-Secret fehlen, lokale Datei nicht mit Cloud abgeglichen; externe Konten oder Dienste nicht wiederhergestellt.'],
      'Angebotsgeneratoren und -vergleiche': ['Bestehender Vergleich gefunden: Fenstervorbauten Villa Lac Rose, Angebotswerkzeug und Entscheidungshilfe, Stand 24.07.26. Die Freigabekopien für Ibou und das Team sind hashgleich: eine Version, nicht zwei Werkzeuge.', 'Französische neutrale Kopie V0.1 erhalten; V0.2 «Angebote vergleichen und verfolgen» für Waren, Dienstleistungen und Arbeiten, FR/DE/EN, hell/dunkel/tiefdunkel, ohne Baustellendaten oder -medien. Zwei Originale und die exakten Kopien V0.1/V0.2 werden erkannt; Anbindung mit fiktiven Daten geprüft. Im Startbereich ist «Speichern» temporär: vor dem Verlassen JSON exportieren. Mini-Forage bleibt separat.'],
      'Tägliches Briefing': ['Erhaltene Quelle: gespeicherte ChatGPT-Seite. Bestehender Freigabelink erhalten; Skripte und Begleitdateien werden nicht in M3S importiert.', 'Eine erreichbare Seite belegt keine heutige Ausgabe. Redaktion, Quellen, Rechte und eine eigenständige Version sind noch zu klären; kein neuer Versand und keine Automatisierung.'],
      'Daily Intelligence Dashboard': ['M3S-Quelle am 20.10.26 nach Sicherung und gezielten Kontrollen wiederhergestellt. Die drei bestehenden Dateien vom 19.10.26 wurden am 20.10.26 nach Freigabe unverändert veröffentlicht, ohne Neugenerierung.', 'Leser, Downloads und Rückkehr zur Produktion erhalten. Veröffentlichung und redaktionelle Aktualität bleiben getrennt: Wetter, Kurse und externe Nachrichten durch diese Wiederherstellung nicht aktualisiert. Kein neuer Versand oder Abonnement.']
    },
    rows: [
      ['Budget Perso CH', 'Datei vom 14.10.26', 'Mein Konto · privat, verschlüsselter Gerätespeicher', '/account?view=finances&returnTo=production#personal-finances'],
      ['HR-Werkzeuge vor Ort', 'Kit V0.2 ohne Audio / Zyklus V0.1', 'HR-Ressourcen und autorisierte DMS-Downloads', '/rh?tab=resources#rh-proximity-tools'],
      ['Mein Mitarbeiterbereich', 'Pilot Koné / Mariam', 'Lokale personenbezogene Versionen geschützt; Hosting noch offen', null],
      ['FX-Rechner', 'Finanzen / TFX-Verlauf', 'Bestehender M3S-Rechner', '/finance?tab=fx&fxView=converter'],
      ['FluxConvert', '2SG-SaaS / PR 6 / Commit 55f987c / Stand 23.10.26', 'Schutz und PC-/USB-Sicherung geprüft · SaaS-Wiederherstellung teilweise', 'https://fluxconvert-app.vercel.app/fr'],
      ['Angebotsgeneratoren und -vergleiche', 'Angebote vergleichen und verfolgen V0.2 FR/DE/EN · Originale und V0.1 erhalten · Mini-Forage separat', 'Geprüfte lokale Öffnung · hell, dunkel und tiefdunkel', LOCAL_COMPARATOR_PATH],
      ['Tägliches Briefing', 'Gespeicherte ChatGPT-Seite und Freigabelink', 'Bestehende Seite; redaktionelle Aktualität nicht abgeleitet', DAILY_BRIEF_URL],
      ['Daily Intelligence Dashboard', 'Dashboard V4', 'Bestehende M3S-Ansicht; redaktionelle Aktualität separat prüfen', DAILY_PRODUCTION_PATH]
    ] },
  EN: { title: 'Existing tools', scope: 'Digital production directory · dated documentary evidence',
    boundary: 'A tool card is neither an order nor a new service. Personal data stays private; local versions are not described as hosted applications.',
    open: 'Open', source: 'Source / version', state: 'Availability',
    qualification: 'Qualification and manufacture',
    task: 'Follow the connection task', trace: 'Source reference', connection: 'Connection',
    connections: { fluxconvert: 'PR 6 released and encrypted PC/USB backup verified on 23/10/26; code 55f987c recovered offline, 158 files and 14 commits. Functions in Frankfurt; external link and return through the M3S tab retained. Cloud configuration incomplete, not a complete SaaS recovery.', 'comparator-avants-fenetres': 'Original or exact neutral copy selected on the device without upload; temporary launcher memory only.', 'daily-brief': 'Existing shared page linked; the saved page is not thereby a standalone application.', 'daily-dashboard': 'Source recovered; 19/10/26 edition published on 20/10/26, without fresh external news.' },
    fabrication: 'Manufacture and adaptation', fabricationText: 'Same tools task under Standardisation. Duration and cost not measured; no new order, acceptance or completed generic adaptation claimed.',
    qualifications: {
      FluxConvert: ['2SG SaaS created by Cheikh according to his statement; separate from TFX. Historical lineage 7e1143b verified on 20/10/26; protections and previews released on 22/10/26. PR 6 released at commit 55f987c on 23/10/26. No real document conversion or payment triggered to update this card.', 'Prisma Postgres database and FRA1 functions in Frankfurt verified; global middleware separate. PR 6: code 55f987c, versioned settings and local configuration encrypted on PC/USB on 23/10/26; 158 tracked files and 14 Git commits recovered offline, hashes verified and four earlier archives preserved. SQL and three database values remain dated 20/10/26. SQLite archive 0.1.0 separate from the PostgreSQL repository.', 'Application retention: direct in-memory processing without a new server archive; temporary page access at most 24 hours, not erasure of downloaded copies. New marked audits with 30-day expiry and a protected daily trigger; first real scheduled execution not yet observed. Durable files, S3 and disk Word-to-PDF remain blocked. Partial SaaS recovery: three original cloud values and scheduler secret unrecovered, local file not verified equal to cloud; external accounts or services not rebuilt.'],
      'Quote generators and comparators': ['Existing comparator located: Villa Lac Rose window awnings, quotation tool and decision support, updated 24/07/26. Ibou and team sharing copies have the same hash: one version, not two tools.', 'French neutral V0.1 retained; V0.2 “Offer comparison and tracking” covers goods, services and works, FR/DE/EN, light/dark/deep, without project data or media. Two originals and exact V0.1/V0.2 copies recognised; connection checked with synthetic data. Inside the launcher, “Save” is temporary: export JSON before leaving. Mini-Forage remains separate.'],
      'Daily Brief': ['Received source: saved ChatGPT page. Its existing sharing link is retained; scripts and companion files are not imported into M3S.', 'An accessible page does not establish today’s edition. Editorial workflow, sources, rights and any standalone version remain to qualify, without new dispatch or automation.'],
      'Daily Intelligence Dashboard': ['M3S source recovered on 20/10/26 after backup and targeted checks. The three existing 19/10/26 artifacts were published unchanged on 20/10/26 after approval, without regeneration.', 'Reader, downloads and return to Production retained. Publication and editorial freshness remain separate: weather, rates and external news were not refreshed by this recovery. No new dispatch or subscription.']
    },
    rows: [
      ['Budget Perso CH', 'File supplied, dated 14/10/26', 'My account · private, encrypted device vault', '/account?view=finances&returnTo=production#personal-finances'],
      ['Proximity HR tools', 'Kit V0.2 without audio / cycle V0.1', 'HR resources and authorised DMS downloads', '/rh?tab=resources#rh-proximity-tools'],
      ['My employee space', 'Koné / Mariam pilot', 'Restricted named local versions; hosting still to connect', null],
      ['FX converter', 'Finance / TFX history', 'Existing M3S converter', '/finance?tab=fx&fxView=converter'],
      ['FluxConvert', '2SG SaaS / PR 6 / commit 55f987c / as at 23/10/26', 'Protections and PC/USB backup verified · partial SaaS recovery', 'https://fluxconvert-app.vercel.app/fr'],
      ['Quote generators and comparators', 'Offer comparison and tracking V0.2 FR/DE/EN · originals and V0.1 retained · Mini-Forage separate', 'Controlled local opening · light, dark and deep', LOCAL_COMPARATOR_PATH],
      ['Daily Brief', 'Saved ChatGPT page and sharing link', 'Existing page; editorial freshness not inferred', DAILY_BRIEF_URL],
      ['Daily Intelligence Dashboard', 'V4 dashboard', 'Existing M3S view; editorial freshness checked separately', DAILY_PRODUCTION_PATH]
    ] }
};

export default function ProductionTools({ language = 'FR' }) {
  const t = COPY[language] || COPY.FR;
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [helpTool, setHelpTool] = useState(null);
  const helpButtons = useRef({});
  const closeHelp = id => { setHelpTool(null); helpButtons.current[id]?.focus(); };
  const helpCopy = TOOL_FACTS_COPY[language] || TOOL_FACTS_COPY.FR;
  const comparatorOpen = new URLSearchParams(location.search).get('tool') === 'comparator-avants-fenetres';
  return <section id="production-tools" aria-labelledby="production-tools-title" className="mt-6 border-t border-slate-700 pt-5">
    <h4 id="production-tools-title" className="m3s-section-title">{t.title}</h4>
    <p className="mt-2 text-sm" style={{ color: 'var(--m3s-text-secondary)' }}>{t.scope}</p>
    <p className="my-4 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{t.boundary}</p>
    <button type="button" className="m3s-secondary-button inline-flex min-h-11 items-center gap-2 px-3" onClick={() => navigate(PRODUCTION_TOOLS_TASK_PATH)}><ListChecks size={18} aria-hidden="true"/>{t.task}</button>
    <div className="production-tool-list">{t.rows.map(([name, source, state, originalPath], index) => {
      const id = PRODUCTION_TOOL_IDS[index], path = TOOL_ENTRY_PATHS[id] || originalPath;
      return <article id={`production-tool-${id}`} key={id} className="production-tool-row flex flex-wrap items-start justify-between gap-3" onKeyDown={event => {
        if (event.key === 'Escape' && helpTool === id) { event.preventDefault(); closeHelp(id); }
      }}>
      <div className="min-w-0 flex-1 basis-64"><div className="flex items-center gap-3"><h5 className="m3s-panel-title min-w-0 flex-1">{name}</h5>
        <button type="button" ref={node => { helpButtons.current[id] = node; }} title={`${helpCopy.help} : ${name}`} aria-label={`${helpCopy.help} : ${name}`} aria-expanded={helpTool === id} aria-controls={`production-help-${id}`}
          className="m3s-secondary-button inline-flex h-11 w-11 shrink-0 items-center justify-center" onClick={() => setHelpTool(helpTool === id ? null : id)}><HelpCircle size={18} aria-hidden="true"/></button></div>
        <p className="mt-1 text-sm" style={{ color: 'var(--m3s-text-secondary)' }}>{t.source} : {source}</p><p className="mt-1 text-sm" style={{ color: 'var(--m3s-text-secondary)' }}>{t.state} : {state}</p>
        {t.qualifications[name] && <details className="mt-3 text-sm leading-6" style={{ color: 'var(--m3s-text-primary)' }}><summary className="min-h-11 cursor-pointer" style={{ color: 'var(--m3s-status-info)' }}>{t.qualification}</summary>
          {t.qualifications[name].map(text => <p key={text} className="mt-2">{text}</p>)}
          <dl className="mt-4 space-y-3"><div><dt className="font-semibold">{t.trace}</dt><dd className="break-all text-xs">{TOOL_SOURCE_REFERENCES[PRODUCTION_TOOL_IDS[index]]}</dd></div>
            <div><dt className="font-semibold">{t.connection}</dt><dd>{t.connections[PRODUCTION_TOOL_IDS[index]]}</dd></div>
            <div><dt className="font-semibold">{t.fabrication}</dt><dd>{t.fabricationText}</dd></div></dl></details>}</div>
      {path && (path.startsWith('https://')
        ? <a href={path} target="_blank" rel="noreferrer" className="m3s-secondary-button inline-flex min-h-11 items-center gap-2 px-3" aria-label={`${t.open} ${name}`}><ArrowUpRight size={18} aria-hidden="true"/>{t.open}</a>
        : <button type="button" className="m3s-secondary-button inline-flex min-h-11 items-center gap-2 px-3" onClick={() => navigate(path)} aria-label={`${t.open} ${name}`}><ArrowUpRight size={18} aria-hidden="true"/>{t.open}</button>)}
      {helpTool === id && <ProductionToolFacts toolId={id} name={name} language={language} external={path?.startsWith('https://')} onClose={() => closeHelp(id)}/>}
    </article>; })}</div>
    {comparatorOpen && <ProductionLocalComparator key={JSON.stringify([user?.id, user?.tenantId, user?.email])} language={language}
      onReturn={() => navigate('/production?tab=manufacturing#production-tool-comparator-avants-fenetres')}/>}
  </section>;
}
