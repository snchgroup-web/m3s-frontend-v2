import React, { useEffect, useMemo, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { loginMessages } from './messages';

// Retains the trial clock's explicit time zones and midnight date distinction.
export function createClockFormatter(language = 'FR') {
  const locale = { FR: 'fr-CH', EN: 'en-GB', DE: 'de-CH' }[language] || 'fr-CH';
  const dateOptions = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' };
  const formatter = (timeZone, options) => new Intl.DateTimeFormat(locale, { ...options, timeZone });
  const zurichDate = formatter('Europe/Zurich', dateOptions);
  const dakarDate = formatter('Africa/Dakar', dateOptions);
  const zurichTime = formatter('Europe/Zurich', timeOptions);
  const dakarTime = formatter('Africa/Dakar', timeOptions);
  const shortDate = formatter('Africa/Dakar', { day: 'numeric', month: 'short' });
  return date => {
    const dateZurich = zurichDate.format(date);
    const dateDakar = dakarDate.format(date);
    return { iso: date.toISOString(), dateZurich, dateDakar,
      timeZurich: zurichTime.format(date), timeDakar: dakarTime.format(date),
      dakarDay: dateZurich === dateDakar ? '' : shortDate.format(date) };
  };
}

export default function LoginClock({ language }) {
  const [now, setNow] = useState(() => new Date());
  const format = useMemo(() => createClockFormatter(language), [language]);
  useEffect(() => { const timer = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(timer); }, []);
  const clock = format(now);
  const t = loginMessages[language] || loginMessages.FR;
  return <div className="access-login-clock" role="group" aria-label={t.localTimes}>
    <time dateTime={clock.iso} title="Europe/Zurich"><CalendarDays size={16} aria-hidden="true"/>{clock.dateZurich}</time>
    <span>Dakar <time dateTime={clock.iso} title={`${clock.dateDakar} · Africa/Dakar`}>{clock.timeDakar}</time>{clock.dakarDay && <small>({clock.dakarDay})</small>}</span>
    <span>{t.zurich} <time dateTime={clock.iso} title={`${clock.dateZurich} · Europe/Zurich`}>{clock.timeZurich}</time></span>
  </div>;
}
