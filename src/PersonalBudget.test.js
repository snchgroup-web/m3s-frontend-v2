import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import PersonalBudget from './PersonalBudget';
import { budgetAccountKey, budgetFrameDocument, loadBudgetTemplate, newBudgetVault, openBudgetVault, sealBudgetVault, validateBudgetStorage } from './personalBudgetVault';
jest.mock('./personalBudgetVault');
const principal = { id: 'synthetic', tenantId: 'test', email: 'private@example.test' };
const key = 'm3s.personal-budget.v1.synthetic';
const vault = { html: '<html></html>', storage: {} };

beforeEach(() => {
  jest.clearAllMocks(); localStorage.clear();
  budgetAccountKey.mockResolvedValue(key); newBudgetVault.mockResolvedValue({ ...vault }); openBudgetVault.mockResolvedValue({ ...vault });
  loadBudgetTemplate.mockResolvedValue('<html></html>');
  sealBudgetVault.mockResolvedValue('encrypted-fixture-only'); budgetFrameDocument.mockReturnValue('<html><body>Isolated fixture</body></html>');
  validateBudgetStorage.mockImplementation(value => value);
  Object.defineProperty(global, 'crypto', { configurable: true, value: { randomUUID: () => 'nonce-fixture' } });
});

async function start() {
  render(<PersonalBudget principal={principal}/>);
  await waitFor(() => expect(screen.getByLabelText(/Phrase privée/)).toBeEnabled());
  fireEvent.change(screen.getByLabelText(/Phrase privée/), { target: { value: 'synthetic private phrase' } });
  fireEvent.change(screen.getByLabelText(/Répéter/), { target: { value: 'synthetic private phrase' } });
  fireEvent.click(screen.getByRole('button', { name: 'Ouvrir mon budget' }));
  return screen.findByTitle('Budget personnel isolé');
}

test('opens the exact local source in a restricted frame and stores only encrypted data', async () => {
  const frame = await start();
  expect(frame).toHaveAttribute('sandbox', 'allow-scripts allow-downloads allow-modals');
  expect(frame.getAttribute('sandbox')).not.toContain('allow-same-origin');
  expect(frame).toHaveAttribute('referrerpolicy', 'no-referrer');
  expect(localStorage.getItem(key)).toBe('encrypted-fixture-only');
  expect(screen.queryByLabelText(/Phrase privée/)).not.toBeInTheDocument();
  expect(newBudgetVault).toHaveBeenCalledWith('<html></html>', 'synthetic private phrase');
});

test('only accepts its own opaque frame and nonce, then seals the snapshot', async () => {
  const frame = await start(); sealBudgetVault.mockClear();
  const data = { type: 'm3s-budget-storage', nonce: 'nonce-fixture', storage: { 'budget-perso-ch-v2': 'synthetic entry' } };
  fireEvent(window, new MessageEvent('message', { data, source: window, origin: 'null' }));
  fireEvent(window, new MessageEvent('message', { data, source: frame.contentWindow, origin: 'https://example.test' }));
  fireEvent(window, new MessageEvent('message', { data: { ...data, nonce: 'wrong' }, source: frame.contentWindow, origin: 'null' }));
  expect(sealBudgetVault).not.toHaveBeenCalled();
  fireEvent(window, new MessageEvent('message', { data, source: frame.contentWindow, origin: 'null' }));
  await waitFor(() => expect(sealBudgetVault).toHaveBeenCalledTimes(1));
  expect(localStorage.getItem(key)).not.toContain('synthetic entry');
});

test('failed source or phrase never replaces an existing vault', async () => {
  localStorage.setItem(key, 'existing-encrypted'); openBudgetVault.mockRejectedValue(new Error('wrong phrase'));
  render(<PersonalBudget principal={principal}/>);
  await waitFor(() => expect(screen.getByLabelText(/Phrase privée/)).toBeEnabled());
  expect(screen.queryByLabelText(/Restaurer/)).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText(/Phrase privée/), { target: { value: 'synthetic wrong phrase' } });
  fireEvent.click(screen.getByRole('button', { name: 'Déverrouiller' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('impossible');
  expect(localStorage.getItem(key)).toBe('existing-encrypted');
  expect(screen.queryByTitle('Budget personnel isolé')).not.toBeInTheDocument();
});

test('leaving during a pending unlock never saves or reopens private content', async () => {
  localStorage.setItem(key, 'existing-encrypted'); let resolve;
  openBudgetVault.mockReturnValue(new Promise(done => { resolve = done; }));
  const { unmount } = render(<PersonalBudget principal={principal}/>);
  await waitFor(() => expect(screen.getByLabelText(/Phrase privée/)).toBeEnabled());
  fireEvent.change(screen.getByLabelText(/Phrase privée/), { target: { value: 'synthetic test phrase' } });
  fireEvent.click(screen.getByRole('button', { name: 'Déverrouiller' }));
  await waitFor(() => expect(openBudgetVault).toHaveBeenCalled()); unmount();
  await act(async () => resolve(vault));
  expect(localStorage.getItem(key)).toBe('existing-encrypted');
});

test.each([['DE', 'Meine persönlichen Finanzen'], ['EN', 'My personal finances']])('renders the private launcher in %s', async (language, title) => {
  render(<PersonalBudget principal={principal} language={language}/>);
  expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  await waitFor(() => expect(screen.getAllByLabelText(/Passphrase|passphrase/)[0]).toBeEnabled());
  expect(screen.queryByText('Mes finances personnelles')).not.toBeInTheDocument();
});
