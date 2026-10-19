import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import PersonalHours, { HOURS_COPY } from './PersonalHours';
import { HOURS_SCHEMA, hoursAccountKey, createHoursVault, sealHoursVault, openHoursVault } from './personalHoursVault';
jest.mock('./personalHoursVault', () => ({ ...jest.requireActual('./personalHoursVault'),
  hoursAccountKey: jest.fn(), createHoursVault: jest.fn(), sealHoursVault: jest.fn(), openHoursVault: jest.fn() }));
const principal = { id: 'test-a', tenantId: 'tenant-test', email: 'a@example.test' };
const key = `${HOURS_SCHEMA}.${'a'.repeat(64)}`;
const empty = () => ({ schema: HOURS_SCHEMA, subject: key, timezone: 'Europe/Zurich', entries: [] });
const entry = () => ({ id: 'HOUR-file', date: '2026-10-18', start: '15:00', end: '17:00', pause: 15, overnight: false, minutes: 105 });
let serial;
beforeEach(() => {
  jest.useFakeTimers().setSystemTime(new Date('2026-10-19T20:00:00Z'));
  jest.clearAllMocks(); localStorage.clear(); serial = 0;
  hoursAccountKey.mockResolvedValue(key); createHoursVault.mockImplementation(async () => ({ state: empty(), key: {}, salt: new Uint8Array(16) }));
  sealHoursVault.mockImplementation(async () => `encrypted-fixture-${++serial}`);
  openHoursVault.mockResolvedValue({ state: empty(), key: {}, salt: new Uint8Array(16) });
  Object.defineProperty(global, 'crypto', { configurable: true, value: { randomUUID: () => `synthetic-${++serial}` } });
  global.URL.createObjectURL = jest.fn(() => 'blob:synthetic'); global.URL.revokeObjectURL = jest.fn();
  jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
});
afterEach(() => { jest.restoreAllMocks(); jest.useRealTimers(); });
async function start(language = 'FR') {
  const view = render(<PersonalHours principal={principal} language={language}/>), t = HOURS_COPY[language];
  await waitFor(() => expect(screen.getByLabelText(t.phrase)).toBeEnabled());
  fireEvent.change(screen.getByLabelText(t.phrase), { target: { value: 'synthetic private hours' } });
  fireEvent.change(screen.getByLabelText(t.repeat), { target: { value: 'synthetic private hours' } });
  fireEvent.click(screen.getByRole('button', { name: t.open }));
  await screen.findByRole('button', { name: t.lock });
  return view;
}
function fill() {
  for (const [label,value] of [['Date','2026-10-18'],['Début','15:00'],['Fin','17:00'],['Pause (min)','15']]) {
    fireEvent.change(screen.getByLabelText(label), { target: { value } });
  }
}
test.each(['FR','DE','EN'])('locked and open %s states are translated and do not claim server sync or employee pay', async language => {
  await start(language); const t = HOURS_COPY[language];
  expect(screen.getByText(t.privacy)).toBeInTheDocument(); expect(screen.getByText(t.empty)).toBeInTheDocument();
  expect(screen.getByLabelText(t.start)).toBeInTheDocument();
  expect(screen.queryByLabelText(t.phrase)).not.toBeInTheDocument();
  expect(localStorage.getItem(key)).toMatch(/^encrypted-fixture-/);
  expect(localStorage.getItem(key)).not.toContain('synthetic private hours');
});
test('confirmation gates new entries; duplicates do not write and language/tab changes preserve the record', async () => {
  const view = await start(), initial = localStorage.getItem(key);
  fill(); fireEvent.click(screen.getByRole('button', { name: 'Ajouter la saisie' }));
  await screen.findByRole('dialog'); expect(localStorage.getItem(key)).toBe(initial);
  fireEvent.click(screen.getByRole('button', { name: 'Oui, enregistrer' }));
  await screen.findByText('Total du mois : 1 h 45 · 1 saisies');
  const saved = localStorage.getItem(key), calls = sealHoursVault.mock.calls.length;
  fill(); fireEvent.click(screen.getByRole('button', { name: 'Ajouter la saisie' }));
  expect(await screen.findByText(HOURS_COPY.FR.duplicate)).toBeInTheDocument();
  expect(sealHoursVault).toHaveBeenCalledTimes(calls); expect(localStorage.getItem(key)).toBe(saved);
  view.rerender(<PersonalHours principal={principal} language="DE" active={false}/>);
  view.rerender(<PersonalHours principal={principal} language="EN" active/>);
  expect(screen.getByText('Month total : 1 h 45 · 1 entries')).toBeInTheDocument();
  expect(screen.getByText('18/10/26')).toBeInTheDocument();
});
test('cancel and storage failure preserve both the old encrypted history and form', async () => {
  await start(); fill(); const old = localStorage.getItem(key);
  fireEvent.click(screen.getByRole('button', { name: 'Ajouter la saisie' }));
  fireEvent.click(await screen.findByRole('button', { name: 'Annuler' })); expect(localStorage.getItem(key)).toBe(old);
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw Error('quota'); });
  fireEvent.click(screen.getByRole('button', { name: 'Ajouter la saisie' })); fireEvent.click(await screen.findByRole('button', { name: 'Oui, enregistrer' }));
  expect(await screen.findByRole('alert')).toHaveTextContent(HOURS_COPY.FR.error);
  expect(localStorage.getItem(key)).toBe(old); expect(screen.getByLabelText('Début')).toHaveValue('15:00');
  expect(screen.getByText('Total du mois : 0 h 00 · 0 saisies')).toBeInTheDocument();
});
test('wrong phrase never falls back to a fresh record or replaces the saved copy', async () => {
  localStorage.setItem(key, 'existing-encrypted'); openHoursVault.mockRejectedValue(Error('wrong phrase'));
  render(<PersonalHours principal={principal}/>);
  await waitFor(() => expect(screen.getByLabelText(HOURS_COPY.FR.phrase)).toBeEnabled());
  fireEvent.change(screen.getByLabelText(HOURS_COPY.FR.phrase), { target: { value: 'wrong synthetic phrase' } });
  fireEvent.click(screen.getByRole('button', { name: 'Déverrouiller' }));
  await screen.findByRole('alert'); expect(localStorage.getItem(key)).toBe('existing-encrypted');
  expect(createHoursVault).not.toHaveBeenCalled(); expect(sealHoursVault).not.toHaveBeenCalled();
});
test('encrypted import is inspected before confirmation and merges without replacing existing entries', async () => {
  await start(); openHoursVault.mockResolvedValue({ state: { ...empty(), entries: [entry()] }, key: {}, salt: new Uint8Array(16) });
  fireEvent.click(screen.getByText('Rapprocher une copie chiffrée'));
  fireEvent.change(screen.getByLabelText('Copie à rapprocher'), { target: { files: [{ size: 20, text: async () => 'synthetic-encrypted' }] } });
  fireEvent.change(screen.getByLabelText('Phrase privée de cette copie'), { target: { value: 'synthetic import phrase' } });
  const old = localStorage.getItem(key);
  fireEvent.click(screen.getByRole('button', { name: 'Examiner la copie' }));
  await screen.findByRole('dialog'); expect(localStorage.getItem(key)).toBe(old);
  fireEvent.click(screen.getByRole('button', { name: 'Oui, enregistrer' }));
  await screen.findByText('Total du mois : 1 h 45 · 1 saisies');
  expect(screen.getByLabelText('Phrase privée de cette copie')).toHaveValue('');
});
test('other-tab changes refuse overwrite and backup uses this account memory, not the changed copy', async () => {
  await start(); localStorage.setItem(key, 'another-encrypted-copy');
  fireEvent(window, new StorageEvent('storage', { key, newValue: 'another-encrypted-copy' }));
  expect(await screen.findByRole('alert')).toHaveTextContent(HOURS_COPY.FR.conflict);
  expect(screen.getByLabelText('Début')).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'Exporter la copie chiffrée' }));
  await screen.findByText(HOURS_COPY.FR.exported);
  expect(localStorage.getItem(key)).toBe('another-encrypted-copy');
});
test('account switch cancels pending encryption and unmounts every private field before the new account resolves', async () => {
  let finish; sealHoursVault.mockImplementation(() => new Promise(resolve => { finish = resolve; }));
  const view = render(<PersonalHours principal={principal}/>);
  await waitFor(() => expect(screen.getByLabelText(HOURS_COPY.FR.phrase)).toBeEnabled());
  fireEvent.change(screen.getByLabelText(HOURS_COPY.FR.phrase), { target: { value: 'synthetic private hours' } });
  fireEvent.change(screen.getByLabelText(HOURS_COPY.FR.repeat), { target: { value: 'synthetic private hours' } });
  fireEvent.click(screen.getByRole('button', { name: 'Ouvrir mon relevé' }));
  await waitFor(() => expect(sealHoursVault).toHaveBeenCalled());
  hoursAccountKey.mockImplementation(() => new Promise(() => {}));
  view.rerender(<PersonalHours principal={{ ...principal, id: 'other' }}/>);
  expect(screen.getByLabelText(HOURS_COPY.FR.phrase)).toHaveValue('');
  await act(async () => finish('encrypted-old-account'));
  expect(localStorage.getItem(key)).toBeNull();
});
