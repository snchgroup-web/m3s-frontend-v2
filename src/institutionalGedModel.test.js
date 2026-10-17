import { createHash } from 'crypto';
import { INSTITUTIONAL_BUNDLE_ID, INSTITUTIONAL_REFERENCE, readInstitutionalBundle, readInstitutionalDownload } from './institutionalGedModel';

export const fixture = () => ({ success: true, bundle: { id: INSTITUTIONAL_BUNDLE_ID, reference: INSTITUTIONAL_REFERENCE,
  version: '0.1', classification: 'internal', role: 'preparation_evidence', cycleId: 'bccde91a-fedc-469a-ad65-ab2f212db959',
  dossiers: ['GD-005', 'GD-006'], files: ['A.md', 'B.html', 'C.csv', 'D.json', 'E.json'].map((name, index) => ({
    id: String(index + 1).repeat(64), name, size: 50, contentType: 'application/octet-stream' })) } });

test('one V0.1 bundle describes five distinct files and two real dossier relations', () => {
  expect(readInstitutionalBundle(fixture()).files).toHaveLength(5);
});
test('wrong scope, duplicates, traversal, active MIME or unbounded sizes never become a local fallback', () => {
  const changes = [p => { p.bundle.id = 'x'; }, p => { p.bundle.dossiers = ['GD-008']; }, p => { p.bundle.files[0].name = '../secret.html'; },
    p => { p.bundle.files[0].contentType = 'text/html'; }, p => { p.bundle.files[0].size = 4 * 1024 * 1024; },
    p => { p.bundle.files[0].size = 0; }, p => { p.bundle.files[1].id = p.bundle.files[0].id; },
    p => { p.bundle.files[1].name = p.bundle.files[0].name; }, p => { p.bundle.role = 'adopted_master'; }];
  changes.forEach(change => { const value = fixture(); change(value); expect(() => readInstitutionalBundle(value)).toThrow(); });
});
test('download checks byte count, inert MIME and SHA-256 before producing a blob', async () => {
  const bytes = Uint8Array.from(Buffer.from('synthetic payload'));
  Object.defineProperty(globalThis, 'crypto', { configurable: true, value: { subtle: { digest: async (_algorithm, buffer) => {
    const value = createHash('sha256').update(Buffer.from(buffer)).digest();
    return value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength);
  } } } });
  const file = { id: createHash('sha256').update(bytes).digest('hex'), size: bytes.byteLength };
  const response = { headers: { get: () => 'application/octet-stream' }, arrayBuffer: async () => bytes.buffer };
  expect((await readInstitutionalDownload(response, file)).size).toBe(file.size);
  await expect(readInstitutionalDownload({ ...response, headers: { get: () => 'text/html' } }, file)).rejects.toThrow();
  await expect(readInstitutionalDownload(response, { ...file, id: 'f'.repeat(64) })).rejects.toThrow();
  await expect(readInstitutionalDownload(response, { ...file, size: file.size + 1 })).rejects.toThrow();
});
