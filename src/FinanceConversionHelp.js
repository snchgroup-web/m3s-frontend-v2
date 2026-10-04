import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { HelpCircle, X } from 'lucide-react';
import { getGlossaryContextEntry } from './glossaryContext';

const COPY = {
  FR: {
    help: 'Aide', close: 'Fermer', reference: 'Référence de conversion', rate: 'Taux CHF → CFA',
    expected: 'Valeur attendue', instruction: 'Un texte identifiant la preuve : organisme, numéro de reçu ou de relevé, date, devises et calcul de conversion. Les frais sont séparés.',
    example: 'Exemple fictif : relevé bancaire TEST-001 du 02.09.2026 ; 5 USD = 4,15 CHF, plus 0,05 CHF de frais ; débit total 4,20 CHF.',
    pair: 'Une preuve USD → CHF ne renseigne pas automatiquement un taux CHF → CFA.',
    missing: '« Non renseigné » signifie que le taux appliqué n’est pas documenté. Une référence indicative datée peut être affichée séparément ; sans cours sourcé utilisable à cette date, elle reste indisponible.',
    transfer: 'Pour Ria ou Western Union, le taux propre au transfert vient du reçu. Le montant reçu au Sénégal ne doit pas être confondu avec la contre-valeur du total payé, frais compris.',
    referenceRule: 'Taux et historique / Convertisseur FX fournissent une référence sourcée à la date de l’opération lorsqu’elle est disponible. Le résultat est indicatif, hors totaux comptables, et ne remplit jamais automatiquement les contre-valeurs documentées.',
    proposed: 'Définition proposée', glossary: 'Glossaire Finances', placeholder: 'Organisme · référence du reçu/relevé · date · devises et frais'
  },
  EN: {
    help: 'Help', close: 'Close', reference: 'Conversion reference', rate: 'CHF → CFA rate',
    expected: 'Expected value', instruction: 'Text identifying the evidence: provider, receipt or statement number, date, currencies and conversion calculation. Fees are separate.',
    example: 'Synthetic example: bank statement TEST-001 dated 02.09.2026; 5 USD = 4.15 CHF, plus 0.05 CHF fees; total debit 4.20 CHF.',
    pair: 'USD → CHF evidence does not automatically provide a CHF → CFA rate.',
    missing: '“Not recorded” means the applied rate is not documented. A dated indicative reference may be shown separately; without a usable sourced rate for that date, it remains unavailable.',
    transfer: 'For Ria or Western Union, the transfer-specific rate comes from the receipt. The amount received in Senegal is not the equivalent of the total paid including fees.',
    referenceRule: 'Rates and history / FX Converter provide a sourced reference for the transaction date when available. The result is indicative, excluded from recorded totals, and never automatically fills documented equivalents.',
    proposed: 'Proposed definition', glossary: 'Finance Glossary', placeholder: 'Provider · receipt/statement reference · date · currencies and fees'
  },
  DE: {
    help: 'Hilfe', close: 'Schließen', reference: 'Umrechnungsreferenz', rate: 'Kurs CHF → CFA',
    expected: 'Erwarteter Wert', instruction: 'Text zur Identifikation des Nachweises: Dienstleister, Beleg- oder Auszugsnummer, Datum, Währungen und Umrechnungsrechnung. Gebühren werden getrennt ausgewiesen.',
    example: 'Fiktives Beispiel: Kontoauszug TEST-001 vom 02.09.2026; 5 USD = 4,15 CHF, zuzüglich 0,05 CHF Gebühren; Gesamtbelastung 4,20 CHF.',
    pair: 'Ein USD → CHF-Nachweis liefert nicht automatisch einen CHF → CFA-Kurs.',
    missing: '„Nicht erfasst“ bedeutet, dass der angewandte Kurs nicht belegt ist. Eine datierte indikative Referenz kann getrennt angezeigt werden; ohne verwendbaren belegten Kurs für dieses Datum bleibt sie unverfügbar.',
    transfer: 'Bei Ria oder Western Union stammt der überweisungsspezifische Kurs aus dem Beleg. Der im Senegal erhaltene Betrag ist nicht der Gegenwert der Gesamtzahlung einschließlich Gebühren.',
    referenceRule: 'Kurse und Historie / FX-Rechner liefern, sofern verfügbar, eine belegte Referenz zum Datum des Vorgangs. Das Ergebnis ist indikativ, außerhalb gebuchter Summen, und füllt belegte Gegenwerte niemals automatisch aus.',
    proposed: 'Vorgeschlagene Definition', glossary: 'Glossar Finanzen', placeholder: 'Dienstleister · Beleg-/Auszugsreferenz · Datum · Währungen und Gebühren'
  }
};

