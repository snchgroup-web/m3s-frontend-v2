import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import OwnTaskRegister from './OwnTaskRegister';
import { TASK_REGISTER_COPY } from './PersistentTaskRegister';
import api from './api';
import { testTask } from './taskContractFixtures';
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({ useNavigate: () => mockNavigate }), { virtual: true });
jest.mock('./api', () => ({ __esModule: true, default: { getOwnTasks: jest.fn() } }));
const row = { ...testTask(), id: 'task-test', phase_id: 'phase-test', revision: 2 };
const page = { data: [row], total: 1, count: 1 };
beforeEach(() => { jest.clearAllMocks(); api.getOwnTasks.mockResolvedValue(page); });

test('a Production reference prefilters only the existing own-task reader, with no write', async () => {
  render(<OwnTaskRegister initialSearch="TAC-PROD-OUTILS-20261019-001"/>);
  await screen.findByText(row.title);
  expect(screen.getByRole('searchbox')).toHaveValue('TAC-PROD-OUTILS-20261019-001');
  expect(api.getOwnTasks).toHaveBeenCalledWith(25, 0, 'TAC-PROD-OUTILS-20261019-001', expect.anything());
  expect(Object.keys(api)).toEqual(['getOwnTasks']);
});
test.each([['FR','Mes tâches','En cours','12-11-26'],['DE','Meine Aufgaben','In Bearbeitung','12.11.26'],['EN','My tasks','In progress','12/11/26']])('reads own tasks with %s labels and dates, without mutations', async (language,title,status,date) => {
  api.getOwnTasks.mockResolvedValue({ ...page, data: [{ ...row, status: 'in_progress' }] });
  render(<OwnTaskRegister language={language}/>);
  expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  expect(await screen.findByText(row.title)).toBeInTheDocument();
  expect(screen.getByText(status)).toBeInTheDocument(); expect(screen.getByText(date)).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /Modifier|bearbeiten|Edit task|Nouvelle tâche/ })).not.toBeInTheDocument();
  expect(api.getOwnTasks).toHaveBeenCalledWith(25,0,'',expect.objectContaining({signal:expect.anything()}));
});

test.each([
  ['FR', ['Tâche','Statut','Priorité','Responsable','Module','Progression','Échéance','Source','Actions'], 'Administration'],
  ['DE', ['Aufgabe','Status','Priorität','Verantwortlich','Modul','Fortschritt','Frist','Quelle','Aktionen'], 'Verwaltung'],
  ['EN', ['Task','Status','Priority','Owner','Module','Progress','Due date','Source','Actions'], 'Administration']
])('%s uses the shared task columns, values and read-only details', async (language, headers, module) => {
  const record = { ...row, responsable: 'Synthetic owner', source_kind: 'operational', progression: 0,
    related_reference: 'GD-QA-001', project_id: 'PROJECT-QA',
    execution_context: { ...row.execution_context, phase_id: 'PHASE-QA', activity_id: 'ACTIVITY-QA' } };
  const before = JSON.stringify(record);
  api.getOwnTasks.mockResolvedValue({ ...page, data: [record] });
  render(<OwnTaskRegister language={language}/>); await screen.findByText(row.title);
  expect(screen.getAllByRole('columnheader').map(header => header.textContent)).toEqual(headers);
  const cells = within(screen.getByText(row.title).closest('tr')).getAllByRole('cell');
  expect(cells).toHaveLength(headers.length);
  expect(cells[3]).toHaveTextContent('Synthetic owner'); expect(cells[4]).toHaveTextContent(module);
  expect(cells[5]).toHaveTextContent('0%'); expect(cells[7]).toHaveTextContent(TASK_REGISTER_COPY[language].operational);
  expect(cells[6]).toHaveClass('own-work-date');
  const opener = within(cells[8]).getByRole('button'); opener.focus(); fireEvent.click(opener);
  const details = screen.getByRole('dialog', { name: row.title });
  expect(details.closest('table')).toBeNull();
  expect(within(details).getByText('PROJECT-QA')).toBeInTheDocument();
  expect(within(details).getByText('PHASE-QA')).toBeInTheDocument();
  expect(within(details).getByText('ACTIVITY-QA')).toBeInTheDocument();
  const close = within(details).getByRole('button', { name: TASK_REGISTER_COPY[language].close });
  expect(close).toHaveFocus(); fireEvent.click(close);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument(); expect(opener).toHaveFocus();
  expect(JSON.stringify(record)).toBe(before);
});

test('long descriptions stay outside rows; Escape, backdrop and keyboard focus close the read-only reader', async () => {
  const description = 'Synthetic long description. '.repeat(100);
  api.getOwnTasks.mockResolvedValue({ ...page, data: [{ ...row, description }] });
  render(<OwnTaskRegister/>); await screen.findByText(row.title);
  const table = screen.getByRole('table');
  const opener = within(table).getByRole('button'); opener.focus(); fireEvent.click(opener);
  let reader = screen.getByRole('dialog');
  expect(within(reader).getByText(description.trim())).toBeInTheDocument();
  expect(within(table).queryByText(description.trim())).not.toBeInTheDocument();
  const close = within(reader).getByRole('button', { name: 'Fermer' });
  fireEvent.keyDown(close, { key: 'Tab', shiftKey: true });
  expect(within(reader).getByRole('region', { name: 'Détails' })).toHaveFocus();
  fireEvent.keyDown(document.activeElement, { key: 'Tab' }); expect(close).toHaveFocus();
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument(); expect(opener).toHaveFocus();
  fireEvent.click(opener); reader = screen.getByRole('dialog');
  fireEvent.mouseDown(reader.parentElement); expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(api.getOwnTasks).toHaveBeenCalledTimes(1);
});

