import React, { useEffect, useMemo, useState } from 'react';
import { Clock3, Database, LockKeyhole, ScrollText } from 'lucide-react';
import api from './api';

const translations = {
  FR: {
    eyebrow: 'Accès restreint · Lecture seule',
    title: 'Journal d’audit Administration',
    intro: 'Trace des créations, modifications et suppressions des registres Administration. Aucun contenu de document ou de courrier n’est affiché.',
    source: 'Source sécurisée BigQuery, limitée à votre organisation et à votre permission d’audit.',
    loading: 'Chargement du journal d’audit…',
    empty: 'Aucun événement d’audit enregistré.',
    unavailable: 'Le journal d’audit est temporairement indisponible.',
    date: 'Date et heure', actor: 'Auteur', entity: 'Objet', action: 'Action', fields: 'Champs concernés', identifier: 'Identifiant',
    unknownActor: 'Utilisateur M3S', noFields: 'Aucun détail de champ', events: 'événements chargés',
    entities: { resource: 'Ressource', correspondence: 'Courrier' },
    actions: { create: 'Création', update: 'Modification', delete: 'Suppression' }
  },
  EN: {
    eyebrow: 'Restricted access · Read only',
    title: 'Administration audit log',
    intro: 'Trace of creations, updates and deletions in Administration registers. No document or correspondence content is displayed.',
    source: 'Secure BigQuery source, limited to your organization and audit permission.',
    loading: 'Loading the audit log…',
    empty: 'No audit event has been recorded.',
    unavailable: 'The audit log is temporarily unavailable.',
    date: 'Date and time', actor: 'Actor', entity: 'Object', action: 'Action', fields: 'Changed fields', identifier: 'Identifier',
    unknownActor: 'M3S user', noFields: 'No field detail', events: 'events loaded',
    entities: { resource: 'Resource', correspondence: 'Correspondence' },
    actions: { create: 'Creation', update: 'Update', delete: 'Deletion' }
  },
  DE: {
    eyebrow: 'Eingeschränkter Zugriff · Nur Lesen',
    title: 'Auditprotokoll Verwaltung',
    intro: 'Nachweis der Erstellungen, Änderungen und Löschungen in den Verwaltungsregistern. Dokument- oder Korrespondenzinhalte werden nicht angezeigt.',
    source: 'Gesicherte BigQuery-Quelle, begrenzt auf Ihre Organisation und Auditberechtigung.',
    loading: 'Auditprotokoll wird geladen…',
    empty: 'Es wurde noch kein Auditereignis erfasst.',
    unavailable: 'Das Auditprotokoll ist vorübergehend nicht verfügbar.',
    date: 'Datum und Uhrzeit', actor: 'Akteur', entity: 'Objekt', action: 'Aktion', fields: 'Betroffene Felder', identifier: 'Kennung',
    unknownActor: 'M3S-Benutzer', noFields: 'Keine Felddetails', events: 'Ereignisse geladen',
    entities: { resource: 'Ressource', correspondence: 'Korrespondenz' },
    actions: { create: 'Erstellung', update: 'Änderung', delete: 'Löschung' }
  }
};

const fieldLabels = {
  FR: {
    title: 'titre', family: 'famille', authority: 'autorité', location: 'emplacement', source_status: 'statut source', review_status: 'statut de revue', confidentiality: 'confidentialité', note: 'note', receipt_date: 'date de réception', direction: 'direction', channel: 'canal', sender: 'expéditeur', recipient: 'destinataire', subject: 'objet', category: 'catégorie', linked_person_or_case: 'personne ou dossier lié', ged_reference: 'référence GED', receipt_evidence_reference: 'preuve de réception', owner: 'responsable', next_action: 'prochaine action', status: 'statut', deadline: 'échéance', deleted_at: 'suppression logique'
  },
  EN: {
    title: 'title', family: 'family', authority: 'authority', location: 'location', source_status: 'source status', review_status: 'review status', confidentiality: 'confidentiality', note: 'note', receipt_date: 'receipt date', direction: 'direction', channel: 'channel', sender: 'sender', recipient: 'recipient', subject: 'subject', category: 'category', linked_person_or_case: 'linked person or case', ged_reference: 'DMS reference', receipt_evidence_reference: 'receipt evidence', owner: 'owner', next_action: 'next action', status: 'status', deadline: 'deadline', deleted_at: 'logical deletion'
  },
  DE: {
    title: 'Titel', family: 'Familie', authority: 'Stelle', location: 'Ablageort', source_status: 'Quellenstatus', review_status: 'Prüfstatus', confidentiality: 'Vertraulichkeit', note: 'Notiz', receipt_date: 'Eingangsdatum', direction: 'Richtung', channel: 'Kanal', sender: 'Absender', recipient: 'Empfänger', subject: 'Betreff', category: 'Kategorie', linked_person_or_case: 'verknüpfte Person oder Akte', ged_reference: 'DMS-Referenz', receipt_evidence_reference: 'Eingangsnachweis', owner: 'Verantwortlich', next_action: 'nächste Aktion', status: 'Status', deadline: 'Frist', deleted_at: 'logische Löschung'
  }
};

const localeFor = language => ({ FR: 'fr-CH', EN: 'en-GB', DE: 'de-CH' }[language] || 'fr-CH');

const timestampValue = value => {
  if (value && typeof value === 'object' && 'value' in value) return value.value;
  return value;
};

