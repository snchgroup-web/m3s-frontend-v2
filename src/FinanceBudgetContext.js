import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAuth } from './AuthContext';
import { BUDGET_MAX_REVISION, isBudgetValid } from './financeBudgetModel';
import { isBudgetServerId, isBudgetServerRecord, readBudgetServerRecord } from './financeBudgetStorageModel';

const BudgetContext = createContext(null);

export const FinanceBudgetSession = ({ children }) => {
  const [draft, setRawDraft] = useState(null);
  const [exported, setExported] = useState(null);
  const [exportedAt, setExportedAt] = useState(null);
  const [remote, setRemote] = useState(null);
  const [attempt, setAttempt] = useState(null);
  const [issue, setIssue] = useState('');
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const alive = useRef(true);
  useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);
  const setDraft = value => { if (!lock.current) setRawDraft(value); };
  const detachRemote = () => {
    if (lock.current) return;
    setRemote(null); setAttempt(null); setIssue('');
  };
  const run = async action => {
    if (lock.current) return;
    lock.current = true; setBusy(true);
    try { await action(); }
    finally { lock.current = false; if (alive.current) setBusy(false); }
  };
  const saveToServer = client => run(async () => {
    if (!isBudgetValid(draft) || attempt || issue === 'conflict' || issue === 'forbidden'
      || remote?.version >= BUDGET_MAX_REVISION) return;
    const snapshot = JSON.stringify(draft), budget = JSON.parse(snapshot);
    const pending = { id: remote?.id, expectedVersion: remote?.version || 0, snapshot };
    setAttempt(pending); setIssue('');
    try {
      const payload = remote ? await client.updateBudgetDraft(remote.id, budget, remote.version) : await client.createBudgetDraft(budget);
      if (!alive.current) return;
      if (payload?.success !== true || !isBudgetServerRecord(payload.data)
        || payload.data.version !== pending.expectedVersion + 1 || (remote && payload.data.id !== remote.id)) {
        throw new Error('Invalid write acknowledgement');
      }
      setRemote({ id: payload.data.id, version: payload.data.version, snapshot }); setAttempt(null); setIssue('');
    } catch (error) {
      if (!alive.current) return;
      if ([401, 403].includes(error.status)) { setAttempt(null); setIssue('forbidden'); }
      else if ([400, 404, 413, 415].includes(error.status) || error.code === 'BUDGET_STORAGE_DISABLED') { setAttempt(null); setIssue('failed'); }
      else if (error.status === 409 && remote) { setAttempt(null); setIssue('conflict'); }
      else {
        setAttempt({ ...pending, id: pending.id || (isBudgetServerId(error.draftId) ? error.draftId : undefined) });
        setIssue('uncertain');
      }
    }
  });
  const loadFromServer = (client, id) => run(async () => {
    if (!isBudgetServerId(id)) return;
    try {
      const loaded = readBudgetServerRecord(await client.getBudgetDraft(id));
      if (!alive.current) return;
      if (loaded.remote.id !== id) throw new Error('Unexpected draft');
      setRawDraft(loaded.budget); setRemote(loaded.remote); setExported(null); setExportedAt(null);
      setAttempt(null); setIssue('');
    } catch (error) {
      if (alive.current) setIssue([401, 403].includes(error.status) ? 'forbidden' : attempt ? 'uncertain' : 'loadFailed');
    }
  });
  const reconcileServer = client => run(async () => {
    if (!attempt?.id) return;
    try {
      const loaded = readBudgetServerRecord(await client.getBudgetDraft(attempt.id));
      if (!alive.current) return;
      if (loaded.remote.id === attempt.id && loaded.remote.version === attempt.expectedVersion + 1
        && loaded.remote.snapshot === attempt.snapshot) {
        setRemote(loaded.remote); setAttempt(null); setIssue('');
      } else setIssue('uncertain');
    } catch { if (alive.current) setIssue('uncertain'); }
  });
  const dirty = draft !== null && JSON.stringify(draft) !== exported;
  const serverDirty = draft !== null && JSON.stringify(draft) !== remote?.snapshot;
  const unprotected = (dirty && serverDirty) || busy || Boolean(attempt);
  useEffect(() => {
    if (!unprotected) return undefined;
    const warn = event => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [unprotected]);
  return <BudgetContext.Provider value={{ draft, setDraft, exported, setExported, exportedAt, setExportedAt, dirty,
    remote, attempt, issue, busy, serverDirty, detachRemote, saveToServer, loadFromServer, reconcileServer }}>{children}</BudgetContext.Provider>;
};

export const useFinanceBudget = () => useContext(BudgetContext);

export default function FinanceBudgetProvider({ children }) {
  const { token, isAuthenticated } = useAuth();
  // Changing or ending the authenticated session discards its in-memory draft before another user renders.
  return <FinanceBudgetSession key={isAuthenticated ? token : 'signed-out'}>{children}</FinanceBudgetSession>;
}
