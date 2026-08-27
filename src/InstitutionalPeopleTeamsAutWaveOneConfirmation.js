import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DE LA VAGUE 1 · REF-01-DEC-023 · V1.0 · 27-08-2026',
    title: 'Ouvrir trois travaux bornés sans ouvrir les données réelles',
    intro: 'Cheikh confirme WAV-001 V0.1. La fiche est promue en V1.0 et ouvre AUT-A, AUT-B et AUT-C dans trois périmètres séparés, sans fournisseur retenu, compte, contact ni donnée réelle.',
    counters: [['Fiche confirmée', '1/1', 'WAV-001 V1.0'], ['Pistes ouvertes', '3/3', 'AUT-A, AUT-B, AUT-C'], ['Actions externes', '0', 'Aucun contact ni envoi'], ['Ouverture L2', '0', 'G1 reste ouverte']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-023', version: 'V1.0', status: 'WAV-001 confirmée et vague 1 ouverte dans un périmètre borné', author: 'Cheikh Ndiaye', date: '27-08-2026',
      decision: 'REF-01-G1-WAV-001 V0.1 est confirmée et promue en V1.0. AUT-A peut rechercher des sources officielles publiques sans compte ni contact ; AUT-B peut produire des preuves strictement synthétiques dans un environnement isolé ; AUT-C peut définir le profil et les critères d’une relecture indépendante sans nommer ni solliciter une personne réelle.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 27-08-2026 : « super, merci de continuer je confirme ».',
      limit: 'AUT-D reste en attente des sorties A, B et C. Cette décision n’autorise aucun fournisseur, compte, authentification, accès à un système réel, donnée personnelle ou métier réelle, contact, envoi, collecte externe, nomination de relecteur, test en production, promotion de source maîtresse, fermeture de G1 ou ouverture de L2.'
    },
    status: 'CONFIRMÉ · WAV-001 V1.0 gouverne désormais la vague 1 ; chaque sortie conserve sa propre provenance, son responsable et son état.',
    next: 'Travail autorisé : documenter AUT-A depuis des sources officielles publiques, préparer AUT-B avec des données synthétiques isolées et cadrer le profil de relecture AUT-C. Un seul contrôle humain portera ensuite sur les trois résultats réunis.',
    boundary: 'Aucune identité réelle ne sera ajoutée à AUT-C et aucune sollicitation ne sera envoyée. AUT-D, toute collecte réelle et toute promotion institutionnelle restent fermées.'
  },
  EN: {
    eyebrow: 'HUMAN WAVE 1 CONFIRMATION · REF-01-DEC-023 · V1.0 · 27 AUG 2026',
    title: 'Open three bounded work tracks without opening real data',
    intro: 'Cheikh confirms WAV-001 V0.1. The sheet is promoted to V1.0 and opens AUT-A, AUT-B and AUT-C in three separate scopes, with no selected provider, account, contact or real data.',
    counters: [['Confirmed sheet', '1/1', 'WAV-001 V1.0'], ['Open tracks', '3/3', 'AUT-A, AUT-B, AUT-C'], ['External actions', '0', 'No contact or send'], ['L2 openings', '0', 'G1 remains open']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-023', version: 'V1.0', status: 'WAV-001 confirmed and Wave 1 opened within a bounded scope', author: 'Cheikh Ndiaye', date: '27 Aug 2026',
      decision: 'REF-01-G1-WAV-001 V0.1 is confirmed and promoted to V1.0. AUT-A may research public official sources without an account or contact; AUT-B may produce strictly synthetic evidence in an isolated environment; AUT-C may define the profile and criteria for an independent review without naming or contacting a real person.',
      evidence: 'Explicit confirmation by Cheikh during the 27 Aug 2026 session: “super, merci de continuer je confirme”.',
      limit: 'AUT-D remains pending outputs A, B and C. This decision authorises no provider, account, authentication, access to a real system, real personal or business data, contact, send, external collection, reviewer appointment, production test, master-source promotion, G1 closure or L2 opening.'
    },
    status: 'CONFIRMED · WAV-001 V1.0 now governs Wave 1; each output retains its own provenance, owner and status.',
    next: 'Authorised work: document AUT-A from public official sources, prepare AUT-B with isolated synthetic data and frame the AUT-C reviewer profile. One human review will then cover the three combined results.',
    boundary: 'No real identity will be added to AUT-C and no request will be sent. AUT-D, all real collection and all institutional promotion remain closed.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DER WELLE 1 · REF-01-DEC-023 · V1.0 · 27.08.2026',
    title: 'Drei begrenzte Arbeiten öffnen, ohne Echtdaten zu öffnen',
    intro: 'Cheikh bestätigt WAV-001 V0.1. Das Blatt wird zu V1.0 und öffnet AUT-A, AUT-B und AUT-C in drei getrennten Umfängen, ohne gewählten Anbieter, Konto, Kontakt oder Echtdaten.',
    counters: [['Bestätigtes Blatt', '1/1', 'WAV-001 V1.0'], ['Offene Spuren', '3/3', 'AUT-A, AUT-B, AUT-C'], ['Externe Aktionen', '0', 'Kein Kontakt oder Versand'], ['L2-Öffnungen', '0', 'G1 bleibt offen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-023', version: 'V1.0', status: 'WAV-001 bestätigt und Welle 1 in begrenztem Umfang geöffnet', author: 'Cheikh Ndiaye', date: '27.08.2026',
      decision: 'REF-01-G1-WAV-001 V0.1 ist bestätigt und wird zu V1.0. AUT-A darf öffentliche offizielle Quellen ohne Konto oder Kontakt recherchieren; AUT-B darf rein synthetische Nachweise in einer isolierten Umgebung erstellen; AUT-C darf Profil und Kriterien einer unabhängigen Prüfung definieren, ohne eine reale Person zu benennen oder anzusprechen.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 27.08.2026: « super, merci de continuer je confirme ».',
      limit: 'AUT-D wartet auf die Ausgaben A, B und C. Der Entscheid erlaubt keinen Anbieter, kein Konto, keine Authentifizierung, keinen Zugriff auf ein Realsystem, keine realen Personen- oder Geschäftsdaten, keinen Kontakt, Versand, externe Sammlung, Prüferbenennung, Produktionstest, keine Förderung einer Masterquelle, keinen G1-Abschluss und keine L2-Öffnung.'
    },
    status: 'BESTÄTIGT · WAV-001 V1.0 steuert nun Welle 1; jede Ausgabe behält eigene Herkunft, Verantwortung und Status.',
    next: 'Autorisierte Arbeit: AUT-A aus öffentlichen offiziellen Quellen dokumentieren, AUT-B mit isolierten synthetischen Daten vorbereiten und das AUT-C-Prüferprofil umreissen. Eine gemeinsame menschliche Kontrolle prüft danach die drei Ergebnisse.',
    boundary: 'AUT-C erhält keine reale Identität und es wird keine Anfrage versandt. AUT-D, jede reale Sammlung und jede institutionelle Förderung bleiben geschlossen.'
  }
};

const InstitutionalPeopleTeamsAutWaveOneConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-aut-wave-one-confirmation" className="mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-aut-wave-one-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-aut-wave-one-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <BadgeCheck className="text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsAutWaveOneConfirmation;
