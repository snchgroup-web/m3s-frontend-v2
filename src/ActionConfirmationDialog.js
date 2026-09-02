import React, { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

const BUTTON_CLASSES = {
  create: 'm3s-success-button',
  update: 'm3s-primary-button',
  delete: 'm3s-danger-button'
};

const ActionConfirmationDialog = ({
  id,
  title,
  body,
  cancelLabel,
  confirmLabel,
  action = 'update',
  busy = false,
  error,
  closeLabel,
  onCancel,
  onConfirm
}) => {
  const dialogRef = useRef(null);
  const cancelButtonRef = useRef(null);
  const errorRef = useRef(null);

  useEffect(() => {
    const opener = document.activeElement;
    const dialog = dialogRef.current;
    const keepFocusInside = event => {
      if (!dialog.contains(event.target)) {
        (dialog.querySelector('button:not(:disabled)') || dialog).focus();
      }
    };
    document.addEventListener('focusin', keepFocusInside);
    return () => {
      document.removeEventListener('focusin', keepFocusInside);
      if (opener?.isConnected) opener.focus();
    };
  }, []);

  useEffect(() => {
    if (busy) dialogRef.current?.focus();
    else if (error) errorRef.current?.focus();
    else cancelButtonRef.current?.focus();
  }, [busy, error]);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        if (!busy) onCancel();
      }
      if (event.key !== 'Tab') return;
      const dialog = dialogRef.current;
      const buttons = Array.from(dialog.querySelectorAll('button:not(:disabled)'));
      const index = buttons.indexOf(document.activeElement);
      if (!buttons.length || index === -1 || (event.shiftKey ? index === 0 : index === buttons.length - 1)) {
        event.preventDefault();
        (buttons[event.shiftKey ? buttons.length - 1 : 0] || dialog).focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [busy, onCancel]);

  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  const confirmClass = BUTTON_CLASSES[action] || BUTTON_CLASSES.update;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/70 p-4" role="presentation">
      <section
        ref={dialogRef}
        tabIndex={-1}
        className="m3s-panel w-full max-w-md p-5 shadow-2xl sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-busy={busy}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <h3 id={titleId} className="m3s-section-title">{title}</h3>
        <p id={descriptionId} className="mt-3 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{body}</p>
        {error && <p ref={errorRef} tabIndex={-1} role="alert" className="mt-3 text-sm leading-6 text-amber-300">{error}</p>}
        <div className="mt-5 flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:justify-end" style={{ borderColor: 'var(--m3s-border)' }}>
          <button ref={cancelButtonRef} type="button" className="m3s-secondary-button min-h-11 px-4" onClick={onCancel} disabled={busy}>{error ? closeLabel || cancelLabel : cancelLabel}</button>
          {!error && <button type="button" className={`${confirmClass} min-h-11 gap-2 px-4`} onClick={onConfirm} disabled={busy}>
            {busy && <Loader2 className="animate-spin" size={17} aria-hidden="true" />}
            {confirmLabel}
          </button>}
        </div>
      </section>
    </div>
  );
};

export default ActionConfirmationDialog;
