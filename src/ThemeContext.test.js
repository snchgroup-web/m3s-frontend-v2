import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

const ThemeProbe = () => {
  const { theme, setTheme } = useTheme();
  return <><button type="button" onClick={() => setTheme('light')}>{theme}</button><button type="button" onClick={() => setTheme('deep')}>deep</button></>;
};

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
  delete document.documentElement.dataset.theme;
});

test('persists an explicit theme selection for the settings panel', async () => {
  localStorage.setItem('theme', 'dark');
  render(<ThemeProvider><ThemeProbe /></ThemeProvider>);

  expect(screen.getByRole('button', { name: 'standard' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'standard' }));

  await waitFor(() => {
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(document.documentElement).not.toHaveClass('dark');
  });
});

test('applies and persists the deep theme while keeping dark-compatible styles', async () => {
  render(<ThemeProvider><ThemeProbe /></ThemeProvider>);
  fireEvent.click(screen.getByRole('button', { name: 'deep' }));

  await waitFor(() => {
    expect(localStorage.getItem('theme')).toBe('deep');
    expect(document.documentElement.dataset.theme).toBe('deep');
    expect(document.documentElement).toHaveClass('dark', 'deep-theme');
  });
});
