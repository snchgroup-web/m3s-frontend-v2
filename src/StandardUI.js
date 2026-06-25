import React from 'react';
import { Edit2, Eye, Trash2, X } from 'lucide-react';

export const StandardKpiCard = ({ label, value, secondary, icon: Icon, color = 'text-blue-400' }) => (
  <div className="min-h-[118px] rounded-lg border border-slate-700 bg-slate-800 p-5 transition hover:-translate-y-0.5 hover:border-slate-500 hover:shadow-lg hover:shadow-blue-950/30">
    <div className="flex h-full items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-sm text-slate-300">{label}</p>
        <p className="mt-2 break-words text-2xl font-bold text-white">{value}</p>
        {secondary && <p className="mt-1 break-words text-sm font-semibold text-slate-400">{secondary}</p>}
      </div>
      {Icon && <Icon size={30} className={`shrink-0 ${color}`} />}
    </div>
  </div>
);

export const StandardActionsCell = ({
  item,
  onView,
  onEdit,
  onDelete,
  labels = {}
}) => (
  <td className="px-4 py-3 align-top">
    <div className="flex gap-2">
      {onView && (
        <button
          type="button"
          title={labels.view || 'View'}
          onClick={(event) => {
            event.stopPropagation();
            onView(item);
          }}
          className="rounded p-1 text-blue-300 transition hover:bg-slate-600 hover:text-blue-100"
        >
          <Eye size={16} />
        </button>
      )}
      {onEdit && (
        <button
          type="button"
          title={labels.edit || 'Edit'}
          onClick={(event) => {
            event.stopPropagation();
            onEdit(item);
          }}
          className="rounded p-1 text-amber-300 transition hover:bg-slate-600 hover:text-amber-100"
        >
          <Edit2 size={16} />
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          title={labels.delete || 'Delete'}
          onClick={(event) => {
            event.stopPropagation();
            onDelete(item);
          }}
          className="rounded p-1 text-red-300 transition hover:bg-slate-600 hover:text-red-100"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  </td>
);

export const StandardRecordSheetModal = ({
  open,
  title,
  eyebrow,
  description,
  details = [],
  closeLabel = 'Close',
  onClose
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-2xl shadow-slate-950/50">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            {eyebrow && <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">{eyebrow}</p>}
            <h2 className="mt-1 text-2xl font-bold text-white">{title}</h2>
            {description && <p className="mt-2 text-sm text-amber-200">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {details.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
              <p className="mt-1 break-words text-sm font-semibold text-slate-100">{value || '-'}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            {closeLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
