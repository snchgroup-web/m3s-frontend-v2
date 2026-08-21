import api from './api';

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  localStorage.clear();
  jest.restoreAllMocks();
});

test('requests the complete digital offers taxonomy', async () => {
  const payload = { success: true, items: [] };
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: jest.fn().mockResolvedValue(payload)
  });

  await expect(api.getDigitalOffersTaxonomy()).resolves.toEqual(payload);
  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringMatching(/\/referentiels\/offres-digitales$/),
    expect.objectContaining({ headers: {} })
  );
});

test('normalizes and encodes the requested digital offer type', async () => {
  const payload = { success: true, normalized_type: 'IA' };
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: jest.fn().mockResolvedValue(payload)
  });

  await expect(api.getDigitalOfferTaxonomy(' ia ')).resolves.toEqual(payload);
  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringMatching(/\/referentiels\/offres-digitales\/IA$/),
    expect.objectContaining({ headers: {} })
  );
});

test('requests the sanitized RH-001 members directory with authentication', async () => {
  const payload = { success: true, data: [], total: 0, classification: 'C2' };
  localStorage.setItem('token', 'test-token');
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: jest.fn().mockResolvedValue(payload)
  });

  await expect(api.getMembersDirectory(25, 5)).resolves.toEqual(payload);
  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringMatching(/\/members-directory\?limit=25&offset=5$/),
    { headers: { Authorization: 'Bearer test-token' } }
  );
});

test('preserves a forbidden RH-001 response for the access-state UI', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 403,
    json: jest.fn().mockResolvedValue({ code: 'RH001_DIRECTORY_FORBIDDEN', error: 'Accès refusé' })
  });

  await expect(api.getMembersDirectory()).rejects.toMatchObject({
    status: 403,
    code: 'RH001_DIRECTORY_FORBIDDEN'
  });
  expect(localStorage.getItem('session_expired')).toBeNull();
});

test('preserves a Finance access denial without expiring the session', async () => {
  localStorage.setItem('token', 'test-token');
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 403,
    json: jest.fn().mockResolvedValue({ code: 'FINANCE_FORBIDDEN', error: 'Finance permission required' })
  });

  await expect(api.getSocialFinance()).rejects.toMatchObject({
    status: 403,
    code: 'FINANCE_FORBIDDEN'
  });
  expect(localStorage.getItem('token')).toBe('test-token');
  expect(localStorage.getItem('session_expired')).toBeNull();
});

test('requests the governed suppliers count with authentication', async () => {
  const payload = {
    success: true,
    total: 79,
    source: 'finance_expenses_and_stock_assets'
  };
  localStorage.setItem('token', 'test-token');
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: jest.fn().mockResolvedValue(payload)
  });

  await expect(api.getSuppliersCount()).resolves.toEqual(payload);
  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringMatching(/\/suppliers\/count$/),
    expect.objectContaining({ headers: { Authorization: 'Bearer test-token' } })
  );
});

test('preserves a suppliers count access denial without expiring the session', async () => {
  localStorage.setItem('token', 'test-token');
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 403,
    json: jest.fn().mockResolvedValue({ code: 'FINANCE_FORBIDDEN', error: 'Finance permission required' })
  });

  await expect(api.getSuppliersCount()).rejects.toMatchObject({
    status: 403,
    code: 'FINANCE_FORBIDDEN'
  });
  expect(localStorage.getItem('token')).toBe('test-token');
  expect(localStorage.getItem('session_expired')).toBeNull();
});

test('requests the governed beneficiaries count with authentication', async () => {
  const payload = { success: true, total: 4, counting_unit: 'distinct_beneficiary_unit' };
  localStorage.setItem('token', 'test-token');
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: jest.fn().mockResolvedValue(payload)
  });

  await expect(api.getBeneficiariesCount()).resolves.toEqual(payload);
  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringMatching(/\/beneficiaries\/count$/),
    expect.objectContaining({ headers: { Authorization: 'Bearer test-token' } })
  );
});

