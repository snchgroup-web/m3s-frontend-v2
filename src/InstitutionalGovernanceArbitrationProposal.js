import React from 'react';
import {
  Ban,
  FileCheck2,
  ListChecks,
  Scale,
  ShieldCheck,
  UsersRound
} from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'CADRE DE TRAVAIL VALIDÉ · CHEIKH · 24-08-2026',
    title: 'Base d’arbitrage CNS-01 validée comme cadre de travail',
    body: 'Cheikh a validé les quatre propositions ci-dessous comme cadre de travail CNS-01. Cette décision permet de préparer l’inventaire détaillé sans déclarer 2SG conforme, sans adopter un texte et sans accepter un risque juridique.',
    cards: [
      {
        title: 'Périmètre cible retenu',
        body: 'Gouvernance institutionnelle et obligations légales, réglementaires et internes applicables au fonctionnement hybride de 2SG en Suisse et au Sénégal : documents constitutifs, décisions, mandats et délégations, politiques, échéances, signatures ou adoptions requises, écarts, corrections et revues.',
        limit: 'Hors périmètre : avis juridique, conclusion de conformité générale et qualification définitive d’un contentieux.'
      },
      {
        title: 'Preuves recevables retenues',
        body: 'Sources officielles identifiées ; documents datés, versionnés, signés ou adoptés lorsque requis ; registre indiquant territoire, applicabilité, responsable, échéance et statut ; preuves distinctes de relecture, validation, adoption, notification et contrôle ; trace GED et journal d’audit.',
        limit: 'Une pièce présente mais non datée, non signée ou sans autorité identifiable reste à contrôler.'
      },
      {
        title: 'Responsabilités retenues',
        body: 'Administration prépare et tient les registres. La fonction métier ou le conseil compétent qualifie le fond. Chaque fonction traite ses écarts. La GED conserve les versions et preuves. Les membres fondateurs arbitrent les décisions institutionnelles, délégations et risques autorisés.',
        limit: 'La validation du cadre de travail ne crée aucun mandat, droit M3S ni pouvoir juridique supplémentaire.'
      },
      {
        title: 'Principe de calcul retenu',
        body: 'Aucun pourcentage à ce stade. La mesure reste indisponible tant que l’inventaire versionné des exigences, leurs statuts et le traitement des cas non applicables ou non vérifiables ne sont pas validés.',
        limit: 'Après validation, une règle séparée devra définir le dénominateur, les statuts admissibles, la fréquence et l’autorité de revue.'
      }
    ],
    decisionTitle: 'Validation humaine consignée',
    decision: 'Cadre de travail CNS-01 validé par Cheikh le 24-08-2026. Cette validation autorise la préparation de l’inventaire détaillé, mais ne vaut ni adoption institutionnelle, ni déclaration de conformité, ni acceptation d’un risque juridique.',
    authority: 'Adoption, signature, délégation ou acceptation de risque : décision des membres fondateurs et intervention de la fonction ou du conseil compétent lorsque nécessaire.',
    source: 'Sources : CNS-01 publié, MEP-01 LEGAL, MEP-02 Gouvernance, pilote Administration, registre Conformité et règles de gouvernance 2SG consignées. Statut : cadre de travail validé par Cheikh le 24-08-2026 ; adoption institutionnelle non déclarée.'
  },
  EN: {
    eyebrow: 'VALIDATED WORKING FRAMEWORK · CHEIKH · 24-08-2026',
    title: 'CNS-01 decision baseline validated as a working framework',
    body: 'Cheikh validated the four proposals below as the CNS-01 working framework. This decision allows preparation of the detailed inventory without declaring 2SG compliant, adopting a document or accepting legal risk.',
    cards: [
      {
        title: 'Retained target scope',
        body: 'Institutional governance and legal, regulatory and internal obligations applicable to 2SG’s hybrid operations in Switzerland and Senegal: founding records, decisions, mandates and delegations, policies, deadlines, required signatures or adoption, deviations, corrections and reviews.',
        limit: 'Out of scope: legal opinion, a general compliance conclusion and final qualification of litigation.'
      },
      {
        title: 'Retained acceptable evidence',
        body: 'Identified official sources; dated, versioned, signed or adopted records where required; a register recording territory, applicability, owner, deadline and status; separate evidence of review, validation, adoption, notification and control; DMS trace and audit log.',
        limit: 'A record that is present but undated, unsigned or lacks identifiable authority remains pending review.'
      },
      {
        title: 'Retained responsibilities',
        body: 'Administration prepares and maintains registers. The competent business function or adviser qualifies substance. Each function handles its deviations. The DMS retains versions and evidence. Founding members decide institutional matters, delegations and authorised risks.',
        limit: 'Validating the working framework creates no additional mandate, M3S right or legal power.'
      },
      {
        title: 'Retained calculation principle',
        body: 'No percentage at this stage. Measurement remains unavailable until the versioned inventory of requirements, their statuses and the treatment of not-applicable or not-verifiable cases are validated.',
        limit: 'After validation, a separate rule must define the denominator, eligible statuses, frequency and review authority.'
      }
    ],
    decisionTitle: 'Human validation recorded',
    decision: 'CNS-01 working framework validated by Cheikh on 24-08-2026. This authorises preparation of the detailed inventory, but is neither institutional adoption, a compliance declaration nor acceptance of legal risk.',
    authority: 'Adoption, signature, delegation or risk acceptance: decision by the founding members and involvement of the competent function or adviser where required.',
    source: 'Sources: published CNS-01, MEP-01 LEGAL, MEP-02 Governance, Administration pilot, Compliance register and recorded 2SG governance rules. Status: working framework validated by Cheikh on 24-08-2026; institutional adoption is not declared.'
  },
  DE: {
    eyebrow: 'VALIDIERTER ARBEITSRAHMEN · CHEIKH · 24.08.2026',
    title: 'Entscheidungsgrundlage CNS-01 als Arbeitsrahmen validiert',
    body: 'Cheikh hat die vier nachstehenden Vorschläge als Arbeitsrahmen CNS-01 validiert. Dieser Entscheid erlaubt die Vorbereitung des Detailinventars, ohne 2SG für konform zu erklären, ein Dokument zu verabschieden oder ein Rechtsrisiko zu akzeptieren.',
    cards: [
      {
        title: 'Festgehaltener Zielumfang',
        body: 'Institutionelle Governance sowie rechtliche, regulatorische und interne Pflichten für den hybriden Betrieb von 2SG in der Schweiz und im Senegal: Gründungsunterlagen, Entscheide, Mandate und Delegationen, Richtlinien, Fristen, erforderliche Unterschriften oder Verabschiedungen, Abweichungen, Korrekturen und Prüfungen.',
        limit: 'Nicht enthalten: Rechtsgutachten, allgemeine Konformitätsaussage und endgültige Einordnung eines Rechtsstreits.'
      },
      {
        title: 'Festgehaltene zulässige Nachweise',
        body: 'Identifizierte offizielle Quellen; datierte, versionierte, bei Bedarf unterzeichnete oder verabschiedete Unterlagen; Register mit Gebiet, Anwendbarkeit, Verantwortung, Frist und Status; getrennte Nachweise für Prüfung, Validierung, Verabschiedung, Mitteilung und Kontrolle; GED-Spur und Auditprotokoll.',
        limit: 'Eine vorhandene, aber undatierte, nicht unterzeichnete oder ohne erkennbare Autorität versehene Unterlage bleibt zu prüfen.'
      },
      {
        title: 'Festgehaltene Verantwortungen',
        body: 'Administration bereitet Register vor und führt sie. Die zuständige Fachfunktion oder Beratung qualifiziert den Inhalt. Jede Funktion behandelt ihre Abweichungen. Die GED bewahrt Fassungen und Nachweise. Die Gründungsmitglieder entscheiden institutionelle Fragen, Delegationen und autorisierte Risiken.',
        limit: 'Die Validierung des Arbeitsrahmens schafft kein zusätzliches Mandat, M3S-Recht oder rechtliche Befugnis.'
      },
      {
        title: 'Festgehaltenes Berechnungsprinzip',
        body: 'In dieser Phase kein Prozentsatz. Die Messung bleibt nicht verfügbar, bis das versionierte Inventar der Anforderungen, ihrer Status und der Umgang mit nicht anwendbaren oder nicht überprüfbaren Fällen validiert sind.',
        limit: 'Danach muss eine getrennte Regel Nenner, zulässige Status, Frequenz und Prüfbefugnis festlegen.'
      }
    ],
    decisionTitle: 'Menschliche Validierung dokumentiert',
    decision: 'Arbeitsrahmen CNS-01 von Cheikh am 24.08.2026 validiert. Dies erlaubt die Vorbereitung des Detailinventars, ist aber weder institutionelle Verabschiedung noch Konformitätserklärung oder Annahme eines Rechtsrisikos.',
    authority: 'Verabschiedung, Unterschrift, Delegation oder Risikoannahme: Entscheid der Gründungsmitglieder und bei Bedarf Einbezug der zuständigen Funktion oder Beratung.',
    source: 'Quellen: veröffentlichtes CNS-01, MEP-01 LEGAL, MEP-02 Governance, Pilot Administration, Compliance-Register und dokumentierte 2SG-Governance-Regeln. Status: Arbeitsrahmen von Cheikh am 24.08.2026 validiert; keine institutionelle Verabschiedung erklärt.'
  }
};

