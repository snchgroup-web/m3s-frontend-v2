import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import InstitutionOverview from './InstitutionOverview';

test('renders the validated horizontal governance in French', () => {
  render(<InstitutionOverview language="FR" />);

  expect(screen.getByRole('heading', { name: '2SG - Institution hybride et gouvernance' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Carte d’identité institutionnelle' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Ce que couvre la gestion administrative dans M3S' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Planification & gestion de projets' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Conformité légale & obligations' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Documents directeurs & lectures visuelles' })).toBeInTheDocument();
  expect(screen.getByText('Business Plan 2SG V8 - travail')).toBeInTheDocument();
  expect(screen.getByText(/Association internationale, structure de social business/i)).toBeInTheDocument();
  expect(screen.getByText(/Les pièces sont conservées dans la GED/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Un Bureau horizontal' })).toBeInTheDocument();
  expect(screen.getByText('Cheikh Ndiaye')).toBeInTheDocument();
  expect(screen.getByText('Chantal Löffler')).toBeInTheDocument();
  expect(screen.getByText('Ibrahima Ndiaye (Ibou)')).toBeInTheDocument();
  expect(screen.getAllByText('Droit Admin M3S')).toHaveLength(2);
  expect(screen.getByText(/ne transforme pas cette personne en supérieur hiérarchique général/i)).toBeInTheDocument();
});

test('renders access boundaries and support reporting in English', () => {
  render(<InstitutionOverview language="EN" />);

  expect(screen.getByRole('heading', { name: '2SG - Hybrid institution and governance' })).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: 'Institution navigation' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Back to top' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Institutional architecture and master sources' })).toBeInTheDocument();
  expect(screen.getByText(/report directly to Ibou/i)).toBeInTheDocument();
  expect(screen.getByText(/User access in other modules/i)).toBeInTheDocument();
  expect(screen.getByText(/No account or M3S right by default/i)).toBeInTheDocument();
});

test('renders the German institutional labels', () => {
  render(<InstitutionOverview language="DE" />);

  expect(screen.getByRole('heading', { name: '2SG - Hybride Institution und Governance' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Was administrative Verwaltung in M3S umfasst' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Ein horizontal organisiertes Büro' })).toBeInTheDocument();
  expect(screen.getAllByText('M3S-Adminrecht')).toHaveLength(2);
  expect(screen.getByText(/Vorfinanzierung von Investitionen und Betrieb/i)).toBeInTheDocument();
});

test('uses the internal navigation to reach a section', () => {
  const scrollIntoView = jest.fn();
  const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
  window.HTMLElement.prototype.scrollIntoView = scrollIntoView;

  render(<InstitutionOverview language="EN" />);
  fireEvent.click(screen.getByRole('button', { name: 'Governance & team' }));

  expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
});
