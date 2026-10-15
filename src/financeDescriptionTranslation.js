// Presentation vocabulary: Finance categories, glossary and legacy register labels.
// Only recognised leading phrases are translated; the remaining source text is opaque.
const phrases = [
  ['Vente produits', 'Product sales', 'Produktverkauf'],
  ['Donation', 'Donation', 'Spende'],
  ['Services', 'Services', 'Dienstleistungen'],
  ['Loyer bureau', 'Office rent', 'Büromiete'],
  ['Salaires', 'Salaries', 'Gehälter'],
  ['Fournitures', 'Supplies', 'Materialien'],
  ['Remboursement Immo', 'Property investment repayment', 'Rückzahlung Immobilieninvestition'],
  ['Remboursement investissement immobilier', 'Property investment repayment', 'Rückzahlung Immobilieninvestition'],
  ['Remboursement caution loyer', 'Rental deposit refund', 'Rückerstattung Mietkaution'],
  ['Préfinancement Raccordement Electricité', 'Electricity connection pre-financing', 'Vorfinanzierung Stromanschluss'],
  ['Financement', 'Funding', 'Finanzierung'],
  ['Cotisation', 'Contribution', 'Beitrag'],
  ['Don en nature', 'In-kind donation', 'Sachspende'],
  ['Abonnement', 'Subscription', 'Abonnement'],
  ['Remboursement abonnement', 'Subscription refund', 'Abonnementrückerstattung'],
  ['Frais de transaction', 'Transaction fees', 'Transaktionsgebühren'],
  ['Frais administratifs', 'Administrative fees', 'Verwaltungsgebühren'],
  ['Raccordement Réseau Electrique Villa', 'Villa electricity connection', 'Stromanschluss Villa'],
  ['Paiement Travaux de Plomberie et Aménagement Cuisine', 'Payment for plumbing and kitchen fitting', 'Zahlung für Sanitärarbeiten und Küchenausbau'],
  ['Ajustement Paiement Trav. de Plomb. et Amén. Cuisine', 'Adjustment of plumbing and kitchen fitting payment', 'Korrektur der Zahlung für Sanitärarbeiten und Küchenausbau'],
  ['Paiement Expertise bâtiment', 'Payment for building assessment', 'Zahlung für Gebäudegutachten'],
  ['Paiement reliquat Transport Equip. Dom.', 'Balance payment for household equipment transport', 'Restzahlung für Transport von Haushaltsausstattung'],
  ['Acompte Transport Equip Domestique', 'Advance for household equipment transport', 'Anzahlung für Transport von Haushaltsausstattung'],
  ['Matériel Emballage Equip. Domestique', 'Packing materials for household equipment', 'Verpackungsmaterial für Haushaltsausstattung'],
  ['Reforage du Puits', 'Well re-drilling', 'Nachbohrung des Brunnens'],
  ['Notification Mairie', 'Municipal notification', 'Mitteilung der Gemeindeverwaltung'],
  ['Système Solaire Bâtiment', 'Building solar system', 'Solaranlage Gebäude'],
  ['Pompe Solaire', 'Solar pump', 'Solarpumpe'],
  ['Domaine, E-Mail, Hebergement Site Web', 'Domain, email, website hosting', 'Domain, E-Mail, Webhosting'],
  ['Achat Dockingstation', 'Docking station purchase', 'Kauf Dockingstation'],
  ['Achat Matelas Equip Dom', 'Mattress purchase for household equipment', 'Matratzenkauf für Haushaltsausstattung'],
  ['Lot de vêtements H/F/E', 'Clothing lot H/F/E', 'Kleiderposten H/F/E'],
  ['Lot de Chaussures', 'Shoe lot', 'Schuhposten'],
  ['Brosse à Dents Electrique', 'Electric toothbrush', 'Elektrische Zahnbürste'],
  ['Serviettes de bain', 'Bath towels', 'Badetücher'],
  ['Chaise longue à trois pieds', 'Three-legged sun lounger', 'Dreibeinige Sonnenliege'],
  ['Souris sans fil', 'Wireless mouse', 'Kabellose Maus'],
  ['Fauteuil Bureau', 'Office chair', 'Bürostuhl'],
  ['Sofa-Lit', 'Sofa bed', 'Bettsofa'],
  ['Machine à plastifier', 'Laminator', 'Laminiergerät'],
  ['Spray d’Entretien pour Meubles', 'Furniture care spray', 'Möbelpflegespray'],
  ['Film Etirable', 'Stretch film', 'Stretchfolie'],
  ['Housse Sofa', 'Sofa cover', 'Sofabezug'],
  ['Etiquetteuse', 'Label printer', 'Beschriftungsgerät'],
  ['Camion à Plateau', 'Platform truck', 'Plattformwagen'],
  ['Chariot Plateforme', 'Platform trolley', 'Plattformwagen'],
  ['Scanner Code Barre', 'Barcode scanner', 'Barcodescanner'],
  ['Rouleau Film à Bulles Emballage', 'Bubble wrap roll', 'Luftpolsterfolienrolle'],
  ['Carburant Voiture', 'Vehicle fuel', 'Fahrzeugtreibstoff'],
  ['Disposition et Shipping Container', 'Container handling and shipping', 'Containerabwicklung und Versand'],
  ['Dédouanement Container', 'Container customs clearance', 'Containerverzollung'],
  ['Marchandises Export', 'Export goods', 'Exportwaren'],
  ['Frais de Bornage et prem. Déclaration Mairie', 'Land survey and initial municipal declaration fees', 'Gebühren für Grenzvermessung und erste Gemeindemeldung'],
  ['Depot Location Entrepot', 'Warehouse rental deposit', 'Mietkaution Lager'],
  ['Location Entrepot', 'Warehouse rental', 'Lagermiete'],
  ['Visseuse - Devisseuse Sans-Fil', 'Cordless drill driver', 'Akku-Bohrschrauber'],
  ['Dérouleur Manuel', 'Manual dispenser', 'Handabroller'],
  ['Caisse à Outils Vide', 'Empty toolbox', 'Leerer Werkzeugkasten'],
  ['Mètre Ruban', 'Tape measure', 'Massband'],
  ['Set de Tournevis', 'Screwdriver set', 'Schraubendreherset'],
  ['Set de Ciseaux', 'Scissor set', 'Scherenset']
];

