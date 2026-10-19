import React, { useEffect, useRef, useState } from 'react';
import { Download, FolderOpen, LockKeyhole } from 'lucide-react';
import { budgetAccountKey, budgetFrameDocument, loadBudgetTemplate, newBudgetVault, openBudgetVault, sealBudgetVault, validateBudgetStorage } from './personalBudgetVault';

const COPY = {
  FR: { title: 'Mes finances personnelles', intro: 'Budget Perso CH · version du 14-10-26',
    privacy: 'Données privées, séparées des finances 2SG. Conservation chiffrée dans ce navigateur uniquement : pas de synchronisation automatique ni de sauvegarde serveur.',
    source: 'Restaurer une copie chiffrée (facultatif)', phrase: 'Phrase privée (12 caractères minimum)', confirm: 'Répéter la phrase',
    warning: 'Conserve cette phrase séparément : M3S ne peut pas la récupérer. Exporte une copie chiffrée pour changer d’appareil ou avant de vider les données du navigateur.',
    open: 'Ouvrir mon budget', unlock: 'Déverrouiller', lock: 'Verrouiller', backup: 'Exporter la copie chiffrée',
    busy: 'Ouverture…', saved: 'Enregistré chiffré sur cet appareil', saving: 'Enregistrement…',
    error: 'Ouverture ou enregistrement impossible. Vérifie le fichier, la phrase et la disponibilité du stockage du navigateur. La copie existante n’a pas été remplacée.',
    saveError: 'Enregistrement impossible : garde cet écran ouvert et utilise l’export de l’application pour conserver tes dernières saisies.',
    frame: 'Budget personnel isolé', unsupported: 'Le chiffrement sécurisé est indisponible dans ce navigateur.', account: 'Le compte courant doit être identifié.' },
  DE: { title: 'Meine persönlichen Finanzen', intro: 'Budget Perso CH · Version vom 14.10.26',
    privacy: 'Private Daten, getrennt von den 2SG-Finanzen. Verschlüsselte Speicherung nur in diesem Browser: keine automatische Synchronisierung oder Serversicherung.',
    source: 'Verschlüsselte Kopie wiederherstellen (optional)', phrase: 'Private Passphrase (mindestens 12 Zeichen)', confirm: 'Passphrase wiederholen',
    warning: 'Bewahre diese Passphrase separat auf: M3S kann sie nicht wiederherstellen. Exportiere eine verschlüsselte Kopie vor einem Gerätewechsel oder dem Löschen der Browserdaten.',
    open: 'Mein Budget öffnen', unlock: 'Entsperren', lock: 'Sperren', backup: 'Verschlüsselte Kopie exportieren', busy: 'Wird geöffnet…', saved: 'Auf diesem Gerät verschlüsselt gespeichert', saving: 'Wird gespeichert…',
    error: 'Öffnen oder Speichern nicht möglich. Datei, Passphrase und Browserspeicher prüfen. Die vorhandene Kopie wurde nicht ersetzt.',
    saveError: 'Speichern fehlgeschlagen: lasse diese Ansicht offen und exportiere die letzten Eingaben aus der Anwendung.',
    frame: 'Isoliertes persönliches Budget', unsupported: 'Sichere Verschlüsselung ist in diesem Browser nicht verfügbar.', account: 'Das aktuelle Konto muss identifiziert sein.' },
  EN: { title: 'My personal finances', intro: 'Budget Perso CH · version dated 14/10/26',
    privacy: 'Private data, separate from 2SG finances. Encrypted storage in this browser only: no automatic synchronisation or server backup.',
    source: 'Restore an encrypted copy (optional)', phrase: 'Private passphrase (at least 12 characters)', confirm: 'Repeat passphrase',
    warning: 'Keep this passphrase separately: M3S cannot recover it. Export an encrypted copy before changing devices or clearing browser data.',
    open: 'Open my budget', unlock: 'Unlock', lock: 'Lock', backup: 'Export encrypted copy', busy: 'Opening…', saved: 'Saved encrypted on this device', saving: 'Saving…',
    error: 'Unable to open or save. Check the file, passphrase and browser storage availability. The existing copy was not replaced.',
    saveError: 'Saving failed: keep this screen open and use the application export to retain your latest entries.',
    frame: 'Isolated personal budget', unsupported: 'Secure encryption is unavailable in this browser.', account: 'The current account must be identified.' }
};

