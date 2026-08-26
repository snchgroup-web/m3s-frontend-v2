import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DU CADRE NOMINATIF · REF-01-DEC-018 · V1.0 · 26-08-2026',
    title: 'Confirmer le cadre sans inscrire de nom',
    intro: 'Cheikh confirme REF-01-G1-NAM-001 V0.1. La fiche est promue sans modification de fond en V1.0 : ses quatre emplacements vides et ses six contrôles deviennent le cadre gouverné avant toute inscription nominative.',
    counters: [['Emplacements confirmés', '4/4', 'Toujours vides'], ['Contrôles confirmés', '6/6', 'Avant toute identité'], ['Identités inscrites', '0', 'Aucune donnée nominative'], ['Contacts ou envois', '0', 'Décision séparée requise']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-018', version: 'V1.0', status: 'Cadre et contrôles de NAM-001 confirmés', author: 'Cheikh Ndiaye', date: '26-08-2026',
      decision: 'REF-01-G1-NAM-001 V0.1 est confirmé et promu en V1.0. Les quatre emplacements vides et les six contrôles deviennent le cadre gouverné pour préparer de futures décisions nominatives unitaires.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 26-08-2026 : « je confirme et merci de continuer, c du bon boulot », en réponse à la fiche publiée par la PR frontend nº 206 au commit d765197b.',
      limit: 'Cette décision ne crée ni n’autorise aucun nom, entreprise, adresse, coordonnée, canal, contact ou envoi. Elle n’autorise ni compte, essai, achat, fournisseur, donnée réelle, preuve acceptée, fermeture de G1 ou ouverture de L2.'
    },
    status: 'CONFIRMÉ · REF-01-G1-NAM-001 V1.0 gouverne désormais la préparation des inscriptions, pas les identités.',
    next: 'Prochaine étape : préparer AUT-001 V0.1 afin que chaque future inscription nominative soit autorisée ou refusée séparément.',
    boundary: 'G1 reste ouverte. Un emplacement confirmé ne vaut ni identité désignée, ni contact, ni autorisation d’envoi.'
  },
  EN: {
    eyebrow: 'HUMAN NAMED-RECORD FRAMEWORK CONFIRMATION · REF-01-DEC-018 · V1.0 · 26 AUG 2026',
    title: 'Confirm the framework without recording a name',
    intro: 'Cheikh confirms REF-01-G1-NAM-001 V0.1. The sheet is promoted unchanged in substance to V1.0: its four empty slots and six controls become the governed framework before any named entry.',
    counters: [['Confirmed slots', '4/4', 'Still empty'], ['Confirmed controls', '6/6', 'Before any identity'], ['Recorded identities', '0', 'No named data'], ['Contacts or sends', '0', 'Separate decision required']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-018', version: 'V1.0', status: 'NAM-001 framework and controls confirmed', author: 'Cheikh Ndiaye', date: '26 Aug 2026',
      decision: 'REF-01-G1-NAM-001 V0.1 is confirmed and promoted to V1.0. Its four empty slots and six controls become the governed framework for preparing future individual named-recipient decisions.',
      evidence: 'Explicit confirmation by Cheikh during the 26 Aug 2026 session: “je confirme et merci de continuer, c du bon boulot”, in response to the sheet published through frontend PR 206 at commit d765197b.',
      limit: 'This decision creates or authorises no name, company, address, contact detail, channel, contact or send. It authorises no account, trial, purchase, provider, real data, accepted evidence, G1 closure or L2 opening.'
    },
    status: 'CONFIRMED · REF-01-G1-NAM-001 V1.0 now governs record preparation, not identities.',
    next: 'Next step: prepare AUT-001 V0.1 so every future named entry can be authorised or refused separately.',
    boundary: 'G1 remains open. A confirmed slot is neither a designated identity nor an authorisation to contact or send.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DES NAMENSRAHMENS · REF-01-DEC-018 · V1.0 · 26.08.2026',
    title: 'Den Rahmen bestätigen, ohne einen Namen zu erfassen',
    intro: 'Cheikh bestätigt REF-01-G1-NAM-001 V0.1. Das Blatt wird inhaltlich unverändert zu V1.0: vier leere Stellen und sechs Kontrollen bilden den gesteuerten Rahmen vor jedem Namenseintrag.',
    counters: [['Bestätigte Stellen', '4/4', 'Weiterhin leer'], ['Bestätigte Kontrollen', '6/6', 'Vor jeder Identität'], ['Erfasste Identitäten', '0', 'Keine Namensdaten'], ['Kontakte oder Versand', '0', 'Getrennter Entscheid erforderlich']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-018', version: 'V1.0', status: 'Rahmen und Kontrollen von NAM-001 bestätigt', author: 'Cheikh Ndiaye', date: '26.08.2026',
      decision: 'REF-01-G1-NAM-001 V0.1 ist bestätigt und wird zu V1.0. Vier leere Stellen und sechs Kontrollen bilden den gesteuerten Rahmen für künftige einzelne Namensentscheide.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 26.08.2026: « je confirme et merci de continuer, c du bon boulot », als Antwort auf das mit Frontend-PR 206 am Commit d765197b veröffentlichte Blatt.',
      limit: 'Der Entscheid erstellt oder autorisiert keinen Namen, keine Firma, Adresse, Kontaktdaten, keinen Kanal, Kontakt oder Versand. Er autorisiert weder Account, Test, Kauf, Anbieter, reale Daten, Nachweisannahme, G1-Schliessung noch L2-Öffnung.'
    },
    status: 'BESTÄTIGT · REF-01-G1-NAM-001 V1.0 steuert nun die Vorbereitung, nicht die Identitäten.',
    next: 'Nächster Schritt: AUT-001 V0.1 vorbereiten, damit jeder künftige Namenseintrag getrennt erlaubt oder abgelehnt wird.',
    boundary: 'G1 bleibt offen. Eine bestätigte Stelle ist weder eine bestimmte Identität noch eine Kontakt- oder Versandautorisierung.'
  }
};

const InstitutionalPeopleTeamsNamedRecipientConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-named-recipient-confirmation" className="m3s-ref01-g1-named-recipient-confirmation mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-named-recipient-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-named-recipient-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <BadgeCheck className="text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsNamedRecipientConfirmation;
