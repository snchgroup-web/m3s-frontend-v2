import fs from 'fs';
import path from 'path';
import {
  ADMINISTRATION_AUDIT_PERMISSION,
  ADMINISTRATION_CORRESPONDENCE_READ_PERMISSION,
  ADMINISTRATION_CORRESPONDENCE_WRITE_PERMISSION,
  ADMINISTRATION_RESOURCES_READ_PERMISSION,
  ADMINISTRATION_RESOURCES_WRITE_PERMISSION
} from './accessControl';
import { DEMO_ACCOUNTS, findDemoAccount } from './demoAuth';

describe('comptes de démonstration locaux', () => {
  test('utilise uniquement des identités fictives sans mot de passe embarqué', () => {
    expect(DEMO_ACCOUNTS).toHaveLength(2);
    expect(DEMO_ACCOUNTS.every(account => account.email.endsWith('@m3s.local'))).toBe(true);
    expect(DEMO_ACCOUNTS.every(account => !Object.hasOwn(account, 'password'))).toBe(true);
  });

  test('distingue le manager démo de l’utilisateur ordinaire', () => {
    const manager = findDemoAccount('manager.demo@m3s.local');
    const utilisateur = findDemoAccount('utilisateur.demo@m3s.local');

    expect(manager.permissions).toContain(ADMINISTRATION_AUDIT_PERMISSION);
    expect(manager.permissions).toEqual(expect.arrayContaining([
      ADMINISTRATION_RESOURCES_READ_PERMISSION,
      ADMINISTRATION_RESOURCES_WRITE_PERMISSION,
      ADMINISTRATION_CORRESPONDENCE_READ_PERMISSION,
      ADMINISTRATION_CORRESPONDENCE_WRITE_PERMISSION
    ]));
    expect(utilisateur.role).toBe('Utilisateur');
    expect(utilisateur.permissions).not.toContain(ADMINISTRATION_AUDIT_PERMISSION);
    expect(utilisateur.permissions).toEqual([
      ADMINISTRATION_RESOURCES_READ_PERMISSION,
      ADMINISTRATION_CORRESPONDENCE_READ_PERMISSION
    ]);
  });

  test('ne conserve plus les anciens identifiants de démonstration dans l’authentification', () => {
    const source = ['AuthContext.js', 'Login.js']
      .map(file => fs.readFileSync(path.join(__dirname, file), 'utf8'))
      .join('\n');

    expect(source).not.toMatch(/manager123|finance123|admin123/);
    expect(source).not.toMatch(/cheikh@seneswiss\.sn|chantal@seneswiss\.sn|pape@seneswiss\.sn/);
  });
});
