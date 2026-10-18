import React from 'react';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import ProductionOverview from './ProductionOverview';
import { productionServiceTransport } from './api';

let mockPrincipal;
jest.mock('./AuthContext', () => ({ useAuth: () => mockPrincipal }));
jest.mock('./api', () => ({ productionServiceTransport: jest.fn() }));
const docId = '12345678-1234-4123-8123-123456789abc';
const rhId = '12345678-1234-4123-8123-123456789abd';
const caps = (tracks = ['documents', 'rh']) => ({ storage: 'shared', acceptance_kind: 'reported_not_signed',
  items: tracks.map(track => ({ track, can_read: true, can_prepare: false, can_deliver: false, can_accept: false })) });
const record = (track, id, events = []) => ({ id, track, scope: `TEST-${track}`, owner: 'Test owner',
  project_reference: null, authorization_reference: 'TEST-AUTH', revision: events.length, events,
  audit: events.map((_, i) => ({ revision: i + 1, actor: 'a'.repeat(64), recorded_at: '2026-10-17T12:00:00Z' })),
  references_verified: false, acceptance_kind: 'reported_not_signed' });
const realization = { step: 'realization', occurred_on: '2026-10-16', evidence_reference: 'TEST-PROOF', deliverable_reference: 'TEST-DELIVERABLE', version: 'V1' };
const delivery = { step: 'delivery', occurred_on: '2026-10-17', evidence_reference: 'TEST-SEND', recipient: 'Test group', channel: 'email', deliverable_reference: 'TEST-DELIVERABLE', version: 'V1' };
const listing = (records, created = '2026-10-16T10:00:00Z') => ({ storage: 'shared', items: records.map(({ id, track, scope, owner, project_reference, authorization_reference, revision }) =>
  ({ id, track, scope, owner, project_reference, authorization_reference, revision, created_at: created })) });
let docs, rh;
const serve = async path => {
  if (path === '/access') return caps();
  if (path === '?track=documents') return listing(docs);
  if (path === '?track=rh') return listing(rh);
  const item = [...docs, ...rh].find(row => `/${row.id}` === path);
  if (item) return { storage: 'shared', item };
  throw Error('UNEXPECTED_READ');
};
beforeEach(() => {
  mockPrincipal = { isAuthenticated: true, user: { id: 'test-a', tenantId: '2sg' } };
  docs = [record('documents', docId, [realization, delivery])];
  rh = [record('rh', rhId, [realization])];
  productionServiceTransport.mockReset().mockImplementation(serve);
});
const show = props => render(<ProductionOverview language="FR" onOpenServices={jest.fn()} {...props} />);

test('reads only authorised shared sources and derives stage from events, not revision or dossier status', async () => {
  show();
  expect(await screen.findByText('Remise enregistr\u00e9e \u00b7 retour attendu')).toBeInTheDocument();
  expect(screen.getByText('R\u00e9alisation document\u00e9e')).toBeInTheDocument();
  expect(screen.getAllByText('1', { selector: 'strong' })).toHaveLength(2);
  expect(screen.getByText('17-10-26')).toHaveClass('whitespace-nowrap');
  expect(productionServiceTransport).toHaveBeenCalledTimes(5);
  for (const [, body] of productionServiceTransport.mock.calls) expect(body).toBeUndefined();
});

test.each([['FR', 'Production suivie', '17-10-26', 'Ouvrir le suivi des prestations'],
  ['DE', 'Verfolgte Produktion', '17.10.26', 'Leistungsverfolgung \u00f6ffnen'],
  ['EN', 'Production follow-up', '17/10/26', 'Open service delivery follow-up']])('retains locale dates and the navigation action in %s', async (language, title, date, open) => {
  const onOpenServices = jest.fn(); show({ language, onOpenServices });
  expect(await screen.findByText(date)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: open })); expect(onOpenServices).toHaveBeenCalledTimes(1);
});

test('does not infer acceptance from delivery; accepted outcome remains reported and unsigned', async () => {
  docs = [record('documents', docId, [realization, delivery, { step: 'acceptance', occurred_on: '2026-10-17', evidence_reference: 'TEST-REPLY',
    recipient: 'Test group', outcome: 'accepted', reservations: null, delivery_event_index: 1 }])];
  show(); expect(await screen.findByText('R\u00e9ception rapport\u00e9e : accept\u00e9e')).toBeInTheDocument();
  expect(screen.getByText(/rapport\u00e9es, non sign\u00e9es/)).toBeInTheDocument();
});

test('a genuine empty list shows zero without a detail fetch', async () => {
  docs = []; show();
  const row = screen.getByRole('region', { name: 'Organisation documentaire' });
  expect(await within(row).findByText('Aucun cycle partag\u00e9 pour ce parcours.')).toBeInTheDocument();
  expect(within(row).getByText('0', { selector: 'strong' })).toBeInTheDocument();
  expect(productionServiceTransport.mock.calls.map(([path]) => path)).not.toContain(`/${docId}`);
});

