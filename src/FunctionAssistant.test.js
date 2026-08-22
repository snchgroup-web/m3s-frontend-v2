import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FunctionAssistant from './FunctionAssistant';

test.each([
  ['finances', 'Finance Assistant'],
  ['rh', 'Human Resources Assistant'],
  ['it-support', 'IT & Support Assistant'],
  ['commercial', 'Commercial & CRM Assistant'],
  ['production', 'Production Assistant'],
  ['stock', 'Stock & Assets Assistant']
])('renders the controlled assistant for %s', (moduleId, title) => {
  render(<FunctionAssistant moduleId={moduleId} language="EN" />);
  expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  expect(screen.getByText('Framed prototype · no autonomous action')).toBeInTheDocument();
  expect(screen.getByText('No approval, signature, expense or payment.')).toBeInTheDocument();
});

test('builds a bounded request without executing it', () => {
  render(<FunctionAssistant moduleId="production" language="EN" />);
  fireEvent.change(screen.getByLabelText('Factual context'), { target: { value: 'Order PO-04 is late.' } });
  expect(screen.getAllByText(/Order PO-04 is late/)).toHaveLength(2);
  expect(screen.getByText(/next required human decision/)).toBeInTheDocument();
});
