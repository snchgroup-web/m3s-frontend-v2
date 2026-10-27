import React from 'react';
import { act, render, screen } from '@testing-library/react';
import LoginClock, { createClockFormatter } from './LoginClock';
import { loginMessages } from './messages';

const locales = { FR: 'fr-CH', DE: 'de-CH', EN: 'en-GB' };
const dateOptions = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
const expectedDate = (date, language, timeZone) => {
  const raw = new Intl.DateTimeFormat(locales[language], { ...dateOptions, timeZone }).format(date);
  return raw.charAt(0).toLocaleUpperCase(locales[language]) + raw.slice(1);
};

test.each(['FR', 'DE', 'EN'])('clock dates use an initial capital without changing the locale or instant in %s', language => {
  const date = new Date('2026-10-27T10:11:01Z');
  const value = createClockFormatter(language)(date);
  expect(value.dateZurich).toBe(expectedDate(date, language, 'Europe/Zurich'));
  expect(value.dateDakar).toBe(expectedDate(date, language, 'Africa/Dakar'));
  expect(value.dateZurich[0]).toBe(value.dateZurich[0].toLocaleUpperCase(locales[language]));
  expect(value.iso).toBe('2026-10-27T10:11:01.000Z');
  expect(value.timeZurich).toBe('11:11');
  expect(value.timeDakar).toBe('10:11');
  expect(value.dakarDay).toBe('');
});

test.each(['FR', 'DE', 'EN'])('capitalisation preserves the different Dakar date near Zurich midnight in %s', language => {
  const date = new Date('2026-10-26T23:30:00Z');
  const value = createClockFormatter(language)(date);
  expect(value.dateZurich).toBe(expectedDate(date, language, 'Europe/Zurich'));
  expect(value.dateDakar).toBe(expectedDate(date, language, 'Africa/Dakar'));
  expect(value.dateZurich).not.toBe(value.dateDakar);
  expect(value.timeZurich).toBe('00:30');
  expect(value.timeDakar).toBe('23:30');
  expect(value.dakarDay).toBe(new Intl.DateTimeFormat(locales[language], { day: 'numeric', month: 'short', timeZone: 'Africa/Dakar' }).format(date));
});

test('an unsupported language retains the French fallback', () => {
  const date = new Date('2026-10-27T10:11:01Z');
  expect(createClockFormatter('unsupported')(date)).toEqual(createClockFormatter('FR')(date));
});

test('the rendered clock updates its language and instant, then releases its timer', () => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2026-10-27T10:11:01Z'));
  try {
    const view = render(<LoginClock language="FR" />);
    expect(screen.getByRole('group', { name: loginMessages.FR.localTimes })).toBeInTheDocument();
    expect(screen.getByText(expectedDate(new Date(), 'FR', 'Europe/Zurich'))).toBeInTheDocument();
    view.rerender(<LoginClock language="DE" />);
    expect(screen.getByRole('group', { name: loginMessages.DE.localTimes })).toBeInTheDocument();
    expect(screen.getByText(expectedDate(new Date(), 'DE', 'Europe/Zurich'))).toBeInTheDocument();
    act(() => { jest.advanceTimersByTime(60000); });
    expect(screen.getByText('11:12')).toBeInTheDocument();
    view.unmount();
    expect(jest.getTimerCount()).toBe(0);
  } finally { jest.useRealTimers(); }
});
