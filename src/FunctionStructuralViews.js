import React from 'react';
import {
  Archive,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileCheck2,
  Layers3,
  Network,
  Route,
  ShieldCheck,
  Workflow
} from 'lucide-react';

const copy = {
  FR: {
    architectureEyebrow: 'CADRAGE DE LA FONCTION · LECTURE STRUCTURELLE',
    architectureTitle: 'Architecture & relations {module}',
    architectureIntro: 'Cette vue situe les objets, échanges et preuves attendus. Elle ne constitue ni un schéma technique déployé, ni une source maîtresse.',
    layers: 'Couches fonctionnelles',
    relations: 'Relations avec les autres fonctions',
    architectureBoundary: 'Cadrage fonctionnel à valider : les relations présentées orientent la conception sans créer de droit, de contrat de données ou d’automatisation.',
    processEyebrow: 'PROCESSUS & PROCÉDURES · CYCLE MINIMAL',
    processTitle: 'Processus & procédures {module}',
    processIntro: 'Le cycle ci-dessous rend le traitement compréhensible et contrôlable. Il ne vaut procédure adoptée que lorsqu’une version, un responsable et une preuve d’approbation sont enregistrés.',
    cycle: 'Cycle minimal de traitement',
    controls: 'Contrôles à prévoir',
    processBoundary: 'Toute procédure reste candidate tant que son propriétaire, sa version, sa date d’effet et sa preuve d’adoption ne sont pas confirmés.',
    steps: ['Saisir', 'Qualifier', 'Valider', 'Exécuter', 'Contrôler', 'Clôturer & archiver'],
    layerLabels: ['Interface & vues', 'Objets & registres', 'Services & sources', 'Preuves & GED']
  },
  EN: {
    architectureEyebrow: 'FUNCTION FRAMING · STRUCTURAL VIEW',
    architectureTitle: '{module} architecture & relations',
    architectureIntro: 'This view positions expected objects, exchanges and evidence. It is neither a deployed technical blueprint nor a master source.',
    layers: 'Functional layers',
    relations: 'Relations with other functions',
    architectureBoundary: 'Functional framing to validate: these relations guide design without creating rights, data contracts or automation.',
    processEyebrow: 'PROCESSES & PROCEDURES · MINIMUM CYCLE',
    processTitle: '{module} processes & procedures',
    processIntro: 'The cycle below makes processing understandable and controllable. It only becomes an adopted procedure when a version, owner and approval evidence are recorded.',
    cycle: 'Minimum processing cycle',
    controls: 'Controls to plan',
    processBoundary: 'Every procedure remains a candidate until its owner, version, effective date and adoption evidence are confirmed.',
    steps: ['Capture', 'Qualify', 'Approve', 'Execute', 'Control', 'Close & archive'],
    layerLabels: ['Interface & views', 'Objects & registers', 'Services & sources', 'Evidence & DMS']
  },
  DE: {
    architectureEyebrow: 'RAHMEN DER FUNKTION · STRUKTURELLE SICHT',
    architectureTitle: 'Architektur & Beziehungen {module}',
    architectureIntro: 'Diese Ansicht ordnet erwartete Objekte, Austausche und Nachweise ein. Sie ist weder ein implementierter technischer Bauplan noch eine Masterquelle.',
    layers: 'Funktionale Schichten',
    relations: 'Beziehungen zu anderen Funktionen',
    architectureBoundary: 'Zu validierender funktionaler Rahmen: Diese Beziehungen unterstützen die Konzeption, ohne Rechte, Datenverträge oder Automatisierungen zu schaffen.',
    processEyebrow: 'PROZESSE & VERFAHREN · MINDESTZYKLUS',
    processTitle: 'Prozesse & Verfahren {module}',
    processIntro: 'Der folgende Zyklus macht die Bearbeitung verständlich und kontrollierbar. Ein Verfahren gilt erst mit Version, Verantwortung und Genehmigungsnachweis als angenommen.',
    cycle: 'Mindestzyklus der Bearbeitung',
    controls: 'Einzuplanende Kontrollen',
    processBoundary: 'Jedes Verfahren bleibt ein Kandidat, bis Verantwortung, Version, Gültigkeitsdatum und Annahmenachweis bestätigt sind.',
    steps: ['Erfassen', 'Qualifizieren', 'Genehmigen', 'Ausführen', 'Kontrollieren', 'Abschließen & archivieren'],
    layerLabels: ['Oberfläche & Ansichten', 'Objekte & Register', 'Dienste & Quellen', 'Nachweise & GED']
  }
};

