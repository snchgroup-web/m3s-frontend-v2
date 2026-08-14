import {
  ADMINISTRATION_AUDIT_PERMISSION,
  ADMINISTRATION_CORRESPONDENCE_READ_PERMISSION,
  ADMINISTRATION_CORRESPONDENCE_WRITE_PERMISSION,
  ADMINISTRATION_RESOURCES_READ_PERMISSION,
  ADMINISTRATION_RESOURCES_WRITE_PERMISSION
} from './accessControl';

const MANAGER_PERMISSIONS = Object.freeze([
  ADMINISTRATION_AUDIT_PERMISSION,
  ADMINISTRATION_RESOURCES_READ_PERMISSION,
  ADMINISTRATION_RESOURCES_WRITE_PERMISSION,
  ADMINISTRATION_CORRESPONDENCE_READ_PERMISSION,
  ADMINISTRATION_CORRESPONDENCE_WRITE_PERMISSION
]);

const USER_PERMISSIONS = Object.freeze([
  ADMINISTRATION_RESOURCES_READ_PERMISSION,
  ADMINISTRATION_CORRESPONDENCE_READ_PERMISSION
]);

export const DEMO_ACCOUNTS = Object.freeze([
  Object.freeze({
    id: 'manager-demo',
    email: 'manager.demo@m3s.local',
    name: 'Manager démo',
    role: 'Manager',
    permissions: MANAGER_PERMISSIONS
  }),
  Object.freeze({
    id: 'utilisateur-demo',
    email: 'utilisateur.demo@m3s.local',
    name: 'Utilisateur démo',
    role: 'Utilisateur',
    permissions: USER_PERMISSIONS
  })
]);

export const findDemoAccount = email => DEMO_ACCOUNTS.find(account => account.email === email);
