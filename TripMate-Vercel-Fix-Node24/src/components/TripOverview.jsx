import React from 'react';
import { useTrip } from '../context/TripContext';
import { 
  Navigation, Clock, Calendar, IndianRupee, CloudSun, 
  AlertTriangle, ShieldAlert, Share2, Printer, Edit3, 
  MapPin, ArrowRight, Car, Compass, Users
} from 'lucide-react';

export default function TripOverview() {
  const { 
    currentTrip, 
    setIsPlanModalOpen, 
    setIsShareModalOpen, 
    setIsSOSModalOpen,
    setActiveView,
    isRoundTrip,
    toggleRoundTrip
  } = useTrip();

  if (!currentTrip) return null;

  const totalPeople = (currentTrip.travelers?.adults || 1) + (currentTrip.travelers?.children || 0);
  
  // Calculate total budget
  const b = currentTrip.budget || {};
  const transportTotal = (b.transportation?.fuel || 0) + (b.transportation?.tolls || 0) + (b.transportation?.parking || 0) + (b.transportation?.emergencyBuffer || 0);
  const hotelTotal = b.accommodation?.total || (b.accommodation?.nights * b.accommodation?.costPerNight) || 11400;
  const foodTotal = b.food?.total || (b.food?.dailyPerPerson * totalPeople * currentTrip.days) || 12000;
  const activitiesTotal = b.activities?.total || 4000;
  const miscTotal = b.miscellaneous?.total || 3000;
  const grandTotal = transportTotal + hotelTotal + foodTotal + activitiesTotal + miscTotal;
  const perPersonCost = Math.round(grandTotal / totalPeople);

  const oneWayKm = currentTrip.overview?.oneWayDistance || currentTrip.overview?.distance || 585;
  const returnKm = currentTrip.overview?.returnDistance || oneWayKm;
  const localKm = currentTrip.overview?.localDistance || 110;
  const roundTripKm = currentTrip.overview?.roundTripDistance || (oneWayKm + returnKm + localKm);

  return (
    <div className="space-y-6">
      {/* Top Banner / Headline */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-xl">
        <img 
          src={currentTrip.heroImage || "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80"} 
          alt={currentTrip.title}
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-overlay"
        />
        <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/90 text-white backdrop-blur-md">
                {currentTrip.days} Days Road Trip
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md">
                {currentTrip.travelMode} ({currentTrip.vehicleDetails?.fuelType || 'Petrol'})
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md">
                Style: {currentTrip.travelStyle}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {currentTrip.title}
            </h1>

            <div className="flex items-center gap-2 text-slate-300 text-sm md:text-base font-medium">
              <span className="flex items-center gap-1.5 text-white font-semibold">
                <MapPin className="w-4 h-4 text-emerald-400" />
                {currentTrip.from}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
              <span className="flex items-center gap-1.5 text-white font-semibold">
                <MapPin className="w-4 h-4 text-rose-400" />
                {currentTrip.to}
              </span>
            </div>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsPlanModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-md border border-white/20 flex items-center gap-2 transition"
            >
              <Edit3 className="w-4 h-4" />
              Modify Search
            </button>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-md border border-white/20 flex items-center gap-2 transition"
            >
              <Share2 className="w-4 h-4" />
              Share Trip
            </button>
            <button
              onClick={() => setActiveView('print')}
              className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-lg shadow-brand-500/25 flex items-center gap-2 transition"
            >
              <Printer className="w-4 h-4" />
              Print / PDF
            </button>
            <button
              onClick={() => setIsSOSModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-lg shadow-rose-600/30 flex items-center gap-1.5 transition animate-pulse"
            >
              <ShieldAlert className="w-4 h-4" />
              SOS Emergency
            </button>
          </div>
        </div>
      </div>

      {/* Realistic Travel Warning Alert (Section 22 Logic) */}
      {currentTrip.overview?.drivingWarning && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3.5 shadow-sm">
          <div className="p-2 rounded-xl bg-amber-200/80 text-amber-900 flex-shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5 text-amber-800" />
          </div>
          <div className="text-sm">
            <h4 className="font-bold text-amber-950 mb-0.5">Smart Driver Advisory</h4>
            <p className="text-amber-800 leading-relaxed">
              {currentTrip.overview.drivingWarning}
            </p>
          </div>
        </div>
      )}

      {/* Key Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Distance */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1.5">
            <span className="flex items-center gap-1">
              <span>{isRoundTrip ? "Total Road Trip" : "One-Way Distance"}</span>
            </span>
            <button
              onClick={() => toggleRoundTrip()}
              className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold"
              title="Click to toggle Round Trip vs One-Way"
            >
              {isRoundTrip ? "Round Trip" : "One-Way"}
            </button>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {isRoundTrip ? roundTripKm : oneWayKm} <span className="text-sm font-semibold text-slate-500">km</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {isRoundTrip 
              ? `${oneWayKm}km outbound + ${returnKm}km return` 
              : `One-way drive: ${currentTrip.overview?.travelTime}`}
          </div>
        </div>

        {/* Departure & Arrival Time */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1.5">
            <span>Suggested Schedule</span>
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-xl font-bold text-slate-900">
            {currentTrip.overview?.suggestedDeparture}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span>Est. Arrival:</span>
            <span className="font-semibold text-slate-700">{currentTrip.overview?.suggestedArrival}</span>
          </div>
        </div>

        {/* Duration & Travelers */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1.5">
            <span>Trip Duration</span>
            <Calendar className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {currentTrip.days} <span className="text-sm font-semibold text-slate-500">Days</span>
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-700">
              {currentTrip.travelers?.adults} Adults, {currentTrip.travelers?.children} Children
            </span>
          </div>
        </div>

        {/* Estimated Budget */}
        <div className="p-4 bg-white rounded-2xl border border-brand-100 bg-brand-50/30 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-600 text-xs font-medium mb-1.5">
            <span className="flex items-center gap-1">
              <span>Estimated Budget</span>
              {isRoundTrip && (
                <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                  Both Ways
                </span>
              )}
            </span>
            <IndianRupee className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-700">
            ₹{grandTotal.toLocaleString()}
          </div>
          <div className="text-xs text-slate-600 mt-1 flex items-center gap-1">
            <span>Per person:</span>
            <span className="font-bold text-emerald-800">₹{perPersonCost.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Return Journey & Road Conditions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Road & Travel Conditions */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-sm">
            <Compass className="w-4 h-4 text-brand-600" />
            Road & Highway Condition Report
          </div>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            {currentTrip.overview?.roadConditions || "Paved national highways with multi-lane segments. Standard FASTag automated tolling at all major toll plazas."}
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <Car className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span>Recommended Vehicle: {currentTrip.vehicleDetails?.type || "Car / SUV"} (Mileage: ~{currentTrip.vehicleDetails?.mileage} km/l)</span>
          </div>
        </div>

        {/* Weather & Return Journey */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-sm">
            <CloudSun className="w-4 h-4 text-amber-500" />
            Weather & Return Journey Plan
          </div>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-3">
            {currentTrip.overview?.weatherSummary}
          </p>
          <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <span><strong>Return leg:</strong> {currentTrip.overview?.returnJourney}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
