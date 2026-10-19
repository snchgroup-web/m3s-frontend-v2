import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ProductionTools from './ProductionTools';
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({ useNavigate: () => mockNavigate }), { virtual: true });

test.each(['FR', 'DE', 'EN'])('lists eight existing tools, with only four real entry links in %s', language => {
  const { container } = render(<ProductionTools language={language}/>);
  expect(container.querySelectorAll('article')).toHaveLength(8);
  expect(screen.getAllByRole('button')).toHaveLength(4);
  fireEvent.click(screen.getByRole('button', { name: /Budget Perso CH/ }));
  expect(mockNavigate).toHaveBeenLastCalledWith('/account?view=finances&returnTo=production#personal-finances');
  fireEvent.click(screen.getByRole('button', { name: /Daily Intelligence Dashboard/ }));
  expect(mockNavigate).toHaveBeenLastCalledWith('/?view=intelligence');
  expect(container.textContent).not.toMatch(/C:\\|50000|30000|50 000|30 000/);
  expect(screen.queryByRole('button', { name: /FluxConvert/ })).not.toBeInTheDocument();
});
