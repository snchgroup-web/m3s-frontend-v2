export const PRODUCTION_SERVICE_RETURN_PATH = '/production?tab=services#production-service-followup';

export const PRODUCTION_SERVICE_DESTINATIONS = Object.freeze({
  documents: '/administration?tab=communication&returnTo=production-services',
  rh: '/rh?tab=resources&returnTo=production-services',
  planning: '/administration?tab=planning&returnTo=production-services'
});

export function getProductionServiceReturnPath(pathname, search) {
  const params = new URLSearchParams(search);
  if (params.get('returnTo') !== 'production-services') return null;
  const tab = params.get('tab');
  const isDestination = (pathname === '/administration' && ['communication', 'planning'].includes(tab)) ||
    (pathname === '/rh' && tab === 'resources');
  return isDestination ? PRODUCTION_SERVICE_RETURN_PATH : null;
}
