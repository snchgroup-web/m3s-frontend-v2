import React, { useRef } from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { ModulePageTabs, ModuleTabContent, getModuleChildTabs } from './moduleTabs';
import { resolveModuleTarget, useModuleNavigation } from './moduleNavigation';

const modules = ['administration', 'finances', 'rh', 'it-support', 'stock', 'commercial', 'production'];
const location = (tab, extra = {}) => ({ key: 'a', pathname: '/rh', search: `?tab=${tab}`, hash: '', ...extra });
function Page({ moduleId = 'rh', tab = 'directory', ready = true, route = location(tab), language = 'FR' }) {
  const main = useRef(null);
  useModuleNavigation(main, route);
  return <main ref={main}>
    <ModulePageTabs moduleId={moduleId} language={language} activeTab={tab} onSelect={() => {}} tabs={[{ tab: 'overview', label: 'Overview' }]}/>
    <div>Indicators</div>
    <ModuleTabContent activeTab={tab} ready={ready}><h2 id="nested" tabIndex={-1}>Content</h2></ModuleTabContent>
  </main>;
}
let scroll;
let previousScroll;
beforeEach(() => {
  jest.useFakeTimers();
  previousScroll = Element.prototype.scrollIntoView;
  scroll = jest.fn();
  Element.prototype.scrollIntoView = scroll;
});
afterEach(() => { Element.prototype.scrollIntoView = previousScroll; jest.restoreAllMocks(); jest.useRealTimers(); });
const flush = async () => { await act(async () => { jest.advanceTimersByTime(40); }); };

test.each(modules.flatMap(moduleId => getModuleChildTabs(moduleId, 'FR').map(({ tab }) => [moduleId, tab])))('%s / %s resolves to its content instead of indicators', (moduleId, tab) => {
  const { container } = render(<Page moduleId={moduleId} tab={tab}/>);
  expect(resolveModuleTarget(container.querySelector('main'), location(tab))).toBe(container.querySelector('[data-module-content]'));
});

test('overview starts at the tabs and keeps indicators visible', async () => {
  const { container } = render(<Page tab="overview"/>);
  await flush();
  expect(document.activeElement).toBe(container.querySelector('[data-module-tabs]'));
});
test('waits for active-tab synchronization and asynchronous readiness', async () => {
  const route = location('directory');
  const view = render(<Page tab="overview" route={route}/>);
  await flush();
  expect(scroll).not.toHaveBeenCalled();
  view.rerender(<Page tab="directory" route={route} ready={false}/>);
  await flush();
  expect(scroll).not.toHaveBeenCalled();
  view.rerender(<Page tab="directory" route={route} ready/>);
  await flush();
  await flush();
  expect(scroll).toHaveBeenCalledTimes(1);
});
test('reselecting a tab scrolls again; changing language does not', async () => {
  const view = render(<Page/>);
  await flush();
  view.rerender(<Page language="DE"/>);
  await flush();
  expect(scroll).toHaveBeenCalledTimes(1);
  view.rerender(<Page route={location('directory', { key: 'b' })}/>);
  await flush();
  expect(scroll).toHaveBeenCalledTimes(2);
});
test('preserves explicit nested anchors and handles invalid encoding without throwing', async () => {
  const view = render(<Page route={location('directory', { hash: '#nested' })}/>);
  await flush();
  expect(document.activeElement.id).toBe('nested');
  expect(resolveModuleTarget(view.container.querySelector('main'), location('directory', { hash: '#%E0' }))).toBeNull();
});
test('supports the historic RH directory alias', async () => {
  render(<Page route={location('membres')}/>);
  await flush();
  expect(scroll).toHaveBeenCalledTimes(1);
});
test('does not steal scroll back after user interaction during loading', async () => {
  const view = render(<Page ready={false}/>);
  await flush();
  fireEvent.wheel(view.container.querySelector('main'));
  view.rerender(<Page ready/>);
  await flush();
  expect(scroll).not.toHaveBeenCalled();
});
test('leaves existing Finance register navigation to its asynchronous controller', async () => {
  render(<Page moduleId="finances" tab="depenses" route={location('depenses', { pathname: '/finance' })}/>);
  await flush();
  expect(scroll).not.toHaveBeenCalled();
});
test('cancels pending work on unmount', async () => {
  const view = render(<Page/>);
  view.unmount();
  await flush();
  expect(scroll).not.toHaveBeenCalled();
});
test('other pages start at the top unless a specific anchor is requested', () => {
  const { container } = render(<main><section id="dashboard-detail">Detail</section></main>);
  const main = container.querySelector('main');
  expect(resolveModuleTarget(main, { pathname: '/', search: '?view=resources', hash: '' })).toBe(main);
  expect(resolveModuleTarget(main, { pathname: '/', search: '?view=resources', hash: '#dashboard-detail' })).toBe(main.firstChild);
});
