import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { Gift, HeartHandshake, Info, Target, TrendingUp, Users } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { ModulePageTabs, ChildTabPlaceholder } from './moduleTabs';
import TableControls from './TableControls';
import api from './api';

const dictionaries = {
  FR: {
    overview: "Vue d'ensemble",
    prospects: 'Prospects',
    clients: 'Clients',
    ventes: 'Ventes',
    dons: 'Dons',
    beneficiaires: 'Bénéficiaires',
    socialFlows: 'Flux sociaux reclassés',
    inKindDonations: 'Dons en nature rapprochés',
    totalSocial: 'Total social reclassé',
    validatedSources: 'Sources validées',
    toBuild: 'À construire',
    toBuildText: 'Aucune table métier validée pour ce registre. Les anciennes données Genspark restent une référence UX, mais ne sont pas affichées comme données réelles.',
    sourceNotice: 'Données réelles dérivées de Finances > Social - Flux reclassés et des candidats dons en nature de Stocks & Actifs. Les données Genspark sont conservées uniquement comme référence de comparaison.',
    financeSocialSource: 'Finance Social',
    inventorySource: 'Stocks & Actifs',
    beneficiariesByType: "Bénéficiaires par type d'aide",
    donationsByNature: 'Dons en nature par catégorie',
    socialByYear: 'Flux sociaux par année',
    noDonationRows: 'Aucun don en nature rapproché depuis Stocks & Actifs pour le moment.',
    noBeneficiaryRows: 'Aucun flux social reclassé chargé pour le moment.',
    date: 'Date',
    ref: 'Réf.',
    beneficiary: 'Bénéficiaire',
    designation: 'Désignation',
    aidType: "Type d'aide",
    amountChf: 'Montant CHF',
    amountCfa: 'Montant CFA',
    source: 'Source',
    agent: 'Agent',
    team: 'Team',
    department: 'Département',
    country: 'Pays',
    donor: 'Donateur',
    nature: 'Nature',
    destination: 'Destination',
    quantity: 'Quantité',
    unit: 'Unité',
    status: 'Statut',
    comment: 'Commentaire',
    readOnly: 'Registre dérivé en lecture seule. La table CRM définitive sera créée après validation du schéma métier.'
  },
  EN: {
    overview: 'Overview',
    prospects: 'Prospects',
    clients: 'Clients',
    ventes: 'Sales',
    dons: 'Donations',
    beneficiaires: 'Beneficiaries',
    socialFlows: 'Reclassified social flows',
    inKindDonations: 'Matched in-kind donations',
    totalSocial: 'Total reclassified social',
    validatedSources: 'Validated sources',
    toBuild: 'To build',
    toBuildText: 'No validated business table exists for this register. Previous Genspark data remains a UX reference, but is not shown as real data.',
    sourceNotice: 'Real data derived from Finance > Social - Reclassified flows and in-kind donation candidates from Stocks & Assets. Genspark data is kept only as comparison reference.',
    financeSocialSource: 'Finance Social',
    inventorySource: 'Stocks & Assets',
    beneficiariesByType: 'Beneficiaries by aid type',
    donationsByNature: 'In-kind donations by category',
    socialByYear: 'Social flows by year',
    noDonationRows: 'No in-kind donation matched from Stocks & Assets yet.',
    noBeneficiaryRows: 'No reclassified social flow loaded yet.',
    date: 'Date',
    ref: 'Ref.',
    beneficiary: 'Beneficiary',
    designation: 'Description',
    aidType: 'Aid type',
    amountChf: 'Amount CHF',
    amountCfa: 'Amount CFA',
    source: 'Source',
    agent: 'Agent',
    team: 'Team',
    department: 'Department',
    country: 'Country',
    donor: 'Donor',
    nature: 'Nature',
    destination: 'Destination',
    quantity: 'Quantity',
    unit: 'Unit',
    status: 'Status',
    comment: 'Comment',
    readOnly: 'Derived read-only register. The definitive CRM table will be created after the business schema is validated.'
  },
  DE: {
    overview: 'Übersicht',
    prospects: 'Interessenten',
    clients: 'Kunden',
    ventes: 'Verkäufe',
    dons: 'Spenden',
    beneficiaires: 'Begünstigte',
    socialFlows: 'Umklassierte Sozialflüsse',
    inKindDonations: 'Abgeglichene Sachspenden',
    totalSocial: 'Total umklassiert sozial',
    validatedSources: 'Validierte Quellen',
    toBuild: 'Im Aufbau',
    toBuildText: 'Für dieses Register gibt es noch keine validierte Fachtabelle. Frühere Genspark-Daten bleiben eine UX-Referenz, werden aber nicht als echte Daten angezeigt.',
    sourceNotice: 'Echte Daten aus Finanzen > Sozial - umklassierte Flüsse und Sachspenden-Kandidaten aus Lager & Aktiven. Genspark-Daten bleiben nur Vergleichsreferenz.',
    financeSocialSource: 'Finance Social',
    inventorySource: 'Lager & Aktiven',
    beneficiariesByType: 'Begünstigte nach Hilfetyp',
    donationsByNature: 'Sachspenden nach Kategorie',
    socialByYear: 'Sozialflüsse nach Jahr',
    noDonationRows: 'Noch keine Sachspende aus Lager & Aktiven abgeglichen.',
    noBeneficiaryRows: 'Noch kein umklassierter Sozialfluss geladen.',
    date: 'Datum',
    ref: 'Ref.',
    beneficiary: 'Begünstigter',
    designation: 'Bezeichnung',
    aidType: 'Hilfetyp',
    amountChf: 'Betrag CHF',
    amountCfa: 'Betrag CFA',
    source: 'Quelle',
    agent: 'Agent',
    team: 'Team',
    department: 'Abteilung',
    country: 'Land',
    donor: 'Spender',
    nature: 'Art',
    destination: 'Ziel',
    quantity: 'Menge',
    unit: 'Einheit',
    status: 'Status',
    comment: 'Kommentar',
    readOnly: 'Abgeleitetes Leseregister. Die definitive CRM-Tabelle wird nach Validierung des Fachschemas erstellt.'
  }
};

