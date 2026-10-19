import React, { useEffect, useRef, useState } from 'react';
import { Download, FolderOpen, LockKeyhole, Plus, Upload, CircleHelp, Search, RefreshCw, ArrowUpRight } from 'lucide-react';
import api from './api';
import ActionConfirmationDialog from './ActionConfirmationDialog';
import { formatRegistryDate } from './registryDate';
import { workMinutes } from './rhWorkHoursCore';
import { hoursWorkLinkFromTask, sameHoursWorkLink, csvHoursCell } from './hoursWorkLink';
import { HOURS_ZONES, hoursAccountKey, hoursToday, createHoursVault, sealHoursVault, openHoursVault,
  newHourEntry, appendHours, hoursMonth, hoursDuration } from './personalHoursVault';

export const HOURS_COPY = {
  FR: { title: 'Mes heures', privacy: 'Relevé personnel 2SG · chiffré sur cet appareil, non synchronisé avec le serveur. Aucun calcul de salaire.',
    phrase: 'Phrase privée (12 caractères minimum)', repeat: 'Répéter la phrase', zone: 'Fuseau du relevé', restore: 'Restaurer une copie chiffrée (facultatif)',
    warning: 'Cette phrase ne peut pas être récupérée par M3S. Conserve-la séparément et exporte une copie chiffrée avant de changer d’appareil.',
    open: 'Ouvrir mon relevé', unlock: 'Déverrouiller', busy: 'Traitement…', lock: 'Verrouiller', backup: 'Exporter la copie chiffrée', csv: 'Exporter le mois en CSV non chiffré',
    date: 'Date', start: 'Début', end: 'Fin', pause: 'Pause (min)', overnight: 'Fin le lendemain', duration: 'Durée déclarée', month: 'Mois',
    add: 'Ajouter la saisie', saved: 'Enregistré chiffré sur cet appareil.', exported: 'Export préparé. Vérifie le fichier dans tes téléchargements.',
    duplicate: 'Saisie déjà présente, aucun doublon ajouté.', empty: 'Aucune heure déclarée pour ce mois.', total: 'Total du mois', all: 'saisies conservées, tous mois confondus',
    chooseMonth: 'Choisis un mois.', import: 'Rapprocher une copie chiffrée', importFile: 'Copie à rapprocher', importPhrase: 'Phrase privée de cette copie',
    importAction: 'Examiner la copie', confirm: 'Confirmer l’ajout', cancel: 'Annuler', yes: 'Oui, enregistrer',
    confirmBody: '{count} saisie(s) à ajouter ; {skipped} doublon(s) ignoré(s). Les saisies existantes ne seront pas remplacées.',
    help: 'Périmètre du relevé', helpText: 'Déclarations personnelles, non validées par 2SG et distinctes des relevés salariés. Le fuseau reste celui choisi à la création. Les nuits appartiennent au jour de début. Une date de changement d’heure exige une vérification manuelle. Le CSV est lisible en clair.',
    invalid: 'Vérifie la date, les horaires, la pause et la case de nuit. Aucune saisie remplacée.',
    error: 'Ouverture ou enregistrement impossible. Vérifie la phrase, le fichier et le stockage du navigateur. Aucune copie existante remplacée.',
    collision: 'Ces horaires se chevauchent ou correspondent à une autre version existante. Aucun remplacement effectué.',
    clock: 'Cette date comporte un changement d’heure : vérification manuelle nécessaire, aucune durée enregistrée.',
    conflict: 'Une autre copie a changé dans ce navigateur. Verrouille puis rouvre le relevé ; aucun écrasement effectué.',
    zoneMismatch: 'Le fuseau de cette copie diffère de celui du relevé. Aucun rapprochement effectué.', unsupported: 'Compte ou chiffrement sécurisé indisponible.',
    nature: 'Déclaration personnelle non validée', records: 'saisies', pending: 'Saisie non enregistrée' },
  DE: { title: 'Meine Stunden', privacy: 'Persönlicher 2SG-Zeitnachweis · auf diesem Gerät verschlüsselt, nicht mit dem Server synchronisiert. Keine Lohnberechnung.',
    phrase: 'Private Passphrase (mindestens 12 Zeichen)', repeat: 'Passphrase wiederholen', zone: 'Zeitzone des Nachweises', restore: 'Verschlüsselte Kopie wiederherstellen (optional)',
    warning: 'M3S kann diese Passphrase nicht wiederherstellen. Separat aufbewahren und vor einem Gerätewechsel eine verschlüsselte Kopie exportieren.',
    open: 'Meinen Nachweis öffnen', unlock: 'Entsperren', busy: 'Wird verarbeitet…', lock: 'Sperren', backup: 'Verschlüsselte Kopie exportieren', csv: 'Monat als unverschlüsselte CSV exportieren',
    date: 'Datum', start: 'Beginn', end: 'Ende', pause: 'Pause (Min.)', overnight: 'Ende am Folgetag', duration: 'Gemeldete Dauer', month: 'Monat',
    add: 'Eintrag hinzufügen', saved: 'Auf diesem Gerät verschlüsselt gespeichert.', exported: 'Export vorbereitet. Datei im Download-Ordner prüfen.',
    duplicate: 'Eintrag bereits vorhanden, kein Duplikat hinzugefügt.', empty: 'Keine Stunden für diesen Monat gemeldet.', total: 'Monatssumme', all: 'gespeicherte Einträge über alle Monate',
    chooseMonth: 'Monat auswählen.', import: 'Verschlüsselte Kopie abgleichen', importFile: 'Abzugleichende Kopie', importPhrase: 'Passphrase dieser Kopie',
    importAction: 'Kopie prüfen', confirm: 'Hinzufügen bestätigen', cancel: 'Abbrechen', yes: 'Ja, speichern',
    confirmBody: '{count} Einträge hinzufügen; {skipped} Duplikate übersprungen. Vorhandene Einträge werden nicht ersetzt.',
    help: 'Umfang des Nachweises', helpText: 'Persönliche, von 2SG nicht bestätigte Angaben, getrennt von Arbeitnehmernachweisen. Die bei der Erstellung gewählte Zeitzone bleibt bestehen. Nächte zählen zum Anfangstag. Zeitumstellung erfordert manuelle Prüfung. CSV ist im Klartext lesbar.',
    invalid: 'Datum, Zeiten, Pause und Folgetag prüfen. Kein Eintrag ersetzt.',
    error: 'Öffnen oder Speichern fehlgeschlagen. Passphrase, Datei und Browserspeicher prüfen. Vorhandene Kopie nicht ersetzt.',
    collision: 'Zeiten überschneiden sich oder unterscheiden sich von einer vorhandenen Version. Nichts ersetzt.',
    clock: 'Zeitumstellung an diesem Datum: manuelle Prüfung nötig, keine Dauer gespeichert.',
    conflict: 'Eine andere Kopie wurde im Browser geändert. Sperren und erneut öffnen; nichts überschrieben.',
    zoneMismatch: 'Die Zeitzone dieser Kopie weicht ab. Kein Abgleich durchgeführt.', unsupported: 'Konto oder sichere Verschlüsselung nicht verfügbar.',
    nature: 'Unbestätigte persönliche Angabe', records: 'Einträge', pending: 'Nicht gespeicherter Eintrag' },
  EN: { title: 'My hours', privacy: 'Personal 2SG time record · encrypted on this device, not synchronised with the server. No payroll calculation.',
    phrase: 'Private passphrase (at least 12 characters)', repeat: 'Repeat passphrase', zone: 'Record time zone', restore: 'Restore an encrypted copy (optional)',
    warning: 'M3S cannot recover this passphrase. Keep it separately and export an encrypted copy before changing devices.',
    open: 'Open my record', unlock: 'Unlock', busy: 'Processing…', lock: 'Lock', backup: 'Export encrypted copy', csv: 'Export month as unencrypted CSV',
    date: 'Date', start: 'Start', end: 'End', pause: 'Break (min)', overnight: 'Ends next day', duration: 'Declared duration', month: 'Month',
    add: 'Add entry', saved: 'Saved encrypted on this device.', exported: 'Export prepared. Check the file in Downloads.',
    duplicate: 'Entry already present; no duplicate added.', empty: 'No hours declared for this month.', total: 'Month total', all: 'saved entries across all months',
    chooseMonth: 'Choose a month.', import: 'Merge an encrypted copy', importFile: 'Copy to merge', importPhrase: 'Passphrase for this copy',
    importAction: 'Inspect copy', confirm: 'Confirm addition', cancel: 'Cancel', yes: 'Yes, save',
    confirmBody: '{count} entries to add; {skipped} duplicates ignored. Existing entries will not be replaced.',
    help: 'Record scope', helpText: 'Personal declarations, not approved by 2SG and separate from employee records. The time zone chosen at creation is retained. Nights belong to their start date. Clock-change dates require manual review. CSV is readable in plain text.',
    invalid: 'Check the date, times, break and next-day option. No entry replaced.',
    error: 'Unable to open or save. Check the passphrase, file and browser storage. No existing copy replaced.',
    collision: 'Times overlap or conflict with an existing version. Nothing replaced.',
    clock: 'This date includes a clock change: manual review required, no duration saved.',
    conflict: 'Another copy changed in this browser. Lock and reopen the record; nothing overwritten.',
    zoneMismatch: 'This copy has a different time zone. No merge performed.', unsupported: 'Account or secure encryption unavailable.',
    nature: 'Unapproved personal declaration', records: 'entries', pending: 'Unsaved entry' }
};
export const HOURS_WORK_COPY = {
  FR: { task: 'Tâche affectée', choose: 'Choisir une tâche existante', search: 'Rechercher une tâche', refresh: 'Actualiser les tâches',
    loading: 'Chargement des affectations…', unavailable: 'Source des affectations indisponible. Aucune nouvelle saisie non rattachée ne sera créée.',
    empty: 'Aucune tâche affectée trouvée.', count: '{shown} tâche(s) affichée(s) sur {total}. Affine la recherche si nécessaire.',
    project: 'Projet', phase: 'Phase', activity: 'Action / activité de la tâche', plan: 'Plan opérationnel', recurrence: 'Récurrence', occurrence: 'Occurrence',
    missing: 'Non renseigné dans la tâche', legacy: 'Ancienne saisie non rattachée', linked: 'Rattachement au travail', revision: 'Révision de la tâche',
    required: 'Choisis une tâche affectée disponible. Son projet, sa phase et son activité sont repris sans les inventer.',
    changed: 'La tâche ou ses références ont changé. Actualise les affectations avant de confirmer ; aucune saisie enregistrée.',
    scope: 'Même calcul horaire que les outils RH de proximité. Nouvelle saisie liée à une tâche existante ; projet/phase/activité repris de cette tâche. Les anciennes saisies restent intactes. Ces références sont une copie datée, pas une modification de la tâche ni une validation RH.',
    tools: 'Ouvrir les outils RH existants', tasks: 'Ouvrir Mes tâches' },
  DE: { task: 'Zugewiesene Aufgabe', choose: 'Bestehende Aufgabe wählen', search: 'Aufgabe suchen', refresh: 'Aufgaben aktualisieren',
    loading: 'Zuweisungen werden geladen…', unavailable: 'Zuweisungsquelle nicht verfügbar. Kein neuer Eintrag ohne Verknüpfung wird erstellt.',
    empty: 'Keine zugewiesene Aufgabe gefunden.', count: '{shown} von {total} Aufgaben angezeigt. Bei Bedarf Suche eingrenzen.',
    project: 'Projekt', phase: 'Phase', activity: 'Aktion / Aktivität der Aufgabe', plan: 'Betriebsplan', recurrence: 'Wiederholung', occurrence: 'Ausführung',
    missing: 'In der Aufgabe nicht angegeben', legacy: 'Alter Eintrag ohne Verknüpfung', linked: 'Arbeitszuordnung', revision: 'Aufgabenrevision',
    required: 'Verfügbare zugewiesene Aufgabe wählen. Projekt, Phase und Aktivität werden daraus übernommen, nicht erfunden.',
    changed: 'Aufgabe oder Referenzen geändert. Zuweisungen vor Bestätigung aktualisieren; nichts gespeichert.',
    scope: 'Gleiche Zeitberechnung wie bei den vorhandenen HR-Werkzeugen. Neue Einträge werden einer bestehenden Aufgabe mit deren Projekt/Phase/Aktivität zugeordnet. Alte Einträge bleiben unverändert. Referenzen sind eine datierte Kopie, keine Aufgabenänderung oder HR-Freigabe.',
    tools: 'Vorhandene HR-Werkzeuge öffnen', tasks: 'Meine Aufgaben öffnen' },
  EN: { task: 'Assigned task', choose: 'Choose an existing task', search: 'Search tasks', refresh: 'Refresh tasks',
    loading: 'Loading assignments…', unavailable: 'Assignment source unavailable. No new unlinked entry will be created.',
    empty: 'No assigned task found.', count: '{shown} of {total} tasks shown. Refine the search if needed.',
    project: 'Project', phase: 'Phase', activity: 'Task action / activity', plan: 'Operational plan', recurrence: 'Recurrence', occurrence: 'Occurrence',
    missing: 'Not provided in the task', legacy: 'Earlier unlinked entry', linked: 'Work link', revision: 'Task revision',
    required: 'Choose an available assigned task. Its project, phase and activity are copied, never invented.',
    changed: 'The task or its references changed. Refresh assignments before confirming; nothing saved.',
    scope: 'Same time calculation as the existing proximity HR tools. New entries link to an existing task and its project/phase/activity. Earlier entries stay unchanged. References are a dated copy, not a task update or HR approval.',
    tools: 'Open existing HR tools', tasks: 'Open My tasks' }
};
const errorKey = error => ({ HOURS_INVALID: 'invalid', HOURS_COLLISION: 'collision', HOURS_CLOCK_CHANGE: 'clock',
  HOURS_ZONE_MISMATCH: 'zoneMismatch', HOURS_STORAGE_CHANGED: 'conflict', HOURS_WORK_INVALID: 'required', HOURS_WORK_CHANGED: 'changed', HOURS_WORK_UNAVAILABLE: 'unavailable' }[error?.message] || 'error');
