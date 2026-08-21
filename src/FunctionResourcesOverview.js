import React from 'react';
import { BookOpenText, ExternalLink, FileCheck2, FolderArchive, Library, Scale } from 'lucide-react';

const copy = {
  FR: {
    eyebrow: 'RESSOURCES DE LA FONCTION · POINTS D’ACCÈS GOUVERNÉS',
    title: 'Ressources {module}',
    intro: 'Cette vue oriente vers les sources, références et preuves utiles à la fonction. Elle ne copie ni la GED, ni les documents maîtres, ni le registre central des ressources.',
    families: 'Familles à organiser',
    access: 'Accès aux espaces maîtres',
    status: 'À qualifier et maintenir',
    ged: ['GED & documents', 'Consulter les documents, versions, pièces et archives dans leur espace maître.', 'Ouvrir la GED'],
    registry: ['Références & favoris', 'Qualifier les sources officielles, ouvrages, sites et dossiers de favoris dans le registre Administration.', 'Ouvrir le registre'],
    glossary: ['Glossaire métier', 'Consulter les termes locaux reliés au Glossaire central 2SG.', 'Ouvrir le glossaire'],
    newTab: 'Nouvel onglet',
    boundary: 'Les ressources présentées ici restent des points d’accès. Leur présence ne vaut ni validation, ni conformité, ni adoption institutionnelle.'
  },
  EN: {
    eyebrow: 'FUNCTION RESOURCES · GOVERNED ACCESS POINTS',
    title: '{module} resources',
    intro: 'This view routes users to sources, references and evidence useful to the function. It does not copy the DMS, master documents or the central resource register.',
    families: 'Families to organise',
    access: 'Access to master spaces',
    status: 'To qualify and maintain',
    ged: ['DMS & documents', 'Consult documents, versions, evidence and archives in their master space.', 'Open the DMS'],
    registry: ['References & bookmarks', 'Qualify official sources, books, websites and bookmark folders in the Administration register.', 'Open the register'],
    glossary: ['Business glossary', 'Consult local terms connected to the 2SG Central Glossary.', 'Open the glossary'],
    newTab: 'New tab',
    boundary: 'Resources shown here remain access points. Their presence does not constitute validation, compliance or institutional adoption.'
  },
  DE: {
    eyebrow: 'RESSOURCEN DER FUNKTION · GESTEUERTE ZUGANGSPUNKTE',
    title: 'Ressourcen {module}',
    intro: 'Diese Ansicht führt zu Quellen, Referenzen und Nachweisen der Funktion. Sie kopiert weder die GED noch Masterdokumente oder das zentrale Ressourcenregister.',
    families: 'Zu organisierende Familien',
    access: 'Zugang zu Masterbereichen',
    status: 'Zu qualifizieren und zu pflegen',
    ged: ['GED & Dokumente', 'Dokumente, Versionen, Nachweise und Archive in ihrem Masterbereich konsultieren.', 'GED öffnen'],
    registry: ['Referenzen & Favoriten', 'Offizielle Quellen, Fachliteratur, Websites und Favoritenordner im Verwaltungsregister qualifizieren.', 'Register öffnen'],
    glossary: ['Fachglossar', 'Lokale Begriffe konsultieren, die mit dem zentralen 2SG-Glossar verbunden sind.', 'Glossar öffnen'],
    newTab: 'Neuer Tab',
    boundary: 'Die hier aufgeführten Ressourcen bleiben Zugangspunkte. Ihre Präsenz bedeutet weder Validierung noch Konformität oder institutionelle Annahme.'
  }
};

const modules = {
  rh: {
    names: { FR: 'Ressources Humaines', EN: 'Human Resources', DE: 'Personalwesen' },
    families: {
      FR: ['Référentiels RH et rôles', 'CV, contrats et modèles', 'Droits, confidentialité et données personnelles', 'Compétences, activités et preuves'],
      EN: ['HR references and roles', 'CVs, contracts and templates', 'Rights, confidentiality and personal data', 'Skills, activities and evidence'],
      DE: ['HR-Referenzen und Rollen', 'Lebensläufe, Verträge und Vorlagen', 'Rechte, Vertraulichkeit und personenbezogene Daten', 'Kompetenzen, Aktivitäten und Nachweise']
    }
  },
  finances: {
    names: { FR: 'Finances', EN: 'Finance', DE: 'Finanzen' },
    families: {
      FR: ['Référentiels financiers et fiscaux', 'Pièces justificatives et modèles', 'Taux, devises et sources de change', 'Budgets, financements et contrôles'],
      EN: ['Financial and tax references', 'Supporting evidence and templates', 'Rates, currencies and FX sources', 'Budgets, funding and controls'],
      DE: ['Finanz- und Steuerreferenzen', 'Belege und Vorlagen', 'Kurse, Währungen und FX-Quellen', 'Budgets, Finanzierungen und Kontrollen']
    }
  },
  'it-support': {
    names: { FR: 'IT & Support', EN: 'IT & Support', DE: 'IT & Support' },
    families: {
      FR: ['Architecture et documentation technique', 'Guides et manuels utilisateurs', 'Sécurité, accès et incidents', 'Outils numériques et support'],
      EN: ['Architecture and technical documentation', 'User guides and manuals', 'Security, access and incidents', 'Digital tools and support'],
      DE: ['Architektur und technische Dokumentation', 'Benutzerleitfäden und Handbücher', 'Sicherheit, Zugänge und Vorfälle', 'Digitale Werkzeuge und Support']
    }
  },
  commercial: {
    names: { FR: 'Commercial & CRM', EN: 'Commercial & CRM', DE: 'Vertrieb & CRM' },
    families: {
      FR: ['Référentiels des offres et publics', 'Études, veille marché et opportunités', 'Modèles commerciaux et CRM', 'Preuves de relation et consentements'],
      EN: ['Offer and audience references', 'Market research, monitoring and opportunities', 'Commercial and CRM templates', 'Relationship evidence and consent'],
      DE: ['Angebots- und Zielgruppenreferenzen', 'Marktstudien, Monitoring und Chancen', 'Vertriebs- und CRM-Vorlagen', 'Beziehungsnachweise und Einwilligungen']
    }
  },
  production: {
    names: { FR: 'Production', EN: 'Production', DE: 'Produktion' },
    families: {
      FR: ['Fiches techniques et spécifications', 'Procédures et contrôles qualité', 'Fournisseurs et conditions d’exécution', 'Preuves de fabrication et de livraison'],
      EN: ['Technical sheets and specifications', 'Procedures and quality controls', 'Suppliers and execution conditions', 'Manufacturing and delivery evidence'],
      DE: ['Technische Datenblätter und Spezifikationen', 'Verfahren und Qualitätskontrollen', 'Lieferanten und Ausführungsbedingungen', 'Fertigungs- und Liefernachweise']
    }
  },
  stock: {
    names: { FR: 'Stock & Actifs', EN: 'Stock & Assets', DE: 'Bestand & Vermögenswerte' },
    families: {
      FR: ['Inventaires et nomenclatures', 'Pièces d’acquisition et de propriété', 'Maintenance, garanties et assurances', 'Risques, incidents et preuves patrimoniales'],
      EN: ['Inventories and nomenclatures', 'Acquisition and ownership evidence', 'Maintenance, warranties and insurance', 'Risks, incidents and asset evidence'],
      DE: ['Inventare und Nomenklaturen', 'Erwerbs- und Eigentumsnachweise', 'Wartung, Garantien und Versicherungen', 'Risiken, Vorfälle und Vermögensnachweise']
    }
  }
};

const FamilyCard = ({ label, status, Icon }) => (
  <article className="rounded-lg border border-slate-700 bg-slate-800 p-4 transition-colors hover:border-cyan-500/70 hover:bg-slate-750">
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 shrink-0 text-cyan-300" size={20} aria-hidden="true" />
      <div>
        <h3 className="font-semibold text-slate-100">{label}</h3>
        <p className="mt-2 text-xs font-semibold uppercase text-slate-400">{status}</p>
      </div>
    </div>
  </article>
);

const AccessCard = ({ item, href, newTab, onClick, Icon }) => {
  const content = (
    <>
      <Icon className="shrink-0 text-blue-300" size={22} aria-hidden="true" />
      <span className="min-w-0 flex-1 text-left">
        <span className="block font-semibold text-slate-100">{item[0]}</span>
        <span className="mt-1 block text-sm leading-6 text-slate-300">{item[1]}</span>
        <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-300">
          {item[2]}{newTab && <><ExternalLink size={15} aria-hidden="true" /><span className="sr-only"> · {newTab}</span></>}
        </span>
      </span>
    </>
  );

  const classes = 'flex min-h-32 w-full items-start gap-3 rounded-lg border border-slate-700 bg-slate-800 p-4 transition-colors hover:border-blue-500 hover:bg-slate-750 focus:outline-none focus:ring-2 focus:ring-blue-400';
  if (href) return <a className={classes} href={href} target="_blank" rel="noreferrer">{content}</a>;
  return <button type="button" className={classes} onClick={onClick}>{content}</button>;
};

const FunctionResourcesOverview = ({ moduleId, language = 'FR', onSelectTab }) => {
  const t = copy[language] || copy.FR;
  const module = modules[moduleId] || modules.finances;
  const moduleName = module.names[language] || module.names.FR;
  const families = module.families[language] || module.families.FR;

  return (
    <section className="function-resources-overview space-y-6" aria-labelledby={`${moduleId}-resources-title`}>
      <header className="border-b border-slate-700 pb-5">
        <p className="text-xs font-semibold uppercase text-cyan-300">{t.eyebrow}</p>
        <h2 id={`${moduleId}-resources-title`} className="m3s-page-title mt-2">{t.title.replace('{module}', moduleName)}</h2>
        <p className="mt-3 max-w-5xl text-sm leading-6 text-slate-300">{t.intro}</p>
      </header>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-slate-100">{t.families}</h3>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {families.map((family, index) => <FamilyCard key={family} label={family} status={t.status} Icon={[Library, FileCheck2, Scale, FolderArchive][index]} />)}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-slate-100">{t.access}</h3>
        <div className="grid gap-3 lg:grid-cols-3">
          <AccessCard item={t.ged} href="/ged?tab=documents" newTab={t.newTab} Icon={FolderArchive} />
          <AccessCard item={t.registry} href="/administration?tab=resources" newTab={t.newTab} Icon={Library} />
          <AccessCard item={t.glossary} onClick={() => onSelectTab?.('glossary')} Icon={BookOpenText} />
        </div>
      </div>

      <p className="rounded-lg border border-amber-700/60 bg-amber-950/20 px-4 py-3 text-sm leading-6 text-amber-100">{t.boundary}</p>
    </section>
  );
};

export default FunctionResourcesOverview;
