import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductionServices from './ProductionServices';
import api from './api';
import { LanguageProvider } from './LanguageContext';
jest.mock('./api', () => ({ __esModule: true, default: { getProductionServiceFollowup: jest.fn() } }));
jest.mock('./ProductionSharedServiceCyclePanel', () => () => null);
jest.mock('./InstitutionalGedBundle', () => ({ kind = 'documents' }) => <span data-testid={`bundle-${kind}`}>{kind}</span>);
const ids = ['GD-005', 'GD-006', 'GD-008', 'GD-009'];
const payload = selected => ({ success: true, source: { registry: 'management_dossiers', system: 'bigquery', scope: 'internal_service_preparation', read_only: true },
  data: selected.map(dossier_id => ({ dossier_id, dossier_type: dossier_id === 'GD-009' ? 'rh_tools' : dossier_id === 'GD-008' ? 'rh_proximity_framework' : 'document_governance',
    verified_on: '2026-10-17', display_title: 'Synthetic source', status: 'active', responsible_status: 'to_confirm', display_state: 'Synthetic state', display_next_action: 'Synthetic next action', source_ref: 'Synthetic reference' })) });

test('supplement entry is connected only after all four actual source dossiers load', async () => {
  api.getProductionServiceFollowup.mockResolvedValue(payload(ids));
  render(<LanguageProvider><ProductionServices /></LanguageProvider>); expect(await screen.findByTestId('bundle-offers')).toBeVisible();
});

test('missing source leaves supplementary entry absent without inventing a dossier', async () => {
  api.getProductionServiceFollowup.mockResolvedValue(payload(ids.slice(0, 3)));
  render(<LanguageProvider><ProductionServices /></LanguageProvider>); await screen.findByText('Source connectée : registre des grands dossiers');
  expect(screen.queryByTestId('bundle-offers')).not.toBeInTheDocument();
});
