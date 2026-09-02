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
  const cancelButtonRef = useRef(null);
  const errorRef = useRef(null);

  useEffect(() => {
    if (error) errorRef.current?.focus();
    else cancelButtonRef.current?.focus();
    const handleKeyDown = event => {
      if (event.key === 'Escape' && !busy) onCancel();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [busy, onCancel, error]);

  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  const confirmClass = BUTTON_CLASSES[action] || BUTTON_CLASSES.update;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/70 p-4" role="presentation">
      <section
        className="m3s-panel w-full max-w-md p-5 shadow-2xl sm:p-6"
        role="dialog"
        aria-modal="true"
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