test.each([[{ status: 403 }, 'Acc\u00e8s non autoris\u00e9'], [{ code: 'SERVICE_NOT_ENABLED' }, 'Suivi partag\u00e9 non activ\u00e9'],
  [{ code: 'SERVICE_LIMIT' }, 'P\u00e9rim\u00e8tre trop large : plus de 100 cycles'], [new Error('offline'), 'Source indisponible']])('failure is not a zero or local substitute: %s', async (error, message) => {
  productionServiceTransport.mockRejectedValue(error); show();
  expect(await screen.findAllByText(message)).toHaveLength(2);
  expect(screen.queryByText('0', { selector: 'strong' })).not.toBeInTheDocument();
  expect(productionServiceTransport).toHaveBeenCalledTimes(1);
});

test('missing path permission prevents its list and detail requests', async () => {
  productionServiceTransport.mockImplementation(path => path === '/access' ? Promise.resolve(caps(['documents'])) : serve(path)); show();
  expect(await screen.findByText('Remise enregistr\u00e9e \u00b7 retour attendu')).toBeInTheDocument();
  expect(within(screen.getByRole('region', { name: 'RH de proximit\u00e9' })).getByRole('alert')).toHaveTextContent('Acc\u00e8s non autoris\u00e9');
  expect(productionServiceTransport.mock.calls.map(([path]) => path)).not.toContain('?track=rh');
});

test('one failing path does not hide the other authorised result', async () => {
  productionServiceTransport.mockImplementation(path => path === '?track=rh' ? Promise.reject(new Error('offline')) : serve(path)); show();
  expect(await screen.findByText('Remise enregistr\u00e9e \u00b7 retour attendu')).toBeInTheDocument();
  expect(screen.getByRole('alert')).toHaveTextContent('Source indisponible');
});

test('picks latest creation deterministically and bounds detail requests to one per path', async () => {
  const old = record('documents', '22345678-1234-4123-8123-123456789abc'); docs.push(old);
  productionServiceTransport.mockImplementation(path => path === '?track=documents' ? Promise.resolve({ storage: 'shared', items: [
    ...listing([old], '2026-10-12T10:00:00Z').items, ...listing([docs[0]]).items] }) : serve(path)); show();
  expect(await screen.findByText('Remise enregistr\u00e9e \u00b7 retour attendu')).toBeInTheDocument();
  expect(screen.getByText('2', { selector: 'strong' })).toBeInTheDocument();
  expect(productionServiceTransport.mock.calls.map(([path]) => path)).not.toContain(`/${old.id}`);
});

test.each(['wrong_id', 'stale', 'scope_mismatch', 'invalid_events'])('rejects untrustworthy detail: %s', async kind => {
  productionServiceTransport.mockImplementation(async path => {
    const result = await serve(path); if (path !== `/${docId}`) return result;
    const item = { ...result.item };
    if (kind === 'wrong_id') item.id = rhId;
    if (kind === 'stale') { item.events = []; item.audit = []; item.revision = 0; }
    if (kind === 'scope_mismatch') item.scope = 'WRONG';
    if (kind === 'invalid_events') item.events = [delivery, realization];
    return { ...result, item };
  }); show();
  expect(await screen.findByRole('alert')).toHaveTextContent('Source indisponible');
  expect(screen.queryByText('Remise enregistr\u00e9e \u00b7 retour attendu')).not.toBeInTheDocument();
});

test('language changes preserve data without repeating reads', async () => {
  const view = show(); await screen.findByText('17-10-26');
  view.rerender(<ProductionOverview language="EN" onOpenServices={jest.fn()} />);
  expect(screen.getByText('17/10/26')).toBeInTheDocument(); expect(productionServiceTransport).toHaveBeenCalledTimes(5);
});

test('refresh discards prior results if access is revoked', async () => {
  show(); await screen.findByText('17-10-26'); productionServiceTransport.mockRejectedValue({ status: 403 });
  fireEvent.click(screen.getByRole('button', { name: 'Actualiser la synth\u00e8se Production' }));
  expect(await screen.findAllByRole('alert')).toHaveLength(2); expect(screen.queryByText('TEST-documents')).not.toBeInTheDocument();
});

test('switching account clears former results immediately and ignores late replies after unmount', async () => {
  const view = show(); await screen.findByText('17-10-26');
  let resolve; productionServiceTransport.mockReturnValue(new Promise(r => { resolve = r; }));
  mockPrincipal = { isAuthenticated: true, user: { id: 'test-b', tenantId: '2sg' } };
  view.rerender(<ProductionOverview language="FR" onOpenServices={jest.fn()} />);
  expect(screen.queryByText('TEST-documents')).not.toBeInTheDocument();
  await waitFor(() => expect(screen.getAllByRole('status')).toHaveLength(2));
  view.unmount(); await act(async () => resolve(caps([])));
  expect(productionServiceTransport.mock.calls.at(-1)[2].signal.aborted).toBe(true);
});
