import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import DirectorDocumentVisual from './DirectorDocumentVisual';

test('navigates through the French governing document journey while preserving V3C', () => {
  render(<DirectorDocumentVisual language="FR" onClose={jest.fn()} />);

  expect(screen.getByRole('heading', { name: 'Document Directeur Global 2SG V4' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Identité & vocation' })).toBeInTheDocument();
  expect(screen.getByText('V3C historique préservée')).toBeInTheDocument();
  expect(screen.getByText('Date de la source : 02-08-2026')).toBeInTheDocument();
  expect(screen.getByText('Classification : Interne C2')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Vue suivante' }));
  expect(screen.getByRole('heading', { name: 'Positionnement & promesse' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('tab', { name: 'Afficher la vue : Trajectoire & garde-fous' }));
  expect(screen.getByText(/consolidation formelle de la V4/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Consulter la source dans la GED' })).toHaveAttribute('href', '/ged?tab=documents');
});

test('renders the German governance warning and closes', () => {
  const onClose = jest.fn();
  render(<DirectorDocumentVisual language="DE" onClose={onClose} />);

  expect(screen.getByText(/konsolidiert das Dokument nicht automatisch/i)).toBeInTheDocument();
  expect(screen.getByText('Historische V3C bleibt erhalten')).toBeInTheDocument();
  expect(screen.getByText('Quelldatum: 02.08.2026')).toBeInTheDocument();
  expect(screen.getByText('Klassifizierung: Intern C2')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Pfad des Leitdokuments schließen' }));
  expect(onClose).toHaveBeenCalledTimes(1);
});
