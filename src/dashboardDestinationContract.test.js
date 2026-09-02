import fs from 'fs';
import path from 'path';
import { parse } from '@babel/parser';
import menuStructure from './menuStructure.json';
import {
  DASHBOARD_INDICATOR_DESTINATIONS,
  getDashboardIndicatorDestination,
  getDashboardReturnContext,
  buildDashboardReturnPath
} from './dashboardNavigation';

const owners = {
  '/administration': ['Administration.js', 'AdministrationPortfolioOverview.js'],
  '/ged': ['GED.js'],
  '/finance': ['Finance.js'],
  '/rh': ['RH.js', 'MembersDirectory.js'],
  '/actifs': ['Actifs.js'],
  '/crm': ['CRM.js'],
  '/production': ['Production.js']
};

const attribute = (node, name) => node.attributes.find(item => item.type === 'JSXAttribute' && item.name.name === name)?.value?.value;
const anchors = {};
const renderedTabs = {};
Object.entries(owners).forEach(([route, files]) => {
  anchors[route] = [];
  renderedTabs[route] = new Set();
  const visit = node => {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'JSXOpeningElement' && attribute(node, 'id')) anchors[route].push(node);
    if (node.type === 'BinaryExpression' && node.operator === '===' && node.left.name === 'activeTab' && node.right.type === 'StringLiteral') renderedTabs[route].add(node.right.value);
    Object.values(node).forEach(value => {
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object') visit(value);
    });
  };
  files.forEach(file => visit(parse(fs.readFileSync(path.join(__dirname, file), 'utf8'), { sourceType: 'module', plugins: ['jsx'] })));
});

test.each(Object.entries(DASHBOARD_INDICATOR_DESTINATIONS))('%s targets a unique focusable section, a real tab and the originating KPI', (indicator, destination) => {
  const url = new URL(getDashboardIndicatorDestination(indicator), 'https://m3s.local');
  const targets = anchors[url.pathname].filter(node => attribute(node, 'id') === url.hash.slice(1));
  expect(targets).toHaveLength(1);
  expect(attribute(targets[0], 'tabIndex')).toBe('-1');
  expect(attribute(targets[0], 'className')).toMatch(/\bscroll-mt-/);
  const tab = url.searchParams.get('tab') || 'overview';
  const menu = menuStructure.menu.find(item => item.path === url.pathname);
  expect(menu).toBeDefined();
  if (tab !== 'overview') {
    const menuTab = menu.children.some(child => new URL(child.path, url.origin).searchParams.get('tab') === tab);
    expect(menuTab || renderedTabs[url.pathname].has(tab)).toBe(true);
  }
  const context = getDashboardReturnContext(url.search);
  expect(context.enabled).toBe(true);
  expect(new URL(buildDashboardReturnPath(context.indicatorId, context.view), url.origin).hash).toBe('#dashboard-kpi-' + indicator);
  expect(url.hash).toBe(new URL(destination, url.origin).hash);
});

test.each([['founders', 'fondateur'], ['associates', 'associe'], ['members', null], ['teams', null]])('%s preserves its directory preset and return identity', (indicator, type) => {
  const url = new URL(getDashboardIndicatorDestination(indicator), 'https://m3s.local');
  expect(url.searchParams.get('memberType')).toBe(type);
  expect(url.searchParams.get('dashboardKpi')).toBe(indicator);
  expect(url.hash).toBe('#members-directory-register');
});

test.each(['donations', 'financing'])('%s preserves its income scope and return identity', indicator => {
  const url = new URL(getDashboardIndicatorDestination(indicator), 'https://m3s.local');
  expect(url.searchParams.get('incomeScope')).toBe(indicator);
  expect(url.searchParams.get('dashboardKpi')).toBe(indicator);
  expect(url.hash).toBe('#finance-revenue-register');
});
