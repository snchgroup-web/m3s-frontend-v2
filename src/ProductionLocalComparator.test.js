import { act, fireEvent, render, screen } from '@testing-library/react';
import ProductionLocalComparator from './ProductionLocalComparator';
import { openLocalComparator } from './localComparator';
jest.mock('./localComparator', () => ({ openLocalComparator: jest.fn() }));
beforeEach(() => { jest.clearAllMocks(); });

test.each([['FR', 'Comparaison et suivi des offres'], ['DE', 'Angebote vergleichen und verfolgen'], ['EN', 'Offer comparison and tracking']])('keeps the local launcher translated and closed in %s', (language, title) => {
  const { container } = render(<ProductionLocalComparator language={language}/>);
  expect(screen.getByRole('heading', { name: title })).toBeVisible();
  expect(container.querySelector('input[type=file]')).toHaveAttribute('accept', '.html,text/html');
  expect(container.querySelector('button[type=submit]')).toBeDisabled();
  expect(container.querySelector('iframe')).toBeNull(); expect(openLocalComparator).not.toHaveBeenCalled();
});

test('rejects an unknown file without rendering any executable content', async () => {
  openLocalComparator.mockRejectedValue(new Error('COMPARATOR_SOURCE'));
  const { container } = render(<ProductionLocalComparator/>);
  fireEvent.change(container.querySelector('input'), { target: { files: [new File(['unknown'], 'unknown.html')] } });
  fireEvent.click(screen.getByRole('button', { name: 'Ouvrir la copie locale' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Fichier non reconnu');
  expect(container.querySelector('iframe')).toBeNull();
});

test('opens only the verified frame and confirms closing temporary work', async () => {
  const confirm = jest.spyOn(window, 'confirm').mockReturnValueOnce(false).mockReturnValueOnce(true);
  openLocalComparator.mockResolvedValue({ document: '<html><body>Synthetic only</body></html>' });
  const { container } = render(<ProductionLocalComparator/>);
  fireEvent.change(container.querySelector('input'), { target: { files: [new File(['fixture'], 'fixture.html')] } });
  fireEvent.click(screen.getByRole('button', { name: 'Ouvrir la copie locale' }));
  const frame = await screen.findByTitle('Comparateur local isolé');
  expect(frame).toHaveAttribute('sandbox', 'allow-scripts allow-downloads allow-modals');
  expect(frame.getAttribute('sandbox')).not.toContain('allow-same-origin');
  expect(frame).toHaveAttribute('referrerpolicy', 'no-referrer');
  const leave = new Event('beforeunload', { cancelable: true }); window.dispatchEvent(leave); expect(leave.defaultPrevented).toBe(true);
  fireEvent.click(screen.getByRole('button', { name: 'Fermer le comparateur' })); expect(frame).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Fermer le comparateur' })); expect(container.querySelector('iframe')).toBeNull();
  confirm.mockRestore();
});

test('a completed read cannot reopen a departed launcher', async () => {
  let resolve; openLocalComparator.mockReturnValue(new Promise(done => { resolve = done; }));
  const { container, unmount } = render(<ProductionLocalComparator/>);
  fireEvent.change(container.querySelector('input'), { target: { files: [new File(['fixture'], 'fixture.html')] } });
  fireEvent.click(screen.getByRole('button', { name: 'Ouvrir la copie locale' })); unmount();
  await act(async () => resolve({ document: '<html>fixture</html>' }));
  expect(document.querySelector('iframe')).toBeNull();
});

test('returning from an open synthetic frame requires confirmation before leaving', async () => {
  const onReturn = jest.fn();
  const confirm = jest.spyOn(window, 'confirm').mockReturnValueOnce(false).mockReturnValueOnce(true);
  openLocalComparator.mockResolvedValue({ document: '<html><body>Synthetic only</body></html>' });
  const { container } = render(<ProductionLocalComparator onReturn={onReturn}/>);
  fireEvent.change(container.querySelector('input'), { target: { files: [new File(['fixture'], 'fixture.html')] } });
  fireEvent.click(screen.getByRole('button', { name: 'Ouvrir la copie locale' }));
  await screen.findByTitle('Comparateur local isolé');
  fireEvent.click(screen.getByRole('button', { name: 'Retour à la fiche de l’outil' })); expect(onReturn).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Retour à la fiche de l’outil' })); expect(onReturn).toHaveBeenCalledTimes(1);
  confirm.mockRestore();
});

test.each([
  ['FR', /copie neutre V0.1/, /V0.2 FR\/DE\/EN/, /mémoire/],
  ['DE', /neutrale Kopie V0.1/, /V0.2 FR\/DE\/EN/, /Arbeitsspeicher/],
  ['EN', /neutral V0.1 copy/, /V0.2 FR\/DE\/EN/, /memory/]
])('neutral choice in %s describes multilingual V0.2 and temporary-storage boundaries', (language, label, scope, memory) => {
  const { container } = render(<ProductionLocalComparator language={language}/>);
  expect(screen.getByLabelText(label)).toHaveAttribute('type', 'file');
  expect(container).toHaveTextContent(scope);
  expect(container).toHaveTextContent(memory);
  expect(container).toHaveTextContent(/JSON/);
  expect(container.querySelector('iframe')).toBeNull();
});
