import React from 'react';
import { AlertTriangle, ListOrdered, LockKeyhole } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'MATRICE CONFIRMÉE DE PRIORISATION AUT · REF-01-G1-PRI-001 · V1.0 · 27-08-2026',
    title: 'Choisir le premier dossier sans choisir une identité',
    intro: 'Confirmée par REF-01-DEC-021, cette matrice présente les quatre dossiers AUT afin de préparer leur future sélection. Aucune option n’est présélectionnée et la confirmation du cadre ne vaut ni choix d’une personne, ni autorisation de contact ou d’envoi.',
    counters: [['Dossiers disponibles', '4/4', 'Cadres confirmés'], ['Priorité choisie', '0/4', 'Aucune présélection'], ['Fiches IDN ouvertes', '0', 'Aucune identité'], ['Contacts ou envois', '0', 'Toujours interdits']],
    labels: { purpose: 'Objet du dossier', profile: 'Profil gouverné', gate: 'Condition avant ouverture', status: 'OPTION NON SÉLECTIONNÉE' },
    options: [
      ['AUT-A · Documentation officielle', 'Obtenir une documentation publique ou institutionnelle pour REQ-A.', 'REC-A · Autorité ou organisme documentaire', 'Confirmer la priorité A séparément ; aucune identité réelle dans cette matrice.'],
      ['AUT-B · Preuves techniques', 'Préparer une preuve technique isolée et synthétique pour REQ-B.', 'REC-B · Fonction technique ou prestataire qualifié', 'Confirmer la priorité B séparément ; aucun environnement ni accès réel autorisé.'],
      ['AUT-C · Retour indépendant', 'Préparer un retour méthodologique indépendant pour REQ-C.', 'REC-C · Relecteur ou expert indépendant', 'Confirmer la priorité C séparément ; aucun contact réel autorisé.'],
      ['AUT-D · Revue croisée', 'Préparer une revue croisée bornée pour REQ-D.', 'REC-D · Fonction interne ou partenaire de contrôle', 'Confirmer la priorité D séparément ; aucun partage réel autorisé.']
    ],
    status: 'MATRICE CONFIRMÉE · 0/4 DOSSIER PRIORISÉ · 0 IDENTITÉ · 0 AUTORISATION',
    next: 'Étape suivante accomplie : SEL-001 V1.0 et BAT-001 V1.0 sont confirmés par REF-01-DEC-022 ; WAV-001 V0.1 prépare la vague 1.',
    boundary: 'Limite : une priorité autorise uniquement la préparation documentaire du dossier choisi. Elle n’autorise aucun nom, fournisseur, compte, accès, contact, envoi, collecte, test ou preuve réelle et ne ferme pas G1.'
  },
  EN: {
    eyebrow: 'CONFIRMED AUT-FILE PRIORITISATION MATRIX · REF-01-G1-PRI-001 · V1.0 · 27 AUG 2026',
    title: 'Choose the first file without choosing an identity',
    intro: 'Confirmed through REF-01-DEC-021, this matrix exposes the four AUT files to prepare their future selection. No option is preselected, and confirming the framework is neither a person choice nor a contact or send authorisation.',
    counters: [['Available files', '4/4', 'Confirmed frameworks'], ['Chosen priority', '0/4', 'No preselection'], ['Open IDN records', '0', 'No identity'], ['Contacts or sends', '0', 'Still prohibited']],
    labels: { purpose: 'File purpose', profile: 'Governed profile', gate: 'Condition before opening', status: 'OPTION NOT SELECTED' },
    options: [
      ['AUT-A · Official documentation', 'Obtain public or institutional documentation for REQ-A.', 'REC-A · Authority or documentation body', 'Confirm priority A separately; no real identity in this matrix.'],
      ['AUT-B · Technical evidence', 'Prepare isolated synthetic technical evidence for REQ-B.', 'REC-B · Technical function or qualified provider', 'Confirm priority B separately; no real environment or access is authorised.'],
      ['AUT-C · Independent feedback', 'Prepare bounded independent methodological feedback for REQ-C.', 'REC-C · Independent reviewer or expert', 'Confirm priority C separately; no real contact is authorised.'],
      ['AUT-D · Cross-review', 'Prepare a bounded cross-review for REQ-D.', 'REC-D · Internal function or control partner', 'Confirm priority D separately; no real sharing is authorised.']
    ],
    status: 'CONFIRMED MATRIX · 0/4 PRIORITISED FILE · 0 IDENTITY · 0 AUTHORISATION',
    next: 'Completed next step: SEL-001 V1.0 and BAT-001 V1.0 are confirmed through REF-01-DEC-022; WAV-001 V0.1 prepares Wave 1.',
    boundary: 'Boundary: a priority only authorises documentary preparation of the selected file. It authorises no name, provider, account, access, contact, send, collection, trial or real evidence and does not close G1.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTE PRIORISIERUNGSMATRIX DER AUT-AKTEN · REF-01-G1-PRI-001 · V1.0 · 27.08.2026',
    title: 'Die erste Akte wählen, ohne eine Identität zu wählen',
    intro: 'Mit REF-01-DEC-021 bestätigt, zeigt diese Matrix die vier AUT-Akten zur Vorbereitung ihrer künftigen Auswahl. Keine Option ist vorausgewählt; die Rahmenbestätigung ist weder Personenwahl noch Kontakt- oder Versandautorisierung.',
    counters: [['Verfügbare Akten', '4/4', 'Bestätigte Rahmen'], ['Gewählte Priorität', '0/4', 'Keine Vorauswahl'], ['Offene IDN-Akten', '0', 'Keine Identität'], ['Kontakte oder Versand', '0', 'Weiterhin untersagt']],
    labels: { purpose: 'Zweck der Akte', profile: 'Gesteuertes Profil', gate: 'Bedingung vor Öffnung', status: 'OPTION NICHT GEWÄHLT' },
    options: [
      ['AUT-A · Offizielle Dokumentation', 'Öffentliche oder institutionelle Dokumentation für REQ-A beschaffen.', 'REC-A · Behörde oder Dokumentationsstelle', 'Priorität A getrennt bestätigen; keine reale Identität in dieser Matrix.'],
      ['AUT-B · Technische Nachweise', 'Isolierte synthetische technische Nachweise für REQ-B vorbereiten.', 'REC-B · Technische Funktion oder qualifizierter Anbieter', 'Priorität B getrennt bestätigen; keine reale Umgebung und kein Zugriff autorisiert.'],
      ['AUT-C · Unabhängige Rückmeldung', 'Begrenzte unabhängige methodische Rückmeldung für REQ-C vorbereiten.', 'REC-C · Unabhängige Prüfung oder Fachperson', 'Priorität C getrennt bestätigen; kein realer Kontakt autorisiert.'],
      ['AUT-D · Gegenprüfung', 'Eine begrenzte Gegenprüfung für REQ-D vorbereiten.', 'REC-D · Interne Funktion oder Kontrollpartner', 'Priorität D getrennt bestätigen; keine reale Weitergabe autorisiert.']
    ],
    status: 'BESTÄTIGTE MATRIX · 0/4 PRIORISIERTE AKTE · 0 IDENTITÄT · 0 AUTORISIERUNG',
    next: 'Abgeschlossener nächster Schritt: SEL-001 V1.0 und BAT-001 V1.0 sind mit REF-01-DEC-022 bestätigt; WAV-001 V0.1 bereitet Welle 1 vor.',
    boundary: 'Grenze: Eine Priorität erlaubt nur die dokumentarische Vorbereitung der gewählten Akte. Sie autorisiert keinen Namen, Anbieter, Account, Zugriff, Kontakt, Versand, Sammlung, Test oder realen Nachweis und schliesst G1 nicht.'
  }
};

