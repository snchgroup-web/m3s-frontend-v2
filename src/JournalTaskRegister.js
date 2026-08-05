import React, { useEffect, useMemo, useState } from 'react';
import { AlertCircle, Edit2, FileText, Plus, Save, Trash2, X } from 'lucide-react';

const STORAGE_KEY = 'm3s:planning:journal-candidates:v1';

const COPY = {
  FR: {
    eyebrow: 'Pilote local - Validation humaine',
    title: 'Candidats issus du journal de bord',
    body: "Ce registre transforme une décision ou une action documentée en tâche candidate. Aucune écriture dans l'Agenda n'est effectuée automatiquement.",
    candidates: 'Candidats',
    validated: 'Validés',
    agendaReady: "Prêts pour l'Agenda",
    newTask: 'Nouvelle tâche candidate',
    editTask: 'Modifier la tâche candidate',
    sourceRule: "Une source, un responsable et une échéance explicite sont requis avant qu'une tâche validée puisse être proposée à l'Agenda.",
    titleField: 'Tâche',
    source: 'Source',
    owner: 'Responsable',
    priority: 'Priorité',
    deadline: 'Échéance',
    taskStatus: 'Statut',
    validation: 'Validation humaine',
    agenda: 'Agenda',
    actions: 'Actions',
    edit: 'Modifier',
    delete: 'Supprimer',
    cancel: 'Annuler',
    save: 'Enregistrer',
    required: 'Champ obligatoire',
    missingRequired: 'Renseignez la tâche, sa source et son responsable.',
    missingDeadline: "Une échéance explicite est requise avant de valider cette tâche.",
    confirmSave: 'Confirmer l’enregistrement de cette tâche candidate ?',
    confirmDelete: 'Supprimer cette tâche candidate du registre local ?',
    saved: 'Tâche candidate enregistrée avec succès.',
    deleted: 'Tâche candidate supprimée du registre local.',
    noTasks: 'Aucune tâche candidate.',
    sourceHint: 'Ex. Journal de bord du 04-08-2026, décision validée, compte rendu',
    ownerHint: 'Personne ou fonction responsable',
    titleHint: 'Action concrète et vérifiable',
    validationRequired: 'Validation requise',
    dateRequired: 'Date requise',
    ready: 'Prêt à proposer',
    completed: 'Terminée',
    localOnly: 'Stockage local au navigateur',
    lifecycle: {
      todo: 'À faire',
      in_progress: 'En cours',
      blocked: 'Bloquée',
      done: 'Terminée'
    },
    validations: {
      to_review: 'À valider',
      validated: 'Validée',
      rejected: 'Écartée'
    },
    priorities: {
      low: 'Basse',
      medium: 'Moyenne',
      high: 'Haute',
      urgent: 'Urgente'
    }
  },
  EN: {
    eyebrow: 'Local pilot - Human validation',
    title: 'Candidates from the work journal',
    body: 'This register turns a documented decision or action into a task candidate. Nothing is written to the Agenda automatically.',
    candidates: 'Candidates',
    validated: 'Validated',
    agendaReady: 'Ready for Agenda',
    newTask: 'New task candidate',
    editTask: 'Edit task candidate',
    sourceRule: 'A source, an owner and an explicit deadline are required before a validated task can be proposed to the Agenda.',
    titleField: 'Task',
    source: 'Source',
    owner: 'Owner',
    priority: 'Priority',
    deadline: 'Deadline',
    taskStatus: 'Status',
    validation: 'Human validation',
    agenda: 'Agenda',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    save: 'Save',
    required: 'Required field',
    missingRequired: 'Enter the task, its source and its owner.',
    missingDeadline: 'An explicit deadline is required before validating this task.',
    confirmSave: 'Confirm saving this task candidate?',
    confirmDelete: 'Delete this task candidate from the local register?',
    saved: 'Task candidate saved successfully.',
    deleted: 'Task candidate removed from the local register.',
    noTasks: 'No task candidates.',
    sourceHint: 'E.g. 04-08-2026 work journal, approved decision, meeting notes',
    ownerHint: 'Responsible person or function',
    titleHint: 'Concrete and verifiable action',
    validationRequired: 'Validation required',
    dateRequired: 'Date required',
    ready: 'Ready to propose',
    completed: 'Completed',
    localOnly: 'Stored locally in this browser',
    lifecycle: {
      todo: 'To do',
      in_progress: 'In progress',
      blocked: 'Blocked',
      done: 'Completed'
    },
    validations: {
      to_review: 'To review',
      validated: 'Validated',
      rejected: 'Rejected'
    },
    priorities: {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      urgent: 'Urgent'
    }
  },
  DE: {
    eyebrow: 'Lokaler Pilot - Menschliche Freigabe',
    title: 'Kandidaten aus dem Arbeitsjournal',
    body: 'Dieses Register überführt eine dokumentierte Entscheidung oder Maßnahme in einen Aufgabenkandidaten. Es erfolgt kein automatischer Eintrag in die Agenda.',
    candidates: 'Kandidaten',
    validated: 'Freigegeben',
    agendaReady: 'Für Agenda bereit',
    newTask: 'Neuer Aufgabenkandidat',
    editTask: 'Aufgabenkandidat bearbeiten',
    sourceRule: 'Quelle, Verantwortung und eine eindeutige Frist sind erforderlich, bevor eine freigegebene Aufgabe der Agenda vorgeschlagen werden kann.',
    titleField: 'Aufgabe',
    source: 'Quelle',
    owner: 'Verantwortlich',
    priority: 'Priorität',
    deadline: 'Frist',
    taskStatus: 'Status',
    validation: 'Menschliche Freigabe',
    agenda: 'Agenda',
    actions: 'Aktionen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    cancel: 'Abbrechen',
    save: 'Speichern',
    required: 'Pflichtfeld',
    missingRequired: 'Aufgabe, Quelle und Verantwortung müssen ausgefüllt werden.',
    missingDeadline: 'Vor der Freigabe ist eine eindeutige Frist erforderlich.',
    confirmSave: 'Speichern dieses Aufgabenkandidaten bestätigen?',
    confirmDelete: 'Diesen Aufgabenkandidaten aus dem lokalen Register löschen?',
    saved: 'Aufgabenkandidat wurde erfolgreich gespeichert.',
    deleted: 'Aufgabenkandidat wurde aus dem lokalen Register gelöscht.',
    noTasks: 'Keine Aufgabenkandidaten vorhanden.',
    sourceHint: 'Z. B. Arbeitsjournal vom 04.08.2026, freigegebene Entscheidung, Protokoll',
    ownerHint: 'Verantwortliche Person oder Funktion',
    titleHint: 'Konkrete und überprüfbare Maßnahme',
    validationRequired: 'Freigabe erforderlich',
    dateRequired: 'Datum erforderlich',
    ready: 'Vorschlagsbereit',
    completed: 'Abgeschlossen',
    localOnly: 'Lokal in diesem Browser gespeichert',
    lifecycle: {
      todo: 'Zu erledigen',
      in_progress: 'In Bearbeitung',
      blocked: 'Blockiert',
      done: 'Abgeschlossen'
    },
    validations: {
      to_review: 'Zu prüfen',
      validated: 'Freigegeben',
      rejected: 'Verworfen'
    },
    priorities: {
      low: 'Niedrig',
      medium: 'Mittel',
      high: 'Hoch',
      urgent: 'Dringend'
    }
  }
};

