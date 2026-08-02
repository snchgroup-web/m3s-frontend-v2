import { centerTabHorizontally } from './moduleTabs';

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
