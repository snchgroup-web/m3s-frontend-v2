import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const COPY = {
  FR: { title: 'Outils existants', scope: 'Répertoire de fabrication numérique · sources qualifiées au 19-10-26',
    boundary: 'Une fiche d’outil n’est ni une commande ni une nouvelle prestation. Les données personnelles restent dans leur espace privé ; les versions locales ne sont pas annoncées comme hébergées.',
    open: 'Ouvrir', source: 'Source / version', state: 'Disponibilité',
    rows: [
      ['Budget Perso CH', 'Fichier fourni du 14-10-26', 'Mon compte · usage privé, coffre chiffré sur l’appareil', '/account?view=finances&returnTo=production#personal-finances'],
      ['Outils RH de proximité', 'Kit V0.2 sans audio / cycle V0.1', 'Ressources RH et téléchargements GED autorisés', '/rh?tab=resources#rh-proximity-tools'],
      ['Mon Espace salarié', 'Pilote Koné / Mariam', 'Versions nominatives locales restreintes ; hébergement à raccorder', null],
      ['Convertisseur FX', 'Module Finances / historique TFX', 'Convertisseur M3S existant', '/finance?tab=fx&fxView=converter'],
      ['FluxConvert', 'Archive source existante', 'Source retrouvée ; dépendances et exécution à qualifier', null],
      ['Générateurs et comparateurs de devis', 'Villa Lac Rose / Mini-Forage', 'Sources existantes ; versions réutilisables à qualifier', null],
      ['Brief quotidien', 'Page ChatGPT sauvegardée et dépendances', 'Source reçue ; pas une application autonome qualifiée', null],
      ['Daily Intelligence Dashboard', 'Tableau de bord V4', 'Vue M3S existante ; fraîcheur éditoriale à contrôler séparément', '/?view=intelligence']
    ] },
  DE: { title: 'Bestehende Werkzeuge', scope: 'Verzeichnis digitaler Herstellung · Quellenstand 19.10.26',
    boundary: 'Ein Werkzeug-Steckbrief ist weder Auftrag noch neue Leistung. Persönliche Daten bleiben privat; lokale Versionen werden nicht als gehostete Anwendungen ausgewiesen.',
    open: 'Öffnen', source: 'Quelle / Version', state: 'Verfügbarkeit',
    rows: [
      ['Budget Perso CH', 'Datei vom 14.10.26', 'Mein Konto · privat, verschlüsselter Gerätespeicher', '/account?view=finances&returnTo=production#personal-finances'],
      ['HR-Werkzeuge vor Ort', 'Kit V0.2 ohne Audio / Zyklus V0.1', 'HR-Ressourcen und autorisierte DMS-Downloads', '/rh?tab=resources#rh-proximity-tools'],
      ['Mein Mitarbeiterbereich', 'Pilot Koné / Mariam', 'Lokale personenbezogene Versionen geschützt; Hosting noch offen', null],
      ['FX-Rechner', 'Finanzen / TFX-Verlauf', 'Bestehender M3S-Rechner', '/finance?tab=fx&fxView=converter'],
      ['FluxConvert', 'Bestehendes Quellarchiv', 'Quelle gefunden; Abhängigkeiten und Ausführung zu prüfen', null],
      ['Angebotsgeneratoren und -vergleiche', 'Villa Lac Rose / Mini-Forage', 'Bestehende Quellen; wiederverwendbare Versionen zu prüfen', null],
      ['Tägliches Briefing', 'Gespeicherte ChatGPT-Seite und Abhängigkeiten', 'Quelle erhalten; keine geprüfte eigenständige Anwendung', null],
      ['Daily Intelligence Dashboard', 'Dashboard V4', 'Bestehende M3S-Ansicht; redaktionelle Aktualität separat prüfen', '/?view=intelligence']
    ] },
  EN: { title: 'Existing tools', scope: 'Digital production directory · sources qualified as at 19/10/26',
    boundary: 'A tool card is neither an order nor a new service. Personal data stays private; local versions are not described as hosted applications.',
    open: 'Open', source: 'Source / version', state: 'Availability',
    rows: [
      ['Budget Perso CH', 'File supplied, dated 14/10/26', 'My account · private, encrypted device vault', '/account?view=finances&returnTo=production#personal-finances'],
      ['Proximity HR tools', 'Kit V0.2 without audio / cycle V0.1', 'HR resources and authorised DMS downloads', '/rh?tab=resources#rh-proximity-tools'],
      ['My employee space', 'Koné / Mariam pilot', 'Restricted named local versions; hosting still to connect', null],
      ['FX converter', 'Finance / TFX history', 'Existing M3S converter', '/finance?tab=fx&fxView=converter'],
      ['FluxConvert', 'Existing source archive', 'Source found; dependencies and execution to qualify', null],
      ['Quote generators and comparators', 'Villa Lac Rose / Mini-Forage', 'Existing sources; reusable versions to qualify', null],
      ['Daily Brief', 'Saved ChatGPT page and dependencies', 'Source received; not a qualified standalone application', null],
      ['Daily Intelligence Dashboard', 'V4 dashboard', 'Existing M3S view; editorial freshness checked separately', '/?view=intelligence']
    ] }
};

export default function ProductionTools({ language = 'FR' }) {
  const t = COPY[language] || COPY.FR;
  const navigate = useNavigate();
  return <section id="production-tools" aria-labelledby="production-tools-title" className="mt-6 border-t border-slate-700 pt-5">
    <h4 id="production-tools-title" className="text-lg font-semibold text-slate-100">{t.title}</h4>
    <p className="mt-2 text-sm text-slate-400">{t.scope}</p>
    <p className="my-4 text-sm leading-6 text-slate-300">{t.boundary}</p>
    <div className="divide-y divide-slate-700">{t.rows.map(([name, source, state, path]) => <article key={name} className="flex flex-wrap items-start justify-between gap-3 py-4">
      <div className="min-w-0 flex-1 basis-64"><h5 className="font-semibold text-slate-100">{name}</h5>
        <p className="mt-1 text-sm text-slate-400">{t.source} : {source}</p><p className="mt-1 text-sm text-slate-300">{t.state} : {state}</p></div>
      {path && <button type="button" className="m3s-secondary-button inline-flex min-h-11 items-center gap-2 px-3" onClick={() => navigate(path)} aria-label={`${t.open} ${name}`}><ArrowUpRight size={18} aria-hidden="true"/>{t.open}</button>}
    </article>)}</div>
  </section>;
}
