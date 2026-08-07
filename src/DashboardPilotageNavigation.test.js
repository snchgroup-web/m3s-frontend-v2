import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import DashboardPilotageNavigation from './DashboardPilotageNavigation';

test('shows the four management responsibilities in French', () => {
  render(<DashboardPilotageNavigation language="FR" onNavigate={jest.fn()} />);

  expect(screen.getByRole('heading', { name: 'Décider avec une vue d’ensemble fiable' })).toBeInTheDocument();
  expect(screen.getByText('Piloter')).toBeInTheDocument();
  expect(screen.getByText('Organiser')).toBeInTheDocument();
  expect(screen.getByText('Animer')).toBeInTheDocument();
  expect(screen.getByText('Diriger')).toBeInTheDocument();
});

test('keeps Intelligence honest and links to the governed knowledge view', () => {
  const onNavigate = jest.fn();
  render(<DashboardPilotageNavigation language="EN" onNavigate={onNavigate} />);

  fireEvent.click(screen.getByRole('tab', { name: '2SG Intelligence' }));
  expect(screen.getByText('Application connection to be completed')).toBeInTheDocument();
  expect(screen.getByText(/No outdated or simulated content/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Open Monitoring & KM/ }));
  expect(onNavigate).toHaveBeenCalledWith('/ged?tab=knowledge');
});

test('opens real function routes from the trilingual function map', () => {
  const onNavigate = jest.fn();
  render(<DashboardPilotageNavigation language="DE" onNavigate={onNavigate} />);

  fireEvent.click(screen.getByRole('tab', { name: 'Funktionskarte' }));
  fireEvent.click(screen.getByRole('button', { name: 'Öffnen : Verwaltung' }));
  expect(onNavigate).toHaveBeenCalledWith('/administration');
  expect(screen.getByRole('button', { name: 'Öffnen : IT & Support' })).toBeInTheDocument();
});
