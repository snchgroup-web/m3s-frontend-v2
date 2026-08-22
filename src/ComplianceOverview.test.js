import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ComplianceOverview from './ComplianceOverview';

test('renders the cautious compliance model in French', () => {
  render(<ComplianceOverview language="FR" />);

  expect(screen.getByRole('heading', { name: 'Conformité légale, réglementaire & juridique' })).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: 'Navigation dans Conformité' })).toBeInTheDocument();
  expect(screen.getByText('Aucune conformité déclarée')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Avancement documentaire LEGAL' })).toBeInTheDocument();
  expect(screen.getByLabelText('Étape documentaire en cours')).toHaveTextContent('Applicabilité à qualifier');
  expect(screen.getByText('Applicabilité')).toBeInTheDocument();
  expect(screen.getByText('Adoption / publication')).toBeInTheDocument();
  expect(screen.getByText('Applicabilité').closest('li')).toHaveAttribute('aria-current', 'step');
  expect(screen.getByText('Constitué')).toBeInTheDocument();
  expect(screen.getByText(/Livrable préparatoire externe reçu · en contrôle/i)).toBeInTheDocument();
  expect(screen.getByText(/ne mesure ni ne certifie la conformité juridique/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Registres des obligations et dossiers juridiques' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Conformité de l’association à vérifier' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Villa LR1 — dossier A. Kane' })).toBeInTheDocument();
  expect(screen.getByText(/Aucune responsabilité ni issue judiciaire n’est présumée/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Répartition des responsabilités' })).toBeInTheDocument();
  expect(screen.getByText(/ne remplace pas les modules métiers ni une expertise juridique/i)).toBeInTheDocument();
});

test('renders the German compliance boundaries', () => {
  render(<ComplianceOverview language="DE" />);

  expect(screen.getByRole('heading', { name: 'Rechtliche, regulatorische & institutionelle Compliance' })).toBeInTheDocument();
  expect(screen.getByText('Keine Konformität behauptet')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Dokumentationsfortschritt LEGAL' })).toBeInTheDocument();
  expect(screen.getByLabelText('Aktuelle Dokumentationsetappe')).toHaveTextContent('Anwendbarkeit zu qualifizieren');
  expect(screen.getByRole('button', { name: 'Nach oben' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Villa LR1 — Fall A. Kane' })).toBeInTheDocument();
  expect(screen.getByText(/Weder Haftung noch Verfahrensausgang/i)).toBeInTheDocument();
  expect(screen.getByText(/ersetzt weder Fachmodule noch Rechtsberatung/i)).toBeInTheDocument();
});

test('preserves the selected compliance section when the language changes', () => {
  const scrollIntoView = jest.fn();
  const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
  window.HTMLElement.prototype.scrollIntoView = scrollIntoView;

  const { rerender } = render(<ComplianceOverview language="EN" />);
  fireEvent.click(screen.getByRole('button', { name: 'Registers' }));
  rerender(<ComplianceOverview language="DE" />);

  expect(scrollIntoView).toHaveBeenNthCalledWith(1, { behavior: 'smooth', block: 'start' });
  expect(scrollIntoView).toHaveBeenNthCalledWith(2, { behavior: 'auto', block: 'start' });
  window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
});
