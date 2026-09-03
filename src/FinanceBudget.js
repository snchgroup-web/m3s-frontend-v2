import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Copy, Download, FilePlus2, LockKeyhole, Trash2, Upload, Wallet } from 'lucide-react';
import { StandardCreateButton } from './StandardUI';
import ActionConfirmationDialog from './ActionConfirmationDialog';
import { convertFinanceAmount } from './FinanceAmountPair';
import { useFinanceBudget } from './FinanceBudgetContext';
import { BUDGET_CURRENCIES, BUDGET_DIRECTIONS, BUDGET_FILE_LIMIT, BUDGET_KINDS, BUDGET_MAX_REVISION, BUDGET_MAX_ROWS, createBudget, createBudgetRow, isBudgetValid, parseBudgetAmount, parseBudgetFile, parseBudgetRate, serializeBudget, summarizeBudget, summarizeBudgetRow } from './financeBudgetModel';

const COPY = {
  FR: {
    title: 'Budget 2SG', status: 'Organisation · Brouillon non approuvé', personal: 'Personnel non ouvert',
    private: 'Isolation des données et droits serveur requis.', empty: 'Aucun brouillon budgétaire dans cette session.',
    new: 'Nouveau brouillon', add: 'Ajouter une rubrique', name: 'Nom du budget', entity: 'Entité / périmètre propriétaire',
    year: 'Exercice', rate: 'Hypothèse CFA / CHF', rateSource: 'Source de l’hypothèse', rateDate: 'Date de l’hypothèse',
    planning: 'Prévisions mensuelles', label: 'Rubrique', kind: 'Nature', direction: 'Flux', currency: 'Devise',
    kinds: ['Fonctionnement', 'Investissement', 'Financement'], directions: ['Entrées', 'Sorties'],
    export: 'Exporter le brouillon JSON', import: 'Importer un brouillon JSON', remove: 'Supprimer la rubrique',
    revision: 'Révision exportée', changed: 'Modifications non exportées', restored: 'Fichier importé · Non approuvé',
    copy: 'Dupliquer le brouillon', terminal: 'Limite de révisions atteinte : lecture seule. Dupliquez le brouillon pour poursuivre.',
    copyBody: 'Les montants et rubriques seront conservés dans une nouvelle copie non approuvée, sans historique des révisions.',
    downloaded: 'Téléchargement demandé · Vérifiez le fichier reçu', exportFailed: 'Export impossible. Le brouillon est conservé dans cette session.',
    saved: 'Dernier export demandé', temporary: 'Session uniquement · Aucun enregistrement serveur · Export nécessaire avant fermeture ou déconnexion',
    partial: 'Sous-totaux saisis, non enveloppes approuvées', filled: 'mois renseignés', annual: 'Total saisi',
    invalid: 'Champs à corriger : nom, entité, année 2000–2100, rubrique ou montant positif/nul (maximum 1 milliard, deux décimales). Une hypothèse de change exige une source et une date valides.',
    fileError: 'Fichier refusé : brouillon organisation M3S v1 attendu, 100 rubriques maximum, 512 Ko maximum. Le brouillon courant reste inchangé.',
    limit: 'Limite atteinte : 100 rubriques.', emptyRow: 'Rubrique sans nom', emptyGrid: 'Aucune rubrique.',
    confirm: 'Confirmer', cancel: 'Annuler', confirmTitle: 'Modifier le brouillon ?',
    replace: 'Le brouillon courant sera remplacé. Les modifications non exportées seront perdues.',
    deleteBody: 'Cette rubrique et ses douze montants seront supprimés du brouillon.',
    currencyBody: 'Les montants de cette rubrique seront effacés avant changement de devise. Aucune conversion automatique.',
    yearBody: 'Changer l’exercice conservera les montants saisis. Ils resteront des prévisions à revoir pour la nouvelle année.',
    actual: 'Réalisé non rapproché · Écarts indisponibles', actualBody: 'Les registres existants ne sont pas encore affectés aux rubriques de ce brouillon.',
    income: 'Recettes', expenses: 'Dépenses', hypothesis: 'Équivalents à l’hypothèse budgétaire', noRate: 'Hypothèse de change non renseignée ou incomplète',
    months: 'Mois', currencyNote: 'Montants dans la devise de chaque rubrique', exportHint: 'Le fichier peut contenir des informations financières internes.',
    versionZero: 'Aucun export', changedYear: 'Exercice modifié', removed: 'Rubrique supprimée', replaced: 'Brouillon remplacé'
  },
  EN: {
    title: '2SG Budget', status: 'Organisation · Unapproved draft', personal: 'Personal workspace closed',
    private: 'Data isolation and server permissions required.', empty: 'No budget draft in this session.',
    new: 'New draft', add: 'Add category', name: 'Budget name', entity: 'Owning entity / scope',
    year: 'Year', rate: 'CFA / CHF assumption', rateSource: 'Assumption source', rateDate: 'Assumption date',
    planning: 'Monthly forecast', label: 'Category', kind: 'Nature', direction: 'Flow', currency: 'Currency',
    kinds: ['Operating', 'Investment', 'Financing'], directions: ['Incoming', 'Outgoing'],
    export: 'Export draft JSON', import: 'Import draft JSON', remove: 'Delete category',
    revision: 'Exported revision', changed: 'Unexported changes', restored: 'File imported · Unapproved',
    copy: 'Duplicate draft', terminal: 'Revision limit reached: read-only. Duplicate the draft to continue.',
    copyBody: 'Amounts and categories will be retained in a new unapproved copy without revision history.',
    downloaded: 'Download requested · Check the received file', exportFailed: 'Export failed. The draft remains in this session.',
    saved: 'Last export requested', temporary: 'Session only · No server storage · Export before closing or signing out',
    partial: 'Entered subtotals, not approved allocations', filled: 'months entered', annual: 'Entered total',
    invalid: 'Correct the name, entity, year 2000–2100, category or non-negative amount (maximum 1 billion, two decimals). An FX assumption requires a valid source and date.',
    fileError: 'File rejected: M3S organisation draft v1 required, maximum 100 categories and 512 KB. The current draft is unchanged.',
    limit: 'Limit reached: 100 categories.', emptyRow: 'Unnamed category', emptyGrid: 'No categories.',
    confirm: 'Confirm', cancel: 'Cancel', confirmTitle: 'Change this draft?',
    replace: 'The current draft will be replaced. Unexported changes will be lost.',
    deleteBody: 'This category and its twelve amounts will be deleted from the draft.',
    currencyBody: 'Amounts in this category will be cleared before changing currency. No automatic conversion.',
    yearBody: 'Changing the year will retain entered amounts. They remain forecasts to review for the new year.',
    actual: 'Actuals not reconciled · Variances unavailable', actualBody: 'Existing registers are not yet allocated to categories in this draft.',
    income: 'Income', expenses: 'Expenses', hypothesis: 'Equivalents at the budget assumption', noRate: 'FX assumption missing or incomplete',
    months: 'Months', currencyNote: 'Amounts in each category currency', exportHint: 'The file may contain internal financial information.',
    versionZero: 'No export', changedYear: 'Year changed', removed: 'Category deleted', replaced: 'Draft replaced'
  },
  DE: {
    title: '2SG-Budget', status: 'Organisation · Nicht genehmigter Entwurf', personal: 'Privatbereich geschlossen',
    private: 'Datentrennung und Serverberechtigungen erforderlich.', empty: 'Kein Budgetentwurf in dieser Sitzung.',
    new: 'Neuer Entwurf', add: 'Rubrik hinzufügen', name: 'Budgetname', entity: 'Verantwortliche Einheit / Umfang',
    year: 'Jahr', rate: 'Annahme CFA / CHF', rateSource: 'Quelle der Annahme', rateDate: 'Datum der Annahme',
    planning: 'Monatsplanung', label: 'Rubrik', kind: 'Art', direction: 'Geldfluss', currency: 'Währung',
    kinds: ['Betrieb', 'Investition', 'Finanzierung'], directions: ['Eingänge', 'Ausgänge'],
    export: 'Entwurf als JSON exportieren', import: 'JSON-Entwurf importieren', remove: 'Rubrik löschen',
    revision: 'Exportierte Revision', changed: 'Nicht exportierte Änderungen', restored: 'Datei importiert · Nicht genehmigt',
    copy: 'Entwurf duplizieren', terminal: 'Revisionsgrenze erreicht: schreibgeschützt. Entwurf zum Fortfahren duplizieren.',
    copyBody: 'Beträge und Rubriken bleiben in einer neuen, nicht genehmigten Kopie ohne Revisionsverlauf erhalten.',
    downloaded: 'Download angefordert · Empfangene Datei prüfen', exportFailed: 'Export fehlgeschlagen. Entwurf bleibt in dieser Sitzung.',
    saved: 'Letzter Export angefordert', temporary: 'Nur Sitzung · Keine Serverspeicherung · Vor Schließen oder Abmelden exportieren',
    partial: 'Erfasste Teilsummen, keine genehmigten Budgets', filled: 'Monate erfasst', annual: 'Erfasste Summe',
    invalid: 'Name, Einheit, Jahr 2000–2100, Rubrik oder nicht negativen Betrag korrigieren (maximal 1 Milliarde, zwei Dezimalstellen). Kursannahmen benötigen gültige Quelle und Datum.',
    fileError: 'Datei abgelehnt: M3S-Organisationsentwurf v1 erforderlich, maximal 100 Rubriken und 512 KB. Aktueller Entwurf unverändert.',
    limit: 'Grenze erreicht: 100 Rubriken.', emptyRow: 'Unbenannte Rubrik', emptyGrid: 'Keine Rubriken.',
    confirm: 'Bestätigen', cancel: 'Abbrechen', confirmTitle: 'Entwurf ändern?',
    replace: 'Der aktuelle Entwurf wird ersetzt. Nicht exportierte Änderungen gehen verloren.',
    deleteBody: 'Diese Rubrik und ihre zwölf Beträge werden aus dem Entwurf gelöscht.',
    currencyBody: 'Beträge dieser Rubrik werden vor dem Währungswechsel geleert. Keine automatische Umrechnung.',
    yearBody: 'Beim Jahreswechsel bleiben erfasste Beträge erhalten. Die Prognosen müssen für das neue Jahr geprüft werden.',
    actual: 'Istwerte nicht abgeglichen · Abweichungen nicht verfügbar', actualBody: 'Bestehende Register sind den Rubriken dieses Entwurfs noch nicht zugeordnet.',
    income: 'Einnahmen', expenses: 'Ausgaben', hypothesis: 'Gegenwerte zur Budgetannahme', noRate: 'Kursannahme fehlt oder ist unvollständig',
    months: 'Monate', currencyNote: 'Beträge in der Währung der jeweiligen Rubrik', exportHint: 'Datei kann interne Finanzinformationen enthalten.',
    versionZero: 'Kein Export', changedYear: 'Jahr geändert', removed: 'Rubrik gelöscht', replaced: 'Entwurf ersetzt'
  }
};