const modules = {
  rh: {
    names: { FR: 'Ressources Humaines', EN: 'Human Resources', DE: 'Personalwesen' },
    layers: {
      FR: ['Tableau de bord, annuaire et fiches', 'Personnes, rôles, équipes, compétences et activités', 'Annuaire, droits, temps et sources RH', 'CV, contrats, décisions et pièces protégées'],
      EN: ['Dashboard, directory and records', 'People, roles, teams, skills and activities', 'Directory, rights, time and HR sources', 'CVs, contracts, decisions and protected evidence'],
      DE: ['Dashboard, Verzeichnis und Datensätze', 'Personen, Rollen, Teams, Kompetenzen und Aktivitäten', 'Verzeichnis, Rechte, Zeit und HR-Quellen', 'Lebensläufe, Verträge, Entscheidungen und geschützte Nachweise']
    },
    relations: {
      FR: ['Administration · mandats, droits et décisions', 'Finances · rémunérations, frais et engagements', 'Planification · charge, activités et échéances', 'GED · dossiers individuels et confidentialité'],
      EN: ['Administration · mandates, rights and decisions', 'Finance · compensation, expenses and commitments', 'Planning · workload, activities and deadlines', 'DMS · individual files and confidentiality'],
      DE: ['Administration · Mandate, Rechte und Entscheidungen', 'Finanzen · Vergütung, Kosten und Verpflichtungen', 'Planung · Auslastung, Aktivitäten und Fristen', 'GED · Personaldossiers und Vertraulichkeit']
    },
    controls: {
      FR: ['Minimisation des données personnelles', 'Droits selon rôle et responsabilité', 'Validation des changements sensibles', 'Conservation séparée des pièces protégées'],
      EN: ['Personal-data minimisation', 'Rights by role and responsibility', 'Approval of sensitive changes', 'Separate storage of protected evidence'],
      DE: ['Minimierung personenbezogener Daten', 'Rechte nach Rolle und Verantwortung', 'Genehmigung sensibler Änderungen', 'Getrennte Ablage geschützter Nachweise']
    }
  },
  commercial: {
    names: { FR: 'Commercial & CRM', EN: 'Commercial & CRM', DE: 'Vertrieb & CRM' },
    layers: {
      FR: ['Pilotage des relations et registres', 'Prospects, clients, ventes, dons et bénéficiaires', 'Sources CRM, offres, consentements et canaux', 'Échanges, accords, preuves et pièces commerciales'],
      EN: ['Relationship steering and registers', 'Prospects, clients, sales, donations and beneficiaries', 'CRM sources, offers, consent and channels', 'Exchanges, agreements, evidence and commercial records'],
      DE: ['Beziehungssteuerung und Register', 'Interessenten, Kunden, Verkäufe, Spenden und Begünstigte', 'CRM-Quellen, Angebote, Einwilligungen und Kanäle', 'Austausche, Vereinbarungen und Vertriebsnachweise']
    },
    relations: {
      FR: ['Finances · ventes, dons, paiements et rapprochements', 'Production · commandes, livraisons et disponibilité', 'Administration · communication officielle et engagements', 'GED · consentements, offres et preuves de relation'],
      EN: ['Finance · sales, donations, payments and reconciliation', 'Production · orders, deliveries and availability', 'Administration · official communication and commitments', 'DMS · consent, offers and relationship evidence'],
      DE: ['Finanzen · Verkäufe, Spenden, Zahlungen und Abstimmung', 'Produktion · Bestellungen, Lieferungen und Verfügbarkeit', 'Administration · offizielle Kommunikation und Verpflichtungen', 'GED · Einwilligungen, Angebote und Beziehungsnachweise']
    },
    controls: {
      FR: ['Base légale et consentement vérifiables', 'Statut de la relation explicite', 'Offre et prix autorisés avant diffusion', 'Passage à Finance ou Production tracé'],
      EN: ['Verifiable legal basis and consent', 'Explicit relationship status', 'Approved offer and price before release', 'Traceable hand-off to Finance or Production'],
      DE: ['Prüfbare Rechtsgrundlage und Einwilligung', 'Expliziter Beziehungsstatus', 'Genehmigtes Angebot und Preis vor Veröffentlichung', 'Nachvollziehbare Übergabe an Finanzen oder Produktion']
    }
  },
  production: {
    names: { FR: 'Production', EN: 'Production', DE: 'Produktion' },
    layers: {
      FR: ['Suivi des commandes et exécutions', 'Commandes, produits, lots, fournisseurs et livraisons', 'Spécifications, capacités, délais et contrôles qualité', 'Bons, photos, réceptions et réserves'],
      EN: ['Order and execution monitoring', 'Orders, products, batches, suppliers and deliveries', 'Specifications, capacity, deadlines and quality controls', 'Orders, photos, acceptance and reservations'],
      DE: ['Auftrags- und Ausführungssteuerung', 'Bestellungen, Produkte, Lose, Lieferanten und Lieferungen', 'Spezifikationen, Kapazitäten, Fristen und Qualitätskontrollen', 'Belege, Fotos, Abnahmen und Vorbehalte']
    },
    relations: {
      FR: ['Commercial · besoin, commande et destinataire', 'Stock & Actifs · disponibilité, mouvements et affectations', 'Finances · prix, engagements, paiements et soldes', 'GED · spécifications et preuves de réception'],
      EN: ['Commercial · need, order and recipient', 'Stock & Assets · availability, movements and assignments', 'Finance · prices, commitments, payments and balances', 'DMS · specifications and acceptance evidence'],
      DE: ['Vertrieb · Bedarf, Bestellung und Empfänger', 'Bestand & Vermögenswerte · Verfügbarkeit, Bewegungen und Zuordnung', 'Finanzen · Preise, Verpflichtungen, Zahlungen und Salden', 'GED · Spezifikationen und Abnahmenachweise']
    },
    controls: {
      FR: ['Périmètre et responsable confirmés', 'Spécification et offre de référence identifiées', 'Contrôle qualité avant réception', 'Réserves et clôture documentées'],
      EN: ['Confirmed scope and owner', 'Identified reference specification and offer', 'Quality control before acceptance', 'Documented reservations and closure'],
      DE: ['Bestätigter Umfang und Verantwortung', 'Identifizierte Referenzspezifikation und Angebot', 'Qualitätskontrolle vor Abnahme', 'Dokumentierte Vorbehalte und Abschluss']
    }
  },
  stock: {
    names: { FR: 'Stock & Actifs', EN: 'Stock & Assets', DE: 'Bestand & Vermögenswerte' },
    layers: {
      FR: ['Inventaire, actifs et risques', 'Articles, immobilisations, lieux, mouvements et incidents', 'Acquisitions, valorisations, maintenance et assurances', 'Factures, propriété, photos et historiques'],
      EN: ['Inventory, assets and risks', 'Items, fixed assets, locations, movements and incidents', 'Acquisition, valuation, maintenance and insurance', 'Invoices, ownership, photos and history'],
      DE: ['Inventar, Vermögenswerte und Risiken', 'Artikel, Anlagen, Standorte, Bewegungen und Vorfälle', 'Erwerb, Bewertung, Wartung und Versicherung', 'Rechnungen, Eigentum, Fotos und Historie']
    },
    relations: {
      FR: ['Production · entrées, sorties et consommations', 'Finances · acquisition, valeur et justificatifs', 'Administration · responsabilité, assurance et dossiers', 'Commercial · dons en nature et affectations'],
      EN: ['Production · receipts, issues and consumption', 'Finance · acquisition, value and evidence', 'Administration · responsibility, insurance and files', 'Commercial · in-kind donations and assignments'],
      DE: ['Produktion · Zugänge, Abgänge und Verbrauch', 'Finanzen · Erwerb, Wert und Nachweise', 'Administration · Verantwortung, Versicherung und Dossiers', 'Vertrieb · Sachspenden und Zuordnungen']
    },
    controls: {
      FR: ['Identifiant, propriétaire et emplacement', 'Mouvement autorisé et daté', 'Valeur et devise sourcées', 'Incident, risque ou sortie documentés'],
      EN: ['Identifier, owner and location', 'Authorised and dated movement', 'Sourced value and currency', 'Documented incident, risk or disposal'],
      DE: ['Kennung, Eigentümer und Standort', 'Autorisierte und datierte Bewegung', 'Belegter Wert und Währung', 'Dokumentierter Vorfall, Risiko oder Abgang']
    }
  },
  'it-support': {
    names: { FR: 'IT & Support', EN: 'IT & Support', DE: 'IT & Support' },
    layers: {
      FR: ['Services, GED et support utilisateur', 'Documents, dossiers, outils, accès et incidents', 'Frontend, API, données, authentification et sauvegardes', 'Journaux, versions, preuves et documentation technique'],
      EN: ['Services, DMS and user support', 'Documents, folders, tools, access and incidents', 'Frontend, API, data, authentication and backups', 'Logs, versions, evidence and technical documentation'],
      DE: ['Dienste, GED und Benutzersupport', 'Dokumente, Ordner, Werkzeuge, Zugänge und Vorfälle', 'Frontend, API, Daten, Authentifizierung und Sicherungen', 'Protokolle, Versionen, Nachweise und technische Dokumentation']
    },
    relations: {
      FR: ['Toutes fonctions · services, données et disponibilité', 'Administration · droits, décisions et communications', 'Conformité · sécurité, conservation et incidents', 'GED · documents, versions et traçabilité'],
      EN: ['All functions · services, data and availability', 'Administration · rights, decisions and communication', 'Compliance · security, retention and incidents', 'DMS · documents, versions and traceability'],
      DE: ['Alle Funktionen · Dienste, Daten und Verfügbarkeit', 'Administration · Rechte, Entscheidungen und Kommunikation', 'Compliance · Sicherheit, Aufbewahrung und Vorfälle', 'GED · Dokumente, Versionen und Nachvollziehbarkeit']
    },
    controls: {
      FR: ['Demande et niveau d’urgence qualifiés', 'Accès limité au besoin réel', 'Test et validation avant mise en service', 'Incident et résolution journalisés'],
      EN: ['Qualified request and urgency', 'Access limited to actual need', 'Testing and approval before release', 'Logged incident and resolution'],
      DE: ['Qualifizierte Anfrage und Dringlichkeit', 'Zugang auf tatsächlichen Bedarf begrenzt', 'Test und Genehmigung vor Inbetriebnahme', 'Protokollierter Vorfall und Lösung']
    }
  }
};