const ICONS = [ListChecks, FileCheck2, UsersRound, Ban];
const ACCENTS = ['text-sky-300', 'text-cyan-300', 'text-violet-300', 'text-amber-300'];

const InstitutionalGovernanceArbitrationProposal = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section className="mt-4 rounded-md border border-sky-800/70 bg-sky-950/15 p-4" aria-labelledby="institutional-governance-arbitration-proposal-title">
      <p className="text-xs font-semibold uppercase text-sky-300">{t.eyebrow}</p>
      <h5 id="institutional-governance-arbitration-proposal-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h5>
      <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-300">{t.body}</p>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        {t.cards.map((card, index) => {
          const Icon = ICONS[index];
          return (
            <article key={card.title} className="m3s-raised p-4">
              <div className="flex items-center gap-2">
                <Icon className={ACCENTS[index]} size={18} aria-hidden="true" />
                <h6 className="text-sm font-semibold text-slate-100">{card.title}</h6>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{card.body}</p>
              <p className="mt-3 border-t border-slate-700 pt-3 text-xs leading-5 text-slate-400">{card.limit}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <article className="rounded-md border border-emerald-800/70 bg-emerald-950/20 p-4">
          <div className="flex items-center gap-2"><ShieldCheck className="text-emerald-300" size={18} aria-hidden="true" /><h6 className="text-sm font-semibold text-emerald-100">{t.decisionTitle}</h6></div>
          <p className="mt-2 text-sm leading-6 text-slate-200">{t.decision}</p>
        </article>
        <article className="rounded-md border border-amber-800/70 bg-amber-950/15 p-4">
          <div className="flex items-center gap-2"><Scale className="text-amber-300" size={18} aria-hidden="true" /><p className="text-sm leading-6 text-slate-200">{t.authority}</p></div>
        </article>
      </div>

      <p className="mt-4 border-t border-slate-700 pt-4 text-xs leading-5 text-slate-400">{t.source}</p>
    </section>
  );
};

export default InstitutionalGovernanceArbitrationProposal;
