import React from 'react';
import { render } from '@testing-library/react';
import { ModulePageTabs, centerTabHorizontally, getModuleChildTabs } from './moduleTabs';
import { ADMINISTRATION_AUDIT_PERMISSION } from './accessControl';

test('keeps the scroll offset in sync with tab height and removes it on unmount', () => {
  const main = document.createElement('main');
  document.body.appendChild(main);
  let onResize;
  const disconnect = jest.fn();
  const originalObserver = global.ResizeObserver;
  global.ResizeObserver = class {
    constructor(callback) { onResize = callback; }
    observe() {}
    disconnect() { disconnect(); }
  };
  const measure = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockReturnValue({ height: 64, left: 0, width: 0 });
  const view = render(<ModulePageTabs moduleId="administration" language="FR" activeTab="overview" onSelect={() => {}} />, { container: main });
  expect(main.style.getPropertyValue('--m3s-module-tabs-height')).toBe('64px');
  measure.mockReturnValue({ height: 84, left: 0, width: 0 });
  onResize();
  expect(main.style.getPropertyValue('--m3s-module-tabs-height')).toBe('84px');
  view.unmount();
  expect(disconnect).toHaveBeenCalled();
  expect(main.style.getPropertyValue('--m3s-module-tabs-height')).toBe('');
  measure.mockRestore();
  global.ResizeObserver = originalObserver;
  main.remove();
});

test('centers the active tab horizontally without invoking vertical scrolling', () => {
  const scrollTo = jest.fn();
  const container = {
    clientWidth: 200,
    scrollWidth: 600,
    scrollLeft: 40,
    getBoundingClientRect: () => ({ left: 120 }),
    scrollTo
  };
  const activeButton = {
    getBoundingClientRect: () => ({ left: 330, width: 100 }),
    scrollIntoView: jest.fn()
  };

  centerTabHorizontally(container, activeButton);

  expect(scrollTo).toHaveBeenCalledWith({ left: 200, behavior: 'smooth' });
  expect(activeButton.scrollIntoView).not.toHaveBeenCalled();
});

test('clamps horizontal tab scrolling to the available range', () => {
  const container = {
    clientWidth: 200,
    scrollWidth: 260,
    scrollLeft: 0,
    getBoundingClientRect: () => ({ left: 80 })
  };

  centerTabHorizontally(container, {
    getBoundingClientRect: () => ({ left: 320, width: 80 })
  });

  expect(container.scrollLeft).toBe(60);
});

test('orders Administration tabs from institutional framing to execution and glossary', () => {
  expect(getModuleChildTabs('administration', 'FR').map(tab => tab.tab)).toEqual([
    'institution',
    'architecture',
    'processes',
    'compliance',
    'planning',
    'communication',
    'resources',
    'assistant',
    'glossary'
  ]);
});

test('shows the Administration audit tab only with its explicit permission', () => {
  expect(getModuleChildTabs('administration', 'FR').map(tab => tab.tab)).not.toContain('audit');
  expect(getModuleChildTabs('administration', 'FR', [ADMINISTRATION_AUDIT_PERMISSION]).map(tab => tab.tab))
    .toContain('audit');
});
