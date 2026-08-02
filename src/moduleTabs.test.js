import { centerTabHorizontally } from './moduleTabs';

test('centers the active tab horizontally without invoking vertical scrolling', () => {
  const scrollTo = jest.fn();
  const container = {
    clientWidth: 200,
    scrollWidth: 600,
    scrollTo
  };
  const activeButton = {
    offsetLeft: 300,
    clientWidth: 100,
    scrollIntoView: jest.fn()
  };

  centerTabHorizontally(container, activeButton);

  expect(scrollTo).toHaveBeenCalledWith({ left: 250, behavior: 'smooth' });
  expect(activeButton.scrollIntoView).not.toHaveBeenCalled();
});

test('clamps horizontal tab scrolling to the available range', () => {
  const container = {
    clientWidth: 200,
    scrollWidth: 260,
    scrollLeft: 0
  };

  centerTabHorizontally(container, { offsetLeft: 240, clientWidth: 80 });

  expect(container.scrollLeft).toBe(60);
});
