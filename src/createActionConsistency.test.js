const fs = require('fs');
const path = require('path');

const readSource = fileName => fs.readFileSync(path.join(__dirname, fileName), 'utf8');

const activeCreateSurfaces = [
  'Administration.js',
  'Finance.js',
  'RH.js',
  'GED.js',
  'Production.js',
  'Actifs.js',
  'JournalTaskRegister.js',
  'FunctionGlossary.js'
];

describe('shared create action convention', () => {
  test('provides one accessible semantic create button', () => {
    const source = readSource('StandardUI.js');

    expect(source).toContain('export const StandardCreateButton');
    expect(source).toContain("icon: Icon = Plus");
    expect(source).toContain("type = 'button'");
    expect(source).toContain('m3s-success-button min-h-11 w-full gap-2 px-4 py-2');
    expect(source).toContain('sm:w-auto sm:shrink-0 sm:whitespace-nowrap');
    expect(source).toContain('aria-hidden="true"');
  });

  test.each(activeCreateSurfaces)('%s uses the shared create action', fileName => {
    expect(readSource(fileName)).toContain('StandardCreateButton');
  });

  test('keeps create, update and delete intentions visually distinct', () => {
    const sources = activeCreateSurfaces.map(readSource).join('\n');

    expect(sources).toContain('m3s-success-button');
    expect(sources).toContain('m3s-primary-button');
    expect(sources).toContain('m3s-danger-button');
  });

  test('does not reuse legacy accent colors for the audited create actions', () => {
    const production = readSource('Production.js');
    const assets = readSource('Actifs.js');
    const finance = readSource('Finance.js');
    const ged = readSource('GED.js');
    const administration = readSource('Administration.js');

    expect(production).not.toContain('bg-purple-600 hover:bg-purple-700');
    expect(assets).not.toContain('bg-sky-600 px-4 py-2 font-medium');
    expect(finance).not.toContain('bg-red-600 hover:bg-red-700 text-white rounded-lg transition');
    expect(ged).not.toContain('bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition');
    expect(administration).not.toContain('bg-purple-600 hover:bg-purple-700');
  });
});
