import React from 'react';
import { AlertTriangle, FileCheck2, LockKeyhole, ShieldCheck } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DU POINT 1 · REF-01-DEC-014 · V1.0 · 26-08-2026',
    title: 'Confirmer la fiche sans inventer un amendement non précisé',
    intro: 'Cheikh confirme la fiche et indique qu’elle est amendée. Aucun contenu d’amendement distinct n’étant précisé, la version V0.1 est promue sans modification textuelle en V1.0 ; toute modification ultérieure devra être consignée séparément.',
    counters: [['Fiche confirmée', '1', 'REF-01-G1-EVD-001'], ['Version gouvernée', 'V1.0', 'Contenu V0.1 conservé'], ['Amendements déduits', '0', 'Aucune extrapolation'], ['Autorisations L2', '0', 'L2 reste fermé']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-014', version: 'V1.0', status: 'Fiche confirmée · amendement non spécifié', author: 'Cheikh Ndiaye', date: '26-08-2026',
      decision: 'REF-01-G1-EVD-001 V0.1 est confirmée et promue en V1.0 avec ses sept exigences, dix métadonnées et responsables candidats. Aucun amendement textuel n’est appliqué faute de contenu distinct à consigner.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 26-08-2026 : « confirme et amendé, merci de continuer cher codex », en réponse à la fiche publiée par la PR frontend nº 202 au commit 6884cc01.',
      limit: 'Cette décision confirme le cadre de preuve uniquement. Elle ne confirme aucune preuve, aucun fournisseur, service, prix, localisation, RPO/RTO ou conformité et n’autorise ni collecte externe, ni achat, ni configuration, ni ouverture de L2.'
    },
    status: 'CONFIRMEE · REF-01-G1-EVD-001 V1.0 devient le cadre gouverné de préparation des preuves.',
    next: 'Prochaine étape : préparer le paquet de collecte et soumettre séparément son périmètre, ses canaux et ses responsables à autorisation humaine.',
    boundary: 'G1 reste ouverte. La confirmation de la fiche ne vaut pas confirmation du point PostgreSQL/restauration.'
  },
  EN: {
    eyebrow: 'POINT 1 HUMAN CONFIRMATION · REF-01-DEC-014 · V1.0 · 26 AUG 2026',
    title: 'Confirm the sheet without inventing an unspecified amendment',
    intro: 'Cheikh confirms the sheet and states that it is amended. As no distinct amendment content is specified, V0.1 is promoted unchanged to V1.0; any later change must be recorded separately.',
    counters: [['Confirmed sheet', '1', 'REF-01-G1-EVD-001'], ['Governed version', 'V1.0', 'V0.1 content retained'], ['Inferred amendments', '0', 'No extrapolation'], ['L2 authorisations', '0', 'L2 remains closed']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-014', version: 'V1.0', status: 'Sheet confirmed · amendment unspecified', author: 'Cheikh Ndiaye', date: '26 Aug 2026',
      decision: 'REF-01-G1-EVD-001 V0.1 is confirmed and promoted to V1.0 with its seven requirements, ten metadata fields and candidate owners. No textual amendment is applied because no distinct content was supplied.',
      evidence: 'Explicit confirmation by Cheikh during the 26 Aug 2026 session: “confirme et amendé, merci de continuer cher codex”, in response to the sheet published through frontend PR 202 at commit 6884cc01.',
      limit: 'This decision confirms the evidence framework only. It confirms no evidence, provider, service, price, location, RPO/RTO or compliance and authorises no external collection, purchase, configuration or L2 opening.'
    },
    status: 'CONFIRMED · REF-01-G1-EVD-001 V1.0 becomes the governed evidence-preparation framework.',
    next: 'Next step: prepare the collection package and submit its scope, channels and owners for separate human authorisation.',
    boundary: 'G1 remains open. Confirming the sheet does not confirm the PostgreSQL/restoration point.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG PUNKT 1 · REF-01-DEC-014 · V1.0 · 26.08.2026',
    title: 'Das Blatt bestätigen, ohne eine unbestimmte Änderung zu erfinden',
    intro: 'Cheikh bestätigt das Blatt und bezeichnet es als geändert. Da kein eigener Änderungsinhalt genannt ist, wird V0.1 unverändert zu V1.0 erhoben; jede spätere Änderung muss getrennt dokumentiert werden.',
    counters: [['Bestätigtes Blatt', '1', 'REF-01-G1-EVD-001'], ['Gesteuerte Version', 'V1.0', 'Inhalt V0.1 bewahrt'], ['Abgeleitete Änderungen', '0', 'Keine Extrapolation'], ['L2-Autorisierungen', '0', 'L2 bleibt geschlossen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Dokumentierter Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-014', version: 'V1.0', status: 'Blatt bestätigt · Änderung nicht spezifiziert', author: 'Cheikh Ndiaye', date: '26.08.2026',
      decision: 'REF-01-G1-EVD-001 V0.1 ist bestätigt und wird mit sieben Anforderungen, zehn Metadaten und Kandidatenverantwortung zu V1.0 erhoben. Ohne getrennt gelieferten Inhalt wird keine Textänderung angewandt.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 26.08.2026: „confirme et amendé, merci de continuer cher codex“, als Antwort auf das mit Frontend-PR Nr. 202 am Commit 6884cc01 veröffentlichte Blatt.',
      limit: 'Dieser Entscheid bestätigt nur den Nachweisrahmen. Er bestätigt keinen Nachweis, Anbieter, Dienst, Preis, Standort, RPO/RTO oder Konformität und autorisiert keine externe Sammlung, keinen Kauf, keine Konfiguration und keine L2-Öffnung.'
    },
    status: 'BESTÄTIGT · REF-01-G1-EVD-001 V1.0 wird zum gesteuerten Rahmen der Nachweisvorbereitung.',
    next: 'Nächster Schritt: Sammlungspaket vorbereiten und Umfang, Kanäle sowie Verantwortung getrennt menschlich autorisieren lassen.',
    boundary: 'G1 bleibt offen. Die Blattbestätigung bestätigt nicht den PostgreSQL-/Restore-Punkt.'
  }
};

const InstitutionalPeopleTeamsEvidenceConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-evidence-confirmation" className="m3s-ref01-g1-evidence-confirmation mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-evidence-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-evidence-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><ShieldCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 3 ? <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" /> : <FileCheck2 className="text-emerald-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsEvidenceConfirmation;
