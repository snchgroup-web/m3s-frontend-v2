import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FunctionResourcesOverview from './FunctionResourcesOverview';

test.each([
  ['finances', 'FR', 'Ressources Finances'],
  ['it-support', 'EN', 'IT & Support resources'],
  ['commercial', 'DE', 'Ressourcen Vertrieb & CRM'],
  ['production', 'FR', 'Ressources Production'],
  ['stock', 'EN', 'Stock & Assets resources'],
])('renders a governed resources view for %s in %s', (moduleId, language, title) => {
  render(<FunctionResourcesOverview moduleId={moduleId} language={language} onSelectTab={jest.fn()} />);

  expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  expect(screen.getAllByRole('article')).toHaveLength(4);
  expect(screen.getAllByRole('link')).toHaveLength(2);
});

test('opens the local glossary without leaving the function', () => {
  const onSelectTab = jest.fn();
  render(<FunctionResourcesOverview moduleId="production" language="FR" onSelectTab={onSelectTab} />);

  fireEvent.click(screen.getByRole('button', { name: /Glossaire métier/i }));
  expect(onSelectTab).toHaveBeenCalledWith('glossary');
});
