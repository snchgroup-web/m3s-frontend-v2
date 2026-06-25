import React, { useMemo, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, BarChart, Bar } from 'recharts';
import { Plus, Edit2, Trash2, Users, TrendingUp, Gift, Target, HeartHandshake } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { ModulePageTabs, ChildTabPlaceholder } from './moduleTabs';
import LocalizedDateInput from './LocalizedDateInput';
import TableControls from './TableControls';

const prospectsSeed = [
  { id: 'PRO-GSP-001', nom: 'Migros Bio Suisse', pays: 'CH', interet: 'Import produits SN', potentielChf: 25000, etape: 'Qualification', agent: 'Cheikh', dateContact: '2025-09-01' },
  { id: 'PRO-GSP-002', nom: 'Coop Bale - Import exotique', pays: 'CH', interet: 'Epices et condiments', potentielChf: 18000, etape: 'Prise de contact', agent: 'Chantal', dateContact: '2025-10-15' },
  { id: 'PRO-GSP-003', nom: 'Carrefour Market Dakar', pays: 'SN', interet: 'Distribution produits CH', potentielChf: 8000, etape: 'Negociation', agent: 'Pape', dateContact: '2026-01-20' },
  { id: 'PRO-GSP-004', nom: 'Africa Food Network', pays: 'FR', interet: 'Partenariat distribution', potentielChf: 15000, etape: 'Qualification', agent: 'Cheikh', dateContact: '2025-11-01' },
  { id: 'PRO-GSP-005', nom: 'Fondation ADB Developpement', pays: 'SN', interet: 'Financement projets sociaux', potentielChf: 50000, etape: 'Prise de contact', agent: 'Cheikh', dateContact: '2026-02-01' },
  { id: 'PRO-GSP-006', nom: 'Swiss Development Corp', pays: 'CH', interet: 'Cooperation internationale', potentielChf: 30000, etape: 'En veille', agent: 'Chantal', dateContact: '2025-07-01' }
];

const clientsSeed = [
  { id: 'CLI-GSP-001', nom: 'Spar Genf AG', pays: 'CH', type: 'Distributeur', contact: 'info@spar-genf.ch', bu: 'IMPORT_EXPORT', caChf: 12500, caCfa: 8375000, statut: 'Actif', dateDebut: '2022-03-01', agent: 'Cheikh' },
  { id: 'CLI-GSP-002', nom: 'Bio-Marche Zurich', pays: 'CH', type: 'Revendeur', contact: 'contact@biomarche-zh.ch', bu: 'IMPORT_EXPORT', caChf: 8200, caCfa: 5494000, statut: 'Actif', dateDebut: '2023-01-15', agent: 'Cheikh' },
  { id: 'CLI-GSP-003', nom: 'Familia Supermarkt', pays: 'CH', type: 'Distributeur', contact: 'achats@familia.ch', bu: 'IMPORT_EXPORT', caChf: 5400, caCfa: 3618000, statut: 'Actif', dateDebut: '2023-06-01', agent: 'Chantal' },
  { id: 'CLI-GSP-004', nom: 'African Food Shop Basel', pays: 'CH', type: 'Boutique specialisee', contact: 'africanfood@bluewin.ch', bu: 'IMPORT_EXPORT', caChf: 3800, caCfa: 2546000, statut: 'Actif', dateDebut: '2024-02-01', agent: 'Cheikh' },
  { id: 'CLI-GSP-005', nom: 'Restaurant La Savane', pays: 'CH', type: 'Restaurant', contact: 'info@lasavane.ch', bu: 'IMPORT_EXPORT', caChf: 2200, caCfa: 1474000, statut: 'Actif', dateDebut: '2024-05-01', agent: 'Cheikh' },
  { id: 'CLI-GSP-006', nom: 'Marche Sandaga - Rufisque', pays: 'SN', type: 'Marche local', contact: '-', bu: 'SOCIAL', caChf: 1800, caCfa: 1207800, statut: 'Actif', dateDebut: '2021-01-01', agent: 'Ibou' },
  { id: 'CLI-GSP-007', nom: 'Cooperative Femmes Rufisque', pays: 'SN', type: 'Cooperative', contact: 'coop.femmes@rufisque.sn', bu: 'SOCIAL', caChf: 950, caCfa: 636500, statut: 'Actif', dateDebut: '2022-06-01', agent: 'Gnilane N.' },
  { id: 'CLI-GSP-008', nom: 'Hotel Lamantin Beach', pays: 'SN', type: 'Hotel', contact: 'achats@lamantin-beach.com', bu: 'IMPORT_EXPORT', caChf: 4100, caCfa: 2747000, statut: 'Prospect', dateDebut: '2025-11-01', agent: 'Pape' }
];

