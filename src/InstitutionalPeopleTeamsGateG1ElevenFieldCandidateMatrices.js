import React from 'react';
import { AlertTriangle, Archive, KeyRound, ListChecks, LockKeyhole } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'MATRICES CANDIDATES · ONZE CHAMPS OUVERTS · 28-08-2026',
    title: 'Structurer les onze décisions sans remplir les inconnues',
    intro: 'Les deux matrices traduisent séparément les cadres AUT-02-03 et AUT-02-02 V1.0. Elles définissent les informations à confirmer et les supports à rapprocher, sans désigner une source maîtresse, un titulaire, une autorité ou une règle réelle.',
    counters: [['Matrices préparées', '2/2', 'Deux portées séparées'], ['Champs structurés', '11', 'Cinq + six'], ['Valeurs réelles', '0', 'Toutes non renseignées'], ['Autorisations', '0', 'Aucun accès ni traitement']],
    badge: 'CANDIDAT · V0.1',
    labels: { basis: 'Cadre confirmé', field: 'Champ à décider', format: 'Structure attendue', supports: 'Supports à rapprocher · non promus', value: 'Valeur réelle', state: 'État', stop: 'Arrêt obligatoire' },
    empty: 'Non renseignée',
    open: 'À confirmer',
    matrices: [
      {
        id: 'REF-01-G1-AUT-02-03-002', version: 'V0.1', title: 'Conservation et GED', icon: Archive,
        basis: 'REF-01-G1-AUT-02-03-001 V1.0 · cadre documentaire confirmé par REF-01-DEC-040',
        rows: [
          ['Durées applicables', 'Durée, unité, fondement et point de départ', 'LEGAL · Administration · source officielle applicable'],
          ['Déclencheurs précis', 'Événement daté, objet concerné et règle de calcul', 'Processus métier · GED · LEGAL'],
          ['Autorités nominatives', 'Fonction autorisée, personne désignée et preuve du mandat', 'Gouvernance · Administration · Organisation & RH'],
          ['Règles locales', 'Territoire, règle, version et date d’effet', 'LEGAL · Administration · source officielle applicable'],
          ['Références de pièces autorisées', 'Identifiant GED, type de pièce et niveau C2/C3/C4', 'GED · fonction propriétaire · décision d’accès']
        ],
        stop: 'Arrêt avant fixation d’une durée, désignation d’une autorité, référence d’une pièce C3/C4 ou application d’une règle GED.'
      },
      {
        id: 'REF-01-G1-AUT-02-02-002', version: 'V0.1', title: 'Rôles et moindre privilège', icon: KeyRound,
        basis: 'REF-01-G1-AUT-02-02-001 V1.0 · cadre documentaire confirmé par REF-01-DEC-040',
        rows: [
          ['Titulaires réels', 'Identifiant institutionnel, fonction, équipe et preuve du mandat', 'Organisation & RH · Gouvernance · annuaire RH-001'],
          ['Droits effectifs', 'Action, objet, niveau et justification métier', 'Fonction propriétaire · IT & Support · contrôle d’accès'],
          ['Périmètres de lignes', 'Fonction, équipe, territoire et critère de propriété', 'Fonction propriétaire · référentiel métier · IT & Support'],
          ['Délégations', 'Délégant, délégataire, portée, début, fin et preuve', 'Gouvernance · Organisation & RH · GED'],
          ['Fréquence de revue', 'Cadence ou événement, responsable et preuve attendue', 'Gouvernance · IT & Support · fonction propriétaire'],
          ['Exceptions autorisées', 'Motif, portée, autorité, expiration et contrôle compensatoire', 'Gouvernance · LEGAL · IT & Support']
        ],
        stop: 'Arrêt avant saisie d’une identité, attribution ou retrait d’un droit, création de compte, délégation ou exception réelle.'
      }
    ],
    status: 'CANDIDAT V0.1 · Deux structures préparées, onze valeurs laissées vides et aucune exécution ouverte.',
    next: 'Prochain arbitrage humain : confirmer ou amender séparément la structure de REF-01-G1-AUT-02-03-002 V0.1 et REF-01-G1-AUT-02-02-002 V0.1. Cette confirmation ne renseignerait encore aucune valeur.',
    boundary: 'Aucune ligne ne constitue une décision réelle. Aucun nom, durée, droit, périmètre, délégation, fréquence, exception, pièce ou règle n’est validé, appliqué ou testé.'
  },
  EN: {
    eyebrow: 'CANDIDATE MATRICES · ELEVEN OPEN FIELDS · 28 AUG 2026',
    title: 'Structure the eleven decisions without filling the unknowns',
    intro: 'The two matrices separately translate the AUT-02-03 and AUT-02-02 V1.0 frameworks. They define the information to confirm and supports to reconcile without designating a master source, holder, authority or real rule.',
    counters: [['Prepared matrices', '2/2', 'Two separate scopes'], ['Structured fields', '11', 'Five + six'], ['Real values', '0', 'All left empty'], ['Authorisations', '0', 'No access or processing']],
    badge: 'CANDIDATE · V0.1',
    labels: { basis: 'Confirmed framework', field: 'Field to decide', format: 'Expected structure', supports: 'Supports to reconcile · not promoted', value: 'Real value', state: 'State', stop: 'Mandatory stop' },
    empty: 'Not provided',
    open: 'To confirm',
    matrices: [
      {
        id: 'REF-01-G1-AUT-02-03-002', version: 'V0.1', title: 'Retention and DMS', icon: Archive,
        basis: 'REF-01-G1-AUT-02-03-001 V1.0 · documentary framework confirmed by REF-01-DEC-040',
        rows: [
          ['Applicable periods', 'Period, unit, basis and starting point', 'LEGAL · Administration · applicable official source'],
          ['Precise triggers', 'Dated event, concerned object and calculation rule', 'Business process · DMS · LEGAL'],
          ['Named authorities', 'Authorised function, designated person and mandate evidence', 'Governance · Administration · Organisation & HR'],
          ['Local rules', 'Territory, rule, version and effective date', 'LEGAL · Administration · applicable official source'],
          ['Authorised record references', 'DMS identifier, record type and C2/C3/C4 level', 'DMS · owning function · access decision']
        ],
        stop: 'Stop before setting a period, naming an authority, referencing a C3/C4 record or applying a DMS rule.'
      },
      {
        id: 'REF-01-G1-AUT-02-02-002', version: 'V0.1', title: 'Roles and least privilege', icon: KeyRound,
        basis: 'REF-01-G1-AUT-02-02-001 V1.0 · documentary framework confirmed by REF-01-DEC-040',
        rows: [
          ['Real holders', 'Institutional identifier, function, team and mandate evidence', 'Organisation & HR · Governance · RH-001 directory'],
          ['Effective rights', 'Action, object, level and business justification', 'Owning function · IT & Support · access control'],
          ['Row scopes', 'Function, team, territory and ownership criterion', 'Owning function · business reference system · IT & Support'],
          ['Delegations', 'Delegator, delegate, scope, start, end and evidence', 'Governance · Organisation & HR · DMS'],
          ['Review frequency', 'Cadence or event, owner and expected evidence', 'Governance · IT & Support · owning function'],
          ['Authorised exceptions', 'Reason, scope, authority, expiry and compensating control', 'Governance · LEGAL · IT & Support']
        ],
        stop: 'Stop before recording an identity, assigning or withdrawing a right, creating an account, delegation or real exception.'
      }
    ],
    status: 'CANDIDATE V0.1 · Two structures prepared, eleven values left empty and no execution opened.',
    next: 'Next human decision: confirm or amend the structures of REF-01-G1-AUT-02-03-002 V0.1 and REF-01-G1-AUT-02-02-002 V0.1 separately. That confirmation would still provide no value.',
    boundary: 'No row is a real decision. No name, period, right, scope, delegation, frequency, exception, record or rule is validated, applied or tested.'
  },
  DE: {
    eyebrow: 'KANDIDATENMATRIZEN · ELF OFFENE FELDER · 28.08.2026',
    title: 'Die elf Entscheide strukturieren, ohne Unbekannte auszufüllen',
    intro: 'Die beiden Matrizen übersetzen die Rahmen AUT-02-03 und AUT-02-02 V1.0 getrennt. Sie definieren zu bestätigende Angaben und abzugleichende Träger, ohne Masterquelle, Inhaber, Autorität oder reale Regel zu bestimmen.',
    counters: [['Vorbereitete Matrizen', '2/2', 'Zwei getrennte Umfänge'], ['Strukturierte Felder', '11', 'Fünf + sechs'], ['Realwerte', '0', 'Alle leer gelassen'], ['Autorisierungen', '0', 'Kein Zugriff oder Verarbeitung']],
    badge: 'KANDIDAT · V0.1',
    labels: { basis: 'Bestätigter Rahmen', field: 'Zu entscheidendes Feld', format: 'Erwartete Struktur', supports: 'Abzugleichende Träger · nicht hochgestuft', value: 'Realwert', state: 'Stand', stop: 'Obligatorischer Stopp' },
    empty: 'Nicht angegeben',
    open: 'Zu bestätigen',
    matrices: [
      {
        id: 'REF-01-G1-AUT-02-03-002', version: 'V0.1', title: 'Aufbewahrung und DMS', icon: Archive,
        basis: 'REF-01-G1-AUT-02-03-001 V1.0 · durch REF-01-DEC-040 bestätigter Dokumentrahmen',
        rows: [
          ['Anwendbare Fristen', 'Frist, Einheit, Grundlage und Startpunkt', 'LEGAL · Administration · anwendbare offizielle Quelle'],
          ['Genaue Auslöser', 'Datiertes Ereignis, betroffenes Objekt und Berechnungsregel', 'Fachprozess · DMS · LEGAL'],
          ['Benannte Autoritäten', 'Autorisierte Funktion, bezeichnete Person und Mandatsnachweis', 'Governance · Administration · Organisation & HR'],
          ['Lokale Regeln', 'Gebiet, Regel, Version und Gültigkeitsdatum', 'LEGAL · Administration · anwendbare offizielle Quelle'],
          ['Autorisierte Unterlagenreferenzen', 'DMS-Kennung, Unterlagentyp und C2/C3/C4-Stufe', 'DMS · verantwortliche Funktion · Zugriffsentscheid']
        ],
        stop: 'Stopp vor Festlegung einer Frist, Benennung einer Autorität, Referenz einer C3/C4-Unterlage oder Anwendung einer DMS-Regel.'
      },
      {
        id: 'REF-01-G1-AUT-02-02-002', version: 'V0.1', title: 'Rollen und geringste Berechtigung', icon: KeyRound,
        basis: 'REF-01-G1-AUT-02-02-001 V1.0 · durch REF-01-DEC-040 bestätigter Dokumentrahmen',
        rows: [
          ['Reale Inhaber', 'Institutionelle Kennung, Funktion, Team und Mandatsnachweis', 'Organisation & HR · Governance · RH-001-Verzeichnis'],
          ['Wirksame Rechte', 'Aktion, Objekt, Stufe und fachliche Begründung', 'Verantwortliche Funktion · IT & Support · Zugriffskontrolle'],
          ['Zeilenumfänge', 'Funktion, Team, Gebiet und Eigentumskriterium', 'Verantwortliche Funktion · Fachreferenzsystem · IT & Support'],
          ['Delegationen', 'Delegierende, delegierte Person, Umfang, Beginn, Ende und Nachweis', 'Governance · Organisation & HR · DMS'],
          ['Prüffrequenz', 'Rhythmus oder Ereignis, Verantwortung und erwarteter Nachweis', 'Governance · IT & Support · verantwortliche Funktion'],
          ['Autorisierte Ausnahmen', 'Grund, Umfang, Autorität, Ablauf und kompensierende Kontrolle', 'Governance · LEGAL · IT & Support']
        ],
        stop: 'Stopp vor Erfassung einer Identität, Zuweisung oder Entzug eines Rechts, Erstellung eines Kontos, einer Delegation oder realen Ausnahme.'
      }
    ],
    status: 'KANDIDAT V0.1 · Zwei Strukturen vorbereitet, elf Werte leer gelassen und keine Ausführung geöffnet.',
    next: 'Nächster menschlicher Entscheid: die Strukturen von REF-01-G1-AUT-02-03-002 V0.1 und REF-01-G1-AUT-02-02-002 V0.1 getrennt bestätigen oder ändern. Auch diese Bestätigung würde noch keinen Wert liefern.',
    boundary: 'Keine Zeile ist ein Realentscheid. Kein Name, keine Frist, kein Recht, Umfang, keine Delegation, Prüffrequenz, Ausnahme, Unterlage oder Regel ist validiert, angewandt oder getestet.'
  }
};

