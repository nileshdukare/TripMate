import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { 
  CheckSquare, Square, PlusCircle, CheckCircle2, 
  FileCheck, Wrench, Luggage, ShieldAlert, Sparkles 
} from 'lucide-react';

export default function TravelChecklist() {
  const { checklist, toggleChecklistItem, addChecklistItem } = useTrip();
  const [activeCat, setActiveCat] = useState('all');
  const [newTitle, setNewTitle] = useState('');
  const [selectedCatForAdd, setSelectedCatForAdd] = useState('docs');

  // Calculate overall completion
  let totalItems = 0;
  let completedItems = 0;

  checklist.forEach(cat => {
    cat.items.forEach(item => {
      totalItems++;
      if (item.completed) completedItems++;
    });
  });

  const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addChecklistItem(selectedCatForAdd, newTitle);
    setNewTitle('');
  };

  const getCategoryIcon = (iconName) => {
    if (iconName === 'FileCheck') return <FileCheck className="w-5 h-5 text-sky-600" />;
    if (iconName === 'Wrench') return <Wrench className="w-5 h-5 text-amber-600" />;
    if (iconName === 'Luggage') return <Luggage className="w-5 h-5 text-purple-600" />;
    return <ShieldAlert className="w-5 h-5 text-rose-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Progress & Summary Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-brand-600" />
              Pre-Trip Readiness Checklist
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ensure licenses, FASTag, vehicle spare tyre, first aid, and essentials are packed before hitting the highway.
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-brand-600">{percentage}%</span>
            <div className="text-[11px] text-slate-400 font-semibold">{completedItems} of {totalItems} Packed</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-brand-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Add New Item Form */}
      <form onSubmit={handleAdd} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add custom packing item (e.g. GoPro extra battery, dog leash)..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none w-full"
        />
        <select
          value={selectedCatForAdd}
          onChange={(e) => setSelectedCatForAdd(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none w-full sm:w-auto"
        >
          {checklist.map(c => (
            <option key={c.id} value={c.id}>{c.category}</option>
          ))}
        </select>
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm w-full sm:w-auto"
        >
          <PlusCircle className="w-4 h-4" />
          Add Item
        </button>
      </form>

      {/* Checklist Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {checklist.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4"
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  {getCategoryIcon(category.icon)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">{category.category}</h4>
                  <p className="text-[11px] text-slate-400">{category.description}</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-slate-400">
                {category.items.filter(i => i.completed).length}/{category.items.length}
              </span>
            </div>

            <div className="space-y-2">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(category.id, item.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between text-xs ${
                    item.completed
                      ? 'bg-slate-50 border-slate-200/80 text-slate-400 line-through'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-brand-400 hover:bg-brand-50/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-300 flex-shrink-0" />
                    )}
                    <span className={item.completed ? 'opacity-60' : 'font-medium'}>
                      {item.title}
                    </span>
                  </div>

                  {item.required && !item.completed && (
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      Required
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
