import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import Layout from './Layout';
import { PRODUCTION_SERVICE_DESTINATIONS, PRODUCTION_SERVICE_RETURN_PATH, getProductionServiceReturnPath } from './productionServiceNavigation';

let mockLanguage = 'FR';
let mockPath = '/';
const mockRouteListeners = new Set();
jest.mock('react-router-dom', () => {
  const { useSyncExternalStore } = require('react');
  return {
    useLocation: () => {
      const path = useSyncExternalStore(listener => {
        mockRouteListeners.add(listener);
        return () => mockRouteListeners.delete(listener);
      }, () => mockPath);
      const url = new URL(path, 'https://m3s.local');
      return { pathname: url.pathname, search: url.search, hash: url.hash };
    },
    useNavigate: () => path => {
      mockPath = path;
      mockRouteListeners.forEach(listener => listener());
    }
  };
}, { virtual: true });
jest.mock('./LanguageContext', () => ({ useLanguage: () => ({ language: mockLanguage }) }));
jest.mock('./AuthContext', () => ({ useAuth: () => ({ user: { permissions: [] } }) }));
jest.mock('./Header', () => () => <header>Test header</header>);
jest.mock('./moduleNavigation', () => ({ useModuleNavigation: jest.fn() }));

const Route = () => {
  const location = useLocation();
  return <output data-testid="route">{location.pathname}{location.search}{location.hash}</output>;
};
const show = (entry, language = 'FR') => {
  mockLanguage = language;
  mockPath = entry;
  return render(<Layout><Route /></Layout>);
};

test.each(Object.entries(PRODUCTION_SERVICE_DESTINATIONS))('%s has a fixed safe return independent of browser history', (_, path) => {
  const url = new URL(path, 'https://m3s.local');
  expect(getProductionServiceReturnPath(url.pathname, url.search)).toBe(PRODUCTION_SERVICE_RETURN_PATH);
});

test.each([
  ['FR', 'Retour au suivi des prestations'],
  ['DE', 'Zurück zur Leistungsverfolgung'],
  ['EN', 'Back to service delivery follow-up']
])('all three destination returns work in %s', (language, label) => {
  for (const entry of Object.values(PRODUCTION_SERVICE_DESTINATIONS)) {
    const view = show(entry, language);
    const nav = screen.getByRole('navigation', { name: label });
    expect(nav).toHaveClass('sticky', 'top-0');
    fireEvent.click(screen.getByRole('button', { name: label }));
    expect(screen.getByTestId('route')).toHaveTextContent(PRODUCTION_SERVICE_RETURN_PATH);
    expect(screen.queryByRole('navigation', { name: label })).not.toBeInTheDocument();
    view.unmount();
  }
});

test.each([
  '/administration?tab=communication',
  '/administration?tab=users&returnTo=production-services',
  '/rh?tab=employes&returnTo=production-services',
  '/production?tab=services&returnTo=production-services',
  '/rh?tab=resources&returnTo=https://external.invalid'
])('does not add a service return to unrelated destination %s', entry => {
  const url = new URL(entry, 'https://m3s.local');
  expect(getProductionServiceReturnPath(url.pathname, url.search)).toBeNull();
  show(entry);
  expect(screen.queryByRole('button', { name: 'Retour au suivi des prestations' })).not.toBeInTheDocument();
});

test('preserves the existing Dashboard return and its anchor', () => {
  show('/administration?tab=planning&returnTo=dashboard&dashboardKpi=tasks');
  fireEvent.click(screen.getByRole('button', { name: 'Retour à l’indicateur du Tableau de bord' }));
  expect(screen.getByTestId('route')).toHaveTextContent('/?view=overview&dashboardKpi=tasks#dashboard-kpi-tasks');
});