const beneficiairesSeed = [
  { id: 'BEN-GSP-001', nom: 'Famille Ndiaye - Dakar', pays: 'SN', typeAide: 'Aide Sociale', montantChf: 2400, montantCfa: 1608000, date: '2023-12-15', statut: 'Regulier', agent: 'Cheikh', commentaire: 'Soutien mensuel menage SN' },
  { id: 'BEN-GSP-002', nom: 'Famille Diouf - Rufisque', pays: 'SN', typeAide: 'Aide alimentaire', montantChf: 800, montantCfa: 536000, date: '2024-03-01', statut: 'Regulier', agent: 'Gnilane N.', commentaire: 'Programme aide COVID' },
  { id: 'BEN-GSP-003', nom: 'Marche Sandaga - Femmes artisanes', pays: 'SN', typeAide: 'Commerce Equitable', montantChf: 1500, montantCfa: 1005000, date: '2024-06-01', statut: 'Actif', agent: 'Ibou', commentaire: '8 femmes artisanes soutenues' },
  { id: 'BEN-GSP-004', nom: 'Ecole primaire Lac Rose', pays: 'SN', typeAide: 'Don Materiel', montantChf: 600, montantCfa: 402000, date: '2024-09-01', statut: 'Unique', agent: 'Pape', commentaire: 'Fournitures scolaires' },
  { id: 'BEN-GSP-005', nom: 'Association jeunes Lac Rose', pays: 'SN', typeAide: 'Accompagnement', montantChf: 400, montantCfa: 268000, date: '2025-01-10', statut: 'Actif', agent: 'Ibou', commentaire: 'Formation et orientation' },
  { id: 'BEN-GSP-006', nom: 'Menage Ndiaye - Soutien famille', pays: 'SN', typeAide: 'Soutien Famille', montantChf: 18783, montantCfa: 12584610, date: '2019-06-01', statut: 'Clos', agent: 'Cheikh', commentaire: 'Flux social reclassifie V3' },
  { id: 'BEN-GSP-007', nom: 'Seniors Rufisque', pays: 'SN', typeAide: 'Aide Sociale', montantChf: 300, montantCfa: 201000, date: '2025-03-01', statut: 'Actif', agent: 'Gnilane N.', commentaire: 'Paniers alimentaires mensuel' }
];

const donsSeed = [
  { id: 'DON-GSP-001', date: '2019-11-04', donateur: 'Pape SN', nature: 'Don Materiel', montantChf: 299, montantCfa: 173299, destination: 'Equipe TZH', bu: 'ADMIN_ORG', statut: 'Recu', commentaire: 'Laptop HP enregistre stocks' },
  { id: 'DON-GSP-002', date: '2022-10-01', donateur: 'Cheikh Ndiaye (perso)', nature: 'Apport en capital', montantChf: 5000, montantCfa: 3042500, destination: 'Tresorerie 2SG', bu: 'ADMIN_ORG', statut: 'Recu', commentaire: 'Apport personnel fondateur' },
  { id: 'DON-GSP-003', date: '2023-05-15', donateur: 'Famille Loffler', nature: 'Don en nature', montantChf: 850, montantCfa: 554250, destination: 'Equipe TSN', bu: 'SOCIAL', statut: 'Recu', commentaire: 'Vetements et materiel scolaire' },
  { id: 'DON-GSP-004', date: '2024-03-20', donateur: 'Association Amitie CH-SN', nature: 'Subvention', montantChf: 2500, montantCfa: 1592500, destination: 'Projet IMMO LRSN', bu: 'IMMO', statut: 'Recu', commentaire: 'Aide pour chantier Lac Rose' },
  { id: 'DON-GSP-005', date: '2024-09-10', donateur: 'Diaspora SN Zurich', nature: 'Collecte diaspora', montantChf: 1800, montantCfa: 1146600, destination: 'Familles SN (Social)', bu: 'SOCIAL', statut: 'Recu', commentaire: 'Collecte evenement communautaire' },
  { id: 'DON-GSP-006', date: '2025-04-05', donateur: 'Entreprise TechPartner ZH', nature: 'Don en nature', montantChf: 1200, montantCfa: 804000, destination: 'Equipement IT equipe', bu: 'TECH_DIGITAL', statut: 'Recu', commentaire: 'PC reconditionne + accessoires' },
  { id: 'DON-GSP-007', date: '2025-11-20', donateur: 'Anonyme - fonds solidarite', nature: 'Don monetaire', montantChf: 500, montantCfa: 335000, destination: 'Aide sociale urgence SN', bu: 'SOCIAL', statut: 'Recu', commentaire: 'Aide urgence medicale famille SN' }
];