const valueLabels = {
  FR: {
    'Aide sociale': 'Aide sociale',
    'Aide Sociale': 'Aide sociale',
    'Don en nature': 'Don en nature',
    'Don matériel': 'Don matériel',
    'Stock à rapprocher': 'Stock à rapprocher',
    'Reclassé Social': 'Reclassé Social',
    'A rapprocher': 'À rapprocher',
    SOCIAL: 'Social',
    IMMO: 'Fin Immo',
    ADMIN_ORG: 'Administration',
    IMPORT_EXPORT: 'Commercial & CRM',
    TECH_DIGITAL: 'IT & Support'
  },
  EN: {
    'Aide sociale': 'Social aid',
    'Aide Sociale': 'Social aid',
    'Don en nature': 'In-kind donation',
    'Don matériel': 'Material donation',
    'Stock à rapprocher': 'Stock to reconcile',
    'Reclassé Social': 'Reclassified Social',
    'A rapprocher': 'To reconcile',
    SOCIAL: 'Social',
    IMMO: 'Real Estate Finance',
    ADMIN_ORG: 'Administration',
    IMPORT_EXPORT: 'Sales & CRM',
    TECH_DIGITAL: 'IT & Support'
  },
  DE: {
    'Aide sociale': 'Sozialhilfe',
    'Aide Sociale': 'Sozialhilfe',
    'Don en nature': 'Sachspende',
    'Don matériel': 'Sachspende',
    'Stock à rapprocher': 'Lager abzugleichen',
    'Reclassé Social': 'Sozial umklassiert',
    'A rapprocher': 'Abzugleichen',
    SOCIAL: 'Soziales',
    IMMO: 'Immobilienfinanzierung',
    ADMIN_ORG: 'Administration',
    IMPORT_EXPORT: 'Marketing & CRM',
    TECH_DIGITAL: 'IT & Support'
  }
};

const chartColors = ['#38bdf8', '#34d399', '#f59e0b', '#a78bfa', '#fb7185', '#22d3ee'];
const tabs = ['overview', 'prospects', 'clients', 'ventes', 'dons', 'beneficiaires'];

const numberValue = (value) => Number(value) || 0;

const normalizeText = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const cleanDateValue = (value) => {
  if (!value) return '';
  const raw = value?.value || value;
  if (typeof raw === 'string') return raw.slice(0, 10);
  try {
    return new Date(raw).toISOString().slice(0, 10);
  } catch {
    return String(raw).slice(0, 10);
  }
};

