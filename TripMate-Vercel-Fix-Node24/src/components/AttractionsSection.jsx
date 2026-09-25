import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { 
  Landmark, Star, Clock, IndianRupee, MapPin, 
  CheckCircle2, PlusCircle, ExternalLink, Sparkles 
} from 'lucide-react';

export default function AttractionsSection() {
  const { currentTrip, showToast } = useTrip();
  const [selectedTag, setSelectedTag] = useState('All');
  const [includedState, setIncludedState] = useState(() => {
    const map = {};
    currentTrip?.attractions?.forEach(a => {
      map[a.id] = a.inItinerary;
    });
    return map;
  });

  if (!currentTrip || !currentTrip.attractions) return null;

  const toggleInclude = (id, name) => {
    setIncludedState(prev => {
      const nextVal = !prev[id];
      showToast(
        nextVal ? `Added ${name} to Day Itinerary!` : `Removed ${name} from Itinerary`,
        'info'
      );
      return { ...prev, [id]: nextVal };
    });
  };

  const tags = ['All', 'Historical Fort', 'Heritage & Religious', 'Culture & Architecture', 'Scenic Sunset Point', 'Nature & Adventure'];

  const filtered = currentTrip.attractions.filter(a => {
    if (selectedTag === 'All') return true;
    return a.category?.toLowerCase().includes(selectedTag.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Category filter bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
          <Landmark className="w-3.5 h-3.5" /> Type:
        </span>
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTag(t)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedTag === t
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Attractions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((attr) => {
          const isAdded = includedState[attr.id];

          return (
            <div
              key={attr.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={attr.image}
                    alt={attr.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 text-white backdrop-blur-md">
                      {attr.category}
                    </span>
                  </div>

                  {isAdded && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-brand-500 text-white flex items-center gap-1 shadow-md">
                      <CheckCircle2 className="w-3 h-3" /> In Itinerary
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-bold text-slate-800 shadow-md flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{attr.rating}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-3">
                  <h4 className="font-extrabold text-slate-900 text-base leading-snug">
                    {attr.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {attr.description}
                  </p>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs space-y-2 text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-sky-500" /> Hours:
                      </span>
                      <span className="font-semibold text-slate-800">{attr.openingHours}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <IndianRupee className="w-3.5 h-3.5 text-emerald-500" /> Entry Fee:
                      </span>
                      <span className="font-semibold text-slate-800">{attr.entryFee}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-amber-500" /> Time Needed:
                      </span>
                      <span className="font-semibold text-slate-800">{attr.timeRequired}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-purple-500" /> From Hotel:
                      </span>
                      <span className="font-semibold text-slate-800">{attr.distanceFromHotel}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex items-center gap-2">
                <button
                  onClick={() => toggleInclude(attr.id, attr.name)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    isAdded
                      ? 'bg-brand-50 text-brand-700 border border-brand-200 hover:bg-brand-100'
                      : 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-brand-600" /> Scheduled in Plan
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" /> Add to Itinerary
                    </>
                  )}
                </button>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(attr.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold"
                  title="View on Google Maps"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
