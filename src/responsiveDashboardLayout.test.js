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
    expect(dashboardSource).toContain("gridClass: 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-6'");
    expect(dashboardSource).toContain("gridClass: 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'");
    expect(dashboardSource).toContain('global-kpi-card group relative min-h-[132px]');
    expect(dashboardSource).toContain('flex min-h-[130px] w-full flex-col rounded-md');
    expect(dashboardSource).toContain('global-kpi-currency mt-2 flex flex-wrap items-baseline');
    expect(dashboardSource).toContain('global-kpi-cfa whitespace-nowrap text-orange-400');
    expect(dashboardSource).toContain('const kpiFlowTextClasses = {');
    expect(dashboardSource).toContain("icon: TrendingDown, accent: 'red', flowAccent: 'red'");
    expect(dashboardSource).toContain("icon: Gift, accent: 'violet', flowAccent: 'violet'");
    expect(dashboardSource).toContain('accent: balanceFlowAccent, flowAccent: balanceFlowAccent');
    expect(dashboardSource).not.toContain("id: 'reference-rate', label: t.referenceRate");
    expect(dashboardSource.indexOf("id: 'financing'")).toBeLessThan(dashboardSource.indexOf("id: 'real-estate-funding'"));
    expect(dashboardSource.indexOf("id: 'real-estate-funding'")).toBeLessThan(dashboardSource.indexOf("id: 'real-estate-reimbursements'"));
    expect(dashboardSource.indexOf("id: 'real-estate-reimbursements'")).toBeLessThan(dashboardSource.indexOf("id: 'outstanding-balance'"));
    expect(pilotageSource).toContain('moduleId="dashboard"');
    expect(readSource('moduleTabs.js')).toContain('flex gap-4 mb-6 border-b border-slate-700 overflow-x-auto');
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
    expect(indexHtml).toContain('html:not(.dark) .global-kpi-card .global-kpi-cfa{color:#c2410c!important}');
    expect(indexHtml).toContain('html:not(.dark) .global-kpi-card .global-kpi-status--available');
  });

  test('keeps only source-backed dashboard analysis', () => {
    expect(dashboardSource).toContain('dashboard-analysis-section');
    expect(dashboardSource).toContain('Documented financial trend');
    expect(dashboardSource).not.toContain('<PieChart>');
    expect(dashboardSource).not.toContain('aria-label={`${t.openModule}: ${t.crm}`}');
  });
});
