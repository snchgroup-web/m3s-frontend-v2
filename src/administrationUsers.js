export const normalizeAdministrationUser = (user = {}) => ({
  id: user.id || user.matricule || user.email || user.email_pro || user.name,
  name: user.name || [user.prenom, user.nom].filter(Boolean).join(' ').trim(),
  email: user.email || user.email_pro || '',
  position: user.position || user.poste || user.role || user.profil || '',
  department: user.department || user.departement || '',
  memberType: user.member_type || user.type_membre || '',
  status: user.status || (user.active === false ? 'Inactif' : 'Actif')
});

export const normalizeAuthAccountsCount = (payload = {}) => {
  const rawValue = payload.total ?? payload.count;
  if (rawValue === null || rawValue === undefined || rawValue === '') return null;
  const value = Number(rawValue);
  return Number.isFinite(value) ? value : null;
};
