import React, { useEffect, useMemo, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const localeByLanguage = { FR: 'fr-CH', EN: 'en-US', DE: 'de-CH' };

const calendarText = {
  FR: {
    placeholder: 'Selectionner une date',
    today: "Aujourd'hui",
    weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']
  },
  EN: {
    placeholder: 'Select a date',
    today: 'Today',
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
  },
  DE: {
    placeholder: 'Datum auswaehlen',
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
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${className} flex items-center justify-between text-left`}
      >
        <span className={formattedValue ? 'text-white' : 'text-slate-400'}>
          {formattedValue || text.placeholder}
        </span>
        <CalendarDays size={18} className="text-blue-300" />
      </button>

      {isOpen && (
        <div className="absolute z-[70] mt-2 w-80 rounded-lg border border-slate-600 bg-slate-800 p-4 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => moveMonth(-1)}
              className="rounded p-1 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="text-sm font-semibold capitalize text-white">{monthLabel}</div>
            <button
              type="button"
              onClick={() => moveMonth(1)}
              className="rounded p-1 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-400">
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
                  className={`h-9 rounded text-sm transition ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : isToday
                        ? 'border border-blue-500 text-blue-200'
                        : isCurrentMonth
                          ? 'text-slate-100 hover:bg-slate-700'
                          : 'text-slate-600 hover:bg-slate-700'
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
            className="mt-3 w-full rounded bg-slate-700 px-3 py-2 text-sm text-white hover:bg-slate-600"
          >
            {text.today}
          </button>
        </div>
      )}
    </div>
  );
};

export default LocalizedDateInput;
