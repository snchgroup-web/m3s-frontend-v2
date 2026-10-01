import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

export function loadPdf(data) {
  return getDocument({ data, isEvalSupported: false, useSystemFonts: true });
}
