import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { 
  FolderHeart, Plus, Copy, Trash2, Edit2, Check, 
  ArrowRight, Calendar, Users, MapPin, IndianRupee, Clock, Sparkles 
} from 'lucide-react';

export default function MyTripsView() {
  const { 
    savedTrips, 
    currentTrip, 
    selectSavedTrip, 
    duplicateTrip, 
    deleteTrip, 
    renameTrip, 
    setIsPlanModalOpen,
    setActiveView 
  } = useTrip();

  const [renamingId, setRenamingId] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const startRename = (trip) => {
    setRenamingId(trip.id);
    setNewTitle(trip.title);
  };

  const saveRename = (tripId) => {
    if (newTitle.trim()) {
      renameTrip(tripId, newTitle.trim());
    }
    setRenamingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-xl bg-rose-50 text-rose-600">
              <FolderHeart className="w-5 h-5" />
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900">My Saved Journeys</h2>
          </div>
          <p className="text-xs text-slate-500">
            Manage your personal travel itineraries, duplicate past successful routes, or plan brand new adventures.
          </p>
        </div>

        <button
          onClick={() => setIsPlanModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-extrabold shadow-md shadow-brand-600/20 flex items-center justify-center gap-2 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Plan New Trip
        </button>
      </div>

      {/* Trips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedTrips.map((trip) => {
          const isActive = currentTrip?.id === trip.id;
          const isEditing = renamingId === trip.id;

          // Compute budget total
          const b = trip.budget || {};
          const grandTotal = (b.transportation?.fuel || 0) + (b.transportation?.tolls || 0) + 
                             (b.accommodation?.total || 11400) + (b.food?.total || 12000) + 4000;

          return (
            <div
              key={trip.id}
              className={`bg-white rounded-3xl border overflow-hidden shadow-sm transition flex flex-col justify-between ${
                isActive
                  ? 'border-brand-500 ring-2 ring-brand-500/20 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div>
                {/* Image */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={trip.heroImage || "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80"}
                    alt={trip.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-md">
                      {trip.days} Days
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-500 text-white shadow-sm">
                      {isActive ? "Currently Active" : "Saved"}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur-md text-xs font-bold text-slate-900 shadow-md flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                    <span>₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-3">
                  {isEditing ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-sm font-bold border rounded-lg focus:ring-1 focus:ring-brand-500"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && saveRename(trip.id)}
                      />
                      <button
                        onClick={() => saveRename(trip.id)}
                        className="p-2 bg-brand-600 text-white rounded-lg text-xs"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-extrabold text-slate-900 text-base leading-snug line-clamp-1">
                        {trip.title}
                      </h4>
                      <button
                        onClick={() => startRename(trip)}
                        className="p-1 text-slate-400 hover:text-slate-600"
                        title="Rename Trip"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="text-xs text-slate-500 space-y-1">
                    <div className="flex items-center gap-1.5 font-medium text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                      <span className="line-clamp-1">{trip.from} ➔ {trip.to}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{trip.startDate} to {trip.returnDate || 'Return'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{trip.overview?.distance} km • Est. {trip.overview?.travelTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => duplicateTrip(trip.id)}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                    title="Duplicate Trip"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteTrip(trip.id)}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-rose-600 hover:bg-rose-50"
                    title="Delete Trip"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    selectSavedTrip(trip.id);
                    setActiveView('dashboard');
                  }}
                  className={`px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 transition ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm'
                  }`}
                >
                  <span>{isActive ? "Viewing Plan" : "Open Trip"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