const ventesSeed = [
  { id: 'VEN-GSP-001', date: '2024-04-10', designation: 'Vente epices printemps 2024 - 30 kg', client: 'Spar Genf AG', produit: 'Epices & Condiments', montantChf: 1200, bu: 'IMPORT_EXPORT', statut: 'Paye' },
  { id: 'VEN-GSP-002', date: '2024-06-20', designation: 'Vente huiles & essences SN - lot', client: 'Bio-Marche Zurich', produit: 'Produits naturels', montantChf: 650, bu: 'IMPORT_EXPORT', statut: 'Paye' },
  { id: 'VEN-GSP-003', date: '2024-09-05', designation: 'Vente kits artisanaux Noel', client: 'African Food Shop Basel', produit: 'Artisanat', montantChf: 880, bu: 'SOCIAL', statut: 'Paye' },
  { id: 'VEN-GSP-004', date: '2025-02-01', designation: 'Vente marchandises Q1 2025', client: 'Spar Genf AG', produit: 'Epices & Condiments', montantChf: 2100, bu: 'IMPORT_EXPORT', statut: 'Paye' },
  { id: 'VEN-GSP-005', date: '2025-12-01', designation: 'Vente Noel 2025 - panier gourmand', client: 'Bio-Marche Zurich', produit: 'Paniers gourmands', montantChf: 3200, bu: 'IMPORT_EXPORT', statut: 'Paye' }
];

const dictionaries = {
  FR: {
    title: 'CRM - Gestion Commerciale',
    subtitle: 'Prospects, Clients, Ventes, Dons et Beneficiaires',
    overview: "Vue d'ensemble",
    prospects: 'Prospects',
    clients: 'Clients',
    ventes: 'Ventes',
    dons: 'Dons',
    beneficiaires: 'Beneficiaires',
    activeClients: 'Clients actifs',
    activeBeneficiaries: 'Beneficiaires actifs',
    totalDonations: 'Total dons',
    qualifiedProspects: 'Prospects qualifies',
    conversionRate: 'Taux conversion',
    salesPipeline: 'Pipeline prospects',
    donationsByNature: 'Dons par nature',
    aidByType: "Beneficiaires par type d'aide",
    monthlyDonations: 'Dons par annee',
    sourceNotice: 'Base reprise depuis Genspark V4.4.0. Donnees a valider avant import BigQuery definitif.',
    add: 'Ajouter',
    edit: 'Modifier',
    create: 'Creer',
    cancel: 'Annuler',
    actions: 'Actions',
    name: 'Nom',
    country: 'Pays',
    type: 'Type',
    contact: 'Contact',
    status: 'Statut',
    agent: 'Agent',
    date: 'Date',
    donor: 'Donateur',
    nature: 'Nature',
    destination: 'Destination',
    beneficiary: 'Beneficiaire',
    aidType: "Type d'aide",
    comment: 'Commentaire',
    amountChf: 'Montant CHF',
    amountCfa: 'Montant CFA',
    salesChf: 'CA CHF',
    salesCfa: 'CA CFA',
    potentialChf: 'Potentiel CHF',
    interest: 'Interet',
    stage: 'Etape',
    product: 'Produit',
    description: 'Designation',
    fillRequired: 'Veuillez remplir les champs obligatoires',
    localOnly: 'Cette modification reste locale pour le moment. Le schema BigQuery CRM/BENEFICIAIRES doit etre valide avant persistance.'
  },
  EN: {
    title: 'Sales & CRM',
    subtitle: 'Prospects, Clients, Sales, Donations and Beneficiaries',
    overview: 'Overview',
    prospects: 'Prospects',
    clients: 'Clients',
    ventes: 'Sales',
    dons: 'Donations',
    beneficiaires: 'Beneficiaries',
    activeClients: 'Active clients',
    activeBeneficiaries: 'Active beneficiaries',
    totalDonations: 'Total donations',
    qualifiedProspects: 'Qualified prospects',
    conversionRate: 'Conversion rate',
    salesPipeline: 'Prospect pipeline',
    donationsByNature: 'Donations by nature',
    aidByType: 'Beneficiaries by aid type',
    monthlyDonations: 'Donations by year',
    sourceNotice: 'Baseline imported from Genspark V4.4.0. Data must be validated before final BigQuery import.',
    add: 'Add',
    edit: 'Edit',
    create: 'Create',
    cancel: 'Cancel',
    actions: 'Actions',
    name: 'Name',
    country: 'Country',
    type: 'Type',
    contact: 'Contact',
    status: 'Status',
    agent: 'Agent',
    date: 'Date',
    donor: 'Donor',
    nature: 'Nature',
    destination: 'Destination',
    beneficiary: 'Beneficiary',
    aidType: 'Aid type',
    comment: 'Comment',
    amountChf: 'Amount CHF',
    amountCfa: 'Amount CFA',
    salesChf: 'Revenue CHF',
    salesCfa: 'Revenue CFA',
    potentialChf: 'Potential CHF',
    interest: 'Interest',
    stage: 'Stage',
    product: 'Product',
    description: 'Description',
    fillRequired: 'Please fill in the required fields',
    localOnly: 'This change remains local for now. The CRM/BENEFICIARIES BigQuery schema must be validated before persistence.'
  },
  DE: {
    title: 'Marketing & CRM',
    subtitle: 'Interessenten, Kunden, Verkaufe, Spenden und Begunstigte',
    overview: 'Ubersicht',
    prospects: 'Interessenten',
    clients: 'Kunden',
    ventes: 'Verkaufe',
    dons: 'Spenden',
    beneficiaires: 'Begunstigte',
    activeClients: 'Aktive Kunden',
    activeBeneficiaries: 'Aktive Begunstigte',
    totalDonations: 'Gesamtspenden',
    qualifiedProspects: 'Qualifizierte Interessenten',
    conversionRate: 'Konversionsrate',
    salesPipeline: 'Interessenten-Pipeline',
    donationsByNature: 'Spenden nach Art',
    aidByType: 'Begunstigte nach Hilfetyp',
    monthlyDonations: 'Spenden nach Jahr',
    sourceNotice: 'Basis aus Genspark V4.4.0 ubernommen. Daten vor dem endgultigen BigQuery-Import validieren.',
    add: 'Hinzufugen',
    edit: 'Bearbeiten',
    create: 'Erstellen',
    cancel: 'Abbrechen',
    actions: 'Aktionen',
    name: 'Name',
    country: 'Land',
    type: 'Typ',
    contact: 'Kontakt',
    status: 'Status',
    agent: 'Agent',
    date: 'Datum',
    donor: 'Spender',
    nature: 'Art',
    destination: 'Ziel',
    beneficiary: 'Begunstigter',
    aidType: 'Hilfetyp',
    comment: 'Kommentar',
    amountChf: 'Betrag CHF',
    amountCfa: 'Betrag CFA',
    salesChf: 'Umsatz CHF',
    salesCfa: 'Umsatz CFA',
    potentialChf: 'Potenzial CHF',
    interest: 'Interesse',
    stage: 'Phase',
    product: 'Produkt',
    description: 'Bezeichnung',
    fillRequired: 'Bitte Pflichtfelder ausfullen',
    localOnly: 'Diese Anderung bleibt vorerst lokal. Das BigQuery-Schema CRM/BENEFICIARIES muss vor der Persistenz validiert werden.'
  }
};

