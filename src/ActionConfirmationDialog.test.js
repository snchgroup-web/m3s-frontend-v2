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

test('loops Tab and Shift+Tab inside the confirmation', () => {
  render(<ActionConfirmationDialog {...props()} />);
  const cancel = screen.getByRole('button', { name: 'Cancel' });
  const confirm = screen.getByRole('button', { name: 'Confirm' });
  fireEvent.keyDown(cancel, { key: 'Tab', shiftKey: true });
  expect(confirm).toHaveFocus();
  fireEvent.keyDown(confirm, { key: 'Tab' });
  expect(cancel).toHaveFocus();
});

test('returns focus to its connected opener after closing', () => {
  const View = () => {
    const [open, setOpen] = React.useState(false);
    return <><button onClick={() => setOpen(true)}>Open</button>{open && <ActionConfirmationDialog {...props()} onCancel={() => setOpen(false)} />}</>;
  };
  render(<View />);
  const opener = screen.getByRole('button', { name: 'Open' });
  opener.focus();
  fireEvent.click(opener);
  expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(opener).toHaveFocus();
});

test('does not reset focus when the parent refreshes its callback', () => {
  const { rerender } = render(<ActionConfirmationDialog {...props()} />);
  const confirm = screen.getByRole('button', { name: 'Confirm' });
  confirm.focus();
  const latest = props();
  rerender(<ActionConfirmationDialog {...latest} />);
  expect(confirm).toHaveFocus();
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(latest.onCancel).toHaveBeenCalledTimes(1);
});

test('keeps focus inside while both actions are disabled', () => {
  const { rerender } = render(<ActionConfirmationDialog {...props()} />);
  rerender(<ActionConfirmationDialog {...props()} busy />);
  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveFocus();
  expect(dialog).toHaveAttribute('aria-busy', 'true');
  fireEvent.keyDown(dialog, { key: 'Tab' });
  expect(dialog).toHaveFocus();
  fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true });
  expect(dialog).toHaveFocus();
});

test('moves from an error to its only close button and loops there', () => {
  render(<ActionConfirmationDialog {...props()} error="Not confirmed" />);
  fireEvent.keyDown(screen.getByRole('alert'), { key: 'Tab' });
  const close = screen.getByRole('button', { name: 'Close' });
  expect(close).toHaveFocus();
  fireEvent.keyDown(close, { key: 'Tab', shiftKey: true });
  expect(close).toHaveFocus();
});

test('redirects outside focus and removes the guard on unmount', () => {
  const View = ({ open }) => <><button>Outside</button>{open && <ActionConfirmationDialog {...props()} />}</>;
  const { rerender } = render(<View open />);
  const outside = screen.getByRole('button', { name: 'Outside' });
  outside.focus();
  expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
  rerender(<View open={false} />);
  outside.focus();
  expect(outside).toHaveFocus();
});

test('closing does not try to focus an opener removed with its row', () => {
  const opener = document.createElement('button');
  document.body.appendChild(opener);
  opener.focus();
  const focus = jest.spyOn(opener, 'focus');
  const { unmount } = render(<ActionConfirmationDialog {...props()} />);
  opener.remove();
  expect(() => unmount()).not.toThrow();
  expect(focus).not.toHaveBeenCalled();
});
