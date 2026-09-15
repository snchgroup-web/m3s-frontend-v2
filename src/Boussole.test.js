import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LanguageProvider } from './LanguageContext';
import Boussole from './Boussole';
import { api } from './api';

jest.mock('./api', () => ({
  api: { getBoussoleArtifact: jest.fn() }
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn()
}), { virtual: true });

beforeEach(() => {
  api.getBoussoleArtifact.mockResolvedValue(new Blob(['<html>Boussole</html>'], { type: 'text/html' }));
  URL.createObjectURL = jest.fn(() => 'blob:m3s-boussole');
  URL.revokeObjectURL = jest.fn();
});

test('loads and releases the protected compass artifact with the active language', async () => {
  localStorage.setItem('language', 'FR');

  const { unmount } = render(
    <LanguageProvider>
      <Boussole />
    </LanguageProvider>
  );

  expect(screen.getByRole('heading', { name: /Boussole globale 2SG \/ M3S/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Revenir au tableau de bord/i })).toBeInTheDocument();
  const documentFrame = await screen.findByTitle(/Boussole globale 2SG \/ M3S/i);
  expect(documentFrame.getAttribute('sandbox')).not.toContain('allow-same-origin');
  expect(documentFrame).toHaveAttribute('src', 'blob:m3s-boussole#fr/overview');
  expect(documentFrame).not.toHaveAttribute('srcdoc');
  expect(api.getBoussoleArtifact).toHaveBeenCalledTimes(1);

  unmount();
  expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:m3s-boussole');
});

test('offers a retry when the protected artifact cannot be loaded', async () => {
  api.getBoussoleArtifact
    .mockRejectedValueOnce(new Error('unavailable'))
    .mockResolvedValueOnce(new Blob(['<html>Boussole</html>'], { type: 'text/html' }));

  render(
    <LanguageProvider>
      <Boussole />
    </LanguageProvider>
  );

  fireEvent.click(await screen.findByRole('button', { name: /Réessayer/i }));
  await waitFor(() => expect(api.getBoussoleArtifact).toHaveBeenCalledTimes(2));
  expect(await screen.findByTitle(/Boussole globale 2SG \/ M3S/i)).toBeInTheDocument();
});
