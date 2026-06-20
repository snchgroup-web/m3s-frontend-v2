import React from 'react';
import {
  LayoutDashboard, ClipboardList, WalletCards, UsersRound,
  Handshake, Factory, Warehouse, FolderCog
} from 'lucide-react';

export const modulePresentation = {
  dashboard: { icon: LayoutDashboard, color: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/30' },
  administration: { icon: ClipboardList, color: 'text-cyan-400', bg: 'bg-cyan-500/15', border: 'border-cyan-500/30' },
  finances: { icon: WalletCards, color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30' },
  rh: { icon: UsersRound, color: 'text-violet-400', bg: 'bg-violet-500/15', border: 'border-violet-500/30' },
  commercial: { icon: Handshake, color: 'text-sky-400', bg: 'bg-sky-500/15', border: 'border-sky-500/30' },
  production: { icon: Factory, color: 'text-orange-400', bg: 'bg-orange-500/15', border: 'border-orange-500/30' },
  stock: { icon: Warehouse, color: 'text-rose-400', bg: 'bg-rose-500/15', border: 'border-rose-500/30' },
  'it-support': { icon: FolderCog, color: 'text-teal-400', bg: 'bg-teal-500/15', border: 'border-teal-500/30' }
};

export const moduleIdFromPath = (pathname) => {
  if (pathname === '/') return 'dashboard';
  if (pathname.startsWith('/administration')) return 'administration';
  if (pathname.startsWith('/finance')) return 'finances';
  if (pathname.startsWith('/rh')) return 'rh';
  if (pathname.startsWith('/crm')) return 'commercial';
  if (pathname.startsWith('/production')) return 'production';
  if (pathname.startsWith('/actifs')) return 'stock';
  if (pathname.startsWith('/ged')) return 'it-support';
  return 'dashboard';
};

export const ModuleIcon = ({ moduleId, size = 22, className = '' }) => {
  const presentation = modulePresentation[moduleId] || modulePresentation.dashboard;
  const Icon = presentation.icon;
  return <Icon size={size} className={`${presentation.color} ${className}`} aria-hidden="true" />;
};

export const ModuleTitle = ({ moduleId, title, subtitle }) => {
  const presentation = modulePresentation[moduleId] || modulePresentation.dashboard;
  return (
    <div className="flex items-start gap-3">
      <div className={`w-11 h-11 flex items-center justify-center rounded-lg border ${presentation.bg} ${presentation.border}`}>
        <ModuleIcon moduleId={moduleId} size={25} />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">{title}</h1>
        {subtitle && <p className="text-slate-400">{subtitle}</p>}
      </div>
    </div>
  );
};
