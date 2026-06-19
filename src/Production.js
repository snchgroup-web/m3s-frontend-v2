import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Plus, Edit2, Trash2, Package, CheckCircle, AlertCircle, Truck } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Production = () => {
  const { language } = useLanguage();

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
      FR: { 'Matériel': 'Matériel', 'Logiciels': 'Logiciels', 'Services': 'Services' },
      EN: { 'Matériel': 'Hardware', 'Logiciels': 'Software', 'Services': 'Services' },
      DE: { 'Matériel': 'Hardware', 'Logiciels': 'Software', 'Services': 'Dienstleistungen' }
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
  const translateCategory = (category) => dataTranslations.categories[language]?.[category] || category;
  const translateChartLabel = (label) => dataTranslations.chartLabels[language]?.[label] || label;

  const [activeTab, setActiveTab] = useState('overview');
  const [commandes, setCommandes] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('commande');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    numero: '',
    client: '',
    produit: '',
    quantite: '',
    statut: 'En cours',
    date: new Date().toISOString().split('T')[0]
  });
 
  useEffect(() => {
    setCommandes([
      { id: 1, numero: 'CMD-001', client: 'SENELEC', produit: 'Solutions IT', quantite: 10, statut: 'Livrée', date: '2026-04-01' },
      { id: 2, numero: 'CMD-002', client: 'UCAD', produit: 'Formation', quantite: 50, statut: 'En cours', date: '2026-04-05' },
      { id: 3, numero: 'CMD-003', client: 'Orange Sénégal', produit: 'Consultation', quantite: 5, statut: 'En cours', date: '2026-04-10' },
      { id: 4, numero: 'CMD-004', client: 'Banque Sénégalaise', produit: 'Implémentation', quantite: 1, statut: 'Préparation', date: '2026-04-15' },
    ]);
 
    setFournisseurs([
      { id: 1, nom: 'Tech Solutions Dakar', email: 'contact@techsol.sn', telephone: '+221 77 123 4567', categorie: 'Matériel', pays: 'Sénégal' },
      { id: 2, nom: 'Logiciels Internationaux', email: 'sales@logiciels.com', telephone: '+33 1 23 45 67 89', categorie: 'Logiciels', pays: 'France' },
      { id: 3, nom: 'Consulting Global', email: 'info@consulting.com', telephone: '+41 44 123 4567', categorie: 'Services', pays: 'Suisse' },
    ]);
 
    setStocks([
      { id: 1, produit: 'Licences IT', quantite: 250, seuil: 100, unite: 'Unité' },
      { id: 2, produit: 'Matériel Informatique', quantite: 45, seuil: 20, unite: 'Unité' },
      { id: 3, produit: 'Fournitures Bureau', quantite: 500, seuil: 200, unite: 'Unité' },
      { id: 4, produit: 'Consommables', quantite: 80, seuil: 50, unite: 'Unité' },
    ]);
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
    setFormData(prev => ({ ...prev, [field]: value }));
  };
 
  const handleSave = () => {
    if (!formData.numero || !formData.client) {
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
      if (editingId) {
        setFournisseurs(fournisseurs.map(f => f.id === editingId ? { ...formData, id: editingId } : f));
      } else {
        setFournisseurs([...fournisseurs, { ...formData, id: Date.now() }]);
      }
    } else {
      if (editingId) {
        setStocks(stocks.map(s => s.id === editingId ? { ...formData, id: editingId, quantite: parseInt(formData.quantite) } : s));
      } else {
        setStocks([...stocks, { ...formData, id: Date.now(), quantite: parseInt(formData.quantite) }]);
      }
    }
 
    setShowModal(false);
    setEditingId(null);
    setFormData({ numero: '', client: '', produit: '', quantite: '', statut: 'En cours', date: new Date().toISOString().split('T')[0] });
  };
 
  const handleEdit = (type, item) => {
    setModalType(type);
    setEditingId(item.id);
    setFormData(item);
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
        <div className="max-w-7xl mx-auto">
 
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">📦 {t.title}</h1>
          <p className="text-slate-400">{t.subtitle}</p>
        </div>
 
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
        <div className="flex gap-4 mb-6 border-b border-slate-700 overflow-x-auto">
          <button onClick={() => setActiveTab('overview')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>{t.overview}</button>
          <button onClick={() => setActiveTab('commandes')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'commandes' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>{t.commandes}</button>
          <button onClick={() => setActiveTab('fournisseurs')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'fournisseurs' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>{t.fournisseurs}</button>
          <button onClick={() => setActiveTab('stocks')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'stocks' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>{t.stocks}</button>
        </div>
 
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
              <button onClick={() => { setEditingId(null); setModalType('commande'); setFormData({ numero: '', client: '', produit: '', quantite: '', statut: 'En cours', date: new Date().toISOString().split('T')[0] }); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                <Plus size={20} /> {t.nouvelleCommande}
              </button>
            </div>
            <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-700">
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
                  {commandes.map(c => (
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
            </div>
          </div>
        )}
 
        {activeTab === 'fournisseurs' && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={() => { setEditingId(null); setModalType('fournisseur'); setFormData({ numero: '', client: '', produit: '', quantite: '', statut: 'En cours', date: new Date().toISOString().split('T')[0] }); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition">
                <Plus size={20} /> {t.nouveauFournisseur}
              </button>
            </div>
            <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.nom}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.email}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.categorie}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.pays}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {fournisseurs.map(f => (
                    <tr key={f.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                      <td className="px-4 py-2 text-slate-300 font-medium">{f.nom}</td>
                      <td className="px-4 py-2 text-slate-400 text-xs">{f.email}</td>
                      <td className="px-4 py-2 text-slate-400">{translateCategory(f.categorie)}</td>
                      <td className="px-4 py-2 text-slate-400">{f.pays}</td>
                      <td className="px-4 py-2 flex gap-2">
                        <button onClick={() => handleEdit('fournisseur', f)} className="p-1 hover:bg-slate-600 rounded">
                          <Edit2 size={16} className="text-blue-400" />
                        </button>
                        <button onClick={() => handleDelete('fournisseur', f.id)} className="p-1 hover:bg-slate-600 rounded">
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
 
        {activeTab === 'stocks' && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={() => { setEditingId(null); setModalType('stock'); setFormData({ numero: '', client: '', produit: '', quantite: '', statut: 'En cours', date: new Date().toISOString().split('T')[0] }); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition">
                <Plus size={20} /> {t.ajouterStock}
              </button>
            </div>
            <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.produit}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.quantite}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.seuil}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.statut}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map(s => (
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
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              {modalType === 'commande' ? t.nouvelleCommande : modalType === 'fournisseur' ? t.nouveauFournisseur : t.ajouterStock}
            </h2>
 
            <div className="space-y-4">
              <input type="text" placeholder="Champ 1" value={formData.numero} onChange={(e) => handleFormChange('numero', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
              <input type="text" placeholder="Champ 2" value={formData.client} onChange={(e) => handleFormChange('client', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
              <input type="date" value={formData.date} onChange={(e) => handleFormChange('date', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
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
