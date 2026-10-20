import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const COPY = {
  FR: { title: 'Outils existants', scope: 'Répertoire de fabrication numérique · qualification documentaire au 20-10-26',
    boundary: 'Une fiche d’outil n’est ni une commande ni une nouvelle prestation. Les données personnelles restent dans leur espace privé ; les versions locales ne sont pas annoncées comme hébergées.',
    open: 'Ouvrir', source: 'Source / version', state: 'Disponibilité',
    qualification: 'Qualification et fabrication',
    qualifications: {
      FluxConvert: ['SaaS externe existant de conversion PDF, images et documents, distinct de TFX. Adresse retrouvée dans le raccourci du bureau ; accueil consulté le 20-10-26. Aucun compte, document, paiement ou traitement utilisé pour ce contrôle.', 'Archive locale 0.1.0 identifiée séparément : Next.js / React, Prisma / SQLite, traitements et worker. Sa correspondance avec la version hébergée, le stockage, la conservation, la maintenance et les droits restent à qualifier. Aucune réinstallation ni nouvelle activation ; la présence des tests ne prouve pas leur réussite.'],
      'Générateurs et comparateurs de devis': ['Comparateur existant retrouvé : avants de fenêtre Villa Lac Rose, outil de devis et aide à la décision, actualisé le 24-07-26. Les copies de partage Ibou et équipe sont identiques par empreinte : une seule version, pas deux outils.', 'Mini-Forage reste une source distincte de devis mis en page, avec trois paramètres de présentation ; il ne remplace pas ce comparateur. Suite : qualifier la version réutilisable, les données à retirer, les droits et la maintenance sans refaire les essais acquis. Aucun nouvel ordre de fabrication ni fichier nominatif publié.']
    },
    rows: [
      ['Budget Perso CH', 'Fichier fourni du 14-10-26', 'Mon compte · usage privé, coffre chiffré sur l’appareil', '/account?view=finances&returnTo=production#personal-finances'],
      ['Outils RH de proximité', 'Kit V0.2 sans audio / cycle V0.1', 'Ressources RH et téléchargements GED autorisés', '/rh?tab=resources#rh-proximity-tools'],
      ['Mon Espace salarié', 'Pilote Koné / Mariam', 'Versions nominatives locales restreintes ; hébergement à raccorder', null],
      ['Convertisseur FX', 'Module Finances / historique TFX', 'Convertisseur M3S existant', '/finance?tab=fx&fxView=converter'],
      ['FluxConvert', 'SaaS externe existant / archive source 0.1.0', 'Accueil accessible ; version hébergée à rapprocher de l’archive', 'https://fluxconvert-app.vercel.app/fr'],
      ['Générateurs et comparateurs de devis', 'Comparateur Avants de fenêtre / Mini-Forage distinct', 'Comparateur local retrouvé ; version générique à qualifier', null],
      ['Brief quotidien', 'Page ChatGPT sauvegardée et dépendances', 'Source reçue ; pas une application autonome qualifiée', null],
      ['Daily Intelligence Dashboard', 'Tableau de bord V4', 'Vue M3S existante ; fraîcheur éditoriale à contrôler séparément', '/?view=intelligence']
    ] },
  DE: { title: 'Bestehende Werkzeuge', scope: 'Verzeichnis digitaler Herstellung · dokumentarischer Prüfstand 20.10.26',
    boundary: 'Ein Werkzeug-Steckbrief ist weder Auftrag noch neue Leistung. Persönliche Daten bleiben privat; lokale Versionen werden nicht als gehostete Anwendungen ausgewiesen.',
    open: 'Öffnen', source: 'Quelle / Version', state: 'Verfügbarkeit',
    qualification: 'Qualifikation und Herstellung',
    qualifications: {
      FluxConvert: ['Bestehender externer SaaS für PDF-, Bild- und Dokumentkonvertierung, getrennt von TFX. Adresse aus der Desktop-Verknüpfung; Startseite am 20.10.26 gelesen. Kein Konto, Dokument, Zahlung oder Verarbeitung genutzt.', 'Lokales Quellarchiv 0.1.0 separat identifiziert: Next.js / React, Prisma / SQLite, Verarbeitung und Worker. Übereinstimmung mit der gehosteten Version, Speicherung, Aufbewahrung, Wartung und Rechte noch zu prüfen. Keine Neuinstallation oder Aktivierung; vorhandene Tests belegen keinen erfolgreichen Lauf.'],
      'Angebotsgeneratoren und -vergleiche': ['Bestehender Vergleich gefunden: Fenstervorbauten Villa Lac Rose, Angebotswerkzeug und Entscheidungshilfe, Stand 24.07.26. Die Freigabekopien für Ibou und das Team sind hashgleich: eine Version, nicht zwei Werkzeuge.', 'Mini-Forage bleibt eine separate gestaltete Angebotsquelle mit drei Darstellungsparametern und ersetzt diesen Vergleich nicht. Nächster Schritt: wiederverwendbare Version, zu entfernende Daten, Rechte und Wartung qualifizieren, ohne bestätigte Tests zu wiederholen. Kein neuer Fertigungsauftrag oder veröffentlichtes Personendokument.']
    },
    rows: [
      ['Budget Perso CH', 'Datei vom 14.10.26', 'Mein Konto · privat, verschlüsselter Gerätespeicher', '/account?view=finances&returnTo=production#personal-finances'],
      ['HR-Werkzeuge vor Ort', 'Kit V0.2 ohne Audio / Zyklus V0.1', 'HR-Ressourcen und autorisierte DMS-Downloads', '/rh?tab=resources#rh-proximity-tools'],
      ['Mein Mitarbeiterbereich', 'Pilot Koné / Mariam', 'Lokale personenbezogene Versionen geschützt; Hosting noch offen', null],
      ['FX-Rechner', 'Finanzen / TFX-Verlauf', 'Bestehender M3S-Rechner', '/finance?tab=fx&fxView=converter'],
      ['FluxConvert', 'Bestehender externer SaaS / Quellarchiv 0.1.0', 'Startseite erreichbar; gehostete Version mit Archiv abzugleichen', 'https://fluxconvert-app.vercel.app/fr'],
      ['Angebotsgeneratoren und -vergleiche', 'Vergleich Fenstervorbauten / Mini-Forage separat', 'Lokaler Vergleich gefunden; generische Version zu prüfen', null],
      ['Tägliches Briefing', 'Gespeicherte ChatGPT-Seite und Abhängigkeiten', 'Quelle erhalten; keine geprüfte eigenständige Anwendung', null],
      ['Daily Intelligence Dashboard', 'Dashboard V4', 'Bestehende M3S-Ansicht; redaktionelle Aktualität separat prüfen', '/?view=intelligence']
    ] },
  EN: { title: 'Existing tools', scope: 'Digital production directory · documentary qualification as at 20/10/26',
    boundary: 'A tool card is neither an order nor a new service. Personal data stays private; local versions are not described as hosted applications.',
    open: 'Open', source: 'Source / version', state: 'Availability',
    qualification: 'Qualification and manufacture',
    qualifications: {
      FluxConvert: ['Existing external SaaS for PDF, image and document conversion, separate from TFX. Address recovered from the desktop shortcut; homepage read on 20/10/26. No account, document, payment or conversion used.', 'Local source archive 0.1.0 identified separately: Next.js / React, Prisma / SQLite, processing and worker. Its match to the hosted version, storage, retention, maintenance and rights still need qualification. No reinstallation or activation; existing test files do not prove a successful run.'],
      'Quote generators and comparators': ['Existing comparator located: Villa Lac Rose window awnings, quotation tool and decision support, updated 24/07/26. Ibou and team sharing copies have the same hash: one version, not two tools.', 'Mini-Forage remains a separate formatted quotation source with three presentation settings; it does not replace this comparator. Next: qualify the reusable version, data to remove, rights and maintenance without repeating accepted trials. No new manufacturing order or named file published.']
    },
    rows: [
      ['Budget Perso CH', 'File supplied, dated 14/10/26', 'My account · private, encrypted device vault', '/account?view=finances&returnTo=production#personal-finances'],
      ['Proximity HR tools', 'Kit V0.2 without audio / cycle V0.1', 'HR resources and authorised DMS downloads', '/rh?tab=resources#rh-proximity-tools'],
      ['My employee space', 'Koné / Mariam pilot', 'Restricted named local versions; hosting still to connect', null],
      ['FX converter', 'Finance / TFX history', 'Existing M3S converter', '/finance?tab=fx&fxView=converter'],
      ['FluxConvert', 'Existing external SaaS / source archive 0.1.0', 'Homepage accessible; hosted version to reconcile with archive', 'https://fluxconvert-app.vercel.app/fr'],
      ['Quote generators and comparators', 'Window awnings comparator / Mini-Forage separate', 'Local comparator located; generic version to qualify', null],
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
      {path && (path.startsWith('https://')
        ? <a href={path} target="_blank" rel="noreferrer" className="m3s-secondary-button inline-flex min-h-11 items-center gap-2 px-3" aria-label={`${t.open} ${name}`}><ArrowUpRight size={18} aria-hidden="true"/>{t.open}</a>
        : <button type="button" className="m3s-secondary-button inline-flex min-h-11 items-center gap-2 px-3" onClick={() => navigate(path)} aria-label={`${t.open} ${name}`}><ArrowUpRight size={18} aria-hidden="true"/>{t.open}</button>)}
    </article>)}</div>
  </section>;
}
