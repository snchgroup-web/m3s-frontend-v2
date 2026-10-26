import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Header from './Header';
import CorrespondenceAgenda from './CorrespondenceAgenda';
import api from './api';
import { ADMINISTRATION_CORRESPONDENCE_READ_PERMISSION } from './accessControl';

let mockLanguage = 'FR';
const mockSession = { token: 'signed-synthetic', user: { id: 'SYNTHETIC', tenantId: 'synthetic', name: 'Synthetic user', permissions: [ADMINISTRATION_CORRESPONDENCE_READ_PERMISSION] } };
jest.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/', search: '' }),
  useNavigate: () => jest.fn(),
  Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>
}), { virtual: true });
jest.mock('./LanguageContext', () => ({ useLanguage: () => ({ language: mockLanguage, setLanguage: jest.fn() }) }));
jest.mock('./ThemeContext', () => ({ useTheme: () => ({ theme: 'standard', setTheme: jest.fn() }) }));
jest.mock('./AuthContext', () => ({ useAuth: () => mockSession }));
jest.mock('./api', () => ({ __esModule: true, default: {
  getFxHistory: jest.fn(), getOwnProfile: jest.fn(), getAdministrationCorrespondence: jest.fn()
} }));

const fixedTime = new Date('2026-10-26T12:00:00.000Z');
const payload = Object.freeze({ success: true, source: 'bigquery', data: Object.freeze([
  Object.freeze({ id: 'COR-SYNTHETIC', subject: 'Synthetic date label', owner: 'Synthetic owner', deadline: '2026-10-26', status: 'in_progress', next_action: 'Read only.' })
]) });
const languages = [['FR', 'fr-CH'], ['DE', 'de-CH'], ['EN', 'en-GB']];
const initialCapital = (label, locale) => label[0].toLocaleUpperCase(locale) + label.slice(1);

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers('modern');
  jest.setSystemTime(fixedTime);
  mockLanguage = 'FR';
  api.getFxHistory.mockReturnValue(new Promise(() => {}));
  api.getOwnProfile.mockReturnValue(new Promise(() => {}));
  api.getAdministrationCorrespondence.mockResolvedValue(payload);
});
afterEach(() => {
  cleanup();
  jest.useRealTimers();
});

test.each(languages)('Header capitalises the displayed weekday without reformatting the %s date', (language, locale) => {
  mockLanguage = language;
  const original = fixedTime.toLocaleDateString(locale, { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
  render(<Header />);
  const displayed = screen.getByText(initialCapital(original, locale));
  expect(displayed.textContent.slice(1)).toBe(original.slice(1));
  expect(fixedTime.toISOString()).toBe('2026-10-26T12:00:00.000Z');
});

test.each(languages)('Agenda capitalises the %s weekday while preserving its date and source', async (language, locale) => {
  const original = new Intl.DateTimeFormat(locale, { timeZone: 'Europe/Zurich', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date('2026-10-26T12:00:00Z'));
  const { container } = render(<CorrespondenceAgenda language={language} />);
  await screen.findByText('Synthetic date label');
  const date = container.querySelector('time[datetime="2026-10-26"]');
  expect(date).toHaveTextContent(initialCapital(original, locale));
  expect(date.textContent.slice(1)).toBe(original.slice(1));
  expect(payload.data[0].deadline).toBe('2026-10-26');
  expect(api.getAdministrationCorrespondence).toHaveBeenCalledTimes(1);
});