test('preserves a beneficiaries count access denial without expiring the session', async () => {
  localStorage.setItem('token', 'test-token');
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 403,
    json: jest.fn().mockResolvedValue({ code: 'FINANCE_FORBIDDEN', error: 'Finance permission required' })
  });

  await expect(api.getBeneficiariesCount()).rejects.toMatchObject({
    status: 403,
    code: 'FINANCE_FORBIDDEN'
  });
  expect(localStorage.getItem('token')).toBe('test-token');
  expect(localStorage.getItem('session_expired')).toBeNull();
});

test('requests the governed donors count with authentication', async () => {
  const payload = { success: true, total: 6, counting_unit: 'distinct_identified_donor' };
  localStorage.setItem('token', 'test-token');
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: jest.fn().mockResolvedValue(payload)
  });

  await expect(api.getDonorsCount()).resolves.toEqual(payload);
  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringMatching(/\/donors\/count$/),
    expect.objectContaining({ headers: { Authorization: 'Bearer test-token' } })
  );
});

test('preserves a donors count access denial without expiring the session', async () => {
  localStorage.setItem('token', 'test-token');
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 403,
    json: jest.fn().mockResolvedValue({ code: 'DONOR_COUNT_FORBIDDEN', error: 'Access denied' })
  });

  await expect(api.getDonorsCount()).rejects.toMatchObject({
    status: 403,
    code: 'DONOR_COUNT_FORBIDDEN'
  });
  expect(localStorage.getItem('token')).toBe('test-token');
  expect(localStorage.getItem('session_expired')).toBeNull();
});

test('requests the latest Intelligence metadata with authentication', async () => {
  const payload = { success: true, data: { editionDate: '2026-08-07', sourceVersion: 'V4' } };
  localStorage.setItem('token', 'test-token');
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: jest.fn().mockResolvedValue(payload)
  });

  await expect(api.getLatestIntelligence()).resolves.toEqual(payload);
  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringMatching(/\/intelligence\/latest$/),
    expect.objectContaining({ headers: { Authorization: 'Bearer test-token' } })
  );
});

test('downloads a secured Intelligence artifact as a blob', async () => {
  const blob = new Blob(['2SG'], { type: 'text/html' });
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    blob: jest.fn().mockResolvedValue(blob),
    headers: { get: jest.fn().mockReturnValue('inline; filename="latest.html"') }
  });

  await expect(api.getLatestIntelligenceArtifact('html')).resolves.toEqual({
    blob,
    contentDisposition: 'inline; filename="latest.html"'
  });
  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringMatching(/\/intelligence\/latest\/html$/),
    expect.objectContaining({ headers: {} })
  );
});

test('loads Administration resources with authentication', async () => {
  const payload = { success: true, data: [{ id: 'RES-1' }], source: 'bigquery' };
  localStorage.setItem('token', 'test-token');
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: jest.fn().mockResolvedValue(payload)
  });

  await expect(api.getAdministrationResources(20, 5)).resolves.toEqual(payload);
  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringMatching(/\/administration\/resources\?limit=20&offset=5$/),
    expect.objectContaining({ headers: { Authorization: 'Bearer test-token' } })
  );
});

test('preserves Administration access denial without expiring the session', async () => {
  localStorage.setItem('token', 'test-token');
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 403,
    json: jest.fn().mockResolvedValue({ code: 'ADMIN_REGISTRY_FORBIDDEN', error: 'Access denied' })
  });

  await expect(api.getAdministrationCorrespondence()).rejects.toMatchObject({
    status: 403,
    code: 'ADMIN_REGISTRY_FORBIDDEN'
  });
  expect(localStorage.getItem('token')).toBe('test-token');
  expect(localStorage.getItem('session_expired')).toBeNull();
});

test('loads the restricted Administration audit log with authentication', async () => {
  const payload = { success: true, data: [{ id: 'AUD-1' }], source: 'bigquery' };
  localStorage.setItem('token', 'test-token');
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: jest.fn().mockResolvedValue(payload)
  });

  await expect(api.getAdministrationAudit(25, 10)).resolves.toEqual(payload);
  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringMatching(/\/administration\/audit\?limit=25&offset=10$/),
    expect.objectContaining({ headers: { Authorization: 'Bearer test-token' } })
  );
});
