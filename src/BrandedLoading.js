import React from 'react';
import { useLanguage } from './LanguageContext';

export default function BrandedLoading({ label }) {
  const { language } = useLanguage();
  const text = label || ({ FR: 'Chargement de M3S…', EN: 'Loading M3S…', DE: 'M3S wird geladen…' }[language] || 'Chargement de M3S…');
  return <div className="m3s-branded-loading" role="status" aria-busy="true">
    <img src="/assets/logo-2sg.png" alt="2SG - SeneSwiss Group" width="96" height="96"/>
    <p>{text}</p>
  </div>;
}
