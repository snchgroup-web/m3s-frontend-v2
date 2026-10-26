import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

const originalMatchMedia = window.matchMedia;
let media;
let listeners;

function Probe() {
  const { theme, themePreference, isDarkMode, setTheme, toggleTheme } = useTheme();
  return <>
    <output data-testid="theme">{themePreference}:{theme}:{String(isDarkMode)}</output>
    {['auto', 'light', 'standard', 'deep'].map(value => <button key={value} onClick={() => setTheme(value)}>{value}</button>)}
    <button onClick={toggleTheme}>Toggle</button>
    <button onClick={() => { toggleTheme(); toggleTheme(); }}>Toggle twice</button>
  </>;
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark', 'deep-theme');
  delete document.documentElement.dataset.theme;
  listeners = new Set();
  media = {
    matches: true,
    addEventListener: jest.fn((type, listener) => listeners.add(listener)),
    removeEventListener: jest.fn((type, listener) => listeners.delete(listener))
  };
  window.matchMedia = jest.fn(() => media);
});

afterEach(() => {
  window.matchMedia = originalMatchMedia;
  jest.restoreAllMocks();
});

test.each([null, 'standard', 'dark', 'light', 'deep'])('Auto support does not opt the historical preference %s into system changes', value => {
  if (value) localStorage.setItem('theme', value);
  render(<ThemeProvider><Probe /></ThemeProvider>);
  const expected = value === 'light' || value === 'deep' ? value : 'standard';
  expect(screen.getByTestId('theme')).toHaveTextContent(`${expected}:${expected}:`);
  expect(localStorage.getItem('theme')).toBe(expected);
  expect(listeners.size).toBe(0);
});

test.each([true, false])('restores Auto separately from its concrete system theme (dark=%s)', dark => {
  media.matches = dark;
  localStorage.setItem('theme', 'auto');
  render(<ThemeProvider><Probe /></ThemeProvider>);
  expect(screen.getByTestId('theme')).toHaveTextContent(`auto:${dark ? 'standard:true' : 'light:false'}`);
  expect(document.documentElement.dataset.theme).toBe(dark ? 'standard' : 'light');
  expect(localStorage.getItem('theme')).toBe('auto');
  expect(document.documentElement).not.toHaveClass('deep-theme');
});

test('system changes update Auto without overwriting the stored preference and release their listener', () => {
  localStorage.setItem('theme', 'auto');
  const view = render(<ThemeProvider><Probe /></ThemeProvider>);
  expect(listeners.size).toBe(1);
  act(() => { media.matches = false; listeners.forEach(listener => listener()); });
  expect(screen.getByTestId('theme')).toHaveTextContent('auto:light:false');
  expect(document.documentElement).not.toHaveClass('dark');
  expect(localStorage.getItem('theme')).toBe('auto');
  view.unmount();
  expect(listeners.size).toBe(0);
});

test('an explicit deep choice exits Auto and is not replaced by later system changes', () => {
  localStorage.setItem('theme', 'auto');
  render(<ThemeProvider><Probe /></ThemeProvider>);
  fireEvent.click(screen.getByRole('button', { name: 'deep' }));
  expect(listeners.size).toBe(0);
  act(() => { media.matches = false; listeners.forEach(listener => listener()); });
  expect(screen.getByTestId('theme')).toHaveTextContent('deep:deep:true');
  expect(document.documentElement).toHaveClass('dark', 'deep-theme');
  expect(localStorage.getItem('theme')).toBe('deep');
});

test('Auto reads the current system choice on opt-in, not a stale initial value', () => {
  render(<ThemeProvider><Probe /></ThemeProvider>);
  media.matches = false;
  fireEvent.click(screen.getByRole('button', { name: 'auto' }));
  expect(screen.getByTestId('theme')).toHaveTextContent('auto:light:false');
  expect(localStorage.getItem('theme')).toBe('auto');
});

test('the historical toggle exits Auto using the concrete appearance', () => {
  media.matches = false;
  localStorage.setItem('theme', 'auto');
  render(<ThemeProvider><Probe /></ThemeProvider>);
  fireEvent.click(screen.getByRole('button', { name: 'Toggle' }));
  expect(screen.getByTestId('theme')).toHaveTextContent('standard:standard:true');
  expect(listeners.size).toBe(0);
});

test('batched toggles still use their previous state after leaving Auto', () => {
  media.matches = false;
  localStorage.setItem('theme', 'auto');
  render(<ThemeProvider><Probe /></ThemeProvider>);
  fireEvent.click(screen.getByRole('button', { name: 'Toggle twice' }));
  expect(screen.getByTestId('theme')).toHaveTextContent('light:light:false');
  expect(localStorage.getItem('theme')).toBe('light');
});

test('Auto has a stable Standard fallback when the system preference API is unavailable', () => {
  window.matchMedia = undefined;
  localStorage.setItem('theme', 'auto');
  render(<ThemeProvider><Probe /></ThemeProvider>);
  expect(screen.getByTestId('theme')).toHaveTextContent('auto:standard:true');
  expect(localStorage.getItem('theme')).toBe('auto');
});

test('legacy system-preference listeners are detached on leaving Auto', () => {
  delete media.addEventListener;
  delete media.removeEventListener;
  media.addListener = jest.fn(listener => listeners.add(listener));
  media.removeListener = jest.fn(listener => listeners.delete(listener));
  localStorage.setItem('theme', 'auto');
  render(<ThemeProvider><Probe /></ThemeProvider>);
  expect(listeners.size).toBe(1);
  fireEvent.click(screen.getByRole('button', { name: 'light' }));
  expect(listeners.size).toBe(0);
});

test('blocked preference storage does not prevent an in-memory Auto choice', () => {
  jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Storage unavailable'); });
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Storage unavailable'); });
  render(<ThemeProvider><Probe /></ThemeProvider>);
  expect(screen.getByTestId('theme')).toHaveTextContent('standard:standard:true');
  fireEvent.click(screen.getByRole('button', { name: 'auto' }));
  expect(screen.getByTestId('theme')).toHaveTextContent('auto:standard:true');
});
