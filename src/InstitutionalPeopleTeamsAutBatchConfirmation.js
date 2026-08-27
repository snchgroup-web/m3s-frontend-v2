import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DU LOT AUT · REF-01-DEC-022 · V1.0 · 27-08-2026',
    title: 'Confirmer ensemble la sélection et les deux vagues',
    intro: 'Cheikh confirme ensemble SEL-001 V0.2 et BAT-001 V0.1. Les deux supports sont promus sans modification de fond en V1.0 et autorisent uniquement la préparation documentaire des quatre dossiers AUT.',
    counters: [['Supports confirmés', '2/2', 'SEL-001 et BAT-001'], ['Dossiers inclus', '4/4', 'AUT-A à AUT-D'], ['Vagues confirmées', '2', 'A/B/C puis D'], ['Actions réelles', '0', 'Arrêt humain maintenu']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-022', version: 'V1.0', status: 'SEL-001 et BAT-001 confirmés pour préparation documentaire', author: 'Cheikh Ndiaye', date: '27-08-2026',
      decision: 'REF-01-G1-SEL-001 V0.2 et REF-01-G1-BAT-001 V0.1 sont confirmés ensemble et promus en V1.0. AUT-A, AUT-B et AUT-C peuvent être préparés en parallèle ; AUT-D reste dépendant de leurs trois sorties.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 27-08-2026 : « Je confirme ensemble », après clarification des codes BAT, NAM, PRI, AUT, DEC, IDN et SEL.',
      limit: 'Cette décision autorise des gabarits et travaux documentaires vides ou synthétiques. Elle n’autorise aucune identité, fournisseur, compte, accès, prise de contact, envoi, collecte réelle, test sur données réelles, preuve réelle ou promotion de source maîtresse. Elle ne ferme pas G1 et n’ouvre pas L2.'
    },
    status: 'CONFIRMÉ · SEL-001 V1.0 et BAT-001 V1.0 gouvernent désormais le lot documentaire AUT-A à AUT-D.',
    next: 'Étape accomplie : REF-01-DEC-023 confirme WAV-001 V1.0 et ouvre les trois pistes documentaires dans leurs limites bornées.',
    boundary: 'AUT-D reste en attente des sorties A, B et C. Tout passage d’un gabarit vide à une collecte ou une sollicitation réelle exige un nouvel arbitrage humain.'
  },
  EN: {
    eyebrow: 'HUMAN AUT-PACKAGE CONFIRMATION · REF-01-DEC-022 · V1.0 · 27 AUG 2026',
    title: 'Confirm the selection and two waves together',
    intro: 'Cheikh confirms SEL-001 V0.2 and BAT-001 V0.1 together. Both records are promoted unchanged in substance to V1.0 and authorise documentary preparation of the four AUT files only.',
    counters: [['Confirmed records', '2/2', 'SEL-001 and BAT-001'], ['Included files', '4/4', 'AUT-A through AUT-D'], ['Confirmed waves', '2', 'A/B/C then D'], ['Real actions', '0', 'Human hold retained']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-022', version: 'V1.0', status: 'SEL-001 and BAT-001 confirmed for documentary preparation', author: 'Cheikh Ndiaye', date: '27 Aug 2026',
      decision: 'REF-01-G1-SEL-001 V0.2 and REF-01-G1-BAT-001 V0.1 are confirmed together and promoted to V1.0. AUT-A, AUT-B and AUT-C may be prepared in parallel; AUT-D remains dependent on their three outputs.',
      evidence: 'Explicit confirmation by Cheikh during the 27 Aug 2026 session: “Je confirme ensemble”, after clarification of the BAT, NAM, PRI, AUT, DEC, IDN and SEL codes.',
      limit: 'This decision authorises empty or synthetic templates and documentary work. It authorises no identity, provider, account, access, contact, send, real collection, real-data test, real evidence or master-source promotion. It does not close G1 or open L2.'
    },
    status: 'CONFIRMED · SEL-001 V1.0 and BAT-001 V1.0 now govern the AUT-A through AUT-D documentary package.',
    next: 'Completed step: REF-01-DEC-023 confirms WAV-001 V1.0 and opens the three documentary tracks within their bounded limits.',
    boundary: 'AUT-D remains pending outputs A, B and C. Moving from an empty template to real collection or outreach requires a new human decision.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DES AUT-PAKETS · REF-01-DEC-022 · V1.0 · 27.08.2026',
    title: 'Auswahl und zwei Wellen gemeinsam bestätigen',
    intro: 'Cheikh bestätigt SEL-001 V0.2 und BAT-001 V0.1 gemeinsam. Beide Nachweise werden inhaltlich unverändert zu V1.0 und erlauben nur die dokumentarische Vorbereitung der vier AUT-Akten.',
    counters: [['Bestätigte Nachweise', '2/2', 'SEL-001 und BAT-001'], ['Enthaltene Akten', '4/4', 'AUT-A bis AUT-D'], ['Bestätigte Wellen', '2', 'A/B/C, danach D'], ['Reale Aktionen', '0', 'Haltepunkt bleibt']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-022', version: 'V1.0', status: 'SEL-001 und BAT-001 zur Dokumentvorbereitung bestätigt', author: 'Cheikh Ndiaye', date: '27.08.2026',
      decision: 'REF-01-G1-SEL-001 V0.2 und REF-01-G1-BAT-001 V0.1 sind gemeinsam bestätigt und werden zu V1.0. AUT-A, AUT-B und AUT-C dürfen parallel vorbereitet werden; AUT-D bleibt von ihren drei Ausgaben abhängig.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 27.08.2026: « Je confirme ensemble », nach Klärung der Codes BAT, NAM, PRI, AUT, DEC, IDN und SEL.',
      limit: 'Der Entscheid erlaubt leere oder synthetische Vorlagen und Dokumentarbeit. Er erlaubt keine Identität, Anbieter, Konten, Zugriffe, Kontakte, Sendungen, reale Sammlung, Echtdatentests, realen Nachweise oder Masterquellenförderung. Er schliesst G1 nicht und öffnet L2 nicht.'
    },
    status: 'BESTÄTIGT · SEL-001 V1.0 und BAT-001 V1.0 steuern nun das Dokumentationspaket AUT-A bis AUT-D.',
    next: 'Abgeschlossener Schritt: REF-01-DEC-023 bestätigt WAV-001 V1.0 und öffnet die drei Dokumentationsspuren innerhalb ihrer begrenzten Umfänge.',
    boundary: 'AUT-D wartet weiterhin auf die Ausgaben A, B und C. Der Übergang von einer leeren Vorlage zu realer Sammlung oder Ansprache erfordert einen neuen menschlichen Entscheid.'
  }
};

const InstitutionalPeopleTeamsAutBatchConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-aut-batch-confirmation" className="mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-aut-batch-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-aut-batch-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 3 ? <BadgeCheck className="text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsAutBatchConfirmation;
