import React from 'react';
import { act, render } from '@testing-library/react';
import { financeSectionIds, revealFinanceSection, useFinanceSectionNavigation } from './financeNavigation';

function Page({ location, tab, ready }) {
  useFinanceSectionNavigation(location, tab, ready);
  return <div id={financeSectionIds[tab]} tabIndex={-1}/>;
}
let scroll;
let previousScroll;
beforeEach(() => {
  jest.useFakeTimers();
  previousScroll = Element.prototype.scrollIntoView;
  scroll = jest.fn();
  Element.prototype.scrollIntoView = scroll;
});
afterEach(() => {
  Element.prototype.scrollIntoView = previousScroll;
  jest.useRealTimers();
});
test.each(['depenses', 'recettes', 'resources'])('opens %s after async indicators settle, including sidebar links without a hash', tab => {
  const location = { key: 'first', search: `?tab=${tab}`, hash: '' };
  const view = render(<Page location={location} tab={tab} ready={false}/>);
  act(() => jest.runOnlyPendingTimers());
  expect(scroll).not.toHaveBeenCalled();
  view.rerender(<Page location={location} tab={tab} ready/>);
  act(() => jest.runOnlyPendingTimers());
  expect(scroll).toHaveBeenCalledTimes(1);
  expect(document.activeElement.id).toBe(financeSectionIds[tab]);
  view.rerender(<Page location={{ ...location, key: 'repeat' }} tab={tab} ready/>);
  act(() => jest.runOnlyPendingTimers());
  expect(scroll).toHaveBeenCalledTimes(2);
});
test('preserves an explicit resource or nested target', () => {
  render(<Page location={{ key: 'a', search: '?tab=resources', hash: '#finances-resources-title' }} tab="resources" ready/>);
  act(() => jest.runOnlyPendingTimers());
  expect(scroll).not.toHaveBeenCalled();
});
test('scrolls only the main pane, leaving the app header and page in place', () => {
  const { container } = render(<main><div id="register" tabIndex={-1} style={{ scrollMarginTop: '16px' }}/></main>);
  const main = container.querySelector('main');
  const target = container.querySelector('#register');
  main.scrollTo = jest.fn();
  main.scrollTop = 40;
  main.getBoundingClientRect = () => ({ top: 80 });
  target.getBoundingClientRect = () => ({ top: 500 });
  revealFinanceSection(target);
  expect(main.scrollTo).toHaveBeenCalledWith({ top: 444, behavior: 'instant' });
  expect(scroll).not.toHaveBeenCalled();
  expect(document.activeElement).toBe(target);
});
test('does not scroll the previous tab or an unmounted view', () => {
  const view = render(<Page location={{ key: 'a', search: '?tab=depenses' }} tab="recettes" ready/>);
  act(() => jest.runOnlyPendingTimers());
  expect(scroll).not.toHaveBeenCalled();
  view.rerender(<Page location={{ key: 'b', search: '?tab=depenses' }} tab="depenses" ready/>);
  view.unmount();
  act(() => jest.runOnlyPendingTimers());
  expect(scroll).not.toHaveBeenCalled();
});
