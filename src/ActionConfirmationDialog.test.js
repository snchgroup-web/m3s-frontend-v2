import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ActionConfirmationDialog from './ActionConfirmationDialog';

const props = () => ({
  id: 'qa-confirmation', title: 'Confirm operation', body: 'Fictional operation',
  cancelLabel: 'Cancel', confirmLabel: 'Confirm', closeLabel: 'Close',
  onCancel: jest.fn(), onConfirm: jest.fn(),
});

test.each([['create', 'm3s-success-button'], ['update', 'm3s-primary-button'], ['delete', 'm3s-danger-button']])('retains the default %s confirmation', (action, className) => {
  const handlers = props();
  render(<ActionConfirmationDialog {...handlers} action={action} />);
  expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
  expect(screen.getByRole('button', { name: 'Confirm' })).toHaveClass(className);
  fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
  expect(handlers.onConfirm).toHaveBeenCalledTimes(1);
});

test('shows a focused error with only a close action, never a retry', () => {
  const handlers = props();
  const { rerender } = render(<ActionConfirmationDialog {...handlers} />);
  rerender(<ActionConfirmationDialog {...handlers} error="Request not confirmed" />);
  expect(screen.getByRole('alert')).toHaveFocus();
  expect(screen.getByRole('alert')).toHaveTextContent('Request not confirmed');
  expect(screen.getAllByRole('button')).toHaveLength(1);
  expect(screen.queryByRole('button', { name: 'Confirm' })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Close' }));
  expect(handlers.onCancel).toHaveBeenCalledTimes(1);
  expect(handlers.onConfirm).not.toHaveBeenCalled();
});

test('blocks actions and Escape while busy, then allows closing the error', () => {
  const handlers = props();
  const { rerender } = render(<ActionConfirmationDialog {...handlers} busy />);
  screen.getAllByRole('button').forEach(button => expect(button).toBeDisabled());
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(handlers.onCancel).not.toHaveBeenCalled();
  rerender(<ActionConfirmationDialog {...handlers} error="Request not confirmed" />);
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(handlers.onCancel).toHaveBeenCalledTimes(1);
  expect(handlers.onConfirm).not.toHaveBeenCalled();
});
