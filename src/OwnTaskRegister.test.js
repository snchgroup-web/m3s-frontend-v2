import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import OwnTaskRegister from './OwnTaskRegister';
import api from './api';
import { testTask } from './taskContractFixtures';
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({ useNavigate: () => mockNavigate }), { virtual: true });
jest.mock('./api', () => ({ __esModule: true, default: { getOwnTasks: jest.fn() } }));
const row = { ...testTask(), id: 'task-test', phase_id: 'phase-test', revision: 2 };
const page = { data: [row], total: 1, count: 1 };
beforeEach(() => { jest.clearAllMocks(); api.getOwnTasks.mockResolvedValue(page); });
test.each([['FR','Mes tâches','En cours','12-11-26'],['DE','Meine Aufgaben','In Bearbeitung','12.11.26'],['EN','My tasks','In progress','12/11/26']])('reads own tasks with %s labels and dates, without mutations', async (language,title,status,date) => {
  api.getOwnTasks.mockResolvedValue({ ...page, data: [{ ...row, status: 'in_progress' }] });
  render(<OwnTaskRegister language={language}/>);
  expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  expect(await screen.findByText(row.title)).toBeInTheDocument();
  expect(screen.getByText(status)).toBeInTheDocument(); expect(screen.getByText(date)).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /Modifier|bearbeiten|Edit task|Nouvelle tâche/ })).not.toBeInTheDocument();
  expect(api.getOwnTasks).toHaveBeenCalledWith(25,0,'',expect.objectContaining({signal:expect.anything()}));
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
