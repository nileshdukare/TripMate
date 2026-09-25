import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { 
  Utensils, Coffee, Star, MapPin, Car, Clock, 
  ExternalLink, Filter, Check, Heart, Sparkles 
} from 'lucide-react';

export default function FoodDiningSection() {
  const { currentTrip, showToast } = useTrip();
  const [mealFilter, setMealFilter] = useState('All'); // 'All' | 'Breakfast' | 'Lunch' | 'Dinner'
  const [dietFilter, setDietFilter] = useState('All'); // 'All' | 'Pure Vegetarian' | 'Non-Veg'
  const [favorites, setFavorites] = useState({});

  if (!currentTrip || !currentTrip.restaurants) return null;

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = { ...prev, [id]: !prev[id] };
      showToast(next[id] ? "Saved to saved dining spots!" : "Removed from favorites", 'info');
      return next;
    });
  };

  const filtered = currentTrip.restaurants.filter(r => {
    if (mealFilter !== 'All' && !r.mealType?.toLowerCase().includes(mealFilter.toLowerCase())) {
      return false;
    }
    if (dietFilter === 'Pure Vegetarian' && !r.diet?.toLowerCase().includes('pure vegetarian')) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Meal Type Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Meal:
          </span>
          {['All', 'Breakfast', 'Lunch', 'Dinner'].map((type) => (
            <button
              key={type}
              onClick={() => setMealFilter(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                mealFilter === type
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Dietary Filter */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-500 font-medium flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Diet:
          </span>
          {['All', 'Pure Vegetarian'].map((diet) => (
            <button
              key={diet}
              onClick={() => setDietFilter(diet)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                dietFilter === diet
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {diet === 'Pure Vegetarian' ? '🌱 Pure Veg Only' : 'All Diets'}
            </button>
          ))}
        </div>
      </div>

      {/* Restaurant Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((rest) => (
          <div
            key={rest.id}
            className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-800 border border-orange-200">
                    {rest.mealType || 'Highway Dining'}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    rest.diet?.toLowerCase().includes('pure vegetarian')
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {rest.diet}
                  </span>
                </div>

                <button
                  onClick={() => toggleFavorite(rest.id)}
                  className={`p-1.5 rounded-full transition ${
                    favorites[rest.id] ? 'text-rose-500 bg-rose-50' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorites[rest.id] ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base leading-snug">
                    {rest.name}
                  </h4>
                  <p className="text-xs text-brand-700 font-semibold mt-0.5">
                    {rest.cuisine}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md flex-shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {rest.rating}
                </div>
              </div>

              <div className="text-xs font-semibold text-slate-700 mt-2">
                Approx: {rest.approxCost}
              </div>

              {/* Highway Logistics & Parking */}
              <div className="mt-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs space-y-1.5 text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="line-clamp-1">{rest.distanceFromRoute}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                  <span className="line-clamp-1">{rest.parking}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                  <span>{rest.hours}</span>
                </div>
              </div>

              {/* Popular Dishes */}
              {rest.popularDishes?.length > 0 && (
                <div className="mt-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Signature Specialties
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {rest.popularDishes.map((dish, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 text-[11px] font-medium border border-amber-200/50"
                      >
                        {dish}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(rest.name + ' ' + (rest.distanceFromRoute || ''))}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Directions & Menu
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
