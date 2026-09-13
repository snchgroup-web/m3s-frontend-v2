import { render, screen } from '@testing-library/react';
import { LanguageProvider } from './LanguageContext';
import Boussole from './Boussole';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn()
}), { virtual: true });

test('renders the protected compass surface with a dashboard return', () => {
  localStorage.setItem('language', 'FR');

  render(
    <LanguageProvider>
      <Boussole />
    </LanguageProvider>
  );

  expect(screen.getByRole('heading', { name: /Boussole globale 2SG \/ M3S/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Revenir au tableau de bord/i })).toBeInTheDocument();
  const documentFrame = screen.getByTitle(/Boussole globale 2SG \/ M3S/i);
  expect(documentFrame).toHaveAttribute('sandbox');
  expect(documentFrame).toHaveAttribute('srcdoc', expect.stringContaining('Boussole'));
});
