import React from 'react';
import { render, screen } from '@testing-library/react';
import { FunctionArchitectureOverview, FunctionProcessOverview } from './FunctionStructuralViews';

test.each([
  ['rh', 'FR', 'Architecture & relations Ressources Humaines'],
  ['commercial', 'EN', 'Commercial & CRM architecture & relations'],
  ['production', 'DE', 'Architektur & Beziehungen Produktion'],
  ['stock', 'FR', 'Architecture & relations Stock & Actifs'],
  ['it-support', 'EN', 'IT & Support architecture & relations']
])('renders a source-conscious architecture view for %s in %s', (moduleId, language, title) => {
  render(<FunctionArchitectureOverview moduleId={moduleId} language={language} />);

  expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  expect(screen.getAllByRole('article')).toHaveLength(8);
  expect(screen.getByText(/source maîtresse|master source|Masterquelle/i)).toBeInTheDocument();
});

test.each([
  ['rh', 'EN', 'Human Resources processes & procedures'],
  ['commercial', 'FR', 'Processus & procédures Commercial & CRM'],
  ['production', 'DE', 'Prozesse & Verfahren Produktion'],
  ['stock', 'EN', 'Stock & Assets processes & procedures'],
  ['it-support', 'FR', 'Processus & procédures IT & Support']
])('renders the six-step process and four controls for %s in %s', (moduleId, language, title) => {
  const { container } = render(<FunctionProcessOverview moduleId={moduleId} language={language} />);

  expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  expect(container.querySelectorAll('ol > li')).toHaveLength(6);
  expect(screen.getAllByRole('article')).toHaveLength(4);
  expect(screen.getByText(/procédure reste candidate|procedure remains a candidate|Verfahren bleibt ein Kandidat/i)).toBeInTheDocument();
});
