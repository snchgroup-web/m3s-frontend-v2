import React from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';
import { getGlossaryContextEntry } from './glossaryContext';

const MANAGER_POSITION = 'Manager et coordinateur général de 2SG - architecte fonctionnel M3S';
const TERMS = ['RH-FONCTION-ENTREPRISE', 'RH-ROLE', 'RH-RESPONSABILITE-FONCTIONNELLE'];
const MANAGEMENT_SOURCE = 'https://openstax.org/books/principles-management/pages/1-3-major-characteristics-of-the-managers-job';
const COPY = {
  FR: {
    title: 'Ma fonction, mon rôle et mes responsabilités', proposed: 'Définition proposée', validated: 'Définition validée', glossary: 'Glossaire central 2SG',
    position: 'Poste', positionText: 'Ensemble concret de missions et de conditions de travail attachées à une personne. Le libellé du profil ne prouve pas, à lui seul, un contrat ou une nomination juridique.',
    access: 'Rôle de connexion M3S', accessText: 'Il décrit le profil technique du compte. Il ne se confond ni avec la fonction institutionnelle ni avec un pouvoir de signature ou un accès général aux dossiers privés.',
    mission: 'Ma mission de référence 2SG',
    missionText: 'Porter la vision globale et maintenir la cohérence entre l’association, son organisation, ses projets et son offre. M3S reste un moyen au service de ce programme.',
    responsibilities: 'Mes contributions', contributions: ['Définir les priorités et coordonner les responsables de fonction.', 'Préparer et documenter les arbitrages structurants.', 'Cadrer les référentiels, l’information et l’architecture fonctionnelle M3S.', 'Coordonner les relations Suisse–Sénégal et les partenariats majeurs.'],
    evidence: 'Traces attendues', evidenceText: 'Décisions motivées, priorités et feuilles de route, validations des référentiels, comptes rendus de coordination.',
    limits: 'Limites à conserver', limitsText: 'Le bureau fonctionne horizontalement. La coordination ne crée pas une autorité générale sur les autres membres. Pouvoirs de signature et délégations restent à formaliser ; aucun accès aux espaces privés ne découle de cette fiche.',
    reference: 'Références 2SG : profil RH-001 ; Fiches de fonctions prioritaires V0.2, 31-07-26. Cadre opérationnel, pas un acte de nomination.',
    general: 'Repères généraux de management', generalText: 'Planifier les objectifs, organiser les moyens, accompagner les personnes et suivre les résultats : ces repères pédagogiques aident à exercer la fonction, sans remplacer les décisions propres à 2SG.',
    source: 'Source pédagogique : OpenStax, Principles of Management, § 1.3'
  },
  DE: {
    title: 'Meine Funktion, Rolle und Verantwortung', proposed: 'Vorgeschlagene Definition', validated: 'Validierte Definition', glossary: 'Zentrales 2SG-Glossar',
    position: 'Stelle', positionText: 'Konkrete Aufgaben und Arbeitsbedingungen einer Person. Die Profilbezeichnung allein belegt weder einen Vertrag noch eine rechtliche Ernennung.',
    access: 'M3S-Anmelderolle', accessText: 'Sie beschreibt das technische Kontoprofil, nicht die institutionelle Funktion, eine Zeichnungsbefugnis oder einen allgemeinen Zugriff auf private Dossiers.',
    mission: 'Meine 2SG-Referenzaufgabe',
    missionText: 'Die Gesamtvision tragen und Verein, Organisation, Projekte und Angebot aufeinander abstimmen. M3S bleibt ein Hilfsmittel für dieses Programm.',
    responsibilities: 'Meine Beiträge', contributions: ['Prioritäten setzen und Funktionsverantwortliche koordinieren.', 'Grundlegende Entscheidungen vorbereiten und dokumentieren.', 'Referenzwerke, Informationsordnung und die funktionale M3S-Architektur gestalten.', 'Beziehungen Schweiz–Senegal und zentrale Partnerschaften koordinieren.'],
    evidence: 'Erwartete Nachweise', evidenceText: 'Begründete Entscheidungen, Prioritäten und Fahrpläne, Freigaben von Referenzwerken, Koordinationsprotokolle.',
    limits: 'Geltende Grenzen', limitsText: 'Der Vorstand arbeitet horizontal. Koordination begründet keine allgemeine Weisungsbefugnis gegenüber anderen Mitgliedern. Zeichnungsbefugnisse und Delegationen sind noch zu formalisieren; diese Übersicht gewährt keinen Zugriff auf private Bereiche.',
    reference: '2SG-Quellen: RH-001-Profil; prioritäre Funktionsblätter V0.2, 31.07.26. Operativer Rahmen, keine Ernennungsurkunde.',
    general: 'Allgemeine Managementgrundlagen', generalText: 'Ziele planen, Mittel organisieren, Menschen begleiten und Ergebnisse prüfen: Diese Lernhinweise unterstützen die Funktion, ersetzen aber keine 2SG-Entscheidungen.',
    source: 'Lernquelle: OpenStax, Principles of Management, § 1.3'
  },
  EN: {
    title: 'My function, role and responsibilities', proposed: 'Proposed definition', validated: 'Validated definition', glossary: '2SG Central Glossary',
    position: 'Position', positionText: 'The specific duties and working conditions attached to a person. A profile label alone does not establish an employment contract or a legal appointment.',
    access: 'M3S sign-in role', accessText: 'This describes the technical account profile, not the institutional function, signing authority or blanket access to private records.',
    mission: 'My 2SG reference mission',
    missionText: 'Carry the overall vision and align the association, its organisation, projects and offer. M3S remains a means of supporting that programme.',
    responsibilities: 'My contributions', contributions: ['Set priorities and coordinate function owners.', 'Prepare and document major decisions.', 'Frame reference systems, information governance and M3S functional architecture.', 'Coordinate Switzerland–Senegal relations and major partnerships.'],
    evidence: 'Expected evidence', evidenceText: 'Reasoned decisions, priorities and roadmaps, reference approvals and coordination records.',
    limits: 'Boundaries to retain', limitsText: 'The board works horizontally. Coordination does not confer general authority over other members. Signing powers and delegations still need formalisation; this guide grants no access to private spaces.',
    reference: '2SG references: RH-001 profile; priority function sheets V0.2, 31/07/26. An operational framework, not a legal appointment.',
    general: 'General management principles', generalText: 'Plan objectives, organise resources, support people and review results: these learning principles support the function without replacing 2SG decisions.',
    source: 'Learning source: OpenStax, Principles of Management, § 1.3'
  }
};