export default function FinanceBudget({ language, onSelectTab }) {
  const session = useFinanceBudget();
  const [pending, setPending] = useState(null);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const importSequence = useRef(0);
  useEffect(() => () => { importSequence.current += 1; }, []);
  const t = COPY[language] || COPY.FR;
  const locale = { FR: 'fr-CH', EN: 'en-GB', DE: 'de-CH' }[language] || 'fr-CH';
  if (!session) return null;
  const { draft, setDraft, dirty, setExported, exportedAt, setExportedAt } = session;
  const months = Array.from({ length: 12 }, (_, i) => new Date(2024, i, 1).toLocaleString(locale, { month: 'short' }));
  const valid = draft && isBudgetValid(draft);
  const revisionLimit = draft?.revision >= BUDGET_MAX_REVISION;
  const rate = draft?.rateSource.trim() && /^\d{4}-\d{2}-\d{2}$/.test(draft.rateDate) && !Number.isNaN(Date.parse(draft.rateDate)) && new Date(draft.rateDate).toISOString().slice(0, 10) === draft.rateDate ? parseBudgetRate(draft.rate) : null;
  const format = value => value === null ? '\u2014' : value.toLocaleString(locale, { maximumFractionDigits: 2 });
  const change = updater => { importSequence.current += 1; setDraft(updater); setNotice(''); setError(''); };
  const replace = next => { change(next); setExported(null); setExportedAt(null); setNotice(t.replaced); };
  const changeRow = (id, key, value) => change(current => ({ ...current, rows: current.rows.map(row => row.id === id ? { ...row, [key]: value } : row) }));
  const ask = (body, action, style = 'update') => setPending({ body, action, style });
  const add = () => {
    const row = createBudgetRow();
    change(current => ({ ...current, rows: [...current.rows, row] }));
    requestAnimationFrame(() => document.getElementById('budget-label-' + row.id)?.focus());
  };
  const download = () => {
    importSequence.current += 1;
    let url;
    try {
      const exported = serializeBudget(draft);
      url = URL.createObjectURL(new Blob([exported.text], { type: 'application/json;charset=utf-8' }));
      const link = document.createElement('a');
      link.href = url; link.download = 'M3S_Budget_2SG_' + draft.year + '_v' + exported.draft.revision + '.json';
      document.body.append(link); link.click(); link.remove();
      setDraft(exported.draft); setExported(JSON.stringify(exported.draft)); setExportedAt(new Date().toISOString()); setNotice(t.downloaded); setError('');
    } catch { setError(t.exportFailed); }
    finally { if (url) setTimeout(() => URL.revokeObjectURL(url), 1000); }
  };
  const importFile = async event => {
    const file = event.target.files?.[0]; event.target.value = '';
    if (!file) return;
    const sequence = ++importSequence.current;
    try {
      if (file.size > BUDGET_FILE_LIMIT) throw new Error('File too large');
      const next = parseBudgetFile(await file.text());
      if (sequence !== importSequence.current) return;
      const apply = () => { setDraft(next); setExported(JSON.stringify(next)); setExportedAt(null); setNotice(t.restored); setError(''); };
      if (draft) ask(t.replace, apply); else apply();
    } catch { if (sequence === importSequence.current) setError(t.fileError); }
  };
  const iconButton = (label, Icon, onClick, disabled = false) => <button type="button" className="m3s-icon-button" aria-label={label} title={label} onClick={onClick} disabled={disabled}><Icon size={18} aria-hidden="true" /></button>;
  return <section id="finance-budget" className="m3s-budget" aria-labelledby="finance-budget-title" tabIndex={-1}>
    <header className="m3s-budget-heading">
      <div><h2 id="finance-budget-title"><Wallet size={24} aria-hidden="true" />{t.title}</h2><p>{t.status}</p></div>
      <span className="m3s-budget-private" title={t.private}><LockKeyhole size={16} aria-hidden="true" />{t.personal}</span>
    </header>
    <div className="m3s-budget-toolbar">
      <div className="m3s-budget-actions">
        {iconButton(t.new, FilePlus2, () => draft ? ask(t.replace, () => replace(createBudget())) : replace(createBudget()))}
        {iconButton(t.import, Upload, () => inputRef.current?.click())}
        {iconButton(t.export, Download, download, !valid || revisionLimit)}
        {revisionLimit && iconButton(t.copy, Copy, () => ask(t.copyBody, () => replace({ ...draft, revision: 0 })))}
        <input ref={inputRef} type="file" accept=".json,application/json" aria-label={t.import} onChange={importFile} hidden />
      </div>
      <p>{draft ? dirty ? t.changed : draft.revision ? t.revision + ' ' + draft.revision : t.versionZero : t.empty}</p>
    </div>
    <p className="m3s-budget-storage">{t.temporary}</p>
    {exportedAt && <p className="m3s-budget-meta">{t.saved} : {new Date(exportedAt).toLocaleString(locale)}</p>}
    {notice && <p role="status" className="m3s-budget-notice">{notice}</p>}
    {error && <p role="alert" className="m3s-budget-error">{error}</p>}
    {revisionLimit && <p role="status" className="m3s-budget-storage">{t.terminal}</p>}
    {!draft ? <div className="m3s-budget-empty"><StandardCreateButton icon={FilePlus2} onClick={() => replace(createBudget())}>{t.new}</StandardCreateButton></div> : <>
      <fieldset disabled={revisionLimit}>
      <div className="m3s-budget-settings">
        <label>{t.name}<input value={draft.title} maxLength={120} required onChange={event => change({ ...draft, title: event.target.value })} /></label>
        <label>{t.entity}<input value={draft.entity} maxLength={120} required onChange={event => change({ ...draft, entity: event.target.value })} /></label>
        <label>{t.year}<select value={draft.year} onChange={event => {
          const year = event.target.value;
          if (draft.rows.some(row => row.months.some(v => v !== ''))) ask(t.yearBody, () => change(current => ({ ...current, year })));
          else change({ ...draft, year });
        }}>{Array.from({ length: 101 }, (_, i) => String(i + 2000)).map(year => <option key={year}>{year}</option>)}</select></label>
        <label>{t.rate}<input inputMode="decimal" value={draft.rate} maxLength={24} onChange={event => change({ ...draft, rate: event.target.value })} /></label>
        <label>{t.rateSource}<input value={draft.rateSource} maxLength={200} onChange={event => change({ ...draft, rateSource: event.target.value })} /></label>
        <label>{t.rateDate}<input type="date" value={draft.rateDate} onChange={event => change({ ...draft, rateDate: event.target.value })} /></label>
      </div>
      {!valid && <p className="m3s-budget-error" role="status">{t.invalid}</p>}
      <p className="m3s-budget-meta">{rate ? t.hypothesis + ' : ' + format(rate) + ' CFA / CHF' : t.noRate}</p>
      <div className="m3s-budget-totals">
        {BUDGET_DIRECTIONS.map((direction, i) => <section key={direction} aria-label={t.directions[i]}>
          <h3>{t.directions[i]}</h3>
          {summarizeBudget(draft).map(group => <div key={group.currency}>
            <strong data-testid={'budget-total-' + direction + '-' + group.currency} className={group.currency === 'CFA' ? 'm3s-currency-cfa' : 'm3s-budget-chf'}>{format(group[direction].cents === null ? null : group[direction].cents / 100)} {group.currency}</strong>
            <small>{group[direction].filled}/{group[direction].expected} {t.filled}</small>
          </div>)}
        </section>)}
      </div>
      <p className="m3s-budget-meta">{t.partial}</p>
      <div className="m3s-budget-grid-heading"><h3>{t.planning}</h3><StandardCreateButton onClick={add} disabled={draft.rows.length >= BUDGET_MAX_ROWS}>{t.add}</StandardCreateButton></div>
      {draft.rows.length >= BUDGET_MAX_ROWS && <p role="status">{t.limit}</p>}
      <div className="m3s-budget-scroll" role="region" aria-label={t.planning} tabIndex={0}>
        <table>
          <caption>{t.currencyNote}</caption>
          <thead><tr><th scope="col">{t.label}</th>{months.map((month, i) => <th scope="col" key={i}>{month}</th>)}<th scope="col">{t.annual}</th></tr></thead>
          <tbody>{draft.rows.map((row, rowIndex) => {
            const summary = summarizeBudgetRow(row);
            const annualPair = convertFinanceAmount(summary.cents === null ? null : summary.cents / 100, row.currency, rate);
            return <tr key={row.id}>
              <th scope="row">
                <div className="m3s-budget-row-title"><input id={'budget-label-' + row.id} aria-label={t.label + ' ' + (rowIndex + 1)} maxLength={120} required value={row.label} onChange={event => changeRow(row.id, 'label', event.target.value)} />{iconButton(t.remove + ' : ' + (row.label || t.emptyRow), Trash2, () => ask(t.deleteBody, () => change(current => ({ ...current, rows: current.rows.filter(r => r.id !== row.id) })), 'delete'))}</div>
                <select aria-label={t.kind + ' ' + (rowIndex + 1)} value={row.kind} onChange={event => changeRow(row.id, 'kind', event.target.value)}>{BUDGET_KINDS.map((kind, i) => <option key={kind} value={kind}>{t.kinds[i]}</option>)}</select>
                <div className="m3s-budget-row-selects">
                  <select aria-label={t.direction + ' ' + (rowIndex + 1)} value={row.direction} onChange={event => changeRow(row.id, 'direction', event.target.value)}>{BUDGET_DIRECTIONS.map((direction, i) => <option key={direction} value={direction}>{t.directions[i]}</option>)}</select>
                  <select aria-label={t.currency + ' ' + (rowIndex + 1)} value={row.currency} onChange={event => {
                    const currency = event.target.value;
                    const apply = () => change(current => ({ ...current, rows: current.rows.map(r => r.id === row.id ? { ...r, currency, months: Array(12).fill('') } : r) }));
                    if (row.months.some(v => v !== '')) ask(t.currencyBody, apply); else apply();
                  }}>{BUDGET_CURRENCIES.map(currency => <option key={currency}>{currency}</option>)}</select>
                </div>
              </th>
              {row.months.map((value, month) => {
                const parsed = parseBudgetAmount(value);
                const pair = convertFinanceAmount(parsed.cents === null ? null : parsed.cents / 100, row.currency, rate);
                return <td key={month}>
                  <input aria-label={(row.label || t.emptyRow) + ' ' + months[month] + ' ' + row.currency} aria-invalid={parsed.state === 'invalid'} inputMode="decimal" maxLength={24} className={row.currency === 'CFA' ? 'm3s-currency-cfa' : 'm3s-budget-chf'} value={value} onChange={event => changeRow(row.id, 'months', row.months.map((v, i) => i === month ? event.target.value : v))} />
                  <small className={row.currency === 'CHF' ? 'm3s-currency-cfa' : 'm3s-budget-chf'}>{'\u2248'} {format(row.currency === 'CHF' ? pair.cfa : pair.chf)} {row.currency === 'CHF' ? 'CFA' : 'CHF'}</small>
                </td>;
              })}
              <td><div className="m3s-budget-annual"><span className="m3s-budget-chf">{row.currency === 'CFA' ? '\u2248 ' : ''}{format(annualPair.chf)} CHF</span><span className="m3s-currency-cfa">{row.currency === 'CHF' ? '\u2248 ' : ''}{format(annualPair.cfa)} CFA</span></div><small>{summary.filled}/12 {t.filled}</small></td>
            </tr>;
          })}</tbody>
        </table>
        {!draft.rows.length && <p className="m3s-budget-empty">{t.emptyGrid}</p>}
      </div>
      </fieldset>
      <p className="m3s-budget-meta">{t.exportHint}</p>
      <footer className="m3s-budget-actual"><h3>{t.actual}</h3><p>{t.actualBody}</p><div>{[['recettes', t.income], ['depenses', t.expenses]].map(([tab, label]) => <button type="button" key={tab} className="m3s-secondary-button" onClick={() => onSelectTab(tab)}>{label}<ArrowRight size={16} aria-hidden="true" /></button>)}</div></footer>
    </>}
    {pending && <ActionConfirmationDialog id="budget-confirm" title={t.confirmTitle} body={pending.body} cancelLabel={t.cancel} confirmLabel={t.confirm} action={pending.style} onCancel={() => setPending(null)} onConfirm={() => { pending.action(); setPending(null); }} />}
  </section>;
}
