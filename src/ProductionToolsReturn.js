import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProductionToolReturnPath } from './productionToolConnections';

export const PRODUCTION_RETURN_LABEL = {
  FR: 'Retour aux outils Production', DE: 'Zurück zu den Produktionswerkzeugen', EN: 'Back to Production tools'
};

export default function ProductionToolsReturn({ language = 'FR' }) {
  const location = useLocation(), navigate = useNavigate();
  const path = getProductionToolReturnPath(location.search);
  if (!path) return null;
  return <button type="button" className="production-tools-return m3s-secondary-button mb-4 inline-flex min-h-11 items-center gap-2 px-3"
    onClick={() => navigate(path)}><ArrowLeft size={18} aria-hidden="true"/>{PRODUCTION_RETURN_LABEL[language] || PRODUCTION_RETURN_LABEL.FR}</button>;
}