const layerIcons = [Layers3, Database, Network, Archive];
const stepIcons = [ClipboardCheck, FileCheck2, ShieldCheck, Route, CheckCircle2, Archive];

const FunctionArchitectureOverview = ({ moduleId, language = 'FR' }) => {
  const t = copy[language] || copy.FR;
  const module = modules[moduleId] || modules.commercial;
  const name = module.names[language] || module.names.FR;
  const layers = module.layers[language] || module.layers.FR;
  const relations = module.relations[language] || module.relations.FR;

  return (
    <section className="function-architecture-overview space-y-6" aria-labelledby={`${moduleId}-architecture-title`}>
      <header className="border-b border-slate-700 pb-5">
        <p className="text-xs font-semibold uppercase text-cyan-300">{t.architectureEyebrow}</p>
        <h2 id={`${moduleId}-architecture-title`} className="m3s-page-title mt-2">{t.architectureTitle.replace('{module}', name)}</h2>
        <p className="mt-3 max-w-5xl text-sm leading-6 text-slate-300">{t.architectureIntro}</p>
      </header>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-slate-100">{t.layers}</h3>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {layers.map((description, index) => {
            const Icon = layerIcons[index];
            return <article key={description} className="rounded-lg border border-slate-700 bg-slate-800 p-4"><Icon className="text-cyan-300" size={21} aria-hidden="true" /><h4 className="mt-3 font-semibold text-slate-100">{t.layerLabels[index]}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{description}</p></article>;
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-slate-100">{t.relations}</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {relations.map((relation) => <article key={relation} className="flex items-start gap-3 rounded-lg border border-slate-700 bg-slate-800 p-4"><Workflow className="mt-0.5 shrink-0 text-blue-300" size={20} aria-hidden="true" /><p className="text-sm leading-6 text-slate-200">{relation}</p></article>)}
        </div>
      </div>

      <p className="rounded-lg border border-amber-700/60 bg-amber-950/20 px-4 py-3 text-sm leading-6 text-amber-100">{t.architectureBoundary}</p>
    </section>
  );
};

