import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import FinanceBudget from './FinanceBudget';
import FinanceBudgetProvider, { FinanceBudgetSession } from './FinanceBudgetContext';
import { api } from './api';
import { createBudget } from './financeBudgetModel';
import { readBudgetServerList, readBudgetServerRecord } from './financeBudgetStorageModel';

jest.mock('./api', () => ({ api: { getBudgetCapabilities: jest.fn(), listBudgetDrafts: jest.fn(), getBudgetDraft: jest.fn(), createBudgetDraft: jest.fn(), updateBudgetDraft: jest.fn() } }));
let mockAuth = { token: 'account-a', isAuthenticated: true };
jest.mock('./AuthContext', () => ({ useAuth: () => mockAuth }));
const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const metadata = (version = 1) => ({ id, version, scope: 'organization', status: 'draft', access: 'owner-only' });
const budget = () => ({ ...createBudget(2026), title: 'Budget sauvegarde', entity: 'Organisation test' });
const record = (version = 1, value = budget()) => ({ success: true, data: { ...metadata(version), ...value, budget: value } });
const deferred = () => { let resolve, reject; const promise = new Promise((a, b) => { resolve = a; reject = b; }); return { promise, resolve, reject }; };
beforeEach(() => {
  jest.clearAllMocks(); process.env.REACT_APP_BUDGET_STORAGE_ENABLED = 'true'; mockAuth = { token: 'account-a', isAuthenticated: true };
  api.getBudgetCapabilities.mockResolvedValue({ success: true, enabled: true, canWrite: true, personalEnabled: false, scope: 'organization', access: 'owner-only' });
  api.createBudgetDraft.mockResolvedValue({ success: true, data: metadata() });
  api.updateBudgetDraft.mockResolvedValue({ success: true, data: metadata(2) });
  api.getBudgetDraft.mockResolvedValue(record());
  api.listBudgetDrafts.mockResolvedValue({ success: true, hasMore: false, data: [{ ...metadata(), title: 'Budget sauvegarde', entity: 'Organisation test', year: '2026' }] });
  global.URL.createObjectURL = jest.fn(() => 'blob:qa'); global.URL.revokeObjectURL = jest.fn();
  jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
});
afterEach(() => { delete process.env.REACT_APP_BUDGET_STORAGE_ENABLED; jest.restoreAllMocks(); });
const show = () => render(<FinanceBudgetSession><FinanceBudget language="FR" onSelectTab={() => {}} /></FinanceBudgetSession>);
const ready = () => screen.findByText('Organisation · Accès limité à votre compte');
const start = () => {
  fireEvent.click(screen.getAllByRole('button', { name: 'Nouveau brouillon' }).at(-1));
  fireEvent.change(screen.getByLabelText('Nom du budget'), { target: { value: 'Budget local' } });
  fireEvent.change(screen.getByLabelText('Entité / périmètre propriétaire'), { target: { value: 'Organisation test' } });
};
const confirm = () => fireEvent.click(screen.getByRole('button', { name: 'Confirmer' }));
const save = () => { fireEvent.click(screen.getByRole('button', { name: 'Enregistrer le brouillon' })); confirm(); };
const load = async () => {
  fireEvent.click(screen.getByRole('button', { name: 'Ouvrir les brouillons sauvegardés' }));
  fireEvent.click(await screen.findByRole('button', { name: /Budget sauvegarde Organisation test/ }));
};
test('feature gate makes no storage request and preserves the existing session workflow', () => {
  delete process.env.REACT_APP_BUDGET_STORAGE_ENABLED; show(); start();
  expect(api.getBudgetCapabilities).not.toHaveBeenCalled(); expect(screen.queryByText('Sauvegarde serveur')).not.toBeInTheDocument();
  expect(screen.getByText(/Session uniquement/)).toBeInTheDocument();
});
test('disabled or malformed capabilities never enable saving', async () => {
  api.getBudgetCapabilities.mockResolvedValue({ success: true, enabled: true, canWrite: true, personalEnabled: true, scope: 'personal' });
  show(); start(); await screen.findByText(/Stockage indisponible/);
  expect(screen.getByRole('button', { name: 'Enregistrer le brouillon' })).toBeDisabled();
  expect(api.createBudgetDraft).not.toHaveBeenCalled();
});
test('a save requires confirmation and server acknowledgement, updates use the independent server version', async () => {
  const pending = deferred(); api.createBudgetDraft.mockReturnValueOnce(pending.promise); show(); await ready(); start();
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer le brouillon' }));
  expect(api.createBudgetDraft).not.toHaveBeenCalled(); confirm();
  expect(screen.getByLabelText('Nom du budget')).toBeDisabled(); expect(screen.queryByText(/Enregistré sur le serveur/)).not.toBeInTheDocument();
  await act(async () => pending.resolve({ success: true, data: metadata() }));
  await screen.findByText(/Version serveur 1 · Enregistré/);
  expect(screen.getByRole('button', { name: 'Enregistrer le brouillon' })).toBeDisabled();
  fireEvent.change(screen.getByLabelText('Nom du budget'), { target: { value: 'Budget modifie' } }); save();
  await screen.findByText(/Version serveur 2 · Enregistré/);
  expect(api.updateBudgetDraft).toHaveBeenCalledWith(id, expect.objectContaining({ title: 'Budget modifie', revision: 0 }), 1);
});
test('saved content is protected on close; unsaved edits restore the warning', async () => {
  show(); await ready(); start(); save(); await screen.findByText(/Enregistré sur le serveur/);
  const clean = new Event('beforeunload', { cancelable: true }); window.dispatchEvent(clean); expect(clean.defaultPrevented).toBe(false);
  fireEvent.change(screen.getByLabelText('Nom du budget'), { target: { value: 'Modification locale' } });
  const dirty = new Event('beforeunload', { cancelable: true }); window.dispatchEvent(dirty); expect(dirty.defaultPrevented).toBe(true);
});
test('conflict preserves edits, prevents overwrite, and reload requires confirmation', async () => {
  api.updateBudgetDraft.mockRejectedValueOnce(Object.assign(new Error(), { status: 409 }));
  show(); await ready(); await load(); await screen.findByDisplayValue('Budget sauvegarde');
  fireEvent.change(screen.getByLabelText('Nom du budget'), { target: { value: 'Version locale' } }); save();
  await screen.findByText(/Une autre version existe/);
  expect(screen.getByLabelText('Nom du budget')).toHaveValue('Version locale');
  expect(screen.getByRole('button', { name: 'Enregistrer le brouillon' })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'Charger la version serveur' }));
  fireEvent.click(screen.getByRole('button', { name: 'Annuler' })); expect(screen.getByLabelText('Nom du budget')).toHaveValue('Version locale');
  fireEvent.click(screen.getByRole('button', { name: 'Charger la version serveur' })); confirm();
  await screen.findByDisplayValue('Budget sauvegarde'); expect(api.updateBudgetDraft).toHaveBeenCalledTimes(1);
});
test('an uncertain write is not retried; reconciliation acknowledges only matching content and version', async () => {
  api.createBudgetDraft.mockRejectedValueOnce(Object.assign(new Error(), { status: 503, draftId: id, reconcileRequired: true }));
  show(); await ready(); start(); save(); await screen.findByText(/Résultat de l’enregistrement non confirmé/);
  expect(screen.getByRole('button', { name: 'Enregistrer le brouillon' })).toBeDisabled();
  api.getBudgetDraft.mockResolvedValueOnce(record(1, { ...budget(), title: 'Autre contenu' }));
  fireEvent.click(screen.getByRole('button', { name: 'Vérifier le résultat de l’enregistrement' }));
  await waitFor(() => expect(api.getBudgetDraft).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(screen.getByRole('button', { name: 'Vérifier le résultat de l’enregistrement' })).toBeEnabled());
  expect(screen.getByLabelText('Nom du budget')).toHaveValue('Budget local');
  api.getBudgetDraft.mockResolvedValueOnce(record(1, { ...budget(), title: 'Budget local', year: String(new Date().getFullYear()) }));
  fireEvent.click(screen.getByRole('button', { name: 'Vérifier le résultat de l’enregistrement' }));
  await screen.findByText(/Version serveur 1 · Enregistré/); expect(api.createBudgetDraft).toHaveBeenCalledTimes(1);
});
test('network loss without an id never permits a blind create retry', async () => {
  api.createBudgetDraft.mockRejectedValueOnce(new Error('Network down'));
  show(); await ready(); start(); save(); await screen.findByText(/Résultat de l’enregistrement non confirmé/);
  expect(screen.queryByRole('button', { name: 'Vérifier le résultat de l’enregistrement' })).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Enregistrer le brouillon' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Exporter le brouillon JSON' })).toBeEnabled();
});
test('malformed success is not presented as a completed save', async () => {
  api.createBudgetDraft.mockResolvedValueOnce({ success: true, data: { ...metadata(), scope: 'personal' } });
  show(); await ready(); start(); save(); await screen.findByText(/Résultat de l’enregistrement non confirmé/);
  expect(screen.queryByText(/Enregistré sur le serveur/)).not.toBeInTheDocument();
});
test('new drafts and imported copies detach from the previous server id', async () => {
  show(); await ready(); await load(); await screen.findByDisplayValue('Budget sauvegarde');
  fireEvent.click(screen.getByRole('button', { name: 'Dupliquer le brouillon' })); confirm();
  expect(screen.queryByText(/Version serveur 1 · Enregistré/)).not.toBeInTheDocument(); save();
  await waitFor(() => expect(api.createBudgetDraft).toHaveBeenCalledTimes(1)); expect(api.updateBudgetDraft).not.toHaveBeenCalled();
});
test('read-only capability allows opening but not writing; terminal versions stay protected', async () => {
  api.getBudgetCapabilities.mockResolvedValueOnce({ success: true, enabled: true, canWrite: false, scope: 'organization', access: 'owner-only', personalEnabled: false });
  api.getBudgetDraft.mockResolvedValueOnce(record(1000000));
  show(); await screen.findByText(/Serveur en lecture seule/); await load(); await screen.findByDisplayValue('Budget sauvegarde');
  expect(screen.getByRole('button', { name: 'Enregistrer le brouillon' })).toBeDisabled(); await screen.findByText(/Limite de versions serveur/);
});
test('pending save survives navigation but cannot contaminate a changed account', async () => {
  const pending = deferred(); api.createBudgetDraft.mockReturnValueOnce(pending.promise);
  const ui = show(); await ready(); start(); save();
  ui.rerender(<FinanceBudgetSession><span>Autre rubrique</span></FinanceBudgetSession>);
  await act(async () => pending.resolve({ success: true, data: metadata() }));
  ui.rerender(<FinanceBudgetSession><FinanceBudget language="FR" onSelectTab={() => {}} /></FinanceBudgetSession>);
  await screen.findByText(/Version serveur 1 · Enregistré/); ui.unmount();
  const late = deferred(); api.createBudgetDraft.mockReturnValueOnce(late.promise);
  const authUi = render(<FinanceBudgetProvider><FinanceBudget language="FR" onSelectTab={() => {}} /></FinanceBudgetProvider>);
  await ready(); start(); save(); mockAuth = { token: 'account-b', isAuthenticated: true };
  authUi.rerender(<FinanceBudgetProvider><FinanceBudget language="FR" onSelectTab={() => {}} /></FinanceBudgetProvider>);
  await act(async () => late.resolve({ success: true, data: metadata() }));
  expect(screen.queryByLabelText('Nom du budget')).not.toBeInTheDocument(); expect(screen.queryByText(/Version serveur 1/)).not.toBeInTheDocument();
});
test('in-flight import is invalidated when saving starts', async () => {
  show(); await ready(); start(); const file = deferred();
  fireEvent.change(screen.getByLabelText('Importer un brouillon JSON', { selector: 'input' }), { target: { files: [{ size: 100, text: () => file.promise }] } });
  save(); await screen.findByText(/Enregistré sur le serveur/);
  await act(async () => file.resolve(JSON.stringify({ schema: 'm3s-budget-draft', version: 1, scope: 'organization', status: 'draft', budget: budget() })));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument(); expect(screen.getByLabelText('Nom du budget')).toHaveValue('Budget local');
});
test('server payload validation rejects foreign scope, malformed lists and duplicate ids', () => {
  expect(() => readBudgetServerRecord({ success: true, data: { ...record().data, scope: 'personal' } })).toThrow();
  const item = { ...metadata(), title: 'QA', entity: 'QA', year: '2026' };
  expect(() => readBudgetServerList({ success: true, data: [item, item], hasMore: false })).toThrow();
  expect(() => readBudgetServerList({ success: true, data: [item], hasMore: 'yes' })).toThrow();
  expect(readBudgetServerRecord(record()).budget).toEqual(budget());
});
