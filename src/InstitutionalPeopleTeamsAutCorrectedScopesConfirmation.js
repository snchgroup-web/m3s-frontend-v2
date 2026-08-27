import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DU CADRAGE C/D · REF-01-DEC-025 · V1.0 · 27-08-2026',
    title: 'Confirmer les deux périmètres avant leur production documentaire',
    intro: 'Cheikh confirme CD-001 V0.1. Le cadrage est promu en V1.0 et autorise uniquement la production documentaire bornée des dossiers AUT-C et AUT-D.',
    counters: [['Support confirmé', '1/1', 'CD-001 V1.0'], ['Dossiers autorisés', '2/2', 'AUT-C et AUT-D'], ['Axes autorisés', '12', 'Six par dossier'], ['Actions réelles', '0', 'G1 ouverte · L2 fermé']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-025', version: 'V1.0', status: 'CD-001 confirmé pour production documentaire bornée', author: 'Cheikh Ndiaye', date: '27-08-2026',
      decision: 'REF-01-G1-CD-001 V0.1 est confirmé et promu en V1.0. AUT-C conserve le périmètre « Coûts et capacité » et AUT-D le périmètre « Gouvernance interne ». Les douze axes peuvent être documentés ensemble sans transformer une hypothèse, une indisponibilité ou une proposition en fait validé.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 27-08-2026 : « je confirme `REF-01-G1-CD-001 V0.1` , merci de continuer ».',
      limit: 'Cette décision n’autorise aucun fournisseur, prix, contrat, compte, accès, donnée réelle, contact, envoi, collecte externe, droit, RACI institutionnel, source maîtresse, fermeture de G1 ou ouverture de L2.'
    },
    status: 'CONFIRMÉ · CD-001 V1.0 gouverne désormais les dossiers documentaires AUT-C et AUT-D.',
    next: 'Étape produite ci-dessous : AUT-C-001 V0.1 et AUT-D-001 V0.1 documentent les douze axes avec leurs preuves disponibles, écarts et limites.',
    boundary: 'Une case documentée n’est pas automatiquement validée. Les valeurs non sourcées restent indisponibles et les responsabilités proposées restent candidates.'
  },
  EN: {
    eyebrow: 'HUMAN C/D FRAMING CONFIRMATION · REF-01-DEC-025 · V1.0 · 27 AUG 2026',
    title: 'Confirm both scopes before documentary production',
    intro: 'Cheikh confirms CD-001 V0.1. The framing is promoted to V1.0 and authorises only bounded documentary production of the AUT-C and AUT-D files.',
    counters: [['Confirmed record', '1/1', 'CD-001 V1.0'], ['Authorised files', '2/2', 'AUT-C and AUT-D'], ['Authorised axes', '12', 'Six per file'], ['Real actions', '0', 'G1 open · L2 closed']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-025', version: 'V1.0', status: 'CD-001 confirmed for bounded documentary production', author: 'Cheikh Ndiaye', date: '27 Aug 2026',
      decision: 'REF-01-G1-CD-001 V0.1 is confirmed and promoted to V1.0. AUT-C retains the “Costs and capacity” scope and AUT-D the “Internal governance” scope. The twelve axes may be documented together without turning an assumption, unavailable item or proposal into a validated fact.',
      evidence: 'Explicit confirmation by Cheikh during the 27 Aug 2026 session: “je confirme `REF-01-G1-CD-001 V0.1` , merci de continuer”.',
      limit: 'This decision authorises no provider, price, contract, account, access, real data, contact, send, external collection, right, institutional RACI, master source, G1 closure or L2 opening.'
    },
    status: 'CONFIRMED · CD-001 V1.0 now governs the AUT-C and AUT-D documentary files.',
    next: 'Produced step below: AUT-C-001 V0.1 and AUT-D-001 V0.1 document the twelve axes with their available evidence, gaps and limits.',
    boundary: 'A documented field is not automatically validated. Unsupported values remain unavailable and proposed responsibilities remain candidates.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DER C-/D-AUSGESTALTUNG · REF-01-DEC-025 · V1.0 · 27.08.2026',
    title: 'Beide Umfänge vor der Dokumentproduktion bestätigen',
    intro: 'Cheikh bestätigt CD-001 V0.1. Die Ausgestaltung wird zu V1.0 und erlaubt nur die begrenzte Dokumentproduktion der AUT-C- und AUT-D-Akten.',
    counters: [['Bestätigter Nachweis', '1/1', 'CD-001 V1.0'], ['Erlaubte Akten', '2/2', 'AUT-C und AUT-D'], ['Erlaubte Achsen', '12', 'Sechs je Akte'], ['Reale Aktionen', '0', 'G1 offen · L2 geschlossen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-025', version: 'V1.0', status: 'CD-001 für begrenzte Dokumentproduktion bestätigt', author: 'Cheikh Ndiaye', date: '27.08.2026',
      decision: 'REF-01-G1-CD-001 V0.1 ist bestätigt und wird zu V1.0. AUT-C behält den Umfang „Kosten und Kapazität“ und AUT-D den Umfang „Interne Governance“. Die zwölf Achsen dürfen gemeinsam dokumentiert werden, ohne Annahmen, nicht verfügbare Angaben oder Vorschläge als validierte Tatsachen darzustellen.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 27.08.2026: « je confirme `REF-01-G1-CD-001 V0.1` , merci de continuer ».',
      limit: 'Der Entscheid erlaubt keine Anbieter, Preise, Verträge, Konten, Zugriffe, Echtdaten, Kontakte, Sendungen, externe Sammlung, Rechte, institutionelle RACI, Masterquelle, G1-Schliessung oder L2-Öffnung.'
    },
    status: 'BESTÄTIGT · CD-001 V1.0 steuert nun die Dokumentakten AUT-C und AUT-D.',
    next: 'Nachfolgend erstellter Schritt: AUT-C-001 V0.1 und AUT-D-001 V0.1 dokumentieren die zwölf Achsen mit verfügbaren Nachweisen, Lücken und Grenzen.',
    boundary: 'Ein dokumentiertes Feld ist nicht automatisch validiert. Unbelegte Werte bleiben nicht verfügbar und vorgeschlagene Verantwortungen bleiben Kandidaten.'
  }
};

const InstitutionalPeopleTeamsAutCorrectedScopesConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-aut-cd-confirmation" className="m3s-ref01-g1-aut-cd-confirmation mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-aut-cd-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-aut-cd-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 3 ? <BadgeCheck className="text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsAutCorrectedScopesConfirmation;
