import React from 'react';
import { render, screen, within } from '@testing-library/react';
import LoginClock, { createClockFormatter } from './LoginClock';
import { loginMessages } from './messages';

test.each(['FR', 'DE', 'EN'])('shows Dakar, Zurich date and Zurich in order without changing the clock values in %s', language => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2026-10-26T23:30:00Z'));
  try {
    const view = render(<LoginClock language={language} />);
    const group = screen.getByRole('group', { name: loginMessages[language].localTimes });
    const [dakar, date, zurich] = group.children;
    const clock = createClockFormatter(language)(new Date());
    expect(group.children).toHaveLength(3);
    expect(dakar).toHaveTextContent('Dakar');
    expect(dakar).toHaveTextContent(clock.timeDakar);
    expect(dakar).toHaveTextContent(clock.dakarDay);
    expect(date.tagName).toBe('TIME');
    expect(date).toHaveTextContent(clock.dateZurich);
    expect(date).toHaveAttribute('datetime', clock.iso);
    expect(zurich).toHaveTextContent(loginMessages[language].zurich);
    expect(zurich).toHaveTextContent(clock.timeZurich);
    expect(within(group).getAllByText(clock.timeZurich)).toHaveLength(1);
    view.unmount();
  } finally { jest.useRealTimers(); }
});
