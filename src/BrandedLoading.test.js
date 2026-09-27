import { render, screen } from '@testing-library/react';
import BrandedLoading from './BrandedLoading';
let mockLanguage = 'FR';
jest.mock('./LanguageContext', () => ({ useLanguage: () => ({ language: mockLanguage }) }));
test.each([['FR', 'Chargement de M3S'], ['EN', 'Loading M3S'], ['DE', 'M3S wird geladen']])('branded wait is localized in %s', (lang, label) => {
  mockLanguage = lang; render(<BrandedLoading/>);
  expect(screen.getByRole('status')).toHaveTextContent(label);
  expect(screen.getByRole('img')).toHaveAttribute('width', '96');
});
