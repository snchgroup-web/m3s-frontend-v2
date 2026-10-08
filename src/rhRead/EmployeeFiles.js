import React from 'react';
import { RefreshCw, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useRhEmployeesRead } from './useEmployeeFiles';
import ContractDocuments from './ContractDocuments';
const h = React.createElement;
const labels = {
  FR: { title: 'Dossiers employés', inactive: 'Lecture RH non activée', loading: 'Chargement des dossiers…',
    unavailable: 'Lecture des dossiers indisponible', denied: 'Accès RH non autorisé', auth: 'Connexion requise',
    empty: 'Aucun dossier sur cette page', count: n => `${n} dossier(s) chargé(s)`, total: 'Total global non disponible',
    refresh: 'Actualiser', previous: 'Page précédente', next: 'Page suivante', lines: 'Lignes par page',
    name: 'Nom', start: 'Début de relation', status: 'Statut du dossier', draft: 'Brouillon', details: 'Détails',
    open: name => `Consulter le dossier de ${name}`, close: name => `Refermer le dossier de ${name}`,
    position: 'Référence de mission', site: 'Référence de site', reference: 'Référence du dossier',
    revision: 'Révision', missing: 'Non renseigné', classification: 'Classification' },
  EN: { title: 'Employee files', inactive: 'HR reading not enabled', loading: 'Loading files…',
    unavailable: 'Files unavailable', denied: 'HR access not authorized', auth: 'Sign-in required',
    empty: 'No files on this page', count: n => `${n} file(s) loaded`, total: 'Global total unavailable',
    refresh: 'Refresh', previous: 'Previous page', next: 'Next page', lines: 'Rows per page',
    name: 'Name', start: 'Relationship start', status: 'File status', draft: 'Draft', details: 'Details',
    open: name => `View file for ${name}`, close: name => `Close file for ${name}`,
    position: 'Assignment reference', site: 'Site reference', reference: 'File reference',
    revision: 'Revision', missing: 'Not provided', classification: 'Classification' },
  DE: { title: 'Personalakten', inactive: 'Personalakten nicht freigeschaltet', loading: 'Akten werden geladen…',
    unavailable: 'Personalakten nicht verfügbar', denied: 'Kein berechtigter Zugriff auf Personalakten', auth: 'Anmeldung erforderlich',
    empty: 'Keine Akten auf dieser Seite', count: n => `${n} Akte(n) geladen`, total: 'Gesamtzahl nicht verfügbar',
    refresh: 'Aktualisieren', previous: 'Vorherige Seite', next: 'Nächste Seite', lines: 'Zeilen pro Seite',
    name: 'Name', start: 'Beginn der Zusammenarbeit', status: 'Aktenstatus', draft: 'Entwurf', details: 'Details',
    open: name => `Akte für ${name} öffnen`, close: name => `Akte für ${name} schließen`,
    position: 'Aufgabenreferenz', site: 'Standortreferenz', reference: 'Aktenreferenz',
    revision: 'Revision', missing: 'Nicht angegeben', classification: 'Klassifizierung' }
};
const locales = { FR: 'fr-CH', EN: 'en-GB', DE: 'de-CH' };
const buttonClass = 'm3s-secondary-button inline-flex h-10 w-10 shrink-0 items-center justify-center rounded border disabled:opacity-40';

