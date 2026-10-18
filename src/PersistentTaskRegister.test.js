import React from 'react';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import PersistentTaskRegister from './PersistentTaskRegister';
import api from './api';
import { testTask, testTaskReferences } from './taskContractFixtures';

jest.mock('./identityClient', () => ({ currentAccessToken: jest.fn(), signOutIdentity: jest.fn() }));
jest.mock('./api', () => ({ ...jest.requireActual('./api'), __esModule: true, default: {
  getTasks: jest.fn(), getTasksCount: jest.fn(), getTasksAccess: jest.fn(), getTaskReferences: jest.fn(), createTask: jest.fn(), updateTask: jest.fn()
} }));
const task = { ...testTask(), id: 'server-task', reference: 'PLAN-001', title: 'Action serveur', status: 'in_progress', priority: 'normal',
  responsable: 'Equipe', module: 'ADMINISTRATION', progression: 30, due_date: null,
  revision: 3, source_kind: 'operational', can_edit: true };
const historical = { ...task, id: 'history-1', title: 'Action historique', source_kind: 'historical', can_edit: false };
const list = (data = [historical, task], extra = {}) => ({ success: true, data, count: data.length, limit: 25, offset: 0, total: data.length,
  operational_available: true, coverage: 'historical_and_current_account', ...extra });
const summary = { success: true, total: 205, open: 150, completed: 50, blocked: 5, cancelled: 5,
  historical_total: 200, operational_total: 5, operational_available: true, coverage: 'historical_and_current_account' };
const deferred = () => { let resolve; const promise = new Promise(done => { resolve = done; }); return { promise, resolve }; };
beforeEach(() => {
  jest.clearAllMocks();
  api.getTasks.mockResolvedValue(list());
  api.getTasksCount.mockResolvedValue(summary);
  api.getTasksAccess.mockResolvedValue({ success: true, enabled: true, can_read: true, can_write: true, scope: 'current_account',
    contract_version: task.contract_version, client_contract_compatible: true });
  api.getTaskReferences.mockResolvedValue(testTaskReferences());
  api.createTask.mockImplementation(async fields => ({ success: true, data: { ...task, ...fields } }));
  api.updateTask.mockResolvedValue({ success: true, data: { ...task, revision: 4 } });
});
const show = props => render(<><h3 id="planning-register">Registre</h3><PersistentTaskRegister {...props} /></>);
const ready = () => screen.findByRole('button', { name: 'Modifier tâche : Action serveur' });
const change = (label, value) => fireEvent.change(screen.getByLabelText(label), { target: { value } });
const start = async () => {
  await ready(); fireEvent.click(screen.getByRole('button', { name: 'Nouvelle tâche' }));
  change('Référence stable *', 'PLAN-NEW-001'); change('Tâche *', 'Action nouvelle');
  change('Résultat attendu *', 'Resultat test'); change('Phase du projet', 'phase-test'); change('Affectation validée', 'assignment-test');
};
const propose = () => fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
const confirm = () => fireEvent.click(screen.getByRole('button', { name: /Oui, (ajouter|modifier)/ }));

test('historical register stays read only, real server total is propagated and no delete is offered', async () => {
  const onSummaryChange = jest.fn(); show({ onSummaryChange }); await ready();
  expect(onSummaryChange).toHaveBeenLastCalledWith(summary, 'ready');
  const historyRow = screen.getByText('Action historique').closest('tr');
  expect(within(historyRow).queryByRole('button')).not.toBeInTheDocument();
  fireEvent.click(historyRow); expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /Supprimer/ })).not.toBeInTheDocument();
});

