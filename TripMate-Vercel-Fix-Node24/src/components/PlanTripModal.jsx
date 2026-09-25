import React, { useState, useEffect, useRef } from 'react';
import { useTrip } from '../context/TripContext';
import { popularDestinations, popularOrigins } from '../data/destinations';
import { searchLivePlaces } from '../services/mapService';
import { 
  X, MapPin, Calendar, Users, Car, Bike, Bus, 
  Train, Plane, Fuel, Zap, Sparkles, Compass, Check, ArrowRight, Loader2 
} from 'lucide-react';

export default function PlanTripModal({ isOpen, onClose }) {
  const { handlePlanTrip, currentTrip } = useTrip();

  const [from, setFrom] = useState(currentTrip?.from || "Mumbai, Maharashtra");
  const [to, setTo] = useState(currentTrip?.to || "Goa");
  const [fromCoords, setFromCoords] = useState(currentTrip?.fromCoords || null);
  const [toCoords, setToCoords] = useState(currentTrip?.toCoords || null);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [isSearchingFrom, setIsSearchingFrom] = useState(false);
  const [isSearchingTo, setIsSearchingTo] = useState(false);

  const [days, setDays] = useState(currentTrip?.days || 4);
  const [startDate, setStartDate] = useState(currentTrip?.startDate || "2026-10-15");
  const [adults, setAdults] = useState(currentTrip?.travelers?.adults || 2);
  const [children, setChildren] = useState(currentTrip?.travelers?.children || 1);
  const [travelMode, setTravelMode] = useState(currentTrip?.travelMode || "Car");
  const [vehicleType, setVehicleType] = useState(currentTrip?.vehicleDetails?.type || "Compact SUV");
  const [fuelType, setFuelType] = useState(currentTrip?.vehicleDetails?.fuelType || "Petrol");
  const [mileage, setMileage] = useState(currentTrip?.vehicleDetails?.mileage || 14.5);
  const [tankCapacity, setTankCapacity] = useState(currentTrip?.vehicleDetails?.tankCapacity || 45);
  const [batteryCapacity, setBatteryCapacity] = useState(currentTrip?.vehicleDetails?.batteryCapacity || 50);
  const [budgetTier, setBudgetTier] = useState(currentTrip?.budgetTier || "Standard");
  const [travelStyle, setTravelStyle] = useState(currentTrip?.travelStyle || "Balanced");

  // Live autocomplete for From input
  useEffect(() => {
    if (!from || from.length < 3) {
      setFromSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearchingFrom(true);
      const results = await searchLivePlaces(from);
      setFromSuggestions(results);
      setIsSearchingFrom(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [from]);

  // Live autocomplete for To input
  useEffect(() => {
    if (!to || to.length < 3) {
      setToSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearchingTo(true);
      const results = await searchLivePlaces(to);
      setToSuggestions(results);
      setIsSearchingTo(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [to]);

  // Dynamic return date calculation
  const getReturnDate = () => {
    try {
      const d = new Date(startDate);
      d.setDate(d.getDate() + (Number(days) - 1));
      return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
    } catch {
      return "";
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePlanTrip({
      from,
      to,
      fromCoords,
      toCoords,
      days: Number(days),
      startDate,
      adults: Number(adults),
      children: Number(children),
      travelMode,
      vehicleType,
      fuelType,
      mileage: Number(mileage),
      tankCapacity: Number(tankCapacity),
      batteryCapacity: Number(batteryCapacity),
      budgetTier,
      travelStyle
    });
    onClose();
  };

  const travelModes = [
    { label: "Car", icon: Car },
    { label: "Bike", icon: Bike },
    { label: "Bus", icon: Bus },
    { label: "Train", icon: Train },
    { label: "Flight", icon: Plane }
  ];

  const travelStyles = [
    "Relaxed", "Balanced", "Fast-paced", "Adventure", 
    "Family", "Spiritual", "Nature", "Historical", 
    "Food", "Shopping", "Mixed"
  ];

  const budgetOptions = ["Economy", "Standard", "Premium", "Luxury"];

  // Quick preset loader
  const loadPreset = (presetFrom, presetTo, presetDays, presetMode, presetStyle) => {
    setFrom(presetFrom);
    setTo(presetTo);
    setDays(presetDays);
    setTravelMode(presetMode);
    setTravelStyle(presetStyle);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-500 text-white">
                TripMate Engine
              </span>
              <span className="text-xs text-slate-400">Step 1 of 1</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white">Plan Your Complete Journey</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Enter your route and preferences. We’ll generate turnkey maps, itineraries, hotels, fuel stops, and budgets.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Route Preset Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200/80 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" /> Popular Routes:
          </span>
          <button
            type="button"
            onClick={() => loadPreset("Mumbai, Maharashtra", "Goa", 4, "Car", "Balanced")}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-slate-700 hover:text-brand-700 text-xs font-semibold whitespace-nowrap transition"
          >
            🌊 Mumbai ➔ Goa (4D)
          </button>
          <button
            type="button"
            onClick={() => loadPreset("Shirdi, Maharashtra", "Kukke Shri Subrahmanya, Karnataka", 5, "Car", "Spiritual")}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-slate-700 hover:text-brand-700 text-xs font-semibold whitespace-nowrap transition"
          >
            🛕 Shirdi ➔ Kukke (5D)
          </button>
          <button
            type="button"
            onClick={() => loadPreset("New Delhi, Delhi NCR", "Manali & Solang Valley", 5, "Car", "Adventure")}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-slate-700 hover:text-brand-700 text-xs font-semibold whitespace-nowrap transition"
          >
            🏔️ Delhi ➔ Manali (5D)
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Origin & Destination Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  From (Starting Location)
                </span>
                {isSearchingFrom && <Loader2 className="w-3.5 h-3.5 text-brand-600 animate-spin" />}
              </label>
              <input
                type="text"
                required
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="City, town, airport, station..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />

              {/* Live Suggestions Dropdown */}
              {fromSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden divide-y divide-slate-100 animate-in fade-in duration-150">
                  <div className="px-3 py-1.5 bg-slate-50 text-[10px] font-bold uppercase text-slate-400">
                    Live OpenStreetMap Suggestions
                  </div>
                  {fromSuggestions.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setFrom(s.name + (s.state ? `, ${s.state}` : ''));
                        setFromCoords(s.coords);
                        setFromSuggestions([]);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-brand-50 text-xs font-medium text-slate-800 transition flex items-center justify-between"
                    >
                      <span className="truncate">{s.label}</span>
                      <span className="text-[10px] text-slate-400">Select</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-1 mt-1.5">
                {popularOrigins.slice(0, 4).map((o, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setFrom(o.name);
                      setFromCoords(o.coords);
                      setFromSuggestions([]);
                    }}
                    className="text-[10px] text-slate-500 hover:text-brand-600 bg-slate-100 hover:bg-brand-50 px-2 py-0.5 rounded-md transition"
                  >
                    {o.name.split(',')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-600" />
                  To (Destination)
                </span>
                {isSearchingTo && <Loader2 className="w-3.5 h-3.5 text-brand-600 animate-spin" />}
              </label>
              <input
                type="text"
                required
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Destination city, hill station, landmark..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />

              {/* Live Suggestions Dropdown */}
              {toSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden divide-y divide-slate-100 animate-in fade-in duration-150">
                  <div className="px-3 py-1.5 bg-slate-50 text-[10px] font-bold uppercase text-slate-400">
                    Live OpenStreetMap Suggestions
                  </div>
                  {toSuggestions.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setTo(s.name + (s.state ? `, ${s.state}` : ''));
                        setToCoords(s.coords);
                        setToSuggestions([]);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-brand-50 text-xs font-medium text-slate-800 transition flex items-center justify-between"
                    >
                      <span className="truncate">{s.label}</span>
                      <span className="text-[10px] text-slate-400">Select</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-1 mt-1.5">
                {popularDestinations.slice(0, 4).map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      setTo(d.name);
                      setToCoords(d.coords);
                      setToSuggestions([]);
                    }}
                    className="text-[10px] text-slate-500 hover:text-brand-600 bg-slate-100 hover:bg-brand-50 px-2 py-0.5 rounded-md transition"
                  >
                    {d.name.split('(')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dates & Number of Days */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-sky-600" />
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Number of Days
              </label>
              <div className="flex items-center gap-1">
                {[2, 3, 4, 5, 7].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setDays(num)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      days === num
                        ? 'bg-brand-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {num}D
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex flex-col justify-center text-xs">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Return Date (Auto)</span>
              <span className="font-extrabold text-slate-800 text-xs mt-0.5">{getReturnDate()}</span>
            </div>
          </div>

          {/* Travelers */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Adults (Age 12+)
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setAdults(num)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      adults === num
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Children (Age 0-11)
              </label>
              <div className="flex items-center gap-2">
                {[0, 1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setChildren(num)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      children === num
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Travel Mode */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Travel Mode
            </label>
            <div className="grid grid-cols-5 gap-2">
              {travelModes.map((m) => {
                const Icon = m.icon;
                const isSelected = travelMode === m.label;
                return (
                  <button
                    key={m.label}
                    type="button"
                    onClick={() => setTravelMode(m.label)}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                      isSelected
                        ? 'bg-brand-50 border-brand-500 text-brand-700 ring-2 ring-brand-500/20'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-bold">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conditional Vehicle Specifications for Car or Bike (Section 2 Requirement) */}
          {(travelMode === "Car" || travelMode === "Bike") && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-brand-600" />
                  Vehicle & Fuel Parameters
                </h4>
                <span className="text-[11px] text-slate-500">Calculates accurate refueling stops</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {/* Vehicle Type */}
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Vehicle Type</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-white font-medium"
                  >
                    <option value="Compact SUV">Compact SUV</option>
                    <option value="Mid/Full-size SUV">Mid/Full SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="MPV / Innova">7-Seater MPV</option>
                    <option value="Adventure Bike">Adventure Bike</option>
                  </select>
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Fuel / Energy</label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-white font-medium"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="EV">Electric (EV)</option>
                  </select>
                </div>

                {/* Mileage */}
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">
                    {fuelType === 'EV' ? "Efficiency (km/kWh)" : "Mileage (km/L)"}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-white font-medium"
                  />
                </div>

                {/* Capacity */}
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">
                    {fuelType === 'EV' ? "Battery (kWh)" : "Tank Cap. (Liters)"}
                  </label>
                  <input
                    type="number"
                    value={fuelType === 'EV' ? batteryCapacity : tankCapacity}
                    onChange={(e) => fuelType === 'EV' ? setBatteryCapacity(e.target.value) : setTankCapacity(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-white font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Budget & Travel Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Budget Tier
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {budgetOptions.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudgetTier(b)}
                    className={`py-2 rounded-xl text-xs font-bold transition ${
                      budgetTier === b
                        ? 'bg-brand-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Travel Style
              </label>
              <select
                value={travelStyle}
                onChange={(e) => setTravelStyle(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {travelStyles.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 sm:flex-none px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-extrabold shadow-lg shadow-brand-600/25 transition flex items-center justify-center gap-2"
            >
              PLAN MY TRIP
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
