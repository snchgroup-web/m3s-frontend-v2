import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Plus, Edit2, Trash2, Package, CheckCircle, AlertCircle, Truck } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { ModulePageTabs, ChildTabPlaceholder } from './moduleTabs';
import LocalizedDateInput from './LocalizedDateInput';
import TableControls from './TableControls';
import { api } from './api';
import { StandardActionsCell, StandardRecordSheetModal } from './StandardUI';
import { isLegacyBuCode, translateDas } from './strategicMapping';

const Production = () => {
  const { language } = useLanguage();
  const location = useLocation();

  // Translations
  const translations = {
    FR: {
      title: 'Production & Logistique',
      subtitle: 'Commandes, Fournisseurs et Gestion des Stocks',
      overview: 'Vue d\'ensemble',
      commandes: 'Commandes',
      fournisseurs: 'Fournisseurs',
      stocks: 'Stocks',
      totalCommandes: 'Total Commandes',
      commandesLivrees: 'Commandes Livrées',
      totalFournisseurs: 'Fournisseurs',
      alertStocks: 'Stocks Bas',
      commandesParMois: 'Commandes par Mois',
      stocksParProduit: 'Stocks par Produit',
      numero: 'Numéro',
      client: 'Client',
      produit: 'Produit',
      quantite: 'Quantité',
      statut: 'Statut',
      date: 'Date',
      actions: 'Actions',
      seuil: 'Seuil',
      unite: 'Unité',
      categorie: 'Catégorie',
      pays: 'Pays',
      email: 'Email',
      telephone: 'Téléphone',
      nom: 'Nom',
      nouvelleCommande: 'Nouvelle Commande',
      nouveauFournisseur: 'Nouveau Fournisseur',
      ajouterStock: 'Ajouter Stock',
      nomFournisseur: 'Nom du fournisseur',
      source: 'Source',
      sources: 'Sources',
      lignesDepenses: 'Lignes dépenses',
      lignesStocks: 'Lignes stocks',
      montantChf: 'Montant CHF',
      montantCfa: 'Montant CFA',
      derniereOperation: 'Dernière opération',
      departement: 'Département',
      team: 'Team',
      agent: 'Agent',
      reference: 'Réf.',
      nbReferences: 'Nb références',
      ficheFournisseur: 'Fiche fournisseur',
      registreFournisseurs: 'Registre fournisseurs consolidé depuis Dépenses et Stocks & Actifs.',
      preparationFournisseur: 'Préparer fournisseur',
      aucuneDonnee: 'Aucune donnée fournisseur disponible.',
      voir: 'Voir',
      teamZh: 'Team ZH',
      teamSn: 'Team SN',
      ok: 'OK',
      bas: 'BAS',
      creer: 'Créer',
      modifier: 'Modifier',
      supprimer: 'Supprimer',
      annuler: 'Annuler',
      remplirChamps: 'Veuillez remplir les champs obligatoires'
    },
    EN: {
      title: 'Production & Logistics',
      subtitle: 'Orders, Suppliers and Stock Management',
      overview: 'Overview',
      commandes: 'Orders',
      fournisseurs: 'Suppliers',
      stocks: 'Stock',
      totalCommandes: 'Total Orders',
      commandesLivrees: 'Delivered Orders',
      totalFournisseurs: 'Suppliers',
      alertStocks: 'Low Stock',
      commandesParMois: 'Orders by Month',
      stocksParProduit: 'Stock by Product',
      numero: 'Number',
      client: 'Client',
      produit: 'Product',
      quantite: 'Quantity',
      statut: 'Status',
      date: 'Date',
      actions: 'Actions',
      seuil: 'Threshold',
      unite: 'Unit',
      categorie: 'Category',
      pays: 'Country',
      email: 'Email',
      telephone: 'Phone',
      nom: 'Name',
      nouvelleCommande: 'New Order',
      nouveauFournisseur: 'New Supplier',
      ajouterStock: 'Add Stock',
      nomFournisseur: 'Supplier name',
      source: 'Source',
      sources: 'Sources',
      lignesDepenses: 'Expense lines',
      lignesStocks: 'Stock lines',
      montantChf: 'Amount CHF',
      montantCfa: 'Amount CFA',
      derniereOperation: 'Last operation',
      departement: 'Department',
      team: 'Team',
      agent: 'Agent',
      reference: 'Ref.',
      nbReferences: 'Ref. count',
      ficheFournisseur: 'Supplier record',
      registreFournisseurs: 'Supplier register consolidated from Expenses and Stock & Assets.',
      preparationFournisseur: 'Prepare supplier',
      aucuneDonnee: 'No supplier data available.',
      voir: 'View',
      teamZh: 'Team ZH',
      teamSn: 'Team SN',
      ok: 'OK',
      bas: 'LOW',
      creer: 'Create',
      modifier: 'Edit',
      supprimer: 'Delete',
      annuler: 'Cancel',
      remplirChamps: 'Please fill in all required fields'
    },
    DE: {
      title: 'Produktion & Logistik',
      subtitle: 'Bestellungen, Lieferanten und Lagerverwaltung',
      overview: 'Übersicht',
      commandes: 'Bestellungen',
      fournisseurs: 'Lieferanten',
      stocks: 'Lagerbestand',
      totalCommandes: 'Gesamtbestellungen',
      commandesLivrees: 'Gelieferte Bestellungen',
      totalFournisseurs: 'Lieferanten',
      alertStocks: 'Niedriger Bestand',
      commandesParMois: 'Bestellungen pro Monat',
      stocksParProduit: 'Lagerbestand nach Produkt',
      numero: 'Nummer',
      client: 'Kunde',
      produit: 'Produkt',
      quantite: 'Menge',
      statut: 'Status',
      date: 'Datum',
      actions: 'Aktionen',
      seuil: 'Schwellenwert',
      unite: 'Einheit',
      categorie: 'Kategorie',
      pays: 'Land',
      email: 'E-Mail',
      telephone: 'Telefon',
      nom: 'Name',
      nouvelleCommande: 'Neue Bestellung',
      nouveauFournisseur: 'Neuer Lieferant',
      ajouterStock: 'Bestand hinzufügen',
      nomFournisseur: 'Lieferantenname',
      source: 'Quelle',
      sources: 'Quellen',
      lignesDepenses: 'Ausgabenzeilen',
      lignesStocks: 'Bestandszeilen',
      montantChf: 'Betrag CHF',
      montantCfa: 'Betrag CFA',
      derniereOperation: 'Letzte Buchung',
      departement: 'Abteilung',
      team: 'Team',
      agent: 'Agent',
      reference: 'Ref.',
      nbReferences: 'Anzahl Ref.',
      ficheFournisseur: 'Lieferantendossier',
      registreFournisseurs: 'Lieferantenregister konsolidiert aus Ausgaben und Bestand & Aktiven.',
      preparationFournisseur: 'Lieferant vorbereiten',
      aucuneDonnee: 'Keine Lieferantendaten verfügbar.',
      voir: 'Ansehen',
      teamZh: 'Team ZH',
      teamSn: 'Team SN',
      ok: 'OK',
      bas: 'NIEDRIG',
      creer: 'Erstellen',
      modifier: 'Bearbeiten',
      supprimer: 'Löschen',
      annuler: 'Abbrechen',
      remplirChamps: 'Bitte füllen Sie alle erforderlichen Felder aus'
    }
  };

  const t = translations[language];

  // Data translations
  const dataTranslations = {
    // Status values
    statuses: {
      FR: { 'Livrée': 'Livrée', 'En cours': 'En cours', 'Préparation': 'Préparation' },
      EN: { 'Livrée': 'Delivered', 'En cours': 'In Progress', 'Préparation': 'Preparation' },
      DE: { 'Livrée': 'Geliefert', 'En cours': 'Laufend', 'Préparation': 'Vorbereitung' }
    },
    // Products
    products: {
      FR: {
        'Licences IT': 'Licences IT',
        'Matériel Informatique': 'Matériel Informatique',
        'Fournitures Bureau': 'Fournitures Bureau',
        'Consommables': 'Consommables',
        'Solutions IT': 'Solutions IT',
        'Formation': 'Formation',
        'Consultation': 'Consultation',
        'Implémentation': 'Implémentation'
      },
      EN: {
        'Licences IT': 'IT Licenses',
        'Matériel Informatique': 'IT Equipment',
        'Fournitures Bureau': 'Office Supplies',
        'Consommables': 'Consumables',
        'Solutions IT': 'IT Solutions',
        'Formation': 'Training',
        'Consultation': 'Consulting',
        'Implémentation': 'Implementation'
      },
      DE: {
        'Licences IT': 'IT-Lizenzen',
        'Matériel Informatique': 'IT-Ausrüstung',
        'Fournitures Bureau': 'Bürobedarf',
        'Consommables': 'Verbrauchsmaterial',
        'Solutions IT': 'IT-Lösungen',
        'Formation': 'Schulung',
        'Consultation': 'Beratung',
        'Implémentation': 'Implementierung'
      }
    },
    // Months
    months: {
      FR: { 'Fév': 'Fév', 'Mar': 'Mar', 'Avr': 'Avr' },
      EN: { 'Fév': 'Feb', 'Mar': 'Mar', 'Apr': 'Apr' },
      DE: { 'Fév': 'Feb', 'Mar': 'Mär', 'Avr': 'Apr' }
    },
    // Categories
    categories: {
      FR: {
        'Matériel': 'Matériel',
        'Logiciels': 'Logiciels',
        'Services': 'Services',
        'Bien immobilier': 'Bien immobilier',
        'Immobilier': 'Immobilier',
        'Don matériel': 'Don matériel',
        'Aide Sociale': 'Aide sociale',
        'Frais Administratifs': 'Frais administratifs',
        'Chantier': 'Chantier',
        'Gros Œuvres': 'Gros œuvres'
      },
      EN: {
        'Matériel': 'Hardware',
        'Logiciels': 'Software',
        'Services': 'Services',
        'Bien immobilier': 'Real estate asset',
        'Immobilier': 'Real estate',
        'Don matériel': 'In-kind donation',
        'Aide Sociale': 'Social aid',
        'Frais Administratifs': 'Administrative fees',
        'Chantier': 'Construction site',
        'Gros Œuvres': 'Structural works'
      },
      DE: {
        'Matériel': 'Hardware',
        'Logiciels': 'Software',
        'Services': 'Dienstleistungen',
        'Bien immobilier': 'Immobilienwert',
        'Immobilier': 'Immobilien',
        'Don matériel': 'Sachspende',
        'Aide Sociale': 'Sozialhilfe',
        'Frais Administratifs': 'Verwaltungskosten',
        'Chantier': 'Baustelle',
        'Gros Œuvres': 'Rohbauarbeiten'
      }
    },
    sources: {
      FR: { 'Dépenses': 'Dépenses', 'Stocks & Actifs': 'Stocks & Actifs' },
      EN: { 'Dépenses': 'Expenses', 'Stocks & Actifs': 'Stock & Assets' },
      DE: { 'Dépenses': 'Ausgaben', 'Stocks & Actifs': 'Bestand & Aktiven' }
    },
    departments: {
      FR: {
        ADMIN_ORG: 'Gouvernance & Organisation',
        IMPORT_EXPORT: 'Business',
        SOCIAL: 'Social',
        IMMO: 'Business',
        TECH_DIGITAL: 'Digital',
        'Finances': 'Finances',
        'Production': 'Production',
        'Stock & Actifs': 'Stocks & Actifs',
        'Stocks & Actifs': 'Stocks & Actifs'
      },
      EN: {
        ADMIN_ORG: 'Governance & Organization',
        IMPORT_EXPORT: 'Business',
        SOCIAL: 'Social',
        IMMO: 'Business',
        TECH_DIGITAL: 'Digital',
        'Finances': 'Finance',
        'Production': 'Production',
        'Stock & Actifs': 'Stock & Assets',
        'Stocks & Actifs': 'Stock & Assets'
      },
      DE: {
        ADMIN_ORG: 'Governance & Organisation',
        IMPORT_EXPORT: 'Business',
        SOCIAL: 'Soziales',
        IMMO: 'Business',
        TECH_DIGITAL: 'Digital',
        'Finances': 'Finanzen',
        'Production': 'Produktion',
        'Stock & Actifs': 'Bestand & Aktiven',
        'Stocks & Actifs': 'Bestand & Aktiven'
      }
    },
    countries: {
      FR: { 'Sénégal': 'Sénégal', 'France': 'France', 'Suisse': 'Suisse' },
      EN: { 'Sénégal': 'Senegal', 'France': 'France', 'Suisse': 'Switzerland' },
      DE: { 'Sénégal': 'Senegal', 'France': 'Frankreich', 'Suisse': 'Schweiz' }
    },
    // Chart bar names
    chartLabels: {
      FR: { 'quantite': 'Quantité', 'seuil': 'Seuil' },
      EN: { 'quantite': 'Quantity', 'seuil': 'Threshold' },
      DE: { 'quantite': 'Menge', 'seuil': 'Schwellenwert' }
    }
  };

  // Helper function to translate data values
  const normalizeLookupKey = (value) => String(value || '').trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
  const statusKeys = {
    'LIVREE': 'Livrée',
    'DELIVERED': 'Livrée',
    'EN COURS': 'En cours',
    'IN PROGRESS': 'En cours',
    'LAUFEND': 'En cours',
    'PREPARATION': 'Préparation',
    'VORBEREITUNG': 'Préparation'
  };
  const countryKeys = {
    'SENEGAL': 'Sénégal',
    'FRANCE': 'France',
    'SUISSE': 'Suisse',
    'SWITZERLAND': 'Suisse',
    'SCHWEIZ': 'Suisse'
  };
  const normalizeStatus = (status) => statusKeys[normalizeLookupKey(status)] || status;
  const translateStatus = (status) => {
    const normalized = normalizeStatus(status);
    return dataTranslations.statuses[language]?.[normalized] || status;
  };
  const getStatusClass = (status) => {
    const normalized = normalizeStatus(status);
    if (normalized === 'Livrée') return 'bg-green-900 text-green-200';
    if (normalized === 'Préparation') return 'bg-amber-900 text-amber-200';
    return 'bg-blue-900 text-blue-200';
  };
  const translateProduct = (product) => dataTranslations.products[language]?.[product] || product;
  const translateMonth = (month) => dataTranslations.months[language]?.[month] || month;
  const normalizedLabelKey = (value) => normalizeLookupKey(value).replace(/[_-]+/g, ' ').replace(/\s+/g, ' ');
  const translateFromDictionary = (dictionary, value) => {
    if (!value || value === '-') return '-';
    const exact = dictionary[language]?.[value] || dictionary.FR?.[value];
    if (exact) return exact;
    const normalized = normalizedLabelKey(value);
    const entries = Object.entries(dictionary[language] || {});
    const found = entries.find(([key]) => normalizedLabelKey(key) === normalized);
    if (found) return found[1];
    const fallback = Object.entries(dictionary.FR || {}).find(([key]) => normalizedLabelKey(key) === normalized);
    return fallback?.[1] || String(value).replace(/[_-]+/g, ' ');
  };
  const translateCategory = (category) => translateFromDictionary(dataTranslations.categories, category);
  const translateSource = (source) => translateFromDictionary(dataTranslations.sources, source);
  const translateDepartment = (department) => (
    isLegacyBuCode(department) ? translateDas(department, language) : translateFromDictionary(dataTranslations.departments, department)
  );
  const translateJoinedValues = (value, translator) => String(value || '-')
    .split(',')
    .map(item => translator(item.trim()))
    .join(', ');
  const normalizeCountry = (country) => countryKeys[normalizeLookupKey(country)] || country;
  const translateCountry = (country) => {
    const normalized = normalizeCountry(country);
    return dataTranslations.countries[language]?.[normalized] || country;
  };
  const translateChartLabel = (label) => dataTranslations.chartLabels[language]?.[label] || label;
  const teamOptions = [
    { value: 'Team_ZH', label: t.teamZh },
    { value: 'Team_SN', label: t.teamSn }
  ];
  const agentsByTeam = {
    Team_ZH: [
      { value: 'Cheikh', label: 'Cheikh - Manager' },
      { value: 'Chantal', label: 'Chantal - Administratrice Financière' }
    ],
    Team_SN: [
      { value: 'Pape', label: 'Pape - Administrateur' },
      { value: 'Gnilane Diouf', label: 'Gnilane Diouf - Cheffe Projets' },
      { value: 'Gnilane Ndiaye', label: 'Gnilane Ndiaye - Cheffe Organisation & Développement' },
      { value: 'Ibou', label: 'Ibou - Chef Opérations, Stocks & Actifs' }
    ]
  };
  const normalizeTeam = (team) => {
    const key = normalizeLookupKey(team).replace(/[\s-]/g, '_');
    if (['TZH', 'TEAM_ZH', 'TEAMZH', 'ZH'].includes(key)) return 'Team_ZH';
    if (['TSN', 'TEAM_SN', 'TEAMSN', 'SN'].includes(key)) return 'Team_SN';
    return team || '-';
  };
  const translateTeam = (team) => {
    const normalized = normalizeTeam(team);
    return teamOptions.find(option => option.value === normalized)?.label || normalized;
  };
  const getDefaultFormData = (type = 'commande') => ({
    numero: '',
    client: '',
    produit: '',
    quantite: '',
    nom: '',
    email: '',
    telephone: '',
    categorie: 'Services',
    pays: 'Sénégal',
    team: 'Team_ZH',
    agent: 'Cheikh',
    seuil: '',
    unite: 'Unité',
    statut: 'En cours',
    date: new Date().toISOString().split('T')[0],
    ...(type === 'stock' ? { produit: 'Licences IT', quantite: '', seuil: '', unite: 'Unité' } : {}),
    ...(type === 'fournisseur' ? { categorie: 'Services', pays: 'Sénégal', team: 'Team_ZH', agent: 'Cheikh' } : {})
  });

  const safeRows = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.rows)) return payload.rows;
    return [];
  };

  const toNumber = (value) => {
    if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
    const normalized = String(value ?? '').replace(/\s/g, '').replace(',', '.');
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const formatMoney = (value, currency) => {
    const amount = toNumber(value);
    return `${amount.toLocaleString('fr-CH', { maximumFractionDigits: 2 })} ${currency}`;
  };

  const formatDate = (value) => {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
    return date.toLocaleDateString(language === 'EN' ? 'en-GB' : language === 'DE' ? 'de-CH' : 'fr-CH');
  };

  const normalizeSupplier = (value) => {
    const name = String(value || '').trim();
    if (!name || ['-', 'N/A', 'NA', 'A CONFIRMER', 'INCONNU'].includes(normalizeLookupKey(name))) return '';
    return name;
  };

  const joinSet = (set) => Array.from(set).filter(Boolean).join(', ') || '-';

  const buildSuppliersFromSources = (expenseRows, inventoryRows) => {
    const suppliersByKey = new Map();

    const ensureSupplier = (name) => {
      const normalizedName = normalizeSupplier(name);
      if (!normalizedName) return null;
      const key = normalizeLookupKey(normalizedName);
      if (!suppliersByKey.has(key)) {
        suppliersByKey.set(key, {
          id: `FOU-${String(suppliersByKey.size + 1).padStart(3, '0')}`,
          nom: normalizedName,
          sources: new Set(),
          categories: new Set(),
          departements: new Set(),
          teams: new Set(),
          agents: new Set(),
          pays: new Set(),
          refs: new Set(),
          lignesDepenses: 0,
          lignesStocks: 0,
          montantChf: 0,
          montantCfa: 0,
          lastDate: ''
        });
      }
      return suppliersByKey.get(key);
    };

    const touchDate = (supplier, value) => {
      if (!value) return;
      const next = String(value).slice(0, 10);
      if (!supplier.lastDate || next > supplier.lastDate) supplier.lastDate = next;
    };

    expenseRows.forEach((row) => {
      const supplier = ensureSupplier(row.fournisseur || row.supplier || row.vendor);
      if (!supplier) return;
      supplier.sources.add('Dépenses');
      supplier.lignesDepenses += 1;
      supplier.montantChf += toNumber(row.montant_chf ?? row.amount_chf ?? row.chf);
      supplier.montantCfa += toNumber(row.montant_cfa ?? row.amount_cfa ?? row.cfa);
      supplier.categories.add(row.category || row.categorie || row.nature);
      supplier.departements.add(row.departement || row.department);
      supplier.teams.add(normalizeTeam(row.team || row.equipe));
      supplier.agents.add(row.agent || row.responsable || row.owner);
      supplier.pays.add(row.pays || row.country);
      supplier.refs.add(row.ref || row.reference || row.id);
      touchDate(supplier, row.date_created || row.date || row.date_operation);
    });

    inventoryRows.forEach((row) => {
      const supplier = ensureSupplier(row.fournisseur || row.supplier || row.vendor);
      if (!supplier) return;
      supplier.sources.add('Stocks & Actifs');
      supplier.lignesStocks += 1;
      supplier.montantChf += toNumber(row.valeur_chf ?? row.achat_chf ?? row.montant_chf);
      supplier.montantCfa += toNumber(row.valeur_cfa ?? row.achat_cfa ?? row.montant_cfa);
      supplier.categories.add(row.categorie || row.category || row.sous_categorie);
      supplier.departements.add(row.departement || row.bu || row.department);
      supplier.teams.add(normalizeTeam(row.team || row.equipe));
      supplier.agents.add(row.agent || row.responsable || row.owner);
      supplier.pays.add(row.pays || row.localisation || row.country);
      supplier.refs.add(row.source_id || row.ref || row.reference || row.id);
      touchDate(supplier, row.date_achat || row.date_created || row.date || row.date_operation);
    });

    return Array.from(suppliersByKey.values())
      .map((supplier) => ({
        ...supplier,
        sourcesLabel: joinSet(supplier.sources),
        categorie: joinSet(supplier.categories),
        departement: joinSet(supplier.departements),
        team: joinSet(supplier.teams),
        agent: joinSet(supplier.agents),
        pays: joinSet(supplier.pays),
        references: supplier.refs.size
      }))
      .sort((a, b) => b.montantChf - a.montantChf || a.nom.localeCompare(b.nom));
  };

  const [activeTab, setActiveTab] = useState('overview');
  const [commandes, setCommandes] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [fournisseursLoading, setFournisseursLoading] = useState(false);
  const [fournisseursError, setFournisseursError] = useState('');
  const [selectedFournisseur, setSelectedFournisseur] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('commande');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(getDefaultFormData('commande'));

  useEffect(() => {
    const tab = new URLSearchParams(location.search).get('tab');
    if (['overview', 'commandes', 'fournisseurs', 'stocks', 'manufacturing'].includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab('overview');
    }
  }, [location.search]);

  useEffect(() => {
    setCommandes([
      { id: 1, numero: 'CMD-001', client: 'SENELEC', produit: 'Solutions IT', quantite: 10, statut: 'Livrée', date: '2026-04-01' },
      { id: 2, numero: 'CMD-002', client: 'UCAD', produit: 'Formation', quantite: 50, statut: 'En cours', date: '2026-04-05' },
      { id: 3, numero: 'CMD-003', client: 'Orange Sénégal', produit: 'Consultation', quantite: 5, statut: 'En cours', date: '2026-04-10' },
      { id: 4, numero: 'CMD-004', client: 'Banque Sénégalaise', produit: 'Implémentation', quantite: 1, statut: 'Préparation', date: '2026-04-15' },
    ]);
 
    setStocks([
      { id: 1, produit: 'Licences IT', quantite: 250, seuil: 100, unite: 'Unité' },
      { id: 2, produit: 'Matériel Informatique', quantite: 45, seuil: 20, unite: 'Unité' },
      { id: 3, produit: 'Fournitures Bureau', quantite: 500, seuil: 200, unite: 'Unité' },
      { id: 4, produit: 'Consommables', quantite: 80, seuil: 50, unite: 'Unité' },
    ]);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadFournisseurs = async () => {
      setFournisseursLoading(true);
      setFournisseursError('');
      try {
        const [expensesPayload, inventoryPayload] = await Promise.all([
          api.getExpenses(500, 0),
          api.getInventory(500, 0)
        ]);
        if (cancelled) return;
        setFournisseurs(buildSuppliersFromSources(safeRows(expensesPayload), safeRows(inventoryPayload)));
      } catch (error) {
        if (cancelled) return;
        setFournisseurs([]);
        setFournisseursError(error.message || 'Erreur fournisseurs');
      } finally {
        if (!cancelled) setFournisseursLoading(false);
      }
    };

    loadFournisseurs();

    return () => {
      cancelled = true;
    };
    // buildSuppliersFromSources is pure and intentionally scoped to this page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalCommandes = commandes.length;
  const commandesLivrees = commandes.filter(c => normalizeStatus(c.statut) === 'Livrée').length;
  const totalFournisseurs = fournisseurs.length;
  const stocksBas = stocks.filter(s => s.quantite <= s.seuil).length;
 
  const commandesParMois = [
    { mois: translateMonth('Fév'), commandes: 3 },
    { mois: translateMonth('Mar'), commandes: 5 },
    { mois: translateMonth('Avr'), commandes: totalCommandes },
  ];

  const stocksParProduit = stocks.map(s => ({
    produit: translateProduct(s.produit),
    quantite: s.quantite,
    seuil: s.seuil
  }));
 
  const handleFormChange = (field, value) => {
    if (field === 'team') {
      const normalizedTeam = normalizeTeam(value);
      setFormData(prev => ({
        ...prev,
        team: normalizedTeam,
        agent: agentsByTeam[normalizedTeam]?.[0]?.value || ''
      }));
      return;
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };
 
  const handleSave = () => {
    if (modalType === 'commande' && (!formData.numero || !formData.client || !formData.produit || !formData.quantite)) {
      alert(t.remplirChamps);
      return;
    }
    if (modalType === 'fournisseur' && (!formData.nom || !formData.email)) {
      alert(t.remplirChamps);
      return;
    }
    if (modalType === 'stock' && (!formData.produit || !formData.quantite || !formData.seuil)) {
      alert(t.remplirChamps);
      return;
    }
 
    const normalizedData = {
      ...formData,
      statut: normalizeStatus(formData.statut)
    };

    if (modalType === 'commande') {
      if (editingId) {
        setCommandes(commandes.map(c => c.id === editingId ? { ...normalizedData, id: editingId } : c));
      } else {
        setCommandes([...commandes, { ...normalizedData, id: Date.now() }]);
      }
    } else if (modalType === 'fournisseur') {
      const fournisseurData = {
        nom: formData.nom,
        email: formData.email,
        telephone: formData.telephone,
        categorie: formData.categorie,
        pays: normalizeCountry(formData.pays),
        team: normalizeTeam(formData.team),
        agent: formData.agent
      };
      if (editingId) {
        setFournisseurs(fournisseurs.map(f => f.id === editingId ? { ...fournisseurData, id: editingId } : f));
      } else {
        setFournisseurs([...fournisseurs, { ...fournisseurData, id: Date.now() }]);
      }
    } else {
      const stockData = {
        produit: formData.produit,
        quantite: parseInt(formData.quantite, 10) || 0,
        seuil: parseInt(formData.seuil, 10) || 0,
        unite: formData.unite
      };
      if (editingId) {
        setStocks(stocks.map(s => s.id === editingId ? { ...stockData, id: editingId } : s));
      } else {
        setStocks([...stocks, { ...stockData, id: Date.now() }]);
      }
    }
 
    setShowModal(false);
    setEditingId(null);
    setFormData(getDefaultFormData(modalType));
  };
 
  const handleEdit = (type, item) => {
    setModalType(type);
    setEditingId(item.id);
    setFormData({ ...getDefaultFormData(type), ...item });
    setShowModal(true);
  };
 
  const handleDelete = (type, id) => {
    if (type === 'commande') setCommandes(commandes.filter(c => c.id !== id));
    else if (type === 'fournisseur') setFournisseurs(fournisseurs.filter(f => f.id !== id));
    else setStocks(stocks.filter(s => s.id !== id));
  };
 
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <div className="mx-auto w-full max-w-[1800px]">
 
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">{t.totalCommandes}</p>
                <p className="text-white text-2xl font-bold">{totalCommandes}</p>
              </div>
              <Package size={32} className="text-blue-400" />
            </div>
          </div>
 
          <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6 border border-green-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm">{t.commandesLivrees}</p>
                <p className="text-white text-2xl font-bold">{commandesLivrees}</p>
              </div>
              <CheckCircle size={32} className="text-green-400" />
            </div>
          </div>
 
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6 border border-purple-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">{t.fournisseurs}</p>
                <p className="text-white text-2xl font-bold">{totalFournisseurs}</p>
              </div>
              <Truck size={32} className="text-purple-400" />
            </div>
          </div>
 
          <div className={`bg-gradient-to-br ${stocksBas === 0 ? 'from-green-900 to-green-800' : 'from-orange-900 to-orange-800'} rounded-lg p-6 border ${stocksBas === 0 ? 'border-green-700' : 'border-orange-700'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${stocksBas === 0 ? 'text-green-200' : 'text-orange-200'} text-sm`}>{t.alertStocks}</p>
                <p className="text-white text-2xl font-bold">{stocksBas}</p>
              </div>
              <AlertCircle size={32} className={stocksBas === 0 ? 'text-green-400' : 'text-orange-400'} />
            </div>
          </div>
        </div>
 
        {/* Tabs */}
        <ModulePageTabs
          moduleId="production"
          language={language}
          activeTab={activeTab}
          onSelect={setActiveTab}
          tabs={[
            { tab: 'overview', label: t.overview },
            { tab: 'commandes', label: t.commandes },
            { tab: 'fournisseurs', label: t.fournisseurs },
            { tab: 'stocks', label: t.stocks }
          ]}
        />
 
        {/* Vue d'ensemble */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">{t.commandesParMois}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={commandesParMois}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="mois" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                  <Bar dataKey="commandes" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
 
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">{t.stocksParProduit}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stocksParProduit} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis type="number" stroke="#94a3b8" />
                  <YAxis dataKey="produit" type="category" stroke="#94a3b8" width={100} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                  <Legend />
                  <Bar dataKey="quantite" name={translateChartLabel('quantite')} fill="#10b981" radius={[0, 8, 8, 0]} />
                  <Bar dataKey="seuil" name={translateChartLabel('seuil')} fill="#ef4444" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
 
        {/* Tables */}
        {activeTab === 'commandes' && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={() => { setEditingId(null); setModalType('commande'); setFormData(getDefaultFormData('commande')); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                <Plus size={20} /> {t.nouvelleCommande}
              </button>
            </div>
            <TableControls rows={commandes} renderTable={(visibleRows) => (
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 z-10 bg-slate-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.numero}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.client}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.produit}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.quantite}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.statut}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map(c => (
                    <tr key={c.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                      <td className="px-4 py-2 text-slate-300 font-medium">{c.numero}</td>
                      <td className="px-4 py-2 text-slate-400">{c.client}</td>
                      <td className="px-4 py-2 text-slate-400">{translateProduct(c.produit)}</td>
                      <td className="px-4 py-2 text-slate-400">{c.quantite}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusClass(c.statut)}`}>
                          {translateStatus(c.statut)}
                        </span>
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <button onClick={() => handleEdit('commande', c)} className="p-1 hover:bg-slate-600 rounded">
                          <Edit2 size={16} className="text-blue-400" />
                        </button>
                        <button onClick={() => handleDelete('commande', c.id)} className="p-1 hover:bg-slate-600 rounded">
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )} />
          </div>
        )}
 
        {activeTab === 'fournisseurs' && (
          <div>
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-slate-300">{t.registreFournisseurs}</p>
              <button onClick={() => { setEditingId(null); setModalType('fournisseur'); setFormData(getDefaultFormData('fournisseur')); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition">
                <Plus size={20} /> {t.preparationFournisseur}
              </button>
            </div>
            {fournisseursError && (
              <div className="mb-4 rounded-lg border border-red-700 bg-red-950/40 px-4 py-3 text-sm text-red-200">
                {fournisseursError}
              </div>
            )}
            <TableControls rows={fournisseurs} renderTable={(visibleRows) => (
              <table className="min-w-[1450px] text-sm">
                <thead className="sticky top-0 z-10 bg-slate-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.reference}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.nom}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.sources}</th>
                    <th className="px-4 py-2 text-right text-white font-bold">{t.montantChf}</th>
                    <th className="px-4 py-2 text-right text-white font-bold">{t.montantCfa}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.lignesDepenses}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.lignesStocks}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.categorie}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.departement}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.team}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.agent}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.pays}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.derniereOperation}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {fournisseursLoading && (
                    <tr>
                      <td colSpan="14" className="px-4 py-6 text-center text-slate-300">Chargement...</td>
                    </tr>
                  )}
                  {!fournisseursLoading && visibleRows.length === 0 && (
                    <tr>
                      <td colSpan="14" className="px-4 py-6 text-center text-slate-400">{t.aucuneDonnee}</td>
                    </tr>
                  )}
                  {visibleRows.map(f => (
                    <tr key={f.id} onClick={() => setSelectedFournisseur(f)} className="cursor-pointer border-t border-slate-700 hover:bg-slate-700/50">
                      <td className="px-4 py-2 text-slate-400">{f.id}</td>
                      <td className="px-4 py-2 text-slate-300 font-medium">{f.nom}</td>
                      <td className="px-4 py-2 text-slate-400">{translateJoinedValues(f.sourcesLabel, translateSource)}</td>
                      <td className="px-4 py-2 text-right font-semibold text-emerald-300">{formatMoney(f.montantChf, 'CHF')}</td>
                      <td className="px-4 py-2 text-right font-semibold text-amber-300">{formatMoney(f.montantCfa, 'CFA')}</td>
                      <td className="px-4 py-2 text-slate-400">{f.lignesDepenses}</td>
                      <td className="px-4 py-2 text-slate-400">{f.lignesStocks}</td>
                      <td className="px-4 py-2 text-slate-400">{translateJoinedValues(f.categorie, translateCategory)}</td>
                      <td className="px-4 py-2 text-slate-400">{translateJoinedValues(f.departement, translateDepartment)}</td>
                      <td className="px-4 py-2 text-slate-400">{translateJoinedValues(f.team, translateTeam)}</td>
                      <td className="px-4 py-2 text-slate-400">{f.agent}</td>
                      <td className="px-4 py-2 text-slate-400">{f.pays}</td>
                      <td className="px-4 py-2 text-slate-400">{formatDate(f.lastDate)}</td>
                      <StandardActionsCell
                        item={f}
                        onView={setSelectedFournisseur}
                        onEdit={(item) => handleEdit('fournisseur', item)}
                        labels={{ view: t.voir, edit: t.modifier }}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            )} />
          </div>
        )}
 
        {activeTab === 'stocks' && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={() => { setEditingId(null); setModalType('stock'); setFormData(getDefaultFormData('stock')); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition">
                <Plus size={20} /> {t.ajouterStock}
              </button>
            </div>
            <TableControls rows={stocks} renderTable={(visibleRows) => (
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 z-10 bg-slate-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.produit}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.quantite}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.seuil}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.statut}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map(s => (
                    <tr key={s.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                      <td className="px-4 py-2 text-slate-300 font-medium">{translateProduct(s.produit)}</td>
                      <td className="px-4 py-2 text-slate-400">{s.quantite}</td>
                      <td className="px-4 py-2 text-slate-400">{s.seuil}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${s.quantite > s.seuil ? 'bg-green-900 text-green-200' : 'bg-orange-900 text-orange-200'}`}>
                          {s.quantite > s.seuil ? t.ok : t.bas}
                        </span>
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <button onClick={() => handleEdit('stock', s)} className="p-1 hover:bg-slate-600 rounded">
                          <Edit2 size={16} className="text-blue-400" />
                        </button>
                        <button onClick={() => handleDelete('stock', s.id)} className="p-1 hover:bg-slate-600 rounded">
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )} />
          </div>
        )}

        <ChildTabPlaceholder moduleId="production" language={language} activeTab={activeTab} handledTabs={['overview', 'commandes', 'fournisseurs', 'stocks']} />
        </div>
      </div>

      <StandardRecordSheetModal
        open={Boolean(selectedFournisseur)}
        title={selectedFournisseur?.nom}
        eyebrow={t.ficheFournisseur}
        description={t.registreFournisseurs}
        closeLabel={t.annuler}
        onClose={() => setSelectedFournisseur(null)}
        details={selectedFournisseur ? [
          [t.reference, selectedFournisseur.id],
          [t.sources, translateJoinedValues(selectedFournisseur.sourcesLabel, translateSource)],
          [t.montantChf, formatMoney(selectedFournisseur.montantChf, 'CHF')],
          [t.montantCfa, formatMoney(selectedFournisseur.montantCfa, 'CFA')],
          [t.lignesDepenses, selectedFournisseur.lignesDepenses],
          [t.lignesStocks, selectedFournisseur.lignesStocks],
          [t.categorie, translateJoinedValues(selectedFournisseur.categorie, translateCategory)],
          [t.departement, translateJoinedValues(selectedFournisseur.departement, translateDepartment)],
          [t.team, translateJoinedValues(selectedFournisseur.team, translateTeam)],
          [t.agent, selectedFournisseur.agent],
          [t.pays, selectedFournisseur.pays],
          [t.derniereOperation, formatDate(selectedFournisseur.lastDate)],
          [t.nbReferences, selectedFournisseur.references]
        ] : []}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              {modalType === 'commande' ? t.nouvelleCommande : modalType === 'fournisseur' ? t.nouveauFournisseur : t.ajouterStock}
            </h2>
 
            <div className="space-y-4">
              {modalType === 'commande' && (
                <>
                  <input type="text" placeholder={t.numero} value={formData.numero} onChange={(e) => handleFormChange('numero', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
                  <input type="text" placeholder={t.client} value={formData.client} onChange={(e) => handleFormChange('client', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
                  <input type="text" placeholder={t.produit} value={formData.produit} onChange={(e) => handleFormChange('produit', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
                  <input type="number" placeholder={t.quantite} value={formData.quantite} onChange={(e) => handleFormChange('quantite', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
                  <select value={formData.statut} onChange={(e) => handleFormChange('statut', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                    <option value="En cours">{translateStatus('En cours')}</option>
                    <option value="Préparation">{translateStatus('Préparation')}</option>
                    <option value="Livrée">{translateStatus('Livrée')}</option>
                  </select>
                  <LocalizedDateInput value={formData.date} onChange={(date) => handleFormChange('date', date)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
                </>
              )}

              {modalType === 'fournisseur' && (
                <>
                  <input type="text" placeholder={t.nomFournisseur} value={formData.nom} onChange={(e) => handleFormChange('nom', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
                  <input type="email" placeholder={t.email} value={formData.email} onChange={(e) => handleFormChange('email', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
                  <input type="tel" placeholder={t.telephone} value={formData.telephone} onChange={(e) => handleFormChange('telephone', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
                  <select value={formData.categorie} onChange={(e) => handleFormChange('categorie', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                    <option value="Matériel">{translateCategory('Matériel')}</option>
                    <option value="Logiciels">{translateCategory('Logiciels')}</option>
                    <option value="Services">{translateCategory('Services')}</option>
                    <option value="Bien immobilier">{translateCategory('Bien immobilier')}</option>
                    <option value="Frais Administratifs">{translateCategory('Frais Administratifs')}</option>
                    <option value="Chantier">{translateCategory('Chantier')}</option>
                  </select>
                  <select value={normalizeTeam(formData.team)} onChange={(e) => handleFormChange('team', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                    {teamOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <select value={formData.agent} onChange={(e) => handleFormChange('agent', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                    {(agentsByTeam[normalizeTeam(formData.team)] || []).map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <select value={formData.pays} onChange={(e) => handleFormChange('pays', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                    <option value="Sénégal">{translateCountry('Sénégal')}</option>
                    <option value="France">{translateCountry('France')}</option>
                    <option value="Suisse">{translateCountry('Suisse')}</option>
                  </select>
                </>
              )}

              {modalType === 'stock' && (
                <>
                  <input type="text" placeholder={t.produit} value={formData.produit} onChange={(e) => handleFormChange('produit', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
                  <input type="number" placeholder={t.quantite} value={formData.quantite} onChange={(e) => handleFormChange('quantite', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
                  <input type="number" placeholder={t.seuil} value={formData.seuil} onChange={(e) => handleFormChange('seuil', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
                  <input type="text" placeholder={t.unite} value={formData.unite} onChange={(e) => handleFormChange('unite', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
                </>
              )}
            </div>
 
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition">{t.annuler}</button>
              <button onClick={handleSave} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">{t.creer}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Production;