const valueLabels = {
  FR: {
    Actif: 'Actif', Prospect: 'Prospect', Regulier: 'Regulier', Unique: 'Unique', Clos: 'Clos', Recu: 'Recu', Paye: 'Paye',
    Qualification: 'Qualification', 'Prise de contact': 'Prise de contact', Negociation: 'Negociation', 'En veille': 'En veille',
    ADMIN_ORG: 'Administration', IMPORT_EXPORT: 'Commercial & CRM', SOCIAL: 'Social', IMMO: 'Fin Immo', TECH_DIGITAL: 'IT & Support',
    'Don Materiel': 'Don materiel', 'Apport en capital': 'Apport en capital', 'Don en nature': 'Don en nature', Subvention: 'Subvention', 'Collecte diaspora': 'Collecte diaspora', 'Don monetaire': 'Don monetaire'
  },
  EN: {
    Actif: 'Active', Prospect: 'Prospect', Regulier: 'Regular', Unique: 'One-off', Clos: 'Closed', Recu: 'Received', Paye: 'Paid',
    Qualification: 'Qualification', 'Prise de contact': 'Contact started', Negociation: 'Negotiation', 'En veille': 'Monitoring',
    ADMIN_ORG: 'Administration', IMPORT_EXPORT: 'Sales & CRM', SOCIAL: 'Social', IMMO: 'Real Estate Finance', TECH_DIGITAL: 'IT & Support',
    'Don Materiel': 'Material donation', 'Apport en capital': 'Capital contribution', 'Don en nature': 'In-kind donation', Subvention: 'Grant', 'Collecte diaspora': 'Diaspora collection', 'Don monetaire': 'Cash donation'
  },
  DE: {
    Actif: 'Aktiv', Prospect: 'Interessent', Regulier: 'Regelmassig', Unique: 'Einmalig', Clos: 'Geschlossen', Recu: 'Erhalten', Paye: 'Bezahlt',
    Qualification: 'Qualifizierung', 'Prise de contact': 'Kontaktaufnahme', Negociation: 'Verhandlung', 'En veille': 'Beobachtung',
    ADMIN_ORG: 'Administration', IMPORT_EXPORT: 'Marketing & CRM', SOCIAL: 'Soziales', IMMO: 'Immobilienfinanzierung', TECH_DIGITAL: 'IT & Support',
    'Don Materiel': 'Sachspende', 'Apport en capital': 'Kapitaleinlage', 'Don en nature': 'Sachspende', Subvention: 'Subvention', 'Collecte diaspora': 'Diaspora-Sammlung', 'Don monetaire': 'Geldspende'
  }
};

const chartColors = ['#38bdf8', '#34d399', '#f59e0b', '#a78bfa', '#fb7185', '#22d3ee'];

