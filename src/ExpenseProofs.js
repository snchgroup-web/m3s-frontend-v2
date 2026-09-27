import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Paperclip, Download, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import api from './api';

const labels = {
  FR: { title: 'Justificatifs', close: 'Fermer', download: 'Télécharger', loading: 'Chargement…', empty: 'Aucune pièce accessible rattachée à cette dépense.', error: 'Les justificatifs ne sont pas disponibles pour cette session.', failed: 'Téléchargement non confirmé.', invoice: 'Facture', payment_receipt: 'Reçu de paiement', transfer_receipt: 'Reçu de transfert', credit_note: 'Avoir', other: 'Autre' },
  EN: { title: 'Supporting documents', close: 'Close', download: 'Download', loading: 'Loading…', empty: 'No accessible documents linked to this expense.', error: 'Supporting documents are unavailable for this session.', failed: 'Download not confirmed.', invoice: 'Invoice', payment_receipt: 'Payment receipt', transfer_receipt: 'Transfer receipt', credit_note: 'Credit note', other: 'Other' },
  DE: { title: 'Belege', close: 'Schliessen', download: 'Herunterladen', loading: 'Wird geladen…', empty: 'Keine zugänglichen Belege mit dieser Ausgabe verknüpft.', error: 'Belege sind für diese Sitzung nicht verfügbar.', failed: 'Download nicht bestätigt.', invoice: 'Rechnung', payment_receipt: 'Zahlungsbeleg', transfer_receipt: 'Überweisungsbeleg', credit_note: 'Gutschrift', other: 'Sonstige' }
};

export default function ExpenseProofs({ expense }) {
  const { language } = useLanguage();
  const t = labels[language] || labels.FR;
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({ loading: true, rows: [] });
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const dialog = useRef(null);
  const trigger = useRef(null);
  const downloadController = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const controller = new AbortController();
    const returnFocus = trigger.current;
    setState({ loading: true, rows: [] }); setNotice('');
    dialog.current?.focus();
    api.getExpenseProofs(expense.id, { signal: controller.signal }).then(rows => {
      if (!controller.signal.aborted) setState({ rows });
    }).catch(() => { if (!controller.signal.aborted) setState({ rows: [], error: true }); });
    return () => { controller.abort(); downloadController.current?.abort(); returnFocus?.focus(); };
  }, [open, expense.id]);
  const close = () => { setOpen(false); setBusy(false); };
  async function download(row) {
    if (busy) return;
    const controller = new AbortController(); downloadController.current = controller;
    setBusy(true); setNotice('');
    try {
      const blob = await api.downloadPrivateGedDocument(row, { signal: controller.signal, expenseId: expense.id });
      if (controller.signal.aborted) return;
      const url = URL.createObjectURL(blob), link = document.createElement('a');
      link.href = url; link.download = row.name; document.body.appendChild(link);
      try { link.click(); } finally { link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
    } catch { if (!controller.signal.aborted) setNotice(t.failed); }
    finally { if (!controller.signal.aborted) setBusy(false); }
  }
  function keyboard(event) {
    if (event.key === 'Escape') { event.stopPropagation(); close(); }
    if (event.key === 'Tab') {
      const buttons = Array.from(dialog.current.querySelectorAll('button:not(:disabled)'));
      const first = buttons[0], last = buttons.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  }
  return <>
    <button ref={trigger} type="button" className="m3s-icon-button hover:bg-slate-600" title={t.title} aria-label={`${t.title} : ${expense.ref}`} onClick={event => { event.stopPropagation(); setOpen(true); }}><Paperclip size={18} className="text-blue-400"/></button>
    {open && createPortal(<div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={event => { event.stopPropagation(); if (event.target === event.currentTarget) close(); }}>
      <section ref={dialog} tabIndex={-1} role="dialog" aria-modal="true" aria-label={`${t.title} : ${expense.ref}`} onKeyDown={keyboard} className="m3s-panel p-5 w-full max-w-xl max-h-[85vh] overflow-y-auto" style={{ color: 'var(--m3s-text-primary)' }}>
        <div className="flex items-start justify-between gap-3"><h2 className="text-lg font-semibold">{t.title}</h2><button type="button" className="m3s-icon-button shrink-0" title={t.close} aria-label={t.close} onClick={close}><X size={20}/></button></div>
        <p className="text-sm mb-4 break-words">{expense.ref} · {expense.description}</p>
        {state.loading ? <p role="status">{t.loading}</p> : state.error ? <p role="alert">{t.error}</p> : !state.rows.length ? <p>{t.empty}</p> : <ul className="divide-y divide-slate-300 dark:divide-slate-600">{state.rows.map(row => <li key={row.id} className="py-3 flex items-start gap-3"><div className="min-w-0 flex-1"><p className="font-medium break-words">{t[row.documentRole] || t.other}{row.externalReference ? ` · ${row.externalReference}` : ''}</p><p className="text-sm break-words">{row.name}</p></div><button type="button" disabled={busy} title={t.download} aria-label={`${t.download} : ${row.name}`} className="m3s-icon-button shrink-0" onClick={() => download(row)}><Download size={18}/></button></li>)}</ul>}
        {notice && <p role="alert" className="mt-3">{notice}</p>}
      </section>
    </div>, document.body)}
  </>;
}
