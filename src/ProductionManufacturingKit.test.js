import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProductionManufacturingKit from './ProductionManufacturingKit';
import api from './api';
import spec from './gedOffersSpec.json';

let mockAuth;
jest.mock('./AuthContext', () => ({ useAuth: () => mockAuth }));
jest.mock('./api', () => ({ __esModule: true, default: { getInstitutionalGedBundle: jest.fn(), downloadInstitutionalGedFile: jest.fn() } }));
const bundle = { ...spec, files: spec.files.map(file => ({ ...file, contentType: 'application/octet-stream' })) };
const kit = spec.files.find(file => file.version === '0.2' && file.dossiers.includes('GD-005'));

beforeEach(() => {
  jest.clearAllMocks();
  mockAuth = { isAuthenticated: true, user: { id: 'synthetic-a', tenantId: 'synthetic' } };
  api.getInstitutionalGedBundle.mockResolvedValue(bundle);
});

test.each([
  ['FR', 'Premier cas num\u00e9rique : kit Organisation documentaire', 'Documents compl\u00e9mentaires', '17-10-26'],
  ['DE', 'Erster digitaler Fall: Kit Dokumentenorganisation', 'Erg\u00e4nzende Dokumente', '17.10.26'],
  ['EN', 'First digital case: Document organisation kit', 'Supplementary documents', '17/10/26']
])('%s reuses the existing version, date and authorised download without automatic reads', async (language, title, open, date) => {
  const { container } = render(<ProductionManufacturingKit language={language} />);
  expect(screen.getByRole('heading', { name: title })).toBeVisible();
  expect(container.querySelector('time')).toHaveTextContent(date);
  expect(container.querySelector('time')).toHaveClass('whitespace-nowrap');
  expect(api.getInstitutionalGedBundle).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: open }));
  expect(await screen.findByText(kit.name)).toBeVisible();
  expect(screen.getByText('GD-005 \u00b7 GD-006')).toBeVisible();
  expect(screen.queryByText(spec.files[5].name)).not.toBeInTheDocument();
  expect(container.querySelectorAll('iframe, audio, input, form')).toHaveLength(0);
  expect(api.getInstitutionalGedBundle).toHaveBeenCalledWith(expect.objectContaining({ kind: 'offers' }));
});

test('keeps V0.2 supplementary production distinct from V0.1 delivery and unmeasured costs', () => {
  render(<ProductionManufacturingKit language="EN" />);
  expect(screen.getByText(/not the V0.1 dossier delivered/)).toBeVisible();
  expect(screen.getByText(/No duration or cost has yet been measured/)).toBeVisible();
  fireEvent.click(screen.getByText('Documented production chain'));
  expect(screen.getByText(/SHA-256/)).toBeVisible();
  expect(api.downloadInstitutionalGedFile).not.toHaveBeenCalled();
});

test('preserves open selection on language change without another read', async () => {
  const view = render(<ProductionManufacturingKit />);
  fireEvent.click(screen.getByRole('button', { name: 'Documents compl\u00e9mentaires' }));
  await screen.findByText(kit.name);
  view.rerender(<ProductionManufacturingKit language="EN" />);
  expect(screen.getByRole('button', { name: `Download ${kit.name}` })).toBeVisible();
  expect(api.getInstitutionalGedBundle).toHaveBeenCalledTimes(1);
});

test.each([403, 503])('a %s response never exposes the download', async status => {
  api.getInstitutionalGedBundle.mockRejectedValue({ status });
  render(<ProductionManufacturingKit />);
  fireEvent.click(screen.getByRole('button', { name: 'Documents compl\u00e9mentaires' }));
  await screen.findByRole('alert');
  expect(screen.queryByText(kit.name)).not.toBeInTheDocument();
  expect(api.downloadInstitutionalGedFile).not.toHaveBeenCalled();
});

test('account or tenant change masks old metadata and aborts pending reads', async () => {
  let resolve;
  api.getInstitutionalGedBundle.mockReturnValueOnce(new Promise(done => { resolve = done; }));
  const view = render(<ProductionManufacturingKit />);
  fireEvent.click(screen.getByRole('button', { name: 'Documents compl\u00e9mentaires' }));
  await waitFor(() => expect(api.getInstitutionalGedBundle).toHaveBeenCalledTimes(1));
  const signal = api.getInstitutionalGedBundle.mock.calls[0][0].signal;
  mockAuth = { isAuthenticated: true, user: { id: 'synthetic-a', tenantId: 'another-tenant' } };
  view.rerender(<ProductionManufacturingKit />);
  expect(signal.aborted).toBe(true);
  await act(async () => resolve(bundle));
  expect(screen.queryByText(kit.name)).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Documents compl\u00e9mentaires' })).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(screen.getByRole('button', { name: 'Documents compl\u00e9mentaires' }));
  await screen.findByText(kit.name);
  mockAuth = { isAuthenticated: true, user: { id: 'synthetic-b', tenantId: 'another-tenant' } };
  view.rerender(<ProductionManufacturingKit />);
  expect(screen.queryByText(kit.name)).not.toBeInTheDocument();
});

test('signed out users cannot start a GED request', () => {
  mockAuth = { isAuthenticated: false, user: null };
  render(<ProductionManufacturingKit />);
  expect(screen.getByRole('alert')).toBeVisible();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
  expect(api.getInstitutionalGedBundle).not.toHaveBeenCalled();
});

test('an account change cancels the selected download before any browser file is created', async () => {
  let resolve;
  api.downloadInstitutionalGedFile.mockReturnValueOnce(new Promise(done => { resolve = done; }));
  URL.createObjectURL = jest.fn();
  const view = render(<ProductionManufacturingKit language="EN" />);
  fireEvent.click(screen.getByRole('button', { name: 'Supplementary documents' }));
  await screen.findByText(kit.name);
  fireEvent.click(screen.getByRole('button', { name: `Download ${kit.name}` }));
  const [record, options] = api.downloadInstitutionalGedFile.mock.calls[0];
  expect(record).toEqual(bundle.files.find(file => file.id === kit.id));
  expect(options.kind).toBe('offers');
  mockAuth = { isAuthenticated: false, user: null };
  view.rerender(<ProductionManufacturingKit language="EN" />);
  expect(options.signal.aborted).toBe(true);
  await act(async () => resolve(new Blob(['synthetic'])));
  expect(URL.createObjectURL).not.toHaveBeenCalled();
  expect(screen.queryByText(kit.name)).not.toBeInTheDocument();
});
