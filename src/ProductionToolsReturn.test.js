import { fireEvent, render, screen } from '@testing-library/react';
import ProductionToolsReturn, { PRODUCTION_RETURN_LABEL } from './ProductionToolsReturn';
const mockNavigate = jest.fn();
let mockSearch = '';
jest.mock('react-router-dom', () => ({ useLocation: () => ({ search: mockSearch }), useNavigate: () => mockNavigate }), { virtual: true });
beforeEach(() => { mockSearch = ''; jest.clearAllMocks(); });
test.each(['FR', 'DE', 'EN'])('returns to the original tool in %s', language => {
  mockSearch = '?tab=fx&returnTo=production-tools&returnTool=fx';
  render(<ProductionToolsReturn language={language}/>);
  fireEvent.click(screen.getByRole('button', { name: PRODUCTION_RETURN_LABEL[language] }));
  expect(mockNavigate).toHaveBeenCalledWith('/production?tab=manufacturing#production-tool-fx');
});
test.each(['', '?returnTo=https://example.test'])('does not add a return control for unrelated navigation: %s', search => {
  mockSearch = search;
  const { container } = render(<ProductionToolsReturn/>);
  expect(container).toBeEmptyDOMElement();
});
