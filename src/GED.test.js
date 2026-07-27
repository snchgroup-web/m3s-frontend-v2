import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { LanguageProvider } from './LanguageContext';
import GED from './GED';
import api from './api';

let mockSearch = '';
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation: () => ({ search: mockSearch }),
  useNavigate: () => mockNavigate
}), { virtual: true });

jest.mock('recharts', () => ({
  BarChart: ({ children }) => <div>{children}</div>,
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  ResponsiveContainer: ({ children }) => <div>{children}</div>
}));

jest.mock('./api', () => ({
  __esModule: true,
  default: {
    getDocuments: jest.fn(),
    getDigitalOffersTaxonomy: jest.fn()
  }
}));

const renderGed = (tab, language = 'FR') => {
  mockSearch = `?tab=${tab}`;
  localStorage.setItem('language', language);
  api.getDocuments.mockResolvedValue({ data: [] });
  api.getDigitalOffersTaxonomy.mockRejectedValue(new Error('API disabled in test'));

  return render(
    <LanguageProvider>
      <GED />
    </LanguageProvider>
  );
};

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

test('renders and filters the read-only document tools pilot', async () => {
  renderGed('outils-documents');

  expect(await screen.findByRole('heading', { name: 'Outils documents / FluxConvert' })).toBeInTheDocument();
  expect(screen.getAllByText('Pilote local · Lecture seule').length).toBeGreaterThan(0);
  expect(screen.queryByRole('button', { name: 'Nouveau Document' })).not.toBeInTheDocument();

  fireEvent.change(screen.getByLabelText('Rechercher une capacité documentaire'), {
    target: { value: 'Compression' }
  });

  expect(screen.getAllByText('Compression').length).toBeGreaterThan(0);
  expect(screen.queryByText('Conversion Office')).not.toBeInTheDocument();

  fireEvent.click(screen.getAllByRole('button', { name: 'Voir le détail' })[1]);
  expect(screen.getByRole('dialog', { name: 'Détail du pilote GED' })).toBeInTheDocument();
  expect(screen.getByText('La validation reste humaine. Cette vue n’écrit dans aucun document, API ou système externe.')).toBeInTheDocument();
});

test('renders searchable knowledge cards with source metadata', async () => {
  renderGed('knowledge');

  expect(await screen.findByRole('heading', { name: 'Veille & Knowledge Management' })).toBeInTheDocument();
  expect(screen.getAllByText('Taxonomie des offres digitales M3S').length).toBeGreaterThan(0);

  fireEvent.change(screen.getByLabelText('Rechercher dans les connaissances'), {
    target: { value: 'Knowledge' }
  });

  expect(screen.getAllByText('Knowledge Management (KM)').length).toBeGreaterThan(0);
  expect(screen.queryByText('Veille stratégique 2SG')).not.toBeInTheDocument();
});

test('renders the English pilot labels from the shared language context', async () => {
  renderGed('outils-documents', 'EN');

  expect(await screen.findByRole('heading', { name: 'Document tools / FluxConvert' })).toBeInTheDocument();
  expect(screen.getByLabelText('Search document capabilities')).toBeInTheDocument();
  expect(screen.getAllByText('Local pilot · Read only').length).toBeGreaterThan(0);
});

test('renders the archives pilot in German without French fallbacks', async () => {
  renderGed('archives', 'DE');

  expect(await screen.findByRole('heading', { name: 'GED-Archive' })).toBeInTheDocument();
  expect(screen.getAllByText('Operatives Archiv').length).toBeGreaterThan(0);
  expect(screen.getByText('Archivierte Dokumente')).toBeInTheDocument();
  expect(screen.getByText('Offene Maßnahmen')).toBeInTheDocument();
  expect(screen.queryByText('Archive operationnelle')).not.toBeInTheDocument();
  expect(screen.queryByText('Actions a suivre')).not.toBeInTheDocument();
});

test('renders the read-only help and support guide without ticket actions', async () => {
  renderGed('help-support');

  expect(await screen.findByRole('heading', { name: 'Aide & Support' })).toBeInTheDocument();
  expect(screen.getByText('Aucun ticket n’est créé dans cette version.')).toBeInTheDocument();
  expect(screen.getByText('Accès & connexion')).toBeInTheDocument();
  expect(screen.getByText('Données & documents')).toBeInTheDocument();
  expect(screen.getByText('Utilisation fonctionnelle')).toBeInTheDocument();
  expect(screen.getByText('Incident technique')).toBeInTheDocument();
  expect(screen.getByText('Parcours d’assistance')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /ticket|envoyer|transmettre/i })).not.toBeInTheDocument();
});
