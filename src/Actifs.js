import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';
import {
  AlertTriangle, Boxes, CircleDollarSign, PackagePlus, Pencil, Tags, Trash2,
  Warehouse, Wrench
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import api from './api';
import { ModulePageTabs, ChildTabPlaceholder } from './moduleTabs';
import TableControls from './TableControls';

const CATEGORY_VALUES = [
  'Véhicule',
  'Mobilier_Meubles',
  'Bien_Immo',
  'Inform_MM_Burotik',
  'Voyage_Cadeaux',
  'Outils_Equipements',
  'Electroménager',
  'Habits_Textiles',
  'Marchandises_Autres'
];

const STATUS_VALUES = ['Neuf', 'Bon état', '2nd Hand', 'A Réparer'];
const UNIT_VALUES = ['Unité', 'Pièce', 'Parcelle', 'Lot', 'Carton', 'Paire', 'Kg', 'Litre', 'Mètre'];
const BU_VALUES = ['ADMIN_ORG', 'IMPORT_EXPORT', 'SOCIAL', 'IMMO', 'TECH_DIGITAL'];
const CHART_COLORS = ['#38bdf8', '#34d399', '#f59e0b', '#a78bfa', '#fb7185', '#22d3ee', '#f97316', '#818cf8', '#94a3b8'];

const normalizeText = (value) => String(value || '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase();

const getTerrainProject = (item) => {
  const haystack = normalizeText(`${item.projet || ''} ${item.designation || ''} ${item.document_ref || ''}`);
  if (haystack.includes('diass')) return 'diass';
  if (haystack.includes('lac rose') || haystack.includes('lrsn')) return 'lac_rose';
  return null;
};

const getTerrainQuantity = (item) => {
  const text = normalizeText(`${item.designation || ''} ${item.projet || ''}`);
  if (/2\s*terrains?/.test(text) || text.includes('parcelles 235') || text.includes('235, 236')) return 2;
  return 1;
};

const getTerrainDetails = (item) => {
  const project = getTerrainProject(item);
  if (project === 'lac_rose') {
    return [
      { parcelle: 'Parcelle 235', titulaire: 'Cheikh' },
      { parcelle: 'Parcelle 236', titulaire: 'Chantal' }
    ];
  }
  if (project === 'diass') {
    return [
      { parcelle: 'Parcelle Chantal', titulaire: 'Chantal' },
      { parcelle: 'Parcelle Pape', titulaire: 'Pape' }
    ];
  }
  return [{ parcelle: 'Parcelle', titulaire: '' }];
};

const CATEGORY_LABELS = {
  FR: {
    Véhicule: 'Véhicules', Mobilier_Meubles: 'Mobilier & Meubles', Bien_Immo: 'Bien immobilier',
    Inform_MM_Burotik: 'Informatique & Bureautique', Voyage_Cadeaux: 'Voyages & Cadeaux',
    Outils_Equipements: 'Outils & Équipements', Electroménager: 'Électroménager',
    Habits_Textiles: 'Habits & Textiles', Marchandises_Autres: 'Marchandises diverses'
  },
  EN: {
    Véhicule: 'Vehicles', Mobilier_Meubles: 'Furniture', Bien_Immo: 'Real Estate',
    Inform_MM_Burotik: 'IT & Office Equipment', Voyage_Cadeaux: 'Travel & Gifts',
    Outils_Equipements: 'Tools & Equipment', Electroménager: 'Appliances',
    Habits_Textiles: 'Clothing & Textiles', Marchandises_Autres: 'Other Goods'
  },
  DE: {
    Véhicule: 'Fahrzeuge', Mobilier_Meubles: 'Mobiliar', Bien_Immo: 'Immobilien',
    Inform_MM_Burotik: 'IT & Büroausstattung', Voyage_Cadeaux: 'Reisen & Geschenke',
    Outils_Equipements: 'Werkzeuge & Ausrüstung', Electroménager: 'Elektrogeräte',
    Habits_Textiles: 'Kleidung & Textilien', Marchandises_Autres: 'Sonstige Waren'
  }
};

const STATUS_LABELS = {
  FR: { Neuf: 'Neuf', 'Bon état': 'Bon état', '2nd Hand': 'Seconde main', 'A Réparer': 'À réparer' },
  EN: { Neuf: 'New', 'Bon état': 'Good condition', '2nd Hand': 'Second hand', 'A Réparer': 'Needs repair' },
  DE: { Neuf: 'Neu', 'Bon état': 'Guter Zustand', '2nd Hand': 'Gebraucht', 'A Réparer': 'Zu reparieren' }
};

const UNIT_LABELS = {
  FR: { Unité: 'Unité', Pièce: 'Pièce', Parcelle: 'Parcelle', Lot: 'Lot', Carton: 'Carton', Paire: 'Paire', Kg: 'Kg', Litre: 'Litre', Mètre: 'Mètre' },
  EN: { Unité: 'Unit', Pièce: 'Piece', Parcelle: 'Plot', Lot: 'Lot', Carton: 'Box', Paire: 'Pair', Kg: 'Kg', Litre: 'Liter', Mètre: 'Meter' },
  DE: { Unité: 'Einheit', Pièce: 'Stück', Parcelle: 'Parzelle', Lot: 'Los', Carton: 'Karton', Paire: 'Paar', Kg: 'Kg', Litre: 'Liter', Mètre: 'Meter' }
};

const BU_LABELS = {
  FR: { ADMIN_ORG: 'Administration', IMPORT_EXPORT: 'Commercial & CRM', SOCIAL: 'Social', IMMO: 'Fin Immo', TECH_DIGITAL: 'IT & Support' },
  EN: { ADMIN_ORG: 'Administration', IMPORT_EXPORT: 'Commercial & CRM', SOCIAL: 'Social', IMMO: 'Real Estate Finance', TECH_DIGITAL: 'IT & Support' },
  DE: { ADMIN_ORG: 'Verwaltung', IMPORT_EXPORT: 'Vertrieb & CRM', SOCIAL: 'Sozial', IMMO: 'Immobilienfinanzierung', TECH_DIGITAL: 'IT & Support' }
};

const LAND_COMMENT_LABELS = {
  FR: 'Ajout depuis le registre foncier M3S.',
  EN: 'Added from the M3S land register.',
  DE: 'Aus dem M3S-Grundstücksregister hinzugefügt.'
};

const EMPTY_FORM = {
  article: '',
  categorie: 'Outils_Equipements',
  sous_categorie: '',
  fournisseur: '',
  quantite: '1',
  unite: 'Unité',
  achat_chf: '',
  achat_cfa: '',
  valeur_chf: '',
  valeur_cfa: '',
  localisation: '',
  statut: 'Neuf',
  bu: 'ADMIN_ORG',
  commentaires: ''
};

const numberValue = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatAmount = (value, locale = 'fr-CH', digits = 2) =>
  numberValue(value).toLocaleString(locale, { maximumFractionDigits: digits });

const cleanDate = (value) => {
  if (!value) return '';
  if (typeof value === 'object' && value.value) return String(value.value).slice(0, 10);
  return String(value).slice(0, 10);
};

const Actifs = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [inventaire, setInventaire] = useState([]);
  const [realEstateTransactions, setRealEstateTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const translations = {
    FR: {
      overview: "Vue d'ensemble", inventory: 'Inventaire', immobilisations: 'Immobilisations', risks: 'Risques',
      articles: 'Articles en base', stockValue: 'Valeur estimée', purchaseCost: "Coût d'achat", totalQuantity: 'Quantité totale',
      categories: 'catégories', units: 'unités', valueByCategory: 'Valeur CHF par catégorie',
      valueByFunction: 'Valeur CHF par fonction', article: 'Article', reference: 'Réf.', category: 'Catégorie',
      subCategory: 'Sous-catégorie', quantity: 'Quantité', unit: 'Unité', purchaseCHF: 'Achat CHF',
      purchaseCFA: 'Achat CFA', valueCHF: 'Valeur CHF', valueCFA: 'Valeur CFA', supplier: 'Fournisseur',
      location: 'Localisation', status: 'État', function: 'Fonction M3S', functionHint: "Affectation fonctionnelle / ancienne BU. Le champ Département n'existe pas encore dans la table Stocks.",
      comments: 'Commentaires', actions: 'Actions',
      add: 'Nouvel article', edit: "Modifier l'article", cancel: 'Annuler', save: 'Enregistrer',
      required: "L'article et la catégorie sont obligatoires.", confirmDelete: 'Supprimer définitivement cet article ?',
      loadError: "Impossible de charger l'inventaire.", saveError: "Impossible d'enregistrer cet article.",
      deleteError: "Impossible de supprimer cet article.", explicitAssets: 'Actifs immobiliers explicitement classés',
      assetRule: 'Cette vue reprend uniquement la catégorie Bien immobilier afin de ne pas inventer de classification comptable.',
      riskItems: 'Articles à surveiller', repair: 'À réparer', transit: 'En transit', riskMessage: 'Aucun article à risque identifié.',
      noAssets: 'Aucune immobilisation explicitement classée.', allRealData: 'Données réelles BigQuery',
      acquisitionValue: "Valeur d'acquisition", currentValue: 'Valeur actuelle',
      landRegistry: 'Registre foncier', trackedLands: 'Terrains suivis', terrainUnit: 'terrains', sourceFlow: 'Flux source',
      stockLines: 'Lignes stock classées Bien immobilier',
      stockLinesSourceReady: 'Source BigQuery stocks_actifs_propres. Lac Rose et Diass sont maintenant matérialisés comme lignes stock brutes.',
      stockLinesSourcePending: 'Source BigQuery stocks_actifs_propres. Diass est visible dans le registre foncier ci-dessus, mais pas encore écrit comme ligne stock brute.',
      parcel: 'Parcelle', holder: 'Titulaire', project: 'Projet',
      addLand: 'Ajouter terrain', addStockAsset: 'Ajouter une ligne stock', realEstateFinanceSource: 'Financement immobilier', landPurchaseLines: '2 flux achat terrain'
    },
    EN: {
      overview: 'Overview', inventory: 'Inventory', immobilisations: 'Fixed Assets', risks: 'Risks',
      articles: 'Database items', stockValue: 'Estimated value', purchaseCost: 'Purchase cost', totalQuantity: 'Total quantity',
      categories: 'categories', units: 'units', valueByCategory: 'CHF value by category',
      valueByFunction: 'CHF value by function', article: 'Item', reference: 'Ref.', category: 'Category',
      subCategory: 'Subcategory', quantity: 'Quantity', unit: 'Unit', purchaseCHF: 'Purchase CHF',
      purchaseCFA: 'Purchase CFA', valueCHF: 'Value CHF', valueCFA: 'Value CFA', supplier: 'Supplier',
      location: 'Location', status: 'Condition', function: 'M3S function', functionHint: 'Functional allocation / legacy BU. Department is not yet a field in the Stocks table.',
      comments: 'Comments', actions: 'Actions',
      add: 'New item', edit: 'Edit item', cancel: 'Cancel', save: 'Save',
      required: 'Item and category are required.', confirmDelete: 'Permanently delete this item?',
      loadError: 'Unable to load inventory.', saveError: 'Unable to save this item.',
      deleteError: 'Unable to delete this item.', explicitAssets: 'Explicitly classified real-estate assets',
      assetRule: 'This view only uses the Real Estate category to avoid inventing an accounting classification.',
      riskItems: 'Items to monitor', repair: 'Needs repair', transit: 'In transit', riskMessage: 'No risk item identified.',
      noAssets: 'No explicitly classified fixed asset.', allRealData: 'Live BigQuery data',
      acquisitionValue: 'Acquisition value', currentValue: 'Current value',
      landRegistry: 'Land register', trackedLands: 'Tracked plots', terrainUnit: 'plots', sourceFlow: 'Source flow',
      stockLines: 'Stock lines classified as Real Estate',
      stockLinesSourceReady: 'BigQuery stocks_actifs_propres source. Lac Rose and Diass are now materialized as raw stock lines.',
      stockLinesSourcePending: 'BigQuery stocks_actifs_propres source. Diass is visible in the land register above, but not yet written as a raw stock line.',
      parcel: 'Plot', holder: 'Holder', project: 'Project',
      addLand: 'Add plot', addStockAsset: 'Add stock line', realEstateFinanceSource: 'Real estate financing', landPurchaseLines: '2 land purchase flows'
    },
    DE: {
      overview: 'Übersicht', inventory: 'Bestand', immobilisations: 'Anlagevermögen', risks: 'Risiken',
      articles: 'Artikel in der Datenbank', stockValue: 'Geschätzter Wert', purchaseCost: 'Anschaffungskosten', totalQuantity: 'Gesamtmenge',
      categories: 'Kategorien', units: 'Einheiten', valueByCategory: 'CHF-Wert nach Kategorie',
      valueByFunction: 'CHF-Wert nach Funktion', article: 'Artikel', reference: 'Ref.', category: 'Kategorie',
      subCategory: 'Unterkategorie', quantity: 'Menge', unit: 'Einheit', purchaseCHF: 'Kauf CHF',
      purchaseCFA: 'Kauf CFA', valueCHF: 'Wert CHF', valueCFA: 'Wert CFA', supplier: 'Lieferant',
      location: 'Standort', status: 'Zustand', function: 'M3S-Funktion', functionHint: 'Funktionale Zuordnung / frühere BU. Abteilung ist in der Stocks-Tabelle noch kein eigenes Feld.',
      comments: 'Bemerkungen', actions: 'Aktionen',
      add: 'Neuer Artikel', edit: 'Artikel bearbeiten', cancel: 'Abbrechen', save: 'Speichern',
      required: 'Artikel und Kategorie sind Pflichtfelder.', confirmDelete: 'Diesen Artikel endgültig löschen?',
      loadError: 'Inventar konnte nicht geladen werden.', saveError: 'Artikel konnte nicht gespeichert werden.',
      deleteError: 'Artikel konnte nicht gelöscht werden.', explicitAssets: 'Explizit klassifizierte Immobilienanlagen',
      assetRule: 'Diese Ansicht verwendet nur die Kategorie Immobilien, um keine Buchungsklassifizierung zu erfinden.',
      riskItems: 'Zu überwachende Artikel', repair: 'Zu reparieren', transit: 'Im Transit', riskMessage: 'Keine Risikoartikel gefunden.',
      noAssets: 'Keine explizit klassifizierte Anlage.', allRealData: 'Echte BigQuery-Daten',
      acquisitionValue: 'Anschaffungswert', currentValue: 'Aktueller Wert',
      landRegistry: 'Grundstücksregister', trackedLands: 'Geführte Grundstücke', terrainUnit: 'Grundstücke', sourceFlow: 'Quellfluss',
      stockLines: 'Als Immobilien klassifizierte Lagerzeilen',
      stockLinesSourceReady: 'Quelle BigQuery stocks_actifs_propres. Lac Rose und Diass sind jetzt als rohe Lagerzeilen materialisiert.',
      stockLinesSourcePending: 'Quelle BigQuery stocks_actifs_propres. Diass ist oben im Grundstücksregister sichtbar, aber noch nicht als rohe Lagerzeile geschrieben.',
      parcel: 'Parzelle', holder: 'Inhaber', project: 'Projekt',
      addLand: 'Grundstück hinzufügen', addStockAsset: 'Lagerzeile hinzufügen', realEstateFinanceSource: 'Immobilienfinanzierung', landPurchaseLines: '2 Grundstückskauf-Flüsse'
    }
  };
  const t = translations[language] || translations.FR;

  const translateCategory = useCallback((value) => CATEGORY_LABELS[language]?.[value] || CATEGORY_LABELS.FR[value] || value || 'Autre', [language]);
  const translateStatus = useCallback((value) => STATUS_LABELS[language]?.[value] || STATUS_LABELS.FR[value] || value || '-', [language]);
  const translateUnit = useCallback((value) => UNIT_LABELS[language]?.[value] || UNIT_LABELS.FR[value] || value || '-', [language]);
  const translateBu = useCallback((value) => BU_LABELS[language]?.[value] || BU_LABELS.FR[value] || value || '-', [language]);

  useEffect(() => {
    const tab = new URLSearchParams(location.search).get('tab');
    setActiveTab(['overview', 'inventory', 'immobilisations', 'risques'].includes(tab) ? tab : 'overview');
  }, [location.search]);

  useEffect(() => {
    if (!showModal) return;
    const defaultComments = Object.values(LAND_COMMENT_LABELS);
    if (!defaultComments.includes(formData.commentaires)) return;
    setFormData(prev => ({ ...prev, commentaires: LAND_COMMENT_LABELS[language] || LAND_COMMENT_LABELS.FR }));
  }, [formData.commentaires, language, showModal]);

  const loadInventory = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [response, realEstateResponse] = await Promise.all([
        api.getInventory(300, 0),
        api.getRealEstateFinance(300, 0).catch(() => ({ data: [] }))
      ]);
      const rows = Array.isArray(response?.data) ? response.data : [];
      const realEstateRows = Array.isArray(realEstateResponse?.data) ? realEstateResponse.data : [];
      setRealEstateTransactions(realEstateRows);
      setInventaire(rows.map(item => ({
        id: item.source_id || item.id || item.ref,
        article: item.article || item.name || '',
        categorie: item.categorie || '',
        sousCategorie: item.sous_categorie || '',
        fournisseur: item.fournisseur || '',
        quantite: numberValue(item.quantite ?? item.quantity),
        unite: item.unite || '',
        achatChf: numberValue(item.achat_chf),
        achatCfa: numberValue(item.achat_cfa),
        valeurChf: numberValue(item.valeur_chf ?? item.price),
        valeurCfa: numberValue(item.valeur_cfa),
        localisation: item.localisation || '',
        statut: item.statut || item.status || '',
        bu: item.bu || '',
        commentaires: item.commentaires || ''
      })));
    } catch (loadError) {
      console.error('Erreur chargement inventaire:', loadError);
      setInventaire([]);
      setError(t.loadError);
    } finally {
      setLoading(false);
    }
  }, [t.loadError]);

  useEffect(() => {
    loadInventory();
  }, [loadInventory]);

  const summary = useMemo(() => inventaire.reduce((acc, item) => {
    acc.quantite += item.quantite;
    acc.achatChf += item.achatChf;
    acc.achatCfa += item.achatCfa;
    acc.valeurChf += item.valeurChf;
    acc.valeurCfa += item.valeurCfa;
    return acc;
  }, { quantite: 0, achatChf: 0, achatCfa: 0, valeurChf: 0, valeurCfa: 0 }), [inventaire]);

  const categoriesCount = useMemo(() => new Set(inventaire.map(item => item.categorie).filter(Boolean)).size, [inventaire]);
  const immobilisations = useMemo(() => inventaire.filter(item => item.categorie === 'Bien_Immo'), [inventaire]);
  const hasDiassStockLine = useMemo(() => immobilisations.some(item =>
    normalizeText(`${item.article} ${item.localisation} ${item.commentaires}`).includes('diass')
  ), [immobilisations]);
  const terrainsFonciers = useMemo(() => {
    const achatsTerrains = realEstateTransactions
      .filter((item) => getTerrainProject(item))
      .filter((item) => normalizeText(item.designation).includes('achat') && getTerrainQuantity(item) >= 2);
    const byProject = {};
    achatsTerrains.forEach((item) => {
      const project = getTerrainProject(item);
      if (!project || byProject[project]) return;
      const quantite = getTerrainQuantity(item);
      byProject[project] = getTerrainDetails(item).map((detail, index) => ({
        id: `${item.source_id}-${index + 1}`,
        sourceId: item.source_id,
        project,
        label: project === 'diass' ? 'Diass' : 'Lac Rose',
        designation: item.designation,
        date: cleanDate(item.date_operation),
        quantite: 1,
        parcelle: detail.parcelle,
        titulaire: detail.titulaire,
        montantChf: numberValue(item.montant_chf) / quantite,
        montantCfa: numberValue(item.montant_cfa) / quantite,
        tauxFx: numberValue(item.taux_fx),
        statut: item.statut || '',
        source: 'realEstateFinance',
        document: item.document_ref || ''
      }));
    });
    return ['lac_rose', 'diass'].flatMap((key) => byProject[key] || []);
  }, [realEstateTransactions]);
  const terrainSummary = useMemo(() => terrainsFonciers.reduce((acc, item) => {
    acc.quantite += item.quantite;
    acc.montantChf += item.montantChf;
    acc.montantCfa += item.montantCfa;
    return acc;
  }, { quantite: 0, montantChf: 0, montantCfa: 0 }), [terrainsFonciers]);
  const articlesRisques = useMemo(() => inventaire.filter(item =>
    item.statut === 'A Réparer' || /shipping|transit/i.test(item.localisation)
  ), [inventaire]);

  const categoryChart = useMemo(() => Object.values(inventaire.reduce((acc, item) => {
    const key = item.categorie || 'Autre';
    if (!acc[key]) acc[key] = { key, label: translateCategory(key), valeur: 0 };
    acc[key].valeur += item.valeurChf;
    return acc;
  }, {})).sort((a, b) => b.valeur - a.valeur), [inventaire, translateCategory]);

  const functionChart = useMemo(() => Object.values(inventaire.reduce((acc, item) => {
    const key = item.bu || 'Autre';
    if (!acc[key]) acc[key] = { key, label: translateBu(key), valeur: 0 };
    acc[key].valeur += item.valeurChf;
    return acc;
  }, {})).sort((a, b) => b.valeur - a.valeur), [inventaire, translateBu]);

  const openCreate = () => {
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setShowModal(true);
  };

  const openCreateLandAsset = () => {
    setEditingId(null);
    setFormData({
      ...EMPTY_FORM,
      article: '',
      categorie: 'Bien_Immo',
      sous_categorie: 'Terrain',
      quantite: '1',
      unite: 'Parcelle',
      localisation: 'Dakar, SN',
      statut: 'Neuf',
      bu: 'IMMO',
      commentaires: LAND_COMMENT_LABELS[language] || LAND_COMMENT_LABELS.FR
    });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      article: item.article,
      categorie: item.categorie || 'Outils_Equipements',
      sous_categorie: item.sousCategorie,
      fournisseur: item.fournisseur,
      quantite: String(item.quantite),
      unite: item.unite || 'Unité',
      achat_chf: String(item.achatChf),
      achat_cfa: String(item.achatCfa),
      valeur_chf: String(item.valeurChf),
      valeur_cfa: String(item.valeurCfa),
      localisation: item.localisation,
      statut: item.statut || 'Neuf',
      bu: item.bu || 'ADMIN_ORG',
      commentaires: item.commentaires
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.article.trim() || !formData.categorie) {
      window.alert(t.required);
      return;
    }
    setSaving(true);
    try {
      if (editingId) await api.updateInventoryItem(editingId, formData);
      else await api.createInventoryItem(formData);
      setShowModal(false);
      await loadInventory();
    } catch (saveError) {
      console.error(saveError);
      window.alert(`${t.saveError} ${saveError.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(t.confirmDelete)) return;
    try {
      await api.deleteInventoryItem(item.id);
      await loadInventory();
    } catch (deleteError) {
      console.error(deleteError);
      window.alert(`${t.deleteError} ${deleteError.message}`);
    }
  };

  const statusClass = (status) => {
    if (status === 'Neuf') return 'bg-emerald-500/15 text-emerald-300';
    if (status === 'Bon état') return 'bg-sky-500/15 text-sky-300';
    if (status === 'A Réparer') return 'bg-red-500/15 text-red-300';
    return 'bg-amber-500/15 text-amber-300';
  };

  const renderInventoryTable = (rows, compact = false) => (
    <table className="min-w-[1500px] w-full text-sm">
      <thead className="sticky top-0 z-10 bg-slate-700">
        <tr>
          <th className="px-4 py-3 text-left text-white">{t.reference}</th>
          <th className="px-4 py-3 text-left text-white">{t.article}</th>
          <th className="px-4 py-3 text-left text-white">{t.category}</th>
          <th className="px-4 py-3 text-right text-white">{t.quantity}</th>
          <th className="px-4 py-3 text-right text-white">{t.purchaseCHF}</th>
          <th className="px-4 py-3 text-right text-white">{t.purchaseCFA}</th>
          <th className="px-4 py-3 text-right text-white">{t.valueCHF}</th>
          <th className="px-4 py-3 text-right text-white">{t.valueCFA}</th>
          <th className="px-4 py-3 text-left text-white">{t.function}</th>
          <th className="px-4 py-3 text-left text-white">{t.location}</th>
          <th className="px-4 py-3 text-left text-white">{t.status}</th>
          {!compact && <th className="px-4 py-3 text-right text-white">{t.actions}</th>}
        </tr>
      </thead>
      <tbody>
        {rows.map(item => (
          <tr key={item.id} onClick={() => !compact && openEdit(item)} className="border-t border-slate-700 hover:bg-slate-700/45 cursor-pointer">
            <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{item.id}</td>
            <td className="px-4 py-3 text-slate-100 font-medium min-w-[260px]">
              {item.article}
              {item.sousCategorie && <div className="text-xs text-slate-500 mt-1">{item.sousCategorie}</div>}
            </td>
            <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{translateCategory(item.categorie)}</td>
            <td className="px-4 py-3 text-right text-slate-200">{formatAmount(item.quantite, 'fr-CH', 0)} {translateUnit(item.unite)}</td>
            <td className="px-4 py-3 text-right text-slate-400">{formatAmount(item.achatChf)} CHF</td>
            <td className="px-4 py-3 text-right text-slate-400">{formatAmount(item.achatCfa, 'fr-CH', 0)} CFA</td>
            <td className="px-4 py-3 text-right text-emerald-300 font-semibold">{formatAmount(item.valeurChf)} CHF</td>
            <td className="px-4 py-3 text-right text-sky-300 font-semibold">{formatAmount(item.valeurCfa, 'fr-CH', 0)} CFA</td>
            <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{translateBu(item.bu)}</td>
            <td className="px-4 py-3 text-slate-400 min-w-[160px]">{item.localisation || '-'}</td>
            <td className="px-4 py-3"><span className={`inline-flex rounded px-2 py-1 text-xs ${statusClass(item.statut)}`}>{translateStatus(item.statut)}</span></td>
            {!compact && (
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button type="button" title={t.edit} onClick={(event) => { event.stopPropagation(); openEdit(item); }} className="p-2 text-sky-300 hover:bg-sky-500/10 rounded"><Pencil size={16} /></button>
                  <button type="button" title={t.confirmDelete} onClick={(event) => { event.stopPropagation(); handleDelete(item); }} className="p-2 text-red-300 hover:bg-red-500/10 rounded"><Trash2 size={16} /></button>
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 lg:p-6">
        <div className="w-full">
          {error && <div className="mb-4 rounded border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200">{error}</div>}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 mb-6">
            {[
              { label: t.articles, value: formatAmount(inventaire.length, 'fr-CH', 0), sub: `${categoriesCount} ${t.categories}`, icon: Boxes, color: 'text-sky-400', bg: 'bg-sky-500/10' },
              { label: t.stockValue, value: `${formatAmount(summary.valeurChf)} CHF`, sub: `${formatAmount(summary.valeurCfa, 'fr-CH', 0)} CFA`, icon: CircleDollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
              { label: t.purchaseCost, value: `${formatAmount(summary.achatChf)} CHF`, sub: `${formatAmount(summary.achatCfa, 'fr-CH', 0)} CFA`, icon: PackagePlus, color: 'text-amber-400', bg: 'bg-amber-500/10' },
              { label: t.totalQuantity, value: formatAmount(summary.quantite, 'fr-CH', 0), sub: `${inventaire.length} ${t.articles.toLowerCase()}`, icon: Warehouse, color: 'text-violet-400', bg: 'bg-violet-500/10' }
            ].map(({ label, value, sub, icon: Icon, color, bg }) => (
              <div key={label} className="rounded-lg bg-slate-800 px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-750">
                <div className="flex items-start justify-between gap-4">
                  <div><p className="text-sm text-slate-400">{label}</p><p className="mt-2 text-2xl font-bold text-white">{value}</p><p className="mt-1 text-sm text-slate-400">{sub}</p></div>
                  <div className={`rounded-lg p-3 ${bg}`}><Icon size={24} className={color} /></div>
                </div>
              </div>
            ))}
          </div>

          <ModulePageTabs
            moduleId="stock"
            language={language}
            activeTab={activeTab}
            onSelect={setActiveTab}
            tabs={[
              { tab: 'overview', label: t.overview },
              { tab: 'inventory', label: `${t.inventory} (${inventaire.length})` },
              { tab: 'immobilisations', label: `${t.immobilisations} (${terrainSummary.quantite} ${t.terrainUnit})` },
              { tab: 'risques', label: `${t.risks} (${articlesRisques.length})` }
            ]}
          />

          {loading && <div className="py-16 text-center text-slate-400">Chargement...</div>}

          {!loading && activeTab === 'overview' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <div className="rounded-lg bg-slate-800 p-5">
                <h3 className="mb-1 font-bold text-white">{t.valueByCategory}</h3>
                <p className="mb-5 text-xs text-slate-500">{t.allRealData}</p>
                <ResponsiveContainer width="100%" height={360}>
                  <BarChart data={categoryChart} layout="vertical" margin={{ left: 20, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                    <XAxis type="number" stroke="#94a3b8" tickFormatter={(value) => formatAmount(value, 'fr-CH', 0)} />
                    <YAxis dataKey="label" type="category" width={160} stroke="#94a3b8" tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => [`${formatAmount(value)} CHF`, t.valueCHF]} contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                    <Bar dataKey="valeur" radius={[0, 5, 5, 0]}>
                      {categoryChart.map((entry, index) => <Cell key={entry.key} fill={CHART_COLORS[index % CHART_COLORS.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="rounded-lg bg-slate-800 p-5">
                <h3 className="mb-1 font-bold text-white">{t.valueByFunction}</h3>
                <p className="mb-5 text-xs text-slate-500">{t.allRealData}</p>
                <ResponsiveContainer width="100%" height={360}>
                  <BarChart data={functionChart} margin={{ left: 10, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="label" stroke="#94a3b8" tick={{ fontSize: 11 }} interval={0} />
                    <YAxis stroke="#94a3b8" tickFormatter={(value) => formatAmount(value, 'fr-CH', 0)} />
                    <Tooltip formatter={(value) => [`${formatAmount(value)} CHF`, t.valueCHF]} contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                    <Bar dataKey="valeur" fill="#38bdf8" radius={[5, 5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {!loading && activeTab === 'inventory' && (
            <div>
              <div className="mb-4 flex justify-end">
                <button type="button" onClick={openCreate} className="flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-500">
                  <PackagePlus size={18} /> {t.add}
                </button>
              </div>
              <TableControls rows={inventaire} defaultPageSize={10} maxHeight="34rem" renderTable={(rows) => renderInventoryTable(rows)} />
            </div>
          )}

          {!loading && activeTab === 'immobilisations' && (
            <div>
              <div className="mb-5 rounded-lg bg-sky-500/10 px-5 py-4 text-sm text-sky-100">
                <div className="flex gap-3"><Tags size={20} className="shrink-0 text-sky-400" /><div><p className="font-semibold">{t.explicitAssets}</p><p className="mt-1 text-slate-300">{t.assetRule}</p></div></div>
              </div>
              <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="rounded-lg bg-slate-800 p-5">
                  <p className="text-sm text-slate-400">{t.trackedLands}</p>
                  <p className="mt-2 text-3xl font-bold text-white">{terrainSummary.quantite} {t.terrainUnit}</p>
                  <p className="mt-1 text-sm text-slate-400">Lac Rose 2 + Diass 2</p>
                </div>
                <div className="rounded-lg bg-slate-800 p-5">
                  <p className="text-sm text-slate-400">{t.acquisitionValue}</p>
                  <p className="mt-2 text-2xl font-bold text-emerald-300">{formatAmount(terrainSummary.montantChf)} CHF</p>
                  <p className="mt-1 text-sm text-sky-300">{formatAmount(terrainSummary.montantCfa, 'fr-CH', 0)} CFA</p>
                </div>
                <div className="rounded-lg bg-slate-800 p-5">
                  <p className="text-sm text-slate-400">{t.sourceFlow}</p>
                  <p className="mt-2 text-2xl font-bold text-white">{t.realEstateFinanceSource}</p>
                  <p className="mt-1 text-sm text-slate-400">{t.landPurchaseLines}</p>
                </div>
              </div>
              <div className="mb-6 overflow-x-auto rounded-lg bg-slate-800">
                <div className="flex flex-col gap-3 border-b border-slate-700 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-bold text-white">{t.landRegistry}</h3>
                  <button type="button" onClick={openCreateLandAsset} className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500">
                    <PackagePlus size={16} /> {t.addLand}
                  </button>
                </div>
                <table className="min-w-[1180px] w-full text-sm">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-white">{t.reference}</th>
                      <th className="px-4 py-3 text-left text-white">{t.project}</th>
                      <th className="px-4 py-3 text-left text-white">{t.parcel}</th>
                      <th className="px-4 py-3 text-left text-white">{t.holder}</th>
                      <th className="px-4 py-3 text-left text-white">{t.sourceFlow}</th>
                      <th className="px-4 py-3 text-right text-white">{t.purchaseCHF}</th>
                      <th className="px-4 py-3 text-right text-white">{t.purchaseCFA}</th>
                      <th className="px-4 py-3 text-left text-white">{t.status}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {terrainsFonciers.map((item) => (
                      <tr key={item.id} className="border-t border-slate-700">
                        <td className="px-4 py-3 text-slate-400">{item.sourceId}</td>
                        <td className="px-4 py-3 text-slate-100 font-semibold">{item.label}</td>
                        <td className="px-4 py-3 text-white font-semibold">{item.parcelle}</td>
                        <td className="px-4 py-3 text-slate-300">{item.titulaire || '-'}</td>
                        <td className="px-4 py-3 text-slate-300">
                          {item.designation}
                          <div className="mt-1 text-xs text-slate-500">{item.date} · {t.realEstateFinanceSource}</div>
                        </td>
                        <td className="px-4 py-3 text-right text-emerald-300 font-semibold">{formatAmount(item.montantChf)} CHF</td>
                        <td className="px-4 py-3 text-right text-sky-300 font-semibold">{formatAmount(item.montantCfa, 'fr-CH', 0)} CFA</td>
                        <td className="px-4 py-3 text-slate-300">{item.statut || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-bold text-white">{t.stockLines}</h3>
                  <p className="mt-1 max-w-3xl text-xs text-slate-400">{hasDiassStockLine ? t.stockLinesSourceReady : t.stockLinesSourcePending}</p>
                </div>
                <button type="button" onClick={openCreateLandAsset} className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600">
                  <PackagePlus size={16} /> {t.addStockAsset}
                </button>
              </div>
              <TableControls
                rows={immobilisations}
                defaultPageSize={10}
                maxHeight="32rem"
                renderEmpty={() => <div className="px-6 py-10 text-center text-slate-400">{t.noAssets}</div>}
                renderTable={(rows) => renderInventoryTable(rows)}
              />
            </div>
          )}

          {!loading && activeTab === 'risques' && (
            <div>
              <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-red-500/10 p-5"><div className="flex items-center gap-3"><Wrench className="text-red-400" /><div><p className="text-slate-400 text-sm">{t.repair}</p><p className="text-2xl font-bold text-white">{inventaire.filter(item => item.statut === 'A Réparer').length}</p></div></div></div>
                <div className="rounded-lg bg-amber-500/10 p-5"><div className="flex items-center gap-3"><AlertTriangle className="text-amber-400" /><div><p className="text-slate-400 text-sm">{t.transit}</p><p className="text-2xl font-bold text-white">{inventaire.filter(item => /shipping|transit/i.test(item.localisation)).length}</p></div></div></div>
              </div>
              <TableControls
                rows={articlesRisques}
                defaultPageSize={10}
                maxHeight="32rem"
                renderEmpty={() => <div className="px-6 py-10 text-center text-slate-400">{t.riskMessage}</div>}
                renderTable={(rows) => renderInventoryTable(rows)}
              />
            </div>
          )}

          <ChildTabPlaceholder moduleId="stock" language={language} activeTab={activeTab} handledTabs={['inventory', 'overview', 'immobilisations', 'risques']} />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4">
          <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between"><h2 className="text-xl font-bold text-white">{editingId ? t.edit : t.add}</h2><button type="button" onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">×</button></div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <label className="lg:col-span-2"><span className="mb-1 block text-sm text-slate-300">{t.article} *</span><input value={formData.article} onChange={(event) => setFormData(prev => ({ ...prev, article: event.target.value }))} className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-white" /></label>
              <label><span className="mb-1 block text-sm text-slate-300">{t.category} *</span><select value={formData.categorie} onChange={(event) => setFormData(prev => ({ ...prev, categorie: event.target.value }))} className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-white">{CATEGORY_VALUES.map(value => <option key={value} value={value}>{translateCategory(value)}</option>)}</select></label>
              <label><span className="mb-1 block text-sm text-slate-300">{t.subCategory}</span><input value={formData.sous_categorie} onChange={(event) => setFormData(prev => ({ ...prev, sous_categorie: event.target.value }))} className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-white" /></label>
              <label><span className="mb-1 block text-sm text-slate-300">{t.quantity}</span><input type="number" min="0" step="1" value={formData.quantite} onChange={(event) => setFormData(prev => ({ ...prev, quantite: event.target.value }))} className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-white" /></label>
              <label><span className="mb-1 block text-sm text-slate-300">{t.unit}</span><select value={formData.unite} onChange={(event) => setFormData(prev => ({ ...prev, unite: event.target.value }))} className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-white">{UNIT_VALUES.map(value => <option key={value} value={value}>{translateUnit(value)}</option>)}</select></label>
              <label><span className="mb-1 block text-sm text-slate-300">{t.purchaseCHF}</span><input type="number" min="0" step="0.01" value={formData.achat_chf} onChange={(event) => setFormData(prev => ({ ...prev, achat_chf: event.target.value }))} className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-white" /></label>
              <label><span className="mb-1 block text-sm text-slate-300">{t.purchaseCFA}</span><input type="number" min="0" step="1" value={formData.achat_cfa} onChange={(event) => setFormData(prev => ({ ...prev, achat_cfa: event.target.value }))} className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-white" /></label>
              <label><span className="mb-1 block text-sm text-slate-300">{t.valueCHF}</span><input type="number" min="0" step="0.01" value={formData.valeur_chf} onChange={(event) => setFormData(prev => ({ ...prev, valeur_chf: event.target.value }))} className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-white" /></label>
              <label><span className="mb-1 block text-sm text-slate-300">{t.valueCFA}</span><input type="number" min="0" step="1" value={formData.valeur_cfa} onChange={(event) => setFormData(prev => ({ ...prev, valeur_cfa: event.target.value }))} className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-white" /></label>
              <label><span className="mb-1 block text-sm text-slate-300">{t.function}</span><select value={formData.bu} onChange={(event) => setFormData(prev => ({ ...prev, bu: event.target.value }))} className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-white">{BU_VALUES.map(value => <option key={value} value={value}>{translateBu(value)}</option>)}</select><span className="mt-1 block text-xs text-slate-500">{t.functionHint}</span></label>
              <label><span className="mb-1 block text-sm text-slate-300">{t.status}</span><select value={formData.statut} onChange={(event) => setFormData(prev => ({ ...prev, statut: event.target.value }))} className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-white">{STATUS_VALUES.map(value => <option key={value} value={value}>{translateStatus(value)}</option>)}</select></label>
              <label><span className="mb-1 block text-sm text-slate-300">{t.location}</span><input value={formData.localisation} onChange={(event) => setFormData(prev => ({ ...prev, localisation: event.target.value }))} className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-white" /></label>
              <label><span className="mb-1 block text-sm text-slate-300">{t.supplier}</span><input value={formData.fournisseur} onChange={(event) => setFormData(prev => ({ ...prev, fournisseur: event.target.value }))} className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-white" /></label>
              <label className="md:col-span-2 lg:col-span-3"><span className="mb-1 block text-sm text-slate-300">{t.comments}</span><textarea rows="3" value={formData.commentaires} onChange={(event) => setFormData(prev => ({ ...prev, commentaires: event.target.value }))} className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-white" /></label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setShowModal(false)} className="rounded-lg bg-slate-700 px-4 py-2 text-white hover:bg-slate-600">{t.cancel}</button>
              <button type="button" disabled={saving} onClick={handleSave} className="rounded-lg bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-500 disabled:opacity-50">{saving ? '...' : t.save}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Actifs;