const emptyForm = (type) => ({
  nom: '',
  pays: 'SN',
  type: '',
  contact: '',
  statut: type === 'client' ? 'Actif' : type === 'beneficiaire' ? 'Actif' : type === 'don' ? 'Recu' : 'Prise de contact',
  agent: 'Cheikh',
  date: new Date().toISOString().slice(0, 10),
  montantChf: '',
  montantCfa: '',
  bu: type === 'don' ? 'SOCIAL' : 'IMPORT_EXPORT',
  interet: '',
  etape: 'Prise de contact',
  produit: '',
  designation: '',
  donateur: '',
  nature: 'Don en nature',
  destination: '',
  typeAide: 'Aide Sociale',
  commentaire: ''
});

const numberValue = (value) => Number(value) || 0;

const CRM = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const queryTab = new URLSearchParams(location.search).get('tab');
  const [activeTab, setActiveTab] = useState(['overview', 'prospects', 'clients', 'ventes', 'dons', 'beneficiaires'].includes(queryTab) ? queryTab : 'overview');
  const [prospects, setProspects] = useState(prospectsSeed);
  const [clients, setClients] = useState(clientsSeed);
  const [ventes, setVentes] = useState(ventesSeed);
  const [dons, setDons] = useState(donsSeed);
  const [beneficiaires, setBeneficiaires] = useState(beneficiairesSeed);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('prospect');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm('prospect'));

  React.useEffect(() => {
    setActiveTab(['overview', 'prospects', 'clients', 'ventes', 'dons', 'beneficiaires'].includes(queryTab) ? queryTab : 'overview');
  }, [queryTab]);

  const t = dictionaries[language] || dictionaries.FR;
  const tv = useCallback((value) => valueLabels[language]?.[value] || valueLabels.FR[value] || value, [language]);
  const formatChf = (value) => `${numberValue(value).toLocaleString('fr-CH')} CHF`;
  const formatCfa = (value) => `${Math.round(numberValue(value)).toLocaleString('fr-CH')} CFA`;
  const formatDate = (value) => {
    if (!value) return '-';
    try {
      return new Intl.DateTimeFormat(language === 'DE' ? 'de-DE' : language === 'EN' ? 'en-GB' : 'fr-FR').format(new Date(value));
    } catch {
      return value;
    }
  };

  const totalProspects = prospects.length;
  const prospectsQualifies = prospects.filter((item) => item.etape === 'Qualification' || item.etape === 'Negociation').length;
  const totalClientsActifs = clients.filter((item) => item.statut === 'Actif').length;
  const totalBeneficiairesActifs = beneficiaires.filter((item) => ['Actif', 'Regulier'].includes(item.statut)).length;
  const totalDonsChf = dons.reduce((sum, item) => sum + numberValue(item.montantChf), 0);
  const totalDonsCfa = dons.reduce((sum, item) => sum + numberValue(item.montantCfa), 0);
  const tauxConversion = Math.round((totalClientsActifs / Math.max(1, totalClientsActifs + totalProspects)) * 100);

  const pipelineData = useMemo(() => {
    const stages = ['Prise de contact', 'Qualification', 'Negociation', 'En veille'];
    return stages.map((stage) => ({ name: tv(stage), value: prospects.filter((item) => item.etape === stage).length }));
  }, [prospects, tv]);

  const donationsByNature = useMemo(() => {
    const grouped = {};
    dons.forEach((item) => {
      grouped[item.nature] = (grouped[item.nature] || 0) + numberValue(item.montantChf);
    });
    return Object.entries(grouped).map(([name, value]) => ({ name: tv(name), value }));
  }, [dons, tv]);

  const aidByType = useMemo(() => {
    const grouped = {};
    beneficiaires.forEach((item) => {
      grouped[item.typeAide] = (grouped[item.typeAide] || 0) + 1;
    });
    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }, [beneficiaires]);

  const donationsByYear = useMemo(() => {
    const grouped = {};
    dons.forEach((item) => {
      const year = String(item.date || '').slice(0, 4) || '-';
      grouped[year] = (grouped[year] || 0) + numberValue(item.montantChf);
    });
    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([year, value]) => ({ year, value }));
  }, [dons]);

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingId(item?.id || null);
    setFormData(item ? { ...emptyForm(type), ...item } : emptyForm(type));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData(emptyForm(modalType));
  };

  const saveRecord = () => {
    if (['prospect', 'client', 'beneficiaire'].includes(modalType) && !formData.nom) {
      alert(t.fillRequired);
      return;
    }
    if (modalType === 'don' && (!formData.donateur || !formData.montantChf)) {
      alert(t.fillRequired);
      return;
    }

    const idPrefix = { prospect: 'PRO-LOC', client: 'CLI-LOC', vente: 'VEN-LOC', don: 'DON-LOC', beneficiaire: 'BEN-LOC' }[modalType];
    const nextRecord = { ...formData, id: editingId || `${idPrefix}-${Date.now()}` };

    const updateList = (setter) => setter((current) => (editingId ? current.map((item) => item.id === editingId ? nextRecord : item) : [...current, nextRecord]));

    if (modalType === 'prospect') updateList(setProspects);
    if (modalType === 'client') updateList(setClients);
    if (modalType === 'vente') updateList(setVentes);
    if (modalType === 'don') updateList(setDons);
    if (modalType === 'beneficiaire') updateList(setBeneficiaires);
    closeModal();
  };

  const deleteRecord = (type, id) => {
    if (type === 'prospect') setProspects((current) => current.filter((item) => item.id !== id));
    if (type === 'client') setClients((current) => current.filter((item) => item.id !== id));
    if (type === 'vente') setVentes((current) => current.filter((item) => item.id !== id));
    if (type === 'don') setDons((current) => current.filter((item) => item.id !== id));
    if (type === 'beneficiaire') setBeneficiaires((current) => current.filter((item) => item.id !== id));
  };

  const setField = (field, value) => setFormData((current) => ({ ...current, [field]: value }));

  const KpiCard = ({ label, value, secondary, icon: Icon, color }) => (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-5 transition hover:-translate-y-0.5 hover:border-slate-500">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-300">{label}</p>
          <p className="mt-2 text-2xl font-bold text-white">{value}</p>
          {secondary && <p className="mt-1 text-sm font-semibold text-slate-400">{secondary}</p>}
        </div>
        <Icon size={30} className={color} />
      </div>
    </div>
  );

  const DataTable = ({ type, rows, columns, renderRow }) => (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">{t.sourceNotice}</p>
        <button onClick={() => openModal(type)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
          <Plus size={18} /> {t.add}
        </button>
      </div>
      <TableControls
        rows={rows}
        renderTable={(visibleRows) => (
          <table className="min-w-[1100px] text-sm">
            <thead className="sticky top-0 z-10 bg-slate-700">
              <tr>
                {columns.map((column) => <th key={column} className="px-4 py-3 text-left font-bold text-white">{column}</th>)}
                <th className="px-4 py-3 text-left font-bold text-white">{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((item) => (
                <tr key={item.id} onClick={() => openModal(type, item)} className="cursor-pointer border-t border-slate-700 hover:bg-slate-700/50">
                  {renderRow(item)}
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={(event) => { event.stopPropagation(); openModal(type, item); }} className="rounded p-1 hover:bg-slate-600">
                        <Edit2 size={16} className="text-blue-400" />
                      </button>
                      <button onClick={(event) => { event.stopPropagation(); deleteRecord(type, item.id); }} className="rounded p-1 hover:bg-slate-600">
                        <Trash2 size={16} className="text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      />
    </div>
  );

  const tableCell = (children, className = 'text-slate-300') => <td className={`px-4 py-3 ${className}`}>{children || '-'}</td>;
  const badge = (children) => <span className="inline-flex rounded bg-slate-700 px-2 py-1 text-xs font-semibold text-slate-200">{children}</span>;

  return (
    <>
      <div className="min-h-screen bg-slate-900 p-8">
        <div className="mx-auto w-full max-w-[1800px]">
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-5">
            <KpiCard label={t.activeClients} value={totalClientsActifs} secondary={`${clients.length} ${t.clients}`} icon={Users} color="text-emerald-400" />
            <KpiCard label={t.activeBeneficiaries} value={totalBeneficiairesActifs} secondary={`${beneficiaires.length} ${t.beneficiaires}`} icon={HeartHandshake} color="text-cyan-400" />
            <KpiCard label={t.totalDonations} value={formatChf(totalDonsChf)} secondary={formatCfa(totalDonsCfa)} icon={Gift} color="text-purple-400" />
            <KpiCard label={t.conversionRate} value={`${tauxConversion}%`} secondary={`${totalClientsActifs}/${totalClientsActifs + totalProspects}`} icon={TrendingUp} color="text-orange-400" />
            <KpiCard label={t.qualifiedProspects} value={prospectsQualifies} secondary={`${totalProspects} ${t.prospects}`} icon={Target} color="text-blue-400" />
          </div>

          <ModulePageTabs
            moduleId="commercial"
            language={language}
            activeTab={activeTab}
            onSelect={setActiveTab}
            tabs={[
              { tab: 'overview', label: t.overview },
              { tab: 'prospects', label: `${t.prospects} (${prospects.length})` },
              { tab: 'clients', label: `${t.clients} (${clients.length})` },
              { tab: 'ventes', label: `${t.ventes} (${ventes.length})` },
              { tab: 'dons', label: `${t.dons} (${dons.length})` },
              { tab: 'beneficiaires', label: `${t.beneficiaires} (${beneficiaires.length})` }
            ]}
          />

          {activeTab === 'overview' && (
            <div className="space-y-6">
              <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">{t.sourceNotice}</p>
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
                  <h3 className="mb-4 font-bold text-white">{t.salesPipeline}</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie data={pipelineData} dataKey="value" nameKey="name" outerRadius={92} label={({ name, value }) => `${name}: ${value}`}>
                        {pipelineData.map((entry, index) => <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
                  <h3 className="mb-4 font-bold text-white">{t.donationsByNature}</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={donationsByNature}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} formatter={(value) => formatChf(value)} />
                      <Bar dataKey="value" fill="#a78bfa" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
                  <h3 className="mb-4 font-bold text-white">{t.aidByType}</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie data={aidByType} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} label={({ name, value }) => `${name}: ${value}`}>
                        {aidByType.map((entry, index) => <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
                <h3 className="mb-4 font-bold text-white">{t.monthlyDonations}</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={donationsByYear}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="year" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} formatter={(value) => formatChf(value)} />
                    <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={2} dot={{ r: 4, fill: '#38bdf8' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'prospects' && (
            <DataTable
              type="prospect"
              rows={prospects}
              columns={[t.name, t.country, t.interest, t.potentialChf, t.stage, t.agent]}
              renderRow={(item) => (
                <>
                  {tableCell(<strong>{item.nom}</strong>)}
                  {tableCell(badge(item.pays))}
                  {tableCell(item.interet, 'text-slate-400')}
                  {tableCell(formatChf(item.potentielChf), 'font-bold text-emerald-300')}
                  {tableCell(badge(tv(item.etape)))}
                  {tableCell(item.agent)}
                </>
              )}
            />
          )}

          {activeTab === 'clients' && (
            <DataTable
              type="client"
              rows={clients}
              columns={[t.name, t.country, t.type, t.salesChf, t.salesCfa, t.status, t.agent]}
              renderRow={(item) => (
                <>
                  {tableCell(<strong>{item.nom}</strong>)}
                  {tableCell(badge(item.pays))}
                  {tableCell(item.type)}
                  {tableCell(formatChf(item.caChf), 'font-bold text-emerald-300')}
                  {tableCell(formatCfa(item.caCfa), 'font-semibold text-amber-300')}
                  {tableCell(badge(tv(item.statut)))}
                  {tableCell(item.agent)}
                </>
              )}
            />
          )}

          {activeTab === 'ventes' && (
            <DataTable
              type="vente"
              rows={ventes}
              columns={[t.date, t.description, t.name, t.product, t.amountChf, 'BU', t.status]}
              renderRow={(item) => (
                <>
                  {tableCell(formatDate(item.date))}
                  {tableCell(<strong>{item.designation}</strong>)}
                  {tableCell(item.client)}
                  {tableCell(item.produit)}
                  {tableCell(formatChf(item.montantChf), 'font-bold text-emerald-300')}
                  {tableCell(badge(tv(item.bu)))}
                  {tableCell(badge(tv(item.statut)))}
                </>
              )}
            />
          )}

          {activeTab === 'dons' && (
            <DataTable
              type="don"
              rows={dons}
              columns={[t.date, t.donor, t.nature, t.amountChf, t.amountCfa, t.destination, 'BU', t.status]}
              renderRow={(item) => (
                <>
                  {tableCell(formatDate(item.date))}
                  {tableCell(<strong>{item.donateur}</strong>)}
                  {tableCell(tv(item.nature))}
                  {tableCell(formatChf(item.montantChf), 'font-bold text-emerald-300')}
                  {tableCell(formatCfa(item.montantCfa), 'font-semibold text-amber-300')}
                  {tableCell(item.destination)}
                  {tableCell(badge(tv(item.bu)))}
                  {tableCell(badge(tv(item.statut)))}
                </>
              )}
            />
          )}

          {activeTab === 'beneficiaires' && (
            <DataTable
              type="beneficiaire"
              rows={beneficiaires}
              columns={[t.beneficiary, t.country, t.aidType, t.amountChf, t.amountCfa, t.date, t.status, t.agent]}
              renderRow={(item) => (
                <>
                  {tableCell(<strong>{item.nom}</strong>)}
                  {tableCell(badge(item.pays))}
                  {tableCell(item.typeAide)}
                  {tableCell(formatChf(item.montantChf), 'font-bold text-emerald-300')}
                  {tableCell(formatCfa(item.montantCfa), 'font-semibold text-amber-300')}
                  {tableCell(formatDate(item.date))}
                  {tableCell(badge(tv(item.statut)))}
                  {tableCell(item.agent)}
                </>
              )}
            />
          )}

          <ChildTabPlaceholder moduleId="commercial" language={language} activeTab={activeTab} handledTabs={['overview', 'prospects', 'clients', 'ventes', 'dons', 'beneficiaires']} />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-slate-700 bg-slate-800 p-6">
            <h2 className="mb-2 text-2xl font-bold text-white">{editingId ? t.edit : t.create} {modalType}</h2>
            <p className="mb-6 text-sm text-amber-200">{t.localOnly}</p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {modalType !== 'don' && modalType !== 'vente' && (
                <Field label={t.name} value={formData.nom} onChange={(value) => setField('nom', value)} required />
              )}
              {modalType === 'don' && (
                <Field label={t.donor} value={formData.donateur} onChange={(value) => setField('donateur', value)} required />
              )}
              {modalType === 'vente' && (
                <Field label={t.description} value={formData.designation} onChange={(value) => setField('designation', value)} required />
              )}
              {['client', 'prospect', 'beneficiaire'].includes(modalType) && (
                <SelectField label={t.country} value={formData.pays} onChange={(value) => setField('pays', value)} options={['CH', 'SN', 'FR']} />
              )}
              {modalType === 'client' && (
                <>
                  <Field label={t.type} value={formData.type} onChange={(value) => setField('type', value)} />
                  <Field label={t.contact} value={formData.contact} onChange={(value) => setField('contact', value)} />
                  <Field label={t.salesChf} type="number" value={formData.caChf || ''} onChange={(value) => setField('caChf', value)} />
                  <Field label={t.salesCfa} type="number" value={formData.caCfa || ''} onChange={(value) => setField('caCfa', value)} />
                </>
              )}
              {modalType === 'prospect' && (
                <>
                  <Field label={t.interest} value={formData.interet} onChange={(value) => setField('interet', value)} />
                  <Field label={t.potentialChf} type="number" value={formData.potentielChf || ''} onChange={(value) => setField('potentielChf', value)} />
                  <SelectField label={t.stage} value={formData.etape} onChange={(value) => setField('etape', value)} options={['Prise de contact', 'Qualification', 'Negociation', 'En veille']} translate={tv} />
                </>
              )}
              {modalType === 'vente' && (
                <>
                  <Field label={t.name} value={formData.client || ''} onChange={(value) => setField('client', value)} />
                  <Field label={t.product} value={formData.produit || ''} onChange={(value) => setField('produit', value)} />
                  <Field label={t.amountChf} type="number" value={formData.montantChf || ''} onChange={(value) => setField('montantChf', value)} />
                </>
              )}
              {modalType === 'don' && (
                <>
                  <SelectField label={t.nature} value={formData.nature} onChange={(value) => setField('nature', value)} options={['Don Materiel', 'Apport en capital', 'Don en nature', 'Subvention', 'Collecte diaspora', 'Don monetaire']} translate={tv} />
                  <Field label={t.amountChf} type="number" value={formData.montantChf || ''} onChange={(value) => setField('montantChf', value)} required />
                  <Field label={t.amountCfa} type="number" value={formData.montantCfa || ''} onChange={(value) => setField('montantCfa', value)} />
                  <Field label={t.destination} value={formData.destination || ''} onChange={(value) => setField('destination', value)} />
                </>
              )}
              {modalType === 'beneficiaire' && (
                <>
                  <SelectField label={t.aidType} value={formData.typeAide} onChange={(value) => setField('typeAide', value)} options={['Aide Sociale', 'Aide alimentaire', 'Commerce Equitable', 'Don Materiel', 'Accompagnement', 'Soutien Famille']} />
                  <Field label={t.amountChf} type="number" value={formData.montantChf || ''} onChange={(value) => setField('montantChf', value)} />
                  <Field label={t.amountCfa} type="number" value={formData.montantCfa || ''} onChange={(value) => setField('montantCfa', value)} />
                </>
              )}
              <SelectField label="BU" value={formData.bu || 'SOCIAL'} onChange={(value) => setField('bu', value)} options={['ADMIN_ORG', 'IMPORT_EXPORT', 'SOCIAL', 'IMMO', 'TECH_DIGITAL']} translate={tv} />
              <SelectField label={t.status} value={formData.statut} onChange={(value) => setField('statut', value)} options={['Actif', 'Prospect', 'Regulier', 'Unique', 'Clos', 'Recu', 'Paye']} translate={tv} />
              <Field label={t.agent} value={formData.agent || ''} onChange={(value) => setField('agent', value)} />
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">{t.date}</label>
                <LocalizedDateInput value={formData.date || ''} onChange={(value) => setField('date', value)} className="w-full rounded border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none" />
              </div>
              <div className="md:col-span-2">
                <Field label={t.comment} value={formData.commentaire || ''} onChange={(value) => setField('commentaire', value)} />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={closeModal} className="flex-1 rounded-lg bg-slate-700 px-4 py-2 text-white transition hover:bg-slate-600">{t.cancel}</button>
              <button onClick={saveRecord} className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">{editingId ? t.edit : t.create}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Field = ({ label, value, onChange, type = 'text', required = false }) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-slate-300">{label}{required ? ' *' : ''}</label>
    <input type={type} value={value ?? ''} onChange={(event) => onChange(event.target.value)} className="w-full rounded border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none" />
  </div>
);

const SelectField = ({ label, value, onChange, options, translate = (item) => item }) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-slate-300">{label}</label>
    <select value={value || options[0]} onChange={(event) => onChange(event.target.value)} className="w-full rounded border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none">
      {options.map((option) => <option key={option} value={option}>{translate(option)}</option>)}
    </select>
  </div>
);

export default CRM;
