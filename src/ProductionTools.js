import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const COPY = {
  FR: { title: 'Outils existants', scope: 'Répertoire de fabrication numérique · qualification documentaire au 20-10-26',
    boundary: 'Une fiche d’outil n’est ni une commande ni une nouvelle prestation. Les données personnelles restent dans leur espace privé ; les versions locales ne sont pas annoncées comme hébergées.',
    open: 'Ouvrir', source: 'Source / version', state: 'Disponibilité',
    qualification: 'Qualification et fabrication',
    qualifications: {
      FluxConvert: ['Application serveur de conversion PDF, images et documents, distincte de TFX. Source 0.1.0 : Next.js / React, Prisma avec SQLite, traitements et worker présents. Ni installation ni exécution effectuée dans ce contrôle.', 'À cadrer avant raccordement : environnement serveur isolé, LibreOffice pour Word vers PDF, stockage des fichiers, conservation, maintenance et droits de redistribution. S3, messagerie, OAuth et paiement restent non activés. Les tests présents ne valent pas validation d’exécution.'],
      'Générateurs et comparateurs de devis': ['Mini-Forage : copie HTML de devis mise en page, avec modèle, ressources embarquées et trois paramètres de présentation. Ce fichier ne prouve pas l’existence d’un formulaire de devis ou d’un comparateur éditable.', 'À préparer : retrouver la source éditable et sa version, distinguer modèle et calculateur, qualifier les droits des visuels et du moteur embarqué, puis cadrer une adaptation sans données nominatives. Aucun nouvel ordre de fabrication ni téléchargement nominatif ajouté.']
    },
    rows: [
      ['Budget Perso CH', 'Fichier fourni du 14-10-26', 'Mon compte · usage privé, coffre chiffré sur l’appareil', '/account?view=finances&returnTo=production#personal-finances'],
      ['Outils RH de proximité', 'Kit V0.2 sans audio / cycle V0.1', 'Ressources RH et téléchargements GED autorisés', '/rh?tab=resources#rh-proximity-tools'],
      ['Mon Espace salarié', 'Pilote Koné / Mariam', 'Versions nominatives locales restreintes ; hébergement à raccorder', null],
      ['Convertisseur FX', 'Module Finances / historique TFX', 'Convertisseur M3S existant', '/finance?tab=fx&fxView=converter'],
      ['FluxConvert', 'Archive source 0.1.0 · analyse statique', 'Architecture identifiée ; raccordement serveur à préparer', null],
      ['Générateurs et comparateurs de devis', 'Villa Lac Rose / copie Mini-Forage', 'Modèle de lecture identifié ; source éditable à qualifier', null],
      ['Brief quotidien', 'Page ChatGPT sauvegardée et dépendances', 'Source reçue ; pas une application autonome qualifiée', null],
      ['Daily Intelligence Dashboard', 'Tableau de bord V4', 'Vue M3S existante ; fraîcheur éditoriale à contrôler séparément', '/?view=intelligence']
    ] },
  DE: { title: 'Bestehende Werkzeuge', scope: 'Verzeichnis digitaler Herstellung · dokumentarischer Prüfstand 20.10.26',
    boundary: 'Ein Werkzeug-Steckbrief ist weder Auftrag noch neue Leistung. Persönliche Daten bleiben privat; lokale Versionen werden nicht als gehostete Anwendungen ausgewiesen.',
    open: 'Öffnen', source: 'Quelle / Version', state: 'Verfügbarkeit',
    qualification: 'Qualifikation und Herstellung',
    qualifications: {
      FluxConvert: ['Serveranwendung für PDF-, Bild- und Dokumentkonvertierung, getrennt von TFX. Quelle 0.1.0: Next.js / React, Prisma mit SQLite, Verarbeitung und Worker vorhanden. Bei dieser Prüfung weder installiert noch ausgeführt.', 'Vor der Anbindung zu klären: isolierte Serverumgebung, LibreOffice für Word nach PDF, Dateispeicher, Aufbewahrung, Wartung und Weitergaberechte. S3, E-Mail, OAuth und Zahlung bleiben inaktiv. Vorhandene Tests belegen keine erfolgreiche Ausführung.'],
      'Angebotsgeneratoren und -vergleiche': ['Mini-Forage: gestaltete HTML-Angebotskopie mit Vorlage, eingebetteten Ressourcen und drei Darstellungsparametern. Die Datei belegt weder ein editierbares Angebotsformular noch einen Vergleichsrechner.', 'Nächster Schritt: editierbare Quelle und Version finden, Vorlage und Rechner unterscheiden, Rechte an Bildern und eingebetteter Laufzeit prüfen, danach eine Anpassung ohne Personendaten abgrenzen. Kein neuer Fertigungsauftrag und kein personenbezogener Download.']
    },
    rows: [
      ['Budget Perso CH', 'Datei vom 14.10.26', 'Mein Konto · privat, verschlüsselter Gerätespeicher', '/account?view=finances&returnTo=production#personal-finances'],
      ['HR-Werkzeuge vor Ort', 'Kit V0.2 ohne Audio / Zyklus V0.1', 'HR-Ressourcen und autorisierte DMS-Downloads', '/rh?tab=resources#rh-proximity-tools'],
      ['Mein Mitarbeiterbereich', 'Pilot Koné / Mariam', 'Lokale personenbezogene Versionen geschützt; Hosting noch offen', null],
      ['FX-Rechner', 'Finanzen / TFX-Verlauf', 'Bestehender M3S-Rechner', '/finance?tab=fx&fxView=converter'],
      ['FluxConvert', 'Quellarchiv 0.1.0 · statische Prüfung', 'Architektur identifiziert; Serveranbindung vorzubereiten', null],
      ['Angebotsgeneratoren und -vergleiche', 'Villa Lac Rose / Mini-Forage-Kopie', 'Lesevorlage identifiziert; editierbare Quelle zu prüfen', null],
      ['Tägliches Briefing', 'Gespeicherte ChatGPT-Seite und Abhängigkeiten', 'Quelle erhalten; keine geprüfte eigenständige Anwendung', null],
      ['Daily Intelligence Dashboard', 'Dashboard V4', 'Bestehende M3S-Ansicht; redaktionelle Aktualität separat prüfen', '/?view=intelligence']
    ] },
  EN: { title: 'Existing tools', scope: 'Digital production directory · documentary qualification as at 20/10/26',
    boundary: 'A tool card is neither an order nor a new service. Personal data stays private; local versions are not described as hosted applications.',
    open: 'Open', source: 'Source / version', state: 'Availability',
    qualification: 'Qualification and manufacture',
    qualifications: {
      FluxConvert: ['Server application for PDF, image and document conversion, separate from TFX. Source 0.1.0: Next.js / React, Prisma with SQLite, processing and worker present. Neither installed nor executed during this check.', 'Before connection: scope an isolated server environment, LibreOffice for Word to PDF, file storage, retention, maintenance and redistribution rights. S3, email, OAuth and payment remain inactive. Existing test files do not demonstrate a successful run.'],
      'Quote generators and comparators': ['Mini-Forage: a formatted HTML quote copy with a template, bundled resources and three presentation settings. This file does not establish an editable quotation form or comparator.', 'Next: locate the editable source and version, distinguish template from calculator, qualify visual and embedded runtime rights, then scope an adaptation without personal data. No new manufacturing order or named download added.']
    },
    rows: [
      ['Budget Perso CH', 'File supplied, dated 14/10/26', 'My account · private, encrypted device vault', '/account?view=finances&returnTo=production#personal-finances'],
      ['Proximity HR tools', 'Kit V0.2 without audio / cycle V0.1', 'HR resources and authorised DMS downloads', '/rh?tab=resources#rh-proximity-tools'],
      ['My employee space', 'Koné / Mariam pilot', 'Restricted named local versions; hosting still to connect', null],
      ['FX converter', 'Finance / TFX history', 'Existing M3S converter', '/finance?tab=fx&fxView=converter'],
      ['FluxConvert', 'Source archive 0.1.0 · static analysis', 'Architecture identified; server connection to prepare', null],
      ['Quote generators and comparators', 'Villa Lac Rose / Mini-Forage copy', 'Reading template identified; editable source to qualify', null],
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
        <p className="mt-1 text-sm text-slate-400">{t.source} : {source}</p><p className="mt-1 text-sm text-slate-300">{t.state} : {state}</p>
        {t.qualifications[name] && <details className="mt-3 text-sm leading-6 text-slate-300"><summary className="min-h-11 cursor-pointer text-blue-300">{t.qualification}</summary>
          {t.qualifications[name].map(text => <p key={text} className="mt-2">{text}</p>)}</details>}</div>
      {path && <button type="button" className="m3s-secondary-button inline-flex min-h-11 items-center gap-2 px-3" onClick={() => navigate(path)} aria-label={`${t.open} ${name}`}><ArrowUpRight size={18} aria-hidden="true"/>{t.open}</button>}
    </article>)}</div>
  </section>;
}
