import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import RhProximityTools from './RhProximityTools';
import api from './api';
import spec from './gedOffersSpec.json';
import { RH_FILE_SPECS } from './institutionalRhGedModel';

let mockAuth;
jest.mock('./AuthContext', () => ({ useAuth: () => mockAuth }));
jest.mock('./api', () => ({ __esModule: true, default: { getInstitutionalGedBundle: jest.fn(), downloadInstitutionalGedFile: jest.fn() } }));
const offers = { files: spec.files.map(file => ({ ...file, contentType: 'application/octet-stream' })) };
const rh = { files: RH_FILE_SPECS.map(([name, id, size]) => ({ name, id, size, contentType: 'application/octet-stream' })) };
const kit = offers.files.find(file => file.name === '2SG_KIT_RH_PROXIMITE_V0_2_SANS_AUDIO.html');

beforeEach(() => {
  jest.clearAllMocks();
  mockAuth = { isAuthenticated: true, user: { id: 'synthetic', tenantId: '2sg' } };
  api.getInstitutionalGedBundle.mockImplementation(async ({ kind }) => kind === 'offers' ? offers : rh);
});

test.each([
  ['FR', 'Outils RH de proximit\u00e9', 'Documents compl\u00e9mentaires', 'Documents RH rattach\u00e9s', 'Revenir \u00e0 la vue RH', 'Ouvrir les dossiers employ\u00e9s'],
  ['DE', 'Werkzeuge f\u00fcr wohnortnahe Personalarbeit', 'Erg\u00e4nzende Dokumente', 'Verkn\u00fcpfte HR-Dokumente', 'Zur Personal\u00fcbersicht zur\u00fcck', 'Besch\u00e4ftigtenakten \u00f6ffnen'],
  ['EN', 'Proximity HR tools', 'Supplementary documents', 'Linked HR documents', 'Back to HR overview', 'Open employee dossiers']
])('%s separates local tools, fictional kit and existing delivered dossier', async (language, title, openKit, openCycle, backLabel, dossiersLabel) => {
  const back = jest.fn(), dossiers = jest.fn();
  const { container } = render(<RhProximityTools language={language} onBack={back} onOpenEmployees={dossiers} />);
  expect(screen.getByRole('heading', { name: title })).toBeVisible();
  expect(api.getInstitutionalGedBundle).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: openKit }));
  await screen.findByText(kit.name);
  expect(screen.queryByText(offers.files[4].name)).not.toBeInTheDocument();
  expect(screen.getByText('GD-008 \u00b7 GD-009')).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: openCycle }));
  await screen.findByText('01_PARCOURS_ET_INTERFACES_V0_1.md');
  expect(api.getInstitutionalGedBundle.mock.calls.map(([arg]) => arg.kind)).toEqual(['offers', 'rh']);
  fireEvent.click(screen.getByRole('button', { name: backLabel }));
  fireEvent.click(screen.getByRole('button', { name: dossiersLabel }));
  expect(back).toHaveBeenCalledTimes(1); expect(dossiers).toHaveBeenCalledTimes(1);
  expect(container.querySelectorAll('iframe,audio,input,form,a[href^="file:"]')).toHaveLength(0);
});

test('named employee tools are not presented as hosted applications or individual authentication', () => {
  render(<RhProximityTools language="EN" />);
  expect(screen.getByText(/cannot yet be opened from M3S/)).toBeVisible();
  expect(screen.getByText(/profile selector is not authentication/)).toBeVisible();
  expect(screen.getAllByText('Existing local tool')).toHaveLength(4);
  expect(api.downloadInstitutionalGedFile).not.toHaveBeenCalled();
});

test.each([403, 503])('a denied or failed %s source never falls back to local employee files', async status => {
  api.getInstitutionalGedBundle.mockRejectedValue({ status });
  render(<RhProximityTools />);
  fireEvent.click(screen.getByRole('button', { name: 'Documents compl\u00e9mentaires' }));
  await screen.findByRole('alert');
  expect(screen.queryByText(kit.name)).not.toBeInTheDocument();
});

test('language changes keep the current panel without repeating source reads', async () => {
  const view = render(<RhProximityTools />);
  fireEvent.click(screen.getByRole('button', { name: 'Documents compl\u00e9mentaires' }));
  await screen.findByText(kit.name);
  view.rerender(<RhProximityTools language="DE" />);
  expect(screen.getByRole('button', { name: `Herunterladen ${kit.name}` })).toBeVisible();
  expect(api.getInstitutionalGedBundle).toHaveBeenCalledTimes(1);
});

test('changing account or tenant aborts both sources and clears old metadata', async () => {
  let resolve;
  api.getInstitutionalGedBundle.mockReturnValueOnce(new Promise(done => { resolve = done; }));
  const view = render(<RhProximityTools />);
  fireEvent.click(screen.getByRole('button', { name: 'Documents compl\u00e9mentaires' }));
  await waitFor(() => expect(api.getInstitutionalGedBundle).toHaveBeenCalledTimes(1));
  const signal = api.getInstitutionalGedBundle.mock.calls[0][0].signal;
  mockAuth = { isAuthenticated: true, user: { id: 'another', tenantId: '2sg' } };
  view.rerender(<RhProximityTools />);
  expect(signal.aborted).toBe(true);
  await act(async () => resolve(offers));
  expect(screen.queryByText(kit.name)).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Documents compl\u00e9mentaires' })).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(screen.getByRole('button', { name: 'Documents RH rattach\u00e9s' }));
  await screen.findByText('01_PARCOURS_ET_INTERFACES_V0_1.md');
  mockAuth = { isAuthenticated: true, user: { id: 'another', tenantId: 'foreign' } };
  view.rerender(<RhProximityTools />);
  expect(screen.queryByText('01_PARCOURS_ET_INTERFACES_V0_1.md')).not.toBeInTheDocument();
});

test('sign-out removes document access without reading either source', () => {
  mockAuth = { isAuthenticated: false, user: null };
  render(<RhProximityTools />);
  expect(screen.getByRole('alert')).toBeVisible();
  expect(screen.queryByRole('button', { name: 'Documents compl\u00e9mentaires' })).not.toBeInTheDocument();
  expect(api.getInstitutionalGedBundle).not.toHaveBeenCalled();
});
