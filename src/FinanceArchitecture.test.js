import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FinanceArchitecture from './FinanceArchitecture';

test('distinguishes observed Finance relations from candidate data-model links', () => {
  const { rerender } = render(<FinanceArchitecture language="FR" />);

  expect(screen.getByRole('heading', { name: 'Voir les objets, les sources et leurs réutilisations' })).toBeInTheDocument();
  expect(screen.getByText('/finance/dashboard')).toBeInTheDocument();
  expect(screen.getByText('/finance/social')).toBeInTheDocument();
  expect(screen.getByText('Commercial & CRM')).toBeInTheDocument();
  expect(screen.getByText(/phase_projet.*libellé/)).toBeInTheDocument();
  expect(screen.getByText(/Aucun lien.*task_id.*project_id.*asset_id.*ged_document_id/)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Cas pilote relationnel : transfert CHF/CFA' })).toBeInTheDocument();
  expect(screen.getByText(/aucune migration de données/i)).toBeInTheDocument();

  rerender(<FinanceArchitecture language="DE" />);
  expect(screen.getByRole('heading', { name: 'Objekte, Quellen und ihre Wiederverwendung sichtbar machen' })).toBeInTheDocument();
  expect(screen.getByText('Noch nicht nachgewiesene Beziehungen')).toBeInTheDocument();
});

test('opens governed glossary help without promoting candidate Finance definitions', () => {
  render(<FinanceArchitecture language="FR" />);

  fireEvent.click(screen.getByRole('button', { name: 'Définition du Glossaire : Écriture financière' }));
  expect(screen.getByRole('dialog', { name: 'Écriture financière' })).toBeInTheDocument();
  expect(screen.getByText('Définition proposée')).toBeInTheDocument();
  expect(screen.getByText('Publication dans le Glossaire après validation')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Fermer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Définition du Glossaire : Taux de change de référence' }));
  expect(screen.getByRole('dialog', { name: 'Taux de change de référence' })).toBeInTheDocument();
  expect(screen.getByText('Définition proposée')).toBeInTheDocument();
  expect(screen.getByText('Publication dans le Glossaire après validation')).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Voir dans le Glossaire' })).not.toBeInTheDocument();
});