// Mount only with the host's qualified transport and scope lifecycle marker.
function RhEmployeesRead({ enabled = false, active = false, scopeKey = null, transport, language = 'FR' } = {}) {
  const lang = labels[language] ? language : 'FR', t = labels[lang];
  const [pagination, setPagination] = React.useState({ scopeKey, transport, limit: 25, offset: 0 });
  const [expanded, setExpanded] = React.useState(null);
  const sameContext = pagination.scopeKey === scopeKey && pagination.transport === transport;
  const limit = sameContext ? pagination.limit : 25, offset = sameContext ? pagination.offset : 0;
  const { snapshot, refresh } = useRhEmployeesRead({ enabled, active, scopeKey, transport, limit, offset });
  React.useEffect(() => { setExpanded(null); }, [enabled, active, scopeKey, transport, limit, offset]);
  if (!active) return null;
  const available = snapshot.status === 'available', busy = snapshot.status === 'loading';
  const message = snapshot.error === 'RH_NOT_ENABLED' ? t.inactive : snapshot.error === 'RH_ACCESS_DENIED' ? t.denied : snapshot.error === 'RH_AUTH_REQUIRED' ? t.auth :
    snapshot.status === 'error' ? t.unavailable : busy ? t.loading : t.inactive;
  const changePage = (nextOffset, nextLimit = limit) => {
    setExpanded(null);
    setPagination({ scopeKey, transport, limit: nextLimit, offset: nextOffset });
  };
  const iconButton = (Icon, label, onClick, disabled) => h('button', {
    type: 'button', className: buttonClass, title: label, 'aria-label': label, onClick, disabled
  }, h(Icon, { size: 18, 'aria-hidden': true }));
  const date = value => value === null ? t.missing : new Intl.DateTimeFormat(locales[lang], {
    timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(new Date(`${value}T12:00:00Z`));
  const header = h('header', { className: 'flex flex-wrap items-center justify-between gap-3' },
    h('h2', { className: 'm3s-panel-title' }, t.title),
    iconButton(RefreshCw, t.refresh, () => { setExpanded(null); void refresh(); }, busy || snapshot.status === 'idle'));
  if (!available) return h('section', { className: 'm3s-design-scope space-y-4', 'aria-busy': busy },
    header, h('p', { role: snapshot.status === 'error' ? 'alert' : busy ? 'status' : undefined }, message));
  const rows = snapshot.items.flatMap(row => {
    const isOpen = expanded?.scopeKey === scopeKey && expanded?.transport === transport && expanded?.id === row.employeeId;
    const detailId = `rh-file-${row.employeeId}`;
    return [h('tr', { key: row.employeeId, className: 'border-t' },
      h('th', { scope: 'row', className: 'px-4 py-3 text-left font-medium break-words' }, row.displayName),
      h('td', { className: 'px-4 py-3' }, date(row.employmentStartDate)),
      h('td', { className: 'px-4 py-3' }, t.draft),
      h('td', { className: 'px-4 py-3' }, h('button', { type: 'button', className: buttonClass,
        'aria-label': isOpen ? t.close(row.displayName) : t.open(row.displayName),
        title: isOpen ? t.close(row.displayName) : t.open(row.displayName),
        'aria-expanded': isOpen, 'aria-controls': isOpen ? detailId : undefined,
        onClick: () => setExpanded(isOpen ? null : { scopeKey, transport, id: row.employeeId })
      }, h(isOpen ? ChevronUp : ChevronDown, { size: 18, 'aria-hidden': true })))),
      ...(isOpen ? [h('tr', { key: `${row.employeeId}-details` }, h('td', { colSpan: 4, className: 'px-4 py-3' },
        h('dl', { id: detailId, className: 'grid grid-cols-1 gap-3 sm:grid-cols-2' },
          ...[[t.reference, row.employeeId], [t.position, row.positionRef ?? t.missing],
            [t.site, row.siteRef ?? t.missing], [t.revision, row.revision], [t.classification, row.classification]]
            .map(([label, value]) => h('div', { key: label, className: 'min-w-0' },
              h('dt', { className: 'text-sm font-medium' }, label),
              h('dd', { className: 'text-sm break-all' }, String(value))))),
        h(ContractDocuments, { employeeId: row.employeeId, revision: row.revision, transport, language: lang })))] : [])];
  });
  return h('section', { className: 'm3s-design-scope space-y-4' }, header,
    h('div', { className: 'flex flex-wrap items-center justify-between gap-3' },
      h('p', { role: 'status', className: 'text-sm' }, `${t.count(snapshot.loadedCount)} · ${t.total}`),
      h('label', { className: 'flex items-center gap-2 text-sm' }, t.lines,
        h('select', { value: limit, onChange: event => changePage(0, Number(event.target.value)) },
          ...[10, 25, 50, 100].map(value => h('option', { key: value, value }, String(value)))))),
    snapshot.loadedCount === 0 ? h('p', null, t.empty) : h('div', { className: 'overflow-x-auto' },
      h('table', { className: 'w-full text-sm' },
        h('thead', null, h('tr', null, ...[t.name, t.start, t.status, t.details].map(label =>
          h('th', { key: label, scope: 'col', className: 'px-4 py-2 text-left' }, label)))), h('tbody', null, ...rows))),
    h('nav', { className: 'flex items-center justify-end gap-2', 'aria-label': t.title },
      iconButton(ChevronLeft, t.previous, () => changePage(Math.max(0, offset - limit)), offset === 0),
      iconButton(ChevronRight, t.next, () => changePage(offset + limit), snapshot.loadedCount < limit || offset + limit > 100000)));
}

export { RhEmployeesRead };
