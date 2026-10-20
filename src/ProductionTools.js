import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, ListChecks } from 'lucide-react';
import { useAuth } from './AuthContext';
import ProductionLocalComparator from './ProductionLocalComparator';
import { DAILY_BRIEF_URL, DAILY_PRODUCTION_PATH, LOCAL_COMPARATOR_PATH, PRODUCTION_TOOL_IDS, PRODUCTION_TOOLS_TASK_PATH, TOOL_SOURCE_REFERENCES } from './productionToolConnections';

const COPY = {
  FR: { title: 'Outils existants', scope: 'Répertoire de fabrication numérique · qualification documentaire au 20-10-26',
    boundary: 'Une fiche d’outil n’est ni une commande ni une nouvelle prestation. Les données personnelles restent dans leur espace privé ; les versions locales ne sont pas annoncées comme hébergées.',
    open: 'Ouvrir', source: 'Source / version', state: 'Disponibilité',
    qualification: 'Qualification et fabrication',
    task: 'Suivre la tâche de raccordement', trace: 'Référence source', connection: 'Raccordement',
    connections: { fluxconvert: 'Entrée du SaaS existant reliée ; version hébergée et archive à rapprocher.', 'comparator-avants-fenetres': 'Lanceur local vérifié ; fichier original choisi sur l’appareil, jamais téléversé.', 'daily-brief': 'Page partagée existante reliée ; ce lien ne transforme pas la page sauvegardée en application autonome.', 'daily-dashboard': 'Lecture de la dernière édition via M3S ; fraîcheur et publication restent des états distincts.' },
    fabrication: 'Fabrication et adaptation', fabricationText: 'Même suivi outils du projet Standardisation. Durée et coût non mesurés ; aucune nouvelle commande, réception ou adaptation générique déclarée achevée.',
    qualifications: {
      FluxConvert: ['SaaS externe existant de conversion PDF, images et documents, distinct de TFX. Adresse retrouvée dans le raccourci du bureau ; accueil consulté le 20-10-26. Aucun compte, document, paiement ou traitement utilisé pour ce contrôle.', 'Archive locale 0.1.0 identifiée séparément : Next.js / React, Prisma / SQLite, traitements et worker. Sa correspondance avec la version hébergée, le stockage, la conservation, la maintenance et les droits restent à qualifier. Aucune réinstallation ni nouvelle activation ; la présence des tests ne prouve pas leur réussite.'],
      'Générateurs et comparateurs de devis': ['Comparateur existant retrouvé : avants de fenêtre Villa Lac Rose, outil de devis et aide à la décision, actualisé le 24-07-26. Les copies de partage Ibou et équipe sont identiques par empreinte : une seule version, pas deux outils.', 'Mini-Forage reste une source distincte de devis mis en page. Le lanceur conserve le moteur d’origine dans une copie locale isolée ; la version générique, les droits et la maintenance restent à qualifier. Aucun fichier nominatif publié.'],
      'Brief quotidien': ['Source reçue : page ChatGPT sauvegardée. Son lien partagé existant est conservé ; ses scripts et fichiers voisins ne sont pas importés dans M3S.', 'Une page accessible ne prouve pas une édition du jour. Le circuit éditorial, les sources, les droits et une éventuelle version autonome restent à qualifier, sans nouvel envoi ni automatisation.'],
      'Daily Intelligence Dashboard': ['Outil V4 existant et dernière édition accessible par la source M3S autorisée. Le contexte éditorial local inspecté porte encore le 19-10-26 ; il ne prouve ni publication ni veille externe du 20 octobre.', 'Le lecteur existant et ses téléchargements sont réutilisés avec retour à Production. Le refus antérieur de publication HTTP 500 reste un point distinct ; aucun nouvel envoi, publication éditoriale ou abonnement activé dans ce lot.']
    },
    rows: [
      ['Budget Perso CH', 'Fichier fourni du 14-10-26', 'Mon compte · usage privé, coffre chiffré sur l’appareil', '/account?view=finances&returnTo=production#personal-finances'],
      ['Outils RH de proximité', 'Kit V0.2 sans audio / cycle V0.1', 'Ressources RH et téléchargements GED autorisés', '/rh?tab=resources#rh-proximity-tools'],
      ['Mon Espace salarié', 'Pilote Koné / Mariam', 'Versions nominatives locales restreintes ; hébergement à raccorder', null],
      ['Convertisseur FX', 'Module Finances / historique TFX', 'Convertisseur M3S existant', '/finance?tab=fx&fxView=converter'],
      ['FluxConvert', 'SaaS externe existant / archive source 0.1.0', 'Accueil accessible ; version hébergée à rapprocher de l’archive', 'https://fluxconvert-app.vercel.app/fr'],
      ['Générateurs et comparateurs de devis', 'Comparateur Avants de fenêtre / Mini-Forage distinct', 'Ouverture locale contrôlée ; version générique à qualifier', LOCAL_COMPARATOR_PATH],
      ['Brief quotidien', 'Page ChatGPT sauvegardée et lien partagé', 'Page existante ; fraîcheur éditoriale non déduite', DAILY_BRIEF_URL],
      ['Daily Intelligence Dashboard', 'Tableau de bord V4', 'Vue M3S existante ; fraîcheur éditoriale à contrôler séparément', DAILY_PRODUCTION_PATH]
    ] },
  DE: { title: 'Bestehende Werkzeuge', scope: 'Verzeichnis digitaler Herstellung · dokumentarischer Prüfstand 20.10.26',
    boundary: 'Ein Werkzeug-Steckbrief ist weder Auftrag noch neue Leistung. Persönliche Daten bleiben privat; lokale Versionen werden nicht als gehostete Anwendungen ausgewiesen.',
    open: 'Öffnen', source: 'Quelle / Version', state: 'Verfügbarkeit',
    qualification: 'Qualifikation und Herstellung',
    task: 'Anbindungsaufgabe verfolgen', trace: 'Quellreferenz', connection: 'Anbindung',
    connections: { fluxconvert: 'Bestehender SaaS-Einstieg verknüpft; gehostete Version und Archiv abzugleichen.', 'comparator-avants-fenetres': 'Geprüfter lokaler Start; Originaldatei vom Gerät, niemals hochgeladen.', 'daily-brief': 'Bestehende Freigabeseite verknüpft; gespeicherte Seite dadurch keine eigenständige Anwendung.', 'daily-dashboard': 'Letzte Ausgabe über M3S lesen; Aktualität und Veröffentlichung bleiben getrennte Zustände.' },
    fabrication: 'Herstellung und Anpassung', fabricationText: 'Dieselbe Werkzeug-Aufgabe im Projekt Standardisierung. Dauer und Kosten nicht gemessen; kein neuer Auftrag, keine Abnahme oder abgeschlossene generische Anpassung behauptet.',
    qualifications: {
      FluxConvert: ['Bestehender externer SaaS für PDF-, Bild- und Dokumentkonvertierung, getrennt von TFX. Adresse aus der Desktop-Verknüpfung; Startseite am 20.10.26 gelesen. Kein Konto, Dokument, Zahlung oder Verarbeitung genutzt.', 'Lokales Quellarchiv 0.1.0 separat identifiziert: Next.js / React, Prisma / SQLite, Verarbeitung und Worker. Übereinstimmung mit der gehosteten Version, Speicherung, Aufbewahrung, Wartung und Rechte noch zu prüfen. Keine Neuinstallation oder Aktivierung; vorhandene Tests belegen keinen erfolgreichen Lauf.'],
      'Angebotsgeneratoren und -vergleiche': ['Bestehender Vergleich gefunden: Fenstervorbauten Villa Lac Rose, Angebotswerkzeug und Entscheidungshilfe, Stand 24.07.26. Die Freigabekopien für Ibou und das Team sind hashgleich: eine Version, nicht zwei Werkzeuge.', 'Mini-Forage bleibt eine separate Angebotsvorlage. Der Start behält die ursprüngliche Verarbeitung in einer isolierten lokalen Kopie bei; generische Version, Rechte und Wartung bleiben zu klären. Keine personenbezogene Datei veröffentlicht.'],
      'Tägliches Briefing': ['Erhaltene Quelle: gespeicherte ChatGPT-Seite. Bestehender Freigabelink erhalten; Skripte und Begleitdateien werden nicht in M3S importiert.', 'Eine erreichbare Seite belegt keine heutige Ausgabe. Redaktion, Quellen, Rechte und eine eigenständige Version sind noch zu klären; kein neuer Versand und keine Automatisierung.'],
      'Daily Intelligence Dashboard': ['Bestehendes V4-Werkzeug und letzte Ausgabe über die autorisierte M3S-Quelle. Der geprüfte lokale redaktionelle Kontext trägt noch den 19.10.26; kein Nachweis einer Veröffentlichung oder aktueller Nachrichten vom 20. Oktober.', 'Bestehender Leser und Downloads mit Rückkehr zur Produktion wiederverwendet. Früherer Veröffentlichungsfehler HTTP 500 separat; kein neuer Versand, keine redaktionelle Veröffentlichung oder Abonnementaktivierung.']
    },
    rows: [
      ['Budget Perso CH', 'Datei vom 14.10.26', 'Mein Konto · privat, verschlüsselter Gerätespeicher', '/account?view=finances&returnTo=production#personal-finances'],
      ['HR-Werkzeuge vor Ort', 'Kit V0.2 ohne Audio / Zyklus V0.1', 'HR-Ressourcen und autorisierte DMS-Downloads', '/rh?tab=resources#rh-proximity-tools'],
      ['Mein Mitarbeiterbereich', 'Pilot Koné / Mariam', 'Lokale personenbezogene Versionen geschützt; Hosting noch offen', null],
      ['FX-Rechner', 'Finanzen / TFX-Verlauf', 'Bestehender M3S-Rechner', '/finance?tab=fx&fxView=converter'],
      ['FluxConvert', 'Bestehender externer SaaS / Quellarchiv 0.1.0', 'Startseite erreichbar; gehostete Version mit Archiv abzugleichen', 'https://fluxconvert-app.vercel.app/fr'],
      ['Angebotsgeneratoren und -vergleiche', 'Vergleich Fenstervorbauten / Mini-Forage separat', 'Geprüfte lokale Öffnung; generische Version zu klären', LOCAL_COMPARATOR_PATH],
      ['Tägliches Briefing', 'Gespeicherte ChatGPT-Seite und Freigabelink', 'Bestehende Seite; redaktionelle Aktualität nicht abgeleitet', DAILY_BRIEF_URL],
      ['Daily Intelligence Dashboard', 'Dashboard V4', 'Bestehende M3S-Ansicht; redaktionelle Aktualität separat prüfen', DAILY_PRODUCTION_PATH]
    ] },
  EN: { title: 'Existing tools', scope: 'Digital production directory · documentary qualification as at 20/10/26',
    boundary: 'A tool card is neither an order nor a new service. Personal data stays private; local versions are not described as hosted applications.',
    open: 'Open', source: 'Source / version', state: 'Availability',
    qualification: 'Qualification and manufacture',
    task: 'Follow the connection task', trace: 'Source reference', connection: 'Connection',
    connections: { fluxconvert: 'Existing SaaS entry linked; hosted version and archive to reconcile.', 'comparator-avants-fenetres': 'Verified local launcher; original file selected from the device, never uploaded.', 'daily-brief': 'Existing shared page linked; the saved page is not thereby a standalone application.', 'daily-dashboard': 'Read the latest edition through M3S; freshness and publication remain separate states.' },
    fabrication: 'Manufacture and adaptation', fabricationText: 'Same tools task under Standardisation. Duration and cost not measured; no new order, acceptance or completed generic adaptation claimed.',
    qualifications: {
      FluxConvert: ['Existing external SaaS for PDF, image and document conversion, separate from TFX. Address recovered from the desktop shortcut; homepage read on 20/10/26. No account, document, payment or conversion used.', 'Local source archive 0.1.0 identified separately: Next.js / React, Prisma / SQLite, processing and worker. Its match to the hosted version, storage, retention, maintenance and rights still need qualification. No reinstallation or activation; existing test files do not prove a successful run.'],
      'Quote generators and comparators': ['Existing comparator located: Villa Lac Rose window awnings, quotation tool and decision support, updated 24/07/26. Ibou and team sharing copies have the same hash: one version, not two tools.', 'Mini-Forage remains a separate quote layout. The launcher retains the original engine in an isolated local copy; generic version, rights and maintenance remain to qualify. No named file published.'],
      'Daily Brief': ['Received source: saved ChatGPT page. Its existing sharing link is retained; scripts and companion files are not imported into M3S.', 'An accessible page does not establish today’s edition. Editorial workflow, sources, rights and any standalone version remain to qualify, without new dispatch or automation.'],
      'Daily Intelligence Dashboard': ['Existing V4 tool and latest edition through the authorised M3S source. The inspected local editorial context is still dated 19/10/26; it does not prove publication or fresh external news on 20 October.', 'Existing reader and downloads reused with a return to Production. Earlier publication refusal HTTP 500 remains separate; no new dispatch, editorial publication or subscription activated in this batch.']
    },
    rows: [
      ['Budget Perso CH', 'File supplied, dated 14/10/26', 'My account · private, encrypted device vault', '/account?view=finances&returnTo=production#personal-finances'],
      ['Proximity HR tools', 'Kit V0.2 without audio / cycle V0.1', 'HR resources and authorised DMS downloads', '/rh?tab=resources#rh-proximity-tools'],
      ['My employee space', 'Koné / Mariam pilot', 'Restricted named local versions; hosting still to connect', null],
      ['FX converter', 'Finance / TFX history', 'Existing M3S converter', '/finance?tab=fx&fxView=converter'],
      ['FluxConvert', 'Existing external SaaS / source archive 0.1.0', 'Homepage accessible; hosted version to reconcile with archive', 'https://fluxconvert-app.vercel.app/fr'],
      ['Quote generators and comparators', 'Window awnings comparator / Mini-Forage separate', 'Verified local opening; generic version to qualify', LOCAL_COMPARATOR_PATH],
      ['Daily Brief', 'Saved ChatGPT page and sharing link', 'Existing page; editorial freshness not inferred', DAILY_BRIEF_URL],
      ['Daily Intelligence Dashboard', 'V4 dashboard', 'Existing M3S view; editorial freshness checked separately', DAILY_PRODUCTION_PATH]
    ] }
};

