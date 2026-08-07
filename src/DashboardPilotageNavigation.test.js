import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import DashboardPilotageNavigation from './DashboardPilotageNavigation';
import api from './api';

jest.mock('./api', () => ({
  __esModule: true,
  default: {
    getLatestIntelligence: jest.fn(),
    getLatestIntelligenceArtifact: jest.fn()
  }
}));

beforeEach(() => {
  api.getLatestIntelligence.mockResolvedValue({ success: true, data: null });
});

test('shows the four management responsibilities in French', () => {
  render(<DashboardPilotageNavigation language="FR" onNavigate={jest.fn()} />);

  expect(screen.getByRole('heading', { name: 'Décider avec une vue d’ensemble fiable' })).toBeInTheDocument();
  expect(screen.getByText('Piloter')).toBeInTheDocument();
  expect(screen.getByText('Organiser')).toBeInTheDocument();
  expect(screen.getByText('Animer')).toBeInTheDocument();
  expect(screen.getByText('Diriger')).toBeInTheDocument();
});

test('keeps Intelligence honest when no edition is published', async () => {
  const onNavigate = jest.fn();
  render(<DashboardPilotageNavigation language="EN" onNavigate={onNavigate} />);

  fireEvent.click(screen.getByRole('tab', { name: '2SG Intelligence' }));
  expect(await screen.findByText('No published edition')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Open Monitoring & KM/ }));
  expect(onNavigate).toHaveBeenCalledWith('/ged?tab=knowledge');
});

test('shows the real edition and its three secured artifacts', async () => {
  api.getLatestIntelligence.mockResolvedValue({
    success: true,
    data: { editionDate: '2026-08-07', sourceVersion: 'V4' }
  });
  render(<DashboardPilotageNavigation language="FR" onNavigate={jest.fn()} />);

  fireEvent.click(screen.getByRole('tab', { name: 'Intelligence 2SG' }));
  expect(await screen.findByText('Édition disponible')).toBeInTheDocument();
  expect(screen.getByText(/2026-08-07/)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Ouvrir le Dashboard/ })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Ouvrir le PDF/ })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Ouvrir le référentiel/ })).toBeInTheDocument();
});

test('opens real function routes from the trilingual function map', () => {
  const onNavigate = jest.fn();
  render(<DashboardPilotageNavigation language="DE" onNavigate={onNavigate} />);

  fireEvent.click(screen.getByRole('tab', { name: 'Funktionskarte' }));
  fireEvent.click(screen.getByRole('button', { name: 'Öffnen : Verwaltung' }));
  expect(onNavigate).toHaveBeenCalledWith('/administration');
  expect(screen.getByRole('button', { name: 'Öffnen : IT & Support' })).toBeInTheDocument();
});
