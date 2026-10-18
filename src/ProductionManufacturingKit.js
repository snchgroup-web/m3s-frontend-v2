import React from 'react';
import { useAuth } from './AuthContext';
import InstitutionalGedBundle from './InstitutionalGedBundle';
import offersSpec from './gedOffersSpec.json';
import { formatRegistryDate } from './registryDate';

const KIT_IDS = [offersSpec.files.find(file => file.name === '2SG_KIT_ORGANISATION_DOCUMENTAIRE_V0_2_SANS_AUDIO.html').id];
const COPY = {
  FR: {
    title: 'Premier cas num\u00e9rique : kit Organisation documentaire',
    scope: 'V0.2 sans audio \u00b7 usage interne fictif \u00b7 lecture seule',
    date: 'Version fabriqu\u00e9e le',
    purpose: 'Un fichier HTML autonome, avec notices int\u00e9gr\u00e9es, pour le cas DEMO-DOC-001. La validation interne est acquise ; elle ne vaut pas autorisation de commercialisation.',
    trace: 'Cha\u00eene de fabrication document\u00e9e',
    source: 'Source : copie de lecture DEMO-DOC-001 V0.1, conserv\u00e9e sans modification.',
    assembly: 'Assemblage existant : composants du parcours fictif, notices et d\u00e9pendances r\u00e9pertori\u00e9es ; sortie HTML distincte, sans audio Windows.',
    control: 'Contr\u00f4les d\u00e9j\u00e0 acquis : manifeste, empreinte SHA-256, affichage et t\u00e9l\u00e9chargements. Ils ne sont pas rejou\u00e9s ici ; le t\u00e9l\u00e9chargement GED conserve ses contr\u00f4les techniques.',
    storage: 'Conservation : version exacte dans la GED, GD-005 / GD-006, comme ressource compl\u00e9mentaire.',
    boundary: 'Ce kit V0.2 n\u2019est pas le dossier V0.1 remis \u00e0 l\u2019\u00e9quipe. Les remises et retours restent dans les cycles Prestations existants ; aucun ordre de fabrication ni nouvelle r\u00e9ception n\u2019est cr\u00e9\u00e9 ici.',
    pending: 'Avant une autre fabrication : qualifier le besoin autoris\u00e9, le responsable, les adaptations et les moyens. Aucun d\u00e9lai ou co\u00fbt n\u2019est encore mesur\u00e9 pour ce cas.',
    denied: 'Connecte-toi pour consulter les documents autoris\u00e9s.'
  },
  DE: {
    title: 'Erster digitaler Fall: Kit Dokumentenorganisation',
    scope: 'V0.2 ohne Audio \u00b7 interner fiktiver Gebrauch \u00b7 schreibgesch\u00fctzt',
    date: 'Version hergestellt am',
    purpose: 'Eine eigenst\u00e4ndige HTML-Datei mit integrierten Hinweisen f\u00fcr DEMO-DOC-001. Die interne Freigabe liegt vor; sie erlaubt keine Vermarktung.',
    trace: 'Dokumentierte Herstellungskette',
    source: 'Quelle: Lesekopie DEMO-DOC-001 V0.1, unver\u00e4ndert erhalten.',
    assembly: 'Bestehender Aufbau: Komponenten des fiktiven Ablaufs, Hinweise und verzeichnete Abh\u00e4ngigkeiten; separate HTML-Ausgabe ohne Windows-Audio.',
    control: 'Bereits abgeschlossene Kontrollen: Manifest, SHA-256-Pr\u00fcfsumme, Darstellung und Downloads. Sie werden hier nicht wiederholt; der DMS-Download beh\u00e4lt seine technischen Pr\u00fcfungen.',
    storage: 'Aufbewahrung: exakte Version im DMS, GD-005 / GD-006, als erg\u00e4nzende Ressource.',
    boundary: 'Dieses V0.2-Kit ist nicht das dem Team \u00fcbergebene V0.1-Dossier. \u00dcbergaben und R\u00fcckmeldungen verbleiben in den bestehenden Leistungszyklen; hier entsteht weder ein Fertigungsauftrag noch eine neue Abnahme.',
    pending: 'Vor einer weiteren Herstellung: genehmigten Bedarf, Verantwortung, Anpassungen und Mittel kl\u00e4ren. F\u00fcr diesen Fall wurden noch keine Dauer oder Kosten gemessen.',
    denied: 'Melden Sie sich an, um autorisierte Dokumente einzusehen.'
  },
  EN: {
    title: 'First digital case: Document organisation kit',
    scope: 'V0.2 without audio \u00b7 internal fictional use \u00b7 read only',
    date: 'Version produced on',
    purpose: 'A standalone HTML file with embedded notices for DEMO-DOC-001. Internal approval is established; it does not authorise commercial distribution.',
    trace: 'Documented production chain',
    source: 'Source: DEMO-DOC-001 V0.1 reading copy, preserved unchanged.',
    assembly: 'Existing assembly: fictional workflow components, notices and listed dependencies; separate HTML output without Windows audio.',
    control: 'Previously completed checks: manifest, SHA-256 checksum, rendering and downloads. They are not repeated here; the DMS download retains its technical checks.',
    storage: 'Storage: exact version in the DMS, GD-005 / GD-006, as a supplementary resource.',
    boundary: 'This V0.2 kit is not the V0.1 dossier delivered to the team. Deliveries and feedback remain in the existing service cycles; no manufacturing order or new acceptance is created here.',
    pending: 'Before another production run: qualify the authorised need, owner, adaptations and resources. No duration or cost has yet been measured for this case.',
    denied: 'Sign in to view authorised documents.'
  }
};

export default function ProductionManufacturingKit({ language = 'FR' }) {
  const t = COPY[language] || COPY.FR;
  const auth = useAuth();
  const principal = JSON.stringify([auth.isAuthenticated, auth.user?.id, auth.user?.tenantId]);
  return <section aria-labelledby="manufacturing-kit-title" className="mt-6 space-y-4 border-t border-slate-700 pt-5" data-testid="manufacturing-digital-kit">
    <header>
      <h4 id="manufacturing-kit-title" className="text-base font-semibold text-slate-100">{t.title}</h4>
      <p className="mt-2 text-sm text-blue-300">{t.scope}</p>
      <p className="mt-2 text-sm text-slate-400">{t.date} : <time className="whitespace-nowrap" dateTime="2026-10-17">{formatRegistryDate('2026-10-17', language)}</time></p>
    </header>
    <p className="text-sm leading-6 text-slate-300">{t.purpose}</p>
    <details className="border-y border-slate-700 py-3">
      <summary className="cursor-pointer text-sm font-semibold text-slate-100">{t.trace}</summary>
      <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-6 text-slate-300">
        {[t.source, t.assembly, t.control, t.storage].map(item => <li key={item}>{item}</li>)}
      </ol>
    </details>
    <p className="text-sm leading-6 text-slate-300">{t.boundary}</p>
    <p className="text-sm leading-6 text-slate-400">{t.pending}</p>
    {auth.isAuthenticated ? <InstitutionalGedBundle key={principal} language={language} kind="offers" fileIds={KIT_IDS} />
      : <p role="alert" className="text-sm text-slate-300">{t.denied}</p>}
  </section>;
}
