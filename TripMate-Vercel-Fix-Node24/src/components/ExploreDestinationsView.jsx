import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { popularDestinations } from '../data/destinations';
import { 
  Compass, Star, Calendar, IndianRupee, MapPin, 
  ArrowRight, Search, Sparkles, Filter 
} from 'lucide-react';

export default function ExploreDestinationsView() {
  const { handlePlanTrip } = useTrip();
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const allTags = ['All', 'Beach', 'Spiritual', 'Adventure', 'Mountains', 'Heritage', 'Nature', 'Romantic'];

  const filtered = popularDestinations.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || 
                          d.state.toLowerCase().includes(search.toLowerCase()) ||
                          d.description.toLowerCase().includes(search.toLowerCase());
    const matchesTag = activeTag === 'All' || d.tags.some(t => t.toLowerCase() === activeTag.toLowerCase());
    return matchesSearch && matchesTag;
  });

  const handleQuickPlan = (dest) => {
    handlePlanTrip({
      from: "Mumbai, Maharashtra",
      to: dest.name,
      days: dest.idealDays,
      travelMode: "Car",
      budgetTier: "Standard",
      travelStyle: dest.tags[0] || "Balanced"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 md:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-brand-500/30 text-brand-300">
              <Compass className="w-5 h-5 text-brand-400" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-300">
              Curated Travel Directory
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">
            Discover Your Next Dream Road Trip
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            From tropical coastal drives and sacred temple yatras to high Himalayan mountain passes. Select any destination to generate a turn-key itinerary.
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-80">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destination, state, style..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>
        </div>
      </div>

      {/* Tag filter pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
        <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTag === tag
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Destination Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((dest) => (
          <div
            key={dest.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
          >
            <div>
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-md">
                    {dest.state}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-bold text-slate-800 shadow-md">
                  {dest.idealDays} Days Recommended
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <h4 className="font-extrabold text-slate-900 text-base leading-snug">
                  {dest.name}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {dest.description}
                </p>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Best Season:</span>
                    <span className="font-semibold text-slate-700">{dest.bestSeason}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Avg. Budget / Day:</span>
                    <span className="font-semibold text-emerald-700">₹{dest.avgBudgetPerDay?.toLocaleString()}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {dest.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Plan Button Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => handleQuickPlan(dest)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-brand-600 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm group-hover:bg-brand-600"
              >
                <span>Plan Trip to {dest.name.split('(')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
