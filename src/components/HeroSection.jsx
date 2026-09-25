import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { popularDestinations } from '../data/destinations';
import { 
  Sparkles, MapPin, ArrowRight, Compass, ShieldCheck, 
  Fuel, Hotel, Utensils, Calendar, Users, Car 
} from 'lucide-react';

export default function HeroSection() {
  const { 
    setIsPlanModalOpen, 
    setActiveView, 
    handlePlanTrip, 
    searchParams 
  } = useTrip();

  const [fromCity, setFromCity] = useState("Mumbai, Maharashtra");
  const [toCity, setToCity] = useState("Goa (North & South)");
  const [duration, setDuration] = useState(4);

  const handleQuickSearch = (e) => {
    e.preventDefault();
    handlePlanTrip({
      from: fromCity,
      to: toCity,
      days: Number(duration),
      travelMode: "Car",
      budgetTier: "Standard",
      travelStyle: "Balanced"
    });
  };

  return (
    <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl mb-8 border border-slate-800">
      {/* Background Graphic & Travel Imagery */}
      <img
        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80"
        alt="Epic Road Trip Scenic Drive"
        className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity filter blur-[0.5px]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-brand-300 text-xs font-bold animate-in fade-in slide-in-from-top-2 duration-300">
          <Sparkles className="w-4 h-4 text-brand-400" />
          The Modern Intelligent Travel Operating System
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15]">
          Plan Your Entire Journey <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-brand-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
            in Minutes
          </span>
        </h1>

        <p className="text-sm md:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
          Routes, hotels, fuel stops, sightseeing, food, budget and more — all in one unified, interactive dashboard.
        </p>
        <div className="mx-auto max-w-xl rounded-xl border border-amber-300/20 bg-amber-400/10 px-3 py-2 text-[11px] text-amber-100">
          Demo mode: some hotel, fuel, attraction, weather, toll and traffic details are estimates until live providers are connected.
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setIsPlanModalOpen(true)}
            className="px-8 py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-extrabold shadow-xl shadow-brand-500/30 transition transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            PLAN MY TRIP
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveView('explore')}
            className="px-7 py-4 rounded-2xl bg-white/15 hover:bg-white/25 text-white text-sm font-bold backdrop-blur-md border border-white/20 transition flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            EXPLORE DESTINATIONS
          </button>
        </div>

        {/* Quick Search Strip */}
        <form
          onSubmit={handleQuickSearch}
          className="mt-6 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl shadow-2xl border border-white/20 text-slate-900 grid grid-cols-1 sm:grid-cols-4 gap-2 text-left"
        >
          <div className="px-3 py-2 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">From</span>
            <input
              type="text"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              placeholder="Departure City"
              className="w-full text-xs font-bold text-slate-800 bg-transparent focus:outline-none"
            />
          </div>

          <div className="px-3 py-2 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">To</span>
            <input
              type="text"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              placeholder="Destination"
              className="w-full text-xs font-bold text-slate-800 bg-transparent focus:outline-none"
            />
          </div>

          <div className="px-3 py-2 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Days</span>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full text-xs font-bold text-slate-800 bg-transparent focus:outline-none"
            >
              <option value={2}>2 Days</option>
              <option value={3}>3 Days</option>
              <option value={4}>4 Days</option>
              <option value={5}>5 Days</option>
              <option value={7}>7 Days</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            <span>Generate Plan</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-400" />
          </button>
        </form>

        {/* Feature Highlights Grid */}
        <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-slate-300 text-xs">
          <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
            <Fuel className="w-4 h-4 text-amber-400" />
            <span>Smart Fuel Stops & EV</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
            <Hotel className="w-4 h-4 text-indigo-400" />
            <span>Curated Stays & Rates</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
            <Utensils className="w-4 h-4 text-orange-400" />
            <span>Highway Dining Guide</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>24/7 SOS & Hospital Map</span>
          </div>
        </div>
      </div>
    </div>
  );
}
