import React, { useEffect, useMemo, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const localeByLanguage = { FR: 'fr-CH', EN: 'en-US', DE: 'de-CH' };

const calendarText = {
  FR: {
    placeholder: 'Sélectionner une date',
    calendarLabel: 'Sélecteur de date',
    previousMonth: 'Mois précédent',
    nextMonth: 'Mois suivant',
    today: "Aujourd'hui",
    weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']
  },
  EN: {
    placeholder: 'Select a date',
    calendarLabel: 'Date picker',
    previousMonth: 'Previous month',
    nextMonth: 'Next month',
    today: 'Today',
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
  },
  DE: {
    placeholder: 'Datum auswählen',
    calendarLabel: 'Datumsauswahl',
    previousMonth: 'Vorheriger Monat',
    nextMonth: 'Nächster Monat',
    today: 'Heute',
    weekdays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
  }
};

const parseIsoDate = (value) => {
  if (!value) return null;
  const [year, month, day] = String(value).split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
};

const toIsoDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const sameDay = (a, b) =>
  a &&
  b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const buildMonthDays = (viewDate) => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const startDate = new Date(year, month, 1 - mondayOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date;
  });
};

const LocalizedDateInput = ({ value, onChange, className = '' }) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const selectedDate = useMemo(() => parseIsoDate(value), [value]);
  const [viewDate, setViewDate] = useState(selectedDate || new Date());
  const text = calendarText[language] || calendarText.FR;
  const locale = localeByLanguage[language] || localeByLanguage.FR;
  const today = new Date();

  useEffect(() => {
    if (selectedDate) setViewDate(selectedDate);
  }, [selectedDate]);

  const days = useMemo(() => buildMonthDays(viewDate), [viewDate]);
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric'
  }).format(viewDate);

  const formattedValue = selectedDate
    ? new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).format(selectedDate)
    : '';

  const moveMonth = (delta) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + delta, 1));
  };

  const selectDate = (date) => {
    onChange(toIsoDate(date));
    setIsOpen(false);
  };

  return (
    <div className="m3s-date-input relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`${text.placeholder}${formattedValue ? ` : ${formattedValue}` : ''}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={`${className} m3s-date-input__control flex items-center justify-between gap-3 text-left`}
      >
        <span className={`m3s-date-input__value${formattedValue ? '' : ' is-placeholder'}`}>
          {formattedValue || text.placeholder}
        </span>
        <CalendarDays size={18} className="m3s-date-input__icon" aria-hidden="true" />
      </button>

      {isOpen && (
        <div role="dialog" aria-label={text.calendarLabel} className="m3s-date-picker absolute z-[70] mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-lg p-4 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => moveMonth(-1)}
              aria-label={text.previousMonth}
              className="m3s-date-picker__nav rounded p-2"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="m3s-date-picker__month text-sm font-semibold capitalize">{monthLabel}</div>
            <button
              type="button"
              onClick={() => moveMonth(1)}
              aria-label={text.nextMonth}
              className="m3s-date-picker__nav rounded p-2"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="m3s-date-picker__weekdays grid grid-cols-7 gap-1 text-center text-xs">
            {text.weekdays.map(day => (
              <div key={day} className="py-1 font-semibold">{day}</div>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1">
            {days.map(date => {
              const isCurrentMonth = date.getMonth() === viewDate.getMonth();
              const isSelected = sameDay(date, selectedDate);
              const isToday = sameDay(date, today);

              return (
                <button
                  key={toIsoDate(date)}
                  type="button"
                  onClick={() => selectDate(date)}
                  className={`m3s-date-picker__day h-9 rounded text-sm transition ${
                    isSelected
                      ? 'is-selected'
                      : isToday
                        ? 'is-today'
                        : isCurrentMonth
                          ? 'is-current-month'
                          : 'is-outside-month'
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => selectDate(today)}
            className="m3s-date-picker__today mt-3 min-h-11 w-full rounded px-3 py-2 text-sm font-semibold"
          >
            {text.today}
          </button>
        </div>
      )}
    </div>
  );
};

export default LocalizedDateInput;
