import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, FolderOpen, RefreshCw, Save } from 'lucide-react';
import { api } from './api';
import { useFinanceBudget } from './FinanceBudgetContext';
import { BUDGET_MAX_REVISION, isBudgetValid } from './financeBudgetModel';
import { readBudgetServerList } from './financeBudgetStorageModel';

const COPY = {
  FR: { title: 'Sauvegarde serveur', checking: 'Vérification du stockage…', disabled: 'Sauvegarde serveur non activée', unavailable: 'Stockage indisponible · Brouillon local conservé',
    available: 'Organisation · Accès limité à votre compte', readonly: 'Serveur en lecture seule', save: 'Enregistrer le brouillon', open: 'Ouvrir les brouillons sauvegardés', refresh: 'Vérifier le stockage',
    busy: 'Opération en cours…', saved: 'Enregistré sur le serveur', changed: 'Modifications non enregistrées sur le serveur', version: 'Version serveur',
    failed: 'Enregistrement refusé · Brouillon local conservé', loadFailed: 'Ouverture impossible · Brouillon local conservé', forbidden: 'Accès serveur retiré ou session expirée',
    conflict: 'Une autre version existe sur le serveur. Votre saisie locale est conservée. Exportez-la ou dupliquez-la avant de charger cette version.',
    uncertain: 'Résultat de l’enregistrement non confirmé. Aucun renvoi automatique. Vérifiez le résultat ou consultez les brouillons avant de créer une nouvelle copie.',
    check: 'Vérifier le résultat de l’enregistrement', reload: 'Charger la version serveur', empty: 'Aucun brouillon sauvegardé dans cette page.',
    previous: 'Page précédente', next: 'Page suivante', close: 'Fermer la liste', terminal: 'Limite de versions serveur atteinte · Dupliquez le brouillon pour poursuivre',
    confirmSave: 'Enregistrer ces prévisions non approuvées sur le serveur de votre organisation, avec accès limité à votre compte ?',
    confirmLoad: 'Remplacer le brouillon local par cette version serveur ? Les modifications locales non exportées seront perdues.',
    offline: 'Export JSON de secours disponible · Aucune sauvegarde automatique' },
  EN: { title: 'Server storage', checking: 'Checking storage…', disabled: 'Server storage not activated', unavailable: 'Storage unavailable · Local draft retained',
    available: 'Organisation · Access limited to your account', readonly: 'Server is read-only', save: 'Save draft', open: 'Open saved drafts', refresh: 'Check storage',
    busy: 'Operation in progress…', saved: 'Saved on server', changed: 'Changes not saved on server', version: 'Server version',
    failed: 'Save rejected · Local draft retained', loadFailed: 'Unable to open · Local draft retained', forbidden: 'Server access removed or session expired',
    conflict: 'Another version exists on the server. Your local edits are retained. Export or duplicate them before loading that version.',
    uncertain: 'Save result unconfirmed. No automatic retry. Check the result or saved drafts before creating a new copy.',
    check: 'Check save result', reload: 'Load server version', empty: 'No saved drafts on this page.',
    previous: 'Previous page', next: 'Next page', close: 'Close list', terminal: 'Server version limit reached · Duplicate the draft to continue',
    confirmSave: 'Save these unapproved forecasts on your organisation server, with access limited to your account?',
    confirmLoad: 'Replace the local draft with this server version? Unexported local edits will be lost.',
    offline: 'Backup JSON export available · No automatic saving' },
  DE: { title: 'Serverspeicherung', checking: 'Speicher wird geprüft…', disabled: 'Serverspeicherung nicht aktiviert', unavailable: 'Speicher nicht verfügbar · Lokaler Entwurf bleibt erhalten',
    available: 'Organisation · Zugriff nur für Ihr Konto', readonly: 'Serverzugriff nur lesend', save: 'Entwurf speichern', open: 'Gespeicherte Entwürfe öffnen', refresh: 'Speicher prüfen',
    busy: 'Vorgang läuft…', saved: 'Auf dem Server gespeichert', changed: 'Änderungen nicht auf dem Server gespeichert', version: 'Serverversion',
    failed: 'Speicherung abgelehnt · Lokaler Entwurf bleibt erhalten', loadFailed: 'Öffnen fehlgeschlagen · Lokaler Entwurf bleibt erhalten', forbidden: 'Serverzugriff entzogen oder Sitzung abgelaufen',
    conflict: 'Eine andere Version liegt auf dem Server. Ihre lokalen Änderungen bleiben erhalten. Vor dem Laden exportieren oder duplizieren.',
    uncertain: 'Speicherergebnis unbestätigt. Keine automatische Wiederholung. Ergebnis oder gespeicherte Entwürfe vor einer neuen Kopie prüfen.',
    check: 'Speicherergebnis prüfen', reload: 'Serverversion laden', empty: 'Keine gespeicherten Entwürfe auf dieser Seite.',
    previous: 'Vorherige Seite', next: 'Nächste Seite', close: 'Liste schließen', terminal: 'Serverversionsgrenze erreicht · Entwurf zum Fortfahren duplizieren',
    confirmSave: 'Diese nicht genehmigten Prognosen auf dem Organisationsserver speichern, mit Zugriff nur für Ihr Konto?',
    confirmLoad: 'Lokalen Entwurf durch diese Serverversion ersetzen? Nicht exportierte lokale Änderungen gehen verloren.',
    offline: 'JSON-Sicherungsexport verfügbar · Keine automatische Speicherung' }
};

