const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');

const baseTokenSelector = (scope, color) =>
  `${scope} [class^="border-${color}-"],${scope} [class*=" border-${color}-"]`;

describe('light-mode accent border selectors', () => {
  test.each([
    ['.administration-overview', 'blue'],
    ['.administration-overview', 'cyan'],
    ['.administration-overview', 'emerald'],
    ['.administration-overview', 'amber'],
    ['.it-support-overview', 'blue'],
    ['.it-support-overview', 'cyan'],
    ['.it-support-overview', 'indigo'],
    ['.it-support-overview', 'rose'],
    ['.it-support-overview', 'amber'],
    ['.it-support-overview', 'emerald'],
    ['.it-support-overview', 'violet'],
  ])('anchors %s %s to a base class token', (scope, color) => {
    const selector = baseTokenSelector(`html:not(.dark) ${scope}`, color);
    expect(indexHtml).toContain(selector);
    expect(indexHtml).not.toContain(`${scope} [class*="border-${color}-"]`);
  });

  test('does not treat hover and focus variants as permanent accent borders', () => {
    document.body.innerHTML = `
      <section class="it-support-overview">
        <button id="neutral" class="border border-slate-600 hover:border-blue-400 focus:border-cyan-400"></button>
        <div id="blue-base" class="border-blue-500/30"></div>
        <div id="cyan-base" class="rounded border-cyan-700"></div>
      </section>
    `;

    const blueSelector = baseTokenSelector('.it-support-overview', 'blue');
    const cyanSelector = baseTokenSelector('.it-support-overview', 'cyan');

    expect(document.querySelector('#neutral').matches(blueSelector)).toBe(false);
    expect(document.querySelector('#neutral').matches(cyanSelector)).toBe(false);
    expect(document.querySelector('#blue-base').matches(blueSelector)).toBe(true);
    expect(document.querySelector('#cyan-base').matches(cyanSelector)).toBe(true);
  });
});
