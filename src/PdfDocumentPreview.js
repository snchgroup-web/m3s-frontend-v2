import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { loadPdf } from './pdfEngine';

const labels = {
  FR: { previous: 'Page précédente', next: 'Page suivante', in: 'Agrandir', out: 'Réduire', loading: 'Chargement du document…', error: 'Aperçu indisponible. Le téléchargement reste possible.', page: 'Page' },
  EN: { previous: 'Previous page', next: 'Next page', in: 'Zoom in', out: 'Zoom out', loading: 'Loading document…', error: 'Preview unavailable. You can still download the document.', page: 'Page' },
  DE: { previous: 'Vorherige Seite', next: 'Nächste Seite', in: 'Vergrössern', out: 'Verkleinern', loading: 'Dokument wird geladen…', error: 'Vorschau nicht verfügbar. Herunterladen ist weiterhin möglich.', page: 'Seite' }
};

export default function PdfDocumentPreview({ blob, name, language }) {
  const t = labels[language] || labels.FR;
  const [pdf, setPdf] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState(300);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [text, setText] = useState('');
  const container = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let task;
    setPdf(null); setPageNumber(1); setError(false); setLoading(true);
    blob.arrayBuffer().then(data => {
      if (cancelled) return undefined;
      task = loadPdf(new Uint8Array(data));
      return task.promise;
    }).then(document => { if (!cancelled && document) setPdf(document); })
      .catch(() => { if (!cancelled) { setError(true); setLoading(false); } });
    return () => { cancelled = true; task?.destroy()?.catch(() => {}); };
  }, [blob]);

  useEffect(() => {
    const element = container.current;
    const resize = () => setWidth(Math.max(100, element.clientWidth - 16));
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!pdf) return undefined;
    let cancelled = false;
    let renderTask;
    setLoading(true); setError(false); setText('');
    pdf.getPage(pageNumber).then(async page => {
      if (cancelled) return;
      const viewport = page.getViewport({ scale: width / page.getViewport({ scale: 1 }).width * zoom });
      const outputScale = Math.min(window.devicePixelRatio || 1, 2);
      const target = canvas.current;
      target.width = Math.ceil(viewport.width * outputScale);
      target.height = Math.ceil(viewport.height * outputScale);
      target.style.width = `${viewport.width}px`;
      target.style.height = `${viewport.height}px`;
      renderTask = page.render({ canvasContext: target.getContext('2d'), viewport, transform: [outputScale, 0, 0, outputScale, 0, 0] });
      await renderTask.promise;
      if (cancelled) return;
      setLoading(false);
      const content = await page.getTextContent();
      if (!cancelled) setText(content.items.map(item => item.str || '').join(' '));
    }).catch(() => { if (!cancelled) { setError(true); setLoading(false); } });
    return () => { cancelled = true; renderTask?.cancel(); };
  }, [pdf, pageNumber, width, zoom]);

  return <div aria-label={name}>
    <div className="flex items-center justify-center flex-wrap gap-2 mb-2">
      <button type="button" className="m3s-icon-button" title={t.previous} aria-label={t.previous} disabled={!pdf || pageNumber <= 1} onClick={() => setPageNumber(n => n - 1)}><ChevronLeft size={18}/></button>
      <span className="text-sm tabular-nums" style={{ minWidth: 80, textAlign: 'center' }}>{t.page} {pageNumber} / {pdf?.numPages || '—'}</span>
      <button type="button" className="m3s-icon-button" title={t.next} aria-label={t.next} disabled={!pdf || pageNumber >= pdf.numPages} onClick={() => setPageNumber(n => n + 1)}><ChevronRight size={18}/></button>
      <button type="button" className="m3s-icon-button" title={t.out} aria-label={t.out} disabled={zoom <= 0.75} onClick={() => setZoom(n => n - 0.25)}><ZoomOut size={18}/></button>
      <button type="button" className="m3s-icon-button" title={t.in} aria-label={t.in} disabled={zoom >= 2} onClick={() => setZoom(n => n + 0.25)}><ZoomIn size={18}/></button>
    </div>
    {loading && <p role="status" className="text-sm">{t.loading}</p>}
    {error && <p role="alert">{t.error}</p>}
    <div ref={container} className="overflow-auto bg-neutral-200 p-2" style={{ height: '55vh' }}>
      <canvas ref={canvas} role="img" aria-label={`${name} · ${t.page} ${pageNumber}`} className="block mx-auto" style={{ visibility: loading || error ? 'hidden' : 'visible' }}/>
    </div>
    <p className="sr-only">{text}</p>
  </div>;
}
