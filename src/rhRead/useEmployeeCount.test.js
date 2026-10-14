import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { parseEmployeeCount, useRhEmployeeCount } from './useEmployeeCount';

let mockAuth;
jest.mock('../AuthContext', () => ({ useAuth: () => mockAuth }));
const auth = id => ({ user: { id, tenantId: 'SYNTHETIC-ORG', authProvider: 'google' },
  provider: 'google', ready: true, isAuthenticated: true });
const marker = id => ({ enabled: true, qualified: true, userId: id,
  organizationId: 'SYNTHETIC-ORG', revision: '1' });
const body = count => ({ count, candidate: true, source: 'rh-read-v1', scope: 'authorized-employee-files' });
const response = (value, status = 200) => ({ status, json: async () => value });
const transport = (count = 2) => jest.fn(path => Promise.resolve(response(
  path === '/access' ? marker(mockAuth.user.id) : body(count))));

function View(props) {
  const state = useRhEmployeeCount(props);
  return <><output aria-label="count">{state.count === null ? 'unknown' : state.count}</output>
    <output aria-label="status">{state.status}</output><button onClick={state.refresh}>Refresh</button></>;
}
beforeEach(() => { mockAuth = auth('SYNTHETIC-A'); });

test.each([0, 2, 101])('reads a scoped aggregate %s without listing identities or sending scope parameters', async count => {
  const read = transport(count);
  render(<View transport={read} />);
  await waitFor(() => expect(screen.getByLabelText('status')).toHaveTextContent('available'));
  expect(screen.getByLabelText('count')).toHaveTextContent(String(count));
  expect(read.mock.calls.map(call => call[0])).toEqual(['/access', '/employees/summary']);
  for (const [, init] of read.mock.calls) expect(init).toEqual({ method: 'GET', signal: expect.any(AbortSignal) });
});

test('refresh removes the old aggregate while pending and can return a real zero', async () => {
  let finish;
  const read = transport();
  const view = render(<View transport={read} />);
  await waitFor(() => expect(screen.getByLabelText('count')).toHaveTextContent('2'));
  read.mockImplementation(path => path === '/access' ? Promise.resolve(response(marker('SYNTHETIC-A')))
    : new Promise(resolve => { finish = resolve; }));
  fireEvent.click(screen.getByText('Refresh'));
  expect(screen.getByLabelText('count')).toHaveTextContent('unknown');
  await waitFor(() => expect(finish).toEqual(expect.any(Function)));
  await act(async () => { finish(response(body(0))); });
  expect(screen.getByLabelText('count')).toHaveTextContent('0');
  view.unmount();
});

test.each([
  { provider: 'legacy' }, { ready: false }, { isAuthenticated: false },
  { user: { id: 'SYNTHETIC-A', tenantId: 'SYNTHETIC-ORG', authProvider: 'legacy' } }
])('does not contact RH under an incomplete or legacy identity %j', async patch => {
  mockAuth = { ...mockAuth, ...patch };
  const read = transport(); render(<View transport={read} />);
  expect(read).not.toHaveBeenCalled();
  expect(screen.getByLabelText('count')).toHaveTextContent('unknown');
});

test.each([
  { qualified: false }, { userId: 'OTHER' }, { organizationId: 'OTHER' },
  { revision: '10001' }, { revision: '0' }
])('does not request an aggregate from an invalid access marker %j', async patch => {
  const read = jest.fn(async () => response({ ...marker('SYNTHETIC-A'), ...patch }));
  render(<View transport={read} />);
  await waitFor(() => expect(screen.getByLabelText('status')).toHaveTextContent('unavailable'));
  expect(read.mock.calls.map(call => call[0])).toEqual(['/access']);
});

test.each([401, 403, 404, 503])('unavailable or denied summary %s is never converted to zero', async status => {
  const read = jest.fn(async path => response(path === '/access' ? marker('SYNTHETIC-A') : { count: 0 },
    path === '/access' ? 200 : status));
  render(<View transport={read} />);
  await waitFor(() => expect(screen.getByLabelText('status')).toHaveTextContent(status === 401 || status === 403 ? 'restricted' : 'unavailable'));
  expect(screen.getByLabelText('count')).toHaveTextContent('unknown');
});

test.each([null, body('2'), body(-1), body(1.5), { ...body(2), privateName: 'PRIVATE' },
  { ...body(2), candidate: false }, { ...body(2), scope: 'global' }])('rejects malformed or overbroad summary %j', value => {
  expect(() => parseEmployeeCount(value)).toThrow('RH_SERVICE_UNAVAILABLE');
});

test('does not expose a late aggregate after the account changes', async () => {
  let finish;
  const read = jest.fn(path => path === '/access' ? Promise.resolve(response(marker(mockAuth.user.id)))
    : new Promise(resolve => { finish = resolve; }));
  const view = render(<View transport={read} />);
  await waitFor(() => expect(finish).toEqual(expect.any(Function)));
  const oldFinish = finish;
  mockAuth = auth('SYNTHETIC-B');
  read.mockImplementation(async path => response(path === '/access' ? marker('SYNTHETIC-B') : body(3)));
  view.rerender(<View transport={read} />);
  expect(screen.getByLabelText('count')).toHaveTextContent('unknown');
  await waitFor(() => expect(screen.getByLabelText('count')).toHaveTextContent('3'));
  await act(async () => { oldFinish(response(body(99))); });
  expect(screen.getByLabelText('count')).toHaveTextContent('3');
});

test('logout and inactive views immediately hide the count and abort pending requests', async () => {
  const read = transport();
  const view = render(<View transport={read} />);
  await waitFor(() => expect(screen.getByLabelText('count')).toHaveTextContent('2'));
  const signal = read.mock.calls[0][1].signal;
  view.rerender(<View transport={read} active={false} />);
  expect(screen.getByLabelText('count')).toHaveTextContent('unknown');
  expect(signal.aborted).toBe(true);
  mockAuth = { ready: true, isAuthenticated: false, provider: 'google', user: null };
  view.rerender(<View transport={read} />);
  expect(screen.getByLabelText('count')).toHaveTextContent('unknown');
  expect(read).toHaveBeenCalledTimes(2);
});

test('equivalent access objects and presentation rerenders do not repeat reads', async () => {
  const read = transport();
  const view = render(<View transport={read} access={marker('SYNTHETIC-A')} />);
  await waitFor(() => expect(screen.getByLabelText('count')).toHaveTextContent('2'));
  view.rerender(<View transport={read} access={{ ...marker('SYNTHETIC-A') }} />);
  expect(read.mock.calls.map(call => call[0])).toEqual(['/employees/summary']);
});

test('timeout clears a pending aggregate even if the transport ignores abort', async () => {
  jest.useFakeTimers();
  const read = jest.fn(() => new Promise(() => {}));
  const view = render(<View transport={read} />);
  act(() => jest.advanceTimersByTime(15000));
  expect(screen.getByLabelText('status')).toHaveTextContent('unavailable');
  expect(screen.getByLabelText('count')).toHaveTextContent('unknown');
  expect(read.mock.calls[0][1].signal.aborted).toBe(true);
  view.unmount(); jest.useRealTimers();
});
