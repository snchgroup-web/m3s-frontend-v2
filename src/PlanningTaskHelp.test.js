import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import PlanningTaskHelp from './PlanningTaskHelp';
import JournalTaskRegister, { STORAGE_KEY } from './JournalTaskRegister';

test.each([
  ['FR', 'Comprendre les propositions locales et les tâches partagées', 'De la proposition à la tâche partagée', 'plan opérationnel', 'Le transfert général n’est pas automatique.'],
  ['DE', 'Lokale Vorschläge und gemeinsame Aufgaben verstehen', 'Vom Vorschlag zur gemeinsamen Aufgabe', 'Betriebsplan', 'Die allgemeine Übertragung erfolgt nicht automatisch.'],
  ['EN', 'Understand local proposals and shared tasks', 'From proposal to shared task', 'operational plan', 'General transfer is not automatic.']
])('discloses the local/shared/project distinction in %s and closes with Escape', (language, name, title, plan, limit) => {
  render(<PlanningTaskHelp language={language} />);
  const trigger = screen.getByRole('button', { name });
  const details = trigger.closest('details');
  expect(details).not.toHaveAttribute('open');
  fireEvent.click(trigger);
  expect(details).toHaveAttribute('open');
  expect(screen.getByRole('heading', { name: title })).toBeVisible();
  expect(screen.getByText(new RegExp(plan))).toBeVisible();
  expect(screen.getByText(new RegExp(limit))).toBeVisible();
  expect(details.querySelectorAll('dt')).toHaveLength(3);
  fireEvent.keyDown(trigger, { key: 'Escape' });
  expect(details).not.toHaveAttribute('open');
  expect(trigger).toHaveFocus();
});

test('help and language changes preserve existing local proposals exactly without a confirmation', () => {
  const existing = [{ id:'existing-local', title:'Preserved proposal', source:'Existing journal', owner:'Existing owner',
    priority:'high',deadline:'2026-10-22',taskStatus:'todo',validationStatus:'validated',extra:'Keep unknown provenance' }];
  const raw = JSON.stringify(existing);
  localStorage.setItem(STORAGE_KEY, raw);
  window.confirm = jest.fn();
  const { rerender } = render(<JournalTaskRegister language="FR" />);
  fireEvent.click(screen.getByRole('button', {name:'Comprendre les propositions locales et les tâches partagées'}));
  rerender(<JournalTaskRegister language="EN" />);
  expect(screen.getByRole('heading', {name:'From proposal to shared task'})).toBeVisible();
  expect(localStorage.getItem(STORAGE_KEY)).toBe(raw);
  expect(window.confirm).not.toHaveBeenCalled();
  localStorage.clear();
});
