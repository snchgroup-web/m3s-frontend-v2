const fs = require('fs');
const path = require('path');

const designSystemCss = fs.readFileSync(path.join(__dirname, '..', 'public', 'designSystem.css'), 'utf8');
const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
const layoutSource = fs.readFileSync(path.join(__dirname, 'Layout.js'), 'utf8');
const headerSource = fs.readFileSync(path.join(__dirname, 'Header.js'), 'utf8');
const tableSource = fs.readFileSync(path.join(__dirname, 'TableControls.js'), 'utf8');
const administrationSource = fs.readFileSync(path.join(__dirname, 'Administration.js'), 'utf8');
const standardUiSource = fs.readFileSync(path.join(__dirname, 'StandardUI.js'), 'utf8');
const dateInputSource = fs.readFileSync(path.join(__dirname, 'LocalizedDateInput.js'), 'utf8');
const journalTaskSource = fs.readFileSync(path.join(__dirname, 'JournalTaskRegister.js'), 'utf8');
const businessModuleSources = ['Finance.js', 'RH.js', 'CRM.js', 'Production.js', 'Actifs.js', 'GED.js']
  .map(file => fs.readFileSync(path.join(__dirname, file), 'utf8'));

describe('global M3S design foundations', () => {
  test('scopes shared typography and theme tokens to every module page', () => {
    expect(layoutSource).toContain('m3s-design-scope flex-1 overflow-auto');
    expect(designSystemCss).toContain('--m3s-font-ui: "Segoe UI", Inter, Arial, sans-serif');
    expect(designSystemCss).toContain('html.dark');
    expect(designSystemCss).toContain('.m3s-design-scope h1');
    expect(headerSource).toContain('text-base font-semibold text-slate-100 sm:gap-1.5 sm:text-xl');
    expect(indexHtml).toContain('html:not(.dark) .app-header .text-slate-100{color:#172033!important}');
    expect(indexHtml).toContain('html:not(.dark) .header-settings-choice--active');
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
    expect(standardUiSource).toContain('export const StandardCreateButton');
    expect(standardUiSource).toContain('m3s-success-button min-h-11 w-full gap-2 px-4 py-2');
    expect(administrationSource).toContain('<StandardCreateButton onClick={openNewTaskModal}>');
    expect(administrationSource).toContain("editingTaskId ? 'm3s-primary-button' : 'm3s-success-button'");
  });

  test('keeps custom and native date selectors visible in both themes', () => {
    expect(dateInputSource).toContain('m3s-date-input__control');
    expect(dateInputSource).toContain('m3s-date-input__icon');
    expect(dateInputSource).toContain('m3s-date-picker__day');
    expect(designSystemCss).toContain('html.dark .m3s-date-input__icon');
    expect(designSystemCss).toContain('.m3s-date-picker__day.is-selected');
    expect(designSystemCss).toContain('html.dark .m3s-native-date::-webkit-calendar-picker-indicator');
    expect(journalTaskSource).toContain('m3s-field m3s-native-date');
  });

  test('loads the shared foundation without changing the CDN Tailwind pipeline', () => {
    expect(indexHtml).toContain('<link rel="stylesheet" href="%PUBLIC_URL%/designSystem.css" />');
  });

  test('applies the shared business-module contrast layer to every function', () => {
    businessModuleSources.forEach(source => expect(source).toContain('m3s-business-module'));
    expect(designSystemCss).toContain('html:not(.dark) .m3s-business-module .text-slate-100');
    expect(designSystemCss).toContain('html:not(.dark) .m3s-business-module .text-blue-100');
  });
});