const SEED_TASKS = [
  {
    id: 'journal-20260804-pr31',
    title: {
      FR: 'Valider le micro-correctif P2 des bordures en mode clair',
      EN: 'Validate the P2 light-mode border micro-fix',
      DE: 'P2-Mikrokorrektur der Rahmen im hellen Modus freigeben'
    },
    source: 'M3S_JOURNAL_DE_BORD_2026-08-04.md - PR #31',
    owner: 'Cheikh',
    priority: 'high',
    deadline: '',
    taskStatus: 'todo',
    validationStatus: 'to_review'
  },
  {
    id: 'journal-20260804-villa-control',
    title: {
      FR: "Contrôler l'étanchéité des avants Villa LR1 avant réception",
      EN: 'Check Villa LR1 window-awning watertightness before acceptance',
      DE: 'Dichtheit der Fenstervordächer von Villa LR1 vor Abnahme prüfen'
    },
    source: 'M3S_JOURNAL_DE_BORD_2026-08-04.md - preuves terrain',
    owner: 'Ibou / Cheikh',
    priority: 'urgent',
    deadline: '',
    taskStatus: 'in_progress',
    validationStatus: 'to_review'
  },
  {
    id: 'journal-20260804-ria-reconcile',
    title: {
      FR: 'Rapprocher les transferts groupés et leurs affectations finales',
      EN: 'Reconcile grouped transfers and their final allocations',
      DE: 'Sammelüberweisungen und endgültige Zuordnungen abstimmen'
    },
    source: 'M3S_JOURNAL_DE_BORD_2026-08-04.md - suivi financier restreint',
    owner: 'Cheikh / Ibou',
    priority: 'high',
    deadline: '',
    taskStatus: 'in_progress',
    validationStatus: 'to_review'
  },
  {
    id: 'journal-20260804-property-test',
    title: {
      FR: 'Préparer la fiche papier du micro-test Gestion d’immeubles',
      EN: 'Prepare the paper brief for the Property Management micro-test',
      DE: 'Papier-Steckbrief für den Mikrotest Immobilienverwaltung vorbereiten'
    },
    source: 'M3S_JOURNAL_DE_BORD_2026-08-04.md - trajectoire stratégique',
    owner: 'Cheikh / Codex',
    priority: 'medium',
    deadline: '',
    taskStatus: 'todo',
    validationStatus: 'to_review'
  }
];

