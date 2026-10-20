import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ProductionTools from './ProductionTools';
const mockNavigate = jest.fn();
let mockSearch = '';
jest.mock('react-router-dom', () => ({ useNavigate: () => mockNavigate, useLocation: () => ({ search: mockSearch }) }), { virtual: true });
jest.mock('./AuthContext', () => ({ useAuth: () => ({ user: { id: 'synthetic', email: 'qa@example.test' } }) }));
beforeEach(() => { mockSearch = ''; jest.clearAllMocks(); });

test.each(['FR', 'DE', 'EN'])('keeps eight families, five internal entries, two existing external links and one shared task in %s', language => {
  const { container } = render(<ProductionTools language={language}/>);
  expect(container.querySelectorAll('article')).toHaveLength(8);
  expect(screen.getAllByRole('button')).toHaveLength(6);
  fireEvent.click(screen.getByRole('button', { name: /Budget Perso CH/ }));
  expect(mockNavigate).toHaveBeenLastCalledWith('/account?view=finances&returnTo=production#personal-finances');
  fireEvent.click(screen.getByRole('button', { name: /Daily Intelligence Dashboard/ }));
  expect(mockNavigate).toHaveBeenLastCalledWith('/?view=intelligence&returnTo=production-tools');
  expect(container.textContent).not.toMatch(/C:\\|50000|30000|50 000|30 000/);
  expect(screen.queryByRole('button', { name: /FluxConvert/ })).not.toBeInTheDocument();
  expect(container.querySelectorAll('details')).toHaveLength(4);
  expect(container.textContent).toContain('0.1.0');
  expect(container.textContent).toContain('SQLite');
  expect(container.textContent).toContain('24');
  expect(container.textContent).not.toContain('file:///');
  expect(screen.getByRole('link', { name: /FluxConvert/ })).toHaveAttribute('href', 'https://fluxconvert-app.vercel.app/fr');
  expect(screen.getByRole('link', { name: /FluxConvert/ })).toHaveAttribute('rel', 'noreferrer');
  expect(screen.getAllByRole('link')).toHaveLength(2);
  expect(container.querySelector('#production-tool-daily-brief a')).toHaveAttribute('href', 'https://chatgpt.com/s/t_6ad5606d2a488191ba1548f9b85daf9b');
  const follow = screen.getAllByRole('button').find(e => /raccordement|Anbindungsaufgabe|connection task/.test(e.textContent));
  fireEvent.click(follow);
  expect(mockNavigate).toHaveBeenLastCalledWith('/account?view=tasks&returnTo=production&taskSearch=TAC-PROD-OUTILS-20261019-001#own-account-top');
});

test('opens only the local verified launcher for the comparator without a public source file', () => {
  mockSearch = '?tab=manufacturing&tool=comparator-avants-fenetres';
  const { container } = render(<ProductionTools/>);
  expect(screen.getByRole('heading', { name: 'Comparateur Avants de fenêtre' })).toBeInTheDocument();
  expect(screen.getByLabelText(/Fichier HTML existant/)).toHaveAttribute('type', 'file');
  expect(screen.getByRole('button', { name: 'Ouvrir la copie locale' })).toBeDisabled();
  expect(container.querySelector('iframe')).toBeNull();
  expect(container.querySelectorAll('#production-tools article')).toHaveLength(8);
});
