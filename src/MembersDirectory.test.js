import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LanguageProvider } from './LanguageContext';
import MembersDirectory from './MembersDirectory';
import { api } from './api';

jest.mock('./api', () => ({
  api: { getMembersDirectory: jest.fn() }
}));

const response = {
  success: true,
  classification: 'C2',
  source_status: 'validated_documentary',
  total: 2,
  data: [
    {
      person_id: 'PER-2SG-0001',
      display_name: 'Cheikh Ndiaye',
      preferred_name: 'Cheikh',
      member_type: 'Fondateur',
      team: 'TZH',
      subgroup: null,
      position: 'Manager et coordinateur général',
      active: true
    },
    {
      person_id: 'PER-2SG-0006',
      display_name: 'Ibrahima Ndiaye',
      preferred_name: 'Ibou',
      member_type: 'Associé',
      team: 'TSN',
      subgroup: 'TSN-TASKFORCE',
      position: 'Chef Opérations',
      active: true
    }
  ]
};

const renderDirectory = (props = {}) => render(
  <LanguageProvider>
    <MembersDirectory {...props} />
  </LanguageProvider>
);

beforeEach(() => {
  localStorage.clear();
  api.getMembersDirectory.mockReset();
});

test('shows only the sanitized read-only directory fields', async () => {
  api.getMembersDirectory.mockResolvedValue(response);
  const onLoaded = jest.fn();
  renderDirectory({ onLoaded });

  expect(await screen.findByText('Cheikh Ndiaye')).toBeInTheDocument();
  expect(screen.getByText('Ibrahima Ndiaye')).toBeInTheDocument();
  expect(screen.getByText('Lecture seule')).toBeInTheDocument();
  expect(screen.getByText('C2')).toBeInTheDocument();
  expect(screen.queryByText(/modifier/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/supprimer/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/@/)).not.toBeInTheDocument();
  expect(onLoaded).toHaveBeenCalledWith(2);
});

test('filters directory members without requesting another endpoint', async () => {
  api.getMembersDirectory.mockResolvedValue(response);
  renderDirectory();
  await screen.findByText('Cheikh Ndiaye');

  fireEvent.change(screen.getByPlaceholderText(/Rechercher un nom/i), { target: { value: 'Ibou' } });
  expect(screen.queryByText('Cheikh Ndiaye')).not.toBeInTheDocument();
  expect(screen.getByText('Ibrahima Ndiaye')).toBeInTheDocument();
  expect(api.getMembersDirectory).toHaveBeenCalledTimes(1);
});

test('filters accented associate member types from the backend contract', async () => {
  api.getMembersDirectory.mockResolvedValue(response);
  renderDirectory();
  await screen.findByText('Cheikh Ndiaye');

  fireEvent.change(screen.getByDisplayValue('Tous les types'), { target: { value: 'associe' } });
  expect(screen.queryByText('Cheikh Ndiaye')).not.toBeInTheDocument();
  expect(screen.getByText('Ibrahima Ndiaye')).toBeInTheDocument();
});

test('explains a forbidden pilot without exposing legacy data', async () => {
  const error = Object.assign(new Error('Accès refusé'), { status: 403 });
  api.getMembersDirectory.mockRejectedValue(error);
  renderDirectory();

  expect(await screen.findByText('Accès restreint')).toBeInTheDocument();
  expect(screen.getByText(/réservé aux rôles autorisés/i)).toBeInTheDocument();
  await waitFor(() => expect(screen.queryByText('Cheikh Ndiaye')).not.toBeInTheDocument());
});
