import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { LanguageProvider } from './LanguageContext';
import ProductionServices, { readServiceSources } from './ProductionServices';
import api from './api';
jest.mock('./api', () => ({ __esModule: true, default: { getProductionServiceFollowup: jest.fn() } }));

const row = (patch = {}) => ({ dossier_id: 'GD-008', dossier_type: 'rh_proximity_framework',
  display_title: 'Source originale fictive', status: 'active', responsible_status: 'to_confirm',
  verified_on: '2026-10-14', display_state: 'Point original fictif',
  display_next_action: 'Action originale fictive', source_ref: 'Source fictive', ...patch });
const payload = (rows = [row()]) => ({ success: true, data: rows,
  source: { system: 'bigquery', registry: 'management_dossiers', scope: 'internal_service_preparation', read_only: true } });
const show = (language = 'FR') => {
  localStorage.setItem('language', language);
  return render(<LanguageProvider><ProductionServices language={language} /></LanguageProvider>);
};
beforeEach(() => { jest.clearAllMocks(); localStorage.clear(); api.getProductionServiceFollowup.mockResolvedValue(payload()); });

test.each([
  ['FR', 'Suivi des prestations', '14-10-26', 'Point source conservé · RH de proximité'],
  ['EN', 'Service delivery follow-up', '14/10/26', 'Preserved source entry · Proximity HR'],
  ['DE', 'Leistungsverfolgung', '14.10.26', 'Erhaltener Quelleintrag · Wohnortnahe Personalarbeit']
])('renders %s controls and dates without inventing receipt or costs', async (language, title, date, toggle) => {
  show(language);
  expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  const button = await screen.findByRole('button', { name: toggle, expanded: false });
  fireEvent.click(button);
  expect(screen.getByText('Action originale fictive')).toBeInTheDocument();
  expect(screen.getAllByText(date).length).toBeGreaterThan(0);
  expect(screen.getByText('GD-008')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /confirmer|confirm|bestätigen/i })).not.toBeInTheDocument();
  fireEvent.click(button);
  expect(screen.queryByText('Action originale fictive')).not.toBeInTheDocument();
  expect(api.getProductionServiceFollowup).toHaveBeenCalledTimes(1);
});
test('does not invent a source dossier for an empty but available register', async () => {
  api.getProductionServiceFollowup.mockResolvedValue(payload([]));
  show();
  expect(await screen.findAllByText('Aucun dossier source rattaché')).toHaveLength(2);
  expect(screen.queryByText(/GD-00/)).not.toBeInTheDocument();
});
test.each([401, 403, 503])('handles %s without substituting local or private data', async status => {
  api.getProductionServiceFollowup.mockRejectedValue({ status });
  show('EN');
  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent(status === 503 ? 'Follow-up source unavailable' : 'not authorised');
  expect(screen.queryByRole('table')).not.toBeInTheDocument();
  expect(screen.queryByText('Source originale fictive')).not.toBeInTheDocument();
});
test('refresh clears an old success when the next source fails', async () => {
  show();
  await screen.findByText('GD-008');
  api.getProductionServiceFollowup.mockRejectedValue({ status: 503 });
  fireEvent.click(screen.getByRole('button', { name: 'Actualiser' }));
  await screen.findByRole('alert');
  expect(screen.queryByText('GD-008')).not.toBeInTheDocument();
});
test('language rerender preserves the open detail and never rereads or writes the source', async () => {
  const view = show();
  fireEvent.click(await screen.findByRole('button', { name: 'Point source conservé · RH de proximité' }));
  view.rerender(<LanguageProvider><ProductionServices language="EN" /></LanguageProvider>);
  expect(screen.getByRole('button', { name: 'Preserved source entry · Proximity HR', expanded: true })).toBeInTheDocument();
  expect(screen.getByText('Action originale fictive')).toBeInTheDocument();
  expect(api.getProductionServiceFollowup).toHaveBeenCalledTimes(1);
});
test('a late response after unmount is ignored and the read is aborted', async () => {
  let complete;
  api.getProductionServiceFollowup.mockImplementation(() => new Promise(resolve => { complete = resolve; }));
  const view = show();
  const signal = api.getProductionServiceFollowup.mock.calls[0][0].signal;
  view.unmount();
  expect(signal.aborted).toBe(true);
  await act(async () => complete(payload()));
});
test('source search and cross-function links reuse the existing spaces', async () => {
  show();
  await screen.findByText('GD-008');
  fireEvent.change(screen.getByPlaceholderText('Rechercher...'), { target: { value: 'Action originale' } });
  expect(screen.getByText('RH de proximité')).toBeInTheDocument();
  expect(screen.queryByText('Organisation documentaire')).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Ouvrir les ressources RH' })).toHaveAttribute('href', '/rh?tab=resources');
  expect(screen.getByRole('link', { name: 'Planification et projets' })).toHaveAttribute('href', '/administration?tab=planning');
});
test.each([
  { success: true, data: [] },
  payload([row(), row()]),
  payload([row({ dossier_id: 'GD-002' })]),
  payload([row({ dossier_type: 'employee' })]),
  payload([row({ verified_on: '2026-02-30' })]),
  payload([row({ display_next_action: null })]),
  { ...payload(), source: { ...payload().source, read_only: false } }
])('rejects malformed, unrelated or duplicate source data', invalid => {
  expect(() => readServiceSources(invalid)).toThrow('SERVICE_FOLLOWUP_SOURCE_INVALID');
});
test('a partial source remains explicit without implying a zero delivery cost', async () => {
  show();
  expect(await screen.findByText('Source attendue non rattachée')).toBeInTheDocument();
  expect(screen.getAllByText('À qualifier')).toHaveLength(2);
  expect(screen.queryByText(/^0(?:[,.]00)?(?: CHF| CFA)?$/)).not.toBeInTheDocument();
});