const AdministrationAuditLog = ({ language = 'FR' }) => {
  const t = translations[language] || translations.FR;
  const [events, setEvents] = useState([]);
  const [state, setState] = useState('loading');

  useEffect(() => {
    let active = true;
    const load = async () => {
      setState('loading');
      try {
        const response = await api.getAdministrationAudit(100, 0);
        if (!active) return;
        setEvents(Array.isArray(response?.data) ? response.data : []);
        setState('ready');
      } catch (error) {
        if (!active) return;
        console.error('Administration audit unavailable:', error);
        setEvents([]);
        setState('unavailable');
      }
    };
    load();
    return () => { active = false; };
  }, []);

  const formatter = useMemo(() => new Intl.DateTimeFormat(localeFor(language), {
    dateStyle: 'medium', timeStyle: 'short'
  }), [language]);
  const formatDate = value => {
    const date = new Date(timestampValue(value));
    return Number.isNaN(date.getTime()) ? '—' : formatter.format(date);
  };
  const labelField = field => fieldLabels[language]?.[field] || field;
  const labelEntity = entity => t.entities[entity] || entity;
  const labelAction = action => t.actions[action] || action;

  return (
    <section className="administration-audit administration-overview space-y-5" aria-labelledby="administration-audit-title">
      <header className="m3s-panel p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-4xl">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase text-amber-700 dark:text-amber-300">
              <LockKeyhole size={16} aria-hidden="true" />{t.eyebrow}
            </p>
            <h2 id="administration-audit-title" className="m3s-page-title mt-2">{t.title}</h2>
            <p className="mt-3 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{t.intro}</p>
          </div>
          {state === 'ready' && (
            <div className="m3s-raised inline-flex min-h-11 items-center gap-3 px-4 py-2 text-sm" aria-label={`${events.length} ${t.events}`}>
              <ScrollText size={18} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
              <strong style={{ color: 'var(--m3s-text-primary)' }}>{events.length}</strong>
              <span style={{ color: 'var(--m3s-text-secondary)' }}>{t.events}</span>
            </div>
          )}
        </div>
        <p className="mt-4 flex items-start gap-2 border-t pt-4 text-xs leading-5" style={{ borderColor: 'var(--m3s-border)', color: 'var(--m3s-text-secondary)' }}>
          <Database size={16} className="mt-0.5 shrink-0 text-cyan-700 dark:text-cyan-400" aria-hidden="true" />{t.source}
        </p>
      </header>

      {state === 'loading' && (
        <div className="m3s-panel flex min-h-32 items-center justify-center p-6 text-sm" role="status" style={{ color: 'var(--m3s-text-secondary)' }}>
          <Clock3 size={18} className="mr-2 animate-pulse text-blue-600 dark:text-blue-400" aria-hidden="true" />{t.loading}
        </div>
      )}
      {state === 'unavailable' && (
        <div className="m3s-panel border-amber-500/50 p-5 text-sm text-amber-800 dark:text-amber-200" role="alert">{t.unavailable}</div>
      )}
      {state === 'ready' && events.length === 0 && (
        <div className="m3s-panel p-6 text-sm" style={{ color: 'var(--m3s-text-secondary)' }}>{t.empty}</div>
      )}
      {state === 'ready' && events.length > 0 && (
        <>
          <div className="m3s-table-shell hidden overflow-x-auto md:block">
            <table className="min-w-full text-sm">
              <thead className="m3s-raised">
                <tr>
                  <th className="px-4 py-3 text-left">{t.date}</th>
                  <th className="px-4 py-3 text-left">{t.actor}</th>
                  <th className="px-4 py-3 text-left">{t.entity}</th>
                  <th className="px-4 py-3 text-left">{t.action}</th>
                  <th className="px-4 py-3 text-left">{t.fields}</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event.id}>
                    <td className="whitespace-nowrap px-4 py-3">{formatDate(event.event_at)}</td>
                    <td className="px-4 py-3">{event.actor_name || t.unknownActor}</td>
                    <td className="px-4 py-3"><span className="font-semibold">{labelEntity(event.entity_type)}</span><span className="mt-1 block font-mono text-xs" style={{ color: 'var(--m3s-text-secondary)' }}>{event.entity_id}</span></td>
                    <td className="px-4 py-3"><span className="inline-flex rounded-md border border-blue-500/40 bg-blue-500/10 px-2 py-1 font-semibold text-blue-700 dark:text-blue-300">{labelAction(event.action)}</span></td>
                    <td className="px-4 py-3">{event.changed_fields?.length ? event.changed_fields.map(labelField).join(', ') : t.noFields}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid gap-3 md:hidden">
            {events.map(event => (
              <article key={event.id} className="m3s-panel p-4">
                <div className="flex items-start justify-between gap-3">
                  <div><h3 className="m3s-panel-title">{labelAction(event.action)} · {labelEntity(event.entity_type)}</h3><p className="mt-1 text-xs" style={{ color: 'var(--m3s-text-secondary)' }}>{formatDate(event.event_at)}</p></div>
                  <LockKeyhole size={17} className="shrink-0 text-amber-700 dark:text-amber-400" aria-hidden="true" />
                </div>
                <dl className="mt-4 grid gap-3 text-sm">
                  <div><dt className="text-xs font-semibold uppercase" style={{ color: 'var(--m3s-text-secondary)' }}>{t.actor}</dt><dd className="mt-1">{event.actor_name || t.unknownActor}</dd></div>
                  <div><dt className="text-xs font-semibold uppercase" style={{ color: 'var(--m3s-text-secondary)' }}>{t.identifier}</dt><dd className="mt-1 break-all font-mono text-xs">{event.entity_id}</dd></div>
                  <div><dt className="text-xs font-semibold uppercase" style={{ color: 'var(--m3s-text-secondary)' }}>{t.fields}</dt><dd className="mt-1">{event.changed_fields?.length ? event.changed_fields.map(labelField).join(', ') : t.noFields}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default AdministrationAuditLog;
