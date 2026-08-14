import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CommunicationOverview from './CommunicationOverview';
import { AuthProvider } from './AuthContext';

const renderCommunication = language => render(
  <AuthProvider>
    <CommunicationOverview language={language} />
  </AuthProvider>
);

test('renders the governed communication and correspondence model in French', () => {
  renderCommunication('FR');

  expect(screen.getByRole('heading', { name: 'Communication institutionnelle & courrier officiel' })).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: 'Navigation dans Communication et Courrier' })).toBeInTheDocument();
  expect(screen.getByText('Données de démonstration')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Registre pilote du courrier et des communications' })).toBeInTheDocument();
  expect(screen.getByText(/ne correspondent à aucun courrier réel/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Circuit de traitement et de validation' })).toBeInTheDocument();
  expect(screen.getByText(/sans validation humaine/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Responsabilités et frontières fonctionnelles' })).toBeInTheDocument();
});

test('renders the German communication boundaries', () => {
  renderCommunication('DE');

  expect(screen.getByRole('heading', { name: 'Institutionelle Kommunikation & offizielle Korrespondenz' })).toBeInTheDocument();
  expect(screen.getByText('Demonstrationsdaten')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Nach oben' })).toBeInTheDocument();
  expect(screen.getByText(/keine echten Schreiben/i)).toBeInTheDocument();
  expect(screen.getByText(/CRM \/ Marketing: kommerzielle Kommunikation/i)).toBeInTheDocument();
});

test('uses the communication internal navigation', () => {
  const scrollIntoView = jest.fn();
  const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
  window.HTMLElement.prototype.scrollIntoView = scrollIntoView;

  renderCommunication('EN');
  fireEvent.click(screen.getByRole('button', { name: 'Workflow' }));

  expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
});