const isDonationCandidate = (item) => {
  const haystack = normalizeText([
    item.article,
    item.categorie,
    item.sous_categorie,
    item.fournisseur,
    item.localisation,
    item.bu,
    item.commentaires,
    item.statut
  ].join(' '));

  return (
    haystack.includes('don') ||
    haystack.includes('donateur') ||
    haystack.includes('donation') ||
    haystack.includes('nature') ||
    haystack.includes('social')
  );
};

const deriveBeneficiaryName = (row) => {
  if (row.beneficiaire) return row.beneficiaire;
  const description = String(row.description || '');
  if (/famille|menage|ménage/i.test(description)) return 'Famille SN';
  if (/rufisque/i.test(description)) return 'Communauté Rufisque';
  return 'Bénéficiaire à préciser';
};

const normalizeSocialRow = (row, index) => ({
  id: row.id || row.ref || `SOC-${index + 1}`,
  ref: row.ref || row.id || `SOC-${index + 1}`,
  date: cleanDateValue(row.date_created || row.date || row.date_operation),
  beneficiaire: deriveBeneficiaryName(row),
  designation: row.description || row.designation || '',
  typeAide: row.nature_sociale || row.category || 'Aide sociale',
  montantChf: numberValue(row.montant_chf ?? row.montantChf),
  montantCfa: numberValue(row.montant_cfa ?? row.montantCfa),
  tauxFx: numberValue(row.taux_fx),
  source: 'Finance Social',
  statut: 'Reclassé Social',
  agent: row.agent || '',
  team: row.team || '',
  departement: row.departement || 'Finances',
  pays: row.pays || 'SN',
  phaseProjet: row.phase_projet || '',
  commentaire: row.commentaire || ''
});

const normalizeInventoryDonation = (item, index) => ({
  id: item.source_id || item.id || item.ref || `DON-STOCK-${index + 1}`,
  ref: item.source_id || item.id || item.ref || `DON-STOCK-${index + 1}`,
  date: cleanDateValue(item.date_acquisition || item.date || item.created_at),
  donateur: item.fournisseur || 'À confirmer',
  nature: normalizeText(`${item.categorie} ${item.sous_categorie} ${item.commentaires}`).includes('don')
    ? 'Don en nature'
    : 'Stock à rapprocher',
  designation: item.article || item.name || '',
  montantChf: numberValue(item.valeur_chf ?? item.achat_chf ?? item.price),
  montantCfa: numberValue(item.valeur_cfa ?? item.achat_cfa),
  quantite: numberValue(item.quantite ?? item.quantity),
  unite: item.unite || '',
  destination: item.localisation || item.bu || '',
  bu: item.bu || '',
  source: 'Stocks & Actifs',
  statut: item.statut || item.status || 'A rapprocher',
  commentaire: item.commentaires || ''
});