test('create needs confirmation, waits for the server, then rereads list and count and emits one event', async () => {
  const pending = deferred(), changed = jest.fn(), onSummaryChange = jest.fn();
  window.addEventListener('m3s:tasks-changed', changed);
  api.createTask.mockReturnValueOnce(pending.promise);
  show({ onSummaryChange }); await start();
  change('Progression (%)', 43); change('Statut', 'done'); change('Échéance', '2026-12-15');
  change('Source d’origine unitaire', 'correspondence'); change('Source d’origine unitaire · Référence stable', 'COURRIER-12');
  propose(); expect(api.createTask).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Non' }));
  expect(screen.getByLabelText('Tâche *')).toHaveValue('Action nouvelle');
  propose(); confirm();
  expect(api.createTask).toHaveBeenCalledTimes(1);
  expect(api.createTask.mock.calls[0][0]).toMatchObject({ reference: 'PLAN-NEW-001', status: 'done', progression: 43, due_date: '2026-12-15', source_origin: { kind: 'correspondence', reference: 'COURRIER-12' } });
  expect(screen.queryByText('Tâche enregistrée sur le serveur.')).not.toBeInTheDocument();
  expect(changed).not.toHaveBeenCalled();
  api.getTasks.mockResolvedValue(list([{ ...task, title: 'Action relue' }]));
  api.getTasksCount.mockResolvedValue({ ...summary, total: 206 });
  await act(async () => pending.resolve({ success: true, data: task }));
  await screen.findByText('Tâche enregistrée sur le serveur.');
  expect(screen.getByText('Action relue')).toBeInTheDocument();
  expect(api.getTasks).toHaveBeenCalledTimes(2); expect(api.getTasksCount).toHaveBeenCalledTimes(2);
  expect(onSummaryChange).toHaveBeenLastCalledWith(expect.objectContaining({ total: 206 }), 'ready');
  expect(changed).toHaveBeenCalledTimes(1);
  window.removeEventListener('m3s:tasks-changed', changed);
});

test('edit keeps reference immutable, sends expected revision, and cancels through status without forcing progression', async () => {
  show(); fireEvent.click(await ready());
  expect(screen.getByLabelText('Référence stable *')).toHaveAttribute('readonly');
  change('Statut', 'cancelled'); change('Progression (%)', 37);
  propose(); confirm(); await screen.findByText('Tâche enregistrée sur le serveur.');
  const [id, payload] = api.updateTask.mock.calls[0];
  expect(id).toBe(task.id); expect(payload.expected_revision).toBe(3);
  expect(payload.task).toMatchObject({ status: 'cancelled', progression: 37 });
  expect(payload.task).not.toHaveProperty('reference');
});

test.each([
  ['TASK_CONFLICT', /La tâche a changé/], ['TASK_DUPLICATE_REFERENCE', /Cette référence existe/],
  ['TASK_POTENTIAL_HISTORICAL_DUPLICATE', /Doublon historique possible/], ['TASK_SOURCE_UNAVAILABLE', /Source de tâches indisponible/],
  ['TASK_FORBIDDEN', /Enregistrement refusé/], ['TASK_INVALID', /Champs invalides/]
])('%s preserves the form without reporting success', async (code, message) => {
  api.createTask.mockRejectedValueOnce(Object.assign(new Error(), { code }));
  show(); await start(); propose(); confirm();
  expect(await screen.findByRole('alert')).toHaveTextContent(message);
  expect(screen.getByLabelText('Tâche *')).toHaveValue('Action nouvelle');
  expect(screen.getByLabelText('Référence stable *')).toHaveValue('PLAN-NEW-001');
  expect(screen.queryByText('Tâche enregistrée sur le serveur.')).not.toBeInTheDocument();
  expect(api.getTasksCount).toHaveBeenCalledTimes(1);
});

test('unknown create outcome freezes the payload and only explicitly replays the exact same request', async () => {
  api.createTask.mockRejectedValueOnce(new Error('offline'));
  show(); await start(); propose(); confirm();
  await screen.findByText(/Résultat réseau non confirmé/);
  expect(screen.getByLabelText('Tâche *')).toBeDisabled();
  expect(api.createTask).toHaveBeenCalledTimes(1);
  api.createTask.mockResolvedValueOnce({ success: true, data: task, replayed: true });
  fireEvent.click(screen.getByRole('button', { name: 'Reprendre la même demande' })); confirm();
  await screen.findByText('Enregistrement déjà confirmé par le serveur.');
  expect(api.createTask.mock.calls[1][0]).toEqual(api.createTask.mock.calls[0][0]);
});

