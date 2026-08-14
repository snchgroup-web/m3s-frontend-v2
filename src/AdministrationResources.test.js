import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AdministrationResources from './AdministrationResources';

beforeEach(() => {
  localStorage.clear();
  jest.spyOn(window, 'confirm').mockReturnValue(true);
});

afterEach(() => jest.restoreAllMocks());

test('shows the governed resource baseline and adds a local resource with confirmation', () => {
  render(<AdministrationResources language="FR" />);

  expect(screen.getByText('Inventaire documentaire gouverné 2SG/M3S')).toBeInTheDocument();
  expect(screen.getAllByText(/base initiale non exhaustive/i).length).toBeGreaterThanOrEqual(1);
  fireEvent.click(screen.getByRole('button', { name: 'Ajouter une ressource' }));
  fireEvent.change(screen.getByLabelText('Titre *'), { target: { value: 'Manuel administratif' } });
  fireEvent.change(screen.getByLabelText('Autorité ou propriétaire *'), { target: { value: 'Administration 2SG' } });
  fireEvent.change(screen.getByLabelText('URL ou emplacement GED *'), { target: { value: 'GED / Administration / Manuel' } });
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));

  expect(window.confirm).toHaveBeenCalled();
  expect(screen.getByText('Manuel administratif')).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Ressource enregistrée avec succès.');
});

test('localizes the preloaded resource content without translating user entries', () => {
  render(<AdministrationResources language="EN" />);

  expect(screen.getByText('2SG/M3S governed document inventory')).toBeInTheDocument();
  expect(screen.getByText(/substantive validation, signature and adoption remain distinct/i)).toBeInTheDocument();
  expect(screen.queryByText('Pilote Administration M3S')).not.toBeInTheDocument();
});