const CRM = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const queryTab = new URLSearchParams(location.search).get('tab');
  const [activeTab, setActiveTab] = useState(tabs.includes(queryTab) ? queryTab : 'overview');
  const [beneficiaires, setBeneficiaires] = useState([]);
  const [dons, setDons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');

  const t = dictionaries[language] || dictionaries.FR;
  const tv = useCallback((value) => valueLabels[language]?.[value] || valueLabels.FR[value] || value || '-', [language]);

  useEffect(() => {
    setActiveTab(tabs.includes(queryTab) ? queryTab : 'overview');
  }, [queryTab]);

  useEffect(() => {
    let isMounted = true;

    const loadValidatedData = async () => {
      setLoading(true);
      setLoadError('');
      try {
        const [socialResponse, inventoryResponse] = await Promise.all([
          api.getSocialFinance(300, 0).catch((error) => ({ error })),
          api.getInventory(500, 0).catch((error) => ({ error }))
        ]);

        if (!isMounted) return;

        const socialRows = Array.isArray(socialResponse?.data) ? socialResponse.data : [];
        const inventoryRows = Array.isArray(inventoryResponse?.data) ? inventoryResponse.data : [];

        setBeneficiaires(socialRows.map(normalizeSocialRow));
        setDons(inventoryRows.filter(isDonationCandidate).map(normalizeInventoryDonation));

        if (socialResponse?.error || inventoryResponse?.error) {
          setLoadError('Certaines sources validées ne sont pas joignables pour le moment.');
        }
      } catch (error) {
        if (!isMounted) return;
        console.error('Erreur chargement CRM validé:', error);
        setBeneficiaires([]);
        setDons([]);
        setLoadError(error.message || 'Erreur de chargement');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadValidatedData();
    return () => {
      isMounted = false;
    };
  }, []);

  const formatChf = (value) => `${numberValue(value).toLocaleString('fr-CH', { maximumFractionDigits: 2 })} CHF`;
  const formatCfa = (value) => `${Math.round(numberValue(value)).toLocaleString('fr-CH')} CFA`;
  const formatDate = (value) => {
    if (!value) return '-';
    try {
      return new Intl.DateTimeFormat(language === 'DE' ? 'de-DE' : language === 'EN' ? 'en-GB' : 'fr-FR').format(new Date(value));
    } catch {
      return value;
    }
  };

  const socialTotals = useMemo(() => beneficiaires.reduce((acc, item) => {
    acc.chf += item.montantChf;
    acc.cfa += item.montantCfa;
    return acc;
  }, { chf: 0, cfa: 0 }), [beneficiaires]);

  const donsTotals = useMemo(() => dons.reduce((acc, item) => {
    acc.chf += item.montantChf;
    acc.cfa += item.montantCfa;
    return acc;
  }, { chf: 0, cfa: 0 }), [dons]);

  const aidByType = useMemo(() => {
    const grouped = {};
    beneficiaires.forEach((item) => {
      const key = item.typeAide || 'Aide sociale';
      grouped[key] = (grouped[key] || 0) + 1;
    });
    return Object.entries(grouped).map(([name, value]) => ({ name: tv(name), value }));
  }, [beneficiaires, tv]);

  const donationsByNature = useMemo(() => {
    const grouped = {};
    dons.forEach((item) => {
      const key = item.nature || 'Don en nature';
      grouped[key] = (grouped[key] || 0) + item.montantChf;
    });
    return Object.entries(grouped).map(([name, value]) => ({ name: tv(name), value }));
  }, [dons, tv]);

  const socialByYear = useMemo(() => {
    const grouped = {};
    beneficiaires.forEach((item) => {
      const year = String(item.date || '').slice(0, 4);
      if (!/^\d{4}$/.test(year)) return;
      grouped[year] = (grouped[year] || 0) + item.montantChf;
    });
    return Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([year, value]) => ({ year, value }));
  }, [beneficiaires]);

  const KpiCard = ({ label, value, secondary, icon: Icon, color }) => (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-5 transition hover:-translate-y-0.5 hover:border-slate-500 hover:shadow-lg hover:shadow-blue-950/30">
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

  const Notice = ({ children }) => (
    <div className="mb-4 flex items-start gap-3 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">
      <Info size={18} className="mt-0.5 shrink-0 text-blue-300" />
      <span>{children}</span>
    </div>
  );

  const EmptyRegister = ({ title }) => (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-8">
      <p className="text-lg font-bold text-white">{title}</p>
      <p className="mt-2 max-w-3xl text-sm text-slate-400">{t.toBuildText}</p>
    </div>
  );

  const DataTable = ({ rows, columns, renderRow, emptyText }) => (
    <div>
      <Notice>{t.readOnly}</Notice>
      <TableControls
        rows={rows}
        maxHeight="34rem"
        renderEmpty={() => <div className="px-6 py-8 text-center text-slate-400">{emptyText}</div>}
        renderTable={(visibleRows) => (
          <table className="min-w-[1200px] text-sm">
            <thead className="sticky top-0 z-10 bg-slate-700">
              <tr>
                {columns.map((column) => (
                  <th key={column} className="px-4 py-3 text-left font-bold text-white">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((item) => (
                <tr key={item.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                  {renderRow(item)}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      />
    </div>
  );

  const tableCell = (children, className = 'text-slate-300') => (
    <td className={`px-4 py-3 align-top ${className}`}>{children || '-'}</td>
  );
  const badge = (children) => (
    <span className="inline-flex rounded bg-slate-700 px-2 py-1 text-xs font-semibold text-slate-200">{children}</span>
  );

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="mx-auto w-full max-w-[1800px]">
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-5">
          <KpiCard label={t.validatedSources} value="2" secondary="Finance + Stocks" icon={Target} color="text-blue-400" />
          <KpiCard label={t.socialFlows} value={beneficiaires.length} secondary={t.financeSocialSource} icon={HeartHandshake} color="text-cyan-400" />
          <KpiCard label={t.totalSocial} value={formatChf(socialTotals.chf)} secondary={formatCfa(socialTotals.cfa)} icon={TrendingUp} color="text-emerald-400" />
          <KpiCard label={t.inKindDonations} value={dons.length} secondary={`${formatChf(donsTotals.chf)} / ${formatCfa(donsTotals.cfa)}`} icon={Gift} color="text-purple-400" />
          <KpiCard label={t.toBuild} value="3" secondary={`${t.prospects} / ${t.clients} / ${t.ventes}`} icon={Users} color="text-amber-400" />
        </div>

        {loadError && <Notice>{loadError}</Notice>}
        <Notice>{loading ? `${t.sourceNotice} Chargement...` : t.sourceNotice}</Notice>

        <ModulePageTabs
          moduleId="commercial"
          language={language}
          activeTab={activeTab}
          onSelect={setActiveTab}
          tabs={[
            { tab: 'overview', label: t.overview },
            { tab: 'prospects', label: `${t.prospects} (0)` },
            { tab: 'clients', label: `${t.clients} (0)` },
            { tab: 'ventes', label: `${t.ventes} (0)` },
            { tab: 'dons', label: `${t.dons} (${dons.length})` },
            { tab: 'beneficiaires', label: `${t.beneficiaires} (${beneficiaires.length})` }
          ]}
        />

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
                <h3 className="mb-4 font-bold text-white">{t.beneficiariesByType}</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={aidByType} dataKey="value" nameKey="name" innerRadius={55} outerRadius={92} label={({ name, value }) => `${name}: ${value}`}>
                      {aidByType.map((entry, index) => <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />)}
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
                <h3 className="mb-4 font-bold text-white">{t.socialByYear}</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={socialByYear}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="year" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} formatter={(value) => formatChf(value)} />
                    <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={2} dot={{ r: 4, fill: '#38bdf8' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prospects' && <EmptyRegister title={t.prospects} />}
        {activeTab === 'clients' && <EmptyRegister title={t.clients} />}
        {activeTab === 'ventes' && <EmptyRegister title={t.ventes} />}

        {activeTab === 'dons' && (
          <DataTable
            rows={dons}
            emptyText={t.noDonationRows}
            columns={[t.ref, t.designation, t.nature, t.amountChf, t.amountCfa, t.quantity, t.unit, t.destination, 'BU', t.status, t.source]}
            renderRow={(item) => (
              <>
                {tableCell(item.ref, 'font-semibold text-slate-200')}
                {tableCell(<strong>{item.designation}</strong>, 'text-slate-200')}
                {tableCell(tv(item.nature))}
                {tableCell(formatChf(item.montantChf), 'font-bold text-emerald-300')}
                {tableCell(formatCfa(item.montantCfa), 'font-semibold text-amber-300')}
                {tableCell(item.quantite)}
                {tableCell(item.unite)}
                {tableCell(item.destination)}
                {tableCell(badge(tv(item.bu)))}
                {tableCell(badge(tv(item.statut)))}
                {tableCell(item.source)}
              </>
            )}
          />
        )}

        {activeTab === 'beneficiaires' && (
          <DataTable
            rows={beneficiaires}
            emptyText={t.noBeneficiaryRows}
            columns={[t.ref, t.date, t.beneficiary, t.designation, t.aidType, t.amountChf, t.amountCfa, t.agent, t.team, t.department, t.country, t.source]}
            renderRow={(item) => (
              <>
                {tableCell(item.ref, 'font-semibold text-slate-200')}
                {tableCell(formatDate(item.date))}
                {tableCell(<strong>{item.beneficiaire}</strong>, 'text-slate-200')}
                {tableCell(item.designation, 'text-slate-400')}
                {tableCell(tv(item.typeAide))}
                {tableCell(formatChf(item.montantChf), 'font-bold text-emerald-300')}
                {tableCell(formatCfa(item.montantCfa), 'font-semibold text-amber-300')}
                {tableCell(item.agent)}
                {tableCell(item.team)}
                {tableCell(item.departement)}
                {tableCell(badge(item.pays))}
                {tableCell(item.source)}
              </>
            )}
          />
        )}

        <ChildTabPlaceholder moduleId="commercial" language={language} activeTab={activeTab} handledTabs={tabs} />
      </div>
    </div>
  );
};

export default CRM;