test('a revision conflict cannot be submitted blindly again', async () => {
  api.updateTask.mockRejectedValueOnce(Object.assign(new Error(), { code: 'TASK_CONFLICT' }));
  show(); fireEvent.click(await ready()); change('Tâche *', 'Mes changements'); propose(); confirm();
  await screen.findByText(/La tâche a changé/);
  change('Tâche *', 'Toujours conservés');
  expect(screen.getByRole('button', { name: 'Enregistrer' })).toBeDisabled();
  expect(api.updateTask).toHaveBeenCalledTimes(1);
});

test('an uncertain PUT can only explicitly replay its frozen revision and exact payload', async () => {
  api.updateTask.mockRejectedValueOnce(new Error('lost reply'));
  show(); fireEvent.click(await ready()); change('Tâche *', 'Modification en attente'); propose(); confirm();
  await screen.findByText(/Résultat réseau non confirmé/);
  expect(screen.getByLabelText('Tâche *')).toBeDisabled();
  expect(api.updateTask).toHaveBeenCalledTimes(1);
  api.updateTask.mockResolvedValueOnce({ success: true, data: { ...task, revision: 4 }, replayed: true });
  fireEvent.click(screen.getByRole('button', { name: 'Reprendre la même demande' })); confirm();
  await screen.findByText('Enregistrement déjà confirmé par le serveur.');
  expect(api.updateTask.mock.calls[1].slice(0, 2)).toEqual(api.updateTask.mock.calls[0].slice(0, 2));
});

test.each([
  { enabled: false, can_read: false, can_write: false },
  { enabled: true, can_read: true, can_write: false },
  { enabled: true, can_read: false, can_write: true }
])('access fails closed but never hides authenticated historical rows: %p', async rights => {
  api.getTasksAccess.mockResolvedValue({ success: true, scope: 'current_account', ...rights });
  show(); await screen.findByText('Action historique');
  expect(screen.getByRole('button', { name: 'Nouvelle tâche' })).toBeDisabled();
  expect(screen.queryByRole('button', { name: 'Modifier tâche : Action serveur' })).not.toBeInTheDocument();
});

test('missing schema shows historical-only coverage, not a current-account zero', async () => {
  api.getTasks.mockResolvedValue(list([historical], { operational_available: false, coverage: 'historical_only' }));
  api.getTasksAccess.mockResolvedValue({ success: true, enabled: false, can_read: false, can_write: false, scope: 'current_account' });
  const onSummaryChange = jest.fn();
  api.getTasksCount.mockResolvedValue({ ...summary, total: 200, operational_total: null, operational_available: false, coverage: 'historical_only' });
  show({ onSummaryChange }); await screen.findByText(/Périmètre : historique uniquement/);
  expect(onSummaryChange).toHaveBeenLastCalledWith(expect.objectContaining({ operational_total: null }), 'ready');
  expect(screen.getByRole('button', { name: 'Nouvelle tâche' })).toBeDisabled();
});

test('search and pagination go to the server, not only the loaded page', async () => {
  api.getTasks.mockResolvedValue(list([task], { total: 205 }));
  show(); await ready(); fireEvent.click(screen.getByRole('button', { name: 'Page suivante' }));
  await waitFor(() => expect(api.getTasks).toHaveBeenLastCalledWith(25, 25, '', expect.any(Object)));
  await ready(); fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'hors page' } }); fireEvent.click(screen.getByRole('button', { name: 'Rechercher dans les tâches' }));
  await waitFor(() => expect(api.getTasks).toHaveBeenLastCalledWith(25, 0, 'hors page', expect.any(Object)));
});

