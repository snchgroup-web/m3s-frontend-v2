import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import ContextualHelp from './ContextualHelp';
import Header from './Header';
import { LanguageProvider } from './LanguageContext';
import { ThemeProvider } from './ThemeContext';
import { getGlossaryContextEntry } from './glossaryContext';
import { getContextualHelp, HELP_CONTEXTS } from './contextualHelpContexts';
import { PlanningTaskHelpContent } from './PlanningTaskHelp';

let mockLocation = { pathname: '/administration', search: '?tab=communication', hash: '#register' };
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({ useLocation: () => mockLocation, useNavigate: () => mockNavigate }), { virtual: true });
jest.mock('./AuthContext', () => ({ useAuth: () => ({ user: { name: 'QA fictive' }, logout: jest.fn() }) }));
jest.mock('./api', () => ({ __esModule: true, default: { getFxHistory: () => new Promise(() => {}), getOwnProfile: () => new Promise(() => {}) } }));

const originals = { showModal: HTMLDialogElement.prototype.showModal, close: HTMLDialogElement.prototype.close };
const names = { FR: ['Aide contextuelle', 'Fermer l’aide'], DE: ['Kontexthilfe', 'Hilfe schließen'], EN: ['Contextual help', 'Close help'] };

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () { this.open = true; this.querySelector('button')?.focus(); };
  HTMLDialogElement.prototype.close = function () { this.open = false; };
});
afterAll(() => { Object.assign(HTMLDialogElement.prototype, originals); });
beforeEach(() => { mockNavigate.mockClear(); localStorage.clear(); mockLocation = { pathname: '/administration', search: '?tab=communication', hash: '#register' }; });

test.each(['FR', 'DE', 'EN'])('all context mappings resolve the existing definitions without duplicates in %s', language => {
  Object.entries(HELP_CONTEXTS).forEach(([route, contexts]) => Object.entries(contexts).forEach(([section, ids]) => {
    const param = route === '/' || route === '/account' ? 'view' : 'tab';
    const result = getContextualHelp(route, section === 'default' ? '' : `?${param}=${section}`, language);
    expect(new Set(ids).size).toBe(ids.length);
    expect(result.entries).toEqual(ids.map(id => getGlossaryContextEntry(id, language)));
    result.entries.forEach(entry => {
      expect(entry?.shortDefinition).toBeTruthy();
      expect(entry?.term).toBeTruthy();
      expect(entry?.id).toBeTruthy();
    });
  }));
});

test('unknown routes have no invented help; unknown sections use the known module context', () => {
  expect(getContextualHelp('/diagnostics')).toBeNull();
  expect(getContextualHelp('/login')).toBeNull();
  expect(getContextualHelp('/production-unknown')).toBeNull();
  expect(getContextualHelp('/administration/', '?tab=__proto__').entries).toEqual(getContextualHelp('/administration').entries);
  expect(getContextualHelp('/account', '?view=tasks').planning).toBe(false);
});

test.each(['FR', 'DE', 'EN'])('contextual help opens and closes without navigation or storage writes in %s', language => {
  const write = jest.spyOn(Storage.prototype, 'setItem');
  render(<ContextualHelp pathname="/administration" search="?tab=communication" pageTitle="QA" language={language} />);
  const trigger = screen.getByRole('button', { name: names[language][0] });
  fireEvent.click(trigger);
  const dialog = screen.getByRole('dialog', { name: names[language][0] });
  expect(dialog.parentElement).toBe(document.body);
  expect(within(dialog).getByText(getGlossaryContextEntry('ADM-CORRESPONDANCE', language).shortDefinition)).toBeInTheDocument();
  within(dialog).getAllByRole('link').forEach(link => {
    expect(link.getAttribute('href')).toMatch(/^\/ged\?tab=knowledge&term=/);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
  const close = within(dialog).getByRole('button', { name: names[language][1] });
  close.focus();
  fireEvent.keyDown(close, { key: 'Tab', shiftKey: true });
  const links = within(dialog).getAllByRole('link');
  expect(links[links.length - 1]).toHaveFocus();
  fireEvent.keyDown(links[links.length - 1], { key: 'Tab' });
  expect(close).toHaveFocus();
  fireEvent.click(within(dialog).getByRole('button', { name: names[language][1] }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
  expect(trigger).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(trigger);
  fireEvent(screen.getByRole('dialog'), new Event('cancel', { bubbles: false, cancelable: true }));
  expect(trigger).toHaveFocus();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(write).not.toHaveBeenCalled();
  expect(mockNavigate).not.toHaveBeenCalled();
  write.mockRestore();
});

test.each(['FR', 'DE', 'EN'])('planning help uses the exact existing content in %s', language => {
  const standalone = render(<PlanningTaskHelpContent language={language} />);
  const previousText = standalone.container.textContent;
  standalone.unmount();
  render(<ContextualHelp pathname="/administration" search="?tab=planning" language={language} />);
  fireEvent.click(screen.getByRole('button', { name: names[language][0] }));
  expect(screen.getByRole('dialog').textContent).toContain(previousText);
});

test('Header follows the current section and removes the old dialog on navigation', () => {
  const ui = <LanguageProvider><ThemeProvider><Header /></ThemeProvider></LanguageProvider>;
  const view = render(ui);
  fireEvent.click(screen.getByRole('button', { name: 'Aide contextuelle' }));
  expect(screen.getByRole('dialog')).toHaveTextContent('Communication & Courrier');
  expect(screen.getByRole('dialog')).toHaveTextContent(getGlossaryContextEntry('ADM-CORRESPONDANCE').term);
  mockLocation = { pathname: '/rh', search: '?tab=resources', hash: '' };
  view.rerender(<LanguageProvider><ThemeProvider><Header onOpenMenu={() => {}} /></ThemeProvider></LanguageProvider>);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Aide contextuelle' }));
  expect(screen.getByRole('dialog')).toHaveTextContent(getGlossaryContextEntry('RH-PERSONNEL-APPUI').term);
  expect(mockNavigate).not.toHaveBeenCalled();
});