const InstitutionalPeopleTeamsAutFilePriorityCandidate = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-aut-file-priority-candidate" className="m3s-ref01-g1-aut-file-priority-candidate mt-5 scroll-mt-24 rounded-md border border-amber-800/70 bg-amber-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-aut-file-priority-candidate-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-amber-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-aut-file-priority-candidate-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><ListOrdered className="shrink-0 text-amber-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note]) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div><LockKeyhole className="text-rose-300" size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.options.map(([title, purpose, profile, gate]) => <article key={title} className="rounded-md border border-slate-700 p-4" data-testid="ref01-g1-aut-priority-option"><div className="flex items-start justify-between gap-3"><h6 className="text-sm font-semibold text-amber-200">{title}</h6><span className="shrink-0 rounded-md border border-slate-600 px-2 py-1 text-[11px] font-semibold text-slate-300">{t.labels.status}</span></div><dl className="mt-3 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-slate-400">{t.labels.purpose}</dt><dd className="text-slate-200">{purpose}</dd></div><div><dt className="font-semibold text-slate-400">{t.labels.profile}</dt><dd className="text-slate-200">{profile}</dd></div><div><dt className="font-semibold text-slate-400">{t.labels.gate}</dt><dd className="text-slate-200">{gate}</dd></div></dl></article>)}</div>
      <p className="mt-4 rounded-md border border-rose-700/70 bg-rose-950/20 p-3 text-xs font-semibold leading-5 text-rose-100">{t.status}</p>
      <p className="mt-3 rounded-md border border-amber-700/70 bg-amber-950/20 p-3 text-xs font-semibold leading-5 text-amber-100">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsAutFilePriorityCandidate;
