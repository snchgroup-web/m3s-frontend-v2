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
