import React from 'react';
import {
  ArrowRight,
  BadgeDollarSign,
  FileCheck2,
  GitCompareArrows,
  Landmark,
  LockKeyhole,
  Network,
  ReceiptText,
  Split
} from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'VALIDATION MÉTIER ANONYMISÉE · 16-08-2026',
    title: 'Cas pilote relationnel : transfert CHF/CFA',
    intro: 'Cette lecture applique le modèle à un schéma de transfert réel documenté, sans afficher de montant, référence de transaction, moyen de paiement, bénéficiaire ou reçu.',
    operation: 'Opération de transfert',
    operationBody: 'Porte la date, le prestataire, le montant et la devise d’origine ainsi que le montant et la devise effectivement livrés.',
    elements: [
      ['Taux appliqué', 'Calculé ou indiqué par le prestataire pour cette opération. Il est conservé avec elle et exclut les frais séparés.', BadgeDollarSign],
      ['Taux TFX de référence', 'Valeur datée issue de la source TFX. Elle sert à comparer et expliquer un écart, jamais à réécrire l’opération.', GitCompareArrows],
      ['Frais de transfert', 'Coût distinct rattaché à l’opération. Il ne doit être ni absorbé dans le taux ni confondu avec le montant livré.', ReceiptText],
      ['Preuve GED', 'Le reçu reste dans la GED et l’écriture conserve une référence documentaire gouvernée, pas le fichier sensible dans le frontend.', FileCheck2]
    ],
    allocationTitle: 'Ventilation après transfert',
    allocationBody: 'Un transfert peut financer plusieurs dépenses ou destinations autorisées. Chaque ligne de ventilation garde son montant, son objet métier, son responsable et sa preuve sans dupliquer le transfert.',
    chain: ['Transfert', 'Ventilation', 'Dépense ou destination', 'Objet métier'],
    privacyTitle: 'Données conservées hors de cette vue',
    privacy: ['Montants et références de transaction', 'Bénéficiaire et moyen de paiement', 'Reçu et pièces justificatives', 'Affectations nominatives soumises aux droits'],
    rule: 'Lecture validée : 1 transfert → 1 taux appliqué, 0 ou plusieurs frais, 1 ou plusieurs preuves et 1 ou plusieurs ventilations. Un taux TFX daté est une référence de comparaison indépendante.'
  },
  EN: {
    eyebrow: 'ANONYMISED BUSINESS VALIDATION · 16 AUG 2026',
    title: 'Relational pilot case: CHF/CFA transfer',
    intro: 'This view applies the model to a documented real transfer pattern without displaying an amount, transaction reference, payment instrument, beneficiary or receipt.',
    operation: 'Transfer operation',
    operationBody: 'Carries the date, provider, original amount and currency, and the amount and currency actually delivered.',
    elements: [
      ['Applied rate', 'Calculated or stated by the provider for this operation. It is retained with the operation and excludes separately charged fees.', BadgeDollarSign],
      ['Reference TFX rate', 'Dated value from the TFX source. It supports comparison and variance explanation and never rewrites the operation.', GitCompareArrows],
      ['Transfer fee', 'A distinct cost linked to the operation. It must not be absorbed into the rate or confused with the delivered amount.', ReceiptText],
      ['DMS evidence', 'The receipt remains in the DMS, while the entry keeps a governed document reference rather than the sensitive file in the frontend.', FileCheck2]
    ],
    allocationTitle: 'Allocation after transfer',
    allocationBody: 'One transfer can fund several authorised expenses or destinations. Each allocation line retains its amount, business object, owner and evidence without duplicating the transfer.',
    chain: ['Transfer', 'Allocation', 'Expense or destination', 'Business object'],
    privacyTitle: 'Data retained outside this view',
    privacy: ['Amounts and transaction references', 'Beneficiary and payment instrument', 'Receipt and supporting documents', 'Named assignments subject to access rights'],
    rule: 'Validated reading: 1 transfer → 1 applied rate, 0 or more fees, 1 or more evidence items and 1 or more allocations. A dated TFX rate is an independent comparison reference.'
  },
  DE: {
    eyebrow: 'ANONYMISIERTE FACHLICHE VALIDIERUNG · 16.08.2026',
    title: 'Relationaler Pilotfall: CHF/CFA-Transfer',
    intro: 'Diese Ansicht wendet das Modell auf ein dokumentiertes reales Transfermuster an, ohne Betrag, Transaktionsreferenz, Zahlungsmittel, begünstigte Person oder Beleg anzuzeigen.',
    operation: 'Transfervorgang',
    operationBody: 'Enthält Datum, Dienstleister, Ursprungsbetrag und -währung sowie den tatsächlich gelieferten Betrag und dessen Währung.',
    elements: [
      ['Angewandter Kurs', 'Vom Dienstleister für diesen Vorgang berechnet oder angegeben. Er bleibt beim Vorgang und schließt separat berechnete Gebühren aus.', BadgeDollarSign],
      ['TFX-Referenzkurs', 'Datierter Wert aus der TFX-Quelle. Er dient dem Vergleich und der Erklärung einer Abweichung und schreibt den Vorgang nie um.', GitCompareArrows],
      ['Transfergebühr', 'Getrennter, mit dem Vorgang verknüpfter Aufwand. Er darf weder im Kurs aufgehen noch mit dem gelieferten Betrag verwechselt werden.', ReceiptText],
      ['DMS-Nachweis', 'Der Beleg bleibt im DMS; die Buchung enthält eine gesteuerte Dokumentreferenz statt der sensiblen Datei im Frontend.', FileCheck2]
    ],
    allocationTitle: 'Zuordnung nach dem Transfer',
    allocationBody: 'Ein Transfer kann mehrere genehmigte Ausgaben oder Ziele finanzieren. Jede Zuordnungszeile behält Betrag, Fachobjekt, verantwortliche Rolle und Nachweis, ohne den Transfer zu duplizieren.',
    chain: ['Transfer', 'Zuordnung', 'Ausgabe oder Ziel', 'Fachobjekt'],
    privacyTitle: 'Außerhalb dieser Ansicht aufbewahrte Daten',
    privacy: ['Beträge und Transaktionsreferenzen', 'Begünstigte Person und Zahlungsmittel', 'Beleg und Nachweisdokumente', 'Namentliche Zuordnungen gemäß Zugriffsrechten'],
    rule: 'Bestätigte Lesart: 1 Transfer → 1 angewandter Kurs, 0 oder mehrere Gebühren, 1 oder mehrere Nachweise und 1 oder mehrere Zuordnungen. Ein datierter TFX-Kurs ist eine unabhängige Vergleichsreferenz.'
  }
};