const normalise = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/’/g, "'").replace(/œ/gi, 'oe').toLowerCase();
const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const standaloneLabels = new Set(['Vente produits', 'Donation', 'Services', 'Loyer bureau', 'Salaires', 'Fournitures']);
const rules = phrases.map(([source, EN, DE]) => ({
  pattern: new RegExp(`^${escapeRegex(normalise(source)).replace(/ +/g, '\\s+')}${standaloneLabels.has(source) ? '(?=\\s*(?:$|[-,;:]))' : '(?=$|[\\s,;:(+])'}`),
  EN, DE
})).sort((a, b) => b.pattern.source.length - a.pattern.source.length);

export function translateFinanceDescription(value, language = 'FR') {
  if (typeof value !== 'string' || !['EN', 'DE'].includes(language)) return value;
  const trimmed = value.trimStart();
  const leadingSpace = value.slice(0, value.length - trimmed.length);
  // Normalisation changes offsets: find the end in the original before retaining its suffix.
  const normalised = normalise(trimmed);
  const rule = rules.find(candidate => candidate.pattern.test(normalised));
  if (rule) {
    const matched = normalised.match(rule.pattern)[0];
    let end = 0;
    while (end < trimmed.length && normalise(trimmed.slice(0, end)).length < matched.length) end += 1;
    while (end < trimmed.length && /[\u0300-\u036f]/.test(trimmed[end])) end += 1;
    return leadingSpace + rule[language] + trimmed.slice(end);
  }
  const budget = trimmed.match(/^Participation\s+(.+?)\s+Budget Famille(\s+.*)?$/i);
  if (budget) return leadingSpace + (language === 'DE'
    ? `Beitrag ${budget[1]} zum Familienbudget${budget[2] || ''}`
    : `Contribution ${budget[1]} to family budget${budget[2] || ''}`);
  const phase = trimmed.match(/^(Phase\s+\d+\s*,\s*)(Gros [ŒO]e?uvres|2nds [ŒO]e?uvres)(?=\s*[,;]|$)(.*)$/i);
  if (phase) return leadingSpace + phase[1] + (language === 'DE'
    ? (/^gros/i.test(phase[2]) ? 'Rohbau' : 'Ausbau')
    : (/^gros/i.test(phase[2]) ? 'Structural works' : 'Finishing works')) + phase[3];
  const system = trimmed.match(/^(.+?)(\s+)Système de [Gg]estion(\s+CRM.*)$/);
  if (system) return leadingSpace + system[1] + system[2] + (language === 'DE' ? 'Managementsystem' : 'Management system') + system[3];
  return value;
}
