import React from 'react';
import { render, screen } from '@testing-library/react';
import AdministrativeAssistant from './AdministrativeAssistant';

test('frames the assistant as preparation-only and preserves human authority', () => {
  render(<AdministrativeAssistant language="FR" />);

  expect(screen.getByRole('heading', { name: 'Assistant administratif 2SG' })).toBeInTheDocument();
  expect(screen.getByText('Non connecté · aucune action autonome')).toBeInTheDocument();
  expect(screen.getAllByText(/Ne valide, ne signe et n’adopte aucun document/).length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText(/N’envoie aucun courrier/).length).toBeGreaterThanOrEqual(1);
});
