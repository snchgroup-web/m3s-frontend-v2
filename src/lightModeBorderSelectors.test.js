const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
const administrationSource = fs.readFileSync(path.join(__dirname, 'Administration.js'), 'utf8');
const institutionSource = fs.readFileSync(path.join(__dirname, 'InstitutionOverview.js'), 'utf8');
const planningSource = fs.readFileSync(path.join(__dirname, 'PlanningOverview.js'), 'utf8');
const loginSource = fs.readFileSync(path.join(__dirname, 'Login.js'), 'utf8');

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

  test('keeps Administration headings readable and gives light mode KPIs a softer palette', () => {
    expect(administrationSource).toContain('administration-page min-h-screen');
    expect(indexHtml).toContain('html:not(.dark) .administration-page .text-slate-100');
    expect(indexHtml).toContain('html:not(.dark) .administration-page .administration-kpi{background-image:none!important}');
    expect(indexHtml).toContain('.administration-kpi--blue{background-color:#eff6ff!important');
    expect(indexHtml).toContain('.administration-kpi--green{background-color:#ecfdf5!important');
    expect(indexHtml).toContain('.administration-kpi--purple{background-color:#faf5ff!important');
    expect(indexHtml).toContain('.administration-kpi--red{background-color:#fff1f2!important');
    expect(indexHtml).toContain('.administration-kpi--amber{background-color:#fffbeb!important');
    expect((administrationSource.match(/administration-kpi--/g) || [])).toHaveLength(5);
  });

  test('uses the lighter institutional heading hierarchy', () => {
    expect(institutionSource).toContain('text-2xl font-semibold text-slate-100');
    expect(institutionSource).toContain('text-xl font-semibold text-slate-100');
    expect(planningSource).toContain('id="current-title" className="text-lg font-semibold text-white"');
  });

  test('keeps Administration forms readable and accessible in both themes', () => {
    expect(indexHtml).toContain('html:not(.dark) .administration-modal .text-slate-100{color:#172033!important}');
    expect(indexHtml).toContain('html:not(.dark) .administration-modal__primary{color:#fff!important}');
    expect((administrationSource.match(/administration-modal__panel/g) || [])).toHaveLength(3);
    expect((administrationSource.match(/role="dialog"/g) || [])).toHaveLength(3);
    expect((administrationSource.match(/aria-modal="true"/g) || [])).toHaveLength(3);
    expect(administrationSource).toContain('id="task-title" type="text" required');
    expect(administrationSource).toContain('id="user-name" type="text" required');
    expect(administrationSource).toContain('id="user-email" type="email" required');
    expect(administrationSource).toContain('id="role-name" type="text" required');
  });

  test('keeps the light login form aligned with the design system', () => {
    expect(loginSource).toContain('login-page min-h-screen');
    expect(loginSource).toContain('login-session-alert');
    expect(loginSource).toContain('login-submit mt-6 min-h-11');
    expect(loginSource).toContain('login-backend-notice');
    expect(indexHtml).toContain('html:not(.dark) .login-page .login-session-alert{background-color:#fffbeb!important');
    expect(indexHtml).toContain('html:not(.dark) .login-page .login-submit{background-color:#2563eb!important;color:#fff!important}');
    expect(indexHtml).toContain('html:not(.dark) .login-page .login-backend-notice{color:#92400e!important}');
  });

  test('uses business-specific icons for the Administration KPIs', () => {
    expect(administrationSource).toContain('<Building2 size={32}');
    expect(administrationSource).toContain('<FolderKanban size={32}');
    expect(administrationSource).toContain('<CheckCircle2 size={32}');
    expect(administrationSource).toContain('<Mail size={32}');
    expect(administrationSource).toContain('<ShieldCheck size={32}');
  });

  test('highlights Administration table rows without changing their layout', () => {
    expect(indexHtml).toContain('html:not(.dark) .administration-table-row:hover{background-color:#eef6ff!important;box-shadow:inset 3px 0 #3b82f6}');
    expect((administrationSource.match(/administration-table-row/g) || [])).toHaveLength(3);
    expect(administrationSource).toContain('transition-colors hover:bg-blue-950/35');
    expect(administrationSource).toContain('onClick={() => handleEditTask(task)}');
    expect(administrationSource).toContain('onClick={() => handleEditUser(u)}');
    expect(administrationSource).toContain("event.key === 'Enter' || event.key === ' '");
    expect(administrationSource).toContain('event.stopPropagation(); handleDeleteTask');
    expect(administrationSource).toContain('event.stopPropagation(); handleDeleteUser');
  });
});
