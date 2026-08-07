const fs = require('fs');
const path = require('path');

const designSystemCss = fs.readFileSync(path.join(__dirname, '..', 'public', 'designSystem.css'), 'utf8');
const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
const layoutSource = fs.readFileSync(path.join(__dirname, 'Layout.js'), 'utf8');
const headerSource = fs.readFileSync(path.join(__dirname, 'Header.js'), 'utf8');
const tableSource = fs.readFileSync(path.join(__dirname, 'TableControls.js'), 'utf8');

describe('global M3S design foundations', () => {
  test('scopes shared typography and theme tokens to every module page', () => {
    expect(layoutSource).toContain('m3s-design-scope flex-1 overflow-auto');
    expect(designSystemCss).toContain('--m3s-font-ui: "Segoe UI", Inter, Arial, sans-serif');
    expect(designSystemCss).toContain('html.dark');
    expect(designSystemCss).toContain('.m3s-design-scope h1');
    expect(headerSource).toContain('text-xl font-semibold text-slate-100');
    expect(indexHtml).toContain('html:not(.dark) .app-header .text-slate-100{color:#172033!important}');
  });

  test('standardizes thin table borders and interactive rows', () => {
    expect(tableSource).toContain('m3s-table-shell');
    expect(tableSource).toContain('m3s-field');
    expect(designSystemCss).toContain('border: 1px solid var(--m3s-border)');
    expect(designSystemCss).toContain('.m3s-design-scope .border-2');
    expect(designSystemCss).toContain('.m3s-design-scope :is(.rounded-xl, .rounded-2xl, .rounded-3xl)');
    expect(designSystemCss).toContain('.m3s-design-scope table tbody tr:hover');
    expect(designSystemCss).toContain('.function-glossary__term:hover');
    expect(designSystemCss).toContain('box-shadow: inset 3px 0 var(--m3s-row-accent)');
  });

  test('keeps field labels and empty states correctly accented', () => {
    expect(tableSource).toContain("noResult: 'Aucun résultat'");
    expect(tableSource).toContain("shown: 'affichées'");
    expect(tableSource).toContain("clearSearch: 'Suche löschen'");
  });

  test('provides semantic action and feedback colors in both themes', () => {
    expect(designSystemCss).toContain('.m3s-success-button');
    expect(designSystemCss).toContain('.m3s-danger-button');
    expect(designSystemCss).toContain('.m3s-feedback--success');
    expect(designSystemCss).toContain('html.dark .m3s-glossary-status--validated');
    expect(designSystemCss).toContain('html.dark .m3s-draft-badge');
  });

  test('loads the shared foundation without changing the CDN Tailwind pipeline', () => {
    expect(indexHtml).toContain('<link rel="stylesheet" href="%PUBLIC_URL%/designSystem.css" />');
  });
});