test('600 tasks are read in server pages only, with visible row ranges and selectable page size', async () => {
  const records = Array.from({ length: 600 }, (_, index) => ({ ...row, id: `task-${index}`, title: `Task ${index}`, reference: `QA-${index}` }));
  api.getOwnTasks.mockImplementation(async (limit, offset, search) => {
    const filtered = records.filter(row => row.title.includes(search));
    const data = filtered.slice(offset, offset + limit);
    return { data, total: filtered.length, count: data.length };
  });
  render(<OwnTaskRegister/>); await screen.findByText('Task 0');
  expect(screen.getAllByRole('row')).toHaveLength(26);
  expect(screen.getByText('1–25 / 600')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Page suivante' })); await screen.findByText('Task 25');
  expect(screen.getByText('26–50 / 600')).toBeInTheDocument();
  expect(screen.queryByText('Task 0')).not.toBeInTheDocument();
  fireEvent.change(screen.getByRole('combobox', { name: 'Lignes' }), { target: { value: '100' } });
  await screen.findByText('1–100 / 600'); expect(screen.getAllByRole('row')).toHaveLength(101);
  expect(api.getOwnTasks).toHaveBeenLastCalledWith(100,0,'',expect.anything());
});

test('source refresh dismisses an open reader instead of keeping stale task details', async () => {
  render(<OwnTaskRegister/>); await screen.findByText(row.title);
  fireEvent.click(within(screen.getByRole('table')).getByRole('button'));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  api.getOwnTasks.mockResolvedValue({ data: [], count: 0, total: 0 });
  act(() => window.dispatchEvent(new Event('m3s:tasks-changed')));
  await screen.findByText('Aucune tâche dans ce résultat.');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test.each([null, undefined])('missing progress %s is not converted to zero or a percentage', async progression => {
  api.getOwnTasks.mockResolvedValue({ ...page, data: [{ ...row, progression, responsable: null, module: null, due_date: null }] });
  render(<OwnTaskRegister/>); await screen.findByText(row.title);
  const cells = within(screen.getByText(row.title).closest('tr')).getAllByRole('cell');
  [3,4,5,6,7].forEach(index => expect(cells[index].textContent).toBe('\u2014'));
  expect(screen.queryByText(/undefined%|null%|0%/)).not.toBeInTheDocument();
});
test('server total, pagination, search and refresh remain distinct from the loaded page', async () => {
  api.getOwnTasks.mockResolvedValue({ ...page, total: 70 });
  render(<OwnTaskRegister/>); await screen.findByText(row.title);
  expect(screen.getByText('1 affichées · Total serveur : 70')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Page suivante' }));
  await waitFor(() => expect(api.getOwnTasks).toHaveBeenLastCalledWith(25,25,'',expect.anything()));
  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'DOC' } });
  fireEvent.click(screen.getByRole('button', { name: 'Rechercher dans les tâches' }));
  await waitFor(() => expect(api.getOwnTasks).toHaveBeenLastCalledWith(25,0,'DOC',expect.anything()));
  fireEvent.click(screen.getByRole('button', { name: 'Actualiser les tâches et les compteurs' }));
  await waitFor(() => expect(api.getOwnTasks).toHaveBeenCalledTimes(4));
});
test('true empty, failure and denial are separate; failed reads have no fake total', async () => {
  api.getOwnTasks.mockResolvedValueOnce({ data: [], total: 0, count: 0 });
  const { unmount } = render(<OwnTaskRegister/>);
  expect(await screen.findByText('Aucune tâche dans ce résultat.')).toBeInTheDocument(); unmount();
  api.getOwnTasks.mockRejectedValueOnce({ status: 503 });
  const next = render(<OwnTaskRegister/>);
  expect(await screen.findByText('Source de tâches indisponible.')).toBeInTheDocument();
  expect(screen.queryByText(/Total serveur : 0/)).not.toBeInTheDocument(); next.unmount();
  api.getOwnTasks.mockRejectedValueOnce({ status: 403 }); render(<OwnTaskRegister/>);
  expect(await screen.findByText(/pas autorisée pour ce compte/)).toBeInTheDocument();
});
test('leaving aborts reads, ignores late replies and removes task-change listeners', async () => {
  let resolve; api.getOwnTasks.mockImplementation(() => new Promise(done => { resolve = done; }));
  const { unmount } = render(<OwnTaskRegister/>);
  const signal = api.getOwnTasks.mock.calls[0][3].signal;
  unmount(); expect(signal.aborted).toBe(true);
  await act(async () => resolve(page));
  window.dispatchEvent(new Event('m3s:tasks-changed'));
  expect(api.getOwnTasks).toHaveBeenCalledTimes(1);
});
test('shared register entry is explicit and read-only task view has no save action', async () => {
  render(<OwnTaskRegister/>); await screen.findByText(row.title);
  fireEvent.click(screen.getByRole('button', { name: 'Ouvrir le registre partagé' }));
  expect(mockNavigate).toHaveBeenCalledWith('/administration?tab=planning#planning-register');
  expect(screen.queryByRole('button', { name: 'Enregistrer' })).not.toBeInTheDocument();
});
