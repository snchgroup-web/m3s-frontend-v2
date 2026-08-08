const fs = require('fs');
const path = require('path');

const readSource = (name) => fs.readFileSync(path.join(__dirname, name), 'utf8');

describe('responsive dashboard shell', () => {
  const layoutSource = readSource('Layout.js');
  const headerSource = readSource('Header.js');
  const dashboardSource = readSource('Dashboard.js');
  const pilotageSource = readSource('DashboardPilotageNavigation.js');
  const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');

  test('uses a full-width mobile layout with an off-canvas menu', () => {
    expect(layoutSource).toContain('max-lg:-translate-x-full');
    expect(layoutSource).toContain('max-lg:fixed max-lg:inset-y-0');
    expect(layoutSource).toContain('bg-slate-950/60 backdrop-blur-[1px] lg:hidden');
    expect(layoutSource).toContain('<Header onOpenMenu={() => setSidebarOpen(true)} />');
    expect(headerSource).toContain('className="icon-button lg:hidden"');
  });

  test('keeps dashboard content compact and readable on small screens', () => {
    expect(dashboardSource).toContain('space-y-4 p-3 sm:p-4 lg:space-y-6 lg:p-6');
    expect(dashboardSource).toContain("gridClass: 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-5'");
    expect(dashboardSource).toContain('global-kpi-card group flex min-h-[132px] w-full flex-col');
    expect(pilotageSource).toContain('grid w-full grid-cols-3 gap-1.5');
    expect(pilotageSource).toContain('intelligence-card rounded-md border');
  });

  test('uses restrained warning and intelligence surfaces in both themes', () => {
    expect(indexHtml).toContain('.dashboard-data-warning{background-color:rgba(15,23,42,.55)');
    expect(indexHtml).toContain('.intelligence-card{background-color:rgba(15,23,42,.45)');
    expect(indexHtml).toContain('html:not(.dark) .dashboard-data-warning{background-color:#fff!important');
    expect(indexHtml).toContain('html:not(.dark) .intelligence-card{background-color:#fff!important');
  });

  test('keeps management copy readable and Intelligence actions aligned in light mode', () => {
    expect(pilotageSource).toContain('management-principle-body');
    expect(pilotageSource).toContain('hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-lg');
    expect(pilotageSource).toContain('tabIndex={0}');
    expect(pilotageSource).toContain('flex items-center gap-2.5');
    expect(pilotageSource).toContain('intelligence-actions mt-4 grid grid-cols-2');
    expect(pilotageSource).toContain('intelligence-action--success');
    expect(pilotageSource).toContain('intelligence-action--primary');
    expect(indexHtml).toContain('html:not(.dark) .management-principle-body{color:#334155!important}');
    expect(indexHtml).toContain('html:not(.dark) .management-principle-card:hover');
    expect(indexHtml).toContain('html:not(.dark) .intelligence-edition-meta{color:#047857!important}');
  });

  test('keeps grouped KPI headings and values readable in light mode', () => {
    expect(dashboardSource).toContain('Management & Governance');
    expect(dashboardSource).toContain('Operations & Development');
    expect(indexHtml).toContain('html:not(.dark) .global-kpi-group .text-slate-100{color:#172033!important}');
    expect(indexHtml).toContain('html:not(.dark) .global-kpi-card{background-color:#fff!important');
  });
});