const FunctionProcessOverview = ({ moduleId, language = 'FR' }) => {
  const t = copy[language] || copy.FR;
  const module = modules[moduleId] || modules.commercial;
  const name = module.names[language] || module.names.FR;
  const controls = module.controls[language] || module.controls.FR;

  return (
    <section className="function-process-overview space-y-6" aria-labelledby={`${moduleId}-process-title`}>
      <header className="border-b border-slate-700 pb-5">
        <p className="text-xs font-semibold uppercase text-cyan-300">{t.processEyebrow}</p>
        <h2 id={`${moduleId}-process-title`} className="m3s-page-title mt-2">{t.processTitle.replace('{module}', name)}</h2>
        <p className="mt-3 max-w-5xl text-sm leading-6 text-slate-300">{t.processIntro}</p>
      </header>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-slate-100">{t.cycle}</h3>
        <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          {t.steps.map((step, index) => {
            const Icon = stepIcons[index];
            return <li key={step} className="rounded-lg border border-slate-700 bg-slate-800 p-4"><div className="flex items-center justify-between gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-950 text-sm font-semibold text-blue-200">{index + 1}</span><Icon className="text-blue-300" size={19} aria-hidden="true" /></div><p className="mt-3 font-semibold text-slate-100">{step}</p></li>;
          })}
        </ol>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-slate-100">{t.controls}</h3>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {controls.map((control) => <article key={control} className="flex items-start gap-3 rounded-lg border border-slate-700 bg-slate-800 p-4"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={20} aria-hidden="true" /><p className="text-sm leading-6 text-slate-200">{control}</p></article>)}
        </div>
      </div>

      <p className="rounded-lg border border-amber-700/60 bg-amber-950/20 px-4 py-3 text-sm leading-6 text-amber-100">{t.processBoundary}</p>
    </section>
  );
};

export { FunctionArchitectureOverview, FunctionProcessOverview };