const emptyForm = {
  title: '',
  source: '',
  owner: '',
  priority: 'medium',
  deadline: '',
  taskStatus: 'todo',
  validationStatus: 'to_review'
};

const readLocalTasks = () => {
  if (typeof window === 'undefined') return SEED_TASKS;
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return Array.isArray(stored) ? stored : SEED_TASKS;
  } catch (error) {
    return SEED_TASKS;
  }
};

const getTitle = (task, language) => {
  if (typeof task.title === 'string') return task.title;
  return task.title?.[language] || task.title?.FR || task.title?.EN || task.title?.DE || '';
};

const getAgendaState = (task) => {
  if (task.taskStatus === 'done') return 'completed';
  if (task.validationStatus !== 'validated') return 'validationRequired';
  if (!task.deadline) return 'dateRequired';
  return 'ready';
};

const agendaTone = {
  completed: 'border-slate-600 bg-slate-800 text-slate-300',
  validationRequired: 'border-amber-700 bg-amber-950/40 text-amber-200',
  dateRequired: 'border-red-700 bg-red-950/40 text-red-200',
  ready: 'border-emerald-700 bg-emerald-950/40 text-emerald-200'
};

const FieldLabel = ({ children, required, requiredLabel }) => (
  <span className="mb-2 block text-sm font-semibold text-slate-200">
    {children} {required && <span className="text-red-300" title={requiredLabel}>*</span>}
  </span>
);

