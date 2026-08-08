import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

const ThemeProbe = () => {
  const { theme, setTheme } = useTheme();
  return <button type="button" onClick={() => setTheme('light')}>{theme}</button>;
};

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
  delete document.documentElement.dataset.theme;
});

test('persists an explicit theme selection for the settings panel', async () => {
  localStorage.setItem('theme', 'dark');
  render(<ThemeProvider><ThemeProbe /></ThemeProvider>);

  expect(screen.getByRole('button', { name: 'dark' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'dark' }));

  await waitFor(() => {
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(document.documentElement).not.toHaveClass('dark');
  });
});
