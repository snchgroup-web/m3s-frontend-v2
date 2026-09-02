import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LanguageProvider } from './LanguageContext';
import MembersDirectory, { translateDirectoryPosition } from './MembersDirectory';
import { api } from './api';

jest.mock('./api', () => ({
  api: { getMembersDirectory: jest.fn() }
}));

const response = {
  success: true,
  classification: 'C2',
  source_status: 'validated_documentary',
  total: 2,
  data: [
    {
      person_id: 'PER-2SG-0001',
      display_name: 'Cheikh Ndiaye',
      preferred_name: 'Cheikh',
      member_type: 'Fondateur',
      team: 'TZH',
      subgroup: null,
      position: 'Manager et coordinateur général',
      active: true
    },
    {
      person_id: 'PER-2SG-0006',
      display_name: 'Ibrahima Ndiaye',
      preferred_name: 'Ibou',
      member_type: 'Associé',
      team: 'TSN',
      subgroup: 'TSN-TASKFORCE',
      position: 'Chef Opérations',
      active: true
    }
  ]
};

const renderDirectory = (props = {}) => render(
  <LanguageProvider>
    <MembersDirectory {...props} />
  </LanguageProvider>
);

beforeEach(() => {
  localStorage.clear();
  api.getMembersDirectory.mockReset();
});

test('shows only the sanitized read-only directory fields', async () => {
  api.getMembersDirectory.mockResolvedValue(response);
  const onLoaded = jest.fn();
  renderDirectory({ onLoaded });

  expect(await screen.findByText('Cheikh Ndiaye')).toBeInTheDocument();
  expect(screen.getByText('Ibrahima Ndiaye')).toBeInTheDocument();
  expect(screen.getByText('Lecture seule')).toBeInTheDocument();
  expect(screen.getByText('C2')).toBeInTheDocument();
  expect(screen.queryByText(/modifier/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/supprimer/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/@/)).not.toBeInTheDocument();
  expect(onLoaded).toHaveBeenCalledWith(2);
});

test('filters directory members without requesting another endpoint', async () => {
  api.getMembersDirectory.mockResolvedValue(response);
  renderDirectory();
  await screen.findByText('Cheikh Ndiaye');

  fireEvent.change(screen.getByPlaceholderText(/Rechercher un nom/i), { target: { value: 'Ibou' } });
  expect(screen.queryByText('Cheikh Ndiaye')).not.toBeInTheDocument();
  expect(screen.getByText('Ibrahima Ndiaye')).toBeInTheDocument();
  expect(api.getMembersDirectory).toHaveBeenCalledTimes(1);
});

test('filters accented associate member types from the backend contract', async () => {
  api.getMembersDirectory.mockResolvedValue(response);
  renderDirectory();
  await screen.findByText('Cheikh Ndiaye');

  fireEvent.change(screen.getByDisplayValue('Tous les types'), { target: { value: 'associe' } });
  expect(screen.queryByText('Cheikh Ndiaye')).not.toBeInTheDocument();
  expect(screen.getByText('Ibrahima Ndiaye')).toBeInTheDocument();
});

test('translates every validated directory position in English and German', () => {
  const expected = [
    ['Manager et coordinateur général de 2SG - architecte fonctionnel M3S', '2SG Manager and General Coordinator - M3S Functional Architect', 'Manager und Gesamtkoordinator von 2SG - Funktionaler Architekt von M3S'],
    ['Administratrice financière et référente sociale', 'Finance Administrator and Social Affairs Lead', 'Finanzadministratorin und Ansprechpartnerin für soziale Belange'],
    ['Cheffe de projets', 'Project Manager', 'Projektleiterin'],
    ['Cheffe Organisation & RH', 'Head of Organization & HR', 'Leiterin Organisation & Personalwesen'],
    ['Responsable Administration & Marketing - référent local 2SG au Sénégal', 'Head of Administration & Marketing - 2SG local representative in Senegal', 'Leiter Administration & Marketing - lokaler 2SG-Ansprechpartner im Senegal'],
    ['Chef Opérations', 'Head of Operations', 'Leiter Operations']
  ];

  expected.forEach(([source, english, german]) => {
    expect(translateDirectoryPosition(source, 'FR')).toBe(source);
    expect(translateDirectoryPosition(source, 'EN')).toBe(english);
    expect(translateDirectoryPosition(source, 'DE')).toBe(german);
  });
  expect(translateDirectoryPosition('Fonction future', 'EN')).toBe('Fonction future');
});

