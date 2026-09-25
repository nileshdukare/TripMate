import React from 'react';
import { useTrip } from '../context/TripContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useTrip();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((t) => {
        const isSuccess = t.type === 'success';
        const isError = t.type === 'error';

        return (
          <div
            key={t.id}
            className={`pointer-events-auto p-3.5 rounded-2xl shadow-xl border flex items-center justify-between gap-3 text-xs font-semibold animate-in fade-in slide-in-from-right duration-200 ${
              isSuccess
                ? 'bg-slate-900 text-white border-slate-800'
                : isError
                ? 'bg-rose-600 text-white border-rose-700'
                : 'bg-white text-slate-800 border-slate-200 shadow-md'
            }`}
          >
            <div className="flex items-center gap-2">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
              {isError && <AlertCircle className="w-4 h-4 text-white flex-shrink-0" />}
              {!isSuccess && !isError && <Info className="w-4 h-4 text-sky-500 flex-shrink-0" />}
              <span>{t.message}</span>
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="p-1 rounded-md opacity-70 hover:opacity-100 transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