const InstitutionalPeopleTeamsGateG1ElevenFieldCandidateMatrices = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-eleven-field-candidate-matrices" className="m3s-ref01-g1-aut-cd-documentary-files mt-5 scroll-mt-24 rounded-md border border-sky-800/70 bg-sky-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-eleven-field-candidate-matrices-title">
      <div className="flex items-start justify-between gap-3"><div className="min-w-0 max-w-5xl"><p className="text-xs font-semibold uppercase text-sky-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-eleven-field-candidate-matrices-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><ListChecks className="shrink-0 text-sky-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div className="min-w-0"><p className="break-words text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div>{index < 2 ? <ListChecks className="shrink-0 text-sky-300" size={19} aria-hidden="true" /> : <LockKeyhole className="shrink-0 text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        {t.matrices.map(matrix => { const Icon = matrix.icon; return <article key={matrix.id} data-testid="ref01-g1-eleven-field-candidate-matrix" className="m3s-raised min-w-0 p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div className="flex min-w-0 items-start gap-2"><Icon className="mt-0.5 shrink-0 text-sky-300" size={19} aria-hidden="true" /><div className="min-w-0"><h6 className="break-words text-sm font-semibold text-slate-100">{matrix.id} · {matrix.version}</h6><p className="mt-1 text-xs font-semibold text-violet-200">{matrix.title}</p></div></div><span className="rounded-md border border-amber-700/70 bg-amber-950/25 px-2 py-1 text-[10px] font-semibold text-amber-100">{t.badge}</span></div><div className="mt-4 rounded-md border border-slate-700 bg-slate-950/20 p-3"><p className="text-xs font-semibold text-sky-200">{t.labels.basis}</p><p className="mt-1 text-xs leading-5 text-slate-300">{matrix.basis}</p></div><div className="mt-3 grid grid-cols-1 gap-3 2xl:grid-cols-2">{matrix.rows.map(([field, format, supports]) => <section key={field} data-testid="ref01-g1-eleven-field-candidate-row" className="rounded-md border border-slate-700 bg-slate-950/15 p-3"><h6 className="text-xs font-semibold text-slate-100">{field}</h6><dl className="mt-3 space-y-2 text-xs leading-5"><div><dt className="font-semibold text-violet-200">{t.labels.format}</dt><dd className="mt-0.5 text-slate-300">{format}</dd></div><div><dt className="font-semibold text-sky-200">{t.labels.supports}</dt><dd className="mt-0.5 text-slate-300">{supports}</dd></div><div className="grid grid-cols-1 gap-2 sm:grid-cols-2"><div><dt className="font-semibold text-rose-200">{t.labels.value}</dt><dd className="mt-0.5 text-slate-300">{t.empty}</dd></div><div><dt className="font-semibold text-amber-200">{t.labels.state}</dt><dd className="mt-0.5 text-slate-300">{t.open}</dd></div></div></dl></section>)}</div><p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><LockKeyhole className="mt-0.5 shrink-0" size={15} aria-hidden="true" /><span><span className="block">{t.labels.stop}</span>{matrix.stop}</span></p></article>; })}
      </div>
      <p className="mt-4 rounded-md border border-sky-700/70 bg-sky-950/20 p-3 text-xs font-semibold leading-5 text-sky-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-violet-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1ElevenFieldCandidateMatrices;