export default function OwnFunctionGuide({ profile, source, language = 'FR' }) {
  const t = COPY[language] || COPY.FR;
  // Reference knowledge follows the linked institutional profile, never the sign-in role.
  const manager = source?.id === 'RH-001' && source.status === 'validated_documentary' && profile?.personId === 'PER-2SG-0001' && profile.position === MANAGER_POSITION;
  return <details className="own-function-guide">
    <summary><BookOpen size={18} aria-hidden="true"/>{t.title}<ChevronDown className="own-function-chevron" size={18} aria-hidden="true"/></summary>
    <div className="own-function-terms">
      {TERMS.map(id => {
        const entry = getGlossaryContextEntry(id, language);
        return entry && <div key={id}><h4>{entry.term}</h4><p>{entry.shortDefinition}</p>
          <a href={`/ged?tab=knowledge&term=${encodeURIComponent(id)}`}>{t.glossary}</a>
          <small>{entry.status === 'candidate' ? t.proposed : t.validated} · {entry.version}</small></div>;
      })}
      <div><h4>{t.position}</h4><p>{t.positionText}</p></div>
      <div><h4>{t.access}</h4><p>{t.accessText}</p></div>
    </div>
    {manager && <div className="own-function-mission">
      <h4>{t.mission}</h4><p className="own-function-reference">{profile.position}</p><p>{t.missionText}</p>
      <h4>{t.responsibilities}</h4><ul>{t.contributions.map(text => <li key={text}>{text}</li>)}</ul>
      <h4>{t.evidence}</h4><p>{t.evidenceText}</p>
      <h4>{t.limits}</h4><p>{t.limitsText}</p><small>{t.reference}</small>
      <h4>{t.general}</h4><p>{t.generalText}</p>
      <a href={MANAGEMENT_SOURCE} target="_blank" rel="noreferrer">{t.source}</a>
    </div>}
  </details>;
}