test('failed read-back after confirmed write reports a partial refresh, never optimistic counts', async () => {
  const onSummaryChange = jest.fn(); show({ onSummaryChange }); await start();
  api.getTasksCount.mockRejectedValueOnce(new Error('unavailable'));
  propose(); confirm(); await screen.findByText(/Enregistrement confirmé ; relecture incomplète/);
  expect(onSummaryChange).toHaveBeenLastCalledWith(null, 'unavailable');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('required reference and bounded progression keep save disabled', async () => {
  show(); await ready(); fireEvent.click(screen.getByRole('button', { name: 'Nouvelle tâche' }));
  change('Tâche *', 'Titre'); expect(screen.getByRole('button', { name: 'Enregistrer' })).toBeDisabled();
  change('Référence stable *', 'PLAN-VALID'); change('Progression (%)', 101);
  expect(screen.getByRole('button', { name: 'Enregistrer' })).toBeDisabled();
  change('Résultat attendu *', 'Resultat test'); change('Phase du projet', 'phase-test'); change('Affectation validée', 'assignment-test');
  change('Progression (%)', 0); change('Statut', 'done');
  expect(screen.getByRole('button', { name: 'Enregistrer' })).toBeEnabled();
});

test.each([['DE', 'Neue Aufgabe', 'Aufgabe bearbeiten : Action serveur'], ['EN', 'New task', 'Edit task : Action serveur']])('renders %s controls without losing existing data', async (language, add, edit) => {
  show({ language }); expect(await screen.findByRole('button', { name: edit })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: add })).toBeEnabled();
});

test('unmount aborts reads and ignores late results', async () => {
  const pending = deferred(), onSummaryChange = jest.fn(); api.getTasks.mockReturnValueOnce(pending.promise);
  const view = show({ onSummaryChange }); const signal = api.getTasks.mock.calls[0][3].signal;
  view.unmount(); expect(signal.aborted).toBe(true);
  await act(async () => pending.resolve(list()));
  expect(onSummaryChange).toHaveBeenCalledTimes(1);
});

test('real documentary references remain visible without executable assignments or write access', async () => {
  const refs = testTaskReferences();
  refs.writes_enabled = false; refs.execution_catalogue_ready = false; refs.missing = ['project_phases', 'governed_assignments'];
  refs.sources.dossiers.data = [{ id: 'DOS-TEST', label: 'Dossier documentaire test' }];
  api.getTaskReferences.mockResolvedValue(refs);
  show(); await screen.findByText(/Référentiels d’exécution incomplets/);
  expect(screen.getByText('Dossier documentaire test')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Nouvelle tâche' })).toBeDisabled();
  expect(api.createTask).not.toHaveBeenCalled();
});

test('changing phase clears a mismatched activity and operation branch clears all project parents', async () => {
  show(); await start();
  change('Activité', 'activity-test'); change('Phase du projet', 'phase-other');
  expect(screen.getByLabelText('Activité')).toHaveValue('');
  change('Cadre d’exécution', 'operation');
  expect(screen.queryByLabelText('Phase du projet')).not.toBeInTheDocument();
  change('Plan opérationnel', 'plan-test'); change('Modèle récurrent', 'recurrence-test');
  expect(screen.getByRole('button', { name: 'Enregistrer' })).toBeDisabled();
  change('Occurrence', '2026-11'); propose(); confirm();
  await screen.findByText('Tâche enregistrée sur le serveur.');
  expect(api.createTask.mock.calls[0][0].execution_context).toEqual({ execution_kind: 'operation',
    phase_id: null, activity_id: null, operational_plan_id: 'plan-test', recurrence_id: 'recurrence-test', occurrence_key: '2026-11' });
});

test('editing locks the execution context and unit origin while evidence links remain editable', async () => {
  show(); fireEvent.click(await ready());
  expect(screen.getByLabelText('Cadre d’exécution')).toBeDisabled();
  expect(screen.getByLabelText('Phase du projet')).toBeDisabled();
  expect(screen.getByLabelText('Source d’origine unitaire')).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'Ajouter une référence' }));
  change('Références des preuves 1 · Référence stable', 'GED-TEST');
  propose(); confirm(); await screen.findByText('Tâche enregistrée sur le serveur.');
  expect(api.updateTask.mock.calls[0][1].task.source_links).toEqual([{ kind: 'ged', reference: 'GED-TEST' }]);
});

test('reference failure or an old server keeps history accessible and creation closed', async () => {
  api.getTaskReferences.mockRejectedValueOnce(new Error('unavailable'));
  show(); await screen.findByText('Action historique');
  expect(screen.getByRole('button', { name: 'Nouvelle tâche' })).toBeDisabled();
});
