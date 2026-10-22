export const PRODUCTION_TOOLS_PATH = '/production?tab=manufacturing#production-tools';
export const PRODUCTION_TOOLS_TASK = 'TAC-PROD-OUTILS-20261019-001';
export const PRODUCTION_TOOLS_TASK_PATH = `/account?view=tasks&returnTo=production&taskSearch=${PRODUCTION_TOOLS_TASK}#own-account-top`;
export const LOCAL_COMPARATOR_PATH = '/production?tab=manufacturing&tool=comparator-avants-fenetres#production-local-comparator';
export const DAILY_PRODUCTION_PATH = '/?view=intelligence&returnTo=production-tools';
export const DAILY_BRIEF_URL = 'https://chatgpt.com/s/t_6ad5606d2a488191ba1548f9b85daf9b';
export const PRODUCTION_TOOL_IDS = Object.freeze(['budget-perso-ch', 'rh-proximite', 'espace-salarie', 'fx', 'fluxconvert', 'comparator-avants-fenetres', 'daily-brief', 'daily-dashboard']);

export function getProductionToolReturnPath(search) {
  const params = new URLSearchParams(search);
  if (!['production', 'production-tools'].includes(params.get('returnTo'))) return null;
  const id = params.get('returnTool');
  return PRODUCTION_TOOL_IDS.includes(id) ? `/production?tab=manufacturing#production-tool-${id}` : PRODUCTION_TOOLS_PATH;
}

export function withProductionToolReturn(path, search) {
  if (!getProductionToolReturnPath(search)) return path;
  const url = new URL(path, 'https://m3s.local');
  const source = new URLSearchParams(search);
  url.searchParams.set('returnTo', source.get('returnTo'));
  const id = source.get('returnTool');
  if (PRODUCTION_TOOL_IDS.includes(id)) url.searchParams.set('returnTool', id);
  return `${url.pathname}${url.search}${url.hash}`;
}

export const TOOL_ENTRY_PATHS = Object.freeze({
  'budget-perso-ch': '/account?view=finances&returnTo=production&returnTool=budget-perso-ch#personal-finances',
  'rh-proximite': '/rh?tab=resources&returnTo=production-tools&returnTool=rh-proximite#rh-proximity-tools',
  fx: '/finance?tab=fx&fxView=converter&returnTo=production-tools&returnTool=fx#finance-fx-navigation',
  'daily-dashboard': `${DAILY_PRODUCTION_PATH}&returnTool=daily-dashboard`
});

// Documentary manufacturing references, not order IDs or recorded acceptances.
export const TOOL_SOURCE_REFERENCES = Object.freeze({
  fluxconvert: 'Git f616e00 / ZIP 0.1.0 / 383f9b6dd8cf3cb6e712258831fa84fe8ecc09893ca346b2ac28579e174d1f92',
  'comparator-avants-fenetres': 'HTML 24-07-26 / 2b09f9f8ed230162fcd728020a4c5300ee1a691270d6816b1b2033da6fac1028',
  'daily-brief': 'HTML / 6b8975163cd8d7705c2a652e163baef3b31be4629579440dfeada5e5656c88a2',
  'daily-dashboard': 'M3S / intelligence/latest / V4'
});