const initialFields = zone => ({ date: hoursToday(zone), start: '', end: '', pause: '0', overnight: false });
function download(text, name, type) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const link = document.createElement('a'); link.href = url; link.download = name; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export default function PersonalHours(props) {
  return <AccountHours key={JSON.stringify([props.principal?.id, props.principal?.tenantId, props.principal?.email])} {...props}/>;
}
function AccountHours({ principal, language = 'FR', active = true, onOpenTasks, onOpenRhTools }) {
  const t = HOURS_COPY[language] || HOURS_COPY.FR;
  const w = HOURS_WORK_COPY[language] || HOURS_WORK_COPY.FR;
  const [subject, setSubject] = useState(null), [existing, setExisting] = useState(false);
  const [status, setStatus] = useState('initialising'), [state, setState] = useState(null);
  const [zone, setZone] = useState('Europe/Zurich'), [file, setFile] = useState(null);
  const [phrase, setPhrase] = useState(''), [repeat, setRepeat] = useState('');
  const [importFile, setImportFile] = useState(null), [importPhrase, setImportPhrase] = useState('');
  const [fields, setFields] = useState(() => initialFields('Europe/Zurich'));
  const [month, setMonth] = useState(() => hoursToday('Europe/Zurich').slice(0, 7));
  const [error, setError] = useState(''), [notice, setNotice] = useState(''), [conflict, setConflict] = useState(false);
  const [pending, setPending] = useState(null);
  const [taskQuery, setTaskQuery] = useState(''), [taskSearch, setTaskSearch] = useState(''), [taskRefresh, setTaskRefresh] = useState(0);
  const [taskSource, setTaskSource] = useState({ status: 'loading', page: null }), [selectedTask, setSelectedTask] = useState('');
  const vault = useRef(null), saved = useRef(null), live = useRef(false), working = useRef(false), sequence = useRef(0);
  const identity = JSON.stringify([principal?.id, principal?.tenantId, principal?.email]);
  useEffect(() => {
    live.current = true;
    const [id, tenantId, email] = JSON.parse(identity);
    hoursAccountKey({ id, tenantId, email }).then(key => {
      if (!live.current) return;
      const current = localStorage.getItem(key); saved.current = current;
      setSubject(key); setExisting(Boolean(current)); setStatus('locked');
    }).catch(() => { if (live.current) { setError('unsupported'); setStatus('blocked'); } });
    return () => { live.current = false; sequence.current += 1; vault.current = null; };
  }, [identity]);
  useEffect(() => { if (!active) setPending(null); }, [active]);
  const unlocked = Boolean(state);
  useEffect(() => {
    if (!unlocked || !active) return;
    const controller = new AbortController();
    setTaskSource({ status: 'loading', page: null }); setPending(null);
    api.getOwnTasks(100, 0, taskQuery, { signal: controller.signal }).then(page => {
      if (!controller.signal.aborted) setTaskSource({ status: 'ready', page });
    }).catch(() => { if (!controller.signal.aborted) setTaskSource({ status: 'unavailable', page: null }); });
    return () => controller.abort();
  }, [unlocked, active, taskQuery, taskRefresh]);
  useEffect(() => {
    const changed = () => setTaskRefresh(value => value + 1);
    window.addEventListener('m3s:tasks-changed', changed);
    return () => window.removeEventListener('m3s:tasks-changed', changed);
  }, []);
  useEffect(() => {
    const changed = event => {
      if (event.key === subject && event.newValue !== saved.current) { setConflict(true); setError('conflict'); setPending(null); }
    };
    window.addEventListener('storage', changed);
    return () => window.removeEventListener('storage', changed);
  }, [subject]);
  useEffect(() => {
    const leave = event => {
      if (status === 'busy' || fields.start || fields.end) { event.preventDefault(); event.returnValue = ''; }
    };
    window.addEventListener('beforeunload', leave);
    return () => window.removeEventListener('beforeunload', leave);
  }, [status, fields.start, fields.end]);
  const begin = () => {
    if (working.current || !live.current) return null;
    working.current = true; setStatus('busy'); setError(''); setNotice('');
    return ++sequence.current;
  };
  const current = token => live.current && token === sequence.current;
  const finish = token => { if (current(token)) { working.current = false; setStatus(vault.current ? 'ready' : 'locked'); } };
  const persist = async (nextVault, nextState, token, expected) => {
    const encrypted = await sealHoursVault(nextVault, nextState);
    if (!current(token)) return false;
    if (localStorage.getItem(subject) !== expected) throw new Error('HOURS_STORAGE_CHANGED');
    localStorage.setItem(subject, encrypted); saved.current = encrypted;
    vault.current = { ...nextVault, state: nextState }; setState(nextState); setExisting(true); setNotice('saved');
    return true;
  };
  const open = async event => {
    event.preventDefault(); const token = begin(); if (token === null) return;
    try {
      const stored = localStorage.getItem(subject);
      if (stored !== saved.current || conflict) throw new Error('HOURS_STORAGE_CHANGED');
      if (file && file.size > 2 * 1024 * 1024) throw new Error('HOURS_INVALID');
      const next = stored ? await openHoursVault(stored, phrase, subject)
        : file ? await openHoursVault(await file.text(), phrase, subject) : await createHoursVault(subject, phrase, zone);
      if (!current(token)) return;
      if (stored) {
        if (localStorage.getItem(subject) !== stored) throw new Error('HOURS_STORAGE_CHANGED');
        vault.current = next; setState(next.state); setNotice('saved');
      } else if (!await persist(next, next.state, token, stored)) return;
      setZone(next.state.timezone); setFields(initialFields(next.state.timezone));
      setPhrase(''); setRepeat(''); setFile(null); setConflict(false);
    } catch (failure) { if (current(token)) setError(errorKey(failure)); }
    finally { finish(token); }
  };
  const proposeEntry = event => {
    event.preventDefault(); setError(''); setNotice('');
    if (!vault.current || working.current || conflict) return;
    try {
      if (taskSource.status !== 'ready') throw new Error('HOURS_WORK_UNAVAILABLE');
      const row = taskSource.page.data.find(row => String(row.id) === selectedTask);
      const work = hoursWorkLinkFromTask(row);
      const entry = newHourEntry({ ...fields, pause: /^\d+$/.test(fields.pause) ? Number(fields.pause) : NaN, work });
      const merged = appendHours(vault.current.state, [entry]);
      if (merged.skipped) { setNotice('duplicate'); return; }
      setPending({ state: merged.state, skipped: 0, work, query: taskQuery });
    } catch (failure) { setError(errorKey(failure)); }
  };
  const proposeImport = async event => {
    event.preventDefault(); if (!importFile || !vault.current || conflict) return;
    const token = begin(); if (token === null) return;
    try {
      if (importFile.size > 2 * 1024 * 1024) throw new Error('HOURS_INVALID');
      const imported = await openHoursVault(await importFile.text(), importPhrase, subject);
      if (!current(token)) return;
      if (imported.state.timezone !== vault.current.state.timezone) throw new Error('HOURS_ZONE_MISMATCH');
      const merged = appendHours(vault.current.state, imported.state.entries);
      setImportPhrase(''); setImportFile(null);
      if (merged.state.entries.length === vault.current.state.entries.length) { setNotice('duplicate'); return; }
      if (active) setPending({ state: merged.state, skipped: merged.skipped });
    } catch (failure) { if (current(token)) setError(errorKey(failure)); }
    finally { finish(token); }
  };
  const save = async () => {
    if (!pending || !vault.current || conflict) return;
    const proposal = pending, token = begin(); if (token === null) return;
    try {
      if (proposal.work) {
        let page;
        try { page = await api.getOwnTasks(100, 0, proposal.query); }
        catch { throw new Error('HOURS_WORK_UNAVAILABLE'); }
        if (!current(token)) return;
        const row = page.data.find(row => String(row.id) === proposal.work.task_id);
        if (!row || !sameHoursWorkLink(hoursWorkLinkFromTask(row), proposal.work)) throw new Error('HOURS_WORK_CHANGED');
      }
      if (await persist(vault.current, proposal.state, token, saved.current)) {
        setPending(null); setMonth(proposal.state.entries.at(-1)?.date.slice(0, 7) || month); setFields(initialFields(zone));
      }
    } catch (failure) { if (current(token)) { setError(errorKey(failure)); setPending(null); } }
    finally { finish(token); }
  };
  const lock = () => {
    if (working.current) return;
    vault.current = null; setState(null); setPending(null); setPhrase(''); setRepeat(''); setImportPhrase('');
    setSelectedTask(''); setTaskSource({ status: 'loading', page: null });
    setImportFile(null); setFile(null); setFields(initialFields(zone)); setError(''); setNotice('');
    try { const stored = localStorage.getItem(subject); saved.current = stored; setExisting(Boolean(stored)); setConflict(false); setStatus('locked'); }
    catch { setError('error'); setStatus('blocked'); }
  };
  const validMonth = /^\d{4}-(0[1-9]|1[0-2])$/.test(month);
  const entries = state && validMonth ? hoursMonth(state, month) : [];
  let preview = null;
  try { preview = workMinutes(fields.start, fields.end, /^\d+$/.test(fields.pause) ? Number(fields.pause) : NaN, fields.overnight); } catch { /* Incomplete form is not a zero-hour entry. */ }
  const backup = async () => {
    if (!vault.current) return;
    const token = begin(); if (token === null) return;
    try {
      const encrypted = await sealHoursVault(vault.current, vault.current.state);
      if (current(token)) { download(encrypted, '2SG-mes-heures-chiffrees.json', 'application/json'); setNotice('exported'); }
    } catch (failure) { if (current(token)) setError(errorKey(failure)); }
    finally { finish(token); }
  };
  const csv = () => {
    const rows = [[t.date,t.start,t.end,t.pause,t.overnight,t.duration,t.zone,t.nature,w.task,w.revision,w.project,w.phase,w.activity,w.plan,w.recurrence,w.occurrence], ...entries.map(entry => [
      formatRegistryDate(entry.date, language),entry.start,entry.end,entry.pause,entry.overnight ? '1' : '0',hoursDuration(entry.minutes),state.timezone,t.nature,
      entry.work?.task_reference ?? w.legacy,entry.work?.task_revision,entry.work?.project_id,entry.work?.phase_id,entry.work?.activity_id,
      entry.work?.operational_plan_id,entry.work?.recurrence_id,entry.work?.occurrence_key])];
    download(`\ufeff${rows.map(row => row.map(csvHoursCell).join(';')).join('\r\n')}`, `2SG-mes-heures-${month}.csv`, 'text/csv;charset=utf-8'); setNotice('exported');
  };
  const busy = status === 'busy';
  const canOpen = subject && status === 'locked' && !conflict && phrase.length >= 12 && (existing || file || repeat === phrase);
  const field = (name, label, type, attributes = {}) => <label>{label}<input type={type} value={fields[name]} onChange={event => setFields(previous => ({ ...previous, [name]: event.target.value }))} {...attributes}/></label>;
  let work = null;
  try { work = hoursWorkLinkFromTask(taskSource.page?.data.find(row => String(row.id) === selectedTask)); } catch { /* No task is selected or the source is unavailable. */ }
  const workDetails = link => <dl className="personal-hours-context">
    {[[w.project,link.project_id],[w.phase,link.phase_id],[w.activity,link.activity_id],[w.plan,link.operational_plan_id],
      [w.recurrence,link.recurrence_id],[w.occurrence,link.occurrence_key]].filter(([label,value]) => value || [w.project,w.phase,w.activity].includes(label)).map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value || w.missing}</dd></div>)}
  </dl>;
  return <section className="personal-hours" aria-labelledby="personal-hours-title">
    <h3 id="personal-hours-title">{t.title}</h3><p>{t.privacy}</p>
    {error && <p role="alert">{t[error] || w[error]}</p>}{notice && <p role="status">{t[notice]}</p>}
    {!state ? <form className="personal-budget-form" onSubmit={open}>
      {!existing && <><label>{t.restore}<input type="file" accept=".json,application/json" disabled={status !== 'locked'} onChange={event => setFile(event.target.files?.[0] || null)}/></label>
        {!file && <label>{t.zone}<select value={zone} disabled={status !== 'locked'} onChange={event => setZone(event.target.value)}>{HOURS_ZONES.map(value => <option key={value}>{value}</option>)}</select></label>}</>}
      <label>{t.phrase}<input type="password" minLength={12} maxLength={4096} autoComplete="off" disabled={status !== 'locked'} value={phrase} onChange={event => setPhrase(event.target.value)}/></label>
      {!existing && !file && <label>{t.repeat}<input type="password" minLength={12} maxLength={4096} autoComplete="off" disabled={status !== 'locked'} value={repeat} onChange={event => setRepeat(event.target.value)}/></label>}
      <p>{t.warning}</p><button type="submit" className="m3s-primary-button" disabled={!canOpen}><FolderOpen size={18} aria-hidden="true"/>{busy ? t.busy : existing ? t.unlock : t.open}</button>
      {conflict && <button type="button" className="m3s-secondary-button" onClick={lock}>{t.lock}</button>}
    </form> : <>
      <div className="personal-budget-actions"><span>{t.zone} : {state.timezone}</span>
        <button type="button" className="m3s-secondary-button" onClick={backup} disabled={busy}><Download size={18} aria-hidden="true"/>{t.backup}</button>
        <button type="button" className="m3s-secondary-button" onClick={lock} disabled={busy}><LockKeyhole size={18} aria-hidden="true"/>{t.lock}</button>
      </div>
      <section className="personal-hours-work" aria-label={w.linked}>
        <form className="own-work-toolbar" onSubmit={event => { event.preventDefault(); setPending(null); setSelectedTask(''); setTaskQuery(taskSearch); setTaskRefresh(value => value + 1); }}>
          <label className="own-work-search">{w.search}<input type="search" value={taskSearch} maxLength={240} onChange={event => setTaskSearch(event.target.value)}/></label>
          <button type="submit" className="m3s-secondary-button own-work-icon" title={w.search} aria-label={w.search} disabled={busy}><Search size={18} aria-hidden="true"/></button>
          <button type="button" className="m3s-secondary-button own-work-icon" title={w.refresh} aria-label={w.refresh} disabled={busy} onClick={() => setTaskRefresh(value => value + 1)}><RefreshCw size={18} aria-hidden="true"/></button>
        </form>
        {taskSource.status === 'ready' ? <>
          <label className="personal-hours-task">{w.task}<select aria-label={w.task} value={selectedTask} disabled={busy || conflict} onChange={event => { setPending(null); setSelectedTask(event.target.value); }}>
            <option value="">{w.choose}</option>{taskSource.page.data.map(row => <option key={row.id} value={String(row.id)}>{row.reference} · {row.title}</option>)}
          </select></label>
          <p>{taskSource.page.data.length ? w.count.replace('{shown}', taskSource.page.count).replace('{total}', taskSource.page.total) : w.empty}</p>
          {work && workDetails(work)}
        </> : <p role="status">{w[taskSource.status]}</p>}
      </section>
      <form onSubmit={proposeEntry} className="personal-hours-form" aria-hidden={pending ? true : undefined} inert={pending ? true : undefined}>
        <fieldset disabled={busy || conflict}>
          {field('date', t.date, 'date', { required: true, min: '1900-01-01', max: hoursToday(zone) })}
          {field('start', t.start, 'time', { required: true })}{field('end', t.end, 'time', { required: true })}
          {field('pause', t.pause, 'number', { required: true, min: 0, max: 1439, step: 1 })}
          <label className="personal-hours-check"><input type="checkbox" checked={fields.overnight} onChange={event => setFields(previous => ({ ...previous, overnight: event.target.checked }))}/>{t.overnight}</label>
          <output>{t.duration} : {preview === null ? '\u2014' : hoursDuration(preview)}</output>
          <button type="submit" className="m3s-success-button" disabled={preview === null || !work || taskSource.status !== 'ready'}><Plus size={18} aria-hidden="true"/>{t.add}</button>
        </fieldset>
        {(fields.start || fields.end) && <small>{t.pending}</small>}
      </form>
      <div className="own-work-toolbar"><label>{t.month} <input className="m3s-field" type="month" value={month} onChange={event => setMonth(event.target.value)}/></label>
        <button type="button" className="m3s-secondary-button own-work-link" disabled={!validMonth || !entries.length} onClick={csv}><Download size={18} aria-hidden="true"/>{t.csv}</button>
      </div>
      <p>{validMonth ? `${t.total} : ${hoursDuration(entries.reduce((sum, entry) => sum + entry.minutes, 0))} · ${entries.length} ${t.records}` : t.chooseMonth}</p>
      <p>{state.entries.length} {t.all}</p>
      {entries.length ? <div className="m3s-table-shell own-work-table"><table><thead><tr>{[t.date,t.start,t.end,t.pause,t.overnight,t.duration,w.linked].map(label => <th key={label} scope="col">{label}</th>)}</tr></thead><tbody>
        {entries.map(entry => <tr key={entry.id}><td className="own-work-date">{formatRegistryDate(entry.date, language)}</td><td>{entry.start}</td><td>{entry.end}</td><td>{entry.pause}</td><td>{entry.overnight ? '+1' : '\u2014'}</td><td>{hoursDuration(entry.minutes)}</td><td>{entry.work ? <details><summary>{entry.work.task_reference}</summary><p>{entry.work.task_title} · {w.revision} {entry.work.task_revision}</p>{workDetails(entry.work)}</details> : w.legacy}</td></tr>)}
      </tbody></table></div> : validMonth && <p>{t.empty}</p>}
      <details className="personal-hours-import"><summary>{t.import}</summary><form className="personal-budget-form" onSubmit={proposeImport}>
        <label>{t.importFile}<input type="file" accept=".json,application/json" disabled={busy || conflict} onChange={event => setImportFile(event.target.files?.[0] || null)}/></label>
        <label>{t.importPhrase}<input type="password" autoComplete="off" minLength={12} maxLength={4096} disabled={busy || conflict} value={importPhrase} onChange={event => setImportPhrase(event.target.value)}/></label>
        <button type="submit" className="m3s-secondary-button" disabled={busy || conflict || !importFile || importPhrase.length < 12}><Upload size={18} aria-hidden="true"/>{t.importAction}</button>
      </form></details>
    </>}
    <details className="personal-hours-help"><summary><CircleHelp size={17} aria-hidden="true"/>{t.help}</summary><p>{t.helpText}</p><p>{w.scope}</p>
      <div className="personal-budget-actions">{onOpenTasks && <button type="button" className="m3s-secondary-button" onClick={onOpenTasks}><ArrowUpRight size={18} aria-hidden="true"/>{w.tasks}</button>}
      {onOpenRhTools && <button type="button" className="m3s-secondary-button" onClick={onOpenRhTools}><ArrowUpRight size={18} aria-hidden="true"/>{w.tools}</button>}</div>
    </details>
    {active && pending && <ActionConfirmationDialog id="own-hours-confirm" title={t.confirm} action="create" busy={busy}
      body={t.confirmBody.replace('{count}', pending.state.entries.length - state.entries.length).replace('{skipped}', pending.skipped)
        + (pending.work ? ` ${w.task} : ${pending.work.task_reference} (${w.revision} ${pending.work.task_revision}).` : '')}
      cancelLabel={t.cancel} confirmLabel={t.yes} onCancel={() => { if (!working.current) setPending(null); }} onConfirm={save}/>}
  </section>;
}
