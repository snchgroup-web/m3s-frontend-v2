import { translateFinanceDescription as translate } from './financeDescriptionTranslation';

test.each([
  ['Vente produits', 'Product sales', 'Produktverkauf'],
  ['Donation', 'Donation', 'Spende'],
  ['Services', 'Services', 'Dienstleistungen'],
  ['Loyer bureau', 'Office rent', 'Büromiete'],
  ['Salaires', 'Salaries', 'Gehälter'],
  ['Fournitures', 'Supplies', 'Materialien'],
  ['Cotisation', 'Contribution', 'Beitrag'],
  ['Remboursement Immo 2SG, Personne QA', 'Property investment repayment 2SG, Personne QA', 'Rückzahlung Immobilieninvestition 2SG, Personne QA'],
  ['Préfinancement Raccordement Electricité', 'Electricity connection pre-financing', 'Vorfinanzierung Stromanschluss'],
  ['Abonnement DEMO, 5 USD / INV-TEST', 'Subscription DEMO, 5 USD / INV-TEST', 'Abonnement DEMO, 5 USD / INV-TEST'],
  ['Remboursement abonnement DEMO - 1,23 CHF', 'Subscription refund DEMO - 1,23 CHF', 'Abonnementrückerstattung DEMO - 1,23 CHF'],
  ['  frais de transaction : REF-QA 42 CFA', '  Transaction fees : REF-QA 42 CFA', '  Transaktionsgebühren : REF-QA 42 CFA'],
  ['SERVIces : DEMO', 'Services : DEMO', 'Dienstleistungen : DEMO'],
  ['Raccordement Réseau Electrique Villa', 'Villa electricity connection', 'Stromanschluss Villa'],
  ['Paiement Travaux de Plomberie et Aménagement Cuisine', 'Payment for plumbing and kitchen fitting', 'Zahlung für Sanitärarbeiten und Küchenausbau'],
  ['Achat Dockingstation DEMO USB-C G5', 'Docking station purchase DEMO USB-C G5', 'Kauf Dockingstation DEMO USB-C G5'],
  ['Notification Mairie, Parcelle TEST-123', 'Municipal notification, Parcelle TEST-123', 'Mitteilung der Gemeindeverwaltung, Parcelle TEST-123'],
  ['Domaine, E-Mail, Hebergement Site Web DEMO', 'Domain, email, website hosting DEMO', 'Domain, E-Mail, Webhosting DEMO'],
  ['Location Entrepot TEST, Adresse fictive', 'Warehouse rental TEST, Adresse fictive', 'Lagermiete TEST, Adresse fictive'],
  ['Depot Location Entrepot TEST', 'Warehouse rental deposit TEST', 'Mietkaution Lager TEST'],
  ['Souris sans fil DEMO M220', 'Wireless mouse DEMO M220', 'Kabellose Maus DEMO M220'],
  ['Mètre Ruban', 'Tape measure', 'Massband'],
  ['Mètre Ruban, 50 cm', 'Tape measure, 50 cm', 'Massband, 50 cm'],
  ['Participation Personne QA Budget Famille SN (TEST)', 'Contribution Personne QA to family budget SN (TEST)', 'Beitrag Personne QA zum Familienbudget SN (TEST)'],
  ['Phase 1,Gros Œuvres, REF-QA, SN', 'Phase 1,Structural works, REF-QA, SN', 'Phase 1,Rohbau, REF-QA, SN'],
  ['Phase 2, 2nds Oeuvres, REF-QA', 'Phase 2, Finishing works, REF-QA', 'Phase 2, Ausbau, REF-QA'],
  ['DEMO Système de Gestion CRM ERP x 5', 'DEMO Management system CRM ERP x 5', 'DEMO Managementsystem CRM ERP x 5']
])('translates a bounded source phrase and preserves its opaque suffix: %s', (source, EN, DE) => {
  expect(translate(source, 'FR')).toBe(source);
  expect(translate(source, 'EN')).toBe(EN);
  expect(translate(source, 'DE')).toBe(DE);
});

test.each([null, undefined, '', 'Texte libre inconnu', 'HP Chromebook TEST', 'ServicesPlus', 'Services Plus', 'Salaires SA', 'REF-Salaires-123', '<script>Salaires</script>', 'Participation TEST sans structure', 'Phase 3, Interruption'])('retains unknown input without guessing: %s', source => {
  for (const language of ['FR', 'DE', 'EN', 'XX']) expect(translate(source, language)).toBe(source);
});

test('does not change the source object or translate opaque suffixes', () => {
  const row = Object.freeze({ description: 'Abonnement Salaires, REF-123, 5 USD', ref: 'REF-123', amount: 5 });
  expect(translate(row.description, 'EN')).toBe('Subscription Salaires, REF-123, 5 USD');
  expect(row.description).toBe('Abonnement Salaires, REF-123, 5 USD');
  expect(translate(row.description, 'XX')).toBe(row.description);
});
