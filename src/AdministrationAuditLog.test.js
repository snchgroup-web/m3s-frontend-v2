import { render, screen, waitFor } from '@testing-library/react';
import AdministrationAuditLog from './AdministrationAuditLog';
import api from './api';

jest.mock('./api', () => ({
  getAdministrationAudit: jest.fn()
}));

beforeEach(() => jest.clearAllMocks());

test('renders source-backed audit metadata without mutation actions', async () => {
  api.getAdministrationAudit.mockResolvedValue({
    data: [{
      id: 'AUD-1', actor_name: 'Membre fondateur', entity_type: 'resource', entity_id: 'RES-1',
      action: 'update', event_at: '2026-08-14T12:00:00.000Z', changed_fields: ['title', 'note']
    }]
  });

  render(<AdministrationAuditLog language="FR" />);

  expect(screen.getByText('Chargement du journal d’audit…')).toBeInTheDocument();
  await waitFor(() => expect(screen.getAllByText('Modification').length).toBeGreaterThan(0));
  expect(screen.getAllByText('Membre fondateur').length).toBeGreaterThan(0);
  expect(screen.getAllByText(/titre, note/).length).toBeGreaterThan(0);
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('renders a clear unavailable state', async () => {
  api.getAdministrationAudit.mockRejectedValue(new Error('unavailable'));
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  render(<AdministrationAuditLog language="DE" />);

  await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('vorübergehend nicht verfügbar'));
  consoleSpy.mockRestore();
});