test('shows and searches a translated position in English', async () => {
  localStorage.setItem('language', 'EN');
  api.getMembersDirectory.mockResolvedValue(response);
  renderDirectory();

  expect(await screen.findByText('Head of Operations')).toBeInTheDocument();
  fireEvent.change(screen.getByPlaceholderText(/Search by name/i), { target: { value: 'Head of Operations' } });
  expect(screen.queryByText('Cheikh Ndiaye')).not.toBeInTheDocument();
  expect(screen.getByText('Ibrahima Ndiaye')).toBeInTheDocument();
});

test('explains a forbidden pilot without exposing legacy data', async () => {
  const error = Object.assign(new Error('Accès refusé'), { status: 403 });
  api.getMembersDirectory.mockRejectedValue(error);
  const onLoaded = jest.fn();
  renderDirectory({ onLoaded });

  expect(await screen.findByText('Accès restreint')).toBeInTheDocument();
  expect(screen.getByText(/réservé aux rôles autorisés/i)).toBeInTheDocument();
  expect(onLoaded).toHaveBeenCalledWith(null);
  await waitFor(() => expect(screen.queryByText('Cheikh Ndiaye')).not.toBeInTheDocument());
});

test.each(['FR', 'EN', 'DE'])('applies KPI presets in %s without changing the source total', async language => {
  localStorage.setItem('language', language);
  api.getMembersDirectory.mockResolvedValue(response);
  const onLoaded = jest.fn();
  const view = renderDirectory({ initialMemberType: 'fondateur', onLoaded });
  expect(await screen.findByText('Cheikh Ndiaye')).toBeInTheDocument();
  expect(screen.queryByText('Ibrahima Ndiaye')).not.toBeInTheDocument();
  expect(onLoaded).toHaveBeenLastCalledWith(2);
  view.rerender(<LanguageProvider><MembersDirectory initialMemberType="associe" onLoaded={onLoaded} /></LanguageProvider>);
  expect(await screen.findByText('Ibrahima Ndiaye')).toBeInTheDocument();
  expect(screen.queryByText('Cheikh Ndiaye')).not.toBeInTheDocument();
  expect(api.getMembersDirectory).toHaveBeenCalledTimes(1);
});

test('a new KPI preset clears stale manual filters but ordinary rerenders preserve them', async () => {
  api.getMembersDirectory.mockResolvedValue(response);
  const view = renderDirectory({ initialMemberType: 'fondateur' });
  await screen.findByText('Cheikh Ndiaye');
  fireEvent.change(screen.getByRole('combobox', { name: 'Type' }), { target: { value: 'associe' } });
  fireEvent.change(screen.getByRole('combobox', { name: 'Équipe' }), { target: { value: 'TSN' } });
  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Ibou' } });
  view.rerender(<LanguageProvider><MembersDirectory initialMemberType="fondateur" /></LanguageProvider>);
  expect(screen.getByRole('searchbox')).toHaveValue('Ibou');
  expect(screen.getByRole('combobox', { name: 'Type' })).toHaveValue('associe');
  view.rerender(<LanguageProvider><MembersDirectory initialMemberType="associe" /></LanguageProvider>);
  expect(screen.getByRole('searchbox')).toHaveValue('');
  expect(screen.getByRole('combobox', { name: 'Équipe' })).toHaveValue('');
  expect(screen.getByRole('combobox', { name: 'Type' })).toHaveValue('associe');
  view.rerender(<LanguageProvider><MembersDirectory /></LanguageProvider>);
  expect(screen.getByText('Cheikh Ndiaye')).toBeInTheDocument();
  expect(screen.getByText('Ibrahima Ndiaye')).toBeInTheDocument();
  expect(api.getMembersDirectory).toHaveBeenCalledTimes(1);
});

test.each(['', 'unknown', 'Fondateur', null])('ignores unsupported preset %s', async initialMemberType => {
  api.getMembersDirectory.mockResolvedValue(response);
  renderDirectory({ initialMemberType });
  await screen.findByText('Cheikh Ndiaye');
  expect(screen.getByText('Ibrahima Ndiaye')).toBeInTheDocument();
  expect(screen.getByRole('combobox', { name: 'Type' })).toHaveValue('');
});

test('keeps the arrival section focusable while loading and on forbidden access', async () => {
  api.getMembersDirectory.mockRejectedValue(Object.assign(new Error('Forbidden'), { status: 403 }));
  renderDirectory({ initialMemberType: 'fondateur' });
  const target = document.getElementById('members-directory-register');
  expect(target).toHaveClass('scroll-mt-24');
  target.focus();
  expect(target).toHaveFocus();
  expect(screen.getByRole('status')).toBeInTheDocument();
  await screen.findByRole('alert');
  expect(document.getElementById('members-directory-register')).toBe(target);
  expect(target).toHaveFocus();
  expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
});
