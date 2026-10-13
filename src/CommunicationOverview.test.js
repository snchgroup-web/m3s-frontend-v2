import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import CommunicationOverview from './CommunicationOverview';
import { AuthProvider } from './AuthContext';
import { LanguageProvider } from './LanguageContext';
jest.mock('./PrivateGedDocuments', () => ({ __esModule: true, default: ({ scope }) => <div data-testid="correspondence-ged">{scope}</div> }));

const renderCommunication = language => render(
  <AuthProvider>
    <LanguageProvider><CommunicationOverview language={language} /></LanguageProvider>
  </AuthProvider>
);

test('renders the governed communication and correspondence model in French', () => {
  renderCommunication('FR');

  expect(screen.getByRole('heading', { name: 'Communication institutionnelle & courrier officiel' })).toBeInTheDocument();
  expect(screen.getByTestId('correspondence-ged')).toHaveTextContent('correspondence');
  expect(screen.getByRole('navigation', { name: 'Navigation dans Communication et Courrier' })).toBeInTheDocument();
  expect(screen.getByText('Exemples fictifs')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Structure et exemples de courrier' })).toBeInTheDocument();
  expect(screen.getByText(/ne correspondent à aucun courrier réel/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Circuit de traitement et de validation' })).toBeInTheDocument();
  expect(screen.getByText(/sans validation humaine/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Responsabilités et frontières fonctionnelles' })).toBeInTheDocument();
});

test('renders the German communication boundaries', () => {
  renderCommunication('DE');

  expect(screen.getByRole('heading', { name: 'Institutionelle Kommunikation & offizielle Korrespondenz' })).toBeInTheDocument();
  expect(screen.getByText('Fiktive Beispiele')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Nach oben' })).toBeInTheDocument();
  expect(screen.getByText(/keine echten Schreiben/i)).toBeInTheDocument();
  expect(screen.getByText(/CRM \/ Marketing: kommerzielle Kommunikation/i)).toBeInTheDocument();
});

test.each([
  ['FR', 'Envoyer une seule fois', 'Inscrire immédiatement', /Envoi confirmé ≠ réception confirmée ≠ archivage réalisé/, 'Circuit documenté'],
  ['EN', 'Send once', 'Record immediately', /Confirmed sending ≠ confirmed receipt ≠ completed archiving/, 'Documented process'],
  ['DE', 'Einmal senden', 'Sofort erfassen', /Bestätigter Versand ≠ bestätigter Empfang ≠ abgeschlossene Archivierung/, 'Dokumentierter Ablauf']
])('separates examples and actual source, and presents the 2SG working method in %s', (language, sendTitle, recordTitle, distinction, badge) => {
  renderCommunication(language);
  const circuit = within(document.getElementById('communication-workflow'));
  expect(circuit.getAllByRole('article')).toHaveLength(8);
  expect(circuit.getByRole('heading', { name: sendTitle })).toBeInTheDocument();
  expect(circuit.getByRole('heading', { name: recordTitle })).toBeInTheDocument();
  expect(circuit.getByText(distinction)).toBeInTheDocument();
  expect(screen.getByText(badge)).toBeInTheDocument();
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