export default function PersonalBudget({ principal, language = 'FR' }) {
  const t = COPY[language] || COPY.FR;
  const [accountKey, setAccountKey] = useState(null);
  const [existing, setExisting] = useState(false);
  const [file, setFile] = useState(null);
  const [phrase, setPhrase] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState('initialising');
  const [error, setError] = useState('');
  const [frameDoc, setFrameDoc] = useState(null);
  const frame = useRef(null), vault = useRef(null), active = useRef(true), sequence = useRef(0), lockRequested = useRef(false);
  const nonce = useRef(null);
  const request = useRef(null);
  const identity = JSON.stringify([principal?.id, principal?.tenantId, principal?.email]);
  useEffect(() => {
    active.current = true;
    budgetAccountKey(principal).then(key => {
      if (!active.current) return;
      const present = Boolean(localStorage.getItem(key));
      setAccountKey(key); setExisting(present); setStatus('locked');
    }).catch(() => { if (active.current) { setError(window.crypto?.subtle ? t.account : t.unsupported); setStatus('blocked'); } });
    return () => { active.current = false; sequence.current += 1; request.current?.abort(); vault.current = null; };
    // The parent keys this component by the authenticated principal, not by language.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity]);

  useEffect(() => {
    const receive = async event => {
      if (event.source !== frame.current?.contentWindow || event.origin !== 'null' || event.data?.type !== 'm3s-budget-storage' || event.data.nonce !== nonce.current || !vault.current) return;
      const current = ++sequence.current;
      setStatus('saving');
      try {
        const storage = validateBudgetStorage(event.data.storage);
        const encrypted = await sealBudgetVault(vault.current, storage);
        if (!active.current || current !== sequence.current) return;
        localStorage.setItem(accountKey, encrypted);
        vault.current.storage = storage;
        setError(''); setStatus('ready');
        if (lockRequested.current) {
          lockRequested.current = false; vault.current = null; setFrameDoc(null); setStatus('locked');
        }
      } catch (_) {
        if (active.current && current === sequence.current) { lockRequested.current = false; setError(t.saveError); setStatus('failed'); }
      }
    };
    window.addEventListener('message', receive);
    return () => window.removeEventListener('message', receive);
  }, [accountKey, t]);

  useEffect(() => {
    const leave = event => { if (status === 'saving' || status === 'failed') { event.preventDefault(); event.returnValue = ''; } };
    window.addEventListener('beforeunload', leave);
    return () => window.removeEventListener('beforeunload', leave);
  }, [status]);

  const open = async event => {
    event.preventDefault(); setError(''); setStatus('opening');
    const current = ++sequence.current;
    try {
      const stored = localStorage.getItem(accountKey);
      if (Boolean(stored) !== existing) throw new Error('STORAGE_CHANGED');
      if (file && file.size > 6 * 1024 * 1024) throw new Error('FILE_TOO_LARGE');
      request.current = new AbortController();
      const text = existing ? stored : file ? await file.text() : await loadBudgetTemplate({ signal: request.current.signal });
      const next = existing || !text.trimStart().startsWith('<')
        ? await openBudgetVault(text, phrase) : await newBudgetVault(text, phrase);
      const encrypted = await sealBudgetVault(next, next.storage);
      const token = window.crypto.randomUUID();
      const document = budgetFrameDocument(next.html, next.storage, token);
      if (!active.current || current !== sequence.current) return;
      if (localStorage.getItem(accountKey) !== stored) throw new Error('STORAGE_CHANGED');
      localStorage.setItem(accountKey, encrypted);
      nonce.current = token; vault.current = next;
      setPhrase(''); setConfirm(''); setFile(null); setExisting(true); setFrameDoc(document); setStatus('ready');
    } catch (_) { if (active.current && current === sequence.current) { setError(t.error); setStatus('locked'); } }
  };
  const backup = () => {
    try {
      const encrypted = localStorage.getItem(accountKey);
      if (!encrypted) throw new Error('NO_COPY');
      const url = URL.createObjectURL(new Blob([encrypted], { type: 'application/json' }));
      const link = document.createElement('a'); link.href = url; link.download = 'M3S-budget-prive-chiffre.json'; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (_) { setError(t.error); }
  };
  const canOpen = accountKey && phrase.length >= 12 && (existing || confirm === phrase) && status === 'locked';
  return <section id="personal-finances" className="personal-budget" aria-labelledby="personal-budget-title">
    <h3 id="personal-budget-title">{t.title}</h3>
    <p>{t.intro}</p><p>{t.privacy}</p>
    {error && <p role="alert">{error}</p>}
    {!frameDoc ? <form onSubmit={open} className="personal-budget-form">
      {!existing && <label>{t.source}<input type="file" accept=".json,application/json" onChange={event => setFile(event.target.files?.[0] || null)} disabled={status !== 'locked'}/></label>}
      <label>{t.phrase}<input type="password" autoComplete="off" minLength={12} value={phrase} onChange={event => setPhrase(event.target.value)} disabled={status !== 'locked'}/></label>
      {!existing && <label>{t.confirm}<input type="password" autoComplete="off" minLength={12} value={confirm} onChange={event => setConfirm(event.target.value)} disabled={status !== 'locked'}/></label>}
      <p>{t.warning}</p>
      <button type="submit" className="m3s-primary-button" disabled={!canOpen}><FolderOpen size={18} aria-hidden="true"/>{status === 'opening' ? t.busy : existing ? t.unlock : t.open}</button>
    </form> : <>
      <div className="personal-budget-actions">
        <span role="status">{status === 'saving' ? t.saving : status === 'ready' ? t.saved : ''}</span>
        <button type="button" className="m3s-secondary-button" disabled={status !== 'ready'} onClick={backup}><Download size={18} aria-hidden="true"/>{t.backup}</button>
        <button type="button" className="m3s-secondary-button" disabled={status !== 'ready'} onClick={() => {
          lockRequested.current = true; setStatus('saving'); frame.current?.contentWindow.postMessage({ type: 'm3s-budget-flush', nonce: nonce.current }, '*');
        }}><LockKeyhole size={18} aria-hidden="true"/>{t.lock}</button>
      </div>
      <iframe ref={frame} title={t.frame} srcDoc={frameDoc} sandbox="allow-scripts allow-downloads allow-modals" referrerPolicy="no-referrer" className="personal-budget-frame"/>
    </>}
  </section>;
}
