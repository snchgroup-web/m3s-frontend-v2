# Consultation RH : integration fermee par defaut

Branche `codex/rh-read-ui-20261006`, base GitHub main `272bb9bc7e976a373a20bcdf643aa93470c6e04f`. Publication du code autorisee le 06.10.2026, sans activation des sources reelles. Cette reference source n'est pas une verification du frontend deploye ; la propagation sera controlee apres fusion.

`RH.js` conserve le registre de brouillons de session, les champs du formulaire, l'annuaire RH-001 et Mon compte. Une consultation distincte est ajoutee avant la table locale. Le compteur local est retire du titre de l'onglet pour ne pas le confondre avec un total persistant.

`rhReadAccess` reste null dans le montage applicatif : aucun appel RH n'est active en production par ce lot. Le composant exige une session Google prete et une qualification explicite liee au meme utilisateur/organisation, avec revision. Cette porte d'affichage n'accorde aucun droit : le serveur doit verifier les habilitations courantes a chaque requete.

Le transport reutilise le jeton du pont d'identite existant, uniquement pour GET `/api/rh/private/employees` avec pagination bornee et sans cache. Aucun jeton de demonstration, URL arbitraire, commande de mutation ou credential ajoute. Une ancienne reponse 401 ne ferme pas une session devenue differente.

Les changements de contexte connu remountent la consultation, retirent ses lignes et details et annulent la requete precedente. La revision de qualification doit changer quand l'hote apprend une modification d'habilitation. Il n'y a ni surveillance en temps reel des droits, ni garantie de revocation atomique au milieu d'une transaction. Aucun stockage navigateur des dossiers.

Projection limitee : reference, nom, mission/site optionnels, debut optionnel, revision, statut brouillon et classification C3. Les inconnues restent inconnues ; pas de salaire, contact, piece d'identite, contrat, compte salarie ou total invente.

## Verification

- 51/51 tests cibles : formulaire RH preserve, portes d'affichage, contexte, annulation, erreurs, projection stricte, transport et non-regression Mon compte/GED.
- Build React Scripts termine ; correction du controle des caracteres sans desactiver ESLint. Avertissements generaux existants : Browserslist ancien, depreciation Node fs.F_OK, taille du bundle global.
- Apercu `../qa-rh-ui` utilisant les vrais composants et styles locaux avec fournisseurs d'identite/API remplaces par des fixtures. Aucun jeton ou appel cloud. CSP connect-src none, serveur limite a six chemins d'assets sur 127.0.0.1:4330.
- Bureau et viewport mobile 390 x 844 : logo charge, FR/DE/EN, themes clair/sombre/profond, details repliables, refus 403 et fermeture 503, retrait au changement de contexte/desactivation. Tableau mobile a defilement horizontal interne, sans debordement de page. Override de viewport retire.
- Styles Tailwind generes hors ligne avec la version deja installee (v4) : cela ne prouve pas une identite pixel parfaite avec le CDN Tailwind du HTML de production. Aucun nouvel abonnement/dependance.
- Console : erreurs de l'extension Zotero, pas d'erreur applicative observee. Capture pleine page mobile expiree ; captures normales bureau/mobile disponibles dans l'apercu QA.

## Portes restantes

Qualifier les references existantes et la source serveur de lecture RH du responsable. Ne pas generer une identite canonique a partir d'un nom ou reutiliser un droit Finance/Manager. Ensuite seulement, sous enveloppe specifique : sauvegarde, integration de la source persistante et des droits SQL limites, migration/import des brouillons verifies, revue, activation et recette restreinte. La publication du code ferme est distincte de cette activation reelle et ne cree aucun dossier.