const TfxRelationPilot = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section className="m3s-panel p-4 sm:p-5" aria-labelledby="tfx-relation-pilot-title">
      <div className="flex items-start gap-3">
        <Network size={22} className="mt-0.5 shrink-0" style={{ color: 'var(--m3s-row-accent)' }} aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase" style={{ color: 'var(--m3s-row-accent)' }}>{t.eyebrow}</p>
          <h4 id="tfx-relation-pilot-title" className="m3s-panel-title mt-2 text-lg">{t.title}</h4>
          <p className="mt-2 max-w-5xl text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{t.intro}</p>
        </div>
      </div>

      <div className="mt-5 border p-4" style={{ borderColor: 'var(--m3s-border)', background: 'var(--m3s-surface-raised)' }}>
        <div className="flex items-start gap-3">
          <Landmark size={20} className="mt-0.5 shrink-0" style={{ color: 'var(--m3s-row-accent)' }} aria-hidden="true" />
          <div>
            <h5 className="m3s-panel-title">{t.operation}</h5>
            <p className="mt-2 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{t.operationBody}</p>
          </div>
        </div>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        {t.elements.map(([title, body, Icon]) => (
          <article key={title} className="border p-4 transition hover:-translate-y-0.5" style={{ borderColor: 'var(--m3s-border)', background: 'var(--m3s-surface-raised)' }}>
            <div className="flex items-start gap-3">
              <Icon size={19} className="mt-0.5 shrink-0" style={{ color: 'var(--m3s-row-accent)' }} aria-hidden="true" />
              <div className="min-w-0">
                <h5 className="m3s-panel-title">{title}</h5>
                <p className="mt-2 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{body}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-[1.35fr_0.65fr]">
        <section className="border p-4" style={{ borderColor: 'var(--m3s-border)', background: 'var(--m3s-surface-raised)' }} aria-labelledby="tfx-allocation-title">
          <h5 id="tfx-allocation-title" className="m3s-panel-title flex items-center gap-2"><Split size={19} aria-hidden="true" />{t.allocationTitle}</h5>
          <p className="mt-2 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{t.allocationBody}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-4">
            {t.chain.map((item, index) => (
              <React.Fragment key={item}>
                <div className="flex min-h-12 items-center justify-center border px-3 py-2 text-center text-xs font-semibold" style={{ borderColor: 'var(--m3s-border-strong)', color: 'var(--m3s-text-primary)' }}>{item}</div>
                {index < t.chain.length - 1 && <ArrowRight className="mx-auto rotate-90 sm:hidden" size={16} style={{ color: 'var(--m3s-text-secondary)' }} aria-hidden="true" />}
              </React.Fragment>
            ))}
          </div>
        </section>

        <aside className="border p-4" style={{ borderColor: 'var(--m3s-border)', background: 'var(--m3s-surface-raised)' }} aria-labelledby="tfx-privacy-title">
          <h5 id="tfx-privacy-title" className="m3s-panel-title flex items-center gap-2"><LockKeyhole size={19} aria-hidden="true" />{t.privacyTitle}</h5>
          <ul className="mt-3 space-y-2 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>
            {t.privacy.map(item => <li key={item} className="flex gap-2"><span aria-hidden="true">•</span><span>{item}</span></li>)}
          </ul>
        </aside>
      </div>

      <p className="mt-4 border-l-2 pl-3 text-xs leading-5" style={{ borderColor: 'var(--m3s-row-accent)', color: 'var(--m3s-text-secondary)' }}>{t.rule}</p>
    </section>
  );
};

export default TfxRelationPilot;