export default function FinanceBudgetStorage({ language, ask, onBeforeLoad,
  enabled = process.env.REACT_APP_BUDGET_STORAGE_ENABLED === 'true' }) {
  const session = useFinanceBudget();
  const [capability, setCapability] = useState(null);
  const [state, setState] = useState('checking');
  const [library, setLibrary] = useState(null);
  const [listing, setListing] = useState(false);
  const sequence = useRef(0);
  const t = COPY[language] || COPY.FR;
  const check = async () => {
    const current = ++sequence.current; setState('checking'); setCapability(null); setLibrary(null);
    try {
      const result = await api.getBudgetCapabilities();
      if (current !== sequence.current) return;
      if (result?.success !== true || typeof result.enabled !== 'boolean' || typeof result.canWrite !== 'boolean'
        || result.scope !== 'organization' || result.access !== 'owner-only' || result.personalEnabled !== false) throw new Error('Invalid capabilities');
      setCapability(result); setState(result.enabled ? 'available' : 'disabled');
    } catch { if (current === sequence.current) setState('unavailable'); }
  };
  useEffect(() => {
    if (enabled) check();
    return () => { sequence.current += 1; };
    // The capability is checked on entry or explicit retry, never on each edit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);
  if (!enabled || !session) return null;
  const { draft, busy, issue, remote, attempt, serverDirty, saveToServer, loadFromServer, reconcileServer } = session;
  const terminal = remote?.version >= BUDGET_MAX_REVISION;
  const writeAllowed = capability?.enabled && capability.canWrite && !busy && !attempt
    && !['conflict', 'forbidden'].includes(issue) && !terminal && isBudgetValid(draft) && serverDirty;
  const button = (label, Icon, action, disabled = false) => <button type="button" className="m3s-icon-button" title={label} aria-label={label} onClick={action} disabled={disabled}><Icon size={18} aria-hidden="true" /></button>;
  const load = id => {
    const action = () => { onBeforeLoad(); loadFromServer(api, id); };
    if (draft) ask(t.confirmLoad, action); else action();
  };
  const list = async (offset = 0) => {
    const current = ++sequence.current; setListing(true);
    try {
      const result = readBudgetServerList(await api.listBudgetDrafts(offset));
      if (current === sequence.current) setLibrary({ ...result, offset });
    } catch { if (current === sequence.current) { setLibrary(null); setState('unavailable'); setCapability(null); } }
    finally { if (current === sequence.current) setListing(false); }
  };
  return <section className="m3s-budget-server" aria-label={t.title}>
    <div className="m3s-budget-toolbar">
      <div><h3>{t.title}</h3><p role="status">{busy ? t.busy : t[state]}{capability?.enabled && !capability.canWrite ? ' · ' + t.readonly : ''}</p></div>
      <div className="m3s-budget-actions">
        {button(t.refresh, RefreshCw, check, busy || state === 'checking' || listing)}
        {button(t.open, FolderOpen, () => list(), !capability?.enabled || busy || listing)}
        {button(t.save, Save, () => ask(t.confirmSave, () => { onBeforeLoad(); saveToServer(api); }), !writeAllowed)}
      </div>
    </div>
    {remote && <p className="m3s-budget-meta">{t.version} {remote.version} · {serverDirty ? t.changed : t.saved}</p>}
    {terminal && <p className="m3s-budget-storage">{t.terminal}</p>}
    {issue && <p role="alert" className="m3s-budget-error">{t[issue] || t.unavailable}</p>}
    {(issue === 'conflict' || issue === 'uncertain') && <div className="m3s-budget-actions">
      {attempt?.id && button(t.check, RefreshCw, () => reconcileServer(api), busy || !capability?.enabled)}
      {(remote?.id || attempt?.id) && button(t.reload, FolderOpen, () => load(remote?.id || attempt.id), busy || !capability?.enabled)}
    </div>}
    {library && <div className="m3s-budget-library" aria-busy={listing}>
      <ul>{library.data.map(item => <li key={item.id}><button type="button" onClick={() => load(item.id)} disabled={busy || listing}>
        <FolderOpen size={18} aria-hidden="true" /><span><strong>{item.title}</strong><small>{item.entity} · {item.year} · {t.version} {item.version}</small></span>
      </button></li>)}</ul>
      {!library.data.length && <p>{t.empty}</p>}
      <div className="m3s-budget-actions">
        {button(t.previous, ArrowLeft, () => list(library.offset - 20), busy || listing || library.offset === 0)}
        {button(t.next, ArrowRight, () => list(library.offset + 20), busy || listing || !library.hasMore || library.offset >= 10000)}
        <button type="button" className="m3s-secondary-button" onClick={() => { sequence.current += 1; setLibrary(null); setListing(false); }} disabled={busy}>{t.close}</button>
      </div>
    </div>}
    {capability?.enabled && <p className="m3s-budget-meta">{t.offline}</p>}
  </section>;
}
