# M3S ERP v2.0

Système de gestion d'entreprise avec 8 modules : Finance, Ressources Humaines, CRM, Production, Gestion des Actifs, Gestion Documentaire, Administration et Authentification.

## Fonctionnalités

- **8 Modules complets** : Finance, RH, CRM, Production, Actifs, GED, Administration
- **Multi-langue** : Support complet en Français (FR), Anglais (EN) et Allemand (DE)
- **Traductions professionnelles** : Tous les textes UI traduits pour chaque module
- **Authentification sécurisée** : Système de login avec contexte utilisateur
- **Design moderne** : Interface utilisateur avec Tailwind CSS et dégradés
- **Graphiques dynamiques** : Visualisations avec Recharts (BarChart, LineChart, PieChart)
- **Gestion d'état** : Context API pour la gestion globale des langues et utilisateurs

## Modules disponibles

### Finance
Gestion des recettes, dépenses et taux de change avec historique mensuel et analyse des tendances.

### Ressources Humaines
Gestion des employés, bénévoles et membres avec statistiques par statut.

### CRM
Gestion des prospects, clients et suivi des donations avec visualisation des tendances.

### Production
Suivi des commandes avec statuts (En attente, En cours, Livrée) et historique.

### Gestion des Actifs
Inventaire et valorisation des actifs avec calcul de dépréciation.

### GED (Gestion Électronique des Documents)
Stockage et gestion centralisée des documents avec classification.

### Administration
Paramètres système et gestion générale de l'application.

## Installation et lancement

```bash
npm install
npm start
```

L'application s'ouvrira à [http://localhost:3000](http://localhost:3000)

## Authentification

En développement local, copier `.env.example` vers `.env.local` et garder `REACT_APP_ENABLE_DEMO_AUTH=true` pour utiliser les comptes de démonstration.

En production, `REACT_APP_ENABLE_DEMO_AUTH=false` force l'application à utiliser `POST /api/auth/login` sur le backend configuré par `REACT_APP_API_URL`.

Après connexion backend, le frontend envoie automatiquement le token `Authorization: Bearer ...` sur les appels API.

## Build pour la production

```bash
npm run build
```

L'application est optimisée pour la production et prête à être déployée.

## Technologies utilisées

- React 18+
- React Router
- Tailwind CSS
- Recharts
- Lucide Icons
- Context API

## Déploiement

L'application est déployée sur Netlify avec CI/CD automatique sur chaque push vers la branche main.

## Notes de développement

- Toutes les traductions sont centralisées dans des objets de traduction dans chaque module
- Les hooks React utilisent les bonnes pratiques (useCallback, useMemo avec dépendances appropriées)
- Le contexte utilisateur persiste via localStorage pour la session courante