export default function ProductionTools({ language = 'FR' }) {
  const t = COPY[language] || COPY.FR;
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const comparatorOpen = new URLSearchParams(location.search).get('tool') === 'comparator-avants-fenetres';
  return <section id="production-tools" aria-labelledby="production-tools-title" className="mt-6 border-t border-slate-700 pt-5">
    <h4 id="production-tools-title" className="m3s-section-title">{t.title}</h4>
    <p className="mt-2 text-sm" style={{ color: 'var(--m3s-text-secondary)' }}>{t.scope}</p>
    <p className="my-4 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{t.boundary}</p>
    <button type="button" className="m3s-secondary-button inline-flex min-h-11 items-center gap-2 px-3" onClick={() => navigate(PRODUCTION_TOOLS_TASK_PATH)}><ListChecks size={18} aria-hidden="true"/>{t.task}</button>
    <div className="divide-y divide-slate-700">{t.rows.map(([name, source, state, path], index) => <article id={`production-tool-${PRODUCTION_TOOL_IDS[index]}`} key={PRODUCTION_TOOL_IDS[index]} className="flex flex-wrap items-start justify-between gap-3 py-4">
      <div className="min-w-0 flex-1 basis-64"><h5 className="m3s-panel-title">{name}</h5>
        <p className="mt-1 text-sm" style={{ color: 'var(--m3s-text-secondary)' }}>{t.source} : {source}</p><p className="mt-1 text-sm" style={{ color: 'var(--m3s-text-secondary)' }}>{t.state} : {state}</p>
        {t.qualifications[name] && <details className="mt-3 text-sm leading-6" style={{ color: 'var(--m3s-text-primary)' }}><summary className="min-h-11 cursor-pointer" style={{ color: 'var(--m3s-status-info)' }}>{t.qualification}</summary>
          {t.qualifications[name].map(text => <p key={text} className="mt-2">{text}</p>)}
          <dl className="mt-4 space-y-3"><div><dt className="font-semibold">{t.trace}</dt><dd className="break-all text-xs">{TOOL_SOURCE_REFERENCES[PRODUCTION_TOOL_IDS[index]]}</dd></div>
            <div><dt className="font-semibold">{t.connection}</dt><dd>{t.connections[PRODUCTION_TOOL_IDS[index]]}</dd></div>
            <div><dt className="font-semibold">{t.fabrication}</dt><dd>{t.fabricationText}</dd></div></dl></details>}</div>
      {path && (path.startsWith('https://')
        ? <a href={path} target="_blank" rel="noreferrer" className="m3s-secondary-button inline-flex min-h-11 items-center gap-2 px-3" aria-label={`${t.open} ${name}`}><ArrowUpRight size={18} aria-hidden="true"/>{t.open}</a>
        : <button type="button" className="m3s-secondary-button inline-flex min-h-11 items-center gap-2 px-3" onClick={() => navigate(path)} aria-label={`${t.open} ${name}`}><ArrowUpRight size={18} aria-hidden="true"/>{t.open}</button>)}
    </article>)}</div>
    {comparatorOpen && <ProductionLocalComparator key={JSON.stringify([user?.id, user?.tenantId, user?.email])} language={language}/>}
  </section>;
}
