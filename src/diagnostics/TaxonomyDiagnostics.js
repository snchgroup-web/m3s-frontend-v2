import React, { useState } from 'react';
import {
  getDigitalOfferTaxonomyData,
  getDigitalOffersTaxonomyData
} from '../taxonomyDataProvider';

const testCases = [
  { id: 'list', label: 'Tester liste complete', run: () => getDigitalOffersTaxonomyData() },
  { id: 'saas', label: 'Tester SAAS', run: () => getDigitalOfferTaxonomyData('SAAS') },
  { id: 'km', label: 'Tester KM', run: () => getDigitalOfferTaxonomyData('KM') },
  { id: 'ia', label: 'Tester IA', run: () => getDigitalOfferTaxonomyData('IA') },
  { id: 'unknown', label: 'Tester UNKNOWN_TYPE', run: () => getDigitalOfferTaxonomyData('UNKNOWN_TYPE') },
  {
    id: 'local',
    label: 'Tester fallback local',
    run: () => getDigitalOffersTaxonomyData({ preferLocal: true })
  }
];

const summarizeResult = (result) => ({
  source: result?.source || '-',
  count: result?.count ?? result?.items?.length ?? '-',
  version: result?.version || result?.data?.version || '-',
  validated_at: result?.validated_at || result?.data?.validated_at || '-',
  normalized_type: result?.normalized_type || '-',
  item_code: result?.item?.code || '-',
  error_status: result?.error?.status || '-',
  error_message: result?.error?.message || '-'
});

const TaxonomyDiagnostics = () => {
  const [loading, setLoading] = useState('');
  const [results, setResults] = useState({});
  const [lastError, setLastError] = useState('');

  const runTest = async (testCase) => {
    setLoading(testCase.id);
    setLastError('');

    try {
      const result = await testCase.run();
      setResults(prev => ({
        ...prev,
        [testCase.id]: summarizeResult(result)
      }));
    } catch (error) {
      setLastError(error.message || String(error));
      setResults(prev => ({
        ...prev,
        [testCase.id]: {
          source: '-',
          count: '-',
          version: '-',
          validated_at: '-',
          normalized_type: '-',
          item_code: '-',
          error_status: '-',
          error_message: error.message || String(error)
        }
      }));
    } finally {
      setLoading('');
    }
  };

  return (
    <section className="rounded-lg border border-slate-700 bg-slate-900 p-6 text-slate-100">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Diagnostic taxonomie digitale API/local</h2>
        <p className="mt-2 text-sm text-slate-300">
          Outil de diagnostic non metier pour verifier le provider taxonomie sans brancher GED ou CRM.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {testCases.map(testCase => (
          <button
            key={testCase.id}
            type="button"
            onClick={() => runTest(testCase)}
            disabled={Boolean(loading)}
            className="rounded-md border border-slate-600 px-3 py-2 text-sm text-slate-100 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading === testCase.id ? 'Test en cours...' : testCase.label}
          </button>
        ))}
      </div>

      {lastError && (
        <div className="mb-4 rounded-md border border-red-700 bg-red-950 p-3 text-sm text-red-100">
          {lastError}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-700 text-left text-slate-300">
              <th className="px-3 py-2">Test</th>
              <th className="px-3 py-2">Source</th>
              <th className="px-3 py-2">Count</th>
              <th className="px-3 py-2">Version</th>
              <th className="px-3 py-2">Validated at</th>
              <th className="px-3 py-2">Normalized type</th>
              <th className="px-3 py-2">Item code</th>
              <th className="px-3 py-2">Error</th>
            </tr>
          </thead>
          <tbody>
            {testCases.map(testCase => {
              const result = results[testCase.id] || {};
              return (
                <tr key={testCase.id} className="border-b border-slate-800">
                  <td className="px-3 py-2 font-medium">{testCase.label}</td>
                  <td className="px-3 py-2">{result.source || '-'}</td>
                  <td className="px-3 py-2">{result.count || '-'}</td>
                  <td className="px-3 py-2">{result.version || '-'}</td>
                  <td className="px-3 py-2">{result.validated_at || '-'}</td>
                  <td className="px-3 py-2">{result.normalized_type || '-'}</td>
                  <td className="px-3 py-2">{result.item_code || '-'}</td>
                  <td className="px-3 py-2">
                    {result.error_status && result.error_status !== '-'
                      ? `${result.error_status} - ${result.error_message}`
                      : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TaxonomyDiagnostics;