export default function FinanceConversionHelp({ language = 'FR', kind = 'reference' }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef(null);
  const dialog = useRef(null);
  const closeButton = useRef(null);
  const titleId = useId();
  const t = COPY[language] || COPY.FR;
  const title = kind === 'rate' ? t.rate : t.reference;
  const applied = getGlossaryContextEntry('FIN-TAUX-CHANGE-APPLIQUE', language);
  const reference = getGlossaryContextEntry('FIN-TAUX-CHANGE-REFERENCE', language);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return undefined;
    const opener = trigger.current;
    closeButton.current?.focus();
    const key = event => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); setOpen(false); }
      if (event.key === 'Tab') {
        const nodes = Array.from(dialog.current.querySelectorAll('button,a[href]'));
        const index = nodes.indexOf(document.activeElement);
        if (index === -1 || (event.shiftKey ? index === 0 : index === nodes.length - 1)) {
          event.preventDefault(); nodes[event.shiftKey ? nodes.length - 1 : 0]?.focus();
        }
      }
    };
    const focus = event => { if (!dialog.current?.contains(event.target)) closeButton.current?.focus(); };
    document.addEventListener('keydown', key);
    document.addEventListener('focusin', focus);
    return () => {
      document.removeEventListener('keydown', key);
      document.removeEventListener('focusin', focus);
      opener?.focus();
    };
  }, [open]);

  return <>
    <button ref={trigger} type="button" className="m3s-icon-button shrink-0 text-blue-400" aria-label={`${t.help} : ${title}`} title={`${t.help} : ${title}`} aria-haspopup="dialog" aria-expanded={open} onClick={event => { event.stopPropagation(); setOpen(true); }}>
      <HelpCircle size={17} aria-hidden="true" />
    </button>
    {open && createPortal(
      <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/70 p-4" onClick={event => event.stopPropagation()} onMouseDown={event => { event.stopPropagation(); if (event.target === event.currentTarget) close(); }}>
        <section ref={dialog} role="dialog" aria-modal="true" aria-labelledby={titleId} className="m3s-panel max-h-[85dvh] w-full max-w-xl overflow-y-auto p-5 shadow-2xl sm:p-6">
          <div className="flex items-start justify-between gap-3"><h3 id={titleId} className="m3s-section-title">{title}</h3><button ref={closeButton} type="button" className="m3s-icon-button shrink-0" title={t.close} aria-label={t.close} onClick={close}><X size={18} aria-hidden="true" /></button></div>
          <div className="mt-4 space-y-4 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>
            {kind === 'reference' && <section><h4 className="font-semibold">{t.expected}</h4><p>{t.instruction}</p><p className="mt-2">{t.example}</p><p className="mt-2">{t.pair}</p></section>}
            <section><h4 className="font-semibold">{applied.term}</h4><p>{applied.shortDefinition}</p></section>
            <section><h4 className="font-semibold">{reference.term} · {t.proposed}</h4><p>{reference.shortDefinition}</p><p className="mt-2">{t.referenceRule}</p></section>
            <p>{t.missing}</p><p>{t.transfer}</p>
            <a className="inline-block text-blue-400 underline" href="/finance?tab=glossary">{t.glossary}</a>
          </div>
        </section>
      </div>, document.body)}
  </>;
}

export function ConversionReferenceField({ label, value, onChange, language, inputClassName }) {
  const id = useId();
  const t = COPY[language] || COPY.FR;
  return <div className="min-w-0 text-sm text-slate-300 md:col-span-2">
    <div className="mb-1 flex items-center gap-2"><label htmlFor={id}>{label}</label><FinanceConversionHelp language={language} /></div>
    <input id={id} className={inputClassName} maxLength={500} placeholder={t.placeholder} value={value || ''} onChange={event => onChange(event.target.value)} />
  </div>;
}