const JournalTaskRegister = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const [tasks, setTasks] = useState(readLocalTasks);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const metrics = useMemo(() => ({
    total: tasks.length,
    validated: tasks.filter(task => task.validationStatus === 'validated').length,
    agendaReady: tasks.filter(task => getAgendaState(task) === 'ready').length
  }), [tasks]);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (task) => {
    setEditingId(task.id);
    setForm({
      title: getTitle(task, language),
      source: task.source || '',
      owner: task.owner || '',
      priority: task.priority || 'medium',
      deadline: task.deadline || '',
      taskStatus: task.taskStatus || 'todo',
      validationStatus: task.validationStatus || 'to_review'
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const saveTask = () => {
    if (!form.title.trim() || !form.source.trim() || !form.owner.trim()) {
      window.alert(t.missingRequired);
      return;
    }
    if (form.validationStatus === 'validated' && !form.deadline) {
      window.alert(t.missingDeadline);
      return;
    }
    if (!window.confirm(t.confirmSave)) return;

    if (editingId) {
      setTasks(current => current.map(task => {
        if (task.id !== editingId) return task;
        const title = typeof task.title === 'object'
          ? { ...task.title, [language]: form.title.trim() }
          : form.title.trim();
        return { ...task, ...form, title };
      }));
    } else {
      setTasks(current => [{
        ...form,
        id: `journal-${Date.now()}`,
        title: { [language]: form.title.trim() },
        source: form.source.trim(),
        owner: form.owner.trim()
      }, ...current]);
    }
    closeForm();
    window.alert(t.saved);
  };

  const deleteTask = (task) => {
    if (!window.confirm(t.confirmDelete)) return;
    setTasks(current => current.filter(item => item.id !== task.id));
    window.alert(t.deleted);
  };

  const renderAgenda = (task) => {
    const state = getAgendaState(task);
    return (
      <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${agendaTone[state]}`}>
        {t[state]}
      </span>
    );
  };

  return (
    <section id="planning-journal-register" className="scroll-mt-20 rounded-lg border border-cyan-700/70 bg-slate-800 p-5" aria-labelledby="planning-journal-title">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase text-cyan-300">{t.eyebrow}</p>
          <h3 id="planning-journal-title" className="mt-2 text-xl font-bold text-white">{t.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <button type="button" onClick={openNew} style={{ color: '#fff' }} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400">
          <Plus size={18} color="#fff" aria-hidden="true" /> <span style={{ color: '#fff' }}>{t.newTask}</span>
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-700 bg-slate-950/30 p-4">
          <p className="text-xs font-semibold uppercase text-slate-400">{t.candidates}</p>
          <p className="mt-2 text-2xl font-bold text-white">{metrics.total}</p>
        </div>
        <div className="rounded-lg border border-blue-700/70 bg-blue-950/25 p-4">
          <p className="text-xs font-semibold uppercase text-blue-200">{t.validated}</p>
          <p className="mt-2 text-2xl font-bold text-white">{metrics.validated}</p>
        </div>
        <div className="rounded-lg border border-emerald-700/70 bg-emerald-950/25 p-4">
          <p className="text-xs font-semibold uppercase text-emerald-200">{t.agendaReady}</p>
          <p className="mt-2 text-2xl font-bold text-white">{metrics.agendaReady}</p>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-700/70 bg-amber-950/30 p-4 text-amber-100">
        <AlertCircle className="mt-0.5 shrink-0" size={19} aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold">{t.sourceRule}</p>
          <p className="mt-1 text-xs text-amber-200">{t.localOnly}</p>
        </div>
      </div>

      <div className="mt-5 hidden overflow-hidden rounded-lg border border-slate-700 lg:block">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-sm">
            <colgroup>
              <col className="w-[31%]" />
              <col className="w-[13%]" />
              <col className="w-[10%]" />
              <col className="w-[11%]" />
              <col className="w-[13%]" />
              <col className="w-[14%]" />
              <col className="w-[8%]" />
            </colgroup>
            <thead className="bg-slate-950/60">
              <tr>
                <th className="px-3 py-3 text-left font-bold text-white">{t.titleField}</th>
                <th className="px-3 py-3 text-left font-bold text-white">{t.owner}</th>
                <th className="px-3 py-3 text-left font-bold text-white">{t.priority}</th>
                <th className="px-3 py-3 text-left font-bold text-white">{t.deadline}</th>
                <th className="px-3 py-3 text-left font-bold text-white">{t.validation}</th>
                <th className="px-3 py-3 text-left font-bold text-white">{t.agenda}</th>
                <th className="px-3 py-3 text-right font-bold text-white">{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id} className="border-t border-slate-700 align-top hover:bg-slate-700/40">
                  <td className="break-words px-3 py-3">
                    <p className="font-semibold text-white">{getTitle(task, language)}</p>
                    <p className="mt-1 flex items-start gap-1.5 break-all text-xs leading-5 text-slate-400"><FileText className="mt-0.5 shrink-0" size={13} aria-hidden="true" />{task.source}</p>
                  </td>
                  <td className="break-words px-3 py-3 text-slate-200">{task.owner}</td>
                  <td className="break-words px-3 py-3 text-slate-300">{t.priorities[task.priority]}</td>
                  <td className="break-words px-3 py-3 text-slate-300">{task.deadline || '—'}</td>
                  <td className="break-words px-3 py-3 text-slate-300">{t.validations[task.validationStatus]}</td>
                  <td className="px-3 py-3">{renderAgenda(task)}</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-col items-end gap-2 xl:flex-row xl:justify-end">
                      <button type="button" onClick={() => openEdit(task)} title={t.edit} aria-label={`${t.edit} : ${getTitle(task, language)}`} className="rounded-md border border-blue-700 bg-blue-950/40 p-2 text-blue-200 hover:bg-blue-900/60">
                        <Edit2 size={16} aria-hidden="true" />
                      </button>
                      <button type="button" onClick={() => deleteTask(task)} title={t.delete} aria-label={`${t.delete} : ${getTitle(task, language)}`} className="rounded-md border border-red-700 bg-red-950/40 p-2 text-red-200 hover:bg-red-900/60">
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 grid gap-3 lg:hidden">
        {tasks.map(task => (
          <article key={task.id} className="rounded-lg border border-slate-700 bg-slate-950/30 p-4">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between">
              <h4 className="min-w-0 flex-1 break-words font-bold leading-6 text-white">{getTitle(task, language)}</h4>
              <div className="shrink-0">{renderAgenda(task)}</div>
            </div>
            <p className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-slate-400"><FileText className="mt-0.5 shrink-0" size={13} aria-hidden="true" />{task.source}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div><dt className="text-xs font-semibold uppercase text-slate-500">{t.owner}</dt><dd className="mt-1 text-slate-200">{task.owner}</dd></div>
              <div><dt className="text-xs font-semibold uppercase text-slate-500">{t.priority}</dt><dd className="mt-1 text-slate-200">{t.priorities[task.priority]}</dd></div>
              <div><dt className="text-xs font-semibold uppercase text-slate-500">{t.deadline}</dt><dd className="mt-1 text-slate-200">{task.deadline || '—'}</dd></div>
              <div><dt className="text-xs font-semibold uppercase text-slate-500">{t.validation}</dt><dd className="mt-1 text-slate-200">{t.validations[task.validationStatus]}</dd></div>
            </dl>
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={() => openEdit(task)} aria-label={`${t.edit} : ${getTitle(task, language)}`} className="rounded-md border border-blue-700 bg-blue-950/40 p-2 text-blue-200"><Edit2 size={17} aria-hidden="true" /></button>
              <button type="button" onClick={() => deleteTask(task)} aria-label={`${t.delete} : ${getTitle(task, language)}`} className="rounded-md border border-red-700 bg-red-950/40 p-2 text-red-200"><Trash2 size={17} aria-hidden="true" /></button>
            </div>
          </article>
        ))}
      </div>

      {tasks.length === 0 && <p className="mt-5 rounded-lg border border-dashed border-slate-600 p-6 text-center text-slate-400">{t.noTasks}</p>}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4" role="dialog" aria-modal="true" aria-labelledby="journal-task-form-title">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-slate-600 bg-slate-800 shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-700 bg-slate-800 px-5 py-4">
              <h3 id="journal-task-form-title" className="text-lg font-bold text-white">{editingId ? t.editTask : t.newTask}</h3>
              <button type="button" onClick={closeForm} aria-label={t.cancel} className="rounded-md p-2 text-slate-300 hover:bg-slate-700 hover:text-white"><X size={20} aria-hidden="true" /></button>
            </div>
            <div className="grid gap-4 p-5 md:grid-cols-2">
              <label className="md:col-span-2">
                <FieldLabel required requiredLabel={t.required}>{t.titleField}</FieldLabel>
                <input value={form.title} onChange={event => setForm(current => ({ ...current, title: event.target.value }))} placeholder={t.titleHint} className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
              </label>
              <label className="md:col-span-2">
                <FieldLabel required requiredLabel={t.required}>{t.source}</FieldLabel>
                <input value={form.source} onChange={event => setForm(current => ({ ...current, source: event.target.value }))} placeholder={t.sourceHint} className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
              </label>
              <label>
                <FieldLabel required requiredLabel={t.required}>{t.owner}</FieldLabel>
                <input value={form.owner} onChange={event => setForm(current => ({ ...current, owner: event.target.value }))} placeholder={t.ownerHint} className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
              </label>
              <label>
                <FieldLabel>{t.deadline}</FieldLabel>
                <input type="date" value={form.deadline} onChange={event => setForm(current => ({ ...current, deadline: event.target.value }))} className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2.5 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
              </label>
              <label>
                <FieldLabel>{t.priority}</FieldLabel>
                <select value={form.priority} onChange={event => setForm(current => ({ ...current, priority: event.target.value }))} className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2.5 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                  {Object.entries(t.priorities).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <label>
                <FieldLabel>{t.taskStatus}</FieldLabel>
                <select value={form.taskStatus} onChange={event => setForm(current => ({ ...current, taskStatus: event.target.value }))} className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2.5 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                  {Object.entries(t.lifecycle).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <label className="md:col-span-2">
                <FieldLabel>{t.validation}</FieldLabel>
                <select value={form.validationStatus} onChange={event => setForm(current => ({ ...current, validationStatus: event.target.value }))} className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2.5 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                  {Object.entries(t.validations).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
            </div>
            <div className="flex flex-col-reverse gap-3 border-t border-slate-700 px-5 py-4 sm:flex-row sm:justify-end">
              <button type="button" onClick={closeForm} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-600"><X size={17} aria-hidden="true" />{t.cancel}</button>
              <button type="button" onClick={saveTask} style={{ color: '#fff' }} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600"><Save size={17} color="#fff" aria-hidden="true" /><span style={{ color: '#fff' }}>{t.save}</span></button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export { STORAGE_KEY };
export default JournalTaskRegister;
