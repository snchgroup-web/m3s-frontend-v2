import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import OwnProfile from './OwnProfile';
import api from './api';

const mockNavigate = jest.fn();
let mockLanguage = 'FR';
let mockSearch = '';
let mockUser = { email: 'fixture@example.test' };
jest.mock('react-router-dom', () => ({ useNavigate: () => mockNavigate, useLocation: () => ({ search: mockSearch }) }), { virtual: true });
jest.mock('./LanguageContext', () => ({ useLanguage: () => ({ language: mockLanguage }) }));
jest.mock('./AuthContext', () => ({ useAuth: () => ({ user: mockUser }) }));
jest.mock('./PersonalBudget', () => ({ principal }) => <div data-testid="personal-budget" data-account={principal.email}/>);
jest.mock('./api', () => ({ __esModule: true, default: { getOwnProfile: jest.fn() } }));
jest.mock('./PrivateGedDocuments', () => ({ scope }) => <div data-testid="private-ged" data-scope={scope}/>);
const result = { success: true, scope: 'current-account', account: { email: 'fixture@example.test', role: 'Manager' },
  profile: { personId: 'PER-2SG-9001', displayName: 'Synthetic Person', team: 'TZH', memberType: 'Fondateur', position: 'Synthetic role' },
  source: { id: 'RH-001', status: 'validated_documentary', approvedOn: '2026-09-26' } };

beforeEach(() => { jest.clearAllMocks(); mockLanguage = 'FR'; mockSearch = ''; mockUser = { email: 'fixture@example.test' }; api.getOwnProfile.mockResolvedValue(result); });

test('reads the linked profile, refreshes and returns to dashboard', async () => {
  render(<OwnProfile/>);
  expect(await screen.findByText('Synthetic Person')).toBeInTheDocument();
  expect(screen.getByText('fixture@example.test')).toBeInTheDocument();
  expect(screen.getByText('PER-2SG-9001')).toBeInTheDocument();
  expect(screen.getByText('Synthetic role')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Actualiser' }));
  await waitFor(() => expect(api.getOwnProfile).toHaveBeenCalledTimes(2));
  fireEvent.click(screen.getByRole('button', { name: 'Retour au tableau de bord' }));
  expect(mockNavigate).toHaveBeenCalledWith('/');
});

test('refresh failure clears previously displayed private profile', async () => {
  render(<OwnProfile/>);
  await screen.findByText('Synthetic Person');
  api.getOwnProfile.mockRejectedValueOnce(Object.assign(new Error(), { code: 'PROFILE_NOT_LINKED' }));
  fireEvent.click(screen.getByRole('button', { name: 'Actualiser' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('pas encore raccordé');
  expect(screen.queryByText('Synthetic Person')).not.toBeInTheDocument();
});

test.each([['EN', 'My account', 'Profile linked'], ['DE', 'Mein Konto', 'Profil verknüpft']])('renders %s without French UI labels', async (language, title, status) => {
  mockLanguage = language;
  render(<OwnProfile/>);
  expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  expect(await screen.findByText(status)).toBeInTheDocument();
  expect(screen.queryByText('Adresse professionnelle')).not.toBeInTheDocument();
});

test('aborts pending reads when leaving the page', () => {
  api.getOwnProfile.mockReturnValue(new Promise(() => {}));
  const { unmount } = render(<OwnProfile/>);
  const { signal } = api.getOwnProfile.mock.calls[0][0];
  unmount();
  expect(signal.aborted).toBe(true);
});

test('links HR while keeping finance outside the personal account', async () => {
  render(<OwnProfile/>); await screen.findByText('Synthetic Person');
  expect(screen.getByTestId('private-ged')).toHaveAttribute('data-scope', 'personal');
  fireEvent.click(screen.getByRole('button', { name: 'Mon compte RH' }));
  expect(mockNavigate).toHaveBeenCalledWith('/rh?tab=myaccount');
  expect(screen.queryByRole('button', { name: 'Documents financiers 2SG' })).not.toBeInTheDocument();
});

test.each(['FR', 'EN', 'DE'])('personal finance is distinct from organisational finance in %s', async language => {
  mockLanguage = language;
  const { rerender } = render(<OwnProfile/>);
  await screen.findByText('Synthetic Person');
  fireEvent.click(screen.getByRole('button', { name: /financ|finanz/i }));
  expect(mockNavigate).toHaveBeenCalledWith('/account?view=finances#personal-finances');
  expect(screen.queryByRole('button', { name: /2SG/ })).not.toBeInTheDocument();
  rerender(<OwnProfile embedded/>);
  expect(screen.queryByRole('button', { name: /financ|finanz/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  expect(screen.getByTestId('private-ged')).toHaveAttribute('data-scope', 'personal');
});

test('opens the private budget only after the own profile is linked and never in the embedded HR view', async () => {
  mockSearch = '?view=finances';
  const { rerender } = render(<OwnProfile/>);
  expect(screen.queryByTestId('personal-budget')).not.toBeInTheDocument();
  expect(await screen.findByTestId('personal-budget')).toHaveAttribute('data-account', 'fixture@example.test');
  rerender(<OwnProfile embedded/>);
  expect(screen.queryByTestId('personal-budget')).not.toBeInTheDocument();
});

test('changing account unmounts its private content before the new profile resolves', async () => {
  mockSearch = '?view=finances';
  const { rerender } = render(<OwnProfile/>);
  await screen.findByTestId('personal-budget');
  mockUser = { email: 'another@example.test' };
  api.getOwnProfile.mockReturnValue(new Promise(() => {}));
  rerender(<OwnProfile/>);
  expect(screen.queryByTestId('personal-budget')).not.toBeInTheDocument();
  expect(screen.queryByText('Synthetic Person')).not.toBeInTheDocument();
});

test('returns from the budget to the Production catalogue without a new cycle', async () => {
  mockSearch = '?view=finances&returnTo=production';
  render(<OwnProfile/>); await screen.findByTestId('personal-budget');
  fireEvent.click(screen.getByRole('button', { name: 'Retour aux outils Production' }));
  expect(mockNavigate).toHaveBeenCalledWith('/production?tab=manufacturing#production-tools');
});

test('HR embedded account reuses the same profile without a self-link', async () => {
  render(<OwnProfile embedded/>); await screen.findByText('Synthetic Person');
  expect(api.getOwnProfile).toHaveBeenCalledTimes(1);
  expect(screen.queryByRole('button', { name: 'Mon compte RH' })).not.toBeInTheDocument();
});

test.each([['FR', 'Fonction'], ['EN', 'Position'], ['DE', 'Funktion']])('renders the approved compact position in %s without changing the source or account role', async (language, label) => {
  mockLanguage = language;
  const position = 'Manager et coordinateur général de 2SG - architecte fonctionnel M3S';
  const profile = Object.freeze({ ...result.profile, position });
  api.getOwnProfile.mockResolvedValue({ ...result, profile, account: { ...result.account, role: 'Synthetic access role' } });
  render(<OwnProfile/>);
  await screen.findByText('Synthetic Person');
  expect(screen.getByText(label).parentElement).toHaveTextContent(`${label}Manager`);
  expect(screen.getByText('Manager')).toHaveAttribute('translate', 'no');
  expect(screen.queryByText(position)).not.toBeInTheDocument();
  expect(screen.getByText('Synthetic access role')).toBeInTheDocument();
  expect(profile.position).toBe(position);
});
